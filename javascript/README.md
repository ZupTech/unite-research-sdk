# Unite Research SDK and CLI

Official JavaScript/TypeScript client for the public [Unite Research API](https://research.unitebr.com/developers). No account or API key is required. Node.js 22+; no runtime dependencies.

```sh
npm install github:ZupTech/unite-research-sdk
npx --package=github:ZupTech/unite-research-sdk unite-research charts --query CPM
npx --package=github:ZupTech/unite-research-sdk unite-research chart ch-bfday --limit 50
npx --package=github:ZupTech/unite-research-sdk unite-research citation ch-bfday
```

```js
import { UniteResearch, ResearchAPIError } from 'unite-research-sdk';
const api = new UniteResearch();
const charts = await api.listCharts({ query: 'CPM', limit: 50 });
const page = await api.getChartData('ch-bfday');
for await (const row of api.iterateRows('ch-bfday')) console.log(row);
const { citation } = await api.getCitation('ch-bfday');
console.log(citation.canonical_url);
```

Methods: `listCharts({query, limit, cursor, offset})`, `getChartData(chartId, {limit, cursor, offset})`, `getCitation(chartId?)`, `health()`, `iterateCharts({query, limit})`, `iterateRows(chartId, {limit})`. Use cursor or offset, never both. Iterators retrieve every page and reject repeated cursors. Display values retain Portuguese decimal commas, signs and units; cite each chart's period, population and comparison. Associations do not establish causality.

Constructor options: `baseUrl` (default `https://research.unitebr.com/api/v1/`), `timeout` (milliseconds, default 20000), `fetch` (optional Fetch-compatible implementation). HTTP errors throw `ResearchAPIError` with `status` and RFC 9457 `problem`; network and timeout errors remain native. No automatic retries or writes. CLI prints JSON to stdout and errors to stderr with exit code 1. `unite-research --help` lists commands.

The SDK code is MIT licensed. The study and data retain the [published attribution and reuse conditions](https://research.unitebr.com/api/v1/citation). [OpenAPI](https://research.unitebr.com/openapi.json) · [MCP endpoint](https://research.unitebr.com/mcp) · [Python client](https://github.com/ZupTech/unite-research-sdk/tree/main/python).
