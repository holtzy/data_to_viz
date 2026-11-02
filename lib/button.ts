import { cn } from "@/lib/utils";

/**
 * Button styles for links and toggles. Use at most one `primary` per row of
 * buttons; everything else is `secondary`. Tab/filter rows use `toggle`.
 */
const BASE =
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-[4px] font-medium no-underline transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand/50";

const VARIANTS = {
  primary: "bg-brand text-white hover:bg-[#5a9e8f]",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  toggle: "bg-slate-100 text-slate-700 hover:bg-slate-200 aria-pressed:bg-slate-900 aria-pressed:text-white aria-selected:bg-slate-900 aria-selected:text-white",
} as const;

const SIZES = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

export function buttonClass(
  variant: keyof typeof VARIANTS = "secondary",
  size: keyof typeof SIZES = "md",
  className?: string,
) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}
