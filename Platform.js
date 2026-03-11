// ===== SAKHA-CHINA PLATFORM PAGE =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. Active Navigation =====
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.header-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref && currentPage === linkHref) {
            link.classList.add('active');
        }
    });
    
    // ===== 2. Touch Feedback =====
    const interactiveElements = document.querySelectorAll('.channel-card, .feature-card, .api-card, .tech-spec-card, .perf-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        el.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // ===== 3. Architecture Diagram Animation =====
    const archLayers = document.querySelectorAll('.arch-layer');
    
    const archObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    archLayers.forEach(layer => {
        layer.style.opacity = '0';
        layer.style.transform = 'translateY(20px)';
        layer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        archObserver.observe(layer);
    });
    
    // ===== 4. Dev Phase Animation =====
    const devPhases = document.querySelectorAll('.dev-phase');
    
    const phaseObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    devPhases.forEach(phase => {
        phase.style.opacity = '0';
        phase.style.transform = 'translateX(-20px)';
        phase.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        phaseObserver.observe(phase);
    });
    
    // ===== 5. Performance Counter Animation =====
    const perfValues = document.querySelectorAll('.perf-value');
    
    const perfObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, { threshold: 0.5 });
    
    perfValues.forEach(value => {
        value.style.opacity = '0';
        value.style.transform = 'scale(0.8)';
        value.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        perfObserver.observe(value);
    });
    
    // ===== 6. Table Scroll Indicator =====
    const scrollableElements = document.querySelectorAll('.architecture-diagram');
    
    scrollableElements.forEach(el => {
        el.addEventListener('scroll', function() {
            if (this.scrollLeft > 0) {
                this.style.boxShadow = '4px 0 8px rgba(0,0,0,0.2) inset';
            } else {
                this.style.boxShadow = 'none';
            }
        });
    });
    
    // ===== 7. Console Info =====
    console.log('%c SAKHA-CHINA ', 'background: #3498db; color: #fff; font-size: 16px; font-weight: bold; padding: 4px 8px;');
    console.log('%c Platform Page Loaded ', 'color: #2ecc71; font-size: 12px;');
    console.log('%c Osmart company ', 'color: #9b59b6; font-size: 12px;');
    
});

// ===== 8. Page Visibility Handler =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        sessionStorage.setItem('sakha-china-platform-scroll', window.scrollY);
    } else {
        const scrollPos = sessionStorage.getItem('sakha-china-platform-scroll');
        if (scrollPos) {
            window.scrollTo(0, parseInt(scrollPos));
        }
    }
});

// ===== 9. Keyboard Navigation =====
document.addEventListener('keydown', function(e) {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (e.key === 'ArrowRight' && currentPage === 'Platform.html') {
        window.location.href = 'Risks.html';
    }
    
    if (e.key === 'ArrowLeft' && currentPage === 'Platform.html') {
        window.location.href = 'Operations.html';
    }
});



// ===== AI Feature Card Animation =====
const aiFeatureCards = document.querySelectorAll('.ai-feature-card');

const aiFeatureObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

aiFeatureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    aiFeatureObserver.observe(card);
});

// ===== Integration Card Animation =====
const integrationCards = document.querySelectorAll('.integration-card');

const integrationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
        }
    });
}, { threshold: 0.3 });

integrationCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    integrationObserver.observe(card);
});

// ===== Roadmap Step Animation =====
const roadmapSteps = document.querySelectorAll('.roadmap-step');

const roadmapObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 150);
        }
    });
}, { threshold: 0.2 });

roadmapSteps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-20px)';
    step.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    roadmapObserver.observe(step);
});

// ===== ROI Counter Animation =====
const roiValues = document.querySelectorAll('.roi-value');

const roiObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
        }
    });
}, { threshold: 0.5 });

roiValues.forEach(value => {
    value.style.opacity = '0';
    value.style.transform = 'scale(0.8)';
    value.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    roiObserver.observe(value);
});