import { allProjects, categories, projectGroups } from './project-data.js';

const filters = document.querySelector('#projectFilters');
const grid = document.querySelector('#projectGrid');
let activeCategory = 'Harness';

function renderFilters() {
  filters.innerHTML = categories
    .map((category) => {
      const active = category === activeCategory ? ' class="is-active"' : '';
      return `<button type="button"${active} aria-pressed="${category === activeCategory}" data-category="${category}">${category}</button>`;
    })
    .join('');
}

function renderProjects() {
  const projects = activeCategory === '全部' ? allProjects : projectGroups[activeCategory];
  grid.innerHTML = projects
    .map((project) => {
      const href = project.href ?? '#contact';
      return `
        <a class="project-card" href="${href}">
          <img src="${project.image}" alt="${project.title}作品图片" loading="lazy" />
          <div class="project-body">
            <span>${project.tag}</span>
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
            <span class="project-link">${project.href ? '查看详情' : '联系了解'} -&gt;</span>
          </div>
        </a>
      `;
    })
    .join('');
}

filters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-category]');
  if (!button || !categories.includes(button.dataset.category)) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderProjects();
});

renderFilters();
renderProjects();
