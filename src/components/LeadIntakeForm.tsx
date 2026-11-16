import React, { useState, useRef } from 'react';
import { AlertCircle, ArrowRight, Check, RotateCcw } from 'lucide-react';
import {
  BUDGET_OPTIONS,
  SERVICE_FORM_OPTIONS,
  ServiceId,
} from '../data/agencyData';

interface LeadIntakeFormProps {
  selectedServices: ServiceId[];
  onToggleService: (serviceId: ServiceId) => void;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
}

interface FormValues {
  fullName: string;
  workEmail: string;
  company: string;
  websiteUrl: string;
  budgetTier: string;
  objective: string;
}

type FieldName = keyof FormValues | 'services';

type FormErrors = Partial<Record<FieldName, string>>;
type TouchedFields = Partial<Record<FieldName, boolean>>;

interface SubmittedReceipt {
  referenceId: string;
  fullName: string;
  workEmail: string;
  company: string;
  websiteUrl: string;
  budgetLabel: string;
  serviceLabels: string[];
  objective: string;
  submittedAt: string;
}

const INITIAL_VALUES: FormValues = {
  fullName: '',
  workEmail: '',
  company: '',
  websiteUrl: '',
  budgetTier: '30k-75k',
  objective: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_OR_DOMAIN_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

function validateField(
  name: FieldName,
  values: FormValues,
  selectedServices: ServiceId[]
): string | undefined {
  switch (name) {
    case 'fullName': {
      const trimmed = values.fullName.trim();
      if (!trimmed) return 'Full name is required.';
      if (trimmed.length < 2) return 'Enter at least 2 characters for your name.';
      return undefined;
    }
    case 'workEmail': {
      const trimmed = values.workEmail.trim();
      if (!trimmed) return 'Work email address is required.';
      if (!EMAIL_REGEX.test(trimmed)) return 'Enter a valid email address (e.g., alex@company.com).';
      return undefined;
    }
    case 'company': {
      const trimmed = values.company.trim();
      if (!trimmed) return 'Company name is required.';
      if (trimmed.length < 2) return 'Enter your full company name.';
      return undefined;
    }
    case 'websiteUrl': {
      const trimmed = values.websiteUrl.trim();
      if (trimmed && !URL_OR_DOMAIN_REGEX.test(trimmed)) {
        return 'Enter a valid domain or URL (e.g., https://company.com).';
      }
      return undefined;
    }
    case 'budgetTier': {
      if (!values.budgetTier) return 'Select a monthly acquisition budget range.';
      return undefined;
    }
    case 'services': {
      if (selectedServices.length === 0) {
        return 'Select at least one growth discipline for your audit.';
      }
      return undefined;
    }
    case 'objective': {
      const trimmed = values.objective.trim();
      if (!trimmed) return 'Briefly describe your pipeline target or current bottleneck.';
      if (trimmed.length < 15) {
        return `Please provide at least 15 characters (${15 - trimmed.length} more needed).`;
      }
      return undefined;
    }
    default:
      return undefined;
  }
}

function validateAll(values: FormValues, selectedServices: ServiceId[]): FormErrors {
  const fields: FieldName[] = [
    'fullName',
    'workEmail',
    'company',
    'websiteUrl',
    'budgetTier',
    'services',
    'objective',
  ];
  const errors: FormErrors = {};
  for (const field of fields) {
    const err = validateField(field, values, selectedServices);
    if (err) errors[field] = err;
  }
  return errors;
}

export const LeadIntakeForm: React.FC<LeadIntakeFormProps> = ({
  selectedServices,
  onToggleService,
  nameInputRef,
}) => {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState<TouchedFields>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [receipt, setReceipt] = useState<SubmittedReceipt | null>(null);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const companyRef = useRef<HTMLInputElement | null>(null);
  const websiteRef = useRef<HTMLInputElement | null>(null);
  const objectiveRef = useRef<HTMLTextAreaElement | null>(null);

  const currentErrors = validateAll(values, selectedServices);

  const shouldShowError = (field: FieldName): boolean => {
    return Boolean((touched[field] || submitAttempted) && currentErrors[field]);
  };

  const isFieldValid = (field: FieldName): boolean => {
    if (field === 'websiteUrl' && !values.websiteUrl.trim()) return false;
    return Boolean(touched[field] && !currentErrors[field]);
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (!touched[field] && value.length > 0) {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }
  };

  const handleBlur = (field: FieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleServiceToggle = (id: ServiceId) => {
    setTouched((prev) => ({ ...prev, services: true }));
    onToggleService(id);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const errors = validateAll(values, selectedServices);
    if (Object.keys(errors).length > 0) {
      if (errors.fullName) nameInputRef.current?.focus();
      else if (errors.workEmail) emailRef.current?.focus();
      else if (errors.company) companyRef.current?.focus();
      else if (errors.websiteUrl) websiteRef.current?.focus();
      else if (errors.objective) objectiveRef.current?.focus();
      return;
    }

    const budgetObj = BUDGET_OPTIONS.find((b) => b.id === values.budgetTier);
    const chosenServiceLabels = SERVICE_FORM_OPTIONS.filter((s) =>
      selectedServices.includes(s.id)
    ).map((s) => s.label);

    const codeNum = Math.floor(1000 + Math.random() * 9000);

    setReceipt({
      referenceId: `KD-2026-${codeNum}`,
      fullName: values.fullName.trim(),
      workEmail: values.workEmail.trim(),
      company: values.company.trim(),
      websiteUrl: values.websiteUrl.trim(),
      budgetLabel: budgetObj?.label ?? values.budgetTier,
      serviceLabels: chosenServiceLabels,
      objective: values.objective.trim(),
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    });
  };

  const handleReset = () => {
    setReceipt(null);
    setValues(INITIAL_VALUES);
    setTouched({});
    setSubmitAttempted(false);
  };

  const objectiveLength = values.objective.trim().length;

  return (
    <section
      id="intake"
      className="scroll-mt-16 border-b border-[#252B3B] bg-[#0C0E14] py-16 lg:py-24"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 5 Columns: Audit Offer & Expectations */}
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C] mb-3">
              Lead-Generation Intake
            </p>
            <h2 className="font-display text-[26px] leading-[32px] lg:text-[36px] lg:leading-[44px] font-bold tracking-[-0.03em] text-[#E6E9F0] text-balance">
              Request a Technical Growth Audit
            </h2>
            <p className="mt-4 text-[15px] leading-[23px] text-[#C6C6CD]">
              Submit your current acquisition parameters. Within 48 business hours, a managing partner will deliver a 12-point teardown covering tracking hygiene, wasted ad spend, and search capture gaps.
            </p>

            {/* What You Receive Box */}
            <div className="mt-8 border border-[#252B3B] bg-[#141721]">
              <div className="px-5 py-3 border-b border-[#252B3B] text-[11px] font-semibold uppercase tracking-[0.06em] text-[#94A3B8]">
                Diagnostic Deliverables Included
              </div>
              <ul className="divide-y divide-[#252B3B] text-[14px] text-[#C6C6CD]">
                <li className="px-5 py-3.5 flex items-start gap-3">
                  <span className="font-display text-[12px] font-bold text-[#6C7A9C] mt-0.5 tabular-nums">
                    01
                  </span>
                  <span>Ad account waste &amp; negative-keyword leakage audit</span>
                </li>
                <li className="px-5 py-3.5 flex items-start gap-3">
                  <span className="font-display text-[12px] font-bold text-[#6C7A9C] mt-0.5 tabular-nums">
                    02
                  </span>
                  <span>Technical crawlability &amp; commercial SERP gap matrix</span>
                </li>
                <li className="px-5 py-3.5 flex items-start gap-3">
                  <span className="font-display text-[12px] font-bold text-[#6C7A9C] mt-0.5 tabular-nums">
                    03
                  </span>
                  <span>90-day CAC payback &amp; pipeline forecast model</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#252B3B] space-y-2 text-[13px] text-[#94A3B8]">
              <div>
                Direct Inquiries:{' '}
                <a
                  href="mailto:hello@kestreldigital.co"
                  className="text-[#E6E9F0] hover:underline"
                >
                  hello@kestreldigital.co
                </a>
              </div>
              <div>Offices: San Francisco · London · Berlin</div>
            </div>
          </div>

          {/* Right 7 Columns: Validated Intake Form or Confirmation Panel */}
          <div className="lg:col-span-7">
            {receipt ? (
              <div
                role="status"
                aria-live="polite"
                className="bg-[#141721] border border-[#4E876A] p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#252B3B]">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-[#4E876A] text-[#0C0E14] flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </span>
                    <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#E6E9F0]">
                      Audit Request Confirmed
                    </span>
                  </div>
                  <span className="text-[12px] font-semibold text-[#94A3B8] tabular-nums">
                    Ref: {receipt.referenceId}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-[24px] leading-[32px] font-semibold tracking-[-0.02em] text-[#E6E9F0]">
                  Thank you, {receipt.fullName}. Your diagnostic brief is queued.
                </h3>

                <p className="mt-3 text-[15px] leading-[22px] text-[#C6C6CD]">
                  We have sent a confirmation copy to{' '}
                  <span className="font-semibold text-[#E6E9F0]">{receipt.workEmail}</span>.
                  A senior demand strategist will reach out within 48 business hours to schedule your teardown walkthrough.
                </p>

                {/* Submission Summary Table */}
                <div className="mt-6 border border-[#252B3B] bg-[#0C0E14] divide-y divide-[#252B3B] text-[13px]">
                  <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                    <span className="text-[#6C7A9C] uppercase text-[11px] font-semibold tracking-[0.06em]">
                      Company
                    </span>
                    <span className="sm:col-span-2 text-[#E6E9F0] font-medium">
                      {receipt.company}
                      {receipt.websiteUrl ? ` (${receipt.websiteUrl})` : ''}
                    </span>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                    <span className="text-[#6C7A9C] uppercase text-[11px] font-semibold tracking-[0.06em]">
                      Monthly Budget
                    </span>
                    <span className="sm:col-span-2 text-[#E6E9F0] font-medium tabular-nums">
                      {receipt.budgetLabel}
                    </span>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                    <span className="text-[#6C7A9C] uppercase text-[11px] font-semibold tracking-[0.06em]">
                      Audit Scope
                    </span>
                    <span className="sm:col-span-2 text-[#E6E9F0]">
                      {receipt.serviceLabels.join(' · ')}
                    </span>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                    <span className="text-[#6C7A9C] uppercase text-[11px] font-semibold tracking-[0.06em]">
                      Objective
                    </span>
                    <span className="sm:col-span-2 text-[#C6C6CD]">
                      {receipt.objective}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[12px] text-[#6C7A9C]">
                    Logged on {receipt.submittedAt}
                  </span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="brutalist-btn-secondary px-5 py-2.5 text-[13px] font-semibold inline-flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#6C7A9C]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Submit Another Request</span>
                  </button>
                </div>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit}
                className="bg-[#141721] border border-[#252B3B]"
              >
                {/* Form Header Strip */}
                <div className="px-6 py-3.5 border-b border-[#252B3B] flex items-center justify-between gap-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#94A3B8]">
                    Project Qualification Form
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6C7A9C]">
                    * Required Fields
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Row 1: Full Name + Work Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="intake-fullName"
                          className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#E6E9F0]"
                        >
                          Full Name *
                        </label>
                        {isFieldValid('fullName') && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4E876A]">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <input
                        ref={nameInputRef}
                        id="intake-fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="Jordan Mercer"
                        value={values.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        onBlur={() => handleBlur('fullName')}
                        aria-invalid={shouldShowError('fullName')}
                        aria-describedby={
                          shouldShowError('fullName') ? 'error-fullName' : undefined
                        }
                        className={`w-full px-3.5 py-2.5 text-[15px] brutalist-input ${
                          shouldShowError('fullName') ? 'brutalist-input-error' : ''
                        }`}
                      />
                      {shouldShowError('fullName') && (
                        <p
                          id="error-fullName"
                          className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#ffb4ab]"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#B34A4A]" />
                          <span>{currentErrors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="intake-workEmail"
                          className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#E6E9F0]"
                        >
                          Work Email *
                        </label>
                        {isFieldValid('workEmail') && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4E876A]">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <input
                        ref={emailRef}
                        id="intake-workEmail"
                        name="workEmail"
                        type="email"
                        autoComplete="email"
                        placeholder="jordan@company.com"
                        value={values.workEmail}
                        onChange={(e) => handleChange('workEmail', e.target.value)}
                        onBlur={() => handleBlur('workEmail')}
                        aria-invalid={shouldShowError('workEmail')}
                        aria-describedby={
                          shouldShowError('workEmail') ? 'error-workEmail' : undefined
                        }
                        className={`w-full px-3.5 py-2.5 text-[15px] brutalist-input ${
                          shouldShowError('workEmail') ? 'brutalist-input-error' : ''
                        }`}
                      />
                      {shouldShowError('workEmail') && (
                        <p
                          id="error-workEmail"
                          className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#ffb4ab]"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#B34A4A]" />
                          <span>{currentErrors.workEmail}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Company + Website */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="intake-company"
                          className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#E6E9F0]"
                        >
                          Company *
                        </label>
                        {isFieldValid('company') && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4E876A]">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <input
                        ref={companyRef}
                        id="intake-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Acme Cloud Corp"
                        value={values.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        onBlur={() => handleBlur('company')}
                        aria-invalid={shouldShowError('company')}
                        aria-describedby={
                          shouldShowError('company') ? 'error-company' : undefined
                        }
                        className={`w-full px-3.5 py-2.5 text-[15px] brutalist-input ${
                          shouldShowError('company') ? 'brutalist-input-error' : ''
                        }`}
                      />
                      {shouldShowError('company') && (
                        <p
                          id="error-company"
                          className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#ffb4ab]"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#B34A4A]" />
                          <span>{currentErrors.company}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="intake-website"
                          className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#E6E9F0]"
                        >
                          Company Website
                        </label>
                        {isFieldValid('websiteUrl') && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4E876A]">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <input
                        ref={websiteRef}
                        id="intake-website"
                        name="websiteUrl"
                        type="url"
                        placeholder="https://acmecloud.io"
                        value={values.websiteUrl}
                        onChange={(e) => handleChange('websiteUrl', e.target.value)}
                        onBlur={() => handleBlur('websiteUrl')}
                        aria-invalid={shouldShowError('websiteUrl')}
                        aria-describedby={
                          shouldShowError('websiteUrl') ? 'error-website' : undefined
                        }
                        className={`w-full px-3.5 py-2.5 text-[15px] brutalist-input ${
                          shouldShowError('websiteUrl') ? 'brutalist-input-error' : ''
                        }`}
                      />
                      {shouldShowError('websiteUrl') && (
                        <p
                          id="error-website"
                          className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#ffb4ab]"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#B34A4A]" />
                          <span>{currentErrors.websiteUrl}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Monthly Budget Square Radio Group */}
                  <fieldset>
                    <legend className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#E6E9F0] mb-3">
                      Monthly Acquisition Spend *
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {BUDGET_OPTIONS.map((option) => {
                        const isChecked = values.budgetTier === option.id;
                        return (
                          <label
                            key={option.id}
                            className={`flex items-center gap-3 px-4 py-3 min-h-[44px] border cursor-pointer transition-colors duration-150 ${
                              isChecked
                                ? 'bg-[#1B202D] border-[#6C7A9C] text-[#E6E9F0]'
                                : 'bg-[#0C0E14] border-[#252B3B] text-[#94A3B8] hover:border-[#3F465C]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="budgetTier"
                              value={option.id}
                              checked={isChecked}
                              onChange={(e) => handleChange('budgetTier', e.target.value)}
                              className="sr-only"
                            />
                            {/* 16x16 Square Radio per Slate Brutalist Spec */}
                            <span
                              aria-hidden="true"
                              className="w-4 h-4 bg-[#0C0E14] border border-[#3F465C] flex items-center justify-center shrink-0"
                            >
                              {isChecked && (
                                <span className="w-2 h-2 bg-[#6C7A9C]" />
                              )}
                            </span>
                            <span className="text-[14px] font-medium tabular-nums">
                              {option.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Row 4: Target Services Square Checkbox Group */}
                  <fieldset>
                    <div className="flex items-center justify-between mb-3">
                      <legend className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#E6E9F0]">
                        Target Growth Disciplines *
                      </legend>
                      <span className="text-[11px] font-semibold text-[#6C7A9C] tabular-nums">
                        {selectedServices.length} Selected
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICE_FORM_OPTIONS.map((service) => {
                        const isChecked = selectedServices.includes(service.id);
                        return (
                          <label
                            key={service.id}
                            className={`flex items-center gap-3 px-4 py-3 min-h-[44px] border cursor-pointer transition-colors duration-150 ${
                              isChecked
                                ? 'bg-[#1B202D] border-[#6C7A9C] text-[#E6E9F0]'
                                : 'bg-[#0C0E14] border-[#252B3B] text-[#94A3B8] hover:border-[#3F465C]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleServiceToggle(service.id)}
                              className="sr-only"
                            />
                            {/* 16x16 Square Checkbox per Slate Brutalist Spec */}
                            <span
                              aria-hidden="true"
                              className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                                isChecked
                                  ? 'bg-[#3F465C] border-[#6C7A9C]'
                                  : 'bg-[#0C0E14] border-[#3F465C]'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 text-white stroke-[2.5]" />}
                            </span>
                            <span className="text-[13px] font-medium leading-[18px]">
                              {service.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {shouldShowError('services') && (
                      <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[#ffb4ab]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#B34A4A]" />
                        <span>{currentErrors.services}</span>
                      </p>
                    )}
                  </fieldset>

                  {/* Row 5: Primary Objective Textarea */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="intake-objective"
                        className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#E6E9F0]"
                      >
                        Primary Pipeline Objective *
                      </label>
                      <span
                        className={`text-[11px] font-semibold tabular-nums ${
                          objectiveLength >= 15 ? 'text-[#4E876A]' : 'text-[#6C7A9C]'
                        }`}
                      >
                        {objectiveLength} / 15 min chars
                      </span>
                    </div>
                    <textarea
                      ref={objectiveRef}
                      id="intake-objective"
                      name="objective"
                      rows={4}
                      placeholder="Describe your target SQL volume, current CAC bottlenecks, or CRM stack (e.g., HubSpot / Salesforce)."
                      value={values.objective}
                      onChange={(e) => handleChange('objective', e.target.value)}
                      onBlur={() => handleBlur('objective')}
                      aria-invalid={shouldShowError('objective')}
                      aria-describedby={
                        shouldShowError('objective') ? 'error-objective' : undefined
                      }
                      className={`w-full px-3.5 py-3 text-[15px] leading-[22px] resize-y brutalist-input ${
                        shouldShowError('objective') ? 'brutalist-input-error' : ''
                      }`}
                    />
                    {shouldShowError('objective') && (
                      <p
                        id="error-objective"
                        className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#ffb4ab]"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#B34A4A]" />
                        <span>{currentErrors.objective}</span>
                      </p>
                    )}
                  </div>

                  {/* Validation Summary Banner if Submit Attempted with Errors */}
                  {submitAttempted && Object.keys(currentErrors).length > 0 && (
                    <div
                      role="alert"
                      className="p-3.5 border border-[#B34A4A] bg-[#0C0E14] flex items-center gap-2.5 text-[13px] text-[#ffb4ab]"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-[#B34A4A]" />
                      <span>
                        Resolve the {Object.keys(currentErrors).length} highlighted{' '}
                        {Object.keys(currentErrors).length === 1 ? 'field' : 'fields'} above to submit your audit request.
                      </span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-[12px] text-[#6C7A9C]">
                      No automated drip sequences. Reviewed directly by a senior strategist.
                    </p>
                    <button
                      type="submit"
                      className="brutalist-btn-primary px-6 py-3 text-[14px] font-semibold tracking-[0.02em] inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C7A9C]"
                    >
                      <span>Submit Audit Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
