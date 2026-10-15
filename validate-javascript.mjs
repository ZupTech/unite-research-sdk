import assert from 'node:assert/strict';
import { UniteResearch, ResearchAPIError } from './javascript/index.mjs';
const api = new UniteResearch();
const charts = await Array.fromAsync(api.iterateCharts({ limit: 5 }));
assert.equal(charts.length, 19);
let rows = 0;
for (const chart of charts) {
  const values = await Array.fromAsync(api.iterateRows(chart.chart_id));
  assert.equal(values.length, chart.row_count);
  assert.ok(values.every(row => row.length === chart.columns.length));
  rows += values.length;
}
assert.equal(rows, 248);
assert.equal((await api.getCitation('ch-bfday')).citation.chart.chart_id, 'ch-bfday');
await assert.rejects(api.getChartData('missing'), error => error instanceof ResearchAPIError && error.status === 404);
console.log(JSON.stringify({ language: 'JavaScript', charts: charts.length, rows, invalidChart: 404 }));
