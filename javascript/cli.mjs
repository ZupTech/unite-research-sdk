#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { UniteResearch } from './index.mjs';
try {
  const { values, positionals } = parseArgs({ allowPositionals: true, options: { query: { type: 'string' }, limit: { type: 'string' }, cursor: { type: 'string' }, 'base-url': { type: 'string' }, help: { type: 'boolean', short: 'h' } } });
  const [command, chartId, ...extra] = positionals;
  if (values.help || !command) {
    console.log('Unite Research CLI\nUsage: unite-research charts [--query CPM] [--limit 50] [--cursor TOKEN]\n       unite-research chart CHART_ID [--limit 50] [--cursor TOKEN]\n       unite-research citation [CHART_ID]\n       unite-research health\nOptional: --base-url URL (default: https://research.unitebr.com/api/v1/)\nPublic data; no API key. Output: JSON.');
  } else {
    if (extra.length || (!['chart', 'citation'].includes(command) && chartId)) throw new Error('Unexpected positional argument. Use --help.');
    const api = new UniteResearch({ baseUrl: values['base-url'] });
    const paging = { limit: values.limit === undefined ? undefined : Number(values.limit), cursor: values.cursor };
    let data;
    if (command === 'charts') data = await api.listCharts({ query: values.query, ...paging });
    else if (command === 'chart' && chartId) data = await api.getChartData(chartId, paging);
    else if (command === 'citation') data = await api.getCitation(chartId);
    else if (command === 'health') data = await api.health();
    else throw new Error('Unknown command or missing CHART_ID. Use --help.');
    console.log(JSON.stringify(data, null, 2));
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }
