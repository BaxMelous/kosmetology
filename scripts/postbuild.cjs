#!/usr/bin/env node
/**
 * Пост-сборка: удаление дубликатов preload и noModule-скриптов
 * Запускается после `next build`
 */

const fs = require("fs");
const path = require("path");

const PROJECT = path.join(__dirname, "..");
const OUT = path.join(PROJECT, "out");

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(p));
    else if (entry.name.endsWith(".html")) files.push(p);
  }
  return files;
}

const htmlFiles = walk(OUT);

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, "utf-8");

  // 1. Убираем дублирующиеся preload-ссылки (атрибут as=image повторяется)
  const seen = new Set();
  html = html.replace(
    /<link\s+rel="preload"\s+as="image"\s+href="([^"]+)"[^>]*>/g,
    (match, href) => {
      if (seen.has(href)) return ""; // удаляем дубликат
      seen.add(href);
      return match;
    }
  );

  // 2. Убираем noModule-скрипты (legacy JS для IE — не нужен при browserslist >= Chrome 90)
  html = html.replace(
    /<script\s+src="[^"]*"\s+noModule=""><\/script>/g,
    ""
  );

  fs.writeFileSync(file, html);
  console.log(`✅ ${path.relative(OUT, file)}`);
}

console.log(`\n🎯 Обработано ${htmlFiles.length} файлов`);
console.log("   • Дубликаты preload-изображений удалены");
console.log("   • noModule (legacy JS) скрипты удалены");
