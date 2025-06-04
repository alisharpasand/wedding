// Music Player
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = true;

// Function to start playing
async function startPlaying() {
    try {
        bgMusic.volume = 0.5;
        await bgMusic.play();
        musicToggle.textContent = '⏸️';
    } catch (error) {
        console.error('Error playing music:', error);
        musicToggle.textContent = '▶️';
    }
}

// Function to fetch and parse guest data
async function fetchGuestData(guestId) {
    try {
        const response = await fetch('assets/guests.csv');
        const csvText = await response.text();
        
        // Split by newlines and clean up each line
        const lines = csvText.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        
        const headers = lines[0].split(',').map(h => h.trim());
        const idIndex = headers.indexOf('id');
        const nameIndex = headers.indexOf('name');
        
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            if (values[idIndex] === guestId) {
                const name = values[nameIndex].replace(/\r$/, ''); // Remove any trailing \r
                return name;
            }
        }
        return null;
    } catch (error) {
        console.error('Error fetching guest data:', error);
        return null;
    }
}

// Try to start playing when page loads
document.addEventListener('DOMContentLoaded', async () => {
    // Try to play after a short delay
    // setTimeout(() => {
    //     startPlaying().catch(() => {
    //         // If autoplay fails, set initial button state
    //         musicToggle.textContent = '🎵';
    //     });
    // }, 1000);

    // Handle URL parameters for guest ID
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('id');
    
    if (guestId) {
        const guestName = await fetchGuestData(guestId);
        
        if (guestName) {
            const recipientElement = document.querySelector('.recipient');
            if (recipientElement) {
                recipientElement.textContent = guestName + '،';
            }
        }
    }
});

musicToggle.addEventListener('click', async () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🎵';
        isPlaying = false;
    } else {
        try {
            await startPlaying();
        } catch (error) {
            console.log('Failed to play:', error);
        }
    }
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
    
    // Handle URL parameters for guest name
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');
    if (guestName) {
        const headerContent = document.querySelector('.screen-content');
        const welcomeText = document.createElement('p');
        welcomeText.textContent = `سلام ${guestName} عزیز`;
        welcomeText.style.fontSize = '1.5rem';
        welcomeText.style.marginBottom = '1rem';
        headerContent.insertBefore(welcomeText, headerContent.firstChild);
    }
});
