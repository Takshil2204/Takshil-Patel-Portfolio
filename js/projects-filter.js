/**
 * Takshil Patel — Personal Portfolio
 * Projects Filter & Interactive Modal System
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Projects Data for Deep-Dive Modal
  const projectDatabase = {
    'portfolio-core': {
      title: 'Takshil Patel — Interactive 3D Portfolio',
      category: 'Web Development & Creative Engineering',
      problem: 'Conventional developer portfolios frequently depend on oversized runtime frameworks (React, Next.js, 3MB+ bundle downloads) leading to sluggish first-paint times and device battery drain.',
      solution: 'Engineered a multi-page, dark futuristic portfolio using 100% native HTML5, modern CSS3, and vanilla JavaScript with hardware-accelerated 3D vector canvas rendering and zero external dependencies.',
      features: [
        'Real-time 3D projected Quantum Cyber Core canvas with icosahedral wireframe and mouse spring physics',
        'Jitter-free 3D card perspective tilt with dynamic specular sheen and boundary-locked coordinates',
        'Staggered 3D scroll reveals with optical blur-to-focus and word-by-word/character typography cascade',
        'Interactive project deep-dive modal viewer, live category filter, and client-validated contact system',
        'Full WCAG accessibility compliance with prefers-reduced-motion guards and 100% automated test verification'
      ],
      techStack: ['Vanilla JavaScript (ES6+)', 'HTML5 Semantic Architecture', 'CSS3 3D Transforms', 'HTML5 3D Canvas Projection'],
      repoUrl: 'https://github.com/Takshil2204/Takshil-Patel-Portfolio',
      demoUrl: 'https://takshil2204.github.io/Takshil-Patel-Portfolio/',
      isPlaceholder: false
    },
    'doc-vault': {
      title: 'Secure Document Vault & Portal',
      category: 'Web Development & Security',
      problem: 'Traditional cloud storage solutions often store decryption keys server-side, exposing sensitive personal and enterprise documents to insider threats and cloud provider vulnerabilities.',
      solution: 'Designed and prototyped a zero-knowledge document encryption portal where cryptographic key derivation (PBKDF2/AES-GCM) takes place entirely on the client before uploading to storage.',
      features: [
        'Client-side AES-256-GCM encryption & decryption in the browser using Web Crypto API',
        'Secure Argon2 / PBKDF2 password-derived key generation',
        'Session security with cryptographically randomized tokens & auto-expiring links',
        'Responsive dark UI with zero telemetry or data leak vulnerabilities'
      ],
      techStack: ['HTML5', 'CSS3 / Custom Grid', 'Vanilla JavaScript', 'Web Crypto API', 'Local Storage Encrypted Vault'],
      repoUrl: 'https://github.com/Takshil2204/secure-document-vault',
      demoUrl: '#demo',
      isPlaceholder: true
    },
    'packet-analyzer': {
      title: 'Network Packet Analyzer & Visualizer',
      category: 'Computer Networking & Cybersecurity',
      problem: 'Understanding low-level packet flows across TCP, UDP, and ICMP protocols is notoriously difficult without intuitive, real-time packet inspection and header disassembly tools.',
      solution: 'Constructed a lightweight network packet sniffer that captures raw sockets, dissects Ethernet, IP, TCP/UDP headers, and presents real-time packet statistics and anomaly flags.',
      features: [
        'Raw socket packet capture and header decoding (MAC addresses, IP checksums, TCP flags)',
        'Protocol distribution breakdown (HTTP, DNS, TCP, UDP, ICMP)',
        'Heuristic detection of SYN flood patterns and port scanning signatures',
        'CLI output with structured color-coded packet summaries and exportable JSON log streams'
      ],
      techStack: ['Python', 'Raw Sockets', 'TCP/IP Protocol Stack', 'Wireshark Export Formats', 'Bash CLI'],
      repoUrl: 'https://github.com/Takshil2204/network-packet-analyzer',
      demoUrl: '#demo',
      isPlaceholder: true
    },
    'port-sentinel': {
      title: 'Port Sentinel — Security Audit Tool',
      category: 'Cybersecurity & Developer Tools',
      problem: 'Developers often deploy local test servers with open ports that expose internal services and administrative endpoints to unauthorized network reconnaissance.',
      solution: 'Engineered a concurrent port scanner and service banner grabber that rapidly checks target ranges, identifies exposed common ports, and checks service versions against known risk baselines.',
      features: [
        'Multi-threaded TCP connect scan engine capable of surveying 1,000 ports in under 3 seconds',
        'Banner grabbing to identify running service names and version strings',
        'Risk ranking output classifying high-privilege open ports (SSH, Telnet, SMB, Redis)',
        'Formatted terminal report with remediation advice for hardening firewall rules'
      ],
      techStack: ['Python / C++', 'Concurrent Threading', 'Network Sockets', 'Service Fingerprinting'],
      repoUrl: 'https://github.com/Takshil2204/port-sentinel',
      demoUrl: '#demo',
      isPlaceholder: true
    },
    'algo-visualizer': {
      title: 'Algorithmic Pathfinding Visualizer',
      category: 'Web Development & Problem Solving',
      problem: 'Visualizing how graph traversal algorithms prioritize nodes and handle weighted heuristics is essential for deep conceptual understanding of algorithmic time and space complexity.',
      solution: 'Created an interactive browser grid where users can draw walls, place start/target nodes, and watch Dijkstra, A*, BFS, and DFS execute step-by-step with real-time computational metrics.',
      features: [
        "Interactive comparison between Dijkstra's Algorithm (guaranteed shortest path) and A* Search (Manhattan/Euclidean heuristic)",
        'Dynamic wall drawing, obstacle weighting, and maze generation',
        'Real-time counters for nodes visited, path length, and execution time in milliseconds',
        'Smooth CSS grid cell animations and responsive controls'
      ],
      techStack: ['HTML5 Canvas', 'Vanilla JavaScript (ES6+)', 'Graph Theory Data Structures', 'CSS3 Animations'],
      repoUrl: 'https://github.com/Takshil2204/algorithmic-pathfinding-visualizer',
      demoUrl: '#demo',
      isPlaceholder: true
    },
    'rate-limiter': {
      title: 'API Rate-Limiting & Proxy Middleware',
      category: 'Developer Tools & Networking',
      problem: 'Microservices and web APIs are susceptible to Denial-of-Service (DoS) and scraping surges without resilient request rate throttling and IP token tracking.',
      solution: 'Implemented a lightweight reverse proxy middleware implementing the Token Bucket and Sliding Window Log rate-limiting algorithms to protect backends from traffic spikes.',
      features: [
        'Token bucket algorithm implementation with configurable burst allowance and refill rates',
        'HTTP standard headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`)',
        'In-memory IP hash map with automatic memory garbage collection of stale keys',
        'Comprehensive benchmark test suite measuring throughput and latency under high concurrency'
      ],
      techStack: ['Node.js / Vanilla JS', 'HTTP / TCP Protocol', 'Data Structures (Sliding Window)', 'Benchmarking Suite'],
      repoUrl: 'https://github.com/Takshil2204/api-rate-limiter-proxy',
      demoUrl: '#demo',
      isPlaceholder: true
    },
    'cipher-lab': {
      title: 'Cryptographic Cipher Lab',
      category: 'Cybersecurity & Problem Solving',
      problem: 'Modern security professionals need hands-on intuition for how mathematical transformations, entropy, and key spaces defend against cryptanalysis and frequency analysis attacks.',
      solution: 'Developed an educational cryptographic tool that demonstrates both classical ciphers (Caesar, Vigenère) and modern symmetric structures (Feistel network, AES substitution/permutation).',
      features: [
        'Interactive encryption/decryption walkthrough with visual intermediate state matrices',
        'Frequency analysis analyzer graphing letter distribution against standard English corpora',
        'Entropy calculation visualizing ciphertext randomness and diffusion',
        'Clean educational UI designed for computer science students and security learners'
      ],
      techStack: ['JavaScript (ES6)', 'HTML5 / CSS3', 'Information Theory / Entropy Math', 'SVG Data Charts'],
      repoUrl: 'https://github.com/Takshil2204/crypto-cipher-lab',
      demoUrl: '#demo',
      isPlaceholder: true
    }
  };

  // 2. Project Category Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = '';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 3. Project Modal Dialog System
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  let lastActiveElement = null;

  function openProjectModal(projectId) {
    if (!modalOverlay || !modalTitle || !modalBody) return;
    const data = projectDatabase[projectId];
    if (!data) return;

    lastActiveElement = document.activeElement;

    modalTitle.textContent = data.title;
    modalBody.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span style="display: inline-block; font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-cyan); background: rgba(0,240,255,0.1); padding: 0.25rem 0.65rem; border-radius: 999px; border: 1px solid rgba(0,240,255,0.3); margin-bottom: 0.85rem;">
          ${data.category}
        </span>
        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Problem Overview</h4>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem; font-size: 0.95rem;">${data.problem}</p>
        
        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Technical Implementation</h4>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem; font-size: 0.95rem;">${data.solution}</p>
        
        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Key Architecture Features</h4>
        <ul style="list-style: none; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
          ${data.features.map(f => `<li style="position: relative; padding-left: 1.25rem; color: var(--text-secondary); font-size: 0.92rem;"><span style="position: absolute; left: 0; color: var(--accent-cyan);">▹</span>${f}</li>`).join('')}
        </ul>

        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Technologies Utilized</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.75rem;">
          ${data.techStack.map(t => `<span style="font-family: var(--font-mono); font-size: 0.78rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.6rem; border-radius: 4px; border: 1px solid var(--border-subtle); color: #e2e8f0;">${t}</span>`).join('')}
        </div>

        <div style="background: rgba(56, 189, 248, 0.08); border-left: 3px solid #38bdf8; padding: 0.85rem 1rem; border-radius: 0 6px 6px 0; margin-bottom: 1.5rem; font-size: 0.85rem; color: #bae6fd;">
          <strong>Customization Note for Takshil:</strong> This project card is configured as an editable technical template. When you upload your personal project repository, simply update the repository URL and live demo link in <code>index.html</code> and <code>js/projects-filter.js</code>.
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.5rem;">
            <span>View Source on GitHub</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  }

  function closeProjectModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  // Trigger modal when clicking inspect button
  document.querySelectorAll('.open-modal-trigger').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeProjectModal();
      }
    });
  }
});
