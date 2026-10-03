const fs = require('fs');

const ptAdditions = `
      // Menu Tab specific
      menu_projects_title: "Projetos Missionários",
      menu_projects_desc: "Ações práticas de amor e evangelismo",
      menu_projects_new: "Novo Projeto",
      menu_projects_add: "Adicionar Novo Projeto Missionário",
      menu_projects_lbl_title: "Título do Projeto",
      menu_projects_ph_title: "Ex: Reforma do Centro Comunitário",
      menu_projects_lbl_desc: "Descrição",
      menu_projects_ph_desc: "Descreva as atividades e metas...",
      menu_projects_lbl_impact: "Impacto Estimado",
      menu_projects_ph_impact: "Ex: 200 famílias",
      menu_projects_lbl_status: "Status",
      menu_projects_btn_save: "Salvar Projeto",
      
      menu_missions_title: "Próximas Missões",
      menu_missions_desc: "Viagens e caravanas programadas",
      menu_missions_new: "Nova Viagem",
      menu_missions_add: "Adicionar Próxima Missão",
      menu_missions_lbl_title: "Título da Missão",
      menu_missions_ph_title: "Ex: Missão Moçambique 2024",
      menu_missions_lbl_date: "Data (ex: Julho 2024)",
      menu_missions_ph_date: "Mês e Ano",
      menu_missions_lbl_location: "Local",
      menu_missions_ph_location: "País ou Cidade",
      menu_missions_btn_save: "Salvar Viagem",

      menu_kids_title: "Área Kids",
      menu_kids_desc: "Desenhos bíblicos para colorir e se divertir",
      menu_kids_item_title: "Desenho",

      menu_gallery_title: "Galeria de Fotos",
      menu_gallery_desc: "Momentos marcantes da nossa missão",
      menu_gallery_item_title: "Momento",

      menu_donation_title: "Portal de Doações",
      menu_donation_desc: "Apoie a obra e seja um abençoador",
      menu_donation_btn: "Acessar Portal de Doações",

      menu_contact_title: "Fale Conosco",
      menu_contact_desc: "Canais de atendimento e suporte",
      menu_contact_email: "Enviar Email",
      menu_contact_whatsapp: "Abrir WhatsApp",
      menu_contact_portal: "Portal de Atendimento",

      menu_testimonials_title: "Depoimentos",
      menu_testimonials_desc: "Testemunhos de vidas transformadas",

      menu_prayer_cat_intercession: "Intercessão",
      menu_prayer_cat_health: "Saúde",
      menu_prayer_cat_family: "Família",
      menu_prayer_cat_thanks: "Agradecimento",
      menu_prayer_cat_missions: "Missões",
`;

const enAdditions = `
      // Menu Tab specific
      menu_projects_title: "Missionary Projects",
      menu_projects_desc: "Practical actions of love and evangelism",
      menu_projects_new: "New Project",
      menu_projects_add: "Add New Missionary Project",
      menu_projects_lbl_title: "Project Title",
      menu_projects_ph_title: "Ex: Community Center Renovation",
      menu_projects_lbl_desc: "Description",
      menu_projects_ph_desc: "Describe activities and goals...",
      menu_projects_lbl_impact: "Estimated Impact",
      menu_projects_ph_impact: "Ex: 200 families",
      menu_projects_lbl_status: "Status",
      menu_projects_btn_save: "Save Project",

      menu_missions_title: "Upcoming Missions",
      menu_missions_desc: "Scheduled trips and caravans",
      menu_missions_new: "New Trip",
      menu_missions_add: "Add Upcoming Mission",
      menu_missions_lbl_title: "Mission Title",
      menu_missions_ph_title: "Ex: Mozambique Mission 2024",
      menu_missions_lbl_date: "Date (ex: July 2024)",
      menu_missions_ph_date: "Month and Year",
      menu_missions_lbl_location: "Location",
      menu_missions_ph_location: "Country or City",
      menu_missions_btn_save: "Save Trip",

      menu_kids_title: "Kids Area",
      menu_kids_desc: "Bible coloring pages and fun",
      menu_kids_item_title: "Drawing",

      menu_gallery_title: "Photo Gallery",
      menu_gallery_desc: "Memorable moments of our mission",
      menu_gallery_item_title: "Moment",

      menu_donation_title: "Donation Portal",
      menu_donation_desc: "Support the work and be a blessing",
      menu_donation_btn: "Access Donation Portal",

      menu_contact_title: "Contact Us",
      menu_contact_desc: "Support and service channels",
      menu_contact_email: "Send Email",
      menu_contact_whatsapp: "Open WhatsApp",
      menu_contact_portal: "Service Portal",

      menu_testimonials_title: "Testimonials",
      menu_testimonials_desc: "Testimonies of transformed lives",

      menu_prayer_cat_intercession: "Intercession",
      menu_prayer_cat_health: "Health",
      menu_prayer_cat_family: "Family",
      menu_prayer_cat_thanks: "Thanksgiving",
      menu_prayer_cat_missions: "Missions",
`;

const esAdditions = `
      // Menu Tab specific
      menu_projects_title: "Proyectos Misioneros",
      menu_projects_desc: "Acciones prácticas de amor y evangelismo",
      menu_projects_new: "Nuevo Proyecto",
      menu_projects_add: "Añadir Nuevo Proyecto Misionero",
      menu_projects_lbl_title: "Título del Proyecto",
      menu_projects_ph_title: "Ej: Renovación del Centro Comunitario",
      menu_projects_lbl_desc: "Descripción",
      menu_projects_ph_desc: "Describa las actividades y metas...",
      menu_projects_lbl_impact: "Impacto Estimado",
      menu_projects_ph_impact: "Ej: 200 familias",
      menu_projects_lbl_status: "Estado",
      menu_projects_btn_save: "Guardar Proyecto",

      menu_missions_title: "Próximas Misiones",
      menu_missions_desc: "Viajes y caravanas programados",
      menu_missions_new: "Nuevo Viaje",
      menu_missions_add: "Añadir Próxima Misión",
      menu_missions_lbl_title: "Título de la Misión",
      menu_missions_ph_title: "Ej: Misión Mozambique 2024",
      menu_missions_lbl_date: "Fecha (ej: Julio 2024)",
      menu_missions_ph_date: "Mes y Año",
      menu_missions_lbl_location: "Ubicación",
      menu_missions_ph_location: "País o Ciudad",
      menu_missions_btn_save: "Guardar Viaje",

      menu_kids_title: "Área Kids",
      menu_kids_desc: "Dibujos bíblicos para colorear y divertirse",
      menu_kids_item_title: "Dibujo",

      menu_gallery_title: "Galería de Fotos",
      menu_gallery_desc: "Momentos memorables de nuestra misión",
      menu_gallery_item_title: "Momento",

      menu_donation_title: "Portal de Donaciones",
      menu_donation_desc: "Apoye la obra y sea de bendición",
      menu_donation_btn: "Acceder al Portal",

      menu_contact_title: "Contáctenos",
      menu_contact_desc: "Canales de atención y soporte",
      menu_contact_email: "Enviar Email",
      menu_contact_whatsapp: "Abrir WhatsApp",
      menu_contact_portal: "Portal de Atención",

      menu_testimonials_title: "Testimonios",
      menu_testimonials_desc: "Testimonios de vidas transformadas",

      menu_prayer_cat_intercession: "Intercesión",
      menu_prayer_cat_health: "Salud",
      menu_prayer_cat_family: "Familia",
      menu_prayer_cat_thanks: "Agradecimiento",
      menu_prayer_cat_missions: "Misiones",
`;

let content = fs.readFileSync('src/data/translations.ts', 'utf8');

// The file exports `export const translations: Record<LanguageType, Record<string, string>> = { pt: { ... }, pt_PT: { ... }, en: { ... }, es: { ... } };`
// I will search for the end of each block by looking for a unique key like `tab_mais: "Mais"`

content = content.replace(/tab_mais: "Mais",/g, "tab_mais: \"Mais\",\n" + ptAdditions);
content = content.replace(/tab_mais: "More",/g, "tab_mais: \"More\",\n" + enAdditions);
content = content.replace(/tab_mais: "Más",/g, "tab_mais: \"Más\",\n" + esAdditions);

fs.writeFileSync('src/data/translations.ts', content);
console.log("Translations added.");
