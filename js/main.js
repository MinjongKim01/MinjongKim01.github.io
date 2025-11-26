/* -------------------------------------------------------------------------- */
/*                              Project Filtering                             */
/* -------------------------------------------------------------------------- */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-row');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projects.forEach(project => {
                if (filterValue === 'all' || project.getAttribute('data-status') === filterValue) {
                    project.classList.remove('hidden');
                    // Add fade in animation
                    project.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    project.classList.add('hidden');
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initSmoothScroll();
    initScrollSpy();
    initRevealAnimations();
    initProjectFilters();
    initNewsScrollHints();
    initProjectImageSliders();
});

/* -------------------------------------------------------------------------- */
/*                                Theme Toggle                                */
/* -------------------------------------------------------------------------- */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        html.setAttribute('data-theme', 'dark');
    }

    // Toggle handler
    toggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Simple rotation animation
        toggleBtn.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            toggleBtn.style.transform = 'none';
        }, 300);
    });
}

/* -------------------------------------------------------------------------- */
/*                               Smooth Scroll                                */
/* -------------------------------------------------------------------------- */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const navHeight = 72; // Match CSS var --nav-height

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* -------------------------------------------------------------------------- */
/*                                 Scroll Spy                                 */
/* -------------------------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navHeight = 80;

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - navHeight - 50)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            link.style.color = ''; // Reset inline style
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
                link.style.color = 'var(--primary)';
            }
        });
    });
}

/* -------------------------------------------------------------------------- */
/*                          News Scroll Hints                                 */
/* -------------------------------------------------------------------------- */
function initNewsScrollHints() {
    const newsContainer = document.getElementById('news-scroll');
    const hintTop = document.getElementById('scroll-hint-top');
    const hintBottom = document.getElementById('scroll-hint-bottom');

    if (!newsContainer || !hintTop || !hintBottom) return;

    function updateHints() {
        const { scrollTop, scrollHeight, clientHeight } = newsContainer;

        // Show top hint if scrolled down
        if (scrollTop > 10) {
            hintTop.classList.add('visible');
        } else {
            hintTop.classList.remove('visible');
        }

        // Show bottom hint if not at bottom
        if (scrollTop + clientHeight < scrollHeight - 10) {
            hintBottom.classList.add('visible');
        } else {
            hintBottom.classList.remove('visible');
        }
    }

    // Initial check
    updateHints();

    // Update on scroll
    newsContainer.addEventListener('scroll', updateHints);
}

/* -------------------------------------------------------------------------- */
/*                     Check if all images failed to load                     */
/* -------------------------------------------------------------------------- */
function checkAllImagesFailed(img) {
    const container = img.closest('.project-row-img');
    const row = img.closest('.project-row');
    const allImages = container.querySelectorAll('img');

    // Check if all images are hidden
    const allHidden = Array.from(allImages).every(i => i.style.display === 'none');

    if (allHidden) {
        row.classList.add('no-image');
    }
}

/* -------------------------------------------------------------------------- */
/*                          Project Image Sliders                             */
/* -------------------------------------------------------------------------- */
function initProjectImageSliders() {
    const projectContainers = document.querySelectorAll('.project-row-img');

    projectContainers.forEach(container => {
        const images = Array.from(container.querySelectorAll('img'));

        if (images.length <= 1) return;

        let loadedCount = 0;

        function setupSlider() {
            // Get images that are not hidden
            const visibleImages = images.filter(img => img.style.display !== 'none');

            if (visibleImages.length <= 1) return;

            container.classList.add('has-slider');

            let currentIndex = 0;
            visibleImages[0].classList.add('active');

            // Create navigation buttons
            const prevBtn = document.createElement('button');
            prevBtn.className = 'img-nav prev';
            prevBtn.innerHTML = '‹';
            prevBtn.setAttribute('aria-label', 'Previous image');

            const nextBtn = document.createElement('button');
            nextBtn.className = 'img-nav next';
            nextBtn.innerHTML = '›';
            nextBtn.setAttribute('aria-label', 'Next image');

            container.appendChild(prevBtn);
            container.appendChild(nextBtn);

            function updateImages() {
                visibleImages.forEach((img, idx) => {
                    img.classList.toggle('active', idx === currentIndex);
                });
            }

            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
                updateImages();
            });

            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentIndex = (currentIndex + 1) % visibleImages.length;
                updateImages();
            });
        }

        // Wait for all images to load or error
        images.forEach(img => {
            if (img.complete) {
                loadedCount++;
                if (loadedCount === images.length) {
                    setupSlider();
                }
            } else {
                img.addEventListener('load', () => {
                    loadedCount++;
                    if (loadedCount === images.length) {
                        setupSlider();
                    }
                });
                img.addEventListener('error', () => {
                    loadedCount++;
                    if (loadedCount === images.length) {
                        setupSlider();
                    }
                });
            }
        });
    });
}

/* -------------------------------------------------------------------------- */
/*                             Reveal Animations                              */
/* -------------------------------------------------------------------------- */
function initRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const elements = document.querySelectorAll('.project-card, .news-item, .exp-item, .info-card');

    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        // Add slight stagger delay based on index (modulo to reset for new sections)
        el.style.transitionDelay = `${(index % 3) * 0.1}s`;

        observer.observe(el);
    });

    // Add visible class styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}
