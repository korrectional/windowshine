import React, { useState, useRef } from 'react';
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
  Check,
  Sun,
  Layers,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  // Mobile navigation drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Squeegee Before/After slider position (percentage 0 to 100)
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle drag on squeegee interactive container
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(clamped);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  // Appointment & Estimate Form State
  const [propertyType, setPropertyType] = useState<'single' | 'townhome' | 'estate'>('single');
  const [approxWindows, setApproxWindows] = useState('16-25 windows (Standard 2-Story Home)');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('South Charlotte / Ballantyne');
  
  // Contact inputs
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [timeframe, setTimeframe] = useState('As soon as possible');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    const generatedId = 'WS-' + Math.floor(100000 + Math.random() * 900000);
    setRefId(generatedId);
    setSubmitted(true);
  };

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do I need to be home for my window cleaning appointment?',
      a: 'No! Because our work is 100% exterior, you do not need to be home at all. As long as backyard gates are unlocked and pets are kept inside, our technicians will wash all exterior glass, wipe sills, and leave your property neat and locked up.',
    },
    {
      q: 'Can you reach high windows on the second or third story?',
      a: 'Yes. We have specialized ladder systems and professional extension equipment to safely reach multi-story residential windows, high foyer transoms, dormers, and peaks.',
    },
    {
      q: 'Do you clean exterior window screens and sills?',
      a: 'Yes! Along with the glass panes, we clean exterior screens and wipe down outside frames and sills so dust and pollen are fully cleared.',
    },
    {
      q: 'How often should Charlotte homeowners clean their exterior windows?',
      a: 'Due to Charlotte’s heavy spring pine pollen (March–May) and autumn foliage dust, most local homeowners schedule exterior cleanings twice a year to keep natural light entering their home unobstructed.',
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

  return (
    <div className="min-h-screen bg-slate-50 text-navy-950 flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-navy-950 text-white text-xs sm:text-sm py-2 px-4 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">
              Charlotte, NC & Mecklenburg County: Exterior Residential Window Cleaning
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden sm:inline-block text-slate-400">Exterior Only • No Need to Be Home</span>
            <span className="hidden sm:inline-block text-navy-700">|</span>
            <a
              href="tel:7048192045"
              className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-skycraft-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amberlight-400" />
              (704) 819-2045
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
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
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-navy-800">
            <a href="#interactive-proof" className="hover:text-skycraft-600 transition-colors">
              The Proof
            </a>
            <a href="#how-it-works" className="hover:text-skycraft-600 transition-colors">
              How It Works
            </a>
            <a href="#coverage" className="hover:text-skycraft-600 transition-colors">
              Service Areas
            </a>
            <a href="#faq" className="hover:text-skycraft-600 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:7048192045"
              className="text-sm font-bold text-navy-900 hover:text-skycraft-600 px-3 py-2 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-skycraft-600" />
              (704) 819-2045
            </a>
            <a
              href="#quote-form"
              className="bg-skycraft-600 hover:bg-skycraft-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-clean transition-all hover:shadow-water hover:-translate-y-0.5 active:translate-y-0"
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
              href="#interactive-proof"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-navy-900 border-b border-slate-100"
            >
              The Proof (Interactive)
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-navy-900 border-b border-slate-100"
            >
              How It Works
            </a>
            <a
              href="#coverage"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-navy-900 border-b border-slate-100"
            >
              Charlotte Coverage
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-navy-900 border-b border-slate-100"
            >
              FAQ
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="tel:7048192045"
                className="w-full text-center py-2.5 rounded-lg border border-slate-300 font-bold text-navy-950 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-skycraft-600" />
                Call (704) 819-2045
              </a>
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
      <section className="relative bg-gradient-to-b from-skycraft-50/60 via-white to-slate-50 pt-10 sm:pt-16 pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Thesis & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              {/* Service Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-skycraft-100/80 border border-skycraft-200 text-skycraft-800 text-xs sm:text-sm font-semibold">
                <Sun className="w-4 h-4 text-skycraft-600" />
                <span>Charlotte Residential Specialists • Exterior Window Cleaning</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-950 font-display leading-[1.1]">
                Crystal-clear windows. <br />
                <span className="text-skycraft-600">Pure Carolina light.</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl font-normal">
                Charlotte’s dedicated exterior residential window cleaning service. We wash exterior panes, exterior screens, and sills on homes of all sizes—leaving your home bright and clear without any indoor disruption.
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
                <a
                  href="tel:7048192045"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-navy-950 border border-slate-300 font-bold text-base px-6 py-4 rounded-xl shadow-sm transition-all hover:border-slate-400 text-center"
                >
                  <Phone className="w-5 h-5 text-skycraft-600" />
                  (704) 819-2045
                </a>
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
                    <Layers className="w-4 h-4 text-skycraft-600 shrink-0" />
                    Multi-Story
                  </div>
                  <p className="text-xs text-slate-500">1 to 3+ stories safely reached</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-navy-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-skycraft-600 shrink-0" />
                    Sills & Frames
                  </div>
                  <p className="text-xs text-slate-500">Wiped clean on every home</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-navy-900 text-sm">
                    <Home className="w-4 h-4 text-amberlight-600 shrink-0" />
                    Charlotte Local
                  </div>
                  <p className="text-xs text-slate-500">Serving Mecklenburg & vicinity</p>
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

      {/* Interactive Signature Element: The Squeegee Reveal */}
      <section id="interactive-proof" className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display">
              Drag the squeegee to reveal the difference.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Charlotte spring pine pollen, highway haze, and rain film leave a dull layer over your glass. See the clean clarity professional exterior window washing brings to your home.
            </p>
          </div>

          {/* Interactive Squeegee Container */}
          <div className="max-w-4xl mx-auto">
            <div
              ref={containerRef}
              onMouseMove={(e) => {
                if (e.buttons === 1) handleMove(e.clientX);
              }}
              onTouchMove={handleTouchMove}
              className="relative h-[340px] sm:h-[480px] rounded-2xl overflow-hidden select-none shadow-2xl border-4 border-navy-900 cursor-ew-resize group"
            >
              {/* Clean Revealed Image (Right Side / Full Base) */}
              <img
                src="/images/squeegee-glass.jpg"
                alt="Clean exterior window revealing bright blue sky and neighborhood"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Dirty / Grimy Layer (Left Side, clipped by sliderPos) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="relative w-full h-full">
                  {/* Base blurred & pollen-tinted glass */}
                  <img
                    src="/images/squeegee-glass.jpg"
                    alt="Pollen and grime film on window"
                    className="w-full h-full object-cover filter blur-[3px] brightness-90 sepia-[0.35]"
                    style={{
                      width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                      maxWidth: 'none',
                    }}
                  />
                  {/* Grime & water spot texture overlay */}
                  <div className="absolute inset-0 bg-amber-950/20 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="bg-navy-950/80 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg shadow-md">
                      Pollen & Dirt Film (Before)
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean Side Label */}
              <div className="absolute top-4 right-4 bg-skycraft-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg shadow-md pointer-events-none">
                WindowShine Clean (After)
              </div>

              {/* Squeegee Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Squeegee Handle Indicator */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-navy-900 border-2 border-white shadow-xl flex items-center justify-center text-skycraft-300">
                  <div className="flex items-center gap-0.5">
                    <span className="text-[10px] font-bold">◀</span>
                    <Sparkles className="w-4 h-4 text-amberlight-400" />
                    <span className="text-[10px] font-bold">▶</span>
                  </div>
                </div>

                {/* Squeegee Blade Visual */}
                <div className="absolute top-2 -translate-x-1/2 w-8 h-1.5 bg-slate-400 rounded-sm"></div>
                <div className="absolute bottom-2 -translate-x-1/2 w-8 h-1.5 bg-slate-400 rounded-sm"></div>
              </div>
            </div>

            {/* Slider Control Bar below */}
            <div className="mt-4 flex items-center justify-between text-xs sm:text-sm text-slate-500 px-2">
              <span className="font-semibold text-amber-800">◀ Pollen & Grimy Glass</span>
              <span className="font-bold text-navy-900">Drag or slide across the glass</span>
              <span className="font-semibold text-skycraft-700">Clean & Bright Glass ▶</span>
            </div>
            
            <div className="mt-2">
              <input
                type="range"
                min="5"
                max="95"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                aria-label="Squeegee before and after slider"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer squeegee-slider-range"
              />
            </div>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
              Simple, hassle-free exterior cleaning.
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              We focus exclusively on exterior residential window cleaning so you get maximum light without having to rearrange your schedule or invite anyone inside.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-navy-850 p-6 sm:p-8 rounded-2xl border border-navy-700 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-skycraft-900/60 text-skycraft-400 flex items-center justify-center font-bold text-lg font-display">
                01
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Request Your Estimate
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Fill out our quick form or give us a call with your home address and approximate window count. We will send you a clear, straightforward estimate.
              </p>
            </div>

            <div className="bg-navy-850 p-6 sm:p-8 rounded-2xl border border-navy-700 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-skycraft-900/60 text-skycraft-400 flex items-center justify-center font-bold text-lg font-display">
                02
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                100% Exterior Service
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                You do not need to be home. As long as exterior gates are unlocked, our team washes exterior glass panes, scrubs exterior screens, and details window sills.
              </p>
            </div>

            <div className="bg-navy-850 p-6 sm:p-8 rounded-2xl border border-navy-700 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-skycraft-900/60 text-skycraft-400 flex items-center justify-center font-bold text-lg font-display">
                03
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Enjoy Bright Natural Light
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Walk outside and look through spotless, clear windows. Enjoy clear views and Carolina sunshine throughout your home all season long.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Appointment Request Form */}
      <section id="quote-form" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display">
              Request Your Free Residential Estimate.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Tell us a few details about your home below. We will provide a fast, straightforward estimate and confirm your preferred appointment time.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200/90 rounded-2xl shadow-clean p-6 sm:p-10">
            
            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-navy-950 font-display">
                    Thank You, {fullName}!
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto text-base">
                    We received your exterior estimate request for <strong className="text-navy-900">{streetAddress || selectedNeighborhood}</strong>.
                  </p>
                  <div className="inline-block bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 mt-2">
                    Confirmation Reference: <span className="text-skycraft-700 font-mono font-bold">{refId}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  A Charlotte residential team coordinator will review your house details and call/text you at <strong className="text-navy-900">{phone}</strong> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setPhone('');
                      setStreetAddress('');
                    }}
                    className="text-sm font-bold text-skycraft-700 hover:text-skycraft-800 underline cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8">
                
                {/* Step 1: Property Type & Window Count */}
                <div>
                  <h3 className="text-base font-bold text-navy-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Home className="w-4 h-4 text-skycraft-600" />
                    1. Select Your Home Type
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setPropertyType('single')}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        propertyType === 'single'
                          ? 'border-skycraft-600 bg-skycraft-50/70 text-navy-950 font-bold shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-sm">Single Family Home</div>
                      <div className="text-xs text-slate-500 mt-0.5">1-2 stories, typical suburban</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPropertyType('townhome')}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        propertyType === 'townhome'
                          ? 'border-skycraft-600 bg-skycraft-50/70 text-navy-950 font-bold shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-sm">Townhouse</div>
                      <div className="text-xs text-slate-500 mt-0.5">Front & back glass, 2-3 levels</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPropertyType('estate')}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        propertyType === 'estate'
                          ? 'border-skycraft-600 bg-skycraft-50/70 text-navy-950 font-bold shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-sm">Multi-Story Estate</div>
                      <div className="text-xs text-slate-500 mt-0.5">3+ stories, custom glass</div>
                    </button>
                  </div>

                  {/* Window Count Selection */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200">
                    <label htmlFor="window-select" className="block text-sm font-bold text-navy-950 mb-1.5">
                      Approximate Window Count or Home Size
                    </label>
                    <select
                      id="window-select"
                      value={approxWindows}
                      onChange={(e) => setApproxWindows(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600 bg-white text-navy-900 font-medium"
                    >
                      <option value="10-15 windows (Townhouse / Small Ranch)">10–15 windows (Townhouse / 1-Story Ranch)</option>
                      <option value="16-25 windows (Standard 2-Story Home)">16–25 windows (Standard 2-Story Home)</option>
                      <option value="26-35 windows (Large 2-Story / 3,000+ sq ft)">26–35 windows (Large 2-Story / 3,000+ sq ft)</option>
                      <option value="36-50+ windows (Multi-Story Estate / Custom Glass)">36–50+ windows (Multi-Story Estate / Custom Glass)</option>
                      <option value="Not sure / Count on-site">Not sure (We will count on-site)</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-2">
                      An average Charlotte residential home has approximately 20–28 exterior panes.
                    </p>
                  </div>

                  {/* Clear Commitment Banner */}
                  <div className="mt-6 p-5 rounded-xl bg-navy-950 text-white flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-skycraft-300 uppercase font-semibold">Free Consultation</div>
                      <div className="text-xl sm:text-2xl font-extrabold font-display">
                        100% Free, Zero-Obligation Estimate
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        We confirm exact pricing upfront before any work starts. No surprises, no hidden fees.
                      </div>
                    </div>
                    <div className="text-xs text-slate-300 bg-navy-850 px-3.5 py-2.5 rounded-lg border border-navy-700">
                      <div className="flex items-center gap-1.5 text-white font-medium">
                        <Check className="w-3.5 h-3.5 text-skycraft-400 shrink-0" />
                        Exterior Only • No Need to Be Home
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Customer Contact & Location */}
                <div>
                  <h3 className="text-base font-bold text-navy-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-skycraft-600" />
                    2. Your Contact & Location Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. David Miller"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(704) 555-0192"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="david@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Charlotte Area Neighborhood
                      </label>
                      <select
                        value={selectedNeighborhood}
                        onChange={(e) => setSelectedNeighborhood(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600 bg-white"
                      >
                        {neighborhoods.map((n) => (
                          <option key={n.name} value={n.name}>
                            {n.name} ({n.zip})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="e.g. 1420 Queens Rd West, Charlotte, NC"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Timing
                      </label>
                      <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600 bg-white"
                      >
                        <option value="As soon as possible">As soon as possible (This week)</option>
                        <option value="Next week">Next week</option>
                        <option value="Within 2-3 weeks">Within 2-3 weeks</option>
                        <option value="Weekend preference">Weekend only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Special Notes (Optional)
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. High foyer transom, detached garage windows"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-skycraft-600 focus:ring-1 focus:ring-skycraft-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-skycraft-600 hover:bg-skycraft-700 text-white font-extrabold text-base py-4 rounded-xl shadow-clean hover:shadow-water transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Free Estimate Request</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-3">
                    🔒 We respect your privacy. No spam, no aggressive sales calls.
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
              Local Mecklenburg Coverage
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display">
              Serving Charlotte & Surrounding Communities.
            </h2>
            <p className="text-base text-slate-600">
              Our residential service vans operate daily throughout the Queen City and adjacent lake and suburban communities.
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
            Don’t see your exact Charlotte neighborhood? Call us at <a href="tel:7048192045" className="font-bold text-skycraft-700 underline">(704) 819-2045</a>—we likely service your street!
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
                Charlotte’s dedicated exterior residential window cleaning service. Exterior glass panes, exterior screens, and sill wipe-downs.
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
                <li>Multi-Story Home Access</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
                Contact & Scheduling
              </h4>
              <div className="space-y-3 text-sm text-slate-400">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Phone className="w-4 h-4 text-skycraft-400" />
                  <a href="tel:7048192045" className="hover:text-skycraft-300">(704) 819-2045</a>
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
        <a
          href="tel:7048192045"
          className="flex-1 py-3 bg-slate-100 text-navy-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 border border-slate-300"
        >
          <Phone className="w-4 h-4 text-skycraft-600" />
          Call (704)
        </a>
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
