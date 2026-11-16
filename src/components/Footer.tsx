import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer className="bg-[#0C0E14] py-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#252B3B]">
          <div className="md:col-span-5">
            <a
              href="#top"
              onClick={(e) => handleNav(e, 'top')}
              className="font-display text-lg font-bold tracking-[-0.03em] text-[#E6E9F0]"
            >
              KESTREL DIGITAL
            </a>
            <p className="mt-3 text-[13px] leading-[20px] text-[#94A3B8] max-w-sm">
              B2B performance marketing, technical SEO, and closed-loop revenue attribution for high-velocity software companies.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C] mb-3">
              Navigation
            </div>
            <ul className="space-y-2 text-[13px] text-[#C6C6CD]">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNav(e, 'services')}
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#case-studies"
                  onClick={(e) => handleNav(e, 'case-studies')}
                  className="hover:text-white transition-colors"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="#methodology"
                  onClick={(e) => handleNav(e, 'methodology')}
                  className="hover:text-white transition-colors"
                >
                  Methodology
                </a>
              </li>
              <li>
                <a
                  href="#intake"
                  onClick={(e) => handleNav(e, 'intake')}
                  className="hover:text-white transition-colors"
                >
                  Audit Intake
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C] mb-3">
              Operating Hubs
            </div>
            <p className="text-[13px] leading-[20px] text-[#94A3B8]">
              548 Market St, San Francisco, CA
              <br />
              14 Finsbury Square, London EC2A
              <br />
              Torstraße 112, 10119 Berlin
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-[#6C7A9C]">
          <span>&copy; 2026 Kestrel Digital LLC. All rights reserved.</span>
          <span>hello@kestreldigital.co</span>
        </div>
      </div>
    </footer>
  );
};
