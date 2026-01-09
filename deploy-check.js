#!/usr/bin/env node

// Deployment Verification Script for Idyll Productions Website
console.log('🚀 Idyll Productions - Deployment Verification\n');

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if build exists
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

console.log('✅ Checking build output...');

if (!fs.existsSync(distPath)) {
  console.error('❌ Build folder not found. Run: npm run build');
  process.exit(1);
}

if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html not found in build');
  process.exit(1);
}

// Check essential assets
const requiredAssets = [
  'favicon.png',
  'logo-black.png', 
  'logo-white.png',
  'Idyll-White.mp4',
  'idyll-hill.png'
];

console.log('✅ Checking essential assets...');
let missingAssets = [];

requiredAssets.forEach(asset => {
  if (!fs.existsSync(path.join(distPath, asset))) {
    missingAssets.push(asset);
  }
});

if (missingAssets.length > 0) {
  console.error('❌ Missing assets:', missingAssets.join(', '));
  process.exit(1);
}

// Check bundle size
const assetsPath = path.join(distPath, 'assets');
if (fs.existsSync(assetsPath)) {
  const files = fs.readdirSync(assetsPath);
  const jsFiles = files.filter(f => f.endsWith('.js'));
  
  if (jsFiles.length > 0) {
    const mainBundle = path.join(assetsPath, jsFiles[0]);
    const stats = fs.statSync(mainBundle);
    const sizeKB = (stats.size / 1024).toFixed(2);
    
    console.log(`✅ Main bundle size: ${sizeKB} KB`);
    
    if (stats.size > 500 * 1024) { // 500KB threshold
      console.warn('⚠️  Bundle size is large, consider optimization');
    }
  }
}

console.log('\n🎉 All checks passed! Your website is ready for deployment.');
console.log('\nDeployment options:');
console.log('• Vercel: vercel --prod');
console.log('• Netlify: Upload dist/ folder');
console.log('• GitHub Pages: Deploy dist/ to gh-pages branch');
console.log('• Custom server: Upload dist/ contents\n');