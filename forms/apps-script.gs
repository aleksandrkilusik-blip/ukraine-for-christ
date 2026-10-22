/**
 * Приймає анкети з сайту «Україна для Христа» і записує їх на аркуш «Заявки»
 * цієї Google Таблиці (шаблон ukraine_for_christ_applications.xlsx).
 *
 * Встановлення:
 *  1. Відкрийте таблицю → Розширення → Apps Script.
 *  2. Замініть увесь код у редакторі цим файлом і збережіть.
 *  3. Розгорнути → Нове розгортання → тип «Веб-застосунок»:
 *     «Виконувати як» — Я, «Хто має доступ» — Усі. Надайте дозвіл.
 *  4. Скопіюйте URL веб-застосунку і вставте його в FORMS_ENDPOINT у assets/site.js.
 *
 * Після зміни цього коду: Розгорнути → Керувати розгортаннями → редагувати →
 * Версія «Нова» (тоді URL лишається той самий).
 *
 * Колонки шукаються за назвою в першому рядку, тож їх можна переставляти.
 * Поля анкети, для яких немає окремої колонки, дописуються в «Повідомлення»
 * у вигляді «Підпис: значення».
 */

var SHEET_NAME = 'Заявки';
var HEADERS = ['Дата й час', 'Служіння', 'Сторінка', 'Ім’я', 'Прізвище', 'Електронна пошта',
  'Телефон', 'Місто', 'Тип звернення', 'Повідомлення', 'Статус', 'Примітки'];
var STATUSES = ['Нова', 'У роботі', 'Завершена'];
var MAX_LEN = 2000;

// Підписи полів, значення яких іде в «Тип звернення» (окрім випадних списків — вони йдуть туди завжди).
var TYPE_LABEL = /хто ви|напрям|вік дитини/i;
var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  var p = (e && e.parameter) || {};
  var fields;
  try {
    fields = JSON.parse(p.data || '[]');
  } catch (err) {
    return ContentService.createTextOutput('bad data');
  }
  if (!Array.isArray(fields) || !fields.length) return ContentService.createTextOutput('empty');

  var rec = toRecord(fields);
  rec['Дата й час'] = new Date();
  rec['Служіння'] = p.form || '';
  rec['Сторінка'] = p.page || '';
  rec['Статус'] = 'Нова';

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = getSheet();
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = headers.map(function (h) {
      var v = rec[String(h).trim()];
      return v instanceof Date ? v : clean(v);
    });
    sheet.appendRow(row);

    var statusCol = headers.indexOf('Статус') + 1;
    if (statusCol) {
      var rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
      sheet.getRange(sheet.getLastRow(), statusCol).setDataValidation(rule);
    }
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput('ok');
}

// Розкладає поля анкети [підпис, значення, тег] по колонках таблиці.
function toRecord(fields) {
  var rec = {};
  var types = [];
  var notes = [];
  var messages = [];

  fields.forEach(function (f) {
    var label = String(f[0] || '').trim();
    var value = String(f[1] == null ? '' : f[1]).trim();
    var tag = String(f[2] || '').toUpperCase();
    var l = label.toLowerCase();
    if (!value) return;

    if (/ім.я|прізвище/.test(l) && !rec['Ім’я']) {
      // Порядок не перевертаємо: приклади в анкетах — «Ім’я Прізвище».
      var parts = value.split(/\s+/);
      rec['Ім’я'] = parts[0];
      rec['Прізвище'] = parts.slice(1).join(' ');
    } else if (/email|пошта/.test(l) && !/телефон|telegram/.test(l) && !rec['Електронна пошта']) {
      rec['Електронна пошта'] = value;
    } else if (/телефон|telegram|email|пошта/.test(l)) {
      // «Телефон / Email» та подібні поля: розпізнаємо, що саме ввели.
      if (EMAIL.test(value) && !rec['Електронна пошта']) rec['Електронна пошта'] = value;
      else if (!EMAIL.test(value) && !rec['Телефон']) rec['Телефон'] = value;
      else notes.push(label + ': ' + value);
    } else if (/місто/.test(l) && !rec['Місто']) {
      rec['Місто'] = value;
    } else if (tag === 'SELECT' || TYPE_LABEL.test(l)) {
      types.push(value);
    } else if (tag === 'TEXTAREA') {
      messages.push(value);
    } else {
      notes.push(label + ': ' + value);
    }
  });

  rec['Тип звернення'] = types.join('; ');
  rec['Повідомлення'] = notes.concat(messages).join('\n');
  return rec;
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME, 0);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

// Обрізає довгі значення і не дає таблиці сприйняти текст як формулу (+380…, =…).
function clean(v) {
  var s = String(v == null ? '' : v).slice(0, MAX_LEN);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
