import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

const source = fs.readFileSync(new URL('../src/lib/site-url.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const moduleExports = {};
new Function('exports', compiled)(moduleExports);

test('deployment URL omits missing and placeholder domains, normalizes origins and rejects unsafe values', () => {
  const previous = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    for (const value of ['', 'https://www.example.com']) {
      process.env.NEXT_PUBLIC_SITE_URL = value;
      assert.equal(moduleExports.siteUrl(), undefined);
    }
    process.env.NEXT_PUBLIC_SITE_URL = ' https://enmac.test/ ';
    assert.equal(moduleExports.siteUrl(), 'https://enmac.test');
    for (const value of ['enmac.test', 'ftp://enmac.test', 'https://enmac.test/path', 'https://user:password@enmac.test', 'https://enmac.test/?query=1']) {
      process.env.NEXT_PUBLIC_SITE_URL = value;
      assert.throws(() => moduleExports.siteUrl());
    }
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previous;
  }
});
