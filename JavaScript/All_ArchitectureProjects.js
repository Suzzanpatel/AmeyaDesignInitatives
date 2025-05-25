document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    // Toggle menu on hamburger click
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle between ☰ and ✕ icons
        menuIcon.textContent = menuIcon.textContent === '☰' ? '✕' : '☰';
    });

    // Handle dropdown toggles on mobile
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                // Remove active class from other items
                navItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuIcon.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuIcon.textContent = '☰';
        }
    });

    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            menuIcon.textContent = '☰';
            navItems.forEach(item => item.classList.remove('active'));
        }
    });

    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-project');
    const nextBtn = document.querySelector('.next-project');
    let currentSlide = 0;
    let isAnimating = false;

    // Function to update the active slide
    function updateSlide(newIndex) {
        if (isAnimating) return;
        isAnimating = true;

        // Determine direction for animation
        const direction = newIndex > currentSlide ? 1 : -1;
        
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Add active class to new slide and dot
        slides[newIndex].classList.add('active');
        dots[newIndex].classList.add('active');

        // Set transform for slides based on direction
        slides[currentSlide].style.transform = `translateX(${-100 * direction}%)`;
        slides[newIndex].style.transform = 'translateX(0)';

        // Update current slide index
        currentSlide = newIndex;

        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 600); // Match this with CSS transition duration
    }

    // Function to go to next slide
    function nextSlide() {
        if (isAnimating) return;
        const newIndex = (currentSlide + 1) % slides.length;
        
        // Position next slide
        slides[newIndex].style.transform = 'translateX(100%)';
        slides[newIndex].style.visibility = 'visible';
        slides[newIndex].style.opacity = '0';
        
        // Force reflow
        slides[newIndex].offsetHeight;
        
        // Trigger animation
        requestAnimationFrame(() => {
            slides[newIndex].style.opacity = '1';
            updateSlide(newIndex);
        });
    }

    // Function to go to previous slide
    function prevSlide() {
        if (isAnimating) return;
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        
        // Position previous slide
        slides[newIndex].style.transform = 'translateX(-100%)';
        slides[newIndex].style.visibility = 'visible';
        slides[newIndex].style.opacity = '0';
        
        // Force reflow
        slides[newIndex].offsetHeight;
        
        // Trigger animation
        requestAnimationFrame(() => {
            slides[newIndex].style.opacity = '1';
            updateSlide(newIndex);
        });
    }

    // Event Listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentSlide) {
                const direction = index > currentSlide ? 1 : -1;
                slides[index].style.transform = `translateX(${100 * direction}%)`;
                updateSlide(index);
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    const projectsContainer = document.querySelector('.projects-container');

    projectsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    projectsContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    }

    // Optional: Auto-advance slides
    let autoAdvance;

    function startAutoAdvance() {
        autoAdvance = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoAdvance() {
        clearInterval(autoAdvance);
    }

    // Start auto-advance and handle hover pause
    startAutoAdvance();

    projectsContainer.addEventListener('mouseenter', stopAutoAdvance);
    projectsContainer.addEventListener('mouseleave', startAutoAdvance);
    projectsContainer.addEventListener('touchstart', stopAutoAdvance);
    projectsContainer.addEventListener('touchend', startAutoAdvance);

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoAdvance();
        } else {
            startAutoAdvance();
        }
    });

    // Initialize first slide
    slides[0].classList.add('active');
    dots[0].classList.add('active');
}); 