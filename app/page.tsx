'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Countdown timer functionality
    const updateCountdown = () => {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 3);
      targetDate.setHours(19, 0, 0, 0); // 7 PM

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

    // FAQ toggle functionality
    const setupFaqToggle = () => {
      document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
          const isOpen = item.classList.contains('faq-open');
          // Close all
          document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('faq-open'));
          // Toggle clicked
          if (!isOpen) item.classList.add('faq-open');
        });
      });
    };

    // Initialize
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    setupFaqToggle();

    return () => clearInterval(interval);
  }, []);

  const htmlContent = `
<!DOCTYPE html>
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

/* ── HEADLINE ── */
.headline {
  font-family: 'Bebas Neue', Impact, sans-serif;
  font-size: clamp(48px, 7.5vw, 108px);
  line-height: 0.95;
  letter-spacing: 0.01em;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 4px;
  animation: fadeUp 0.5s ease both 0.1s;
  white-space: nowrap;
}
.headline-accent {
  font-family: 'Bebas Neue', Impact, sans-serif;
  font-size: clamp(48px, 7.5vw, 108px);
  line-height: 0.95;
  letter-spacing: 0.01em;
  color: var(--teal);
  text-transform: uppercase;
  margin-bottom: 4px;
  display: block;
  position: relative;
  animation: fadeUp 0.5s ease both 0.18s;
  white-space: nowrap;
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
  position: relative;
  min-height: 180px;
  display: flex;
  align-items: flex-end;
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
  text-align: left;
  display: flex;
  flex-direction: column;
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
  display: inline-flex;
  align-items: center;
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
  max-width: 640px;
  margin: 0 auto;
}

.who-pill {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 100px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 600;
  color: #5A6A7A;
}

/* ══════════════════════════════════════════════
   WHAT WE COVER
══════════════════════════════════════════════ */
.cover-section {
  position: relative;
  z-index: 1;
  background: var(--bg);
  padding: 100px 24px;
  text-align: center;
}

.cover-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #80EABE;
  border: 1px solid rgba(20,184,126,0.28);
  background: rgba(20,184,126,0.12);
  display: inline-block;
  padding: 5px 16px;
  border-radius: 100px;
  margin-bottom: 28px;
}

.cover-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.0;
  letter-spacing: 0.02em;
  color: #fff;
  text-transform: uppercase;
  max-width: 860px;
  margin: 0 auto 16px;
}

.cover-sub {
  font-size: 15px;
  color: var(--muted);
  margin-bottom: 64px;
  line-height: 1.6;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
}

.cover-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
  text-align: left;
}

.cover-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px 28px;
  transition: transform 0.2s, border-color 0.2s;
}

.cover-card:hover {
  transform: translateY(-2px);
  border-color: rgba(20,184,126,0.3);
}

.cover-card-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 28px;
  color: var(--teal);
  letter-spacing: 0.08em;
  margin-bottom: 20px;
  line-height: 1;
}

.cover-card-title {
  font-family: 'Barlow', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #fff;
  margin-bottom: 16px;
  line-height: 1.3;
}

.cover-card-body {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  color: var(--muted);
}

.cover-card-body strong {
  color: #fff;
  font-weight: 600;
}

/* ══════════════════════════════════════════════
   WHAT WILL CHANGE
══════════════════════════════════════════════ */
.change-section {
  position: relative;
  z-index: 1;
  background: #F4F2EE;
  padding: 100px 24px;
  text-align: center;
}

.change-eyebrow {
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

.change-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.0;
  letter-spacing: 0.02em;
  color: #0F1F45;
  text-transform: uppercase;
  max-width: 860px;
  margin: 0 auto 16px;
}

.change-sub {
  font-size: 15px;
  color: #7A8A99;
  margin-bottom: 64px;
  line-height: 1.6;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.change-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
}

.change-card {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.07);
  border-radius: 16px;
  padding: 32px 28px;
  text-align: left;
  border-top: 4px solid transparent;
  transition: border-color 0.2s, transform 0.2s;
}

.change-card:hover {
  border-top-color: var(--teal);
  transform: translateY(-1px);
}

.change-card-icon {
  width: 48px;
  height: 48px;
  background: rgba(20,184,126,0.08);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: var(--teal2);
}

.change-card-icon svg {
  width: 24px;
  height: 24px;
}

.change-card-title {
  font-family: 'Barlow', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #0F1F45;
  margin-bottom: 16px;
  line-height: 1.3;
}

.change-card-body {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  color: #5A6A7A;
  margin-bottom: 20px;
}

.change-card-body strong {
  color: #0F1F45;
  font-weight: 600;
}

.change-card-result {
  font-size: 13px;
  font-weight: 600;
  color: var(--teal2);
  background: rgba(20,184,126,0.08);
  padding: 8px 14px;
  border-radius: 6px;
  font-style: italic;
}

/* ══════════════════════════════════════════════
   MENTOR SECTION
══════════════════════════════════════════════ */
.mentor-section {
  position: relative;
  z-index: 1;
  background: var(--bg);
  padding: 100px 24px;
  text-align: center;
}

.mentor-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #80EABE;
  border: 1px solid rgba(20,184,126,0.28);
  background: rgba(20,184,126,0.12);
  display: inline-block;
  padding: 5px 16px;
  border-radius: 100px;
  margin-bottom: 28px;
}

.mentor-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.0;
  letter-spacing: 0.02em;
  color: #fff;
  text-transform: uppercase;
  max-width: 860px;
  margin: 0 auto 64px;
}

.mentor-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 48px 40px;
  max-width: 920px;
  margin: 0 auto;
  text-align: left;
  position: relative;
  overflow: hidden;
}

.mentor-card-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, rgba(20,184,126,0.06) 0%, rgba(14,100,200,0.04) 100%);
  pointer-events: none;
}

.mentor-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 40px;
  align-items: center;
}

.mentor-info h3 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 32px;
  letter-spacing: 0.08em;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 8px;
  line-height: 1.1;
}

.mentor-role {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--teal);
  text-transform: uppercase;
  margin-bottom: 24px;
}

.mentor-bio {
  font-size: 15px;
  font-weight: 400;
  line-height: 1.7;
  color: var(--muted);
  margin-bottom: 32px;
}

.mentor-bio strong {
  color: #fff;
  font-weight: 600;
}

.mentor-achievements {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.achievement {
  text-align: center;
}

.achievement-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 28px;
  color: var(--teal);
  letter-spacing: 0.08em;
  line-height: 1;
  margin-bottom: 4px;
}

.achievement-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  line-height: 1.2;
}

.mentor-creds {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.cred-pill {
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
}

.mentor-avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0B3D2A 0%, #0B1A2F 50%, #091220 100%);
  border: 3px solid var(--border);
  position: relative;
  overflow: hidden;
}

.mentor-avatar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(20,184,126,0.15) 0%, transparent 70%);
}

.mentor-avatar::after {
  content: 'SC';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 48px;
  color: var(--teal);
  letter-spacing: 0.08em;
  z-index: 1;
}

/* ══════════════════════════════════════════════
   FAQ SECTION
══════════════════════════════════════════════ */
.faq-section {
  position: relative;
  z-index: 1;
  background: #F4F2EE;
  padding: 100px 24px;
  text-align: center;
}

.faq-eyebrow {
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

.faq-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.0;
  letter-spacing: 0.02em;
  color: #0F1F45;
  text-transform: uppercase;
  max-width: 860px;
  margin: 0 auto 64px;
}

.faq-list {
  max-width: 840px;
  margin: 0 auto;
  text-align: left;
}

.faq-item {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.07);
  border-radius: 12px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.faq-item:hover {
  border-color: rgba(20,184,126,0.2);
}

.faq-question {
  padding: 24px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #0F1F45;
  line-height: 1.4;
}

.faq-icon {
  width: 24px;
  height: 24px;
  color: var(--teal2);
  transition: transform 0.2s ease;
}

.faq-open .faq-icon {
  transform: rotate(45deg);
}

.faq-answer {
  padding: 0 28px 24px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  color: #5A6A7A;
  display: none;
}

.faq-open .faq-answer {
  display: block;
}

.faq-answer strong {
  color: #0F1F45;
  font-weight: 600;
}

/* ══════════════════════════════════════════════
   FINAL CTA SECTION
══════════════════════════════════════════════ */
.final-cta-section {
  position: relative;
  z-index: 1;
  background: var(--bg);
  padding: 100px 24px;
  text-align: center;
}

.final-cta-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.0;
  letter-spacing: 0.02em;
  color: #fff;
  text-transform: uppercase;
  max-width: 760px;
  margin: 0 auto 24px;
}

.final-cta-sub {
  font-size: 16px;
  color: var(--muted);
  margin-bottom: 48px;
  line-height: 1.6;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
}

.final-cta-sub strong {
  color: #fff;
  font-weight: 600;
}

.final-reminder {
  background: rgba(231,76,60,0.08);
  border: 1px solid rgba(231,76,60,0.2);
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 40px;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
}

.final-reminder-text {
  font-size: 14px;
  color: #FFAAAA;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.final-reminder .fire {
  font-size: 16px;
}

/* ══════════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════════ */
@media (max-width: 768px) {
  .event-card-row {
    grid-template-columns: 1fr;
  }
  
  .meta-grid {
    grid-template-columns: 1fr;
  }
  
  .who-grid {
    grid-template-columns: 1fr;
  }
  
  .cover-grid {
    grid-template-columns: 1fr;
  }
  
  .change-grid {
    grid-template-columns: 1fr;
  }
  
  .mentor-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .mentor-achievements {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .headline, .headline-accent {
    white-space: normal;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 40px 16px 60px;
  }
  
  .who-section, .cover-section, .change-section, .mentor-section, .faq-section, .final-cta-section {
    padding: 80px 16px;
  }
  
  .countdown-wrap {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .host-pill {
    flex-direction: column;
  }
  
  .host-pill-item:first-child {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  
  .event-image-content {
    padding: 16px;
  }
  
  .meta-card {
    padding: 20px;
  }
  
  .cover-card, .change-card {
    padding: 24px 20px;
  }
  
  .mentor-card {
    padding: 32px 24px;
  }
  
  .faq-question {
    padding: 20px;
    font-size: 15px;
  }
  
  .faq-answer {
    padding: 0 20px 20px;
  }
}
</style>
</head>

<body>
<!-- Glow effects -->
<div class="glow-left"></div>
<div class="glow-right"></div>
<div class="glow-bottom"></div>

<!-- Hero Section -->
<section class="hero">
  <div class="top-badge">
    <div class="dot"></div>
    FREE WEBINAR
  </div>

  <h1 class="headline">HOW TO BUILD A</h1>
  <h1 class="headline-accent">7-FIGURE BUSINESS</h1>
  
  <div class="tagline-pain">
    Feeling stuck watching other entrepreneurs succeed while you struggle with inconsistent income and unclear strategies?
  </div>
  
  <div class="tagline">
    Learn the exact framework I used to scale my business to <em>multiple 7-figures</em> and how you can replicate this success in your industry.
  </div>

  <div class="host-pill">
    <div class="host-pill-item">
      <span class="flag">🇮🇳</span>
      <span>Hosted by <strong>Smitha Chowdary</strong></span>
    </div>
    <div class="host-pill-item">
      <span>🏆 <strong>7-Figure</strong> Business Owner</span>
    </div>
  </div>

  <div class="countdown-wrap">
    <div class="countdown-label">STARTING IN</div>
    <div class="count-box">
      <div class="count-num" id="countdown-days">03</div>
      <div class="count-unit">DAYS</div>
    </div>
    <div class="colon">:</div>
    <div class="count-box">
      <div class="count-num" id="countdown-hours">14</div>
      <div class="count-unit">HRS</div>
    </div>
    <div class="colon">:</div>
    <div class="count-box">
      <div class="count-num" id="countdown-minutes">27</div>
      <div class="count-unit">MIN</div>
    </div>
    <div class="colon">:</div>
    <div class="count-box">
      <div class="count-num" id="countdown-seconds">45</div>
      <div class="count-unit">SEC</div>
    </div>
  </div>

  <div class="event-card-row">
    <div class="event-image-card">
      <div class="event-image-bg"></div>
      <div class="event-image-pattern"></div>
      <div class="cross-icon">
        <svg viewBox="0 0 24 24">
          <path d="M6 6l12 12M6 18L18 6"/>
        </svg>
      </div>
      <div class="event-image-content">
        <div class="event-tag">LIVE MASTERCLASS</div>
        <div class="event-subtitle-img">Join hundreds of ambitious entrepreneurs</div>
        <div class="host-name-img">SMITHA CHOWDARY KANKANALA</div>
        <div class="host-role-img">7-FIGURE BUSINESS MENTOR</div>
      </div>
    </div>

    <div class="meta-grid">
      <div class="meta-card">
        <div class="meta-icon">
          <svg viewBox="0 0 24 24">
            <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
          </svg>
        </div>
        <div class="meta-label">DATE</div>
        <div class="meta-val">April 8th, 2025</div>
      </div>
      <div class="meta-card">
        <div class="meta-icon">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        </div>
        <div class="meta-label">TIME</div>
        <div class="meta-val">7:00 PM IST</div>
      </div>
      <div class="meta-card">
        <div class="meta-icon">
          <svg viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div class="meta-label">SEATS</div>
        <div class="meta-val">Limited to 500</div>
      </div>
      <div class="meta-card">
        <div class="meta-icon">
          <svg viewBox="0 0 24 24">
            <path d="M9 11H1v3h8v3l8-4-8-4z"/>
          </svg>
        </div>
        <div class="meta-label">DURATION</div>
        <div class="meta-val">90 Minutes</div>
      </div>
    </div>
  </div>

  <div class="price-row">
    <div class="price-original">$497</div>
    <div class="price-badge">LIMITED TIME</div>
    <div class="price-free">FREE</div>
  </div>

  <a href="#register" class="btn-cta">
    <svg viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
    Reserve Your Free Spot Now
  </a>

  <div class="guarantee">
    <svg viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
    </svg>
    100% Free - No Hidden Costs
  </div>

  <div class="scarcity">
    <span class="fire">🔥</span>
    Only <span class="count-pill">127</span> spots remaining
  </div>
</section>

<!-- Who This Is For Section -->
<section class="who-section">
  <div class="who-eyebrow">TARGET AUDIENCE</div>
  <h2 class="who-headline">Who This Webinar Is Designed For</h2>
  <div class="who-sub">This masterclass is specifically designed for ambitious entrepreneurs who are ready to scale</div>

  <div class="who-grid">
    <div class="who-card">
      <div class="who-card-icon">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      <div class="who-card-title">STRUGGLING ENTREPRENEURS</div>
      <div class="who-card-body">You have a business but struggle with inconsistent income and lack a clear growth strategy to reach the next level.</div>
    </div>

    <div class="who-card">
      <div class="who-card-icon">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      </div>
      <div class="who-card-title">AMBITIOUS SIDE-HUSTLERS</div>
      <div class="who-card-body">You're working a 9-5 but dream of building a profitable business that could eventually replace your salary.</div>
    </div>

    <div class="who-card">
      <div class="who-card-icon">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 7.5h5v2h-5zm0 7h5v2h-5zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 6L9 4v4H5v2h4v4l5-5z"/>
        </svg>
      </div>
      <div class="who-card-title">6-FIGURE PLATEAU BREAKERS</div>
      <div class="who-card-body">You've hit 6-figures but feel stuck and don't know how to scale to 7-figures without burning out or working more hours.</div>
    </div>

    <div class="who-card">
      <div class="who-card-icon">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div class="who-card-title">COACHES & CONSULTANTS</div>
      <div class="who-card-body">Service-based business owners who want to systematize their operations and create scalable revenue streams.</div>
    </div>
  </div>

  <div class="who-exclusion">
    <strong>This is NOT for you if</strong> you're looking for get-rich-quick schemes or aren't willing to put in the work to build a sustainable business.
  </div>
  
  <div class="who-but">
    But if you're ready to learn proven strategies and take action...
  </div>

  <div class="who-pills">
    <div class="who-pill">Digital Marketers</div>
    <div class="who-pill">E-commerce Owners</div>
    <div class="who-pill">Course Creators</div>
    <div class="who-pill">Agency Owners</div>
    <div class="who-pill">Consultants</div>
    <div class="who-pill">SaaS Founders</div>
  </div>
</section>

<!-- What We Cover Section -->
<section class="cover-section">
  <div class="cover-eyebrow">CURRICULUM OVERVIEW</div>
  <h2 class="cover-headline">What We'll Cover In This Masterclass</h2>
  <div class="cover-sub">90 minutes of pure value - the exact strategies, systems, and mindset shifts that transformed my business</div>

  <div class="cover-grid">
    <div class="cover-card">
      <div class="cover-card-num">01</div>
      <div class="cover-card-title">The 7-Figure Mindset Shift</div>
      <div class="cover-card-body">Discover the <strong>critical mindset differences</strong> between 6 and 7-figure entrepreneurs and how to rewire your thinking for exponential growth.</div>
    </div>

    <div class="cover-card">
      <div class="cover-card-num">02</div>
      <div class="cover-card-title">Revenue Stream Diversification</div>
      <div class="cover-card-body">Learn how to create <strong>multiple income sources</strong> within your business to reduce risk and accelerate growth beyond single revenue streams.</div>
    </div>

    <div class="cover-card">
      <div class="cover-card-num">03</div>
      <div class="cover-card-title">Systems That Scale Without You</div>
      <div class="cover-card-body">The exact <strong>operational frameworks</strong> I use to run multiple 7-figure businesses while working fewer hours than most 6-figure entrepreneurs.</div>
    </div>

    <div class="cover-card">
      <div class="cover-card-num">04</div>
      <div class="cover-card-title">The Million-Dollar Sales Framework</div>
      <div class="cover-card-body">My proven <strong>conversion system</strong> that consistently turns prospects into high-paying clients without pushy sales tactics.</div>
    </div>

    <div class="cover-card">
      <div class="cover-card-num">05</div>
      <div class="cover-card-title">Strategic Partnership Leverage</div>
      <div class="cover-card-body">How to build <strong>strategic alliances</strong> that multiply your reach and revenue through other people's networks and expertise.</div>
    </div>

    <div class="cover-card">
      <div class="cover-card-num">06</div>
      <div class="cover-card-title">Your 90-Day Action Plan</div>
      <div class="cover-card-body">Walk away with a <strong>clear roadmap</strong> to implement these strategies in your business and see measurable results within 90 days.</div>
    </div>
  </div>
</section>

<!-- What Will Change Section -->
<section class="change-section">
  <div class="change-eyebrow">TRANSFORMATION PROMISE</div>
  <h2 class="change-headline">What Will Change For You After This Webinar</h2>
  <div class="change-sub">This isn't just theory - these are the exact changes my successful students experience</div>

  <div class="change-grid">
    <div class="change-card">
      <div class="change-card-icon">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 14l3-3 3 3 5-5v4h2V7h-6v2l3 3-3 3-3-3-5 5v6h6z"/>
        </svg>
      </div>
      <div class="change-card-title">Revenue Predictability</div>
      <div class="change-card-body">Stop the feast-or-famine cycle and create <strong>consistent, predictable revenue</strong> that grows month over month.</div>
      <div class="change-card-result">"I went from $8K to $45K months consistently"</div>
    </div>

    <div class="change-card">
      <div class="change-card-icon">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
        </svg>
      </div>
      <div class="change-card-title">Operational Freedom</div>
      <div class="change-card-body">Build systems that run without you so you can <strong>focus on strategy and growth</strong> instead of day-to-day operations.</div>
      <div class="change-card-result">"Now I work 30 hours a week and make 3x more"</div>
    </div>

    <div class="change-card">
      <div class="change-card-icon">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
        </svg>
      </div>
      <div class="change-card-title">Strategic Clarity</div>
      <div class="change-card-body">Get crystal clear on your <strong>growth path and priorities</strong> so every action moves you closer to 7-figures.</div>
      <div class="change-card-result">"Finally know exactly what to focus on daily"</div>
    </div>

    <div class="change-card">
      <div class="change-card-icon">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div class="change-card-title">Confidence & Positioning</div>
      <div class="change-card-body">Position yourself as the <strong>premium choice in your market</strong> and charge what you're actually worth.</div>
      <div class="change-card-result">"Doubled my prices and clients are happier than ever"</div>
    </div>
  </div>
</section>

<!-- Mentor Section -->
<section class="mentor-section">
  <div class="mentor-eyebrow">YOUR MENTOR</div>
  <h2 class="mentor-headline">Meet Your Instructor</h2>

  <div class="mentor-card">
    <div class="mentor-card-bg"></div>
    <div class="mentor-content">
      <div class="mentor-info">
        <h3>Smitha Chowdary Kankanala</h3>
        <div class="mentor-role">7-Figure Business Mentor & Strategic Consultant</div>
        
        <div class="mentor-bio">
          I'm <strong>Smitha Chowdary</strong>, and I've built multiple 7-figure businesses across different industries. What started as a side project while working my corporate job has grown into a business empire that now generates over <strong>$2M annually</strong>. 
          
          I've helped over <strong>500+ entrepreneurs</strong> break through their revenue plateaus using the exact strategies I'll share in this masterclass.
        </div>

        <div class="mentor-achievements">
          <div class="achievement">
            <div class="achievement-num">$2M+</div>
            <div class="achievement-label">ANNUAL REVENUE</div>
          </div>
          <div class="achievement">
            <div class="achievement-num">500+</div>
            <div class="achievement-label">CLIENTS HELPED</div>
          </div>
          <div class="achievement">
            <div class="achievement-num">5</div>
            <div class="achievement-label">YEARS SCALING</div>
          </div>
        </div>

        <div class="mentor-creds">
          <div class="cred-pill">Forbes Featured Entrepreneur</div>
          <div class="cred-pill">TEDx Speaker</div>
          <div class="cred-pill">Business Strategy Expert</div>
          <div class="cred-pill">Scaling Systems Specialist</div>
        </div>
      </div>
      
      <div class="mentor-avatar"></div>
    </div>
  </div>
</section>

<!-- FAQ Section -->
<section class="faq-section">
  <div class="faq-eyebrow">QUESTIONS & ANSWERS</div>
  <h2 class="faq-headline">Frequently Asked Questions</h2>

  <div class="faq-list">
    <div class="faq-item">
      <div class="faq-question">
        Is this webinar really free?
        <div class="faq-icon">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </div>
      </div>
      <div class="faq-answer">
        Yes, this masterclass is <strong>completely free</strong>. There are no hidden costs, no credit card required, and no surprise charges. I'm providing this value because I believe in helping entrepreneurs succeed and I know that when you see the results, you might be interested in working together in the future.
      </div>
    </div>

    <div class="faq-item">
      <div class="faq-question">
        Will there be a replay available?
        <div class="faq-icon">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </div>
      </div>
      <div class="faq-answer">
        While I may provide a limited-time replay for registered attendees, <strong>I highly recommend attending live</strong>. The live session includes interactive Q&A, real-time examples, and bonus content that won't be available in any replay.
      </div>
    </div>

    <div class="faq-item">
      <div class="faq-question">
        What if I'm just starting out with no revenue yet?
        <div class="faq-icon">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </div>
      </div>
      <div class="faq-answer">
        Perfect! Many of my most successful students started from zero. This masterclass covers the <strong>foundational strategies</strong> you need to build a scalable business from the ground up. You'll learn how to avoid common mistakes and set up systems that will serve you as you grow.
      </div>
    </div>

    <div class="faq-item">
      <div class="faq-question">
        How is this different from other business courses?
        <div class="faq-icon">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </div>
      </div>
      <div class="faq-answer">
        This isn't theory from someone who's never built a real business. These are <strong>proven strategies from my actual 7-figure businesses</strong>. I'll show you the exact systems, frameworks, and processes I use daily. Plus, you'll get real case studies and actionable steps you can implement immediately.
      </div>
    </div>

    <div class="faq-item">
      <div class="faq-question">
        Will you be selling something during the webinar?
        <div class="faq-icon">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </div>
      </div>
      <div class="faq-answer">
        I'll spend 90% of the time delivering pure value and strategies you can implement immediately. At the end, I may mention <strong>an opportunity to work together</strong> for those who want additional support, but there's absolutely no pressure. The free content alone is worth thousands.
      </div>
    </div>

    <div class="faq-item">
      <div class="faq-question">
        What if I can't attend live?
        <div class="faq-icon">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </div>
      </div>
      <div class="faq-answer">
        Still register! I'll send registered attendees the slides and key takeaways. However, <strong>the live experience is much more valuable</strong> due to real-time Q&A, interactive elements, and live case study analysis. If possible, prioritize attending live.
      </div>
    </div>
  </div>
</section>

<!-- Final CTA Section -->
<section class="final-cta-section">
  <h2 class="final-cta-headline">Don't Let Another Year Pass Watching Others Succeed</h2>
  <div class="final-cta-sub">
    Join me for 90 minutes that could change the trajectory of your business forever. <strong>This is your moment to finally break through to 7-figures.</strong>
  </div>

  <div class="final-reminder">
    <div class="final-reminder-text">
      <span class="fire">🔥</span>
      Only 127 spots remaining - Register now before we're full
    </div>
  </div>

  <a href="#register" class="btn-cta">
    <svg viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
    Claim Your Free Spot - 100% Free
  </a>

  <div class="guarantee">
    <svg viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
    </svg>
    Zero Risk - Complete Value - No Cost
  </div>
</section>
</body>

</html>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}