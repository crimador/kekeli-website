'use client';

import { useState } from 'react';
import {
  Calculator, FileText, TrendingUp, Megaphone, BarChart2,
  GraduationCap, Users, ClipboardList, Printer, Monitor,
  Phone, Mail, MapPin, Menu, X, ChevronRight, Sun,
  Shield, Clock, Award, HeartHandshake, CheckCircle2,
  ArrowRight, ChevronDown, Lightbulb,
  Target, Zap, Globe,
} from 'lucide-react';

// ── Couleurs ──────────────────────────────────────────────────────────────────
const NAVY   = '#1E1D3D';
const ORANGE = '#FF7E00';
const GOLD   = '#FAC731';

// ── Données ───────────────────────────────────────────────────────────────────

const SERVICE_CATEGORIES = [
  {
    cat: 'Finance & Gestion',
    color: ORANGE,
    items: [
      {
        icon: Calculator,
        label: 'Comptabilité',
        desc: "Tenue de comptabilité générale et analytique, révision des comptes, établissement des bilans et états financiers selon les normes SYSCOHADA révisé.",
        features: ["Tenue de livres comptables", "Bilan et compte de résultat", "Rapprochement bancaire", "États financiers annuels"],
      },
      {
        icon: FileText,
        label: 'Fiscalité',
        desc: "Déclarations fiscales mensuelles et annuelles, optimisation de la charge fiscale, assistance et représentation lors des contrôles fiscaux.",
        features: ["Déclarations TVA & IS", "Optimisation fiscale", "Assistance contrôle fiscal", "Conseil en droit fiscal"],
      },
    ],
  },
  {
    cat: 'Développement Commercial',
    color: GOLD,
    items: [
      {
        icon: TrendingUp,
        label: 'Marketing',
        desc: "Élaboration de stratégies marketing sur mesure, analyse du marché cible et mise en place de campagnes efficaces pour booster votre croissance.",
        features: ["Stratégie marketing digitale", "Gestion des réseaux sociaux", "Campagnes publicitaires", "Analyse de performance"],
      },
      {
        icon: Megaphone,
        label: 'Communication',
        desc: "Création et gestion de votre identité visuelle, production de contenus professionnels pour tous vos supports de communication.",
        features: ["Identité visuelle & logo", "Création de contenu", "Relations publiques", "Communication de crise"],
      },
      {
        icon: BarChart2,
        label: "Étude de marché",
        desc: "Analyse approfondie de votre secteur, étude de la concurrence, identification des opportunités pour prendre des décisions éclairées.",
        features: ["Analyse concurrentielle", "Étude de la demande", "Rapport de marché", "Recommandations stratégiques"],
      },
    ],
  },
  {
    cat: 'Formation & Accompagnement',
    color: NAVY,
    items: [
      {
        icon: GraduationCap,
        label: 'Formations',
        desc: "Programmes de formation professionnelle adaptés à votre secteur en gestion, comptabilité, outils numériques et management.",
        features: ["Formation en présentiel", "Ateliers pratiques", "Supports pédagogiques", "Certification"],
      },
      {
        icon: Users,
        label: 'Coaching',
        desc: "Accompagnement individuel et collectif pour développer vos compétences managériales, votre leadership et la performance de vos équipes.",
        features: ["Coaching individuel", "Team building", "Développement du leadership", "Gestion du stress"],
      },
    ],
  },
  {
    cat: 'Services Administratifs & Techniques',
    color: ORANGE,
    items: [
      {
        icon: ClipboardList,
        label: 'Rédaction & Gestion de projet',
        desc: "Rédaction professionnelle de dossiers, plans d'affaires, rapports et gestion de bout en bout de vos projets avec des outils modernes.",
        features: ["Plans d'affaires", "Dossiers de financement", "Gestion de projet", "Rapports d'activité"],
      },
      {
        icon: ClipboardList,
        label: 'Démarches administratives',
        desc: "Assistance complète pour toutes vos formalités : création d'entreprise, immatriculation, licences et démarches officielles auprès des autorités.",
        features: ["Création d'entreprise", "RCCM & NIF", "Licences & autorisations", "Formalités douanières"],
      },
      {
        icon: Printer,
        label: 'Conceptions & Impressions',
        desc: "Conception graphique professionnelle et impression de haute qualité pour tous vos supports de communication et de marketing.",
        features: ["Flyers & brochures", "Roll-up & kakémono", "Cartes de visite", "Habillage véhicules"],
      },
      {
        icon: Monitor,
        label: 'Solution IT',
        desc: "Développement de logiciels de gestion sur mesure, création de sites web et accompagnement dans la transformation numérique de votre entreprise.",
        features: ["Logiciels de gestion", "Sites web & e-commerce", "Applications mobiles", "Maintenance & support"],
      },
    ],
  },
];

const TEAM = [
  { initials: 'KQ', name: 'M. KPONTON QUAM-DESSOU BOBO', role: 'Gérant — Directeur Général',        color: ORANGE, desc: "Dirigeant visionnaire avec une expertise en conseil et gestion d'entreprise." },
  { initials: 'KF', name: 'M. KLOUTSE Kodzo Fulbert',    role: 'Responsable Comptabilité',            color: NAVY,   desc: "Expert en comptabilité et fiscalité avec une solide expérience SYSCOHADA." },
  { initials: 'AS', name: 'Mme AGBODJALOU Shalom',       role: 'Responsable Commercial & Marketing',  color: GOLD,   desc: "Spécialiste en développement commercial et stratégies marketing digitales." },
  { initials: 'AL', name: 'M. AKOVI Luc',                role: 'Responsable Ressources Humaines',     color: NAVY,   desc: "Expert RH dédié au développement du capital humain et au bien-être en entreprise." },
];


const FAQ = [
  { q: "Quels types d'entreprises accompagnez-vous ?", a: "Nous accompagnons toutes les structures : TPE, PME, startups, ONG et particuliers. Nos services sont adaptés à chaque profil, que vous soyez en phase de création ou de développement." },
  { q: "Comment se déroule une première consultation ?", a: "La première consultation est un échange gratuit de 30 minutes pour comprendre vos besoins. Nous analysons votre situation et vous proposons un plan d'action personnalisé sans engagement." },
  { q: "Proposez-vous des services de comptabilité en ligne ?", a: "Oui, nous proposons une gestion comptable à distance sécurisée. Vous transmettez vos pièces justificatives via notre plateforme et nous gérons l'ensemble de votre comptabilité." },
  { q: "Quels sont vos délais d'intervention ?", a: "Nos délais varient selon la prestation : déclarations fiscales sous 48h, tenue de comptabilité mensuelle, création d'entreprise en 5 à 10 jours ouvrables selon les délais administratifs." },
  { q: "Intervenez-vous en dehors de Lomé ?", a: "Oui, nous intervenons sur tout le territoire togolais et pouvons assurer des prestations à distance pour les clients en dehors de Lomé ou à l'international." },
];

const PROCESS = [
  { num: '01', icon: Target,    title: 'Analyse des besoins',    desc: "Nous réalisons un diagnostic approfondi de votre situation pour comprendre vos objectifs et contraintes." },
  { num: '02', icon: Lightbulb, title: 'Proposition sur mesure', desc: "Nous élaborons une proposition personnalisée avec un plan d'action clair et un calendrier précis." },
  { num: '03', icon: Zap,       title: 'Mise en oeuvre',         desc: "Notre équipe déploie les solutions retenues avec rigueur, en vous tenant informé à chaque étape." },
  { num: '04', icon: Globe,     title: 'Suivi & Optimisation',   desc: "Nous assurons un suivi régulier et ajustons nos actions pour garantir des résultats durables." },
];

const NAVLINKS = [
  { label: 'Accueil',   href: '#accueil'   },
  { label: 'Services',  href: '#services'  },
  { label: 'À propos',  href: '#apropos'   },
  { label: 'Processus', href: '#processus' },
  { label: 'Équipe',    href: '#equipe'    },
  { label: 'FAQ',       href: '#faq'       },
  { label: 'Contact',   href: '#contact'   },
];

// ── Composants ────────────────────────────────────────────────────────────────

function Avatar({ initials, color, size = 80 }: { initials: string; color: string; size?: number }) {
  return (
    <div className="flex items-center justify-center rounded-full text-white font-black"
         style={{ width: size, height: size, background: color, fontSize: size * 0.3 }}>
      {initials}
    </div>
  );
}

function SunSVG({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 170" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="sg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FAC731" /><stop offset="100%" stopColor="#FF7E00" />
        </linearGradient>
        <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF7E00" stopOpacity="0" />
          <stop offset="30%" stopColor="#FF7E00" /><stop offset="70%" stopColor="#FF7E00" />
          <stop offset="100%" stopColor="#FF7E00" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[[100,90,100,34],[100,90,138,42],[100,90,162,60],[100,90,172,86],
        [100,90,62,42],[100,90,38,60],[100,90,28,86]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FAC731"
              strokeWidth={6-i*0.3} strokeLinecap="round"/>
      ))}
      <path d="M50,90 A50,50 0 0 1 150,90 Z" fill="url(#sg)"/>
      <path d="M22,96 Q100,88 178,96" stroke="url(#hg)" strokeWidth="6" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
          style={{ background: '#FFF3E0', color: ORANGE }}>
      {text}
    </span>
  );
}

function SectionTitle({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: light ? '#fff' : NAVY }}>
      {children}
    </h2>
  );
}

function Divider({ center = true }: { center?: boolean }) {
  return (
    <div className={`h-1 w-16 rounded-full mb-6 ${center ? 'mx-auto' : ''}`}
         style={{ background: `linear-gradient(to right, ${ORANGE}, ${GOLD})` }}/>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [openFaq,     setOpenFaq]     = useState<number | null>(null);
  const [activeCat,   setActiveCat]   = useState(0);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── Bandeau annonce ─────────────────────────────────────────────── */}
      <div className="py-2 px-3 text-center text-xs font-medium text-white"
           style={{ background: `linear-gradient(90deg, ${NAVY}, ${ORANGE}, ${NAVY})` }}>
        <span className="hidden sm:inline">☀ Première consultation gratuite — Contactez-nous dès aujourd&apos;hui !
        &nbsp;·&nbsp;</span>
        <span className="sm:hidden">☀ Consultation gratuite · </span>
        +228 92 68 11 00
        <span className="hidden sm:inline"> &nbsp;·&nbsp; kekeligroup4@gmail.com</span>
      </div>

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="#accueil" className="flex items-center gap-2.5 shrink-0">
            <div className="h-10 w-10"><SunSVG className="h-full w-auto"/></div>
            <div className="leading-tight">
              <span className="block text-sm font-black" style={{ color: NAVY }}>
                KEKELI <span style={{ color: ORANGE }}>Group</span>
              </span>
              <span className="block text-[10px] text-gray-400 font-medium">Conseil & Services</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {NAVLINKS.map(({ label, href }) => (
              <a key={label} href={href}
                 className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-orange-500 rounded-lg hover:bg-orange-50 transition-all">
                {label}
              </a>
            ))}
            <a href="#contact"
               className="ml-3 px-5 py-2 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-shadow"
               style={{ background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})` }}>
              Devis gratuit
            </a>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} style={{ color: NAVY }}/> : <Menu size={22} style={{ color: NAVY }}/>}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t bg-white px-4 py-3 space-y-1">
            {NAVLINKS.map(({ label, href }) => (
              <a key={label} href={href}
                 className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
                 onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a href="#contact"
               className="block mt-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white text-center"
               style={{ background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})` }}
               onClick={() => setMenuOpen(false)}>
              Devis gratuit
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section id="accueil" className="relative overflow-hidden" style={{ background: NAVY, minHeight: '92vh' }}>
        {/* Motif */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="rp" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                {[[60,60,60,8],[60,60,100,22],[60,60,112,60],[60,60,100,98],
                  [60,60,60,112],[60,60,20,98],[60,60,8,60],[60,60,20,22]].map(([x1,y1,x2,y2],i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FAC731" strokeWidth="1.5"/>
                ))}
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rp)"/>
          </svg>
        </div>

        {/* Cercle décoratif */}
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full opacity-10 translate-x-1/3 -translate-y-1/4"
             style={{ background: `radial-gradient(circle, ${ORANGE}, transparent 70%)` }}/>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[92vh] py-16 lg:py-20">

          {/* Texte */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-8"
                 style={{ background: 'rgba(250,199,49,0.12)', color: GOLD, border: `1px solid rgba(250,199,49,0.25)` }}>
              <Sun size={12}/> Fondé en 2023 — Lomé, Togo
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-white leading-[1.1] mb-5 lg:mb-6">
              Nous mettons la{' '}
              <span className="relative">
                <span style={{ color: GOLD }}>lumière</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full opacity-40"
                      style={{ background: GOLD }}/>
              </span>
              <br/>sur vos entreprises
            </h1>

            <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-lg">
              Cabinet de conseil pluridisciplinaire, KEKELI GROUP vous accompagne
              de la création de votre entreprise jusqu&apos;à son développement avec
              des solutions adaptées au marché togolais.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#services"
                 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white shadow-xl"
                 style={{ background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})` }}>
                Découvrir nos services <ArrowRight size={16}/>
              </a>
              <a href="#contact"
                 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold border text-white hover:bg-white/10 transition-colors"
                 style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                Consultation gratuite
              </a>
            </div>

            {/* Indicateurs */}
            <div className="flex flex-wrap gap-6">
              {[
                { v: '11+',    l: 'Services' },
                { v: '100%',   l: 'Satisfaction' },
                { v: '2023',   l: 'Création' },
                { v: 'Lomé',   l: 'Togo' },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <div className="text-2xl font-black" style={{ color: GOLD }}>{v}</div>
                  <div className="text-xs text-white/40 font-medium">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Logo grand + carte */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-8">
            <div className="h-64 w-64 drop-shadow-2xl">
              <SunSVG className="h-full w-auto"/>
            </div>

            {/* Carte info flottante */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border w-80"
                 style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center"
                     style={{ background: `${ORANGE}33` }}>
                  <MapPin size={16} style={{ color: ORANGE }}/>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Siège social</div>
                  <div className="text-xs text-white/50">Attiégou, Lomé — Togo</div>
                </div>
              </div>
              <div className="text-xs text-white/50">Route de TOGO 2000, Attiégou</div>
              <div className="mt-3 pt-3 border-t flex justify-between" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="text-xs">
                  <div className="text-white/40">NIF</div>
                  <div className="text-white/70 font-medium">1001854635</div>
                </div>
                <div className="text-xs text-right">
                  <div className="text-white/40">RCCM</div>
                  <div className="text-white/70 font-medium">TG-LFW-01-2023-B13-01308</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POURQUOI NOUS ───────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Shield,         title: 'Expertise certifiée',    desc: "Professionnels qualifiés, maîtrisant les normes SYSCOHADA et la réglementation togolaise.", color: ORANGE },
              { icon: Clock,          title: 'Réactivité',             desc: "Disponibles 6j/7, nous répondons rapidement à vos demandes et respectons les délais.", color: GOLD },
              { icon: Award,          title: 'Excellence',             desc: "Qualité de service irréprochable avec un suivi personnalisé à chaque étape de votre projet.", color: NAVY },
              { icon: HeartHandshake, title: 'Accompagnement humain',  desc: "Une relation de confiance basée sur l'écoute, le respect et le conseil bienveillant.", color: ORANGE },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex flex-col items-start gap-3 p-5 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all">
                <div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                     style={{ background: `${color}18` }}>
                  <Icon size={20} style={{ color }}/>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: NAVY }}>{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────── */}
      <section id="services" className="py-16 lg:py-24" style={{ background: '#FAFAF9' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-10 lg:mb-12">
            <SectionLabel text="Ce que nous faisons"/>
            <SectionTitle>Nos Services</SectionTitle>
            <Divider/>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Une gamme complète de services conçus pour répondre à tous vos besoins professionnels,
              de la gestion financière à la transformation numérique.
            </p>
          </div>

          {/* Onglets catégories — scrollables sur mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 sm:flex-wrap sm:justify-center scrollbar-hide"
               style={{ scrollbarWidth: 'none' }}>
            {SERVICE_CATEGORIES.map(({ cat }, i) => (
              <button key={cat} onClick={() => setActiveCat(i)}
                      className="px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0"
                      style={activeCat === i
                        ? { background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})`, color: '#fff' }
                        : { background: '#f3f4f6', color: '#374151' }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Cartes services */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_CATEGORIES[activeCat].items.map(({ icon: Icon, label, desc, features }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 overflow-hidden group w-full">
                <div className="p-6">
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                       style={{ background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})` }}>
                    <Icon size={22} className="text-white"/>
                  </div>
                  <h3 className="font-black text-base mb-2" style={{ color: NAVY }}>{label}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
                  <ul className="space-y-2">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle2 size={13} style={{ color: ORANGE }} className="shrink-0"/>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 pb-5">
                  <a href="#contact"
                     className="inline-flex items-center gap-1.5 text-xs font-bold"
                     style={{ color: ORANGE }}>
                    En savoir plus <ChevronRight size={13}/>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNIÈRE CTA ────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-16 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})` }}>
        <div className="absolute inset-0 opacity-10">
          <SunSVG className="absolute right-10 top-1/2 -translate-y-1/2 h-48 w-48"/>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            Prêt à donner de la lumière à votre entreprise ?
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-8">
            Première consultation <strong className="text-white">100% gratuite</strong> et sans engagement.
            Notre équipe est disponible du lundi au vendredi.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
            <a href="tel:+22892681100"
               className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl font-bold bg-white hover:bg-gray-50 transition-colors"
               style={{ color: ORANGE }}>
              <Phone size={18}/> +228 92 68 11 00
            </a>
            <a href="#contact"
               className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl font-bold border-2 border-white/50 text-white hover:bg-white/10 transition-colors">
              <Mail size={18}/> Nous écrire
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESSUS ───────────────────────────────────────────────────── */}
      <section id="processus" className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 lg:mb-16">
            <SectionLabel text="Comment ça marche"/>
            <SectionTitle>Notre processus de travail</SectionTitle>
            <Divider/>
            <p className="text-gray-500 max-w-xl mx-auto">
              Une approche structurée et transparente pour vous garantir des résultats concrets et mesurables.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Ligne connectrice — desktop uniquement */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5"
                 style={{ background: `linear-gradient(to right, ${ORANGE}, ${GOLD})` }}/>

            {PROCESS.map(({ num, icon: Icon, title, desc }, i) => (
              <div key={num} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 h-20 w-20 rounded-full flex flex-col items-center justify-center mb-5 shadow-lg"
                     style={{ background: i % 2 === 0 ? `linear-gradient(135deg, ${ORANGE}, ${GOLD})` : NAVY }}>
                  <Icon size={24} className="text-white mb-0.5"/>
                  <span className="text-[10px] font-black text-white/70">{num}</span>
                </div>
                <h3 className="font-black text-sm mb-2" style={{ color: NAVY }}>{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── À PROPOS ────────────────────────────────────────────────────── */}
      <section id="apropos" className="py-16 lg:py-24" style={{ background: NAVY }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Texte */}
            <div>
              <SectionLabel text="Notre histoire"/>
              <SectionTitle light>
                À propos de{' '}
                <span style={{ color: GOLD }}>KEKELI GROUP</span>
              </SectionTitle>
              <Divider center={false}/>

              <p className="text-white/70 mb-5 leading-relaxed">
                Fondée le <strong className="text-white">25 avril 2023</strong> à Lomé, Togo,
                KEKELI GROUP SARL-U est un cabinet de conseil pluridisciplinaire implanté au
                cœur du quartier d&apos;Attiégou, sur la Route de TOGO 2000.
              </p>
              <p className="text-white/70 mb-5 leading-relaxed">
                Le nom <strong className="text-white">KEKELI</strong>, qui signifie{' '}
                <em className="text-yellow-300">&quot;lumière&quot;</em> en langue Éwé,
                reflète notre engagement à apporter clarté, guidance et solutions innovantes
                à chaque client. Nous croyons fermement que chaque entrepreneur mérite un
                accompagnement de qualité pour réussir.
              </p>
              <p className="text-white/70 mb-8 leading-relaxed">
                Notre équipe pluridisciplinaire combine expertise comptable, fiscale,
                marketing et technologique pour offrir une réponse globale à vos besoins
                professionnels, qu&apos;il s&apos;agisse de création, de croissance ou de transformation.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'NIF',     value: '1001854635' },
                  { label: 'RCCM',    value: 'TG-LFW-01-2023-B13-01308' },
                  { label: 'Forme',   value: 'SARL-U' },
                  { label: 'Depuis',  value: '25 avril 2023' },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="text-xs font-bold mb-0.5" style={{ color: GOLD }}>{label}</div>
                    <div className="text-xs text-white/70">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Valeurs + mission */}
            <div className="space-y-5">
              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                     style={{ background: `${ORANGE}33` }}>
                  <Target size={20} style={{ color: ORANGE }}/>
                </div>
                <h4 className="font-black text-white text-sm mb-2">Notre Mission</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Accompagner les entrepreneurs et entreprises togolaises dans leur développement
                  en leur fournissant des services de conseil de haute qualité, accessibles et adaptés
                  à leurs réalités économiques.
                </p>
              </div>

              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                     style={{ background: `${GOLD}33` }}>
                  <Lightbulb size={20} style={{ color: GOLD }}/>
                </div>
                <h4 className="font-black text-white text-sm mb-2">Notre Vision</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Devenir le cabinet de conseil de référence en Afrique de l&apos;Ouest, reconnu
                  pour son excellence, son innovation et son impact positif sur l&apos;écosystème
                  entrepreneurial togolais.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: 'Lumière', desc: 'Clarté et guidance', color: GOLD },
                  { title: 'Énergie', desc: 'Force et dynamisme',  color: ORANGE },
                  { title: 'Confiance', desc: 'Fiabilité et stabilité', color: ORANGE },
                  { title: 'Excellence', desc: 'Qualité optimale',  color: GOLD },
                ].map(({ title, desc, color }) => (
                  <div key={title} className="rounded-xl p-3 flex items-center gap-3"
                       style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="h-2 w-2 rounded-full shrink-0" style={{ background: color }}/>
                    <div>
                      <div className="text-xs font-bold text-white">{title}</div>
                      <div className="text-[10px] text-white/40">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ÉQUIPE ──────────────────────────────────────────────────────── */}
      <section id="equipe" className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 lg:mb-16">
            <SectionLabel text="Notre équipe"/>
            <SectionTitle>Des experts à votre service</SectionTitle>
            <Divider/>
            <p className="text-gray-500 max-w-xl mx-auto">
              Une équipe pluridisciplinaire passionnée, engagée à vous offrir un accompagnement
              personnalisé et des solutions adaptées à vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map(({ initials, name, role, color, desc }) => (
              <div key={name} className="group rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Bandeau couleur */}
                <div className="h-20 relative" style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <div className="ring-4 ring-white rounded-full group-hover:scale-110 transition-transform">
                      <Avatar initials={initials} color={color} size={72}/>
                    </div>
                  </div>
                </div>

                <div className="pt-12 pb-6 px-5 text-center">
                  <p className="text-sm font-bold mb-3" style={{ color }}>{role}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                  <div className="mt-4 h-0.5 w-10 rounded-full mx-auto" style={{ background: color }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-12 lg:mb-16">
            <SectionLabel text="Questions fréquentes"/>
            <SectionTitle>FAQ</SectionTitle>
            <Divider/>
            <p className="text-gray-500">Tout ce que vous devez savoir avant de nous contacter.</p>
          </div>

          <div className="space-y-3">
            {FAQ.map(({ q, a }, i) => (
              <div key={i} className="border rounded-xl overflow-hidden hover:border-orange-200 transition-colors">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm hover:bg-orange-50 transition-colors"
                  style={{ color: NAVY }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {q}
                  <ChevronDown size={16} className={`shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                               style={{ color: ORANGE }}/>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t">
                    <p className="pt-3">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section id="contact" className="py-16 lg:py-24" style={{ background: '#FAFAF9' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 lg:mb-16">
            <SectionLabel text="Parlons de votre projet"/>
            <SectionTitle>Contactez-nous</SectionTitle>
            <Divider/>
            <p className="text-gray-500 max-w-xl mx-auto">
              Notre équipe est disponible du lundi au vendredi pour répondre à toutes vos questions
              et vous proposer un accompagnement personnalisé.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">

            {/* Infos contact — 2/5 */}
            <div className="lg:col-span-2 space-y-5">
              {[
                { icon: MapPin, label: 'Adresse',   value: 'Route de TOGO 2000, Attiégou\nLomé — Togo' },
                { icon: Phone,  label: 'Téléphone', value: '+228 92 68 11 00' },
                { icon: Mail,   label: 'Email',     value: 'kekeligroup4@gmail.com' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all">
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                       style={{ background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})` }}>
                    <Icon size={18} className="text-white"/>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-0.5">{label}</div>
                    <div className="text-sm font-semibold whitespace-pre-line" style={{ color: NAVY }}>{value}</div>
                  </div>
                </div>
              ))}

              {/* Horaires */}
              <div className="rounded-2xl p-5" style={{ background: NAVY }}>
                <h4 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
                  <Clock size={15} style={{ color: GOLD }}/> Horaires
                </h4>
                {[
                  ['Lundi — Vendredi', '08h00 – 18h00'],
                  ['Samedi — Dimanche', 'Fermé'],
                ].map(([j, h]) => (
                  <div key={j} className="flex justify-between text-xs py-1.5 border-b last:border-0"
                       style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <span className="text-white/50">{j}</span>
                    <span className="font-semibold" style={{ color: h === 'Fermé' ? '#ef4444' : GOLD }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp — 3/5 */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border p-8 flex flex-col justify-center">

              {/* Icône WhatsApp SVG */}
              <div className="flex justify-center mb-6">
                <div className="h-24 w-24 rounded-full flex items-center justify-center shadow-xl"
                     style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" className="h-12 w-12">
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.773L0 32l8.476-2.004A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.77-1.847l-.486-.288-5.03 1.189 1.217-4.895-.315-.502A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.927c-.398-.199-2.355-1.163-2.72-1.295-.366-.133-.631-.199-.898.199-.265.398-1.03 1.295-1.262 1.561-.232.265-.465.298-.863.1-.398-.199-1.681-.619-3.202-1.977-1.183-1.056-1.982-2.361-2.214-2.759-.232-.398-.025-.614.175-.812.179-.178.398-.465.597-.697.199-.232.265-.398.398-.664.133-.265.066-.497-.033-.697-.1-.199-.898-2.163-1.23-2.961-.324-.778-.653-.673-.898-.685l-.765-.013c-.265 0-.697.1-.1063.497-.366.398-1.396 1.363-1.396 3.327s1.43 3.86 1.629 4.126c.199.265 2.815 4.298 6.821 6.028.954.412 1.698.658 2.279.842.957.304 1.829.261 2.517.158.768-.114 2.355-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.099-.166-.365-.265-.764-.465z"/>
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-black text-center mb-2" style={{ color: NAVY }}>
                Écrivez-nous sur WhatsApp
              </h3>
              <p className="text-sm text-gray-400 text-center mb-8 max-w-sm mx-auto leading-relaxed">
                La façon la plus rapide de nous contacter. Nous répondons en quelques minutes
                du <strong className="text-gray-600">lundi au vendredi</strong>, de 8h à 18h.
              </p>

              {/* Bouton principal WhatsApp */}
              <a
                href="https://wa.me/22892681100?text=Bonjour%20KEKELI%20GROUP%2C%20je%20souhaite%20obtenir%20des%20informations%20sur%20vos%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 mb-4"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" className="h-6 w-6">
                  <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.773L0 32l8.476-2.004A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.77-1.847l-.486-.288-5.03 1.189 1.217-4.895-.315-.502A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.927c-.398-.199-2.355-1.163-2.72-1.295-.366-.133-.631-.199-.898.199-.265.398-1.03 1.295-1.262 1.561-.232.265-.465.298-.863.1-.398-.199-1.681-.619-3.202-1.977-1.183-1.056-1.982-2.361-2.214-2.759-.232-.398-.025-.614.175-.812.179-.178.398-.465.597-.697.199-.232.265-.398.398-.664.133-.265.066-.497-.033-.697-.1-.199-.898-2.163-1.23-2.961-.324-.778-.653-.673-.898-.685l-.765-.013c-.265 0-.697.1-.1063.497-.366.398-1.396 1.363-1.396 3.327s1.43 3.86 1.629 4.126c.199.265 2.815 4.298 6.821 6.028.954.412 1.698.658 2.279.842.957.304 1.829.261 2.517.158.768-.114 2.355-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.099-.166-.365-.265-.764-.465z"/>
                </svg>
                Démarrer une conversation
              </a>

              {/* Ou appeler */}
              <a href="tel:+22892681100"
                 className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold border-2 text-sm hover:bg-gray-50 transition-colors"
                 style={{ borderColor: '#E5E7EB', color: NAVY }}>
                <Phone size={16} style={{ color: ORANGE }}/>
                Appeler le +228 92 68 11 00
              </a>

              {/* Ou email */}
              <a href="mailto:kekeligroup4@gmail.com"
                 className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs text-gray-400 hover:text-orange-500 transition-colors mt-2">
                <Mail size={13}/>
                kekeligroup4@gmail.com
              </a>

              {/* Info réponse rapide */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"/>
                Temps de réponse moyen : moins de 30 minutes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer style={{ background: NAVY }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>

            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10"><SunSVG className="h-full w-auto"/></div>
                <div>
                  <span className="block font-black text-white">KEKELI <span style={{ color: GOLD }}>Group</span></span>
                  <span className="text-[10px] text-white/40">Conseil & Services</span>
                </div>
              </div>
              <p className="text-xs text-white/40 leading-relaxed mb-4">
                Nous mettons la lumière sur vos entreprises.
                Votre partenaire de confiance à Lomé, Togo.
              </p>
              <div className="text-xs text-white/30">
                <div>NIF : 1001854635</div>
                <div>RCCM : TG-LFW-01-2023-B13-01308</div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-white text-sm mb-4" style={{ borderBottom: `2px solid ${ORANGE}`, paddingBottom: 8, display: 'inline-block' }}>
                Services
              </h4>
              <div className="space-y-2 mt-2">
                {['Comptabilité', 'Fiscalité', 'Marketing', 'Formations', 'Solution IT', 'Coaching'].map(s => (
                  <a key={s} href="#services"
                     className="block text-xs text-white/40 hover:text-orange-400 transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-bold text-white text-sm mb-4" style={{ borderBottom: `2px solid ${GOLD}`, paddingBottom: 8, display: 'inline-block' }}>
                Navigation
              </h4>
              <div className="space-y-2 mt-2">
                {NAVLINKS.map(({ label, href }) => (
                  <a key={label} href={href}
                     className="block text-xs text-white/40 hover:text-orange-400 transition-colors">
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white text-sm mb-4" style={{ borderBottom: `2px solid ${ORANGE}`, paddingBottom: 8, display: 'inline-block' }}>
                Contact
              </h4>
              <div className="space-y-3 mt-2">
                {[
                  { icon: MapPin, v: 'Route de TOGO 2000, Attiégou\nLomé — Togo' },
                  { icon: Phone,  v: '+228 92 68 11 00' },
                  { icon: Mail,   v: 'kekeligroup4@gmail.com' },
                ].map(({ icon: Icon, v }) => (
                  <div key={v} className="flex gap-2">
                    <Icon size={12} className="shrink-0 mt-0.5" style={{ color: ORANGE }}/>
                    <span className="text-xs text-white/40 whitespace-pre-line">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} KEKELI GROUP SARL-U — Tous droits réservés
            </p>
            <p className="text-xs text-white/25">
              Attiégou, Route de TOGO 2000 — Lomé, Togo
            </p>
          </div>
        </div>
        <div className="h-1" style={{ background: `linear-gradient(to right, ${ORANGE}, ${GOLD})` }}/>
      </footer>

      {/* ── Bouton WhatsApp flottant ─────────────────────────────────────── */}
      <a
        href="https://wa.me/22892681100?text=Bonjour%20KEKELI%20GROUP%2C%20je%20souhaite%20obtenir%20des%20informations%20sur%20vos%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" className="h-7 w-7">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.773L0 32l8.476-2.004A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.77-1.847l-.486-.288-5.03 1.189 1.217-4.895-.315-.502A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.927c-.398-.199-2.355-1.163-2.72-1.295-.366-.133-.631-.199-.898.199-.265.398-1.03 1.295-1.262 1.561-.232.265-.465.298-.863.1-.398-.199-1.681-.619-3.202-1.977-1.183-1.056-1.982-2.361-2.214-2.759-.232-.398-.025-.614.175-.812.179-.178.398-.465.597-.697.199-.232.265-.398.398-.664.133-.265.066-.497-.033-.697-.1-.199-.898-2.163-1.23-2.961-.324-.778-.653-.673-.898-.685l-.765-.013c-.265 0-.697.1-.1063.497-.366.398-1.396 1.363-1.396 3.327s1.43 3.86 1.629 4.126c.199.265 2.815 4.298 6.821 6.028.954.412 1.698.658 2.279.842.957.304 1.829.261 2.517.158.768-.114 2.355-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.099-.166-.365-.265-.764-.465z"/>
        </svg>
        <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 animate-ping"/>
        <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500"/>
      </a>

    </div>
  );
}
