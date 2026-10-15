"""Public, read-only Unite Research API client. No API key required."""
import json
from urllib.error import HTTPError
from urllib.parse import urlencode, quote, urlparse
from urllib.request import Request, urlopen

__version__ = "1.0.0"

class ResearchAPIError(Exception):
    def __init__(self, status, problem):
        self.status, self.problem = status, problem
        super().__init__(problem.get("detail") or problem.get("title") or f"HTTP {status}")

class UniteResearch:
    def __init__(self, base_url="https://research.unitebr.com/api/v1/", timeout=20):
        if urlparse(base_url).scheme not in ("https", "http"):
            raise ValueError("base_url must use HTTP or HTTPS")
        if timeout <= 0:
            raise ValueError("timeout must be positive seconds")
        self.base_url, self.timeout = base_url.rstrip("/") + "/", timeout

    def _get(self, path, **params):
        query = urlencode({k: v for k, v in params.items() if v is not None})
        request = Request(self.base_url + path + ("?" + query if query else ""), headers={"Accept": "application/json", "User-Agent": "unite-research-sdk/" + __version__})
        try:
            with urlopen(request, timeout=self.timeout) as response:
                return json.load(response)
        except HTTPError as error:
            try:
                problem = json.loads(error.read())
            except (ValueError, UnicodeError):
                problem = {"title": "Invalid JSON response"}
            raise ResearchAPIError(error.code, problem) from error

    def list_charts(self, query=None, limit=None, cursor=None, offset=None):
        return self._get("charts", query=query, limit=limit, cursor=cursor, offset=offset)

    def get_chart_data(self, chart_id, limit=None, cursor=None, offset=None):
        return self._get("charts/" + quote(chart_id, safe=""), limit=limit, cursor=cursor, offset=offset)

    def get_citation(self, chart_id=None):
        return self._get("citation", chart_id=chart_id)

    def health(self):
        return self._get("health")

    def _iterate(self, method, **params):
        cursor, seen = None, set()
        while True:
            page = method(cursor=cursor, **params)
            yield from page["items"]
            cursor = page["next_cursor"]
            if not cursor:
                return
            if cursor in seen:
                raise RuntimeError("API returned a repeated cursor")
            seen.add(cursor)

    def iterate_charts(self, query=None, limit=50):
        return self._iterate(self.list_charts, query=query, limit=limit)

    def iterate_rows(self, chart_id, limit=50):
        return self._iterate(self.get_chart_data, chart_id=chart_id, limit=limit)
