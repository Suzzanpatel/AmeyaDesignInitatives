const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
function scrollProjects(direction) {
  const container = document.querySelector('.projects-container');
  container.scrollBy({ left: direction * 320, behavior: 'smooth' });
}

