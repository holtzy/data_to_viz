import type { MouseEventHandler, ReactNode } from "react";

/**
 * A chart type as on the React Graph Gallery front page: round icon with a
 * "+" overlay on hover, and its name below. Used by the home portfolio and the
 * "Going further" sections of data stories.
 */
export function ChartTile({
  href,
  image,
  title,
  onClick,
}: {
  href: string;
  image: string;
  title: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <a href={href} onClick={onClick} className="group flex w-[130px] flex-col items-center text-center no-underline">
      <span className="relative block size-[122px]">
        <img src={image} alt="" loading="lazy" className="m-0 size-[122px] object-contain" />
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center rounded-full bg-brand text-4xl text-white opacity-0 transition-opacity group-hover:opacity-60"
        >
          +
        </span>
      </span>
      <span className="mt-1 text-sm leading-snug font-light text-slate-500 group-hover:text-slate-900">{title}</span>
    </a>
  );
}

/** A left-aligned row of chart tiles that wraps. */
export function ChartTiles({ children }: { children: ReactNode }) {
  return <div className="my-6 flex flex-wrap justify-start gap-x-3 gap-y-5">{children}</div>;
}
