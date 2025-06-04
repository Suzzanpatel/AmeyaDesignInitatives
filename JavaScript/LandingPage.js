// Page Load Animation
document.addEventListener('DOMContentLoaded', function() {
  const mainContent = document.querySelector('.main-content');
  const logoTransition = document.querySelector('.logo-transition');
  const logoContainer = document.querySelector('.logo-container');
  
  // Get all sections for reveal animation
  const sections = document.querySelectorAll('.welcome-section, .expertise-section, .projects-section, .testimonials-section, .awards-container, .ethos-section');

  // Function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to handle section reveal on scroll
  function revealSection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        
        // Reveal child elements with staggered animation
        const childElements = entry.target.querySelectorAll('.expertise-box, .project-card, .testimonial, .award-card');
        childElements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('reveal');
          }, index * 100);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }

  // Create the intersection observer with smoother threshold
  const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
  });

  // Function to start observing sections
  function startSectionObservers() {
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // Show logo transition immediately
  logoTransition.classList.add('visible');
  logoContainer.style.transform = 'scale(1)';
  logoContainer.style.opacity = '1';

  // Hide logo and show main content after delay
  setTimeout(() => {
    logoTransition.classList.add('fade-out');
    mainContent.classList.add('visible');
    
    setTimeout(() => {
      startSectionObservers();
      
      // Reveal initial sections
      const initialSections = document.querySelectorAll('.welcome-section, .expertise-section');
      initialSections.forEach(section => {
        if (isElementInViewport(section)) {
          section.classList.add('reveal');
          
          const childElements = section.querySelectorAll('.expertise-box, .project-card');
          childElements.forEach((element, index) => {
            setTimeout(() => {
              element.classList.add('reveal');
            }, index * 100);
          });
        }
      });
    }, 600);
  }, 2000);

  // Mobile Navigation
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-item');

  if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      menuIcon.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
  }

  // Handle dropdown menus on mobile
  navItems.forEach(item => {
    const link = item.querySelector('a');
    const dropdownContent = item.querySelector('.dropdown-content');
    
    if (link && dropdownContent) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          
          // Close other dropdowns
          navItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle current dropdown
          item.classList.toggle('active');
        }
      });
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuIcon.contains(e.target)) {
      navLinks.classList.remove('active');
      menuIcon.innerHTML = '☰';
      // Close all dropdowns
      navItems.forEach(item => {
        item.classList.remove('active');
      });
    }
  });

  // Close menu when window is resized above mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active');
      menuIcon.innerHTML = '☰';
      navItems.forEach(item => {
        item.classList.remove('active');
      });
    }
  });

  // Welcome Section Image Slider
  const imageSlider = document.querySelector('.image-slider');
  
  if (imageSlider) {
    const slides = imageSlider.querySelectorAll('.slide');
    const indicators = imageSlider.querySelectorAll('.indicator');
    const prevSlideBtn = imageSlider.querySelector('.prev-slide');
    const nextSlideBtn = imageSlider.querySelector('.next-slide');
    let currentSlide = 0;
    let slideTimer;
    const slideInterval = 5000; // Change slide every 5 seconds
    
    // Function to show a specific slide
    function showSlide(index) {
      // Handle wrap-around
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;
      
      // Remove active class from all slides and indicators
      slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.transition = 'opacity 0.5s ease-in-out';
      });
      indicators.forEach(indicator => indicator.classList.remove('active'));
      
      // Add active class to current slide and indicator
      slides[index].classList.add('active');
      indicators[index].classList.add('active');
      
      currentSlide = index;
    }
    
    // Function to move to next slide
    function nextSlide() {
      showSlide(currentSlide + 1);
    }
    
    // Function to move to previous slide
    function prevSlide() {
      showSlide(currentSlide - 1);
    }
    
    // Function to start auto-sliding
    function startAutoSlide() {
      stopAutoSlide(); // Clear any existing timer
      slideTimer = setInterval(nextSlide, slideInterval);
    }
    
    // Function to stop auto-sliding
    function stopAutoSlide() {
      if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
      }
    }
    
    // Event listeners for navigation arrows
    if (prevSlideBtn) {
      prevSlideBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        stopAutoSlide();
        startAutoSlide(); // Restart timer after manual navigation
      });
    }
    
    if (nextSlideBtn) {
      nextSlideBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        stopAutoSlide();
        startAutoSlide(); // Restart timer after manual navigation
      });
    }
    
    // Click event for indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        showSlide(index);
        stopAutoSlide();
        startAutoSlide(); // Restart timer after manual navigation
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
      }
    });
    
    // Touch events for mobile
    let touchStartX = null;
    let touchEndX = null;
    
    imageSlider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      stopAutoSlide();
    }, { passive: true });
    
    imageSlider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
      startAutoSlide();
    }, { passive: true });
    
    function handleSwipe() {
      if (!touchStartX || !touchEndX) return;
      
      const swipeDistance = touchEndX - touchStartX;
      const minSwipeDistance = 50;
      
      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          prevSlide(); // Swipe right = previous slide
        } else {
          nextSlide(); // Swipe left = next slide
        }
      }
      
      touchStartX = null;
      touchEndX = null;
    }
    
    // Pause auto-sliding when user hovers over the slider
    imageSlider.addEventListener('mouseenter', stopAutoSlide);
    imageSlider.addEventListener('mouseleave', startAutoSlide);
    
    // Start auto-sliding when the page loads
    showSlide(0); // Show first slide
    startAutoSlide();
  }
  
  // Projects Carousel Functionality
  const projectCardsWrapper = document.getElementById('projectCardsWrapper');
  const prevButton = document.getElementById('prevProject');
  const nextButton = document.getElementById('nextProject');
  
  if (projectCardsWrapper && prevButton && nextButton) {
    const cards = projectCardsWrapper.querySelectorAll('.project-card');
    const cardWidth = 300; // Base card width
    const cardMargin = 30; // Gap between cards
    const totalCardWidth = cardWidth + cardMargin;
    
    let currentPosition = 0;
    let startX = 0;
    let isDragging = false;
    
    // Update card width based on screen size
    function updateCardWidth() {
      let newCardWidth = cardWidth;
      let newCardMargin = cardMargin;
      
      if (window.innerWidth <= 576) {
        newCardWidth = 200;
        newCardMargin = 15;
      } else if (window.innerWidth <= 768) {
        newCardWidth = 220;
        newCardMargin = 20;
      } else if (window.innerWidth <= 992) {
        newCardWidth = 240;
        newCardMargin = 25;
      } else if (window.innerWidth <= 1200) {
        newCardWidth = 280;
        newCardMargin = 30;
      }
      
      return { width: newCardWidth, margin: newCardMargin };
    }
    
    // Calculate the maximum scroll position
    function getMaxScrollPosition() {
      const { width, margin } = updateCardWidth();
      const totalWidth = cards.length * (width + margin);
      const containerWidth = projectCardsWrapper.parentElement.clientWidth;
      return Math.max(0, totalWidth - containerWidth);
    }
    
    // Move the carousel
    function moveCarousel(position) {
      const maxScroll = getMaxScrollPosition();
      
      // Ensure position stays within bounds
      if (position < 0) position = 0;
      if (position > maxScroll) position = maxScroll;
      
      currentPosition = position;
      projectCardsWrapper.style.transform = `translateX(${-position}px)`;
      
      // Add cinematic tilt effect to cards
      cards.forEach((card, index) => {
        const centerPosition = currentPosition + (projectCardsWrapper.parentElement.clientWidth / 2);
        const cardCenter = index * totalCardWidth + (totalCardWidth / 2);
        const distanceFromCenter = cardCenter - centerPosition;
        const normalizedDistance = distanceFromCenter / (projectCardsWrapper.parentElement.clientWidth / 2);
        const rotateY = normalizedDistance * 15; // Max 15 degrees rotation
        
        card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) translateZ(${Math.abs(rotateY)}px)`;
        
        // Adjust shadow based on tilt
        if (rotateY > 0) {
          card.style.boxShadow = `-15px 15px 35px rgba(0, 0, 0, 0.5)`;
        } else {
          card.style.boxShadow = `15px 15px 35px rgba(0, 0, 0, 0.5)`;
        }
      });
    }
    
    // Event handlers for buttons
    prevButton.addEventListener('click', () => {
      const { width, margin } = updateCardWidth();
      moveCarousel(currentPosition - (width + margin));
    });
    
    nextButton.addEventListener('click', () => {
      const { width, margin } = updateCardWidth();
      moveCarousel(currentPosition + (width + margin));
    });
    
    // Mouse and touch event handlers for swipe functionality
    projectCardsWrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      projectCardsWrapper.style.transition = 'none';
      e.preventDefault();
    });
    
    projectCardsWrapper.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      projectCardsWrapper.style.transition = 'none';
    }, { passive: true });
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const x = e.clientX;
      const diff = startX - x;
      moveCarousel(currentPosition + diff);
      startX = x;
    });
    
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const x = e.touches[0].clientX;
      const diff = startX - x;
      moveCarousel(currentPosition + diff);
      startX = x;
    }, { passive: true });
    
    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        projectCardsWrapper.style.transition = 'transform 0.5s ease-in-out';
      }
    });
    
    window.addEventListener('touchend', () => {
      if (isDragging) {
        isDragging = false;
        projectCardsWrapper.style.transition = 'transform 0.5s ease-in-out';
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      projectCardsWrapper.style.transition = 'none';
      moveCarousel(currentPosition);
      setTimeout(() => {
        projectCardsWrapper.style.transition = 'transform 0.5s ease-in-out';
      }, 50);
    });
    
    // Initialize cards position
    moveCarousel(0);
  }
  
  // Update the function to create a more cinematic curved view
  window.updateCinematicViewForTallerCards = function(activeIndex) {
    // Only apply 3D effects on larger screens
    if (window.innerWidth <= 768) return;
    
    const slides = document.querySelectorAll('.project-slide');
    
    slides.forEach((slide, index) => {
      // Calculate the relative position to the active slide
      const position = index - activeIndex;
      
      // Apply appropriate transform based on position for taller cards with cinematic curve
      let rotateY, translateZ, translateX, scale, zIndex, opacity;
      
      // Determine values based on position
      switch (Math.abs(position)) {
        case 0: // Center (active) slide
          rotateY = 0;
          translateZ = 0;
          translateX = 0;
          scale = 1;
          zIndex = 5;
          opacity = 1;
          break;
        case 1: // Adjacent slides
          rotateY = position * 25;
          translateZ = -120;
          translateX = position * 40;
          scale = 0.85;
          zIndex = 2;
          opacity = 0.8;
          break;
        case 2: // Further slides
          rotateY = position * 35;
          translateZ = -180;
          translateX = position * 80;
          scale = 0.7;
          zIndex = 1;
          opacity = 0.6;
          break;
        default: // Hidden slides
          rotateY = position * 45;
          translateZ = -220;
          translateX = position * 120;
          scale = 0.5;
          zIndex = 0;
          opacity = 0;
          break;
      }
      
      // Apply the transforms with animation for a more cinematic effect
      slide.style.transform = `rotateY(${rotateY}deg) translateZ(${translateZ}px) translateX(${translateX}px) scale(${scale})`;
      slide.style.zIndex = zIndex;
      slide.style.opacity = opacity;
    });
  };
  
  // Initialize the cinematic display with the center slide being active
  const projectSlides = document.querySelectorAll('.project-slide');
  if (projectSlides.length > 0) {
    const centerIndex = Math.floor(projectSlides.length / 2);
    projectSlides[centerIndex].classList.add('active');
    
    // Initial setup based on screen size
    if (window.innerWidth > 768) {
      updateCinematicViewForTallerCards(centerIndex);
    } else {
      // For mobile, show only the active slide to prevent horizontal scrolling
      projectSlides.forEach((slide, index) => {
        if (index === centerIndex) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
        slide.style.transform = 'none';
      });
    }
  }
  
  // Enhanced touch swipe functionality for both mobile and desktop
  const cinematicDisplay = document.querySelector('.cinematic-display');
  if (cinematicDisplay) {
    // Variables to track touch/mouse movements
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
    let isMouseDown = false;
    
    // Functions for touch devices
    const handleTouchStart = (e) => {
      startX = e.changedTouches[0].screenX;
      startY = e.changedTouches[0].screenY;
      startTime = new Date().getTime();
    };
    
    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].screenX;
      const endY = e.changedTouches[0].screenY;
      const endTime = new Date().getTime();
      
      distX = endX - startX;
      distY = endY - startY;
      
      // Only register as swipe if:
      // 1. Moved more horizontally than vertically
      // 2. Moved at least 50px
      // 3. Completed in under 300ms for a quick swipe
      const isHorizontalSwipe = Math.abs(distX) > Math.abs(distY);
      const isQuickSwipe = (endTime - startTime) < 300;
      
      if (isHorizontalSwipe && Math.abs(distX) > 50) {
        if (distX < 0) {
          // Swipe left - next slide
          scrollCinematicProjects(1);
        } else {
          // Swipe right - previous slide
          scrollCinematicProjects(-1);
        }
      }
    };
    
    // Functions for mouse drag (desktop) to simulate swipe
    const handleMouseDown = (e) => {
      isMouseDown = true;
      startX = e.clientX;
      startY = e.clientY;
      startTime = new Date().getTime();
      
      // Prevent default dragging behavior
      e.preventDefault();
    };
    
    const handleMouseUp = (e) => {
      if (!isMouseDown) return;
      
      isMouseDown = false;
      const endX = e.clientX;
      const endY = e.clientY;
      const endTime = new Date().getTime();
      
      distX = endX - startX;
      distY = endY - startY;
      
      // Same criteria as touch swipe
      const isHorizontalSwipe = Math.abs(distX) > Math.abs(distY);
      const isQuickSwipe = (endTime - startTime) < 300;
      
      if (isHorizontalSwipe && Math.abs(distX) > 50) {
        if (distX < 0) {
          // Swipe left - next slide
          scrollCinematicProjects(1);
        } else {
          // Swipe right - previous slide
          scrollCinematicProjects(-1);
        }
      }
    };
    
    const handleMouseMove = (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
    };
    
    // Add event listeners for both touch and mouse events
    cinematicDisplay.addEventListener('touchstart', handleTouchStart, { passive: true });
    cinematicDisplay.addEventListener('touchend', handleTouchEnd);
    
    cinematicDisplay.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp); // Listen on document to catch releases outside
    document.addEventListener('mousemove', handleMouseMove, { passive: false });
  }
  
  // Listen for window resize to adjust the view
  window.addEventListener('resize', () => {
    const activeSlide = document.querySelector('.project-slide.active');
    if (activeSlide) {
      const activeIndex = Array.from(projectSlides).indexOf(activeSlide);
      if (window.innerWidth > 768) {
        // For desktop, show all slides and apply 3D effect
        projectSlides.forEach(slide => {
          slide.style.display = 'block';
        });
        updateCinematicViewForTallerCards(activeIndex);
      } else {
        // For mobile, show only the active slide to prevent horizontal scrolling
        projectSlides.forEach((slide, index) => {
          if (index === activeIndex) {
            slide.style.display = 'block';
          } else {
            slide.style.display = 'none';
          }
          slide.style.transform = 'none';
        });
      }
    }
  });

  // Add testimonials slider functionality
  const testimonialSlider = document.getElementById('testimonialsSlider');
  if (testimonialSlider) {
    const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
    const dots = testimonialSlider.querySelectorAll('.testimonial-dot');
    const prevBtn = testimonialSlider.querySelector('.prev-testimonial');
    const nextBtn = testimonialSlider.querySelector('.next-testimonial');
    let currentIndex = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }
    
    // Event listeners for navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(currentIndex - 1);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(currentIndex + 1);
      });
    }
    
    // Click on dots to navigate
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
      });
    });
    
    // Swipe functionality for testimonials
    let touchStartX = null;
    let touchEndX = null;
    
    testimonialSlider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    testimonialSlider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    }, { passive: true });
    
    // Also handle mouse swipe (drag)
    let isMouseDown = false;
    
    testimonialSlider.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      touchStartX = e.clientX;
    });
    
    document.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      touchEndX = e.clientX;
      handleSwipe();
    });
    
    // Handle the swipe direction
    function handleSwipe() {
      if (!touchStartX || !touchEndX) return;
      
      const distance = touchEndX - touchStartX;
      if (Math.abs(distance) > 50) {
        if (distance > 0) {
          // Swipe right - previous slide
          showSlide(currentIndex - 1);
        } else {
          // Swipe left - next slide
          showSlide(currentIndex + 1);
        }
      }
      
      touchStartX = null;
      touchEndX = null;
    }
    
    // Auto rotate testimonials every 10 seconds
    setInterval(() => {
      showSlide(currentIndex + 1);
    }, 10000);
  }
});

// For backward compatibility with other code
function scrollProjects(direction) {
  const nextButton = document.getElementById('nextProject');
  const prevButton = document.getElementById('prevProject');
  
  if (direction > 0 && nextButton) {
    nextButton.click();
  } else if (direction < 0 && prevButton) {
    prevButton.click();
  }
}

function scrollCinematicProjects(direction) {
  const slides = document.querySelectorAll('.project-slide');
  if (slides.length === 0) return;
  
  // Find the currently active slide
  let activeIndex = -1;
  slides.forEach((slide, index) => {
    if (slide.classList.contains('active')) {
      activeIndex = index;
    }
  });
  
  // If no active slide found, default to the center
  if (activeIndex === -1) {
    activeIndex = Math.floor(slides.length / 2);
  }
  
  // Calculate the new active index
  let newIndex = activeIndex + direction;
  
  // Wrap around if needed
  if (newIndex < 0) newIndex = slides.length - 1;
  if (newIndex >= slides.length) newIndex = 0;
  
  // Remove active class from all slides
  slides.forEach(slide => slide.classList.remove('active'));
  
  // Add active class to the new active slide
  slides[newIndex].classList.add('active');
  
  // Handle both mobile and desktop views with animation
  if (window.innerWidth <= 768) {
    // For mobile, use a fade transition instead of display none/block
    slides.forEach((slide, i) => {
      // First make all slides visible but transparent
      slide.style.display = 'block';
      
      // Prepare for animation
      slide.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      
      if (i === newIndex) {
        // Active slide fades in and scales up slightly
        slide.style.opacity = '1';
        slide.style.transform = 'scale(1)';
        slide.style.zIndex = '5';
      } else {
        // Other slides fade out and scale down
        slide.style.opacity = '0';
        slide.style.transform = 'scale(0.8)';
        slide.style.zIndex = '1';
        
        // Hide it after animation completes to prevent interaction
        setTimeout(() => {
          if (!slide.classList.contains('active')) {
            slide.style.display = 'none';
          }
        }, 400);
      }
    });
  } else {
    // Update the transforms for the curved effect on larger screens
    updateCinematicViewForTallerCards(newIndex);
  }
}

// Keep the original function for compatibility, but redirect to the new one
function updateCinematicView(activeIndex) {
  updateCinematicViewForTallerCards(activeIndex);
}

