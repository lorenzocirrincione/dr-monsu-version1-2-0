'use strict';

const whatsapp = (message) => `https://wa.me/51981594089?text=${encodeURIComponent(message)}`;
document.querySelectorAll('[data-wa]').forEach((link) => { link.href = whatsapp(link.dataset.wa); });
document.querySelector('#year').textContent = new Date().getFullYear();

const header = document.querySelector('#header');
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu(returnFocus = false) {
  header.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  mobileNav.inert = true;
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = !header.classList.contains('menu-open');
  header.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobileNav.inert = !open;
});
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header.classList.contains('menu-open')) closeMenu(true);
});
matchMedia('(min-width: 821px)').addEventListener('change', (event) => { if (event.matches) closeMenu(); });

const treatments = {
  general: {
    title: 'Odontología general',
    intro: 'Atiendo a adultos y niños con un enfoque preventivo y cercano. En la consulta reviso dientes, encías y tejidos bucales para conocer cada situación y explicar los siguientes pasos.',
    subtitle: 'Prevención y cuidado continuo',
    points: ['Controles y prevención adaptados a cada etapa de la vida.', 'Limpieza profesional para retirar placa y sarro, acompañada de indicaciones de higiene.', 'Un plan que considera las necesidades de cada paciente y el trabajo con especialistas cuando corresponde.'],
    note: 'La frecuencia de los controles se define según tu situación y tus necesidades.'
  },
  estetica: {
    title: 'Estética dental',
    intro: 'Busco una sonrisa armónica, natural y compatible con la función de tus dientes. El primer paso es evaluar tu salud bucal y conversar sobre lo que te gustaría mejorar.',
    subtitle: 'Opciones según tu caso',
    points: ['Carillas y restauraciones para trabajar la forma y la apariencia dental.', 'Blanqueamiento profesional con una planificación individual.', 'Diseño digital con fotografía y video para visualizar la propuesta.', 'Maqueta provisoria para que puedas ver y probar cómo podría quedar antes de iniciar.'],
    note: 'La simulación digital y la prueba provisoria son herramientas de planificación; el resultado final depende de la evaluación y de cada caso.'
  },
  rehabilitacion: {
    title: 'Rehabilitación oral adhesiva',
    intro: 'La rehabilitación adhesiva busca recuperar la función, la mordida y la estética conservando la mayor cantidad posible de tejido dental sano.',
    subtitle: 'Restaurar con un enfoque conservador',
    points: ['Materiales como resinas y cerámicas que se adhieren al tejido dental remanente.', 'Planificación de restauraciones, carillas e incrustaciones según la necesidad de cada diente.', 'Un enfoque biomimético que considera el comportamiento y el aspecto del diente natural.'],
    note: 'La técnica y el material se eligen después de evaluar tus dientes, tu mordida y tus objetivos.'
  },
  implantes: {
    title: 'Implantes dentales',
    intro: 'Los implantes son una de las opciones para reemplazar dientes perdidos. El diagnóstico permite valorar tu situación y planificar el tratamiento junto con el equipo.',
    subtitle: 'Planificación para cada sonrisa',
    points: ['Opciones para reemplazar un diente, varios dientes o una arcada completa.', 'Evaluación de las condiciones de hueso y encías antes de elegir una alternativa.', 'Planificación digital y cirugía guiada cuando están indicadas para tu caso.'],
    note: 'La indicación, los tiempos y el presupuesto se definen después de una evaluación individual.',
    faqs: [
      ['¿Cómo funciona un implante dental?', 'Es un soporte colocado en el hueso que reemplaza la raíz perdida. Sobre él se fija una corona, un puente o una prótesis.'],
      ['¿Cuándo puede ser recomendable?', 'Cuando falta uno o más dientes. Primero evalúo si es posible conservar las piezas naturales y qué alternativas se adaptan a tu salud bucal.'],
      ['¿Cuáles son las etapas del tratamiento?', 'Evaluación y estudios, planificación, colocación del implante, cicatrización y restauración definitiva. Después se realizan controles y mantenimiento.'],
      ['¿Cuánto cuesta?', 'Depende del número de implantes, la restauración y los procedimientos adicionales. Tras el diagnóstico recibirás un presupuesto con las etapas previstas.'],
      ['¿Para qué sirve la cirugía guiada?', 'Una guía diseñada a partir de estudios digitales ayuda a trasladar la planificación a la cirugía. Su indicación depende del caso.'],
      ['¿Cuánto tiempo lleva?', 'Varía según la cicatrización y la necesidad de tratamientos previos. En la consulta se explican los plazos y las opciones provisionales disponibles.']
    ]
  },
  endodoncia: {
    title: 'Endodoncia',
    intro: 'La endodoncia trata el interior del diente cuando la pulpa está afectada. Su objetivo es conservar la pieza dental cuando es posible.',
    subtitle: 'Cuidar el diente desde adentro',
    points: ['Evaluación y diagnóstico para determinar si necesitas un tratamiento de conductos.', 'Atención con profesionales del área y sistemas de endodoncia mecanizada.', 'Planificación de la restauración posterior y los controles necesarios.'],
    note: 'La cantidad de sesiones y la evolución dependen del diagnóstico y de las características del diente.'
  },
  ortodoncia: {
    title: 'Ortodoncia digital',
    intro: 'Una mordida equilibrada también forma parte de la salud bucal. La evaluación con el especialista permite elegir cómo abordar la posición de tus dientes y la relación entre tus maxilares.',
    subtitle: 'Alternativas y planificación',
    points: ['Brackets y alineadores transparentes según la indicación clínica.', 'Escaneo y estudios digitales para apoyar el diagnóstico y la planificación.', 'Ortopedia maxilofacial e interceptiva para evaluar el crecimiento en niños y adolescentes.'],
    note: 'La alternativa y la duración del tratamiento se definen con el especialista después de la evaluación.'
  }
};

const dialog = document.querySelector('#info-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogBody = document.querySelector('#dialog-body');
const dialogEyebrow = document.querySelector('#dialog-eyebrow');
const dialogCta = document.querySelector('#dialog-cta');
let previousFocus;

function openPanel({ title, eyebrow, html, message, cta }) {
  previousFocus = document.activeElement;
  dialogTitle.textContent = title;
  dialogEyebrow.textContent = eyebrow;
  dialogBody.innerHTML = html;
  dialogCta.href = whatsapp(message);
  dialogCta.firstChild.textContent = `${cta} `;
  closeMenu();
  document.body.classList.add('dialog-open');
  dialog.showModal();
  dialog.scrollTop = 0;
  dialog.querySelector('.dialog-close').focus({ preventScroll: true });
}
document.querySelectorAll('[data-treatment]').forEach((button) => {
  button.addEventListener('click', () => {
    const treatment = treatments[button.dataset.treatment];
    openPanel({
      title: treatment.title,
      eyebrow: 'TRATAMIENTOS · DR. MONSÚ',
      html: treatment.faqs
        ? `<p>${treatment.intro}</p><h3>Resuelve tus dudas sobre implantes</h3><div class="implant-faq">${treatment.faqs.map(([question, answer]) => `<details name="implant-questions"><summary>${question}<span class="faq-symbol" aria-hidden="true"></span></summary><p>${answer}</p></details>`).join('')}</div><p class="dialog-note">${treatment.note}</p>`
        : `<p>${treatment.intro}</p><h3>${treatment.subtitle}</h3><ul>${treatment.points.map((point) => `<li>${point}</li>`).join('')}</ul><p class="dialog-note">${treatment.note}</p>`,
      message: `Hola Dr. Monsú, quisiera información sobre ${treatment.title.toLowerCase()} y coordinar una evaluación.`,
      cta: 'Consulta sobre este tratamiento'
    });
  });
});
document.querySelector('#formation-open').addEventListener('click', () => openPanel({
  title: 'Formación y trayectoria', eyebrow: 'SOBRE EL DR. MONSÚ',
  html: '<p>Soy Maximiliano Monsú Hossly, cirujano dentista graduado en Córdoba, Argentina. Cuento con más de diez años de experiencia y una trayectoria laboral en Argentina, España, Alemania, Suiza y Perú.</p><h3>Estudios de posgrado en</h3><ul><li>Implantología y cirugía periodontal.</li><li>Regeneración ósea guiada.</li><li>Rehabilitación oral adhesiva.</li><li>Odontología digital.</li><li>Endodoncia.</li></ul><p>Mi enfoque combina atención cercana, formación continua y trabajo interdisciplinario.</p><p class="dialog-note">Colegiatura profesional: C.O.P. 50473.</p>',
  message: 'Hola Dr. Monsú, quisiera coordinar una consulta.', cta: 'Conversemos sobre tu consulta'
}));
document.querySelector('#privacy-open').addEventListener('click', () => openPanel({
  title: 'Privacidad y contacto', eyebrow: 'INFORMACIÓN DE ESTA VISTA PREVIA',
  html: '<p>Esta página es una vista previa de presentación profesional. No incluye formularios, cuentas, herramientas de seguimiento ni almacenamiento de consultas en un servidor propio.</p><p>Los botones de contacto abren WhatsApp. Al utilizar ese servicio o Instagram se aplican las condiciones y políticas de sus respectivos proveedores. Las fuentes se cargan desde Google Fonts.</p><p>Las fotografías ilustrativas no representan casos clínicos ni resultados de tratamientos del Dr. Monsú.</p><p class="dialog-note">Antes de una publicación pública, corresponde completar la información de privacidad aplicable al sitio definitivo.</p>',
  message: 'Hola Dr. Monsú, tengo una consulta sobre el contacto y la privacidad de mis datos.', cta: 'Consultar por WhatsApp'
}));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  previousFocus?.focus({ preventScroll: true });
});
