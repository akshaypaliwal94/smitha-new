export default function Home() {
  return (
    <div dangerouslySetInnerHTML={{
      __html: `<!DOCTYPE html>
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

.countdown-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 14px 26px;
  min-height: 64px;
}

.countdown-item {
  text-align: center;
}
.countdown-number {
  display: block;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 32px;
  line-height: 1;
  color: var(--teal);
  margin-bottom: 2px;
}
.countdown-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.countdown-sep {
  color: var(--muted);
  font-size: 24px;
  font-weight: 300;
}

/* ── MAIN CTA ── */
.main-cta {
  display: inline-block;
  background: linear-gradient(135deg, var(--teal), var(--teal2));
  color: #fff;
  text-decoration: none;
  padding: 18px 42px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.25s ease;
  animation: fadeUp 0.5s ease both 0.4s;
  box-shadow: 0 8px 24px rgba(20,184,126,0.2);
}
.main-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(20,184,126,0.3);
  filter: brightness(1.05);
}

/* ── ANIMATIONS ── */
@keyframes fadeDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

/* ── RESPONSIVE ── */
@media (max-width: 640px) {
  .hero { padding: 40px 20px 60px; }
  .headline, .headline-accent { font-size: 52px; white-space: normal; }
  .host-pill { flex-direction: column; border-radius: 12px; }
  .host-pill-item:first-child { border-right: none; border-bottom: 1px solid var(--border); }
  .countdown-wrap { flex-direction: column; gap: 12px; }
  .countdown-card { min-width: 280px; }
}

/* ════════════════════════════════════════════════ */
/* ══ EXTENDED PAGE STYLES ══ */
/* ════════════════════════════════════════════════ */

/* ── SECTIONS ── */
.section {
  padding: 100px 24px;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.section-white {
  background: #fff;
  color: #0F1F35;
}

/* ── WHO SECTION ── */
.who-section {
  background: #fff;
  color: #0F1F35;
  padding: 100px 24px;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.who-eyebrow {
  display: inline-block;
  background: rgba(20,184,126,0.08);
  color: var(--teal2);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
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
  margin-bottom: 16px;
}

.who-sub {
  font-size: 18px;
  font-weight: 300;
  color: #5A6C7D;
  max-width: 600px;
  margin: 0 auto 56px;
  line-height: 1.6;
}

.who-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
}

.who-card {
  background: rgba(255,255,255,0.6);
  border: 1px solid rgba(20,184,126,0.1);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.25s ease;
}
.who-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(20,184,126,0.12);
  border-color: rgba(20,184,126,0.2);
}

.who-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--teal), var(--teal2));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 24px;
}

.who-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  color: #0F1F35;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 12px;
}

.who-desc {
  font-size: 14px;
  font-weight: 400;
  color: #5A6C7D;
  line-height: 1.6;
  margin-bottom: 16px;
}

.who-pain {
  font-size: 13px;
  font-weight: 500;
  color: #D73027;
  background: rgba(215,48,39,0.08);
  padding: 8px 12px;
  border-radius: 8px;
  border-left: 3px solid #D73027;
}

/* ── CTA SECTION ── */
.cta-section {
  background: var(--bg);
  color: var(--text);
  text-align: center;
  padding: 80px 24px;
}

.cta-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.0;
  letter-spacing: 0.02em;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.cta-sub {
  font-size: 18px;
  font-weight: 300;
  color: var(--muted);
  max-width: 500px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

/* ── RESPONSIVE WHO SECTION ── */
@media (max-width: 640px) {
  .who-grid { grid-template-columns: 1fr; }
  .who-headline { font-size: 36px; }
}
</style>
</head>

<body>
<!-- ══════════════════════════════════════════════
     RADIAL GLOWS
══════════════════════════════════════════════ -->
<div class="glow-left"></div>
<div class="glow-right"></div>
<div class="glow-bottom"></div>

<!-- ══════════════════════════════════════════════
     HERO SECTION
══════════════════════════════════════════════ -->
<section class="hero">

  <!-- TOP BADGE -->
  <div class="top-badge">
    <span class="dot"></span>
    For Doctors, Nurses &amp; Healthcare Leaders
  </div>

  <!-- HEADLINE -->
  <div class="headline">Your Work Speaks For Itself —</div>
  <span class="headline-accent">So Why Isn't Anyone Listening?</span>

  <!-- LAYER 2 — PAIN -->
  <p class="tagline-pain">
    The escalation you couldn't de-escalate. The meeting where your idea got credited to someone else. The promotion that went to someone you trained.
  </p>

  <!-- LAYER 3 — PROMISE -->
  <p class="tagline">
    In 3 hours, see exactly how the CHCP system works — why communication keeps breaking down in clinical settings, and what <em>structured authority</em> actually looks like in practice.
  </p>

  <!-- HOST CREDIBILITY -->
  <div class="host-pill">
    <div class="host-pill-item">
      <span class="flag">🇮🇳</span>
      <strong>2.3M+</strong> Community
    </div>
    <div class="host-pill-item">
      <span class="flag">🏆</span>
      <strong>1000+</strong> Success Stories
    </div>
  </div>

  <!-- COUNTDOWN -->
  <div class="countdown-wrap">
    <div class="countdown-card">
      <div class="countdown-item">
        <span class="countdown-number" id="days">XX</span>
        <span class="countdown-label">Days</span>
      </div>
      <span class="countdown-sep">:</span>
      <div class="countdown-item">
        <span class="countdown-number" id="hours">XX</span>
        <span class="countdown-label">Hours</span>
      </div>
      <span class="countdown-sep">:</span>
      <div class="countdown-item">
        <span class="countdown-number" id="minutes">XX</span>
        <span class="countdown-label">Minutes</span>
      </div>
      <span class="countdown-sep">:</span>
      <div class="countdown-item">
        <span class="countdown-number" id="seconds">XX</span>
        <span class="countdown-label">Seconds</span>
      </div>
    </div>
  </div>

  <!-- MAIN CTA -->
  <a href="#register" class="main-cta">Reserve Your Seat — 12 April, 10 AM IST</a>

</section>

<!-- ══════════════════════════════════════════════
     WHO THIS IS FOR SECTION
══════════════════════════════════════════════ -->
<section class="who-section">

  <p class="who-eyebrow">Who This Is For</p>
  <h2 class="who-headline">This Is For India's Healthcare<br>Professionals Who Are Done<br>Walking On Eggshells</h2>
  <p class="who-sub">Four roles. Four distinct daily realities. One communication gap costing all of them.</p>

  <div class="who-grid">

    <div class="who-card">
      <div class="who-icon">👩‍⚕️</div>
      <h3 class="who-title">Senior Doctors</h3>
      <p class="who-desc">15+ years of expertise. Solid clinical judgement. But when explaining complex protocols to junior staff or difficult diagnoses to patients, the conversation breaks down.</p>
      <div class="who-pain">"They just don't get it. How do I make them understand without micromanaging?"</div>
    </div>

    <div class="who-card">
      <div class="who-icon">👩‍💼</div>
      <h3 class="who-title">Nursing Leaders</h3>
      <p class="who-desc">Managing 20+ staff across multiple shifts. Strong operational skills. But when conflicts arise between nurses, doctors, or patients, you're stuck playing mediator.</p>
      <div class="who-pain">"I spend more time managing personalities than managing care."</div>
    </div>

    <div class="who-card">
      <div class="who-icon">🏥</div>
      <h3 class="who-title">Department Heads</h3>
      <p class="who-desc">Running entire departments. Responsible for outcomes, budgets, staff. But when presenting to the board or negotiating with administration, your expertise gets questioned.</p>
      <div class="who-pain">"They treat me like I don't understand the business side of healthcare."</div>
    </div>

    <div class="who-card">
      <div class="who-icon">📋</div>
      <h3 class="who-title">Healthcare Administrators</h3>
      <p class="who-desc">Balancing quality care with operational efficiency. Managing multiple stakeholders. But when communicating policy changes to clinical staff, resistance is immediate.</p>
      <div class="who-pain">"They think I don't understand what happens on the floor."</div>
    </div>

  </div>

</section>

<!-- ══════════════════════════════════════════════
     CTA SECTION
══════════════════════════════════════════════ -->
<section class="cta-section" id="register">
  <h2 class="cta-headline">Ready To Stop Walking<br>On Eggshells?</h2>
  <p class="cta-sub">Join 1000+ healthcare leaders who've learned to communicate with structure, clarity, and authority.</p>
  <a href="#" class="main-cta">Reserve Your Free Seat Now</a>
</section>

<script>
// ══════════════════════════════════════════════
// COUNTDOWN TIMER
// ══════════════════════════════════════════════

// Set the date we're counting down to: April 12, 2026 at 10:00 AM IST
const targetDate = new Date("Apr 12, 2026 10:00:00 GMT+0530").getTime();

// Update the countdown every 1 second
const countdownTimer = setInterval(function() {
  
  // Get current date and time
  const now = new Date().getTime();
  
  // Find the distance between now and the target date
  const distance = targetDate - now;
  
  // Calculate days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Display the result in the countdown elements
  document.getElementById("days").innerHTML = String(days).padStart(2, '0');
  document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
  document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
  document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');
  
  // If the countdown is over, display some text
  if (distance < 0) {
    clearInterval(countdownTimer);
    document.querySelector('.countdown-card').innerHTML = '<div style="padding:20px; color:var(--teal); font-size:18px; font-weight:600;">WEBINAR IS LIVE NOW!</div>';
  }
  
}, 1000);

// ══════════════════════════════════════════════
// SMOOTH SCROLL FOR ANCHOR LINKS
// ══════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
</script>

</body>
</html>`
    }}/>
  )
}