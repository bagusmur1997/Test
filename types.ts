export enum SlideStep {
  INTRO = 0,
  GOLDEN_RULE = 1,
  OPERATORS = 2,
  REFERENCES = 3,
  ABSOLUTE_REFS = 4,
  LOGIC_FUNCTIONS = 5,
  SUMIFS = 6,
  BASIC_STATS = 7,
  COUNT_FAMILY = 8,
  MEDIAN_MODE = 9,
  LOOKUPS = 10,
  XLOOKUP = 11,
  PIVOT_PREP = 12,
  PIVOT_CREATE = 13,
  PIVOT_ANATOMY = 14,
  PIVOT_OPS = 15,
  PIVOT_CHART = 16,
  TIPS_TRICKS = 17,
  SUMMARY = 18
}

export interface SlideProps {
  isActive: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}