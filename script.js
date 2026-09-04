/* ============================================================
   PORTFOLIO OS - SCRIPT ENGINE (UPDATED TO NEW RESUME & NOIR VIBE)
   El Moufaddal Maadi | Full-Stack Developer & Automation
   ============================================================ */

let fr = false;
let z = 10;
let n = 0;

// Translation helper: English (a) / French (b)
const t = (a, b) => fr ? b : a;

// Toast Notification Helper
function showToast(message, icon = '✓') {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  const iconEl = document.getElementById('toast-icon');
  if (!toast || !msgEl) return;
  msgEl.textContent = message;
  if (iconEl) iconEl.textContent = icon;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3500);
}

// Copy to Clipboard Helper
function copyText(text, label = 'Copied') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} ${t('copied to clipboard!','copié dans le presse-papier !')}`, '📋');
  }).catch(() => {
    showToast(`${text}`, '📋');
  });
}

// Lightbox Modal for Photo Preview
function openLightbox(imgSrc, title = '', desc = '') {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  if (!lb || !img) return;
  img.src = imgSrc;
  if (titleEl) titleEl.textContent = title;
  lb.classList.add('active');
}

function closeLightbox(event) {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('active');
}

// Project Category Filtering
function filterProjects(category, btnElement) {
  const projectCards = document.querySelectorAll('.project-card-modern');
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  projectCards.forEach(card => {
    const cardCat = card.dataset.category || '';
    const cardType = card.dataset.type || '';
    if (category === 'all') {
      card.style.display = 'flex';
    } else if (category === 'resume' && cardType === 'resume') {
      card.style.display = 'flex';
    } else if (category === 'progress' && cardType === 'progress') {
      card.style.display = 'flex';
    } else if (cardCat.toLowerCase().includes(category.toLowerCase())) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Applications Registry
const apps = {
  about: [
    'About Me',
    '♙',
    () => `
      <div class="section-header">
        <span class="section-badge">01 / PROFILE</span>
        <h2 class="section-title">${t('El Moufaddal Maadi', 'El Moufaddal Maadi')}</h2>
        <p class="section-desc">${t('Full-Stack Web Developer & Email Infrastructure Automation Analyst based in Tangier, Morocco.', 'Développeur Web Full-Stack & Analyste Développeur Automatisation basé à Tanger, Maroc.')}</p>
      </div>

      <!-- Hero Profile Card with Authentic CV Headshot -->
      <div class="about-hero-card">
        <div class="about-avatar-wrap">
          <img src="assets/cv-avatar.png" alt="El Moufaddal Maadi" class="about-avatar-img">
          <div class="status-pill">
            <span class="status-dot"></span>
            <span>${t('Available', 'Disponible')}</span>
          </div>
        </div>
        <div class="about-info">
          <h2>El Moufaddal Maadi</h2>
          <span class="role-text">${t('Développeur Full Stack • Automatisation & Infrastructure', 'Développeur Full Stack • Automatisation & Infrastructure')}</span>
          <p>
            ${t(
              'Graduate in Computer Engineering and Digital Web Full-Stack Development. Proficient in React, Laravel, Node.js, MySQL, and Python, with solid competencies in REST APIs, databases, OOP, computer networks, and cybersecurity. Passionate about engineering high-performance, dependable web platforms and automated data tooling.',
              'Développeur Full-Stack diplômé en génie informatique et en développement Web Full-Stack. Maîtrise de React, Laravel, Node.js, MySQL et Python, avec des compétences en API REST, bases de données, POO, réseaux et cybersécurité. Passionné par la conception d’applications web performantes et fiables.'
            )}
          </p>
          <div class="about-meta-row">
            <span class="about-meta-tag">📍 Tanger, Boukhalef</span>
            <span class="about-meta-tag">✉ maadimfdal@gmail.com</span>
            <span class="about-meta-tag">☎ +212 631 361 235</span>
            <span class="about-meta-tag">🐙 GitHub: Mfdalmaadi</span>
          </div>
        </div>
      </div>

      <!-- Clean Photos Duo (Aligned cleanly without comments/captions) -->
      <div class="about-photos-duo">
        <div class="photo-frame" onclick="openLightbox('assets/photo-marina.jpg', 'Tangier Marina Bay')">
          <img src="assets/photo-marina.jpg" alt="Tangier Marina Bay">
        </div>
        <div class="photo-frame" onclick="openLightbox('assets/photo-stairs.jpg', 'Tangier Kasbah Steps')">
          <img src="assets/photo-stairs.jpg" alt="Tangier Kasbah Steps">
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div style="display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap;">
        <button onclick="open('skills')" class="btn-mini-action">⚙ ${t('Skills','Compétences')}</button>
        <button onclick="open('projects')" class="btn-mini-action">&lt;/&gt; ${t('Projects','Projets')}</button>
        <button onclick="open('experience')" class="btn-mini-action">♜ ${t('Experience','Expérience')}</button>
        <button onclick="open('contact')" class="btn-mini-action">✉ ${t('Contact Draft','Me Contacter')}</button>
        <button onclick="open('resume')" class="btn-mini-action">📄 ${t('Resume (PDF)','CV (PDF)')}</button>
      </div>
    `
  ],

  skills: [
    'Skills',
    '⚙',
    () => `
      <div class="section-header">
        <span class="section-badge">02 / TECHNICAL TOOLKIT</span>
        <h2 class="section-title">${t('Skills & Technologies', 'Compétences & Technologies')}</h2>
        <p class="section-desc">${t('Directly sourced from verified resume. Structured, concise, and focused.', 'Compétences techniques et humaines issues directement du CV, organisées de manière claire et concise.')}</p>
      </div>

      <div class="skills-container">

        <!-- 1. Langages -->
        <div class="skill-category-group">
          <div class="category-header">
            <div class="category-icon">💻</div>
            <h3 class="category-title">${t('Programming Languages', 'Langages')}</h3>
          </div>
          <div class="skills-grid-clean">
            <span class="skill-chip-clean"><b>PHP</b> PHP</span>
            <span class="skill-chip-clean"><b>JS</b> JavaScript (ES6+)</span>
            <span class="skill-chip-clean"><b>Py</b> Python</span>
            <span class="skill-chip-clean"><b>SQL</b> SQL</span>
            <span class="skill-chip-clean"><b>Java</b> Java</span>
          </div>
        </div>

        <!-- 2. Frontend -->
        <div class="skill-category-group">
          <div class="category-header">
            <div class="category-icon">🎨</div>
            <h3 class="category-title">Frontend</h3>
          </div>
          <div class="skills-grid-clean">
            <span class="skill-chip-clean"><b>⚛</b> React.js</span>
            <span class="skill-chip-clean"><b>H5</b> HTML5</span>
            <span class="skill-chip-clean"><b>CSS</b> CSS3</span>
            <span class="skill-chip-clean"><b>BS</b> Bootstrap</span>
            <span class="skill-chip-clean"><b>WP</b> WordPress</span>
            <span class="skill-chip-clean"><b>El</b> Elementor</span>
          </div>
        </div>

        <!-- 3. Backend -->
        <div class="skill-category-group">
          <div class="category-header">
            <div class="category-icon">⚙</div>
            <h3 class="category-title">Backend & Architecture</h3>
          </div>
          <div class="skills-grid-clean">
            <span class="skill-chip-clean"><b>Lv</b> Laravel</span>
            <span class="skill-chip-clean"><b>Node</b> Node.js</span>
            <span class="skill-chip-clean"><b>Ex</b> Express.js</span>
            <span class="skill-chip-clean"><b>Spring</b> Spring Boot</span>
            <span class="skill-chip-clean"><b>API</b> API REST</span>
            <span class="skill-chip-clean"><b>MVC</b> Architecture MVC</span>
          </div>
        </div>

        <!-- 4. Bases de Données -->
        <div class="skill-category-group">
          <div class="category-header">
            <div class="category-icon">🗄</div>
            <h3 class="category-title">${t('Databases', 'Bases de Données')}</h3>
          </div>
          <div class="skills-grid-clean">
            <span class="skill-chip-clean"><b>🐬</b> MySQL</span>
            <span class="skill-chip-clean"><b>🍃</b> MongoDB</span>
            <span class="skill-chip-clean"><b>Ora</b> Oracle</span>
            <span class="skill-chip-clean"><b>MCD</b> ${t('Data Modeling','Modélisation des données')}</span>
          </div>
        </div>

        <!-- 5. Outils & Environnement -->
        <div class="skill-category-group">
          <div class="category-header">
            <div class="category-icon">🛠</div>
            <h3 class="category-title">${t('Tools & Environment', 'Outils & Environnement')}</h3>
          </div>
          <div class="skills-grid-clean">
            <span class="skill-chip-clean"><b>Git</b> Git</span>
            <span class="skill-chip-clean"><b>GH</b> GitHub</span>
            <span class="skill-chip-clean"><b>🐳</b> Docker</span>
            <span class="skill-chip-clean"><b>PM</b> Postman</span>
          </div>
        </div>

        <!-- 6. Soft Skills -->
        <div class="skill-category-group">
          <div class="category-header">
            <div class="category-icon">💡</div>
            <h3 class="category-title">Soft Skills</h3>
          </div>
          <div class="soft-skills-compact">
            <span class="soft-badge-item">🧩 ${t('Problem Solving', 'Résolution de problèmes')}</span>
            <span class="soft-badge-item">🤝 ${t('Teamwork', 'Esprit d\'équipe')}</span>
            <span class="soft-badge-item">🔄 ${t('Adaptability', 'Adaptabilité')}</span>
            <span class="soft-badge-item">💬 Communication</span>
            <span class="soft-badge-item">📚 ${t('Continuous Learning', 'Apprentissage continu')}</span>
            <span class="soft-badge-item">⏱ ${t('Time Management', 'Gestion du temps')}</span>
          </div>
        </div>

        <!-- 7. Langues -->
        <div class="skill-category-group">
          <div class="category-header">
            <div class="category-icon">🌐</div>
            <h3 class="category-title">${t('Languages', 'Langues')}</h3>
          </div>
          <div class="skills-grid-clean">
            <span class="skill-chip-clean">🇲🇦 ${t('Arabic: Native','Arabe : Maternelle')}</span>
            <span class="skill-chip-clean">🇫🇷 ${t('French: Intermediate','Français : Intermédiaire')}</span>
            <span class="skill-chip-clean">🇬🇧 ${t('English: Professional','Anglais : Professionnel')}</span>
          </div>
        </div>

      </div>
    `
  ],

  projects: [
    'Projects',
    '&lt;/&gt;',
    () => `
      <div class="section-header">
        <span class="section-badge">03 / SOFTWARE PROJECTS</span>
        <h2 class="section-title">${t('Software Projects', 'Projets')}</h2>
        <p class="section-desc">${t('Production systems from my resume alongside active in-progress platforms with open-source repositories.', 'Projets du CV et architectures actuellement en cours de développement avec dépôts GitHub.')}</p>
      </div>

      <!-- Filter toolbar -->
      <div class="projects-header-toolbar">
        <span style="font-size: 12.5px; color: #94a3b8; font-weight: 500;">
          ${t('Filter:','Filtrer :')}
        </span>
        <div class="project-filter-buttons">
          <button class="filter-btn active" onclick="filterProjects('all', this)">${t('All (5)','Tous (5)')}</button>
          <button class="filter-btn" onclick="filterProjects('resume', this)">${t('On My Resume (2)','Sur le CV (2)')}</button>
          <button class="filter-btn" onclick="filterProjects('progress', this)">${t('In Progress (3)','En Cours (3)')}</button>
          <button class="filter-btn" onclick="filterProjects('AI', this)">AI & Data</button>
          <button class="filter-btn" onclick="filterProjects('Full-Stack', this)">Full-Stack</button>
          <button class="filter-btn" onclick="filterProjects('DevOps', this)">Automation</button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="projects-cards-grid">

        <!-- Project 1: MedPredict AI (ON RESUME) -->
        <article class="project-card-modern" data-type="resume" data-category="AI, Healthcare, Full-Stack">
          <div class="project-badge-bar">
            <span class="project-type-tag tag-resume">✓ ${t('ON RESUME • PRODUCTION','SUR LE CV • RÉALISÉ')}</span>
            <span class="project-category-pill">FastAPI • React</span>
          </div>
          <h3>MedPredict AI – ${t('AI Medical Diagnosis Platform','Plateforme d’Aide au Diagnostic Médical')}</h3>
          <p>
            ${t(
              'Development of an AI-assisted medical diagnostic platform with FastAPI and React. Designed a secure REST API with JWT authentication and patient/user management. Trained a Random Forest model with prediction explainability via SHAP and integrated with MySQL.',
              'Développement d’une plateforme d’aide au diagnostic basée sur l’IA avec FastAPI et React. Conception d’une API REST sécurisée avec authentification JWT et gestion des utilisateurs/patients. Développement d’un modèle Random Forest avec explicabilité des prédictions via SHAP et intégration à MySQL.'
            )}
          </p>
          <ul class="project-feature-list">
            <li>${t('AI-assisted diagnosis platform with FastAPI & React','Plateforme d’aide au diagnostic basée sur l’IA avec FastAPI et React')}</li>
            <li>${t('Secure REST API with JWT auth & patient/user records','API REST sécurisée avec authentification JWT et gestion utilisateurs/patients')}</li>
            <li>${t('Random Forest machine learning model with SHAP explainability','Modèle Random Forest avec explicabilité des prédictions via SHAP')}</li>
            <li>${t('Persistent relational storage with MySQL & SQLAlchemy','Persistance relationnelle et intégration complète à MySQL')}</li>
          </ul>
          <div class="project-tags-row">
            <span class="tech-pill">FastAPI</span>
            <span class="tech-pill">React</span>
            <span class="tech-pill">Python</span>
            <span class="tech-pill">Scikit-learn</span>
            <span class="tech-pill">SHAP</span>
            <span class="tech-pill">MySQL</span>
            <span class="tech-pill">SQLAlchemy</span>
            <span class="tech-pill">JWT</span>
          </div>
          <div class="project-card-actions">
            <a href="https://github.com/Mfdalmaadi" target="_blank" rel="noreferrer" class="btn-github">
              <svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              ${t('GitHub Repository','Dépôt GitHub')} ↗
            </a>
          </div>
        </article>

        <!-- Project 2: THE GUIDE (ON RESUME) -->
        <article class="project-card-modern" data-type="resume" data-category="Full-Stack, Web">
          <div class="project-badge-bar">
            <span class="project-type-tag tag-resume">✓ ${t('ON RESUME • PRODUCTION','SUR LE CV • RÉALISÉ')}</span>
            <span class="project-category-pill">React • Laravel</span>
          </div>
          <h3>THE GUIDE – ${t('Northern Morocco Tourism Platform','Plateforme Touristique Full-Stack')}</h3>
          <p>
            ${t(
              'Development of a full-stack tourism platform dedicated to visitors of Northern Morocco. Architecture of a secure REST API with multi-role authentication, dynamic management dashboards, booking workflows, and interactive regional discovery maps.',
              'Développement d’une plateforme touristique dédiée aux visiteurs du nord du Maroc. Conception d’une API REST sécurisée avec authentification multi-rôles. Développement de tableaux de bord, gestion des réservations et cartes interactives pour les différents acteurs.'
            )}
          </p>
          <ul class="project-feature-list">
            <li>${t('Platform dedicated to visitors of Northern Morocco','Plateforme touristique dédiée aux visiteurs du nord du Maroc')}</li>
            <li>${t('Secure REST API with multi-role role-based authentication','Conception d’une API REST sécurisée avec authentification multi-rôles')}</li>
            <li>${t('Interactive maps & booking management for tourists & guides','Gestion des réservations et cartes interactives pour les acteurs')}</li>
            <li>${t('Dynamic analytical dashboards for performance tracking','Développement de tableaux de bord complets')}</li>
          </ul>
          <div class="project-tags-row">
            <span class="tech-pill">React</span>
            <span class="tech-pill">Laravel</span>
            <span class="tech-pill">MySQL</span>
            <span class="tech-pill">API REST</span>
            <span class="tech-pill">Bootstrap</span>
          </div>
          <div class="project-card-actions">
            <a href="https://github.com/Mfdalmaadi" target="_blank" rel="noreferrer" class="btn-github">
              <svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              ${t('GitHub Repository','Dépôt GitHub')} ↗
            </a>
          </div>
        </article>

        <!-- Project 3: NetPulse (IN PROGRESS) -->
        <article class="project-card-modern" data-type="progress" data-category="DevOps, Automation, Infrastructure">
          <div class="project-badge-bar">
            <span class="project-type-tag tag-progress">⏳ ${t('IN PROGRESS','EN COURS')}</span>
            <span class="project-category-pill">Automation & Infrastructure</span>
          </div>
          <h3>NetPulse – ${t('Real-Time Infrastructure & IP Monitor','Supervision Réseau & Délivrabilité')}</h3>
          <p>
            ${t(
              'Real-time automated diagnostic tool for IP address reachability, server uptime, and email delivery telemetry. Triggers automated remediation scripts and alerts when deliverability anomalies are detected.',
              'Outil automatisé de supervision en temps réel des adresses IP, de la disponibilité des serveurs et de la délivrabilité. Exécute des scripts d’auto-remédiation et de diagnostic continu.'
            )}
          </p>
          <ul class="project-feature-list">
            <li>${t('IP subnet telemetry and deliverability diagnostics','Surveillance automatisée des adresses IP et délivrabilité')}</li>
            <li>${t('Automated bash/Python error-handling scripts','Déclenchement automatique de scripts de diagnostic')}</li>
            <li>${t('Live WebSocket telemetry with Docker container support','Supervision temps réel conteneurisée via Docker')}</li>
          </ul>
          <div class="project-tags-row">
            <span class="tech-pill">Python</span>
            <span class="tech-pill">Node.js</span>
            <span class="tech-pill">Docker</span>
            <span class="tech-pill">Bash</span>
            <span class="tech-pill">MySQL</span>
          </div>
          <div class="project-card-actions">
            <a href="https://github.com/Mfdalmaadi" target="_blank" rel="noreferrer" class="btn-github">
              <svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              ${t('GitHub Repository','Dépôt GitHub')} ↗
            </a>
          </div>
        </article>

        <!-- Project 4: OmniStore (IN PROGRESS) -->
        <article class="project-card-modern" data-type="progress" data-category="Full-Stack, Enterprise, Java">
          <div class="project-badge-bar">
            <span class="project-type-tag tag-progress">⏳ ${t('IN PROGRESS','EN COURS')}</span>
            <span class="project-category-pill">Spring Boot • Java</span>
          </div>
          <h3>OmniStore – ${t('Enterprise Microservices Platform','Plateforme E-Commerce en Microservices')}</h3>
          <p>
            ${t(
              'Enterprise Java Spring Boot microservices platform featuring separated services for auth, catalog, and orders. Containerized with Docker and optimized with Redis caching.',
              'Architecture d’entreprise en microservices avec Java Spring Boot et React. Gestion des services indépendants, mise en cache Redis et conteneurisation Docker.'
            )}
          </p>
          <ul class="project-feature-list">
            <li>${t('Decoupled Spring Boot microservices with Spring Data JPA','Microservices découplés Spring Boot & Spring Data JPA')}</li>
            <li>${t('Redis cache integration for rapid catalog throughput','Accélération des requêtes via mise en cache Redis')}</li>
            <li>${t('Stateless JWT security layer with role permissions','Authentification sécurisée sans état avec JWT')}</li>
          </ul>
          <div class="project-tags-row">
            <span class="tech-pill">Spring Boot</span>
            <span class="tech-pill">Java</span>
            <span class="tech-pill">React</span>
            <span class="tech-pill">MySQL</span>
            <span class="tech-pill">Docker</span>
          </div>
          <div class="project-card-actions">
            <a href="https://github.com/Mfdalmaadi" target="_blank" rel="noreferrer" class="btn-github">
              <svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              ${t('GitHub Repository','Dépôt GitHub')} ↗
            </a>
          </div>
        </article>

        <!-- Project 5: DevTask Automation CLI (IN PROGRESS) -->
        <article class="project-card-modern" data-type="progress" data-category="DevOps, Automation">
          <div class="project-badge-bar">
            <span class="project-type-tag tag-progress">⏳ ${t('IN PROGRESS','EN COURS')}</span>
            <span class="project-category-pill">Automation CLI</span>
          </div>
          <h3>DevTask – ${t('Server Automation & Cloud CLI','CLI d’Automatisation & Scripts Serveur')}</h3>
          <p>
            ${t(
              'A lightweight command-line utility built with Python and Bash for automating server provisioning, database backups, and scheduled maintenance tasks.',
              'Outil CLI léger en Python et Bash pour automatiser la maintenance des serveurs, la rotation des sauvegardes et le déploiement continu.'
            )}
          </p>
          <ul class="project-feature-list">
            <li>${t('One-click Linux server environment provisioning','Configuration en une commande d’environnements serveurs')}</li>
            <li>${t('Automated MySQL backup rotation and local archiving','Rotation automatique des sauvegardes de bases de données')}</li>
            <li>${t('Lightweight scripts optimized for reliability','Scripts légers et robustes pour la production')}</li>
          </ul>
          <div class="project-tags-row">
            <span class="tech-pill">Python</span>
            <span class="tech-pill">Bash</span>
            <span class="tech-pill">Docker</span>
            <span class="tech-pill">Linux</span>
          </div>
          <div class="project-card-actions">
            <a href="https://github.com/Mfdalmaadi" target="_blank" rel="noreferrer" class="btn-github">
              <svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              ${t('GitHub Repository','Dépôt GitHub')} ↗
            </a>
          </div>
        </article>

      </div>
    `
  ],

  experience: [
    'Experience',
    '♜',
    () => `
      <div class="section-header">
        <span class="section-badge">04 / EXPÉRIENCE PROFESSIONNELLE</span>
        <h2 class="section-title">${t('Professional Experience', 'Expérience Professionnelle')}</h2>
        <p class="section-desc">${t('Engineering automation scripts, email infrastructure optimization, and technical troubleshooting.', 'Développement de scripts d’automatisation, optimisation d’infrastructure email et résolution de problèmes techniques.')}</p>
      </div>

      <div class="cards-timeline">
        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge">08/2025 — 08/2026</span>
            <span class="card-location-badge">📍 Tanger, Maroc</span>
          </div>
          <h3>Web Media Networks</h3>
          <span class="company-sub">${t('Analyst Developer — Email Automation & Infrastructure', 'Analyste Développeur — Automatisation & Infrastructure Email')}</span>

          <ul class="experience-bullet-list">
            <li>
              <span>${t('Development of automation scripts to streamline repetitive tasks and process data.', 'Développement de scripts d’automatisation pour optimiser les tâches répétitives et traiter les données.')}</span>
            </li>
            <li>
              <span>${t('Analysis and troubleshooting of issues related to email deliverability and IP addresses.', 'Analyse et résolution de problèmes liés à la délivrabilité des emails et aux adresses IP.')}</span>
            </li>
            <li>
              <span>${t('Optimization of technical workflows and reduction of manual workloads.', 'Optimisation des processus techniques et réduction des tâches manuelles.')}</span>
            </li>
          </ul>

          <div class="project-tags-row" style="margin-top: 14px; margin-bottom: 0;">
            <span class="tech-pill">Automatisation</span>
            <span class="tech-pill">Infrastructure Email</span>
            <span class="tech-pill">Délivrabilité & Adresses IP</span>
            <span class="tech-pill">Scripts Python / Bash</span>
            <span class="tech-pill">Traitement de Données</span>
          </div>
        </article>
      </div>
    `
  ],

  education: [
    'Education',
    '⌘',
    () => `
      <div class="section-header">
        <span class="section-badge">05 / FORMATION ACADÉMIQUE</span>
        <h2 class="section-title">${t('Academic Education', 'Formation Académique')}</h2>
        <p class="section-desc">${t('Scientific foundations, digital full-stack web development, and computer engineering.', 'Des sciences fondamentales au développement digital web full-stack et au génie informatique.')}</p>
      </div>

      <div class="cards-timeline">
        <!-- 1. HIGH-TECH Rabat -->
        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge">10/2025 — 06/2026</span>
            <span class="card-location-badge">📍 Rabat, Maroc</span>
          </div>
          <h3>HIGH-TECH – École des Hautes Études en Ingénierie et Technologie</h3>
          <span class="company-sub">${t('Bachelor’s in Engineering Sciences — Option Computer Engineering','Licence en Sciences de l\'Ingénieur – Option Génie Informatique')}</span>
        </article>

        <!-- 2. OFPPT ISTA NTIC Tanger -->
        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge">09/2023 — 06/2025</span>
            <span class="card-location-badge">📍 Tanger, Maroc</span>
          </div>
          <h3>OFPPT ISTA NTIC Tanger</h3>
          <span class="company-sub">${t('Specialized Technician in Digital Development – Option Web Full-Stack','Technicien Spécialisé en Développement Digital – Option Web Full-Stack')}</span>
        </article>

        <!-- 3. FACULTÉ POLYDISCIPLINAIRE DE LARACHE -->
        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge">10/2022 — 06/2023</span>
            <span class="card-location-badge">📍 Larache, Maroc</span>
          </div>
          <h3>FACULTÉ POLYDISCIPLINAIRE DE LARACHE</h3>
          <span class="company-sub">${t('Physical Sciences Program (SMP)','Filière Sciences de la Matière Physique (SMP)')}</span>
        </article>

        <!-- 4. Lycée Mansour Dahbi -->
        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge">09/2021 — 06/2022</span>
            <span class="card-location-badge">📍 Maroc</span>
          </div>
          <h3>Lycée Mansour Dahbi</h3>
          <span class="company-sub">${t('Baccalaureate in Physical Sciences','Baccalauréat Sciences Physiques')}</span>
        </article>
      </div>
    `
  ],

  certifications: [
    'Certifications',
    '★',
    () => `
      <div class="section-header">
        <span class="section-badge">06 / CERTIFICATIONS</span>
        <h2 class="section-title">${t('Certifications', 'Certifications')}</h2>
        <p class="section-desc">${t('Validated credentials from Cisco, 365 Data Science, and efe Maroc.', 'Certifications validées auprès d’institutions reconnues.')}</p>
      </div>

      <div class="cards-timeline">
        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border-color: rgba(245, 158, 11, 0.4);">✓ 365 DATA SCIENCE</span>
          </div>
          <h3>SQL</h3>
          <span class="company-sub">365 Data Science</span>
        </article>

        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge" style="background: rgba(16, 185, 129, 0.15); color: #6ee7b7; border-color: rgba(16, 185, 129, 0.4);">✓ CISCO</span>
          </div>
          <h3>Python Essentials 1</h3>
          <span class="company-sub">Cisco Networking Academy</span>
        </article>

        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge" style="background: rgba(56, 189, 248, 0.15); color: #7dd3fc; border-color: rgba(56, 189, 248, 0.4);">✓ CISCO</span>
          </div>
          <h3>Computer Hardware Basics</h3>
          <span class="company-sub">Cisco Networking Academy</span>
        </article>

        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge" style="background: rgba(168, 85, 247, 0.15); color: #c084fc; border-color: rgba(168, 85, 247, 0.4);">✓ EFE MAROC</span>
          </div>
          <h3>Soft Skills</h3>
          <span class="company-sub">efe Maroc</span>
        </article>
      </div>
    `
  ],

  contact: [
    'Contact Me',
    '✉',
    () => `
      <div class="section-header">
        <span class="section-badge">07 / CONTACT</span>
        <h2 class="section-title">${t('Get In Touch', 'Me Contacter')}</h2>
        <p class="section-desc">${t('Click below to launch an email draft directly, or reach out through WhatsApp, phone, or LinkedIn.', 'Cliquez pour ouvrir un brouillon d’email ou contactez-moi directement via WhatsApp, téléphone ou LinkedIn.')}</p>
      </div>

      <!-- Main Direct Email Draft Card (No Form Needed!) -->
      <div class="contact-hero-cta">
        <h3>${t('Ready to talk or collaborate?', 'Un projet ou une opportunité ?')}</h3>
        <p>${t('Click the button below to instantly compose an email to my inbox.', 'Cliquez ci-dessous pour ouvrir un brouillon email directement vers ma boîte.')}</p>
        <button type="button" class="btn-open-draft" onclick="(function(){var m='maadimfdal@gmail.com',s=encodeURIComponent('Hello El Moufaddal'),b=encodeURIComponent('Hello El Moufaddal,\\n\\nI came across your portfolio and wanted to connect regarding...');window.location.href='mailto:'+m+'?subject='+s+'&body='+b;})();">
          <span>✉</span>
          <span>${t('Open Email Draft', 'Ouvrir un Brouillon')}</span>
        </button>
        <button type="button" class="btn-copy-email" onclick="copyText('maadimfdal@gmail.com', 'Email')" style="margin-top:10px;background:transparent;border:1px solid rgba(255,255,255,0.2);color:#94a3b8;border-radius:8px;padding:8px 16px;font-size:12px;cursor:pointer;">
          📋 ${t('Copy Email Address', 'Copier l\'adresse email')}
        </button>
      </div>

      <!-- Direct Channels Grid -->
      <div class="contact-channels-grid">

        <!-- Email Direct Card -->
        <div class="contact-channel-card">
          <div class="channel-icon-title">
            <div class="channel-icon">✉</div>
            <span class="channel-title">Email</span>
          </div>
          <span class="channel-value">maadimfdal@gmail.com</span>
          <div class="channel-actions">
            <button type="button" class="btn-mini-action" onclick="copyText('maadimfdal@gmail.com', 'Email')">📋 ${t('Copy','Copier')}</button>
            <button type="button" class="btn-mini-action" onclick="(function(){window.location.href='mailto:maadimfdal@gmail.com?subject=Hello%20El%20Moufaddal';})();">↗ ${t('Draft','Écrire')}</button>
          </div>
        </div>

        <!-- Phone & WhatsApp Card -->
        <div class="contact-channel-card">
          <div class="channel-icon-title">
            <div class="channel-icon">📱</div>
            <span class="channel-title">${t('Phone & WhatsApp', 'Téléphone & WhatsApp')}</span>
          </div>
          <span class="channel-value">+212 631 361 235</span>
          <div class="channel-actions">
            <button type="button" class="btn-mini-action" onclick="copyText('+212631361235', 'Phone')">📋 ${t('Copy','Copier')}</button>
            <a href="https://wa.me/212631361235" target="_blank" rel="noreferrer" class="btn-mini-action">💬 WhatsApp</a>
            <a href="tel:+212631361235" class="btn-mini-action">📞 ${t('Call','Appeler')}</a>
          </div>
        </div>

        <!-- Location Card -->
        <div class="contact-channel-card">
          <div class="channel-icon-title">
            <div class="channel-icon">📍</div>
            <span class="channel-title">${t('Location', 'Localisation')}</span>
          </div>
          <span class="channel-value">Tanger, Boukhalef, Maroc</span>
          <div class="channel-actions" style="margin-top:auto;">
            <span style="font-size:11px; color:#94a3b8;">${t('On-site & Remote','Sur site & Télétravail')}</span>
          </div>
        </div>

        <!-- LinkedIn Card -->
        <div class="contact-channel-card">
          <div class="channel-icon-title">
            <div class="channel-icon">💼</div>
            <span class="channel-title">LinkedIn</span>
          </div>
          <span class="channel-value">El Moufaddal Maadi</span>
          <div class="channel-actions">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" class="btn-mini-action">↗ ${t('LinkedIn Profile','Voir Profil')}</a>
          </div>
        </div>

        <!-- GitHub Card -->
        <div class="contact-channel-card">
          <div class="channel-icon-title">
            <div class="channel-icon">🐙</div>
            <span class="channel-title">GitHub</span>
          </div>
          <span class="channel-value">github.com/Mfdalmaadi</span>
          <div class="channel-actions">
            <a href="https://github.com/Mfdalmaadi" target="_blank" rel="noreferrer" class="btn-mini-action">↗ ${t('Visit Profile','Voir Profil')}</a>
            <button type="button" class="btn-mini-action" onclick="copyText('https://github.com/Mfdalmaadi', 'GitHub URL')">📋 ${t('Copy','Copier')}</button>
          </div>
        </div>

      </div>
    `
  ],

  resume: [
    'Resume.pdf',
    '▧',
    () => `
      <div class="empty" style="padding: 40px 20px;">
        <div class="resume-preview">PDF</div>
        <h2 style="font-size: 24px; margin-bottom: 4px;">El Moufaddal Maadi</h2>
        <p style="color: #38bdf8; font-weight: 600; margin: 0 0 14px;">
          ${t('Curriculum Vitae — Développeur Full Stack', 'Curriculum Vitae — Développeur Full Stack')}
        </p>
        <p style="max-width: 520px; margin: 0 auto 24px; color: #cbd5e1; font-size: 13.5px; line-height: 1.6;">
          ${t(
            'Updated resume with Web Media Networks experience, HIGH-TECH engineering degree, OFPPT, Cisco & efe Maroc certifications.',
            'CV actualisé intégrant l’expérience chez Web Media Networks, la formation HIGH-TECH, OFPPT et les certifications Cisco et efe Maroc.'
          )}
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a href="assets/resume.pdf" target="_blank" class="empty a" style="background: #2563eb; color: #fff; font-weight: 600; padding: 12px 22px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 14px rgba(37,99,235,0.4);">
            📄 ${t('Open Resume in New Tab', 'Ouvrir le CV')} ↗
          </a>
          <a href="assets/resume.pdf" download="El_Moufaddal_Maadi_CV.pdf" class="empty a" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; font-weight: 600; padding: 12px 22px; border-radius: 8px; text-decoration: none;">
            💾 ${t('Download PDF', 'Télécharger')}
          </a>
        </div>
      </div>
    `
  ],

  explorer: [
    'This PC',
    '▱',
    () => `
      <div class="explorer-head">
        <span>⌂</span>
        <b>This PC</b>
        <small>C:\\Users\\ElMoufaddal\\Portfolio</small>
      </div>
      <h2>${t('Portfolio Folders', 'Dossiers du Portfolio')}</h2>
      <p style="color: #94a3b8; font-size: 13px;">${t('Select any folder below to launch its corresponding application window.', 'Sélectionnez un dossier ci-dessous pour ouvrir la section correspondante.')}</p>
      <div class="folder-grid">
        <button data-open="about">📁<b>About Me</b><small>Profile & bio</small></button>
        <button data-open="skills">📁<b>Skills</b><small>Languages & tools</small></button>
        <button data-open="projects">📁<b>Projects</b><small>Software repositories</small></button>
        <button data-open="experience">📁<b>Experience</b><small>Web Media Networks</small></button>
        <button data-open="education">📁<b>Education</b><small>Degrees & diplomas</small></button>
        <button data-open="certifications">📁<b>Certifications</b><small>Cisco, 365, efe</small></button>
        <button data-open="contact">📁<b>Contact</b><small>Direct email draft</small></button>
        <button data-open="resume">📁<b>Resume</b><small>PDF document</small></button>
      </div>
    `
  ],

  terminal: [
    'Windows Terminal',
    '›_',
    () => `
      <div class="terminal-output"><span class="prompt">moufaddal@portfolio:~$</span> ${t('Type <b>help</b> or <b>rust</b> to explore the terminal.','Tapez <b>help</b> ou <b>rust</b> pour explorer le terminal.')}</div>
      <form class="terminal-form">
        <span class="prompt">moufaddal@portfolio:~$</span>
        <input aria-label="Terminal command" autocomplete="off" autofocus placeholder="help">
        <button type="submit">↵</button>
      </form>
    `,
    'terminal'
  ],

  bin: [
    'Recycle Bin',
    '♲',
    () => `
      <div class="empty" style="padding: 60px 20px;">
        <h2 style="font-size: 22px;">${t('Recycle Bin is empty', 'La Corbeille est vide')}</h2>
        <p style="color: #94a3b8; font-size: 13px;">${t('No deleted files or deprecated projects found.', 'Aucun fichier supprimé.')}</p>
      </div>
    `
  ]
};

// Window Management Functions
function open(name) {
  let a = apps[name];
  if (!a) return;

  let old = document.querySelector(`.window[data-name="${name}"]`);
  if (old) {
    old.style.zIndex = ++z;
    old.style.display = 'block';
    return;
  }

  const isMobile = window.innerWidth <= 768;
  n = (n + 20) % 120;
  let leftPos = isMobile ? 8 : Math.max(20, Math.min(100 + n, Math.max(20, window.innerWidth - 820)));
  let topPos = isMobile ? 10 : Math.max(20, Math.min(45 + n / 2, Math.max(20, window.innerHeight - 560)));
  let w = document.createElement('section');
  w.className = 'window ' + (a[3] || '');
  w.dataset.name = name;
  w.style.cssText = `left:${leftPos}px;top:${topPos}px;z-index:${++z}`;
  w.innerHTML = `
    <div class="bar">
      <b class="symbol">${a[1]}</b>
      <span>${a[0]}</span>
      <div>
        <button class="min" title="Minimize">—</button>
        <button class="max" title="Maximize">□</button>
        <button class="x" title="Close">×</button>
      </div>
    </div>
    <div class="content">${a[2]()}</div>
  `;

  document.querySelector('#windows').append(w);
  w.onpointerdown = () => w.style.zIndex = ++z;
  w.querySelector('.x').onclick = () => w.remove();
  w.querySelector('.min').onclick = () => w.style.display = 'none';
  w.querySelector('.max').onclick = () => w.classList.toggle('max');

  w.querySelectorAll('[data-open]').forEach(x => {
    x.onclick = () => open(x.dataset.open);
  });

  if (name === 'terminal') enableTerminal(w);
  drag(w);
}

// Terminal Emulation
function enableTerminal(w) {
  const out = w.querySelector('.terminal-output');
  const form = w.querySelector('.terminal-form');
  const input = form.querySelector('input');

  const reply = cmd => ({
    help: 'Available commands: whoami, skills, projects, experience, education, rust, quote, contact, clear, date',
    whoami: 'El Moufaddal Maadi — Développeur Full Stack & Automatisation basé à Tanger, Maroc.',
    skills: 'PHP, JavaScript (ES6+), Python, SQL, Java | React.js, HTML5, CSS3, Bootstrap, WordPress, Elementor | Laravel, Node.js, Express.js, Spring Boot, API REST, MVC | MySQL, MongoDB, Oracle | Git, GitHub, Docker, Postman',
    projects: '1. MedPredict AI (FastAPI, React, Scikit-learn, SHAP, MySQL) [ON RESUME]\n2. THE GUIDE (React, Laravel, MySQL) [ON RESUME]\n3. NetPulse (Python, Node, Docker, WebSockets) [IN PROGRESS]\n4. OmniStore (Spring Boot Java, React, Redis) [IN PROGRESS]\n5. DevTask CLI (Python, Bash, Docker) [IN PROGRESS]',
    experience: 'Web Media Networks, Analyste Développeur — Automatisation & Infrastructure Email (08/2025 - 08/2026 | Tanger)',
    education: '1. HIGH-TECH Rabat (Licence Génie Informatique)\n2. OFPPT ISTA NTIC Tanger (Web Full-Stack)\n3. FPL Larache (Sciences Physiques SMP)\n4. Lycée Mansour Dahbi (Baccalauréat)',
    rust: '🚬 "Time is a flat circle. Everything we\'ve ever done or will do, we\'re gonna do over and over again... unless you write an automation script for it." — Rust Cohle x El Moufaddal Maadi',
    quote: '🚬 "I consider myself a realist, but in engineering terms I design for resilience." — Rust Cohle',
    contact: 'Email: maadimfdal@gmail.com | Phone: +212 631 361 235 | GitHub: github.com/Mfdalmaadi',
    date: new Date().toString()
  }[cmd] ?? `command not found: ${cmd}. Type 'help' for available commands.`);

  form.onsubmit = e => {
    e.preventDefault();
    let cmd = input.value.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === 'clear') {
      out.innerHTML = '';
      input.value = '';
      return;
    }
    out.insertAdjacentHTML('beforeend', `<br><span class="prompt">moufaddal@portfolio:~$</span> ${cmd}<br>${reply(cmd)}`);
    input.value = '';
    w.querySelector('.content').scrollTop = 99999;
  };
}

// Window Dragging Implementation
function drag(w) {
  let b = w.querySelector('.bar');
  let x, y, l, top;
  b.onpointerdown = e => {
    if (e.target.tagName === 'BUTTON') return;
    x = e.clientX;
    y = e.clientY;
    l = w.offsetLeft;
    top = w.offsetTop;
    b.setPointerCapture(e.pointerId);
    b.onpointermove = q => {
      w.style.left = Math.max(0, l + q.clientX - x) + 'px';
      w.style.top = Math.max(0, top + q.clientY - y) + 'px';
    };
    b.onpointerup = () => b.onpointermove = null;
  };
}

// Global Event Listeners & Initialization
document.querySelectorAll('[data-app]').forEach(x => {
  x.onclick = () => open(x.dataset.app);
});

const menu = document.querySelector('#startmenu');
const startBtn = document.querySelector('#start');
const closeBtn = document.querySelector('#close');
const langBtn = document.querySelector('#lang');
const subtitle = document.querySelector('#subtitle');
const bootEl = document.querySelector('#boot');

if (startBtn && menu) {
  startBtn.onclick = () => menu.classList.toggle('open');
}
if (closeBtn && menu) {
  closeBtn.onclick = () => menu.classList.remove('open');
}

// Language Switcher (EN / FR)
if (langBtn) {
  langBtn.onclick = () => {
    fr = !fr;
    langBtn.textContent = fr ? 'EN' : 'FR';
    if (subtitle) {
      subtitle.textContent = fr
        ? 'DÉVELOPPEUR FULL-STACK • AUTOMATISATION & INFRASTRUCTURE • RÉSOLUTION DE PROBLÈMES'
        : 'FULL-STACK DEVELOPER • AUTOMATION & INFRASTRUCTURE • PROBLEM SOLVER';
    }
    document.querySelectorAll('.window').forEach(x => {
      const name = x.dataset.name;
      x.remove();
      if (name) open(name);
    });
    showToast(fr ? 'Langue : Français' : 'Language: English', '🌐');
  };
}

// Close all mobile windows (Phone Home Action)
function closeAllMobileWindows() {
  const windows = document.querySelectorAll('.window');
  if (windows.length > 0) {
    windows.forEach(w => w.remove());
    showToast(t('Homescreen', 'Écran d’accueil'), '🏠');
  }
}

// Clock Synchronization for Desktop Taskbar & Smartphone Status Bar
function updateClock() {
  const d = new Date();
  const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = d.toLocaleDateString(fr ? 'fr-FR' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  // Desktop Taskbar Clock
  const clockEl = document.querySelector('#clock');
  if (clockEl) {
    clockEl.innerHTML = timeStr + '<br>' + d.toLocaleDateString('en-GB');
  }

  // Smartphone Top Status Bar Time
  const phoneStatusTime = document.querySelector('#phone-status-time');
  if (phoneStatusTime) phoneStatusTime.textContent = timeStr;

  // Smartphone Widget Clock
  const phoneDigitalTime = document.querySelector('#phone-digital-time');
  if (phoneDigitalTime) phoneDigitalTime.textContent = timeStr;

  const phoneDateSub = document.querySelector('#phone-date-sub');
  if (phoneDateSub) phoneDateSub.textContent = dateStr;
}
updateClock();
setInterval(updateClock, 1000);

// Hide Boot Screen after initial load
if (bootEl) {
  setTimeout(() => bootEl.classList.add('hide'), 750);
}

// Adaptive Device Startup: Desktop auto-opens About Me; Mobile starts on the Smartphone Homescreen
setTimeout(() => {
  if (window.innerWidth > 650) {
    open('about');
  }
}, 850);
