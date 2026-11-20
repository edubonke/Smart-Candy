import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { pages } from './growth-pages.mjs';
const root = path.resolve('dist');
assert.equal(new Set(pages.map(p=>p.slug)).size,pages.length);
assert.equal(new Set(pages.map(p=>p.title)).size,pages.length);
assert(pages.length >= 15);
for(const p of pages){
 const f=path.join(root,p.slug,'index.html'),html=fs.readFileSync(f,'utf8');
 assert.equal((html.match(/<h1>/g)||[]).length,1,`${p.slug} H1`);
 assert(html.includes('name="robots" content="noindex, nofollow"'),`${p.slug} noindex`);
 assert(html.includes('name="description"'),`${p.slug} metadata`);
 assert(html.includes('BreadcrumbList'),`${p.slug} breadcrumb`);
 for(const m of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)){
  if(m[1].startsWith('https:'))continue;
  const target=path.resolve(path.dirname(f),m[1]);
  assert(target.startsWith(root+path.sep)||target===root,`Unsafe link ${m[1]}`);
  assert(fs.existsSync(target),`Broken link ${p.slug}: ${m[1]}`);
 }
}
assert(fs.readFileSync(path.join(root,'index.html'),'utf8').includes('noindex, nofollow'));
assert(fs.existsSync(path.join(root,'sitemap-preview.xml')));
console.log(`Verified ${pages.length} landing pages, metadata, noindex, breadcrumbs and relative assets/links.`);
