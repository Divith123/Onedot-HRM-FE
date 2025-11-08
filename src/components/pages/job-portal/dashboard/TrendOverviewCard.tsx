"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TrendOverviewCardProps {
  className?: string;
  // simple numeric series to render the trend; if not provided a default sample is used
  data?: number[];
  title?: string;
  subtitle?: string;
}

// helper: build an SVG path from a numeric array
function buildLinePath(values: number[], w: number, h: number, padX: number, padY: number) {
  if (!values || values.length === 0) return { d: "", points: [] };
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = values.length > 1 ? (w - padX * 2) / (values.length - 1) : 0;

  const points = values.map((v, i) => {
    const x = padX + i * step;
    const y = padY + (1 - (v - min) / range) * (h - padY * 2);
    return { x, y };
  });

  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
  return { d, points };
}

const TrendOverviewCard: React.FC<TrendOverviewCardProps> = ({
  className,
  data,
  title = "Trend Overview",
  subtitle = "Last 30 days",
}) => {
  const series =
    data && data.length > 0
      ? data
      : [120, 136, 150, 140, 160, 174, 168, 180, 170, 185, 175, 190];

  // adjusted for medium card: 294px wide, 147px tall for graph
  const viewW = 294;
  const viewH = 147;
  const padX = 19;
  const padY = 29;

  const { d: lineD, points } = buildLinePath(series, viewW, viewH, padX, padY);

  // build area path (from baseline down)
  const areaD =
    points.length > 0
      ? `${points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ")} L ${
          points[points.length - 1].x
        } ${viewH - padY} L ${points[0].x} ${viewH - padY} Z`
      : "";

  // last point highlight
  const lastPoint = points[points.length - 1];

  return (
    <div
      className={cn(
        "w-[294px] h-[185px] rounded-[20px] border-2 border-[#f5effc] bg-white",
        className,
      )}
    >
      <div className="flex items-start justify-between px-2 py-1">
        <div>
          <h3 className="text-xs font-semibold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-slate-900">{series[series.length - 1]}</div>
          <div className="text-xs text-slate-500">Active</div>
        </div>
      </div>

      <div className="mt-1 h-[147px]">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full h-full">
          <defs>
            <linearGradient id="td-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#03A9F5" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#03A9F5" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* area under the curve */}
          {areaD && <path d={areaD} fill="url(#td-grad)" />}

          {/* main line */}
          {lineD && (
            <path
              d={lineD}
              fill="none"
              stroke="#03A9F5"
              strokeWidth={3}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}

          {/* last point marker */}
          {lastPoint && (
            <g>
              <circle cx={lastPoint.x} cy={lastPoint.y} r={6} fill="#03A9F5" stroke="#fff" strokeWidth={2} />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default TrendOverviewCard;
