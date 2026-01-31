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
  FILTER_FREEZE = 13,
  PIVOT_PREP = 14,
  PIVOT_CREATE = 15,
  PIVOT_ANATOMY = 16,
  PIVOT_OPS = 17,
  PIVOT_CHART = 18,
  TIPS_TRICKS = 19,
  SUMMARY = 20
}

export interface SlideProps {
  isActive: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}