import React, { useState } from 'react';
import {
  Sparkles,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronDown,
  ArrowRight,
  Sun,
  Layers,
  HelpCircle,
  Menu,
  X,
  Loader2,
  Star,
  Quote,
  ShieldCheck,
  Building2,
  Maximize2
} from 'lucide-react';
import { GOOGLE_SHEET_WEBHOOK_URL } from './config';

// Anti-bot phone protection: Segments assembled on client to prevent scraper harvesting
const PHONE_PARTS = {
  area: '704',
  prefix: '819',
  suffix: '2045',
};

// Non-breaking hyphen (\u2011) ensures phone number never breaks across lines
const getMaskedPhone = () => `(${PHONE_PARTS.area}) •••\u2011••••`;
const getFullPhone = () => `(${PHONE_PARTS.area}) ${PHONE_PARTS.prefix}-${PHONE_PARTS.suffix}`;
const getTelHref = () => `tel:${PHONE_PARTS.area}${PHONE_PARTS.prefix}${PHONE_PARTS.suffix}`;

// Multi-signal bot screening
const isHumanVisitor = (e?: React.SyntheticEvent): boolean => {
  if (typeof window === 'undefined') return false;
  if (window.navigator.webdriver) return false;
  const ua = window.navigator.userAgent.toLowerCase();
  if (/bot|crawler|spider|headless|crawl|phantom|slurp|facebookexternalhit|bingbot|googlebot/i.test(ua)) {
    return false;
  }
  if (e && e.nativeEvent && 'isTrusted' in e.nativeEvent) {
    if (e.nativeEvent.isTrusted === false) return false;
  }
  return true;
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);

  const handlePhoneClick = (e: React.MouseEvent, shouldCallDirect = false) => {
    if (!isHumanVisitor(e)) {
      e.preventDefault();
      console.warn('Bot screening: automated interaction blocked.');
      return;
    }

    if (!phoneRevealed) {
      e.preventDefault();
      setPhoneRevealed(true);
      if (shouldCallDirect && typeof window !== 'undefined') {
        window.location.href = getTelHref();
      }
    }
  };

  // Appointment & Estimate Form State
  const [preferredDate, setPreferredDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !streetAddress || !preferredDate || !zipCode) return;

    if (honeypot) {
      console.warn('Bot screening: spam submission discarded via honeypot.');
      setIsSubmitting(false);
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    const generatedId = 'WS-' + Math.floor(100000 + Math.random() * 900000);
    setRefId(generatedId);

    const payload = {
      refId: generatedId,
      fullName,
      phone,
      address: streetAddress,
      zipCode,
      date: preferredDate,
      timestamp: new Date().toISOString(),
    };

    if (GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error('Error submitting lead to Google Sheet:', err);
      }
    } else {
      console.log('Lead ready for Google Sheet (webhook URL pending):', payload);
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do I need to be home during my appointment?',
      a: 'Not at all. Our work is 100% exterior, so your daily schedule remains uninterrupted. As long as backyard gates are unlocked and pets remain inside, our technicians wash every exterior pane, clear outside screens, wipe sills, and latch your gates when finished.',
    },
    {
      q: 'How do you reach tall second and third-story glass?',
      a: 'We utilize professional architectural ladder standoff systems and specialized extension equipment to safely access high peaks, second-floor dormers, and multi-story transoms without resting heavy equipment directly on gutters or delicate trim.',
    },
    {
      q: 'Are exterior screens and sills included?',
      a: 'Yes, on every appointment. We wash the exterior glass panes, brush outside screens, and wipe down exterior frames and sills so trapped pollen, dust, and spider webs are thoroughly cleared.',
    },
    {
      q: 'How frequently should Charlotte homes schedule exterior window cleaning?',
      a: 'Because of Charlotte’s dense spring pine pollen (March–May) and autumn tree haze, most local homeowners schedule exterior cleanings twice a year to maintain optimal natural daylight streaming into their home.',
    },
  ];

  const neighborhoods = [
    { name: 'Myers Park & Eastover', zip: '28207' },
    { name: 'Ballantyne & Piper Glen', zip: '28277' },
    { name: 'Dilworth & South End', zip: '28203' },
    { name: 'SouthPark & Foxcroft', zip: '28211' },
    { name: 'Plaza Midwood & Elizabeth', zip: '28204' },
    { name: 'Lake Norman & Cornelius', zip: '28031' },
    { name: 'Huntersville & Highland Creek', zip: '28078' },
    { name: 'Matthews & Weddington', zip: '28105' },
    { name: 'Waxhaw & Marvin', zip: '28173' },
    { name: 'Fort Mill & Tega Cay', zip: '29708' },
  ];

  const standards = [
    {
      index: '01',
      title: 'Show Up On Time.',
      desc: 'We value your day. If your appointment is scheduled for 9:00 AM, our van arrives by 8:50 AM. If traffic or weather conditions cause any delay, you receive an immediate text update.',
      meta: 'Punctuality standard'
    },
    {
      index: '02',
      title: 'Do What We Said We’d Do.',
      desc: 'No rushed corners or skipped panes. Every exterior pane, exterior screen, and outside sill receives thorough, disciplined washing with professional craftsmanship.',
      meta: 'Full exterior scope'
    },
    {
      index: '03',
      title: 'Leave Your Grounds Untouched.',
      desc: 'We treat your grounds with complete respect. Gates latched so pets remain secure, hoses coiled neatly, and landscaping protected. Only crystal-clear glass remains.',
      meta: 'Tidy property care'
    }
  ];

  const reviews = [
    {
      quote: "With Charlotte's pine pollen every spring, our high second-story windows were coated in a thick yellow haze. WindowShine completed the exterior while we were at work—gates were latched when we returned, and the glass clarity was immaculate.",
      author: 'Sarah M.',
      neighborhood: 'Myers Park, Charlotte',
      rating: 5
    },
    {
      quote: "Communicative, prompt, and exceptionally thorough. They cleaned all 26 exterior panes and screens on our Ballantyne two-story. You don't realize how much daylight you’ve been missing until they finish.",
      author: 'Marcus & Elena T.',
      neighborhood: 'Ballantyne, Charlotte',
      rating: 5
    },
    {
      quote: "Straightforward estimate, zero high-pressure sales, and meticulous exterior cleaning. Our Lake Norman views are crisp and bright again. Excellent local service.",
      author: 'Linda K.',
      neighborhood: 'Lake Norman / Cornelius',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white text-navy-950 flex flex-col font-sans selection:bg-skycraft-500 selection:text-white">
      
      {/* Modernist Glasshouse Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          
          {/* Brand Identity */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-lg bg-navy-950 flex items-center justify-center text-skycraft-400 border border-navy-800 transition-colors group-hover:border-skycraft-500">
              <Sparkles className="w-5 h-5 text-skycraft-300" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-navy-950 font-display flex items-center gap-0.5">
                Window<span className="text-skycraft-600">Shine</span>
              </div>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                Charlotte Exterior Residential Glass
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a href="#standards" className="hover:text-navy-950 transition-colors whitespace-nowrap">
              Standards
            </a>
            <a href="#why-exterior" className="hover:text-navy-950 transition-colors whitespace-nowrap">
              Why Exterior
            </a>
            <a href="#reviews" className="hover:text-navy-950 transition-colors whitespace-nowrap">
              Reviews
            </a>
            <a href="#coverage" className="hover:text-navy-950 transition-colors whitespace-nowrap">
              Coverage
            </a>
            <a href="#faq" className="hover:text-navy-950 transition-colors whitespace-nowrap">
              FAQ
            </a>
          </nav>

          {/* Action CTAs & Protected Phone */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {!phoneRevealed ? (
              <button
                type="button"
                onClick={(e) => handlePhoneClick(e)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-navy-950 hover:text-skycraft-600 border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer group whitespace-nowrap shrink-0 bg-slate-50/70"
                title="Click to reveal phone number (anti-spam screening)"
              >
                <Phone className="w-4 h-4 text-skycraft-600 shrink-0" />
                <span className="whitespace-nowrap font-mono tracking-tight text-xs">{getMaskedPhone()}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded whitespace-nowrap group-hover:text-navy-950">
                  Show
                </span>
              </button>
            ) : (
              <a
                href={getTelHref()}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-navy-950 hover:text-skycraft-600 border border-slate-200 transition-colors whitespace-nowrap shrink-0 bg-white"
              >
                <Phone className="w-4 h-4 text-skycraft-600 shrink-0" />
                <span className="whitespace-nowrap font-mono">{getFullPhone()}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" title="Human verified" />
              </a>
            )}

            <a
              href="#quote-form"
              className="bg-navy-950 hover:bg-navy-900 text-white font-bold text-sm px-5 py-2.5 rounded-lg border border-navy-800 shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0"
            >
              Get Free Estimate
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-navy-900 rounded-lg hover:bg-slate-100 border border-slate-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <a
              href="#standards"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-navy-950 border-b border-slate-100"
            >
              Standards
            </a>
            <a
              href="#why-exterior"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-navy-950 border-b border-slate-100"
            >
              Why Exterior
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-navy-950 border-b border-slate-100"
            >
              Reviews
            </a>
            <a
              href="#coverage"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-navy-950 border-b border-slate-100"
            >
              Coverage
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-navy-950 border-b border-slate-100"
            >
              FAQ
            </a>
            
            <div className="pt-2 flex flex-col gap-2">
              {!phoneRevealed ? (
                <button
                  type="button"
                  onClick={(e) => handlePhoneClick(e, true)}
                  className="w-full text-center py-2.5 rounded-lg border border-slate-300 font-bold text-navy-950 flex items-center justify-center gap-2 cursor-pointer bg-slate-50 text-sm"
                >
                  <Phone className="w-4 h-4 text-skycraft-600" />
                  <span>Tap to Call ({getMaskedPhone()})</span>
                </button>
              ) : (
                <a
                  href={getTelHref()}
                  className="w-full text-center py-2.5 rounded-lg border border-slate-300 font-bold text-navy-950 flex items-center justify-center gap-2 text-sm"
                >
                  <Phone className="w-4 h-4 text-skycraft-600" />
                  Call {getFullPhone()}
                </a>
              )}
              <a
                href="#quote-form"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-lg bg-navy-950 text-white font-bold text-sm shadow-sm"
              >
                Request Free Estimate
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero: Modernist Architectural Grid */}
      <section className="relative border-b border-slate-200 bg-white pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Structural Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Rating Stamp */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">
                <div className="flex text-amberlight-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amberlight-500" />
                  ))}
                </div>
                <span className="font-bold text-navy-950">5.0 Rating</span>
                <span className="text-slate-300">|</span>
                <span>Charlotte Neighborhood Trusted</span>
              </div>

              {/* Architectural Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-950 font-display leading-[1.08]">
                Spotless glass. <br />
                <span className="text-skycraft-600">Pure Carolina light.</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                Charlotte’s dedicated exterior residential window cleaning service. We wash exterior panes, exterior screens, and outside sills on single-family homes and estates—leaving your living spaces flooded with clean natural light, without any indoor disruption.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#quote-form"
                  className="inline-flex items-center justify-center gap-2 bg-navy-950 hover:bg-navy-900 text-white font-bold text-base px-7 py-4 rounded-xl shadow-clean transition-all hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  <Calendar className="w-4 h-4 text-skycraft-400" />
                  Request Free Estimate
                </a>

                {/* Hero Phone Button */}
                {!phoneRevealed ? (
                  <button
                    type="button"
                    onClick={(e) => handlePhoneClick(e, true)}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-navy-950 border border-slate-300 font-bold text-base px-6 py-4 rounded-xl shadow-sm transition-all hover:border-slate-400 text-center cursor-pointer group whitespace-nowrap shrink-0"
                    title="Click to reveal phone number (anti-bot protection)"
                  >
                    <Phone className="w-4 h-4 text-skycraft-600 shrink-0" />
                    <span className="whitespace-nowrap font-mono text-sm">{getMaskedPhone()}</span>
                    <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md group-hover:bg-skycraft-100 group-hover:text-skycraft-800 transition-colors whitespace-nowrap">
                      Click to Show
                    </span>
                  </button>
                ) : (
                  <a
                    href={getTelHref()}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-navy-950 border border-slate-300 font-bold text-base px-6 py-4 rounded-xl shadow-sm transition-all hover:border-slate-400 text-center whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-4 h-4 text-skycraft-600 shrink-0" />
                    <span className="whitespace-nowrap font-mono">{getFullPhone()}</span>
                  </a>
                )}
              </div>

              {/* Architectural Hairline Spec Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
                <div className="border-l-2 border-skycraft-600 pl-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-navy-950">100% Exterior</div>
                  <div className="text-xs text-slate-500">No need to be home</div>
                </div>
                <div className="border-l-2 border-slate-300 pl-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-navy-950">On-Time Crew</div>
                  <div className="text-xs text-slate-500">10 mins early standard</div>
                </div>
                <div className="border-l-2 border-slate-300 pl-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-navy-950">Screens & Sills</div>
                  <div className="text-xs text-slate-500">Wiped clean each visit</div>
                </div>
                <div className="border-l-2 border-amberlight-500 pl-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-navy-950">Charlotte Local</div>
                  <div className="text-xs text-slate-500">Mecklenburg & Lake</div>
                </div>
              </div>

            </div>

            {/* Right Structural Photographic Frame */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-clean bg-slate-900">
                <img
                  src="/images/hero-cleaner.jpg"
                  alt="WindowShine specialist cleaning exterior residential home windows on ladder in Charlotte"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-center"
                />
                
                {/* Architectural Caption Strip */}
                <div className="absolute bottom-3 left-3 right-3 bg-navy-950/90 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">
                      Charlotte, NC • Mecklenburg County
                    </div>
                  </div>
                  <div className="text-right font-mono text-[10px] text-slate-400">
                    35.2271° N<br />80.8431° W
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Modernist Glass Showcase (Full Width Architectural Glass) */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="border border-slate-200 bg-white p-3 rounded-2xl shadow-sm">
            <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
              <img
                src="/images/squeegee-glass.jpg"
                alt="Streak-free exterior residential window glass with clean horizon views"
                className="w-full h-[360px] sm:h-[500px] lg:h-[600px] object-cover object-center"
              />
            </div>
            <div className="pt-3 px-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-2">
              <span className="font-medium text-slate-700">
                Interior view through freshly washed exterior glass — natural daylight unobstructed by seasonal pollen or rain film.
              </span>
              <span className="font-mono text-slate-400 shrink-0">
                WindowShine Residential Detail
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* The WindowShine Standards (Obsidian Grid Panes) */}
      <section id="standards" className="py-16 sm:py-24 bg-navy-950 text-white border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-skycraft-400">
              Work Ethics & Service Protocol
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              The WindowShine Standards.
            </h2>
            <p className="text-base text-slate-300 max-w-2xl">
              No sales games or fine print. Just disciplined, dependable exterior window cleaning delivered by local professionals who treat your property with complete care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-navy-800 border border-navy-800 rounded-2xl overflow-hidden">
            {standards.map((s) => (
              <div
                key={s.index}
                className="bg-navy-950 p-8 sm:p-10 flex flex-col justify-between space-y-6 hover:bg-navy-900/60 transition-colors"
              >
                <div className="space-y-4">
                  <div className="text-4xl font-extrabold font-mono text-skycraft-400">
                    {s.index}
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-navy-800/80">
                  <span className="text-xs font-mono text-amberlight-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    {s.meta}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Why Charlotte Homeowners Love Exterior-Only (4-Pane Minimalist Grid) */}
      <section id="why-exterior" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-skycraft-600">
              Exterior-Only Focus
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display tracking-tight">
              Why Charlotte Homeowners Prefer Exterior-Only.
            </h2>
            <p className="text-base text-slate-600">
              We focus 100% on outside glass, exterior screens, and outside frames. Here is why local homeowners choose this hassle-free model:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3 hover:border-slate-300 transition-colors">
              <div className="text-xs font-mono font-bold text-skycraft-600">
                [ 01 ]
              </div>
              <h3 className="text-base font-bold text-navy-950">
                Never Wait Around At Home
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Go to work, run errands, or take the kids to practice. You never need to block off four hours of your day waiting for a technician inside your house.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3 hover:border-slate-300 transition-colors">
              <div className="text-xs font-mono font-bold text-skycraft-600">
                [ 02 ]
              </div>
              <h3 className="text-base font-bold text-navy-950">
                Zero Indoor Footprint
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                No strangers walking through bedrooms, no moving plants or blinds off interior sills, and zero stress for indoor cats and dogs.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3 hover:border-slate-300 transition-colors">
              <div className="text-xs font-mono font-bold text-skycraft-600">
                [ 03 ]
              </div>
              <h3 className="text-base font-bold text-navy-950">
                Tackles 95% of Grime
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Charlotte’s yellow spring pine pollen, highway road dust, spider webs, and rain streaks accumulate on the exterior pane. Clearing the outside delivers immediate clarity.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3 hover:border-slate-300 transition-colors">
              <div className="text-xs font-mono font-bold text-skycraft-600">
                [ 04 ]
              </div>
              <h3 className="text-base font-bold text-navy-950">
                Effortless Seasonal Care
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Most Charlotte homeowners book an exterior wash each spring and autumn. An easy, routine refresh that keeps glass sparkling year-round.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Neighbor Testimonials (Editorial Pull-Quote Layout) */}
      <section id="reviews" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-skycraft-600">
              Community Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display tracking-tight">
              Verified Charlotte Homeowner Reviews.
            </h2>
            <p className="text-base text-slate-600">
              Honest work builds real reputation. Here is what local property owners say about WindowShine:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amberlight-500">
                      {[...Array(r.rating)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 fill-amberlight-500" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-slate-300" />
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                    "{r.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-navy-950 text-sm">{r.author}</div>
                    <div className="text-xs text-skycraft-700 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-skycraft-500" />
                      {r.neighborhood}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Verified</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Appointment Request Form (High-Contrast Structural Panel) */}
      <section id="quote-form" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-skycraft-600">
              Estimate & Scheduling
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display tracking-tight">
              Request Your Free Exterior Estimate.
            </h2>
            <p className="text-base text-slate-600">
              Provide your property details below. We’ll follow up with a clear, straightforward exterior estimate and confirm your preferred appointment date.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-10">
            
            {submitted ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-navy-950 font-display">
                    Thank You, {fullName}!
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                    We received your exterior estimate request for <strong className="text-navy-900">{streetAddress}, {zipCode}</strong> scheduled for <strong className="text-navy-900">{preferredDate}</strong>.
                  </p>
                  <div className="inline-block bg-white border border-slate-200 rounded-lg px-4 py-2 text-xs font-mono text-slate-700 mt-2">
                    Reference: <span className="text-skycraft-700 font-bold">{refId}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  A Charlotte residential team coordinator will review your property details and contact you directly at <strong className="text-navy-900">{phone}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setPhone('');
                      setPreferredDate('');
                      setStreetAddress('');
                      setZipCode('');
                      setHoneypot('');
                    }}
                    className="text-xs font-bold text-skycraft-700 hover:text-skycraft-800 underline cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Anti-spam honeypot (invisible to humans) */}
                <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                  <label htmlFor="website_url_hp">Website URL</label>
                  <input
                    id="website_url_hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Calendar Input */}
                  <div>
                    <label htmlFor="calendar-date" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-skycraft-600" />
                      Preferred Date *
                    </label>
                    <input
                      id="calendar-date"
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600 bg-white"
                    />
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="full-name" className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. David Miller"
                      className="w-full px-3.5 py-3 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600 bg-white"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-skycraft-600" />
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (704) 555-0192"
                      className="w-full px-3.5 py-3 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600 bg-white"
                    />
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label htmlFor="zip-code" className="block text-xs font-bold text-slate-700 mb-1">
                      Zip Code *
                    </label>
                    <input
                      id="zip-code"
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="e.g. 28207"
                      className="w-full px-3.5 py-3 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600 bg-white"
                    />
                  </div>

                  {/* Street Address */}
                  <div className="sm:col-span-2">
                    <label htmlFor="street-address" className="block text-xs font-bold text-slate-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      id="street-address"
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="e.g. 1420 Queens Rd West, Charlotte, NC"
                      className="w-full px-3.5 py-3 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600 bg-white"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-navy-950 hover:bg-navy-900 disabled:bg-slate-400 text-white font-extrabold text-sm py-4 rounded-xl shadow-clean transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-skycraft-400" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Free Estimate Request</span>
                        <ArrowRight className="w-4 h-4 text-skycraft-400" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-2.5">
                    100% exterior residential service • No need to be home
                  </p>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* Service Coverage Grid */}
      <section id="coverage" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12 space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-skycraft-600 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Coverage Area
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-display">
              Serving Charlotte & Surrounding Communities.
            </h2>
            <p className="text-sm text-slate-600">
              Our residential exterior service vans operate daily throughout Mecklenburg County and adjacent lake neighborhoods.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {neighborhoods.map((n) => (
              <div
                key={n.name}
                className="bg-white p-3.5 rounded-lg border border-slate-200 text-left"
              >
                <div className="text-xs font-bold text-navy-950">{n.name}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">Zip {n.zip}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xs text-slate-500">
            Don’t see your exact neighborhood listed?{' '}
            {!phoneRevealed ? (
              <button
                type="button"
                onClick={(e) => handlePhoneClick(e)}
                className="font-bold text-skycraft-700 underline cursor-pointer"
                title="Click to show phone number"
              >
                Reveal our phone number
              </button>
            ) : (
              <a href={getTelHref()} className="font-bold text-skycraft-700 underline font-mono">
                {getFullPhone()}
              </a>
            )}
            {' '}— we likely service your residential street.
          </div>

        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-skycraft-600">
              Common Questions
            </div>
            <h2 className="text-3xl font-extrabold text-navy-950 font-display">
              Answers for Homeowners.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-navy-950 hover:text-skycraft-700 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      openFaq === idx ? 'rotate-180 text-skycraft-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Modernist Footer */}
      <footer className="bg-navy-950 text-white pt-16 pb-12 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center text-skycraft-400 border border-navy-800">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-lg font-extrabold text-white font-display">
                  Window<span className="text-skycraft-400">Shine</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                Charlotte’s dedicated exterior residential window cleaning service. Exterior panes, exterior screens, and sill wipe-downs for single-family homes and estates.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Exterior Scope
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Exterior Window Glass Washing</li>
                <li>Exterior Screen Cleaning</li>
                <li>Window Sill & Outside Frame Wiping</li>
                <li>Multi-Story Residential Ladder Access</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Contact & Hours
              </h4>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Phone className="w-3.5 h-3.5 text-skycraft-400 shrink-0" />
                  {!phoneRevealed ? (
                    <button
                      type="button"
                      onClick={(e) => handlePhoneClick(e)}
                      className="hover:text-skycraft-300 cursor-pointer flex items-center gap-1.5 text-slate-300"
                      title="Click to reveal phone number"
                    >
                      <span className="font-mono">{getMaskedPhone()}</span>
                      <span className="text-[10px] bg-navy-900 px-1 py-0.5 rounded text-skycraft-400 border border-navy-800">
                        Show
                      </span>
                    </button>
                  ) : (
                    <a href={getTelHref()} className="hover:text-skycraft-300 font-mono">
                      {getFullPhone()}
                    </a>
                  )}
                </div>
                <div>Mon - Sat: 7:30 AM - 6:30 PM</div>
                <div>Charlotte, NC & Surrounding Areas</div>
                <div className="pt-2">
                  <a
                    href="#quote-form"
                    className="inline-block bg-skycraft-600 hover:bg-skycraft-700 text-white font-bold text-xs px-3.5 py-1.5 rounded transition-colors"
                  >
                    Request Free Estimate
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © {new Date().getFullYear()} WindowShine Charlotte. All rights reserved.
            </div>
            <div className="font-mono text-[11px] text-slate-600">
              Modernist Glasshouse Edition
            </div>
          </div>

        </div>
      </footer>

      {/* Sticky Mobile Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex gap-3 shadow-2xl">
        {!phoneRevealed ? (
          <button
            type="button"
            onClick={(e) => handlePhoneClick(e, true)}
            className="flex-1 py-3 bg-slate-100 text-navy-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 border border-slate-300 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-skycraft-600" />
            <span>Call (Tap)</span>
          </button>
        ) : (
          <a
            href={getTelHref()}
            className="flex-1 py-3 bg-slate-100 text-navy-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 border border-slate-300"
          >
            <Phone className="w-4 h-4 text-skycraft-600" />
            <span>Call {PHONE_PARTS.area}</span>
          </a>
        )}
        <a
          href="#quote-form"
          className="flex-1 py-3 bg-navy-950 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md"
        >
          <Calendar className="w-4 h-4 text-skycraft-400" />
          Free Estimate
        </a>
      </div>

    </div>
  );
}
