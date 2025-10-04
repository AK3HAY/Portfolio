document.addEventListener('DOMContentLoaded', () => {

    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('loaded');
    });

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    const interactiveElements = document.querySelectorAll('a, button, .btn, .skill-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => cursorOutline.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
    });

    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const typingElement = document.getElementById('typing-effect');
    const words = ["Crafting Solutions with Code", "Innovating with Data", "Building Digital Experiences"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        let text = '';
        if (isDeleting) {
            text = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            text = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        typingElement.textContent = text;
        const typeSpeed = isDeleting ? 75 : 150;

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, typeSpeed);
    }
    type();
    
    const revealElements = document.querySelectorAll('.anim-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                if(entry.target.classList.contains('skills-container')) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach(item => item.classList.add('revealed'));
                }
            }
        });
    }, {
        threshold: 0.15
    });
    revealElements.forEach(el => observer.observe(el));
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });
    sections.forEach(section => navObserver.observe(section));

    function init3DTilt() {
        const cards = document.querySelectorAll('.project-card');

        cards.forEach(card => {
            const cardInner = card.querySelector('.project-card-inner');
            const glare = card.querySelector('.project-card-glare');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                cardInner.style.transform = `scale(1.05) perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                cardInner.style.boxShadow = '0 30px 50px rgba(0,0,0,0.5)';

                glare.style.opacity = '1';
                glare.style.transform = `translateX(${x - rect.width * 0.25}px) translateY(${y - rect.height * 0.25}px) rotate(45deg)`;
                
                cursorOutline.classList.add('hovered');
            });

            card.addEventListener('mouseleave', () => {
                cardInner.style.transform = `scale(1) perspective(1500px) rotateX(0deg) rotateY(0deg)`;
                cardInner.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                glare.style.opacity = '0';
                cursorOutline.classList.remove('hovered');
            });
        });
    }
    init3DTilt();

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = () => {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00A3FF" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": false }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.3 } } }
            },
            "retina_detect": true
        });
    };
    document.body.appendChild(script);
});
