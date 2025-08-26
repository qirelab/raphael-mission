const fs = require('fs');
const path = require('path');

console.log('Testing i18n implementation for Projects and Testimonies pages...\n');

// Test 1: Check if translation keys exist
console.log('1. Checking translation keys...');
try {
  const translationsPath = path.join(__dirname, 'src/locales/translations.js');
  const translationsContent = fs.readFileSync(translationsPath, 'utf8');
  
  // Check for Projects page keys
  const projectsKeys = [
    'projectsPageTitle',
    'projectsPageDescription',
    'streetEvangelismTitle',
    'tentEvangelismTitle',
    'personalEvangelismTitle',
    'socialProjectsTitle',
    'artEvangelismTitle',
    'churchSupportTitle',
    'healingMinistryTitle',
    'transformingLivesTitle',
    'joinUsTitle'
  ];
  
  // Check for Testimonies page keys
  const testimoniesKeys = [
    'testimoniesPageTitle',
    'testimoniesPageTitleHighlight',
    'testimoniesPageDescription',
    'shareYourStoryTitle',
    'shareYourStoryDesc',
    'shareYourStoryBtn',
    'readFullStory'
  ];
  
  let missingKeys = [];
  
  [...projectsKeys, ...testimoniesKeys].forEach(key => {
    if (!translationsContent.includes(key + ':')) {
      missingKeys.push(key);
    }
  });
  
  if (missingKeys.length === 0) {
    console.log('✅ All translation keys found in translations.js');
  } else {
    console.log('❌ Missing translation keys:', missingKeys);
  }
  
} catch (error) {
  console.log('❌ Error reading translations file:', error.message);
}

// Test 2: Check if Projects page imports useLanguage
console.log('\n2. Checking Projects page imports...');
try {
  const projectsPath = path.join(__dirname, 'src/pages/Projects/index.jsx');
  const projectsContent = fs.readFileSync(projectsPath, 'utf8');
  
  if (projectsContent.includes("import { useLanguage } from '../../context/LanguageContext'")) {
    console.log('✅ Projects page imports useLanguage');
  } else {
    console.log('❌ Projects page missing useLanguage import');
  }
  
  if (projectsContent.includes("const { t } = useLanguage()")) {
    console.log('✅ Projects page uses useLanguage hook');
  } else {
    console.log('❌ Projects page missing useLanguage hook usage');
  }
  
  if (projectsContent.includes("{t('projectsPageTitle')}")) {
    console.log('✅ Projects page uses translation keys');
  } else {
    console.log('❌ Projects page not using translation keys');
  }
  
} catch (error) {
  console.log('❌ Error reading Projects page:', error.message);
}

// Test 3: Check if Testimonies page imports useLanguage
console.log('\n3. Checking Testimonies page imports...');
try {
  const testimoniesPath = path.join(__dirname, 'src/pages/Testimonies/index.jsx');
  const testimoniesContent = fs.readFileSync(testimoniesPath, 'utf8');
  
  if (testimoniesContent.includes("import { useLanguage } from '../../context/LanguageContext'")) {
    console.log('✅ Testimonies page imports useLanguage');
  } else {
    console.log('❌ Testimonies page missing useLanguage import');
  }
  
  if (testimoniesContent.includes("const { t } = useLanguage()")) {
    console.log('✅ Testimonies page uses useLanguage hook');
  } else {
    console.log('❌ Testimonies page missing useLanguage hook usage');
  }
  
  if (testimoniesContent.includes("{t('testimoniesPageTitle')}")) {
    console.log('✅ Testimonies page uses translation keys');
  } else {
    console.log('❌ Testimonies page not using translation keys');
  }
  
} catch (error) {
  console.log('❌ Error reading Testimonies page:', error.message);
}

// Test 4: Check language coverage
console.log('\n4. Checking language coverage...');
try {
  const translationsPath = path.join(__dirname, 'src/locales/translations.js');
  const translationsContent = fs.readFileSync(translationsPath, 'utf8');
  
  const languages = ['en:', 'ru:', 'pl:'];
  const testKey = 'projectsPageTitle';
  
  languages.forEach(lang => {
    const langSection = translationsContent.indexOf(lang);
    if (langSection !== -1) {
      const nextLangSection = translationsContent.indexOf('},', langSection);
      const langContent = translationsContent.substring(langSection, nextLangSection);
      
      if (langContent.includes(testKey)) {
        console.log(`✅ ${lang.replace(':', '')} language has Projects translations`);
      } else {
        console.log(`❌ ${lang.replace(':', '')} language missing Projects translations`);
      }
    }
  });
  
} catch (error) {
  console.log('❌ Error checking language coverage:', error.message);
}

console.log('\n✅ i18n implementation test completed!');