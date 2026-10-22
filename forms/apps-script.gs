/**
 * Приймає анкети з сайту «Україна для Христа» і записує їх у цю Google Таблицю:
 * кожна анкета — на свій аркуш (Військове служіння, Crescendo, ГЦР …).
 *
 * Встановлення:
 *  1. Створіть нову Google Таблицю → Розширення → Apps Script.
 *  2. Замініть увесь код у редакторі цим файлом і збережіть.
 *  3. Розгорнути → Нове розгортання → тип «Веб-застосунок»:
 *     «Виконувати як» — Я, «Хто має доступ» — Усі. Надайте дозвіл.
 *  4. Скопіюйте URL веб-застосунку і вставте його в FORMS_ENDPOINT у assets/site.js.
 *
 * Після зміни цього коду потрібно: Розгорнути → Керувати розгортаннями →
 * редагувати → Версія «Нова» (тоді URL лишається той самий).
 */

var MAX_LEN = 2000;

function doPost(e) {
  var p = (e && e.parameter) || {};
  var formName = String(p.form || 'Інше').slice(0, 90);
  var fields;
  try {
    fields = JSON.parse(p.data || '[]');
  } catch (err) {
    return ContentService.createTextOutput('bad data');
  }
  if (!Array.isArray(fields) || !fields.length) return ContentService.createTextOutput('empty');

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(formName) || ss.insertSheet(formName);

    var headers = sheet.getLastColumn()
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
      : [];
    if (!headers.length) {
      headers = ['Дата', 'Сторінка'];
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, 2).setFontWeight('bold');
    }

    var row = [new Date(), clean(p.page)];
    fields.forEach(function (pair) {
      var label = clean(pair[0]) || 'Поле';
      var col = headers.indexOf(label);
      if (col === -1) {
        // Нове поле в анкеті — додаємо колонку.
        headers.push(label);
        col = headers.length - 1;
        sheet.getRange(1, col + 1).setValue(label).setFontWeight('bold');
      }
      row[col] = clean(pair[1]);
    });
    for (var i = 0; i < headers.length; i++) if (row[i] === undefined) row[i] = '';

    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput('ok');
}

// Обрізає довгі значення і не дає таблиці сприйняти текст як формулу (+380…, =…).
function clean(v) {
  var s = String(v == null ? '' : v).slice(0, MAX_LEN);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
