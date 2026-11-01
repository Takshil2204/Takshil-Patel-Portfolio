/**
 * Takshil Patel — Personal Portfolio
 * Main Application Script: Navigation, Scroll Spy, Back-to-Top, Keyboard Nav
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. DOM Element References
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('mobile-nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');
  const currentYearSpan = document.getElementById('current-year');

  // Set current year dynamically
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Header Scroll Effect
  function handleHeaderScroll() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // 3. Mobile Navigation Drawer
  function toggleMobileNav() {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    siteNav.classList.toggle('open');
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  }

  function closeMobileNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', toggleMobileNav);

    // Close mobile nav when clicking any nav link or CTA in drawer
    navLinks.forEach((link) => {
      link.addEventListener('click', closeMobileNav);
    });

    const navActions = siteNav.querySelectorAll('.nav-actions a');
    navActions.forEach((btn) => {
      btn.addEventListener('click', closeMobileNav);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (
        siteNav.classList.contains('open') &&
        !siteNav.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMobileNav();
      }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('open')) {
        closeMobileNav();
        navToggle.focus();
      }
    });

    // Auto-close on viewport resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 991 && siteNav.classList.contains('open')) {
        closeMobileNav();
      }
    }, { passive: true });
  }

  // 4. Multi-Page Active Nav Detection & Scroll Spy
  // Detect current filename from URL path (defaults to index.html)
  const currentPath = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';

  let hasPageMatch = false;
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.split('#')[0].split('?')[0];

    // Check if link matches current page (or index.html fallback)
    const isCurrent =
      cleanHref === currentPath ||
      ((currentPath === '' || currentPath === 'index.html') && (cleanHref === 'index.html' || cleanHref === './' || cleanHref === ''));

    if (isCurrent && !href.startsWith('#')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
      hasPageMatch = true;
    } else if (cleanHref.endsWith('.html') && cleanHref !== currentPath) {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // Scroll Spy: Only apply if navigating via anchor hashes on the same page
  const hasHashNav = Array.from(navLinks).some((link) => link.getAttribute('href')?.startsWith('#'));
  if (hasHashNav && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else if (link.getAttribute('href')?.startsWith('#')) {
              link.classList.remove('active');
            }
          });
        }
      });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // 5. Back to Top Smooth Scroll
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
