export type ServiceId = 'seo' | 'paid' | 'cro' | 'attribution';

export interface ServiceItem {
  id: ServiceId;
  number: string;
  title: string;
  discipline: string;
  impactMetric: string;
  summary: string;
  deliverables: string[];
  cadence: string;
  colSpanClass: string;
}

export interface ChannelMetricPoint {
  quarter: string;
  pipeline: number; // in $M
  roas: number;
  cacDelta: string;
}

export interface ChannelSnapshot {
  id: 'paid' | 'organic' | 'abm';
  label: string;
  blendedRoas: string;
  cacPayback: string;
  sqlVolume: string;
  points: ChannelMetricPoint[];
  notes: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  vertical: 'SaaS Infrastructure' | 'FinTech' | 'Developer Tools';
  timeframe: string;
  headlineOutcome: string;
  summary: string;
  metrics: {
    label: string;
    baseline: string;
    after: string;
    delta: string;
  }[];
  quote: string;
  authorName: string;
  authorRole: string;
}

export interface MethodologyPhase {
  phase: string;
  window: string;
  title: string;
  description: string;
  outputs: string[];
}

export const HERO_KPIS = [
  {
    value: '$48.2M',
    label: 'Attributed client pipeline generated over the past 12 months',
  },
  {
    value: '3.8x',
    label: 'Median blended return on ad spend across enterprise retainers',
  },
  {
    value: '-34%',
    label: 'Average reduction in blended CAC within first 90 days',
  },
  {
    value: '14 Days',
    label: 'Diagnostic audit to live cross-channel campaign deployment',
  },
];

export const CHANNEL_SNAPSHOTS: ChannelSnapshot[] = [
  {
    id: 'paid',
    label: 'Paid Search & Social',
    blendedRoas: '4.1x',
    cacPayback: '5.2 Months',
    sqlVolume: '312 SQLs / Qtr',
    notes: 'Granular intent segmentation with automated negative-keyword pruning and CRM offline conversion sync.',
    points: [
      { quarter: 'Q1', pipeline: 1.4, roas: 2.6, cacDelta: '-11%' },
      { quarter: 'Q2', pipeline: 2.3, roas: 3.3, cacDelta: '-22%' },
      { quarter: 'Q3', pipeline: 3.6, roas: 3.8, cacDelta: '-29%' },
      { quarter: 'Q4', pipeline: 4.9, roas: 4.1, cacDelta: '-36%' },
    ],
  },
  {
    id: 'organic',
    label: 'Technical SEO',
    blendedRoas: '6.4x',
    cacPayback: '3.8 Months',
    sqlVolume: '428 SQLs / Qtr',
    notes: 'Programmatic comparison matrices, crawl-budget remediation, and high-intent commercial landing clusters.',
    points: [
      { quarter: 'Q1', pipeline: 0.9, roas: 3.1, cacDelta: '-8%' },
      { quarter: 'Q2', pipeline: 1.8, roas: 4.4, cacDelta: '-19%' },
      { quarter: 'Q3', pipeline: 3.1, roas: 5.5, cacDelta: '-31%' },
      { quarter: 'Q4', pipeline: 4.4, roas: 6.4, cacDelta: '-42%' },
    ],
  },
  {
    id: 'abm',
    label: 'ABM Outbound',
    blendedRoas: '3.5x',
    cacPayback: '6.1 Months',
    sqlVolume: '148 Enterprise SQLs',
    notes: 'Account-level ad delivery synchronized with SDR sequencing and buying-committee engagement scoring.',
    points: [
      { quarter: 'Q1', pipeline: 1.1, roas: 2.1, cacDelta: '-6%' },
      { quarter: 'Q2', pipeline: 1.9, roas: 2.7, cacDelta: '-15%' },
      { quarter: 'Q3', pipeline: 2.8, roas: 3.2, cacDelta: '-24%' },
      { quarter: 'Q4', pipeline: 3.9, roas: 3.5, cacDelta: '-30%' },
    ],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'seo',
    number: '01',
    title: 'Technical SEO & Programmatic Content',
    discipline: 'Search Architecture',
    impactMetric: '+165% Avg. Organic SQL Lift',
    summary:
      'We rebuild crawlable site architecture, schema markup, and bottom-of-funnel editorial engines engineered to capture enterprise evaluation traffic.',
    deliverables: [
      'Log-file crawl diagnostics & Core Web Vitals remediation',
      'Programmatic comparison & integration landing matrices',
      'Commercial-intent content briefs mapped to buyer objections',
    ],
    cadence: 'Bi-weekly content & technical sprint deployments',
    colSpanClass: 'lg:col-span-7',
  },
  {
    id: 'paid',
    number: '02',
    title: 'Paid Acquisition & Bid Engineering',
    discipline: 'Paid Media',
    impactMetric: '-34% Marginal CAC',
    summary:
      'Disciplined capital allocation across Google Search, LinkedIn, and high-signal B2B networks anchored to closed-won CRM revenue—not vanity clicks.',
    deliverables: [
      'Account-tier LinkedIn targeting synced with Salesforce',
      'Exact-match commercial search capture & negative pruning',
      'Weekly creative fatigue rotation & marginal ROAS guardrails',
    ],
    cadence: 'Daily bid calibration & weekly spend allocation reviews',
    colSpanClass: 'lg:col-span-5',
  },
  {
    id: 'cro',
    number: '03',
    title: 'Conversion Architecture & CRO',
    discipline: 'Landing Systems',
    impactMetric: '2.4x Demo Form Conversion',
    summary:
      'High-speed, distraction-free landing systems and multi-step qualification funnels structured around buyer proof and immediate scheduling.',
    deliverables: [
      'Dedicated paid-traffic landing templates per buyer persona',
      'Session replay telemetry & form-field drop-off elimination',
      'Controlled A/B split testing on pricing & proof framing',
    ],
    cadence: '4+ statistically powered experiments shipped monthly',
    colSpanClass: 'lg:col-span-5',
  },
  {
    id: 'attribution',
    number: '04',
    title: 'Revenue Attribution & RevOps',
    discipline: 'Data & Telemetry',
    impactMetric: '100% Closed-Loop CRM Sync',
    summary:
      'Server-side conversion tracking and multi-touch attribution connecting every ad impression and organic session directly to pipeline velocity.',
    deliverables: [
      'Server-side GTM & first-party event pipeline instrumentation',
      'HubSpot / Salesforce multi-touch opportunity attribution',
      'Executive cohort payback & LTV:CAC financial modeling',
    ],
    cadence: 'Real-time warehouse sync & Monday morning revenue briefs',
    colSpanClass: 'lg:col-span-7',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'vanguard-cloud',
    client: 'Vanguard Cloud Systems',
    vertical: 'SaaS Infrastructure',
    timeframe: '6-Month Engagement · Q1–Q3 2026',
    headlineOutcome: '+142% Qualified Enterprise Demos in 6 Months',
    summary:
      'Replaced broad-match paid campaigns and fragmented agency reporting with server-side Salesforce conversion sync and programmatic Kubernetes comparison clusters.',
    metrics: [
      { label: 'Qualified Demos / Mo', baseline: '64', after: '155', delta: '+142%' },
      { label: 'Blended CAC', baseline: '$4,820', after: '$2,980', delta: '-38%' },
      { label: 'Pipeline Attributed', baseline: '$1.8M', after: '$4.9M', delta: '+172%' },
    ],
    quote:
      'Kestrel audited our Salesforce funnel in week one, killed $40k/month in dead-end search spend, and rebuilt our inbound engine around buyers actually in procurement.',
    authorName: 'Marcus Vance',
    authorRole: 'VP of Marketing, Vanguard Cloud Systems',
  },
  {
    id: 'clearledger-treasury',
    client: 'ClearLedger Treasury',
    vertical: 'FinTech',
    timeframe: '9-Month Engagement · FY 2026',
    headlineOutcome: '$6.4M Net-New Pipeline at 4.1x Blended ROAS',
    summary:
      'Engineered an ABM LinkedIn + high-intent search program targeting CFOs and controllers at mid-market logistics firms with bespoke ROI calculators.',
    metrics: [
      { label: 'Net-New Pipeline', baseline: '$1.5M', after: '$6.4M', delta: '+326%' },
      { label: 'Blended ROAS', baseline: '1.7x', after: '4.1x', delta: '+141%' },
      { label: 'Demo Show Rate', baseline: '61%', after: '86%', delta: '+25 pts' },
    ],
    quote:
      'Every dollar we put into acquisition now has a clear payback horizon. Their weekly cohort reports became the centerpiece of our board deck.',
    authorName: 'Elena Rostova',
    authorRole: 'Chief Revenue Officer, ClearLedger Treasury',
  },
  {
    id: 'gridline-devtools',
    client: 'Gridline DevTools',
    vertical: 'Developer Tools',
    timeframe: '5-Month Engagement · Q2–Q3 2026',
    headlineOutcome: '-41% Blended CAC Across Self-Serve & Enterprise',
    summary:
      'Fixed indexation bottlenecks across 1,400 documentation pages and deployed technical bottom-of-funnel comparison guides paired with frictionless trial onboarding.',
    metrics: [
      { label: 'Organic Trial Signups', baseline: '490 / mo', after: '1,210 / mo', delta: '+147%' },
      { label: 'Blended CAC', baseline: '$1,940', after: '$1,145', delta: '-41%' },
      { label: 'Trial-to-Paid Rate', baseline: '8.4%', after: '14.2%', delta: '+5.8 pts' },
    ],
    quote:
      'They understand technical buyers. No fluff copy, no generic blog spam—just clean documentation architecture and ruthless conversion discipline.',
    authorName: 'Devon Takahashi',
    authorRole: 'Co-Founder & CTO, Gridline DevTools',
  },
];

export const METHODOLOGY_PHASES: MethodologyPhase[] = [
  {
    phase: 'Phase 01',
    window: 'Weeks 1–2',
    title: 'Forensic Funnel & Spend Audit',
    description:
      'We inspect historical ad accounts, CRM win/loss cohorts, crawl logs, and landing conversion drop-offs to isolate capital leakage.',
    outputs: [
      '12-point acquisition & tracking audit',
      'Wasted spend reallocation schedule',
      '90-day pipeline forecast model',
    ],
  },
  {
    phase: 'Phase 02',
    window: 'Weeks 3–4',
    title: 'Attribution & Landing Architecture',
    description:
      'Before scaling spend, we wire server-side event tracking into your CRM and ship dedicated conversion templates built for speed.',
    outputs: [
      'Server-side GTM & CRM offline conversion sync',
      'High-intent comparison & persona landing pages',
      'Negative keyword & audience exclusion matrices',
    ],
  },
  {
    phase: 'Phase 03',
    window: 'Weeks 5–8',
    title: 'Multi-Channel Deployment',
    description:
      'Controlled launch across paid search, targeted social, and technical SEO clusters with daily bid monitoring and split-test velocity.',
    outputs: [
      'Live paid search & LinkedIn ABM campaigns',
      'First wave of commercial SEO pages indexed',
      'Bi-weekly CRO hypothesis test cycle',
    ],
  },
  {
    phase: 'Phase 04',
    window: 'Ongoing',
    title: 'Weekly Revenue Calibration',
    description:
      'Continuous reallocation of budget toward the lowest-CAC, highest-LTV cohorts backed by transparent executive revenue reporting.',
    outputs: [
      'Weekly CAC payback & SQL velocity scorecard',
      'Monthly creative & messaging refresh sprints',
      'Quarterly board-level demand attribution review',
    ],
  },
];

export const BUDGET_OPTIONS = [
  { id: '15k-30k', label: '$15k – $30k / mo' },
  { id: '30k-75k', label: '$30k – $75k / mo' },
  { id: '75k-150k', label: '$75k – $150k / mo' },
  { id: '150k-plus', label: '$150k+ / mo' },
] as const;

export const SERVICE_FORM_OPTIONS: { id: ServiceId; label: string }[] = [
  { id: 'seo', label: 'Technical SEO & Programmatic Content' },
  { id: 'paid', label: 'Paid Acquisition & Bid Engineering' },
  { id: 'cro', label: 'Conversion Architecture & CRO' },
  { id: 'attribution', label: 'Revenue Attribution & RevOps' },
];
