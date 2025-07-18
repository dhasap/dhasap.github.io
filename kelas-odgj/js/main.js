// js/main.js

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Inisialisasi Feather Icons
    // This function finds all elements with the `data-feather` attribute and replaces them with SVG icons.
    try {
        feather.replace();
    } catch (e) {
        console.error('Feather Icons could not be initialized. Make sure the script is loaded.');
    }

    // 2. Mobile Menu Toggle
    // This handles the opening and closing of the navigation menu on mobile devices.
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            // Change icon from menu to x and vice-versa
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.setAttribute('data-feather', 'x');
            } else {
                icon.setAttribute('data-feather', 'menu');
            }
            feather.replace(); // Re-run to draw the new icon
        });
    }

});
