// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close mobile menu when clicking on links
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const firstName = this.querySelector('input[type="text"]').value;
    const lastName = this.querySelectorAll('input[type="text"]')[1].value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;
    
    // Basic validation
    if (!firstName || !lastName || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you within 24 hours.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .stat-card, .contact-detail').forEach(el => {
    observer.observe(el);
});

// Book appointment button functionality
document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent.includes('Book') || btn.textContent.includes('Schedule')) {
        btn.addEventListener('click', function(page) {
            // Simulate booking system
            window.location.href = '#contact';
        });
    }
});

// Emergency numbers quick access
document.querySelectorAll('.emergency-numbers div').forEach(numberDiv => {
    numberDiv.style.cursor = 'pointer';
    numberDiv.addEventListener('click', function() {
        const text = this.textContent;
        const phoneMatch = text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{3,4}/);
        if (phoneMatch) {
            const phone = phoneMatch[0];
            if (confirm(`Call ${phone}?`)) {
                window.location.href = `tel:${phone.replace(/\D/g, '')}`;
            }
        }
    });
});

// Contact info click handlers
document.querySelectorAll('.contact-item, .footer-contact-item').forEach(item => {
    const text = item.textContent;
    
    // Make phone numbers clickable
    if (text.includes('(') && text.includes(')')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const phone = text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{3,4}/)[0];
            window.location.href = `tel:${phone.replace(/\D/g, '')}`;
        });
    }
    
    // Make email addresses clickable
    if (text.includes('@')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const email = text.match(/[\w.-]+@[\w.-]+\.\w+/)[0];
            window.location.href = `mailto:${email}`;
        });
    }
});

// Add loading states to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        }
    });
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    }
});

// Add focus styles for keyboard navigation
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #4a90e2';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});


// Performance monitoring
window.addEventListener('load', function() {
    console.log('Page fully loaded in', performance.now().toFixed(2), 'ms');
});