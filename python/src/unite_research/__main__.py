import argparse
import json
import sys
from . import UniteResearch

def main():
    parser = argparse.ArgumentParser(description="Read published Unite Research data. No API key required; output is JSON.")
    parser.add_argument("--base-url", default="https://research.unitebr.com/api/v1/")
    commands = parser.add_subparsers(dest="command", required=True)
    charts = commands.add_parser("charts")
    charts.add_argument("--query")
    chart = commands.add_parser("chart")
    chart.add_argument("chart_id")
    for sub in (charts, chart):
        sub.add_argument("--limit", type=int)
        sub.add_argument("--cursor")
    citation = commands.add_parser("citation")
    citation.add_argument("chart_id", nargs="?")
    commands.add_parser("health")
    args = parser.parse_args()
    try:
        api = UniteResearch(base_url=args.base_url)
        if args.command == "charts":
            result = api.list_charts(query=args.query, limit=args.limit, cursor=args.cursor)
        elif args.command == "chart":
            result = api.get_chart_data(args.chart_id, limit=args.limit, cursor=args.cursor)
        elif args.command == "citation":
            result = api.get_citation(args.chart_id)
        else:
            result = api.health()
        print(json.dumps(result, ensure_ascii=False, indent=2))
    except Exception as error:
        print(str(error), file=sys.stderr)
        return 1
    return 0

if __name__ == "__main__":
    sys.exit(main())
