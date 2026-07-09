// ================================================
// ROMANTIC SCRAPBOOK LOVE LETTER - JAVASCRIPT
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize everything
    createFloatingPetals();
    setupMusicControl();
    setupEnvelope();
    setupHiddenHearts();
    setupNotebook();
    setupSurprise();
});

// ================================================
// FLOATING PETALS
// ================================================
function createFloatingPetals() {
    const container = document.body;
    const petalCount = 25;
    
    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.animationDuration = (Math.random() * 8 + 6) + 's';
            petal.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(petal);
            
            // Remove after animation and recreate
            setTimeout(() => {
                petal.remove();
                if (document.body.contains(container)) {
                    const newPetal = document.createElement('div');
                    newPetal.className = 'petal';
                    newPetal.style.left = Math.random() * 100 + 'vw';
                    newPetal.style.animationDuration = (Math.random() * 8 + 6) + 's';
                    container.appendChild(newPetal);
                }
            }, 14000);
        }, i * 300);
    }
}

// ================================================
// MUSIC CONTROL
// ================================================
function setupMusicControl() {
    const musicBtn = document.getElementById('music-btn');
    let audio = null;
    let isPlaying = false;
    
    musicBtn.addEventListener('click', function() {
        if (!audio) {
            // Create audio element with a soft ambient track (placeholder - user can replace)
            audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
            audio.loop = true;
            audio.volume = 0.3;
        }
        
        if (isPlaying) {
            audio.pause();
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            audio.play().catch(e => console.log('Audio autoplay blocked'));
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isPlaying = !isPlaying;
    });
}

// ================================================
// ENVELOPE & LETTER REVEAL
// ================================================
function setupEnvelope() {
    const envelopeContainer = document.querySelector('.envelope-container');
    const waxSeal = document.querySelector('.wax-seal');
    const envelopeFlap = document.querySelector('.envelope-flap');
    const landing = document.getElementById('landing');
    const letterSection = document.getElementById('letter-section');
    
    envelopeContainer.addEventListener('click', function() {
        // Break seal
        waxSeal.classList.add('broken');
        
        // Open envelope
        setTimeout(() => {
            envelopeFlap.classList.add('open');
        }, 500);
        
        // Hide landing, show letter
        setTimeout(() => {
            landing.style.display = 'none';
            letterSection.classList.add('active');
            
            // Start letter animations
            startLetterAnimation();
            createConfetti();
            
            // Scroll to letter
            letterSection.scrollIntoView({ behavior: 'smooth' });
        }, 1300);
    });
}

// ================================================
// LETTER TYPING ANIMATION
// ================================================
const letterMessages = [
    "hiii, babyyy. i know you're probably shocked to see this, but i made a website for you. it's nothing fancy, just something simple that i wanted to make because you mean a lot to me.",
    "always remember that i'm always here for you, no matter what. i know i'm still courting you, and i know i still have a long way to go, but i already know what i feel. i already love you.",
    "i know sweet messages probably make you a little awkward, and maybe you don't always know how to respond to them, but that's okay. you don't have to force yourself to say anything. just having you here, talking to me, spending time with me, and letting me get to know you is already more than enough.",
    "i don't expect you to rush your feelings or give me an answer anytime soon. i'll keep choosing you every day, and i'll keep showing you through my actions that i'm serious about you. i want to be someone who gives you peace, makes you smile, and makes you feel safe and appreciated.",
    "thank you for letting me be part of your days, even in the smallest ways. i hope this little website reminds you how special you are to me. i'll always be cheering for you, celebrating your wins, comforting you on your hard days, and reminding you that you never have to face things alone.",
    "take your time, babyyy. i'll be here, patiently loving you and choosing you, every single day. 🤍"
];

function startLetterAnimation() {
    const letterBody = document.getElementById('letter-body');
    letterBody.innerHTML = '';
    
    letterMessages.forEach((msg, index) => {
        setTimeout(() => {
            const p = document.createElement('p');
            p.textContent = msg;
            letterBody.appendChild(p);
            p.classList.add('visible');
        }, index * 2000);
    });
}

// ================================================
// CONFETTI
// ================================================
function createConfetti() {
    const confettiCount = 60;
    const hearts = ['❤️', '🤍', '💗', '💕', '💖', '🌸'];
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti confetti-heart';
            confetti.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 4 + 3) + 's';
            confetti.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 7000);
        }, i * 80);
    }
}

// ================================================
// HIDDEN HEARTS WITH NOTES
// ================================================
const heartNotes = [
    "you make ordinary days feel special.",
    "thank you for existing.",
    "i'm proud of you.",
    "your smile is my favorite.",
    "i hope today was kind to you.",
    "i'll always choose you."
];

function setupHiddenHearts() {
    const hearts = document.querySelectorAll('.hidden-heart');
    const overlay = document.getElementById('overlay');
    const notePopup = document.getElementById('note-popup');
    const noteText = document.getElementById('note-text');
    const closeBtn = document.querySelector('.note-popup .close-btn');
    
    hearts.forEach((heart, index) => {
        // Set initial positions
        const positions = [
            { top: '15%', left: '5%' },
            { top: '40%', right: '8%' },
            { top: '65%', left: '10%' },
            { top: '25%', right: '5%' },
            { top: '80%', left: '8%' },
            { top: '50%', right: '3%' }
        ];
        
        Object.assign(heart.style, positions[index]);
        
        heart.addEventListener('click', () => {
            noteText.textContent = heartNotes[index];
            overlay.classList.add('show');
            notePopup.classList.add('show');
        });
    });
    
    // Close popup
    closeBtn.addEventListener('click', closeNotePopup);
    overlay.addEventListener('click', closeNotePopup);
}

function closeNotePopup() {
    const overlay = document.getElementById('overlay');
    const notePopup = document.getElementById('note-popup');
    overlay.classList.remove('show');
    notePopup.classList.remove('show');
}



// ================================================
// REASONS NOTEBOOK
// ================================================
function setupNotebook() {
    const pages = document.querySelectorAll('.notebook-page');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageIndicator = document.getElementById('page-indicator');
    let currentPage = 0;
    
    function updatePage() {
        pages.forEach((page, i) => {
            page.classList.toggle('active', i === currentPage);
        });
        
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === pages.length - 1;
        pageIndicator.textContent = `Page ${currentPage + 1} of ${pages.length}`;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updatePage();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPage < pages.length - 1) {
            currentPage++;
            updatePage();
        }
    });
    
    updatePage();
}

// ================================================
// SURPRISE
// ================================================
function setupSurprise() {
    const surpriseTag = document.querySelector('.surprise-tag');
    const surpriseScreen = document.getElementById('surprise-screen');
    const finalScreen = document.getElementById('final');
    
    surpriseTag.addEventListener('click', () => {
        // Show surprise screen
        document.body.style.overflow = 'hidden';
        surpriseScreen.classList.add('active');
        
        // Create stars
        createStars();
        
        // Show final screen after delay
        setTimeout(() => {
            surpriseScreen.classList.remove('active');
            finalScreen.classList.add('active');
            finalScreen.scrollIntoView({ behavior: 'smooth' });
            document.body.style.overflow = '';
        }, 5000);
    });
}

function createStars() {
    const surpriseScreen = document.getElementById('surprise-screen');
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = '✦';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
        surpriseScreen.appendChild(star);
    }
}
