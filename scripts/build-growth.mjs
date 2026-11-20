import fs from 'node:fs';
import path from 'node:path';
import { pages } from './growth-pages.mjs';
import { CATALOG_PRODUCTS } from '../src/data/catalog.ts';

const root = path.resolve('dist');
const images = { slush: 'hero_slush_machine_1795165020736.jpg', soft: 'product_soft_serve_1795165021015.jpg', floss: 'product_candy_floss_1795165020843.jpg', popcorn: 'product_popcorn_cart_1795165022462.jpg', mixes: 'product_mixes_syrups_1795165022390.jpg' };
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const lookup = Object.fromEntries(pages.map(p => [p.slug,p]));
const models = {'slush-machines':['SC-2','SC-3','SC-1'],'slush-mix':['SM-2L'],'soft-serve-machines':['BQ323T','BQ115T'],'soft-serve-machines/bq323t':['BQ323T'],'candy-floss-machines':['MF-01'],'popcorn-machines':['POP6A-B']};
function productTable(slug){
 const products=CATALOG_PRODUCTS.filter(p=>models[slug]?.includes(p.sku));
 if(!products.length)return '';
 return `<section><h2>Illustrative model and pack specifications</h2><p>These values are from the design catalogue and are not confirmed manufacturer figures or prices.</p><div class="spec-grid">${products.map(p=>`<div class="spec-card"><h3>${esc(p.sku)}</h3><p>${esc(p.name)}</p><dl>${p.specs.filter(s=>!['Warranty','Dispatch','Origin'].includes(s.label)).map(s=>`<dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd>`).join('')}</dl><p><strong>Sample price: R${p.priceZar.toFixed(2)}</strong></p></div>`).join('')}</div></section>`;
}
const field = (name, label, value, step = '1', min = '0') => `<label>${label}<input name="${name}" type="number" min="${min}" step="${step}" value="${value}" required></label>`;
const select = (name, label, options, selected) => `<label>${label}<select name="${name}">${options.map(([v,t]) => `<option value="${esc(v)}"${v === selected ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select></label>`;
const rentalRegions = [['pretoria','Pretoria'],['centurion','Centurion'],['midrand','Midrand'],['johannesburg','Johannesburg']];
const rentalMachines = [['slush','Double-barrel slush'],['soft','Soft serve'],['floss','Candy floss'],['popcorn','Popcorn']];
function calculator(tool) {
  if (!tool) return '';
  const [kind, region] = tool.split(':');
  let fields = '', label = '', initial = '';
  if (kind === 'yield') { label = 'Slush yield and serving cost'; fields = field('volume','Concentrate (L)',5,'.1','.1')+field('ratio','Water parts per concentrate part',4,'.1')+field('price','Pack cost (R)',200,'.01')+field('cup','Serving volume (ml)',250,1,1)+field('waste','Waste (%)',5,'.1')+field('sell','Selling price per serving (R)',15,'.01'); }
  if (kind === 'sugar') { label = 'Candy floss portion planner'; fields = field('weight','Pack weight (g)',1500,1,1)+field('portion','Grams per serving',25,1,1)+field('price','Pack cost (R)',80,'.01')+field('waste','Waste (%)',5,'.1'); }
  if (kind === 'roi') { label = 'Equipment investment and break-even planner'; fields = field('investment','Total equipment investment (R)',22495,'.01')+field('servings','Servings sold per day',40,1)+field('sell','Selling price per serving (R)',15,'.01')+field('variable','Variable cost per serving (R)',5,'.01')+field('fixed','Daily operating costs (R)',100,'.01'); }
  if (kind === 'rental') { label = 'Event hire quote preview'; fields = select('machine','Machine',rentalMachines,'slush')+select('duration','Duration',[['day','Day'],['weekend','Weekend'],['corporate','Corporate']], 'day')+select('region','Delivery zone',rentalRegions,region)+field('extra','Extra consumable packs',0,1)+select('attendant','Attendant',[['no','No'],['yes','Yes']],'no')+field('guests','Expected guests',100,1,1)+field('cup','Serving volume (ml)',250,1,1)+'<label>Event date (planning only)<input type="date" name="date" required></label>'; }
  if (kind === 'wholesale') { label = 'Wholesale trial order planner'; fields = field('quantity','Order quantity (packs)',10,1,1)+field('unit','Sample unit price (R)',85.5,'.01')+field('discount','Illustrative discount (%)',10,'.1')+field('delivery','Estimated delivery (R)',125,'.01'); }
  return `<section class="calculator" id="calculator"><h2>${label}</h2><p>Change the assumptions below. All values are illustrative; no data is sent, saved or submitted to a supplier.</p><form data-calculator="${kind}"><div class="inputs">${fields}</div><button type="submit">Calculate preview</button> <button type="button" class="secondary" data-copy>Copy estimate</button><output aria-live="polite">${initial || 'Enter your assumptions to calculate an estimate.'}</output></form></section>`;
}
fs.mkdirSync(root, {recursive:true});
for (const p of pages) {
  const prefix = '../'.repeat(p.slug.split('/').length);
  const link = slug => `${prefix}${slug}/`;
  const related = p.related.map(slug => `<a class="related" href="${link(slug)}">${esc(lookup[slug].h1)} <span aria-hidden="true">→</span></a>`).join('');
  const breadcrumb = { '@context':'https://schema.org', '@type':'BreadcrumbList', itemListElement:[{'@type':'ListItem',position:1,name:'Concept home',item:'https://edubonke.github.io/Smart-Candy/'},{'@type':'ListItem',position:2,name:p.h1,item:`https://edubonke.github.io/Smart-Candy/${p.slug}/`}] };
  const canonical = `https://edubonke.github.io/Smart-Candy/${p.slug}/`;
  const html = `<!doctype html><html lang="en-ZA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>${esc(p.title)} | Concept</title><meta name="description" content="${esc(p.description)}"><meta property="og:title" content="${esc(p.title)} | Concept"><meta property="og:description" content="${esc(p.description)}"><meta property="og:type" content="website"><link rel="canonical" href="${canonical}"><link rel="stylesheet" href="${prefix}growth.css"><script type="application/ld+json">${JSON.stringify(breadcrumb).replace(/</g,'\\u003c')}</script><script defer src="${prefix}growth.js"></script></head><body><div class="notice">Independent redesign concept · Illustrative information only · No orders, payments or bookings. <a href="https://www.smartcandy.co.za/" rel="noopener noreferrer">Official retailer</a></div><header><a class="brand" href="${prefix}">Smart Candy <small>CONCEPT</small></a><nav aria-label="Main navigation"><a href="${prefix}#catalog">Catalogue</a><a href="${link('rentals')}">Rentals</a><a href="${link('wholesale')}">Wholesale</a><a href="${link('business-starter-kits')}">Starter kits</a></nav></header><main><nav class="crumb" aria-label="Breadcrumb"><a href="${prefix}">Home</a> / ${esc(p.h1)}</nav><section class="hero"><div><p class="eyebrow">SOUTH AFRICAN FOOD-SERVICE · BUYING GUIDE</p><h1>${esc(p.h1)}</h1><p>${esc(p.description)}</p><a class="button" href="${p.tool ? '#calculator' : `${prefix}#catalog`}">${p.tool ? 'Calculate a sample estimate' : 'Explore concept catalogue'}</a></div><img src="${prefix}src/assets/images/${images[p.image]}" alt="Illustrative ${esc(p.h1)} equipment and supplies" width="640" height="480" loading="eager"></section><div class="body-grid"><article>${p.sections.map(([h,v])=>`<section><h2>${esc(h)}</h2><p>${esc(v)}</p></section>`).join('')}${productTable(p.slug)}${calculator(p.tool)}</article><aside><h2>Explore related guides</h2>${related}<p class="small">This is a non-commercial demonstration. Verify all product, price and fulfilment details with an authorised supplier.</p></aside></div></main><footer><p>Independent concept by EduBonke · No affiliation or ability to transact is asserted.</p><a href="${prefix}">Return to storefront</a></footer></body></html>`;
  const dir = path.join(root,p.slug); fs.mkdirSync(dir,{recursive:true}); fs.writeFileSync(path.join(dir,'index.html'),html);
}
// Sitemap is generated as a review artefact, NOT submitted while the concept is noindex.
fs.writeFileSync(path.join(root,'sitemap-preview.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['',...pages.map(p=>p.slug+'/')].map(s=>`<url><loc>https://edubonke.github.io/Smart-Candy/${s}</loc></url>`).join('')}</urlset>`);
console.log(`Generated ${pages.length} independently addressable concept pages.`);
