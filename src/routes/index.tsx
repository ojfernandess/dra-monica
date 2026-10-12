import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type SVGProps, type ReactNode } from 'react';
import { ArrowRight, Award, Baby, Check, ChevronRight, Heart, Mail, MapPin, Menu, Navigation, Phone, ShieldCheck, Smile, Sparkles, Sprout, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clinic } from '@/lib/clinic';

const portraitSrc = '/monica.jpeg';
const smilesSrc = '/Sorrisos.png';

const pageTitle = 'Dra. Mônica Cristina | Dentista Infantil e Periodontista em Diadema';
const description = 'Odontologia infantil e periodontia em Diadema com a Dra. Mônica Cristina. Mais de 5 anos de experiência e um cuidado acolhedor para toda a família. Agende pelo WhatsApp.';
// Use the current preview origin until a published URL or custom domain is available.
const siteUrl = 'https://id-preview--c9e89fb5-aed4-40ec-9319-2591c064ce92.lovable.app/';
export const Route = createFileRoute('/')({
  component: Index,
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'pt_BR' },
      { property: 'og:url', content: siteUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: siteUrl }],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Dentist', name: clinic.name, url: siteUrl,
      description, telephone: '+5511976931164', email: clinic.email,
      address: { '@type': 'PostalAddress', streetAddress: 'Av. São José, 111 - Centro', addressLocality: 'Diadema', addressRegion: 'SP', addressCountry: 'BR' },
    }) }],
  }),
});

const navigation = [
  ['Início', '#inicio'], ['Sobre a Dra.', '#sobre'], ['Especialidades', '#especialidades'],
  ['Atendimento Infantil', '#infantil'], ['Localização', '#localizacao'], ['Contato', '#contato'],
];

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.8A8.5 8.5 0 1 1 20.5 11.7Z"/><path d="m8.2 7.3 1.3 2.5-.9 1.1c.7 1.5 1.7 2.5 3.3 3.2l1.1-.9 2.5 1.2c.2.1.3.4.2.7-.3.8-1 1.4-2 1.3-3.3-.5-6.3-3.5-6.8-6.8-.1-1 .5-1.7 1.3-2 .3-.1.5 0 .7.3Z"/></svg>;
}
function ToothIllustration({ happy = false, ...props }: SVGProps<SVGSVGElement> & { happy?: boolean }) {
  return <svg viewBox="0 0 100 110" fill="none" aria-hidden="true" {...props}>
    <path d="M50 17C36 8 20 9 15 23c-7 18 5 33 9 47 4 14 7 26 14 25 9-1 4-29 12-29s3 28 12 29c7 1 10-11 14-25 4-14 16-29 9-47C80 9 64 8 50 17Z" fill="var(--card)" stroke="var(--primary)" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M29 23c-7 2-9 9-7 16" stroke="var(--sky)" strokeWidth="4" strokeLinecap="round"/>
    {happy && <><ellipse cx="35" cy="46" rx="3" ry="4" fill="var(--heading)"/><ellipse cx="65" cy="46" rx="3" ry="4" fill="var(--heading)"/><path d="M43 52q7 10 14 0" stroke="var(--heading)" strokeWidth="2.5" strokeLinecap="round"/><ellipse cx="28" cy="53" rx="6" ry="3.5" fill="var(--pink)"/><ellipse cx="72" cy="53" rx="6" ry="3.5" fill="var(--pink)"/></>}
  </svg>;
}
function ToothIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M16 6C10 2 4 4 5 11c.5 5 3 7 4 12 1 6 4 7 5 1 .4-3 1-6 2-6s1.6 3 2 6c1 6 4 5 5-1 1-5 3.5-7 4-12 1-7-5-9-11-5Z"/><path d="M9 8c-1 1-1 3 0 5"/></svg>;
}
function Brand() {
  return <a href="#inicio" className="brand" aria-label="Dra. Mônica Cristina — início"><ToothIcon className="brand-mark"/><span><span className="brand-name">Dra. Mônica Cristina</span><span className="brand-subtitle">Periodontia & Odontologia Infantil</span></span></a>;
}
function AppointmentButton({ children = 'Agendar pelo WhatsApp', className = '' }: { children?: ReactNode; className?: string }) {
  return <Button asChild variant="appointment" className={className}><a href={clinic.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/>{children}</a></Button>;
}
function SectionHeading({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return <div className="centered-heading reveal"><p className="eyebrow"><Sparkles size={13}/>{label}</p><h2 className="section-heading">{title}</h2>{children && <p className="section-lead">{children}</p>}</div>;
}
function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(element => { element.classList.add('is-observed'); observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); document.getElementById('menu-toggle')?.focus(); } };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return <>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <header className="site-header">
      <div className="page-width header-inner">
        <Brand/>
        <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <AppointmentButton className="header-appointment">Agendar consulta</AppointmentButton>
        <Button id="menu-toggle" variant="ghost" size="icon" className="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</Button>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação no celular">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<AppointmentButton>Agendar consulta</AppointmentButton></nav>}
    </header>
    <main id="conteudo">
      <section id="inicio" className="hero" aria-labelledby="hero-title">
        <div className="page-width hero-grid">
          <div className="hero-copy">
            <div className="experience-badge"><Heart size={13}/> Cuidando de sorrisos há mais de 5 anos</div>
            <h1 id="hero-title">Pequenos sorrisos,<br/>grandes motivos<br/>para <span className="title-accent">cuidar.</span> <span className="inline-block align-middle"><Sparkles className="text-primary" size={30} strokeWidth={1.4}/></span></h1>
            <p className="hero-description">Um atendimento odontológico acolhedor, humanizado e cheio de carinho para os pequenos, com atenção à saúde bucal e ao bem-estar de toda a família.</p>
            <div className="hero-actions"><AppointmentButton/><Button asChild variant="gentle"><a href="#sobre">Conheça a Dra. Mônica <ArrowRight/></a></Button></div>
            <div className="hero-promises"><span><Heart/>Atendimento<br/>acolhedor</span><span><ShieldCheck/>Cuidado<br/>individualizado</span><span><Award/>Mais de 5 anos<br/>de experiência</span></div>
          </div>
          <div className="portrait-composition">
            <div className="portrait-backdrop"/>
            <div className="portrait-frame"><img src={smilesSrc} width="1536" height="1024" alt="Dra. Mônica Cristina sorrindo com crianças no consultório" fetchPriority="high"/></div>
            <ToothIllustration happy className="portrait-tooth"/><Star className="decor-star star-one"/><Star className="decor-star star-two"/><Sparkles className="tiny-sparkle"/>
            <div className="portrait-caption"><span className="caption-heart"><Heart size={21} strokeWidth={1.5}/></span><div><strong>Carinho em cada sorriso</strong><small>Cuidado que acolhe toda a família.</small></div></div>
          </div>
        </div>
        <svg className="hero-wave" viewBox="0 0 1440 35" preserveAspectRatio="none" aria-hidden="true"><path d="M0 18C260 45 440 0 700 15s450 20 740-8v28H0Z" fill="currentColor"/></svg>
      </section>
      <div className="intro-ribbon"><div className="page-width ribbon-inner"><div className="ribbon-item"><Baby/>Cuidado para os pequenos</div><span className="ribbon-divider"/><div className="ribbon-item"><Heart/>Acolhimento para toda a família</div><span className="ribbon-divider"/><div className="ribbon-item"><MapPin/>Diadema, São Paulo</div></div></div>

      <section id="especialidades" className="section">
        <div className="page-width">
          <SectionHeading label="Especialidades" title="Cuidado especial para cada sorriso">Da infância à vida adulta, atenção e carinho em cada etapa<br className="hidden sm:block"/> do cuidado com a saúde bucal.</SectionHeading>
          <div className="specialty-grid">
            {[{ title: 'Odontologia Infantil', text: 'Atendimento acolhedor para os pequenos, incentivando hábitos saudáveis desde a infância.', Icon: Baby, tone: 'sky' }, { title: 'Periodontia', text: 'Cuidados especializados com a saúde das gengivas e dos tecidos de suporte dos dentes.', Icon: ToothIcon, tone: 'pink' }, { title: 'Prevenção e Saúde Bucal', text: 'Orientações e acompanhamento para manter a saúde do sorriso.', Icon: ShieldCheck, tone: 'mint' }].map(({ title, text, Icon, tone }) => <article key={title} className={`specialty-card reveal ${tone}`}><div className="specialty-icon"><Icon/></div><h3>{title}</h3><p>{text}</p><a className="specialty-link" href={clinic.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`Agendar consulta de ${title}`}>Vamos cuidar do seu sorriso <ArrowRight size={14}/></a></article>)}
          </div>
        </div>
      </section>

      <section id="sobre" className="section about">
        <div className="page-width about-grid">
          <div className="about-photo reveal"><img src={portraitSrc} alt="A dentista Mônica Cristina" width="640" height="640" loading="lazy"/><Star className="decor-star"/><div className="about-note"><Heart/>Odontologia com afeto.</div></div>
          <div className="about-copy reveal"><p className="eyebrow"><Heart size={13}/>Conheça a sua dentista</p><h2 className="section-heading">Muito prazer,<br/>sou a Dra. Mônica! <span className="text-primary">♡</span></h2>
            <p>Sou a Dra. Mônica Cristina, periodontista e dentista infantil, com mais de 5 anos de experiência no cuidado com a saúde bucal. Acredito que cada sorriso merece atenção, carinho e um atendimento respeitoso e individualizado.</p>
            <p>Meu objetivo é proporcionar uma experiência odontológica mais tranquila e acolhedora, especialmente para as crianças, ajudando a construir uma relação positiva com o dentista desde cedo.</p>
            <div className="about-signature">Dra. Mônica Cristina</div><div className="about-role">Periodontia & Odontologia Infantil</div>
          </div>
        </div>
      </section>

      <section id="infantil" className="section children-section">
        <Heart className="children-decoration" strokeWidth={1.3}/>
        <div className="page-width">
          <SectionHeading label="Um mundo de cuidado para os pequenos" title="Aqui, cada pequeno sorriso é uma grande conquista!">Sabemos que a visita ao dentista pode despertar muitas emoções nas crianças. Por isso, valorizamos uma abordagem acolhedora, respeitando o tempo e as necessidades de cada pequeno paciente.</SectionHeading>
          <div className="children-grid">
            <article className="reveal"><div className="child-icon"><ToothIllustration happy/></div><h3>Acolhimento com carinho</h3><p>Uma experiência mais leve, com atenção ao conforto da criança.</p></article>
            <article className="reveal"><div className="child-icon bg-pink"><Heart strokeWidth={1.3}/></div><h3>Confiança desde cedo</h3><p>Construindo uma relação positiva com o cuidado odontológico.</p></article>
            <article className="reveal"><div className="child-icon bg-sun"><Sprout strokeWidth={1.3}/></div><h3>Prevenção para o futuro</h3><p>Incentivando bons hábitos de higiene e saúde bucal.</p></article>
          </div>
        </div>
      </section>

      <section className="section first-visit">
        <div className="page-width">
          <SectionHeading label="A primeira consulta infantil" title="A primeira visita pode ser o começo de uma linda amizade!">Apresentar a criança ao dentista desde cedo é um passo importante para criar bons hábitos e tornar o cuidado com o sorriso parte da sua vida.</SectionHeading>
          <div className="timeline">
            {[{ number: '01', tone: 'one', title: 'Conhecer', text: 'Acolhimento e aproximação com a criança, sempre respeitando o seu tempo.' }, { number: '02', tone: 'two', title: 'Cuidar', text: 'Avaliação e orientações adequadas às necessidades individuais.' }, { number: '03', tone: 'three', title: 'Sorrir', text: 'Incentivo a uma relação tranquila e positiva com a saúde bucal.' }].map(step => <article key={step.number} className="timeline-step reveal"><div className={`step-number ${step.tone}`}>{step.number}</div><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}
          </div>
        </div>
      </section>

      <section id="contato" className="appointment-section">
        <div className="page-width appointment-inner">
          <div className="appointment-copy reveal"><p className="eyebrow"><Heart size={13}/>Um sorriso começa com cuidado</p><h2 className="section-heading">Vamos cuidar desse<br/>sorriso juntos? ♡</h2><p>Entre em contato e agende uma consulta.<br/>Será um prazer receber você e sua família!</p><AppointmentButton>Agendar consulta pelo WhatsApp <ChevronRight size={15}/></AppointmentButton></div>
          <div className="appointment-art" aria-hidden="true"><ToothIllustration happy className="big-tooth"/><Star className="decor-star"/><Heart className="heart-art"/></div>
        </div>
      </section>

      <section id="localizacao" className="section">
        <div className="page-width location-grid">
          <div className="reveal"><p className="eyebrow"><MapPin size={13}/>Localização e contato</p><h2 className="section-heading">Estamos esperando<br/>por você!</h2><p className="section-lead">Seu próximo sorriso começa aqui, em Diadema.</p>
            <div className="contact-list">
              <div className="contact-item"><span className="contact-icon"><MapPin/></span><div><strong>Venha nos visitar</strong><a href={clinic.maps} target="_blank" rel="noopener noreferrer">{clinic.address}</a></div></div>
              <div className="contact-item"><span className="contact-icon"><Phone/></span><div><strong>Telefone / WhatsApp</strong><a href={clinic.phoneHref}>{clinic.phone}</a></div></div>
              <div className="contact-item"><span className="contact-icon"><Mail/></span><div><strong>E-mail</strong><a href={`mailto:${clinic.email}`}>{clinic.email}</a></div></div>
            </div>
            <div className="location-actions"><Button asChild variant="gentle"><a href={clinic.maps} target="_blank" rel="noopener noreferrer"><Navigation/>Como chegar</a></Button><AppointmentButton>Conversar pelo WhatsApp</AppointmentButton></div>
          </div>
          <div className="map-wrap reveal"><iframe title="Localização da Dra. Mônica Cristina em Diadema" src="https://maps.google.com/maps?q=Av.%20S%C3%A3o%20Jos%C3%A9%2C%20111%2C%20Centro%2C%20Diadema%2C%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/></div>
        </div>
      </section>
    </main>
    <footer className="site-footer"><div className="page-width"><div className="footer-top"><div><Brand/><p className="footer-description">Cuidando da saúde bucal com carinho, respeito e atenção a cada sorriso.</p></div><div><h3>Explore</h3><nav className="footer-links" aria-label="Navegação do rodapé">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav></div><div><h3>Fale com a Dra. Mônica</h3><div className="footer-contact"><p>{clinic.address}</p><a href={clinic.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp: {clinic.phone}</a><a href={`mailto:${clinic.email}`}>{clinic.email}</a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Dra. Mônica Cristina. Todos os direitos reservados.</span><span className="footer-credit">Desenvolvido por <a href="https://www.agentslabs.cloud/" target="_blank" rel="noopener noreferrer">AgentsLabs</a></span><span className="footer-made">Feito com carinho para o seu sorriso <Heart/></span></div></div></footer>
    <Button asChild variant="floating"><a href={clinic.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Agendar consulta pelo WhatsApp" title="Conversar pelo WhatsApp"><WhatsAppIcon/></a></Button>
  </>;
}
