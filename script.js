// Mobile Menu Toggle - Enhanced for Responsiveness
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close mobile menu on window resize (if transitioning to desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Enhanced Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Portfolio Filter - Enhanced for Mobile
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Scroll to portfolio grid on mobile after filter selection
        if (window.innerWidth <= 768) {
            const portfolioGrid = document.querySelector('.portfolio-grid');
            portfolioGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Create email content
    const emailSubject = encodeURIComponent(`New Project Inquiry - ${service}`);
    const emailBody = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || 'Not provided'}\n` +
        `Service Type: ${service}\n\n` +
        `Message:\n${message}\n\n` +
        `--\nThis message was sent from the Arun Suthar Carpentry website contact form.`
    );
    
    // Option 1: mailto link (simple but relies on user's email client)
    const mailtoLink = `mailto:arun.suthar@email.com?subject=${emailSubject}&body=${emailBody}`;
    
    // Show success message
    showNotification('Thank you for your message! Your email client will open to send the message.', 'success');
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    contactForm.reset();
    
    // Alternative: FormSpree integration (uncomment and replace with your FormSpree endpoint)
    /*
    try {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        showNotification('There was an error sending your message. Please try again.', 'error');
    }
    */
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add notification animation styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Enhanced Smooth Scrolling for anchor links - Mobile Optimized
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Adjust header offset based on screen size
            const headerOffset = window.innerWidth <= 768 ? 70 : 80;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Enhanced Animate on Scroll - Responsive
const observerOptions = {
    threshold: window.innerWidth <= 768 ? 0.05 : 0.1, // Lower threshold for mobile
    rootMargin: window.innerWidth <= 768 ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.service-card, .portfolio-item, .stat, .contact-item');
    elementsToAnimate.forEach(element => {
        element.classList.add('loading');
        observer.observe(element);
    });
});

// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Add real-time form validation
document.getElementById('email').addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = '#f44336';
        showNotification('Please enter a valid email address.', 'error');
    } else {
        this.style.borderColor = '#D2B48C';
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    if (this.value && !validatePhone(this.value)) {
        this.style.borderColor = '#f44336';
        showNotification('Please enter a valid phone number.', 'error');
    } else {
        this.style.borderColor = '#D2B48C';
    }
});

// Lazy Loading for Images (when you add real images)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Contact Information (easily replaceable)
const CONTACT_INFO = {
    email: 'arun.suthar@email.com', // Replace with your actual email
    phone: '+1 (555) 123-4567',     // Replace with your actual phone
    address: 'Your City, State 12345', // Replace with your actual address
    formspreeId: 'YOUR_FORM_ID'      // Replace with your Formspree form ID
};

// Function to update contact information
function updateContactInfo() {
    // Update email links
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.href = `mailto:${CONTACT_INFO.email}`;
    });
    
    // Update phone links
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.href = `tel:${CONTACT_INFO.phone}`;
    });
}

// Initialize contact info updates
document.addEventListener('DOMContentLoaded', updateContactInfo);

// Add some entrance animations
function addEntranceAnimations() {
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText && heroImage) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateX(-50px)';
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            heroText.style.transition = 'all 0.8s ease';
            heroImage.style.transition = 'all 0.8s ease';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateX(0)';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 500);
    }
}

// Initialize entrance animations
document.addEventListener('DOMContentLoaded', addEntranceAnimations);

console.log('Arun Suthar Carpentry Website Loaded Successfully! 🔨🪚');

// Additional Mobile Optimizations
document.addEventListener('DOMContentLoaded', () => {
    
    // Optimize touch events for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch feedback for buttons
        const buttons = document.querySelectorAll('.btn, .filter-btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }
    
    // Lazy load images when they're added
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Responsive image placeholder sizing
    function adjustPlaceholders() {
        const placeholders = document.querySelectorAll('.image-placeholder, .hero-placeholder');
        placeholders.forEach(placeholder => {
            if (window.innerWidth <= 576) {
                placeholder.style.minHeight = '200px';
            } else if (window.innerWidth <= 768) {
                placeholder.style.minHeight = '250px';
            } else {
                placeholder.style.minHeight = '';
            }
        });
    }
    
    // Call on load and resize
    adjustPlaceholders();
    window.addEventListener('resize', debounce(adjustPlaceholders, 250));
    
    // Performance optimization - debounce resize events
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
    
    // Add swipe support for portfolio filters on mobile
    if (window.innerWidth <= 768) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const portfolioFilter = document.querySelector('.portfolio-filter');
        if (portfolioFilter) {
            portfolioFilter.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            portfolioFilter.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    const activeFilter = document.querySelector('.filter-btn.active');
                    const filters = Array.from(document.querySelectorAll('.filter-btn'));
                    const currentIndex = filters.indexOf(activeFilter);
                    
                    let nextIndex;
                    if (diff > 0 && currentIndex < filters.length - 1) {
                        // Swipe left - next filter
                        nextIndex = currentIndex + 1;
                    } else if (diff < 0 && currentIndex > 0) {
                        // Swipe right - previous filter
                        nextIndex = currentIndex - 1;
                    }
                    
                    if (nextIndex !== undefined) {
                        filters[nextIndex].click();
                    }
                }
            }
        }
    }
    
    // Viewport height fix for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', debounce(setViewportHeight, 250));
    
    // Optimize form inputs for mobile
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        // Prevent zoom on focus for iOS
        if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
            input.style.fontSize = '16px';
        }
        
        // Add better mobile input handling
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    });
});
