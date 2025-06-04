// Music Player
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🎵';
    } else {
        bgMusic.play();
        musicToggle.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add loading animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize Parallax
    const headerImage = document.querySelector('.header-image');
    if (headerImage) {
        new simpleParallax(headerImage, {
            scale: 1.2,
            delay: 0.4
        });
    }

    // Handle URL parameters for guest name
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');
    if (guestName) {
        const headerContent = document.querySelector('.header-content');
        const welcomeText = document.createElement('p');
        welcomeText.textContent = `سلام ${guestName} عزیز`;
        welcomeText.style.fontSize = '1.5rem';
        welcomeText.style.marginBottom = '1rem';
        headerContent.insertBefore(welcomeText, headerContent.firstChild);
    }

    // RSVP Form handling
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(rsvpForm);
            const response = {
                name: formData.get('name'),
                attendance: formData.get('attendance')
            };

            // Here you would typically send this data to a server
            console.log('RSVP Response:', response);
            
            // Show confirmation message
            const confirmation = document.createElement('div');
            confirmation.textContent = 'ممنون از پاسخ شما!';
            confirmation.style.textAlign = 'center';
            confirmation.style.marginTop = '1rem';
            confirmation.style.color = 'var(--primary-color)';
            
            rsvpForm.innerHTML = '';
            rsvpForm.appendChild(confirmation);
        });
    }

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(img => {
            img.classList.add('loading');
            img.addEventListener('load', () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            });
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(lazyLoadScript);
    }
}); 