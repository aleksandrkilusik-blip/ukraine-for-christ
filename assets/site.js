// Спільна шапка, підвал і базова поведінка для всіх сторінок сайту УДХ.
(function () {
  var LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtdYwLh2eTa7noNEOQ4mLV8oGI83ktIysXdl06AVcQrhxwKGTk02RZ4yYyz9YwRqH4S82d8dDyp6R5VVReyKPm8wB42GnXi-wHhqR2RhvFUW2UomHfuH0dU9WOPOyjRUJeLNG82tjlHv4NoIXxrhOZYh_wtfidcLXOW8ke3xUPw9BeL1Uxph_bV4_ESI-TbI-xwxubQWlbki5bVZATg_BnjHmCdDA7exfZUVinxyylUkSOgI6GqCnAUh_tOe-auMDRsE0';

  var NAV = [
    ['pro-nas.html', 'Хто ми'],
    ['index.html#ministries', 'Напрямки'],
    ['istoriyi.html', 'Особисті історії'],
    ['podiyi.html', 'Події'],
    ['resursy.html', 'Ресурси'],
    ['doluchytys.html', 'Співпраця']
  ];

  var MINISTRIES = [
    ['campus.html', 'Студентське служіння'],
    ['viyskove.html', 'Військове служіння'],
    ['simeyne-zhyttya.html', 'Сімейне життя'],
    ['humanitarne.html', 'Гуманітарне служіння'],
    ['sport.html', 'Спортивне служіння'],
    ['gcr.html', 'Глобальний церковний рух'],
    ['osvitiany.html', 'Рух освітян'],
    ['crescendo.html', 'Класичні музиканти'],
    ['leaderimpact.html', 'LeaderImpact'],
    ['za-kordonom.html', 'Українці за кордоном'],
    ['mission-hub.html', 'Mission Hub']
  ];

  var page = location.pathname.split('/').pop() || 'index.html';
  var links = function (list) {
    return list.map(function (l) {
      var active = l[0].indexOf('#') < 0 && l[0] === page ? ' class="is-active"' : '';
      return '<a href="' + l[0] + '"' + active + '>' + l[1] + '</a>';
    }).join('');
  };

  var css = document.createElement('style');
  css.textContent =
    '.udh-h{position:sticky;top:0;z-index:60;background:rgba(252,249,248,.96);backdrop-filter:blur(12px);border-bottom:1px solid #ddd5c9;font-family:"Manrope",sans-serif}' +
    '.udh-h .in{max-width:1280px;margin:0 auto;padding:0 20px;height:72px;display:flex;align-items:center;justify-content:space-between;gap:24px}' +
    '.udh-h img{height:44px;width:auto;display:block}' +
    '.udh-h nav{display:flex;gap:26px}.udh-h nav a{color:#4a5560;font-size:15px;font-weight:500;text-decoration:none}' +
    '.udh-h nav a:hover,.udh-h nav a.is-active{color:#1c3a57}.udh-h nav a.is-active{font-weight:700}' +
    '.udh-h .act{display:flex;gap:8px;align-items:center}' +
    '.udh-btn{display:inline-flex;align-items:center;padding:9px 18px;border-radius:999px;font-size:14px;font-weight:600;text-decoration:none;border:1px solid #1c3a57;color:#1c3a57}' +
    '.udh-btn.fill{background:#1c3a57;color:#fff}' +
    '.udh-burger{display:none;background:none;border:0;font-size:28px;color:#1c3a57;cursor:pointer}' +
    '.udh-mob{display:none;border-top:1px solid #ddd5c9;padding:12px 20px 20px}.udh-mob a{display:block;padding:10px 0;color:#0e2433;text-decoration:none;font-weight:500}' +
    '.udh-mob.open{display:block}' +
    '@media(max-width:1100px){.udh-h nav,.udh-h .act .udh-btn:not(.fill){display:none}.udh-burger{display:block}}' +
    '.udh-f{background:#14332c;color:#cbc3b6;font-family:"Manrope",sans-serif;font-size:14px}' +
    '.udh-f .in{max-width:1280px;margin:0 auto;padding:56px 20px 28px;display:grid;grid-template-columns:2fr 2fr 1fr 1.5fr;gap:32px}' +
    '@media(max-width:800px){.udh-f .in{grid-template-columns:1fr}}' +
    '.udh-f h4{color:#f2b948;font-size:12px;letter-spacing:.1em;text-transform:uppercase;margin:0 0 12px}' +
    '.udh-f a{display:block;color:#cbc3b6;text-decoration:none;padding:3px 0}.udh-f a:hover{color:#fff}' +
    '.udh-f .bot{max-width:1280px;margin:0 auto;padding:18px 20px;border-top:1px solid rgba(255,255,255,.1);font-size:12px;opacity:.7}' +
    '.udh-todo{display:inline-block;margin-left:6px;padding:1px 8px;border:1px dashed #b45309;border-radius:6px;background:#fef3c7;color:#92400e;font-size:11px;font-weight:700;font-style:normal;letter-spacing:0;text-transform:none;vertical-align:middle}' +
    '.udh-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#1c3a57;color:#fff;padding:12px 20px;border-radius:12px;font:500 14px "Manrope",sans-serif;z-index:100;box-shadow:0 8px 24px rgba(0,0,0,.2)}' +
    '.udh-ok{margin-top:12px;padding:12px 16px;border-radius:10px;background:#d1fae5;color:#065f46;font-weight:600}';
  document.head.appendChild(css);

  var header = document.createElement('header');
  header.className = 'udh-h';
  header.innerHTML =
    '<div class="in"><a href="index.html"><img src="' + LOGO + '" alt="Україна для Христа"></a>' +
    '<nav>' + links(NAV) + '</nav>' +
    '<div class="act"><a class="udh-btn fill" href="pidtrymaty.html">Підтримати</a>' +
    '<button class="udh-burger" aria-label="Меню">☰</button></div></div>' +
    '<div class="udh-mob">' + links(NAV) + '<a href="pidtrymaty.html">Підтримати</a></div>';
  document.body.prepend(header);
  header.querySelector('.udh-burger').onclick = function () {
    header.querySelector('.udh-mob').classList.toggle('open');
  };

  var footer = document.createElement('footer');
  footer.className = 'udh-f';
  footer.innerHTML =
    '<div class="in"><div><img src="' + LOGO + '" alt="Україна для Христа" style="height:44px;filter:brightness(0) invert(1)">' +
    '<p style="margin-top:14px;max-width:320px">Євангеліє надії відновлює Україну. Міжконфесійна християнська місія, яка діє в Україні з 1991 року.</p></div>' +
    '<div><h4>Напрямки служіння</h4><div style="columns:2">' + links(MINISTRIES) + '</div></div>' +
    '<div><h4>Навігація</h4>' + links(NAV.concat([['pidtrymaty.html', 'Підтримати']])) + '</div>' +
    '<div><h4>Контакти</h4><p>м. Київ, Україна</p><p>Email: <a href="mailto:ukraineforchrist@cru.org">ukraineforchrist@cru.org</a></p></div></div>' +
    '<div class="bot">© 2026 ГО «Україна для Христа». Усі права захищено.</div>';
  document.body.appendChild(footer);

  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'udh-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2500);
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-soon]');
    if (!el) return;
    e.preventDefault();
    toast(el.getAttribute('data-soon') || 'Цей розділ ще готується');
  });

  // Анкети записуються в Google Таблицю через веб-застосунок Apps Script
  // (код і інструкція — forms/apps-script.gs). Поки URL порожній, форми працюють у демо-режимі.
  var FORMS_ENDPOINT = '';

  // Назва аркуша в таблиці для кожної анкети: сторінка або сторінка#номер форми на ній.
  var FORM_NAMES = {
    'viyskove.html': 'Військове служіння',
    'crescendo.html': 'Crescendo',
    'gcr.html': 'ГЦР',
    'leaderimpact.html': 'LeaderImpact',
    'osvitiany.html': 'Рух освітян',
    'sport.html': 'Sport Kids',
    'za-kordonom.html': 'Українці за кордоном',
    'doluchytys.html#0': 'Партнерство',
    'doluchytys.html#1': 'Волонтерство',
    'istoriyi.html': 'Підписка на історії'
  };

  function fieldLabel(el) {
    var label = el.closest('label') || (el.id && document.querySelector('label[for="' + el.id + '"]'));
    // Підпис зазвичай лежить у тому ж блоці, що й поле.
    for (var box = el.parentElement, i = 0; !label && box && i < 3; box = box.parentElement, i++) {
      if (box.querySelectorAll('input, select, textarea').length === 1) label = box.querySelector('label');
    }
    var text = el.name || el.placeholder || el.type;
    if (label) {
      // Якщо поле вкладене в підпис, текст варіантів списку до назви не потрапляє.
      label = label.cloneNode(true);
      label.querySelectorAll('input, select, textarea').forEach(function (c) { c.remove(); });
      text = label.textContent;
    }
    return text.replace(/\*/g, '').replace(/\s+/g, ' ').trim();
  }

  function collect(form) {
    var data = [];
    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      if (el.type === 'submit' || el.type === 'button' || el.disabled) return;
      if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
      var value = el.tagName === 'SELECT' && el.selectedIndex >= 0 ? el.options[el.selectedIndex].text : el.value;
      data.push([fieldLabel(el), value.trim(), el.tagName]);
    });
    return data;
  }

  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('form').forEach(function (form, index) {
    var key = FORM_NAMES[page + '#' + index] ? page + '#' + index : page;
    var formName = FORM_NAMES[key] || key;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var old = form.querySelector('.udh-ok');
      if (old) old.remove();
      var msg = document.createElement('p');
      msg.className = 'udh-ok';

      if (!FORMS_ENDPOINT) {
        msg.textContent = 'Дякуємо! Заявку прийнято. (Демо-режим: дані поки нікуди не надсилаються.)';
        form.appendChild(msg);
        form.reset();
        return;
      }

      var btn = form.querySelector('[type="submit"], button:not([type])');
      if (btn) btn.disabled = true;
      var body = new URLSearchParams({ form: formName, page: page, data: JSON.stringify(collect(form)) });
      // no-cors: Apps Script не віддає CORS-заголовків, тож відповідь не читаємо — достатньо, що запит пішов.
      fetch(FORMS_ENDPOINT, { method: 'POST', mode: 'no-cors', body: body })
        .then(function () {
          msg.textContent = 'Дякуємо! Ваші дані надіслано.';
          form.reset();
        })
        .catch(function () {
          msg.style.background = '#fee2e2';
          msg.style.color = '#991b1b';
          msg.textContent = 'Не вдалося надіслати заявку. Перевірте з\'єднання і спробуйте ще раз.';
        })
        .then(function () {
          form.appendChild(msg);
          if (btn) btn.disabled = false;
        });
    });
  });
})();
