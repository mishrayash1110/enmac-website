import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
function exists(p){return fs.existsSync(path.join(root,p))}
function read(p){return fs.readFileSync(path.join(root,p),'utf8')}
test('eight main website routes exist',()=>{for(const p of ['src/app/page.tsx','src/app/about/page.tsx','src/app/loans/page.tsx','src/app/loans/[slug]/page.tsx','src/app/guides/page.tsx','src/app/calculators/page.tsx','src/app/apply/page.tsx'])assert.ok(exists(p),p);});
test('service catalogue has distinct service slugs and related paths',()=>{const s=read('src/data/services.ts');const slugs=[...s.matchAll(/\bslug:'([^']+)'/g)].map(x=>x[1]);assert.ok(slugs.length>=9);assert.equal(new Set(slugs).size,slugs.length);for(const link of ['personal','home','property','business','corporate','trade-finance','business-term-loan','working-capital','securities'])assert.ok(slugs.includes(link));});
test('knowledge library contains at least ten article slugs',()=>{const s=read('src/data/guides.ts');const slugs=[...s.matchAll(/\bslug:'([^']+)'/g)].map(x=>x[1]);assert.ok(slugs.length>=10);assert.equal(new Set(slugs).size,slugs.length);assert.ok(exists('src/app/guides/[slug]/page.tsx'));});
test('draft legal routes and safety pages exist',()=>{for(const x of ['privacy-policy','terms','fee-disclosure','grievance-redressal']){assert.ok(exists(`src/app/${x}/page.tsx`));assert.ok(read(`src/app/${x}/page.tsx`).includes('UNAPPROVED DRAFT'))}assert.ok(exists('src/app/not-found.tsx'))});
test('server routes require configured email before accepting submissions',()=>{const api=read('src/lib/api/leads.ts');assert.ok(api.includes('if(!emailConfiguration())return NextResponse.json'));assert.ok(api.includes('status:503'));assert.ok(api.includes('parameterized')||api.includes('Parameterized'));assert.ok(exists('docs/schema.sql'))});
test('src has no simple payment collection routes',()=>{assert.ok(!exists('src/app/api/payments/route.ts'));assert.ok(!exists('src/app/checkout/page.tsx'))});
