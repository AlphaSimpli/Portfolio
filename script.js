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
function startTypingAnimation() {
    const heroTitle = document.querySelector('.hero-content h1');
    const heroText = document.querySelector('.hero-content p');

    if (heroTitle && heroText) {
        const titleText = heroTitle.textContent;
        const descText = heroText.textContent;
        
        // Clear the text content
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
        
        // Start the animation
        setTimeout(typeTitle, 1000);
    }
}

// Start typing animation on page load
document.addEventListener('DOMContentLoaded', startTypingAnimation);

// Update language function
function updateLanguage() {
    const elements = {
        'nav-home': translations[currentLang].home,
        'nav-about': translations[currentLang].about,
        'nav-projects': translations[currentLang].projects,
        'nav-contact': translations[currentLang].contact,
        'hero-title': translations[currentLang].heroTitle,
        'hero-subtitle': translations[currentLang].heroSubtitle,
        'about-title': translations[currentLang].aboutTitle,
        'about-text': translations[currentLang].aboutText,
        'skills-title': translations[currentLang].skills,
        'projects-title': translations[currentLang].projectsTitle,
        'contact-title': translations[currentLang].contactTitle,
        'name-input': translations[currentLang].namePlaceholder,
        'email-input': translations[currentLang].emailPlaceholder,
        'message-input': translations[currentLang].messagePlaceholder,
        'send-button': translations[currentLang].sendButton
    };

    for (const [id, text] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    }

    // Restart typing animation after language change
    startTypingAnimation();
}

// Language Toggle
const languageToggle = document.getElementById('language-toggle');
const translations = {
    en: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        contact: 'Contact',
        heroTitle: 'Alpha Ousmane Diallo',
        heroSubtitle: 'AI Enthusiast & Computer Science Student at Université du Québec en Outaouais',
        aboutTitle: 'About Me',
        aboutText: 'Hello! I\'m Alpha Ousmane Diallo, a passionate Computer Science student at Université du Québec en Outaouais. My focus is on Artificial Intelligence and I\'m dedicated to exploring the fascinating world of AI and its applications. I love turning complex problems into innovative solutions through technology.',
        skills: 'Skills',
        projectsTitle: 'My Projects',
        contactTitle: 'Get in Touch',
        namePlaceholder: 'Name',
        emailPlaceholder: 'Email',
        messagePlaceholder: 'Message',
        sendButton: 'Send Message'
    },
    fr: {
        home: 'Accueil',
        about: 'À propos',
        projects: 'Projets',
        contact: 'Contact',
        heroTitle: 'Alpha Ousmane Diallo',
        heroSubtitle: 'Passionné d\'IA & Étudiant en Informatique à l\'Université du Québec en Outaouais',
        aboutTitle: 'À propos de moi',
        aboutText: 'Bonjour! Je suis Alpha Ousmane Diallo, un étudiant passionné en Informatique à l\'Université du Québec en Outaouais. Je me concentre sur l\'Intelligence Artificielle et je suis dédié à explorer le monde fascinant de l\'IA et ses applications. J\'adore transformer des problèmes complexes en solutions innovantes grâce à la technologie.',
        skills: 'Compétences',
        projectsTitle: 'Mes Projets',
        contactTitle: 'Contactez-moi',
        namePlaceholder: 'Nom',
        emailPlaceholder: 'Email',
        messagePlaceholder: 'Message',
        sendButton: 'Envoyer'
    }
};

let currentLang = localStorage.getItem('language') || 'en';

languageToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    localStorage.setItem('language', currentLang);
    updateLanguage();
});

// Initialize language
updateLanguage(); 

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
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

