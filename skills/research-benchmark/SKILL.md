---
name: unite-research-benchmark
description: Consult and cite the public Unite Research Black Friday Brasil 2026 benchmark. Use when a user needs published creative-pattern, CPM, conversion-cost or launch-timing data from the study.
---

# Unite Research benchmark

## When to use

Use this skill to answer questions about the published Benchmark Criativo Black Friday Brasil 2026 or retrieve chart rows for an analysis. The public API requires no login, key or payment. Its scope is aggregate published data; commercial Unite accounts are separate.

## Workflow

1. Find a chart with GET https://research.unitebr.com/api/v1/charts?query=CPM&limit=10. Search may use other Portuguese topics such as oferta, thumbstop or conversão.
2. Read its chart_id, comparison, period_and_population and columns.
3. Fetch GET https://research.unitebr.com/api/v1/charts/{chart_id}?limit=20. Follow next_offset until null. Rows in items follow the column order.
4. Fetch GET https://research.unitebr.com/api/v1/citation?chart_id={chart_id}. Include the canonical source and the period when quoting a result.
5. Preserve the displayed units, decimal commas, signs and textual values. A variation against October is not an absolute CPM; percentage changes are not automatically percentage-point differences.

The findings are observational, not controlled experiments. Distinguish Black Friday 2025 results from 2026 calendar guidance. Example ads do not identify study participants. Source: Unite, Benchmark Criativo Black Friday Brasil 2026 (outubro de 2026).

## Errors and fallback

For 400, correct the parameter described in detail. For 404, find a valid chart ID from the list. Use bounded retries for transient failures and honor Retry-After if provided. Read the full study and its tables at https://research.unitebr.com/benchmark-criativo-black-friday-brasil-2026.md if the API is temporarily unavailable.

## References

- [API documentation](https://research.unitebr.com/developers)
- [OpenAPI](https://research.unitebr.com/openapi.json)
- [Public access and authentication](https://research.unitebr.com/auth.md)
- [Browser tools and WebMCP](https://research.unitebr.com/agents.md)
