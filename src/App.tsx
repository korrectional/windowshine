import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Droplets,
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
  Award,
  Sun,
  Umbrella,
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
  const [serviceScope, setServiceScope] = useState<'ext_only' | 'both' | 'deluxe'>('both');
  const [windowCount, setWindowCount] = useState(24);
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

  // Estimate calculation
  const calculateEstimate = () => {
    let baseRate = 8; // base per window for exterior
    if (serviceScope === 'both') baseRate = 14;
    if (serviceScope === 'deluxe') baseRate = 18; // includes deep screens & tracks
    
    let multiplier = 1.0;
    if (propertyType === 'townhome') multiplier = 0.95;
    if (propertyType === 'estate') multiplier = 1.15;

    const base = Math.round(windowCount * baseRate * multiplier);
    const low = Math.round(base * 0.9);
    const high = Math.round(base * 1.1);
    return { low, high };
  };

  const estimate = calculateEstimate();

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
      a: 'If you have scheduled an Exterior-Only service, you do not need to be home at all! As long as gates are unlocked and pets are secured inside, our technicians will complete the pure-water wash, detail sills, and leave your property locked up. For Interior & Exterior cleans, an adult must be present to grant entry.',
    },
    {
      q: 'How does your 48-Hour Rain Guarantee work?',
      a: 'Charlotte weather can be unpredictable. If it rains within 48 hours of your cleaning and leaves spots on your freshly cleaned exterior glass, simply text or call us. We will come back out and touch up the affected windows completely free of charge. No questions asked.',
    },
    {
      q: 'What is Pure Deionized Water and why is it better than soapy water?',
      a: 'Ordinary Charlotte tap water contains 80-150 parts per million (PPM) of dissolved minerals like calcium and limestone. When regular tap water or soap dries, those minerals stay behind as milky water spots. Our 4-stage mobile filtration system strips water down to 0 PPM. When sprayed through our carbon-fiber water-fed poles, the pure water acts like a dirt magnet, dissolving grime and rinsing 100% spotless without any residue.',
    },
    {
      q: 'How do you protect the inside of my home?',
      a: 'We treat your home with immense respect. Technicians put on clean protective neoprene booties before stepping through your doorway, lay waterproof absorbent drop cloths under every window, and use specialized drip-free applicator sleeves so water never touches hardwood, rugs, or sill paint.',
    },
    {
      q: 'Are your technicians insured and background-checked?',
      a: 'Yes, 100%. WindowShine carries a $2,000,000 general liability policy specifically covering residential glass and property. Every team member undergoes a rigorous background check, wears a branded uniform, and has extensive safety training.',
    },
    {
      q: 'How often should Charlotte homeowners clean their windows?',
      a: 'Due to heavy spring pine pollen (March–May) and fall foliage dust, most Charlotte homeowners book our services twice a year—once in late spring and once in mid-autumn. Homes near Lake Norman or wooded lots often benefit from quarterly exterior maintenance.',
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
              Charlotte, NC & Mecklenburg County: Currently scheduling residential window cleans
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden md:inline-flex items-center gap-1.5">
              <Umbrella className="w-3.5 h-3.5 text-skycraft-400" />
              48-Hour Rain Guarantee
            </span>
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
                Charlotte Residential Glass
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-navy-800">
            <a href="#interactive-proof" className="hover:text-skycraft-600 transition-colors">
              The Proof
            </a>
            <a href="#services" className="hover:text-skycraft-600 transition-colors">
              Services
            </a>
            <a href="#pure-water" className="hover:text-skycraft-600 transition-colors">
              Pure-Water Science
            </a>
            <a href="#guarantee" className="hover:text-skycraft-600 transition-colors">
              3-Part Guarantee
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
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-navy-900 border-b border-slate-100"
            >
              Residential Services
            </a>
            <a
              href="#pure-water"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-navy-900 border-b border-slate-100"
            >
              Pure-Water Science
            </a>
            <a
              href="#guarantee"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-navy-900 border-b border-slate-100"
            >
              Guarantees & Insurance
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
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-skycraft-100/80 border border-skycraft-200 text-skycraft-800 text-xs sm:text-sm font-semibold">
                <ShieldCheck className="w-4 h-4 text-skycraft-600" />
                <span>$2,000,000 Insured • 48-Hour Rain Guarantee</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-950 font-display leading-[1.1]">
                Crystal-clear windows. <br />
                <span className="text-skycraft-600">Pure Carolina light.</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl font-normal">
                Charlotte’s premier residential window cleaning specialists. We wash exterior glass with spot-free deionized pure water, detail interior glass by hand with drop-cloth protection, and guarantee 100% streak-free results.
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

              {/* Four Trust Columns */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-navy-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Streak-Free
                  </div>
                  <p className="text-xs text-slate-500">100% Satisfaction Guarantee</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-navy-900 text-sm">
                    <Droplets className="w-4 h-4 text-skycraft-600 shrink-0" />
                    0 PPM Water
                  </div>
                  <p className="text-xs text-slate-500">Zero mineral spots or residue</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-navy-900 text-sm">
                    <ShieldCheck className="w-4 h-4 text-navy-700 shrink-0" />
                    $2M Policy
                  </div>
                  <p className="text-xs text-slate-500">Full residential liability coverage</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-navy-900 text-sm">
                    <Home className="w-4 h-4 text-amberlight-600 shrink-0" />
                    Booties Indoors
                  </div>
                  <p className="text-xs text-slate-500">Drop cloths under every pane</p>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Photography & Live Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                <img
                  src="/images/hero-cleaner.jpg"
                  alt="WindowShine residential specialist cleaning exterior home windows on ladder in Charlotte"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none"></div>

                {/* Live Floating Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/60 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-skycraft-700 uppercase tracking-wider">
                      On-Site in Charlotte
                    </div>
                    <div className="text-sm font-extrabold text-navy-950">
                      Multi-Story Residential Wash
                    </div>
                    <div className="text-xs text-slate-500">
                      TDS Reading: 000 PPM (Pure Deionized)
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 font-bold text-xs">
                    100%
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
              Charlotte spring pine pollen, highway haze, and hard tap water leave a dull, milky film over your glass. See the instant clarity our pure deionized water and precision squeegee create.
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
                alt="Sparkling clean window revealing bright blue sky and neighborhood"
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
                      Pollen & Mineral Film (Before)
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean Side Label */}
              <div className="absolute top-4 right-4 bg-skycraft-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg shadow-md pointer-events-none">
                WindowShine Pure Clarity (After)
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
              <span className="font-semibold text-skycraft-700">100% Streak-Free Shine ▶</span>
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

      {/* Pure-Water Technology Science Section */}
      <section id="pure-water" className="py-16 sm:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-skycraft-950 border border-skycraft-700 text-skycraft-300 text-xs font-semibold uppercase tracking-wider">
                <Droplets className="w-3.5 h-3.5 text-skycraft-400" />
                The Deionized Advantage
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
                Why we never wash exterior glass with garden-hose tap water.
              </h2>

              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                Municipal tap water in Charlotte carries dissolved minerals like calcium, magnesium, and chlorides—typically registering 110–140 PPM on a Total Dissolved Solids (TDS) meter. When regular water evaporates in the Carolina sun, those minerals harden into chalky spots.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-4 items-start bg-navy-850 p-4 rounded-xl border border-navy-700">
                  <div className="w-10 h-10 rounded-lg bg-skycraft-900/60 flex items-center justify-center text-skycraft-400 shrink-0 font-bold">
                    01
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">4-Stage Filtration to Absolute 0 PPM</h3>
                    <p className="text-sm text-slate-300 mt-1">
                      Our truck-mounted system pushes water through sediment filters, activated carbon, reverse-osmosis membranes, and virgin deionizing resin until it reads zero minerals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-navy-850 p-4 rounded-xl border border-navy-700">
                  <div className="w-10 h-10 rounded-lg bg-skycraft-900/60 flex items-center justify-center text-skycraft-400 shrink-0 font-bold">
                    02
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Natural Dirt Magnet (Zero Detergent Film)</h3>
                    <p className="text-sm text-slate-300 mt-1">
                      Because pure deionized water is in an unnatural hungry state, it actively binds to dust, pollen, and spiderwebs. No sticky soap film is left behind, which means your windows stay clean up to twice as long.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-navy-850 p-4 rounded-xl border border-navy-700">
                  <div className="w-10 h-10 rounded-lg bg-skycraft-900/60 flex items-center justify-center text-skycraft-400 shrink-0 font-bold">
                    03
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Carbon-Fiber Reach up to 4 Stories</h3>
                    <p className="text-sm text-slate-300 mt-1">
                      Our ultra-light carbon-fiber poles allow our technicians to wash difficult second and third-story dormers and high foyer glass safely from the ground without leaning heavy ladders against your gutters or crushing flower beds.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Technical Comparison Box */}
            <div className="lg:col-span-6 bg-navy-950 p-6 sm:p-8 rounded-2xl border border-navy-700 shadow-2xl">
              <h3 className="text-xl font-bold font-display text-white mb-6 flex items-center justify-between">
                <span>The Charlotte Water Difference</span>
                <span className="text-xs bg-skycraft-600/30 text-skycraft-300 border border-skycraft-500/40 px-2.5 py-1 rounded-md">
                  Field Tested
                </span>
              </h3>

              <div className="space-y-6">
                {/* Metric 1 */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-400">Charlotte Tap Water Mineral Count</span>
                    <span className="text-rose-400 font-bold">120 - 150 PPM</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div className="bg-rose-500 h-3 rounded-full w-[80%]"></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Leaves stubborn mineral scale and water spots</p>
                </div>

                {/* Metric 2 */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-white">WindowShine Deionized Pure Water</span>
                    <span className="text-emerald-400 font-bold">000 PPM (Lab Grade)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div className="bg-emerald-400 h-3 rounded-full w-[3%]"></div>
                  </div>
                  <p className="text-xs text-emerald-300 mt-1">Evaporates 100% spotless with zero residue</p>
                </div>

                {/* Detail Highlights */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-navy-800 text-center">
                  <div className="bg-navy-900 p-4 rounded-xl border border-navy-800">
                    <div className="text-2xl font-extrabold text-skycraft-400 font-display">0%</div>
                    <div className="text-xs font-semibold text-slate-300 mt-1">Chemical Runoff in Gardens</div>
                  </div>
                  <div className="bg-navy-900 p-4 rounded-xl border border-navy-800">
                    <div className="text-2xl font-extrabold text-amberlight-400 font-display">2X</div>
                    <div className="text-xs font-semibold text-slate-300 mt-1">Longer Lasting Clean</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Services Breakdown */}
      <section id="services" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display">
              Comprehensive residential glass care.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              We focus exclusively on residential homes. Every service includes complete frame wiping, sill cleaning, and our streak-free guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80 hover:border-skycraft-300 hover:shadow-clean transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-skycraft-100 flex items-center justify-center text-skycraft-700 mb-6">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-950 font-display mb-3">
                  Exterior Pure-Water Glass Wash
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Washing panes, exterior muntins, frames, and sills with 0 PPM deionized water. Clears seasonal pine pollen, bird droppings, spider webs, and road film without ladder damage to your landscape.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-navy-900 font-medium mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Spot-free deionized water rinse
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Deep frame & sill wiping included
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Multi-story reach safely from ground
                  </li>
                </ul>
              </div>
              <a
                href="#quote-form"
                onClick={() => setServiceScope('ext_only')}
                className="text-sm font-bold text-skycraft-700 hover:text-skycraft-800 flex items-center gap-1.5 pt-4 border-t border-slate-200"
              >
                Estimate Exterior Only <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Service 2 - Featured */}
            <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border-2 border-skycraft-500 shadow-xl flex flex-col justify-between relative">
              <div className="absolute -top-3.5 right-6 bg-skycraft-500 text-white font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                Most Popular in Charlotte
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-navy-850 flex items-center justify-center text-skycraft-400 mb-6 border border-navy-700">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-3">
                  Interior & Exterior Total Clean
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Transform the entire light quality of your home. Interior glass is hand-squeegeed with surgical microfiber detailing. Booties worn indoors; drop cloths protect all flooring.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200 font-medium mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-skycraft-400 shrink-0" />
                    Both sides of all panes pristine
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-skycraft-400 shrink-0" />
                    Shoe covers & drop cloths on hardwood
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-skycraft-400 shrink-0" />
                    High foyer chandeliers & transoms
                  </li>
                </ul>
              </div>
              <a
                href="#quote-form"
                onClick={() => setServiceScope('both')}
                className="text-sm font-bold text-skycraft-300 hover:text-white flex items-center gap-1.5 pt-4 border-t border-navy-800"
              >
                Estimate Interior & Exterior <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Service 3 */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80 hover:border-skycraft-300 hover:shadow-clean transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-skycraft-100 flex items-center justify-center text-skycraft-700 mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-950 font-display mb-3">
                  Deluxe Screen & Track Detailing
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  A dirty screen puts dirt right back onto clean glass with the next rain. We remove all screens for wet-brush washing, and vacuum out accumulated dead bugs, pollen, and debris from your sliding tracks.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-navy-900 font-medium mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Full screen removal & wash table scrub
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Track vacuuming & steam wipe-down
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    UV-protectant screen conditioning
                  </li>
                </ul>
              </div>
              <a
                href="#quote-form"
                onClick={() => setServiceScope('deluxe')}
                className="text-sm font-bold text-skycraft-700 hover:text-skycraft-800 flex items-center gap-1.5 pt-4 border-t border-slate-200"
              >
                Estimate Full Deluxe Package <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* The 3-Part Guarantee */}
      <section id="guarantee" className="py-16 sm:py-20 bg-skycraft-50/50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-skycraft-800 uppercase tracking-wider">
              <Award className="w-4 h-4 text-skycraft-600" />
              Peace of Mind Guarantee
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display">
              The WindowShine 3-Part Homeowner Promise.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-clean border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-amberlight-500/10 text-amberlight-600 flex items-center justify-center mb-4">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-2">1. 100% Streak-Free Guarantee</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                If you inspect any pane and see a missed spot, smear, or streak under direct sunlight, we re-clean that window on the spot or return promptly until it is flawless.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-clean border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-skycraft-500/10 text-skycraft-600 flex items-center justify-center mb-4">
                <Umbrella className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-2">2. 48-Hour Rain Warranty</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Carolina summer thunderstorms can roll in out of nowhere. If rain spots your freshly washed exterior glass within 48 hours of service, we will touch them up free of charge.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-clean border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-2">3. Zero-Damage Property Protection</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Technicians wear fresh disposable shoe covers indoors and lay protective drop cloths beneath all window work. Backed by our $2,000,000 comprehensive liability insurance.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Estimate Planner & Booking Form */}
      <section id="quote-form" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-display">
              Request Your Free Residential Estimate.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Get an instant transparent estimate range below, then submit your appointment request. We will contact you within 2 hours to confirm details and lock in your preferred date.
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
                    We received your estimate request for <strong className="text-navy-900">{streetAddress || selectedNeighborhood}</strong>.
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
                    className="text-sm font-bold text-skycraft-700 hover:text-skycraft-800 underline"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8">
                
                {/* Step 1: Property and Service Configuration */}
                <div>
                  <h3 className="text-base font-bold text-navy-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Home className="w-4 h-4 text-skycraft-600" />
                    1. Select Your Home & Service Scope
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setPropertyType('single')}
                      className={`p-4 rounded-xl border text-left transition-all ${
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
                      className={`p-4 rounded-xl border text-left transition-all ${
                        propertyType === 'townhome'
                          ? 'border-skycraft-600 bg-skycraft-50/70 text-navy-950 font-bold shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-sm">Townhouse</div>
                      <div className="text-xs text-slate-500 mt-0.5">Front/back glass, 2-3 levels</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPropertyType('estate')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        propertyType === 'estate'
                          ? 'border-skycraft-600 bg-skycraft-50/70 text-navy-950 font-bold shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-sm">Multi-Story Estate</div>
                      <div className="text-xs text-slate-500 mt-0.5">3+ stories, custom glass</div>
                    </button>
                  </div>

                  {/* Scope Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setServiceScope('ext_only')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        serviceScope === 'ext_only'
                          ? 'border-skycraft-600 bg-skycraft-50/70 text-navy-950 font-bold shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-sm">Exterior Only</div>
                      <div className="text-xs text-slate-500 mt-0.5">Pure-water wash & sills</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceScope('both')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        serviceScope === 'both'
                          ? 'border-skycraft-600 bg-skycraft-50/70 text-navy-950 font-bold shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-sm">Interior & Exterior</div>
                      <div className="text-xs text-slate-500 mt-0.5">Full glass on both sides</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceScope('deluxe')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        serviceScope === 'deluxe'
                          ? 'border-skycraft-600 bg-skycraft-50/70 text-navy-950 font-bold shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-sm">Deluxe + Screens & Tracks</div>
                      <div className="text-xs text-slate-500 mt-0.5">Full glass, scrubbed screens, vacuumed tracks</div>
                    </button>
                  </div>

                  {/* Window Count Slider */}
                  <div className="mt-8 bg-white p-5 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="window-slider" className="text-sm font-bold text-navy-950">
                        Approximate Window Count: <span className="text-skycraft-700 text-base">{windowCount} windows</span>
                      </label>
                      <span className="text-xs text-slate-500">
                        (Average Charlotte home has 20-30 panes)
                      </span>
                    </div>
                    <input
                      id="window-slider"
                      type="range"
                      min="10"
                      max="60"
                      step="2"
                      value={windowCount}
                      onChange={(e) => setWindowCount(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer squeegee-slider-range"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>10 windows</span>
                      <span>25 windows (standard)</span>
                      <span>40 windows</span>
                      <span>60+ windows</span>
                    </div>
                  </div>

                  {/* Dynamic Estimate Price Banner */}
                  <div className="mt-4 p-4 rounded-xl bg-navy-950 text-white flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-skycraft-300 uppercase font-semibold">Estimated Investment</div>
                      <div className="text-2xl sm:text-3xl font-extrabold font-display">
                        ${estimate.low} - ${estimate.high}
                      </div>
                      <div className="text-xs text-slate-400">
                        Exact quote confirmed upon quick inspection. Zero hidden fees.
                      </div>
                    </div>
                    <div className="text-xs text-slate-300 bg-navy-850 px-3 py-2 rounded-lg border border-navy-700">
                      ✓ Includes 48-Hr Rain Guarantee<br />
                      ✓ $2M General Liability Protection
                    </div>
                  </div>
                </div>

                {/* Step 2: Customer Contact & Location */}
                <div>
                  <h3 className="text-base font-bold text-navy-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-skycraft-600" />
                    2. Your Contact & Appointment Preferences
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
                        placeholder="e.g. High foyer transom, back sunroom"
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
                    <span>Confirm Estimate & Request Appointment</span>
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
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-navy-950 hover:text-skycraft-700 transition-colors"
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
                Charlotte’s premier residential window cleaning team. Pure deionized water wash, interior hand-detailing, screen and track restoration.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>$2,000,000 General Liability Insured</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
                Services
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#services" className="hover:text-white transition-colors">Exterior Pure-Water Wash</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Interior Hand Squeegee Clean</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Screen Scrubbing & Restoration</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Sliding Track Vacuuming</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Hard Water Stain Removal</a></li>
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
              <a href="#guarantee" className="hover:text-slate-400 transition-colors">Rain Warranty Policy</a>
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
