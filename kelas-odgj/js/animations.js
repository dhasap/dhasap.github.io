// js/animations.js (Fixed)

document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for fade-in animations on scroll
    // This makes elements appear smoothly as they enter the viewport.
    
    const animatedElements = document.querySelectorAll('.card, .team-member, .gallery-item');

    // Check if IntersectionObserver is supported by the browser
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    
                    // We have removed the 'transform' property that was causing stacking context issues
                    // with the mobile navigation menu.
                    
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
            
            // We only transition the opacity now to avoid layout bugs.
            element.style.transition = 'opacity 0.6s ease-out';
            
            // Start observing the element
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers: just show all elements immediately.
        animatedElements.forEach(element => {
            element.style.opacity = '1';
        });
    }
});
