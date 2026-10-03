const fs = require('fs');
let tContent = fs.readFileSync('src/data/translations.ts', 'utf8');

// Replace duplicate lines for menu_kids_desc, just delete my newly added lines.
// My newly added lines were in the blocks I appended. Wait, I appended to the end of each block.
// I will just use regex to remove the second occurrence or just find and replace the block I added.
tContent = tContent.replace(/menu_kids_desc: "Desenhos bíblicos para colorir e se divertir",\n/g, "");
tContent = tContent.replace(/menu_kids_desc: "Bible coloring pages and fun",\n/g, "");
tContent = tContent.replace(/menu_kids_desc: "Dibujos bíblicos para colorear y divertirse",\n/g, "");

fs.writeFileSync('src/data/translations.ts', tContent);

let menu = fs.readFileSync('src/components/MenuTab.tsx', 'utf8');
menu = menu.replace(/alt=\{t\('menu_gallery_item_title', selectedLanguage\)\} \{index \+ 1\}/g, "alt={`${t('menu_gallery_item_title', selectedLanguage)} ${index + 1}`}");
menu = menu.replace(/\{t\('menu_gallery_item_title', selectedLanguage\)\} \{index \+ 1\}/g, "{`${t('menu_gallery_item_title', selectedLanguage)} ${index + 1}`}");
menu = menu.replace(/\{t\('menu_kids_item_title', selectedLanguage\)\} \{index \+ 1\}/g, "{`${t('menu_kids_item_title', selectedLanguage)} ${index + 1}`}");
fs.writeFileSync('src/components/MenuTab.tsx', menu);
