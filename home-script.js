// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (name.trim() && email.trim() && message.trim()) {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Smooth scroll enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.project-card, .cgpsc-feature').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ========== CGPSC LOGIN FUNCTIONALITY ==========

const cgpscLoginModal = document.getElementById('cgpscLoginModal');
const closeCgpscModal = document.getElementById('closeCgpscModal');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Open CGPSC Login Modal
function openCgpscLogin() {
    cgpscLoginModal.classList.add('active');
}

// Close CGPSC Login Modal
function closeCgpscLoginModal() {
    cgpscLoginModal.classList.remove('active');
}

closeCgpscModal.addEventListener('click', closeCgpscLoginModal);

// Click outside modal to close
window.addEventListener('click', (e) => {
    if (e.target === cgpscLoginModal) {
        closeCgpscLoginModal();
    }
});

// Tab switching
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all tabs
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        btn.classList.add('active');
        const tabName = btn.getAttribute('data-tab');
        document.getElementById(tabName).classList.add('active');
    });
});

// Phone Login
document.getElementById('phoneLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = document.getElementById('phoneInput').value;
    const password = document.getElementById('phonePass').value;
    
    if (phone.length === 10 && password.length > 0) {
        // Store user data
        localStorage.setItem('cgpscUser', JSON.stringify({
            type: 'phone',
            identifier: phone,
            name: 'User ' + phone.substring(6)
        }));
        alert('Login successful! Welcome back.');
        closeCgpscLoginModal();
        loadCgpscDashboard();
    } else {
        alert('Please enter valid credentials.');
    }
});

// Gmail Login
document.getElementById('gmailLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('gmailInput').value;
    const password = document.getElementById('gmailPass').value;
    
    if (email.includes('@') && password.length > 0) {
        localStorage.setItem('cgpscUser', JSON.stringify({
            type: 'gmail',
            identifier: email,
            name: email.split('@')[0]
        }));
        alert('Login successful! Welcome back.');
        closeCgpscLoginModal();
        loadCgpscDashboard();
    } else {
        alert('Please enter valid credentials.');
    }
});

// Sign Up
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const phone = document.getElementById('signupPhone').value;
    const email = document.getElementById('signupEmail').value;
    const pass = document.getElementById('signupPass').value;
    const passConfirm = document.getElementById('signupPassConfirm').value;
    
    if (phone.length !== 10) {
        alert('Phone number must be 10 digits.');
        return;
    }
    
    if (pass !== passConfirm) {
        alert('Passwords do not match.');
        return;
    }
    
    // Store user data
    localStorage.setItem('cgpscUser', JSON.stringify({
        type: 'signup',
        name: name,
        phone: phone,
        email: email
    }));
    
    alert('Account created successfully! Welcome to CGPSC Resources.');
    closeCgpscLoginModal();
    loadCgpscDashboard();
});

// Load CGPSC Dashboard
function loadCgpscDashboard() {
    const user = JSON.parse(localStorage.getItem('cgpscUser'));
    if (user) {
        console.log('User logged in:', user.name);
        // You can redirect to a dashboard page or show dashboard content here
        // alert('Welcome ' + user.name + '! Your dashboard is being loaded...');
    }
}

// Check if user is already logged in on page load
window.addEventListener('load', () => {
    const user = localStorage.getItem('cgpscUser');
    if (user) {
        // User is already logged in
        console.log('User already logged in');
    }
});
