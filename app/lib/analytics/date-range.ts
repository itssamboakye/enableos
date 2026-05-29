import type { AnalyticsPeriod, DateRange } from "./types";

export function resolveDateRange(period: AnalyticsPeriod = "30d"): DateRange {
  const to = new Date();
  const from = new Date(to);

  switch (period) {
    case "7d":
      from.setDate(from.getDate() - 7);
      break;
    case "90d":
      from.setDate(from.getDate() - 90);
      break;
    case "30d":
    default:
      from.setDate(from.getDate() - 30);
      break;
  }

  return { from, to, period };
}

export function previousPeriodRange(range: DateRange): DateRange {
  const ms = range.to.getTime() - range.from.getTime();
  const to = new Date(range.from.getTime());
  const from = new Date(range.from.getTime() - ms);
  return { from, to, period: range.period };
}
