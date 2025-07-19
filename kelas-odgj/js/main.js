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

    // Fungsi Pencarian untuk Daftar Siswa
const studentSearchInput = document.getElementById('studentSearchInput');
if (studentSearchInput) {
    studentSearchInput.addEventListener('keyup', function() {
        const filter = studentSearchInput.value.toUpperCase();
        const tableBody = document.getElementById('studentTableBody');
        const rows = tableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            let nameColumn = rows[i].getElementsByTagName('td')[2]; // Kolom nama ada di index ke-2
            if (nameColumn) {
                let textValue = nameColumn.textContent || nameColumn.innerText;
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }
        }
    });
}
    
});
