/**
 * Takshil Patel — Personal Portfolio
 * Canvas 3D Spatial Cyber Deep-Field & Geometry
 * Realistic 3D perspective projection, camera parallax, and ambient cyber geometry
 * Subtle, high-performance (60fps), respects prefers-reduced-motion
 */

(function () {
  'use strict';

  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Configuration
  const isMobile = width < 768;
  const particleCount = isMobile ? 36 : 72;
  const max3DDistance = isMobile ? 120 : 155;
  const maxDistSq = max3DDistance * max3DDistance;
  const fov = 480;

  // Camera & Mouse Parallax State
  let camX = 0;
  let camY = 0;
  let targetCamX = 0;
  let targetCamY = 0;

  let mouse = {
    x: width / 2,
    y: height / 2,
    active: false
  };

  // 3D Particles
  const particles = [];

  class Particle3D {
    constructor() {
      this.proj = null;
      this.reset(true);
    }

    reset(initial = false) {
      this.x = (Math.random() - 0.5) * width * 1.5;
      this.y = (Math.random() - 0.5) * height * 1.5;
      this.z = initial ? (Math.random() - 0.5) * 500 : 250;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.vz = -(Math.random() * 0.4 + 0.15); // Gently drifts forward toward viewer
      this.baseRadius = Math.random() * 1.5 + 0.8;
      this.isCyan = Math.random() > 0.35;
      this.color = this.isCyan ? '0, 240, 255' : '168, 85, 247';
      this.baseAlpha = Math.random() * 0.35 + 0.25;
      this.proj = null;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;

      // Wrap around 3D frustum
      if (this.z < -250) this.z = 250;
      if (this.z > 250) this.z = -250;
      if (this.x < -width) this.x = width;
      if (this.x > width) this.x = -width;
      if (this.y < -height) this.y = height;
      if (this.y > height) this.y = -height;

      // Compute and cache projection once per frame
      this.proj = this.project();

      // Subtle mouse gravity in screen coordinates
      if (mouse.active) {
        const dx = mouse.x - this.proj.screenX;
        const dy = mouse.y - this.proj.screenY;
        const distSq = dx * dx + dy * dy;
        if (distSq < 19600 && distSq > 0) { // 140 * 140 = 19600
          const dist = Math.sqrt(distSq);
          const force = (140 - dist) / 140;
          this.x -= (dx / dist) * force * 1.6;
          this.y -= (dy / dist) * force * 1.6;
          this.proj = this.project();
        }
      }
    }

    project() {
      const effZ = this.z + 300;
      const scale = fov / (fov + effZ);
      const screenX = (this.x - camX) * scale + width / 2;
      const screenY = (this.y - camY) * scale + height / 2;
      return { screenX, screenY, scale };
    }

    draw() {
      const proj = this.proj || this.project();
      if (proj.screenX < -50 || proj.screenX > width + 50 || proj.screenY < -50 || proj.screenY > height + 50) return;

      const depthAlpha = Math.max(0.1, Math.min(0.85, (1 - (this.z + 250) / 500) * this.baseAlpha));
      const radius = Math.max(0.6, this.baseRadius * proj.scale);

      ctx.beginPath();
      ctx.arc(proj.screenX, proj.screenY, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${depthAlpha.toFixed(2)})`;
      ctx.fill();
    }
  }

  // Floating Background Wireframe Polyhedra
  class FloatingCyberOctahedron {
    constructor(x, y, z, size, rotSpeed) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = size;
      this.rotSpeed = rotSpeed;
      this.rx = Math.random() * Math.PI;
      this.ry = Math.random() * Math.PI;
      this.vertices = [
        [size, 0, 0], [-size, 0, 0],
        [0, size, 0], [0, -size, 0],
        [0, 0, size], [0, 0, -size]
      ];
      this.edges = [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 4], [4, 3], [3, 5], [5, 2]
      ];
    }

    update() {
      this.rx += this.rotSpeed * 0.7;
      this.ry += this.rotSpeed;
    }

    draw() {
      const effZ = this.z + 300;
      const scale = fov / (fov + effZ);
      const centerX = (this.x - camX * 0.5) * scale + width / 2;
      const centerY = (this.y - camY * 0.5) * scale + height / 2;

      // Rotate Vertices
      const projected = this.vertices.map(v => {
        // Rotate X
        const y1 = v[1] * Math.cos(this.rx) - v[2] * Math.sin(this.rx);
        const z1 = v[1] * Math.sin(this.rx) + v[2] * Math.cos(this.rx);
        const x1 = v[0];
        // Rotate Y
        const x2 = x1 * Math.cos(this.ry) + z1 * Math.sin(this.ry);
        const y2 = y1;

        return {
          px: x2 * scale + centerX,
          py: y2 * scale + centerY
        };
      });

      ctx.beginPath();
      this.edges.forEach(([i, j]) => {
        ctx.moveTo(projected[i].px, projected[i].py);
        ctx.lineTo(projected[j].px, projected[j].py);
      });
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.lineWidth = 0.85;
      ctx.stroke();
    }
  }

  const floatingPolys = [
    new FloatingCyberOctahedron(-width * 0.35, -height * 0.25, 120, 45, 0.006),
    new FloatingCyberOctahedron(width * 0.38, height * 0.3, 80, 55, -0.005)
  ];

  // Initialize
  function init() {
    particles.length = 0;
    const dynamicCount = width < 480 ? 28 : (width < 768 ? 40 : (width < 1200 ? 56 : 72));
    for (let i = 0; i < dynamicCount; i++) {
      particles.push(new Particle3D());
    }
  }

  // Draw 3D Spatial Constellation Lines
  function connect3D() {
    const len = particles.length;
    for (let a = 0; a < len; a++) {
      const p1 = particles[a];
      const proj1 = p1.proj;
      if (!proj1) continue;

      for (let b = a + 1; b < len; b++) {
        const p2 = particles[b];

        // 3D Euclidean squared distance check eliminates expensive Math.sqrt calls
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistSq) {
          const proj2 = p2.proj;
          if (!proj2) continue;

          const dist3D = Math.sqrt(distSq);
          const lineAlpha = (1 - dist3D / max3DDistance) * 0.16;

          ctx.beginPath();
          ctx.moveTo(proj1.screenX, proj1.screenY);
          ctx.lineTo(proj2.screenX, proj2.screenY);
          ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha.toFixed(2)})`;
          ctx.lineWidth = Math.max(0.5, 0.85 * proj1.scale);
          ctx.stroke();
        }
      }
    }
  }

  // Animation Loop
  let animationFrameId;

  function animate() {
    // Camera spring interpolation with mouse movement
    camX += (targetCamX - camX) * 0.05;
    camY += (targetCamY - camY) * 0.05;

    ctx.clearRect(0, 0, width, height);

    // Draw floating 3D polyhedra
    floatingPolys.forEach(poly => {
      poly.update();
      poly.draw();
    });

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    connect3D();
    animationFrameId = requestAnimationFrame(animate);
  }

  // Event Listeners
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    }, 150);
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
    targetCamX = (e.clientX - width / 2) * 0.12;
    targetCamY = (e.clientY - height / 2) * 0.12;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
    targetCamX = 0;
    targetCamY = 0;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
      targetCamX = (e.touches[0].clientX - width / 2) * 0.08;
      targetCamY = (e.touches[0].clientY - height / 2) * 0.08;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.active = false;
    targetCamX = 0;
    targetCamY = 0;
  }, { passive: true });

  // Tab Visibility Throttling
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animationFrameId = requestAnimationFrame(animate);
    }
  });

  init();
  animate();
})();
