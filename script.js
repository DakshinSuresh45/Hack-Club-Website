const toggleButton = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

toggleButton.addEventListener('click', () => {
    // Toggles the visibility of the mobile menu
    navLinks.classList.toggle('active');
});
