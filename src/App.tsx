/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { MethodologySection } from './components/MethodologySection';
import { LeadIntakeForm } from './components/LeadIntakeForm';
import { Footer } from './components/Footer';
import { ServiceId } from './data/agencyData';

const TRACKED_SECTIONS = ['services', 'case-studies', 'methodology', 'intake'];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('services');
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>(['seo', 'paid']);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const scrollToSection = useCallback((sectionId: string, focusName = false) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (focusName) {
        window.setTimeout(() => {
          nameInputRef.current?.focus({ preventScroll: true });
        }, 450);
      }
    }
  }, []);

  const handleToggleService = useCallback((serviceId: ServiceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((item) => item !== serviceId)
        : [...prev, serviceId]
    );
  }, []);

  const handleScopeAndJump = useCallback(
    (serviceId: ServiceId) => {
      setSelectedServices((prev) =>
        prev.includes(serviceId) ? prev : [...prev, serviceId]
      );
      scrollToSection('intake', true);
    },
    [scrollToSection]
  );

  useEffect(() => {
    const elements = TRACKED_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0E14] text-[#E6E9F0] flex flex-col">
      <Navbar
        activeSection={activeSection}
        onNavigate={(id) => scrollToSection(id, id === 'intake')}
        onRequestAudit={() => scrollToSection('intake', true)}
      />

      <main className="flex-1">
        <HeroSection
          onRequestAudit={() => scrollToSection('intake', true)}
          onExploreWork={() => scrollToSection('case-studies')}
        />

        <ServicesSection
          selectedServices={selectedServices}
          onToggleServiceInScope={handleToggleService}
          onScopeAndJump={handleScopeAndJump}
        />

        <CaseStudiesSection />

        <MethodologySection />

        <LeadIntakeForm
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          nameInputRef={nameInputRef}
        />
      </main>

      <Footer onNavigate={(id) => scrollToSection(id, id === 'intake')} />
    </div>
  );
}
