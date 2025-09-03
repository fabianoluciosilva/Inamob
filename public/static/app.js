/**
 * INAMOB Website JavaScript - Optimized for Performance & SEO
 * Features: Form handling, WhatsApp integration, Analytics tracking, Performance monitoring
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('INAMOB Website Loaded - Marketing Digital Excellence');
    
    // Initialize all components
    initContactForm();
    initWhatsAppTracking();
    initScrollAnimations();
    initPerformanceTracking();
    initMobileMenu();
    
    // SEO: Track user engagement
    trackUserEngagement();
});

/**
 * Contact Form Handler with Validation
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<div class="spinner"></div>Enviando...';
        submitButton.disabled = true;
        form.classList.add('form-loading');
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message')
        };
        
        try {
            // Validate form data
            if (!validateForm(data)) {
                throw new Error('Por favor, preencha todos os campos obrigatórios.');
            }
            
            // Send to API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showAlert('success', 'Mensagem enviada com sucesso! Entraremos em contato em breve.');
                form.reset();
                
                // Track conversion
                trackConversion('contact_form', data.service);
                
                // Auto-redirect to WhatsApp after 3 seconds
                setTimeout(() => {
                    const whatsappMessage = encodeURIComponent(
                        `Olá! Acabei de enviar uma mensagem pelo site sobre ${data.service}. Meu nome é ${data.name}.`
                    );
                    window.open(`https://wa.me/552140421350?text=${whatsappMessage}`, '_blank');
                }, 3000);
                
            } else {
                throw new Error(result.message || 'Erro ao enviar mensagem');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showAlert('error', error.message || 'Erro ao enviar mensagem. Tente novamente ou use o WhatsApp.');
            
            // Fallback to WhatsApp
            setTimeout(() => {
                const whatsappMessage = encodeURIComponent(
                    `Olá! Tentei enviar uma mensagem pelo site mas houve um problema. Meu nome é ${data.name} e gostaria de saber sobre ${data.service}.`
                );
                window.open(`https://wa.me/552140421350?text=${whatsappMessage}`, '_blank');
            }, 2000);
        } finally {
            // Restore button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            form.classList.remove('form-loading');
        }
    });
}

/**
 * Form Validation
 */
function validateForm(data) {
    const required = ['name', 'email', 'phone', 'service', 'message'];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    // Phone validation (Brazilian format)
    const phoneRegex = /^[\(\)\s\-\+\d]{10,}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        return false;
    }
    
    return true;
}

/**
 * Show Alert Messages
 */
function showAlert(type, message) {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} mr-2"></i>
        ${message}
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alert, form);
    
    // Auto remove after 10 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 10000);
}

/**
 * WhatsApp Click Tracking for SEO Analytics
 */
function initWhatsAppTracking() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();
            const service = this.href.includes('SEO') ? 'SEO' :
                          this.href.includes('Google%20Ads') ? 'Google Ads' :
                          this.href.includes('redes%20sociais') ? 'Redes Sociais' :
                          this.href.includes('desenvolvimento%20web') ? 'Desenvolvimento Web' :
                          this.href.includes('consultoria') ? 'Consultoria' : 'Geral';
            
            // Track WhatsApp interaction
            trackConversion('whatsapp_click', service);
            
            console.log('WhatsApp click tracked:', { service, linkText });
        });
    });
}

/**
 * Scroll Animations for Better User Experience
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Animate service cards
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach((card, index) => {
        card.classList.add('fade-in-on-scroll');
        card.style.transitionDelay = `${index * 100}ms`;
        observer.observe(card);
    });
}

/**
 * Performance Tracking for Core Web Vitals
 */
function initPerformanceTracking() {
    // Track page load performance
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
            const firstPaint = performance.getEntriesByType('paint')[0]?.startTime || 0;
            
            console.log('Performance Metrics:', {
                loadTime: loadTime + 'ms',
                domContentLoaded: domContentLoaded + 'ms',
                firstPaint: Math.round(firstPaint) + 'ms'
            });
            
            // Track performance for SEO
            trackPerformance('page_load', loadTime);
        }, 1000);
    });
    
    // Track Core Web Vitals if available
    if ('web-vitals' in window) {
        // This would require web-vitals library
        // For now, we track basic metrics
    }
}

/**
 * Mobile Menu Handler
 */
function initMobileMenu() {
    const menuButton = document.querySelector('button.md\\:hidden');
    const nav = document.querySelector('nav');
    
    if (!menuButton || !nav) return;
    
    menuButton.addEventListener('click', function() {
        const menu = nav.querySelector('.hidden.md\\:flex');
        if (menu) {
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');
            menu.classList.toggle('flex-col');
            menu.classList.toggle('absolute');
            menu.classList.toggle('top-full');
            menu.classList.toggle('left-0');
            menu.classList.toggle('w-full');
            menu.classList.toggle('bg-purple-600');
            menu.classList.toggle('p-4');
        }
    });
}

/**
 * User Engagement Tracking
 */
function trackUserEngagement() {
    let engagementData = {
        timeOnPage: 0,
        scrollDepth: 0,
        clicks: 0,
        formInteractions: 0
    };
    
    // Time on page
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        engagementData.timeOnPage = Date.now() - startTime;
        trackEngagement(engagementData);
    });
    
    // Scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        maxScroll = Math.max(maxScroll, scrollPercent);
        engagementData.scrollDepth = maxScroll;
    }, 100));
    
    // Click tracking
    document.addEventListener('click', function(e) {
        engagementData.clicks++;
        
        // Track specific elements
        if (e.target.matches('a[href*="wa.me"]')) {
            trackEvent('whatsapp_click', e.target.textContent.trim());
        } else if (e.target.matches('a[href^="#"]')) {
            trackEvent('internal_link_click', e.target.textContent.trim());
        }
    });
    
    // Form interactions
    document.addEventListener('focus', function(e) {
        if (e.target.matches('input, textarea, select')) {
            engagementData.formInteractions++;
        }
    }, true);
}

/**
 * Conversion Tracking
 */
function trackConversion(type, service) {
    const conversionData = {
        type: type,
        service: service,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
    };
    
    console.log('Conversion tracked:', conversionData);
    
    // Here you would send to your analytics service
    // For example: Google Analytics, Facebook Pixel, etc.
}

/**
 * Performance Tracking
 */
function trackPerformance(metric, value) {
    console.log('Performance metric:', metric, value);
    // Send to analytics service
}

/**
 * Event Tracking
 */
function trackEvent(event, label) {
    console.log('Event tracked:', event, label);
    // Send to analytics service
}

/**
 * Engagement Tracking
 */
function trackEngagement(data) {
    console.log('Engagement data:', data);
    // Send to analytics service
}

/**
 * Utility Functions
 */
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * SEO: Enhanced structured data tracking
 */
function initSEOTracking() {
    // Track page interactions for SEO signals
    const seoEvents = {
        pageViews: 1,
        timeOnPage: 0,
        bounceRate: true,
        interactions: []
    };
    
    // Track meaningful interactions
    document.addEventListener('click', function(e) {
        if (e.target.matches('a, button')) {
            seoEvents.bounceRate = false;
            seoEvents.interactions.push({
                type: 'click',
                element: e.target.tagName,
                text: e.target.textContent.trim().substring(0, 50),
                timestamp: Date.now()
            });
        }
    });
    
    // Track scroll engagement
    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 100) {
            seoEvents.bounceRate = false;
        }
    }, 1000));
}

// Initialize SEO tracking
initSEOTracking();

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

console.log('INAMOB JavaScript initialized - Ready for digital marketing excellence!');