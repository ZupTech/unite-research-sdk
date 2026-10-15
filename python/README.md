# Unite Research Python SDK and CLI

Official Python client for the public [Unite Research API](https://research.unitebr.com/developers). Python 3.10+; standard library only. No account or API key required.

```sh
pip install "git+https://github.com/ZupTech/unite-research-sdk.git#subdirectory=python"
unite-research charts --query CPM
unite-research chart ch-bfday --limit 50
python -m unite_research citation ch-bfday
```

```python
from unite_research import UniteResearch, ResearchAPIError
api = UniteResearch()
charts = api.list_charts(query="CPM", limit=50)
chart = api.get_chart_data("ch-bfday")
for row in api.iterate_rows("ch-bfday"):
    print(row)
print(api.get_citation("ch-bfday")["citation"]["canonical_url"])
```

Methods: `list_charts(query=None, limit=None, cursor=None, offset=None)`, `get_chart_data(chart_id, limit=None, cursor=None, offset=None)`, `get_citation(chart_id=None)`, `health()`, `iterate_charts(query=None, limit=50)`, `iterate_rows(chart_id, limit=50)`. Use cursor or offset, never both. Iterators retrieve every page and reject repeated cursors. HTTP errors raise `ResearchAPIError` with `status` and RFC 9457 `problem`. Network and timeout exceptions remain native; there are no automatic retries or writes. Constructor accepts `base_url` and `timeout` in seconds (default 20).

The CLI prints JSON to stdout; errors go to stderr with exit code 1. Use `unite-research --help`. Install either the Python or JavaScript CLI in the same environment, since both expose the `unite-research` command.

Values preserve Portuguese decimal commas, signs and units. Cite the source, period, population and comparison. Associations do not establish causality. SDK code is MIT licensed; study/data retain their [published attribution and reuse conditions](https://research.unitebr.com/api/v1/citation). [JavaScript SDK](https://github.com/ZupTech/unite-research-sdk/tree/main/javascript) · [OpenAPI](https://research.unitebr.com/openapi.json).
