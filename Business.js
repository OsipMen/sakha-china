// ===== SAKHA-CHINA BUSINESS MODEL PAGE =====

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
    const interactiveElements = document.querySelectorAll('.card, .canvas-card, .platform-card, .metric-detailed-card, .info-box');
    
    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        el.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // ===== 3. Metric Progress Animation =====
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // ===== 4. Table Scroll Indicator =====
    const tableContainers = document.querySelectorAll('.table-container');
    
    tableContainers.forEach(container => {
        container.addEventListener('scroll', function() {
            if (this.scrollLeft > 0) {
                this.style.boxShadow = '4px 0 8px rgba(0,0,0,0.2) inset';
            } else {
                this.style.boxShadow = 'none';
            }
        });
    });
    
    // ===== 5. Console Info =====
    console.log('%c SAKHA-CHINA ', 'background: #3498db; color: #fff; font-size: 16px; font-weight: bold; padding: 4px 8px;');
    console.log('%c Business Model Page Loaded ', 'color: #2ecc71; font-size: 12px;');
    console.log('%c Osmart company ', 'color: #9b59b6; font-size: 12px;');
    
});

// ===== 6. Page Visibility Handler =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        sessionStorage.setItem('sakha-china-business-scroll', window.scrollY);
    } else {
        const scrollPos = sessionStorage.getItem('sakha-china-business-scroll');
        if (scrollPos) {
            window.scrollTo(0, parseInt(scrollPos));
        }
    }
});

// ===== 7. Keyboard Navigation =====
document.addEventListener('keydown', function(e) {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (e.key === 'ArrowRight' && currentPage === 'Business.html') {
        window.location.href = 'Operations.html';
    }
    
    if (e.key === 'ArrowLeft' && currentPage === 'Business.html') {
        // First page, no previous
    }
});