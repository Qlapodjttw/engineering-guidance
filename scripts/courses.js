/* scripts/courses.js - Dynamic Catalog Rendering & Filters (Updated with Unsplash stock image URLs) */

function initCourses() {
  // Sample static data with Unsplash stock images - Engineering Fields
  const courses = [
    { id: 1, title: 'Mechanical Engineering', skill: 'mechanical', level: 'beginner', image: 'https://source.unsplash.com/400x300/?mechanical,engineering', description: 'Design and build machines, systems, and devices. Perfect if you love building things and solving mechanical problems.' },
    { id: 2, title: 'Software Engineering', skill: 'software', level: 'intermediate', image: 'https://source.unsplash.com/400x300/?software,programming', description: 'Create software applications and systems. Ideal for problem-solvers who enjoy coding and technology innovation.' },
    { id: 3, title: 'Electrical Engineering', skill: 'electrical', level: 'intermediate', image: 'https://source.unsplash.com/400x300/?electrical,circuit', description: 'Work with electronics, power systems, and circuits. Great for those fascinated by electricity and technology.' },
    { id: 4, title: 'Civil Engineering', skill: 'civil', level: 'beginner', image: 'https://source.unsplash.com/400x300/?civil,construction', description: 'Design and build infrastructure like bridges, roads, and buildings. Perfect for those who want to shape the physical world.' },
    { id: 5, title: 'Chemical Engineering', skill: 'mechanical', level: 'advanced', image: 'https://source.unsplash.com/400x300/?chemical,laboratory', description: 'Transform raw materials into useful products. Ideal for those interested in chemistry and industrial processes.' },
    { id: 6, title: 'Aerospace Engineering', skill: 'mechanical', level: 'advanced', image: 'https://source.unsplash.com/400x300/?aerospace,aircraft', description: 'Design aircraft and spacecraft. Perfect for those fascinated by flight and space exploration.' },
    { id: 7, title: 'Biomedical Engineering', skill: 'software', level: 'intermediate', image: 'https://source.unsplash.com/400x300/?biomedical,medical', description: 'Combine engineering with medicine to improve healthcare. Great for those who want to help people through technology.' },
    { id: 8, title: 'Environmental Engineering', skill: 'civil', level: 'beginner', image: 'https://source.unsplash.com/400x300/?environmental,green', description: 'Protect the environment through sustainable engineering solutions. Perfect for those passionate about sustainability.' }
  ];

  // Pagination settings
  const ITEMS_PER_PAGE = 4;
  let currentPage = 1;
  let filtered = [...courses];

  // DOM elements
  const grid = document.getElementById('courses-catalog');
  const skillFilter = document.getElementById('filter-skill');
  const levelFilter = document.getElementById('filter-level');
  const searchInput = document.getElementById('search-courses');
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');

  // Render a page of cards
  function renderPage(page) {
    grid.innerHTML = '';
    const start = (page - 1) * ITEMS_PER_PAGE;
    const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);
    pageItems.forEach(course => {
      const card = document.createElement('div');
      card.className = 'card fade-in';
      card.innerHTML = `
        <img src="${course.image}" alt="${course.title}" loading="lazy" />
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <a href="course-detail.html?id=${course.id}" class="btn enroll">Explore Field</a>
      `;
      grid.appendChild(card);
    });
    updatePagination();
    // trigger scroll reveal for new elements
    document.querySelectorAll('.fade-in').forEach(el => {
      if (!el.classList.contains('visible') && el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }

  // Update pagination buttons and info
  function updatePagination() {
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  // Filter logic
  function applyFilters() {
    const skill = skillFilter.value;
    const level = levelFilter.value;
    const query = searchInput.value.trim().toLowerCase();

    filtered = courses.filter(c => {
      return (skill === 'all' || c.skill === skill) &&
             (level === 'all' || c.level === level) &&
             (c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query));
    });
    currentPage = 1;
    renderPage(currentPage);
  }

  // Event listeners
  skillFilter.addEventListener('change', applyFilters);
  levelFilter.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', debounce(applyFilters, 300));
  prevBtn.addEventListener('click', () => { currentPage--; renderPage(currentPage); });
  nextBtn.addEventListener('click', () => { currentPage++; renderPage(currentPage); });

  // Initialize view
  applyFilters();
}

export { initCourses };
