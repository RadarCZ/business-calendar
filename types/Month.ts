/**
 * Month enumeration aligned with JavaScript `Date` zero-based months.
 *
 * Values are 0–11 where `January = 0` and `December = 11` so you can safely
 * pass them to `new Date(year, month, day)` and related APIs.
 */
export enum Month {
  /** 0 — January */
  January,
  /** 1 — February */
  February,
  /** 2 — March */
  March,
  /** 3 — April */
  April,
  /** 4 — May */
  May,
  /** 5 — June */
  June,
  /** 6 — July */
  July,
  /** 7 — August */
  August,
  /** 8 — September */
  September,
  /** 9 — October */
  October,
  /** 10 — November */
  November,
  /** 11 — December */
  December,
}
