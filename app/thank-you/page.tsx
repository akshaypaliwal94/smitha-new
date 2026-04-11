'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import s from './thank-you.module.css';

export default function ThankYouPage() {
  useEffect(() => {
    // Fire Lead conversion event — landing here = confirmed registration
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(s.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(`.${s.reveal}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={s.page}>
      {/* HERO */}
      <section className={s.hero}>
        <div className={`${s.logoWrap} ${s.reveal}`}>
          <Image src="/chcp-logo.png" alt="CHCP Logo" width={120} height={48} style={{ objectFit: 'contain' }} />
        </div>

        <div className={`${s.checkmark} ${s.reveal}`}>
          <svg viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className={`${s.heroTitle} ${s.reveal}`}>You&apos;re In.</h1>
        <p className={`${s.heroSub} ${s.reveal}`}>
          Your seat for the Healthcare Communication Masterclass is confirmed.
        </p>

        <div className={`${s.eventBadge} ${s.reveal}`}>
          <span>📅</span> 19th April 2026 · <span>3:00 PM IST · Live Zoom</span>
        </div>

        <p className={`${s.oneStep} ${s.reveal}`}>One last step — join the community:</p>

        <a
          href="https://chat.whatsapp.com/EIvTt0urmp0G7I2s02YRjB"
          className={`${s.btnWa} ${s.reveal}`}
          onClick={() => { if ((window as any).fbq) (window as any).fbq('trackCustom', 'WhatsAppCommunityJoin'); }}
        >
          <WhatsAppIcon />
          Click Here to Join Our WhatsApp Community →
        </a>
        <p className={`${s.btnHint} ${s.reveal}`}>Takes 10 seconds · Get your session reminder here</p>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className={s.stepsSection}>
        <p className={`${s.sectionLabel} ${s.reveal}`}>Next Steps</p>
        <h2 className={`${s.sectionTitle} ${s.reveal}`}>What Happens Next</h2>
        <div className={s.stepsGrid}>
          <div className={`${s.stepCard} ${s.reveal}`}>
            <div className={s.stepNumber}>1</div>
            <div className={s.stepTitle}>Check Your WhatsApp &amp; Email</div>
            <p className={s.stepBody}>
              You&apos;ll receive your Zoom link within the next few minutes. If you don&apos;t see it, check your spam folder.
            </p>
          </div>
          <div className={`${s.stepCard} ${s.reveal}`}>
            <div className={s.stepNumber}>2</div>
            <div className={s.stepTitle}>Save the Date</div>
            <p className={s.stepBody}>
              Block April 19 at 3:00 PM IST on your calendar right now. This is a live session — there is no recording.
            </p>
          </div>
          <div className={`${s.stepCard} ${s.reveal}`}>
            <div className={s.stepNumber}>3</div>
            <div className={s.stepTitle}>Reflect on Your Communication Gaps</div>
            <p className={s.stepBody}>
              Think of one recent moment where communication broke down — with a patient, a colleague, or a senior. Come ready to map it. The session will be most valuable when you have a real scenario in mind.
            </p>
          </div>
        </div>
      </section>

      {/* COMMUNITY BANNER */}
      <section className={s.banner}>
        <div className={`${s.bannerBox} ${s.reveal}`}>
          <div className={s.bannerIcon}>💬</div>
          <h3 className={s.bannerTitle}>Join the Exclusive WhatsApp Community</h3>
          <p className={s.bannerBody}>
            Get session reminders, pre-masterclass reading, and healthcare communication insights — this is where Smitha shares things she doesn&apos;t post publicly.
          </p>
          <a
            href="https://chat.whatsapp.com/EIvTt0urmp0G7I2s02YRjB"
            className={s.btnWa}
            onClick={() => { if ((window as any).fbq) (window as any).fbq('trackCustom', 'WhatsAppCommunityJoin'); }}
          >
            <WhatsAppIcon />
            Join the WhatsApp Community →
          </a>
          <p className={s.btnHint} style={{ marginTop: '10px' }}>Takes 10 seconds</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={s.footer}>
        <p>© 2026 CHCP — Center for Healthcare Communication Practice. All rights reserved.</p>
      </footer>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.5l5.78-1.516A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.001-1.368l-.358-.213-3.732.979 1.001-3.647-.234-.374A9.818 9.818 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
    </svg>
  );
}
