const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
const header = document.querySelector('.site-header');
const yearSpan = document.getElementById('year');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox?.querySelector('img');
const whatsappBtn = document.getElementById('whatsappBtn');
const reviewForm = document.getElementById('reviewForm');
const reviewsGrid = document.getElementById('reviewsGrid');
const themeToggle = document.getElementById('themeToggle');

// Initialize theme from localStorage or system preference
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const isDarkMode = savedTheme === 'dark';
  
  if (isDarkMode) {
    document.documentElement.classList.remove('light-mode');
    if (themeToggle) themeToggle.textContent = '🌙';
  } else {
    document.documentElement.classList.add('light-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
};

// Initialize theme on page load
initializeTheme();

// Theme toggle handler
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLightMode = document.documentElement.classList.toggle('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    themeToggle.textContent = isLightMode ? '☀️' : '🌙';
  });
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

if (nav) {
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');

      if (href && href.startsWith('#')) {
        event.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }

        nav.classList.remove('active');
      }
    });
  });
}

if (lightbox && lightboxImg) {
  document.querySelectorAll('.gallery-scroll img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('show');
    });
  });
}

if (lightbox) {
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
  });
}

if (whatsappBtn) {
  whatsappBtn.addEventListener('click', () => {
    window.open('https://wa.me/263785610035', '_blank');
  });
}

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Review form submission handler
if (reviewForm && reviewsGrid) {
  reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('reviewName').value;
  const email = document.getElementById('reviewEmail').value;
  const rating = document.querySelector('input[name="rating"]:checked').value;
  const reviewText = document.getElementById('reviewText').value;

  // Create star rating HTML
  const stars = Array(5)
    .fill(0)
    .map((_, i) => `<span class="star">${i < rating ? '★' : '☆'}</span>`)
    .join('');

  // Create new review card
  const newReview = document.createElement('article');
  newReview.className = 'review-card';
  newReview.innerHTML = `
    <div class="review-stars">
      ${stars}
    </div>
    <p class="review-text">"${reviewText}"</p>
    <div class="review-author">
      <strong>${name}</strong>
      <span>Guest Review</span>
    </div>
  `;

  // Add to reviews grid (prepend so new reviews appear first)
  reviewsGrid.insertBefore(newReview, reviewsGrid.firstChild);

  // Reset form
  reviewForm.reset();

  // Show success message
  const successMsg = document.createElement('div');
  successMsg.className = 'success-message';
  successMsg.textContent = 'Thank you! Your review has been posted.';
  reviewForm.parentElement.appendChild(successMsg);

  setTimeout(() => {
    successMsg.remove();
  }, 3000);
  });
}

// Improve star rating interaction
const starLabels = document.querySelectorAll('.star-label');
starLabels.forEach((label) => {
  label.addEventListener('click', function() {
    this.previousElementSibling.checked = true;
  });
});

// Room details toggle
const roomToggles = document.querySelectorAll('.room-toggle');
roomToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const room = toggle.getAttribute('data-room');
    const details = document.getElementById(`${room}-details`);
    const isShown = details.classList.contains('show');
    
    // Hide all details first
    document.querySelectorAll('.room-details').forEach((detail) => {
      detail.classList.remove('show');
    });
    document.querySelectorAll('.room-toggle').forEach((btn) => {
      btn.textContent = 'View Details';
    });
    
    // Show this one if it wasn't shown
    if (!isShown) {
      details.classList.add('show');
      toggle.textContent = 'Hide Details';
    }
  });
});

// Room gallery lightbox
if (lightbox && lightboxImg) {
  document.querySelectorAll('.room-gallery img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('show');
    });
  });
}
