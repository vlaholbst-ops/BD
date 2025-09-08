document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const progressBar = document.getElementById('progressBar');
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const fadeElements = document.querySelectorAll('.problem-card, .benefit-card, .step, .explanation-point');

    // Progress Bar
    function updateProgressBar() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }

    // Header Scroll Effect
    function updateHeaderOnScroll() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(30, 64, 175, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }

    // Back to Top Button
    function updateBackToTop() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Active Navigation Link
    function updateActiveNavLink() {
        const scrollTop = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Fade In Animation
    function checkFadeElements() {
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;

        fadeElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            
            if (scrollTop + windowHeight > elementTop + elementHeight / 4) {
                element.classList.add('fade-in', 'visible');
            }
        });
    }

    // Smooth Scroll for Navigation Links
    function smoothScrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Mobile Navigation Toggle
    function toggleMobileNav() {
        const nav = document.querySelector('.nav');
        nav.classList.toggle('mobile-active');
        navToggle.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    // Button Hover Effects
    function enhanceButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            button.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(0) scale(0.98)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            });
        });
    }

    // Parallax Effect for Hero Section
    function addParallaxEffect() {
        const hero = document.querySelector('.hero');
        const heroIcons = document.querySelectorAll('.hero-icon');
        
        if (hero && heroIcons.length > 0) {
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset;
                const rate = scrollTop * -0.5;
                
                if (scrollTop < hero.offsetHeight) {
                    heroIcons.forEach((icon, index) => {
                        const speed = (index + 1) * 0.1;
                        icon.style.transform = `translateY(${rate * speed}px)`;
                    });
                }
            });
        }
    }

    // Card Hover Effects
    function enhanceCardEffects() {
        const cards = document.querySelectorAll('.problem-card, .benefit-card, .explanation-point');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.03)';
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.zIndex = '1';
            });
        });
    }

    // Typing Effect for Hero Title
    function addTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.style.borderRight = '2px solid #1E40AF';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                } else {
                    setTimeout(() => {
                        heroTitle.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            // Start typing effect after a short delay
            setTimeout(typeWriter, 500);
        }
    }

    // Initialize fade elements
    function initializeFadeElements() {
        fadeElements.forEach(element => {
            element.classList.add('fade-in');
        });
    }

    // Enhanced scroll animations
    function addScrollAnimations() {
        const animatedElements = document.querySelectorAll('.hero-content > *, .hero-visual > *');
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150 + 200);
        });
    }

    // Enhance Form Button with special effects (НЕ перехватываем клики!)
    function enhanceFormButton() {
        const formButtons = document.querySelectorAll('.form-button, a[href*="forms.yandex.ru"]');
        
        formButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.boxShadow = '0 15px 35px rgba(30, 64, 175, 0.3)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });

            // Add click tracking for analytics (не мешает переходу по ссылке)
            button.addEventListener('click', function() {
                console.log('🎯 Переход к форме Яндекс:', this.href);
            });
        });

        // Add subtle pulse animation to form buttons
        const mainFormButton = document.querySelector('.form-button');
        if (mainFormButton) {
            setInterval(() => {
                if (!mainFormButton.matches(':hover')) {
                    mainFormButton.style.animation = 'pulse-subtle 3s ease-in-out';
                    setTimeout(() => {
                        mainFormButton.style.animation = '';
                    }, 3000);
                }
            }, 15000); // Каждые 15 секунд
        }
    }

    // Event Listeners
    let scrollTimeout;
    function debounceScroll(func, delay) {
        return function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(func, delay);
        };
    }

    window.addEventListener('scroll', debounceScroll(function() {
        updateProgressBar();
        updateHeaderOnScroll();
        updateBackToTop();
        updateActiveNavLink();
        checkFadeElements();
    }, 16)); // 60fps

    // Navigation Links Click Handler (только для внутренних ссылок!)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Обрабатываем только якорные ссылки (начинающиеся с #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                smoothScrollToSection(targetId);
                
                // Close mobile nav if open
                const nav = document.querySelector('.nav');
                if (nav && nav.classList.contains('mobile-active')) {
                    toggleMobileNav();
                }
            }
            // Внешние ссылки обрабатываем стандартно (не перехватываем)
        });
    });

    // Back to Top Click Handler
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile Navigation Toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('.nav');
        if (nav && navToggle) {
            const isNavClick = nav.contains(e.target) || navToggle.contains(e.target);
            
            if (!isNavClick && nav.classList.contains('mobile-active')) {
                toggleMobileNav();
            }
        }
    });

    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const nav = document.querySelector('.nav');
            if (nav && nav.classList.contains('mobile-active')) {
                toggleMobileNav();
            }
        }
    });

    // Initialize everything
    function initialize() {
        initializeFadeElements();
        enhanceButtonEffects();
        enhanceCardEffects();
        addParallaxEffect();
        enhanceFormButton(); // Только эффекты, без перехвата кликов
        
        // Initial calls
        updateProgressBar();
        updateHeaderOnScroll();
        updateBackToTop();
        updateActiveNavLink();
        checkFadeElements();
        
        // Add scroll animations and typing effect after page load
        setTimeout(() => {
            addScrollAnimations();
            addTypingEffect();
        }, 200);
    }

    // Add CSS for mobile navigation and animations
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: var(--space-20);
                box-shadow: 0 10px 30px rgba(30, 64, 175, 0.1);
                transform: translateY(-20px);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                border-radius: 0 0 12px 12px;
            }
            
            .nav.mobile-active {
                display: flex;
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-link {
                padding: var(--space-12) 0;
                border-bottom: 1px solid rgba(30, 64, 175, 0.1);
                text-align: center;
                font-size: var(--font-size-lg);
            }
            
            .nav-link:last-child {
                border-bottom: none;
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
        
        @keyframes pulse {
            0%, 100% { 
                transform: scale(1); 
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            50% { 
                transform: scale(1.05); 
                box-shadow: 0 20px 40px rgba(30, 64, 175, 0.2);
            }
        }

        @keyframes pulse-subtle {
            0%, 100% { 
                transform: scale(1);
            }
            50% { 
                transform: scale(1.02);
            }
        }
        
        /* Initial loading states */
        .hero-content > *,
        .hero-visual > * {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        body.loaded .hero-content > *,
        body.loaded .hero-visual > * {
            opacity: 1;
            transform: translateY(0);
        }

        /* Form button special effects */
        .form-button {
            position: relative;
            overflow: hidden;
        }

        .form-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }

        .form-button:hover::before {
            left: 100%;
        }
    `;
    document.head.appendChild(style);

    // Initialize when DOM is ready
    initialize();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    console.log('🚀 База знаний будущего инициализирована! Форма Яндекс открывается в новой вкладке.');
});