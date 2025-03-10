// JavaScript file simulating TypeScript functionality
// Since we couldn't compile TypeScript, we're using plain JavaScript with JSDoc comments

/**
 * @typedef {Object} Project
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string[]} technologies
 * @property {string} [githubUrl]
 * @property {string} [liveUrl]
 */

class PortfolioManager {
  /**
   * @type {Project[]}
   * @private
   */
  projects = [];
  
  constructor() {
    this.loadProjects();
  }
  
  /**
   * Load projects data
   * @private
   */
  loadProjects() {
    // In a real app, this might fetch from an API
    this.projects = [
      {
        id: 1,
        title: "Portfolio Website",
        description: "My personal portfolio showcasing various projects and skills",
        technologies: ["HTML", "CSS", "TypeScript", "React"],
        githubUrl: "https://github.com/yourusername/portfolio",
        liveUrl: "https://yourportfolio.com"
      },
      {
        id: 2,
        title: "Blog Platform",
        description: "A full-stack blog platform with user authentication",
        technologies: ["TypeScript", "Node.js", "Express", "MongoDB"],
        githubUrl: "https://github.com/yourusername/blog-platform"
      },
      {
        id: 3,
        title: "Fitness Tracker",
        description: "Mobile app to track workouts and nutrition",
        technologies: ["TypeScript", "React Native", "Firebase"],
        githubUrl: "https://github.com/yourusername/fitness-tracker",
        liveUrl: "https://play.google.com/store/apps/details?id=com.yourapp"
      }
    ];
    
    this.renderProjects();
  }
  
  /**
   * Render projects to the DOM
   * @private
   */
  renderProjects() {
    const container = document.getElementById('typescript-projects');
    if (!container) return;
    
    container.innerHTML = this.projects.map(project => `
      <div class="ts-project-card">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-list">
          ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank">GitHub</a>` : ''}
          ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank">Live Demo</a>` : ''}
        </div>
      </div>
    `).join('');
  }
  
  /**
   * Filter projects by technology
   * @param {string} technology
   * @public
   */
  filterByTechnology(technology) {
    const container = document.getElementById('typescript-projects');
    if (!container) return;
    
    const filteredProjects = technology === 'all' 
      ? this.projects 
      : this.projects.filter(project => 
          project.technologies.includes(technology)
        );
    
    container.innerHTML = filteredProjects.map(project => `
      <div class="ts-project-card">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-list">
          ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank">GitHub</a>` : ''}
          ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank">Live Demo</a>` : ''}
        </div>
      </div>
    `).join('');
  }
}

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', () => {
  const portfolioManager = new PortfolioManager();
  
  // Add filter buttons if needed
  const typescriptSection = document.getElementById('typescript-demo');
  if (typescriptSection) {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-buttons';
    filterContainer.innerHTML = `
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="TypeScript">TypeScript</button>
      <button class="filter-btn" data-filter="React">React</button>
      <button class="filter-btn" data-filter="Node.js">Node.js</button>
    `;
    
    typescriptSection.querySelector('.container').insertBefore(
      filterContainer, 
      document.getElementById('typescript-projects')
    );
    
    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        portfolioManager.filterByTechnology(button.getAttribute('data-filter'));
      });
    });
  }
}); 