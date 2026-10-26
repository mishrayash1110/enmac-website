import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root = new URL('../', import.meta.url);
test('calculator has no Recharts or es-toolkit dependency', () => {
  const source = readFileSync(new URL('src/components/calculators/CalculatorSuite.tsx', root), 'utf8');
  const packageJson = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'));
  assert.doesNotMatch(source, /from ['"]recharts['"]/);
  assert.equal(packageJson.dependencies.recharts, undefined);
  assert.match(source, /function AmortizationChart\(/);
  assert.match(source, /<svg /);
});
