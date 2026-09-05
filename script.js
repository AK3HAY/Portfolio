document.addEventListener('DOMContentLoaded', () => {

    /* ================================
       PRELOADER
    ================================= */
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('loaded');
        }
    });


    /* ================================
       CUSTOM CURSOR
    ================================= */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate(
                {
                    left: `${posX}px`,
                    top: `${posY}px`
                },
                {
                    duration: 500,
                    fill: 'forwards'
                }
            );
        });

        const interactiveElements = document.querySelectorAll(
            'a, button, .btn, .skill-item'
        );

        interactiveElements.forEach((element) => {
            element.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hovered');
            });

            element.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hovered');
            });
        });
    }


    /* ================================
       HEADER SCROLL EFFECT
    ================================= */
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }


    /* ================================
       MOBILE NAVIGATION
    ================================= */
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('show-menu');

            const isOpen = navList.classList.contains('show-menu');

            navToggle.setAttribute(
                'aria-expanded',
                isOpen ? 'true' : 'false'
            );

            const icon = navToggle.querySelector('i');

            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-xmark', isOpen);
            }
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navList.classList.remove('show-menu');

                navToggle.setAttribute('aria-expanded', 'false');

                const icon = navToggle.querySelector('i');

                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }


    /* ================================
       TYPING EFFECT
    ================================= */
    const typingElement = document.getElementById('typing-effect');

    const words = [
        'Flutter Developer',
        'Software Engineer',
        'Mobile App Developer',
        'Python Developer'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingElement) return;

        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;
        } else {
            typingElement.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;
        }

        let typeSpeed = isDeleting ? 70 : 130;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            setTimeout(() => {
                isDeleting = true;
            }, typeSpeed);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();


    /* ================================
       SCROLL REVEAL ANIMATION
    ================================= */
    const revealElements = document.querySelectorAll('.anim-reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');

                        if (
                            entry.target.classList.contains(
                                'skills-container'
                            )
                        ) {
                            const skillItems =
                                entry.target.querySelectorAll('.skill-item');

                            skillItems.forEach((item) => {
                                item.classList.add('revealed');
                            });
                        }

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add('revealed');
        });
    }


    /* ================================
       ACTIVE NAVIGATION LINK
    ================================= */
    const sections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('.nav-link');

    if ('IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');

                        navigationLinks.forEach((link) => {
                            link.classList.remove('active-link');

                            if (
                                link.getAttribute('href') === `#${id}`
                            ) {
                                link.classList.add('active-link');
                            }
                        });
                    }
                });
            },
            {
                rootMargin: '-30% 0px -70% 0px'
            }
        );

        sections.forEach((section) => {
            navObserver.observe(section);
        });
    }


    /* ================================
       3D PROJECT CARD TILT
    ================================= */
    function init3DTilt() {
        const cards = document.querySelectorAll('.project-card');

        cards.forEach((card) => {
            const cardInner =
                card.querySelector('.project-card-inner');

            const glare =
                card.querySelector('.project-card-glare');

            if (!cardInner || !glare) return;

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -8;

                const rotateY =
                    ((x - centerX) / centerX) * 8;

                cardInner.style.transform =
                    `perspective(1500px) 
                     rotateX(${rotateX}deg) 
                     rotateY(${rotateY}deg) 
                     scale(1.03)`;

                cardInner.style.boxShadow =
                    '0 25px 45px rgba(0, 0, 0, 0.4)';

                glare.style.opacity = '1';

                glare.style.transform =
                    `translate(${x - rect.width * 0.25}px,
                               ${y - rect.height * 0.25}px)
                     rotate(45deg)`;

                if (cursorOutline) {
                    cursorOutline.classList.add('hovered');
                }
            });

            card.addEventListener('mouseleave', () => {
                cardInner.style.transform =
                    'perspective(1500px) rotateX(0deg) rotateY(0deg) scale(1)';

                cardInner.style.boxShadow =
                    '0 10px 20px rgba(0, 0, 0, 0.2)';

                glare.style.opacity = '0';

                if (cursorOutline) {
                    cursorOutline.classList.remove('hovered');
                }
            });
        });
    }

    init3DTilt();


    /* ================================
       PARTICLES.JS
    ================================= */
    function loadParticles() {
        const particlesContainer =
            document.getElementById('particles-js');

        if (!particlesContainer) return;

        if (typeof particlesJS !== 'undefined') {
            initializeParticles();
            return;
        }

        const script = document.createElement('script');

        script.src =
            'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';

        script.onload = () => {
            initializeParticles();
        };

        script.onerror = () => {
            console.warn('Particles.js failed to load.');
        };

        document.body.appendChild(script);
    }

    function initializeParticles() {
        if (typeof particlesJS === 'undefined') return;

        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 55,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },

                color: {
                    value: '#00A3FF'
                },

                shape: {
                    type: 'circle'
                },

                opacity: {
                    value: 0.45,
                    random: true
                },

                size: {
                    value: 3,
                    random: true
                },

                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.1,
                    width: 1
                },

                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },

            interactivity: {
                detect_on: 'canvas',

                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },

                    onclick: {
                        enable: false
                    },

                    resize: true
                },

                modes: {
                    grab: {
                        distance: 140,

                        line_linked: {
                            opacity: 0.3
                        }
                    }
                }
            },

            retina_detect: true
        });
    }

    loadParticles();


    /* ================================
       REDUCED MOTION SUPPORT
    ================================= */
    const prefersReducedMotion =
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

    if (prefersReducedMotion) {
        document.documentElement.classList.add(
            'reduce-motion'
        );
    }


    /* ================================
       UPDATE CURRENT YEAR
    ================================= */
    const yearElement =
        document.querySelector('.footer-copy');

    if (yearElement) {
        const currentYear = new Date().getFullYear();

        yearElement.innerHTML =
            `&#169; ${currentYear} Mekala Akshay. All rights reserved.`;
    }

});
