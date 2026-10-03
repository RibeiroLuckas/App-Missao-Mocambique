const fs = require('fs');

const replacements = [
  ['<p className="text-xs text-slate-300">Conecte-se com a First Orlando Brasil</p>', '<p className="text-xs text-slate-300">{t(\'menu_contact_connect\', selectedLanguage)}</p>'],
  ['<h4 className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">\n                          Instagram Oficial\n                        </h4>', '<h4 className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">\n                          {t(\'menu_contact_instagram\', selectedLanguage)}\n                        </h4>'],
  ['<h4 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">\n                          Canal no YouTube\n                        </h4>', '<h4 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">\n                          {t(\'menu_contact_youtube\', selectedLanguage)}\n                        </h4>'],
  ['<span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Campus Físico</span>', '<span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">{t(\'menu_contact_campus\', selectedLanguage)}</span>'],
];

let content = fs.readFileSync('src/components/MenuTab.tsx', 'utf8');
for (const [target, repl] of replacements) {
  content = content.replace(target, repl);
}
fs.writeFileSync('src/components/MenuTab.tsx', content);

// Now update translations.ts
let tContent = fs.readFileSync('src/data/translations.ts', 'utf8');

const pt = `      menu_contact_connect: "Conecte-se com a First Orlando Brasil",
      menu_contact_instagram: "Instagram Oficial",
      menu_contact_youtube: "Canal no YouTube",
      menu_contact_campus: "Campus Físico",\n`;

const en = `      menu_contact_connect: "Connect with First Orlando Brazil",
      menu_contact_instagram: "Official Instagram",
      menu_contact_youtube: "YouTube Channel",
      menu_contact_campus: "Physical Campus",\n`;

const es = `      menu_contact_connect: "Conéctate con First Orlando Brasil",
      menu_contact_instagram: "Instagram Oficial",
      menu_contact_youtube: "Canal en YouTube",
      menu_contact_campus: "Campus Físico",\n`;

tContent = tContent.replace(/menu_contact_portal: "Portal de Atendimento",/g, "menu_contact_portal: \"Portal de Atendimento\",\n" + pt);
tContent = tContent.replace(/menu_contact_portal: "Service Portal",/g, "menu_contact_portal: \"Service Portal\",\n" + en);
tContent = tContent.replace(/menu_contact_portal: "Portal de Atención",/g, "menu_contact_portal: \"Portal de Atención\",\n" + es);

fs.writeFileSync('src/data/translations.ts', tContent);
console.log("Contact translations updated.");
