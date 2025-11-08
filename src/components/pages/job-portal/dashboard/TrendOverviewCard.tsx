"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TrendOverviewCardProps {
  className?: string;
  data?: number[];
  title?: string;
  subtitle?: string;
  percentage?: string;
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
  title = "AI Improvements",
  percentage = "156 %",
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const lineRef = React.useRef<SVGPathElement>(null);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  React.useEffect(() => {
    if (lineRef.current) {
      const pathLength = lineRef.current.getTotalLength();
      lineRef.current.style.strokeDasharray = `${pathLength}`;
      lineRef.current.style.strokeDashoffset = `${pathLength}`;
      
      // Trigger animation
      setTimeout(() => {
        if (lineRef.current) {
          lineRef.current.style.strokeDashoffset = '0';
        }
      }, 200);
    }
  }, []);

  const series =
    data && data.length > 0
      ? data
      : [120, 140, 135, 155, 145, 165, 160, 175, 170, 185, 180, 195, 190, 205, 200, 215];

  const viewW = 280;
  const viewH = 120;
  const padX = 15;
  const padY = 15;

  const { d: lineD, points } = buildLinePath(series, viewW, viewH, padX, padY);

  // build area path (from baseline down)
  const areaD =
    points.length > 0
      ? `${points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ")} L ${
          points[points.length - 1].x
        } ${viewH - padY} L ${points[0].x} ${viewH - padY} Z`
      : "";

  return (
    <div
      className={cn(
        "w-full bg-white rounded-xl sm:rounded-2xl border border-[#e8e8ea] shadow-sm p-4 sm:p-5 md:p-6 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4 sm:mb-5">
        <div>
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#111827]">{title}</h3>
        </div>
        <div 
          className={cn(
            "flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-[#e8f5e9] rounded-lg transition-all duration-500",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
          style={{ transitionDelay: '300ms' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-3.5 sm:h-3.5 animate-[bounce_2s_ease-in-out_infinite]">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs sm:text-sm font-bold text-[#10b981]">{percentage}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[100px] sm:h-[120px] md:h-[140px]">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full h-full">
          <defs>
            <linearGradient id="ai-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#03A9F5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#03A9F5" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* area under the curve */}
          {areaD && (
            <path 
              d={areaD} 
              fill="url(#ai-grad)"
              className="transition-opacity duration-1000"
              style={{ 
                opacity: isVisible ? 1 : 0,
                transitionDelay: '500ms'
              }}
            />
          )}

          {/* main line */}
          {lineD && (
            <path
              ref={lineRef}
              d={lineD}
              fill="none"
              stroke="#03A9F5"
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 2s ease-out',
              }}
            />
          )}
        </svg>
      </div>

      {/* Legend or Additional Info */}
      <div className="mt-5 pt-4 border-t border-[#e8e8ea]">
        <div className="flex items-center justify-between text-xs lg:text-sm text-[#6b7280]">
          <span>Performance Metrics</span>
          <span className="font-semibold text-[#111827]">Trending Up</span>
        </div>
      </div>
    </div>
  );
};

export default TrendOverviewCard;
