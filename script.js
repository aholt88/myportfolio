document.documentElement.classList.add('js-enabled');

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});

const desktopNavigation = window.matchMedia('(min-width: 1001px)');
desktopNavigation.addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

const filters = document.querySelector('.project-filters');
const filterButtons = filters.querySelectorAll('button');
const projects = document.querySelectorAll('.project-card');
const filterStatus = document.querySelector('#filter-status');

filters.hidden = false;

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });

    projects.forEach((project) => {
      const isVisible = category === 'all' || project.dataset.category === category;
      project.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'} shown.`;
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
