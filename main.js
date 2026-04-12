// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Uncomment below to run only once
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Initialize elements with .fade-in-up class
const setupAnimations = () => {
  const elements = document.querySelectorAll('.fade-in-up');
  elements.forEach(el => observer.observe(el));
};

// Carousel Auto-play
const setupCarouselAutoPlay = () => {
  const carousel = document.querySelector('.carousel-container');
  if (!carousel) return;

  // Clone the first image and append it to create a seamless infinite loop illusion
  const firstImage = carousel.firstElementChild;
  if (firstImage) {
    const clone = firstImage.cloneNode(true);
    carousel.appendChild(clone);
  }

  // Auto-scroll every 3.5 seconds
  setInterval(() => {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    // If we are currently resting on the cloned first image (at the very end)
    if (carousel.scrollLeft >= maxScroll - 10) {
      // 1. Instantly jump back to the REAL first image (looks identical, no animation)
      carousel.scrollTo({ left: 0, behavior: 'auto' });

      // 2. Wait a tiny bit for the browser to register the jump, then smoothly slide to the second image
      setTimeout(() => {
        carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' });
      }, 50);
    } else {
      // Normal smooth slide to the next image
      carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' });
    }
  }, 3500);
};

document.addEventListener('DOMContentLoaded', () => {
  setupAnimations();
  setupCarouselAutoPlay();

  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('mobile-open');
    });
  }
});

// ── Modal Controls ──
window.openModal = function(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ESC key closes any active modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
});
