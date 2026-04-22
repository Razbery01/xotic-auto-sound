/* =============================================================
   XOTIC AUTO SOUND — Site Scripts
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initStatsCounter();
    initContactForm();
    initYear();
});

/* ---------- Navbar: scroll state ---------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const onScroll = () => {
        if (window.scrollY > 20) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

/* ---------- Smooth Anchor Scroll ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id.length <= 1) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const offset = 200;
            const y = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });
}

/* ---------- Scroll Reveal Animations ---------- */
function initScrollReveal() {
    const targets = document.querySelectorAll(
        '.service-card, .why-card, .process-step, .stat-item, .contact-card, .about-text, .about-visual, .section-header, .about-list li'
    );

    targets.forEach(el => el.classList.add('reveal'));

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 70);
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => io.observe(el));
}

/* ---------- Stats Counter ---------- */
function initStatsCounter() {
    const nums = document.querySelectorAll('.stat-num');
    if (!nums.length) return;

    const animate = (el) => {
        const target = parseInt(el.dataset.count, 10) || 0;
        const duration = 1600;
        const start = performance.now();
        const step = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(target * eased);
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = target;
        };
        requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animate(e.target);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });

    nums.forEach(n => io.observe(n));
}

/* ---------- Contact Form -> WhatsApp ---------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const whatsappNumber = form.dataset.whatsapp || '';
    const businessName = form.dataset.business || 'us';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.name.value.trim();
        const phone = form.phone.value.trim();
        const vehicle = form.vehicle.value.trim();
        const service = form.service.value;
        const message = form.message.value.trim();

        const text =
`Hi ${businessName},

My name is ${name}.
Phone: ${phone}
Vehicle: ${vehicle}
Service: ${service}

${message}`;

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    });
}

/* ---------- Footer Year ---------- */
function initYear() {
    const yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();
}
