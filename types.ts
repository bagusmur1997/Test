
export enum SlideStep {
  INTRO = 0,
  EXCEL_INTRO = 1,
  GOLDEN_RULE = 2,
  OPERATORS = 3,
  REFERENCES = 4,
  ABSOLUTE_REFS = 5,
  LOGIC_FUNCTIONS = 6,
  SUMIFS = 7,
  BASIC_STATS = 8,
  COUNT_FAMILY = 9,
  MEDIAN_MODE = 10,
  LOOKUPS = 11,
  XLOOKUP = 12,
  FREEZE_PANES = 13,
  FILTER_DATA = 14,
  PIVOT_PREP = 15,
  PIVOT_CREATE = 16,
  PIVOT_ANATOMY = 17,
  PIVOT_OPS = 18,
  PIVOT_DRILLDOWN = 19,
  PIVOT_CHART = 20,
  TIPS_TRICKS = 21,
  // Module 3: Case Study 1 (Freight)
  SCENARIO_INTRO = 22,
  SCENARIO_1_XLOOKUP = 23,
  SCENARIO_1_MATH = 24,
  SCENARIO_1_PIVOT = 25,
  // Module 3: Case Study 2 (Lead Time)
  SCENARIO_2_INTRO = 26,
  SCENARIO_2_FORMULAS = 27,
  SCENARIO_2_AGING = 28,
  SCENARIO_2_PIVOT = 29,
  SUMMARY = 30
}

export interface SlideProps {
  isActive: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}
