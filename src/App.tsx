import { useEffect, useRef, useState } from "react";
import type { BrowserQRCodeReader, IScannerControls } from "@zxing/browser";
import { AdminPages, LoginPage, OwnerNewRegistration, OwnerOnboardingVilla, OwnerPackageAuth, OwnerPages, OwnerRegistration, OwnerSelectVilla, PackageConfirmation, PackageRequestPending, PublicInfoPage, PublicReportPage, PublicReportSuccess, type Page, type UserReport, UserPages } from "./prototype";
type IconName =
  | "search"
  | "pin"
  | "users"
  | "check"
  | "shield"
  | "arrow"
  | "phone"
  | "mail"
  | "clock"
  | "qr"
  | "chart"
  | "home"
  | "wifi"
  | "pool"
  | "car"
  | "kitchen"
  | "bed"
  | "info"
  | "camera"
  | "upload"
  | "facebook"
  | "instagram"
  | "message"
  | "menu"
  | "close";

const photos = [
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=88",
  "https://images.unsplash.com/photo-1514803400321-3ca29fc47334?auto=format&fit=crop&w=1200&q=86",
  "https://images.unsplash.com/photo-1555426104-3a03a4e70b1d?auto=format&fit=crop&w=1200&q=86",
  "https://images.unsplash.com/photo-1756115377696-0bdbf1c21a02?auto=format&fit=crop&w=1200&q=86",
];

const villas = [
  { name: "Sea Sky Pool Villa", province: "ชลบุรี", guests: "12 คน", status: "ตรวจสอบข้อมูลแล้ว", updated: "18 มิ.ย. 2568", image: photos[0] },
  { name: "Khao Yai Forest Pool", province: "นครราชสีมา", guests: "10 คน", status: "ตรวจสอบข้อมูลแล้ว", updated: "16 มิ.ย. 2568", image: photos[1] },
  { name: "Hua Hin Blue House", province: "ประจวบคีรีขันธ์", guests: "8 คน", status: "ตรวจสอบข้อมูลแล้ว", updated: "12 มิ.ย. 2568", image: photos[2] },
  { name: "Phuket Ocean Residence", province: "ภูเก็ต", guests: "14 คน", status: "รอตรวจสอบ", updated: "08 มิ.ย. 2568", image: photos[3] },
  { name: "Chiang Mai Garden Villa", province: "เชียงใหม่", guests: "8 คน", status: "ตรวจสอบข้อมูลแล้ว", updated: "06 มิ.ย. 2568", image: photos[1] },
  { name: "Krabi Cliff Pool Villa", province: "กระบี่", guests: "10 คน", status: "ตรวจสอบข้อมูลแล้ว", updated: "04 มิ.ย. 2568", image: photos[2] },
  { name: "Samui Sunset Residence", province: "สุราษฎร์ธานี", guests: "12 คน", status: "รอตรวจสอบ", updated: "02 มิ.ย. 2568", image: photos[0] },
];

const provinces = ["ชลบุรี", "ประจวบคีรีขันธ์", "นครราชสีมา", "ภูเก็ต", "เชียงใหม่", "กระบี่", "สุราษฎร์ธานี"];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.3 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 7L2 7" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    qr: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h3v3h-3zM18 18h3v3h-3zM18 13h3M13 20h3" /></>,
    chart: <><path d="M4 19V9M10 19V4M16 19v-7M22 19H2" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
    wifi: <><path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" /><circle cx="12" cy="20" r="1" /></>,
    pool: <><path d="M2 15c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2M2 20c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2M7 15V5a3 3 0 0 1 6 0M7 10h6" /></>,
    car: <><path d="M5 17h14l1-5-2-5H6l-2 5 1 5Z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
    kitchen: <><path d="M6 3v8M3 3v5a3 3 0 0 0 6 0V3M6 11v10M16 3v18M16 3c4 2 5 8 0 10" /></>,
    bed: <><path d="M3 20v-8h18v8M3 16h18M7 12V8h5a4 4 0 0 1 4 4" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></>,
    camera: <><path d="M14.5 5 13 3h-2L9.5 5H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4.5Z" /><circle cx="12" cy="12.5" r="4" /></>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" /></>,
    facebook: <path d="M14 8h4V3h-4a6 6 0 0 0-6 6v3H4v5h4v5h5v-5h4l1-5h-5V9a1 1 0 0 1 1-1Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" /></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.7-5A7 7 0 0 1 3 12V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z" /><path d="M8 10h8M8 14h5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Logo({ light = false }: { light?: boolean }) {
  return <div className={`logo ${light ? "logo-light" : ""}`}><span className="logo-mark"><Icon name="shield" size={24} /></span><span>Villa<span>Check</span></span></div>;
}

function Badge({ pending = false, children = "ตรวจสอบข้อมูลแล้ว" }: { pending?: boolean; children?: React.ReactNode }) {
  return <span className={`badge ${pending ? "badge-pending" : ""}`}><span className="badge-icon"><Icon name={pending ? "clock" : "check"} size={12} /></span>{children}</span>;
}

function Header({ page, go }: { page: Page; go: (page: Page) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = (next: Page) => { setMobileMenuOpen(false); go(next); };
  return <header className="v3-nav-shell">
    <div className="v3-nav container">
      <button className="v3-brand" onClick={() => navigate("home")}><Logo /></button>
      <nav className={mobileMenuOpen ? "open" : ""}>
        <button onClick={() => navigate("directory")}>Explore</button>
        <button onClick={() => navigate("scan")}>Check QR</button>
        <button onClick={() => navigate("pricing")}>For owners</button>
        <button onClick={() => navigate("villa-report")}>Report</button>
      </nav>
      <div className="v3-nav-actions">
        <button className="v3-login" onClick={() => navigate("login")}>เข้าสู่ระบบ</button>
        <button className="v3-scan-cta" onClick={() => navigate("scan")}><Icon name="qr" size={17}/> ตรวจสอบก่อนโอน</button>
        <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(v => !v)} aria-label="เมนู"><Icon name={mobileMenuOpen ? "close" : "menu"}/></button>
      </div>
    </div>
  </header>;
}

function VillaCard({ villa, onClick }: { villa: typeof villas[0]; onClick: () => void }) {
  return <article className="villa-card" onClick={onClick}>
    <div className="card-image"><img src={villa.image} alt={`ภาพ ${villa.name}`} /><Badge pending={villa.status !== "ตรวจสอบข้อมูลแล้ว"}>{villa.status}</Badge></div>
    <div className="card-body">
      <h3>{villa.name}</h3>
      <div className="villa-meta"><span><Icon name="pin" size={17} />{villa.province}</span><span><Icon name="users" size={17} />สูงสุด {villa.guests}</span></div>
      <div className="card-foot"><span><Icon name="clock" size={15} />อัปเดตล่าสุด {villa.updated}</span><button aria-label={`ดู ${villa.name}`} onClick={event => { event.stopPropagation(); onClick(); }}><Icon name="arrow" size={18} /></button></div>
    </div>
  </article>;
}

function SearchBox({ onSearch }: { onSearch: (query: string, province: string) => void }) {
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("");
  return <div className="search-box">
    <label><span>ชื่อวิลล่าหรือที่พัก</span><div><Icon name="search" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="ค้นหาชื่อวิลล่า..." /></div></label>
    <label><span>จังหวัด</span><div><Icon name="pin" /><select value={province} onChange={event => setProvince(event.target.value)}><option value="">ทุกจังหวัด</option>{provinces.map(item => <option key={item}>{item}</option>)}</select></div></label>
    <button className="primary-button" onClick={() => onSearch(query, province)}><Icon name="search" size={18} />ค้นหา</button>
  </div>;
}

function ShowcaseCard({ villa, featured = false, onClick }: { villa: typeof villas[0]; featured?: boolean; onClick: () => void }) {
  return <article className={`showcase-card ${featured ? "featured" : ""}`} onClick={onClick}>
    <img src={villa.image} alt={`ภาพ ${villa.name}`} />
    <div className="showcase-overlay" />
    <div className="showcase-status"><Icon name={villa.status === "ตรวจสอบข้อมูลแล้ว" ? "shield" : "clock"} size={14} />{villa.status === "ตรวจสอบข้อมูลแล้ว" ? "VillaCheck VERIFIED" : "Pending Review"}</div>
    <div className="showcase-copy"><span><Icon name="pin" size={14} />{villa.province}</span><h3>{villa.name}</h3><div><small>Last checked</small><strong>{villa.updated}</strong><button aria-label={`ดู Trust Profile ของ ${villa.name}`} onClick={event => { event.stopPropagation(); onClick(); }}><Icon name="arrow" size={18} /></button></div></div>
  </article>;
}

function VillaShowcase({ go }: { go: (p: Page) => void }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const items = villas.slice(0, 4);
  const scrollToSlide = (index: number) => {
    const next = Math.max(0, Math.min(items.length - 1, index));
    const element = trackRef.current?.children[next] as HTMLElement | undefined;
    element?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActive(next);
  };
  const updateActive = () => {
    const track = trackRef.current;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    const nearest = children.reduce((best, child, index) => Math.abs(child.offsetLeft - track.scrollLeft) < Math.abs(children[best].offsetLeft - track.scrollLeft) ? index : best, 0);
    setActive(nearest);
  };
  return <div className="showcase-carousel">
    <div className="showcase-track" ref={trackRef} onScroll={updateActive}>{items.map((villa, index) => <ShowcaseCard key={villa.name} villa={villa} featured={index === 0} onClick={() => go("detail")} />)}</div>
    <div className="carousel-controls"><button aria-label="Villa ก่อนหน้า" onClick={() => scrollToSlide(active - 1)} disabled={active === 0}>←</button><div className="carousel-dots">{items.map((villa, index) => <button key={villa.name} aria-label={`ไป Villa ภาพที่ ${index + 1}`} className={active === index ? "active" : ""} onClick={() => scrollToSlide(index)} />)}</div><span>{active + 1}/{items.length}</span><button aria-label="Villa ถัดไป" onClick={() => scrollToSlide(active + 1)} disabled={active === items.length - 1}>→</button></div>
  </div>;
}

function Home({ go, onSearch }: { go: (p: Page) => void; onSearch: (query: string, province: string) => void }) {
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("");
  return <>
    <section className="v3-home-hero">
      <img className="v3-hero-image" src={photos[0]} alt="พูลวิลล่าริมสระ" />
      <div className="v3-hero-scrim" />
      <div className="container v3-hero-inner">
        <div className="v3-hero-copy">
          <span className="v3-overline">VILLACHECK / TRUST LAYER</span>
          <h1>เลือกที่พักจาก<br/><em>หลักฐาน</em> ไม่ใช่แค่ภาพ</h1>
          <p>ค้นหา Villa แล้วดูข้อมูลที่ลงทะเบียน ช่องทางติดต่อ บัญชีรับเงิน และสถานะ QR ก่อนตัดสินใจโอน</p>
        </div>
        <div className="v3-search-dock">
          <label><span>ค้นหาที่พัก</span><div><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') onSearch(query,province)}} placeholder="Sea Sky Pool Villa"/></div></label>
          <label><span>จุดหมาย</span><div><Icon name="pin"/><select value={province} onChange={e=>setProvince(e.target.value)}><option value="">ทุกจังหวัด</option>{provinces.map(p=><option key={p}>{p}</option>)}</select></div></label>
          <button onClick={()=>onSearch(query,province)}>ค้นหา <Icon name="arrow" size={18}/></button>
        </div>
        <div className="v3-trust-stamp"><Icon name="shield" size={26}/><div><small>VERIFICATION STATUS</small><strong>ข้อมูลสำคัญต้องตรวจสอบย้อนกลับได้</strong></div></div>
      </div>
    </section>

    <section className="v3-intro-band">
      <div className="container v3-intro-grid">
        <div><span>01</span><strong>ค้นหา</strong><p>ชื่อ Villa หรือจังหวัด</p></div>
        <div><span>02</span><strong>เทียบข้อมูล</strong><p>ตัวตน ช่องทาง บัญชี</p></div>
        <div><span>03</span><strong>สแกน QR</strong><p>ดูสถานะล่าสุด</p></div>
        <button onClick={()=>go('scan')}>เริ่มตรวจสอบ <Icon name="arrow"/></button>
      </div>
    </section>

    <section className="v3-destination-section">
      <div className="container v3-destination-layout">
        <div className="v3-map-panel">
          <div className="v3-map-label"><span>DESTINATION TRUST MAP</span><strong>Thailand / Demo data</strong></div>
          {[["เชียงใหม่","18%","18%"],["เขาใหญ่","48%","38%"],["ชลบุรี","72%","62%"],["หัวหิน","52%","78%"],["ภูเก็ต","28%","88%"]].map(([name,x,y])=><button key={name} style={{left:x,top:y}} className="v3-map-dot" onClick={()=>onSearch('', name==='เขาใหญ่'?'นครราชสีมา':name==='หัวหิน'?'ประจวบคีรีขันธ์':name)}><i/><span>{name}</span></button>)}
        </div>
        <div className="v3-destination-copy">
          <span className="v3-overline dark">EXPLORE WITH CONTEXT</span>
          <h2>เริ่มจากจังหวัด<br/>แล้วดูเฉพาะที่พักที่มีข้อมูล</h2>
          <p>Version 3 ใช้ “Destination Explorer” เป็นแกนหลัก แทนการ์ดเรียงแบบ Marketplace ทั่วไป</p>
          <div className="v3-province-list">{provinces.slice(0,6).map((p,i)=><button key={p} onClick={()=>onSearch('',p)}><span>0{i+1}</span>{p}<Icon name="arrow" size={16}/></button>)}</div>
        </div>
      </div>
    </section>

    <section className="v3-featured-section">
      <div className="container">
        <div className="v3-section-heading"><div><span className="v3-overline dark">SELECTED PROPERTIES</span><h2>ที่พักที่มี Trust Profile</h2></div><button onClick={()=>go('directory')}>ดูทั้งหมด <Icon name="arrow" size={17}/></button></div>
        <div className="v3-featured-row">{villas.slice(0,4).map((villa,i)=><article key={villa.name} className={i===0?'lead':''} onClick={()=>go('detail')}><img src={villa.image} alt={villa.name}/><div className="v3-card-shade"/><div className="v3-card-meta"><Badge pending={villa.status!=="ตรวจสอบข้อมูลแล้ว"}>{villa.status}</Badge><h3>{villa.name}</h3><p><Icon name="pin" size={15}/>{villa.province} · สูงสุด {villa.guests}</p></div></article>)}</div>
      </div>
    </section>

    <section className="v3-qr-story">
      <div className="container v3-qr-story-grid">
        <div><span className="v3-overline">CHECK BEFORE TRANSFER</span><h2>QR ไม่ได้บอกว่า “ปลอดภัย 100%”<br/>แต่บอกว่าอะไรถูกตรวจแล้ว</h2><p>เปิดผลตรวจสอบแบบชัดเจน: Official contact, masked payment account, last checked และสถานะปัจจุบัน</p><button onClick={()=>go('scan')}>เปิด QR Scanner <Icon name="arrow"/></button></div>
        <div className="v3-verification-ticket"><div className="v3-ticket-top"><Logo/><span>VC-TH-2025-01842</span></div><div className="v3-ticket-body"><div className="mini-qr"><QrPattern/></div><div><small>PROPERTY</small><strong>Sea Sky Pool Villa</strong><Badge>VillaCheck VERIFIED</Badge></div></div><div className="v3-ticket-foot"><span>Last checked<br/><strong>18 Jun 2025</strong></span><span>Registered account<br/><strong>XXX-X-X4289-X</strong></span></div></div>
      </div>
    </section>

    <section className="v3-owner-cta">
      <div className="container"><div><span className="v3-overline dark">FOR PROPERTY OWNERS</span><h2>ทำให้ลูกค้าเห็นหลักฐาน<br/>ก่อนที่จะถามว่า “เชื่อได้ไหม?”</h2></div><button onClick={()=>go('pricing')}>ดูแพ็กเกจเจ้าของที่พัก <Icon name="arrow"/></button></div>
    </section>
  </>;
}

function Directory({ go, initialQuery = "", initialProvince = "" }: { go: (p: Page) => void; initialQuery?: string; initialProvince?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [province, setProvince] = useState(initialProvince);
  const [status, setStatus] = useState("");
  const [guests, setGuests] = useState("");
  const filtered = villas.filter(v=>v.name.toLowerCase().includes(query.toLowerCase())).filter(v=>!province||v.province===province).filter(v=>!status||v.status===status).filter(v=>!guests||(guests==='1–8 คน'?parseInt(v.guests)<=8:parseInt(v.guests)>=9));
  const reset=()=>{setQuery('');setProvince('');setStatus('');setGuests('')};
  return <main className="v3-directory">
    <section className="container v3-directory-head"><span className="v3-overline dark">VILLA DIRECTORY</span><h1>ค้นหาแบบเห็นบริบทพื้นที่</h1><p>รายชื่อด้านซ้าย · Location context ด้านขวา</p></section>
    <section className="container v3-filter-bar">
      <label><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ค้นหาชื่อ Villa"/></label>
      <select value={province} onChange={e=>setProvince(e.target.value)}><option value="">ทุกจังหวัด</option>{provinces.map(p=><option key={p}>{p}</option>)}</select>
      <select value={guests} onChange={e=>setGuests(e.target.value)}><option value="">จำนวนผู้พัก</option><option>1–8 คน</option><option>9–14 คน</option></select>
      <select value={status} onChange={e=>setStatus(e.target.value)}><option value="">ทุกสถานะ</option><option>ตรวจสอบข้อมูลแล้ว</option><option>รอตรวจสอบ</option></select>
      <button onClick={reset}>Clear</button>
    </section>
    <section className="container v3-directory-split">
      <div className="v3-result-list">
        <div className="v3-result-count"><strong>{filtered.length}</strong><span>properties</span></div>
        {filtered.length ? filtered.map((v,i)=><button key={v.name} className="v3-result-item" onClick={()=>go('detail')}><img src={v.image} alt={v.name}/><div><Badge pending={v.status!=="ตรวจสอบข้อมูลแล้ว"}>{v.status}</Badge><h3>{v.name}</h3><p><Icon name="pin" size={14}/>{v.province} · {v.guests}</p><small>อัปเดต {v.updated}</small></div><span className="v3-result-index">{String(i+1).padStart(2,'0')}</span></button>) : <div className="empty-results"><strong>ไม่พบ Villa ที่ตรงกับตัวกรอง</strong><p>ลองล้างคำค้นหาหรือเปลี่ยนจังหวัด</p><button onClick={reset}>ล้างตัวกรอง</button></div>}
      </div>
      <div className="v3-map-sticky"><div className="v3-map-grid"/><span className="v3-map-coord">13.7563° N / 100.5018° E</span>{filtered.slice(0,5).map((v,i)=><button key={v.name} style={{left:`${18+(i*16)%68}%`,top:`${22+(i*13)%62}%`}} onClick={()=>go('detail')} className="v3-map-pin"><i>{i+1}</i><span>{v.name}</span></button>)}</div>
    </section>
  </main>;
}

function TrustRow({ label, children, icon }: { label: string; children: React.ReactNode; icon: IconName }) {
  return <div className="trust-info-row"><span><Icon name={icon} /></span><div><small>{label}</small><strong>{children}</strong></div></div>;
}

function QrPattern() {
  return <div className="qr-pattern" aria-label="ตัวอย่างคิวอาร์โค้ด">
    {Array.from({ length: 81 }, (_, i) => <i key={i} className={([0,1,2,9,11,15,17,18,19,20,23,25,27,28,31,32,35,37,39,40,41,43,44,47,49,52,54,55,57,59,61,63,64,67,69,71,72,73,75,77,79,80].includes(i)) ? "on" : ""} />)}
  </div>;
}

function VillaGallery() {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStart = useRef(0);
  const show = (index: number) => setActive((index + photos.length) % photos.length);
  const onTouchStart = (event: React.TouchEvent) => { touchStart.current = event.touches[0].clientX; };
  const onTouchEnd = (event: React.TouchEvent) => {
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 45) show(active + (distance < 0 ? 1 : -1));
  };
  useEffect(() => {
    if (!lightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") show(active - 1);
      if (event.key === "ArrowRight") show(active + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, lightboxOpen]);

  return <>
    <div className="container gallery gallery-interactive">
      <div className="gallery-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <button className="gallery-image-button" aria-label="เปิดภาพขนาดใหญ่" onClick={() => setLightboxOpen(true)}><img src={photos[active]} alt={`Sea Sky Pool Villa ภาพที่ ${active + 1}`} /></button>
        <button className="gallery-nav previous" aria-label="ภาพก่อนหน้า" onClick={() => show(active - 1)}>←</button><button className="gallery-nav next" aria-label="ภาพถัดไป" onClick={() => show(active + 1)}>→</button>
        <span className="gallery-count">{active + 1}/{photos.length}</span>
        <div className="gallery-dots">{photos.map((photo, index) => <button key={photo} aria-label={`ไปภาพที่ ${index + 1}`} className={active === index ? "active" : ""} onClick={() => show(index)} />)}</div>
      </div>
      <div className="gallery-thumbnails">{photos.slice(0, 2).map((photo, index) => <button key={photo} className={active === index ? "active" : ""} onClick={() => show(index)}><img src={photo} alt={`ภาพตัวอย่างที่ ${index + 1}`} /></button>)}<button className="gallery-all" onClick={() => setLightboxOpen(true)}><img src={photos[2]} alt="เปิดแกลเลอรีทั้งหมด" /><span>ดูทั้งหมด<br />{photos.length} รูป</span></button></div>
    </div>
    {lightboxOpen && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="แกลเลอรี Sea Sky Pool Villa" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <button className="lightbox-close" aria-label="ปิดแกลเลอรี" onClick={() => setLightboxOpen(false)}><Icon name="close" /></button>
      <button className="lightbox-nav previous" aria-label="ภาพก่อนหน้า" onClick={() => show(active - 1)}>←</button>
      <img src={photos[active]} alt={`Sea Sky Pool Villa ภาพขนาดใหญ่ที่ ${active + 1}`} />
      <button className="lightbox-nav next" aria-label="ภาพถัดไป" onClick={() => show(active + 1)}>→</button>
      <div className="lightbox-footer"><span>{active + 1}/{photos.length}</span><div>{photos.map((photo, index) => <button key={photo} aria-label={`ไปภาพที่ ${index + 1}`} className={active === index ? "active" : ""} onClick={() => show(index)} />)}</div></div>
    </div>}
  </>;
}

function Detail({ go }: { go: (p: Page) => void }) {
  return <main className="v3-detail">
    <section className="v3-detail-hero"><VillaGallery/><div className="container v3-detail-title"><div><span className="v3-overline">PROPERTY TRUST PROFILE</span><h1>Sea Sky Pool Villa</h1><p><Icon name="pin" size={17}/>บางแสน, ชลบุรี · สูงสุด 12 คน</p></div><div className="v3-score"><small>TRUST SCORE</small><strong>98</strong><span>/100</span></div></div></section>
    <section className="container v3-detail-layout">
      <div className="v3-detail-content">
        <div className="v3-proof-timeline">
          {[['Identity','ตรวจสอบข้อมูลเจ้าของแล้ว','18 มิ.ย. 2568'],['Official contact','ช่องทางติดต่อสอดคล้องกับข้อมูลที่ลงทะเบียน','18 มิ.ย. 2568'],['Payment account','แสดงเฉพาะบัญชีแบบ Masked','18 มิ.ย. 2568'],['QR status','QR Reference ยัง Active','วันนี้']].map((x,i)=><div key={x[0]}><span>{String(i+1).padStart(2,'0')}</span><i/><div><small>{x[0]}</small><strong>{x[1]}</strong><p>{x[2]}</p></div></div>)}
        </div>
        <section><h2>ข้อมูลที่พัก</h2><p>พูลวิลล่าส่วนตัวบรรยากาศสงบ ใกล้หาดบางแสน พร้อมพื้นที่ส่วนกลางสำหรับครอบครัวและกลุ่มเพื่อน ข้อมูลในหน้านี้เป็นข้อมูลสาธิตสำหรับ Prototype</p></section>
        <section><h2>สิ่งอำนวยความสะดวก</h2><div className="amenities">{[["pool","สระว่ายน้ำ"],["bed","4 ห้องนอน"],["wifi","Wi-Fi"],["kitchen","ห้องครัว"],["car","ที่จอดรถ"],["home","พื้นที่ปิ้งย่าง"]].map(a=><span key={a[1]}><Icon name={a[0] as IconName}/>{a[1]}</span>)}</div></section>
      </div>
      <aside className="v3-trust-ledger">
        <span className="v3-overline dark">TRUST LEDGER</span><h3>สิ่งที่ตรวจสอบแล้ว</h3>
        <TrustRow label="สถานะ" icon="shield">VillaCheck VERIFIED</TrustRow><TrustRow label="Official Contact" icon="phone">08X-XXX-4289</TrustRow><TrustRow label="Registered Account" icon="users">XXX-X-X4289-X</TrustRow><TrustRow label="QR Reference" icon="qr">VC-TH-2025-01842</TrustRow>
        <button onClick={()=>go('scan')}>สแกน QR เพื่อตรวจสอบ <Icon name="arrow"/></button><button className="secondary" onClick={()=>go('villa-report')}>แจ้งข้อมูลผิดปกติ</button>
        <p className="v3-ledger-note">VillaCheck แสดงข้อมูลที่ตรวจสอบแล้วเพื่อประกอบการตัดสินใจ ไม่ใช่การรับประกันธุรกรรม</p>
      </aside>
    </section>
  </main>;
}

function ScanQr({ go, onVerified }: { go: (p: Page) => void; onVerified: (reference: string) => void }) {
  const [scanState, setScanState] = useState<"idle" | "requesting" | "scanning" | "loading" | "success" | "permission-error" | "not-found" | "error">("idle");
  const [manualEntry, setManualEntry] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [scannedReference, setScannedReference] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const readerRef = useRef<BrowserQRCodeReader | null>(null);
  const cameraActive = scanState === "requesting" || scanState === "scanning";
  const busy = scanState === "requesting" || scanState === "loading" || scanState === "success";

  const stopCamera = () => {
    controlsRef.current?.stop();
    controlsRef.current = null;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  const getQrReader = async () => {
    if (!readerRef.current) {
      const { BrowserQRCodeReader: QrReader } = await import("@zxing/browser");
      readerRef.current = new QrReader();
    }
    return readerRef.current;
  };

  const completeScan = (reference: string, controls?: IScannerControls) => {
    controls?.stop();
    stopCamera();
    setScannedReference(reference || "VC-TH-2025-01842");
    setErrorMessage("");
    setScanState("success");
  };

  const startCamera = async () => {
    stopCamera();
    setErrorMessage("");
    setScanState("requesting");
    if (!navigator.mediaDevices?.getUserMedia) {
      setErrorMessage("Browser นี้ไม่รองรับการเปิดกล้อง กรุณาอัปโหลดรูป QR แทน");
      setScanState("error");
      return;
    }
    try {
      const reader = await getQrReader();
      const controls = await reader.decodeFromConstraints(
        { audio: false, video: { facingMode: { ideal: "environment" } } },
        videoRef.current ?? undefined,
        (result, _error, activeControls) => {
          if (result) completeScan(result.getText(), activeControls);
        },
      );
      controlsRef.current = controls;
      setScanState("scanning");
      timeoutRef.current = window.setTimeout(() => {
        stopCamera();
        setErrorMessage("ไม่พบ QR Code กรุณาลองใหม่");
        setScanState("not-found");
      }, 15000);
    } catch (error) {
      const cameraError = error as DOMException;
      const permissionDenied = cameraError.name === "NotAllowedError" || cameraError.name === "PermissionDeniedError";
      setErrorMessage(permissionDenied ? "ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาต Camera permission แล้วลองอีกครั้ง" : "เปิดกล้องไม่สำเร็จ กรุณาตรวจสอบว่ากล้องไม่ได้ถูกใช้งานโดยแอปอื่น");
      setScanState(permissionDenied ? "permission-error" : "error");
    }
  };

  const uploadQr = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    stopCamera();
    setErrorMessage("");
    setScanState("loading");
    const imageUrl = URL.createObjectURL(file);
    try {
      const reader = await getQrReader();
      const result = await reader.decodeFromImageUrl(imageUrl);
      completeScan(result.getText());
    } catch {
      setErrorMessage("ไม่พบ QR Code กรุณาลองใหม่");
      setScanState("not-found");
    } finally {
      URL.revokeObjectURL(imageUrl);
      event.target.value = "";
    }
  };

  const submitManualCode = () => {
    const value = manualCode.trim();
    if (!value) {
      setErrorMessage("กรุณากรอกรหัส QR Reference");
      setScanState("error");
      return;
    }
    setScanState("loading");
    window.setTimeout(() => completeScan(value), 450);
  };

  const simulateScan = () => {
    stopCamera();
    setScanState("loading");
    window.setTimeout(() => completeScan("VC-TH-2025-01842"), 700);
  };

  useEffect(() => {
    if (scanState === "success") {
      const resultTimer = window.setTimeout(() => onVerified(scannedReference), 700);
      return () => window.clearTimeout(resultTimer);
    }
  }, [onVerified, scanState, scannedReference]);

  useEffect(() => () => stopCamera(), []);

  return <main className="scan-page">
    <div className="verify-top"><div className="container"><Logo light /><button onClick={() => { stopCamera(); go("home"); }}><Icon name="close" />ปิดหน้าสแกน</button></div></div>
    <div className="scan-bg">
      <div className="scan-intro">
        <span className="kicker light-kicker">SCAN QR CODE</span>
        <h1>สแกน QR เพื่อตรวจสอบที่พัก</h1>
        <p>สแกน QR ของ VillaCheck เพื่อดูข้อมูลการตรวจสอบก่อนตัดสินใจโอน</p>
      </div>
      <div className="scanner-card">
        <div className={`camera-scanner ${cameraActive ? "camera-active" : ""} ${busy ? "is-scanning" : ""} ${scanState === "success" ? "scan-success" : ""} ${errorMessage ? "scan-error" : ""}`}>
          <video ref={videoRef} className={cameraActive ? "camera-preview active" : "camera-preview"} muted playsInline />
          <div className="scanner-overlay">
            <div className="qr-frame"><span /><span /><span /><span />{!cameraActive && <Icon name={scanState === "loading" ? "search" : scanState === "success" ? "check" : "qr"} size={54} />}</div>
            <strong>{scanState === "requesting" ? "กำลังขอสิทธิ์เข้าถึงกล้อง..." : scanState === "scanning" ? "กำลังสแกน QR Code" : scanState === "loading" ? "กำลังตรวจสอบ QR Code..." : scanState === "success" ? "Scan Success" : errorMessage ? "ไม่สามารถอ่าน QR Code" : "Camera Scanner"}</strong>
            <p>{scanState === "success" ? "พบข้อมูล VillaCheck VERIFIED" : errorMessage || "วาง QR Code ให้อยู่ในกรอบ"}</p>
            {(scanState === "scanning" || scanState === "loading") && <span className="scan-line" />}
          </div>
        </div>
        {errorMessage && <div className="scanner-error"><Icon name="info" size={18} /><span>{errorMessage}</span><button onClick={startCamera}>ลองอีกครั้ง</button></div>}
        <div className="scanner-actions">
          <button className="primary-button" onClick={startCamera} disabled={busy}><Icon name="camera" size={18} />{cameraActive ? "กำลังเปิดกล้อง" : "เปิดกล้อง"}</button>
          <label className="outline-button upload-button"><Icon name="upload" size={18} />อัปโหลดรูป QR<input type="file" accept="image/*" onChange={uploadQr} disabled={busy} /></label>
          <button className="outline-button" onClick={() => setManualEntry(value => !value)} disabled={busy}><Icon name="qr" size={18} />กรอกรหัส QR แทน</button>
        </div>
        {manualEntry && <div className="manual-code"><label><span>QR Reference</span><input value={manualCode} onChange={event => setManualCode(event.target.value)} placeholder="เช่น VC-TH-2025-01842" /></label><button className="primary-button" onClick={submitManualCode} disabled={busy}>ตรวจสอบรหัส</button></div>}
        <div className="prototype-scan">
          <span>สำหรับ Prototype</span>
          <button className="sun-button" onClick={simulateScan} disabled={busy}>{scanState === "loading" ? "กำลังสแกน..." : scanState === "success" ? "สแกนสำเร็จ" : "จำลองการสแกน QR"}</button>
        </div>
      </div>
      <p className="scan-security"><Icon name="shield" size={15} />VillaCheck ไม่มีบริการรับจองหรือรับชำระเงิน</p>
    </div>
  </main>;
}

function Verify({ go, reference }: { go: (p: Page) => void; reference: string }) {
  const [status, setStatus] = useState<"verified" | "pending" | "expired">("verified");
  const meta = status === "verified"
    ? { label: "VillaCheck VERIFIED", title: "Verified Property", date: "18 กันยายน 2568" }
    : status === "pending"
      ? { label: "PENDING", title: "อยู่ระหว่างการตรวจสอบ", date: "—" }
      : { label: "EXPIRED", title: "สถานะหมดอายุ", date: "18 มิถุนายน 2568" };
  return <main className="verify-page">
    <div className="verify-top"><div className="container"><Logo light /><button onClick={() => go("home")}><Icon name="close" />ปิดหน้าตรวจสอบ</button></div></div>
    <div className="verify-bg">
      <div className="verify-intro"><span className="kicker light-kicker">QR VERIFICATION</span><h1>ผลการตรวจสอบที่พัก</h1><p>ข้อมูลจากระบบ VillaCheck ณ วันที่ 20 มิถุนายน 2568 เวลา 14:42 น.</p></div>
      <div className={`verification-card ${status}`}>
        <div className="verify-status">
          <span className="status-shield"><Icon name={status === "verified" ? "shield" : "clock"} size={40} /></span>
          <div className="verify-label">{meta.label}</div><h2>{meta.title}</h2>
          <p>{status === "verified" ? "ตรวจสอบข้อมูลที่พักและเจ้าของแล้วโดย VillaCheck" : "โปรดติดต่อที่พักและตรวจสอบข้อมูลเพิ่มเติมก่อนโอน"}</p>
        </div>
        <div className="verify-body">
          <div className="verified-villa"><img src={photos[0]} alt="Sea Sky Pool Villa" /><div><small>ชื่อที่พัก</small><h3>Sea Sky Pool Villa</h3><p><Icon name="pin" size={16} />บางแสน, ชลบุรี</p></div></div>
          <div className="verify-details">
            <TrustRow label="QR Reference" icon="qr">{reference}</TrustRow>
            <TrustRow label="Verification Status" icon="shield">ตรวจสอบข้อมูลแล้ว</TrustRow>
            <TrustRow label="Official Contact" icon="phone">08X-XXX-4289 · @seaskypoolvilla</TrustRow>
            <TrustRow label="บัญชีรับเงินแบบ Masked" icon="users">กสิกรไทย · XXX-X-X4289-X</TrustRow>
          </div>
          <div className="date-grid"><div><span>Last Checked</span><strong>18 มิถุนายน 2568</strong></div><div><span>Expire Date</span><strong>{meta.date}</strong></div></div>
          <div className="warning-note"><Icon name="info" /><p><strong>ก่อนโอนเงินทุกครั้ง</strong> ตรวจสอบชื่อบัญชีให้ตรงกับข้อมูลด้านบน VillaCheck ไม่มีบริการรับจองหรือรับชำระเงิน</p></div>
          <button className="outline-button full" onClick={() => go("detail")}>ดู Trust Profile <Icon name="arrow" size={18} /></button>
          <button className="text-button report-result-link" onClick={() => go("villa-report")}><Icon name="info" size={16} />พบข้อมูลผิดปกติ? แจ้งปัญหา</button>
        </div>
      </div>
      <div className="prototype-switch"><span>Prototype:</span>{(["verified","pending","expired"] as const).map(s => <button key={s} onClick={() => setStatus(s)} className={status === s ? "active" : ""}>{s}</button>)}</div>
    </div>
  </main>;
}

const plans = [
  { name: "Basic Trust QR", price: "ฟรี", unit: "90 วัน", desc: "เริ่มต้นสร้างความน่าเชื่อถือ", features: ["Trust Profile พื้นฐาน", "QR Verification", "Verified Badge", "อัปเดตข้อมูล 1 ครั้ง"], cta: "เลือกแพ็กเกจ" },
  { name: "Trust Starter", price: "฿990", unit: "/ เดือน", desc: "เหมาะสำหรับที่พักเริ่มต้น", features: ["ทุกอย่างใน Basic", "อัปเดตข้อมูลรายเดือน", "สถิติการเข้าชมพื้นฐาน", "QR ดาวน์โหลดคุณภาพสูง"], cta: "เลือกแพ็กเกจ" },
  { name: "Trust Pro", price: "฿2,900", unit: "/ เดือน", desc: "เพิ่มความมั่นใจให้ลูกค้า", features: ["ทุกอย่างใน Starter", "ระดับ Pro Verification", "Analytics แบบละเอียด", "แสดงผลเด่นใน Directory", "ตรวจสอบทุก 90 วัน"], cta: "เลือกแพ็กเกจ", recommended: true },
  { name: "Trust Plus", price: "฿4,900", unit: "/ เดือน", desc: "สำหรับธุรกิจที่กำลังเติบโต", features: ["ทุกอย่างใน Pro", "รองรับที่พัก 2 แห่ง", "รายงานประจำเดือน", "Priority Support", "Trust Score Insights"], cta: "เลือกแพ็กเกจ" },
  { name: "Trust Premium", price: "฿9,900", unit: "/ เดือน", desc: "สำหรับเครือที่พักมืออาชีพ", features: ["รองรับสูงสุด 10 แห่ง", "Premium Verification", "Portfolio Dashboard", "Dedicated Account Manager", "Custom Trust Report"], cta: "เลือกแพ็กเกจ" },
];

function Pricing({ onSelect, go }: { onSelect: (name: string) => void; go: (page: Page) => void }) {
  const [active, setActive] = useState(2);
  const plan = plans[active];
  return <main className="v3-pricing">
    <section className="container v3-pricing-head"><span className="v3-overline dark">OWNER MEMBERSHIP</span><h1>เลือกแพ็กเกจด้วยรายละเอียด<br/>ไม่ใช่กล่อง 5 ใบเรียงกัน</h1><p>Prototype ยังไม่มีระบบชำระเงินจริง หลังยืนยันจะเข้าสถานะ Pending</p></section>
    <section className="container v3-pricing-selector">
      <div className="v3-plan-tabs">{plans.map((p,i)=><button key={p.name} onClick={()=>setActive(i)} className={active===i?'active':''}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{p.name}</strong><small>{p.price} {p.unit}</small></div><Icon name="arrow" size={18}/></button>)}</div>
      <div className="v3-plan-detail">
        <div className="v3-plan-price"><span>{plan.name}</span><strong>{plan.price}</strong><small>{plan.unit}</small></div>
        <h2>{plan.desc}</h2>
        <ul>{plan.features.map(f=><li key={f}><Icon name="check" size={16}/>{f}</li>)}</ul>
        <button className="v3-plan-cta" onClick={()=>onSelect(plan.name)}>สมัครแพ็กเกจสำหรับเจ้าของใหม่ <Icon name="arrow"/></button>
        <button className="v3-existing-owner" onClick={()=>go("owner-auth")}>มีบัญชีเจ้าของที่พักแล้ว → เข้าสู่ระบบ</button>
        <div className="v3-flow-note"><strong>New owner</strong><span>Registration → Owner info → Add villa → Confirmation → Pending</span></div>
        <div className="v3-flow-note"><strong>Existing owner</strong><span>Login → Select villa → Confirmation → Pending</span></div>
      </div>
    </section>
    <section className="container v3-pricing-help"><div><span className="v3-overline">NEED HELP?</span><h2>ยังไม่แน่ใจว่าแพ็กเกจไหนเหมาะ?</h2></div><button onClick={()=>go('contact')}>คุยกับทีมงาน <Icon name="phone"/></button></section>
  </main>;
}

function Footer({ go }: { go: (p: Page) => void }) {
  return <footer className="v3-footer"><div className="container v3-footer-top"><div><Logo light/><p>Trust before transfer.</p></div><div className="v3-footer-links"><button onClick={()=>go('directory')}>Directory</button><button onClick={()=>go('scan')}>QR Check</button><button onClick={()=>go('pricing')}>For Owners</button><button onClick={()=>go('articles')}>Articles</button><button onClick={()=>go('villa-report')}>Report</button><button onClick={()=>go('contact')}>Contact</button></div></div><div className="container v3-footer-bottom"><span>© 2026 VillaCheck Prototype</span><div><button onClick={()=>go('privacy')}>Privacy</button><button onClick={()=>go('terms')}>Terms</button></div></div></footer>;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedPackage, setSelectedPackage] = useState("Trust Pro");
  const [directorySearch, setDirectorySearch] = useState({ query: "", province: "" });
  const [adminVillaStatus, setAdminVillaStatus] = useState<"Pending" | "Verified" | "Rejected" | "Suspended" | "Expired">("Pending");
  const [qrReference, setQrReference] = useState("VC-TH-2025-01842");
  const [ownerLoggedIn, setOwnerLoggedIn] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [selectedVilla, setSelectedVilla] = useState("");
  const [packageStatus, setPackageStatus] = useState("ใช้งานอยู่ / Active");
  const [reportReference, setReportReference] = useState("RPT-1042");
  const [reportCounter, setReportCounter] = useState(1042);
  const [userReports, setUserReports] = useState<UserReport[]>([
    { reference: "RPT-1038", villa: "Sea Sky Pool Villa", type: "ช่องทางติดต่อไม่ตรง", guest: false },
  ]);
  const go = (next: Page) => { setPage(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const search = (query: string, province: string) => {
    setDirectorySearch({ query, province });
    go("directory");
  };
  const selectPackage = (name: string) => {
    setSelectedPackage(name);
    setSelectedVilla("");
    go(ownerLoggedIn ? "owner-select-villa" : "owner-registration");
  };
  const showVerificationResult = (reference: string) => {
    setQrReference(reference);
    go("verify");
  };
  const submitReport = (report: Omit<UserReport, "reference" | "guest">) => {
    const reference = `RPT-${reportCounter}`;
    setReportReference(reference);
    setReportCounter(current => current + 1);
    if (userLoggedIn) setUserReports(current => [{ ...report, reference, guest: false }, ...current]);
    go("villa-report-success");
  };
  const isOwnerPage = page.startsWith("owner-") && !["owner-auth", "owner-registration", "owner-information", "owner-onboarding-villa", "owner-select-villa"].includes(page);
  const isAdminPage = page.startsWith("admin-");
  const isUserPage = page.startsWith("user-");
  const isPublicInfoPage = ["about", "verification-standard", "articles", "article-detail", "owner-guide", "help", "contact", "privacy", "terms", "social-facebook", "social-instagram", "social-line", "gallery"].includes(page);
  const content =
    page === "home" ? <Home go={go} onSearch={search} /> :
    page === "directory" ? <Directory go={go} initialQuery={directorySearch.query} initialProvince={directorySearch.province} /> :
    page === "detail" ? <Detail go={go} /> :
    page === "scan" ? <ScanQr go={go} onVerified={showVerificationResult} /> :
    page === "verify" ? <Verify go={go} reference={qrReference} /> :
    page === "pricing" ? <Pricing onSelect={selectPackage} go={go} /> :
    isPublicInfoPage ? <PublicInfoPage page={page} go={go} /> :
    page === "villa-report" ? <PublicReportPage onSubmit={submitReport} /> :
    page === "villa-report-success" ? <PublicReportSuccess go={go} reference={reportReference} linkedToUser={userLoggedIn} /> :
    page === "login" ? <LoginPage go={go} onAuthenticated={role => { if (role === "Owner") setOwnerLoggedIn(true); if (role === "User") setUserLoggedIn(true); }} /> :
    page === "owner-auth" ? <OwnerPackageAuth go={go} packageName={selectedPackage} onOwnerLogin={() => setOwnerLoggedIn(true)} /> :
    page === "owner-registration" ? <OwnerNewRegistration go={go} packageName={selectedPackage} /> :
    page === "owner-information" ? <OwnerRegistration go={go} packageName={selectedPackage} /> :
    page === "owner-onboarding-villa" ? <OwnerOnboardingVilla go={go} onVillaAdded={setSelectedVilla} /> :
    page === "owner-select-villa" ? <OwnerSelectVilla go={go} onSelect={setSelectedVilla} /> :
    page === "package-confirmation" ? <PackageConfirmation go={go} packageName={selectedPackage} villaName={selectedVilla} onConfirm={() => { setOwnerLoggedIn(true); setPackageStatus("รอดำเนินการ / Pending"); go("package-request-pending"); }} /> :
    page === "package-request-pending" ? <PackageRequestPending go={go} packageName={selectedPackage} /> :
    isOwnerPage ? <OwnerPages page={page} go={go} packageName={selectedPackage} packageStatus={packageStatus} setPackageName={setSelectedPackage} onPackageChange={() => setPackageStatus("รอดำเนินการ / Pending")} /> :
    isAdminPage ? <AdminPages page={page} go={go} villaStatus={adminVillaStatus} setVillaStatus={setAdminVillaStatus} /> :
    <UserPages page={page} go={go} reports={userReports} />;
  const isStandalone = page === "scan" || page === "verify" || page === "login" || page === "owner-auth" || page === "owner-registration" || page === "owner-information" || page === "owner-onboarding-villa" || page === "owner-select-villa" || page === "package-confirmation" || page === "package-request-pending" || isOwnerPage || isAdminPage || isUserPage;
  const showPublicFooter = ["home", "directory", "detail", "pricing", "scan", "verify", "villa-report", "villa-report-success"].includes(page) || isPublicInfoPage;
  return <div className="app">{!isStandalone && <Header page={page} go={go} />}{content}{showPublicFooter && <Footer go={go} />}</div>;
}
