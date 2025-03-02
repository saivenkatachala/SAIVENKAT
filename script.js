// Toggle mobile menu
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth scrolling with animations
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    targetSection.style.opacity = '0';
    targetSection.style.transform = 'translateY(50px)';
    setTimeout(() => {
      targetSection.style.opacity = '1';
      targetSection.style.transform = 'translateY(0)';
    }, 300);
  });
});

// Add scroll event listener for section animations
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;

    if (sectionTop < window.innerHeight * 0.75 && sectionBottom > 0) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    } else {
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px)';
    }
  });
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('email', document.getElementById('email').value);
  formData.append('message', document.getElementById('message').value);

  const scriptURL = 'https://script.google.com/macros/s/AKfycbxhQIdVi5IxyzE8U3nfcLUDHiBJdKv5S3ckSAEgRZ0JTvGSoPRLakrsdzW1ai-jAfrX/exec';

  formResponse.textContent = 'Sending message...';
  formResponse.style.color = '#00bcd4';

  fetch(scriptURL, {
    method: 'POST',
    body: formData, // Using FormData instead of JSON
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        formResponse.textContent = data.message || 'Message sent successfully!Thank you for contacting😇';
        formResponse.style.color = '#4caf50';
        contactForm.reset();
      } else {
        formResponse.textContent = data.message || 'Error sending message. Please try again.';
        formResponse.style.color = '#f44336';
      }
    })
    .catch(error => {
      formResponse.textContent = 'Error sending message. Please try again.';
      formResponse.style.color = '#f44336';
      console.error('Error:', error);
    });
});
// Tab Switching Logic
const tabButtons = document.querySelectorAll(".tab-btn");
const projectSections = document.querySelectorAll(".projects-grid");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    projectSections.forEach(section => section.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.target).classList.add("active");
  });
});

