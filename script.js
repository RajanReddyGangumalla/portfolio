// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);

    // Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.transform = navMenu.classList.contains('active') 
                ? getTransform(index) 
                : 'none';
        });
    });

    function getTransform(index) {
        const transforms = [
            'rotate(45deg) translate(5px, 5px)',
            'opacity: 0',
            'rotate(-45deg) translate(7px, -6px)'
        ];
        return transforms[index];
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
            });
        });
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '-100px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = '#' + entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === targetId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Animate Elements on Scroll
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .certificate-card, .timeline-item');
    
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateObserver.observe(element);
    });

    // Skill Progress Animation
    const skillProgress = document.querySelectorAll('.skill-progress');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.style.width;
                progress.style.width = '0';
                setTimeout(() => {
                    progress.style.width = width;
                }, 200);
            }
        });
    }, {
        threshold: 0.5
    });

    skillProgress.forEach(progress => {
        progressObserver.observe(progress);
    });

    // Typing Effect for Hero Title
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const name = nameElement.textContent;
        nameElement.textContent = '';
        let index = 0;
        
        function typeWriter() {
            if (index < name.length) {
                nameElement.textContent += name.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 2000);
    }

    // Parallax Effect for Hero Section
    const heroSection = document.querySelector('.hero');
    const particles = document.querySelector('.particles');
    const gradientOrb = document.querySelector('.gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (particles) {
            particles.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
        
        if (gradientOrb) {
            gradientOrb.style.transform = `translateY(${scrolled * parallaxSpeed * 0.8}px)`;
        }
    });

    // Project Card Hover Effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const projectImage = card.querySelector('.project-image');
            if (projectImage) {
                projectImage.style.transform = 'scale(1.05)';
                projectImage.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', (e) => {
            const projectImage = card.querySelector('.project-image');
            if (projectImage) {
                projectImage.style.transform = 'scale(1)';
            }
        });
    });

    // Certificate Card Hover Effect
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const icon = card.querySelector('.certificate-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', (e) => {
            const icon = card.querySelector('.certificate-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Contact Form
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Show success message (in real implementation, you would send to server)
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });
        
        // Set background color based on type
        const colors = {
            success: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
            error: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
            info: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
        };
        notification.style.background = colors[type] || colors.info;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add some CSS for notifications
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }
    `;
    document.head.appendChild(notificationStyles);

    // Cursor Trail Effect (optional, for extra interactivity)
    let cursorTrail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) { // Only on desktop
            createCursorTrail(e.clientX, e.clientY);
        }
    });
    
    function createCursorTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        Object.assign(trail.style, {
            position: 'fixed',
            width: '8px',
            height: '8px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9999',
            opacity: '0.6',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.5s ease, transform 0.5s ease'
        });
        
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        
        document.body.appendChild(trail);
        cursorTrail.push(trail);
        
        // Remove old trails
        if (cursorTrail.length > maxTrailLength) {
            const oldTrail = cursorTrail.shift();
            oldTrail.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(oldTrail);
            }, 500);
        }
        
        // Fade out current trail
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'translate(-50%, -50%) scale(0)';
        }, 100);
    }

    // Performance optimization - throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            // Scroll-based animations here
        });
    });

    // Easter Egg: Konami Code
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiPattern.join(',')) {
            activateEasterEgg();
        }
    });
    
    function activateEasterEgg() {
        document.body.style.animation = 'rainbow 2s ease-in-out';
        showNotification('🎉 Easter Egg activated! You found the secret!', 'success');
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);

    // Initialize tooltips (if needed)
    const initTooltips = () => {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = element.getAttribute('data-tooltip');
                Object.assign(tooltip.style, {
                    position: 'absolute',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    fontSize: '0.9rem',
                    zIndex: '10000',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap'
                });
                
                document.body.appendChild(tooltip);
                
                const rect = element.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                
                element.addEventListener('mouseleave', () => {
                    document.body.removeChild(tooltip);
                }, { once: true });
            });
        });
    };

    // Initialize everything when page loads
    console.log('🚀 Modern Portfolio Initialized');
    console.log('💡 Try the Konami Code for an Easter Egg!');
});
