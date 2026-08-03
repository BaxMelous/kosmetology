#!/usr/bin/env node
/**
 * Пост-сборка: удаление дубликатов preload, noModule-скриптов, генерация sitemap
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

  // 1. Убираем дублирующиеся preload-ссылки
  const seen = new Set();
  html = html.replace(
    /<link\s+rel="preload"\s+as="image"\s+href="([^"]+)"[^>]*>/g,
    (match, href) => {
      if (seen.has(href)) return "";
      seen.add(href);
      return match;
    }
  );

  // 2. Убираем noModule-скрипты (legacy JS)
  html = html.replace(
    /<script\s+src="[^"]*"\s+noModule=""><\/script>/g,
    ""
  );

  fs.writeFileSync(file, html);
  console.log(`✅ ${path.relative(OUT, file)}`);
}

// 3. Генерируем sitemap.xml
const today = new Date().toISOString().split("T")[0];
const pages = [];

// Служебные страницы в sitemap не нужны: 404 попадала туда как каталог out/404/.
const EXCLUDED_FROM_SITEMAP = new Set(["404", "404.html", "_not-found"]);

// Файлы подтверждения прав в панелях вебмастеров (yandex_*.html, google*.html).
// Это не страницы сайта — в sitemap им не место, а их индексация ещё и вредна.
const VERIFICATION_FILE = /^(yandex_|google[0-9a-f]{16}|wmail-)/i;

function walkPages(dir, base = "") {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_") || EXCLUDED_FROM_SITEMAP.has(entry.name)) continue;
    if (VERIFICATION_FILE.test(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkPages(p, base + "/" + entry.name);
    } else if (entry.name.endsWith(".html")) {
      let url = base + "/" + entry.name.replace(/\.html$/, "");
      url = url.replace(/\/index$/, "/");
      if (url === "") url = "/";
      // Priority
      let prio = "0.6";
      if (url === "/") prio = "1.0";
      else if (url.startsWith("/prices") || url.startsWith("/doctors")) prio = "0.9";
      else if (url.startsWith("/equipment") || url.startsWith("/contacts")) prio = "0.8";
      else if (url.startsWith("/before-after") || url.startsWith("/reviews")) prio = "0.7";
      pages.push({ url, prio });
    }
  }
}
walkPages(OUT);

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const p of pages) {
  xml += `  <url>\n    <loc>https://kosmetolog-citymed.ru${p.url}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${p.prio}</priority>\n  </url>\n`;
}
xml += '</urlset>';
fs.writeFileSync(path.join(OUT, "sitemap.xml"), xml);

console.log(`\n🎯 Обработано ${htmlFiles.length} файлов`);
console.log(`   • Sitemap: ${pages.length} страниц`);
console.log("   • Дубликаты preload-изображений удалены");
console.log("   • noModule (legacy JS) скрипты удалены");
