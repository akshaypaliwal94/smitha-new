const fs = require('fs');
const path = require('path');

// Read the original HTML file
const originalHtml = fs.readFileSync('/workspace/Smitha New/smitha-webinar.html', 'utf8');

// Extract content between <style> and </style>
const styleMatch = originalHtml.match(/<style>([\s\S]*?)<\/style>/);
const styles = styleMatch ? styleMatch[1] : '';

// Extract content between <body> and </body>
const bodyMatch = originalHtml.match(/<body>([\s\S]*?)<\/body>/);
const bodyContent = bodyMatch ? bodyMatch[1] : '';

// Create the Next.js component
const nextjsComponent = `import React from 'react';
import Head from 'next/head';

export default function SmithaWebinarPage() {
  return (
    <>
      <Head>
        <title>Free Webinar — Smitha Chowdary Kankanala</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
        <style jsx>{\`
${styles}
        \`}</style>
      </Head>
      <div dangerouslySetInnerHTML={{
        __html: \`${bodyContent.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`
      }} />
    </>
  );
}`;

// Write the Next.js component
fs.writeFileSync('/workspace/Smitha New/SmithaWebinarPage.tsx', nextjsComponent);

console.log('✅ Next.js component created successfully!');
console.log('📁 File: /workspace/Smitha New/SmithaWebinarPage.tsx');
console.log('📊 Original HTML lines: ' + originalHtml.split('\n').length);
console.log('📊 Styles lines: ' + styles.split('\n').length);
console.log('📊 Body content lines: ' + bodyContent.split('\n').length);