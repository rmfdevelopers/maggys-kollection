'use client';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-QUOTE
// Typography Personality: refined

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Shirt, 
  Tag, 
  Gem, 
  Leaf, 
  Trophy, 
  ShoppingBag, 
  Users, 
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
  ChevronRight
} from 'lucide-react';

// --- DATA FROM BRIEF ---
const brand = {
  name: "Maggys Kollection",
  tagline: "Strength & Dignity in Every Stitch",
  description: "A premium thrift boutique for the modern woman who wears her confidence as boldly as her clothes. Curating elite second-hand pieces that tell a story of resilience and grace.",
  industry: "Fashion",
  region: "Nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1747814965215-15a273e27aa6?q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1575225395866-965c8c77727f?q=80&w=1080",
    "https://images.unsplash.com/photo-1696132445229-d1fb9f35622c?q=80&w=1080",
    "https://images.unsplash.com/photo-1599826394976-0b84fed84e09?q=80&w=1080",
    "https://images.unsplash.com/photo-1666979287868-354d20716faf?q=80&w=1080"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1602193009300-85e1200ac801?q=80&w=1080",
    "https://images.unsplash.com/photo-1684296662189-7f8b1456ae09?q=80&w=1080",
    "https://images.unsplash.com/photo-1747817330508-315506ed9487?q=80&w=1080"
  ]
};

const products = [
  { name: "Vintage Oversized Blazer", description: "Structured shoulders and premium wool blend for an effortless editorial look.", price: "₦18,500" },
  { name: "Signature Silk Slip Dress", description: "Luxe champagne silk with a delicate lace hem. Perfect for layering.", price: "₦12,000" },
  { name: "Retro High-Waist Denim", description: "Thrifted 90s aesthetic with a modern tapered fit. Authentic vintage wash.", price: "₦8,500" },
  { name: "The 'Dignity' Leather Trench", description: "Statement piece in mahogany vegan leather. A true collector's find.", price: "₦45,000" }
];

const features = [
  { title: "Elite Curation", description: "Every piece is hand-picked for quality, character, and trend-relevance.", icon: Gem },
  { title: "Sustainable Luxury", description: "Redefining fashion by giving high-end garments a second life without the waste.", icon: Leaf },
  { title: "Street Heritage", description: "Fusing urban aesthetics with timeless elegance for the Ibadan fashionista.", icon: Trophy }
];

const stats = [
  { number: "9k+", label: "Style Followers" },
  { number: "2.7k", label: "Curated Items" },
  { number: "100%", label: "Authentic Finds" }
];

const testimonials = [
  { name: "Adeola O.", text: "The quality of the blazer I got is insane. You'd never know it was thrifted. Pure class!", role: "Ibadan Stylist" },
  { name: "Titi Bello", text: "Finally, a thrift store that understands the street-luxe vibe. The delivery was so fast to Ilorin.", role: "Fashion Influencer" }
];

// --- HOOKS ---
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
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
};

// --- COMPONENTS ---
function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        <ImageOff size={24} className="text-white/10" />
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section Refs
  const heroReveal = useScrollReveal(0.1);
  const featuresReveal = useScrollReveal(0.2);
  const productsReveal = useScrollReveal(0.2);
  const aboutReveal = useScrollReveal(0.2);
  const testimonialsReveal = useScrollReveal(0.2);
  const contactReveal = useScrollReveal(0.2);

  // Form State
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <main className="min-h-screen bg-primary">
      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="group">
            <span className="font-heading text-2xl md:text-3xl font-black text-white tracking-tighter">
              MAGGYS <span className="text-accent">KOLLECTION</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {['Drops', 'The Experience', 'Our Sentiment', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-accent text-xs font-bold uppercase tracking-[0.2em] transition-colors">
                {link}
              </a>
            ))}
            <a href="#products" className="bg-accent text-primary px-6 py-2.5 rounded-full font-black text-sm hover:scale-105 transition-transform">
              Shop the Drop
            </a>
          </div>

          <button onClick={() => setMenuOpen(true)} className="md:hidden text-white p-2">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-[100] transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary border-l border-white/10 p-10 flex flex-col">
          <button onClick={() => setMenuOpen(false)} className="self-end text-white/50 mb-12">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Drops', 'The Experience', 'Our Sentiment', 'Contact'].map((link) => (
              <a key={link} onClick={() => setMenuOpen(false)} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-4xl font-heading font-black text-white">
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto space-y-6 pt-10 border-t border-white/10">
            <p className="text-accent font-bold uppercase tracking-widest text-xs">Stay Connected</p>
            <div className="flex gap-4">
              <Instagram className="text-white/40" />
              <Phone className="text-white/40" />
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION - HR-A PATTERN */}
      <section id="home" ref={heroReveal.ref} className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-primary via-primary to-accent/10 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
        
        <div className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter">
            Strength & Dignity <br /> 
            <span className="text-accent italic font-light tracking-normal">are her clothing.</span>
          </h1>
          <p className="text-white/50 mt-10 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
            Premium Thrift for the woman who laughs at the days to come. Experience the new standard of curated street-luxe.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <a href="#products" className="bg-accent text-primary px-12 py-5 font-black text-lg hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full shadow-2xl">
              Shop the Drop
            </a>
            <a href="#the-experience" className="border border-white/20 text-white px-12 py-5 font-medium text-lg hover:bg-white/5 transition-all duration-300 rounded-full backdrop-blur-md">
              The Experience
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-bold">Scroll Down</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* DIVIDER: D-QUOTE */}
      <div className="py-24 px-8 text-center bg-accent/5 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent)/5,transparent_70%)]" />
        <p className="relative font-heading text-3xl md:text-6xl font-black text-white max-w-4xl mx-auto leading-tight italic opacity-90">
          &ldquo;{brand.tagline}&rdquo;
        </p>
        <p className="relative text-white/20 mt-8 text-xs tracking-[0.6em] uppercase font-bold">{brand.name} — Nigeria</p>
      </div>

      {/* FEATURES SECTION - F-NUMBERED */}
      <section id="the-experience" ref={featuresReveal.ref} className="py-32 px-6 bg-primary">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-6">The Thrift Experience</h2>
            <p className="text-white/40 text-lg max-w-lg">Why Maggys Kollection is the elite choice for vintage style in West Africa.</p>
          </div>
          <div className="divide-y divide-white/10 border-t border-white/10">
            {features.map((f, i) => (
              <div key={i} className={`py-16 flex flex-col md:flex-row items-start gap-12 transition-all duration-700 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <span className="font-heading text-accent/20 text-7xl font-black tracking-tighter shrink-0 w-24 leading-none">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-3xl font-bold text-white mb-4">{f.title}</h3>
                  <p className="text-white/50 text-xl leading-relaxed max-w-2xl">{f.description}</p>
                </div>
                <div className="w-16 h-16 rounded-3xl bg-accent/5 border border-white/10 flex items-center justify-center shrink-0 text-accent">
                  <f.icon size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION - P-ASYMMETRIC */}
      <section id="drops" ref={productsReveal.ref} className="py-32 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <h2 className="font-heading text-6xl md:text-8xl font-black text-primary leading-none">Featured <br />Drops</h2>
            <div className="text-primary/60 max-w-xs text-right space-y-4">
              <p className="text-sm font-bold uppercase tracking-widest text-primary/40">Fresh arrivals. Hand-curated. Highly limited.</p>
              <p className="text-lg">Each garment carries the mark of quality and a legacy of grace.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main Feature */}
            <div className={`md:col-span-7 group relative rounded-[2.5rem] overflow-hidden transition-all duration-1000 ${productsReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="relative h-[600px] md:h-[750px]">
                <SafeImage src={IMAGES.products[0]} alt={products[0].name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 p-12 w-full">
                  <span className="bg-accent/20 backdrop-blur-md text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">Collector's Pick</span>
                  <h3 className="font-heading text-4xl md:text-6xl font-black text-white">{products[0].name}</h3>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-6 gap-6">
                    <p className="text-white/60 text-lg max-w-sm">{products[0].description}</p>
                    <div className="flex items-center gap-6">
                      <span className="text-accent font-black text-4xl">{products[0].price}</span>
                      <a href="#contact" className="bg-accent text-primary p-4 rounded-full hover:scale-110 transition-transform">
                        <ShoppingBag size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Grid */}
            <div className="md:col-span-5 flex flex-col gap-8">
              {products.slice(1, 3).map((p, i) => (
                <div key={i} className={`group relative rounded-[2rem] overflow-hidden flex-1 transition-all duration-1000 delay-300 ${productsReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                  <div className="relative h-[300px] md:h-full">
                    <SafeImage src={IMAGES.products[i + 1]} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <h3 className="font-heading text-3xl font-black text-white mb-2">{p.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-accent font-black text-xl">{p.price}</span>
                        <a href="#contact" className="text-white text-sm font-bold border-b border-accent pb-1 flex items-center gap-2 group-hover:gap-4 transition-all">
                          Order <ChevronRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - V3 (Horizontal Split) with Proverbs Motif */}
      <section id="our-sentiment" ref={aboutReveal.ref} className="py-32 px-6 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`relative transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="absolute -top-10 -left-10 text-[18vw] font-black text-white/5 font-heading leading-none pointer-events-none select-none">31:25</div>
            <p className="text-accent font-mono text-xs tracking-[0.5em] uppercase mb-8 font-bold">The Sentiment</p>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-tight mb-8">
              The Proverbs <br /><span className="text-accent italic font-light">31:25 Standard</span>
            </h2>
            <p className="text-white/60 text-xl leading-relaxed mb-10">
              Founded on the belief that fashion should empower the soul as much as the body. Maggys Kollection isn&apos;t just about thrift; it&apos;s about the resilience and grace of the Nigerian woman.
            </p>
            <p className="text-white/40 text-lg leading-relaxed mb-16 italic">
              We source pieces that reflect your inner strength, ensuring you step out with a dignity that cannot be ignored. Every stitch is a prayer, every garment a testimony.
            </p>
            
            <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
              {stats.map((s, i) => (
                <div key={i} className={`transition-all duration-1000`} style={{ transitionDelay: `${600 + i * 200}ms` }}>
                  <p className="font-heading text-4xl font-black text-white">{s.number}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative aspect-[3/4] transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="absolute inset-0 border border-accent/20 translate-x-6 translate-y-6 rounded-[3rem]" />
            <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <SafeImage src={IMAGES.hero} alt="The Sentiment" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-accent p-10 rounded-3xl shadow-2xl max-w-xs">
              <p className="text-primary font-black text-2xl leading-tight">Serving the elite Ibadan fashion scene since 2021.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - T-MASONRY */}
      <section ref={testimonialsReveal.ref} className="py-32 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <p className="text-primary/40 font-mono text-xs tracking-[0.4em] uppercase mb-4 font-bold">Voices of the Kollection</p>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-primary">Styled by Grace</h2>
          </div>
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {testimonials.map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-white p-12 rounded-[2.5rem] shadow-xl border border-primary/5 transition-all duration-700 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <p className="text-primary/80 text-2xl leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 border-t border-primary/10 pt-8">
                  <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-primary font-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-black text-primary text-xl">{t.name}</p>
                    <p className="text-primary/40 text-sm font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - C3 Minimal Centered */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-6 font-black">Contact</p>
          <h2 className={`font-heading text-6xl md:text-8xl font-black text-white mb-10 transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-12'}`}>
            Secure the Bag
          </h2>
          <p className="text-white/40 mb-16 text-xl max-w-2xl mx-auto leading-relaxed">
            Ready to claim your piece of history? Reach out via our form below or hit our Instagram DM. Sharp delivery, nationwide.
          </p>
          
          <div className="text-left">
            {sent ? (
              <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-zinc-900 rounded-[3rem] border border-white/5">
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-8 border border-accent/40">
                  <CheckCheck size={40} className="text-accent" />
                </div>
                <h3 className="font-heading text-4xl font-black text-white mb-4">Message Sent</h3>
                <p className="text-white/60 text-lg">Thank you. Our team will review your inquiry and respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/50 p-8 md:p-16 rounded-[3rem] border border-white/5 shadow-2xl backdrop-blur-md">
                <div className="grid md:grid-cols-2 gap-6">
                  {(['name', 'email'] as const).map(field => (
                    <div key={field} className="relative group">
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={form[field]}
                        onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder-white/20 text-lg outline-none transition-all duration-300 focus:bg-white/10 focus:border-accent"
                      />
                    </div>
                  ))}
                </div>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder-white/20 text-lg outline-none transition-all duration-300 focus:bg-white/10 focus:border-accent"
                  />
                </div>
                <div className="relative group">
                  <textarea rows={5} placeholder="What are you looking for?"
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder-white/20 text-lg outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-accent"
                  />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-accent text-primary py-6 rounded-2xl font-black text-xl hover:brightness-110 hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-4">
                  {loading ? (
                    <><Loader2 className="animate-spin" size={24} /> Processing...</>
                  ) : (
                    <>Send Inquiry <ArrowRight size={24} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <span className="font-heading text-4xl font-black text-white tracking-tighter block mb-6">
              MAGGYS <span className="text-accent italic">KOLLECTION</span>
            </span>
            <p className="text-white/40 text-lg max-w-sm leading-relaxed mb-8">
              Curating high-fashion street-luxe from the heart of Nigeria. Strength, Dignity, and Sustainable Luxury.
            </p>
            <div className="flex gap-6">
              <a href="https://instagram.com/@maggys_kollection.ng" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/message/RUY2Y7PBSDQDD1" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <p className="text-white font-black text-lg mb-8">Navigation</p>
            <ul className="space-y-4">
              {['Drops', 'The Experience', 'Our Sentiment', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-white/40 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-black text-lg mb-8">Showrooms</p>
            <div className="space-y-6">
              <div className="flex gap-3 text-white/40">
                <MapPin size={18} className="shrink-0 text-accent" />
                <p className="text-sm">Ibadan & Ilorin,<br />Nigeria</p>
              </div>
              <div className="flex gap-3 text-white/40">
                <Mail size={18} className="shrink-0 text-accent" />
                <p className="text-sm">hello@maggyskollection.ng</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-bold tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Maggys Kollection. All Rights Reserved.
          </p>
          <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
            Built for the Bold
          </p>
        </div>
      </footer>
    </main>
  );
}