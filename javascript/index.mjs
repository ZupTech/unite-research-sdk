const BASE = 'https://research.unitebr.com/api/v1/';
export class ResearchAPIError extends Error {
  constructor(status, problem) {
    super(problem.detail || problem.title || `HTTP ${status}`);
    this.name = 'ResearchAPIError'; this.status = status; this.problem = problem;
  }
}
/** Public read-only client. No account or API key is required. */
export class UniteResearch {
  constructor({ baseUrl = BASE, fetch: fetcher = globalThis.fetch, timeout = 20000 } = {}) {
    const url = new URL(baseUrl);
    if (!['https:', 'http:'].includes(url.protocol)) throw new TypeError('baseUrl must use HTTP or HTTPS.');
    if (!Number.isFinite(timeout) || timeout <= 0) throw new TypeError('timeout must be positive milliseconds.');
    this.baseUrl = url.href.replace(/\/?$/, '/'); this.fetch = fetcher; this.timeout = timeout;
  }
  async request(path, params = {}) {
    const url = new URL(path, this.baseUrl);
    for (const [key, value] of Object.entries(params)) if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
    const response = await this.fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(this.timeout) });
    let data;
    try { data = await response.json(); } catch { throw new ResearchAPIError(response.status, { title: 'Invalid JSON response' }); }
    if (!response.ok) throw new ResearchAPIError(response.status, data);
    return data;
  }
  listCharts(options = {}) { return this.request('charts', options); }
  getChartData(chartId, options = {}) { return this.request('charts/' + encodeURIComponent(chartId), options); }
  getCitation(chartId) { return this.request('citation', { chart_id: chartId }); }
  health() { return this.request('health'); }
  async *iterateCharts({ query, limit = 50 } = {}) {
    let cursor; const seen = new Set();
    do {
      const page = await this.listCharts({ query, limit, cursor });
      yield* page.items;
      cursor = page.next_cursor;
      if (cursor && seen.has(cursor)) throw new Error('API returned a repeated cursor.');
      seen.add(cursor);
    } while (cursor);
  }
  async *iterateRows(chartId, { limit = 50 } = {}) {
    let cursor; const seen = new Set();
    do {
      const page = await this.getChartData(chartId, { limit, cursor });
      yield* page.items;
      cursor = page.next_cursor;
      if (cursor && seen.has(cursor)) throw new Error('API returned a repeated cursor.');
      seen.add(cursor);
    } while (cursor);
  }
}
