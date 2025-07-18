// js/animations.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for fade-in animations on scroll
    // This makes elements appear smoothly as they enter the viewport.
    
    const animatedElements = document.querySelectorAll('.card, .team-member, .gallery-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        // Initially hide the elements
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Start observing the element
        observer.observe(element);
    });

});

