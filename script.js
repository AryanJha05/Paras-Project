// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
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

// Portfolio Filter
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

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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
    const elementsToAnimate = document.querySelectorAll('.service-card, .portfolio-item, .testimonial, .about-stats .stat');
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
