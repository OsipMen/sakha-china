// ===== SAKHA-CHINA OPERATIONS PAGE =====

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
    const interactiveElements = document.querySelectorAll('.card, .warehouse-card, .qc-stage, .tech-card, .stat-box');
    
    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        el.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // ===== 3. Workflow Step Animation =====
    const workflowSteps = document.querySelectorAll('.workflow-step');
    
    const stepObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });
    
    workflowSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        step.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        stepObserver.observe(step);
    });
    
    // ===== 4. Table Scroll Indicator =====
    const tableContainers = document.querySelectorAll('.logistics-table, .metrics-table');
    
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
    console.log('%c Operations Page Loaded ', 'color: #2ecc71; font-size: 12px;');
    console.log('%c Osmart company ', 'color: #9b59b6; font-size: 12px;');
    
});

// ===== 6. Page Visibility Handler =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        sessionStorage.setItem('sakha-china-operations-scroll', window.scrollY);
    } else {
        const scrollPos = sessionStorage.getItem('sakha-china-operations-scroll');
        if (scrollPos) {
            window.scrollTo(0, parseInt(scrollPos));
        }
    }
});

// ===== 7. Keyboard Navigation =====
document.addEventListener('keydown', function(e) {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (e.key === 'ArrowRight' && currentPage === 'Operations.html') {
        window.location.href = 'Platform.html';
    }
    
    if (e.key === 'ArrowLeft' && currentPage === 'Operations.html') {
        window.location.href = 'Business.html';
    }
});