// Vue 3 component for skills visualization
const { createApp } = Vue;

const SkillsProgress = {
  template: `
    <div class="skills-container">
      <div v-for="(skill, index) in skills" :key="index" class="skill-item">
        <div class="skill-info">
          <span class="skill-name">{{ skill.name }}</span>
          <span class="skill-percentage">{{ skill.xp }} XP</span>
        </div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: calculateWidth(skill.xp) + '%' }"></div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      skills: [
        { name: 'Computer science', xp: 1575 },
        { name: 'Web development', xp: 1106 },
        { name: 'Python', xp: 941 },
        { name: 'HTML & CSS', xp: 651 },
        { name: 'Web design', xp: 537 },
        { name: 'Data science', xp: 386 },
        { name: 'JavaScript', xp: 310 },
        { name: 'IT', xp: 285 },
        { name: 'Bash', xp: 185 },
        { name: 'Data analytics', xp: 160 },
        { name: 'Java', xp: 150 },
        { name: 'C', xp: 100 },
        { name: 'SQL', xp: 60 },
        { name: 'Data engineering', xp: 51 },
        { name: 'Machine learning', xp: 50 },
        { name: 'Math', xp: 38 },
        { name: 'Data visualization', xp: 35 },
        { name: 'Mobile development', xp: 35 },
        { name: 'Artificial intelligence', xp: 25 },
        { name: 'Cybersecurity', xp: 25 },
        { name: 'DevOps', xp: 25 },
        { name: 'Game development', xp: 25 },
        { name: 'Cloud computing', xp: 20 }
      ]
    }
  },
  methods: {
    calculateWidth(xp) {
      // Calculate percentage based on highest XP (Computer science: 1575)
      const maxXP = 1575;
      return (xp / maxXP) * 100;
    }
  }
};

const app = createApp({
  components: {
    'skills-progress': SkillsProgress
  }
});

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Mount Vue app
  const vueAppElement = document.getElementById('vue-app');
  if (vueAppElement) {
    app.mount('#vue-app');
  }
}); 