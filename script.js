// Theme management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.theme);
        
        // Add event listener to theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update theme toggle button aria-label
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', 
                theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
            );
            // Update icon visibility explicitly to avoid any flash
            const sun = themeToggle.querySelector('.sun-icon');
            const moon = themeToggle.querySelector('.moon-icon');
            if (sun && moon) {
                if (theme === 'dark') {
                    sun.style.display = 'block';
                    moon.style.display = 'none';
                } else {
                    sun.style.display = 'none';
                    moon.style.display = 'block';
                }
            }
        }
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Mobile navigation management
class MobileNavigation {
    constructor() {
        this.menuOpen = false;
        this.init();
    }

    init() {
        const mobileButton = document.getElementById('toggle-navigation-menu');
        const header = document.getElementById('main-header');
        
        if (mobileButton && header) {
            mobileButton.addEventListener('click', () => {
                this.toggleMenu(header, mobileButton);
            });
        }

        // Close menu when clicking on navigation links (mobile)
        const navLinks = document.querySelectorAll('#navigation-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.menuOpen && header && mobileButton) {
                    this.toggleMenu(header, mobileButton);
                }
            });
        });

        // Close menu when clicking outside (mobile)
        document.addEventListener('click', (e) => {
            if (this.menuOpen && 
                !e.target.closest('#main-header') && 
                header && mobileButton) {
                this.toggleMenu(header, mobileButton);
            }
        });

        // Handle touch events for better mobile interaction
        document.addEventListener('touchstart', (e) => {
            if (this.menuOpen && 
                !e.target.closest('#main-header') && 
                header && mobileButton) {
                this.toggleMenu(header, mobileButton);
            }
        }, { passive: true });

        // Handle escape key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.menuOpen && header && mobileButton) {
                this.toggleMenu(header, mobileButton);
            }
        });
    }

    toggleMenu(header, button) {
        this.menuOpen = !this.menuOpen;
        
        if (this.menuOpen) {
            header.classList.add('menu-open');
            document.body.classList.add('menu-open');
            // Prevent background scrolling on mobile
            document.body.style.overflow = 'hidden';
        } else {
            header.classList.remove('menu-open');
            document.body.classList.remove('menu-open');
            // Restore background scrolling
            document.body.style.overflow = '';
        }
        
        button.setAttribute('aria-expanded', this.menuOpen.toString());
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Handle navigation link clicks
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');

                // Bare "#" (the logo) scrolls back to the top of the page
                if (targetId === '#') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    history.pushState(null, null, window.location.pathname + window.location.search);
                    return;
                }

                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Compute dynamic offset based on actual header height
                    const header = document.getElementById('main-header');
                    const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
                    const extraMargin = 8; // small breathing room below the header
                    const targetRect = targetElement.getBoundingClientRect();
                    const targetPosition = window.pageYOffset + targetRect.top - (headerHeight + extraMargin);
                    
                    // Immediately update active state for better UX
                    const sectionId = targetId.substring(1);
                    const navigationHighlight = window.navigationHighlightInstance;
                    if (navigationHighlight) {
                        navigationHighlight.highlightNavLink(sectionId);
                    }
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without triggering scroll
                    history.pushState(null, null, targetId);
                }
            });
        });
    }
}

// Active navigation link highlighting
class NavigationHighlight {
    constructor() {
        this.sections = [];
        this.navLinks = [];
        this.init();
    }

    init() {
        // Get all sections and navigation links
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('#navigation-menu a[href^="#"]');
        
        if (this.sections.length > 0 && this.navLinks.length > 0) {
            // Set initial active state based on URL hash only
            this.setInitialActiveState();
            
            // Handle hash changes (but no scroll-based highlighting)
            window.addEventListener('hashchange', () => {
                this.handleHashChange();
            });
        }
    }

    setInitialActiveState() {
        const hash = window.location.hash;
        if (hash && hash !== '#') {
            const targetId = hash.substring(1);
            this.highlightNavLink(targetId);
        }
        // No default active state - only highlight when there's a hash in URL
    }

    handleHashChange() {
        const hash = window.location.hash;
        if (hash && hash !== '#') {
            const targetId = hash.substring(1);
            this.highlightNavLink(targetId);
        } else {
            // Clear all active states when there's no hash
            this.clearAllActiveStates();
        }
    }

    highlightNavLink(activeId) {
        // Remove active class from all links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });

        // Add active class to current link
        const activeLink = document.querySelector(`#navigation-menu a[href="#${activeId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('aria-current', 'page');
        }
    }

    // Method to clear all active states (useful for debugging)
    clearAllActiveStates() {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
    }
}

// Performance optimization: Lazy load images if any are added
class LazyImageLoader {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
}

// Markdown content loader
class MarkdownLoader {
    constructor() {
        this.sections = ['about', 'publications', 'building', 'research', 'experience', 'education', 'credentials'];
        this.init();
    }

    init() {
        // Load all markdown sections
        this.sections.forEach(section => {
            this.loadMarkdown(section);
        });
    }

    async loadMarkdown(section) {
        const contentElement = document.getElementById(`${section}-content`);
        if (!contentElement) return;

        // Try multiple path strategies for better compatibility
        const pathsToTry = [
            `./${section}.md`,           // Relative to current directory
            `${section}.md`,             // Direct relative path
            `/${section}.md`             // Absolute from root (for some GitHub Pages setups)
        ];

        let lastError = null;
        
        for (const fullPath of pathsToTry) {
            try {
                console.log(`Trying to fetch: ${fullPath}`);
                const response = await fetch(fullPath);
                if (response.ok) {
                    const markdown = await response.text();
                    const html = this.parseMarkdown(markdown);
                    contentElement.innerHTML = html;
                    // Above-the-fold profile image should load eagerly
                    const avatar = contentElement.querySelector('.about-avatar');
                    if (avatar) {
                        avatar.setAttribute('loading', 'eager');
                    }
                    // Résumé link: only show if the PDF actually exists
                    const resumeLink = contentElement.querySelector('.resume-link');
                    if (resumeLink) {
                        fetch(resumeLink.getAttribute('href'), { method: 'HEAD' })
                            .then((res) => {
                                if (res.ok) {
                                    resumeLink.hidden = false;
                                    resumeLink.style.display = 'inline-flex';
                                }
                            })
                            .catch(() => { /* keep hidden */ });
                    }
                    // Apply subtle reveal transitions to new content (interface only)
                    if (typeof window.applyRevealEffect === 'function') {
                        window.applyRevealEffect(contentElement);
                    }
                    console.log(`Successfully loaded ${section} from: ${fullPath}`);
                    return; // Success, exit early
                } else {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                console.warn(`Failed to load ${section} from ${fullPath}:`, error.message);
                lastError = error;
                // Continue to next path
            }
        }

        // If we get here, all paths failed
        console.error(`Error loading ${section} content - all paths failed:`, lastError);
        console.log(`Current location: ${window.location.href}`);
        contentElement.innerHTML = `
            <div class="error-message">
                <p>Sorry, unable to load ${section} content at this time.</p>
                <p><small>Last error: ${lastError?.message || 'Unknown error'}</small></p>
                <p><small>Tried paths: ${pathsToTry.join(', ')}</small></p>
            </div>
        `;
    }

    parseMarkdown(markdown) {
        let html = markdown;

        // Convert headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2 class="title">$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1 class="title">$1</h1>');

        // Convert bold text
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Convert italic text
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Convert links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="cactus-link">$1</a>');

        // Convert unordered lists
        html = html.replace(/^\s*- (.+)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

        // Convert paragraphs (split by double newlines)
        const paragraphs = html.split(/\n\s*\n/);
        html = paragraphs.map(p => {
            p = p.trim();
            if (!p) return '';
            
            // Skip if already wrapped in HTML tags
            if (p.startsWith('<') && p.endsWith('>')) return p;
            if (p.includes('<li>') || p.includes('<h') || p.includes('<ul>') || p.includes('<div')) return p;
            
            return `<p>${p}</p>`;
        }).join('\n\n');

        // Clean up nested tags
        html = html.replace(/<ul>\s*(<li>.*?<\/li>)\s*<\/ul>/gs, '<ul>$1</ul>');
        html = html.replace(/<li><\/li>/g, '');

        // Convert horizontal rules
        html = html.replace(/^---$/gm, '<hr>');

        return html;
    }
}

// Accessible lightbox for photography (opens only for loaded photos)
class PhotoLightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.image = this.lightbox ? this.lightbox.querySelector('.lightbox-image') : null;
        this.closeButton = this.lightbox ? this.lightbox.querySelector('.lightbox-close') : null;
        this.lastFocused = null;
        if (this.lightbox && this.image && this.closeButton) {
            this.init();
        }
    }

    init() {
        // Delegate clicks from any loaded photo (gallery + hero)
        document.addEventListener('click', (e) => {
            const figure = e.target.closest('.photo-item.has-photo, .hero-photo.has-photo');
            if (figure) {
                const img = figure.querySelector('img');
                if (img && img.src) {
                    this.open(img);
                }
                return;
            }

            // Close when clicking the backdrop (not the image)
            if (!this.lightbox.hidden && e.target === this.lightbox) {
                this.close();
            }
        });

        // Keyboard access: open with Enter/Space when a photo is focused
        document.querySelectorAll('.photo-item, .hero-photo').forEach((figure) => {
            figure.addEventListener('keydown', (e) => {
                if ((e.key === 'Enter' || e.key === ' ') && figure.classList.contains('has-photo')) {
                    e.preventDefault();
                    const img = figure.querySelector('img');
                    if (img && img.src) this.open(img);
                }
            });
        });

        this.closeButton.addEventListener('click', () => this.close());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.lightbox.hidden) {
                this.close();
            }
            // Arrow-key navigation between loaded photographs
            if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !this.lightbox.hidden) {
                e.preventDefault();
                this.step(e.key === 'ArrowRight' ? 1 : -1);
            }
            // Simple focus trap while open
            if (e.key === 'Tab' && !this.lightbox.hidden) {
                e.preventDefault();
                this.closeButton.focus();
            }
        });
    }

    open(img) {
        this.lastFocused = document.activeElement;
        this.gallery = Array.from(document.querySelectorAll('.photo-item.has-photo img, .hero-photo.has-photo img'));
        this.index = this.gallery.indexOf(img);
        this.show(img);
        this.lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        this.closeButton.focus();
    }

    show(img) {
        this.image.src = img.src;
        this.image.alt = img.alt || '';
    }

    step(dir) {
        if (!this.gallery || this.gallery.length < 2) return;
        this.index = (this.index + dir + this.gallery.length) % this.gallery.length;
        this.show(this.gallery[this.index]);
    }

    close() {
        this.lightbox.hidden = true;
        this.image.removeAttribute('src');
        document.body.style.overflow = '';
        if (this.lastFocused && typeof this.lastFocused.focus === 'function') {
            this.lastFocused.focus();
        }
    }
}

// Make loaded photos keyboard-focusable
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.photo-item img, .hero-photo img').forEach((img) => {
            const enable = () => {
                const figure = img.closest('figure');
                if (figure) {
                    figure.setAttribute('tabindex', '0');
                    figure.setAttribute('role', 'button');
                    figure.setAttribute('aria-label', 'View photograph');
                }
            };
            if (img.complete && img.naturalWidth > 0) {
                enable();
            } else {
                img.addEventListener('load', enable);
            }
        });
    });
})();

// Photography placeholders: swap data-src → src immediately on load.
// The inline onload/onerror handlers flag each figure as has-photo or
// is-missing (dashed slot with the expected filename).
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.photo-item img[data-src], .hero-photo img[data-src]').forEach((img) => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    });
})();

// Subtle reveal-on-scroll transitions (interface only, motion-safe).
// Fail-safe: elements stay visible by default; the hidden state is applied
// only right before observing, and a timed fallback force-reveals everything
// in case IntersectionObserver never fires (some embedded contexts).
(function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer = null;

    function getObserver() {
        if (observer) return observer;
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
        return observer;
    }

    function applyRevealEffect(root) {
        if (!root || prefersReducedMotion.matches || !('IntersectionObserver' in window)) return;
        const targets = root.querySelectorAll('.publication-card, .timeline-item, .wip-card, .cred-row');
        targets.forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = Math.min(i * 40, 200) + 'ms';
            getObserver().observe(el);
        });
        // Fail-safe: if within 1s an element hasn't been revealed by the
        // observer, drop the hidden .reveal state entirely — the element
        // returns to default visible styles with no transition required.
        setTimeout(() => {
            targets.forEach((el) => {
                if (!el.classList.contains('reveal-in')) {
                    getObserver().unobserve(el);
                    el.classList.remove('reveal');
                    el.style.transitionDelay = '';
                }
            });
        }, 1000);
    }

    window.applyRevealEffect = applyRevealEffect;
})();

// Header background transition on scroll
(function() {
    function updateHeaderState() {
        const header = document.getElementById('main-header');
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    document.addEventListener('DOMContentLoaded', updateHeaderState);
})();

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new MobileNavigation();
    new SmoothScroll();
    
    // Make NavigationHighlight available globally for smooth scroll integration
    window.navigationHighlightInstance = new NavigationHighlight();
    
    new LazyImageLoader();
    new MarkdownLoader();
    new PhotoLightbox();
    
    // Add loading state management
    document.body.classList.add('loaded');
    
    // Console message for developers
    console.log('🌵 Portfolio site loaded successfully!');
    console.log('Built with inspiration from astro-theme-cactus');
});

// Handle page visibility changes (pause animations when not visible)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        document.body.classList.add('paused');
    } else {
        document.body.classList.remove('paused');
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Handle keyboard navigation for theme toggle
    if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.click();
        }
    }
});

// Add reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('scroll-behavior', 'auto');
}

// Listen for changes in motion preference
prefersReducedMotion.addEventListener('change', () => {
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('scroll-behavior', 'auto');
    } else {
        document.documentElement.style.setProperty('scroll-behavior', 'smooth');
    }
});
