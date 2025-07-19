document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Inisialisasi Feather Icons
    try {
        feather.replace();
    } catch (e) {
        console.error('Feather Icons could not be initialized.');
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.setAttribute('data-feather', 'x');
            } else {
                icon.setAttribute('data-feather', 'menu');
            }
            feather.replace();
        });
    }

    // 3. Fungsi Pencarian Siswa
    const studentSearchInput = document.getElementById('studentSearchInput');
    if (studentSearchInput) {
        studentSearchInput.addEventListener('keyup', function() {
            const filter = studentSearchInput.value.toUpperCase();
            const tableBody = document.getElementById('studentTableBody');
            const rows = tableBody.getElementsByTagName('tr');

            for (let i = 0; i < rows.length; i++) {
                let nameColumn = rows[i].getElementsByTagName('td')[2];
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

    // 4. Fungsi untuk Menyorot Jadwal Hari Ini
    function highlightCurrentDay() {
        const currentDay = new Date().getDay();
        const scheduleRows = document.querySelectorAll('.schedule-table-fixed tbody tr');
        scheduleRows.forEach(row => {
            row.classList.remove('today');
        });

        if (currentDay >= 1 && currentDay <= 6) {
            const todayRow = document.querySelector(`.schedule-table-fixed tbody tr[data-day="${currentDay}"]`);
            if (todayRow) {
                todayRow.classList.add('today');
            }
        }
    }
    highlightCurrentDay();
    const highlightButton = document.getElementById('highlight-today-btn');
    if (highlightButton) {
        highlightButton.addEventListener('click', highlightCurrentDay);
    }
});

// 5. Fungsi Efek Gelembung (Ripple) pada Tombol
function createRipple(event) {
    const button = event.currentTarget;

    // Buat elemen span untuk gelembung
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    // Atur posisi gelembung tepat di lokasi klik/sentuhan
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (button.getBoundingClientRect().left + radius)}px`;
    circle.style.top = `${event.clientY - (button.getBoundingClientRect().top + radius)}px`;
    circle.classList.add("ripple");

    // Hapus gelembung yang mungkin sudah ada agar tidak menumpuk
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
        ripple.remove();
    }

    // Tambahkan gelembung ke tombol
    button.appendChild(circle);
}

// Terapkan efek ke semua elemen dengan kelas .btn
const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
    button.addEventListener("click", createRipple);
});
