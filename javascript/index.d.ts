export interface PageOptions { limit?: number; cursor?: string; offset?: number }
export interface Chart { chart_id: string; title: string; comparison: string; period_and_population: string; columns: string[]; row_count: number }
export interface Citation { source: string; title: string; canonical_url: string; markdown_url: string; published: string; modified: string; attribution: string; methodology: string; methodology_url: string; interpretation: string; independence: string; reuse: string; chart?: Chart & { url: string } }
export interface Page<T> { ok: true; total: number; offset: number; next_offset: number | null; next_cursor: string | null; items: T[] }
export class ResearchAPIError extends Error { status: number; problem: { title?: string; detail?: string; status?: number }; }
export class UniteResearch {
  constructor(options?: { baseUrl?: string; fetch?: typeof globalThis.fetch; timeout?: number });
  listCharts(options?: PageOptions & { query?: string }): Promise<Page<Chart> & { version: string }>;
  getChartData(chartId: string, options?: PageOptions): Promise<Page<string[]> & { chart: Chart; citation: Citation; value_format: string }>;
  getCitation(chartId?: string): Promise<{ ok: true; citation: Citation }>;
  health(): Promise<{ status: string; dataset_version: string; chart_count: number; row_count: number }>;
  iterateCharts(options?: { query?: string; limit?: number }): AsyncGenerator<Chart>;
  iterateRows(chartId: string, options?: { limit?: number }): AsyncGenerator<string[]>;
}
