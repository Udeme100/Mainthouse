// Toggle mobile menu
function toggleMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active"); // Hide menu
  } else {
      mobileMenu.classList.add("active"); // Show menu
  }
}

// Load header and footer, then bind events
document.addEventListener("DOMContentLoaded", () => {
  includeHTML("header.html", "header-placeholder", attachSmoothScroll); // Pass callback
  includeHTML("footer.html", "footer-placeholder");

  // Adjust contact link based on the current page
  setTimeout(() => {
    const isOnIndex = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
    const contactLinks = document.querySelectorAll('.contact-nav-link');

    contactLinks.forEach(link => {
      link.setAttribute("href", isOnIndex ? "#contact" : "index.html#contact");
    });
  }, 100); // Wait a moment for the header to load in

  // Review Section Modal Functionality
  setupReviewSectionModal();

  // Attach event listeners to menu items for closing the menu after selection
  const menuItems = document.querySelectorAll(".mobile-menu ul li a");
  menuItems.forEach(menuItem => {
      menuItem.addEventListener("click", closeMenu);
  });
});

function includeHTML(file, elementId, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
      if (callback) callback(); // Run callback after loading
    })
    .catch(err => console.error(`Error loading ${file}:`, err));
}

function attachSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Back to Top Button functionality
window.addEventListener("scroll", () => {
  const backToTopButton = document.getElementById("backToTop");
  if (window.scrollY > 300) {
    backToTopButton.style.display = "block"; // Show button when scrolled down
  } else {
    backToTopButton.style.display = "none"; // Hide button when at the top
  }
});

// JavaScript to Toggle the Mobile Menu
function toggleMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active"); // Hide menu
  } else {
      mobileMenu.classList.add("active"); // Show menu
  }
}

// Close the menu after clicking on a menu item
function closeMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active"); // Hide menu after clicking
  }
}

// === Review Section Modal JS ===
function setupReviewSectionModal() {
  // Query all review-image elements that are buttons or links
  const reviewImages = document.querySelectorAll('.review-image');
  const imageModal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeModalBtn = document.querySelector('.close-modal');

  if (!imageModal || !modalImg || !closeModalBtn) return;

  reviewImages.forEach(btn => {
    btn.addEventListener('click', function() {
      // Prefer data-img attribute, fallback to img src
      const imgSrc = btn.getAttribute('data-img') || btn.querySelector('img').src;
      modalImg.src = imgSrc;
      imageModal.classList.add('active');
      document.body.classList.add('modal-open');
    });
  });

  // Close modal on close button click
  closeModalBtn.addEventListener('click', closeModal);

  // Close modal when clicking the overlay (but not the image)
  imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) closeModal();
  });

  // Close modal on ESC key
  document.addEventListener('keydown', function(e) {
    if (imageModal.classList.contains('active') && (e.key === "Escape" || e.key === "Esc")) closeModal();
  });

  function closeModal() {
    imageModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    modalImg.src = '';
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('formMessage');
  
    // Helper: Validate email format
    function isValidEmail(email) {
      // Simple regex for demonstration, use more robust if needed
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    // Helper: Validate phone (digits, spaces, dashes, parentheses, min 7 chars)
    function isValidPhone(phone) {
      return /^[\d\s\-\(\)]+$/.test(phone) && phone.replace(/\D/g,"").length >= 7;
    }
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
  
      // 1. Client-side validation
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const email = form.email.value.trim();
      const comments = form.comments.value.trim();
  
      let errorMsg = "";
      if (!name) errorMsg = "Please enter your name.";
      else if (!isValidPhone(phone)) errorMsg = "Enter a valid phone number (min 7 digits).";
      else if (!isValidEmail(email)) errorMsg = "Enter a valid email address.";
      else if (!comments) errorMsg = "Please enter your comments.";
  
      if (errorMsg) {
        messageDiv.textContent = errorMsg;
        messageDiv.style.color = "red";
        return;
      }
  
      // 2. Disable form & show loading
      form.querySelector('.submit-button').disabled = true;
      messageDiv.textContent = "Sending...";
      messageDiv.style.color = "black";
  
      // 3. Prepare data & send
      const data = { name, phone, email, comments };
  
      fetch('https://script.google.com/macros/s/AKfycbwfow9Ue0hzZsQ4kz2wR6AM10UMUHwD6IrNLkKGMyfDgADY7HKDtjEv33WfeK-YyXV9/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(response => {
        console.log('Server response:', response);
        if (response.result === "success") {
          messageDiv.textContent = "Thank you! Your message has been sent.";
          messageDiv.style.color = "green";
          form.reset();
        } else {
          messageDiv.textContent = "Sorry, something went wrong. Please try again.";
          messageDiv.style.color = "red";
        }
      })
      .catch(() => {
        messageDiv.textContent = "Network error. Please try again.";
        messageDiv.style.color = "red";
      })
      .finally(() => {
        form.querySelector('.submit-button').disabled = false;
      });
    });
  });