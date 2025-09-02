// Simple dark mode toggle
const toggleBtn = document.createElement('button');
toggleBtn.className = 'btn';
toggleBtn.style.position = 'fixed';
toggleBtn.style.right = '20px';
toggleBtn.style.bottom = '80px';
toggleBtn.style.fontSize = '1.5rem';
toggleBtn.style.width = '48px';
toggleBtn.style.height = '48px';
toggleBtn.style.display = 'flex';
toggleBtn.style.alignItems = 'center';
toggleBtn.style.justifyContent = 'center';

function updateIcon() {
    if (document.body.classList.contains('dark-mode')) {
        toggleBtn.innerHTML = '🌞';
        toggleBtn.title = 'Switch to light mode';
    } else {
        toggleBtn.innerHTML = '🌙';
        toggleBtn.title = 'Switch to dark mode';
    }
}
updateIcon();
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateIcon();
});

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
