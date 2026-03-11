 ===== SAKHA-CHINA RISKS PAGE =====

document.addEventListener('DOMContentLoaded', function() {
    
     ===== 1. Active Navigation =====
    const currentPage = window.location.pathname.split('').pop();
    const navLinks = document.querySelectorAll('.header-nav a');
    
    navLinks.forEach(link = {
        const linkHref = link.getAttribute('href');
        if (linkHref && currentPage === linkHref) {
            link.classList.add('active');
        }
    });
    
     ===== 2. Matrix Cell Hover =====
    const matrixCells = document.querySelectorAll('.matrix-cell');
    
    matrixCells.forEach(cell = {
        cell.addEventListener('mouseenter', function() {
            const riskInfo = this.getAttribute('data-risk');
            console.log('Risk', riskInfo);
        });
    });
    
     ===== 3. Critical Risk Card Animation =====
    const criticalRiskCards = document.querySelectorAll('.critical-risk-card');
    
    const riskCardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) = {
            if (entry.isIntersecting) {
                setTimeout(() = {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index  100);
            }
        });
    }, { threshold 0.1 });
    
    criticalRiskCards.forEach(card = {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        riskCardObserver.observe(card);
    });
    
     ===== 4. Mitigation Card Animation =====
    const mitigationCards = document.querySelectorAll('.mitigation-card');
    
    const mitigationObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) = {
            if (entry.isIntersecting) {
                setTimeout(() = {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index  100);
            }
        });
    }, { threshold 0.2 });
    
    mitigationCards.forEach(card = {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        mitigationObserver.observe(card);
    });
    
     ===== 5. KPI Card Animation =====
    const kpiCards = document.querySelectorAll('.kpi-card');
    
    const kpiObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) = {
            if (entry.isIntersecting) {
                setTimeout(() = {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index  150);
            }
        });
    }, { threshold 0.2 });
    
    kpiCards.forEach(card = {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        kpiObserver.observe(card);
    });
    
     ===== 6. Contingency Card Animation =====
    const contingencyCards = document.querySelectorAll('.contingency-card');
    
    const contingencyObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) = {
            if (entry.isIntersecting) {
                setTimeout(() = {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index  100);
            }
        });
    }, { threshold 0.1 });
    
    contingencyCards.forEach(card = {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        contingencyObserver.observe(card);
    });
    
     ===== 7. Table Scroll Indicator =====
    const tableContainers = document.querySelectorAll('.risks-table');
    
    tableContainers.forEach(container = {
        container.addEventListener('scroll', function() {
            if (this.scrollLeft  0) {
                this.style.boxShadow = '4px 0 8px rgba(0,0,0,0.2) inset';
            } else {
                this.style.boxShadow = 'none';
            }
        });
    });
    
     ===== 8. Console Info =====
    console.log('%c SAKHA-CHINA ', 'background #3498db; color #fff; font-size 16px; font-weight bold; padding 4px 8px;');
    console.log('%c Risks Page Loaded ', 'color #e74c3c; font-size 12px;');
    console.log('%c Osmart company ', 'color #9b59b6; font-size 12px;');
    console.log('%c 45 Identified Risks, 12 Critical ', 'color #f39c12; font-size 12px;');
    
});

 ===== 9. Page Visibility Handler =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        sessionStorage.setItem('sakha-china-risks-scroll', window.scrollY);
    } else {
        const scrollPos = sessionStorage.getItem('sakha-china-risks-scroll');
        if (scrollPos) {
            window.scrollTo(0, parseInt(scrollPos));
        }
    }
});

 ===== 10. Keyboard Navigation =====
document.addEventListener('keydown', function(e) {
    const currentPage = window.location.pathname.split('').pop();
    
    if (e.key === 'ArrowRight' && currentPage === 'Risks.html') {
        window.location.href = 'Calculator.html';
    }
    
    if (e.key === 'ArrowLeft' && currentPage === 'Risks.html') {
        window.location.href = 'Platform.html';
    }
});