// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add scroll-based navigation highlight
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Add reveal class to elements
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
    
    // Initial reveal check
    reveal();
});

// Add typing animation to hero text
const heroTitle = document.querySelector('.hero-content h1');
const heroText = document.querySelector('.hero-content p');

if (heroTitle && heroText) {
    const titleText = heroTitle.textContent;
    const descText = heroText.textContent;
    
    heroTitle.textContent = '';
    heroText.textContent = '';
    
    let titleIndex = 0;
    let descIndex = 0;
    
    function typeTitle() {
        if (titleIndex < titleText.length) {
            heroTitle.textContent += titleText.charAt(titleIndex);
            titleIndex++;
            setTimeout(typeTitle, 100);
        } else {
            setTimeout(typeDesc, 500);
        }
    }
    
    function typeDesc() {
        if (descIndex < descText.length) {
            heroText.textContent += descText.charAt(descIndex);
            descIndex++;
            setTimeout(typeDesc, 50);
        }
    }
    
    setTimeout(typeTitle, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Disable submit button and show loading state
        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Get form data
        const formData = {
            name: contactForm.querySelector('[name="name"]').value,
            email: contactForm.querySelector('[name="email"]').value,
            message: contactForm.querySelector('[name="message"]').value
        };

        // Send email using EmailJS
        emailjs.send('service_nvf0ygj', 'template_3uot1x4', formData)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                formMessage.textContent = 'Message sent successfully!';
                formMessage.className = 'success';
                contactForm.reset();
            }, function(error) {
                console.error('FAILED...', error);
                formMessage.textContent = `Error: ${error.text || 'Failed to send message. Please try again.'}`;
                formMessage.className = 'error';
            })
            .finally(() => {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
    });
}); 

