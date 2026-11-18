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
  Home,
  Sun,
  Layers,
  HelpCircle,
  Menu,
  X,
  Loader2,
  Star,
  Quote,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { GOOGLE_SHEET_WEBHOOK_URL } from './config';

// Bot protection: Phone digits stored separately to prevent static HTML scrapers
const PHONE_PARTS = {
  area: '704',
  prefix: '819',
  suffix: '2045',
};

const getMaskedPhone = () => `(${PHONE_PARTS.area}) •••\u2011••••`;
const getFullPhone = () => `(${PHONE_PARTS.area}) ${PHONE_PARTS.prefix}-${PHONE_PARTS.suffix}`;
const getTelHref = () => `tel:${PHONE_PARTS.area}${PHONE_PARTS.prefix}${PHONE_PARTS.suffix}`;

// Bot screening logic
const isHumanVisitor = (e?: React.SyntheticEvent): boolean => {
  if (typeof window === 'undefined') return false;
  // 1. Headless / automated driver detection
  if (window.navigator.webdriver) return false;
  // 2. Crawler user-agent signatures
  const ua = window.navigator.userAgent.toLowerCase();
  if (/bot|crawler|spider|headless|crawl|phantom|slurp|facebookexternalhit|bingbot|googlebot/i.test(ua)) {
    return false;
  }
  // 3. Synthetic untrusted event detection (native browser user event required)
  if (e && e.nativeEvent && 'isTrusted' in e.nativeEvent) {
    if (e.nativeEvent.isTrusted === false) return false;
  }
  return true;
};

export default function App() {
  // Mobile navigation drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Anti-bot phone reveal state
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

    // Bot screening: silently ignore bot submission filling hidden honeypot
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
      a: 'Not at all! Because our work is 100% exterior, you can go to work, run errands, or relax. As long as backyard gates are unlocked and pets are inside, our crew washes every exterior pane, clears outside screens, wipes sills, and latches the gate when finished.',
    },
    {
      q: 'How do you reach tall second or third story windows?',
      a: 'We bring specialized ladder standoff systems and professional exterior extension equipment to reach multi-story heights safely and cleanly—including hard-to-reach foyer transoms, dormers, and gables.',
    },
    {
      q: 'Do you clean the outside screens and sills too?',
      a: 'Yes, every single time. We don’t just wipe the glass—we clear exterior screens and wipe down outside frames and sills so trapped pollen, cobwebs, and road dust don’t wash right back over your clean glass.',
    },
    {
      q: 'How often should Charlotte homes get exterior window cleaning?',
      a: 'With Charlotte’s heavy spring yellow pine pollen (March–May) and autumn tree dust, most local homeowners schedule an exterior wash twice a year to keep natural daylight streaming through their home unobstructed.',
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
      num: '.01',
      title: 'Show up on time.',
      desc: 'We value your day. If your appointment is set for 9:00 AM, our van rolls up by 8:50 AM. If Carolina traffic or weather ever causes a hiccup, you get a friendly text right away.',
      highlight: '10 mins early is our standard'
    },
    {
      num: '.02',
      title: 'Do what we said we’d do.',
      desc: 'No cutting corners, no skipped panes, and no half-cleaned frames. Every exterior pane, screen, and sill gets thorough, attentive washing with honest elbow grease.',
      highlight: 'Panes, screens & sills included'
    },
    {
      num: '.03',
      title: 'Leave your yard untouched.',
      desc: 'We treat your property with complete care. Gates latched so dogs stay safe, hoses rolled neatly, and garden beds respected. All we leave behind is spotless glass.',
      highlight: 'Gates latched & grounds tidy'
    }
  ];

  const reviews = [
    {
      quote: "With Charlotte's pine pollen every spring, our second-story windows were coated in a dull yellow haze. WindowShine came out while we were at work—gates were latched when we got home, and the glass was completely crystal clear. Couldn't have been easier!",
      author: 'Sarah M.',
      neighborhood: 'Myers Park, Charlotte',
      rating: 5
    },
    {
      quote: "Super communicative, on time, and friendly. Cleaned all 26 exterior windows and screens on our two-story in Ballantyne. You don't realize how much natural light you are missing until they finish. Night and day difference!",
      author: 'Marcus & Elena T.',
      neighborhood: 'Ballantyne, Charlotte',
      rating: 5
    },
    {
      quote: "Straightforward estimate, no sales games, and top-tier exterior cleaning. My Lake Norman views are crisp again. It’s rare to find folks who take this much pride in honest exterior work.",
      author: 'Linda K.',
      neighborhood: 'Lake Norman / Cornelius',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-navy-950 flex flex-col font-sans">
      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 rounded-xl bg-navy-900 flex items-center justify-center text-skycraft-400 shadow-clean transition-transform group-hover:scale-105">
              <Sparkles className="w-6 h-6 text-skycraft-300" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-navy-950 font-display flex items-center gap-1">
                Window<span className="text-skycraft-600">Shine</span>
              </div>
              <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                Charlotte Exterior Residential Glass
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm font-semibold text-navy-800">
            <a href="#standards" className="hover:text-skycraft-600 transition-colors whitespace-nowrap">
              The Standards
            </a>
            <a href="#why-exterior" className="hover:text-skycraft-600 transition-colors whitespace-nowrap">
              Why Exterior
            </a>
            <a href="#reviews" className="hover:text-skycraft-600 transition-colors whitespace-nowrap">
              Reviews
            </a>
            <a href="#coverage" className="hover:text-skycraft-600 transition-colors whitespace-nowrap">
              Service Areas
            </a>
            <a href="#faq" className="hover:text-skycraft-600 transition-colors whitespace-nowrap">
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {!phoneRevealed ? (
              <button
                type="button"
                onClick={(e) => handlePhoneClick(e)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-navy-900 hover:text-skycraft-600 transition-colors cursor-pointer group whitespace-nowrap shrink-0 hover:bg-slate-100"
                title="Click to reveal phone number"
              >
                <Phone className="w-4 h-4 text-skycraft-600 shrink-0" />
                <span className="whitespace-nowrap font-mono">{getMaskedPhone()}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-skycraft-100 text-skycraft-800 px-2 py-0.5 rounded-full whitespace-nowrap group-hover:bg-skycraft-200 transition-colors">
                  Show
                </span>
              </button>
            ) : (
              <a
                href={getTelHref()}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-navy-900 hover:text-skycraft-600 transition-colors whitespace-nowrap shrink-0 hover:bg-slate-100"
              >
                <Phone className="w-4 h-4 text-skycraft-600 shrink-0" />
                <span className="whitespace-nowrap">{getFullPhone()}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" title="Human verified" />
              </a>
            )}
            <a
              href="#quote-form"
              className="bg-skycraft-600 hover:bg-skycraft-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-clean transition-all hover:shadow-water hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0"
            >
              Get Free Estimate
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-navy-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
            <a
              href="#standards"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-navy-900 border-b border-slate-100"
            >
              The Standards
            </a>
            <a
              href="#why-exterior"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-navy-900 border-b border-slate-100"
            >
              Why Exterior-Only
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-navy-900 border-b border-slate-100"
            >
              Neighbor Reviews
            </a>
            <a
              href="#coverage"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-navy-900 border-b border-slate-100"
            >
              Service Areas
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-navy-900 border-b border-slate-100"
            >
              FAQ
            </a>
            <div className="pt-2 flex flex-col gap-2">
              {!phoneRevealed ? (
                <button
                  type="button"
                  onClick={(e) => handlePhoneClick(e, true)}
                  className="w-full text-center py-2.5 rounded-lg border border-slate-300 font-bold text-navy-950 flex items-center justify-center gap-2 cursor-pointer bg-slate-50"
                >
                  <Phone className="w-4 h-4 text-skycraft-600" />
                  <span>Tap to Call ({getMaskedPhone()})</span>
                </button>
              ) : (
                <a
                  href={getTelHref()}
                  className="w-full text-center py-2.5 rounded-lg border border-slate-300 font-bold text-navy-950 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-skycraft-600" />
                  Call {getFullPhone()}
                </a>
              )}
              <a
                href="#quote-form"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-lg bg-skycraft-600 text-white font-bold shadow-clean"
              >
                Request Free Estimate
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-skycraft-50/70 via-white to-slate-50 pt-10 sm:pt-16 pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Lively Thesis & Direct Value */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Star Rating Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-semibold shadow-sm">
                <div className="flex text-amberlight-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amberlight-500" />
                  ))}
                </div>
                <span className="text-navy-950 font-bold">5.0 Star Rated</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600">Charlotte Neighbor Favorite</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-950 font-display leading-[1.1]">
                Window cleaning done the right way. <br />
                <span className="text-skycraft-600">Pure Carolina light.</span>
              </h1>

              {/* Subheading with Warm Tone */}
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl font-normal">
                Hello Charlotte! We bring back good, honest service to exterior window washing. Reliable local crews, crystal-clear glass, and zero indoor disruption—leaving your home flooded with natural sunshine.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#quote-form"
                  className="inline-flex items-center justify-center gap-2 bg-navy-950 hover:bg-navy-900 text-white font-bold text-base px-7 py-4 rounded-xl shadow-clean transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  <Calendar className="w-5 h-5 text-skycraft-400" />
                  Request Free Estimate
                </a>

                {/* Hero Phone with Bot Screening */}
                {!phoneRevealed ? (
                  <button
                    type="button"
                    onClick={(e) => handlePhoneClick(e, true)}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-navy-950 border border-slate-300 font-bold text-base px-6 py-4 rounded-xl shadow-sm transition-all hover:border-slate-400 text-center cursor-pointer group whitespace-nowrap shrink-0"
                    title="Click to reveal phone number (anti-bot protection)"
                  >
                    <Phone className="w-5 h-5 text-skycraft-600 shrink-0" />
                    <span className="whitespace-nowrap font-mono">{getMaskedPhone()}</span>
                    <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md group-hover:bg-skycraft-100 group-hover:text-skycraft-800 transition-colors whitespace-nowrap">
                      Click to Show
                    </span>
                  </button>
                ) : (
                  <a
                    href={getTelHref()}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-navy-950 border border-slate-300 font-bold text-base px-6 py-4 rounded-xl shadow-sm transition-all hover:border-slate-400 text-center whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-5 h-5 text-skycraft-600 shrink-0" />
                    <span className="whitespace-nowrap">{getFullPhone()}</span>
                  </a>
                )}
              </div>

              {/* Four Focused Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-navy-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-skycraft-600 shrink-0" />
                    100% Exterior
                  </div>
                  <p className="text-xs text-slate-500">No need to be home</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-navy-900 text-sm">
                    <Clock className="w-4 h-4 text-skycraft-600 shrink-0" />
                    On-Time Crew
                  </div>
                  <p className="text-xs text-slate-500">10 mins early is standard</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-navy-900 text-sm">
                    <Layers className="w-4 h-4 text-skycraft-600 shrink-0" />
                    Screens & Sills
                  </div>
                  <p className="text-xs text-slate-500">Wiped clean every visit</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-navy-900 text-sm">
                    <Home className="w-4 h-4 text-amberlight-600 shrink-0" />
                    Charlotte Local
                  </div>
                  <p className="text-xs text-slate-500">Serving Mecklenburg & lake</p>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                <img
                  src="/images/hero-cleaner.jpg"
                  alt="WindowShine residential specialist cleaning exterior home windows on ladder in Charlotte"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none"></div>

                {/* Floating Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/60 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-skycraft-700 uppercase tracking-wider">
                      Charlotte, NC
                    </div>
                    <div className="text-sm font-extrabold text-navy-950">
                      Residential Exterior Window Cleaning
                    </div>
                    <div className="text-xs text-slate-500">
                      Single Family Homes, Townhouses & Estates
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-skycraft-100 flex items-center justify-center text-skycraft-700 shrink-0 font-bold text-xs">
                    CLT
                  </div>
                </div>
              </div>

              {/* Background decorative soft glow */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-skycraft-200/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Decorative Full-Size Window Glass Feature */}
      <section className="py-10 sm:py-14 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200 bg-slate-900">
            <img
              src="/images/squeegee-glass.jpg"
              alt="Clean exterior window with streak-free glass and squeegee"
              className="w-full h-[360px] sm:h-[500px] lg:h-[620px] object-cover object-center"
            />
          </div>
          <p className="text-center text-xs sm:text-sm text-slate-500 mt-4">
            The view from inside after professional exterior washing: crystal-clear glass that lets Carolina sunlight brighten your entire living space.
          </p>
        </div>
      </section>

      {/* The WindowShine Standards */}
      <section id="standards" className="py-16 sm:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-skycraft-950 border border-skycraft-800 text-skycraft-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-skycraft-400" />
              Our Everyday Work Ethics
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
              The WindowShine Standards.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              No corporate red tape. No sales pitches. Just hardworking, dependable local window cleaners who take genuine pride in treating your home like their own.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {standards.map((std) => (
              <div
                key={std.num}
                className="bg-navy-850 p-8 rounded-2xl border border-navy-700/80 space-y-4 relative flex flex-col justify-between hover:border-skycraft-700 transition-colors"
              >
                <div className="space-y-4">
                  <div className="text-3xl font-extrabold text-skycraft-400 font-mono">
                    {std.num}
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {std.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {std.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-navy-750">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amberlight-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    {std.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Why Charlotte Homeowners Love Exterior-Only */}
      <section id="why-exterior" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display">
              Why Charlotte Loves Exterior-Only.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              We specialize 100% on outside glass, frames, and screens. Here is why homeowners prefer our hassle-free approach:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-skycraft-100 text-skycraft-700 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-base font-bold text-navy-950">
                Never Wait Around At Home
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Go to work, run errands, or take the kids to practice. You never have to block off hours of your day waiting for a service technician indoors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-skycraft-100 text-skycraft-700 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-base font-bold text-navy-950">
                Zero Household Disruption
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                No strangers tracking through bedrooms, no taking blinds down, no moving plants off window sills, and no stress for indoor pets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-skycraft-100 text-skycraft-700 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-base font-bold text-navy-950">
                Tackles 95% of Grime
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Charlotte’s yellow pine pollen, roadway pollution, spider webs, and baked-on rain spots live on the exterior glass. Washing the outside gives immediate crystal clarity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-skycraft-100 text-skycraft-700 flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-base font-bold text-navy-950">
                Effortless Seasonal Care
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Most Charlotte homeowners book an exterior wash each spring and fall. A fast, easy refresh that keeps your home shining year-round.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Neighbor Reviews */}
      <section id="reviews" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amberlight-100 border border-amberlight-300 text-amberlight-800 text-xs font-semibold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-amberlight-600 fill-amberlight-600" />
              Real Charlotte Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display">
              What Your Neighbors Are Saying.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Honest work leads to happy neighbors. Here’s what local homeowners have to say about WindowShine:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200 shadow-clean flex flex-col justify-between space-y-6 hover:shadow-clean-hover transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amberlight-500">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amberlight-500" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                    "{r.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <div className="font-bold text-navy-950 text-sm">{r.author}</div>
                  <div className="text-xs text-skycraft-700 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-skycraft-500" />
                    {r.neighborhood}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 text-sm font-bold text-skycraft-700 hover:text-skycraft-800 underline"
            >
              Ready to see the difference on your own home? Get a quick exterior estimate &rarr;
            </a>
          </div>

        </div>
      </section>

      {/* Appointment Request Form */}
      <section id="quote-form" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-skycraft-100 border border-skycraft-200 text-skycraft-800 text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-skycraft-600" />
              Quick & Easy Scheduling
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display">
              Request Your Free Residential Estimate.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Tell us a few quick details below. We’ll follow up with a clear, straightforward estimate and confirm your preferred appointment date.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200/90 rounded-2xl shadow-clean p-6 sm:p-10">
            
            {submitted ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-navy-950 font-display">
                    Thank You, {fullName}!
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto text-base">
                    We received your exterior estimate request for <strong className="text-navy-900">{streetAddress}, {zipCode}</strong> scheduled for <strong className="text-navy-900">{preferredDate}</strong>.
                  </p>
                  <div className="inline-block bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 mt-2">
                    Confirmation Reference: <span className="text-skycraft-700 font-mono font-bold">{refId}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  A Charlotte residential team coordinator will review your property details and contact you at <strong className="text-navy-900">{phone}</strong>.
                </p>
                <div className="pt-4">
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
                    className="text-sm font-bold text-skycraft-700 hover:text-skycraft-800 underline cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Anti-spam honeypot (invisible to humans, traps automated form-filling bots) */}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Calendar Input */}
                  <div>
                    <label htmlFor="calendar-date" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-skycraft-600" />
                      Preferred Date *
                    </label>
                    <input
                      id="calendar-date"
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600 bg-white"
                    />
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="full-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. David Miller"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600 bg-white"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-skycraft-600" />
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (704) 555-0192"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600 bg-white"
                    />
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label htmlFor="zip-code" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Zip Code *
                    </label>
                    <input
                      id="zip-code"
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="e.g. 28207"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600 bg-white"
                    />
                  </div>

                  {/* Street Address */}
                  <div className="sm:col-span-2">
                    <label htmlFor="street-address" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Address *
                    </label>
                    <input
                      id="street-address"
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="e.g. 1420 Queens Rd West, Charlotte, NC"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600 bg-white"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-skycraft-600 hover:bg-skycraft-700 disabled:bg-skycraft-400 text-white font-extrabold text-base py-4 rounded-xl shadow-clean hover:shadow-water transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Free Estimate Request</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-3">
                    Exterior service only • No need to be home
                  </p>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* Charlotte Neighborhood Coverage */}
      <section id="coverage" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-skycraft-800 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-skycraft-600" />
              Local Mecklenburg & Lake Coverage
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display">
              Proudly Serving Charlotte Communities.
            </h2>
            <p className="text-base text-slate-600">
              Our residential service vans operate daily throughout the Queen City and adjacent lake and suburban neighborhoods.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {neighborhoods.map((n) => (
              <div
                key={n.name}
                className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-sm flex items-center gap-2.5 text-left"
              >
                <div className="w-2 h-2 rounded-full bg-skycraft-500 shrink-0"></div>
                <div>
                  <div className="text-xs font-bold text-navy-950 leading-snug">{n.name}</div>
                  <div className="text-[10px] text-slate-400">Zip {n.zip}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-slate-500">
            Don’t see your exact Charlotte neighborhood? Call us at{' '}
            {!phoneRevealed ? (
              <button
                type="button"
                onClick={(e) => handlePhoneClick(e)}
                className="font-bold text-skycraft-700 underline cursor-pointer inline-flex items-center gap-1"
                title="Click to show phone number"
              >
                {getMaskedPhone()} (show)
              </button>
            ) : (
              <a href={getTelHref()} className="font-bold text-skycraft-700 underline">
                {getFullPhone()}
              </a>
            )}
            —we likely service your street!
          </div>

        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-skycraft-800 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-skycraft-600" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display">
              Answers for Charlotte Homeowners.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-navy-950 hover:text-skycraft-700 transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      openFaq === idx ? 'rotate-180 text-skycraft-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 text-white pt-16 pb-12 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-navy-850 flex items-center justify-center text-skycraft-400 border border-navy-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-xl font-extrabold text-white font-display">
                  Window<span className="text-skycraft-400">Shine</span>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Charlotte’s dedicated exterior residential window cleaning service. Honest work, spotless glass, wiped sills, and clean exterior screens.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
                Exterior Services
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Exterior Window Glass Washing</li>
                <li>Exterior Screen Cleaning</li>
                <li>Window Sill & Frame Wiping</li>
                <li>Multi-Story Residential Access</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
                Contact & Scheduling
              </h4>
              <div className="space-y-3 text-sm text-slate-400">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Phone className="w-4 h-4 text-skycraft-400" />
                  {!phoneRevealed ? (
                    <button
                      type="button"
                      onClick={(e) => handlePhoneClick(e)}
                      className="hover:text-skycraft-300 cursor-pointer flex items-center gap-1.5 text-slate-300"
                      title="Click to reveal phone number"
                    >
                      <span>{getMaskedPhone()}</span>
                      <span className="text-[10px] bg-navy-850 px-1.5 py-0.5 rounded text-skycraft-400 border border-navy-700">
                        Show
                      </span>
                    </button>
                  ) : (
                    <a href={getTelHref()} className="hover:text-skycraft-300">
                      {getFullPhone()}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>Mon - Sat: 7:30 AM - 6:30 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>Charlotte, NC & Surrounding Areas</span>
                </div>
                <div className="pt-2">
                  <a
                    href="#quote-form"
                    className="inline-block bg-skycraft-600 hover:bg-skycraft-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors"
                  >
                    Request Free Estimate
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-navy-850 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © {new Date().getFullYear()} WindowShine Charlotte. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Sticky Mobile Call & Quote Bar */}
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
            <span>Call (704)</span>
          </a>
        )}
        <a
          href="#quote-form"
          className="flex-1 py-3 bg-skycraft-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md"
        >
          <Calendar className="w-4 h-4" />
          Free Estimate
        </a>
      </div>

    </div>
  );
}
