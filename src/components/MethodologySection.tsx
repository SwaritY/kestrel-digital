import React from 'react';
import { METHODOLOGY_PHASES } from '../data/agencyData';

export const MethodologySection: React.FC = () => {
  return (
    <section
      id="methodology"
      className="scroll-mt-16 border-b border-[#252B3B] bg-[#0C0E14] py-16 lg:py-24"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10 lg:mb-12">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C] mb-3">
              Execution Blueprint
            </p>
            <h2 className="font-display text-[26px] leading-[32px] lg:text-[36px] lg:leading-[44px] font-bold tracking-[-0.03em] text-[#E6E9F0] text-balance">
              From Diagnostic Audit to Compounding Pipeline
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] leading-[22px] text-[#94A3B8]">
              Every engagement follows a strict 4-stage deployment schedule with concrete engineering and revenue milestones.
            </p>
          </div>
        </div>

        {/* 4-Column Architectural Grid */}
        <div className="border border-[#252B3B] bg-[#141721] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#252B3B]">
          {METHODOLOGY_PHASES.map((step) => (
            <div key={step.phase} className="p-6 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#252B3B]">
                  <span className="font-display text-[13px] font-bold text-[#B8C6EC] uppercase tracking-[0.04em]">
                    {step.phase}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C]">
                    {step.window}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-[18px] leading-[24px] font-semibold tracking-[-0.01em] text-[#E6E9F0]">
                  {step.title}
                </h3>

                <p className="mt-3 text-[14px] leading-[21px] text-[#94A3B8]">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#252B3B]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C] mb-3">
                  Key Deliverables
                </div>
                <ul className="space-y-2">
                  {step.outputs.map((output) => (
                    <li
                      key={output}
                      className="flex items-start gap-2.5 text-[13px] leading-[18px] text-[#C6C6CD]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 w-1.5 h-1.5 bg-[#3F465C] shrink-0"
                      />
                      <span>{output}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
