// Projects Data and Management
const projectsData = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        liveUrl: '#',
        githubUrl: '#',
        details: {
            overview: 'A comprehensive e-commerce platform built with modern web technologies.',
            features: [
                'User authentication and authorization',
                'Product catalog with search and filtering',
                'Shopping cart and checkout process',
                'Payment integration with Stripe',
                'Admin dashboard for managing products',
                'Responsive design for all devices'
            ],
            challenges: 'The main challenge was implementing real-time inventory updates and ensuring secure payment processing.',
            technologies: {
                'Frontend': ['React', 'Redux', 'CSS Modules'],
                'Backend': ['Node.js', 'Express', 'JWT'],
                'Database': ['MongoDB', 'Mongoose'],
                'Payment': ['Stripe API'],
                'Hosting': ['AWS', 'Netlify']
            }
        }
    },
    {
        id: 2,
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
        image: 'https://images.pexels.com/photos/3153204/pexels-photo-3153204.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['Vue.js', 'Firebase', 'Socket.io'],
        liveUrl: '#',
        githubUrl: '#',
        details: {
            overview: 'A modern task management application designed for team collaboration.',
            features: [
                'Drag-and-drop task organization',
                'Real-time collaboration',
                'Team member management',
                'Progress tracking and analytics',
                'Mobile-responsive design',
                'Dark/light theme switching'
            ],
            challenges: 'Implementing real-time synchronization across multiple users while maintaining data consistency.',
            technologies: {
                'Frontend': ['Vue.js', 'Vuex', 'Vuetify'],
                'Backend': ['Firebase', 'Cloud Functions'],
                'Real-time': ['Socket.io', 'Firebase Realtime DB'],
                'Authentication': ['Firebase Auth'],
                'Hosting': ['Firebase Hosting']
            }
        }
    },
    {
        id: 3,
        title: 'Weather Dashboard',
        description: 'An interactive weather dashboard with location-based forecasts, historical data visualization, and severe weather alerts.',
        image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['JavaScript', 'D3.js', 'OpenWeather API'],
        liveUrl: '#',
        githubUrl: '#',
        details: {
            overview: 'A comprehensive weather dashboard with advanced data visualization.',
            features: [
                'Current weather conditions',
                '7-day forecast with hourly details',
                'Interactive weather maps',
                'Historical data visualization',
                'Severe weather alerts',
                'Location-based services'
            ],
            challenges: 'Creating smooth data visualizations and handling large datasets from multiple weather APIs.',
            technologies: {
                'Frontend': ['Vanilla JavaScript', 'D3.js', 'Chart.js'],
                'APIs': ['OpenWeather API', 'Geolocation API'],
                'Visualization': ['D3.js', 'Canvas API'],
                'Styling': ['CSS Grid', 'CSS Animations'],
                'Build': ['Webpack', 'Babel']
            }
        }
    }
];

class ProjectsManager {
    constructor() {
        this.container = document.getElementById('projects-grid');
        this.modal = document.getElementById('project-modal');
        this.modalBody = document.getElementById('modal-body');
        this.modalClose = document.getElementById('modal-close');
        
        this.init();
    }
    
    init() {
        this.renderProjects();
        this.setupModalEvents();
        this.setupIntersectionObserver();
    }
    
    renderProjects() {
        this.container.innerHTML = '';
        
        projectsData.forEach((project, index) => {
            const projectElement = this.createProjectElement(project, index);
            this.container.appendChild(projectElement);
        });
    }
    
    createProjectElement(project, index) {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-card';
        projectDiv.style.animationDelay = `${index * 0.1}s`;
        
        projectDiv.innerHTML = `
            <div class="project-image" style="background-image: url('${project.image}')"></div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveUrl}" class="project-link" target="_blank">Live Demo</a>
                    <a href="${project.githubUrl}" class="project-link" target="_blank">GitHub</a>
                </div>
            </div>
        `;
        
        // Add click handler to open modal
        projectDiv.addEventListener('click', (e) => {
            if (!e.target.classList.contains('project-link')) {
                this.openProjectModal(project);
            }
        });
        
        return projectDiv;
    }
    
    openProjectModal(project) {
        const details = project.details;
        
        this.modalBody.innerHTML = `
            <div class="modal-project">
                <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1.5rem;">
                <h2 style="color: #6366f1; margin-bottom: 1rem;">${project.title}</h2>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: #ffffff; margin-bottom: 0.5rem;">Overview</h3>
                    <p style="color: #d4d4d8; line-height: 1.6;">${details.overview}</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: #ffffff; margin-bottom: 0.5rem;">Key Features</h3>
                    <ul style="color: #d4d4d8; line-height: 1.6; padding-left: 1.5rem;">
                        ${details.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: #ffffff; margin-bottom: 0.5rem;">Technologies Used</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        ${Object.entries(details.technologies).map(([category, techs]) => `
                            <div>
                                <h4 style="color: #8b5cf6; margin-bottom: 0.5rem;">${category}</h4>
                                <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
                                    ${techs.map(tech => `<span style="background: rgba(6, 182, 212, 0.2); color: #06b6d4; padding: 0.25rem 0.5rem; border-radius: 15px; font-size: 0.8rem;">${tech}</span>`).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: #ffffff; margin-bottom: 0.5rem;">Challenges & Solutions</h3>
                    <p style="color: #d4d4d8; line-height: 1.6;">${details.challenges}</p>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <a href="${project.liveUrl}" target="_blank" class="btn btn-primary">View Live Demo</a>
                    <a href="${project.githubUrl}" target="_blank" class="btn btn-outline">View Source Code</a>
                </div>
            </div>
        `;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeProjectModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    setupModalEvents() {
        // Close modal when clicking close button
        this.modalClose.addEventListener('click', () => {
            this.closeProjectModal();
        });
        
        // Close modal when clicking overlay
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal || e.target.classList.contains('modal-overlay')) {
                this.closeProjectModal();
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeProjectModal();
            }
        });
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe all project cards
        document.querySelectorAll('.project-card').forEach((card) => {
            observer.observe(card);
        });
    }
}

// Initialize projects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsManager();
});