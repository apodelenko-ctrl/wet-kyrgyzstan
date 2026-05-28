/* WEST-EAST CLOUD — front-end (catalog, i18n, cart, invoice) */
(function () {
  'use strict';

  /* ---------- Catalog ---------- */
  // All prices base in RUB / month. Hourly = monthly / 730.
  // BYN, CNY, USDT computed via fxRates.
  var CATALOG = [
    { id: 'h200-hk-8x', model: 'h200', region: 'hk', count: 8, status: 'low',
      name: 'NVIDIA H200 141GB',  sub: '8× SXM5 · NVLink 900 GB/s',
      cpu: 192, ram: '2 TB ECC', vram: '1128 GB HBM3e', net: 'IB NDR 400G',
      priceRub: 2890000, tag: { en: 'Flagship', ru: 'Флагман', zh: '旗舰' } },

    { id: 'h100-hk-8x', model: 'h100', region: 'hk', count: 8, status: 'ok',
      name: 'NVIDIA H100 80GB', sub: '8× SXM5 · HGX',
      cpu: 128, ram: '2 TB ECC', vram: '640 GB HBM3', net: 'IB NDR 400G',
      priceRub: 1450000 },

    { id: 'h100-sz-4x', model: 'h100', region: 'sz', count: 4, status: 'low',
      name: 'NVIDIA H100 80GB', sub: '4× SXM5',
      cpu: 64, ram: '1 TB ECC', vram: '320 GB HBM3', net: 'RoCE 200G',
      priceRub: 780000 },

    { id: 'h100-hk-2x', model: 'h100', region: 'hk', count: 2, status: 'ok',
      name: 'NVIDIA H100 80GB', sub: '2× PCIe Gen5',
      cpu: 32, ram: '512 GB ECC', vram: '160 GB HBM3', net: '100 GbE',
      priceRub: 420000 },

    { id: 'l40s-hk-8x', model: 'l40s', region: 'hk', count: 8, status: 'ok',
      name: 'NVIDIA L40S 48GB', sub: '8× Ada · inference',
      cpu: 112, ram: '1 TB ECC', vram: '384 GB GDDR6', net: '200 GbE',
      priceRub: 950000 },

    { id: 'l40s-sz-4x', model: 'l40s', region: 'sz', count: 4, status: 'ok',
      name: 'NVIDIA L40S 48GB', sub: '4× Ada',
      cpu: 56, ram: '512 GB ECC', vram: '192 GB GDDR6', net: '100 GbE',
      priceRub: 510000 },

    { id: 'a100-hk-8x', model: 'a100', region: 'hk', count: 8, status: 'ok',
      name: 'NVIDIA A100 80GB', sub: '8× SXM4 · HGX',
      cpu: 96, ram: '1 TB ECC', vram: '640 GB HBM2e', net: 'IB HDR 200G',
      priceRub: 980000 },

    { id: 'a100-sz-4x', model: 'a100', region: 'sz', count: 4, status: 'ok',
      name: 'NVIDIA A100 80GB', sub: '4× SXM4',
      cpu: 48, ram: '512 GB ECC', vram: '320 GB HBM2e', net: 'RoCE 100G',
      priceRub: 520000 },

    { id: 'a100-hk-2x', model: 'a100', region: 'hk', count: 2, status: 'ok',
      name: 'NVIDIA A100 80GB', sub: '2× PCIe',
      cpu: 24, ram: '256 GB ECC', vram: '160 GB HBM2e', net: '50 GbE',
      priceRub: 290000 },

    { id: 'a100-40-sz-4x', model: 'a100', region: 'sz', count: 4, status: 'ok',
      name: 'NVIDIA A100 40GB', sub: '4× PCIe · budget A100',
      cpu: 32, ram: '256 GB ECC', vram: '160 GB HBM2', net: '50 GbE',
      priceRub: 350000 },

    { id: 'rtx6000-hk-4x', model: 'rtx6000', region: 'hk', count: 4, status: 'ok',
      name: 'RTX 6000 Ada 48GB', sub: '4× · pro graphics + ML',
      cpu: 32, ram: '384 GB', vram: '192 GB GDDR6', net: '50 GbE',
      priceRub: 280000 },

    { id: 'a6000-sz-4x', model: 'a6000', region: 'sz', count: 4, status: 'ok',
      name: 'RTX A6000 48GB', sub: '4× · render / VFX',
      cpu: 24, ram: '256 GB', vram: '192 GB GDDR6', net: '25 GbE',
      priceRub: 230000 },

    { id: '4090-hk-8x', model: '4090', region: 'hk', count: 8, status: 'low',
      name: 'RTX 4090 24GB', sub: '8× · cost-effective training',
      cpu: 64, ram: '512 GB', vram: '192 GB GDDR6X', net: '100 GbE',
      priceRub: 720000 },

    { id: '4090-hk-4x', model: '4090', region: 'hk', count: 4, status: 'ok',
      name: 'RTX 4090 24GB', sub: '4× · render / SDXL',
      cpu: 32, ram: '256 GB', vram: '96 GB GDDR6X', net: '25 GbE',
      priceRub: 380000 },

    { id: '4090-sz-2x', model: '4090', region: 'sz', count: 2, status: 'no',
      name: 'RTX 4090 24GB', sub: '2× · batch inference',
      cpu: 16, ram: '128 GB', vram: '48 GB GDDR6X', net: '10 GbE',
      priceRub: 210000 },

    { id: 'v100-sz-8x', model: 'v100', region: 'sz', count: 8, status: 'ok',
      name: 'Tesla V100 32GB', sub: '8× SXM2 · legacy',
      cpu: 56, ram: '512 GB ECC', vram: '256 GB HBM2', net: 'IB EDR 100G',
      priceRub: 180000 },

    { id: 't4-hk-4x', model: 't4', region: 'hk', count: 4, status: 'ok',
      name: 'Tesla T4 16GB', sub: '4× · low-cost inference',
      cpu: 16, ram: '128 GB', vram: '64 GB GDDR6', net: '10 GbE',
      priceRub: 95000 }
  ];

  // FX rates relative to RUB. Realistic mid-market approximations for display only.
  var FX = {
    RUB:  { rate: 1,        sym: '₽',  short: 'RUB',  locale: 'ru-RU' },
    BYN:  { rate: 1 / 30,   sym: 'Br', short: 'BYN',  locale: 'ru-RU' },
    CNY:  { rate: 1 / 12,   sym: '¥',  short: 'CNY',  locale: 'zh-CN' },
    USDT: { rate: 1 / 92,   sym: '$',  short: 'USDT', locale: 'en-US' }
  };

  /* ---------- i18n ---------- */
  var I18N = {
    en: {
      'nav.parent': 'GPU subsite', 'nav.pricing': 'Pricing', 'nav.regions': 'Regions',
      'nav.bench': 'Benchmarks', 'nav.trust': 'Trust & SLA', 'nav.faq': 'FAQ', 'nav.cart': 'Cart',
      'auth.signIn': 'Sign in',
      'hero.status': 'All regions operational · 99.97% rolling 30-day uptime',
      'hero.h1': "GPU servers, racked in Asia.<br>Invoiced from Bishkek.",
      'hero.sub': "Bare-metal and reserved instances on H200, H100, L40S, A100, RTX 4090. Two Tier-3 sites in Hong Kong and Shenzhen, direct InfiniBand fabric, fixed monthly rate. We rack hardware via Alibaba Cloud and Tencent Cloud, you sign one contract with a Kyrgyz LLC and pay in RUB, BYN, CNY or USDT.",
      'hero.ctaPrimary': 'Browse the catalog', 'hero.ctaSecondary': 'Open B2B account',
      'stats.gpus': 'GPUs deployed', 'stats.uptime': 'SLA uptime',
      'stats.deploy': 'Median provisioning', 'stats.min': 'min',
      'stats.currencies': 'Settlement currencies',
      'why.eyebrow': 'Why we exist',
      'why.h2': "Western models on Asian silicon, with a contract that clears in Moscow and Minsk.",
      'why.lede': "We are not a reseller landing on top of someone else's API. We hold capacity contracts with two hyperscalers in Greater China, rack the boxes ourselves, and bill through a Kyrgyz LLC that your accountant has actually heard of. No card declines, no \"we'll get back to you\" sales loop.",
      'why.b1': 'Fixed monthly rate locked in your cart — no surprise overages.',
      'why.b2': 'Wire transfer in RUB, BYN, CNY or USDT, closing docs the next business day.',
      'why.b3': 'SSH and Jupyter access in under an hour after payment lands.',
      'why.b4': 'Direct line to a sysadmin on Telegram, not a ticket queue.',
      'why.caption': 'our reference platform for H100 / H200 nodes',
      'pricing.eyebrow': 'Catalog', 'pricing.h2': "Pick a SKU. The rate is what you'll pay.",
      'pricing.lede': 'Sixteen production SKUs across two regions. Filter, add to cart, and the invoice generates against the rate visible right now — not a quote we\'ll send "shortly".',
      'pricing.note': 'Hourly rate = monthly ÷ 730. The rate in your cart is the rate on the invoice. Provisioning starts when payment clears — typically within one business day for SWIFT, minutes for USDT (TRC-20).',
      'flow.s1': 'Filter the catalog', 'flow.s2': 'Add SKU to cart',
      'flow.s3': 'Sign in as a legal entity', 'flow.s4': 'Generate & pay invoice',
      'filter.model': 'GPU model', 'filter.allModels': 'All models',
      'filter.region': 'Region', 'filter.allRegions': 'All regions',
      'filter.gpus': 'GPU count', 'filter.any': 'Any',
      'filter.avail': 'Availability', 'filter.anyStatus': 'Any', 'filter.inStock': 'In stock only',
      'filter.skus': 'SKUs shown',
      'th.config': 'Configuration', 'th.region': 'Region', 'th.cpu': 'vCPU',
      'th.ram': 'RAM', 'th.vram': 'GPU mem', 'th.net': 'Net', 'th.price': 'Price / month',
      'th.status': 'Status',
      'status.ok': 'In stock', 'status.low': 'Limited', 'status.no': 'Out of stock',
      'btn.add': 'Add to cart', 'btn.unavailable': 'Unavailable',
      'regions.eyebrow': 'Footprint', 'regions.h2': 'Two regions, one fabric.',
      'regions.lede': 'Both sites carry the same SKU families, so you can grow or migrate workloads without re-architecting. RTT to Moscow is measured monthly from a probe in each facility.',
      'regions.hk': 'Hong Kong', 'regions.sz': 'Shenzhen',
      'regions.tier': 'Facility', 'regions.power': 'Power', 'regions.fabric': 'Fabric',
      'regions.peering': 'Peering', 'regions.rtt': 'RTT to Moscow',
      'bench.eyebrow': 'Benchmarks', 'bench.h2': 'Throughput on Llama-3 70B fine-tune.',
      'bench.lede': 'Tokens per second on a single node, batch 16, sequence 4096, FP8 where supported. Numbers are from our own runs against a reference dataset, not vendor slides.',
      'bench.foot': 'Reference: <span class="gpu-mono">torch 2.3 · transformers 4.41 · FA-2 · BF16/FP8</span>. Raw logs available on request.',
      'cases.eyebrow': 'What teams actually run on us',
      'cases.h2': 'Six workloads, one billing entity.',
      'cases.c1.t': 'LLM fine-tuning', 'cases.c1.b': 'QLoRA on 70B-class models, full FT on 7–13B. NVLink within node, InfiniBand between nodes.',
      'cases.c2.t': 'Inference at scale', 'cases.c2.b': 'vLLM / TGI behind your own gateway. L40S is the price/perf pick for 7–13B serving.',
      'cases.c3.t': 'Computer vision', 'cases.c3.b': 'Detection, tracking, video pipelines. CUDA / TensorRT image pre-built on request.',
      'cases.c4.t': 'Generative media', 'cases.c4.b': 'SDXL / Flux / video-diffusion render farms. 4090 wins on cost per frame.',
      'cases.c5.t': 'Scientific compute', 'cases.c5.b': 'Molecular dynamics, CFD, genomics. FP64-heavy jobs land on A100 / H100 PCIe nodes.',
      'cases.c6.t': 'Render & VFX', 'cases.c6.b': 'Blender, Houdini, Unreal frame servers. A6000 for VRAM-hungry scenes.',
      'trust.eyebrow': 'Trust & SLA', 'trust.h2': 'The boring details that matter at month-end.',
      'trust.t1': 'Uptime SLA', 'trust.b1': 'Power, network and hypervisor availability, measured per calendar month. Credits apply automatically against the next invoice.',
      'trust.t2': 'Closing docs', 'trust.b2': 'Акт + счёт-фактура / invoice + statement sent the next business day after payment lands.', 'trust.bdays': ' bd',
      'trust.t3': 'Compliance', 'trust.b3': 'Upstream facilities certified ISO/IEC 27001 and 27017. We sign DPA on request before provisioning.',
      'trust.t4': 'Counter-party',
      'faq.eyebrow': 'Straight answers', 'faq.h2': 'FAQ',
      'faq.q1': 'How does payment actually work for a Russian or Belarusian LLC?',
      'faq.a1': "You wire RUB or BYN to a Kyrgyz LLC account. We hold the contract directly with Alibaba Cloud / Tencent Cloud and settle on our side in CNY. Closing documents are issued in your currency, with our Kyrgyz registration on them. No card processors, no offshore wrappers.",
      'faq.q2': 'How long from invoice paid to SSH?',
      'faq.a2': 'USDT (TRC-20) — minutes. SWIFT in RUB / CNY — same business day if before 14:00 Moscow, otherwise next morning. We notify you on Telegram the moment funds land, then push credentials within 30–60 minutes.',
      'faq.q3': 'Can I bring my own container / OS image?',
      'faq.a3': "Yes. We ship Ubuntu 22.04 with CUDA 12.4, cuDNN, NCCL and the usual ML stack pre-baked, but you can upload a custom image (Docker, qcow2, ISO) and we'll boot it on bare metal.",
      'faq.q4': 'What if I need to scale mid-month?',
      'faq.a4': 'Add SKUs to the cart, generate a top-up invoice — we pro-rate to the existing billing cycle so everything aligns. Downgrades take effect from the next cycle.',
      'faq.q5': 'Do you do reserved capacity or 12-month contracts?',
      'faq.a5': 'Yes, on H200 and H100 8× we discount roughly 10% for a 12-month reservation and 18% for 24 months. Email <a href="mailto:wet4kg@gmail.com">wet4kg@gmail.com</a> with your spec.',
      'faq.q6': 'Trial or pilot?',
      'faq.a6': "After KYC we can give a verified legal entity a 24-hour pilot on a 4090 or A100 node. We don't do free credits for individuals — sorry.",
      'footer.tag': 'GPU servers in Asia, billed from Bishkek.',
      'footer.product': 'Product', 'footer.account': 'Account', 'footer.entity': 'Counter-party',
      'footer.cart': 'Open cart',
      'cart.title': 'Your cart', 'cart.empty': 'Cart is empty. Pick a SKU from the catalog.',
      'cart.total': 'Total / month', 'cart.generate': 'Generate invoice', 'cart.continue': 'Keep browsing',
      'cart.month': '1 month',
      'auth.title': 'Sign in as a legal entity',
      'auth.lead': 'We need three fields to draw the invoice. No password, no email confirmation loop — this is a B2B counter, not a consumer signup.',
      'auth.email': 'Work email', 'auth.company': 'Company (legal name)',
      'auth.inn': 'Tax ID / ИНН (optional)', 'auth.submit': 'Sign in',
      'auth.signOut': 'Sign out',
      'inv.title': 'Invoice generated',
      'inv.lead': 'Pay against the reference number below. Provisioning starts the moment the wire clears.',
      'inv.print': 'Print / Save PDF', 'inv.close': 'Close',
      'inv.date': 'Date', 'inv.billTo': 'Bill to', 'inv.supplier': 'Supplier',
      'inv.term': 'Term', 'inv.amount': 'Amount', 'inv.config': 'Configuration',
      'inv.totalDue': 'Total due',
      'inv.payment': 'Payment: bank transfer in RUB / BYN / CNY or USDT (TRC-20). Reference:',
      'inv.provStart': '. Provisioning starts after payment confirmation.',
      'toast.added': 'Added to cart',
      'toast.dup': 'Already in cart',
      'toast.signedIn': 'Signed in as',
      'toast.signedOut': 'Signed out',
      'toast.invGen': 'Invoice generated'
    },
    ru: {
      'nav.parent': 'GPU-сайт', 'nav.pricing': 'Тарифы', 'nav.regions': 'Регионы',
      'nav.bench': 'Бенчмарки', 'nav.trust': 'SLA и доверие', 'nav.faq': 'FAQ', 'nav.cart': 'Корзина',
      'auth.signIn': 'Войти',
      'hero.status': 'Все регионы работают · аптайм 99.97% за 30 дней',
      'hero.h1': 'GPU-серверы в Азии.<br>Счёт из Бишкека.',
      'hero.sub': 'Bare-metal и зарезервированные инстансы на H200, H100, L40S, A100, RTX 4090. Две площадки Tier-3 в Гонконге и Шэньчжэне, прямой фабрикой InfiniBand, фиксированная месячная ставка. Железо арендуем через Alibaba Cloud и Tencent Cloud, договор у вас один — с кыргызской ОсОО, оплата в RUB, BYN, CNY или USDT.',
      'hero.ctaPrimary': 'Открыть каталог', 'hero.ctaSecondary': 'Войти в B2B-кабинет',
      'stats.gpus': 'GPU развёрнуто', 'stats.uptime': 'SLA аптайм',
      'stats.deploy': 'Медианное развёртывание', 'stats.min': 'мин',
      'stats.currencies': 'Валют расчёта',
      'why.eyebrow': 'Зачем мы',
      'why.h2': 'Западные модели на азиатском железе, договор закрывается в Москве и Минске.',
      'why.lede': 'Мы не реселлер поверх чужого API. У нас прямые контракты на capacity с двумя гиперскейлерами Большого Китая, железо racку́ем сами, счёт выставляет кыргызская ОсОО — её ваш бухгалтер уже видел. Никаких отказов по картам и циклов «вернёмся с предложением».',
      'why.b1': 'Месячная ставка зафиксирована в корзине — никаких сюрпризов сверху.',
      'why.b2': 'Банковский перевод в RUB, BYN, CNY или USDT, закрывашки — на следующий рабочий день.',
      'why.b3': 'SSH и Jupyter за час после поступления оплаты.',
      'why.b4': 'Связь с админом в Telegram, а не очередь тикетов.',
      'why.caption': 'наша референсная платформа под H100 / H200',
      'pricing.eyebrow': 'Каталог', 'pricing.h2': 'Выберите SKU. Цена — это то, что вы заплатите.',
      'pricing.lede': 'Шестнадцать боевых SKU в двух регионах. Отфильтруйте, положите в корзину — счёт сформируется по ставке, которую вы видите прямо сейчас.',
      'pricing.note': 'Часовая ставка = месячная ÷ 730. Ставка в корзине — это ставка в счёте. Provisioning стартует, как только пришла оплата: по SWIFT обычно в течение рабочего дня, по USDT (TRC-20) — за минуты.',
      'flow.s1': 'Отфильтровать каталог', 'flow.s2': 'Положить SKU в корзину',
      'flow.s3': 'Войти как юрлицо', 'flow.s4': 'Сформировать счёт',
      'filter.model': 'Модель GPU', 'filter.allModels': 'Все модели',
      'filter.region': 'Регион', 'filter.allRegions': 'Все регионы',
      'filter.gpus': 'Кол-во GPU', 'filter.any': 'Любое',
      'filter.avail': 'Наличие', 'filter.anyStatus': 'Любое', 'filter.inStock': 'Только в наличии',
      'filter.skus': 'SKU показано',
      'th.config': 'Конфигурация', 'th.region': 'Регион', 'th.cpu': 'vCPU',
      'th.ram': 'RAM', 'th.vram': 'GPU память', 'th.net': 'Сеть', 'th.price': 'Цена / мес',
      'th.status': 'Статус',
      'status.ok': 'В наличии', 'status.low': 'Ограничено', 'status.no': 'Нет в наличии',
      'btn.add': 'В корзину', 'btn.unavailable': 'Недоступно',
      'regions.eyebrow': 'География', 'regions.h2': 'Два региона, единая фабрика.',
      'regions.lede': 'Оба сайта несут одинаковые семейства SKU — растёте или мигрируете без переархитектуры. RTT до Москвы меряем ежемесячно с локального пробника.',
      'regions.hk': 'Гонконг', 'regions.sz': 'Шэньчжэнь',
      'regions.tier': 'Площадка', 'regions.power': 'Электропитание', 'regions.fabric': 'Фабрика',
      'regions.peering': 'Пиринг', 'regions.rtt': 'RTT до Москвы',
      'bench.eyebrow': 'Бенчмарки', 'bench.h2': 'Throughput на дообучении Llama-3 70B.',
      'bench.lede': 'Токенов в секунду на одной ноде, batch 16, последовательность 4096, FP8 где поддерживается. Цифры из наших прогонов на референсном датасете, а не из вендорских слайдов.',
      'bench.foot': 'Стек: <span class="gpu-mono">torch 2.3 · transformers 4.41 · FA-2 · BF16/FP8</span>. Сырые логи — по запросу.',
      'cases.eyebrow': 'Что на нас реально гоняют',
      'cases.h2': 'Шесть нагрузок, одно юрлицо в счёте.',
      'cases.c1.t': 'Fine-tuning LLM', 'cases.c1.b': 'QLoRA на 70B-классе, полный FT на 7–13B. NVLink внутри ноды, InfiniBand между.',
      'cases.c2.t': 'Inference в проде', 'cases.c2.b': 'vLLM / TGI за вашим gateway. L40S — лучший price/perf на 7–13B сервинге.',
      'cases.c3.t': 'Computer vision', 'cases.c3.b': 'Детекция, трекинг, видеопайплайны. CUDA / TensorRT-образ соберём заранее.',
      'cases.c4.t': 'Генеративные медиа', 'cases.c4.b': 'SDXL / Flux / video-diffusion. 4090 выигрывает по цене за кадр.',
      'cases.c5.t': 'Научные расчёты', 'cases.c5.b': 'Молекулярная динамика, CFD, геномика. FP64-задачи — на A100 / H100 PCIe.',
      'cases.c6.t': 'Рендер и VFX', 'cases.c6.b': 'Blender, Houdini, Unreal frame servers. A6000 — на сцены, голодные до VRAM.',
      'trust.eyebrow': 'SLA и доверие', 'trust.h2': 'Скучные детали, которые важны в конце месяца.',
      'trust.t1': 'Аптайм SLA', 'trust.b1': 'Питание, сеть, гипервизор — по календарному месяцу. Кредиты применяются автоматом в следующем счёте.',
      'trust.t2': 'Закрывашки', 'trust.b2': 'Акт + счёт-фактура + выписка — на следующий рабочий день после поступления оплаты.', 'trust.bdays': ' р.д.',
      'trust.t3': 'Compliance', 'trust.b3': 'Площадки сертифицированы по ISO/IEC 27001 и 27017. DPA подпишем до начала provisioning.',
      'trust.t4': 'Контрагент',
      'faq.eyebrow': 'Прямые ответы', 'faq.h2': 'Вопросы и ответы',
      'faq.q1': 'Как именно оплачивает российское или белорусское ООО?',
      'faq.a1': 'Делаете перевод в RUB или BYN на счёт кыргызской ОсОО. У нас прямой договор с Alibaba Cloud / Tencent Cloud, у себя расчёты в CNY. Закрывающие документы — в вашей валюте, с нашими кыргызскими реквизитами. Никаких карточных эквайеров и оффшорных прокладок.',
      'faq.q2': 'Через сколько после оплаты будет SSH?',
      'faq.a2': 'USDT (TRC-20) — минуты. SWIFT в RUB / CNY — в тот же рабочий день, если до 14:00 по Москве, иначе на следующее утро. Сообщаем в Telegram сразу после поступления и в течение 30–60 минут отдаём доступы.',
      'faq.q3': 'Можно загрузить свой контейнер или OS-образ?',
      'faq.a3': 'Да. По умолчанию Ubuntu 22.04 с CUDA 12.4, cuDNN, NCCL и обычным ML-стеком, но вы можете загрузить свой образ (Docker, qcow2, ISO) — поднимем на bare metal.',
      'faq.q4': 'Что если надо доскейлиться посреди месяца?',
      'faq.a4': 'Кладёте SKU в корзину, генерите доп-счёт — pro-rate к текущему биллинговому циклу. Даунгрейд вступает в силу со следующего цикла.',
      'faq.q5': 'Есть зарезервированная capacity или 12-месячные контракты?',
      'faq.a5': 'Да, на H200 и H100 8× даём около −10% за резерв на 12 месяцев и −18% на 24. Пишите спецификацию на <a href="mailto:wet4kg@gmail.com">wet4kg@gmail.com</a>.',
      'faq.q6': 'Пилот или тест?',
      'faq.a6': 'После KYC верифицированному юрлицу даём 24-часовой пилот на 4090 или A100. Бесплатных кредитов для физлиц нет — извините.',
      'footer.tag': 'GPU-серверы в Азии, счёт из Бишкека.',
      'footer.product': 'Продукт', 'footer.account': 'Аккаунт', 'footer.entity': 'Контрагент',
      'footer.cart': 'Открыть корзину',
      'cart.title': 'Корзина', 'cart.empty': 'Корзина пуста. Выберите SKU в каталоге.',
      'cart.total': 'Итого / месяц', 'cart.generate': 'Сформировать счёт', 'cart.continue': 'Продолжить выбор',
      'cart.month': '1 месяц',
      'auth.title': 'Войти как юрлицо',
      'auth.lead': 'Три поля — и счёт готов. Без пароля и подтверждения по email. Это B2B-стойка, а не consumer-регистрация.',
      'auth.email': 'Рабочий email', 'auth.company': 'Компания (юр. название)',
      'auth.inn': 'ИНН / Tax ID (необязательно)', 'auth.submit': 'Войти',
      'auth.signOut': 'Выйти',
      'inv.title': 'Счёт сформирован',
      'inv.lead': 'Оплачивайте по номеру ниже. Provisioning стартует, как только пришла оплата.',
      'inv.print': 'Печать / PDF', 'inv.close': 'Закрыть',
      'inv.date': 'Дата', 'inv.billTo': 'Плательщик', 'inv.supplier': 'Поставщик',
      'inv.term': 'Срок', 'inv.amount': 'Сумма', 'inv.config': 'Конфигурация',
      'inv.totalDue': 'К оплате',
      'inv.payment': 'Оплата: банковский перевод в RUB / BYN / CNY или USDT (TRC-20). Назначение:',
      'inv.provStart': '. Provisioning начнётся после подтверждения оплаты.',
      'toast.added': 'Добавлено в корзину',
      'toast.dup': 'Уже в корзине',
      'toast.signedIn': 'Вход выполнен:',
      'toast.signedOut': 'Выход выполнен',
      'toast.invGen': 'Счёт сформирован'
    },
    zh: {
      'nav.parent': 'GPU 子站', 'nav.pricing': '价格', 'nav.regions': '区域',
      'nav.bench': '基准测试', 'nav.trust': '信任 & SLA', 'nav.faq': '常见问题', 'nav.cart': '购物车',
      'auth.signIn': '登录',
      'hero.status': '所有区域正常运行 · 30天滚动可用率 99.97%',
      'hero.h1': '亚洲机柜内的 GPU 服务器。<br>比什凯克开具发票。',
      'hero.sub': '提供 H200、H100、L40S、A100、RTX 4090 的裸金属和预留实例。两个 Tier-3 站点位于香港和深圳,直连 InfiniBand 网络,月度固定费率。我们通过阿里云和腾讯云租用硬件,您与吉尔吉斯斯坦 LLC 签一份合同,可用 RUB、BYN、CNY 或 USDT 支付。',
      'hero.ctaPrimary': '浏览目录', 'hero.ctaSecondary': '开通 B2B 账户',
      'stats.gpus': '已部署 GPU', 'stats.uptime': 'SLA 可用率',
      'stats.deploy': '中位部署时间', 'stats.min': '分钟',
      'stats.currencies': '结算货币',
      'why.eyebrow': '我们存在的理由',
      'why.h2': '亚洲算力跑西方模型,合同在莫斯科与明斯克轻松结清。',
      'why.lede': '我们不是在别人 API 上贴牌的代理商。我们与大中华区两家超大规模云厂商直接持有算力合同,自己上架机器,通过您的会计已知的吉尔吉斯斯坦 LLC 开票。没有刷卡被拒,没有"稍后回复"的销售循环。',
      'why.b1': '购物车锁定月度固定费率 — 不会突然超支。',
      'why.b2': '电汇 RUB、BYN、CNY 或 USDT,次个工作日交付结算文件。',
      'why.b3': '付款到账后一小时内开通 SSH 与 Jupyter。',
      'why.b4': 'Telegram 直连系统管理员,而非排队工单。',
      'why.caption': '我们 H100 / H200 节点的参考平台',
      'pricing.eyebrow': '目录', 'pricing.h2': '选择 SKU,价格即您支付金额。',
      'pricing.lede': '两个区域共 16 款生产级 SKU。筛选后加入购物车,发票按您当前看到的费率生成。',
      'pricing.note': '小时费率 = 月费 ÷ 730。购物车中的费率就是发票上的费率。Provisioning 在付款到账后开始 — SWIFT 通常一个工作日内,USDT(TRC-20)分钟级。',
      'flow.s1': '筛选目录', 'flow.s2': '加入购物车',
      'flow.s3': '法人登录', 'flow.s4': '生成并支付发票',
      'filter.model': 'GPU 型号', 'filter.allModels': '所有型号',
      'filter.region': '区域', 'filter.allRegions': '所有区域',
      'filter.gpus': 'GPU 数量', 'filter.any': '任意',
      'filter.avail': '可用性', 'filter.anyStatus': '任意', 'filter.inStock': '仅有货',
      'filter.skus': '个 SKU',
      'th.config': '配置', 'th.region': '区域', 'th.cpu': 'vCPU',
      'th.ram': '内存', 'th.vram': '显存', 'th.net': '网络', 'th.price': '月度价格',
      'th.status': '状态',
      'status.ok': '现货', 'status.low': '少量', 'status.no': '缺货',
      'btn.add': '加入购物车', 'btn.unavailable': '不可用',
      'regions.eyebrow': '布局', 'regions.h2': '两个区域,同一张网。',
      'regions.lede': '两个站点承载相同的 SKU 系列,扩容或迁移无需重构架构。RTT 到莫斯科由每个机房本地探针每月测量。',
      'regions.hk': '香港', 'regions.sz': '深圳',
      'regions.tier': '机房', 'regions.power': '供电', 'regions.fabric': '网络架构',
      'regions.peering': '对等', 'regions.rtt': '到莫斯科 RTT',
      'bench.eyebrow': '基准测试', 'bench.h2': 'Llama-3 70B 微调吞吐量。',
      'bench.lede': '单节点每秒 token 数,batch 16、序列 4096,支持时使用 FP8。数据来自我们自己的参考集运行,而非厂商幻灯片。',
      'bench.foot': '参考: <span class="gpu-mono">torch 2.3 · transformers 4.41 · FA-2 · BF16/FP8</span>。原始日志按需提供。',
      'cases.eyebrow': '客户真正运行的场景',
      'cases.h2': '六种负载,一个开票主体。',
      'cases.c1.t': 'LLM 微调', 'cases.c1.b': '70B 级 QLoRA、7–13B 全量微调。节点内 NVLink,节点间 InfiniBand。',
      'cases.c2.t': '规模化推理', 'cases.c2.b': 'vLLM / TGI 接在您自己的网关后。L40S 是 7–13B 服务的性价比之选。',
      'cases.c3.t': '计算机视觉', 'cases.c3.b': '检测、跟踪、视频管线。CUDA / TensorRT 镜像可按需预构建。',
      'cases.c4.t': '生成式媒体', 'cases.c4.b': 'SDXL / Flux / 视频扩散渲染农场。4090 单帧成本最佳。',
      'cases.c5.t': '科学计算', 'cases.c5.b': '分子动力学、CFD、基因组学。FP64 任务跑在 A100 / H100 PCIe 节点。',
      'cases.c6.t': '渲染与 VFX', 'cases.c6.b': 'Blender、Houdini、Unreal 帧服务器。VRAM 吃紧的场景上 A6000。',
      'trust.eyebrow': '信任 & SLA', 'trust.h2': '月底才会显出价值的枯燥细节。',
      'trust.t1': '可用率 SLA', 'trust.b1': '按自然月计量供电、网络和虚拟化层可用率。积分自动抵扣下张发票。',
      'trust.t2': '结算文件', 'trust.b2': 'Акт + 发票 + 对账单 — 付款到账后次个工作日发送。', 'trust.bdays': ' 工作日',
      'trust.t3': '合规', 'trust.b3': '上游机房通过 ISO/IEC 27001 与 27017 认证。Provisioning 前可签 DPA。',
      'trust.t4': '合同主体',
      'faq.eyebrow': '直接答复', 'faq.h2': '常见问题',
      'faq.q1': '俄罗斯或白俄罗斯 LLC 实际怎么付款?',
      'faq.a1': '您把 RUB 或 BYN 汇到吉尔吉斯斯坦 LLC 账户。我们直接与阿里云 / 腾讯云持有合同,以 CNY 结算。结算文件用您的货币、带我们的吉尔吉斯斯坦注册信息开具。没有刷卡处理商、没有离岸壳子。',
      'faq.q2': '付款到 SSH 多久?',
      'faq.a2': 'USDT(TRC-20)— 分钟级。SWIFT RUB / CNY — 莫斯科时间 14:00 前付款当天到位,否则次日上午。资金到账即在 Telegram 通知,30–60 分钟内推送凭据。',
      'faq.q3': '可以自带容器 / 系统镜像吗?',
      'faq.a3': '可以。默认是 Ubuntu 22.04 + CUDA 12.4 + cuDNN + NCCL 等 ML 全家桶,也可上传自定义镜像(Docker、qcow2、ISO)在裸金属上启动。',
      'faq.q4': '月中要扩容怎么办?',
      'faq.a4': '把 SKU 加入购物车,生成增补发票 — 按现有计费周期按比例计算,所有内容对齐。降配从下一周期生效。',
      'faq.q5': '有预留算力或 12 个月合同吗?',
      'faq.a5': '有,H200 与 H100 8× 12 个月预留约 −10%,24 个月约 −18%。请将规格邮件至 <a href="mailto:wet4kg@gmail.com">wet4kg@gmail.com</a>。',
      'faq.q6': '试用或试点?',
      'faq.a6': 'KYC 后,经核验的法人可在 4090 或 A100 节点上获得 24 小时试点。我们不向个人提供免费额度,抱歉。',
      'footer.tag': '亚洲 GPU 服务器,比什凯克开票。',
      'footer.product': '产品', 'footer.account': '账户', 'footer.entity': '合同主体',
      'footer.cart': '打开购物车',
      'cart.title': '您的购物车', 'cart.empty': '购物车为空。请在目录中选择 SKU。',
      'cart.total': '月度总计', 'cart.generate': '生成发票', 'cart.continue': '继续浏览',
      'cart.month': '1 个月',
      'auth.title': '以法人身份登录',
      'auth.lead': '只需三个字段即可开票。无密码、无邮箱确认环节 — 这里是 B2B 柜台,不是 consumer 注册。',
      'auth.email': '工作邮箱', 'auth.company': '公司(法定名称)',
      'auth.inn': '税号 / ИНН(可选)', 'auth.submit': '登录',
      'auth.signOut': '退出',
      'inv.title': '发票已生成',
      'inv.lead': '请按下方编号付款。资金到账即开始 Provisioning。',
      'inv.print': '打印 / 保存 PDF', 'inv.close': '关闭',
      'inv.date': '日期', 'inv.billTo': '收件方', 'inv.supplier': '供应方',
      'inv.term': '期限', 'inv.amount': '金额', 'inv.config': '配置',
      'inv.totalDue': '应付金额',
      'inv.payment': '付款方式:RUB / BYN / CNY 银行电汇或 USDT(TRC-20)。摘要:',
      'inv.provStart': '。Provisioning 将在付款确认后开始。',
      'toast.added': '已加入购物车',
      'toast.dup': '已在购物车中',
      'toast.signedIn': '已登录:',
      'toast.signedOut': '已退出',
      'toast.invGen': '发票已生成'
    }
  };

  /* ---------- State ---------- */
  var CART_KEY = 'wec_cart_v2';
  var SESSION_KEY = 'wec_session';
  var LANG_KEY = 'wec_lang';
  var CUR_KEY = 'wec_currency';
  var STATUS_LABELS = {
    ok: { en: 'In stock', ru: 'В наличии', zh: '现货', cls: 'gpu-badge--ok' },
    low: { en: 'Limited', ru: 'Ограничено', zh: '少量', cls: 'gpu-badge--low' },
    no: { en: 'Out of stock', ru: 'Нет в наличии', zh: '缺货', cls: 'gpu-badge--no' }
  };

  var lang = (function () {
    try { return localStorage.getItem(LANG_KEY) || 'en'; } catch (e) { return 'en'; }
  })();
  var currency = (function () {
    try { return localStorage.getItem(CUR_KEY) || 'RUB'; } catch (e) { return 'RUB'; }
  })();

  /* ---------- Helpers ---------- */
  function t(key) {
    var dict = I18N[lang] || I18N.en;
    return dict[key] || I18N.en[key] || key;
  }
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function formatPrice(rub, cur) {
    var fx = FX[cur] || FX.RUB;
    var val = rub * fx.rate;
    var fractionDigits = (cur === 'BYN' || cur === 'USDT' || cur === 'CNY') ? 0 : 0;
    var formatted = val.toLocaleString(fx.locale, {
      maximumFractionDigits: fractionDigits,
      minimumFractionDigits: 0
    });
    if (cur === 'USDT') return '$' + formatted + ' USDT';
    if (cur === 'CNY') return '¥' + formatted;
    if (cur === 'BYN') return formatted + ' Br';
    return formatted + ' ₽';
  }
  function formatHourly(rub, cur) {
    return formatPrice(Math.round(rub / 730), cur) + '/hr';
  }

  /* ---------- i18n apply ---------- */
  function applyI18n() {
    document.documentElement.lang = lang;
    document.body.setAttribute('lang', lang);
    var nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      el.innerHTML = val;
    });
    document.querySelectorAll('.gpu-lang-btn').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-lang') === lang);
    });
  }

  /* ---------- Pricing table render ---------- */
  function rowHtml(item) {
    var statusInfo = STATUS_LABELS[item.status];
    var statusLabel = statusInfo[lang] || statusInfo.en;
    var btn = item.status === 'no'
      ? '<button type="button" class="gpu-btn gpu-btn-outline gpu-btn-sm" disabled aria-disabled="true">' + escapeHtml(t('btn.unavailable')) + '</button>'
      : '<button type="button" class="gpu-btn gpu-btn-primary gpu-btn-sm" data-add-cart>' + escapeHtml(t('btn.add')) + '</button>';
    var tag = item.tag ? '<span class="gpu-model-sub" style="color:#2563eb;font-weight:600">★ ' + (item.tag[lang] || item.tag.en) + '</span>' : '';
    var regionLabel = item.region === 'hk' ? 'HK · Tier-3' : 'SZ · Tier-3';
    return '<tr data-id="' + item.id + '" data-model="' + item.model + '" data-region="' + item.region + '" data-count="' + item.count + '" data-status="' + item.status + '">' +
      '<td>' +
        '<span class="gpu-model">' + escapeHtml(item.name) + ' · ' + item.count + '×</span>' +
        '<span class="gpu-model-sub">' + escapeHtml(item.sub) + '</span>' +
        tag +
      '</td>' +
      '<td class="gpu-mono">' + regionLabel + '</td>' +
      '<td class="gpu-mono">' + item.cpu + '</td>' +
      '<td class="gpu-mono">' + item.ram + '</td>' +
      '<td class="gpu-mono">' + item.vram + '</td>' +
      '<td class="gpu-mono">' + item.net + '</td>' +
      '<td class="gpu-price-cell">' +
        '<strong>' + formatPrice(item.priceRub, currency) + '</strong>' +
        '<span>' + formatHourly(item.priceRub, currency) + '</span>' +
      '</td>' +
      '<td><span class="gpu-badge ' + statusInfo.cls + '">' + escapeHtml(statusLabel) + '</span></td>' +
      '<td>' + btn + '</td>' +
    '</tr>';
  }
  function renderCatalog() {
    var body = document.getElementById('gpu-pricing-body');
    if (!body) return;
    body.innerHTML = CATALOG.map(rowHtml).join('');
    applyFilters();
  }

  /* ---------- Filters ---------- */
  var modelSel, regionSel, countSel, statusSel, countEl;
  function applyFilters() {
    if (!modelSel) return;
    var model = modelSel.value;
    var region = regionSel.value;
    var cnt = countSel.value;
    var status = statusSel.value;
    var n = 0;
    document.querySelectorAll('#gpu-pricing-body tr').forEach(function (row) {
      var okModel = model === 'all' || row.getAttribute('data-model') === model;
      var okRegion = region === 'all' || row.getAttribute('data-region') === region;
      var okCount = cnt === 'all' || row.getAttribute('data-count') === cnt;
      var rowStatus = row.getAttribute('data-status');
      var okStatus = status === 'all' || (status === 'available' && rowStatus !== 'no');
      var show = okModel && okRegion && okCount && okStatus;
      row.hidden = !show;
      if (show) n++;
    });
    if (countEl) countEl.textContent = String(n);
  }

  /* ---------- Cart ---------- */
  function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch (e) { return []; }
  }
  function saveCart(items) { localStorage.setItem(CART_KEY, JSON.stringify(items)); }
  function loadSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch (e) { return null; }
  }
  function saveSession(s) {
    if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    else localStorage.removeItem(SESSION_KEY);
  }
  function cartTotalRub(items) {
    return items.reduce(function (sum, it) { return sum + (it.priceRub * (it.qty || 1)); }, 0);
  }
  function findInCatalog(id) {
    for (var i = 0; i < CATALOG.length; i++) if (CATALOG[i].id === id) return CATALOG[i];
    return null;
  }

  var cartDrawer, cartBackdrop, cartBody, cartTotalEl, cartCountEl, checkoutBtn;
  var authModal, authForm, authBtn, accountLabel;
  var invoiceModal, invoiceContent, toastEl;
  var pendingCheckout = false, toastTimer;

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 2800);
  }

  function renderCart() {
    var items = loadCart();
    if (cartCountEl) {
      var count = items.reduce(function (n, it) { return n + (it.qty || 1); }, 0);
      cartCountEl.textContent = String(count);
      cartCountEl.hidden = count === 0;
    }
    if (cartTotalEl) cartTotalEl.textContent = formatPrice(cartTotalRub(items), currency);
    if (checkoutBtn) checkoutBtn.disabled = items.length === 0;
    if (!cartBody) return;
    if (!items.length) {
      cartBody.innerHTML = '<p class="gpu-cart-empty">' + escapeHtml(t('cart.empty')) + '</p>';
      return;
    }
    cartBody.innerHTML = items.map(function (it) {
      return '<article class="gpu-cart-item" data-cart-id="' + it.id + '">' +
        '<p class="gpu-cart-item-name">' + escapeHtml(it.name) + '</p>' +
        '<p class="gpu-cart-item-meta">' + escapeHtml(t('cart.month')) + ' · ' + formatHourly(it.priceRub, currency) + '</p>' +
        '<div class="gpu-cart-item-row">' +
          '<span class="gpu-cart-item-price">' + formatPrice(it.priceRub, currency) + '</span>' +
          '<button type="button" class="gpu-cart-remove" data-remove-cart="' + it.id + '">Remove</button>' +
        '</div></article>';
    }).join('');
  }

  function openCart() {
    renderCart();
    cartDrawer.hidden = false;
    cartBackdrop.hidden = false;
    requestAnimationFrame(function () { cartDrawer.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    cartDrawer.classList.remove('is-open');
    cartBackdrop.hidden = true;
    document.body.style.overflow = '';
    setTimeout(function () { cartDrawer.hidden = true; }, 240);
  }

  function openAuth() {
    var s = loadSession();
    if (s) {
      document.getElementById('gpu-auth-email').value = s.email || '';
      document.getElementById('gpu-auth-company').value = s.company || '';
      document.getElementById('gpu-auth-inn').value = s.inn || '';
    }
    authModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeAuth() {
    authModal.hidden = true;
    if (cartDrawer.hidden && invoiceModal.hidden) document.body.style.overflow = '';
  }
  function closeInvoice() {
    invoiceModal.hidden = true;
    if (cartDrawer.hidden && authModal.hidden) document.body.style.overflow = '';
  }

  function updateAuthUI() {
    var s = loadSession();
    if (s && s.email) {
      if (accountLabel) {
        accountLabel.textContent = s.company || s.email;
        accountLabel.hidden = false;
      }
      if (authBtn) authBtn.textContent = t('auth.signOut');
    } else {
      if (accountLabel) accountLabel.hidden = true;
      if (authBtn) authBtn.textContent = t('auth.signIn');
    }
  }

  function addFromRow(row) {
    if (row.getAttribute('data-status') === 'no') return;
    var id = row.getAttribute('data-id');
    var item = findInCatalog(id);
    if (!item) return;
    var items = loadCart();
    if (items.some(function (it) { return it.id === id; })) {
      showToast(t('toast.dup'));
      openCart();
      return;
    }
    items.push({
      id: item.id,
      name: item.name + ' · ' + item.count + '× · ' + (item.region === 'hk' ? 'HK' : 'SZ'),
      priceRub: item.priceRub,
      qty: 1
    });
    saveCart(items);
    renderCart();
    showToast(t('toast.added'));
    openCart();
  }

  function removeFromCart(id) {
    saveCart(loadCart().filter(function (it) { return it.id !== id; }));
    renderCart();
  }

  function invoiceNumber() {
    var d = new Date();
    var pad = function (n) { return String(n).padStart(2, '0'); };
    return 'INV-WEC-' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + '-' + String(Math.floor(Math.random() * 9000) + 1000);
  }

  function generateInvoice() {
    var items = loadCart();
    var s = loadSession();
    if (!items.length) return;
    if (!s || !s.email) {
      pendingCheckout = true;
      openAuth();
      return;
    }
    var invNo = invoiceNumber();
    var fx = FX[currency] || FX.RUB;
    var dateStr = new Date().toLocaleDateString(fx.locale, { day: '2-digit', month: 'long', year: 'numeric' });
    var totalRub = cartTotalRub(items);
    var lines = items.map(function (it) {
      return '<tr><td>' + escapeHtml(it.name) + '</td><td>' + escapeHtml(t('cart.month')) + '</td><td class="num">' + formatPrice(it.priceRub, currency) + '</td></tr>';
    }).join('');

    invoiceContent.innerHTML =
      '<h3>' + invNo + '</h3>' +
      '<p style="margin:0 0 12px;color:#64748b">' + escapeHtml(t('inv.date')) + ': ' + dateStr + '</p>' +
      '<p style="margin:0 0 4px"><strong>' + escapeHtml(t('inv.billTo')) + ':</strong> ' + escapeHtml(s.company) + '</p>' +
      '<p style="margin:0 0 4px">' + escapeHtml(s.email) + '</p>' +
      (s.inn ? '<p style="margin:0 0 12px">ИНН: ' + escapeHtml(s.inn) + '</p>' : '<p style="margin:0 0 12px"></p>') +
      '<p style="margin:0 0 12px"><strong>' + escapeHtml(t('inv.supplier')) + ':</strong> WEST-EAST TRADE LLC · ОсОО «ВЕСТ-ИСТ ТРЕЙД»<br>Bishkek, Chyngyz Aitmatov ave. 16 · ИНН 02711202310217</p>' +
      '<table class="gpu-invoice-lines"><thead><tr><th>' + escapeHtml(t('inv.config')) + '</th><th>' + escapeHtml(t('inv.term')) + '</th><th>' + escapeHtml(t('inv.amount')) + '</th></tr></thead><tbody>' + lines + '</tbody></table>' +
      '<p class="gpu-invoice-total">' + escapeHtml(t('inv.totalDue')) + ': ' + formatPrice(totalRub, currency) + '</p>' +
      '<p style="margin:12px 0 0;font-size:12px;color:#64748b">' + t('inv.payment') + ' <strong>' + invNo + '</strong>' + t('inv.provStart') + '</p>';

    saveCart([]);
    renderCart();
    closeCart();
    invoiceModal.hidden = false;
    document.body.style.overflow = 'hidden';
    showToast(t('toast.invGen') + ' · ' + invNo);
  }

  /* ---------- Wire-up ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('gpu-year').textContent = new Date().getFullYear();

    cartDrawer = document.getElementById('gpu-cart-drawer');
    cartBackdrop = document.getElementById('gpu-cart-backdrop');
    cartBody = document.getElementById('gpu-cart-body');
    cartTotalEl = document.getElementById('gpu-cart-total');
    cartCountEl = document.getElementById('gpu-cart-count');
    checkoutBtn = document.getElementById('gpu-checkout-btn');
    authModal = document.getElementById('gpu-auth-modal');
    authForm = document.getElementById('gpu-auth-form');
    authBtn = document.getElementById('gpu-auth-btn');
    accountLabel = document.getElementById('gpu-account-label');
    invoiceModal = document.getElementById('gpu-invoice-modal');
    invoiceContent = document.getElementById('gpu-invoice-content');
    toastEl = document.getElementById('gpu-toast');

    modelSel = document.getElementById('gpu-filter-model');
    regionSel = document.getElementById('gpu-filter-region');
    countSel = document.getElementById('gpu-filter-count');
    statusSel = document.getElementById('gpu-filter-status');
    countEl = document.getElementById('gpu-row-count');

    applyI18n();
    renderCatalog();
    renderCart();
    updateAuthUI();

    [modelSel, regionSel, countSel, statusSel].forEach(function (el) {
      if (el) el.addEventListener('change', applyFilters);
    });

    document.querySelectorAll('.gpu-lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        lang = btn.getAttribute('data-lang');
        try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
        applyI18n();
        renderCatalog();
        renderCart();
        updateAuthUI();
      });
    });

    document.querySelectorAll('.gpu-cur-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currency = btn.getAttribute('data-cur');
        try { localStorage.setItem(CUR_KEY, currency); } catch (e) {}
        document.querySelectorAll('.gpu-cur-btn').forEach(function (b) {
          b.classList.toggle('is-active', b.getAttribute('data-cur') === currency);
        });
        renderCatalog();
        renderCart();
      });
    });
    document.querySelectorAll('.gpu-cur-btn').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-cur') === currency);
    });

    document.querySelectorAll('[data-open-cart]').forEach(function (btn) { btn.addEventListener('click', openCart); });
    document.querySelectorAll('[data-close-cart]').forEach(function (btn) { btn.addEventListener('click', closeCart); });
    if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

    document.querySelectorAll('[data-open-auth]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var s = loadSession();
        if (s && s.email) {
          saveSession(null);
          updateAuthUI();
          showToast(t('toast.signedOut'));
        } else openAuth();
      });
    });
    document.querySelectorAll('[data-close-auth]').forEach(function (b) { b.addEventListener('click', closeAuth); });
    document.querySelectorAll('[data-close-invoice]').forEach(function (b) { b.addEventListener('click', closeInvoice); });

    if (authForm) {
      authForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var s = {
          email: document.getElementById('gpu-auth-email').value.trim(),
          company: document.getElementById('gpu-auth-company').value.trim(),
          inn: document.getElementById('gpu-auth-inn').value.trim(),
          signedInAt: Date.now()
        };
        saveSession(s);
        updateAuthUI();
        closeAuth();
        showToast(t('toast.signedIn') + ' ' + s.company);
        if (pendingCheckout) {
          pendingCheckout = false;
          generateInvoice();
        }
      });
    }

    if (checkoutBtn) checkoutBtn.addEventListener('click', generateInvoice);

    var printBtn = document.getElementById('gpu-invoice-print');
    if (printBtn) printBtn.addEventListener('click', function () {
      var w = window.open('', '_blank');
      if (!w) return;
      w.document.write('<html><head><title>Invoice</title><style>body{font-family:Inter,sans-serif;padding:24px;font-size:13px}table{width:100%;border-collapse:collapse}td,th{padding:8px 0;border-bottom:1px solid #e2e8f0;text-align:left}</style></head><body>' + invoiceContent.innerHTML + '</body></html>');
      w.document.close();
      w.print();
    });

    document.getElementById('gpu-pricing-body').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-add-cart]');
      if (btn) {
        var row = btn.closest('tr');
        if (row) addFromRow(row);
      }
    });

    if (cartBody) {
      cartBody.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-remove-cart]');
        if (btn) removeFromCart(btn.getAttribute('data-remove-cart'));
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (!cartDrawer.hidden) closeCart();
      else if (!authModal.hidden) closeAuth();
      else if (!invoiceModal.hidden) closeInvoice();
    });

    var toggle = document.getElementById('gpu-menu-toggle');
    var nav = document.getElementById('gpu-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  });
})();
