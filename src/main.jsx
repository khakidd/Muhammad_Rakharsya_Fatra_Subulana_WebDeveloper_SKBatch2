import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, Asterisk, CircleDollarSign, Clock, GitMerge, HandFist, Heart, Target, TrendingUp } from "lucide-react";
import DotGrid from "./components/DotGrid";
import "../styles.css";

const positions = [
  {
    title: "Product Designer",
    type: "Full-time",
    workMode: "Hybrid",
    division: "Design",
    team: "Product & Design",
    status: "Baru",
    summary: "Rancang pengalaman digital yang terasa sederhana, hangat, dan benar-benar membantu.",
    responsibilities: ["Merancang pengalaman end-to-end dari riset hingga prototipe.", "Berkolaborasi erat dengan product manager dan engineer.", "Mengembangkan sistem desain yang konsisten dan mudah dipakai."],
    qualifications: ["Punya portofolio yang menunjukkan proses berpikirmu.", "Terbiasa menggunakan Figma dan membuat prototipe.", "Penasaran pada kebutuhan pengguna dan senang menerima masukan."]
  },
  {
    title: "Frontend Engineer",
    type: "Full-time",
    workMode: "Hybrid",
    division: "Engineering",
    team: "Engineering",
    status: "2 posisi",
    summary: "Bangun antarmuka cepat dan inklusif yang dipakai ribuan orang setiap hari.",
    responsibilities: ["Mengembangkan fitur web yang responsif dan mudah diakses.", "Menjaga kualitas kode melalui review dan automated testing.", "Bekerja bersama desain dan backend sejak awal solusi."],
    qualifications: ["Berpengalaman dengan JavaScript atau TypeScript modern.", "Memahami HTML semantik, CSS, dan prinsip aksesibilitas.", "Senang memecahkan masalah bersama tim lintas fungsi."]
  },
  {
    title: "Product Manager",
    type: "Full-time",
    workMode: "Hybrid",
    division: "Product",
    team: "Product",
    status: "Baru",
    summary: "Hubungkan kebutuhan pengguna dan tujuan bisnis lewat produk yang berdampak.",
    responsibilities: ["Menyusun prioritas roadmap berdasarkan data dan masukan pengguna.", "Menyelaraskan tim untuk merilis solusi yang tepat.", "Mengukur dampak fitur dan belajar dari hasilnya."],
    qualifications: ["Pernah terlibat dalam pengembangan produk digital.", "Nyaman mengambil keputusan dengan data yang belum sempurna.", "Komunikatif dan mampu menyatukan banyak sudut pandang."]
  },
  {
    title: "People & Culture Intern",
    type: "Magang",
    workMode: "Hybrid",
    division: "People",
    team: "People & Culture",
    status: "Baru",
    summary: "Bantu menciptakan pengalaman kerja yang suportif sejak hari pertama.",
    responsibilities: ["Mendukung proses rekrutmen dan pengalaman kandidat.", "Membantu menyiapkan program onboarding dan kegiatan tim.", "Mengelola informasi people dengan rapi dan penuh perhatian."],
    qualifications: ["Mahasiswa tingkat akhir atau lulusan baru.", "Teliti, hangat, dan nyaman berkomunikasi dengan banyak orang.", "Tertarik pada budaya kerja dan pengalaman karyawan."]
  },
  {
    title: "Content Strategist",
    type: "Full-time",
    workMode: "Hybrid",
    division: "Marketing",
    team: "Brand & Marketing",
    status: "Segera ditutup",
    summary: "Temukan cerita dan kata-kata yang membuat produk kami lebih dekat dengan orang.",
    responsibilities: ["Menyusun strategi konten untuk berbagai kanal digital.", "Menulis dan menyunting konten dengan suara brand yang konsisten.", "Berkolaborasi dengan tim kreatif dan product marketing."],
    qualifications: ["Punya pengalaman menulis konten digital atau editorial.", "Mampu menyesuaikan nada bicara dengan audiens.", "Penasaran, terstruktur, dan nyaman mengolah masukan."]
  },
  {
    title: "Backend Engineer",
    type: "Full-time",
    workMode: "Remote",
    division: "Engineering",
    team: "Engineering",
    status: "",
    summary: "Rancang layanan andal yang menjadi fondasi pengalaman produk kami.",
    responsibilities: ["Membangun dan memelihara API serta layanan backend.", "Menjaga performa, keamanan, dan keandalan sistem.", "Mendokumentasikan keputusan teknis dan berbagi pengetahuan."],
    qualifications: ["Berpengalaman membangun layanan backend production.", "Memahami API, basis data relasional, dan pengujian.", "Mengutamakan solusi sederhana dan sistem yang mudah dirawat."]
  },
  {
    title: "Data Analyst Intern",
    type: "Magang",
    workMode: "Hybrid",
    division: "Product",
    team: "Data & Insights",
    status: "",
    summary: "Ubah pertanyaan sehari-hari menjadi insight yang membantu tim bergerak.",
    responsibilities: ["Membantu menyiapkan dashboard dan analisis produk.", "Mengeksplorasi data untuk menemukan pola perilaku pengguna.", "Menyampaikan insight dengan cerita dan visual yang jelas."],
    qualifications: ["Mahasiswa atau lulusan baru dari bidang kuantitatif.", "Punya dasar SQL dan spreadsheet; Python jadi nilai tambah.", "Suka bertanya dan menjelaskan temuan dengan sederhana."]
  },
  {
    title: "Visual Design Intern",
    type: "Magang",
    workMode: "Hybrid",
    division: "Design",
    team: "Brand & Design",
    status: "",
    summary: "Bantu menghadirkan visual yang ekspresif dan konsisten di setiap titik temu.",
    responsibilities: ["Membuat aset visual untuk kampanye dan kanal digital.", "Menjaga konsistensi sistem visual brand.", "Mengeksplorasi konsep kreatif bersama tim desain."],
    qualifications: ["Punya portofolio desain visual atau ilustrasi.", "Terbiasa dengan Figma atau Adobe Creative Suite.", "Terbuka pada eksperimen dan senang berkolaborasi."]
  }
];

const filters = ["Semua", "Full-time", "Magang", "Product", "Design", "Engineering", "Marketing"];
const faqItems = [
  {
    question: "Apakah fresh graduate boleh melamar?",
    answer: <>Tentu! Kami percaya potensi dan rasa ingin tahu sama pentingnya dengan pengalaman. Lihat kualifikasi tiap posisi untuk tahu mana yang paling cocok.</>
  },
  {
    question: "Bagaimana skema kerja di RuangKarir?",
    answer: <>Kami bekerja secara hybrid dari Jakarta. Tim biasanya berkumpul di kantor beberapa hari setiap minggu, dengan fleksibilitas yang disepakati bersama tim.</>
  },
  {
    question: "Berapa lama proses seleksinya?",
    answer: <>Biasanya sekitar 14 hari kerja dari lamaran masuk hingga keputusan. Kami akan memberi kabar di setiap tahap, termasuk jika proses membutuhkan waktu lebih lama.</>
  },
  {
    question: "Apa saya akan mendapat kabar setelah melamar?",
    answer: <>Ya. Tim rekrutmen akan mengirim konfirmasi setelah lamaran diterima dan menghubungimu melalui email untuk pembaruan selanjutnya.</>
  },
  {
    question: "Apakah ada biaya untuk mengikuti seleksi?",
    answer: <>Tidak pernah. Seluruh proses rekrutmen RuangKarir gratis. Kami tidak meminta pembayaran atau informasi rekening dalam bentuk apa pun.</>
  },
  {
    question: "Bagaimana data pribadi saya digunakan?",
    answer: <>Data yang kamu kirim hanya digunakan untuk proses rekrutmen dan disimpan dengan aman. Kamu dapat meminta penghapusan data dengan menghubungi <a href="mailto:privasi@ruangkarir.id">privasi@ruangkarir.id</a>.</>
  }
];

const applicationEmail = "karier@ruangkarir.id";

function trackEvent(event, detail = {}) {
  window.dispatchEvent(new CustomEvent("recruitment:analytics", {
    detail: {
      event,
      source: new URLSearchParams(window.location.search).get("utm_source"),
      ...detail
    }
  }));
}

function applicationUrl(position) {
  const subject = position ? `Lamaran - ${position}` : "Lamaran RuangKarir";
  return `mailto:${applicationEmail}?subject=${encodeURIComponent(subject)}`;
}

function useScrollReveal(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      element.classList.add("is-revealed");
      return undefined;
    }

    element.style.setProperty("--reveal-delay", `${delay}ms`);
    element.classList.add("scroll-reveal");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.classList.add("is-revealed");
      observer.unobserve(element);
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

function ScrollReveal({ as: Element = "div", className = "", delay = 0, children, ...props }) {
  const ref = useScrollReveal(delay);
  return <Element ref={ref} className={className} {...props}>{children}</Element>;
}

function AnimatedArrow() {
  return (
    <span className="button__icon-wrapper" aria-hidden="true">
      <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width="10">
        <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
      </svg>
      <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy" width="10">
        <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
      </svg>
    </span>
  );
}

function RoleCard({ position, onOpen, delay }) {
  const cardRef = useScrollReveal(delay);
  return (
    <article
      ref={cardRef}
      className="role-card scroll-reveal"
      style={{ "--reveal-delay": `${delay}ms` }}
      onClick={(event) => {
        if (!event.target.closest("button, a")) {
          trackEvent("role_card_click", { position: position.title });
          onOpen(position);
        }
      }}
    >
      <div className="role-card-top">
        <div className="role-tags">
          {[position.type, position.workMode].map((label) => <span className="role-tag" key={label}>{label}</span>)}
        </div>
        {position.status && <span className="role-status">{position.status}</span>}
      </div>
      <h3>{position.title}</h3>
      <p className="role-team">{position.team} · Jakarta</p>
      <p className="role-summary">{position.summary}</p>
      <div className="role-card-footer">
        <button
          className="role-details"
          type="button"
          aria-label={`Lihat detail posisi ${position.title}`}
          onClick={() => onOpen(position)}
        >
          Lihat detail
          <svg className="role-details-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
        <a
          className="button button-yellow role-apply"
          href={applicationUrl(position.title)}
          aria-label={`Lamar posisi ${position.title}`}
          onClick={() => trackEvent("apply_click", { position: position.title })}
        >
          Lamar <ArrowUpRight className="apply-arrow" size="1em" strokeWidth={2.2} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function RoleDialog({ position, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (position && dialog && !dialog.open) dialog.showModal();
  }, [position]);

  return (
    <dialog
      ref={dialogRef}
      className="role-dialog"
      aria-labelledby="dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      {position && (
        <div className="dialog-inner">
          <button className="dialog-close" type="button" aria-label="Tutup detail posisi" onClick={() => dialogRef.current.close()}>×</button>
          <p className="eyebrow">{position.team.toUpperCase()} · POSISI TERBUKA</p>
          <h2 id="dialog-title">{position.title}</h2>
          <div className="dialog-meta">
            {[position.type, position.workMode, "Jakarta"].map((item) => <span key={item}>{item}</span>)}
          </div>
          <p className="dialog-summary">{position.summary}</p>
          <div className="dialog-content-grid">
            <div>
              <h3>Tanggung jawab</h3>
              <ul>{position.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>Kualifikasi</h3>
              <ul>{position.qualifications.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
          <a
            className="button button-yellow dialog-apply"
            href={applicationUrl(position.title)}
            onClick={() => trackEvent("apply_click", { position: position.title, source: "role_detail" })}
          >
            Lamar posisi ini <ArrowUpRight className="apply-arrow" size="1em" strokeWidth={2.2} aria-hidden="true" />
          </a>
          <p className="dialog-note">Proses rekrutmen kami gratis. Kami tidak pernah meminta pembayaran.</p>
        </div>
      )}
    </dialog>
  );
}

function App() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selectedRole, setSelectedRole] = useState(null);
  const [openFaq, setOpenFaq] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileApplyVisible, setMobileApplyVisible] = useState(false);
  const [stats, setStats] = useState([0, 0, 0, 0]);
  const statsRef = useRef(null);
  const heroRef = useRef(null);

  const visibleRoles = positions.filter((position) => (
    activeFilter === "Semua" || position.type === activeFilter || position.division === activeFilter
  ));

  useEffect(() => {
    document.documentElement.classList.add("has-scroll-reveal");
    trackEvent("page_view", { page: window.location.pathname });
    return () => document.documentElement.classList.remove("has-scroll-reveal");
  }, []);

  useEffect(() => {
    const target = statsRef.current;
    if (!target) return undefined;
    const endValues = [120, 8, 14, 94];
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setStats(endValues);
        return;
      }

      const start = performance.now();
      const duration = 900;
      const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setStats(endValues.map((value) => Math.round(value * eased)));
        if (progress < 1) frame = requestAnimationFrame(update);
      };
      frame = requestAnimationFrame(update);
    }, { threshold: 0.3 });
    observer.observe(target);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const target = heroRef.current;
    if (!target) return undefined;
    const updateVisibility = () => {
      setMobileApplyVisible(window.innerWidth <= 700 && target.getBoundingClientRect().bottom < 0);
    };
    const observer = new IntersectionObserver(([entry]) => {
      setMobileApplyVisible(window.innerWidth <= 700 && !entry.isIntersecting);
    }, { threshold: 0 });
    observer.observe(target);
    window.addEventListener("resize", updateVisibility);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!selectedRole) return undefined;
    trackEvent("role_detail_open", { position: selectedRole.title });
    return undefined;
  }, [selectedRole]);

  const selectFilter = (filter) => {
    setActiveFilter(filter);
    trackEvent("role_filter", { filter });
  };

  const closeMenu = () => setMenuOpen(false);

  const schema = positions.map((position) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: position.title,
    description: `${position.summary} Tanggung jawab: ${position.responsibilities.join(" ")} Kualifikasi: ${position.qualifications.join(" ")}`,
    datePosted: new Date().toISOString().slice(0, 10),
    employmentType: position.type === "Magang" ? "INTERN" : "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "RuangRaya",
      sameAs: window.location.origin
    },
    jobLocationType: position.workMode === "Remote" ? "TELECOMMUTE" : undefined,
    jobLocation: position.workMode === "Remote" ? undefined : {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jakarta",
        addressCountry: "ID"
      }
    },
    directApply: true
  }));

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <a className="skip-link" href="#main">Langsung ke konten</a>

      <header className="site-header">
        <nav className="nav container" aria-label="Navigasi utama">
          <a className="brand" href="#top" aria-label="RuangRaya — beranda" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
            <span>Ruang<span className="brand-light">Karir</span></span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Tutup menu" : "Buka menu"}</span>
            <span /><span />
          </button>
          <div className={`nav-links${menuOpen ? " is-open" : ""}`} id="nav-links">
            <div className="nav-menu">
              <a href="#posisi" onClick={closeMenu}>Posisi</a>
              <a href="#budaya" onClick={closeMenu}>Budaya</a>
              <a href="#alur" onClick={closeMenu}>Alur seleksi</a>
              <a href="#faq" onClick={closeMenu}>FAQ</a>
            </div>
            <a className="button button-dark nav-cta" href="#posisi" data-track="nav_apply" onClick={() => { trackEvent("cta_click", { placement: "nav_apply" }); closeMenu(); }}>
              <span className="nav-cta-label">Lamar sekarang</span>
              <span className="nav-cta-icon" aria-hidden="true">
                <svg viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" />
                </svg>
              </span>
            </a>
          </div>
        </nav>
      </header>

      <main id="main">
        <section className="hero section-pad" id="top" aria-labelledby="hero-title" ref={heroRef}>
          <DotGrid
            className="hero-dot-grid"
            baseColor="#e4d8c2"
            activeColor="#f5b52e"
            dotSize={5}
            gap={18}
            proximity={145}
            strength={0.8}
            tension={0.2}
            glow={0.5}
            opacity={0.5}
          />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> TEMPAT KERJA YANG BERTUMBUH BERSAMA</p>
              <h1 id="hero-title">Kerja yang berarti.<br/><span>Tumbuh bersama.</span></h1>
              <p className="hero-lede">Jelajahi peluang karir di ekosistem kerja fleksibel, berdampak nyata, dan didukung teknologi masa depan. Wujudkan karya terbaikmu bersama talenta global di garda terdepan industri software.</p>
              <div className="hero-actions">
                <a className="button button-yellow button-arrow" href="#posisi" data-track="hero_roles" onClick={() => trackEvent("cta_click", { placement: "hero_roles" })}>Lihat posisi terbuka <AnimatedArrow /></a>
                <a className="button button-outline" href="#budaya" data-track="hero_culture" onClick={() => trackEvent("cta_click", { placement: "hero_culture" })}>Kenali budaya kami</a>
              </div>
              <div className="hero-proof">
                <div className="avatar-stack" aria-hidden="true">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=75" alt="" />
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=75" alt="" />
                  <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=80&h=80&q=75" alt="" />
                  <span>+</span>
                </div>
                <p><strong>Tempat terbaik untuk jadi diri sendiri.</strong><br />Kata 120+ teman RuangKarir.</p>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo-wrap">
                <img
                  className="hero-photo"
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85"
                  alt="Tim RuangRaya berdiskusi dan bekerja bersama di ruang kerja yang terang"
                  fetchPriority="high"
                  width="1100"
                  height="1250"
                />
                <div className="photo-caption"><span className="caption-icon" aria-hidden="true"><Asterisk size={22} strokeWidth={2} /></span><span>Ide bagus tumbuh<br />dari ruang yang nyaman.</span></div>
              </div>
              <div className="floating-note"><span className="note-icon" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={2} /></span><span><strong>120+</strong><small>orang, satu tujuan</small></span></div>
              <span className="hero-sparkle sparkle-one" aria-hidden="true"><Asterisk size={32} strokeWidth={2} /></span>
              <span className="hero-sparkle sparkle-two" aria-hidden="true"><Asterisk size={32} strokeWidth={2} /></span>
            </div>
          </div>
          <div className="container stats-row" aria-label="RuangRaya dalam angka" ref={statsRef}>
            <div className="stat"><strong>{stats[0]}+</strong><span>teman bertumbuh</span></div>
            <div className="stat"><strong>{stats[1]}</strong><span>posisi terbuka</span></div>
            <div className="stat"><strong>{stats[2]} hari</strong><span>rata-rata proses seleksi</span></div>
            <div className="stat"><strong>{stats[3]}%</strong><span>merasa didukung</span></div>
          </div>
        </section>

        <div className="ticker" aria-label="Nilai kerja RuangRaya">
          <div className="ticker-track">
            <div className="ticker-group" aria-hidden="true">
              <span>Berkarya dengan empati</span><i><Asterisk size={16} strokeWidth={2} /></i><span>Berani mencoba</span><i><Asterisk size={16} strokeWidth={2} /></i><span>Tumbuh bersama</span><i><Asterisk size={16} strokeWidth={2} /></i><span>Kerja yang berdampak</span><i><Asterisk size={16} strokeWidth={2} /></i><span>Berkarya dengan empati</span><i><Asterisk size={16} strokeWidth={2} /></i><span>Berani mencoba</span><i><Asterisk size={16} strokeWidth={2} /></i><span>Tumbuh bersama</span><i><Asterisk size={16} strokeWidth={2} /></i><span>Kerja yang berdampak</span><i><Asterisk size={16} strokeWidth={2} /></i>
            </div>
            <div className="ticker-group" aria-hidden="true">
              <span>Berkarya dengan empati</span><i><Asterisk size={16} strokeWidth={2} /></i><span>Berani mencoba</span><i><Asterisk size={16} strokeWidth={2} /></i><span>Tumbuh bersama</span><i><Asterisk size={16} strokeWidth={2} /></i><span>Kerja yang berdampak</span><i><Asterisk size={16} strokeWidth={2} /></i><span>Berkarya dengan empati</span><i><Asterisk size={16} strokeWidth={2} /></i><span>Berani mencoba</span><i><Asterisk size={16} strokeWidth={2} /></i><span>Tumbuh bersama</span><i><Asterisk size={16} strokeWidth={2} /></i><span>Kerja yang berdampak</span><i><Asterisk size={16} strokeWidth={2} /></i>
            </div>
          </div>
        </div>

        <section className="roles-section section-pad" id="posisi" aria-labelledby="roles-title">
          <div className="container">
            <ScrollReveal as="div" className="section-heading roles-heading">
              <div>
                <p className="eyebrow">RUANG UNTUK BERKARYA</p>
                <h2 id="roles-title">Peran berikutnya<br />bisa jadi <span>milikmu.</span></h2>
              </div>
              <p className="section-intro">Pilih tantangan yang bikin kamu semangat bangun pagi. Kami nggak sabar kenalan!</p>
            </ScrollReveal>
            <div className="role-toolbar">
              <div className="filter-list" role="group" aria-label="Filter posisi berdasarkan tipe atau divisi">
                {filters.map((filter) => (
                  <button
                    className={`filter-chip${activeFilter === filter ? " is-active" : ""}`}
                    type="button"
                    data-filter={filter}
                    aria-pressed={activeFilter === filter}
                    key={filter}
                    onClick={() => selectFilter(filter)}
                  >
                    {filter}{filter === "Semua" && <span>08</span>}
                  </button>
                ))}
              </div>
              <p className="role-count" aria-live="polite">{visibleRoles.length} posisi tersedia</p>
            </div>
            <div className="role-grid">
              {visibleRoles.map((position, index) => (
                <RoleCard key={position.title} position={position} onOpen={setSelectedRole} delay={index * 70} />
              ))}
            </div>
            {visibleRoles.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon" aria-hidden="true">✳</span>
                <h3>Belum ada posisi di sini</h3>
                <p>Tapi kami selalu tertarik kenalan dengan orang hebat. Kirim profilmu ke tim kami.</p>
                <a className="button button-outline" href="mailto:karier@ruangraya.id?subject=Talent%20pool%20RuangRaya">Gabung talent pool <span aria-hidden="true">↗</span></a>
              </div>
            )}
            <p className="roles-footnote"><span aria-hidden="true"></span> Belum menemukan yang pas? <a href="mailto:karier@ruangraya.id?subject=Talent%20pool%20RuangRaya">Kenalan dulu dengan tim kami</a></p>
          </div>
        </section>

        <section className="culture-section section-pad" id="budaya" aria-labelledby="culture-title">
          <div className="container">
            <ScrollReveal as="div" className="section-heading culture-heading">
              <div>
                <p className="eyebrow">VALUE // KULTUR KERJA</p>
                <h2 id="culture-title">Kenapa Bergabung <br/><span>Bersama Kami?</span></h2>
              </div>
              <p className="section-intro">Kami percaya hasil terbaik datang saat orang-orang merasa aman untuk bertanya, mencoba, dan jadi dirinya sendiri.</p>
            </ScrollReveal>
            <div className="culture-layout">
              <div className="culture-values">
                <ScrollReveal as="article" className="value-card">
                  <span className="value-icon icon-yellow" aria-hidden="true"><HandFist size={20} strokeWidth={2} /></span>
                  <div><h3>Berani mencoba</h3><p>Eksperimen kecil hari ini bisa jadi terobosan besar besok.</p></div>
                  <span className="value-number">01</span>
                </ScrollReveal>
                <ScrollReveal as="article" className="value-card" delay={70}>
                  <span className="value-icon icon-lilac" aria-hidden="true"><TrendingUp size={20} strokeWidth={2} /></span>
                  <div><h3>Tumbuh bareng</h3><p>Belajar bukan bonus. Itu bagian dari pekerjaan kita.</p></div>
                  <span className="value-number">02</span>
                </ScrollReveal>
                <ScrollReveal as="article" className="value-card" delay={140}>
                  <span className="value-icon icon-green" aria-hidden="true"><Heart size={20} strokeWidth={2} /></span>
                  <div><h3>Utamakan manusia</h3><p>Kita mendengarkan dengan empati, lalu bergerak bersama.</p></div>
                  <span className="value-number">03</span>
                </ScrollReveal>
                <ScrollReveal as="article" className="value-card" delay={210}>
                  <span className="value-icon icon-peach" aria-hidden="true"><Target size={20} strokeWidth={2} /></span>
                  <div><h3>Fokus pada dampak</h3><p>Yang penting bukan seberapa sibuk, tapi apa yang berubah.</p></div>
                  <span className="value-number">04</span>
                </ScrollReveal>
              </div>
              <div className="culture-gallery" aria-label="Suasana kerja di RuangRaya">
                <ScrollReveal as="figure" className="gallery-main">
                  <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80" alt="Ruang kerja bersama yang hangat dan dipenuhi cahaya alami" loading="lazy" width="1000" height="1200" />
                  <figcaption>Ruang untuk ide-ide baru.</figcaption>
                </ScrollReveal>
                <ScrollReveal as="figure" className="gallery-side" delay={80}>
                  <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=700&q=80" alt="Teman-teman RuangRaya menikmati makan siang bersama" loading="lazy" width="700" height="620" />
                  <figcaption>Selalu ada waktu untuk jeda.</figcaption>
                </ScrollReveal>
                <ScrollReveal as="div" className="gallery-note" delay={160}>
                  <span aria-hidden="true">“</span><p>Di sini, pendapatmu selalu punya ruang.</p><small>— Naya, Product Designer</small>
                </ScrollReveal>
              </div>
            </div>
            <ScrollReveal as="div" className="benefits">
              <span className="benefits-label">YANG KAMU DAPATKAN</span>
              <div className="benefit-item"><span aria-hidden="true"><Clock size={16} strokeWidth={2} /></span> Jam kerja fleksibel</div>
              <div className="benefit-item"><span aria-hidden="true"><CircleDollarSign size={16} strokeWidth={2} /></span> Dana belajar tahunan</div>
              <div className="benefit-item"><span aria-hidden="true"><Heart size={16} strokeWidth={2} /></span> Asuransi kesehatan</div>
              <div className="benefit-item"><span aria-hidden="true"><GitMerge size={16} strokeWidth={2} /></span> Hybrid-friendly</div>
            </ScrollReveal>
          </div>
        </section>

        <section className="process-section section-pad" id="alur" aria-labelledby="process-title">
          <div className="container">
            <ScrollReveal as="div" className="process-top">
              <div>
                <p className="eyebrow">PIPELINE // TAHAPAN SELEKSI</p>
                <h2 id="process-title">Alur Rekrutmen<br/><span>Transparan</span></h2>
              </div>
              <p className="section-intro">Nggak pakai teka-teki. Kamu akan tahu apa yang diharapkan di setiap tahap dan bisa bertanya kapan saja.</p>
            </ScrollReveal>
            <ol className="timeline">
              <ScrollReveal as="li" className="timeline-item"><span className="timeline-number">01</span><div><h3>Kirim lamaran</h3><p>Ceritakan sedikit tentang dirimu dan hal yang ingin kamu bangun.</p><span className="timeline-time">5 menit</span></div></ScrollReveal>
              <ScrollReveal as="li" className="timeline-item" delay={70}><span className="timeline-number">02</span><div><h3>Kenalan dengan HR</h3><p>Obrolan santai untuk saling mengenal dan menyamakan ekspektasi.</p><span className="timeline-time">2–3 hari</span></div></ScrollReveal>
              <ScrollReveal as="li" className="timeline-item" delay={140}><span className="timeline-number">03</span><div><h3>Asah kemampuan</h3><p>Tantangan relevan dengan pekerjaan, bukan sekadar tes.</p><span className="timeline-time">3–5 hari</span></div></ScrollReveal>
              <ScrollReveal as="li" className="timeline-item" delay={210}><span className="timeline-number">04</span><div><h3>Temui tim</h3><p>Diskusi bareng calon teman satu tim. Tanya apa pun, ya!</p><span className="timeline-time">2–3 hari</span></div></ScrollReveal>
              <ScrollReveal as="li" className="timeline-item" delay={280}><span className="timeline-number">05</span><div><h3>Mulai cerita baru</h3><p>Kami kirim penawaran lengkap dan bersiap menyambutmu.</p><span className="timeline-time">2–3 hari</span></div></ScrollReveal>
            </ol>
            <ScrollReveal as="div" className="process-bottom">
              <p><span className="process-average-icon" aria-hidden="true"><Asterisk size={20} strokeWidth={2} /></span> Rata-rata selesai dalam <strong>14 hari kerja</strong></p>
              <a className="button button-yellow button-arrow" href="#posisi" data-track="process_apply" onClick={() => trackEvent("cta_click", { placement: "process_apply" })}>Mulai melamar <AnimatedArrow /></a>
            </ScrollReveal>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <ScrollReveal as="div" className="faq-intro">
              <p className="eyebrow">INQUIRIES // FAQ</p>
              <h2 id="faq-title">Pertanyaan yang Sering <span>Diajukan</span></h2>
              <p>Masih penasaran? Tim kami dengan senang hati bantu menjawab.</p>
              <a className="text-link footer-icon-link" href="mailto:karier@ruangraya.id">
                Tanya tim rekrutmen <ArrowUpRight className="footer-link-icon" size="1em" strokeWidth={2} aria-hidden="true" />
              </a>
            </ScrollReveal>
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <ScrollReveal as="article" className="faq-item" key={item.question} delay={index * 45}>
                  <h3>
                    <button
                      className="faq-question"
                      type="button"
                      aria-expanded={openFaq === index}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => {
                        const nextOpenFaq = openFaq === index ? -1 : index;
                        setOpenFaq(nextOpenFaq);
                        if (nextOpenFaq !== -1) trackEvent("faq_open", { question: item.question });
                      }}
                    >
                      <span>{item.question}</span><span className="faq-plus" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    className={`faq-answer${openFaq === index ? " is-open" : ""}`}
                    id={`faq-answer-${index}`}
                    aria-hidden={openFaq !== index}
                    inert={openFaq !== index}
                  >
                    <div className="faq-answer-inner"><p>{item.answer}</p></div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-cta" aria-labelledby="closing-title">
          <ScrollReveal as="div" className="container closing-inner">
            <span className="closing-star" aria-hidden="true"><Asterisk size={48} strokeWidth={2} /></span>
            <div><p className="eyebrow">CERITA BERIKUTNYA DIMULAI DI SINI</p><h2 id="closing-title">Ada ruang untuk <span>kamu.</span></h2></div>
            <a className="button button-dark button-arrow" href="#posisi" data-track="closing_apply" onClick={() => trackEvent("cta_click", { placement: "closing_apply" })}>Temukan peranmu <AnimatedArrow /></a>
          </ScrollReveal>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <ScrollReveal as="div" className="footer-brand">
            <a className="brand brand-footer" href="#top" aria-label="RuangKarir — kembali ke atas">
              <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
              <span>Ruang<span className="brand-light">Karir</span></span>
            </a>
            <p>Kita bikin hal baik,<br />bersama-sama.</p>
            <a className="footer-email footer-icon-link" href="mailto:karier@ruangkarir.id">
              karier@ruangkarir.id <ArrowUpRight className="footer-link-icon" size="1em" strokeWidth={2} aria-hidden="true" />
            </a>
          </ScrollReveal>
          <ScrollReveal as="div" className="footer-column" delay={70}>
            <h2>Jelajahi</h2><a href="#posisi">Posisi terbuka</a><a href="#budaya">Budaya kami</a><a href="#alur">Alur seleksi</a><a href="#faq">Pertanyaan umum</a>
          </ScrollReveal>
          <ScrollReveal as="div" className="footer-column" delay={140}>
            <h2>Ikuti cerita kami</h2><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true"></span></a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true"></span></a><a href="mailto:privasi@ruangkarir.id">Kebijakan privasi</a>
          </ScrollReveal>
          <ScrollReveal as="div" className="footer-note" delay={210}>
            <span aria-hidden="true"><Asterisk size={22} strokeWidth={2} /></span><p>Karier yang baik bukan cuma tentang ke mana kamu pergi, tapi juga siapa yang menemanimu.</p>
          </ScrollReveal>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} RuangKarir. All rights reserved.</span><a href="#top">Kembali ke atas ↑</a></div>
      </footer>

      <a
        className={`mobile-apply${mobileApplyVisible ? " is-visible" : ""}`}
        href="#posisi"
        data-track="mobile_sticky_apply"
        onClick={() => trackEvent("cta_click", { placement: "mobile_sticky_apply" })}
      >
        Lihat posisi terbuka <AnimatedArrow />
      </a>

      <RoleDialog position={selectedRole} onClose={() => setSelectedRole(null)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
