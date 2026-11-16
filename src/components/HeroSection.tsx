import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CHANNEL_SNAPSHOTS, HERO_KPIS } from '../data/agencyData';

interface HeroSectionProps {
  onRequestAudit: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRequestAudit,
  onExploreWork,
}) => {
  const [activeChannelId, setActiveChannelId] = useState<'paid' | 'organic' | 'abm'>('paid');
  const [hoveredQuarter, setHoveredQuarter] = useState<string | null>(null);

  const activeChannel =
    CHANNEL_SNAPSHOTS.find((ch) => ch.id === activeChannelId) ?? CHANNEL_SNAPSHOTS[0];

  const maxPipeline = Math.max(...activeChannel.points.map((p) => p.pipeline), 5);
  const inspectedPoint =
    activeChannel.points.find((p) => p.quarter === hoveredQuarter) ??
    activeChannel.points[activeChannel.points.length - 1];

  return (
    <section
      id="top"
      className="border-b border-[#252B3B] bg-[#0C0E14]"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 lg:pt-20 lg:pb-20">
        {/* 12-Column Architectural Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left 7 Columns: Core Proposition & Primary CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#94A3B8] mb-5">
                B2B Demand Generation · Paid Acquisition · Revenue Attribution
              </p>

              <h1 className="font-display text-[36px] leading-[40px] sm:text-[46px] sm:leading-[50px] lg:text-[56px] lg:leading-[60px] font-bold tracking-[-0.04em] text-[#E6E9F0] text-balance max-w-3xl">
                Precision Demand Systems for High-Velocity B2B Teams
              </h1>

              <p className="mt-6 text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] text-[#C6C6CD] max-w-2xl">
                We build measurable revenue pipelines through technical SEO, disciplined paid media,
                and closed-loop CRM attribution—eliminating wasted ad spend across complex sales cycles.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={onRequestAudit}
                  className="brutalist-btn-primary px-6 py-3 text-[14px] font-semibold tracking-[0.02em] inline-flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C7A9C]"
                >
                  <span>Request Growth Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onExploreWork}
                  className="brutalist-btn-secondary px-6 py-3 text-[14px] font-semibold tracking-[0.02em] inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C7A9C]"
                >
                  <span>Inspect Case Studies</span>
                  <ArrowUpRight className="w-4 h-4 text-[#94A3B8]" />
                </button>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#252B3B] flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#94A3B8]">
              <span>Serving Series B–Enterprise SaaS</span>
              <span aria-hidden="true" className="text-[#3F465C]">·</span>
              <span>San Francisco · London · Berlin</span>
              <span aria-hidden="true" className="text-[#3F465C]">·</span>
              <span>48-Hour Diagnostic Turnaround</span>
            </div>
          </div>

          {/* Right 5 Columns: Interactive Attribution & Pipeline Matrix */}
          <div className="lg:col-span-5 flex flex-col bg-[#141721] border border-[#252B3B]">
            {/* Panel Header */}
            <div className="px-5 py-3.5 border-b border-[#252B3B] flex items-center justify-between gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#94A3B8]">
                Quarterly Pipeline Attribution
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C] tabular-nums">
                FY 2026 Cohort
              </span>
            </div>

            {/* Channel Switcher Tabs */}
            <div
              role="tablist"
              aria-label="Acquisition Channel Metrics"
              className="grid grid-cols-3 border-b border-[#252B3B] bg-[#0C0E14]"
            >
              {CHANNEL_SNAPSHOTS.map((channel) => {
                const isSelected = channel.id === activeChannelId;
                return (
                  <button
                    key={channel.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setActiveChannelId(channel.id);
                      setHoveredQuarter(null);
                    }}
                    className={`px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-center whitespace-nowrap truncate border-r last:border-r-0 border-[#252B3B] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#6C7A9C] ${
                      isSelected
                        ? 'bg-[#3F465C] text-white'
                        : 'bg-[#0C0E14] text-[#94A3B8] hover:bg-[#1B202D] hover:text-[#E6E9F0]'
                    }`}
                  >
                    {channel.id === 'paid'
                      ? 'Paid Media'
                      : channel.id === 'organic'
                      ? 'Tech SEO'
                      : 'ABM'}
                  </button>
                );
              })}
            </div>

            {/* Active Channel Telemetry Body */}
            <div className="p-5 flex-1 flex flex-col justify-between gap-5">
              {/* Top 3 Tabular Readouts */}
              <div className="grid grid-cols-3 border border-[#252B3B] bg-[#0C0E14] divide-x divide-[#252B3B]">
                <div className="p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C]">
                    Blended ROAS
                  </div>
                  <div className="mt-1 font-display text-[20px] font-bold text-[#E6E9F0] tabular-nums">
                    {activeChannel.blendedRoas}
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C]">
                    CAC Payback
                  </div>
                  <div className="mt-1 font-display text-[20px] font-bold text-[#E6E9F0] tabular-nums">
                    {activeChannel.cacPayback}
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C]">
                    Velocity
                  </div>
                  <div className="mt-1 font-display text-[17px] sm:text-[18px] font-bold text-[#B8C6EC] tabular-nums truncate">
                    {activeChannel.sqlVolume}
                  </div>
                </div>
              </div>

              {/* Architectural Rectangular Bar Chart */}
              <div className="border border-[#252B3B] bg-[#0C0E14] p-4">
                <div className="flex items-center justify-between text-[12px] mb-4">
                  <span className="font-semibold text-[#E6E9F0]">
                    {inspectedPoint.quarter} Attributed Pipeline: ${inspectedPoint.pipeline.toFixed(1)}M
                  </span>
                  <span className="text-[#4E876A] font-semibold tabular-nums">
                    {inspectedPoint.roas.toFixed(1)}x ROAS · CAC {inspectedPoint.cacDelta}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-3 items-end h-32 pt-2 border-b border-[#252B3B]">
                  {activeChannel.points.map((point) => {
                    const heightPct = Math.max(18, Math.round((point.pipeline / maxPipeline) * 100));
                    const isFocused = inspectedPoint.quarter === point.quarter;
                    return (
                      <button
                        key={point.quarter}
                        type="button"
                        onMouseEnter={() => setHoveredQuarter(point.quarter)}
                        onFocus={() => setHoveredQuarter(point.quarter)}
                        onClick={() => setHoveredQuarter(point.quarter)}
                        className="group h-full flex flex-col justify-end items-stretch text-left cursor-pointer focus-visible:outline-none"
                        aria-label={`${point.quarter}: $${point.pipeline}M pipeline, ${point.roas}x ROAS`}
                      >
                        <div className="text-[11px] font-semibold text-[#94A3B8] tabular-nums mb-1 text-center">
                          ${point.pipeline.toFixed(1)}M
                        </div>
                        <div
                          style={{ height: `${heightPct}%` }}
                          className={`w-full border transition-colors duration-150 ${
                            isFocused
                              ? 'bg-[#3F465C] border-[#B8C6EC]'
                              : 'bg-[#1B202D] border-[#3F465C] group-hover:bg-[#3F465C]'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-4 gap-3 pt-2">
                  {activeChannel.points.map((point) => (
                    <div
                      key={point.quarter}
                      className="text-center text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C] tabular-nums"
                    >
                      {point.quarter}
                    </div>
                  ))}
                </div>
              </div>

              {/* Channel Operational Note */}
              <p className="text-[13px] leading-[19px] text-[#94A3B8]">
                {activeChannel.notes}
              </p>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column KPI Strip */}
        <div className="mt-10 lg:mt-14 border border-[#252B3B] bg-[#141721] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#252B3B]">
          {HERO_KPIS.map((kpi) => (
            <div key={kpi.value} className="p-6">
              <div className="font-display text-[30px] sm:text-[34px] font-bold tracking-[-0.03em] text-[#E6E9F0] tabular-nums">
                {kpi.value}
              </div>
              <p className="mt-2 text-[13px] leading-[19px] text-[#94A3B8]">
                {kpi.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
