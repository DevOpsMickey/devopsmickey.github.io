// Language switching functionality
let currentLang = 'es';

function switchLanguage(lang) {
    currentLang = lang;
    const html = document.documentElement;
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = translations[lang];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                translation = null;
                break;
            }
        }
        
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update language toggle button text and flag
    const langText = document.getElementById('langText');
    const langTextMobile = document.getElementById('langTextMobile');
    const langIcon = document.getElementById('langIcon');
    const langIconMobile = document.getElementById('langIconMobile');
    const newLangText = lang === 'en' ? 'ES' : 'EN';
    const newLangFlag = lang === 'en' ? 'https://flagcdn.com/w20/us.png' : 'https://flagcdn.com/w20/mx.png';
    
    if (langText) langText.textContent = newLangText;
    if (langTextMobile) langTextMobile.textContent = newLangText;
    if (langIcon) {
        langIcon.src = newLangFlag;
        langIcon.alt = lang === 'en' ? 'US' : 'MX';
    }
    if (langIconMobile) {
        langIconMobile.src = newLangFlag;
        langIconMobile.alt = lang === 'en' ? 'US' : 'MX';
    }
    
    // Save preference to localStorage
    localStorage.setItem('preferredLang', lang);
}

// Language toggle button event listeners
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'es' : 'en';
        switchLanguage(newLang);
    });
}

const langToggleMobile = document.getElementById('langToggleMobile');
if (langToggleMobile) {
    langToggleMobile.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'es' : 'en';
        switchLanguage(newLang);
    });
}

// Check for saved language preference on page load
const savedLang = localStorage.getItem('preferredLang');
if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
    switchLanguage(savedLang);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('reveal-active');
        }
    });
};

// Initial check
revealOnScroll();

// Add scroll event listener
window.addEventListener('scroll', revealOnScroll);

// Navbar background on scroll
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-[#0b0b0f]/95');
        navbar.classList.remove('bg-[#0b0b0f]/80');
    } else {
        navbar.classList.remove('bg-[#0b0b0f]/95');
        navbar.classList.add('bg-[#0b0b0f]/80');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (mobileMenu.style.display === 'none') {
            mobileMenu.style.display = 'block';
        } else {
            mobileMenu.style.display = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
        });
    });
}

// Add hover effect to project cards
const projectCardsHover = document.querySelectorAll('.glass-card');
projectCardsHover.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Parallax effect for hero background
const heroSection = document.getElementById('hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = heroSection.querySelectorAll('.absolute');
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add typing effect to hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector('#hero p.text-gray-400');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let index = 0;
    
    const typeWriter = () => {
        if (index < text.length) {
            heroSubtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 30);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
        }
    });
}, observerOptions);

revealElements.forEach(element => {
    observer.observe(element);
});

// Add subtle glow effect to CTA buttons on mouse move
const ctaButtons = document.querySelectorAll('a.group');
ctaButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--mouse-x', `${x}px`);
        button.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Animation utilities
const animations = {
    fadeIn: (element, duration = 600, delay = 0) => {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-in-out ${delay}ms`;
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    },
    
    slideIn: (element, direction = 'up', duration = 600, delay = 0) => {
        const transforms = {
            up: 'translateY(30px)',
            down: 'translateY(-30px)',
            left: 'translateX(30px)',
            right: 'translateX(-30px)'
        };
        element.style.opacity = '0';
        element.style.transform = transforms[direction];
        element.style.transition = `opacity ${duration}ms ease-in-out ${delay}ms, transform ${duration}ms ease-in-out ${delay}ms`;
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) translateX(0)';
        }, 10);
    },
    
    bounce: (element) => {
        element.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    },
    
    pulse: (element, duration = 2000) => {
        element.style.animation = `pulse ${duration}ms ease-in-out infinite`;
    },
    
    shake: (element) => {
        element.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    },
    
    float: (element, duration = 3000) => {
        element.style.animation = `float ${duration}ms ease-in-out infinite`;
    },
    
    rotate: (element, degrees = 360, duration = 1000) => {
        element.style.transition = `transform ${duration}ms ease`;
        element.style.transform = `rotate(${degrees}deg)`;
    },
    
    scale: (element, scale = 1.1, duration = 300) => {
        element.style.transition = `transform ${duration}ms ease`;
        element.style.transform = `scale(${scale})`;
    },
    
    glow: (element, color = 'rgba(147, 51, 234, 0.5)') => {
        element.style.boxShadow = `0 0 20px ${color}`;
        element.style.transition = 'box-shadow 0.3s ease';
    },
    
    wave: (element) => {
        element.style.animation = 'wave 1s ease';
        setTimeout(() => {
            element.style.animation = '';
        }, 1000);
    }
};

// Add CSS keyframes for animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

@keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    75% { transform: rotate(-5deg); }
}

.reveal-active {
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }
.stagger-6 { animation-delay: 0.6s; }
`;
document.head.appendChild(styleSheet);

// Animate hero elements on load
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('#hero .reveal > *');
    heroElements.forEach((el, index) => {
        animations.fadeIn(el, 600, index * 100);
    });
});

// Animate project cards with stagger effect
const projectCards = document.querySelectorAll('.glass-card');
projectCards.forEach((card, index) => {
    card.classList.add(`stagger-${index + 1}`);
    
    card.addEventListener('mouseenter', () => {
        animations.scale(card, 1.05, 300);
        animations.glow(card, 'rgba(147, 51, 234, 0.3)');
    });
    
    card.addEventListener('mouseleave', () => {
        animations.scale(card, 1, 300);
        card.style.boxShadow = '';
    });
});

// Animate navigation links on hover
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        animations.shake(link);
    });
});

// Animate buttons with pulse effect
const buttons = document.querySelectorAll('a.group, button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        animations.scale(button, 1.05, 200);
    });
    button.addEventListener('mouseleave', () => {
        animations.scale(button, 1, 200);
    });
});

// Floating animation for background elements
const floatingElements = document.querySelectorAll('.absolute');
floatingElements.forEach((el, index) => {
    animations.float(el, 3000 + (index * 500));
});

// Typing effect for hero title
const heroTitle = document.querySelector('#hero h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;
    
    const typeWriter = () => {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 500);
}

// Counter animation for experience years
const expElement = document.querySelector('[data-i18n="about.exp"]');
if (expElement) {
    const targetNumber = parseInt(expElement.textContent);
    let currentNumber = 0;
    const increment = targetNumber / 50;
    
    const counter = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            expElement.textContent = targetNumber + '+';
            clearInterval(counter);
        } else {
            expElement.textContent = Math.floor(currentNumber);
        }
    }, 30);
}

// Progress bar animation for skills
const skillTags = document.querySelectorAll('.glass-card span');
skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        animations.fadeIn(tag, 400, 0);
        tag.style.transform = 'translateY(0)';
    }, 100 + (index * 50));
});

// Magnetic effect for buttons
const magneticButtons = document.querySelectorAll('a[href^="#"]');
magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Scroll-triggered animations for sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.glass-card');
            cards.forEach((card, index) => {
                animations.slideIn(card, 'up', 500, index * 100);
            });
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Particle effect on mouse move (subtle - removed for performance)
// Keeping this minimal or removing entirely for better performance

// Smooth scroll with parallax for sections (optimized)
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                const rate = scrolled * -0.15;
                heroSection.style.transform = `translateY(${rate}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Timeline animation observer
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Initialize language toggle flag on page load
const langIcon = document.getElementById('langIcon');
const langIconMobile = document.getElementById('langIconMobile');
if (langIcon) {
    const initialFlag = currentLang === 'en' ? 'https://flagcdn.com/w20/us.png' : 'https://flagcdn.com/w20/mx.png';
    langIcon.src = initialFlag;
    langIcon.alt = currentLang === 'en' ? 'US' : 'MX';
}
if (langIconMobile) {
    const initialFlag = currentLang === 'en' ? 'https://flagcdn.com/w20/us.png' : 'https://flagcdn.com/w20/mx.png';
    langIconMobile.src = initialFlag;
    langIconMobile.alt = currentLang === 'en' ? 'US' : 'MX';
}

console.log('Portfolio website loaded successfully!');
