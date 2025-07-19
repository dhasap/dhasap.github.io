document.addEventListener('DOMContentLoaded', () => {
    
    const animatedElements = document.querySelectorAll('.card, .team-member');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.6s ease-out';
            observer.observe(element);
        });
    } else {
        animatedElements.forEach(element => {
            element.style.opacity = '1';
        });
    }
});
