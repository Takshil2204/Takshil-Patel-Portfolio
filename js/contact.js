/**
 * Takshil Patel — Personal Portfolio
 * Contact Section Logic: Form Validation, Mailto Handler, Copy-to-Clipboard & Toast Alerts
 */

// Global Toast Dispatcher
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  // Icon based on type
  const iconSvg = type === 'success' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 3.8s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3800);
}

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. One-Click Copy Email to Clipboard
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('contact-email-val');

  if (copyEmailBtn && emailTextEl) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = emailTextEl.textContent.trim();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for older contexts
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        showToast(`Email copied: ${email}`, 'success');
      } catch (err) {
        showToast('Could not auto-copy. Please copy manually.', 'info');
      }
    });
  }

  // 2. Interactive Contact Form Validation & Handler
  const contactForm = document.getElementById('portfolio-contact-form');
  if (!contactForm) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setFieldError(input, errorElementId, message) {
    input.classList.add('error');
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('visible');
    }
  }

  function clearFieldError(input, errorElementId) {
    input.classList.remove('error');
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('visible');
    }
  }

  // Real-time error removal on input
  nameInput.addEventListener('input', () => clearFieldError(nameInput, 'error-name'));
  emailInput.addEventListener('input', () => clearFieldError(emailInput, 'error-email'));
  subjectInput.addEventListener('input', () => clearFieldError(subjectInput, 'error-subject'));
  messageInput.addEventListener('input', () => clearFieldError(messageInput, 'error-message'));

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    const nameVal = nameInput.value.trim();
    if (!nameVal || nameVal.length < 2) {
      setFieldError(nameInput, 'error-name', 'Please enter your full name (minimum 2 characters).');
      if (isValid) nameInput.focus();
      isValid = false;
    } else {
      clearFieldError(nameInput, 'error-name');
    }

    // Validate Email
    const emailVal = emailInput.value.trim();
    if (!emailVal || !validateEmail(emailVal)) {
      setFieldError(emailInput, 'error-email', 'Please enter a valid email address.');
      if (isValid) emailInput.focus();
      isValid = false;
    } else {
      clearFieldError(emailInput, 'error-email');
    }

    // Validate Subject
    const subjectVal = subjectInput.value.trim();
    if (!subjectVal || subjectVal.length < 3) {
      setFieldError(subjectInput, 'error-subject', 'Please specify a subject for your message.');
      if (isValid) subjectInput.focus();
      isValid = false;
    } else {
      clearFieldError(subjectInput, 'error-subject');
    }

    // Validate Message
    const msgVal = messageInput.value.trim();
    if (!msgVal || msgVal.length < 10) {
      setFieldError(messageInput, 'error-message', 'Please provide a message with at least 10 characters.');
      if (isValid) messageInput.focus();
      isValid = false;
    } else {
      clearFieldError(messageInput, 'error-message');
    }

    if (!isValid) return;

    // Construct functional mailto URI to launch user's default email client
    const targetRecipient = emailTextEl ? emailTextEl.textContent.trim() : 'takshil.patel@example.com';
    const emailSubject = encodeURIComponent(`[Portfolio Inquiry] ${subjectVal} — from ${nameVal}`);
    const emailBody = encodeURIComponent(
      `Hello Takshil,\n\nName: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${msgVal}\n\n---\nSent from Takshil Patel's Portfolio Website`
    );

    const mailtoUrl = `mailto:${targetRecipient}?subject=${emailSubject}&body=${emailBody}`;

    // Show high-feedback toast to the user
    showToast('Inquiry ready! Opening email client to send message...', 'success');

    // Trigger mail client
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 450);

    // Reset the form
    contactForm.reset();
  });
});
