// Skills Data and Management
const skillsData = [
    { name: 'HTML5', icon: '📄', level: 95 },
    { name: 'CSS3', icon: '🎨', level: 90 },
    { name: 'JavaScript', icon: '🚀', level: 90 },
    { name: 'React', icon: '⚛️', level: 85 },
    { name: 'Python', icon: '🐍', level: 75 }, 
    { name: 'MongoDB', icon: '🍃', level: 70 },
    { name: 'Node.js', icon: '🟢', level: 80 },
    { name: 'TypeScript', icon: '📘', level: 75 },
    { name: 'Git', icon: '📦', level: 85 },
    { name: 'Docker', icon: '🐳', level: 65 },
    { name: 'AWS', icon: '☁️', level: 60 },
    { name: 'Vue.js', icon: '💚', level: 70 }
];

class SkillsManager {
    constructor() {
        this.container = document.getElementById('skills-grid');
        this.observer = null;
        this.init();
    }
    
    init() {
        this.renderSkills();
        this.setupIntersectionObserver();
    }
    
    renderSkills() {
        this.container.innerHTML = '';
        
        skillsData.forEach((skill, index) => {
            const skillElement = this.createSkillElement(skill, index);
            this.container.appendChild(skillElement);
        });
    }
    
    createSkillElement(skill, index) {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item';
        skillDiv.style.animationDelay = `${index * 0.1}s`;
        
        skillDiv.innerHTML = `
            <span class="skill-icon">${skill.icon}</span>
            <h3 class="skill-name">${skill.name}</h3>
            <p class="skill-level">${skill.level}% Proficiency</p>
            <div class="skill-progress">
                <div class="skill-progress-bar" data-level="${skill.level}"></div>
            </div>
        `;
        
        // Add click handler for skill details
        skillDiv.addEventListener('click', () => {
            this.showSkillDetails(skill);
        });
        
        return skillDiv;
    }
    
    showSkillDetails(skill) {
        // Create a simple notification or modal for skill details
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(99, 102, 241, 0.9);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            backdrop-filter: blur(20px);
        `;
        
        toast.innerHTML = `
            <strong>${skill.name}</strong><br>
            Proficiency: ${skill.level}%<br>
            <small>Click to explore more!</small>
        `;
        
        document.body.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
        
        // Add CSS for animations if not exists
        this.addToastAnimations();
    }
    
    addToastAnimations() {
        if (!document.getElementById('toast-animations')) {
            const style = document.createElement('style');
            style.id = 'toast-animations';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    
                    // Animate progress bars
                    const progressBar = entry.target.querySelector('.skill-progress-bar');
                    if (progressBar) {
                        const level = progressBar.getAttribute('data-level');
                        setTimeout(() => {
                            progressBar.style.width = level + '%';
                        }, 200);
                    }
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe all skill items
        document.querySelectorAll('.skill-item').forEach((item) => {
            this.observer.observe(item);
        });
    }
}

// Initialize skills when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SkillsManager();
});