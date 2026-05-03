const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
const header = document.querySelector('.site-header');
const yearSpan = document.getElementById('year');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const whatsappBtn = document.getElementById('whatsappBtn');
const reviewForm = document.getElementById('reviewForm');
const reviewsGrid = document.getElementById('reviewsGrid');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }

    nav.classList.remove('active');
  });
});

document.querySelectorAll('.gallery-scroll img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('show');
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('show');
});

whatsappBtn.addEventListener('click', () => {
  window.open('https://wa.me/263000000000', '_blank');
});

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Review form submission handler
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

// Improve star rating interaction
const starLabels = document.querySelectorAll('.star-label');
starLabels.forEach((label) => {
  label.addEventListener('click', function() {
    this.previousElementSibling.checked = true;
  });
});
