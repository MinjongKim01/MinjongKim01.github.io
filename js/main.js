// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Dark mode toggle event listener
darkModeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Add animation effect
    darkModeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        darkModeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

function setActiveNavLink() {
    const scrollPosition = window.scrollY;
    const navHeight = document.getElementById('navbar').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Navbar background on scroll
const navbar = document.getElementById('navbar');

function updateNavbarOnScroll() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}

// Scroll event listeners
window.addEventListener('scroll', () => {
    setActiveNavLink();
    updateNavbarOnScroll();
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to cards
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.topic-card, .project-card, .education-item, .skill-category'
    );

    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(element);
    });
});

// Scroll to top button (optional)
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--accent-primary);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-5px)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
});

// Initialize on page load
setActiveNavLink();
updateNavbarOnScroll();

// Handle external link clicks (open in new tab)
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Links with target="_blank" will open in new tab automatically
        // This is just for additional tracking or analytics if needed
    });
});

// Print current year in footer (if you want dynamic year)
const updateFooterYear = () => {
    const yearElements = document.querySelectorAll('footer p');
    yearElements.forEach(element => {
        if (element.textContent.includes('2025')) {
            element.textContent = element.textContent.replace('2025', new Date().getFullYear());
        }
    });
};

updateFooterYear();

// Smooth reveal for hero section on page load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-primary);
    }

    .nav-link.active::after {
        width: 100%;
    }

    .scroll-to-top:hover {
        background: var(--accent-hover) !important;
    }

    .project-item.hidden {
        display: none;
    }
`;
document.head.appendChild(style);

// Project Tabs Filtering
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectItems = document.querySelectorAll('.project-item');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Get filter value
            const filter = button.getAttribute('data-filter');

            // Filter projects
            projectItems.forEach(item => {
                const status = item.getAttribute('data-status');

                if (filter === 'all') {
                    item.classList.remove('hidden');
                    item.style.display = 'flex';
                } else if (status === filter) {
                    item.classList.remove('hidden');
                    item.style.display = 'flex';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });

            // Add fade-in animation to visible projects
            const visibleProjects = document.querySelectorAll('.project-item:not(.hidden)');
            visibleProjects.forEach((project, index) => {
                project.style.opacity = '0';
                project.style.transform = 'translateX(-20px)';

                setTimeout(() => {
                    project.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    project.style.opacity = '1';
                    project.style.transform = 'translateX(0)';
                }, index * 100);
            });
        });
    });
});
