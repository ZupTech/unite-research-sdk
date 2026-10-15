import unittest
from unite_research import UniteResearch, ResearchAPIError

class PublicClientContract(unittest.TestCase):
    def test_all_published_data_and_errors(self):
        api = UniteResearch()
        charts = list(api.iterate_charts(limit=5))
        self.assertEqual(len(charts), 19)
        total = 0
        for chart in charts:
            rows = list(api.iterate_rows(chart["chart_id"]))
            self.assertEqual(len(rows), chart["row_count"])
            self.assertTrue(all(len(row) == len(chart["columns"]) for row in rows))
            total += len(rows)
        self.assertEqual(total, 248)
        self.assertEqual(api.get_citation("ch-bfday")["citation"]["chart"]["chart_id"], "ch-bfday")
        with self.assertRaises(ResearchAPIError) as caught:
            api.get_chart_data("missing")
        self.assertEqual(caught.exception.status, 404)

    def test_repeated_cursor_is_bounded(self):
        api = UniteResearch()
        api.list_charts = lambda **_: {"items": [], "next_cursor": "repeated"}
        with self.assertRaisesRegex(RuntimeError, "repeated cursor"):
            list(api.iterate_charts())

if __name__ == "__main__":
    unittest.main()
