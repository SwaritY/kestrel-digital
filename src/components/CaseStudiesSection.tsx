import React, { useState } from 'react';
import { CASE_STUDIES, CaseStudy } from '../data/agencyData';

type VerticalFilter = 'All' | CaseStudy['vertical'];

const VERTICAL_FILTERS: { id: VerticalFilter; label: string }[] = [
  { id: 'All', label: 'All Verticals' },
  { id: 'SaaS Infrastructure', label: 'SaaS Infrastructure' },
  { id: 'FinTech', label: 'FinTech' },
  { id: 'Developer Tools', label: 'Developer Tools' },
];

export const CaseStudiesSection: React.FC = () => {
  const [activeVertical, setActiveVertical] = useState<VerticalFilter>('All');

  const visibleStudies =
    activeVertical === 'All'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((study) => study.vertical === activeVertical);

  return (
    <section
      id="case-studies"
      className="scroll-mt-16 border-b border-[#252B3B] bg-[#0C0E14] py-16 lg:py-24"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-12">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C] mb-3">
              Verified Client Outcomes
            </p>
            <h2 className="font-display text-[26px] leading-[32px] lg:text-[36px] lg:leading-[44px] font-bold tracking-[-0.03em] text-[#E6E9F0] text-balance">
              Documented Pipeline &amp; CAC Compression
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter case studies by industry vertical"
            className="flex flex-wrap border border-[#252B3B] bg-[#141721]"
          >
            {VERTICAL_FILTERS.map((filter) => {
              const isSelected = activeVertical === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveVertical(filter.id)}
                  aria-pressed={isSelected}
                  className={`px-4 py-2.5 min-h-[44px] text-[12px] font-semibold tracking-[0.02em] border-r last:border-r-0 border-[#252B3B] whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#6C7A9C] ${
                    isSelected
                      ? 'bg-[#3F465C] text-white'
                      : 'bg-transparent text-[#94A3B8] hover:bg-[#1B202D] hover:text-[#E6E9F0]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Study Grid */}
        <div className="space-y-6">
          {visibleStudies.map((study) => (
            <article
              key={study.id}
              className="bg-[#141721] border border-[#252B3B] hover:border-[#3F465C] transition-colors duration-150"
            >
              {/* Top Metadata Bar (Unboxed Typography) */}
              <div className="px-6 py-3.5 border-b border-[#252B3B] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2.5 text-[12px]">
                  <span className="font-semibold text-[#E6E9F0]">{study.client}</span>
                  <span aria-hidden="true" className="text-[#3F465C]">·</span>
                  <span className="text-[#94A3B8]">{study.vertical}</span>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C]">
                  {study.timeframe}
                </span>
              </div>

              {/* Main Split Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#252B3B]">
                {/* Left Narrative + Attributable Quote */}
                <div className="lg:col-span-6 p-6 flex flex-col justify-between gap-6">
                  <div>
                    <h3 className="font-display text-[22px] sm:text-[24px] leading-[30px] font-semibold tracking-[-0.02em] text-[#E6E9F0]">
                      {study.headlineOutcome}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[22px] text-[#C6C6CD]">
                      {study.summary}
                    </p>
                  </div>

                  <blockquote className="pt-5 border-t border-[#252B3B]">
                    <p className="text-[14px] leading-[21px] text-[#E6E9F0]">
                      &ldquo;{study.quote}&rdquo;
                    </p>
                    <footer className="mt-3 text-[12px] text-[#94A3B8]">
                      <span className="font-semibold text-[#E6E9F0]">{study.authorName}</span>
                      <span aria-hidden="true" className="mx-2 text-[#3F465C]">·</span>
                      <span>{study.authorRole}</span>
                    </footer>
                  </blockquote>
                </div>

                {/* Right Tabular Before/After Metrics */}
                <div className="lg:col-span-6 bg-[#0C0E14]/40 p-6 flex flex-col justify-center">
                  <div className="border border-[#252B3B] bg-[#0C0E14]">
                    <div className="grid grid-cols-4 px-4 py-2.5 border-b border-[#252B3B] text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C]">
                      <span className="col-span-1">Metric</span>
                      <span className="text-right">Baseline</span>
                      <span className="text-right">Result</span>
                      <span className="text-right">Net Lift</span>
                    </div>

                    <div className="divide-y divide-[#252B3B]">
                      {study.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="grid grid-cols-4 px-4 py-3.5 items-center text-[13px] tabular-nums"
                        >
                          <span className="col-span-1 font-medium text-[#C6C6CD] pr-2">
                            {metric.label}
                          </span>
                          <span className="text-right text-[#6C7A9C]">
                            {metric.baseline}
                          </span>
                          <span className="text-right font-semibold text-[#E6E9F0]">
                            {metric.after}
                          </span>
                          <span className="text-right font-semibold text-[#4E876A]">
                            {metric.delta}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
