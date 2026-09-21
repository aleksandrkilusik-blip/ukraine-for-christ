// Спільна шапка, підвал і базова поведінка для всіх сторінок сайту УДХ.
(function () {
  var LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtdYwLh2eTa7noNEOQ4mLV8oGI83ktIysXdl06AVcQrhxwKGTk02RZ4yYyz9YwRqH4S82d8dDyp6R5VVReyKPm8wB42GnXi-wHhqR2RhvFUW2UomHfuH0dU9WOPOyjRUJeLNG82tjlHv4NoIXxrhOZYh_wtfidcLXOW8ke3xUPw9BeL1Uxph_bV4_ESI-TbI-xwxubQWlbki5bVZATg_BnjHmCdDA7exfZUVinxyylUkSOgI6GqCnAUh_tOe-auMDRsE0';

  var NAV = [
    ['pro-nas.html', 'Хто ми'],
    ['index.html#ministries', 'Напрямки'],
    ['istoriyi.html', 'Особисті історії'],
    ['podiyi.html', 'Події'],
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
    '.udh-h{position:sticky;top:0;z-index:60;background:rgba(252,249,248,.96);backdrop-filter:blur(12px);border-bottom:1px solid #e5e2e1;font-family:"Manrope",sans-serif}' +
    '.udh-h .in{max-width:1280px;margin:0 auto;padding:0 20px;height:72px;display:flex;align-items:center;justify-content:space-between;gap:24px}' +
    '.udh-h img{height:44px;width:auto;display:block}' +
    '.udh-h nav{display:flex;gap:26px}.udh-h nav a{color:#404846;font-size:15px;font-weight:500;text-decoration:none}' +
    '.udh-h nav a:hover,.udh-h nav a.is-active{color:#00332b}.udh-h nav a.is-active{font-weight:700}' +
    '.udh-h .act{display:flex;gap:8px;align-items:center}' +
    '.udh-btn{display:inline-flex;align-items:center;padding:9px 18px;border-radius:999px;font-size:14px;font-weight:600;text-decoration:none;border:1px solid #00332b;color:#00332b}' +
    '.udh-btn.fill{background:#00332b;color:#fff}' +
    '.udh-burger{display:none;background:none;border:0;font-size:28px;color:#00332b;cursor:pointer}' +
    '.udh-mob{display:none;border-top:1px solid #e5e2e1;padding:12px 20px 20px}.udh-mob a{display:block;padding:10px 0;color:#1c1b1b;text-decoration:none;font-weight:500}' +
    '.udh-mob.open{display:block}' +
    '@media(max-width:1100px){.udh-h nav,.udh-h .act .udh-btn:not(.fill){display:none}.udh-burger{display:block}}' +
    '.udh-f{background:#001c17;color:#cfd8d5;font-family:"Manrope",sans-serif;font-size:14px}' +
    '.udh-f .in{max-width:1280px;margin:0 auto;padding:56px 20px 28px;display:grid;grid-template-columns:2fr 2fr 1fr 1.5fr;gap:32px}' +
    '@media(max-width:800px){.udh-f .in{grid-template-columns:1fr}}' +
    '.udh-f h4{color:#e9c349;font-size:12px;letter-spacing:.1em;text-transform:uppercase;margin:0 0 12px}' +
    '.udh-f a{display:block;color:#cfd8d5;text-decoration:none;padding:3px 0}.udh-f a:hover{color:#fff}' +
    '.udh-f .bot{max-width:1280px;margin:0 auto;padding:18px 20px;border-top:1px solid rgba(255,255,255,.1);font-size:12px;opacity:.7}' +
    '.udh-todo{display:inline-block;margin-left:6px;padding:1px 8px;border:1px dashed #b45309;border-radius:6px;background:#fef3c7;color:#92400e;font-size:11px;font-weight:700;font-style:normal;letter-spacing:0;text-transform:none;vertical-align:middle}' +
    '.udh-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#00332b;color:#fff;padding:12px 20px;border-radius:12px;font:500 14px "Manrope",sans-serif;z-index:100;box-shadow:0 8px 24px rgba(0,0,0,.2)}' +
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
    '<div><h4>Контакти</h4><p>м. Київ, Україна</p><p>Email: <span class="udh-todo">уточнюється</span></p></div></div>' +
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

  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.querySelector('.udh-ok')) return;
      var ok = document.createElement('p');
      ok.className = 'udh-ok';
      ok.textContent = 'Дякуємо! Заявку прийнято. (Демо-режим: дані поки нікуди не надсилаються.)';
      form.appendChild(ok);
      form.reset();
    });
  });
})();
