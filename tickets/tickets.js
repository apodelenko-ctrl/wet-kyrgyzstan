(() => {
  'use strict';

  const catalog = JSON.parse(document.getElementById('events-data').textContent);
  const events = new Map(catalog.events.map(event => [event.id, event]));
  const storageKey = 'kgTicketsDraft2027_v1';
  const selection = new Map();
  const localDay = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };
  const available = id => events.has(id) && events.get(id).end >= localDay();
  const quantity = value => Math.min(99, Math.max(1, Math.trunc(Number(value)) || 1));
  const normalize = value => value.toLocaleLowerCase('ru').replace(/ё/g, 'е').normalize('NFKC');
  const $ = selector => document.querySelector(selector);
  const dialog = $('#request-dialog');
  const form = $('#request-form');
  let returnFocus = null;
  let preparedText = '';
  const filters = {
    city: $('#filter-city'),
    category: $('#filter-category'),
    month: $('#filter-month'),
    search: $('#filter-search')
  };

  document.getElementById('year').textContent = String(new Date().getFullYear());
  try {
    const stored = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    if (Array.isArray(stored)) stored.forEach(item => {
      if (item && available(item.id)) selection.set(item.id, quantity(item.quantity));
    });
  } catch (_) { /* Selection also works without browser storage. No contact details are stored. */ }

  function saveSelection() {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify([...selection].map(([id, count]) => ({id, quantity: count}))));
    } catch (_) { /* Storage is optional. */ }
  }

  function hideResult() {
    preparedText = '';
    $('#request-result').hidden = true;
    $('#request-preview').textContent = '';
    $('#email-request').href = 'mailto:wet4kg@gmail.com';
    $('#form-status').textContent = '';
  }

  function makeSelectionItem(id, count, prefix) {
    const event = events.get(id);
    const li = document.createElement('li');
    li.className = 'selection-item';
    const description = document.createElement('div');
    description.className = 'selection-event';
    const title = document.createElement('strong');
    title.textContent = event.title;
    const meta = document.createElement('span');
    meta.textContent = `${event.dates} · ${event.city}`;
    description.append(title, meta);
    const label = document.createElement('label');
    label.className = 'participant-control';
    label.htmlFor = `${prefix}-qty-${id}`;
    label.append(document.createTextNode('Участников'));
    const input = document.createElement('input');
    Object.assign(input, {type: 'number', min: '1', max: '99', step: '1', value: String(count), id: label.htmlFor});
    input.dataset.quantity = id;
    input.setAttribute('aria-label', `Участников: ${event.title}`);
    label.append(input);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove-event';
    remove.dataset.remove = id;
    remove.textContent = 'Убрать';
    remove.setAttribute('aria-label', `Убрать ${event.title}`);
    li.append(description, label, remove);
    return li;
  }

  function renderSelection() {
    [...selection.keys()].forEach(id => { if (!available(id)) selection.delete(id); });
    for (const [selector, prefix] of [['#selection-list', 'route'], ['#request-selection', 'request']]) {
      const list = $(selector);
      list.replaceChildren(...[...selection].map(([id, count]) => makeSelectionItem(id, count, prefix)));
      list.hidden = selection.size === 0;
    }
    $('#selection-panel').hidden = selection.size === 0;
    $('#selection-bar').hidden = selection.size === 0;
    $('#selection-count').textContent = `В вашем маршруте: ${selection.size}`;
    document.body.classList.toggle('has-selection', selection.size > 0);
    document.querySelectorAll('[data-add]').forEach(button => {
      const selected = selection.has(button.dataset.add);
      button.textContent = selected ? 'В маршруте ✓' : 'Добавить к маршруту';
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    $('#interest-required').hidden = selection.size > 0;
    form.elements.message.required = selection.size === 0;
    saveSelection();
    hideResult();
  }

  function filterEvents() {
    let shown = 0;
    const query = normalize(filters.search.value.trim());
    document.querySelectorAll('[data-event-id]').forEach(card => {
      const event = events.get(card.dataset.eventId);
      const searchText = normalize([event.title, event.city, event.country, event.categoryLabel, event.description].join(' '));
      const visible = available(event.id) &&
        (filters.city.value === 'all' || event.cityKey === filters.city.value) &&
        (filters.category.value === 'all' || event.category === filters.category.value) &&
        (filters.month.value === 'all' || (event.start.slice(0, 7) <= filters.month.value && event.end.slice(0, 7) >= filters.month.value)) &&
        (!query || searchText.includes(query));
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    const total = [...events.values()].filter(event => available(event.id)).length;
    $('#filter-count').textContent = `Мероприятий: ${shown} из ${total}`;
    $('#events-empty').hidden = shown > 0;
  }
  Object.values(filters).forEach(input => input.addEventListener(input.type === 'search' ? 'input' : 'change', filterEvents));
  $('#reset-filters').addEventListener('click', () => {
    filters.city.value = filters.category.value = filters.month.value = 'all';
    filters.search.value = '';
    filterEvents();
    filters.search.focus();
  });

  function openRequest(trigger) {
    returnFocus = trigger;
    renderSelection();
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    form.elements.full_name.focus();
  }
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    if (returnFocus && document.contains(returnFocus) && !returnFocus.closest('[hidden]')) returnFocus.focus();
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  $('.dialog-close').addEventListener('click', () => dialog.close());
  $('.dialog-cancel').addEventListener('click', () => dialog.close());

  document.addEventListener('click', event => {
    const add = event.target.closest('[data-add]');
    const quick = event.target.closest('[data-request]');
    const open = event.target.closest('[data-open-request]');
    const remove = event.target.closest('[data-remove]');
    const ics = event.target.closest('[data-ics]');
    if (add && available(add.dataset.add)) {
      const id = add.dataset.add;
      // Adding is idempotent: adjust quantities in the route, remove with the explicit button.
      if (!selection.has(id)) selection.set(id, 1);
      renderSelection();
      $('#selection-status').textContent = `В маршруте: ${events.get(id).title}.`;
    } else if (quick && available(quick.dataset.request)) {
      if (!selection.has(quick.dataset.request)) selection.set(quick.dataset.request, 1);
      openRequest(quick);
    } else if (open) openRequest(open);
    else if (remove) {
      const id = remove.dataset.remove;
      const list = remove.closest('ul');
      selection.delete(id);
      renderSelection();
      $('#selection-status').textContent = `Убрано из маршрута: ${events.get(id).title}.`;
      // Re-rendered controls must not strand keyboard focus on the document body.
      if (dialog.open) (list.querySelector('input') || form.elements.full_name).focus();
      else if (selection.size) $('#selection-list').querySelector('input').focus();
      else document.querySelector(`[data-add="${id}"]`).focus();
    } else if (ics) downloadCalendar(events.get(ics.dataset.ics));
  });
  function updateQuantity(input, normalizeDisplay) {
    const count = quantity(input.value);
    selection.set(input.dataset.quantity, count);
    if (normalizeDisplay) input.value = String(count);
    document.querySelectorAll('[data-quantity]').forEach(other => {
      if (other !== input && other.dataset.quantity === input.dataset.quantity) other.value = String(count);
    });
    saveSelection();
    hideResult();
  }
  document.addEventListener('input', event => {
    if (event.target.matches('[data-quantity]')) updateQuantity(event.target, false);
  });
  document.addEventListener('focusout', event => {
    if (event.target.matches('[data-quantity]')) updateQuantity(event.target, true);
  });

  const menuButton = $('.nav-toggle');
  const nav = $('#main-nav');
  function closeMenu() {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Открыть меню');
  }
  menuButton.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menuButton.focus(); } });

  function fieldError(name, errorId, message) {
    const input = form.elements[name];
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    document.getElementById(errorId).textContent = message;
    return message ? input : null;
  }
  form.addEventListener('input', () => {
    hideResult();
    // Errors clear as the user edits; submission revalidates the entire request.
    [...form.elements].forEach(input => input.removeAttribute?.('aria-invalid'));
    form.querySelectorAll('.form-error').forEach(error => { error.textContent = ''; });
  });
  form.addEventListener('submit', event => {
    event.preventDefault(); // No automatic endpoint. CSP rejects external form POSTs.
    document.querySelectorAll('#request-selection [data-quantity]').forEach(input => updateQuantity(input, true));
    hideResult();
    const value = name => form.elements[name].value.trim();
    const problems = [
      fieldError('full_name', 'error-name', value('full_name').length < 2 ? 'Укажите имя и фамилию.' : ''),
      fieldError('email', 'error-email', !value('email') || !form.elements.email.validity.valid ? 'Укажите корректный email.' : ''),
      fieldError('company', 'error-company', value('company').length < 2 ? 'Укажите название компании.' : ''),
      fieldError('message', 'error-message', !selection.size && value('message').length < 5 ? 'Опишите выставку, отрасль или задачу для подбора.' : '')
    ].filter(Boolean);
    if (problems.length) {
      $('#form-status').textContent = 'Проверьте отмеченные поля. Запрос не подготовлен и не отправлен.';
      problems[0].focus();
      return;
    }
    const lines = [
      'Здравствуйте! Прошу уточнить условия организации посещения выставок.',
      '', 'Контакт для ответа:', `Имя: ${value('full_name')}`, `Компания: ${value('company')}`, `Email: ${value('email')}`
    ];
    if (value('messenger')) lines.push(`Мессенджер: ${value('messenger')}`);
    lines.push('', 'Интересующие выставки:');
    if (selection.size) [...selection].forEach(([id, count]) => {
      const entry = events.get(id);
      lines.push(`• ${entry.title} | ${entry.dates} | ${entry.city} | участников: ${count}`, `  Источник: ${entry.sourceUrl}`);
    });
    else lines.push('Индивидуальный подбор по задаче ниже.');
    if (value('message')) lines.push('', `Задача и пожелания: ${value('message')}`);
    lines.push('', 'Прошу подтвердить доступность регистрации, состав услуги и стоимость до оплаты.', '', 'Этот текст подготовлен локально. Он не является заказом, бронью, счётом или подтверждением оплаты.');
    preparedText = lines.join('\n');
    $('#request-preview').textContent = preparedText;
    $('#request-result').hidden = false;
    $('#email-request').href = `mailto:wet4kg@gmail.com?subject=${encodeURIComponent('Выставки 2027 — запрос на посещение')}&body=${encodeURIComponent(preparedText)}`;
    $('#form-status').textContent = 'Текст готов на этом устройстве. Данные никуда не отправлялись.';
    $('#result-title').focus();
  });

  function downloadText(text, filename, type) {
    const url = URL.createObjectURL(new Blob([text], {type}));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  $('#download-request').addEventListener('click', () => {
    if (preparedText) downloadText('\ufeff' + preparedText, 'west-east-request-2027.txt', 'text/plain;charset=utf-8');
  });
  function escapeIcs(text) { return text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,'); }
  function foldIcs(line) {
    let result = '', length = 0;
    for (const char of line) {
      const bytes = new TextEncoder().encode(char).length;
      if (length + bytes > 74) { result += '\r\n '; length = 1; }
      result += char; length += bytes;
    }
    return result;
  }
  function downloadCalendar(entry) {
    const end = new Date(entry.end + 'T00:00:00Z');
    end.setUTCDate(end.getUTCDate() + 1); // RFC 5545: end of an all-day event is exclusive.
    const date = value => value.replace(/-/g, '');
    const lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//WEST-EAST TRADE//Exhibitions//RU', 'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT', `UID:${entry.id}@wet-kyrgyzstan.com`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
      `DTSTART;VALUE=DATE:${date(entry.start)}`, `DTEND;VALUE=DATE:${date(end.toISOString().slice(0, 10))}`,
      `SUMMARY:${escapeIcs(entry.title)}`, `LOCATION:${escapeIcs(entry.venue + ', ' + entry.city)}`,
      `DESCRIPTION:${escapeIcs('Даты опубликованы организатором. Условия входа уточняются отдельно. Источник: ' + entry.sourceUrl)}`,
      `URL:${entry.sourceUrl}`, 'END:VEVENT', 'END:VCALENDAR'
    ];
    downloadText(lines.map(foldIcs).join('\r\n') + '\r\n', entry.id + '.ics', 'text/calendar;charset=utf-8');
    $('#selection-status').textContent = `Подготовлен файл календаря для ${entry.title}. Это не регистрация и не билет.`;
  }

  renderSelection();
  filterEvents();
})();
