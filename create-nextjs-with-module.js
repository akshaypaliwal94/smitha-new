const fs = require('fs');

// Read the original HTML file
const originalHtml = fs.readFileSync('/workspace/Smitha New/smitha-webinar.html', 'utf8');

// Extract content between <style> and </style>
const styleMatch = originalHtml.match(/<style>([\s\S]*?)<\/style>/);
const styles = styleMatch ? styleMatch[1] : '';

// Extract content between <body> and </body>
const bodyMatch = originalHtml.match(/<body>([\s\S]*?)<\/body>/);
const bodyContent = bodyMatch ? bodyMatch[1] : '';

// Create the CSS module file
const cssModule = styles;

// Create the Next.js component with CSS module import
const nextjsComponentWithModule = `import React, { useEffect } from 'react';
import Head from 'next/head';

export default function SmithaWebinarPage() {
  useEffect(() => {
    // FAQ Accordion functionality
    const handleFaqClick = (e: Event) => {
      const item = (e.target as HTMLElement)?.closest('.faq-item');
      if (!item) return;
      
      const isOpen = item.classList.contains('faq-open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('faq-open'));
      // Toggle clicked
      if (!isOpen) item.classList.add('faq-open');
    };

    const faqList = document.getElementById('faqList');
    if (faqList) {
      faqList.addEventListener('click', handleFaqClick);
    }

    // Cleanup
    return () => {
      const faqList = document.getElementById('faqList');
      if (faqList) {
        faqList.removeEventListener('click', handleFaqClick);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Free Webinar — Smitha Chowdary Kankanala</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{\`
${styles}
      \`}</style>
      <div dangerouslySetInnerHTML={{
        __html: \`${bodyContent.replace(/`/g, '\\`').replace(/\${/g, '\\${').replace(/<script>[\s\S]*?<\/script>/gi, '')}\`
      }} />
    </>
  );
}`;

// Write the CSS module
fs.writeFileSync('/workspace/Smitha New/SmithaWebinar.module.css', cssModule);

// Write the improved Next.js component
fs.writeFileSync('/workspace/Smitha New/SmithaWebinarPageImproved.tsx', nextjsComponentWithModule);

console.log('✅ Improved Next.js component created successfully!');
console.log('📁 Component: /workspace/Smitha New/SmithaWebinarPageImproved.tsx');
console.log('📁 CSS Module: /workspace/Smitha New/SmithaWebinar.module.css');
console.log('📊 Original HTML lines: ' + originalHtml.split('\n').length);
console.log('📊 Component lines: ' + nextjsComponentWithModule.split('\n').length);
console.log('📊 CSS lines: ' + cssModule.split('\n').length);