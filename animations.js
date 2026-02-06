// ملف للتأثيرات التفاعلية والانيميشن
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: false,
        offset: 100,
        delay: 100
    });
    
    // شريط التنقل المتحرك
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('shadow-lg', 'py-3');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('shadow-lg', 'py-3');
            navbar.classList.add('py-4');
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            // التمرير لأسفل - إخفاء النافبار
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // التمرير لأعلى - إظهار النافبار
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // زر العودة للأعلى
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (scrollTop > 300) {
                backToTop.classList.remove('opacity-0', 'invisible');
                backToTop.classList.add('opacity-100', 'visible');
            } else {
                backToTop.classList.remove('opacity-100', 'visible');
                backToTop.classList.add('opacity-0', 'invisible');
            }
        }
    });
    
    // زر العودة للأعلى
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // تأثيرات الروابط
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // تأثير الكارد عند المرور
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // تأثيرات الصور
    const carImages = document.querySelectorAll('.car-image-hover');
    carImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // تأثيرات الأزرار
    const gradientButtons = document.querySelectorAll('.btn-gradient');
    gradientButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // تأثير الكتابة في العنوان
    const typewriterText = document.querySelector('.typewriter');
    if (typewriterText) {
        setTimeout(() => {
            typewriterText.style.animation = 'none';
            setTimeout(() => {
                typewriterText.style.animation = 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite';
            }, 50);
        }, 4000);
    }
    
    // العد المتصاعد للإحصائيات
    function animateCounters() {
        const counters = document.querySelectorAll('.count-up');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString();
            }, 20);
        });
    }
    
    // تحقق من ظهور العدادات في الشاشة
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.hero-bg');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // تأثيرات الفئات
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(360deg) scale(1.2)';
            icon.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(0) scale(1)';
        });
    });
    
    // تأثير الظل المتدرج
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.card-hover');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width * 100;
            const yPercent = y / rect.height * 100;
            
            card.style.setProperty('--mouse-x', `${xPercent}%`);
            card.style.setProperty('--mouse-y', `${yPercent}%`);
        });
    });
    
    // تأثيرات النموذج
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('ring-2', 'ring-blue-500');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('ring-2', 'ring-blue-500');
        });
    });
    
    // تأثيرات الشعار
    const logo = document.querySelector('.fa-car');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(360deg)';
            this.style.transition = 'transform 0.8s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0)';
        });
    }
});