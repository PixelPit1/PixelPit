document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Cambio de tema
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        updateThemeIcon();
        localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        updateThemeIcon();
    }

    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Animación de aparición al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.service-card, .project-card, .team-member, .process-step, .tech-item, .testimonial-item, .blog-card');
    animatedElements.forEach((el) => observer.observe(el));

    // Animación de la barra de navegación
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            document.querySelector('header').style.top = '-80px';
        } else {
            document.querySelector('header').style.top = '0';
        }
        lastScrollTop = scrollTop;
    });

    // Animación de conteo para estadísticas
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const statsSection = document.getElementById('estadisticas');
    const statElements = statsSection.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            statElements.forEach(stat => {
                const endValue = parseInt(stat.getAttribute('data-target'));
                animateValue(stat, 0, endValue, 2000);
            });
            statsObserver.unobserve(statsSection);
        }
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);

    // Carrusel de testimonios
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    setInterval(nextTestimonial, 5000);

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Validación de formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Aquí iría la lógica de envío del formulario
            alert('Gracias por tu mensaje. Te contactaremos pronto.');
            contactForm.reset();
        });
    }

    // Animación de habilidades técnicas
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.1) rotate(5deg)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Lazy loading para imágenes
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                lazyLoadObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => lazyLoadObserver.observe(img));

    // Animación de typing para el título principal
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        typeWriter();
    }

    // Parallax effect para la sección hero
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const hero = document.querySelector('.hero');
        hero.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
    });

    // Toggle para preguntas frecuentes (si se añade una sección FAQ)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Animación para el botón "back to top"
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

