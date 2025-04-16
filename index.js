// JavaScript to Toggle the Mobile Menu
// Toggle the mobile menu display
function toggleMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu.style.display === "block") {
      mobileMenu.style.display = "none";
    } else {
      mobileMenu.style.display = "block";
    }
  }
  

// Example: Smooth Scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});