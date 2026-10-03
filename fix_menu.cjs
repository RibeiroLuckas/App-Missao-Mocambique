const fs = require('fs');

const menuFile = 'src/components/MenuTab.tsx';
let menuContent = fs.readFileSync(menuFile, 'utf8');

const replacements = [
  // Projetos Missionarios
  ['<h3 className="text-base font-black text-white">Projetos Missionários</h3>', '{t(\'menu_projects_title\', selectedLanguage)}'],
  ['<p className="text-xs text-slate-300">Ações práticas de amor e evangelismo</p>', '{t(\'menu_projects_desc\', selectedLanguage)}'],
  ['<span>Novo Projeto</span>', '<span>{t(\'menu_projects_new\', selectedLanguage)}</span>'],
  ['Adicionar Novo Projeto Missionário', '{t(\'menu_projects_add\', selectedLanguage)}'],
  ['<label className="text-xs text-slate-300">Título do Projeto</label>', '<label className="text-xs text-slate-300">{t(\'menu_projects_lbl_title\', selectedLanguage)}</label>'],
  ['placeholder="Ex: Reforma do Centro Comunitário"', 'placeholder={t(\'menu_projects_ph_title\', selectedLanguage)}'],
  ['<label className="text-xs text-slate-300">Descrição</label>', '<label className="text-xs text-slate-300">{t(\'menu_projects_lbl_desc\', selectedLanguage)}</label>'],
  ['placeholder="Descreva as atividades e metas..."', 'placeholder={t(\'menu_projects_ph_desc\', selectedLanguage)}'],
  ['<label className="text-xs text-slate-300">Impacto Estimado</label>', '<label className="text-xs text-slate-300">{t(\'menu_projects_lbl_impact\', selectedLanguage)}</label>'],
  ['placeholder="Ex: 200 famílias"', 'placeholder={t(\'menu_projects_ph_impact\', selectedLanguage)}'],
  ['<label className="text-xs text-slate-300">Status</label>', '<label className="text-xs text-slate-300">{t(\'menu_projects_lbl_status\', selectedLanguage)}</label>'],
  ['Salvar Projeto', '{t(\'menu_projects_btn_save\', selectedLanguage)}'],
  
  // Proximas Missoes
  ['<h3 className="text-base font-black text-white">Próximas Missões</h3>', '{t(\'menu_missions_title\', selectedLanguage)}'],
  ['<p className="text-xs text-slate-300">Viagens e caravanas programadas</p>', '{t(\'menu_missions_desc\', selectedLanguage)}'],
  ['<span>Nova Viagem</span>', '<span>{t(\'menu_missions_new\', selectedLanguage)}</span>'],
  ['Adicionar Próxima Missão', '{t(\'menu_missions_add\', selectedLanguage)}'],
  ['<label className="text-xs text-slate-300">Título da Missão</label>', '<label className="text-xs text-slate-300">{t(\'menu_missions_lbl_title\', selectedLanguage)}</label>'],
  ['placeholder="Ex: Missão Moçambique 2024"', 'placeholder={t(\'menu_missions_ph_title\', selectedLanguage)}'],
  ['<label className="text-xs text-slate-300">Data (ex: Julho 2024)</label>', '<label className="text-xs text-slate-300">{t(\'menu_missions_lbl_date\', selectedLanguage)}</label>'],
  ['placeholder="Mês e Ano"', 'placeholder={t(\'menu_missions_ph_date\', selectedLanguage)}'],
  ['<label className="text-xs text-slate-300">Local</label>', '<label className="text-xs text-slate-300">{t(\'menu_missions_lbl_location\', selectedLanguage)}</label>'],
  ['placeholder="País ou Cidade"', 'placeholder={t(\'menu_missions_ph_location\', selectedLanguage)}'],
  ['Salvar Viagem', '{t(\'menu_missions_btn_save\', selectedLanguage)}'],
  
  // Kids
  ['<h3 className="text-base font-black text-white">Área Kids</h3>', '{t(\'menu_kids_title\', selectedLanguage)}'],
  ['<p className="text-xs text-slate-300">Desenhos bíblicos para colorir e se divertir</p>', '{t(\'menu_kids_desc\', selectedLanguage)}'],
  ['<h4 className="text-sm font-bold text-slate-900 group-hover:text-[#f1a30a] transition-colors leading-snug">', '<h4 className="text-sm font-bold text-slate-900 group-hover:text-[#f1a30a] transition-colors leading-snug">{t(\'menu_kids_item_title\', selectedLanguage)} '],
  
  // Galeria de Fotos
  ['<h3 className="text-base font-black text-white">Galeria de Fotos</h3>', '{t(\'menu_gallery_title\', selectedLanguage)}'],
  ['<p className="text-xs text-slate-300">Momentos marcantes da nossa missão</p>', '{t(\'menu_gallery_desc\', selectedLanguage)}'],
  ['<h4 className="text-[11px] font-bold text-slate-900 group-hover:text-[#0e5c3e] leading-snug">', '<h4 className="text-[11px] font-bold text-slate-900 group-hover:text-[#0e5c3e] leading-snug">{t(\'menu_gallery_item_title\', selectedLanguage)} '],

  // Doacao
  ['<h3 className="text-base font-black text-white">Portal de Doações</h3>', '{t(\'menu_donation_title\', selectedLanguage)}'],
  ['<p className="text-xs text-slate-300">Apoie a obra e seja um abençoador</p>', '{t(\'menu_donation_desc\', selectedLanguage)}'],
  ['Acessar Portal de Doações', '{t(\'menu_donation_btn\', selectedLanguage)}'],
  
  // Fale conosco
  ['<h3 className="text-base font-black text-white">Fale Conosco</h3>', '{t(\'menu_contact_title\', selectedLanguage)}'],
  ['<p className="text-xs text-slate-300">Canais de atendimento e suporte</p>', '{t(\'menu_contact_desc\', selectedLanguage)}'],
  ['Enviar Email', '{t(\'menu_contact_email\', selectedLanguage)}'],
  ['Abrir WhatsApp', '{t(\'menu_contact_whatsapp\', selectedLanguage)}'],
  ['Portal de Atendimento', '{t(\'menu_contact_portal\', selectedLanguage)}'],

  // Depoimentos
  ['<h3 className="text-base font-black text-white">Depoimentos</h3>', '{t(\'menu_testimonials_title\', selectedLanguage)}'],
  ['<p className="text-xs text-slate-300">Testemunhos de vidas transformadas</p>', '{t(\'menu_testimonials_desc\', selectedLanguage)}'],
  
  // Categorias de nova oracao (in MenuTab.tsx)
  ['<option value="Intercessão">Intercessão</option>', '<option value="Intercessão">{t(\'menu_prayer_cat_intercession\', selectedLanguage)}</option>'],
  ['<option value="Saúde">Saúde</option>', '<option value="Saúde">{t(\'menu_prayer_cat_health\', selectedLanguage)}</option>'],
  ['<option value="Família">Família</option>', '<option value="Família">{t(\'menu_prayer_cat_family\', selectedLanguage)}</option>'],
  ['<option value="Agradecimento">Agradecimento</option>', '<option value="Agradecimento">{t(\'menu_prayer_cat_thanks\', selectedLanguage)}</option>'],
  ['<option value="Missões">Missões</option>', '<option value="Missões">{t(\'menu_prayer_cat_missions\', selectedLanguage)}</option>']
];

let changed = false;
for (const [target, replacement] of replacements) {
  if (menuContent.includes(target)) {
    if (target === '<h3 className="text-base font-black text-white">Projetos Missionários</h3>') {
       menuContent = menuContent.replace(target, `<h3 className="text-base font-black text-white">${replacement}</h3>`);
    } else if (target === '<p className="text-xs text-slate-300">Ações práticas de amor e evangelismo</p>') {
       menuContent = menuContent.replace(target, `<p className="text-xs text-slate-300">${replacement}</p>`);
    } else if (target === '<h3 className="text-base font-black text-white">Próximas Missões</h3>') {
       menuContent = menuContent.replace(target, `<h3 className="text-base font-black text-white">${replacement}</h3>`);
    } else if (target === '<p className="text-xs text-slate-300">Viagens e caravanas programadas</p>') {
       menuContent = menuContent.replace(target, `<p className="text-xs text-slate-300">${replacement}</p>`);
    } else if (target === '<h3 className="text-base font-black text-white">Área Kids</h3>') {
       menuContent = menuContent.replace(target, `<h3 className="text-base font-black text-white">${replacement}</h3>`);
    } else if (target === '<p className="text-xs text-slate-300">Desenhos bíblicos para colorir e se divertir</p>') {
       menuContent = menuContent.replace(target, `<p className="text-xs text-slate-300">${replacement}</p>`);
    } else if (target === '<h3 className="text-base font-black text-white">Galeria de Fotos</h3>') {
       menuContent = menuContent.replace(target, `<h3 className="text-base font-black text-white">${replacement}</h3>`);
    } else if (target === '<p className="text-xs text-slate-300">Momentos marcantes da nossa missão</p>') {
       menuContent = menuContent.replace(target, `<p className="text-xs text-slate-300">${replacement}</p>`);
    } else if (target === '<h3 className="text-base font-black text-white">Portal de Doações</h3>') {
       menuContent = menuContent.replace(target, `<h3 className="text-base font-black text-white">${replacement}</h3>`);
    } else if (target === '<p className="text-xs text-slate-300">Apoie a obra e seja um abençoador</p>') {
       menuContent = menuContent.replace(target, `<p className="text-xs text-slate-300">${replacement}</p>`);
    } else if (target === '<h3 className="text-base font-black text-white">Fale Conosco</h3>') {
       menuContent = menuContent.replace(target, `<h3 className="text-base font-black text-white">${replacement}</h3>`);
    } else if (target === '<p className="text-xs text-slate-300">Canais de atendimento e suporte</p>') {
       menuContent = menuContent.replace(target, `<p className="text-xs text-slate-300">${replacement}</p>`);
    } else if (target === '<h3 className="text-base font-black text-white">Depoimentos</h3>') {
       menuContent = menuContent.replace(target, `<h3 className="text-base font-black text-white">${replacement}</h3>`);
    } else if (target === '<p className="text-xs text-slate-300">Testemunhos de vidas transformadas</p>') {
       menuContent = menuContent.replace(target, `<p className="text-xs text-slate-300">${replacement}</p>`);
    } else {
       menuContent = menuContent.replace(target, replacement);
    }
    changed = true;
  }
}

// Special fixes for string concatenation in Gallery and Kids
menuContent = menuContent.replace(
  /{photo\.title}/g,
  `{t('menu_gallery_item_title', selectedLanguage)} {index + 1}`
);

menuContent = menuContent.replace(
  /{item\.title}/g,
  `{t('menu_kids_item_title', selectedLanguage)} {index + 1}`
);

// We need to pass index inside map where those are used.
// Gallery map: {galleryList.map((photo) => (
menuContent = menuContent.replace(
  /{galleryList.map\(\(photo\) => \(/g,
  `{galleryList.map((photo, index) => (`
);
// Kids map: {kidsItems.map((item) => (
menuContent = menuContent.replace(
  /{kidsItems.map\(\(item\) => \(/g,
  `{kidsItems.map((item, index) => (`
);

if (changed) {
  fs.writeFileSync(menuFile, menuContent);
  console.log("Replaced strings in MenuTab.tsx");
}

