import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onRequestAudit: () => void;
}

const NAV_LINKS = [
  { id: 'services', label: 'Services' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'intake', label: 'Audit Intake' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onRequestAudit,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0C0E14] border-b border-[#252B3B]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, 'top')}
          className="font-display text-lg font-bold tracking-[-0.03em] text-[#E6E9F0] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6C7A9C]"
        >
          KESTREL DIGITAL
        </a>

        {/* Zone 2: 4 Single-line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`group relative py-1 text-[13px] font-semibold tracking-[0.02em] whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6C7A9C] ${
                  isActive
                    ? 'text-[#E6E9F0]'
                    : 'text-[#94A3B8] hover:text-[#E6E9F0]'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] transition-opacity duration-150 ${
                    isActive
                      ? 'bg-[#6C7A9C] opacity-100'
                      : 'bg-[#3F465C] opacity-0 group-hover:opacity-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onRequestAudit();
            }}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-semibold tracking-[0.02em] brutalist-btn-primary whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C7A9C]"
          >
            Request Audit
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-[#252B3B] bg-[#141721] text-[#E6E9F0] hover:border-[#3F465C] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#6C7A9C]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#252B3B] bg-[#141721]">
          <nav
            aria-label="Mobile Navigation"
            className="px-4 py-4 flex flex-col divide-y divide-[#252B3B]"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className="py-3.5 text-[14px] font-semibold text-[#E6E9F0] hover:text-[#B8C6EC] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[11px] uppercase tracking-[0.06em] text-[#6C7A9C]">
                  Jump
                </span>
              </a>
            ))}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onRequestAudit();
                }}
                className="w-full py-3 px-4 text-[13px] font-semibold brutalist-btn-primary cursor-pointer"
              >
                Request Growth Audit
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
