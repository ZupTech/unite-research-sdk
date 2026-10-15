# Unite Research SDKs and CLI

Official read-only JavaScript/TypeScript and Python clients for [Unite Research](https://research.unitebr.com/). Query 19 published creative benchmark charts, get data and cite the source. Public access; no API key. Values preserve Portuguese units and decimal formatting.

## JavaScript / TypeScript (Node.js 22+)

```sh
npm install github:ZupTech/unite-research-sdk
npx --package=github:ZupTech/unite-research-sdk unite-research charts --query CPM
```

```js
import { UniteResearch } from "unite-research-sdk";
const api = new UniteResearch();
for await (const row of api.iterateRows("ch-bfday")) console.log(row);
```

[JavaScript reference and error handling](javascript/README.md).

## Python (3.10+)

```sh
pip install "git+https://github.com/ZupTech/unite-research-sdk.git#subdirectory=python"
python -m unite_research charts --query CPM
```

```python
from unite_research import UniteResearch
api = UniteResearch()
for row in api.iterate_rows("ch-bfday"):
    print(row)
```

[Python reference and error handling](python/README.md). Both CLIs expose unite-research; install one per environment. Neither package is currently published to npm/PyPI; install from this repository or its release artifacts.

[API documentation](https://research.unitebr.com/developers) · [OpenAPI](https://research.unitebr.com/openapi.json) · [Version policy](https://research.unitebr.com/api-policy) · [MCP endpoint](https://research.unitebr.com/mcp) · [Agent skill](skills/research-benchmark/SKILL.md).

SDK code: MIT. The study/data retain their [published attribution and reuse terms](https://research.unitebr.com/api/v1/citation). Observational associations do not establish causality.

## Verified MCP server

The public remote MCP server is listed as **active** in the [official MCP Registry](https://registry.modelcontextprotocol.io/v0.1/servers/com.unitebr.research%2Fbenchmark/versions/latest), under the domain-verified name `com.unitebr.research/benchmark`, version 1.1.0. Connect to `https://research.unitebr.com/mcp`. MCP Apps-compatible hosts can display an interactive chart explorer; other hosts receive the same structured data.
