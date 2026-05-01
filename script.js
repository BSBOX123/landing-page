// Initialize Lucide Icons
lucide.createIcons();

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Navbar background effect on scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

// Smooth scrolling for navigation links (Fixes sticky scrolling direction bug)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Calculate absolute position by summing heights of previous sections
            let targetOffset = 0;
            const sections = document.querySelectorAll('section');
            for (let section of sections) {
                if (section.id === targetId) break;
                targetOffset += section.offsetHeight;
            }

            window.scrollTo({
                top: targetOffset,
                behavior: 'smooth'
            });
        }
    });
});

// Bilingual Support (KO / EN)
const langToggleBtn = document.getElementById('lang-toggle');
const translatableElements = document.querySelectorAll('[data-en][data-ko]');
const placeholderElements = document.querySelectorAll('[placeholder][data-ko-placeholder]');
let currentLang = 'ko'; // Set Korean as default

function updateLanguage() {
    // Update Button UI
    if (currentLang === 'en') {
        langToggleBtn.innerHTML = '<span class="active">EN</span> / <span>KO</span>';
    } else {
        langToggleBtn.innerHTML = '<span>EN</span> / <span class="active">KO</span>';
    }

    // Update Text Content
    translatableElements.forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });

    // Update Placeholders
    placeholderElements.forEach(el => {
        if (currentLang === 'ko') {
            if (!el.hasAttribute('data-en-placeholder')) {
                el.setAttribute('data-en-placeholder', el.getAttribute('placeholder'));
            }
            el.setAttribute('placeholder', el.getAttribute('data-ko-placeholder'));
        } else {
            el.setAttribute('placeholder', el.getAttribute('data-en-placeholder') || el.getAttribute('placeholder'));
        }
    });
}

langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ko' : 'en';
    updateLanguage();
});

// Initialize default language on page load
updateLanguage();
