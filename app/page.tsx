'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Shirt, 
  Heart, 
  Truck, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  ImageOff,
  ShoppingBag,
  Award,
  Users
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-QUOTE
// Typography Personality: oversized

// --- Types & Data ---

const brand = {
  name: "Maggys Kollection",
  tagline: "Adorned in Strength and Dignity",
  description: "A premium thrift boutique delivering curated, high-end fashion pieces for the modern woman in Ibadan, Ilorin, and beyond.",
  industry: "fashion",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1665309421756-7a28ea27574b?q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1673173044405-aced8fca904a?q=80&w=1080",
    "https://images.unsplash.com/photo-1614845349308-338763323d3d?q=80&w=1080",
    "https://images.unsplash.com/photo-1724313802694-a33bd63f26b2?q=80&w=1080",
    "https://images.unsplash.com/photo-1773394171061-fdce7f7104e5?q=80&w=1080"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1725121225009-3d7e049fb8a6?q=80&w=1080",
    "https://images.unsplash.com/photo-1667819953753-79bbe4018855?q=80&w=1080",
    "https://images.unsplash.com/photo-1555249434-776c01c937b0?q=80&w=1080",
    "https://images.unsplash.com/photo-1708523842501-800cd1c7505e?q=80&w=1080",
    "https://images.unsplash.com/photo-1681657862057-f5b4b7596c59?q=80&w=1080",
    "https://images.unsplash.com/photo-1760097679488-f808c6aca11d?q=80&w=1080"
  ]
};

const features = [
  { title: "Curated Drops", description: "Every item is hand-selected to ensure it meets our premium quality standards.", icon: Shirt },
  { title: "Strength & Dignity", description: "Fashion that empowers the spirit and honors your unique journey.", icon: Heart },
  { title: "Swift Delivery", description: "Fast and secure shipping across Ibadan, Ilorin, and nationwide.", icon: Truck }
];

const products = [
  { name: "Vintage Silk Structure Blazer", description: "Hand-selected premium silk blend, tailored for a powerful silhouette.", price: "₦28,500" },
  { name: "The 'Dignity' Maxi Dress", description: "Flowing fabric meeting structural elegance. A statement of grace.", price: "₦35,000" },
  { name: "Curated Denim Co-ord", description: "Street-luxe two-piece set, perfectly weathered and uniquely thrifted.", price: "₦45,000" },
  { name: "Luxe Leather Carryall", description: "Timeless accessory sourced for durability and high-fashion appeal.", price: "₦18,500" }
];

const stats = [
  { number: "9k+", label: "Followers", icon: Users },
  { number: "2.7k+", label: "Curated Items", icon: ShoppingBag },
  { number: "100%", label: "Authentic Luxe", icon: Award }
];

const testimonials = [
  { name: "Oluwatoyin A.", text: "The quality of the blazer I got is insane. You wouldn't even know it's thrifted!", role: "Ibadan Client" },
  { name: "Fatimah Z.", text: "Maggys Kollection is the only place I trust for unique street-luxe pieces in Ilorin.", role: "Regular Shopper" },
  { name: "Blessing E.", text: "The packaging and delivery were seamless. I felt so premium unboxing my piece!", role: "Lagos Client" }
];

// --- Components ---

function useScrollReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function SectionPinFlip({ features }: { features: any[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      // Only progress when section has entered the viewport from the top
      if (rect.top > 0 || totalScrollable <= 0) {
        setActiveIdx(0);
        return;
      }

      const scrolled = Math.abs(rect.top);
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      const newIdx = Math.min(Math.floor(progress * features.length), features.length - 1);
      setActiveIdx(newIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [features.length]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-primary">
      <div className="sticky top-0 h-screen flex items-center overflow-y-visible">
        <div className="max-w-[90rem] mx-auto w-full px-6 grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-32 items-center">
          
          {/* Left: Pinned Quote */}
          <div className="pt-10 pr-10">
            <p className="font-heading text-3xl md:text-5xl font-black text-accent leading-[1.2] md:leading-[1.1] italic relative">
              <span className="absolute -top-12 -left-8 text-9xl text-accent/5 font-serif select-none">&ldquo;</span>
              Strength and dignity are her clothing, and she laughs at the time to come.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-10 bg-accent/20" />
              <p className="text-accent/40 text-xs tracking-[0.4em] uppercase font-bold">Proverbs 31:25</p>
            </div>
          </div>

          {/* Right: Cycling Feature Cards */}
          <div className="relative h-[400px] md:h-[350px] w-full">
            {features.map((f, idx) => (
              <div 
                key={idx} 
                className={`absolute inset-0 transition-all duration-700 ease-out flex items-center
                  ${idx === activeIdx 
                    ? 'opacity-100 translate-y-0 scale-100 z-10' 
                    : idx < activeIdx 
                      ? 'opacity-0 -translate-y-20 scale-95 z-0' 
                      : 'opacity-0 translate-y-20 scale-95 z-0'}
                `}
              >
                <div className="bg-secondary rounded-[2.5rem] p-8 md:p-12 border border-accent/5 shadow-[0_40px_100px_rgba(0,0,0,0.08)] flex flex-col md:flex-row items-center md:items-start gap-10 w-full">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-accent text-primary flex items-center justify-center shrink-0 shadow-xl">
                    <f.icon size={32} />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-heading text-2xl md:text-3xl font-black text-accent uppercase">{f.title}</h3>
                    <p className="text-accent/60 mt-4 text-base md:text-lg leading-relaxed font-medium">{f.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-accent/10 ${className}`}>
        <ImageOff size={28} className="text-accent/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // cycle every 5s
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "The Collection", href: "#products" },
    { name: "Our Story", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  // Section Refs
  const heroReveal = useScrollReveal<HTMLDivElement>();
  const featuresReveal = useScrollReveal<HTMLElement>();
  const productsReveal = useScrollReveal<HTMLElement>();
  const galleryReveal = useScrollReveal<HTMLElement>();
  const aboutReveal = useScrollReveal<HTMLElement>();
  const testimonialsReveal = useScrollReveal<HTMLElement>();
  const contactReveal = useScrollReveal<HTMLElement>();

  return (
    <main className="relative bg-primary">
      
      {/* --- Navigation --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/90 backdrop-blur-xl shadow-lg py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-2xl font-black tracking-tighter text-accent font-heading">
            MAGGYS<span className="text-secondary">.</span>K
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-bold uppercase tracking-widest text-accent hover:text-secondary transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all">
              Shop Now
            </a>
          </div>

          <button className="md:hidden text-accent" onClick={() => setIsMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* --- Mobile Sidebar --- */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-accent/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-10 flex flex-col">
          <button className="self-end text-accent mb-12" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-3xl font-black text-accent font-heading" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto border-t border-accent/10 pt-8">
            <p className="text-accent/60 text-sm font-medium">Follow us on IG</p>
            <p className="text-accent font-bold mt-1 text-lg">@maggys_kollection.ng</p>
          </div>
        </div>
      </div>

      {/* --- Hero Section (HR-A Pattern) --- */}
      <section id="home" className="min-h-screen relative flex items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-secondary/30 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div ref={heroReveal.ref} className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-5xl md:text-8xl font-black text-accent leading-[0.85] tracking-tighter uppercase">
            PREMIUM<br />
            <span className="text-secondary drop-shadow-sm">NEW / PREOWNED WEARS.</span>
          </h1>
          <p className="text-accent/70 mt-10 text-xl md:text-2xl max-w-2xl mx-auto font-medium">
            Experience the ultimate street-luxe thrift collection. Clothed with dignity, laughing at the days to come.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
            <a href="#products" className="bg-accent text-primary px-12 py-5 font-black text-lg uppercase tracking-widest hover:brightness-110 hover:scale-105 transition-all shadow-2xl">
              Shop the Drop
            </a>
            <a href="#about" className="bg-secondary text-accent px-12 py-5 font-black text-lg uppercase tracking-widest hover:brightness-95 transition-all">
              Our Vision
            </a>
          </div>
        </div>
      </section>

      <SectionPinFlip features={features} />

      {/* --- Products (Editorial Collection) --- */}
      <section id="products" ref={productsReveal.ref} className="py-28 bg-secondary">
        <div className="px-6 max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-accent leading-none">THE EDITORIAL<br />COLLECTION</h2>
            <p className="text-accent/60 mt-4 text-xl uppercase tracking-widest font-bold">Premium Thrift, Unparalleled Style</p>
          </div>
          <div className="hidden md:block text-accent/40 font-mono text-sm max-w-[200px] text-right">
            CURATED FOR THE MODERN WOMAN IN IBADAN & ILORIN
          </div>
        </div>
        
        <div className="flex gap-8 overflow-x-auto pb-12 px-6 snap-x snap-mandatory scrollbar-hide mask-fade">
          {products.map((p, i) => (
            <div 
              key={i} 
              className={`snap-start shrink-0 w-[85vw] md:w-[450px] group transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl bg-primary/20">
                <SafeImage 
                  src={IMAGES.products[i] ?? IMAGES.hero} 
                  alt={p.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/40 to-transparent" />
                <div className="absolute top-6 right-6 bg-primary text-accent px-4 py-2 rounded-full font-black text-sm">
                  {p.price}
                </div>
              </div>
              <h3 className="font-heading text-3xl font-black text-accent group-hover:text-primary transition-colors">{p.name}</h3>
              <p className="text-accent/60 text-lg mt-3 leading-relaxed">{p.description}</p>
              <a href="#contact" className="inline-flex items-center gap-3 mt-8 bg-accent text-secondary px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:gap-5 transition-all">
                Claim this Piece <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* --- About Section (Horizontal Split) --- */}
      <section id="about" ref={aboutReveal.ref} className="py-28 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-accent mb-10 leading-none">OUR<br />ESSENCE</h2>
            <p className="text-accent/70 text-2xl leading-relaxed mb-12">
              At Maggys Kollection, we believe style is more than fabric—it is an armor of confidence. 
              Based in <span className="text-accent font-black">Ibadan and Ilorin</span>, we bridge the gap between 
              sustainable thrift and high-end editorial luxury.
            </p>
            <div className="grid grid-cols-2 gap-10">
              {stats.map((s, i) => (
                <div key={i} className={`transition-all duration-1000`} style={{ transitionDelay: `${i * 200}ms` }}>
                  <p className="font-heading text-5xl font-black text-secondary">{s.number}</p>
                  <p className="text-accent font-bold uppercase tracking-widest text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <SafeImage src={IMAGES.gallery[0]} alt="Style story" fill className="object-cover" />
            <div className="absolute inset-0 border-[20px] border-primary/20 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* --- Style Gallery (Masonry) --- */}
      <section ref={galleryReveal.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-accent">STYLE IN MOTION</h2>
            <p className="text-accent/50 text-xl font-bold uppercase tracking-[0.3em] mt-4">Seeing our community wear their strength</p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {IMAGES.gallery.map((src, i) => (
              <div 
                key={i} 
                className={`break-inside-avoid group relative rounded-3xl overflow-hidden shadow-xl transition-all duration-1000 ${galleryReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <SafeImage src={src} alt={`Gallery piece ${i}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram size={40} className="text-accent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section ref={testimonialsReveal.ref} className="py-28 px-6 bg-accent text-secondary">
        <div className="max-w-4xl mx-auto text-center relative h-[500px] flex flex-col justify-center overflow-hidden">
          <h2 className="font-heading text-5xl md:text-7xl font-black mb-16 shrink-0">THE VOICE OF THE ADORNED</h2>
          <div className="relative flex-grow h-full">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${i === activeTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}
              >
                <div className="relative py-12 px-10 rounded-[3rem] border border-secondary/10 bg-secondary/5 w-full">
                  <p className="text-2xl md:text-4xl italic leading-relaxed text-secondary/90">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-12 flex items-center justify-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-accent font-black text-2xl border-2 border-secondary shadow-lg">
                      {t.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="font-heading text-2xl font-bold tracking-widest">{t.name}</p>
                      <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contact (C3 Pattern) --- */}
      <section id="contact" ref={contactReveal.ref} className="py-28 px-6 bg-primary">
        <div className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-10 skew-y-1'}`}>
          <p className="text-accent font-bold text-xs tracking-[0.5em] uppercase mb-6">Securing the Bag</p>
          <h2 className="font-heading text-6xl md:text-[5rem] font-black text-accent mb-6 leading-none">GET IN TOUCH</h2>
          <p className="text-accent/60 mb-12 text-xl font-medium">Available in Ibadan & Ilorin. Nationwide delivery sorted for every piece.</p>
          
          <div className="text-left">
            {sent ? (
              <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-secondary rounded-[2.5rem] border border-accent/10 shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-accent text-primary flex items-center justify-center mb-6">
                  <CheckCheck size={36} />
                </div>
                <h3 className="font-heading text-3xl font-black text-accent mb-3">Message Sent</h3>
                <p className="text-accent/60 max-w-sm text-lg font-medium">Thank you. Sharp delivery, nationwide. Our team will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 bg-secondary p-8 md:p-12 rounded-[2.5rem] border border-accent/5 shadow-2xl relative">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full bg-primary/20 border border-accent/10 rounded-2xl px-6 py-5 text-accent placeholder-accent/40 text-lg outline-none focus:border-accent transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full bg-primary/20 border border-accent/10 rounded-2xl px-6 py-5 text-accent placeholder-accent/40 text-lg outline-none focus:border-accent transition-all"
                  />
                  <textarea
                    rows={4}
                    placeholder="Your inquiry / item details"
                    required
                    className="w-full bg-primary/20 border border-accent/10 rounded-2xl px-6 py-5 text-accent placeholder-accent/40 text-lg outline-none resize-none focus:border-accent transition-all"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-8 bg-accent text-primary py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Send Message <ArrowRight /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* --- Footer (F2 Pattern) --- */}
      <footer className="bg-accent text-secondary py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="font-heading text-4xl font-black tracking-tighter mb-6">MAGGYS<span className="text-primary">.</span>K</h2>
            <p className="text-secondary/60 text-lg max-w-sm font-medium leading-relaxed">
              Curating high-end street-luxe fashion for the woman clothed in strength and dignity. 
              Based in Nigeria, delivering nationwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-xl font-bold mb-6 tracking-widest uppercase">Visit Us</h4>
            <div className="space-y-4 text-secondary/60 font-medium">
              <div className="flex gap-3"><MapPin size={18} className="text-primary shrink-0" /> <p>Ibadan & Ilorin, Nigeria</p></div>
              <div className="flex gap-3"><Phone size={18} className="text-primary shrink-0" /> <p>Whatsapp Available</p></div>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-xl font-bold mb-6 tracking-widest uppercase">Connect</h4>
            <div className="flex gap-4">
              <a href="https://wa.me/message/RUY2Y7PBSDQDD1" className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center hover:bg-primary hover:text-accent transition-all">
                <Phone size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center hover:bg-primary hover:text-accent transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center hover:bg-primary hover:text-accent transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-secondary/10 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold uppercase tracking-widest text-secondary/40">
          <p>© {new Date().getFullYear()} Maggys Kollection. All rights reserved.</p>
          <p>Sorted with Strength & Dignity</p>
        </div>
      </footer>

    </main>
  );
}