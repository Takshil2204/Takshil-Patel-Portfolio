/**
 * Takshil Patel — Personal Portfolio
 * Premium Interactive 3D Animations & Creative Engineering
 * 
 * Includes:
 * 1. Cinematic 3D Cyber Core Hologram (Hero Canvas with 3D projection & spring physics)
 * 2. Interactive 3D Perspective Card Tilt with Specular Glare & Jitter-Free Physics
 * 3. Scroll-Driven 3D Staggered Section & Card Reveals
 * 4. Word-by-Word 3D Hero Heading Reveal with Optical Blur-to-Focus
 * 5. Accessible Character-by-Character Section Title Reveals
 * 6. Modern Hero Subtitle Typewriter Cycling Effect
 * 7. Magnetic Cursor Tracking on Primary CTA Buttons
 * 8. Smooth High-Tech Multi-Page Transitions (BFCache Safe)
 * 9. Full Reduced-Motion & Battery-Friendly Low-Power Optimization
 */

(function () {
  'use strict';

  // 1. Accessibility & Performance Guard
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  // ==========================================================================
  // MODULE 1: Cinematic 3D Hero Hologram / Cyber Core
  // ==========================================================================
  function initHero3D() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width, height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 340;
      height = rect.height || 200;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // 3D Geometry: Icosahedron Vertices
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const rawVertices = [
      [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
      [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
      [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
    ];

    // Normalized vertices scaled to fit the 200px viewport
    const baseRadius = 60;
    const icosahedronVertices = rawVertices.map(v => {
      const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      return [v[0] / len * baseRadius, v[1] / len * baseRadius, v[2] / len * baseRadius];
    });

    // Inner Core Vertices (Octahedron)
    const coreRadius = 26;
    const coreVertices = [
      [coreRadius, 0, 0], [-coreRadius, 0, 0],
      [0, coreRadius, 0], [0, -coreRadius, 0],
      [0, 0, coreRadius], [0, 0, -coreRadius]
    ];

    const coreEdges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2]
    ];

    // Icosahedron Edges
    const icosahedronEdges = [];
    const edgeDist = 2 / Math.sqrt(1 + phi * phi) * baseRadius + 2;
    for (let i = 0; i < icosahedronVertices.length; i++) {
      for (let j = i + 1; j < icosahedronVertices.length; j++) {
        const dx = icosahedronVertices[i][0] - icosahedronVertices[j][0];
        const dy = icosahedronVertices[i][1] - icosahedronVertices[j][1];
        const dz = icosahedronVertices[i][2] - icosahedronVertices[j][2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (Math.abs(d - edgeDist) < 12) {
          icosahedronEdges.push([i, j]);
        }
      }
    }

    // Floating Data Node Particles in Orbit
    const orbitalParticles = [];
    const particleCount = 24;
    for (let i = 0; i < particleCount; i++) {
      const rad = baseRadius * 1.35 + Math.random() * 32;
      const theta = Math.random() * Math.PI * 2;
      const phiAngle = (Math.random() - 0.5) * Math.PI;
      orbitalParticles.push({
        size: Math.random() * 1.8 + 0.8,
        speed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        orbitRadius: rad,
        theta: theta,
        phiAngle: phiAngle,
        color: Math.random() > 0.4 ? '#00f0ff' : '#a855f7'
      });
    }

    // Gimbal Ring Points
    function generateRingPoints(radius, count, normalAxis) {
      const points = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        if (normalAxis === 'y') {
          points.push([radius * Math.cos(angle), 0, radius * Math.sin(angle)]);
        } else if (normalAxis === 'x') {
          points.push([0, radius * Math.cos(angle), radius * Math.sin(angle)]);
        } else {
          points.push([radius * Math.cos(angle), radius * Math.sin(angle), 0]);
        }
      }
      return points;
    }
    const outerRing = generateRingPoints(baseRadius * 1.3, 32, 'y');
    const tiltRing = generateRingPoints(baseRadius * 1.15, 32, 'x');

    // Rotation & Physics State
    let rotX = 0.2;
    let rotY = 0.4;
    let rotZ = 0.1;
    let targetRotX = 0.2;
    let targetRotY = 0.4;
    let pulseScale = 1;
    let targetPulseScale = 1;

    // Mouse Tracking with Spring Inertia
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = (e.clientX - cx) / (window.innerWidth / 2);
      mouseY = (e.clientY - cy) / (window.innerHeight / 2);
      targetRotY = mouseX * 1.15;
      targetRotX = -mouseY * 0.85;
    }, { passive: true });

    canvas.addEventListener('click', () => {
      targetPulseScale = 1.25;
      setTimeout(() => { targetPulseScale = 1; }, 200);
    });

    // 3D Projection Math
    const fov = 280;
    function project(x, y, z) {
      const scale = fov / (fov + z + 150);
      return {
        x: x * scale + width / 2,
        y: y * scale + height / 2,
        scale: scale,
        z: z
      };
    }

    function rotate3D(v, rx, ry, rz) {
      // Rotate X
      const y1 = v[1] * Math.cos(rx) - v[2] * Math.sin(rx);
      const z1 = v[1] * Math.sin(rx) + v[2] * Math.cos(rx);
      const x1 = v[0];

      // Rotate Y
      const x2 = x1 * Math.cos(ry) + z1 * Math.sin(ry);
      const z2 = -x1 * Math.sin(ry) + z1 * Math.cos(ry);
      const y2 = y1;

      // Rotate Z
      const x3 = x2 * Math.cos(rz) - y2 * Math.sin(rz);
      const y3 = x2 * Math.sin(rz) + y2 * Math.cos(rz);
      const z3 = z2;

      return [x3, y3, z3];
    }

    // Render Loop
    let animId;
    let clock = 0;

    function render() {
      clock += 0.016;

      // Smooth Spring Interpolation
      rotX += (targetRotX + Math.sin(clock * 0.7) * 0.12 - rotX) * 0.06;
      rotY += (targetRotY + clock * 0.3 - rotY) * 0.06;
      rotZ += (Math.cos(clock * 0.5) * 0.08 - rotZ) * 0.05;
      pulseScale += (targetPulseScale - pulseScale) * 0.12;

      ctx.clearRect(0, 0, width, height);

      // Radial Ambient Hologram Glow in Background
      const centerGrad = ctx.createRadialGradient(width / 2, height / 2, 8, width / 2, height / 2, 105);
      centerGrad.addColorStop(0, 'rgba(0, 240, 255, 0.14)');
      centerGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.06)');
      centerGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = centerGrad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 105, 0, Math.PI * 2);
      ctx.fill();

      // Project & Draw Outer Rings
      ctx.lineWidth = 1.1;
      [
        { points: outerRing, color: 'rgba(0, 240, 255, 0.32)', rotOffset: clock * 0.4 },
        { points: tiltRing, color: 'rgba(168, 85, 247, 0.32)', rotOffset: -clock * 0.5 }
      ].forEach(ring => {
        ctx.beginPath();
        ring.points.forEach((pt, idx) => {
          const rot = rotate3D(pt, rotX + ring.rotOffset * 0.2, rotY + ring.rotOffset, rotZ);
          const p = project(rot[0] * pulseScale, rot[1] * pulseScale, rot[2] * pulseScale);
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.strokeStyle = ring.color;
        ctx.stroke();
      });

      // Project & Draw Icosahedron Outer Wireframe
      const projIco = icosahedronVertices.map(v => {
        const scaled = [v[0] * pulseScale, v[1] * pulseScale, v[2] * pulseScale];
        const rot = rotate3D(scaled, rotX, rotY, rotZ);
        return project(rot[0], rot[1], rot[2]);
      });

      // Draw Outer Edges with depth lighting
      icosahedronEdges.forEach(([i, j]) => {
        const p1 = projIco[i];
        const p2 = projIco[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.12, Math.min(0.85, (avgZ + baseRadius) / (baseRadius * 2) * 0.75 + 0.15));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha.toFixed(2)})`;
        ctx.lineWidth = 1.05;
        ctx.stroke();
      });

      // Draw Outer Glowing Vertices
      projIco.forEach(p => {
        const nodeAlpha = Math.max(0.2, Math.min(1, (p.z + baseRadius) / (baseRadius * 2) * 0.8 + 0.2));
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.4, 2.2 * p.scale), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${nodeAlpha.toFixed(2)})`;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Project & Draw Inner Crystal Core (Counter-rotating)
      const corePulse = (Math.sin(clock * 3) * 0.12 + 1) * pulseScale;
      const projCore = coreVertices.map(v => {
        const scaled = [v[0] * corePulse, v[1] * corePulse, v[2] * corePulse];
        const rot = rotate3D(scaled, -rotX * 1.5, -rotY * 1.8, rotZ * 1.2);
        return project(rot[0], rot[1], rot[2]);
      });

      coreEdges.forEach(([i, j]) => {
        const p1 = projCore[i];
        const p2 = projCore[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.72)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      projCore.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#a855f7';
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Project Orbital Particles
      orbitalParticles.forEach(part => {
        part.theta += part.speed;
        const x = part.orbitRadius * Math.cos(part.theta) * Math.cos(part.phiAngle);
        const y = part.orbitRadius * Math.sin(part.phiAngle);
        const z = part.orbitRadius * Math.sin(part.theta) * Math.cos(part.phiAngle);

        const rot = rotate3D([x, y, z], rotX * 0.8, rotY * 0.9, rotZ);
        const p = project(rot[0] * pulseScale, rot[1] * pulseScale, rot[2] * pulseScale);

        ctx.beginPath();
        ctx.arc(p.x, p.y, part.size * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = part.color;
        ctx.shadowColor = part.color;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    }

    render();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(animId);
      else animId = requestAnimationFrame(render);
    });
  }

  // ==========================================================================
  // MODULE 2: Interactive 3D Perspective Card Tilt & Specular Glare (Jitter-Free)
  // ==========================================================================
  function init3DCardTilt() {
    // Touch devices and reduced motion bypass tilt for smooth native gestures
    if (prefersReducedMotion || isTouchDevice) return;

    const tiltCards = document.querySelectorAll(
      '.project-card, .terminal-card, .pillar-card, .unstop-spotlight-card, .skill-category-card, .achievement-card, .contact-channel-item, .section-nav-card'
    );

    tiltCards.forEach(card => {
      // Create glare overlay if not present
      let glare = card.querySelector('.card-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }

      let bounds = null;
      let isHovered = false;
      let rafId = null;
      let targetRotX = 0;
      let targetRotY = 0;
      let currentRotX = 0;
      let currentRotY = 0;
      let glareX = 50;
      let glareY = 50;

      function renderTilt() {
        // Fast spring lerp
        currentRotX += (targetRotX - currentRotX) * 0.18;
        currentRotY += (targetRotY - currentRotY) * 0.18;

        card.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateY(-4px) scale3d(1.012, 1.012, 1.012)`;
        glare.style.background = `radial-gradient(circle 260px at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(0, 240, 255, 0.18), rgba(168, 85, 247, 0.08) 40%, transparent 80%)`;
        glare.style.opacity = '0.85';

        // Keep loop running while mouse is moving or returning to target
        if (isHovered && (Math.abs(targetRotX - currentRotX) > 0.04 || Math.abs(targetRotY - currentRotY) > 0.04)) {
          rafId = requestAnimationFrame(renderTilt);
        } else {
          rafId = null;
        }
      }

      function handleMouseEnter() {
        // Cache bounds once on enter to prevent oscillation loop
        bounds = card.getBoundingClientRect();
        isHovered = true;
        // Temporarily disable CSS transitions during active mouse tracking
        card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
        glare.style.transition = 'opacity 0.25s ease';
      }

      function handleMouseMove(e) {
        if (!bounds) {
          bounds = card.getBoundingClientRect();
        }
        const posX = e.clientX - bounds.left;
        const posY = e.clientY - bounds.top;

        // Normalized [-1, 1] relative to static bounds
        const normX = Math.max(-1, Math.min(1, (posX / bounds.width) * 2 - 1));
        const normY = Math.max(-1, Math.min(1, (posY / bounds.height) * 2 - 1));

        // Subtly clamped maximum tilt angle (6.0 deg)
        const maxTilt = 6.0;
        targetRotX = -normY * maxTilt;
        targetRotY = normX * maxTilt;

        glareX = (posX / bounds.width) * 100;
        glareY = (posY / bounds.height) * 100;

        if (!rafId) {
          rafId = requestAnimationFrame(renderTilt);
        }
      }

      function handleMouseLeave() {
        isHovered = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }

        currentRotX = 0;
        currentRotY = 0;
        targetRotX = 0;
        targetRotY = 0;
        bounds = null;

        // Restore smooth CSS spring curve to glide back to resting state
        card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease';
        card.style.transform = '';
        glare.style.transition = 'opacity 0.35s ease';
        glare.style.opacity = '0';

        setTimeout(() => {
          if (!isHovered) {
            card.style.transition = '';
            glare.style.transition = '';
          }
        }, 450);
      }

      card.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      card.addEventListener('mousemove', handleMouseMove, { passive: true });
      card.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    });
  }

  // ==========================================================================
  // MODULE 3: Scroll-Driven 3D Staggered Entrance Animations (Fast & Crisp)
  // ==========================================================================
  function initScroll3DReveals() {
    const revealTargets = document.querySelectorAll(
      '.section-header, .section-subtitle, .about-paragraph, .project-description, .about-narrative, .pillar-card, .skill-category-card, .project-card, .unstop-spotlight-card, .achievement-card, .contact-channel-item, .contact-form-container, .timeline-item, .section-nav-card'
    );

    if (prefersReducedMotion) {
      revealTargets.forEach(el => el.classList.add('revealed'));
      return;
    }

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    revealTargets.forEach(el => {
      el.classList.add('reveal-3d');
      // If already within the viewport on initial page load, reveal immediately without delay
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight * 0.92 && rect.bottom > 0) {
        el.classList.add('revealed');
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -5% 0px',
      threshold: 0.05
    });

    revealTargets.forEach(el => {
      if (!el.classList.contains('revealed')) {
        observer.observe(el);
      }
    });

    // Safety fallback: reveal all elements after 750ms so no section/card remains stuck invisible
    setTimeout(() => {
      revealTargets.forEach(el => el.classList.add('revealed'));
    }, 750);
  }

  // ==========================================================================
  // MODULE 4: Cinematic 3D Typography Entrance (Word-by-Word Hero Reveal)
  // ==========================================================================
  function initCinematicTypography() {
    if (prefersReducedMotion) return;

    const headline = document.querySelector('.hero-headline');
    if (!headline || headline.dataset.wordSplit) return;
    headline.dataset.wordSplit = 'true';

    const fullText = headline.textContent.trim().replace(/\s+/g, ' ');
    headline.setAttribute('aria-label', fullText);

    const childNodes = Array.from(headline.childNodes);
    const fragment = document.createDocumentFragment();
    let wordIndex = 0;

    childNodes.forEach(node => {
      if (node.nodeType === 3) { // Text node
        const parts = node.textContent.split(/(\s+)/);
        parts.forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(part));
          } else {
            const wrap = document.createElement('span');
            wrap.className = 'word-reveal-wrap';
            const inner = document.createElement('span');
            inner.className = 'word-reveal-inner';
            inner.textContent = part;
            inner.style.transitionDelay = `${(0.08 + wordIndex * 0.08).toFixed(3)}s`;
            wrap.appendChild(inner);
            fragment.appendChild(wrap);
            wordIndex++;
          }
        });
      } else if (node.nodeType === 1 && node.tagName.toLowerCase() === 'br') {
        fragment.appendChild(document.createElement('br'));
      } else if (node.nodeType === 1 && node.classList && node.classList.contains('gradient-text')) {
        const parts = node.textContent.split(/(\s+)/);
        parts.forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(part));
          } else {
            const wrap = document.createElement('span');
            wrap.className = 'word-reveal-wrap';
            const inner = document.createElement('span');
            inner.className = 'word-reveal-inner gradient-text';
            inner.textContent = part;
            inner.style.transitionDelay = `${(0.08 + wordIndex * 0.08).toFixed(3)}s`;
            wrap.appendChild(inner);
            fragment.appendChild(wrap);
            wordIndex++;
          }
        });
      } else {
        fragment.appendChild(node.cloneNode(true));
      }
    });

    headline.textContent = '';
    headline.appendChild(fragment);

    // Stagger reveal on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const inners = headline.querySelectorAll('.word-reveal-inner');
        inners.forEach(el => el.classList.add('revealed'));
      });
    });
  }

  // ==========================================================================
  // MODULE 5: Character-by-Character Heading Reveal (Accessible & Responsive)
  // ==========================================================================
  function initCharTextReveals() {
    if (prefersReducedMotion) return;

    const titles = document.querySelectorAll('.section-title');
    if (!titles.length) return;

    titles.forEach(title => {
      if (title.dataset.charSplit) return;
      title.dataset.charSplit = 'true';

      const rawText = title.textContent.trim();
      if (!rawText) return;

      // Screen reader accessibility: full text announcement
      title.setAttribute('aria-label', rawText);

      const words = rawText.split(/\s+/);
      const container = document.createElement('span');
      container.className = 'char-reveal-container';
      container.setAttribute('aria-hidden', 'true');

      let globalCharIndex = 0;

      words.forEach((word, wIdx) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'char-word';

        for (let i = 0; i < word.length; i++) {
          const char = word[i];
          const wrapSpan = document.createElement('span');
          wrapSpan.className = 'char-wrap';

          const innerSpan = document.createElement('span');
          innerSpan.className = 'char-inner';
          innerSpan.textContent = char;
          innerSpan.style.transitionDelay = `${(globalCharIndex * 0.024).toFixed(3)}s`;

          wrapSpan.appendChild(innerSpan);
          wordSpan.appendChild(wrapSpan);
          globalCharIndex++;
        }

        container.appendChild(wordSpan);

        if (wIdx < words.length - 1) {
          const spaceSpan = document.createElement('span');
          spaceSpan.className = 'char-space';
          spaceSpan.innerHTML = '&nbsp;';
          container.appendChild(spaceSpan);
        }
      });

      title.textContent = '';
      title.appendChild(container);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          const inners = entry.target.querySelectorAll('.char-inner');
          inners.forEach(c => c.classList.add('revealed'));
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -5% 0px',
      threshold: 0.08
    });

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    titles.forEach(title => {
      const rect = title.getBoundingClientRect();
      if (rect.top < windowHeight * 0.92 && rect.bottom > 0) {
        title.classList.add('revealed');
        title.querySelectorAll('.char-inner').forEach(c => c.classList.add('revealed'));
      } else {
        observer.observe(title);
      }
    });
  }

  // ==========================================================================
  // MODULE 6: Modern Typewriter Effect (Hero Subtitle)
  // ==========================================================================
  function initTypewriter() {
    const el = document.getElementById('hero-typewriter');
    if (!el) return;

    if (prefersReducedMotion) {
      el.textContent = 'Software Developer';
      return;
    }

    const phrases = [
      'Software Developer',
      'Cybersecurity Explorer',
      'Network Systems Enthusiast',
      'Algorithmic Problem Solver'
    ];

    let phraseIdx = 0;
    let charIdx = phrases[0].length;
    let isDeleting = true;
    let timeoutId = null;
    let isTabActive = true;

    function step() {
      if (!isTabActive) return;

      const currentPhrase = phrases[phraseIdx];

      if (isDeleting) {
        charIdx--;
        el.textContent = currentPhrase.substring(0, charIdx);

        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          timeoutId = setTimeout(step, 450);
          return;
        }
        timeoutId = setTimeout(step, 38);
      } else {
        charIdx++;
        el.textContent = currentPhrase.substring(0, charIdx);

        if (charIdx === currentPhrase.length) {
          isDeleting = true;
          timeoutId = setTimeout(step, 2300);
          return;
        }
        timeoutId = setTimeout(step, 75);
      }
    }

    // Initial pause before deleting first phrase
    timeoutId = setTimeout(step, 2200);

    // Pause when tab is inactive to conserve battery and avoid out-of-sync typing
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isTabActive = false;
        if (timeoutId) clearTimeout(timeoutId);
      } else {
        isTabActive = true;
        step();
      }
    });
  }

  // ==========================================================================
  // MODULE 7: Magnetic Cursor Tracking on Primary CTA Buttons
  // ==========================================================================
  function initMagneticButtons() {
    if (prefersReducedMotion || isTouchDevice) return;

    const buttons = document.querySelectorAll('.hero-cta-group .btn');
    if (!buttons.length) return;

    buttons.forEach(btn => {
      let rafId = null;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let isHovered = false;

      function updateMotion() {
        if (!isHovered) return;
        currentX += (targetX - currentX) * 0.22;
        currentY += (targetY - currentY) * 0.22;

        btn.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

        if (isHovered) {
          rafId = requestAnimationFrame(updateMotion);
        }
      }

      btn.addEventListener('mouseenter', () => {
        isHovered = true;
        btn.style.transition = 'none';
        rafId = requestAnimationFrame(updateMotion);
      });

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        targetX = Math.max(-8, Math.min(8, dx * 0.26));
        targetY = Math.max(-8, Math.min(8, dy * 0.26));
      }, { passive: true });

      btn.addEventListener('mouseleave', () => {
        isHovered = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        btn.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease';
        btn.style.transform = '';
      });
    });
  }

  // ==========================================================================
  // MODULE 8: High-Tech Multi-Page Transition Wipe (BFCache Safe)
  // ==========================================================================
  function initPageTransitions() {
    if (prefersReducedMotion) return;

    let wipe = document.getElementById('cyber-page-wipe');
    if (!wipe) {
      wipe = document.createElement('div');
      wipe.id = 'cyber-page-wipe';
      wipe.className = 'cyber-page-wipe';
      document.body.appendChild(wipe);
    }

    // Reset wipe when navigating back via browser history / bfcache
    window.addEventListener('pageshow', () => {
      if (wipe) wipe.classList.remove('wiping');
    });

    const internalLinks = document.querySelectorAll('a[href$=".html"]');
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (
          link.target === '_blank' ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          !href ||
          href.startsWith('#') ||
          href.startsWith('mailto:')
        ) {
          return;
        }

        // Avoid re-navigating to the current page
        const currentPath = window.location.pathname;
        if (currentPath.endsWith(href)) {
          return;
        }

        e.preventDefault();
        wipe.classList.add('wiping');

        setTimeout(() => {
          window.location.href = href;
        }, 140);
      });
    });
  }

  // ==========================================================================
  // INITIALIZATION ON DOM READY
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initHero3D();
    init3DCardTilt();
    initScroll3DReveals();
    initCinematicTypography();
    initCharTextReveals();
    initTypewriter();
    initMagneticButtons();
    initPageTransitions();
  });

})();
