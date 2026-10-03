import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, CheckCircle2, ChevronDown, Clock3, ExternalLink, Gauge,
  MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Star,
  Wrench, X, CarFront, Droplets, Sun, Wind
} from "lucide-react";
import { motion } from "framer-motion";
import "./styles.css";

const PHONE = "919819370070";
const DISPLAY_PHONE = "+91 98193 70070";
const WHATSAPP = `https://wa.me/${PHONE}?text=${encodeURIComponent(
  "Hello Butter Car Detailing, I would like to enquire about your car detailing services."
)}`;
const MAPS = "https://www.google.com/maps/search/?api=1&query=Butter+Car+Detailing+%26+Headlight+Restoration+Studio,+Bhandup+West,+Mumbai,+Maharashtra+400078";

const services = [
  { icon: CarFront, title: "Interior + Exterior Detailing", text: "Deep cleaning and professional detailing to refresh your vehicle inside and out." },
  { icon: Sparkles, title: "Ceramic & Nano Coatings", text: "Paint protection solutions designed to help your car stay cleaner and look glossy." },
  { icon: ShieldCheck, title: "PPF", text: "Paint Protection Film enquiries for drivers looking to protect high-impact areas." },
  { icon: Sun, title: "Headlight Restoration", text: "Professional restoration to improve the appearance of faded or cloudy headlights." },
  { icon: Wrench, title: "Engine Bay Cleaning", text: "Careful cleaning for a cleaner, more presentable engine bay." },
  { icon: Droplets, title: "Interior Germ Cleaning", text: "Interior deep cleaning with Optima steamer treatment for a fresher cabin." }
];

const faqs = [
  ["What services does Butter Car Detailing offer?", "Butter specialises in car detailing and professional headlight restoration, with services including interior and exterior detailing, PPF, ceramic and nano coatings, engine bay cleaning, interior germ cleaning and mobile detailing."],
  ["Where is Butter Car Detailing located?", "Shop No. 7, Janteshwar Society SRA CHS, Janta Market, Subhash Road, near D.R. J, Bhandup West, Mumbai, Maharashtra 400078."],
  ["How can I get a quote?", "Use the enquiry form on this page or message Butter directly on WhatsApp. Share your car model and the service you need for a quicker response."],
  ["Do you offer mobile detailing?", "Mobile detailing is listed among Butter's services. Contact the studio to confirm current mobile service availability for your location."],
  ["What are the opening hours?", "The business listing currently shows Butter as open until 9 PM. Contact the studio to confirm today's hours before visiting."]
];

function App() {
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "Interior + Exterior Detailing", car: "", message: "" });
  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  async function submit(e) {
    e.preventDefault();
    const payload = { ...form, service: `${form.service}${form.car ? ` — ${form.car}` : ""}`, message: form.message };
    try {
      const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Request failed");
      setSubmitted(true);
      setForm({ name: "", phone: "", service: "Interior + Exterior Detailing", car: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      const message = `Hello Butter Car Detailing, my name is ${form.name}. I have a ${form.car || "car"} and I am interested in ${form.service}. ${form.message} My phone number is ${form.phone}.`;
      window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`, "_blank");
    }
  }

  return <div className="site">
    <header className="nav">
      <a className="brand" href="#home"><span className="brand-mark"><CarFront size={21}/></span><span><strong>BUTTER</strong><small>CAR DETAILING STUDIO</small></span></a>
      <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X/> : <Menu/>}</button>
      <nav className={menu ? "nav-links open" : "nav-links"}>
        {["About", "Services", "Results", "Location", "Contact"].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenu(false)}>{item}</a>)}
        <a className="nav-cta" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Get a Quote</a>
      </nav>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-image"></div><div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
            <div className="eyebrow"><span></span> PREMIUM CAR CARE • BHANDUP, MUMBAI</div>
            <h1>Restore.<br/><em>Protect. Shine.</em></h1>
            <p className="hero-text">Premium car detailing and professional headlight restoration for drivers who care about every detail.</p>
            <div className="hero-actions"><a className="primary-btn" href="#contact">Get a Free Quote <ArrowRight size={18}/></a><a className="secondary-btn" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp Us</a></div>
            <div className="rating"><span className="stars">★★★★★</span><b>4.9</b><span>Google reviews</span></div>
          </motion.div>
        </div>
        <div className="hero-stats"><div><b>6+</b><span>Detailing services</span></div><div><b>9 PM</b><span>Listed closing time</span></div><div><b>Bhandup</b><span>West, Mumbai</span></div></div>
      </section>

      <section className="about section" id="about">
        <div className="section-label">ABOUT BUTTER</div>
        <div className="two-col"><div><h2>Your car deserves <span>better than basic.</span></h2></div><div>
          <p className="lead">Butter Car Detailing & Headlight Restoration Studio is a local automotive care studio in Bhandup West, Mumbai, focused on detailing, protection and restoration.</p>
          <p>From deep interior cleaning to exterior detailing, coatings and headlight restoration, the studio offers practical services for keeping your car looking its best.</p>
          <div className="mini-points"><span><CheckCircle2/> Professional detailing</span><span><CheckCircle2/> Protection & restoration</span><span><CheckCircle2/> WhatsApp enquiries</span></div>
        </div></div>
      </section>

      <section className="services section" id="services">
        <div className="section-head"><div><div className="section-label">WHAT WE DO</div><h2>Detailing built around <span>your car.</span></h2></div><p>Choose a service, tell us your car model and get in touch for a quote.</p></div>
        <div className="service-grid">{services.map((s,i)=>{const Icon=s.icon;return <motion.article className="service-card" key={s.title} whileHover={{y:-8}} transition={{duration:.2}}><div className="service-number">0{i+1}</div><div className="service-icon"><Icon size={27}/></div><h3>{s.title}</h3><p>{s.text}</p><a href="#contact">Enquire <ArrowRight size={15}/></a></motion.article>})}</div>
      </section>

      <section className="results section" id="results">
        <div className="section-head"><div><div className="section-label">THE BUTTER STANDARD</div><h2>See the difference <span>in every detail.</span></h2></div><p>A visual-first portfolio is one of the strongest ways to show the quality of automotive detailing work.</p></div>
        <div className="gallery">
          <div className="gallery-card large"><img src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1400&q=85" alt="Detailed black car"/><div><small>EXTERIOR DETAILING</small><b>Gloss that gets noticed.</b></div></div>
          <div className="gallery-card"><img src="https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=900&q=85" alt="Luxury car exterior"/><div><small>PAINT PROTECTION</small><b>Protect the finish.</b></div></div>
          <div className="gallery-card"><img src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=900&q=85" alt="Car detail"/><div><small>PREMIUM CARE</small><b>Every surface matters.</b></div></div>
        </div>
        <div className="photo-note">Demo gallery — replace these visuals with Butter's actual before/after photos for the final client presentation.</div>
      </section>

      <section className="experience section"><div className="experience-panel">
        <div className="experience-copy"><div className="section-label">WHY CHOOSE BUTTER</div><h2>More than a wash.<br/><span>A complete car-care experience.</span></h2><p>Make the service experience clear before a customer ever calls. The website can turn searches and social-media visitors into direct enquiries.</p>
          <div className="experience-points"><div><ShieldCheck/><span><b>Protection-focused</b><small>PPF, ceramic and nano coating enquiries.</small></span></div><div><Gauge/><span><b>Detail-oriented</b><small>Interior, exterior and engine-bay cleaning.</small></span></div><div><Wind/><span><b>Convenient contact</b><small>Quick quote requests through WhatsApp.</small></span></div></div>
          <a className="primary-btn" href="#contact">Request a Quote <ArrowRight size={18}/></a>
        </div>
        <div className="car-art"><div className="car-glow"></div><div className="car-silhouette">BUTTER</div><div className="art-chip chip-one">DETAILING</div><div className="art-chip chip-two">RESTORATION</div></div>
      </div></section>

      <section className="location section" id="location"><div className="section-head"><div><div className="section-label">FIND THE STUDIO</div><h2>Visit us in <span>Bhandup West.</span></h2></div><p>Janta Market, Subhash Road, near D.R. J, Mumbai 400078.</p></div>
        <div className="location-grid"><div className="map-card"><div className="map-pattern"></div><div className="map-road road-one"></div><div className="map-road road-two"></div><div className="map-road road-three"></div><div className="map-pin"><MapPin size={28}/></div><div className="map-label">BUTTER CAR DETAILING</div></div>
          <div className="location-info"><div className="address-box"><MapPin/><div><small>ADDRESS</small><p>Shop No. 7, Janteshwar Society SRA CHS,<br/>Janta Market, Subhash Rd, near D.R. J,<br/>Bhandup West, Mumbai, Maharashtra 400078</p></div></div><div className="address-box"><Phone/><div><small>CALL / WHATSAPP</small><p>{DISPLAY_PHONE}</p></div></div><div className="address-box"><Clock3/><div><small>LISTED HOURS</small><p>Open until 9 PM</p></div></div><div className="location-actions"><a className="primary-btn" href={MAPS} target="_blank" rel="noreferrer">Get Directions <ExternalLink size={17}/></a><a className="secondary-btn dark" href={`tel:+${PHONE}`}><Phone size={17}/> Call Now</a></div></div></div>
      </section>

      <section className="cta section"><div className="cta-inner"><div><div className="section-label">READY FOR A CLEANER FINISH?</div><h2>Tell us about <span>your car.</span></h2></div><a className="primary-btn light" href="#contact">Get a Free Quote <ArrowRight size={18}/></a></div></section>

      <section className="contact section" id="contact"><div className="contact-wrap"><div className="contact-copy"><div className="section-label">GET A QUOTE</div><h2>Let's make your car<br/><span>look its best.</span></h2><p>Share your car model and the service you need. We'll make it easy to start the conversation.</p><div className="contact-info"><a href={`tel:+${PHONE}`}><Phone/><span><small>CALL US</small>{DISPLAY_PHONE}</span></a><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle/><span><small>WHATSAPP</small>Chat for a quote</span></a><div><MapPin/><span><small>VISIT US</small>Bhandup West, Mumbai 400078</span></div></div></div>
        <form className="enquiry-form" onSubmit={submit}><h3>Get a Quote</h3><p>Tell us about your vehicle and the service you need.</p><label>Your Name<input required value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Enter your name"/></label><label>Phone Number<input required value={form.phone} onChange={e=>update("phone",e.target.value)} type="tel" placeholder="Enter your phone number"/></label><label>Car Model<input value={form.car} onChange={e=>update("car",e.target.value)} placeholder="e.g. Creta, Swift, XUV700"/></label><label>Service<select value={form.service} onChange={e=>update("service",e.target.value)}>{services.map(s=><option key={s.title}>{s.title}</option>)}<option>Mobile Detailing</option><option>General Enquiry</option></select></label><label>Message<textarea value={form.message} onChange={e=>update("message",e.target.value)} placeholder="Tell us what you need..."></textarea></label><button className="primary-btn" type="submit">{submitted ? "Quote Request Sent ✓" : "Send Quote Request"} <ArrowRight size={18}/></button><a className="whatsapp-full" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Prefer WhatsApp? Chat Now</a>{submitted&&<div className="success-message">Thanks! Your enquiry has been recorded.</div>}</form>
      </div></section>

      <section className="faq section"><div className="section-label">FAQ</div><h2>Questions? <span>We've got answers.</span></h2><div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq-item ${faq===i?"active":""}`} key={q}><button onClick={()=>setFaq(faq===i?-1:i)}><span>{q}</span><ChevronDown/></button>{faq===i&&<motion.p initial={{opacity:0}} animate={{opacity:1}}>{a}</motion.p>}</div>)}</div></section>
    </main>

    <footer className="footer"><div className="footer-main"><div className="brand footer-brand"><span className="brand-mark"><CarFront size={21}/></span><span><strong>BUTTER</strong><small>CAR DETAILING STUDIO</small></span></div><p>Premium car detailing & headlight restoration in Bhandup, Mumbai.</p><div className="footer-links"><a href="#services">Services</a><a href="#results">Results</a><a href="#location">Location</a><a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Butter Car Detailing. Demo website concept.</span><span>Bhandup West, Mumbai</span></div></footer>
    <a className="floating-wa" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={25}/></a>
  </div>;
}

createRoot(document.getElementById("root")).render(<App />);
