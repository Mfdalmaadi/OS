/* ============================================================
   WINDOWS 11 PORTFOLIO OS — COMPLETE SCRIPT ENGINE
   El Moufaddal Maadi | Full-Stack Developer & Automation
   ============================================================ */

let fr = false;
let zIndexCounter = 100;
let windowOffset = 0;

// Translation helper: English (a) / French (b)
const t = (a, b) => (fr ? b : a);

/* ------------------------------------------------------------
   Toast Notifications System
   ------------------------------------------------------------ */
function showToast(message, icon = "✓", title = "Windows 11 System") {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-msg");
  const titleEl = document.getElementById("toast-title");
  const iconEl = document.getElementById("toast-icon");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  if (titleEl) titleEl.textContent = title;
  if (iconEl) iconEl.textContent = icon;

  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
}

function dismissToast() {
  const toast = document.getElementById("toast");
  if (toast) toast.classList.remove("show");
}

/* ------------------------------------------------------------
   Clipboard Helper
   ------------------------------------------------------------ */
function copyText(text, label = "Item") {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} ${t("copied to clipboard!", "copié dans le presse-papier !")}`, "📋");
  }).catch(() => {
    showToast(text, "📋");
  });
}

/* ------------------------------------------------------------
   Photo Lightbox Modal
   ------------------------------------------------------------ */
function openLightbox(imgSrc, title = "", subtitle = "") {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const titleEl = document.getElementById("lightbox-title");
  const subEl = document.getElementById("lightbox-subtitle");
  if (!lb || !img) return;

  img.src = imgSrc;
  if (titleEl) titleEl.textContent = title;
  if (subEl) subEl.textContent = subtitle;
  lb.classList.add("active");
}

function closeLightbox(e) {
  if (e && e.target.classList.contains("photo-lightbox-card")) return;
  const lb = document.getElementById("lightbox");
  if (lb) lb.classList.remove("active");
}

/* ------------------------------------------------------------
   Category Filtering for Projects
   ------------------------------------------------------------ */
function filterProjects(category, btnElement) {
  const projectCards = document.querySelectorAll(".project-card-modern");
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((b) => b.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");

  projectCards.forEach((card) => {
    const cardCat = card.dataset.category || "";
    const cardType = card.dataset.type || "";
    if (category === "all") {
      card.style.display = "flex";
    } else if (category === "resume" && cardType === "resume") {
      card.style.display = "flex";
    } else if (category === "progress" && cardType === "progress") {
      card.style.display = "flex";
    } else if (cardCat.toLowerCase().includes(category.toLowerCase())) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

/* ------------------------------------------------------------
   Taskbar Search & Start Menu Search Handling
   ------------------------------------------------------------ */
function focusSearch() {
  const menu = document.getElementById("startmenu");
  if (menu) {
    menu.classList.add("open");
    const input = document.getElementById("start-search-input");
    if (input) input.focus();
  }
}

function onTaskbarSearch(query) {
  const menu = document.getElementById("startmenu");
  if (menu && !menu.classList.contains("open")) {
    menu.classList.add("open");
  }
  const startInput = document.getElementById("start-search-input");
  if (startInput && startInput.value !== query) {
    startInput.value = query;
  }
  filterStartMenu(query);
}

function filterStartMenu(query) {
  const q = (query || "").toLowerCase();
  const pinnedBtns = document.querySelectorAll("#start-pinned-list .start-app-btn");
  pinnedBtns.forEach((btn) => {
    const text = btn.textContent.toLowerCase();
    btn.style.display = text.includes(q) ? "flex" : "none";
  });
}

/* ------------------------------------------------------------
   Applications Registry & Content Definitions
   ------------------------------------------------------------ */
const apps = {
  about: [
    "About Me — El Moufaddal Maadi",
    "👤",
    () => `
      <div class="section-header">
        <span class="section-badge">01 / PROFILE</span>
        <h2 class="section-title">${t("El Moufaddal Maadi", "El Moufaddal Maadi")}</h2>
        <p class="section-desc">${t("Full-Stack Developer & Automation Analyst — Tangier, Morocco.", "Développeur Full-Stack & Analyste Automatisation — Tanger, Maroc.")}</p>
      </div>

      <!-- Hero Profile Card -->
      <div class="about-hero-card">
        <div class="about-avatar-wrap">
          <img src="assets/pic1.jpeg" alt="El Moufaddal Maadi" class="about-avatar-img" onclick="openLightbox('assets/pic1.jpeg', 'El Moufaddal Maadi', 'Full-Stack Developer')">
          <div class="status-pill">
            <span class="status-dot"></span>
            <span>${t("Available for hire", "Disponible")}</span>
          </div>
        </div>
        <div class="about-info">
          <h2>El Moufaddal Maadi</h2>
          <span class="role-text">Full-Stack Developer &bull; Automation &amp; Infrastructure</span>

          <!-- SINGLE PRO PARAGRAPH DIRECTLY FROM CV -->
          <div class="about-single-paragraph-box">
            <p>
              ${t(
                "Results-driven Full-Stack Developer holding a degree in Computer Engineering (HIGH-TECH Rabat) and a Specialized Web Full-Stack diploma (OFPPT NTIC Tangier). Proficient in React, Laravel, Node.js, MySQL, and Python, with core competencies in REST APIs, databases, and OOP. Backed by production experience at Web Media Networks automating email infrastructure and resolving deliverability challenges, I engineer modern, scalable web applications and seek to contribute to high-impact software engineering teams.",
                "Développeur Full-Stack diplômé en génie informatique (HIGH-TECH Rabat) et en développement Web Full-Stack (OFPPT NTIC Tanger). Maîtrise de React, Laravel, Node.js, MySQL et Python, avec des compétences éprouvées en API REST, bases de données et POO. Fort d'une solide expérience chez Web Media Networks en automatisation d'infrastructure email et analyse de délivrabilité, je souhaite intégrer une équipe moderne où je pourrai concevoir des solutions performantes, apprendre rapidement et évoluer professionnellement."
              )}
            </p>
          </div>

          <!-- Compact contact meta -->
          <div class="about-meta-row">
            <span class="about-meta-tag">📍 Tanger, Boukhalef</span>
            <span class="about-meta-tag" onclick="copyText('maadimfdal@gmail.com', 'Email')" style="cursor:pointer;">✉ maadimfdal@gmail.com</span>
            <a href="tel:+212631361235" class="about-meta-tag">☎ +212 631 361 235</a>
            <a href="https://github.com/Mfdalmaadi" target="_blank" rel="noreferrer" class="about-meta-tag">🐙 GitHub</a>
            <a href="https://www.linkedin.com/in/el-moufaddal-maadi/" target="_blank" rel="noreferrer" class="about-meta-tag">💼 LinkedIn</a>
          </div>
        </div>
      </div>

      <!-- Compact Tech Stack -->
      <div class="about-stack-section">
        <span class="about-stack-label">${t("Tech Stack", "Stack Technique")}</span>
        <div class="about-stack-pills">
          <span class="tech-pill">React.js</span><span class="tech-pill">Laravel</span><span class="tech-pill">FastAPI</span>
          <span class="tech-pill">Node.js</span><span class="tech-pill">Python</span><span class="tech-pill">MySQL</span>
          <span class="tech-pill">Docker</span><span class="tech-pill">Git</span><span class="tech-pill">Scikit-learn</span>
          <span class="tech-pill">Spring Boot</span><span class="tech-pill">MongoDB</span><span class="tech-pill">JWT / REST</span>
        </div>
      </div>

      <!-- Compact highlight cards -->
      <div class="about-highlights-row">
        <div class="about-highlight-card">
          <span class="highlight-icon">♜</span>
          <div><b>Web Media Networks</b><small>Automation Analyst · 08/2025–08/2026, Tanger</small></div>
        </div>
        <div class="about-highlight-card">
          <span class="highlight-icon">🌐</span>
          <div><b>HD-Maroc</b><small>Web Dev Intern · 04/2025–05/2025, Tanger</small></div>
        </div>
        <div class="about-highlight-card">
          <span class="highlight-icon">🎓</span>
          <div><b>HIGH-TECH Rabat</b><small>Licence Génie Informatique · 2025–2026</small></div>
        </div>
        <div class="about-highlight-card">
          <span class="highlight-icon">🎓</span>
          <div><b>OFPPT NTIC Tanger</b><small>Web Full-Stack · 2023–2025</small></div>
        </div>
      </div>

      <!-- Action buttons -->
      <div style="display:flex; gap:10px; margin-top:20px; flex-wrap:wrap;">
        <button onclick="openApp('projects')" class="btn-project-action btn-primary-action">💻 ${t("View Projects", "Voir Projets")}</button>
        <button onclick="openApp('resume')" class="btn-project-action">📄 ${t("Open Resume PDF", "Ouvrir CV PDF")}</button>
        <button onclick="openApp('contact')" class="btn-project-action">✉ ${t("Contact Me", "Me Contacter")}</button>
      </div>
    `,
  ],

  projects: [
    "Projects — Software Showcase",
    "💻",
    () => `
      <div class="section-header">
        <span class="section-badge">02 / SOFTWARE PORTFOLIO</span>
        <h2 class="section-title">${t("Software Projects", "Projets Logiciels")}</h2>
        <p class="section-desc">${t(
          "Featured platforms from my resume with actual production screenshots, alongside active enterprise systems.",
          "Projets vérifiés issus du CV avec captures réelles, accompagnés d'architectures d'entreprise et d'outils open-source."
        )}</p>
      </div>

      <!-- Filter Toolbar -->
      <div class="projects-header-toolbar">
        <span style="font-size: 12.5px; color: #94a3b8; font-weight: 600;">
          ${t("Filter:", "Filtrer :")}
        </span>
        <div class="project-filter-buttons">
          <button class="filter-btn active" onclick="filterProjects('all', this)">${t("All (5)", "Tous (5)")}</button>
          <button class="filter-btn" onclick="filterProjects('resume', this)">${t("On My Resume (2)", "Sur le CV (2)")}</button>
          <button class="filter-btn" onclick="filterProjects('progress', this)">${t("In Progress (3)", "En Cours (3)")}</button>
          <button class="filter-btn" onclick="filterProjects('AI', this)">AI &amp; ML</button>
          <button class="filter-btn" onclick="filterProjects('Full-Stack', this)">Full-Stack</button>
          <button class="filter-btn" onclick="filterProjects('DevOps', this)">Automation</button>
        </div>
      </div>

      <!-- Responsive Multi-Column Projects Grid -->
      <div class="projects-cards-grid">

        <!-- Project 1: MedPredict AI (ON RESUME) WITH AUTHENTIC IMAGE -->
        <article class="project-card-modern" data-type="resume" data-category="AI, Healthcare, Full-Stack">
          <div class="project-img-banner" onclick="openLightbox('assets/medpredict.jpg', 'MedPredict AI — Clinical Decision Support', 'FastAPI • React • Python • Scikit-learn • SHAP • MySQL')">
            <img src="assets/medpredict.jpg" alt="MedPredict AI Screenshot">
            <span class="img-zoom-badge">🔍 ${t("Click to Expand", "Agrandir")}</span>
          </div>
          <div class="project-card-body">
            <div class="project-badge-bar">
              <span class="project-type-tag tag-resume">✓ ${t("ON RESUME • PRODUCTION", "SUR LE CV • RÉALISÉ")}</span>
              <span class="project-category-pill">FastAPI • React</span>
            </div>
            <h3>MedPredict AI – ${t("AI Medical Diagnosis Platform", "Plateforme d’Aide au Diagnostic Médical")}</h3>
            <p>
              ${t(
                "AI-assisted medical diagnostic platform with FastAPI and React. Designed a secure REST API with JWT authentication and patient/user management. Developed a Random Forest ML model with prediction explainability via SHAP and integrated with MySQL.",
                "Plateforme d’aide au diagnostic basée sur l’IA avec FastAPI et React. Conception d’une API REST sécurisée avec JWT et gestion patients. Modèle Random Forest avec explicabilité via SHAP et persistance MySQL."
              )}
            </p>
            <ul class="project-feature-list">
              <li>${t("Hospital-ready clinical prediction workflows & diagnostic support", "Workflows cliniques d'aide au diagnostic")}</li>
              <li>${t("Secure REST API with JWT authentication and doctor/patient management", "API REST sécurisée avec authentification JWT")}</li>
              <li>${t("Random Forest ML model with prediction explainability via SHAP values", "Modèle Random Forest explicable via SHAP")}</li>
              <li>${t("Relational persistence with MySQL and SQLAlchemy ORM", "Persistance relationnelle avec MySQL et SQLAlchemy")}</li>
            </ul>
            <div class="project-tags-row">
              <span class="tech-pill">FastAPI</span>
              <span class="tech-pill">React</span>
              <span class="tech-pill">Python</span>
              <span class="tech-pill">Scikit-learn</span>
              <span class="tech-pill">SHAP</span>
              <span class="tech-pill">MySQL</span>
              <span class="tech-pill">JWT</span>
            </div>
            <div class="project-card-actions">
              <button class="btn-project-action btn-primary-action" onclick="openLightbox('assets/medpredict.jpg', 'MedPredict AI Interface', 'Doctor registration & workflow')">
                🖼 ${t("View Screenshot", "Voir Capture")}
              </button>
              <a href="https://github.com/Mfdalmaadi" target="_blank" rel="noreferrer" class="btn-project-action">
                🐙 ${t("GitHub", "Dépôt")} ↗
              </a>
            </div>
          </div>
        </article>

        <!-- Project 2: THE GUIDE (ON RESUME) WITH AUTHENTIC IMAGE -->
        <article class="project-card-modern" data-type="resume" data-category="Full-Stack, Web">
          <div class="project-img-banner" onclick="openLightbox('assets/theguide.jpg', 'THE GUIDE — Northern Morocco Tourism Platform', 'React • Laravel • MySQL • Interactive Maps')">
            <img src="assets/theguide.jpg" alt="THE GUIDE Screenshot">
            <span class="img-zoom-badge">🔍 ${t("Click to Expand", "Agrandir")}</span>
          </div>
          <div class="project-card-body">
            <div class="project-badge-bar">
              <span class="project-type-tag tag-resume">✓ ${t("ON RESUME • PRODUCTION", "SUR LE CV • RÉALISÉ")}</span>
              <span class="project-category-pill">React • Laravel</span>
            </div>
            <h3>THE GUIDE – ${t("Northern Morocco Tourism Platform", "Plateforme Touristique Full-Stack")}</h3>
            <p>
              ${t(
                "Full-stack tourism platform dedicated to visitors of Northern Morocco. Architecture of a secure REST API with multi-role authentication. Management dashboards, booking workflows, and interactive regional discovery maps.",
                "Plateforme touristique dédiée aux visiteurs du nord du Maroc. Conception d’une API REST sécurisée avec authentification multi-rôles, tableaux de bord de gestion et cartes interactives."
              )}
            </p>
            <ul class="project-feature-list">
              <li>${t("Dedicated regional discovery for Northern Morocco (Tangier, Tetouan, Chefchaouen)", "Découverte des destinations du nord du Maroc")}</li>
              <li>${t("Secure REST API with multi-role permissions (Admin, Guide, Tourist)", "API REST sécurisée avec authentification multi-rôles")}</li>
              <li>${t("Interactive geographic map integration & booking workflows", "Cartes interactives et flux de réservations complet")}</li>
            </ul>
            <div class="project-tags-row">
              <span class="tech-pill">React</span>
              <span class="tech-pill">Laravel</span>
              <span class="tech-pill">MySQL</span>
              <span class="tech-pill">API REST</span>
              <span class="tech-pill">Bootstrap</span>
            </div>
            <div class="project-card-actions">
              <button class="btn-project-action btn-primary-action" onclick="openLightbox('assets/theguide.jpg', 'THE GUIDE — Explore the North', 'Chefchaouen & Northern Morocco Discovery')">
                🖼 ${t("View Screenshot", "Voir Capture")}
              </button>
              <a href="https://github.com/Mfdalmaadi" target="_blank" rel="noreferrer" class="btn-project-action">
                🐙 ${t("GitHub", "Dépôt")} ↗
              </a>
            </div>
          </div>
        </article>

        <!-- Project 3: NetPulse (IN PROGRESS) WITH MOCKUP -->
        <article class="project-card-modern" data-type="progress" data-category="DevOps, Automation, Infrastructure">
          <div class="project-img-banner" onclick="openLightbox('assets/netpulse.jpg', 'NetPulse — Infrastructure & Deliverability Dashboard', 'Python • Node.js • Docker • Real-Time Telemetry')">
            <img src="assets/netpulse.jpg" alt="NetPulse Screenshot">
            <span class="img-zoom-badge">🔍 ${t("Click to Expand", "Agrandir")}</span>
          </div>
          <div class="project-card-body">
            <div class="project-badge-bar">
              <span class="project-type-tag tag-progress">⏳ ${t("IN PROGRESS", "EN COURS")}</span>
              <span class="project-category-pill">Automation &amp; Infra</span>
            </div>
            <h3>NetPulse – ${t("Real-Time Infrastructure & IP Monitor", "Supervision Réseau & Délivrabilité")}</h3>
            <p>
              ${t(
                "Real-time diagnostic platform for IP address reachability, server uptime, and email delivery telemetry. Triggers automated remediation scripts and alerts when anomalies are detected.",
                "Outil automatisé de supervision en temps réel des adresses IP, de la disponibilité des serveurs et de la délivrabilité email avec scripts d'auto-remédiation."
              )}
            </p>
            <ul class="project-feature-list">
              <li>${t("IP subnet telemetry, latency monitoring & deliverability diagnostics", "Surveillance automatisée des adresses IP")}</li>
              <li>${t("Automated bash/Python error-handling and incident triggers", "Déclenchement automatique de scripts de diagnostic")}</li>
              <li>${t("Live WebSocket dashboard with Dockerized architecture", "Supervision temps réel via Docker")}</li>
            </ul>
            <div class="project-tags-row">
              <span class="tech-pill">Python</span>
              <span class="tech-pill">Node.js</span>
              <span class="tech-pill">Docker</span>
              <span class="tech-pill">Bash</span>
              <span class="tech-pill">MySQL</span>
            </div>
            <div class="project-card-actions">
              <button class="btn-project-action btn-primary-action" onclick="openLightbox('assets/netpulse.jpg', 'NetPulse Live Telemetry UI', 'Network traffic & IP deliverability graphs')">
                🖼 ${t("View Screenshot", "Voir Capture")}
              </button>
              <a href="https://github.com/Mfdalmaadi" target="_blank" rel="noreferrer" class="btn-project-action">
                🐙 ${t("GitHub", "Dépôt")} ↗
              </a>
            </div>
          </div>
        </article>

        <!-- Project 4: OmniStore (IN PROGRESS) WITH MOCKUP -->
        <article class="project-card-modern" data-type="progress" data-category="Full-Stack, Enterprise, Java">
          <div class="project-img-banner" onclick="openLightbox('assets/omnistore.jpg', 'OmniStore — Microservices Dashboard', 'Java Spring Boot • React • Redis • Docker')">
            <img src="assets/omnistore.jpg" alt="OmniStore Screenshot">
            <span class="img-zoom-badge">🔍 ${t("Click to Expand", "Agrandir")}</span>
          </div>
          <div class="project-card-body">
            <div class="project-badge-bar">
              <span class="project-type-tag tag-progress">⏳ ${t("IN PROGRESS", "EN COURS")}</span>
              <span class="project-category-pill">Spring Boot • Java</span>
            </div>
            <h3>OmniStore – ${t("Enterprise Microservices Platform", "Plateforme E-Commerce en Microservices")}</h3>
            <p>
              ${t(
                "Enterprise Java Spring Boot microservices platform featuring decoupled services for auth, catalog, and orders. Optimized with Redis caching and containerized with Docker.",
                "Architecture d’entreprise en microservices avec Java Spring Boot et React. Gestion des services indépendants, mise en cache Redis et conteneurisation Docker."
              )}
            </p>
            <ul class="project-feature-list">
              <li>${t("Decoupled Spring Boot microservices with Spring Data JPA", "Microservices découplés Spring Boot")}</li>
              <li>${t("Redis cache integration for rapid catalog throughput", "Accélération des requêtes via mise en cache Redis")}</li>
              <li>${t("Stateless JWT security layer with role permissions", "Authentification sécurisée avec JWT")}</li>
            </ul>
            <div class="project-tags-row">
              <span class="tech-pill">Spring Boot</span>
              <span class="tech-pill">Java</span>
              <span class="tech-pill">React</span>
              <span class="tech-pill">Redis</span>
              <span class="tech-pill">Docker</span>
            </div>
            <div class="project-card-actions">
              <button class="btn-project-action btn-primary-action" onclick="openLightbox('assets/omnistore.jpg', 'OmniStore Microservices Catalog', 'Catalog overview & service health')">
                🖼 ${t("View Screenshot", "Voir Capture")}
              </button>
              <a href="https://github.com/Mfdalmaadi" target="_blank" rel="noreferrer" class="btn-project-action">
                🐙 ${t("GitHub", "Dépôt")} ↗
              </a>
            </div>
          </div>
        </article>

        <!-- Project 5: DevTask Automation CLI -->
        <article class="project-card-modern" data-type="progress" data-category="DevOps, Automation">
          <div class="project-card-body">
            <div class="project-badge-bar">
              <span class="project-type-tag tag-progress">⏳ ${t("IN PROGRESS", "EN COURS")}</span>
              <span class="project-category-pill">Automation CLI</span>
            </div>
            <h3>DevTask – ${t("Server Automation & Cloud CLI", "CLI d’Automatisation & Scripts Serveur")}</h3>
            <p>
              ${t(
                "A lightweight command-line utility built with Python and Bash for automating server provisioning, database backups, and scheduled maintenance tasks.",
                "Outil CLI léger en Python et Bash pour automatiser la maintenance des serveurs, la rotation des sauvegardes et le déploiement continu."
              )}
            </p>
            <ul class="project-feature-list">
              <li>${t("One-click Linux server environment provisioning", "Configuration en une commande d’environnements serveurs")}</li>
              <li>${t("Automated MySQL backup rotation and local archiving", "Rotation automatique des sauvegardes")}</li>
              <li>${t("Lightweight scripts optimized for production reliability", "Scripts légers et robustes pour la production")}</li>
            </ul>
            <div class="project-tags-row">
              <span class="tech-pill">Python</span>
              <span class="tech-pill">Bash</span>
              <span class="tech-pill">Docker</span>
              <span class="tech-pill">Linux</span>
            </div>
            <div class="project-card-actions">
              <a href="https://github.com/Mfdalmaadi" target="_blank" rel="noreferrer" class="btn-project-action">
                🐙 ${t("GitHub", "Dépôt")} ↗
              </a>
            </div>
          </div>
        </article>

      </div>
    `,
  ],

  skills: [
    "Skills & Technical Toolkit",
    "⚙",
    () => `
      <div class="section-header">
        <span class="section-badge">03 / TECHNICAL TOOLKIT</span>
        <h2 class="section-title">${t("Skills & Technologies", "Compétences & Technologies")}</h2>
        <p class="section-desc">${t(
          "Directly sourced from verified resume. Structured, concise, and focused on production-ready engineering.",
          "Compétences techniques et humaines issues directement du CV, organisées de manière claire et concise."
        )}</p>
      </div>

      <div class="skills-container">

        <!-- 1. Langages -->
        <div class="skill-category-group">
          <div class="category-header">
            <div class="category-icon">💻</div>
            <h3 class="category-title">Langages</h3>
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

        <!-- 3. Backend & Architecture -->
        <div class="skill-category-group">
          <div class="category-header">
            <div class="category-icon">⚙</div>
            <h3 class="category-title">Backend &amp; Architecture</h3>
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

        <!-- 4. Databases -->
        <div class="skill-category-group">
          <div class="category-header">
            <div class="category-icon">🗄</div>
            <h3 class="category-title">Bases de Données</h3>
          </div>
          <div class="skills-grid-clean">
            <span class="skill-chip-clean"><b>🐬</b> MySQL</span>
            <span class="skill-chip-clean"><b>🍃</b> MongoDB</span>
            <span class="skill-chip-clean"><b>Ora</b> Oracle</span>
            <span class="skill-chip-clean"><b>MCD</b> Modélisation des données</span>
          </div>
        </div>

        <!-- 5. Tools & Environment -->
        <div class="skill-category-group">
          <div class="category-header">
            <div class="category-icon">🛠</div>
            <h3 class="category-title">Outils &amp; Environnement</h3>
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
            <span class="soft-badge-item">🧩 Résolution de problèmes</span>
            <span class="soft-badge-item">🤝 Esprit d'équipe</span>
            <span class="soft-badge-item">🔄 Adaptabilité</span>
            <span class="soft-badge-item">💬 Communication</span>
            <span class="soft-badge-item">📚 Apprentissage continu</span>
            <span class="soft-badge-item">⏱ Gestion du temps</span>
          </div>
        </div>

        <!-- 7. Languages -->
        <div class="skill-category-group">
          <div class="category-header">
            <div class="category-icon">🌐</div>
            <h3 class="category-title">Langues</h3>
          </div>
          <div class="skills-grid-clean">
            <span class="skill-chip-clean">🇲🇦 Arabe : Langue maternelle</span>
            <span class="skill-chip-clean">🇫🇷 Français : Intermédiaire</span>
            <span class="skill-chip-clean">🇬🇧 Anglais : Professionnel</span>
          </div>
        </div>

      </div>
    `,
  ],

  experience: [
    "Professional Experience",
    "♜",
    () => `
      <div class="section-header">
        <span class="section-badge">04 / EXPÉRIENCE PROFESSIONNELLE</span>
        <h2 class="section-title">${t("Expérience Professionnelle", "Expérience Professionnelle")}</h2>
        <p class="section-desc">${t(
          "Engineering automation scripts, email infrastructure optimization, and responsive web development.",
          "Développement de scripts d’automatisation, optimisation d’infrastructure email et conception web."
        )}</p>
      </div>

      <div class="cards-timeline">

        <!-- 1. Web Media Networks -->
        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge">08/2025 — 08/2026</span>
            <span class="card-location-badge">📍 Tanger, Maroc</span>
          </div>
          <h3>Web Media Networks</h3>
          <span class="company-sub">${t("Analyste Développeur — Automatisation & Infrastructure Email", "Analyste Développeur — Automatisation & Infrastructure Email")}</span>

          <ul class="experience-bullet-list">
            <li>
              <span>${t("Développement de scripts d’automatisation pour optimiser les tâches répétitives et traiter les données.", "Développement de scripts d’automatisation pour optimiser les tâches répétitives et traiter les données.")}</span>
            </li>
            <li>
              <span>${t("Analyse et résolution de problèmes liés à la délivrabilité des emails et aux adresses IP.", "Analyse et résolution de problèmes liés à la délivrabilité des emails et aux adresses IP.")}</span>
            </li>
            <li>
              <span>${t("Optimisation des processus techniques et réduction des tâches manuelles.", "Optimisation des processus techniques et réduction des tâches manuelles.")}</span>
            </li>
          </ul>

          <div class="project-tags-row" style="margin-top: 14px;">
            <span class="tech-pill">Automatisation</span>
            <span class="tech-pill">Infrastructure Email</span>
            <span class="tech-pill">Délivrabilité &amp; IP</span>
            <span class="tech-pill">Scripts Python / Bash</span>
            <span class="tech-pill">Traitement de Données</span>
          </div>
        </article>

        <!-- 2. HD-Maroc -->
        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge">04/2025 — 05/2025</span>
            <span class="card-location-badge">📍 Tanger, Maroc</span>
          </div>
          <h3>HD-Maroc</h3>
          <span class="company-sub">${t("Web Developer Intern", "Web Developer Intern")}</span>

          <ul class="experience-bullet-list">
            <li>
              <span>${t("J'ai créé un site Web de coaching avec WordPress + Elementor. Livré un site clair et responsive aligné sur l’identité visuelle du client, améliorant la présentation des services et la prise de contact.", "J'ai créé un site Web de coaching avec WordPress + Elementor. Livré un site clair et responsive aligné sur l’identité visuelle du client, améliorant la présentation des services et la prise de contact.")}</span>
            </li>
          </ul>

          <div class="project-tags-row" style="margin-top: 14px;">
            <span class="tech-pill">WordPress</span>
            <span class="tech-pill">Elementor</span>
            <span class="tech-pill">PHP</span>
            <span class="tech-pill">CSS3</span>
            <span class="tech-pill">Responsive Design</span>
          </div>
        </article>

      </div>
    `,
  ],

  education: [
    "Academic Education",
    "🎓",
    () => `
      <div class="section-header">
        <span class="section-badge">05 / FORMATION ACADÉMIQUE</span>
        <h2 class="section-title">${t("Formation Académique", "Formation Académique")}</h2>
        <p class="section-desc">${t(
          "Scientific foundation, digital full-stack web development, and computer engineering sciences.",
          "Des sciences fondamentales au développement digital web full-stack et au génie informatique."
        )}</p>
      </div>

      <div class="cards-timeline">

        <!-- 1. HIGH-TECH Rabat -->
        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge">10/2025 — 06/2026</span>
            <span class="card-location-badge">📍 Rabat, Maroc</span>
          </div>
          <h3>HIGH-TECH – École des Hautes Études en Ingénierie et Technologie</h3>
          <span class="company-sub">${t("Licence en Sciences de l'Ingénieur – Option Génie Informatique", "Licence en Sciences de l'Ingénieur – Option Génie Informatique")}</span>
        </article>

        <!-- 2. OFPPT ISTA NTIC Tanger -->
        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge">09/2023 — 06/2025</span>
            <span class="card-location-badge">📍 Tanger, Maroc</span>
          </div>
          <h3>OFPPT ISTA NTIC Tanger</h3>
          <span class="company-sub">${t("Technicien Spécialisé en Développement Digital – Option Web Full-Stack", "Technicien Spécialisé en Développement Digital – Option Web Full-Stack")}</span>
        </article>

        <!-- 3. FACULTÉ POLYDISCIPLINAIRE DE LARACHE -->
        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge">10/2022 — 06/2023</span>
            <span class="card-location-badge">📍 Larache, Maroc</span>
          </div>
          <h3>FACULTÉ POLYDISCIPLINAIRE DE LARACHE</h3>
          <span class="company-sub">${t("Filière Sciences de la Matière Physique (SMP)", "Filière Sciences de la Matière Physique (SMP)")}</span>
        </article>

        <!-- 4. Lycée Mansour Dahbi -->
        <article class="timeline-card">
          <div class="card-header-bar">
            <span class="card-date-badge">09/2021 — 06/2022</span>
            <span class="card-location-badge">📍 Maroc</span>
          </div>
          <h3>Lycée Mansour Dahbi</h3>
          <span class="company-sub">${t("Baccalauréat Sciences Physiques", "Baccalauréat Sciences Physiques")}</span>
        </article>

      </div>
    `,
  ],

  certifications: [
    "Certificates & Credentials",
    "★",
    () => `
      <div class="section-header">
        <span class="section-badge">06 / CERTIFICATIONS</span>
        <h2 class="section-title">${t("Certifications", "Certifications")}</h2>
        <p class="section-desc">${t(
          "Verified credentials from Cisco Networking Academy, 365 Data Science, and efe Maroc.",
          "Certifications reconnues auprès d'institutions internationales et régionales."
        )}</p>
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
    `,
  ],

  contact: [
    "Contact Me — Windows Mail",
    "✉",
    () => `
      <div class="section-header">
        <span class="section-badge">07 / GET IN TOUCH</span>
        <h2 class="section-title">${t("Me Contacter", "Me Contacter")}</h2>
        <p class="section-desc">${t(
          "Click below to compose an email directly, reach out via WhatsApp, or connect on LinkedIn.",
          "Cliquez pour composer un email instantanément, échanger sur WhatsApp ou visiter mon profil LinkedIn."
        )}</p>
      </div>

      <!-- Main Direct Email CTA -->
      <div class="contact-hero-cta">
        <h3>${t("Let's Build Something Exceptional", "Un projet ou une opportunité ?")}</h3>
        <p>${t("Launch a pre-filled email draft directly to my inbox.", "Ouvrez un brouillon d'email prérempli directement vers ma boîte de réception.")}</p>
        <button type="button" class="btn-open-draft" onclick="(function(){var m='maadimfdal@gmail.com',s=encodeURIComponent('Hello El Moufaddal'),b=encodeURIComponent('Hello El Moufaddal,\\n\\nI came across your portfolio and would like to connect regarding...');window.location.href='mailto:'+m+'?subject='+s+'&body='+b;})();">
          <span>✉</span>
          <span>${t("Compose Direct Email", "Ouvrir un Brouillon Email")}</span>
        </button>
      </div>

      <!-- Channels Grid with Verified Working Links -->
      <div class="contact-channels-grid">
        <div class="contact-channel-card">
          <div class="channel-icon-title">
            <div class="channel-icon">✉</div>
            <span class="channel-title">Email</span>
          </div>
          <span class="channel-value">maadimfdal@gmail.com</span>
          <div class="channel-actions">
            <button type="button" class="btn-mini-action" onclick="copyText('maadimfdal@gmail.com', 'Email')">📋 ${t("Copy", "Copier")}</button>
            <a href="mailto:maadimfdal@gmail.com?subject=Hello%20El%20Moufaddal" class="btn-mini-action">↗ ${t("Write", "Écrire")}</a>
          </div>
        </div>

        <div class="contact-channel-card">
          <div class="channel-icon-title">
            <div class="channel-icon">📱</div>
            <span class="channel-title">${t("Phone & WhatsApp", "Téléphone & WhatsApp")}</span>
          </div>
          <span class="channel-value">+212 631 361 235</span>
          <div class="channel-actions">
            <button type="button" class="btn-mini-action" onclick="copyText('+212631361235', 'Phone')">📋 ${t("Copy", "Copier")}</button>
            <a href="https://wa.me/212631361235?text=Hello%20El%20Moufaddal" target="_blank" rel="noreferrer" class="btn-mini-action">💬 WhatsApp</a>
            <a href="tel:+212631361235" class="btn-mini-action">📞 ${t("Call", "Appeler")}</a>
          </div>
        </div>

        <div class="contact-channel-card">
          <div class="channel-icon-title">
            <div class="channel-icon">📍</div>
            <span class="channel-title">${t("Location", "Localisation")}</span>
          </div>
          <span class="channel-value">Tanger, Boukhalef, Maroc</span>
          <div class="channel-actions">
            <span style="font-size:11.5px; color:#94a3b8;">${t("On-site & Remote", "Sur site & Télétravail")}</span>
          </div>
        </div>

        <div class="contact-channel-card">
          <div class="channel-icon-title">
            <div class="channel-icon">💼</div>
            <span class="channel-title">LinkedIn</span>
          </div>
          <span class="channel-value">El Moufaddal Maadi</span>
          <div class="channel-actions">
            <a href="https://www.linkedin.com/in/el-moufaddal-maadi/" target="_blank" rel="noreferrer" class="btn-mini-action">↗ ${t("LinkedIn Profile", "Voir Profil")}</a>
          </div>
        </div>

        <div class="contact-channel-card">
          <div class="channel-icon-title">
            <div class="channel-icon">🐙</div>
            <span class="channel-title">GitHub</span>
          </div>
          <span class="channel-value">github.com/Mfdalmaadi</span>
          <div class="channel-actions">
            <a href="https://github.com/Mfdalmaadi" target="_blank" rel="noreferrer" class="btn-mini-action">↗ ${t("Visit Profile", "Voir Profil")}</a>
            <button type="button" class="btn-mini-action" onclick="copyText('https://github.com/Mfdalmaadi', 'GitHub URL')">📋 ${t("Copy", "Copier")}</button>
          </div>
        </div>
      </div>
    `,
  ],

  resume: [
    "ElMoufaddal_Resume.pdf — Microsoft Edge",
    "📄",
    () => `
      <div class="pdf-viewer-wrap">
        <div class="pdf-toolbar">
          <div class="pdf-title-info">
            <span>📄</span>
            <b>El_Moufaddal_Maadi_CV.pdf</b>
          </div>

          <div class="pdf-view-toggle">
            <button class="pdf-toggle-btn active" id="btn-tab-digital" onclick="switchResumeTab('digital')">
              📄 ${t("Interactive CV", "CV Interactif")}
            </button>
            <button class="pdf-toggle-btn" id="btn-tab-pdf" onclick="switchResumeTab('pdf')">
              📑 ${t("PDF Embed", "Document PDF")}
            </button>
          </div>

          <div class="pdf-toolbar-actions">
            <a href="assets/ElMoufaddal_Maadi_CV.pdf" target="_blank" class="pdf-btn">↗ ${t("Open Tab", "Ouvrir")}</a>
            <a href="assets/ElMoufaddal_Maadi_CV.pdf" download="El_Moufaddal_Maadi_CV.pdf" class="pdf-btn pdf-btn-primary">💾 ${t("Download PDF", "Télécharger")}</a>
            <button onclick="window.print()" class="pdf-btn">🖨 ${t("Print", "Imprimer")}</button>
          </div>
        </div>

        <!-- Mode 1: Pixel-Perfect Authentic Digital CV -->
        <div id="resume-view-digital" class="digital-cv-sheet">
          
          <header class="cv-doc-header">
            <img src="assets/pic1.jpeg" alt="El Moufaddal Maadi" class="cv-doc-avatar" onclick="openLightbox('assets/pic1.jpeg', 'El Moufaddal Maadi', 'Full-Stack Developer')">
            <h1 class="cv-doc-name">El Moufaddal Maadi</h1>
            <div class="cv-doc-subtitle">Développeur Full Stack</div>
            <div class="cv-doc-contacts">
              <a href="mailto:maadimfdal@gmail.com">✉ maadimfdal@gmail.com</a>
              <span>•</span>
              <a href="tel:+212631361235">☎ +212 631 361 235</a>
              <span>•</span>
              <span>📍 Tanger, Boukhalef</span>
              <span>•</span>
              <a href="https://www.linkedin.com/in/el-moufaddal-maadi/" target="_blank" rel="noreferrer">💼 LinkedIn</a>
              <span>•</span>
              <a href="https://github.com/Mfdalmaadi" target="_blank" rel="noreferrer">🐙 GitHub</a>
              <span>•</span>
              <span style="color:#0284c7; font-weight:600;">🌐 Portfolio OS</span>
            </div>
          </header>

          <!-- PROFIL -->
          <section class="cv-doc-section">
            <h3 class="cv-doc-heading">PROFIL</h3>
            <p class="cv-doc-p">
              ${t(
                "Développeur Full-Stack diplômé en génie informatique et en développement Web Full-Stack. Maîtrise de React, Laravel, Node.js, MySQL et Python, avec des compétences en API REST, bases de données, POO, je souhaite intégrer une équipe où je pourrai contribuer à des projets web modernes, apprendre rapidement et évoluer professionnellement.",
                "Développeur Full-Stack diplômé en génie informatique et en développement Web Full-Stack. Maîtrise de React, Laravel, Node.js, MySQL et Python, avec des compétences en API REST, bases de données, POO, je souhaite intégrer une équipe où je pourrai contribuer à des projets web modernes, apprendre rapidement et évoluer professionnellement."
              )}
            </p>
          </section>

          <!-- EXPÉRIENCE PROFESSIONNELLE -->
          <section class="cv-doc-section">
            <h3 class="cv-doc-heading">EXPÉRIENCE PROFESSIONNELLE</h3>
            
            <div class="cv-item-row">
              <div class="cv-item-top">
                <span class="cv-item-title">Web Media Networks, <span style="font-weight:400; color:#475569;">Analyste Développeur — Automatisation &amp; Infrastructure Email</span></span>
                <span class="cv-item-date">08/2025 – 08/2026 &nbsp;|&nbsp; Tanger</span>
              </div>
              <ul class="cv-item-bullets">
                <li>Développement de scripts d'automatisation pour optimiser les tâches répétitives et traiter les données.</li>
                <li>Analyse et résolution de problèmes liés à la délivrabilité des emails et aux adresses IP.</li>
                <li>Optimisation des processus techniques et réduction des tâches manuelles.</li>
              </ul>
            </div>

            <div class="cv-item-row">
              <div class="cv-item-top">
                <span class="cv-item-title">HD-Maroc, <span style="font-weight:400; color:#475569;">Web Developer Intern</span></span>
                <span class="cv-item-date">04/2025 – 05/2025 &nbsp;|&nbsp; Tanger</span>
              </div>
              <ul class="cv-item-bullets">
                <li>J'ai créé un site Web de coaching avec WordPress + Elementor. Livré un site clair et responsive aligné sur l'identité visuelle du client, améliorant la présentation des services et la prise de contact.</li>
              </ul>
            </div>
          </section>

          <!-- FORMATION ACADÉMIQUE -->
          <section class="cv-doc-section">
            <h3 class="cv-doc-heading">FORMATION ACADÉMIQUE</h3>
            
            <div class="cv-item-row">
              <div class="cv-item-top">
                <span class="cv-item-title">Licence en Sciences de l'Ingénieur – Option Génie Informatique</span>
                <span class="cv-item-date">10/2025 – 06/2026 &nbsp;|&nbsp; Rabat</span>
              </div>
              <div class="cv-item-sub">HIGH-TECH – École des Hautes Études en Ingénierie et Technologie</div>
            </div>

            <div class="cv-item-row">
              <div class="cv-item-top">
                <span class="cv-item-title">Technicien Spécialisé en Développement Digital – Option Web Full-Stack</span>
                <span class="cv-item-date">09/2023 – 06/2025 &nbsp;|&nbsp; Tanger</span>
              </div>
              <div class="cv-item-sub">OFPPT ISTA NTIC Tanger</div>
            </div>

            <div class="cv-item-row">
              <div class="cv-item-top">
                <span class="cv-item-title">Filière Sciences de la Matière Physique (SMP)</span>
                <span class="cv-item-date">10/2022 – 06/2023 &nbsp;|&nbsp; Larache</span>
              </div>
              <div class="cv-item-sub">FACULTÉ POLYDISCIPLINAIRE DE LARACHE</div>
            </div>

            <div class="cv-item-row">
              <div class="cv-item-top">
                <span class="cv-item-title">Baccalauréat Sciences Physiques</span>
                <span class="cv-item-date">09/2021 – 06/2022</span>
              </div>
              <div class="cv-item-sub">Lycée Mansour Dahbi</div>
            </div>
          </section>

          <!-- PROJETS -->
          <section class="cv-doc-section">
            <h3 class="cv-doc-heading">PROJETS</h3>
            
            <div class="cv-item-row">
              <div class="cv-item-top">
                <span class="cv-item-title">MedPredict AI – Plateforme d'Aide au Diagnostic Médical basée sur l'IA</span>
              </div>
              <div class="cv-item-sub">Technologies : FastAPI • React • Python • Scikit-learn • SHAP • MySQL • SQLAlchemy • JWT</div>
              <ul class="cv-item-bullets">
                <li>Développement d'une plateforme d'aide au diagnostic basée sur l'IA avec FastAPI et React.</li>
                <li>Conception d'une API REST sécurisée avec authentification JWT et gestion des utilisateurs/patients.</li>
                <li>Développement d'un modèle Random Forest avec explicabilité des prédictions via SHAP et intégration à MySQL.</li>
              </ul>
            </div>

            <div class="cv-item-row">
              <div class="cv-item-top">
                <span class="cv-item-title">THE GUIDE – Plateforme Touristique Full-Stack</span>
              </div>
              <div class="cv-item-sub">Technologies : React • Laravel • MySQL</div>
              <ul class="cv-item-bullets">
                <li>Développement d'une plateforme touristique dédiée aux visiteurs du nord du Maroc.</li>
                <li>Conception d'une API REST sécurisée avec authentification multi-rôles.</li>
                <li>Développement de tableaux de bord, gestion des réservations et cartes interactives pour les différents acteurs.</li>
              </ul>
            </div>
          </section>

          <!-- COMPÉTENCES -->
          <section class="cv-doc-section">
            <h3 class="cv-doc-heading">COMPÉTENCES</h3>
            <div class="cv-skills-category"><b>Langages :</b> PHP, JavaScript (ES6+), Python, SQL, Java</div>
            <div class="cv-skills-category"><b>Frontend :</b> React.js, HTML5, CSS3, Bootstrap, WordPress, Elementor</div>
            <div class="cv-skills-category"><b>Backend :</b> Laravel, Node.js, Express.js, Spring Boot, API REST, Architecture MVC</div>
            <div class="cv-skills-category"><b>Bases de Données :</b> MySQL, MongoDB, Oracle, Modélisation des données</div>
            <div class="cv-skills-category"><b>Outils &amp; Environnement :</b> Git, GitHub, Docker, Postman</div>
          </section>

          <!-- SOFT SKILLS -->
          <section class="cv-doc-section">
            <h3 class="cv-doc-heading">SOFT SKILLS</h3>
            <div class="cv-soft-chips">
              <div>• Résolution de problèmes</div>
              <div>• Esprit d'équipe</div>
              <div>• Adaptabilité</div>
              <div>• Communication</div>
              <div>• Apprentissage continu</div>
              <div>• Gestion du temps</div>
            </div>
          </section>

          <!-- CERTIFICATIONS -->
          <section class="cv-doc-section">
            <h3 class="cv-doc-heading">CERTIFICATIONS</h3>
            <div class="cv-cert-grid">
              <div class="cv-cert-card">
                <b>SQL</b>
                <small>365 Data Science</small>
              </div>
              <div class="cv-cert-card">
                <b>Python Essentials 1</b>
                <small>Cisco Networking Academy</small>
              </div>
              <div class="cv-cert-card">
                <b>Computer Hardware Basics</b>
                <small>Cisco Networking Academy</small>
              </div>
              <div class="cv-cert-card">
                <b>Soft Skills</b>
                <small>efe Maroc</small>
              </div>
            </div>
          </section>

          <!-- LANGUES -->
          <section class="cv-doc-section">
            <h3 class="cv-doc-heading">LANGUES</h3>
            <div class="cv-soft-chips">
              <div><b>Arabe :</b> Langue maternelle</div>
              <div><b>Français :</b> Intermédiaire</div>
              <div><b>Anglais :</b> Professionnel</div>
            </div>
          </section>

        </div>

        <!-- Mode 2: Embedded PDF View -->
        <div id="resume-view-pdf" style="display:none; width:100%; height:100%; min-height:540px; flex:1;">
          <iframe src="assets/ElMoufaddal_Maadi_CV.pdf#toolbar=1&navpanes=0" class="pdf-frame" title="Resume PDF"></iframe>
        </div>

      </div>
    `,
  ],

  explorer: [
    "This PC — File Explorer",
    "📁",
    () => `
      <div style="display:flex; align-items:center; gap:8px; padding:10px 14px; background:rgba(0,0,0,0.25); border-radius:6px; margin-bottom:20px; font-size:12.5px;">
        <span>⌂</span>
        <b>This PC</b>
        <span style="color:#94a3b8;">&gt;</span>
        <span style="color:#94a3b8;">Local Disk (C:)</span>
        <span style="color:#94a3b8;">&gt;</span>
        <span style="color:#94a3b8;">Users</span>
        <span style="color:#94a3b8;">&gt;</span>
        <span style="color:#38bdf8;">ElMoufaddal</span>
      </div>
      <h3 style="font-size:16px; margin-bottom:12px;">${t("Portfolio Applications & Documents", "Dossiers & Documents")}</h3>
      <div class="start-pinned-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 24px;">
        <button onclick="openApp('about')" class="start-app-btn">
          <div class="start-icon-wrap icon-about"><img src="assets/pic1.jpeg" alt="About"></div>
          <span>About Me</span>
        </button>
        <button onclick="openApp('projects')" class="start-app-btn">
          <div class="start-icon-wrap icon-projects">&lt;/&gt;</div>
          <span>Projects</span>
        </button>
        <button onclick="openApp('skills')" class="start-app-btn">
          <div class="start-icon-wrap icon-skills">⚙</div>
          <span>Skills</span>
        </button>
        <button onclick="openApp('experience')" class="start-app-btn">
          <div class="start-icon-wrap icon-experience">♜</div>
          <span>Experience</span>
        </button>
        <button onclick="openApp('education')" class="start-app-btn">
          <div class="start-icon-wrap icon-education">🎓</div>
          <span>Education</span>
        </button>
        <button onclick="openApp('certifications')" class="start-app-btn">
          <div class="start-icon-wrap icon-certifications">★</div>
          <span>Certificates</span>
        </button>
        <button onclick="openApp('contact')" class="start-app-btn">
          <div class="start-icon-wrap icon-contact">✉</div>
          <span>Contact</span>
        </button>
        <button onclick="openApp('resume')" class="start-app-btn">
          <div class="start-icon-wrap icon-resume">PDF</div>
          <span>Resume.pdf</span>
        </button>
      </div>
    `,
  ],

  terminal: [
    "Windows Terminal — PowerShell 7.4",
    "›_",
    () => `
      <div class="term-wrap">
        <div class="term-topbar">
          <div class="term-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <span class="term-title">PowerShell 7.4 · ElMoufaddal@Portfolio</span>
          <div style="width:54px;"></div>
        </div>
        <div class="term-body">
          <div class="term-welcome-line">
            <span class="term-cyan">Windows PowerShell 7.4</span> &nbsp;•&nbsp;
            <span class="term-muted">Portfolio OS v11.0</span> &nbsp;•&nbsp;
            <span class="term-green">● Connected</span>
          </div>
          <div class="term-welcome-line term-muted" style="margin-bottom:14px;">
            Type <span class="term-accent">help</span> for commands, or click a quick chip below.
          </div>

          <!-- Quick-command chips -->
          <div class="term-chips">
            <button class="term-chip" onclick="termRun('whoami')">whoami</button>
            <button class="term-chip" onclick="termRun('skills')">skills</button>
            <button class="term-chip" onclick="termRun('projects')">projects</button>
            <button class="term-chip" onclick="termRun('experience')">experience</button>
            <button class="term-chip" onclick="termRun('education')">education</button>
            <button class="term-chip" onclick="termRun('certs')">certs</button>
            <button class="term-chip" onclick="termRun('contact')">contact</button>
            <button class="term-chip" onclick="termRun('neofetch')">neofetch</button>
            <button class="term-chip term-chip-danger" onclick="termRun('clear')">clear</button>
          </div>

          <div class="term-output" id="term-output"></div>

          <form class="term-form" id="term-form" onsubmit="termSubmit(event)">
            <span class="term-prompt-label">
              <span class="term-cyan">ElMoufaddal</span><span class="term-muted">@</span><span class="term-accent">Portfolio</span><span class="term-muted"> ~</span><span class="term-green"> ❯</span>
            </span>
            <input class="term-input" id="term-input" autocomplete="off" autofocus placeholder="type a command..." aria-label="Terminal input">
          </form>
        </div>
      </div>
    `,
    "terminal",
  ],

  bin: [
    "Recycle Bin",
    "♲",
    () => `
      <div style="text-align:center; padding: 60px 20px; color:#94a3b8;">
        <span style="font-size: 48px; display:block; margin-bottom:12px;">♲</span>
        <h2 style="font-size: 20px; color:#fff; margin-bottom:6px;">${t("Recycle Bin is empty", "La Corbeille est vide")}</h2>
        <p style="font-size: 13px;">${t("No deleted items found.", "Aucun fichier supprimé.")}</p>
      </div>
    `,
  ],
};

/* ------------------------------------------------------------
   Window Management & Real Taskbar State Tracking
   ------------------------------------------------------------ */
function openApp(name) {
  let appData = apps[name];
  if (!appData) return;

  closeAllFlyouts();

  let existingWindow = document.querySelector(`.window[data-name="${name}"]`);
  if (existingWindow) {
    existingWindow.style.zIndex = ++zIndexCounter;
    existingWindow.style.display = "flex";
    updateTaskbarIndicators();
    return;
  }

  const isMobile = window.innerWidth <= 768;
  windowOffset = (windowOffset + 24) % 140;
  let leftPos = isMobile ? 8 : Math.max(20, Math.min(80 + windowOffset, window.innerWidth - 880));
  let topPos = isMobile ? 46 : Math.max(20, Math.min(40 + windowOffset / 2, window.innerHeight - 620));

  let w = document.createElement("section");
  w.className = "window " + (appData[3] || "");
  w.dataset.name = name;
  w.style.cssText = `left:${leftPos}px;top:${topPos}px;z-index:${++zIndexCounter}`;
  w.innerHTML = `
    <div class="bar">
      <b class="symbol">${appData[1]}</b>
      <span>${appData[0]}</span>
      <div>
        <button class="min" title="Minimize">—</button>
        <button class="max" title="Maximize">□</button>
        <button class="x" title="Close">✕</button>
      </div>
    </div>
    <div class="content">${appData[2]()}</div>
  `;

  document.querySelector("#windows").append(w);
  w.onpointerdown = () => {
    w.style.zIndex = ++zIndexCounter;
    updateTaskbarIndicators();
  };

  w.querySelector(".x").onclick = () => {
    w.remove();
    updateTaskbarIndicators();
  };

  w.querySelector(".min").onclick = () => {
    w.style.display = "none";
    updateTaskbarIndicators();
  };

  w.querySelector(".max").onclick = () => {
    w.classList.toggle("max");
    const maxBtn = w.querySelector(".max");
    maxBtn.textContent = w.classList.contains("max") ? "❐" : "□";
  };

  if (name === "terminal") enableTerminal(w);
  enableWindowDrag(w);
  updateTaskbarIndicators();
}

function updateTaskbarIndicators() {
  document.querySelectorAll(".taskbar-item[data-app]").forEach((btn) => {
    const appName = btn.dataset.app;
    const win = document.querySelector(`.window[data-name="${appName}"]`);
    if (win) {
      btn.classList.add("running");
      if (win.style.display !== "none") {
        btn.classList.add("active-window");
      } else {
        btn.classList.remove("active-window");
      }
    } else {
      btn.classList.remove("running", "active-window");
    }
  });
}

function enableWindowDrag(w) {
  let bar = w.querySelector(".bar");
  let startX, startY, origLeft, origTop;

  bar.onpointerdown = (e) => {
    if (e.target.tagName === "BUTTON") return;
    if (w.classList.contains("max")) return;

    startX = e.clientX;
    startY = e.clientY;
    origLeft = w.offsetLeft;
    origTop = w.offsetTop;
    bar.setPointerCapture(e.pointerId);

    bar.onpointermove = (moveEvent) => {
      let nextLeft = Math.max(0, Math.min(window.innerWidth - 100, origLeft + moveEvent.clientX - startX));
      let nextTop = Math.max(0, Math.min(window.innerHeight - 90, origTop + moveEvent.clientY - startY));
      w.style.left = nextLeft + "px";
      w.style.top = nextTop + "px";
    };

    bar.onpointerup = () => {
      bar.onpointermove = null;
    };
  };

  bar.ondblclick = (e) => {
    if (e.target.tagName === "BUTTON") return;
    w.classList.toggle("max");
    const maxBtn = w.querySelector(".max");
    maxBtn.textContent = w.classList.contains("max") ? "❐" : "□";
  };
}

/* ------------------------------------------------------------
   Interactive Terminal — New Redesigned Engine
   ------------------------------------------------------------ */
const termReply = (cmd) => {
  const map = {
    help: `<span class="term-green">Available commands:</span> <span class="term-accent">whoami</span> · <span class="term-accent">skills</span> · <span class="term-accent">projects</span> · <span class="term-accent">experience</span> · <span class="term-accent">education</span> · <span class="term-accent">certs</span> · <span class="term-accent">contact</span> · <span class="term-accent">neofetch</span> · <span class="term-accent">rust</span> · <span class="term-accent">date</span> · <span class="term-danger">clear</span>`,
    whoami: `<span class="term-cyan">El Moufaddal Maadi</span> — Full-Stack Developer & Automation Analyst<br><span class="term-muted">📍 Tangier, Boukhalef, Morocco · Open to full-time & remote opportunities</span>`,
    skills: `<span class="term-green">Languages:</span> PHP, JavaScript (ES6+), Python, SQL, Java<br>
<span class="term-green">Frontend:</span> React.js, HTML5, CSS3, Bootstrap, WordPress, Elementor<br>
<span class="term-green">Backend:</span> Laravel, Node.js, Express.js, Spring Boot, FastAPI, REST API, MVC<br>
<span class="term-green">Databases:</span> MySQL, MongoDB, Oracle · SQLAlchemy ORM<br>
<span class="term-green">DevOps:</span> Git, GitHub, Docker, Postman<br>
<span class="term-green">ML / AI:</span> Scikit-learn, SHAP, Random Forest`,
    projects: `<span class="term-cyan">1.</span> <b>MedPredict AI</b> — FastAPI · React · Scikit-learn · SHAP · MySQL <span class="term-green">[ON RESUME]</span><br>
<span class="term-cyan">2.</span> <b>THE GUIDE</b> — React · Laravel · MySQL · Interactive Maps <span class="term-green">[ON RESUME]</span><br>
<span class="term-cyan">3.</span> <b>NetPulse</b> — Python · Node.js · Docker · WebSockets <span class="term-accent">[IN PROGRESS]</span><br>
<span class="term-cyan">4.</span> <b>OmniStore</b> — Java Spring Boot · React · Redis <span class="term-accent">[IN PROGRESS]</span><br>
<span class="term-cyan">5.</span> <b>DevTask CLI</b> — Python · Bash · Docker <span class="term-accent">[IN PROGRESS]</span>`,
    experience: `<span class="term-green">1.</span> <b>Web Media Networks</b> — Analyste Développeur · 08/2025–08/2026 · Tanger<br>
<span class="term-muted">   → Email infrastructure automation, deliverability analysis, IP management</span><br>
<span class="term-green">2.</span> <b>HD-Maroc</b> — Web Developer Intern · 04/2025–05/2025 · Tanger<br>
<span class="term-muted">   → WordPress + Elementor coaching site, responsive delivery</span>`,
    education: `<span class="term-cyan">1.</span> HIGH-TECH Rabat — <b>Licence Génie Informatique</b> · 2025–2026<br>
<span class="term-cyan">2.</span> OFPPT ISTA NTIC Tanger — <b>Web Full-Stack Technician</b> · 2023–2025<br>
<span class="term-cyan">3.</span> FPL Larache — Sciences Physiques SMP · 2022–2023<br>
<span class="term-cyan">4.</span> Lycée Mansour Dahbi — <b>Baccalauréat Sciences Physiques</b> · 2022`,
    certs: `<span class="term-green">✓</span> <b>SQL</b> — 365 Data Science<br>
<span class="term-green">✓</span> <b>Python Essentials 1</b> — Cisco Networking Academy<br>
<span class="term-green">✓</span> <b>Computer Hardware Basics</b> — Cisco Networking Academy<br>
<span class="term-green">✓</span> <b>Soft Skills</b> — efe Maroc`,
    contact: `<span class="term-cyan">Email:</span> maadimfdal@gmail.com<br>
<span class="term-cyan">Phone:</span> +212 631 361 235<br>
<span class="term-cyan">GitHub:</span> github.com/Mfdalmaadi<br>
<span class="term-cyan">LinkedIn:</span> El Moufaddal Maadi<br>
<span class="term-cyan">WhatsApp:</span> +212 631 361 235`,
    rust: `<span class="term-muted">🚬</span> <i>"Time is a flat circle. Everything we've ever done or will do, we're gonna do over and over and over again forever."</i><br><span class="term-muted">— Rust Cohle, True Detective</span>`,
    neofetch: `<span class="term-cyan">
   ████████████████    OS:</span> <span class="term-green">Windows 11 Portfolio Edition</span>
<span class="term-cyan">  ████████████████    Host:</span> El Moufaddal Maadi
<span class="term-cyan">  ████    ████████    Vibe:</span> Rust Cohle Noir
<span class="term-cyan">  ████    ████████    Location:</span> Tangier, Boukhalef, Morocco
<span class="term-cyan">  ████████████████    Stack:</span> React · Laravel · FastAPI · Python
<span class="term-cyan">  ████████████████    ML:</span> Scikit-learn · SHAP · Random Forest
<span class="term-cyan">                      Exp:</span> Web Media Networks · HD-Maroc
<span class="term-cyan">                      Edu:</span> HIGH-TECH Rabat · OFPPT NTIC Tanger`,
    date: `<span class="term-green">${new Date().toLocaleString()}</span>`,
  };
  return map[cmd] ?? `<span class="term-danger">command not found:</span> <b>${cmd}</b> — type <span class="term-accent">help</span> for available commands.`;
};

function termRun(cmd) {
  const out = document.getElementById("term-output");
  const input = document.getElementById("term-input");
  if (!out) return;
  if (cmd === "clear") { out.innerHTML = ""; if (input) input.value = ""; return; }
  const res = termReply(cmd);
  out.insertAdjacentHTML("beforeend",
    `<div class="term-line"><span class="term-prompt-label"><span class="term-cyan">ElMoufaddal</span><span class="term-muted">@</span><span class="term-accent">Portfolio</span><span class="term-muted"> ~</span><span class="term-green"> ❯</span></span> <span class="term-cmd-echo">${cmd}</span></div><div class="term-result">${res}</div>`
  );
  const content = out.closest(".content");
  if (content) content.scrollTop = 99999;
  if (input) input.value = "";
}

function termSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("term-input");
  if (!input) return;
  const cmd = input.value.trim().toLowerCase();
  if (!cmd) return;
  termRun(cmd);
}

function enableTerminal(w) {
  // termRun / termSubmit are global — just focus the input
  const input = w.querySelector("#term-input");
  if (input) setTimeout(() => input.focus(), 80);
}

/* ------------------------------------------------------------
   Taskbar, Start Menu & Flyouts Interactions
   ------------------------------------------------------------ */
function closeAllFlyouts() {
  const menu = document.getElementById("startmenu");
  const quick = document.getElementById("quick-settings");
  const widgets = document.getElementById("widgets-panel");
  const cal = document.getElementById("calendar-flyout");
  const powerMenu = document.getElementById("power-menu");
  const ctx = document.getElementById("context-menu");

  if (menu) menu.classList.remove("open");
  if (quick) quick.classList.remove("open");
  if (widgets) widgets.classList.remove("open");
  if (cal) cal.classList.remove("open");
  if (powerMenu) powerMenu.classList.remove("open");
  if (ctx) ctx.classList.remove("open");
}

function toggleStartMenu(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById("startmenu");
  if (!menu) return;
  const wasOpen = menu.classList.contains("open");
  closeAllFlyouts();
  if (!wasOpen) menu.classList.add("open");
}

function toggleQuickSettings(e) {
  if (e) e.stopPropagation();
  const quick = document.getElementById("quick-settings");
  if (!quick) return;
  const wasOpen = quick.classList.contains("open");
  closeAllFlyouts();
  if (!wasOpen) quick.classList.add("open");
}

function toggleWidgets(e) {
  if (e) e.stopPropagation();
  const widgets = document.getElementById("widgets-panel");
  if (!widgets) return;
  const wasOpen = widgets.classList.contains("open");
  closeAllFlyouts();
  if (!wasOpen) widgets.classList.add("open");
}

function toggleCalendar(e) {
  if (e) e.stopPropagation();
  const cal = document.getElementById("calendar-flyout");
  if (!cal) return;
  const wasOpen = cal.classList.contains("open");
  closeAllFlyouts();
  if (!wasOpen) cal.classList.add("open");
}

function toggleShowDesktop() {
  const windows = document.querySelectorAll(".window");
  let anyVisible = Array.from(windows).some(w => w.style.display !== "none");
  windows.forEach((w) => {
    w.style.display = anyVisible ? "none" : "flex";
  });
  updateTaskbarIndicators();
}

function closeAllMobileWindows() {
  const windows = document.querySelectorAll(".window");
  windows.forEach(w => w.remove());
  updateTaskbarIndicators();
  showToast(t("Homescreen", "Écran d'accueil"), "🏠");
}

function switchResumeTab(tab) {
  const digi = document.getElementById("resume-view-digital");
  const pdf = document.getElementById("resume-view-pdf");
  const btnDigi = document.getElementById("btn-tab-digital");
  const btnPdf = document.getElementById("btn-tab-pdf");
  if (!digi || !pdf) return;
  if (tab === "digital") {
    digi.style.display = "block";
    pdf.style.display = "none";
    if (btnDigi) btnDigi.classList.add("active");
    if (btnPdf) btnPdf.classList.remove("active");
  } else {
    digi.style.display = "none";
    pdf.style.display = "block";
    if (btnPdf) btnPdf.classList.add("active");
    if (btnDigi) btnDigi.classList.remove("active");
  }
}

function togglePhoneMode() {
  document.body.classList.toggle("phone-mode");
  const isPhone = document.body.classList.contains("phone-mode");
  const btn = document.getElementById("btn-phone-mode");
  if (btn) btn.classList.toggle("active", isPhone);
  showToast(isPhone ? t("Smartphone Mode Activated", "Mode Smartphone Activé") : t("Desktop Mode Activated", "Mode Bureau Activé"), "📱");
}

function toggleCalendarMini() {
  const calFlyout = document.getElementById("calendar-flyout");
  if (calFlyout) calFlyout.classList.toggle("collapsed");
}

function clearNotifications() {
  const list = document.querySelector(".notif-list");
  if (list) {
    list.innerHTML = `<div style="text-align:center; padding: 24px; color:#94a3b8; font-size:12.5px;">${t("No new notifications", "Aucune nouvelle notification")}</div>`;
  }
  const badge = document.querySelector(".notif-count-badge");
  if (badge) badge.style.display = "none";
  showToast(t("Notifications cleared", "Notifications effacées"), "🔔");
}

function togglePowerMenu(e) {
  if (e) e.stopPropagation();
  const pm = document.getElementById("power-menu");
  if (pm) pm.classList.toggle("open");
}

function powerAction(action) {
  closeAllFlyouts();
  if (action === "sleep") {
    showToast(t("Entering sleep mode...", "Mise en veille..."), "💤");
  } else if (action === "restart") {
    const bootEl = document.getElementById("boot");
    if (bootEl) {
      bootEl.classList.remove("hide");
      setTimeout(() => bootEl.classList.add("hide"), 1200);
      showToast(t("Windows restarted successfully", "Système redémarré"), "↻");
    }
  } else if (action === "shutdown") {
    showToast(t("To close this portfolio session, you can close the browser tab.", "Pour quitter, fermez simplement l'onglet."), "⏻");
  }
}

/* ------------------------------------------------------------
   Quick Tiles & Theme Control
   ------------------------------------------------------------ */
function toggleQuickTile(btn) {
  btn.classList.toggle("active");
  const bTag = btn.querySelector("b");
  const name = bTag ? bTag.textContent : "Feature";
  showToast(`${name} ${btn.classList.contains("active") ? t("Enabled", "Activé") : t("Disabled", "Désactivé")}`, "⚙");
}

function toggleDarkMode(btn) {
  document.body.classList.toggle("theme-light");
  const isDark = !document.body.classList.contains("theme-light");
  const statusEl = document.getElementById("theme-status");
  if (statusEl) statusEl.textContent = isDark ? "Enabled" : "Disabled";
  if (btn) btn.classList.toggle("active", isDark);
  showToast(isDark ? "Dark theme enabled" : "Light theme enabled", "🌙");
}

function adjustBrightness(val) {
  const vignette = document.querySelector(".rust-vignette");
  if (vignette) {
    const darkness = 1 - (val / 100);
    vignette.style.background = `radial-gradient(circle at 50% 40%, rgba(4,6,10,${darkness * 0.6}) 0%, rgba(4,6,10,${0.65 + darkness * 0.3}) 55%, rgba(2,3,6,0.98) 100%)`;
  }
}

function adjustVolume(val) {
  showToast(`${t("Volume", "Volume")}: ${val}%`, "🔊");
}

function refreshDesktop() {
  const icons = document.getElementById("app-icons-grid");
  if (icons) {
    icons.style.opacity = "0.4";
    icons.style.transform = "scale(0.98)";
    setTimeout(() => {
      icons.style.opacity = "1";
      icons.style.transform = "scale(1)";
    }, 180);
    showToast(t("Desktop refreshed", "Bureau actualisé"), "↻");
  }
}

function changeIconSize(size) {
  const btns = document.querySelectorAll(".desktop-icon-btn");
  btns.forEach(b => {
    if (size === "large") {
      b.style.width = "94px";
      b.style.height = "94px";
    } else {
      b.style.width = "82px";
      b.style.height = "82px";
    }
  });
  showToast(`${size} icons`, "▦");
}

/* Desktop Right Click Context Menu */
const desktopSurface = document.getElementById("desktop-surface");
const ctxMenu = document.getElementById("context-menu");

if (desktopSurface && ctxMenu) {
  desktopSurface.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".window") || e.target.closest(".win11-taskbar") || e.target.closest(".win11-start-menu")) {
      return;
    }
    e.preventDefault();
    closeAllFlyouts();
    ctxMenu.style.left = Math.min(e.clientX, window.innerWidth - 220) + "px";
    ctxMenu.style.top = Math.min(e.clientY, window.innerHeight - 250) + "px";
    ctxMenu.classList.add("open");
  });
}

document.addEventListener("click", (e) => {
  if (!e.target.closest("#startmenu") && !e.target.closest("#start") && !e.target.closest("#taskbar-search")) {
    const menu = document.getElementById("startmenu");
    if (menu) menu.classList.remove("open");
  }
  if (!e.target.closest("#quick-settings") && !e.target.closest("#btn-quick-settings")) {
    const q = document.getElementById("quick-settings");
    if (q) q.classList.remove("open");
  }
  if (!e.target.closest("#widgets-panel") && !e.target.closest("#btn-widgets")) {
    const w = document.getElementById("widgets-panel");
    if (w) w.classList.remove("open");
  }
  if (!e.target.closest("#calendar-flyout") && !e.target.closest("#btn-clock") && !e.target.closest("#btn-bell")) {
    const c = document.getElementById("calendar-flyout");
    if (c) c.classList.remove("open");
  }
  if (!e.target.closest("#context-menu")) {
    if (ctxMenu) ctxMenu.classList.remove("open");
  }
});

/* ------------------------------------------------------------
   Desktop Marquee Selection Box
   ------------------------------------------------------------ */
const selectionBox = document.getElementById("selection-box");
let isDraggingMarquee = false;
let marqueeStartX = 0, marqueeStartY = 0;

if (desktopSurface && selectionBox) {
  desktopSurface.addEventListener("mousedown", (e) => {
    if (e.target !== desktopSurface && !e.target.classList.contains("rust-wallpaper")) return;
    isDraggingMarquee = true;
    marqueeStartX = e.clientX;
    marqueeStartY = e.clientY;
    selectionBox.style.left = marqueeStartX + "px";
    selectionBox.style.top = marqueeStartY + "px";
    selectionBox.style.width = "0px";
    selectionBox.style.height = "0px";
    selectionBox.style.display = "block";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDraggingMarquee) return;
    let curX = e.clientX;
    let curY = e.clientY;
    let w = Math.abs(curX - marqueeStartX);
    let h = Math.abs(curY - marqueeStartY);
    selectionBox.style.left = Math.min(curX, marqueeStartX) + "px";
    selectionBox.style.top = Math.min(curY, marqueeStartY) + "px";
    selectionBox.style.width = w + "px";
    selectionBox.style.height = h + "px";
  });

  window.addEventListener("mouseup", () => {
    if (isDraggingMarquee) {
      isDraggingMarquee = false;
      selectionBox.style.display = "none";
    }
  });
}

/* ------------------------------------------------------------
   Language Switching (EN / FR)
   ------------------------------------------------------------ */
function toggleLanguage() {
  fr = !fr;
  const langBtn = document.getElementById("lang");
  const trayLang = document.getElementById("tray-lang");
  const subtitle = document.getElementById("subtitle");
  const heroAbout = document.getElementById("hero-about-text");
  const heroProjects = document.getElementById("hero-projects-text");
  const heroCv = document.getElementById("hero-cv-text");

  if (langBtn) langBtn.textContent = fr ? "EN" : "FR";
  if (trayLang) trayLang.textContent = fr ? "FRA" : "ENG";

  if (subtitle) {
    subtitle.textContent = fr
      ? "DÉVELOPPEUR FULL-STACK • AUTOMATISATION & INFRASTRUCTURE • INGÉNIERIE LOGICIELLE"
      : "FULL-STACK DEVELOPER • AUTOMATION & INFRASTRUCTURE • SOFTWARE ENGINEER";
  }

  if (heroAbout) heroAbout.textContent = fr ? "À Propos" : "About Me";
  if (heroProjects) heroProjects.textContent = fr ? "Voir Projets" : "Explore Projects";
  if (heroCv) heroCv.textContent = fr ? "CV (PDF)" : "Resume (PDF)";

  document.querySelectorAll(".window").forEach((win) => {
    const appName = win.dataset.name;
    const isMax = win.classList.contains("max");
    const l = win.style.left;
    const t = win.style.top;
    win.remove();
    if (appName) {
      openApp(appName);
      const reOpened = document.querySelector(`.window[data-name="${appName}"]`);
      if (reOpened) {
        if (isMax) reOpened.classList.add("max");
        reOpened.style.left = l;
        reOpened.style.top = t;
      }
    }
  });

  showToast(fr ? "Langue : Français" : "Language: English", "🌐");
}

/* ------------------------------------------------------------
   Live Clock & Monthly Calendar Synchronization
   ------------------------------------------------------------ */
function updateClock() {
  const d = new Date();
  const timeStr = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateShortStr = d.toLocaleDateString("en-GB");
  const dateLongStr = d.toLocaleDateString(fr ? "fr-FR" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const clockTimeEl = document.getElementById("clock-time");
  const clockDateEl = document.getElementById("clock-date");
  if (clockTimeEl) clockTimeEl.textContent = timeStr;
  if (clockDateEl) clockDateEl.textContent = dateShortStr;

  const phoneTime = document.getElementById("phone-status-time");
  const phoneDigi = document.getElementById("phone-digital-time");
  const phoneDate = document.getElementById("phone-date-sub");
  if (phoneTime) phoneTime.textContent = timeStr;
  if (phoneDigi) phoneDigi.textContent = timeStr;
  if (phoneDate) phoneDate.textContent = dateLongStr;

  const calTitle = document.getElementById("cal-date-title");
  if (calTitle) calTitle.textContent = dateLongStr;
}

function renderCalendar() {
  const grid = document.getElementById("cal-grid");
  if (!grid) return;
  const d = new Date();
  const curDay = d.getDate();
  const daysHeader = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  let html = daysHeader.map(dh => `<div class="cal-head">${dh}</div>`).join("");
  for (let i = 1; i <= 30; i++) {
    const isToday = i === curDay ? "today" : "";
    html += `<div class="cal-day ${isToday}">${i}</div>`;
  }
  grid.innerHTML = html;
}

/* ------------------------------------------------------------
   Event Binding & Boot Initialization
   ------------------------------------------------------------ */
document.querySelectorAll("[data-app]").forEach((el) => {
  el.addEventListener("click", () => {
    openApp(el.dataset.app);
  });
});

const startBtn = document.getElementById("start");
if (startBtn) startBtn.addEventListener("click", toggleStartMenu);

const langBtn = document.getElementById("lang");
if (langBtn) langBtn.addEventListener("click", toggleLanguage);

updateClock();
setInterval(updateClock, 1000);
renderCalendar();

// Hide Boot Screen after 800ms
const bootScreen = document.getElementById("boot");
if (bootScreen) {
  setTimeout(() => {
    bootScreen.classList.add("hide");
  }, 800);
}

// Clean desktop on boot per user request: "the about me window dont make a popup at first"
setTimeout(() => {
  showToast(
    t(
      "Welcome to El Moufaddal Maadi's Windows 11 Portfolio. Click Start or any icon to explore.",
      "Bienvenue sur le portfolio Windows 11 d'El Moufaddal Maadi. Cliquez sur une icône pour explorer."
    ),
    "👋",
    "El Moufaddal Maadi"
  );
}, 1200);
