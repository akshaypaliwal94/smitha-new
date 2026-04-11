'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Countdown timer functionality
    const updateCountdown = () => {
      const targetDate = new Date('2026-04-19T15:00:00+05:30'); // April 19, 2026, 3:00 PM IST

      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dayEl = document.getElementById('countdown-days');
        const hourEl = document.getElementById('countdown-hours');
        const minEl = document.getElementById('countdown-minutes');
        const secEl = document.getElementById('countdown-seconds');

        if (dayEl) dayEl.textContent = days.toString().padStart(2, '0');
        if (hourEl) hourEl.textContent = hours.toString().padStart(2, '0');
        if (minEl) minEl.textContent = minutes.toString().padStart(2, '0');
        if (secEl) secEl.textContent = seconds.toString().padStart(2, '0');
      }
    };

    // FAQ toggle — event delegation so Strict Mode double-effect doesn't break it
    const faqClickHandler = (event: Event) => {
      const item = (event.target as Element).closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('faq-open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('faq-open'));
      if (!isOpen) item.classList.add('faq-open');
    };
    document.addEventListener('click', faqClickHandler);

    // Seat countdown functionality
    const updateSeatCount = () => {
      const seatElement = document.getElementById('seat-count');
      const stickySeatElement = document.getElementById('sticky-seat-count');
      if (seatElement) {
        let currentSeats = parseInt(seatElement.textContent || '66');
        if (currentSeats > 1) {
          currentSeats -= 1;
          seatElement.textContent = currentSeats.toString();
          // Update sticky CTA seat count too
          if (stickySeatElement) {
            stickySeatElement.textContent = currentSeats.toString();
          }
        }
      }
    };

    // Capture UTM parameters from URL on page load and store for form use
    const urlParams = new URLSearchParams(window.location.search);
    (window as any)._utmParams = {
      utm_source:  urlParams.get('utm_source')  || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term:    urlParams.get('utm_term')    || '',
    };

    // Popup functionality
    (window as any).openPopup = () => {
      const popup = document.getElementById('registration-popup');
      if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    };

    (window as any).closePopup = () => {
      const popup = document.getElementById('registration-popup');
      if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = '';
        // Reset form
        const form = document.querySelector('.popup-form') as HTMLElement;
        const successMessage = document.getElementById('success-message');
        if (form) form.style.display = 'block';
        if (successMessage) successMessage.style.display = 'none';
      }
    };

    (window as any).handleFormSubmit = (event: Event) => {
      event.preventDefault();
      
      const form = event.target as HTMLFormElement;
      
      // Clear previous error messages
      document.querySelectorAll('.error-message').forEach(el => el.remove());
      document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
      
      // Get form data
      const formData = new FormData(form);
      const data = {
        fullName: (formData.get('fullName') as string)?.trim() || '',
        email: (formData.get('email') as string)?.trim() || '',
        whatsapp: (formData.get('whatsapp') as string)?.trim() || '',
        role: (formData.get('role') as string)?.trim() || ''
      };

      let hasErrors = false;

      // Validate Full Name (minimum 2 words)
      if (!data.fullName || data.fullName.length < 2) {
        showFieldError('fullName', 'Please enter your full name');
        hasErrors = true;
      } else if (!/^[a-zA-Z\s]+$/.test(data.fullName)) {
        showFieldError('fullName', 'Name should only contain letters and spaces');
        hasErrors = true;
      } else if (data.fullName.split(' ').filter(name => name.length > 0).length < 2) {
        showFieldError('fullName', 'Please enter your first and last name');
        hasErrors = true;
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email) {
        showFieldError('email', 'Email is required');
        hasErrors = true;
      } else if (!emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        hasErrors = true;
      }

      // Validate WhatsApp (10-15 digits)
      const whatsappRegex = /^[\+]?[\d\s\-\(\)]{10,15}$/;
      if (!data.whatsapp) {
        showFieldError('whatsapp', 'WhatsApp number is required');
        hasErrors = true;
      } else if (!whatsappRegex.test(data.whatsapp.replace(/\s/g, ''))) {
        showFieldError('whatsapp', 'Please enter a valid WhatsApp number (10-15 digits)');
        hasErrors = true;
      }

      // Validate Healthcare Role
      if (!data.role) {
        showFieldError('role', 'Please select your healthcare role');
        hasErrors = true;
      }

      // If validation fails, don't submit
      if (hasErrors) {
        return;
      }

      // Collect UTM params captured on page load
      const utm = (window as any)._utmParams || {};

      // Build payload — form data + UTM tracking
      const payload = {
        full_name:   data.fullName,
        email:       data.email,
        whatsapp:    data.whatsapp,
        role:        data.role,
        utm_source:  utm.utm_source  || '',
        utm_content: utm.utm_content || '',
        utm_term:    utm.utm_term    || '',
        page_url:    window.location.href,
        timestamp:   new Date().toISOString(),
      };

      // Fire Pabbly webhook — keepalive:true survives the page navigation
      fetch('https://connect.pabbly.com/webhook-listener/webhook/IjU3NjIwNTZhMDYzMzA0MzA1MjZiNTUzNiI_3D_pc/IjU3NjcwNTZmMDYzZTA0MzE1MjY5NTUzNzUxM2Ii_pc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => { /* webhook failure must never block the user */ });

      // Signal Lead to Meta Pixel before navigating away
      if ((window as any).fbq) (window as any).fbq('track', 'Lead');

      // Redirect to thank-you page
      window.location.href = '/thank-you';
    };

    // Helper function to show field errors
    function showFieldError(fieldName: string, message: string) {
      const field = document.getElementById(fieldName);
      const formGroup = field?.closest('.form-group');
      if (formGroup) {
        formGroup.classList.add('error');
        // Remove any existing error message before adding a new one
        const existing = formGroup.querySelector('.error-message');
        if (existing) existing.remove();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
      }
    }

    // Helper function to clear field errors
    function clearFieldError(fieldName: string) {
      const field = document.getElementById(fieldName);
      const formGroup = field?.closest('.form-group');
      if (formGroup) {
        formGroup.classList.remove('error');
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
          existingError.remove();
        }
      }
    }

    // Helper function to show field success
    function showFieldSuccess(fieldName: string) {
      const field = document.getElementById(fieldName);
      const formGroup = field?.closest('.form-group');
      if (formGroup) {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
          existingError.remove();
        }
      }
    }

    // Real-time validation functions
    function validateFieldRealTime(fieldName: string, value: string) {
      clearFieldError(fieldName);
      
      switch (fieldName) {
        case 'fullName':
          if (value.length === 0) return; // Don't show error for empty field initially
          if (!/^[a-zA-Z\s]+$/.test(value)) {
            showFieldError(fieldName, 'Name should only contain letters and spaces');
          } else if (value.trim().split(' ').filter(name => name.length > 0).length >= 2) {
            showFieldSuccess(fieldName);
          }
          break;
          
        case 'email':
          if (value.length === 0) return; // Don't show error for empty field initially
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            showFieldError(fieldName, 'Please enter a valid email address');
          } else {
            showFieldSuccess(fieldName);
          }
          break;
          
        case 'whatsapp':
          if (value.length === 0) return; // Don't show error for empty field initially
          const cleanValue = value.replace(/[\s\-\(\)]/g, '');
          const whatsappRegex = /^[\+]?\d{10,15}$/;
          if (!whatsappRegex.test(cleanValue)) {
            showFieldError(fieldName, 'Please enter a valid WhatsApp number (10-15 digits)');
          } else {
            showFieldSuccess(fieldName);
          }
          break;
          
        case 'role':
          if (value) {
            showFieldSuccess(fieldName);
          }
          break;
      }
    }

    // Setup real-time validation listeners
    const setupRealTimeValidation = () => {
      const fields = ['fullName', 'email', 'whatsapp', 'role'];
      
      fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
          // Add input/change event listeners
          field.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            validateFieldRealTime(fieldName, target.value);
          });
          
          field.addEventListener('blur', (e) => {
            const target = e.target as HTMLInputElement;
            const value = target.value.trim();
            
            // On blur, show required field errors if empty
            if (!value) {
              const fieldLabels = {
                fullName: 'Please enter your full name',
                email: 'Email is required',
                whatsapp: 'WhatsApp number is required',
                role: 'Please select your healthcare role'
              };
              showFieldError(fieldName, fieldLabels[fieldName as keyof typeof fieldLabels]);
            }
          });
        }
      });
    };

    // Close popup on escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        (window as any).closePopup();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    // Close popup on overlay click
    const popup = document.getElementById('registration-popup');
    if (popup) {
      popup.addEventListener('click', (event) => {
        if (event.target === popup) {
          (window as any).closePopup();
        }
      });
    }

    // Initialize
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    const seatInterval = setInterval(updateSeatCount, 30000); // Every 30 seconds

    // Setup real-time validation with slight delay to ensure DOM is ready
    setTimeout(() => {
      setupRealTimeValidation();
    }, 100);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(seatInterval);
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', faqClickHandler);
    };
  }, []);

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Free Webinar — Smitha Chowdary Kankanala</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:     #0B1017;
  --teal:   #14B87E;
  --teal2:  #0E8A5F;
  --text:   #FFFFFF;
  --muted:  #8FA3B3;
  --surface: rgba(255,255,255,0.04);
  --border:  rgba(255,255,255,0.08);
}

html { scroll-behavior: smooth; }

body {
  font-family: 'Barlow', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
  text-align: center;
}

/* ── RADIAL GLOWS ── */
.glow-left {
  position: fixed;
  top: -100px;
  left: -150px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(20,184,126,0.18) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}
.glow-right {
  position: fixed;
  top: -80px;
  right: -150px;
  width: 550px;
  height: 550px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(14,100,200,0.14) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}
.glow-bottom {
  position: fixed;
  bottom: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(20,184,126,0.09) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ── HERO WRAPPER ── */
.hero {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 60px 24px 80px;
}

/* ── TOP BADGE ── */
.top-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(20,184,126,0.12);
  border: 1px solid rgba(20,184,126,0.28);
  border-radius: 100px;
  padding: 7px 18px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #80EABE;
  margin-bottom: 36px;
  animation: fadeDown 0.5s ease both;
}
.top-badge .dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--teal);
  animation: blink 2s infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

/* ── HERO LOGO ── */
.hero-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

.chcp-logo {
  max-width: 180px;
  width: 100%;
  height: auto;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.chcp-logo:hover {
  opacity: 1;
}

/* Mobile responsive logo */
@media (max-width: 768px) {
  .chcp-logo {
    max-width: 140px;
  }
  .hero-logo {
    margin-bottom: 6px;
  }
}

@media (max-width: 480px) {
  .chcp-logo {
    max-width: 120px;
  }
  .hero-logo {
    margin-bottom: 5px;
  }
}

/* ── HEADLINE ── */
.headline {
  font-family: 'Bebas Neue', Impact, sans-serif;
  font-size: clamp(36px, 6.5vw, 88px);
  line-height: 1.0;
  letter-spacing: 0.01em;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 4px;
  animation: fadeUp 0.5s ease both 0.1s;
  white-space: nowrap;
}

.headline-accent {
  font-family: 'Bebas Neue', Impact, sans-serif;
  font-size: clamp(36px, 6.5vw, 88px);
  line-height: 1.0;
  letter-spacing: 0.01em;
  color: var(--teal);
  text-transform: uppercase;
  margin-bottom: 12px;
  display: block;
  position: relative;
  animation: fadeUp 0.5s ease both 0.18s;
  white-space: normal;
  max-width: 100%;
}

.headline-accent::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--teal), transparent);
}

/* ── LAYER 2 — PAIN ── */
.tagline-pain {
  font-size: 17px;
  font-weight: 400;
  color: #fff;
  max-width: 600px;
  margin: 24px auto 10px;
  line-height: 1.65;
  animation: fadeUp 0.5s ease both 0.24s;
}

/* ── LAYER 3 — PROMISE ── */
.tagline {
  font-size: 16px;
  font-weight: 300;
  color: var(--muted);
  max-width: 600px;
  margin: 0 auto 36px;
  line-height: 1.7;
  animation: fadeUp 0.5s ease both 0.28s;
}
.tagline em {
  font-style: normal;
  color: #fff;
  font-weight: 500;
}

/* ── HOST CREDIBILITY PILL ── */
.host-pill {
  display: inline-flex;
  align-items: center;
  gap: 0;
  border: 1px solid var(--border);
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 44px;
  animation: fadeUp 0.5s ease both 0.32s;
  background: rgba(255,255,255,0.03);
}
.host-pill-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--muted);
}
.host-pill-item:first-child {
  border-right: 1px solid var(--border);
}
.host-pill-item .flag { font-size: 14px; }
.host-pill-item strong { color: #fff; font-weight: 600; }

/* ── COUNTDOWN ── */
.countdown-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 48px;
  animation: fadeUp 0.5s ease both 0.36s;
}
.countdown-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-right: 10px;
}
.count-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 10px 14px 8px;
  min-width: 62px;
}
.count-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 36px;
  line-height: 1;
  color: #fff;
  letter-spacing: 0.04em;
}
.count-unit {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 4px;
}
.colon {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 32px;
  color: rgba(255,255,255,0.25);
  margin-bottom: 14px;
}

/* ── EVENT CARD ROW ── */
.event-card-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 44px;
  animation: fadeUp 0.5s ease both 0.4s;
}

.event-image-card {
  grid-column: 1;
  background: #111B26;
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.event-image-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0B3D2A 0%, #0B1A2F 50%, #091220 100%);
}

.event-image-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 30% 40%, rgba(20,184,126,0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(14,100,200,0.1) 0%, transparent 50%);
}

.event-image-content {
  position: relative;
  z-index: 1;
  padding: 20px;
  text-align: left;
  width: 100%;
}

.event-tag {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  letter-spacing: 0.06em;
  color: var(--teal);
  line-height: 1.1;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.event-subtitle-img {
  font-size: 11px;
  font-weight: 400;
  color: rgba(255,255,255,0.5);
  font-style: italic;
  margin-bottom: 16px;
}

.host-name-img {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  letter-spacing: 0.08em;
  color: #fff;
  text-transform: uppercase;
}
.host-role-img {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.45);
  text-transform: uppercase;
  margin-top: 2px;
}

/* Cross icon decorative */
.cross-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  background: rgba(20,184,126,0.15);
  border: 1px solid rgba(20,184,126,0.25);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cross-icon svg { width: 16px; height: 16px; stroke: var(--teal); fill: none; stroke-width: 2; stroke-linecap: round; }

.meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.meta-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.meta-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--teal);
  display: flex;
  align-items: center;
  justify-content: center;
}
.meta-icon svg { width: 17px; height: 17px; stroke: #fff; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

.meta-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}
.meta-val {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  line-height: 1.2;
}

/* ── FREE BADGE + CTA ── */
.price-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 18px;
  animation: fadeUp 0.5s ease both 0.44s;
}
.price-original {
  font-size: 18px;
  color: var(--muted);
  text-decoration: line-through;
}
.price-badge {
  background: var(--teal);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 4px;
}
.price-free {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 42px;
  letter-spacing: 0.04em;
  color: #fff;
  line-height: 1;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 560px;
  height: 62px;
  background: var(--teal);
  color: #fff;
  font-family: 'Barlow', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  animation: fadeUp 0.5s ease both 0.48s;
  text-decoration: none;
}
.btn-cta:hover { background: #10D48E; }
.btn-cta:active { transform: scale(0.99); }
.btn-cta svg { width: 18px; height: 18px; stroke: #fff; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }

/* ── GUARANTEE + SCARCITY ── */
.guarantee {
  font-size: 13px;
  color: var(--muted);
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  animation: fadeUp 0.5s ease both 0.5s;
}
.guarantee svg { width: 14px; height: 14px; stroke: var(--teal); fill: none; stroke-width: 2; }

.scarcity {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 13px;
  color: var(--muted);
  animation: fadeUp 0.5s ease both 0.52s;
}
.scarcity .fire { font-size: 14px; }
.scarcity .count-pill {
  background: #E74C3C;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 100px;
}

/* ── ANIMATIONS ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ══════════════════════════════════════════════
   WHO THIS IS FOR
══════════════════════════════════════════════ */
.who-section {
  position: relative;
  z-index: 1;
  background: #F4F2EE;
  padding: 100px 24px;
  text-align: center;
}

.who-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--teal2);
  border: 1px solid rgba(14,138,95,0.3);
  background: rgba(14,138,95,0.08);
  display: inline-block;
  padding: 5px 16px;
  border-radius: 100px;
  margin-bottom: 28px;
}

.who-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.0;
  letter-spacing: 0.02em;
  color: #0F1F45;
  text-transform: uppercase;
  max-width: 860px;
  margin: 0 auto 16px;
}

.who-sub {
  font-size: 15px;
  font-style: italic;
  color: #7A8A99;
  margin-bottom: 56px;
  line-height: 1.6;
}

.who-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 860px;
  margin: 0 auto 56px;
  text-align: left;
}

.who-card {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.07);
  border-radius: 12px;
  padding: 28px 28px 32px;
  border-top: 3px solid transparent;
  transition: border-color 0.2s;
}

.who-card:hover {
  border-top-color: var(--teal);
}

.who-card-icon {
  width: 40px;
  height: 40px;
  background: rgba(20,184,126,0.08);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--teal2);
}

.who-card-icon svg {
  width: 20px;
  height: 20px;
}

.who-card-title {
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #0F1F45;
  margin-bottom: 12px;
}

.who-card-body {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  color: #5A6A7A;
}

.who-exclusion {
  font-size: 15px;
  color: #5A6A7A;
  max-width: 640px;
  margin: 0 auto 10px;
  line-height: 1.6;
}

.who-exclusion strong {
  color: #0F1F45;
  font-weight: 700;
}

.who-but {
  font-size: 15px;
  color: #9AABB8;
  margin-bottom: 20px;
  font-style: italic;
}

.who-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  max-width: 720px;
  margin: 0 auto 44px;
}

.who-pill {
  background: #0F1F45;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 10px 18px;
  border-radius: 100px;
}

.who-cta {
  max-width: 340px;
  margin: 0 auto;
  background: var(--teal);
}

@media (max-width: 640px) {
  .who-grid { grid-template-columns: 1fr; text-align: center; }
  .who-headline { font-size: 36px; }
  .event-card-row { grid-template-columns: 1fr; }
  .event-image-card { grid-column: 1; min-height: auto; height: auto; }
  .event-image-card > img { width: 100%; height: auto; display: block; object-fit: contain; position: static; }
  .headline { font-size: 32px; line-height: 1.15; white-space: normal; }
  .headline-accent { font-size: 32px; line-height: 1.15; }
  .host-pill { flex-direction: column; border-radius: 12px; }
  .host-pill-item:first-child { border-right: none; border-bottom: 1px solid var(--border); }
}
</style>
</head>
<body>

<div class="glow-left"></div>
<div class="glow-right"></div>
<div class="glow-bottom"></div>

<section class="hero">

  <!-- CHCP LOGO -->
  <div class="hero-logo">
    <img src="/chcp-logo.png" alt="CHCP - Center for Healthcare Communication Practice" class="chcp-logo">
  </div>

  <!-- TOP BADGE -->
  <div class="top-badge">
    <span class="dot"></span>
    For Doctors, Nurses &amp; All Healthcare Professionals
  </div>

  <!-- HEADLINE -->
  <div class="headline">You know what to do —</div>
  <span class="headline-accent">so why doesn't it always come through when it matters most?</span>

  <!-- LAYER 2 — PAIN -->
  <p class="tagline-pain">
    The moment you walked out thinking, "I should have said that differently."<br>
    The patient you were worried about—but couldn't quite push hard enough.<br>
    The decision that didn't change, even after you spoke up.
  </p>

  <!-- LAYER 3 — PROMISE -->
  <p class="tagline">
    In 3 hours, experience how the CHCP system works—why communication fails even among skilled healthcare professionals, how it breaks with patients and between teams, and how to navigate hierarchy, escalation, and ownership with clarity when it matters most.
  </p>

  <!-- COUNTDOWN -->
  <div class="countdown-wrap">
    <span class="countdown-label">Webinar in</span>
    <div class="count-box">
      <span class="count-num" id="countdown-days">16</span>
      <span class="count-unit">Days</span>
    </div>
    <span class="colon">:</span>
    <div class="count-box">
      <span class="count-num" id="countdown-hours">08</span>
      <span class="count-unit">Hours</span>
    </div>
    <span class="colon">:</span>
    <div class="count-box">
      <span class="count-num" id="countdown-minutes">44</span>
      <span class="count-unit">Mins</span>
    </div>
    <span class="colon">:</span>
    <div class="count-box">
      <span class="count-num" id="countdown-seconds">12</span>
      <span class="count-unit">Secs</span>
    </div>
  </div>

  <!-- EVENT CARD ROW -->
  <div class="event-card-row">

    <!-- Image / Branding Card -->
    <div class="event-image-card" style="padding:0;">
      <img src="/thumbnail_3.png" alt="Healthcare Communication Masterclass — CHCP by Smitha Kankanala" style="width:100%; height:auto; display:block; border-radius:10px;">
    </div>

    <!-- Meta Grid -->
    <div class="meta-grid">

      <div class="meta-card">
        <div class="meta-icon">
          <svg viewBox="0 0 18 18"><rect x="2" y="3" width="14" height="14" rx="2"/><line x1="13" y1="1" x2="13" y2="5"/><line x1="5" y1="1" x2="5" y2="5"/><line x1="2" y1="9" x2="16" y2="9"/></svg>
        </div>
        <div class="meta-label">Date</div>
        <div class="meta-val">19th April 2026</div>
      </div>

      <div class="meta-card">
        <div class="meta-icon">
          <svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="7"/><polyline points="9,5 9,9 12,11.5"/></svg>
        </div>
        <div class="meta-label">Time</div>
        <div class="meta-val">3:00 PM IST</div>
      </div>

      <div class="meta-card">
        <div class="meta-icon">
          <svg viewBox="0 0 18 18"><rect x="2" y="4" width="14" height="11" rx="2"/><path d="M6 4V3a1 1 0 012 0v1M10 4V3a1 1 0 012 0v1"/><circle cx="9" cy="11" r="2"/></svg>
        </div>
        <div class="meta-label">Venue</div>
        <div class="meta-val">Live Zoom Session</div>
      </div>

      <div class="meta-card">
        <div class="meta-icon">
          <svg viewBox="0 0 18 18"><path d="M16 13s-1-2-7-2-7 2-7 2"/><circle cx="9" cy="6" r="3"/></svg>
        </div>
        <div class="meta-label">Host</div>
        <div class="meta-val">Smitha Chowdary Kankanala</div>
      </div>

    </div>
  </div>

  <!-- PRICE ROW -->
  <div class="price-row">
    <span class="price-original">₹999</span>
    <span class="price-badge">Today Only</span>
    <span class="price-free">FREE</span>
  </div>

  <!-- CTA BUTTON -->
  <a href="javascript:void(0)" class="btn-cta" onclick="openPopup()">
    Grab Your FREE Seat
    <svg viewBox="0 0 18 18"><line x1="3" y1="9" x2="15" y2="9"/><polyline points="10,4 15,9 10,14"/></svg>
  </a>


  <!-- SCARCITY -->
  <div class="scarcity">
    <span class="fire">🔥</span>
    Only <span class="count-pill" id="seat-count">66</span> seats available — registration closes when full
  </div>

</section>

<!-- ══════════════════════════════════════════════
     WHO THIS IS FOR SECTION
══════════════════════════════════════════════ -->
<section class="who-section">

  <p class="who-eyebrow">Who This Is For</p>
  <h2 class="who-headline">This Is For India's Healthcare<br>Professionals Who Are Done<br>Walking On Eggshells</h2>
  <p class="who-sub">Four roles. Four distinct daily realities. One corporate-level communication gap costing all of them.</p>

  <div class="who-grid">

    <div class="who-card">
      <div class="who-card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/><path d="M9 11v3m3-3v3m3-3v3"/></svg>
      </div>
      <h3 class="who-card-title">I'm a Clinician</h3>
      <p class="who-card-body">You're technically excellent — but nobody promoted you for that. You froze when a family raised their voice. Your seniors handle it differently with executive-level communication skills nobody explained. That ends here.</p>
    </div>

    <div class="who-card">
      <div class="who-card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/><circle cx="17" cy="8" r="2.5"/><path d="M17 11v2"/><path d="M17 15v.5"/></svg>
      </div>
      <h3 class="who-card-title">I'm a Nurse or Allied Health Professional</h3>
      <p class="who-card-body">You're first at the bedside and last in the briefing. Families find you before the consultant does. You manage the authority gradient with doctors every single shift — without a framework for either. Clinical training never covered this.</p>
    </div>

    <div class="who-card">
      <div class="who-card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
      </div>
      <h3 class="who-card-title">I Work in Healthcare Management</h3>
      <p class="who-card-body">You make the decisions — but getting buy-in requires corporate-level communication skills. Escalations reach HR. Your team nods in briefings and ignores the decision anyway. Communication is already failing as a system function — this shows you exactly where.</p>
    </div>

    <div class="who-card">
      <div class="who-card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11"/><path d="M2 19h20"/><path d="M9 12h6"/><path d="M9 16h4"/></svg>
      </div>
      <h3 class="who-card-title">I'm a Medical Student (Clinical Years) or Intern</h3>
      <p class="who-card-body">You're in clinical rotations now — real patient interactions every day. They taught you healthcare skills but not this communication system. You're forming habits that will follow you through your entire career. Master the framework now, not five years in.</p>
    </div>

  </div>

  <!-- EXCLUSION LINE -->
  <p class="who-exclusion">You want a motivational talk, a generic soft-skills workshop, or communication theory with no ward application — <strong>DON'T register.</strong></p>

  <p class="who-but">But if you want to be —</p>

  <!-- IDENTITY PILLS -->
  <div class="who-pills">
    <span class="who-pill">The One Who Handles The Hard Conversation</span>
    <span class="who-pill">The One Management Promotes</span>
    <span class="who-pill">The One Colleagues Trust Under Pressure</span>
    <span class="who-pill">The One Who Never Freezes Again</span>
  </div>

  <!-- SECTION CTA -->
  <a href="javascript:void(0)" class="btn-cta who-cta" onclick="openPopup()">
    Reserve Your FREE Seat
    <svg viewBox="0 0 18 18"><line x1="3" y1="9" x2="15" y2="9"/><polyline points="10,4 15,9 10,14"/></svg>
  </a>

</section>

<!-- ══════════════════════════════════════════════
     WHAT WE COVER SECTION
══════════════════════════════════════════════ -->
<style>
/* ── COVER SECTION ── */
.cover-section {
  position: relative;
  background: #080E18;
  padding: 120px 24px 130px;
  text-align: center;
  overflow: hidden;
  z-index: 1;
}

/* Subtle grid texture */
.cover-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(20,184,126,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20,184,126,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
  z-index: 0;
}

/* Atmospheric corner glows */
.cover-section::after {
  content: '';
  position: absolute;
  bottom: -160px;
  right: -160px;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(20,184,126,0.12) 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
}

.cover-glow-tl {
  position: absolute;
  top: -120px;
  left: -120px;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(14,100,200,0.1) 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
}

.cover-inner {
  position: relative;
  z-index: 1;
  max-width: 960px;
  margin: 0 auto;
}

/* ── EYEBROW ── */
.cover-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--teal);
  border: 1px solid rgba(20,184,126,0.25);
  background: rgba(20,184,126,0.07);
  padding: 6px 18px;
  border-radius: 100px;
  margin-bottom: 32px;
}
.cover-eyebrow-line {
  width: 20px;
  height: 1px;
  background: var(--teal);
  opacity: 0.6;
}

/* ── HEADLINE ── */
.cover-headline {
  font-family: 'Bebas Neue', Impact, sans-serif;
  font-size: clamp(42px, 6vw, 80px);
  line-height: 0.96;
  letter-spacing: 0.02em;
  color: #fff;
  text-transform: uppercase;
  max-width: 820px;
  margin: 0 auto 10px;
}
.cover-headline-teal {
  color: var(--teal);
}

.cover-sub {
  font-size: 15px;
  font-weight: 300;
  color: #6B8090;
  max-width: 540px;
  margin: 18px auto 80px;
  line-height: 1.75;
}
.cover-sub em {
  font-style: normal;
  color: rgba(255,255,255,0.7);
}

/* ── TIMELINE SECTION ── */
.timeline-section {
  margin: 60px auto;
  max-width: 800px;
}

.timeline-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 24px;
  letter-spacing: 0.06em;
  color: var(--teal);
  text-align: center;
  margin-bottom: 40px;
  text-transform: uppercase;
}

.timeline-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 20px;
  align-items: center;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;
  padding: 20px;
}

.timeline-time {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  letter-spacing: 0.06em;
  color: var(--teal);
  text-align: center;
  background: rgba(20,184,126,0.1);
  border: 1px solid rgba(20,184,126,0.2);
  border-radius: 6px;
  padding: 8px 4px;
}

.timeline-content h4 {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 6px;
  text-align: left;
}
.timeline-bullets {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.timeline-bullets li {
  font-size: 13.5px;
  color: rgba(255,255,255,0.65);
  line-height: 1.5;
  padding-left: 14px;
  position: relative;
  text-align: left;
}
.timeline-bullets li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--teal);
  opacity: 0.7;
}

.timeline-content p {
  font-size: 13px;
  color: #6B8090;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .timeline-item {
    grid-template-columns: 1fr;
    gap: 12px;
    text-align: center;
  }
  
  .timeline-time {
    justify-self: center;
    width: 80px;
  }
}

/* ── MODULES GRID ── */
.modules-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2px;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2px;
}

.module-card {
  background: rgba(255,255,255,0.025);
  padding: 40px 32px 44px;
  text-align: left;
  position: relative;
  transition: background 0.3s;
  border-right: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.module-card:nth-child(3n) {
  border-right: none;
}

.module-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--teal), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.module-card:hover { background: rgba(20,184,126,0.05); }
.module-card:hover::before { opacity: 1; }

/* Number */
.module-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: rgba(20,184,126,0.5);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.module-num::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(20,184,126,0.15);
  max-width: 40px;
}

/* Icon box */
.module-icon-wrap {
  width: 44px;
  height: 44px;
  background: rgba(20,184,126,0.08);
  border: 1px solid rgba(20,184,126,0.18);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;
}
.module-icon-wrap svg {
  width: 20px;
  height: 20px;
  stroke: var(--teal);
  fill: none;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Tag pill */
.module-tag {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--teal);
  background: rgba(20,184,126,0.1);
  border: 1px solid rgba(20,184,126,0.2);
  padding: 3px 10px;
  border-radius: 100px;
  margin-bottom: 12px;
}

.module-title {
  font-family: 'Barlow', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  line-height: 1.35;
  margin-bottom: 14px;
  letter-spacing: 0.01em;
}

.module-body {
  font-size: 13px;
  font-weight: 400;
  color: #6B8090;
  line-height: 1.75;
}

/* ── BOTTOM FULL-WIDTH MODULE ── */
.module-card-wide {
  background: rgba(20,184,126,0.04);
  border: 1px solid rgba(20,184,126,0.12);
  border-radius: 0 0 16px 16px;
  padding: 36px 40px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 32px;
  text-align: left;
}

.module-wide-badge {
  background: var(--teal);
  color: #fff;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 13px;
  letter-spacing: 0.12em;
  padding: 8px 16px;
  border-radius: 6px;
  white-space: nowrap;
}

.module-wide-text strong {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 5px;
}
.module-wide-text span {
  font-size: 13px;
  color: #6B8090;
  line-height: 1.6;
}

.module-wide-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--teal);
  text-decoration: none;
  white-space: nowrap;
  border: 1px solid rgba(20,184,126,0.3);
  padding: 10px 20px;
  border-radius: 6px;
  transition: background 0.2s;
}
.module-wide-cta:hover { background: rgba(20,184,126,0.1); }
.module-wide-cta svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }

/* ── DURATION ROW ── */
.cover-duration-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 36px;
  margin-top: 60px;
  flex-wrap: wrap;
}

.duration-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.duration-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 44px;
  line-height: 1;
  color: #fff;
  letter-spacing: 0.04em;
}
.duration-num span {
  color: var(--teal);
}
.duration-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #4A6070;
}

.duration-divider {
  width: 1px;
  height: 48px;
  background: rgba(255,255,255,0.08);
}

@media (max-width: 760px) {
  .modules-grid { grid-template-columns: 1fr; }
  .module-card:nth-child(3n) { border-right: none; }
  .module-card { border-right: none; text-align: center; }
  .module-card-wide { grid-template-columns: 1fr; gap: 16px; border-radius: 0 0 12px 12px; text-align: center; }
  .cover-duration-row { gap: 20px; }
  .duration-divider { display: none; }
}
</style>

<section class="cover-section">
  <div class="cover-glow-tl"></div>

  <div class="cover-inner">

    <!-- EYEBROW -->
    <div class="cover-eyebrow">
      <span class="cover-eyebrow-line"></span>
      What We Cover
      <span class="cover-eyebrow-line"></span>
    </div>

    <!-- HEADLINE -->
    <h2 class="cover-headline">
      The CHCP System —<br>
      <span class="cover-headline-teal">Live In 3 Hours</span>
    </h2>

    <p class="cover-sub">
      Center for Healthcare Communication Practice is built on 3 Pillars. In this webinar, Smitha Chowdary Kankanala walks you through all three pillars of the system — giving you a comprehensive overview of the complete Certified Healthcare Professional Communication Programme architecture and how each pillar works together.
    </p>

    <!-- WEBINAR TIMELINE -->
    <div class="timeline-section">
      <h3 class="timeline-title">3-Hour Webinar Structure</h3>
      <div class="timeline-grid">
        <div class="timeline-item">
          <div class="timeline-time">Hour 1</div>
          <div class="timeline-content">
            <h4>Pillar 1: See The System</h4>
            <ul class="timeline-bullets">
              <li>Diagnose where communication is silently breaking using the Communication Flow Grid</li>
              <li>Map interpretation, escalation, and accountability gaps in your own workplace</li>
              <li>Build closed-loop reliability in high-risk transitions: handovers, missed escalations, ICU moments</li>
              <li>Identify breakdowns before they become complaints or clinical errors</li>
            </ul>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-time">Hour 2</div>
          <div class="timeline-content">
            <h4>Pillar 2: Handle Complex Human Moments</h4>
            <ul class="timeline-bullets">
              <li>Navigate high-emotion patient conversations: risk framing, consent clarity, complication disclosure</li>
              <li>Handle conflict, hierarchy, and disciplined dissent across authority gradients</li>
              <li>Speak up safely, disagree without damaging relationships, prevent delays caused by silence or fear</li>
              <li>Structure difficult conversations — with patients, families, and team members — instead of improvising in high-pressure moments</li>
            </ul>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-time">Hour 3</div>
          <div class="timeline-content">
            <h4>Pillar 3: Protect, Lead &amp; Scale</h4>
            <ul class="timeline-bullets">
              <li>Make your communication legally defensible — no more &quot;we told them but it&apos;s not documented&quot;</li>
              <li>Audit and close informal channel risks: WhatsApp instructions, verbal assurances, undocumented escalations</li>
              <li>Lead communication during crisis: adverse outcomes, media pressure, institutional alignment</li>
              <li>Align internal, patient, and leadership messaging when it matters most</li>
            </ul>
          </div>
        </div>
      </div>
    </div>


    <!-- WIDE BONUS BAR -->
    <div class="module-card-wide">
      <div class="module-wide-badge">Live Q&A</div>
      <div class="module-wide-text">
        <strong>Your Hardest Conversation — Worked Live</strong>
        <span>Submit a real scenario from your ward or clinic before the session. Smitha Chowdary Kankanala will break it down using the Communication Flow Grid — live, in front of the cohort.</span>
      </div>
      <a href="javascript:void(0)" class="module-wide-cta" onclick="openPopup()">
        Get Your Seat
        <svg viewBox="0 0 18 18"><line x1="3" y1="9" x2="15" y2="9"/><polyline points="10,4 15,9 10,14"/></svg>
      </a>
    </div>

  </div>
</section>

<style>
/* ══════════════════════════════════════════════
   WHAT CHANGES SECTION
══════════════════════════════════════════════ */
.change-section {
  position: relative;
  background: #F7F4EF;
  padding: 120px 24px 130px;
  text-align: center;
  overflow: hidden;
  z-index: 1;
}

/* Diagonal texture lines — top-left to bottom-right */
.change-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(14,138,95,0.03) 0px,
    rgba(14,138,95,0.03) 1px,
    transparent 1px,
    transparent 28px
  );
  pointer-events: none;
  z-index: 0;
}

.change-inner {
  position: relative;
  z-index: 1;
  max-width: 1020px;
  margin: 0 auto;
}

/* ── EYEBROW ── */
.change-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--teal2);
  border: 1px solid rgba(14,138,95,0.22);
  background: rgba(14,138,95,0.06);
  padding: 6px 18px;
  border-radius: 100px;
  margin-bottom: 32px;
}

/* ── HEADLINE ── */
.change-headline {
  font-family: 'Bebas Neue', Impact, sans-serif;
  font-size: clamp(44px, 6.5vw, 86px);
  line-height: 0.95;
  letter-spacing: 0.02em;
  color: #0F1F35;
  text-transform: uppercase;
  margin: 0 auto 10px;
}
.change-headline em {
  font-style: normal;
  color: var(--teal2);
  font-family: 'Barlow', sans-serif;
  font-size: clamp(28px, 4vw, 52px);
  font-weight: 800;
  letter-spacing: -0.01em;
  text-transform: none;
  display: block;
  line-height: 1.1;
  margin-top: 4px;
}

.change-sub {
  font-size: 15px;
  font-weight: 400;
  color: #7A8A99;
  max-width: 520px;
  margin: 20px auto 80px;
  line-height: 1.75;
}

/* ══════════════════
   BEFORE / AFTER TABLE
══════════════════ */
.ba-table {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0;
  max-width: 900px;
  margin: 0 auto 90px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 40px rgba(0,0,0,0.08);
}

.ba-col {
  background: #fff;
  padding: 0;
}
.ba-col-before { background: #fff; }
.ba-col-after  { background: #0F1F35; }

.ba-header {
  padding: 18px 28px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
}
.ba-col-before .ba-header {
  background: #F0EDE8;
  color: #9AABB8;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.ba-col-after .ba-header {
  background: rgba(20,184,126,0.15);
  color: var(--teal);
  border-bottom: 1px solid rgba(20,184,126,0.15);
}
.ba-header-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
}
.ba-col-before .ba-header-dot { background: #C8D0D8; }
.ba-col-after  .ba-header-dot { background: var(--teal); }

.ba-row {
  display: flex;
  align-items: stretch;
}

.ba-cell {
  padding: 18px 28px;
  font-size: 13.5px;
  line-height: 1.55;
  text-align: left;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}
.ba-col-before .ba-cell {
  color: #7A8A99;
  background: #fff;
}
.ba-col-after .ba-cell {
  color: rgba(255,255,255,0.85);
  background: #0F1F35;
  border-bottom-color: rgba(255,255,255,0.05);
  font-weight: 500;
}
.ba-cell-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ba-col-before .ba-cell-icon { background: rgba(0,0,0,0.05); }
.ba-col-after  .ba-cell-icon { background: rgba(20,184,126,0.15); }
.ba-cell-icon svg {
  width: 11px; height: 11px;
  fill: none;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ba-col-before .ba-cell-icon svg { stroke: #B0BEC5; }
.ba-col-after  .ba-cell-icon svg { stroke: var(--teal); }

/* Middle divider column */
.ba-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F7F4EF;
  padding: 0;
  position: relative;
  width: 52px;
  flex-shrink: 0;
}
.ba-divider-header {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F7F4EF;
  width: 100%;
}
.ba-divider-cell {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  position: relative;
}
.ba-divider-cell::before {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  left: 50%;
  width: 1px;
  background: rgba(0,0,0,0.07);
  transform: translateX(-50%);
}
.ba-arrow {
  width: 28px; height: 28px;
  background: var(--teal);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  flex-shrink: 0;
}
.ba-arrow svg {
  width: 13px; height: 13px;
  stroke: #fff;
  fill: none;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ══════════════════
   OUTCOME SPOKES
══════════════════ */
.spokes-container {
  position: relative;
  width: 580px;
  height: 580px;
  margin: 0 auto 80px;
}

/* SVG lines behind everything */
.spokes-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Centre orb */
.spoke-centre {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 148px;
  height: 148px;
  border-radius: 50%;
  background: linear-gradient(145deg, #0F2A1E, #0A1F15);
  border: 2px solid rgba(20,184,126,0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow:
    0 0 0 12px rgba(20,184,126,0.06),
    0 0 0 28px rgba(20,184,126,0.03),
    0 8px 40px rgba(0,0,0,0.2);
}
.spoke-centre-label {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  letter-spacing: 0.12em;
  color: var(--teal);
  line-height: 1.1;
  text-align: center;
  text-transform: uppercase;
}
.spoke-centre-sub {
  font-size: 9px;
  letter-spacing: 0.15em;
  color: rgba(20,184,126,0.55);
  text-transform: uppercase;
  margin-top: 4px;
  font-weight: 600;
}

/* Spoke nodes */
.spoke-node {
  position: absolute;
  width: 148px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 10px;
  padding: 16px 18px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.07);
  transition: box-shadow 0.25s, border-color 0.25s, transform 0.25s;
  cursor: default;
}
.spoke-node:hover {
  box-shadow: 0 8px 32px rgba(20,184,126,0.18);
  border-color: rgba(20,184,126,0.35);
  transform: scale(1.04);
  z-index: 20;
}
.spoke-node-icon {
  width: 32px; height: 32px;
  background: rgba(14,138,95,0.08);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 10px;
}
.spoke-node-icon svg {
  width: 15px; height: 15px;
  stroke: var(--teal2);
  fill: none;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.spoke-node-title {
  font-size: 12px;
  font-weight: 700;
  color: #0F1F35;
  line-height: 1.4;
  letter-spacing: 0.01em;
}

/* Node positions: 6 nodes equally spaced around a circle (r=215px) */
/* top (270°), top-right (330°), bottom-right (30°), bottom (90°), bottom-left (150°), top-left (210°) */
/* centre of container: 290px × 290px */
/* transform: translate(-50%, -50%) so we position the centre of the node */
.sn-1 { top: calc(290px - 215px - 74px); left: calc(290px + 0px    - 74px); } /* 12 o'clock */
.sn-2 { top: calc(290px - 107px - 74px); left: calc(290px + 186px  - 74px); } /* 2 o'clock  */
.sn-3 { top: calc(290px + 107px - 74px); left: calc(290px + 186px  - 74px); } /* 4 o'clock  */
.sn-4 { top: calc(290px + 215px - 74px); left: calc(290px + 0px    - 74px); } /* 6 o'clock  */
.sn-5 { top: calc(290px + 107px - 74px); left: calc(290px - 186px  - 74px); } /* 8 o'clock  */
.sn-6 { top: calc(290px - 107px - 74px); left: calc(290px - 186px  - 74px); } /* 10 o'clock */

/* ── BOTTOM CTA STRIP ── */
.change-cta-strip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.change-cta-label {
  font-size: 13px;
  color: #9AABB8;
  letter-spacing: 0.04em;
}
.change-cta-label strong { color: #0F1F35; font-weight: 700; }

@media (max-width: 700px) {
  /* Spokes — at 700px still use circular layout, flat grid kicks in at 640px */
  .spokes-container { width: 340px; height: 340px; }
  .spoke-centre { width: 96px; height: 96px; }
  .spoke-centre-label { font-size: 13px; }
  .spoke-node { width: 96px; padding: 10px 10px; }
  .spoke-node-title { font-size: 10px; }
  .spoke-node-icon { width: 24px; height: 24px; margin-bottom: 6px; }
  .sn-1 { top: calc(170px - 130px - 48px); left: calc(170px + 0px   - 48px); }
  .sn-2 { top: calc(170px - 65px  - 48px); left: calc(170px + 113px - 48px); }
  .sn-3 { top: calc(170px + 65px  - 48px); left: calc(170px + 113px - 48px); }
  .sn-4 { top: calc(170px + 130px - 48px); left: calc(170px + 0px   - 48px); }
  .sn-5 { top: calc(170px + 65px  - 48px); left: calc(170px - 113px - 48px); }
  .sn-6 { top: calc(170px - 65px  - 48px); left: calc(170px - 113px - 48px); }
  .ba-table { grid-template-columns: 1fr; }
  .ba-divider { display: none; }
  .ba-col-before { border-radius: 14px 14px 0 0; }
  .ba-col-after  { border-radius: 0 0 14px 14px; }
  .ba-cell { text-align: center; }
}
</style>

<section class="change-section">
  <div class="change-inner">

    <!-- EYEBROW -->
    <div class="change-eyebrow">What Will Change After 19 April</div>

    <!-- HEADLINE -->
    <h2 class="change-headline">
      From Instinctive Communication
      <em>To Structured Authority</em>
    </h2>

    <p class="change-sub">
      The CHCP transformation in concrete terms — not aspirational language, but the three measurable shifts the system is built to produce.
    </p>

    <!-- ── BEFORE / AFTER TABLE ── -->
    <div class="ba-table">

      <!-- BEFORE -->
      <div class="ba-col ba-col-before">
        <div class="ba-header">
          <span class="ba-header-dot"></span>
          The Old You
        </div>
        <div class="ba-cell">
          <span class="ba-cell-icon"><svg viewBox="0 0 12 12"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg></span>
          Handling communication instinctively — no system, no structure
        </div>
        <div class="ba-cell">
          <span class="ba-cell-icon"><svg viewBox="0 0 12 12"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg></span>
          Facing repeated complaints and escalations despite doing everything right
        </div>
        <div class="ba-cell">
          <span class="ba-cell-icon"><svg viewBox="0 0 12 12"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg></span>
          High stress, low control — reacting to situations instead of leading them
        </div>
        <div class="ba-cell">
          <span class="ba-cell-icon"><svg viewBox="0 0 12 12"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg></span>
          Escalations, family complaints, documentation gaps — no framework to prevent them
        </div>
        <div class="ba-cell" style="border-bottom:none;">
          <span class="ba-cell-icon"><svg viewBox="0 0 12 12"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg></span>
          Communication seen as a personality trait — either you have it or you don't
        </div>
      </div>

      <!-- DIVIDER -->
      <div class="ba-divider">
        <div class="ba-divider-header"></div>
        <div class="ba-divider-cell">
          <div class="ba-arrow"><svg viewBox="0 0 14 14"><line x1="2" y1="7" x2="12" y2="7"/><polyline points="8,3 12,7 8,11"/></svg></div>
        </div>
        <div class="ba-divider-cell">
          <div class="ba-arrow"><svg viewBox="0 0 14 14"><line x1="2" y1="7" x2="12" y2="7"/><polyline points="8,3 12,7 8,11"/></svg></div>
        </div>
        <div class="ba-divider-cell">
          <div class="ba-arrow"><svg viewBox="0 0 14 14"><line x1="2" y1="7" x2="12" y2="7"/><polyline points="8,3 12,7 8,11"/></svg></div>
        </div>
        <div class="ba-divider-cell">
          <div class="ba-arrow"><svg viewBox="0 0 14 14"><line x1="2" y1="7" x2="12" y2="7"/><polyline points="8,3 12,7 8,11"/></svg></div>
        </div>
        <div class="ba-divider-cell" style="border-bottom:none;">
          <div class="ba-arrow"><svg viewBox="0 0 14 14"><line x1="2" y1="7" x2="12" y2="7"/><polyline points="8,3 12,7 8,11"/></svg></div>
        </div>
      </div>

      <!-- AFTER -->
      <div class="ba-col ba-col-after">
        <div class="ba-header">
          <span class="ba-header-dot"></span>
          The New You
        </div>
        <div class="ba-cell">
          <span class="ba-cell-icon"><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></span>
          Structured communicator — every difficult situation has a framework
        </div>
        <div class="ba-cell">
          <span class="ba-cell-icon"><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></span>
          Reduced complaints and escalations — you see breakdowns before they happen
        </div>
        <div class="ba-cell">
          <span class="ba-cell-icon"><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></span>
          Higher authority, clarity, and confidence — leading situations instead of surviving them
        </div>
        <div class="ba-cell">
          <span class="ba-cell-icon"><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></span>
          Documented communication competence — defensible in healthcare and legal contexts
        </div>
        <div class="ba-cell" style="border-bottom:none;">
          <span class="ba-cell-icon"><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></span>
          Communication as system infrastructure — a skill you built, not a trait you were born with
        </div>
      </div>

    </div>

    <!-- ── SPOKE DIAGRAM ── -->
    <div class="spokes-container" id="spokesWrap">

      <!-- SVG connector lines -->
      <svg class="spokes-svg" id="spokesSVG" viewBox="0 0 580 580" xmlns="http://www.w3.org/2000/svg">
        <!-- Lines from centre (290,290) to each node centre -->
        <!-- sn-1: (290, 75+74=1 node centre Y=75+37=112) → (290,112) -->
        <line x1="290" y1="290" x2="290" y2="112"  stroke="rgba(20,184,126,0.2)" stroke-width="1.5" stroke-dasharray="4 4"/>
        <line x1="290" y1="290" x2="476" y2="183"  stroke="rgba(20,184,126,0.2)" stroke-width="1.5" stroke-dasharray="4 4"/>
        <line x1="290" y1="290" x2="476" y2="397"  stroke="rgba(20,184,126,0.2)" stroke-width="1.5" stroke-dasharray="4 4"/>
        <line x1="290" y1="290" x2="290" y2="468"  stroke="rgba(20,184,126,0.2)" stroke-width="1.5" stroke-dasharray="4 4"/>
        <line x1="290" y1="290" x2="104" y2="397"  stroke="rgba(20,184,126,0.2)" stroke-width="1.5" stroke-dasharray="4 4"/>
        <line x1="290" y1="290" x2="104" y2="183"  stroke="rgba(20,184,126,0.2)" stroke-width="1.5" stroke-dasharray="4 4"/>
      </svg>

      <!-- Centre -->
      <div class="spoke-centre">
        <div class="spoke-centre-label">Structured<br>Authority</div>
        <div class="spoke-centre-sub">The New You</div>
      </div>

      <!-- Node 1 — top -->
      <div class="spoke-node sn-1">
        <div class="spoke-node-icon">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </div>
        <div class="spoke-node-title">See Breakdowns Before They Become Complaints</div>
      </div>

      <!-- Node 2 — top-right -->
      <div class="spoke-node sn-2">
        <div class="spoke-node-icon">
          <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        </div>
        <div class="spoke-node-title">Run Structured Handovers & Close Communication Loops</div>
      </div>

      <!-- Node 3 — bottom-right -->
      <div class="spoke-node sn-3">
        <div class="spoke-node-icon">
          <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
        </div>
        <div class="spoke-node-title">Handle High-Emotion Patient & Family Conversations</div>
      </div>

      <!-- Node 4 — bottom -->
      <div class="spoke-node sn-4">
        <div class="spoke-node-icon">
          <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
        </div>
        <div class="spoke-node-title">Speak Up Across Hierarchy Without Damaging Relationships</div>
      </div>

      <!-- Node 5 — bottom-left -->
      <div class="spoke-node sn-5">
        <div class="spoke-node-icon">
          <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div class="spoke-node-title">Communicate With Legal & Documented Defensibility</div>
      </div>

      <!-- Node 6 — top-left -->
      <div class="spoke-node sn-6">
        <div class="spoke-node-icon">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="spoke-node-title">Lead Crisis Communication Instead of Reacting to It</div>
      </div>

    </div>

    <!-- CTA STRIP -->
    <div class="change-cta-strip">
      <p class="change-cta-label">One 3-hour session. <strong>All six outcomes. FREE.</strong></p>
      <a href="javascript:void(0)" class="btn-cta" style="max-width:420px; background:var(--teal2);" onclick="openPopup()">
        Reserve My FREE Seat
        <svg viewBox="0 0 18 18"><line x1="3" y1="9" x2="15" y2="9"/><polyline points="10,4 15,9 10,14"/></svg>
      </a>
      <p style="font-size:12px; color:#A0B0BC; margin-top:4px;">Live Zoom · 3 Hours · FREE · 19th April · 3:00 PM IST</p>
    </div>

  </div>
</section>

<style>
/* ══════════════════════════════════════════════
   MEET YOUR MENTOR — REDESIGNED WITH PHOTO
══════════════════════════════════════════════ */
.mentor-section {
  position: relative;
  background: #111820;
  overflow: hidden;
  z-index: 1;
}

/* ── TICKER STRIP ── */
.mentor-ticker {
  width: 100%;
  background: rgba(20,184,126,0.07);
  border-bottom: 1px solid rgba(20,184,126,0.12);
  padding: 10px 0;
  overflow: hidden;
  position: relative;
  z-index: 2;
}
.mentor-ticker-track {
  display: flex;
  animation: tickerScroll 32s linear infinite;
  white-space: nowrap;
}
.mentor-ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 36px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--teal);
  flex-shrink: 0;
}
.mentor-ticker-sep { color: rgba(20,184,126,0.3); }
@keyframes tickerScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* ── MAIN SPLIT ── */
.mentor-split {
  display: grid;
  grid-template-columns: 48% 52%;
  min-height: 720px;
  position: relative;
  z-index: 1;
  max-width: 1300px;
  margin: 0 auto;
}

/* ══════════════════
   LEFT — PHOTO PANEL
══════════════════ */
.mentor-photo-panel {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

/* The actual photo */
.mentor-photo-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: grayscale(12%) contrast(1.05);
}

/* Dark gradient overlay — bottom and right edge */
.mentor-photo-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg,
      rgba(17,24,32,0.08) 0%,
      rgba(17,24,32,0.0) 35%,
      rgba(17,24,32,0.55) 70%,
      rgba(17,24,32,0.95) 100%
    ),
    linear-gradient(90deg,
      transparent 55%,
      rgba(17,24,32,0.9) 100%
    );
  z-index: 1;
}

/* Teal accent bar — left edge */
.mentor-photo-bar {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, var(--teal) 0%, rgba(20,184,126,0.15) 70%, transparent 100%);
  z-index: 3;
}

/* Corner frame lines */
.mentor-photo-corner-tl {
  position: absolute;
  top: 28px; left: 20px;
  width: 44px; height: 44px;
  border-top: 2px solid rgba(20,184,126,0.45);
  border-left: 2px solid rgba(20,184,126,0.45);
  z-index: 3;
}
.mentor-photo-corner-br {
  position: absolute;
  bottom: 28px; right: 0;
  width: 44px; height: 44px;
  border-bottom: 2px solid rgba(20,184,126,0.25);
  border-right: 2px solid rgba(20,184,126,0.25);
  z-index: 3;
}

/* Floating stat badge — top right of photo */
.mentor-stat-badge {
  position: absolute;
  top: 36px; right: 20px;
  z-index: 4;
  background: rgba(17,24,32,0.82);
  border: 1px solid rgba(20,184,126,0.22);
  border-radius: 10px;
  padding: 14px 20px;
  text-align: center;
  backdrop-filter: blur(10px);
}
.mentor-stat-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 38px;
  line-height: 1;
  color: var(--teal);
  letter-spacing: 0.04em;
}
.mentor-stat-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.38);
  margin-top: 4px;
  line-height: 1.4;
}

/* Name block floating bottom-left */
.mentor-name-block {
  position: relative;
  z-index: 4;
  padding: 0 28px 40px 24px;
}
.mentor-name-first {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(42px, 5vw, 68px);
  letter-spacing: 0.04em;
  color: #fff;
  line-height: 0.9;
  text-transform: uppercase;
  text-shadow: 0 4px 32px rgba(0,0,0,0.6);
  display: block;
}
.mentor-name-last {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(42px, 5vw, 68px);
  letter-spacing: 0.04em;
  color: var(--teal);
  line-height: 0.9;
  text-transform: uppercase;
  text-shadow: 0 4px 32px rgba(0,0,0,0.4);
  display: block;
}
.mentor-name-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 14px;
  background: rgba(20,184,126,0.12);
  border: 1px solid rgba(20,184,126,0.28);
  padding: 5px 14px;
  border-radius: 100px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #80EABE;
}
.mentor-name-pill-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--teal);
  animation: blink 2s infinite;
}

/* ══════════════════
   RIGHT — CONTENT
══════════════════ */
.mentor-content {
  padding: 72px 60px 72px 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}
.mentor-content::before {
  content: '';
  position: absolute;
  top: -100px; right: -100px;
  width: 420px; height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(20,184,126,0.06) 0%, transparent 70%);
  pointer-events: none;
}

.mentor-eyebrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--teal);
  margin-bottom: 28px;
}
.mentor-eyebrow-line {
  width: 24px; height: 1px;
  background: var(--teal);
  opacity: 0.5;
}

.mentor-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(36px, 4vw, 56px);
  line-height: 0.94;
  letter-spacing: 0.02em;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.mentor-headline-em {
  display: block;
  font-family: 'Barlow', sans-serif;
  font-size: clamp(22px, 2.6vw, 36px);
  font-weight: 800;
  font-style: italic;
  color: var(--teal);
  line-height: 1.15;
  margin-bottom: 36px;
}

/* Bio */
.mentor-bio { display: flex; flex-direction: column; gap: 0; margin-bottom: 36px; }
.mentor-bio-para {
  font-size: 13.5px;
  color: rgba(255,255,255,0.5);
  line-height: 1.82;
  padding: 15px 0 15px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  position: relative;
  transition: color 0.25s;
}
.mentor-bio-para::before {
  content: '';
  position: absolute;
  left: 0; top: 50%;
  transform: translateY(-50%);
  width: 3px; height: 0;
  background: var(--teal);
  border-radius: 2px;
  transition: height 0.35s ease;
}
.mentor-bio-para:hover::before { height: 55%; }
.mentor-bio-para:hover { color: rgba(255,255,255,0.78); }
.mentor-bio-para em { font-style: normal; color: rgba(255,255,255,0.88); font-weight: 600; }

/* ── MENTOR HOOK / STORY / RESOLUTION ── */
.mentor-hook {
  font-size: 15px;
  font-style: italic;
  color: var(--teal);
  line-height: 1.6;
  border-top: 2px solid rgba(20,184,126,0.4);
  border-bottom: 2px solid rgba(20,184,126,0.4);
  padding: 14px 0;
  margin-bottom: 28px;
  opacity: 0.9;
  text-align: center;
  max-width: 480px;
  align-self: center;
}

.mentor-story {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 24px;
  width: 100%;
}

.mentor-moment {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 14px;
  align-items: flex-start;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.mentor-moment:last-child { border-bottom: none; }

.mentor-moment-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  color: var(--teal);
  line-height: 1;
  padding-top: 2px;
}

.mentor-moment-body {
  font-size: 13.5px;
  color: rgba(255,255,255,0.6);
  line-height: 1.65;
  text-align: left;
}
.mentor-moment-body strong {
  display: block;
  font-size: 14.5px;
  color: rgba(255,255,255,0.92);
  margin-bottom: 4px;
}
.mentor-moment-body em {
  font-style: normal;
  color: rgba(255,255,255,0.82);
  font-weight: 500;
}

.mentor-resolution {
  font-size: 13.5px;
  color: rgba(255,255,255,0.55);
  line-height: 1.7;
  background: rgba(20,184,126,0.06);
  border: 1px solid rgba(20,184,126,0.15);
  border-radius: 8px;
  padding: 16px 18px;
  margin-bottom: 28px;
  text-align: center;
  width: 100%;
}
.mentor-resolution strong {
  color: rgba(255,255,255,0.9);
}
.mentor-resolution em {
  font-style: normal;
  color: var(--teal);
  font-weight: 500;
}

/* Credential row — horizontal strip */
.mentor-cred-strip {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 40px;
}
.mentor-cred-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 8px;
  padding: 9px 14px;
  font-size: 11.5px;
  font-weight: 600;
  color: rgba(255,255,255,0.6);
  transition: border-color 0.2s, color 0.2s, background 0.2s;
  cursor: default;
}
.mentor-cred-chip:hover {
  border-color: rgba(20,184,126,0.3);
  color: rgba(255,255,255,0.88);
  background: rgba(20,184,126,0.05);
}
.mentor-cred-chip-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--teal);
  flex-shrink: 0;
  opacity: 0.7;
}

/* CTA */
.mentor-cta-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}
.mentor-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--teal);
  color: #fff;
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 16px 32px;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.2s;
  white-space: nowrap;
}
.mentor-cta-btn:hover { background: #10D48E; }
.mentor-cta-btn svg { width: 16px; height: 16px; stroke: #fff; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }

.mentor-cta-note {
  font-size: 12px;
  color: #3A5060;
  line-height: 1.65;
  text-align: center;
}
.mentor-cta-note strong { color: rgba(255,255,255,0.45); font-weight: 600; }

@media (max-width: 860px) {
  .mentor-split { grid-template-columns: 1fr; }
  .mentor-photo-panel { min-height: 420px; }
  .mentor-content { padding: 52px 28px 60px; }
  .mentor-photo-overlay {
    background: linear-gradient(180deg, rgba(17,24,32,0) 0%, rgba(17,24,32,0.5) 60%, rgba(17,24,32,0.97) 100%);
  }
}
</style>

<!-- ══════════════════════════════════════════════
     MEET YOUR MENTOR — WITH REAL PHOTO
══════════════════════════════════════════════ -->
<section class="mentor-section">

  <!-- CREDENTIAL TICKER -->
  <div class="mentor-ticker">
    <div class="mentor-ticker-track">
      <span class="mentor-ticker-item">CEO — Mitra Fertility <span class="mentor-ticker-sep">·</span></span>
      <span class="mentor-ticker-item">ISB &amp; IIM Alumna <span class="mentor-ticker-sep">·</span></span>
      <span class="mentor-ticker-item">20+ Years Healthcare &amp; Client Relationship Experience <span class="mentor-ticker-sep">·</span></span>
      <span class="mentor-ticker-item">Marks &amp; Spencer Finance · British Telecom <span class="mentor-ticker-sep">·</span></span>
      <span class="mentor-ticker-item">Founder — CHCP Programme <span class="mentor-ticker-sep">·</span></span>
      <span class="mentor-ticker-item">Healthcare Communication Specialist <span class="mentor-ticker-sep">·</span></span>
      <span class="mentor-ticker-item">CEO — Mitra Fertility <span class="mentor-ticker-sep">·</span></span>
      <span class="mentor-ticker-item">ISB &amp; IIM Alumna <span class="mentor-ticker-sep">·</span></span>
      <span class="mentor-ticker-item">20+ Years Healthcare &amp; Client Relationship Experience <span class="mentor-ticker-sep">·</span></span>
      <span class="mentor-ticker-item">Marks &amp; Spencer Finance · British Telecom <span class="mentor-ticker-sep">·</span></span>
      <span class="mentor-ticker-item">Founder — CHCP Programme <span class="mentor-ticker-sep">·</span></span>
      <span class="mentor-ticker-item">Healthcare Communication Specialist <span class="mentor-ticker-sep">·</span></span>
    </div>
  </div>

  <div class="mentor-split">

    <!-- LEFT — PHOTO -->
    <div class="mentor-photo-panel">
      <img class="mentor-photo-img" src="data:image/jpeg;base64,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sk6crc0ASwyQu8DS0xnpyNWWMzWOU0l5ry6c+1DVAApCgEKAAgsAAg5Q59swl2EaDNKtCQgFUM0FCwNYC0iUMhZQQAEJZksQM9SVQlKdCQKyDMDQLAuAlEmhc0NBLkGikCYDpROdF0DAhSgqgkC4C0NaLLQgIJZkJyLn6w6cgssBAkAC6BzIugcTDdOMczrZTdAAAAsAACggAID/2gAMAwEAAgADAAAAIXNKEMAHPPPPMMAMDAlhju//AP8Azo99h/7XD3+++YwUeBEkI8gAEEM+CCCCG+vP/wD/AP8Att/NNNF9999NNJsU+QSIM884gAwAAA088+//APvv0wKVeQVf/wDvPLKqwznglRRTAABQT4444777/wD/AP8A/wD/APef/ffffffffffUaMnPPPMIAAAAAAAAAPPYwvvr0x1AAQQUwQwwzgFDKXOfCPABDPKAksttvvvvx/8A/wD9/rjBRBBB9999999dCC84gAAAMEAAAA08A+DD++jDf8BBVRDzr/8A/usMJMTTHOIEPAAAvggvvvvrg44QQQwwQSQQQfQdcfffbQgvgAABHPAAMDPPPAUQwwg0/wD/AMtJBVDD3/8A+pzOJHsYRfPAEAAAAAgvvrvkw4/fQQwyQQXQQQQQQVffffjuAAAMFPPFPPPPPMQQQz3/AP8A/wDPaSxy1/4xz0QBECZcccefDDAAAgrvusowww/fcXXzXfVfbffffQQffQPggBODfPPPPPPIPAQQQ6y//wDv30GNW9/8d+u3VyxqSHm0lzBCww47b6KMMMMHEF33333333330EV0l30D4ABSiNzzzzzzgAAEEEJYL/8AD19DHf8Aww/440+mIMitYVGNIBOstqgsswww73/fffffffffffQQQfYVfRvgAPPPqMIPPIAAPCQQR33/AP8AD9VDX/7vH7DX/ok04QgI2mkwQCmW+uOODDD/AP8A/wD9999999999BBBBBBBqCAICCakAAAgAAA88Jd//wD/AOMPwG1/+Mf++c9Op6vWFBRyzYBj4oLL777776sr/wB//wD/AH3333330H0EEEEAADz77zADQAABTzz313//APjDDoBhBrDH7fJ5X29wyMK9gUmckKi2KCC++++//wD/AP8A99V999999JBBBBBBAAc84AfIAAAAAAA8999//wCwww6AYf8A8NPfcOw8Y8e+PqI2j2VH3L5aIL7777//AP8A/faVfSffTTTTTXQQQQAAvPFv6AAAAAAAAPfffwwwww6Vff8A8N8NeE7L28BonMM2RGHUrBTIoL7777//AP8A/fcfbRfffXffeZRQQYBHvAAiqAAAAAAOPPfffQwwww6Qcd/wxw39mKe//AsUN2s3feZcaItotvvhv/8A/mE0HVEH33333332kkEBTzwIICAAAAAACzyD3330MMMekWP/APD/AKyTc8VMnPyKQJQyVfdZQIkilvvv/wD/AN/JpBBd999999999hBBA++oGCCAAAAAA0885xhBBDDDXpB3BrT/AKzBgVj1f/XhpZGqUcXVl7Iigvv/AP8A9/8AeaQQcQUfffffffbQQQFInvggAAHAAGPPIAAQQQwww+6Qcfww350Ft/qBGX32nuQvyfOZo8oritvqu/8A/wBpBBBBBBdJ999999BBCCC+A+AQc8QU88AAAABDDDDDrIBBvDv371WHCFbflBSaqFJ824W8Wi+K+q//AP8A/wBlhBBBdd99999999tJqCC++6AA888w88AAAABDDDDD/wDAQfw5/wDs/bwFRi7zJ9T7yfDhK4S56oLr/wD/APffdaQdfffefffffffffQkvvsgsAPMNPPPPAAQAAQwww/6QSf8Af/8ALXt/xDY7PkdXf3t5geivHqiC/DD/APf/AH20EHXHEFH33333330oLqZ44IAARTzzzwAEAAEEEMP6kH/9P9Md+0c3nLA/tiQndswE7qpoY5b7+/33/wBxBBBB9d9BV9999999CC+y2+CsM888888ABAABBBDD/pBB/DXjXiUyTotiPiXIgGf+blmW2CiW/wD/AP8A9/8A6QQQRfQffbffffffeQwrvvvrvPPPPPPPPAAAAAAAd/oQVfw6yw8qXV9r0wCdH1HTJZQdnhgSlvt//wD/AP8A7QQQQQQcXffdbXfYRQwvvgvrnvPPMPPPAAAQAAQAX+gQf/64/wCNKy4Z3lzTqu0S8r5l37YpaZ77/wD/AP8A/wD9rDBBBB91999999JVDCqSu++C888M888EJAAAAAD/AKgV/wD+Nf8Ard0KRwMRBj5N9Uy1VPgSCKC+6X//APfffawwQXfffffffffaVQgqgAnvlvPPPPPPFCQQAAAA/wCoFf8A/DH73/CAD7KWggVj55yo9MMhKqC+iz//APfffYQQXfffQUffffffVQgpgBPtgPPPOPPPPAAAAQwAf6gV/wD/ALDnf3mTb5UZhRFtGFgz9WfUACO+DDThR99xtBBV99pNN9999999KCqA++CE888A88w8AJABABBBqBB3/wDwwwQVThi4LP5+ned7dpzMpJOtiz7zwwdQUaQQQQffffffffdfeRqqgnvglPPPAAAAPAAAAQQQf6wU/wCsP8oMNuOpsdPErEJ4qbF82zDi/MMPP88FX0G0EEX3333333313m0Ib4567oDbzwAADzgAAEMEAP8AGtLTjDXqDfeD9W99vsBOHOoYEDv8WqS73PD3pBBB9JBB999999999991CW++++CA88oAA88wAJJBBBFje/8A7xzyzx6/rqw2g7lOph1gk8KVma10tr2/y9SQffYQQRfffffffffeVQgvvvvggPPAgEIAAAKUVfTYX4go89/7wQ66o96ppbG8PwZwUe4w9Px6jfXAdy9ydfbQQfffffffffffVQhvvtsghvPDAFPAAHNdcccW4wuiWqgw6QdwwywoY/xXmRn+xsho1pk/bWao8dw+QffbTTRfffffffffcQhvvvvggvAAgPOMMBCZfc+gM5CxsPIgcTVQ0aXl2UIzzUxFKGonV3w8Ym6iHUQUzdfWfffffffffffaVQgtvvvjhPAHvoDMcYfobgc+NWWjZb/6BB2rs3VeHmt+F74RqEWfcqPuncZTgECU/UffffdffffffcfaVQwgvvvqvuBOgBZwxx/rggghsjnjgEmVccuMb659xTQ9t+AV+DNhHHHvRQTogVFez6dffffffffffbSQVQwhvvrrvglniJq/ikotjmvrNusjjI8arvMrxMxvdAYHuAExtercAICRgRMGRzGnFoVffcffXfffffTSVQwgtvvrvgnqNVnguggvsoPfAQRXZ/fTMGuOfroCWH4Nrz1XtQLoNSStrPethxwlZS9ffQVfffedcceQVQwxnvvqvgFKDVkmtlgggAAEDcdQW6VuSOkw085niXas6w5KM2EBXbssdPZk47tGeIBffQfffffQQQaQVQw1vvvoqgvhELiolqglqhggBDAW2XfkVxJkWnEpyW4V5P4CCldfUg2VNgCXahKFE7GcffffQQQQQQQQQQ3vvnnhvgtliExtv+3/AKra6BTz/cG0qqQW3SG1TEmsF7zvDDyC81h+6jAiF5az5oxS0FX3330EEEEEEEH/AO66yie+aaWLDbL/ADw2rvogGABKX/djV2Mnt3iVqUhTaL81g2ZdAXoeQceHWVjEN0NbbVffQQQQQQSRTWTAhDjvhiqmi34Uy172znjvhDPNyVbhQjDseoizVjYOECIwF/GRR2tvkgkrKiklt6leQQQfXaQRSQQQXRrKKMSLGpwqrAd02yT86togPuOV5Xfkf3H1pjkc1XvgNHD/AAOAmUd16K56a7p4YzJSn2kFEFEEF30UkX2uWdICWTbFxF7V0m0tP98cr7bQ9tX06XgbM4mecXyTE2hx+eAIgFLVEIob0GbLYpi8lX0kEEEFHX0E1kcxUd6jtMbL93Hz6BV1cebPboJ66tXEnPZYJbmPop73To7SzbzbUo/F3L65SmBpa64I4H320F300X33303iEiaI67w9guR45HfhJrBLMJ75OGkX1l7JMzlfPBVbSeO0A+EiCyGoCSzaZYbr4DQ6mlH33333333zzz95F+Rb2ZcffhYGXVJ4c9qqWaqYIP01mZ7sWsGHILzhCsL319ldhRDbvM4KrprL5yh2PUFXn333333zzzzUcB/+KrJWRyyY4GZ9m7iIP5v58Q/OlpN6fJfVDzyxxRgGWbVh0XiwZ0WNqcopJQx3bKkHXX33zzz3z/sZ6ZJiX2130YrWm31VlwGxp4wTjc/0NQS570lDDSzzh1rgWbSvxlRiz8bmGc46rSBwvt0lFHzzzzzz0gXyi9cLafQjkooYX2UrUNXTXG/Rl43nl1EbbRswQkIEGlOtF0UUlnchijNSG05IKx4Zy5i20E3z3zjz8Edi9PBV+ov4Ll0AP87oaOmihywq012MpbsnYNQ3CpITq2YjdVL071mHCjFH315KL54p5MrD20FHzzzjMesBiCHk/kWbo5anRwkv9r5mkkgRAXHENqGm7qVH+CjiMOnxIrbL5kFSV3YW3CDSb6QIf4UDT0QEUEE1zgx1wMLwD8ABwABx+N7718J12KJwOD50N56P759/yBx+Dx+Dz55152H+J4EIFzwABx+N772EF331330OECD/2gAMAwEAAgADAAAAEJtrnljoDggDAEPcMT628yjMNMbvzYzIBABP/wBfDAuJw2GUwTyrbIAYwzzoJPM8888yz8wwwT0AADBABk9xozbA5aqILAAAAkW0OK5MOxAH9fsdaxzzzPOvvNICTVEHBTxJIjDDDAQz/wD/AP8A/wD/APOP/PPPfQAAAAAGH8IgjhsogvgDDDPPPOYIg/zzkGLqg/70B0HPM3Scji+BXDLCMDqgEMBBPPPPx/8A/wD8/rjERAAA8888MMIUE8W6iOOUia8888I9B/CC/wD5voQvyq7wNAABA0ww/wDYCG3iFlwIIBxzzzzzy4OOAAAMMADQkwnwTTD7yxrzxwIL7qIL7w7AQwwBAKINa4IMJOf+tzUiA7vJcvO2gBgEEBAIIILzzzyzxMOMhQAc/TzyD0L3331b77yjBoIJ46oIKgAATzzAAw4IIIL9I8MhCSwCADLh+8dY4zzhgz774ozyzzziMMMPTzCCPywmkFEEEEH6774IgAJobcIIITzzyDwBTz5bYJflPOuBZAAxiQrhb+NnPQBTxHprL6DDzyKMMMOzADz33333330EH7oHZ74Lw56pYyIoZywzgB0Dzz+v96kEvuAiQAA4eOKoM8kJlbgnGVvuXwQgDDMM/wDTj99999999999B+++Bee+E82+W+kqyi88gAAB088+u++/BfXw4gAs7btU5AqGWnXZpohwvOS8kQAAP/8A4w99/fffffffQQfvvvvrirNDtlPILgggoAAAQQdIHvvv439g2pLIEg6ZE+uMSCGf8/4NrFlhvoHDCAAAF9k/c09/ffffQQQfgfvvoNvvgjDMugtgAAKQQQAIPvvow/4g4w6QgBeWtelg/CKLyq4phMn4T97AOAAAOx613/fVffffQRdvvvvvrlvogkgqKgggAAABXQAAPvugw3wg48PHqARMQLAt5zYq7fpkY+UIFQ3iOIAAKww3/faVfSffcMsssoPvvntlAvlAPqwgAADPPRCAFggx/wD8tdYDT6P1n9G+jNMiaCGorZ8tbWevaigAACtsP/33H20X0IKIIIZjj77bqRIITyoAAAwzxkBzzxwLP/8A/DDnc8+51pK5UHGdkgCM9tbyPjmZFmegAA6rbf5hNB1RB9CCCCCCCW2+WqCGE8KgCCe888tAh8888S3/AOQx3BPNgowUERia/X/zd5bfc984t/UtlAAg6z/fyaQQXfSAAgggggnvvllPAhPCAgjvvPCAAOMIAAP/AP8ApbDJDomGudEwBdecTZB5R0xrn/DAqi2ooTT79795pFBxBR9OOKCCCS++eqc08QCmei88kAAhdIAAe/8A/wAUMPP0ASKKWNT+F4wtRQIhgCeAn4b6ZKCAJYfvP2kEmEFEEgn6IIIIL74BTxQLx66IKygAAFX30AL7f/8AViDDtFsI+ZWVKF1KD0R3FA+cywqMQjKggWb7Pv8AZYYcQXnPDvrggggktqvPFPOPvAgkjADBfffSPvv/AP8ABerD9V6OSpKqwyDEJPNxDbYf+hcIISWoG7D/APfeaKQdLvvuvvvrjjigggBgFMEDtgvvglPPfePfaAvv/wBUMMv2EI+svFALDdNtUg6TT2VE1aJd56jP/wDz9z99tBBUwwNS++++O+CCIUAkcM8686o+qE89o99gAA+/MDD99FD46Rv3su9BKo2+FdO10yafGqy8CHbA9/8AcRTTfQYQTlvvvvugggFtMNPEEtvvvjPPPaPfQCPH/wBFcMP32iKoPUq6TqPVPi6aykHevaVpaoIeMv8A9/8A6QQQWQbfvrvvvvvghr3rPPPLAlvvlvPPPffffffcC6Cw1/YXivtDZJKKoLsxHT9a4EWxYEvYlAiw69/97QUQRdTcnvvtrnunuv8AxTwTyyA577L7zx33T33j0COyOP32jbbPkJOq4Q1jfY1eRj/s0eU4JogIMOu8N/2sMEEEH7b77776Lar/AMoQs88UCW+O+885099999CD8DV99kqCrYfFkxLgom+icbojPnX76e+omrH/APfffawxSXvvvvvvvuolqlvKAjHPKBnvvvPPKdMPfffSg/C1ffQOhm/+YO2ha3nYaxnWmXSsDAvuqHh0/wD3332EEFzz74JL774Y4KpbgwIbzRZLb7r7zz3332AL3wPwNX33hJqIpkzRO7djnJkaTS3Eapi8qwDvONyz3wy0EFT76o4777774IIoAgLzwzoL74L7zLznj0D3BT3wMPX3wJLwCFZhgIZikiaC/msQBV1Wyws+88PwjyykGkEH77777677YIbioARzzypL74IIILz330AAAAMm/wB9pC+biiefbFYMMXEEjub3R5getxDzzP3P8o98tBhE6iS++e++2eGSG4cMcs4+c++CCC8499A6A9WXYb1R9mSjCafW9LEnr/cTju3iF05Ut0iX7Pz7oU889JBBKC+6C6W6SiCKWow888c+e+qCC+8wB0UMc8YDEBNR5yCeG9/vL3asM/O1EIR8YnOOuiN6qjzb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" alt="Smitha Chowdary Kankanala speaking at a healthcare leadership event">
      <div class="mentor-photo-overlay"></div>
      <div class="mentor-photo-bar"></div>
      <div class="mentor-photo-corner-tl"></div>
      <div class="mentor-photo-corner-br"></div>

      <!-- Floating badge -->
      <div class="mentor-stat-badge">
        <div class="mentor-stat-num">20+</div>
        <div class="mentor-stat-label">Years of<br>Healthcare Leadership</div>
      </div>

      <!-- Name over image -->
      <div class="mentor-name-block">
        <span class="mentor-name-first">Smitha Chowdary</span>
        <span class="mentor-name-last">Kankanala</span>
        <div class="mentor-name-pill">
          <span class="mentor-name-pill-dot"></span>
          CEO, Mitra Fertility · ISB &amp; IIM Alumna
        </div>
      </div>
    </div>

    <!-- RIGHT — CONTENT -->
    <div class="mentor-content">

      <div class="mentor-eyebrow">
        <span class="mentor-eyebrow-line"></span>
        Meet Your Mentor
        <span class="mentor-eyebrow-line"></span>
      </div>

      <h2 class="mentor-headline">
        The System Came From
        <em class="mentor-headline-em">Two Decades In The Room</em>
      </h2>

      <!-- Pull-quote hook -->
      <div class="mentor-hook">
        &ldquo;Every difficult conversation has a structure.<br>
        Miss the structure &mdash; and the conversation fails.&rdquo;
      </div>

      <!-- Story moments -->
      <div class="mentor-story">
        <div class="mentor-moment">
          <div class="mentor-moment-num">01</div>
          <div class="mentor-moment-body">
            <strong>A decade in UK.</strong> British Telecom. Marks &amp; Spencer Finance. High-stakes client conversations, daily. That&apos;s where she first saw it: structure determines outcome — every single time.
          </div>
        </div>
        <div class="mentor-moment">
          <div class="mentor-moment-num">02</div>
          <div class="mentor-moment-body">
            <strong>Back in India. The stakes were higher.</strong> A family over-reassured. A clinician who knew exactly what to do — but couldn&apos;t communicate it under pressure. No lack of skill. No lack of intent. <em>Something was breaking in between.</em>
          </div>
        </div>
        <div class="mentor-moment">
          <div class="mentor-moment-num">03</div>
          <div class="mentor-moment-body">
            <strong>Two decades confirmed it.</strong> Healthcare communication isn&apos;t instinct. It isn&apos;t personality. It&apos;s a professional competency with structure — and almost no one in India was teaching it properly.
          </div>
        </div>
      </div>

      <!-- Resolution -->
      <div class="mentor-resolution">
        So she built what she couldn&apos;t find. <strong>Certified Healthcare Professional Communication Programme</strong> &mdash; 8 weeks, portfolio-based, simulation-assessed. Not awareness. Not theory. <em>Applied capability that holds when it matters most.</em>
      </div>

      <!-- Credential chips -->
      <div class="mentor-cred-strip">
        <span class="mentor-cred-chip"><span class="mentor-cred-chip-dot"></span>CEO, Mitra Fertility</span>
        <span class="mentor-cred-chip"><span class="mentor-cred-chip-dot"></span>ISB &amp; IIM Alumna</span>
        <span class="mentor-cred-chip"><span class="mentor-cred-chip-dot"></span>20+ Years Healthcare &amp; Client Relationship Experience</span>
        <span class="mentor-cred-chip"><span class="mentor-cred-chip-dot"></span>M&amp;S Finance · British Telecom</span>
      </div>

      <div class="mentor-cta-row">
        <a href="javascript:void(0)" class="mentor-cta-btn" onclick="openPopup()">
          Learn From Smitha — FREE
          <svg viewBox="0 0 18 18"><line x1="3" y1="9" x2="15" y2="9"/><polyline points="10,4 15,9 10,14"/></svg>
        </a>
        <div class="mentor-cta-note">
          <strong>19 April · 3:00 PM IST</strong><br>
          Live Zoom · 3 Hours · FREE
        </div>
      </div>

    </div>
  </div>

</section>



<style>
/* ══════════════════════════════════════════════
   FAQ SECTION
══════════════════════════════════════════════ */
.faq-section {
  position: relative;
  background: #F2EFE9;
  padding: 120px 24px 130px;
  overflow: hidden;
  z-index: 1;
}

/* Faint diagonal hatching */
.faq-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    -55deg,
    rgba(14,138,95,0.025) 0px,
    rgba(14,138,95,0.025) 1px,
    transparent 1px,
    transparent 32px
  );
  pointer-events: none;
}

/* Glow top-right */
.faq-section::after {
  content: '';
  position: absolute;
  top: -120px; right: -120px;
  width: 480px; height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(14,138,95,0.07) 0%, transparent 65%);
  pointer-events: none;
}

.faq-inner {
  position: relative;
  z-index: 1;
  max-width: 860px;
  margin: 0 auto;
}

/* ── EYEBROW ── */
.faq-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--teal2);
  border: 1px solid rgba(14,138,95,0.22);
  background: rgba(14,138,95,0.06);
  padding: 6px 18px;
  border-radius: 100px;
  margin-bottom: 32px;
}

/* ── HEADLINE ── */
.faq-headline {
  font-family: 'Bebas Neue', Impact, sans-serif;
  font-size: clamp(40px, 6vw, 78px);
  line-height: 0.94;
  letter-spacing: 0.02em;
  color: #0F1F35;
  text-transform: uppercase;
  max-width: 720px;
  margin: 0 auto 16px;
  text-align: center;
}

.faq-sub {
  font-size: 15px;
  font-weight: 400;
  color: #8A9BAA;
  max-width: 480px;
  margin: 0 auto 72px;
  line-height: 1.7;
  text-align: center;
}

/* ── ACCORDION LIST ── */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 48px rgba(0,0,0,0.07);
}

.faq-item {
  background: #fff;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  transition: background 0.25s;
}
.faq-item:last-child { border-bottom: none; }
.faq-item.faq-open { background: #fff; }

/* Question row */
.faq-q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 26px 32px;
  cursor: pointer;
  user-select: none;
  position: relative;
}

/* Left teal indicator */
.faq-q::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--teal);
  opacity: 0;
  transition: opacity 0.25s;
  border-radius: 0 2px 2px 0;
}
.faq-item.faq-open .faq-q::before { opacity: 1; }

.faq-q-left {
  display: flex;
  align-items: center;
  gap: 18px;
  flex: 1;
}

/* Number */
.faq-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 13px;
  letter-spacing: 0.16em;
  color: rgba(20,184,126,0.45);
  flex-shrink: 0;
  min-width: 24px;
  transition: color 0.25s;
}
.faq-item.faq-open .faq-num { color: var(--teal); }

.faq-q-text {
  font-size: 15px;
  font-weight: 600;
  color: #0F1F35;
  line-height: 1.45;
  letter-spacing: 0.005em;
  text-align: left;
}
.faq-item.faq-open .faq-q-text { color: #0A1628; }

/* Toggle icon */
.faq-icon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.25s, border-color 0.25s, transform 0.35s ease;
}
.faq-item.faq-open .faq-icon {
  background: rgba(20,184,126,0.1);
  border-color: rgba(20,184,126,0.3);
  transform: rotate(45deg);
}
.faq-icon svg {
  width: 14px; height: 14px;
  stroke: #0F1F35;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  transition: stroke 0.25s;
}
.faq-item.faq-open .faq-icon svg { stroke: var(--teal2); }

/* Answer panel */
.faq-a {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.faq-item.faq-open .faq-a { max-height: 480px; }

.faq-a-inner {
  padding: 0 32px 28px 56px;
  font-size: 14px;
  font-weight: 400;
  color: #5A6A7A;
  line-height: 1.82;
  text-align: left;
}
.faq-a-inner strong { color: #0F1F35; font-weight: 700; }
.faq-a-inner em {
  font-style: normal;
  color: var(--teal2);
  font-weight: 600;
}

/* ── BOTTOM CTA ── */
.faq-cta-wrap {
  margin-top: 64px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.faq-cta-label {
  font-size: 14px;
  color: #8A9BAA;
}
.faq-cta-label strong { color: #0F1F35; }

@media (max-width: 640px) {
  .faq-q { padding: 22px 20px; }
  .faq-a-inner { padding: 0 20px 24px 44px; }
  .faq-headline { font-size: 40px; text-align: center; margin: 0 auto 16px; }
}

/* ══════════════════════════════════════════════
   STICKY CTA
══════════════════════════════════════════════ */
.sticky-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(11,16,23,0.95) 0%, rgba(17,27,39,0.98) 100%);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(20,184,126,0.2);
  box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
  z-index: 1000;
  transform: translateY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 12px 20px;
}

.sticky-cta.hidden {
  transform: translateY(100%);
}

.sticky-cta-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  gap: 16px;
}

.sticky-cta-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.sticky-cta-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 16px;
  letter-spacing: 0.04em;
  color: #fff;
  font-weight: 600;
  line-height: 1.2;
}

.sticky-cta-subtitle {
  font-size: 12px;
  color: #8FA3B3;
  font-weight: 500;
  line-height: 1.3;
}

.sticky-cta-subtitle #sticky-seat-count {
  background: #E74C3C;
  color: #fff;
  font-weight: 700;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  margin: 0 2px;
}

.sticky-cta-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--teal) 0%, #10D48E 100%);
  color: #fff;
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  border: none;
  border-radius: 6px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(20,184,126,0.3);
  flex-shrink: 0;
}

.sticky-cta-btn:hover {
  background: linear-gradient(135deg, #10D48E 0%, var(--teal) 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(20,184,126,0.4);
}

.sticky-cta-btn:active {
  transform: translateY(0);
}

.sticky-cta-btn svg {
  stroke: currentColor;
  flex-shrink: 0;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .sticky-cta {
    padding: 10px 16px;
  }
  
  .sticky-cta-content {
    gap: 12px;
  }
  
  .sticky-cta-title {
    font-size: 14px;
  }
  
  .sticky-cta-subtitle {
    font-size: 11px;
  }
  
  .sticky-cta-btn {
    font-size: 12px;
    padding: 10px 16px;
  }
}

/* Add bottom padding to body to prevent content overlap */
body {
  padding-bottom: 80px;
}

@media (max-width: 768px) {
  body {
    padding-bottom: 70px;
  }
  
  /* Ensure mobile text alignment consistency */
  .module-card,
  .module-card-wide,
  .who-grid,
  .ba-cell {
    text-align: center !important;
  }
}

/* ══════════════════════════════════════════════
   REGISTRATION POPUP
══════════════════════════════════════════════ */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  animation: fadeInOverlay 0.3s ease forwards;
}

@keyframes fadeInOverlay {
  to { opacity: 1; }
}

.popup-container {
  background: linear-gradient(135deg, #0B1017 0%, #111B26 100%);
  border: 1px solid rgba(20,184,126,0.2);
  border-radius: 12px;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  transform: scale(0.9) translateY(20px);
  animation: slideInPopup 0.3s ease forwards;
}

@keyframes slideInPopup {
  to {
    transform: scale(1) translateY(0);
  }
}

.popup-header {
  position: relative;
  padding: 24px 24px 16px;
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.popup-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 24px;
  letter-spacing: 0.04em;
  color: var(--teal);
  margin-bottom: 4px;
}

.popup-subtitle {
  font-size: 13px;
  color: #8FA3B3;
  font-weight: 500;
}

.popup-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 28px;
  color: #8FA3B3;
  cursor: pointer;
  line-height: 1;
  padding: 4px;
  transition: color 0.2s ease;
}

.popup-close:hover {
  color: #fff;
}

.popup-form {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 6px;
}

.form-group input,
.form-group select {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 6px;
  padding: 12px 14px;
  font-size: 14px;
  color: #fff;
  font-family: 'Barlow', sans-serif;
  transition: all 0.2s ease;
}

.form-group input::placeholder {
  color: #8FA3B3;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--teal);
  box-shadow: 0 0 0 2px rgba(20,184,126,0.1);
}

.form-group select {
  cursor: pointer;
}

.form-group select option {
  background: #0B1017;
  color: #fff;
}

.popup-submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--teal) 0%, #10D48E 100%);
  color: #fff;
  font-family: 'Barlow', sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  border: none;
  border-radius: 6px;
  padding: 14px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 12px rgba(20,184,126,0.3);
  margin-bottom: 16px;
}

.popup-submit-btn:hover {
  background: linear-gradient(135deg, #10D48E 0%, var(--teal) 100%);
  transform: translateY(-1px);
  box-shadow: 0 5px 16px rgba(20,184,126,0.4);
}

.popup-submit-btn:active {
  transform: translateY(0);
}

/* Form Validation Error Styles */
.form-group.error input,
.form-group.error select {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
}

.error-message {
  color: #ef4444;
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
  padding-left: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.error-message::before {
  content: '⚠';
  font-size: 10px;
}

/* Form Validation Success Styles */
.form-group.success input,
.form-group.success select {
  border-color: var(--teal);
  background: rgba(20, 184, 126, 0.05);
  box-shadow: 0 0 0 2px rgba(20, 184, 126, 0.1);
}

.form-group.success input::placeholder {
  color: #8FA3B3;
}

.popup-trust {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #8FA3B3;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 2px;
  font-weight: 500;
}

.success-message {
  padding: 32px 24px;
  text-align: center;
}

.success-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.success-message h3 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 24px;
  letter-spacing: 0.04em;
  color: var(--teal);
  margin-bottom: 8px;
}

.success-message p {
  font-size: 14px;
  color: #8FA3B3;
  line-height: 1.5;
  margin-bottom: 24px;
}

.success-close-btn {
  background: rgba(255,255,255,0.08);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.success-close-btn:hover {
  background: rgba(255,255,255,0.12);
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .popup-container {
    margin: 10px;
    max-height: 95vh;
  }

  .popup-header {
    padding: 20px 20px 16px;
  }

  .popup-title {
    font-size: 20px;
  }

  .popup-form {
    padding: 20px;
  }

  .popup-trust {
    flex-direction: column;
    gap: 4px;
    text-align: center;
  }
}

/* ═══════════════════════════════════════════════════════════════
   COMPREHENSIVE MOBILE & TABLET RESPONSIVE SYSTEM
   Breakpoints: 1024 tablet | 768 large-phone | 640 phone | 480 small | 360 tiny
   ═══════════════════════════════════════════════════════════════ */

/* ── GLOBAL MOBILE RESETS ── */
@media (max-width: 768px) {
  * { -webkit-tap-highlight-color: rgba(20,184,126,0.15); }
  body { padding-bottom: 74px; overflow-x: hidden; }
  img { max-width: 100%; height: auto; }
  section { overflow-x: hidden; }
}

/* ── TABLET (≤1024px) ── */
@media (max-width: 1024px) {
  .hero { padding: 48px 24px 64px; }
  .modules-grid { grid-template-columns: 1fr 1fr; }
  .module-card:nth-child(3n) { border-right: 1px solid rgba(255,255,255,0.05); }
  .module-card:nth-child(2n) { border-right: none; }
  .mentor-split { grid-template-columns: 1fr 1fr; min-height: 600px; }
  .cover-section { padding: 80px 24px 90px; }
  .change-section { padding: 80px 24px 90px; }
  .faq-section { padding: 80px 24px 90px; }
}

/* ── LARGE PHONE / PHABLET (≤768px) ── */
@media (max-width: 768px) {
  /* Hero */
  .hero { padding: 36px 18px 52px; }
  .top-badge { font-size: 11px; padding: 6px 14px; margin-bottom: 24px; }
  .btn-cta { max-width: 100%; font-size: 15px; height: 58px; padding: 0 20px; }
  .guarantee { font-size: 12px; flex-wrap: wrap; justify-content: center; }
  .scarcity { font-size: 12px; }

  /* Countdown */
  .countdown-wrap { gap: 8px; margin-bottom: 36px; }
  .countdown-unit { min-width: 58px; padding: 9px 12px 7px; }
  .countdown-num { font-size: 30px; }
  .countdown-sep { font-size: 26px; margin-bottom: 4px; }

  /* Meta cards */
  .meta-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  .meta-card { padding: 14px; }

  /* Sections */
  .who-section { padding: 64px 18px 72px; }
  .cover-section { padding: 64px 18px 72px; }
  .change-section { padding: 64px 18px 72px; }
  .faq-section { padding: 64px 18px 72px; }

  /* Cover */
  .cover-headline { font-size: clamp(30px, 7vw, 54px); }
  .cover-sub { font-size: 15px; }

  /* Mentor split — stack on mobile */
  .mentor-split {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  .mentor-photo-panel { min-height: 360px; }
  .mentor-content { padding: 48px 24px 64px; }

  /* Change section headline */
  .change-headline { font-size: clamp(28px, 7vw, 56px); }

  /* Sticky CTA */
  .sticky-cta { padding: 10px 18px; }
  .sticky-cta-title { font-size: 13px; }
  .sticky-cta-subtitle { font-size: 10px; }
  .sticky-cta-btn { font-size: 13px; padding: 10px 18px; }
}

/* ── STANDARD PHONE (≤640px) ── */
@media (max-width: 640px) {
  /* Global */
  body { -webkit-text-size-adjust: 100%; padding-bottom: 68px; }

  /* Hero */
  .hero { padding: 28px 16px 44px; }
  .top-badge { font-size: 10px; padding: 5px 12px; margin-bottom: 20px; }
  .headline { font-size: clamp(30px, 9vw, 54px); line-height: 1.0; white-space: normal; }
  .headline-accent { font-size: clamp(30px, 9vw, 54px); line-height: 1.0; }
  .hero-sub { font-size: 15px; margin: 18px auto 8px; }
  .hero-body { font-size: 14px; margin-bottom: 28px; }
  .btn-cta { font-size: 14px; height: 54px; padding: 0 16px; gap: 8px; max-width: 100%; }
  .btn-cta svg { width: 16px; height: 16px; }
  .price-free { font-size: 36px; }
  .price-row { gap: 10px; margin-bottom: 14px; }
  .guarantee { font-size: 11px; margin-top: 12px; }
  .scarcity { font-size: 11px; }

  /* Countdown */
  .countdown-wrap { gap: 5px; margin-bottom: 30px; }
  .countdown-unit { min-width: 50px; padding: 8px 9px 6px; }
  .countdown-num { font-size: 25px; }
  .countdown-label { font-size: 7px; letter-spacing: 0.06em; }
  .countdown-sep { font-size: 20px; }

  /* Meta cards — center-aligned on mobile */
  .meta-grid { gap: 8px; }
  .meta-card { padding: 12px; gap: 6px; text-align: center; align-items: center; }
  .meta-val { font-size: 13px; line-height: 1.2; }
  .meta-label { font-size: 9px; }
  .meta-icon { width: 30px; height: 30px; }

  /* Event card */
  .event-card-row { grid-template-columns: 1fr; }
  .event-image-card { grid-column: 1; min-height: auto; height: auto; }
  .event-image-card > img { width: 100%; height: auto; display: block; object-fit: contain; position: static; }

  /* Who section */
  .who-section { padding: 52px 16px 60px; }
  .who-headline { font-size: 34px; }
  .who-grid { grid-template-columns: 1fr; text-align: center; }
  .who-cta { max-width: 100%; }

  /* Cover section */
  .cover-section { padding: 52px 16px 60px; }
  .cover-headline { font-size: clamp(28px, 8.5vw, 44px); line-height: 1.0; }
  .cover-sub { font-size: 14px; max-width: 100%; }
  .timeline-section { margin-top: 40px; }
  .timeline-title { font-size: 14px; }
  .timeline-item { padding: 16px; gap: 10px; }
  .modules-grid { grid-template-columns: 1fr; }
  .module-card { padding: 24px 18px 28px; text-align: left; border-right: none !important; }
  .module-card-wide { padding: 24px 18px; grid-template-columns: 1fr !important; gap: 16px; text-align: center; }
  .cover-duration-row { flex-wrap: wrap; gap: 12px; }
  .duration-divider { display: none; }

  /* Change section */
  .change-section { padding: 52px 16px 60px; }
  .change-headline { font-size: clamp(26px, 8vw, 48px); line-height: 1.0; }
  .change-headline em { display: block; }
  .ba-table { grid-template-columns: 1fr; }
  .ba-divider { display: none; }
  .ba-col-before { border-radius: 14px 14px 0 0; }
  .ba-col-after  { border-radius: 0 0 14px 14px; }
  .ba-cell { padding: 14px 18px; text-align: left; font-size: 13.5px; }

  /* Spokes diagram — flat 2-col grid on mobile */
  .spokes-container {
    position: static;
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 0 auto 40px;
  }
  .spokes-svg { display: none; }
  .spoke-centre {
    position: static;
    transform: none;
    width: 100%;
    height: auto;
    min-height: 80px;
    border-radius: 12px;
    grid-column: 1 / -1;
    margin-bottom: 0;
    padding: 16px;
    flex-direction: row;
    gap: 8px;
  }
  .spoke-centre-label { font-size: 14px; }
  .spoke-centre-sub { margin-top: 2px; }
  .spoke-node {
    position: static;
    width: 100%;
    transform: none !important;
    top: auto !important;
    left: auto !important;
    padding: 14px 12px;
  }
  .spoke-node-title { font-size: 11px; }
  .spoke-node-icon { width: 26px; height: 26px; margin-bottom: 8px; }

  /* Mentor section */
  .mentor-section { overflow: hidden; }
  .mentor-photo-panel { min-height: 300px; }
  .mentor-content { padding: 40px 18px 56px; }
  .mentor-headline { font-size: clamp(28px, 7vw, 44px); line-height: 1.0; }
  .mentor-cta-row { flex-direction: column; gap: 14px; align-items: center; }
  .mentor-cta-btn { width: 100%; justify-content: center; font-size: 14px; padding: 15px 24px; }
  .mentor-cta-note { text-align: center; }
  .mentor-name-block { gap: 6px; }

  /* FAQ */
  .faq-section { padding: 52px 16px 60px; }
  .faq-headline { font-size: 32px; line-height: 1.0; text-align: center; margin: 0 auto 16px; }
  .faq-sub { font-size: 14px; margin: 0 auto 40px; text-align: center; }
  .faq-q { padding: 18px 16px; gap: 10px; }
  .faq-q-left { gap: 10px; }
  .faq-q-text { font-size: 13.5px; line-height: 1.4; }
  .faq-icon { width: 30px; height: 30px; flex-shrink: 0; }
  .faq-a-inner { padding: 0 16px 20px 16px; font-size: 13px; line-height: 1.65; }
  .faq-cta-wrap { margin-top: 40px; gap: 10px; }
  .faq-cta-wrap .btn-cta { max-width: 100%; }

  /* Sticky CTA */
  .sticky-cta { padding: 8px 16px; }
  .sticky-cta-content { gap: 10px; }
  .sticky-cta-title { font-size: 12px; }
  .sticky-cta-subtitle { font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sticky-cta-btn { font-size: 12px; padding: 9px 14px; white-space: nowrap; }
}

/* ── SMALL PHONE (≤480px) ── */
@media (max-width: 480px) {
  /* Hero */
  .hero { padding: 24px 14px 40px; }
  .headline { font-size: clamp(28px, 10vw, 46px); }
  .headline-accent { font-size: clamp(28px, 10vw, 46px); }
  .btn-cta { font-size: 13.5px; height: 52px; padding: 0 14px; gap: 7px; }
  .btn-cta svg { width: 15px; height: 15px; }

  /* Countdown */
  .countdown-wrap { gap: 3px; }
  .countdown-unit { min-width: 44px; padding: 7px 7px 5px; }
  .countdown-num { font-size: 22px; }
  .countdown-label { font-size: 6.5px; }
  .countdown-sep { font-size: 17px; }

  /* Meta cards — keep 2×2 on small phones */
  .meta-grid { grid-template-columns: 1fr 1fr; }

  /* Host pill */
  .host-pill { flex-direction: column; border-radius: 12px; }
  .host-pill-item:first-child { border-right: none; border-bottom: 1px solid var(--border); }

  /* Sticky CTA — hide text, show only full-width button */
  .sticky-cta-text { display: none !important; }
  .sticky-cta-content { justify-content: center; }
  .sticky-cta-btn {
    width: 100%;
    max-width: 400px;
    font-size: 14px;
    padding: 13px 20px;
    justify-content: center;
    gap: 8px;
  }
  body { padding-bottom: 64px; }

  /* Popup — bottom sheet style on small phones */
  .popup-overlay { padding: 0; align-items: flex-end; }
  .popup-container {
    border-radius: 20px 20px 0 0;
    max-height: 92vh;
    max-width: 100%;
    width: 100%;
    margin: 0;
  }
  .popup-header { padding: 20px 18px 14px; }
  .popup-title { font-size: 21px; }
  .popup-subtitle { font-size: 12px; }
  .popup-form { padding: 16px 18px 20px; }
  .form-group { margin-bottom: 14px; }

  /* CRITICAL: prevent iOS auto-zoom on input focus */
  .form-group input,
  .form-group select { font-size: 16px !important; padding: 12px 14px; }

  .popup-submit-btn { font-size: 15px; padding: 15px 20px; }
  .popup-close { font-size: 24px; top: 14px; right: 14px; }
  .popup-trust { font-size: 10px; }

  /* Mentor */
  .mentor-content { padding: 32px 16px 48px; }
  .mentor-headline { font-size: clamp(26px, 8vw, 40px); }
  .mentor-bio-para { font-size: 14px; }
  .mentor-hook { font-size: 14px; }
  .mentor-moment-body { font-size: 13px; }
  .mentor-moment-body strong { font-size: 14px; }
  .mentor-resolution { font-size: 13px; }
  .mentor-cred-chip { font-size: 10.5px; padding: 8px 12px; }
  .mentor-name-first,
  .mentor-name-last { font-size: clamp(28px, 9vw, 48px); }

  /* Spokes — already flat grid from 640px, just adjust spacing */
  .spokes-container { gap: 10px; }
  .spoke-node { padding: 12px 10px; }
  .spoke-node-title { font-size: 10px; }

  /* FAQ */
  .faq-q { padding: 16px 14px; }
  .faq-q-text { font-size: 13px; }
  .faq-a-inner { padding: 0 14px 18px 14px; font-size: 12.5px; }
  .faq-icon { width: 28px; height: 28px; }
}

/* ── VERY SMALL PHONE (≤360px) ── */
@media (max-width: 360px) {
  .hero { padding: 20px 12px 36px; }
  .headline { font-size: 26px; }
  .headline-accent { font-size: 26px; }
  .countdown-unit { min-width: 40px; padding: 6px 6px 5px; }
  .countdown-num { font-size: 20px; }
  .countdown-sep { font-size: 15px; }
  .btn-cta { font-size: 12.5px; height: 50px; }
  .meta-grid { grid-template-columns: 1fr 1fr; }
  .sticky-cta-btn { font-size: 13px; }
  .faq-q { padding: 14px 12px; }
  .faq-q-text { font-size: 12.5px; }
}

/* ── iOS SAFARI FIXES ── */
@supports (-webkit-touch-callout: none) {
  /* Prevent double-tap zoom on all interactive elements */
  .btn-cta,
  .sticky-cta-btn,
  .popup-submit-btn,
  .mentor-cta-btn,
  .faq-q,
  .who-cta { touch-action: manipulation; }

  /* iPhone home-bar safe area */
  .sticky-cta {
    padding-bottom: calc(10px + env(safe-area-inset-bottom));
  }
  body {
    padding-bottom: calc(68px + env(safe-area-inset-bottom));
  }

  /* Prevent bounce scroll interfering with fixed sticky bar */
  .popup-container { -webkit-overflow-scrolling: touch; }
}

/* ── ANDROID CHROME FIXES ── */
@media (max-width: 640px) {
  /* Ensure buttons never get cut by viewport edges */
  .btn-cta, .mentor-cta-btn, .who-cta {
    -webkit-appearance: none;
    appearance: none;
  }
}

</style>

<!-- ══════════════════════════════════════════════
     FAQ SECTION
══════════════════════════════════════════════ -->
<section class="faq-section">
  <div class="faq-inner">

    <div style="text-align:center;">
      <div class="faq-eyebrow">Before You Register</div>
    </div>

    <h2 class="faq-headline">Everything You Need<br>To Know</h2>
    <p class="faq-sub">The questions most people ask before deciding. Answered directly.</p>

    <div class="faq-list" id="faqList">

      <div class="faq-item">
        <div class="faq-q">
          <div class="faq-q-left">
            <span class="faq-num">01</span>
            <span class="faq-q-text">Is this just another soft skills training that won't actually change anything?</span>
          </div>
          <div class="faq-icon"><svg viewBox="0 0 14 14"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg></div>
        </div>
        <div class="faq-a">
          <div class="faq-a-inner">
            No. Soft skills training gives you awareness. CHCP gives you <em>a system with named frameworks</em> — the Communication Flow Grid, the Escalation Accountability Grid, the Authority Gradient Navigation Tool. Every module ends with a simulation assessed against documented scenarios, not attendance. The difference is the difference between knowing what good communication looks like and <strong>being able to execute it under pressure</strong> — in front of a family, a senior, or a panel.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-q">
          <div class="faq-q-left">
            <span class="faq-num">02</span>
            <span class="faq-q-text">I don't have time for an 8-week commitment — I'm already working full shifts.</span>
          </div>
          <div class="faq-icon"><svg viewBox="0 0 14 14"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg></div>
        </div>
        <div class="faq-a">
          <div class="faq-a-inner">
            The webinar is 3 hours. That's what you're registering for today. CHCP — the 8-week programme — is a separate decision you make after the webinar if it's right for you. <strong>Today's commitment is FREE and 3 hours on 19 April.</strong> Nothing more is asked of you right now.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-q">
          <div class="faq-q-left">
            <span class="faq-num">03</span>
            <span class="faq-q-text">What if I miss a live session?</span>
          </div>
          <div class="faq-icon"><svg viewBox="0 0 14 14"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg></div>
        </div>
        <div class="faq-a">
          <div class="faq-a-inner">
            All registered attendees receive a recording. That said — get your questions answered live with her at the end. That part doesn't replay the same way. If you can be there live, be there live.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-q">
          <div class="faq-q-left">
            <span class="faq-num">04</span>
            <span class="faq-q-text">Is this certificate recognised or accredited?</span>
          </div>
          <div class="faq-icon"><svg viewBox="0 0 14 14"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg></div>
        </div>
        <div class="faq-a">
          <div class="faq-a-inner">
            The webinar itself does not carry a certificate. The full CHCP programme is portfolio-assessed — your documentation of simulations across all 8 weeks is the credential. <strong>The goal is demonstrated competency across real scenarios, not a certificate that sits in a drawer.</strong> Participants graduate with a documented body of applied work covering healthcare escalation, consent conversations, hierarchy navigation, documentation integrity, and crisis communication. Cohort 1 graduates will be the first professionals in India to hold this specific certification.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-q">
          <div class="faq-q-left">
            <span class="faq-num">05</span>
            <span class="faq-q-text">Will you talk about the coaching programme during the webinar?</span>
          </div>
          <div class="faq-icon"><svg viewBox="0 0 14 14"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg></div>
        </div>
        <div class="faq-a">
          <div class="faq-a-inner">
            Yes — briefly, at the end. The 3 hours are entirely content: Smitha walks through the full CHCP architecture, goes deep on Pillar 1 live using the Communication Flow Grid and Breakdown Mapping Audit, and previews Pillars 2 and 3. At the close, she'll share how the 8-week programme works for those who want to go further. <em>You are not paying anything to sit through a pitch.</em>
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-q">
          <div class="faq-q-left">
            <span class="faq-num">06</span>
            <span class="faq-q-text">Is this relevant to my specific role?</span>
          </div>
          <div class="faq-icon"><svg viewBox="0 0 14 14"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg></div>
        </div>
        <div class="faq-a">
          <div class="faq-a-inner">
            The system is built around four roles: <em>Clinicians, Nurses &amp; Allied Health, Healthcare Management, and Medical Students &amp; Interns</em>. Each module is illustrated with scenarios specific to each role. If you interact with patients, families, seniors, or teams in a healthcare environment — this is built for you.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-q">
          <div class="faq-q-left">
            <span class="faq-num">07</span>
            <span class="faq-q-text">What does "founding cohort" mean, and why should I act now?</span>
          </div>
          <div class="faq-icon"><svg viewBox="0 0 14 14"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg></div>
        </div>
        <div class="faq-a">
          <div class="faq-a-inner">
            Cohort 1 is the first group to go through CHCP. <strong>Founding cohort pricing will not be offered again.</strong> As the programme builds a track record, the price goes up — that's standard for any certification that accumulates demonstrated outcomes. The webinar is also capped at 66 seats. When it's full, registration closes.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-q">
          <div class="faq-q-left">
            <span class="faq-num">08</span>
            <span class="faq-q-text">Who else in India is teaching healthcare communication — why is CHCP different?</span>
          </div>
          <div class="faq-icon"><svg viewBox="0 0 14 14"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg></div>
        </div>
        <div class="faq-a">
          <div class="faq-a-inner">
            Most offerings are one-day workshops or conference panels that teach <em>awareness</em> — what good communication looks like in theory. CHCP teaches <em>competency</em> — structured frameworks applied to real Indian healthcare scenarios, assessed by portfolio and live simulation. The curriculum covers 8 distinct layers: healthcare escalation, nurse-physician interaction, cross-department coordination, documentation integrity, consent disclosure, hierarchy navigation, crisis messaging, and legal defensibility. <strong>It's the difference between a CPR awareness talk and getting certified in CPR.</strong> The awareness talks exist. This is not that.
          </div>
        </div>
      </div>

    </div>

    <!-- BOTTOM CTA -->
    <div class="faq-cta-wrap">
      <p class="faq-cta-label">Still have a question? <strong>It'll get answered in the live Q&A on 19 April.</strong></p>
      <a href="javascript:void(0)" class="btn-cta" style="max-width:400px; background:var(--teal2);" onclick="openPopup()">
        Reserve My FREE Seat
        <svg viewBox="0 0 18 18"><line x1="3" y1="9" x2="15" y2="9"/><polyline points="10,4 15,9 10,14"/></svg>
      </a>
      <p style="font-size:12px; color:#A0B0BC; margin-top:2px;">Live Zoom · 3 Hours · FREE · 19 April · 3:00 PM IST</p>
    </div>

  </div>
</section>


<!-- REGISTRATION POPUP -->
<div id="registration-popup" class="popup-overlay" style="display: none;">
  <div class="popup-container">
    <div class="popup-header">
      <h2 class="popup-title">Reserve Your FREE Seat</h2>
      <p class="popup-subtitle">Healthcare Communication Webinar • April 19 • 3:00 PM IST</p>
      <button class="popup-close" onclick="closePopup()">&times;</button>
    </div>
    
    <form class="popup-form" onsubmit="handleFormSubmit(event)">
      <div class="form-group">
        <label for="fullName">Full Name *</label>
        <input type="text" id="fullName" name="fullName" required placeholder="Enter your full name">
      </div>
      
      <div class="form-group">
        <label for="email">Email Address *</label>
        <input type="email" id="email" name="email" required placeholder="Enter your email address">
      </div>
      
      <div class="form-group">
        <label for="whatsapp">WhatsApp Number *</label>
        <input type="tel" id="whatsapp" name="whatsapp" required placeholder="Enter your WhatsApp number">
      </div>
      
      <div class="form-group">
        <label for="role">Your Role in Healthcare *</label>
        <select id="role" name="role" required>
          <option value="">Select your role</option>
          <option value="doctor">Doctor/Physician</option>
          <option value="nurse">Nurse/Allied Health Professional</option>
          <option value="admin">Healthcare Administrator/Manager</option>
          <option value="student">Medical Student (Clinical Years)</option>
          <option value="other">Other Healthcare Professional</option>
        </select>
      </div>
      
      <button type="submit" class="popup-submit-btn">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
        Reserve My FREE Seat
      </button>
      
      <div class="popup-trust">
        <span class="trust-item">🔒 Your data is secure</span>
        <span class="trust-item">📧 Instant confirmation</span>
        <span class="trust-item">💯 100% FREE</span>
      </div>
    </form>
    
    <div id="success-message" class="success-message" style="display: none;">
      <div class="success-icon">✅</div>
      <h3>Registration Successful!</h3>
      <p>Check your email for webinar access details.<br>We'll also send a WhatsApp reminder.</p>
      <button onclick="closePopup()" class="success-close-btn">Close</button>
    </div>
  </div>
</div>

<!-- STICKY CTA -->
<div id="sticky-cta" class="sticky-cta">
  <div class="sticky-cta-content">
    <div class="sticky-cta-text">
      <span class="sticky-cta-title">FREE Healthcare Communication Webinar</span>
      <span class="sticky-cta-subtitle">April 19 • 3:00 PM IST • Only <span id="sticky-seat-count">66</span> seats left</span>
    </div>
    <button class="sticky-cta-btn" onclick="openPopup()">
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
      Reserve FREE Seat
    </button>
  </div>
</div>

</body>
</html>
`;

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}