import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES, ServiceId } from '../data/agencyData';

interface ServicesSectionProps {
  selectedServices: ServiceId[];
  onToggleServiceInScope: (serviceId: ServiceId) => void;
  onScopeAndJump: (serviceId: ServiceId) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedServices,
  onToggleServiceInScope,
  onScopeAndJump,
}) => {
  return (
    <section
      id="services"
      className="scroll-mt-16 border-b border-[#252B3B] bg-[#0C0E14] py-16 lg:py-24"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10 lg:mb-12">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C] mb-3">
              Core Capabilities
            </p>
            <h2 className="font-display text-[26px] leading-[32px] lg:text-[36px] lg:leading-[44px] font-bold tracking-[-0.03em] text-[#E6E9F0] text-balance">
              Four Integrated Growth Disciplines
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] leading-[22px] text-[#94A3B8]">
              Select any capability below to include it in your diagnostic audit scope, or inspect deliverables before engaging our team.
            </p>
          </div>
        </div>

        {/* Asymmetric 12-Column Service Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {SERVICES.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            return (
              <article
                key={service.id}
                className={`${service.colSpanClass} brutalist-card group flex flex-col justify-between ${
                  isSelected ? 'border-[#6C7A9C] bg-[#1B202D]' : ''
                }`}
              >
                <div>
                  {/* Card Header Bar */}
                  <div className="px-6 py-3.5 border-b border-[#252B3B] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-[13px] font-bold text-[#B8C6EC] tabular-nums">
                        {service.number}
                      </span>
                      <span aria-hidden="true" className="text-[#3F465C]">
                        /
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#94A3B8]">
                        {service.discipline}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#E6E9F0] tabular-nums">
                      {service.impactMetric}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="font-display text-[22px] sm:text-[24px] leading-[30px] font-semibold tracking-[-0.02em] text-[#E6E9F0]">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-[15px] leading-[22px] text-[#C6C6CD] max-w-2xl">
                      {service.summary}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-[#252B3B] pt-5">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[14px] leading-[20px] text-[#94A3B8]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 w-1.5 h-1.5 bg-[#6C7A9C] shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Interactive Footer */}
                <div className="px-6 py-4 border-t border-[#252B3B] bg-[#0C0E14]/60 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[12px] text-[#6C7A9C]">
                    {service.cadence}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onToggleServiceInScope(service.id)}
                      aria-pressed={isSelected}
                      className={`px-3.5 py-2 min-h-[40px] text-[12px] font-semibold tracking-[0.02em] border inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#6C7A9C] ${
                        isSelected
                          ? 'bg-[#3F465C] border-[#6C7A9C] text-white'
                          : 'bg-transparent border-[#252B3B] text-[#C6C6CD] hover:border-[#6C7A9C] hover:text-white'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`w-3.5 h-3.5 border flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#141721] border-[#B8C6EC]'
                            : 'bg-[#0C0E14] border-[#3F465C]'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-[#B8C6EC]" />}
                      </span>
                      <span>{isSelected ? 'In Audit Scope' : 'Add to Audit'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onScopeAndJump(service.id)}
                      className="px-4 py-2 min-h-[40px] text-[12px] font-semibold tracking-[0.02em] bg-[#141721] border border-[#3F465C] text-[#E6E9F0] hover:bg-[#3F465C] hover:text-white inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#6C7A9C]"
                    >
                      <span>Scope Now</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
