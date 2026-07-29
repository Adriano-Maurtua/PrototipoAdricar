/* =========================================================================
   SORTEOS ADRICAR — app.js
   Frontend 100% funcional con datos simulados (sin backend real).
   Organizado por secciones:
     1. DATOS SIMULADOS
     2. ESTADO GLOBAL
     3. UTILIDADES
     4. TOASTS
     5. MODALES (genérico)
     6. NAV / SCROLL / REVEAL / MOBILE MENU
     7. HERO: countdown + contador animado
     8. TICKER DE VERIFICACIÓN EN VIVO
     9. SORTEOS ACTIVOS (render + filtros + detalle)
    10. PANEL DE VERIFICACIÓN
    11. GANADORES
    12. GALERÍA
    13. TESTIMONIOS
    14. FAQ
    15. WIZARD DE COMPRA
    16. ADMIN: login / navegación
    17. ADMIN: DASHBOARD
    18. ADMIN: TABLA GENÉRICA (buscar, filtrar, ordenar, paginar)
    19. ADMIN: CRUD SORTEOS
    20. ADMIN: CRUD COMPRAS
    21. ADMIN: CRUD CLIENTES
    22. ADMIN: CRUD VENDEDORAS
    23. ADMIN: CRUD OFERTAS
    24. INICIALIZACIÓN
   ========================================================================= */


/* =========================================================================
   1. DATOS SIMULADOS
   ========================================================================= */

// Paletas de gradiente para las tarjetas de sorteo/premio (definidas en styles.css)
const GRADIENTS = ['prize-gradient-1', 'prize-gradient-2', 'prize-gradient-3', 'prize-gradient-4', 'prize-gradient-5', 'prize-gradient-6'];

// Íconos (lucide) representativos por tipo de premio
const PRIZE_ICONS = {
  vehiculo: 'car',
  efectivo: 'banknote',
  tecnologia: 'smartphone',
  moto: 'bike',
  viaje: 'plane',
  electro: 'tv',
};

let sorteos = [
  {
    id: 's1', nombre: 'Sorteo Toyota Yaris 2026', premio: 'Toyota Yaris 2026 0KM + S/ 10,000', tipoPremio: 'producto',
    categoria: 'vehiculo', montoPremio: null, descripcion: 'Toyota Yaris 2026 full equipo, GPS, cámara de retroceso, más S/ 10,000 en efectivo para gastos de placa y seguro.',
    precioTicket: 15, cantidadTickets: 10000, ticketsVendidos: 7820, fechaSorteo: '2026-09-15', estado: 'activo', gradiente: 'prize-gradient-1', icono: 'car',
  },
  {
    id: 's2', nombre: 'Sorteo S/ 50,000 en efectivo', premio: 'S/ 50,000 en efectivo', tipoPremio: 'dinero',
    categoria: 'efectivo', montoPremio: 50000, descripcion: 'Recibe S/ 50,000 directo a tu cuenta o en efectivo, tú decides cómo usarlo.',
    precioTicket: 20, cantidadTickets: 8000, ticketsVendidos: 5120, fechaSorteo: '2026-08-30', estado: 'activo', gradiente: 'prize-gradient-2', icono: 'banknote',
  },
  {
    id: 's3', nombre: 'Sorteo iPhone 16 Pro Max + MacBook Air', premio: 'iPhone 16 Pro Max + MacBook Air M4', tipoPremio: 'producto',
    categoria: 'tecnologia', montoPremio: null, descripcion: 'Combo tecnológico: iPhone 16 Pro Max 256GB y MacBook Air M4, sellados de fábrica con garantía oficial.',
    precioTicket: 10, cantidadTickets: 6000, ticketsVendidos: 4310, fechaSorteo: '2026-08-20', estado: 'activo', gradiente: 'prize-gradient-3', icono: 'smartphone',
  },
  {
    id: 's4', nombre: 'Sorteo Moto Honda CB190R', premio: 'Moto Honda CB190R 0KM', tipoPremio: 'producto',
    categoria: 'moto', montoPremio: null, descripcion: 'Honda CB190R 0KM, papeles en regla, lista para transferir a tu nombre.',
    precioTicket: 8, cantidadTickets: 5000, ticketsVendidos: 4870, fechaSorteo: '2026-08-10', estado: 'activo', gradiente: 'prize-gradient-4', icono: 'bike',
  },
  {
    id: 's5', nombre: 'Sorteo S/ 15,000 en efectivo', premio: 'S/ 15,000 en efectivo', tipoPremio: 'dinero',
    categoria: 'efectivo', montoPremio: 15000, descripcion: 'Premio en efectivo, entrega inmediata al ganador tras validar sus datos.',
    precioTicket: 5, cantidadTickets: 4000, ticketsVendidos: 1180, fechaSorteo: '2026-09-05', estado: 'activo', gradiente: 'prize-gradient-5', icono: 'banknote',
  },
  {
    id: 's6', nombre: 'Sorteo Viaje a Cancún', premio: 'Viaje a Cancún todo incluido (2 personas)', tipoPremio: 'producto',
    categoria: 'viaje', montoPremio: null, descripcion: '7 noches en resort todo incluido para 2 personas, vuelos y traslados cubiertos.',
    precioTicket: 12, cantidadTickets: 3500, ticketsVendidos: 640, fechaSorteo: '2026-10-02', estado: 'proximo', gradiente: 'prize-gradient-6', icono: 'plane',
  },
  {
    id: 's7', nombre: 'Sorteo Combo Smart TV + PlayStation 5', premio: 'Smart TV 65" + PlayStation 5', tipoPremio: 'producto',
    categoria: 'electro', montoPremio: null, descripcion: 'Smart TV 65 pulgadas 4K y consola PlayStation 5 con un control adicional.',
    precioTicket: 6, cantidadTickets: 4500, ticketsVendidos: 4500, fechaSorteo: '2026-06-28', estado: 'finalizado', gradiente: 'prize-gradient-3', icono: 'tv',
  },
  {
    id: 's8', nombre: 'Sorteo S/ 20,000 en efectivo', premio: 'S/ 20,000 en efectivo', tipoPremio: 'dinero',
    categoria: 'efectivo', montoPremio: 20000, descripcion: 'S/ 20,000 en efectivo entregados en ceremonia pública.',
    precioTicket: 10, cantidadTickets: 5000, ticketsVendidos: 5000, fechaSorteo: '2026-06-10', estado: 'finalizado', gradiente: 'prize-gradient-2', icono: 'banknote',
  },
];

// Ofertas por cantidad (aplicación automática en el flujo de compra)
let ofertas = [
  { id: 'o1', nombre: '2x1', cantidadMinima: 1, cantidadEntregada: 2, inicio: '2026-06-01', fin: '2026-12-31', estado: 'activa' },
  { id: 'o2', nombre: '3x2', cantidadMinima: 2, cantidadEntregada: 3, inicio: '2026-06-01', fin: '2026-12-31', estado: 'activa' },
  { id: 'o3', nombre: '4x3', cantidadMinima: 3, cantidadEntregada: 4, inicio: '2026-06-01', fin: '2026-12-31', estado: 'activa' },
  { id: 'o4', nombre: '5x4', cantidadMinima: 4, cantidadEntregada: 5, inicio: '2026-06-01', fin: '2026-12-31', estado: 'activa' },
  { id: 'o5', nombre: '10x8', cantidadMinima: 8, cantidadEntregada: 10, inicio: '2026-06-01', fin: '2026-12-31', estado: 'activa' },
];

let vendedoras = [
  { id: 'v1', nombre: 'Lucía', apellido: 'Torres Vega', correo: 'lucia.torres@adricar.pe', telefono: '987 111 222', estado: 'activa', ventas: 18420, comisiones: 1842, ticketsVendidos: 1240 },
  { id: 'v2', nombre: 'Rosa', apellido: 'Mendoza Díaz', correo: 'rosa.mendoza@adricar.pe', telefono: '987 222 333', estado: 'activa', ventas: 24980, comisiones: 2498, ticketsVendidos: 1610 },
  { id: 'v3', nombre: 'Carla', apellido: 'Ramírez Soto', correo: 'carla.ramirez@adricar.pe', telefono: '987 333 444', estado: 'activa', ventas: 12760, comisiones: 1276, ticketsVendidos: 890 },
  { id: 'v4', nombre: 'Milagros', apellido: 'Quispe Flores', correo: 'milagros.quispe@adricar.pe', telefono: '987 444 555', estado: 'inactiva', ventas: 6320, comisiones: 632, ticketsVendidos: 410 },
  { id: 'v5', nombre: 'Diana', apellido: 'Salazar Ríos', correo: 'diana.salazar@adricar.pe', telefono: '987 555 666', estado: 'activa', ventas: 31150, comisiones: 3115, ticketsVendidos: 2040 },
];

let clientes = [
  { id: 'c1', nombre: 'Miguel', apellido: 'Reyes Paredes', dni: '45678912', telefono: '987654321', correo: 'miguel.reyes@gmail.com', fechaRegistro: '2026-05-02' },
  { id: 'c2', nombre: 'Luisa', apellido: 'Torres Cabrera', dni: '41234567', telefono: '956123456', correo: 'luisa.torres@gmail.com', fechaRegistro: '2026-05-10' },
  { id: 'c3', nombre: 'Jorge', apellido: 'Santos Alva', dni: '48765432', telefono: '944556677', correo: 'jorge.santos@hotmail.com', fechaRegistro: '2026-05-14' },
  { id: 'c4', nombre: 'Andrea', apellido: 'Vásquez León', dni: '47123890', telefono: '933221144', correo: 'andrea.vasquez@gmail.com', fechaRegistro: '2026-06-01' },
  { id: 'c5', nombre: 'Renato', apellido: 'Chávez Ortiz', dni: '46789123', telefono: '922334455', correo: 'renato.chavez@gmail.com', fechaRegistro: '2026-06-08' },
  { id: 'c6', nombre: 'Fiorella', apellido: 'Castillo Rojas', dni: '43219876', telefono: '911223344', correo: 'fiorella.castillo@gmail.com', fechaRegistro: '2026-06-15' },
  { id: 'c7', nombre: 'Elmer', apellido: 'Huamán Ticona', dni: '49988776', telefono: '999887766', correo: 'elmer.huaman@gmail.com', fechaRegistro: '2026-06-20' },
];

let compras = [
  { id: 'p1001', clienteId: 'c1', sorteoId: 's1', cantidadTickets: 5, montoTotal: 60, metodoPago: 'Yape', numeroOperacion: '00458712', vendedoraId: 'v1', estado: 'aprobado', fecha: '2026-07-20 14:32', ticketsCodigos: ['SA-8841-A2', 'SA-8841-A3', 'SA-8841-A4', 'SA-8841-A5', 'SA-8841-A6'] },
  { id: 'p1002', clienteId: 'c2', sorteoId: 's2', cantidadTickets: 2, montoTotal: 40, metodoPago: 'Yape', numeroOperacion: '00458821', vendedoraId: 'v2', estado: 'aprobado', fecha: '2026-07-21 09:14', ticketsCodigos: ['SA-2210-B1', 'SA-2210-B2'] },
  { id: 'p1003', clienteId: 'c3', sorteoId: 's1', cantidadTickets: 3, montoTotal: 33.75, metodoPago: 'Yape', numeroOperacion: '00459012', vendedoraId: 'v1', estado: 'pendiente', fecha: '2026-07-27 18:02', ticketsCodigos: ['SA-8841-C1', 'SA-8841-C2', 'SA-8841-C3'] },
  { id: 'p1004', clienteId: 'c4', sorteoId: 's3', cantidadTickets: 4, montoTotal: 30, metodoPago: 'Yape', numeroOperacion: '00459133', vendedoraId: 'v5', estado: 'pendiente', fecha: '2026-07-28 11:47', ticketsCodigos: ['SA-1190-D1', 'SA-1190-D2', 'SA-1190-D3', 'SA-1190-D4'] },
  { id: 'p1005', clienteId: 'c5', sorteoId: 's4', cantidadTickets: 8, montoTotal: 64, metodoPago: 'Yape', numeroOperacion: '00459287', vendedoraId: 'v3', estado: 'aprobado', fecha: '2026-07-22 16:20', ticketsCodigos: ['SA-7761-E1', 'SA-7761-E2', 'SA-7761-E3', 'SA-7761-E4', 'SA-7761-E5', 'SA-7761-E6', 'SA-7761-E7', 'SA-7761-E8'] },
  { id: 'p1006', clienteId: 'c6', sorteoId: 's2', cantidadTickets: 1, montoTotal: 20, metodoPago: 'Yape', numeroOperacion: '00459355', vendedoraId: 'v2', estado: 'rechazado', fecha: '2026-07-25 20:11', ticketsCodigos: ['SA-2210-F1'] },
  { id: 'p1007', clienteId: 'c7', sorteoId: 's5', cantidadTickets: 4, montoTotal: 20, metodoPago: 'Yape', numeroOperacion: '00459410', vendedoraId: 'v5', estado: 'pendiente', fecha: '2026-07-28 08:55', ticketsCodigos: ['SA-3390-G1', 'SA-3390-G2', 'SA-3390-G3', 'SA-3390-G4'] },
  { id: 'p1008', clienteId: 'c1', sorteoId: 's4', cantidadTickets: 2, montoTotal: 16, metodoPago: 'Yape', numeroOperacion: '00459502', vendedoraId: 'v1', estado: 'aprobado', fecha: '2026-07-19 13:05', ticketsCodigos: ['SA-7761-H1', 'SA-7761-H2'] },
];

let ganadores = [
  { id: 'g1', nombre: 'Roberto C.', premio: 'Smart TV 65" + PlayStation 5', sorteoNombre: 'Sorteo Combo Smart TV + PlayStation 5', fecha: '2026-06-29', comentario: 'No lo podía creer, verifiqué mi ticket tres veces antes de llamar. ¡Todo tal cual decía la web!', color: 'linear-gradient(135deg,#3D4FA0,#1B2456)' },
  { id: 'g2', nombre: 'Yasmín P.', premio: 'S/ 20,000 en efectivo', sorteoNombre: 'Sorteo S/ 20,000 en efectivo', fecha: '2026-06-11', comentario: 'El depósito llegó el mismo día del sorteo. Proceso rápido y muy transparente.', color: 'linear-gradient(135deg,#E9A23B,#C9861F)' },
  { id: 'g3', nombre: 'Antonio M.', premio: 'Moto Honda CB190R 0KM', sorteoNombre: 'Sorteo Moto Honda CB190R', fecha: '2026-05-18', comentario: 'Ya tengo mi moto a mi nombre. El equipo de Adricar me acompañó en todo el trámite.', color: 'linear-gradient(135deg,#0FA968,#0b7a4c)' },
  { id: 'g4', nombre: 'Grecia S.', premio: 'iPhone 15 Pro', sorteoNombre: 'Sorteo iPhone 15 Pro', fecha: '2026-04-30', comentario: 'Compré solo 2 tickets con la oferta 2x1 y gané. Sigo sin creerlo.', color: 'linear-gradient(135deg,#5B6478,#1B2456)' },
  { id: 'g5', nombre: 'Franco L.', premio: 'S/ 12,000 en efectivo', sorteoNombre: 'Sorteo S/ 12,000 en efectivo', fecha: '2026-04-12', comentario: 'Verifiqué mi participación varias veces antes del sorteo, todo coincidía perfecto.', color: 'linear-gradient(135deg,#4C5FC7,#3D4FA0)' },
  { id: 'g6', nombre: 'Karina D.', premio: 'Laptop + Combo Gamer', sorteoNombre: 'Sorteo Laptop Gamer', fecha: '2026-03-22', comentario: 'La entrega fue en mi ciudad, sin costo adicional. Muy recomendados.', color: 'linear-gradient(135deg,#F0AD4C,#E9A23B)' },
];

let galeria = [
  { id: 'gl1', tipo: 'foto', titulo: 'Entrega Toyota Yaris — Trujillo', gradiente: 'prize-gradient-1' },
  { id: 'gl2', tipo: 'video', titulo: 'Sorteo en vivo — Junio 2026', gradiente: 'prize-gradient-4' },
  { id: 'gl3', tipo: 'foto', titulo: 'Entrega S/ 20,000 en efectivo', gradiente: 'prize-gradient-2' },
  { id: 'gl4', tipo: 'foto', titulo: 'Entrega Moto Honda CB190R', gradiente: 'prize-gradient-5' },
  { id: 'gl5', tipo: 'video', titulo: 'Testimonio ganador — Roberto C.', gradiente: 'prize-gradient-3' },
  { id: 'gl6', tipo: 'foto', titulo: 'Entrega combo tecnológico', gradiente: 'prize-gradient-6' },
  { id: 'gl7', tipo: 'foto', titulo: 'Equipo Adricar en vivo', gradiente: 'prize-gradient-4' },
  { id: 'gl8', tipo: 'video', titulo: 'Proceso de verificación explicado', gradiente: 'prize-gradient-1' },
];

let testimonios = [
  { id: 't1', nombre: 'Miguel Reyes', comentario: 'Compré mis tickets un jueves y el domingo ya los tenía verificados en la web. Se siente serio.', rating: 5, iniciales: 'MR' },
  { id: 't2', nombre: 'Luisa Torres', comentario: 'Me gustó poder buscar mi participación con mi DNI antes del sorteo, sin tener que escribir a nadie.', rating: 5, iniciales: 'LT' },
  { id: 't3', nombre: 'Jorge Santos', comentario: 'La oferta 3x2 hizo que valiera mucho la pena. Todo clarísimo desde el primer momento.', rating: 4, iniciales: 'JS' },
  { id: 't4', nombre: 'Andrea Vásquez', comentario: 'Pagué con Yape y en minutos ya tenía mis códigos. Cero complicaciones.', rating: 5, iniciales: 'AV' },
  { id: 't5', nombre: 'Renato Chávez', comentario: 'Vi los videos de entregas anteriores y eso me dio la confianza para participar.', rating: 5, iniciales: 'RC' },
  { id: 't6', nombre: 'Fiorella Castillo', comentario: 'El panel de verificación es lo que más me gustó, se siente transparente de verdad.', rating: 4, iniciales: 'FC' },
];

let faqs = [
  { id: 'f1', pregunta: '¿Cómo sé que el sorteo es legítimo?', respuesta: 'Cada ganador se publica con nombre, premio, fecha y evidencia de entrega en la sección "Ganadores". Además, puedes verificar tu propia participación en cualquier momento desde el panel de verificación, no solo el día del sorteo.' },
  { id: 'f2', pregunta: '¿Qué pasa si mi comprobante de Yape aún no fue aprobado?', respuesta: 'Tu compra queda en estado "Pendiente" mientras el equipo confirma el pago. Este proceso suele tardar minutos. Puedes revisar el estado en cualquier momento desde el panel de verificación con tu DNI, teléfono o código de ticket.' },
  { id: 'f3', pregunta: '¿Las ofertas 2x1, 3x2, 4x3, 5x4 y 10x8 se aplican automáticamente?', respuesta: 'Sí. Al elegir la cantidad de tickets en el flujo de compra, el sistema detecta la mejor oferta disponible para esa cantidad y la aplica sola, mostrando cuántos tickets adicionales recibes.' },
  { id: 'f4', pregunta: '¿Cómo se elige al ganador?', respuesta: 'El sorteo se realiza el día programado usando los códigos de ticket ya asignados. El resultado se publica en la sección de Ganadores junto con la evidencia correspondiente.' },
  { id: 'f5', pregunta: '¿Puedo comprar tickets para más de un sorteo?', respuesta: 'Sí, puedes participar en todos los sorteos activos que quieras. Cada compra genera códigos de ticket independientes para el sorteo elegido.' },
  { id: 'f6', pregunta: '¿Qué pasa si gano un premio en efectivo o un producto físico?', respuesta: 'Si es efectivo, coordinamos la entrega o depósito según prefieras. Si es un producto físico, coordinamos el lugar y fecha de entrega, y publicamos evidencia con tu autorización.' },
];


/* =========================================================================
   2. ESTADO GLOBAL
   ========================================================================= */

const state = {
  raffleFilter: 'todos',
  galleryFilter: 'todos',
  verifyMethod: 'dni',
  purchase: {
    step: 1,
    sorteoId: null,
    cantidad: 2,
    appliedOffer: null,
    buyer: { nombre: '', dni: '', telefono: '', correo: '' },
    operationNumber: '',
    voucherFile: null,
    createdPurchase: null,
  },
  admin: {
    page: 'dashboard',
    tables: {
      sorteos: { search: '', filter: 'todos', sortKey: 'nombre', sortDir: 'asc', page: 1, pageSize: 5 },
      compras: { search: '', filter: 'todos', sortKey: 'fecha', sortDir: 'desc', page: 1, pageSize: 6 },
      clientes: { search: '', filter: 'todos', sortKey: 'nombre', sortDir: 'asc', page: 1, pageSize: 6 },
      vendedoras: { search: '', filter: 'todos', sortKey: 'nombre', sortDir: 'asc', page: 1, pageSize: 6 },
      ofertas: { search: '', filter: 'todos', sortKey: 'nombre', sortDir: 'asc', page: 1, pageSize: 6 },
    },
  },
  editing: { type: null, id: null }, // usado por los modales genéricos de CRUD
  confirmAction: null, // callback pendiente del modal de confirmación
};


/* =========================================================================
   3. UTILIDADES
   ========================================================================= */

function formatCurrency(n) {
  return 'S/ ' + Number(n).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatNumber(n) {
  return Number(n).toLocaleString('es-PE');
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + (dateStr.length <= 10 ? 'T00:00:00' : ''));
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  return dateStr; // ya vienen formateados en los datos simulados (YYYY-MM-DD HH:mm)
}

function generateId(prefix) {
  return prefix + '-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function formatNowAsSeedDate() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function generateTicketCode(sorteoId) {
  const block = Math.floor(1000 + Math.random() * 9000);
  const suffix = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Math.floor(Math.random() * 9);
  return `SA-${block}-${suffix}`;
}

function findSorteo(id) { return sorteos.find(s => s.id === id); }
function findCliente(id) { return clientes.find(c => c.id === id); }
function findVendedora(id) { return vendedoras.find(v => v.id === id); }

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function initialsOf(nombre, apellido) {
  const a = (nombre || '').trim()[0] || '';
  const b = (apellido || '').trim()[0] || '';
  return (a + b).toUpperCase() || '--';
}

function avatarColorFor(seed) {
  const palette = [
    'linear-gradient(135deg,#3D4FA0,#1B2456)',
    'linear-gradient(135deg,#E9A23B,#C9861F)',
    'linear-gradient(135deg,#0FA968,#0b7a4c)',
    'linear-gradient(135deg,#5B6478,#1B2456)',
    'linear-gradient(135deg,#4C5FC7,#3D4FA0)',
  ];
  let hash = 0;
  const s = String(seed);
  for (let i = 0; i < s.length; i++) hash = s.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

// Vuelve a pintar los íconos lucide recién insertados en el DOM
function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}


/* =========================================================================
   4. TOASTS
   ========================================================================= */

const TOAST_ICONS = {
  success: 'check-circle-2',
  error: 'x-circle',
  info: 'info',
};

function showToast(type, title, message) {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `
    <span class="toast-icon ${type}"><i data-lucide="${TOAST_ICONS[type] || 'info'}" class="w-4 h-4"></i></span>
    <div class="min-w-0">
      <p class="toast-title">${escapeHtml(title)}</p>
      ${message ? `<p class="toast-msg">${escapeHtml(message)}</p>` : ''}
    </div>
  `;
  container.appendChild(el);
  refreshIcons();

  setTimeout(() => {
    el.classList.add('is-leaving');
    setTimeout(() => el.remove(), 260);
  }, 4200);
}


/* =========================================================================
   5. MODALES (genérico)
   ========================================================================= */

function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  refreshIcons();
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('hidden');
  document.body.style.overflow = '';
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
  document.body.style.overflow = '';
}

// Abre el modal de confirmación genérico (usado para eliminar / aprobar / rechazar)
function openConfirm({ title, message, acceptLabel = 'Confirmar', tone = 'danger', onAccept }) {
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-message').textContent = message;
  const btn = document.getElementById('confirm-accept-btn');
  btn.textContent = acceptLabel;
  btn.className = tone === 'danger' ? 'btn-danger flex-1 justify-center py-2.5' : 'btn-primary flex-1 justify-center py-2.5';

  const iconWrap = document.getElementById('confirm-icon');
  iconWrap.className = tone === 'danger' ? 'confirm-icon' : 'confirm-icon success';
  iconWrap.innerHTML = `<i data-lucide="${tone === 'danger' ? 'alert-triangle' : 'check'}" class="w-6 h-6"></i>`;

  state.confirmAction = onAccept;
  openModal('modal-confirm');
}

function renderGenericModal(title, bodyHtml, footerHtml) {
  document.getElementById('generic-modal-title').textContent = title;
  document.getElementById('generic-modal-body').innerHTML = bodyHtml;
  document.getElementById('generic-modal-footer').innerHTML = footerHtml;
  refreshIcons();
}


/* =========================================================================
   6. NAV / SCROLL / REVEAL / MOBILE MENU
   ========================================================================= */

function initHeaderScroll() {
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    btn.innerHTML = menu.classList.contains('hidden')
      ? '<i data-lucide="menu" class="w-5 h-5"></i>'
      : '<i data-lucide="x" class="w-5 h-5"></i>';
    refreshIcons();
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.add('hidden');
    btn.innerHTML = '<i data-lucide="menu" class="w-5 h-5"></i>';
    refreshIcons();
  }));
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initRevealOnScroll() {
  const items = document.querySelectorAll('.reveal-up');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  items.forEach(el => io.observe(el));
}


/* =========================================================================
   7. HERO: countdown + contador animado
   ========================================================================= */

function initHeroCountdown() {
  const box = document.getElementById('hero-countdown');
  if (!box) return;
  const heroSorteo = findSorteo('s1');
  const target = new Date(heroSorteo.fechaSorteo + 'T20:00:00').getTime();

  function tick() {
    const now = Date.now();
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    box.querySelector('[data-unit="days"]').textContent = String(days).padStart(2, '0');
    box.querySelector('[data-unit="hours"]').textContent = String(hours).padStart(2, '0');
    box.querySelector('[data-unit="minutes"]').textContent = String(minutes).padStart(2, '0');
    box.querySelector('[data-unit="seconds"]').textContent = String(seconds).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
}

function animateCounter(el, target, duration = 1400) {
  const start = 0;
  const startTime = performance.now();
  function frame(now) {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatNumber(Math.floor(start + (target - start) * eased));
    if (progress < 1) requestAnimationFrame(frame);
    else el.textContent = formatNumber(target);
  }
  requestAnimationFrame(frame);
}

function initHeroCounters() {
  document.querySelectorAll('.counter-target').forEach(el => {
    const target = Number(el.dataset.target || 0);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(el, target);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
  });

  document.querySelectorAll('.progress-fill').forEach(el => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.style.width = el.dataset.fill + '%';
          io.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
  });
}


/* =========================================================================
   8. TICKER DE VERIFICACIÓN EN VIVO
   ========================================================================= */

function buildTickerItems() {
  const nombres = ['Miguel R.', 'Luisa T.', 'Jorge S.', 'Andrea V.', 'Renato Ch.', 'Fiorella C.', 'Elmer H.', 'Karina D.', 'Franco L.', 'Grecia S.'];
  const items = [];
  for (let i = 0; i < 14; i++) {
    const nombre = nombres[i % nombres.length];
    const sorteo = sorteos[i % sorteos.length];
    const code = generateTicketCode();
    items.push(`<span class="ticker-item"><i data-lucide="badge-check" class="w-3.5 h-3.5 text-adricar-emerald"></i> <strong>${nombre}</strong> verificó su ticket <span class="t-code">${code}</span> en «${sorteo.nombre.replace('Sorteo ', '')}»</span>`);
  }
  return items;
}

function initVerifyTicker() {
  const track = document.getElementById('verify-ticker');
  const items = buildTickerItems();
  // Duplicamos el contenido para lograr un loop continuo sin saltos
  track.innerHTML = items.join('') + items.join('');
  refreshIcons();
}


/* =========================================================================
   9. SORTEOS ACTIVOS (render + filtros + detalle)
   ========================================================================= */

function raffleCardHtml(s) {
  const soldPct = Math.min(100, Math.round((s.ticketsVendidos / s.cantidadTickets) * 100));
  const statusLabel = { activo: 'Activo', proximo: 'Próximo', finalizado: 'Finalizado' }[s.estado];
  const premioTexto = s.tipoPremio === 'dinero' ? formatCurrency(s.montoPremio) : s.premio;

  return `
  <div class="raffle-card">
    <div class="raffle-visual ${s.gradiente}">
      <span class="raffle-status-pill ${s.estado}">${statusLabel}</span>
      <span class="chip-dark" style="position:absolute;top:12px;right:12px;">${s.tipoPremio === 'dinero' ? 'Efectivo' : 'Producto'}</span>
      <i data-lucide="${s.icono}" class="w-16 h-16 text-white/90" style="stroke-width:1.3"></i>
    </div>
    <div class="p-5">
      <h3 class="font-display font-semibold text-lg text-adricar-indigo leading-snug">${escapeHtml(s.nombre.replace('Sorteo ', ''))}</h3>
      <p class="text-sm text-adricar-muted mt-1.5 line-clamp-2">${escapeHtml(s.descripcion)}</p>

      <div class="flex items-center justify-between mt-4 text-sm">
        <span class="text-adricar-muted">Ticket</span>
        <span class="font-semibold text-adricar-indigo">${formatCurrency(s.precioTicket)}</span>
      </div>
      <div class="flex items-center justify-between mt-1.5 text-sm">
        <span class="text-adricar-muted">Sorteo</span>
        <span class="font-semibold text-adricar-indigo">${formatDate(s.fechaSorteo)}</span>
      </div>

      <div class="mt-4">
        <div class="flex justify-between text-xs mb-1.5">
          <span class="text-adricar-muted">${formatNumber(s.ticketsVendidos)} vendidos</span>
          <span class="font-semibold text-adricar-indigo">${formatNumber(s.cantidadTickets - s.ticketsVendidos)} disponibles</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${soldPct}%"></div></div>
      </div>

      <div class="flex gap-2 mt-5">
        <button class="btn-gold flex-1 justify-center text-sm py-2.5" data-action="open-purchase" data-sorteo-id="${s.id}" ${s.estado === 'finalizado' ? 'disabled' : ''}>Comprar</button>
        <button class="btn-outline justify-center text-sm py-2.5 px-3.5" data-action="view-raffle" data-sorteo-id="${s.id}"><i data-lucide="eye" class="w-4 h-4"></i></button>
      </div>
    </div>
  </div>`;
}

function renderRaffles() {
  const grid = document.getElementById('raffles-grid');
  const filtered = sorteos.filter(s => {
    if (state.raffleFilter === 'todos') return true;
    return s.tipoPremio === state.raffleFilter;
  });

  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-state col-span-full"><i data-lucide="inbox" class="w-9 h-9"></i><p class="font-semibold text-adricar-indigo">No hay sorteos en esta categoría</p><p class="text-sm mt-1">Prueba con otro filtro.</p></div>`;
    refreshIcons();
    return;
  }
  grid.innerHTML = filtered.map(raffleCardHtml).join('');
  refreshIcons();
}

// Simula una carga real: muestra skeletons unos instantes antes de pintar las tarjetas
function loadRafflesWithSkeleton() {
  setTimeout(() => {
    renderRaffles();
    const grid = document.getElementById('raffles-grid');
    grid.querySelectorAll('.raffle-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(14px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 70);
    });
  }, 700);
}

function initRaffleFilters() {
  document.getElementById('raffle-filters').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-chip');
    if (!btn) return;
    document.querySelectorAll('#raffle-filters .filter-chip').forEach(c => c.classList.remove('is-active'));
    btn.classList.add('is-active');
    state.raffleFilter = btn.dataset.filter;
    renderRaffles();
  });
}

function openRaffleDetails(sorteoId) {
  const s = findSorteo(sorteoId);
  if (!s) return;
  const soldPct = Math.min(100, Math.round((s.ticketsVendidos / s.cantidadTickets) * 100));
  const statusLabel = { activo: 'Activo', proximo: 'Próximo', finalizado: 'Finalizado' }[s.estado];

  document.getElementById('raffle-details-body').innerHTML = `
    <div class="raffle-visual ${s.gradiente}" style="height:220px; border-radius:1.5rem 1.5rem 0 0;">
      <span class="raffle-status-pill ${s.estado}">${statusLabel}</span>
      <i data-lucide="${s.icono}" class="w-20 h-20 text-white/90" style="stroke-width:1.2"></i>
    </div>
    <div class="p-7">
      <p class="eyebrow">${s.tipoPremio === 'dinero' ? 'Premio en efectivo' : 'Premio físico'}</p>
      <h3 class="font-display font-semibold text-2xl text-adricar-indigo mt-1">${escapeHtml(s.premio)}</h3>
      <p class="text-adricar-muted mt-3 leading-relaxed">${escapeHtml(s.descripcion)}</p>

      <div class="grid grid-cols-3 gap-3 mt-6">
        <div class="rounded-xl border border-adricar-line p-3.5 text-center">
          <p class="text-xs text-adricar-muted">Precio ticket</p>
          <p class="font-display font-semibold text-adricar-indigo mt-1">${formatCurrency(s.precioTicket)}</p>
        </div>
        <div class="rounded-xl border border-adricar-line p-3.5 text-center">
          <p class="text-xs text-adricar-muted">Fecha sorteo</p>
          <p class="font-display font-semibold text-adricar-indigo mt-1">${formatDate(s.fechaSorteo)}</p>
        </div>
        <div class="rounded-xl border border-adricar-line p-3.5 text-center">
          <p class="text-xs text-adricar-muted">Disponibles</p>
          <p class="font-display font-semibold text-adricar-indigo mt-1">${formatNumber(s.cantidadTickets - s.ticketsVendidos)}</p>
        </div>
      </div>

      <div class="mt-6">
        <div class="flex justify-between text-xs mb-1.5">
          <span class="text-adricar-muted">${formatNumber(s.ticketsVendidos)} / ${formatNumber(s.cantidadTickets)} tickets vendidos</span>
          <span class="font-semibold text-adricar-indigo">${soldPct}%</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${soldPct}%"></div></div>
      </div>

      <button class="btn-gold w-full justify-center py-3.5 mt-7" data-action="open-purchase" data-sorteo-id="${s.id}" data-close-first="modal-raffle-details" ${s.estado === 'finalizado' ? 'disabled' : ''}>
        <i data-lucide="ticket" class="w-[18px] h-[18px]"></i> Comprar tickets de este sorteo
      </button>
    </div>
  `;
  openModal('modal-raffle-details');
}


/* =========================================================================
   10. PANEL DE VERIFICACIÓN
   ========================================================================= */

const VERIFY_PLACEHOLDERS = {
  dni: { label: 'Ingresa tu DNI', placeholder: 'Ej. 45678912' },
  telefono: { label: 'Ingresa tu teléfono', placeholder: 'Ej. 987654321' },
  codigo: { label: 'Ingresa el código de tu ticket', placeholder: 'Ej. SA-8841-A2' },
};

function initVerifyTabs() {
  document.getElementById('verify-tabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.verify-tab');
    if (!btn) return;
    document.querySelectorAll('.verify-tab').forEach(t => t.classList.remove('is-active'));
    btn.classList.add('is-active');
    state.verifyMethod = btn.dataset.method;
    const meta = VERIFY_PLACEHOLDERS[state.verifyMethod];
    document.getElementById('verify-label').textContent = meta.label;
    const input = document.getElementById('verify-input');
    input.placeholder = meta.placeholder;
    input.value = '';
    document.getElementById('verify-result').innerHTML = '';
  });
}

function findComprasByQuery(method, rawValue) {
  const value = rawValue.trim().toLowerCase();
  if (!value) return [];

  if (method === 'codigo') {
    return compras.filter(p => p.ticketsCodigos.some(t => t.toLowerCase() === value));
  }
  if (method === 'dni') {
    const cliente = clientes.find(c => c.dni === rawValue.trim());
    if (!cliente) return [];
    return compras.filter(p => p.clienteId === cliente.id);
  }
  if (method === 'telefono') {
    const cliente = clientes.find(c => c.telefono.replace(/\s/g, '') === rawValue.trim().replace(/\s/g, ''));
    if (!cliente) return [];
    return compras.filter(p => p.clienteId === cliente.id);
  }
  return [];
}

function renderVerifyResult(results, method, rawValue) {
  const box = document.getElementById('verify-result');

  if (!results.length) {
    box.innerHTML = `
      <div class="verify-result-card">
        <div class="empty-state !py-8">
          <i data-lucide="search-x" class="w-8 h-8"></i>
          <p class="font-semibold text-adricar-indigo">No encontramos ninguna participación</p>
          <p class="text-sm mt-1">Revisa el dato ingresado o prueba con otro método de búsqueda.</p>
        </div>
      </div>`;
    refreshIcons();
    return;
  }

  const cardsHtml = results.map(p => {
    const cliente = findCliente(p.clienteId);
    const sorteo = findSorteo(p.sorteoId);
    const vendedora = findVendedora(p.vendedoraId);
    const highlightCode = method === 'codigo' ? p.ticketsCodigos.find(t => t.toLowerCase() === rawValue.trim().toLowerCase()) : null;

    return `
    <div class="verify-result-card mt-4">
      <div class="bg-adricar-emeraldPale px-5 py-3.5 flex items-center gap-2.5">
        <span class="success-check !w-8 !h-8"><i data-lucide="check" class="w-4 h-4"></i></span>
        <div>
          <p class="text-sm font-bold text-adricar-emerald" style="color:#0b7a4c;">Participación verificada</p>
          <p class="text-xs text-adricar-muted">Compra ${p.id.toUpperCase()}</p>
        </div>
      </div>
      <div class="verify-row"><span>Cliente</span><span>${escapeHtml(cliente.nombre)} ${escapeHtml(cliente.apellido)}</span></div>
      <div class="verify-row"><span>Sorteo</span><span>${escapeHtml(sorteo.nombre.replace('Sorteo ', ''))}</span></div>
      <div class="verify-row"><span>Tickets asignados</span><span class="font-mono">${p.ticketsCodigos.map(t => highlightCode === t ? `<u>${t}</u>` : t).join(', ')}</span></div>
      <div class="verify-row"><span>Estado</span><span><span class="status-badge ${p.estado}">${p.estado}</span></span></div>
      <div class="verify-row"><span>Fecha de compra</span><span>${p.fecha}</span></div>
      <div class="verify-row"><span>Método de pago</span><span>${p.metodoPago}</span></div>
      <div class="verify-row"><span>Vendedora</span><span>${vendedora ? escapeHtml(vendedora.nombre) + ' ' + escapeHtml(vendedora.apellido) : '—'}</span></div>
      <div class="p-5 flex items-center gap-4 border-t border-adricar-line">
        <div class="qr-box !w-20 !h-20 !p-2"><div class="qr-fake"></div></div>
        <p class="text-xs text-adricar-muted">Código QR simulado de tu compra. Puedes mostrarlo el día del sorteo como respaldo adicional.</p>
      </div>
    </div>`;
  }).join('');

  box.innerHTML = cardsHtml;
  refreshIcons();
}

function initVerifySubmit() {
  const submit = () => {
    const value = document.getElementById('verify-input').value;
    if (!value.trim()) {
      showToast('error', 'Falta un dato', 'Escribe un valor para poder verificar tu participación.');
      return;
    }
    const btn = document.getElementById('verify-submit');
    btn.disabled = true;
    btn.innerHTML = '<i data-lucide="loader-2" class="w-[18px] h-[18px] animate-spin"></i> Buscando…';
    refreshIcons();

    setTimeout(() => {
      const results = findComprasByQuery(state.verifyMethod, value);
      renderVerifyResult(results, state.verifyMethod, value);
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="search" class="w-[18px] h-[18px]"></i> Verificar';
      refreshIcons();
      if (results.length) showToast('success', 'Participación encontrada', `Se encontraron ${results.length} compra(s) asociadas.`);
    }, 650);
  };

  document.getElementById('verify-submit').addEventListener('click', submit);
  document.getElementById('verify-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submit();
  });
}


/* =========================================================================
   11. GANADORES
   ========================================================================= */

function winnerCardHtml(g) {
  return `
  <div class="winner-card">
    <div class="flex items-center gap-3">
      <div class="winner-avatar" style="background:${g.color}">${initialsOf(g.nombre, '')}</div>
      <div>
        <p class="font-display font-semibold text-adricar-indigo">${escapeHtml(g.nombre)}</p>
        <p class="text-xs text-adricar-muted">${formatDate(g.fecha)}</p>
      </div>
      <span class="status-badge ganador ml-auto"><i data-lucide="trophy" class="w-3 h-3"></i> Ganador</span>
    </div>
    <p class="text-sm font-semibold text-adricar-goldDark mt-4">${escapeHtml(g.premio)}</p>
    <p class="text-sm text-adricar-muted mt-2 leading-relaxed">&ldquo;${escapeHtml(g.comentario)}&rdquo;</p>
    <button class="btn-outline text-sm py-2 px-3.5 mt-4" data-action="view-evidence" data-winner-id="${g.id}">
      <i data-lucide="image" class="w-4 h-4"></i> Ver evidencia
    </button>
  </div>`;
}

function renderWinners() {
  document.getElementById('winners-grid').innerHTML = ganadores.map(winnerCardHtml).join('');
  refreshIcons();
}

function viewWinnerEvidence(winnerId) {
  const g = ganadores.find(x => x.id === winnerId);
  if (!g) return;
  document.getElementById('details-modal-title').textContent = 'Evidencia de entrega';
  document.getElementById('details-modal-body').innerHTML = `
    <div class="rounded-2xl overflow-hidden" style="background:${g.color}; height:220px; display:flex; align-items:center; justify-content:center;">
      <i data-lucide="camera" class="w-14 h-14 text-white/80"></i>
    </div>
    <div class="mt-5">
      <p class="font-display font-semibold text-lg text-adricar-indigo">${escapeHtml(g.nombre)} — ${escapeHtml(g.premio)}</p>
      <p class="text-sm text-adricar-muted mt-1">${escapeHtml(g.sorteoNombre)} · ${formatDate(g.fecha)}</p>
      <p class="text-sm text-adricar-muted mt-3 leading-relaxed">&ldquo;${escapeHtml(g.comentario)}&rdquo;</p>
    </div>`;
  openModal('modal-details');
  refreshIcons();
}


/* =========================================================================
   12. GALERÍA
   ========================================================================= */

function galleryTileHtml(item) {
  return `
  <div class="gallery-tile ${item.gradiente}" data-filter-type="${item.tipo}">
    <div class="tile-fill ${item.gradiente}" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
      <i data-lucide="${item.tipo === 'video' ? 'film' : 'image'}" class="w-8 h-8 text-white/70"></i>
    </div>
    ${item.tipo === 'video' ? '<div class="gallery-play"><i data-lucide="play" class="w-5 h-5 ml-0.5"></i></div>' : ''}
    <div class="tile-overlay">
      <p class="text-white text-xs font-semibold leading-snug">${escapeHtml(item.titulo)}</p>
    </div>
  </div>`;
}

function renderGallery() {
  const filtered = galeria.filter(g => state.galleryFilter === 'todos' || g.tipo === state.galleryFilter);
  document.getElementById('gallery-grid').innerHTML = filtered.map(galleryTileHtml).join('');
  refreshIcons();
}

function initGalleryFilters() {
  document.getElementById('gallery-filters').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-chip');
    if (!btn) return;
    document.querySelectorAll('#gallery-filters .filter-chip').forEach(c => c.classList.remove('is-active'));
    btn.classList.add('is-active');
    state.galleryFilter = btn.dataset.filter;
    renderGallery();
  });

  document.getElementById('gallery-grid').addEventListener('click', (e) => {
    const tile = e.target.closest('.gallery-tile');
    if (!tile) return;
    showToast('info', 'Vista previa simulada', 'En la versión final aquí se abriría la foto o el video en tamaño completo.');
  });
}


/* =========================================================================
   13. TESTIMONIOS
   ========================================================================= */

function testimonialCardHtml(t) {
  const stars = Array.from({ length: 5 }, (_, i) => `<i data-lucide="star" class="w-3.5 h-3.5" style="${i < t.rating ? 'fill:#E9A23B' : 'fill:none'}"></i>`).join('');
  return `
  <div class="testimonial-card">
    <div class="testimonial-stars">${stars}</div>
    <p class="text-sm text-adricar-ink mt-3 leading-relaxed">&ldquo;${escapeHtml(t.comentario)}&rdquo;</p>
    <div class="flex items-center gap-2.5 mt-4">
      <div class="avatar-stack !w-9 !h-9 !text-[0.65rem]" style="background:${avatarColorFor(t.id)}">${t.iniciales}</div>
      <p class="text-sm font-semibold text-adricar-indigo">${escapeHtml(t.nombre)}</p>
    </div>
  </div>`;
}

function renderTestimonials() {
  const html = testimonios.map(testimonialCardHtml).join('');
  document.getElementById('testimonial-track').innerHTML = html + html;
  refreshIcons();
}


/* =========================================================================
   14. FAQ
   ========================================================================= */

function faqItemHtml(f, i) {
  return `
  <div class="faq-item" data-faq-id="${f.id}">
    <button class="faq-question" data-action="toggle-faq">
      <span>${escapeHtml(f.pregunta)}</span>
      <i data-lucide="chevron-down" class="faq-chevron w-[18px] h-[18px]"></i>
    </button>
    <div class="faq-answer"><div class="faq-answer-inner">${escapeHtml(f.respuesta)}</div></div>
  </div>`;
}

function renderFaq() {
  document.getElementById('faq-accordion').innerHTML = faqs.map(faqItemHtml).join('');
  refreshIcons();
}

function initFaqToggle() {
  document.getElementById('faq-accordion').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="toggle-faq"]');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('is-open'));
    if (!wasOpen) item.classList.add('is-open');
  });
}


/* =========================================================================
   15. WIZARD DE COMPRA
   ========================================================================= */

function resetPurchaseState(preselectSorteoId) {
  state.purchase = {
    step: preselectSorteoId ? 2 : 1,
    sorteoId: preselectSorteoId || null,
    cantidad: 2,
    appliedOffer: null,
    buyer: { nombre: '', dni: '', telefono: '', correo: '' },
    operationNumber: '',
    voucherFile: null,
    createdPurchase: null,
  };
  document.getElementById('purchase-qty').value = 2;
  document.getElementById('buyer-name').value = '';
  document.getElementById('buyer-dni').value = '';
  document.getElementById('buyer-phone').value = '';
  document.getElementById('buyer-email').value = '';
  document.getElementById('yape-operation').value = '';
  const dz = document.getElementById('upload-dropzone');
  dz.classList.remove('has-file');
  document.getElementById('upload-label').textContent = 'Toca para subir tu captura de Yape';
  document.getElementById('upload-input').value = '';
}

function openPurchaseModal(sorteoId, closeFirstId) {
  if (closeFirstId) closeModal(closeFirstId);
  resetPurchaseState(sorteoId);
  openModal('modal-purchase');
  renderPurchaseStep();
}

function getApplicableOffer(cantidad) {
  const applicable = ofertas.filter(o => o.estado === 'activa' && o.cantidadMinima <= cantidad);
  if (!applicable.length) return null;
  return applicable.reduce((best, o) => (o.cantidadMinima > best.cantidadMinima ? o : best));
}

function computePurchaseCalc(sorteo, cantidad) {
  const offer = getApplicableOffer(cantidad);
  const bonus = offer ? (offer.cantidadEntregada - offer.cantidadMinima) : 0;
  const totalTickets = cantidad + bonus;
  const subtotal = sorteo.precioTicket * cantidad;
  return { offer, bonus, totalTickets, subtotal, total: subtotal };
}

function renderPurchaseStep() {
  const step = state.purchase.step;
  document.getElementById('purchase-step-label').textContent = `Paso ${step} de 5`;

  document.querySelectorAll('.purchase-step').forEach(el => {
    el.classList.toggle('hidden', Number(el.dataset.step) !== step);
  });

  document.querySelectorAll('#purchase-progress .wizard-dot').forEach((dot, i) => {
    dot.classList.toggle('is-active', i === step - 1);
    dot.classList.toggle('is-done', i < step - 1);
  });

  if (step === 1) renderPurchaseStep1();
  if (step === 2) renderPurchaseStep2();
  if (step === 3) renderPurchaseStep3();
  if (step === 4) renderPurchaseStep4();
  if (step === 5) renderPurchaseStep5();

  renderPurchaseFooter();
  refreshIcons();
}

function renderPurchaseStep1() {
  const list = document.getElementById('purchase-raffle-list');
  const disponibles = sorteos.filter(s => s.estado !== 'finalizado');
  list.innerHTML = disponibles.map(s => `
    <div class="raffle-pick-item ${state.purchase.sorteoId === s.id ? 'is-selected' : ''}" data-action="select-raffle" data-sorteo-id="${s.id}">
      <div class="raffle-pick-thumb ${s.gradiente}"><i data-lucide="${s.icono}" class="w-6 h-6 text-white"></i></div>
      <div class="min-w-0 flex-1">
        <p class="font-semibold text-sm text-adricar-indigo truncate">${escapeHtml(s.nombre.replace('Sorteo ', ''))}</p>
        <p class="text-xs text-adricar-muted mt-0.5">${formatCurrency(s.precioTicket)} por ticket · Sorteo ${formatDate(s.fechaSorteo)}</p>
      </div>
      ${state.purchase.sorteoId === s.id ? '<i data-lucide="check-circle-2" class="w-5 h-5 text-adricar-gold shrink-0"></i>' : '<i data-lucide="chevron-right" class="w-5 h-5 text-adricar-muted shrink-0"></i>'}
    </div>
  `).join('');
  refreshIcons();
}

function renderPurchaseStep2() {
  const s = findSorteo(state.purchase.sorteoId);
  document.getElementById('purchase-selected-summary').innerHTML = `
    <div class="raffle-pick-item is-selected" style="cursor:default;">
      <div class="raffle-pick-thumb ${s.gradiente}"><i data-lucide="${s.icono}" class="w-6 h-6 text-white"></i></div>
      <div class="min-w-0 flex-1">
        <p class="font-semibold text-sm text-adricar-indigo truncate">${escapeHtml(s.nombre.replace('Sorteo ', ''))}</p>
        <p class="text-xs text-adricar-muted mt-0.5">${formatCurrency(s.precioTicket)} por ticket</p>
      </div>
      <button class="text-xs font-semibold text-adricar-indigoLight" data-action="change-raffle">Cambiar</button>
    </div>
  `;
  document.getElementById('purchase-qty').value = state.purchase.cantidad;

  document.getElementById('offer-quick-picks').innerHTML = ofertas.filter(o => o.estado === 'activa').map(o => `
    <button class="offer-quick-pick ${state.purchase.cantidad === o.cantidadMinima ? 'is-active' : ''}" data-action="pick-offer" data-cantidad="${o.cantidadMinima}">
      <p class="oq-title">${escapeHtml(o.nombre)}</p>
      <p class="oq-sub">Paga ${o.cantidadMinima}, llévate ${o.cantidadEntregada}</p>
    </button>
  `).join('');
  refreshIcons();
}

function renderPurchaseStep3() {
  const s = findSorteo(state.purchase.sorteoId);
  const calc = computePurchaseCalc(s, state.purchase.cantidad);
  state.purchase.appliedOffer = calc.offer;

  const banner = document.getElementById('offer-banner');
  if (calc.offer) {
    banner.classList.remove('hidden');
    banner.innerHTML = `
      <div class="offer-banner-box">
        <span class="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-adricar-goldDark shrink-0"><i data-lucide="sparkles" class="w-[18px] h-[18px]"></i></span>
        <p class="text-sm text-adricar-ink"><strong>¡Oferta ${escapeHtml(calc.offer.nombre)} aplicada!</strong> Pagas ${calc.offer.cantidadMinima} y te llevas ${calc.offer.cantidadEntregada} tickets (${calc.bonus} de regalo).</p>
      </div>`;
  } else {
    banner.classList.add('hidden');
    banner.innerHTML = '';
  }

  document.getElementById('purchase-calc').innerHTML = `
    <div class="verify-row"><span>Sorteo</span><span>${escapeHtml(s.nombre.replace('Sorteo ', ''))}</span></div>
    <div class="verify-row"><span>Tickets pagados</span><span>${state.purchase.cantidad}</span></div>
    <div class="verify-row"><span>Tickets de regalo</span><span>${calc.bonus > 0 ? '+' + calc.bonus : '0'}</span></div>
    <div class="verify-row"><span>Total de tickets a recibir</span><span>${calc.totalTickets}</span></div>
    <div class="verify-row"><span>Precio unitario</span><span>${formatCurrency(s.precioTicket)}</span></div>
    <div class="verify-row" style="border-top:1.5px dashed #E5E8F0; padding-top:0.85rem; margin-top:0.2rem;"><span class="font-semibold text-adricar-indigo">Total a pagar</span><span class="font-display text-lg">${formatCurrency(calc.total)}</span></div>
  `;
  refreshIcons();
}

function renderPurchaseStep4() {
  const s = findSorteo(state.purchase.sorteoId);
  const calc = computePurchaseCalc(s, state.purchase.cantidad);
  document.getElementById('yape-amount').textContent = formatCurrency(calc.total);
}

function renderPurchaseStep5() {
  const p = state.purchase.createdPurchase;
  if (!p) return;
  const s = findSorteo(p.sorteoId);
  document.getElementById('purchase-confirmation-detail').innerHTML = `
    <div class="verify-row"><span>N.º de compra</span><span class="font-mono">${p.id.toUpperCase()}</span></div>
    <div class="verify-row"><span>Sorteo</span><span>${escapeHtml(s.nombre.replace('Sorteo ', ''))}</span></div>
    <div class="verify-row"><span>Tickets</span><span class="font-mono">${p.ticketsCodigos.join(', ')}</span></div>
    <div class="verify-row"><span>Monto pagado</span><span>${formatCurrency(p.montoTotal)}</span></div>
    <div class="verify-row"><span>Estado</span><span><span class="status-badge ${p.estado}">${p.estado}</span></span></div>
  `;
}

function renderPurchaseFooter() {
  const step = state.purchase.step;
  const footer = document.getElementById('purchase-footer');

  if (step === 1) {
    footer.innerHTML = `
      <button data-action="close-modal" data-modal="modal-purchase" class="btn-outline flex-1 justify-center py-3">Cancelar</button>
      <button data-action="purchase-next" class="btn-gold flex-1 justify-center py-3" ${!state.purchase.sorteoId ? 'disabled' : ''}>Continuar</button>`;
  } else if (step === 2) {
    footer.innerHTML = `
      <button data-action="purchase-back" class="btn-outline flex-1 justify-center py-3">Atrás</button>
      <button data-action="purchase-next" class="btn-gold flex-1 justify-center py-3">Continuar</button>`;
  } else if (step === 3) {
    footer.innerHTML = `
      <button data-action="purchase-back" class="btn-outline flex-1 justify-center py-3">Atrás</button>
      <button data-action="purchase-next" class="btn-gold flex-1 justify-center py-3">Continuar a pago</button>`;
  } else if (step === 4) {
    footer.innerHTML = `
      <button data-action="purchase-back" class="btn-outline flex-1 justify-center py-3">Atrás</button>
      <button data-action="purchase-confirm-payment" class="btn-gold flex-1 justify-center py-3"><i data-lucide="check" class="w-[18px] h-[18px]"></i> Confirmar pago</button>`;
  } else if (step === 5) {
    footer.innerHTML = `
      <button data-action="purchase-goto-verify" class="btn-outline flex-1 justify-center py-3">Verificar participación</button>
      <button data-action="close-modal" data-modal="modal-purchase" class="btn-gold flex-1 justify-center py-3">Finalizar</button>`;
  }
  refreshIcons();
}

function purchaseGoNext() {
  const p = state.purchase;

  if (p.step === 1 && !p.sorteoId) {
    showToast('error', 'Elige un sorteo', 'Selecciona el sorteo en el que quieres participar.');
    return;
  }

  if (p.step === 2) {
    const qty = Number(document.getElementById('purchase-qty').value);
    if (!qty || qty < 1) {
      showToast('error', 'Cantidad inválida', 'Ingresa al menos 1 ticket.');
      return;
    }
    p.cantidad = qty;
  }

  if (p.step === 3) {
    const nombre = document.getElementById('buyer-name').value.trim();
    const dni = document.getElementById('buyer-dni').value.trim();
    const telefono = document.getElementById('buyer-phone').value.trim();
    const correo = document.getElementById('buyer-email').value.trim();
    if (!nombre || !dni || !telefono) {
      showToast('error', 'Completa tus datos', 'Nombre, DNI y teléfono son obligatorios.');
      return;
    }
    if (!/^\d{8}$/.test(dni)) {
      showToast('error', 'DNI inválido', 'El DNI debe tener 8 dígitos.');
      return;
    }
    p.buyer = { nombre, dni, telefono, correo };
  }

  p.step = Math.min(5, p.step + 1);
  renderPurchaseStep();
}

function purchaseGoBack() {
  state.purchase.step = Math.max(1, state.purchase.step - 1);
  renderPurchaseStep();
}

function purchaseConfirmPayment() {
  const opNumber = document.getElementById('yape-operation').value.trim();
  if (!opNumber) {
    showToast('error', 'Falta el número de operación', 'Ingresa el número de operación de tu Yape.');
    return;
  }
  if (!state.purchase.voucherFile) {
    showToast('error', 'Falta el comprobante', 'Sube la captura de pantalla de tu pago por Yape.');
    return;
  }
  state.purchase.operationNumber = opNumber;

  const btn = document.querySelector('[data-action="purchase-confirm-payment"]');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-2" class="w-[18px] h-[18px] animate-spin"></i> Procesando…'; refreshIcons(); }

  setTimeout(() => {
    const s = findSorteo(state.purchase.sorteoId);
    const calc = computePurchaseCalc(s, state.purchase.cantidad);

    // Encuentra o crea el cliente asociado a la compra
    let cliente = clientes.find(c => c.dni === state.purchase.buyer.dni);
    if (!cliente) {
      cliente = {
        id: generateId('c'),
        nombre: state.purchase.buyer.nombre.split(' ')[0] || state.purchase.buyer.nombre,
        apellido: state.purchase.buyer.nombre.split(' ').slice(1).join(' ') || '—',
        dni: state.purchase.buyer.dni,
        telefono: state.purchase.buyer.telefono,
        correo: state.purchase.buyer.correo || '—',
        fechaRegistro: new Date().toISOString().slice(0, 10),
      };
      clientes.unshift(cliente);
    }

    const codigos = Array.from({ length: calc.totalTickets }, () => generateTicketCode());
    const nuevaCompra = {
      id: generateId('p').toLowerCase(),
      clienteId: cliente.id,
      sorteoId: s.id,
      cantidadTickets: calc.totalTickets,
      montoTotal: calc.total,
      metodoPago: 'Yape',
      numeroOperacion: opNumber,
      vendedoraId: vendedoras[Math.floor(Math.random() * vendedoras.length)].id,
      estado: 'pendiente',
      fecha: formatNowAsSeedDate(),
      ticketsCodigos: codigos,
    };
    compras.unshift(nuevaCompra);
    s.ticketsVendidos = Math.min(s.cantidadTickets, s.ticketsVendidos + calc.totalTickets);

    state.purchase.createdPurchase = nuevaCompra;
    state.purchase.step = 5;
    renderPurchaseStep();
    renderRaffles();
    showToast('success', 'Compra registrada correctamente', `Tus ${calc.totalTickets} tickets quedaron asociados a la compra ${nuevaCompra.id.toUpperCase()}.`);
  }, 900);
}

function initPurchaseWizard() {
  document.getElementById('purchase-qty').addEventListener('input', (e) => {
    let v = Math.max(1, Number(e.target.value) || 1);
    e.target.value = v;
  });

  document.getElementById('upload-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    state.purchase.voucherFile = file.name;
    document.getElementById('upload-dropzone').classList.add('has-file');
    document.getElementById('upload-label').textContent = `✓ ${file.name}`;
    showToast('success', 'Comprobante cargado', 'Tu captura de Yape se adjuntó correctamente.');
  });
}


/* =========================================================================
   16. ADMIN: login / navegación
   ========================================================================= */

const ADMIN_PAGE_META = {
  dashboard: { title: 'Dashboard', sub: 'Resumen general de la operación' },
  sorteos: { title: 'Sorteos', sub: 'Gestiona los sorteos activos y su configuración' },
  compras: { title: 'Compras', sub: 'Revisa, aprueba o rechaza los comprobantes recibidos' },
  clientes: { title: 'Clientes', sub: 'Datos de contacto e historial de compras' },
  vendedoras: { title: 'Vendedoras', sub: 'Equipo de ventas, comisiones y desempeño' },
  ofertas: { title: 'Ofertas', sub: 'Promociones que se aplican automáticamente en la compra' },
};

function openAdminView() {
  document.getElementById('admin-view').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  if (state.admin.loggedIn) {
    showAdminDashboardShell();
  } else {
    document.getElementById('admin-login').classList.remove('hidden');
    document.getElementById('admin-dashboard').classList.add('hidden');
  }
  refreshIcons();
}

function closeAdminView() {
  document.getElementById('admin-view').classList.add('hidden');
  document.body.style.overflow = '';
}

function showAdminDashboardShell() {
  document.getElementById('admin-login').classList.add('hidden');
  document.getElementById('admin-dashboard').classList.remove('hidden');
  setAdminPage(state.admin.page || 'dashboard');
}

function initAdminLogin() {
  document.getElementById('admin-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i data-lucide="loader-2" class="w-[18px] h-[18px] animate-spin"></i> Ingresando…';
    refreshIcons();
    setTimeout(() => {
      state.admin.loggedIn = true;
      showAdminDashboardShell();
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="log-in" class="w-[18px] h-[18px]"></i> Ingresar al panel';
      showToast('success', 'Bienvenida de nuevo', 'Sesión iniciada en el panel de Sorteos Adricar.');
    }, 700);
  });
}

function setAdminPage(page) {
  state.admin.page = page;
  document.querySelectorAll('.admin-nav-link[data-page]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.page === page);
  });
  const meta = ADMIN_PAGE_META[page];
  document.getElementById('admin-page-title').textContent = meta.title;
  document.getElementById('admin-page-sub').textContent = meta.sub;
  document.getElementById('admin-content').scrollTop = 0;
  renderAdminPage();
}

function initAdminNav() {
  document.getElementById('admin-nav').addEventListener('click', (e) => {
    const btn = e.target.closest('.admin-nav-link[data-page]');
    if (!btn) return;
    setAdminPage(btn.dataset.page);
  });
}

function renderAdminPage() {
  const page = state.admin.page;
  if (page === 'dashboard') renderAdminDashboard();
  if (page === 'sorteos') renderAdminSorteos();
  if (page === 'compras') renderAdminCompras();
  if (page === 'clientes') renderAdminClientes();
  if (page === 'vendedoras') renderAdminVendedoras();
  if (page === 'ofertas') renderAdminOfertas();
  refreshIcons();
}


/* =========================================================================
   17. ADMIN: DASHBOARD
   ========================================================================= */

// Serie fija para el gráfico de ventas (datos simulados, no dependen del reloj real)
const DASHBOARD_SALES_SERIES = [
  { label: 'Lun', value: 2140 }, { label: 'Mar', value: 2860 }, { label: 'Mié', value: 1950 },
  { label: 'Jue', value: 3420 }, { label: 'Vie', value: 4180 }, { label: 'Sáb', value: 3690 }, { label: 'Dom', value: 2980 },
];

function mostRecentPurchaseDay() {
  const days = compras.map(p => p.fecha.slice(0, 10)).sort();
  return days[days.length - 1];
}

function dashboardKpis() {
  const today = mostRecentPurchaseDay();
  const monthKey = today.slice(0, 7);
  const ventasHoy = compras.filter(p => p.estado === 'aprobado' && p.fecha.slice(0, 10) === today).reduce((sum, p) => sum + p.montoTotal, 0);
  const ventasMes = compras.filter(p => p.estado === 'aprobado' && p.fecha.slice(0, 7) === monthKey).reduce((sum, p) => sum + p.montoTotal, 0);
  const ticketsVendidos = sorteos.reduce((sum, s) => sum + s.ticketsVendidos, 0);
  const comprasPendientes = compras.filter(p => p.estado === 'pendiente').length;
  const vendedorasActivas = vendedoras.filter(v => v.estado === 'activa').length;
  const sorteosActivos = sorteos.filter(s => s.estado === 'activo').length;
  return { ventasHoy, ventasMes, ticketsVendidos, comprasPendientes, vendedorasActivas, sorteosActivos };
}

function kpiCardHtml({ icon, iconBg, iconColor, label, value, delta, deltaTone }) {
  return `
  <div class="kpi-card">
    <div class="flex items-center justify-between">
      <span class="kpi-icon" style="background:${iconBg}; color:${iconColor}"><i data-lucide="${icon}" class="w-5 h-5"></i></span>
      ${delta ? `<span class="kpi-delta ${deltaTone}"><i data-lucide="${deltaTone === 'up' ? 'trending-up' : 'trending-down'}" class="w-3.5 h-3.5"></i>${delta}</span>` : ''}
    </div>
    <p class="kpi-value">${value}</p>
    <p class="kpi-label">${label}</p>
  </div>`;
}

function renderAdminDashboard() {
  const k = dashboardKpis();
  const maxSale = Math.max(...DASHBOARD_SALES_SERIES.map(d => d.value));

  const kpisHtml = [
    kpiCardHtml({ icon: 'banknote', iconBg: '#E7F8F0', iconColor: '#0b7a4c', label: 'Ventas de hoy', value: formatCurrency(k.ventasHoy), delta: '12.4%', deltaTone: 'up' }),
    kpiCardHtml({ icon: 'wallet', iconBg: '#EEF0FA', iconColor: '#3D4FA0', label: 'Ventas del mes', value: formatCurrency(k.ventasMes), delta: '8.1%', deltaTone: 'up' }),
    kpiCardHtml({ icon: 'users', iconBg: '#FDF3E2', iconColor: '#8f5f13', label: 'Clientes registrados', value: formatNumber(clientes.length), delta: '4 nuevos', deltaTone: 'up' }),
    kpiCardHtml({ icon: 'ticket', iconBg: '#EEF0FA', iconColor: '#3D4FA0', label: 'Tickets vendidos', value: formatNumber(k.ticketsVendidos) }),
    kpiCardHtml({ icon: 'receipt', iconBg: '#FDEBEB', iconColor: '#b3261e', label: 'Compras pendientes', value: formatNumber(k.comprasPendientes) }),
    kpiCardHtml({ icon: 'user-round', iconBg: '#E7F8F0', iconColor: '#0b7a4c', label: 'Vendedoras activas', value: formatNumber(k.vendedorasActivas) + ' / ' + vendedoras.length }),
    kpiCardHtml({ icon: 'layout-grid', iconBg: '#FDF3E2', iconColor: '#8f5f13', label: 'Sorteos activos', value: formatNumber(k.sorteosActivos) + ' / ' + sorteos.length }),
  ].join('');

  const barsHtml = DASHBOARD_SALES_SERIES.map(d => `
    <div class="bar-col">
      <span class="text-[0.68rem] font-semibold text-adricar-indigo">${formatCurrency(d.value).replace('S/ ', '')}</span>
      <div class="bar" style="height:${Math.round((d.value / maxSale) * 100)}%"></div>
      <span class="bar-label">${d.label}</span>
    </div>`).join('');

  const totalTickets = sorteos.reduce((s, r) => s + r.ticketsVendidos, 0) || 1;
  const distribHtml = sorteos.filter(s => s.estado !== 'finalizado').slice(0, 5).map((s, i) => {
    const pct = Math.round((s.ticketsVendidos / totalTickets) * 100);
    const colors = ['#1B2456', '#3D4FA0', '#E9A23B', '#0FA968', '#5B6478'];
    return `
    <div class="mb-3.5 last:mb-0">
      <div class="flex items-center justify-between text-xs mb-1.5">
        <span class="flex items-center gap-1.5 text-adricar-ink font-medium"><span class="donut-legend-dot" style="background:${colors[i]}"></span>${escapeHtml(s.nombre.replace('Sorteo ', ''))}</span>
        <span class="text-adricar-muted">${pct}%</span>
      </div>
      <div class="progress-track" style="height:6px;"><div class="progress-fill" style="width:${pct}%; background:${colors[i]}"></div></div>
    </div>`;
  }).join('');

  const recentRows = compras.slice(0, 6).map(p => {
    const cliente = findCliente(p.clienteId);
    const s = findSorteo(p.sorteoId);
    return `
    <tr>
      <td><div class="flex items-center gap-2.5"><span class="table-avatar" style="background:${avatarColorFor(p.clienteId)}">${initialsOf(cliente.nombre, cliente.apellido)}</span><span class="font-medium text-adricar-ink">${escapeHtml(cliente.nombre)} ${escapeHtml(cliente.apellido)}</span></div></td>
      <td>${escapeHtml(s.nombre.replace('Sorteo ', ''))}</td>
      <td>${p.cantidadTickets}</td>
      <td class="font-semibold text-adricar-indigo">${formatCurrency(p.montoTotal)}</td>
      <td><span class="status-badge ${p.estado}">${p.estado}</span></td>
    </tr>`;
  }).join('');

  document.getElementById('admin-content').innerHTML = `
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">${kpisHtml}</div>

    <div class="grid lg:grid-cols-3 gap-5 mt-6">
      <div class="admin-card lg:col-span-2">
        <div class="admin-card-head">
          <div>
            <p class="font-semibold text-adricar-indigo text-sm">Ventas de los últimos 7 días</p>
            <p class="text-xs text-adricar-muted mt-0.5">Solo compras aprobadas</p>
          </div>
          <span class="status-badge activo">+18.6% vs semana anterior</span>
        </div>
        <div class="p-5"><div class="bars-chart">${barsHtml}</div></div>
      </div>

      <div class="admin-card">
        <div class="admin-card-head"><p class="font-semibold text-adricar-indigo text-sm">Tickets por sorteo</p></div>
        <div class="p-5">${distribHtml}</div>
      </div>
    </div>

    <div class="admin-card mt-5">
      <div class="admin-card-head">
        <p class="font-semibold text-adricar-indigo text-sm">Compras recientes</p>
        <button class="text-xs font-semibold text-adricar-indigoLight" data-action="admin-goto" data-page="compras">Ver todas</button>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead><tr><th>Cliente</th><th>Sorteo</th><th>Tickets</th><th>Monto</th><th>Estado</th></tr></thead>
          <tbody>${recentRows}</tbody>
        </table>
      </div>
    </div>
  `;
}


/* =========================================================================
   18. ADMIN: TABLA GENÉRICA (buscar, filtrar, ordenar, paginar)
   ========================================================================= */

function getTableState(entityKey) {
  return state.admin.tables[entityKey];
}

// Construye una tabla completa (toolbar + thead + tbody + paginación) a partir
// de un dataset y una configuración declarativa. Reutilizada por los 5 CRUD.
function buildDataTable(entityKey, data, config) {
  const ts = getTableState(entityKey);
  let rows = data.slice();

  if (ts.search) {
    const q = ts.search.toLowerCase();
    rows = rows.filter(row => config.searchFn(row, q));
  }
  if (config.filterOptions && ts.filter && ts.filter !== 'todos') {
    rows = rows.filter(row => config.filterFn(row, ts.filter));
  }
  if (ts.sortKey) {
    rows.sort((a, b) => {
      const av = config.sortAccessor ? config.sortAccessor(a, ts.sortKey) : a[ts.sortKey];
      const bv = config.sortAccessor ? config.sortAccessor(b, ts.sortKey) : b[ts.sortKey];
      let cmp;
      if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
      else cmp = String(av ?? '').localeCompare(String(bv ?? ''), 'es', { numeric: true });
      return ts.sortDir === 'asc' ? cmp : -cmp;
    });
  }

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / ts.pageSize));
  ts.page = Math.min(Math.max(1, ts.page), totalPages);
  const startIdx = (ts.page - 1) * ts.pageSize;
  const pageRows = rows.slice(startIdx, startIdx + ts.pageSize);

  const toolbarHtml = `
    <div class="table-toolbar">
      <div class="table-search">
        <i data-lucide="search"></i>
        <input type="text" placeholder="${config.searchPlaceholder || 'Buscar…'}" value="${escapeHtml(ts.search)}" data-action="table-search" data-entity="${entityKey}">
      </div>
      <div class="flex items-center gap-2.5 flex-wrap">
        ${config.filterOptions ? `<select class="table-select" data-action="table-filter" data-entity="${entityKey}">${config.filterOptions.map(o => `<option value="${o.value}" ${ts.filter === o.value ? 'selected' : ''}>${o.label}</option>`).join('')}</select>` : ''}
        ${config.addLabel ? `<button class="btn-primary text-sm py-2.5 px-4" data-action="admin-add" data-entity="${entityKey}"><i data-lucide="plus" class="w-4 h-4"></i> ${config.addLabel}</button>` : ''}
      </div>
    </div>`;

  const headHtml = `<tr>${config.columns.map(c => `
      <th class="${ts.sortKey === c.key ? 'is-sorted' : ''}" ${c.sortable !== false ? `data-action="table-sort" data-entity="${entityKey}" data-key="${c.key}"` : ''}>
        ${c.label}${c.sortable !== false ? `<span class="sort-icon">${ts.sortKey === c.key ? (ts.sortDir === 'asc' ? '▲' : '▼') : '↕'}</span>` : ''}
      </th>`).join('')}</tr>`;

  const bodyHtml = pageRows.length
    ? pageRows.map(config.rowHtml).join('')
    : `<tr><td colspan="${config.columns.length}"><div class="empty-state"><i data-lucide="${config.emptyIcon || 'inbox'}" class="w-9 h-9"></i><p class="font-semibold text-adricar-indigo">${config.emptyTitle || 'Sin resultados'}</p><p class="text-sm mt-1">${config.emptyMessage || 'Ajusta la búsqueda o el filtro.'}</p></div></td></tr>`;

  const footerHtml = `
    <div class="table-footer">
      <p class="text-xs text-adricar-muted">${total === 0 ? '0 resultados' : `Mostrando ${startIdx + 1}–${Math.min(startIdx + ts.pageSize, total)} de ${total}`}</p>
      <div class="pagination">
        <button class="page-btn" data-action="table-page" data-entity="${entityKey}" data-page="${ts.page - 1}" ${ts.page <= 1 ? 'disabled' : ''}><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
        ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `<button class="page-btn ${p === ts.page ? 'is-active' : ''}" data-action="table-page" data-entity="${entityKey}" data-page="${p}">${p}</button>`).join('')}
        <button class="page-btn" data-action="table-page" data-entity="${entityKey}" data-page="${ts.page + 1}" ${ts.page >= totalPages ? 'disabled' : ''}><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
      </div>
    </div>`;

  return `
    <div class="admin-card">
      ${toolbarHtml}
      <div class="data-table-wrap"><table class="data-table"><thead>${headHtml}</thead><tbody>${bodyHtml}</tbody></table></div>
      ${footerHtml}
    </div>`;
}

function handleTableSearch(entityKey, value) {
  const ts = getTableState(entityKey);
  ts.search = value;
  ts.page = 1;
  renderAdminPage();
  // Devuelve el foco al buscador tras el re-render
  const input = document.querySelector(`[data-action="table-search"][data-entity="${entityKey}"]`);
  if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
}
const debouncedTableSearch = debounce(handleTableSearch, 280);

function handleTableFilter(entityKey, value) {
  const ts = getTableState(entityKey);
  ts.filter = value;
  ts.page = 1;
  renderAdminPage();
}

function handleTableSort(entityKey, key) {
  const ts = getTableState(entityKey);
  if (ts.sortKey === key) ts.sortDir = ts.sortDir === 'asc' ? 'desc' : 'asc';
  else { ts.sortKey = key; ts.sortDir = 'asc'; }
  renderAdminPage();
}

function handleTablePage(entityKey, page) {
  const ts = getTableState(entityKey);
  ts.page = page;
  renderAdminPage();
}


/* =========================================================================
   19. ADMIN: CRUD SORTEOS
   ========================================================================= */

function renderAdminSorteos() {
  const table = buildDataTable('sorteos', sorteos, {
    searchPlaceholder: 'Buscar por nombre o premio…',
    searchFn: (s, q) => s.nombre.toLowerCase().includes(q) || s.premio.toLowerCase().includes(q),
    filterOptions: [
      { value: 'todos', label: 'Todos los estados' },
      { value: 'activo', label: 'Activos' },
      { value: 'proximo', label: 'Próximos' },
      { value: 'finalizado', label: 'Finalizados' },
    ],
    filterFn: (s, v) => s.estado === v,
    addLabel: 'Nuevo sorteo',
    columns: [
      { key: 'nombre', label: 'Sorteo' }, { key: 'tipoPremio', label: 'Tipo' },
      { key: 'precioTicket', label: 'Precio' }, { key: 'ticketsVendidos', label: 'Vendidos' },
      { key: 'fechaSorteo', label: 'Fecha' }, { key: 'estado', label: 'Estado' }, { key: '_acciones', label: '', sortable: false },
    ],
    emptyIcon: 'ticket', emptyTitle: 'No hay sorteos que coincidan', emptyMessage: 'Prueba con otra búsqueda o filtro.',
    rowHtml: (s) => `
      <tr>
        <td><div class="flex items-center gap-2.5"><span class="table-avatar ${s.gradiente}"><i data-lucide="${s.icono}" class="w-4 h-4"></i></span><span class="font-medium text-adricar-ink">${escapeHtml(s.nombre.replace('Sorteo ', ''))}</span></div></td>
        <td>${s.tipoPremio === 'dinero' ? 'Efectivo' : 'Producto'}</td>
        <td>${formatCurrency(s.precioTicket)}</td>
        <td>${formatNumber(s.ticketsVendidos)} / ${formatNumber(s.cantidadTickets)}</td>
        <td>${formatDate(s.fechaSorteo)}</td>
        <td><span class="status-badge ${s.estado}">${s.estado}</span></td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" data-action="sorteo-view" data-id="${s.id}" title="Ver"><i data-lucide="eye" class="w-4 h-4"></i></button>
            <button class="icon-btn" data-action="sorteo-edit" data-id="${s.id}" title="Editar"><i data-lucide="pencil" class="w-4 h-4"></i></button>
            <button class="icon-btn danger" data-action="sorteo-delete" data-id="${s.id}" title="Eliminar"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
          </div>
        </td>
      </tr>`,
  });
  document.getElementById('admin-content').innerHTML = table;
}

function viewSorteoDetails(id) {
  const s = findSorteo(id);
  document.getElementById('details-modal-title').textContent = 'Detalle del sorteo';
  document.getElementById('details-modal-body').innerHTML = `
    <div class="raffle-visual ${s.gradiente}" style="height:150px; border-radius:1rem;"><i data-lucide="${s.icono}" class="w-14 h-14 text-white/90"></i></div>
    <div class="mt-4 rounded-xl border border-adricar-line overflow-hidden">
      <div class="verify-row"><span>Nombre</span><span>${escapeHtml(s.nombre)}</span></div>
      <div class="verify-row"><span>Premio</span><span>${escapeHtml(s.premio)}</span></div>
      <div class="verify-row"><span>Tipo</span><span>${s.tipoPremio === 'dinero' ? 'Dinero — ' + formatCurrency(s.montoPremio) : 'Producto físico'}</span></div>
      <div class="verify-row"><span>Descripción</span><span style="text-align:right; max-width:60%;">${escapeHtml(s.descripcion)}</span></div>
      <div class="verify-row"><span>Precio del ticket</span><span>${formatCurrency(s.precioTicket)}</span></div>
      <div class="verify-row"><span>Tickets</span><span>${formatNumber(s.ticketsVendidos)} / ${formatNumber(s.cantidadTickets)}</span></div>
      <div class="verify-row"><span>Fecha de sorteo</span><span>${formatDate(s.fechaSorteo)}</span></div>
      <div class="verify-row"><span>Estado</span><span><span class="status-badge ${s.estado}">${s.estado}</span></span></div>
    </div>`;
  openModal('modal-details');
  refreshIcons();
}

function openSorteoForm(id) {
  const editing = !!id;
  const s = editing ? findSorteo(id) : null;
  state.editing = { type: 'sorteo', id: id || null };

  const body = `
    <div class="form-group"><label class="form-label">Nombre del sorteo</label><input id="f-nombre" type="text" class="input-field" value="${s ? escapeHtml(s.nombre) : ''}" placeholder="Ej. Sorteo Toyota Yaris 2026"></div>
    <div class="form-group"><label class="form-label">Premio</label><input id="f-premio" type="text" class="input-field" value="${s ? escapeHtml(s.premio) : ''}" placeholder="Ej. Toyota Yaris 2026 0KM"></div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Tipo de premio</label>
        <select id="f-tipoPremio" class="input-field">
          <option value="producto" ${s && s.tipoPremio === 'producto' ? 'selected' : ''}>Producto físico</option>
          <option value="dinero" ${s && s.tipoPremio === 'dinero' ? 'selected' : ''}>Dinero</option>
        </select>
      </div>
      <div class="form-group" id="f-monto-wrap" style="${!s || s.tipoPremio === 'dinero' ? '' : 'display:none;'}">
        <label class="form-label">Monto (si es dinero)</label>
        <input id="f-monto" type="number" min="0" class="input-field" value="${s && s.montoPremio ? s.montoPremio : ''}" placeholder="Ej. 50000">
      </div>
    </div>
    <div class="form-group"><label class="form-label">Descripción</label><textarea id="f-descripcion" class="input-field" rows="2">${s ? escapeHtml(s.descripcion) : ''}</textarea></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Precio del ticket (S/)</label><input id="f-precioTicket" type="number" min="1" step="0.5" class="input-field" value="${s ? s.precioTicket : ''}"></div>
      <div class="form-group"><label class="form-label">Cantidad de tickets</label><input id="f-cantidadTickets" type="number" min="1" class="input-field" value="${s ? s.cantidadTickets : ''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Fecha del sorteo</label><input id="f-fechaSorteo" type="date" class="input-field" value="${s ? s.fechaSorteo : ''}"></div>
      <div class="form-group">
        <label class="form-label">Estado</label>
        <select id="f-estado" class="input-field">
          <option value="activo" ${s && s.estado === 'activo' ? 'selected' : ''}>Activo</option>
          <option value="proximo" ${s && s.estado === 'proximo' ? 'selected' : ''}>Próximo</option>
          <option value="finalizado" ${s && s.estado === 'finalizado' ? 'selected' : ''}>Finalizado</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Ícono (imagen del premio)</label>
        <select id="f-icono" class="input-field">
          ${Object.entries(PRIZE_ICONS).map(([k, v]) => `<option value="${v}" data-cat="${k}" ${s && s.icono === v ? 'selected' : ''}>${k[0].toUpperCase() + k.slice(1)}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Estilo visual de tarjeta</label>
        <select id="f-gradiente" class="input-field">
          ${GRADIENTS.map((g, i) => `<option value="${g}" ${s && s.gradiente === g ? 'selected' : ''}>Estilo ${i + 1}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
  const footer = `
    <button data-action="close-modal" data-modal="modal-generic" class="btn-outline flex-1 justify-center py-3">Cancelar</button>
    <button data-action="save-sorteo" class="btn-primary flex-1 justify-center py-3"><i data-lucide="save" class="w-[18px] h-[18px]"></i> ${editing ? 'Guardar cambios' : 'Crear sorteo'}</button>`;

  renderGenericModal(editing ? 'Editar sorteo' : 'Nuevo sorteo', body, footer);
  document.getElementById('f-tipoPremio').addEventListener('change', (e) => {
    document.getElementById('f-monto-wrap').style.display = e.target.value === 'dinero' ? '' : 'none';
  });
  openModal('modal-generic');
}

function saveSorteoForm() {
  const nombre = document.getElementById('f-nombre').value.trim();
  const premio = document.getElementById('f-premio').value.trim();
  const precioTicket = Number(document.getElementById('f-precioTicket').value);
  const cantidadTickets = Number(document.getElementById('f-cantidadTickets').value);
  const fechaSorteo = document.getElementById('f-fechaSorteo').value;

  if (!nombre || !premio || !precioTicket || !cantidadTickets || !fechaSorteo) {
    showToast('error', 'Completa los campos obligatorios', 'Nombre, premio, precio, cantidad y fecha son necesarios.');
    return;
  }

  const tipoPremio = document.getElementById('f-tipoPremio').value;
  const iconoSelect = document.getElementById('f-icono');
  const categoria = iconoSelect.selectedOptions[0].dataset.cat;

  const payload = {
    nombre, premio, tipoPremio,
    montoPremio: tipoPremio === 'dinero' ? Number(document.getElementById('f-monto').value || 0) : null,
    descripcion: document.getElementById('f-descripcion').value.trim(),
    precioTicket, cantidadTickets,
    fechaSorteo, estado: document.getElementById('f-estado').value,
    icono: iconoSelect.value, categoria,
    gradiente: document.getElementById('f-gradiente').value,
  };

  if (state.editing.id) {
    const s = findSorteo(state.editing.id);
    Object.assign(s, payload);
    showToast('success', 'Sorteo actualizado', `"${nombre}" se guardó correctamente.`);
  } else {
    sorteos.unshift({ id: generateId('s'), ticketsVendidos: 0, ...payload });
    showToast('success', 'Sorteo creado', `"${nombre}" ya está disponible.`);
  }
  closeModal('modal-generic');
  renderAdminSorteos();
  renderRaffles();
}

function deleteSorteo(id) {
  const s = findSorteo(id);
  openConfirm({
    title: 'Eliminar sorteo',
    message: `Se eliminará "${s.nombre}" y dejará de mostrarse en el sitio público. Esta acción no se puede deshacer.`,
    acceptLabel: 'Eliminar',
    tone: 'danger',
    onAccept: () => {
      sorteos = sorteos.filter(x => x.id !== id);
      renderAdminSorteos();
      renderRaffles();
      showToast('success', 'Sorteo eliminado', `"${s.nombre}" fue eliminado.`);
    },
  });
}


/* =========================================================================
   20. ADMIN: CRUD COMPRAS
   ========================================================================= */

function renderAdminCompras() {
  const table = buildDataTable('compras', compras, {
    searchPlaceholder: 'Buscar por cliente, DNI o N.º de compra…',
    searchFn: (p, q) => {
      const c = findCliente(p.clienteId);
      return p.id.toLowerCase().includes(q) || c.nombre.toLowerCase().includes(q) || c.apellido.toLowerCase().includes(q) || c.dni.includes(q) || p.numeroOperacion.includes(q);
    },
    filterOptions: [
      { value: 'todos', label: 'Todos los estados' },
      { value: 'pendiente', label: 'Pendientes' },
      { value: 'aprobado', label: 'Aprobados' },
      { value: 'rechazado', label: 'Rechazados' },
    ],
    filterFn: (p, v) => p.estado === v,
    columns: [
      { key: 'id', label: 'N.º' }, { key: 'cliente', label: 'Cliente', sortable: false }, { key: 'sorteo', label: 'Sorteo', sortable: false },
      { key: 'cantidadTickets', label: 'Tickets' }, { key: 'montoTotal', label: 'Monto' },
      { key: 'fecha', label: 'Fecha' }, { key: 'estado', label: 'Estado' }, { key: '_acciones', label: '', sortable: false },
    ],
    sortAccessor: (p, key) => {
      if (key === 'cliente') return findCliente(p.clienteId).nombre;
      return p[key];
    },
    emptyIcon: 'receipt', emptyTitle: 'No hay compras que coincidan', emptyMessage: 'Prueba con otra búsqueda o filtro.',
    rowHtml: (p) => {
      const c = findCliente(p.clienteId);
      const s = findSorteo(p.sorteoId);
      return `
      <tr>
        <td class="font-mono text-xs">${p.id.toUpperCase()}</td>
        <td><div class="flex items-center gap-2.5"><span class="table-avatar" style="background:${avatarColorFor(p.clienteId)}">${initialsOf(c.nombre, c.apellido)}</span><span class="font-medium text-adricar-ink">${escapeHtml(c.nombre)} ${escapeHtml(c.apellido)}</span></div></td>
        <td>${escapeHtml(s.nombre.replace('Sorteo ', ''))}</td>
        <td>${p.cantidadTickets}</td>
        <td class="font-semibold text-adricar-indigo">${formatCurrency(p.montoTotal)}</td>
        <td>${p.fecha}</td>
        <td><span class="status-badge ${p.estado}">${p.estado}</span></td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" data-action="compra-view" data-id="${p.id}" title="Ver comprobante"><i data-lucide="eye" class="w-4 h-4"></i></button>
            <button class="icon-btn success" data-action="compra-aprobar" data-id="${p.id}" title="Aprobar" ${p.estado !== 'pendiente' ? 'disabled style="opacity:.3;"' : ''}><i data-lucide="check" class="w-4 h-4"></i></button>
            <button class="icon-btn danger" data-action="compra-rechazar" data-id="${p.id}" title="Rechazar" ${p.estado !== 'pendiente' ? 'disabled style="opacity:.3;"' : ''}><i data-lucide="x" class="w-4 h-4"></i></button>
          </div>
        </td>
      </tr>`;
    },
  });
  document.getElementById('admin-content').innerHTML = table;
}

function viewCompraDetails(id) {
  const p = compras.find(x => x.id === id);
  const c = findCliente(p.clienteId);
  const s = findSorteo(p.sorteoId);
  const v = findVendedora(p.vendedoraId);

  document.getElementById('details-modal-title').textContent = 'Comprobante de compra';
  document.getElementById('details-modal-body').innerHTML = `
    <div class="yape-card !p-4">
      <div class="flex items-center justify-between">
        <span class="font-display font-semibold">Pago Yape</span>
        <span class="yape-logo !text-sm">yape</span>
      </div>
      <div class="mt-3 bg-white/10 rounded-lg p-3 flex items-center justify-between">
        <span class="text-xs text-white/80">N.º operación</span>
        <span class="font-mono text-sm font-semibold">${escapeHtml(p.numeroOperacion)}</span>
      </div>
    </div>
    <div class="mt-4 rounded-xl border border-adricar-line overflow-hidden">
      <div class="verify-row"><span>N.º de compra</span><span class="font-mono">${p.id.toUpperCase()}</span></div>
      <div class="verify-row"><span>Cliente</span><span>${escapeHtml(c.nombre)} ${escapeHtml(c.apellido)} (DNI ${c.dni})</span></div>
      <div class="verify-row"><span>Sorteo</span><span>${escapeHtml(s.nombre.replace('Sorteo ', ''))}</span></div>
      <div class="verify-row"><span>Tickets</span><span class="font-mono" style="text-align:right; max-width:60%;">${p.ticketsCodigos.join(', ')}</span></div>
      <div class="verify-row"><span>Monto</span><span>${formatCurrency(p.montoTotal)}</span></div>
      <div class="verify-row"><span>Vendedora</span><span>${v ? escapeHtml(v.nombre) + ' ' + escapeHtml(v.apellido) : '—'}</span></div>
      <div class="verify-row"><span>Estado</span><span><span class="status-badge ${p.estado}">${p.estado}</span></span></div>
    </div>
    ${p.estado === 'pendiente' ? `
    <div class="flex gap-3 mt-5">
      <button class="btn-danger flex-1 justify-center py-2.5" data-action="compra-rechazar" data-id="${p.id}" data-close-first="modal-details">Rechazar</button>
      <button class="btn-primary flex-1 justify-center py-2.5" data-action="compra-aprobar" data-id="${p.id}" data-close-first="modal-details">Aprobar</button>
    </div>` : ''}
  `;
  openModal('modal-details');
  refreshIcons();
}

function setCompraEstado(id, estado) {
  const p = compras.find(x => x.id === id);
  p.estado = estado;
  renderAdminCompras();
  showToast(estado === 'aprobado' ? 'success' : 'error', estado === 'aprobado' ? 'Compra aprobada' : 'Compra rechazada', `${p.id.toUpperCase()} quedó marcada como ${estado}.`);
}

function confirmCompraAprobar(id) {
  const p = compras.find(x => x.id === id);
  openConfirm({
    title: 'Aprobar compra',
    message: `Se aprobará la compra ${p.id.toUpperCase()} y sus tickets quedarán confirmados.`,
    acceptLabel: 'Aprobar', tone: 'success',
    onAccept: () => setCompraEstado(id, 'aprobado'),
  });
}

function confirmCompraRechazar(id) {
  const p = compras.find(x => x.id === id);
  openConfirm({
    title: 'Rechazar compra',
    message: `Se rechazará la compra ${p.id.toUpperCase()}. El cliente deberá volver a enviar su comprobante.`,
    acceptLabel: 'Rechazar', tone: 'danger',
    onAccept: () => setCompraEstado(id, 'rechazado'),
  });
}


/* =========================================================================
   21. ADMIN: CRUD CLIENTES
   ========================================================================= */

function comprasDeCliente(clienteId) {
  return compras.filter(p => p.clienteId === clienteId);
}

function renderAdminClientes() {
  const table = buildDataTable('clientes', clientes, {
    searchPlaceholder: 'Buscar por nombre, DNI o teléfono…',
    searchFn: (c, q) => (c.nombre + ' ' + c.apellido).toLowerCase().includes(q) || c.dni.includes(q) || c.telefono.includes(q) || c.correo.toLowerCase().includes(q),
    filterOptions: [
      { value: 'todos', label: 'Todos' },
      { value: 'con_compras', label: 'Con compras' },
      { value: 'sin_compras', label: 'Sin compras' },
    ],
    filterFn: (c, v) => v === 'con_compras' ? comprasDeCliente(c.id).length > 0 : comprasDeCliente(c.id).length === 0,
    addLabel: 'Nuevo cliente',
    columns: [
      { key: 'nombre', label: 'Cliente' }, { key: 'dni', label: 'DNI' }, { key: 'telefono', label: 'Teléfono' },
      { key: 'correo', label: 'Correo' }, { key: 'compras', label: 'Compras', sortable: false }, { key: '_acciones', label: '', sortable: false },
    ],
    sortAccessor: (c, key) => key === 'nombre' ? c.nombre + ' ' + c.apellido : c[key],
    emptyIcon: 'users', emptyTitle: 'No hay clientes que coincidan', emptyMessage: 'Prueba con otra búsqueda o filtro.',
    rowHtml: (c) => `
      <tr>
        <td><div class="flex items-center gap-2.5"><span class="table-avatar" style="background:${avatarColorFor(c.id)}">${initialsOf(c.nombre, c.apellido)}</span><span class="font-medium text-adricar-ink">${escapeHtml(c.nombre)} ${escapeHtml(c.apellido)}</span></div></td>
        <td class="font-mono">${escapeHtml(c.dni)}</td>
        <td>${escapeHtml(c.telefono)}</td>
        <td>${escapeHtml(c.correo)}</td>
        <td>${comprasDeCliente(c.id).length}</td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" data-action="cliente-view" data-id="${c.id}" title="Ver historial"><i data-lucide="history" class="w-4 h-4"></i></button>
            <button class="icon-btn" data-action="cliente-edit" data-id="${c.id}" title="Editar"><i data-lucide="pencil" class="w-4 h-4"></i></button>
            <button class="icon-btn danger" data-action="cliente-delete" data-id="${c.id}" title="Eliminar"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
          </div>
        </td>
      </tr>`,
  });
  document.getElementById('admin-content').innerHTML = table;
}

function viewClienteHistorial(id) {
  const c = findCliente(id);
  const historial = comprasDeCliente(id);
  document.getElementById('details-modal-title').textContent = 'Historial de cliente';
  document.getElementById('details-modal-body').innerHTML = `
    <div class="flex items-center gap-3">
      <span class="avatar-stack !w-12 !h-12 !text-sm" style="background:${avatarColorFor(c.id)}">${initialsOf(c.nombre, c.apellido)}</span>
      <div>
        <p class="font-display font-semibold text-adricar-indigo">${escapeHtml(c.nombre)} ${escapeHtml(c.apellido)}</p>
        <p class="text-xs text-adricar-muted">DNI ${escapeHtml(c.dni)} · ${escapeHtml(c.telefono)}</p>
      </div>
    </div>
    <p class="text-xs font-semibold text-adricar-indigo mt-5 mb-2">Compras registradas (${historial.length})</p>
    <div class="space-y-2.5 max-h-72 overflow-y-auto pr-1">
      ${historial.length ? historial.map(p => {
        const s = findSorteo(p.sorteoId);
        return `<div class="rounded-xl border border-adricar-line p-3.5 flex items-center justify-between gap-3">
          <div>
            <p class="text-sm font-semibold text-adricar-indigo">${escapeHtml(s.nombre.replace('Sorteo ', ''))}</p>
            <p class="text-xs text-adricar-muted mt-0.5">${p.cantidadTickets} tickets · ${formatCurrency(p.montoTotal)} · ${p.fecha}</p>
          </div>
          <span class="status-badge ${p.estado}">${p.estado}</span>
        </div>`;
      }).join('') : '<div class="empty-state !py-8"><i data-lucide="inbox" class="w-8 h-8"></i><p class="text-sm">Sin compras registradas todavía.</p></div>'}
    </div>`;
  openModal('modal-details');
  refreshIcons();
}

function openClienteForm(id) {
  const editing = !!id;
  const c = editing ? findCliente(id) : null;
  state.editing = { type: 'cliente', id: id || null };

  const body = `
    <div class="form-row">
      <div class="form-group"><label class="form-label">Nombre</label><input id="f-nombre" type="text" class="input-field" value="${c ? escapeHtml(c.nombre) : ''}"></div>
      <div class="form-group"><label class="form-label">Apellido</label><input id="f-apellido" type="text" class="input-field" value="${c ? escapeHtml(c.apellido) : ''}"></div>
    </div>
    <div class="form-group"><label class="form-label">DNI</label><input id="f-dni" type="text" maxlength="8" class="input-field" value="${c ? escapeHtml(c.dni) : ''}"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Teléfono</label><input id="f-telefono" type="text" class="input-field" value="${c ? escapeHtml(c.telefono) : ''}"></div>
      <div class="form-group"><label class="form-label">Correo</label><input id="f-correo" type="email" class="input-field" value="${c ? escapeHtml(c.correo) : ''}"></div>
    </div>`;
  const footer = `
    <button data-action="close-modal" data-modal="modal-generic" class="btn-outline flex-1 justify-center py-3">Cancelar</button>
    <button data-action="save-cliente" class="btn-primary flex-1 justify-center py-3"><i data-lucide="save" class="w-[18px] h-[18px]"></i> ${editing ? 'Guardar cambios' : 'Crear cliente'}</button>`;
  renderGenericModal(editing ? 'Editar cliente' : 'Nuevo cliente', body, footer);
  openModal('modal-generic');
}

function saveClienteForm() {
  const nombre = document.getElementById('f-nombre').value.trim();
  const apellido = document.getElementById('f-apellido').value.trim();
  const dni = document.getElementById('f-dni').value.trim();
  const telefono = document.getElementById('f-telefono').value.trim();
  const correo = document.getElementById('f-correo').value.trim();

  if (!nombre || !apellido || !/^\d{8}$/.test(dni) || !telefono) {
    showToast('error', 'Revisa los datos', 'Nombre, apellido, DNI (8 dígitos) y teléfono son obligatorios.');
    return;
  }

  if (state.editing.id) {
    Object.assign(findCliente(state.editing.id), { nombre, apellido, dni, telefono, correo });
    showToast('success', 'Cliente actualizado', `${nombre} ${apellido} se guardó correctamente.`);
  } else {
    clientes.unshift({ id: generateId('c'), nombre, apellido, dni, telefono, correo: correo || '—', fechaRegistro: new Date().toISOString().slice(0, 10) });
    showToast('success', 'Cliente creado', `${nombre} ${apellido} fue agregado.`);
  }
  closeModal('modal-generic');
  renderAdminClientes();
}

function deleteCliente(id) {
  const c = findCliente(id);
  openConfirm({
    title: 'Eliminar cliente',
    message: `Se eliminará a ${c.nombre} ${c.apellido} de la base de clientes. Esta acción no se puede deshacer.`,
    acceptLabel: 'Eliminar', tone: 'danger',
    onAccept: () => {
      clientes = clientes.filter(x => x.id !== id);
      renderAdminClientes();
      showToast('success', 'Cliente eliminado', `${c.nombre} ${c.apellido} fue eliminado.`);
    },
  });
}


/* =========================================================================
   22. ADMIN: CRUD VENDEDORAS
   ========================================================================= */

function renderAdminVendedoras() {
  const table = buildDataTable('vendedoras', vendedoras, {
    searchPlaceholder: 'Buscar por nombre o correo…',
    searchFn: (v, q) => (v.nombre + ' ' + v.apellido).toLowerCase().includes(q) || v.correo.toLowerCase().includes(q),
    filterOptions: [
      { value: 'todos', label: 'Todas' },
      { value: 'activa', label: 'Activas' },
      { value: 'inactiva', label: 'Inactivas' },
    ],
    filterFn: (v, val) => v.estado === val,
    addLabel: 'Nueva vendedora',
    columns: [
      { key: 'nombre', label: 'Vendedora' }, { key: 'telefono', label: 'Teléfono' }, { key: 'ticketsVendidos', label: 'Tickets vendidos' },
      { key: 'ventas', label: 'Ventas' }, { key: 'comisiones', label: 'Comisión' }, { key: 'estado', label: 'Estado' }, { key: '_acciones', label: '', sortable: false },
    ],
    sortAccessor: (v, key) => key === 'nombre' ? v.nombre + ' ' + v.apellido : v[key],
    emptyIcon: 'user-round', emptyTitle: 'No hay vendedoras que coincidan', emptyMessage: 'Prueba con otra búsqueda o filtro.',
    rowHtml: (v) => `
      <tr>
        <td><div class="flex items-center gap-2.5"><span class="table-avatar" style="background:${avatarColorFor(v.id)}">${initialsOf(v.nombre, v.apellido)}</span><div><p class="font-medium text-adricar-ink">${escapeHtml(v.nombre)} ${escapeHtml(v.apellido)}</p><p class="text-xs text-adricar-muted">${escapeHtml(v.correo)}</p></div></div></td>
        <td>${escapeHtml(v.telefono)}</td>
        <td>${formatNumber(v.ticketsVendidos)}</td>
        <td class="font-semibold text-adricar-indigo">${formatCurrency(v.ventas)}</td>
        <td>${formatCurrency(v.comisiones)}</td>
        <td><span class="status-badge ${v.estado === 'activa' ? 'activo' : 'inactivo'}">${v.estado}</span></td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" data-action="vendedora-edit" data-id="${v.id}" title="Editar"><i data-lucide="pencil" class="w-4 h-4"></i></button>
            <button class="icon-btn danger" data-action="vendedora-delete" data-id="${v.id}" title="Eliminar"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
          </div>
        </td>
      </tr>`,
  });
  document.getElementById('admin-content').innerHTML = table;
}

function openVendedoraForm(id) {
  const editing = !!id;
  const v = editing ? findVendedora(id) : null;
  state.editing = { type: 'vendedora', id: id || null };

  const body = `
    <div class="form-row">
      <div class="form-group"><label class="form-label">Nombre</label><input id="f-nombre" type="text" class="input-field" value="${v ? escapeHtml(v.nombre) : ''}"></div>
      <div class="form-group"><label class="form-label">Apellido</label><input id="f-apellido" type="text" class="input-field" value="${v ? escapeHtml(v.apellido) : ''}"></div>
    </div>
    <div class="form-group"><label class="form-label">Correo</label><input id="f-correo" type="email" class="input-field" value="${v ? escapeHtml(v.correo) : ''}"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Teléfono</label><input id="f-telefono" type="text" class="input-field" value="${v ? escapeHtml(v.telefono) : ''}"></div>
      <div class="form-group">
        <label class="form-label">Estado</label>
        <select id="f-estado" class="input-field">
          <option value="activa" ${v && v.estado === 'activa' ? 'selected' : ''}>Activa</option>
          <option value="inactiva" ${v && v.estado === 'inactiva' ? 'selected' : ''}>Inactiva</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Ventas acumuladas (S/)</label><input id="f-ventas" type="number" min="0" class="input-field" value="${v ? v.ventas : 0}"></div>
      <div class="form-group"><label class="form-label">Comisión (S/)</label><input id="f-comisiones" type="number" min="0" class="input-field" value="${v ? v.comisiones : 0}"></div>
    </div>`;
  const footer = `
    <button data-action="close-modal" data-modal="modal-generic" class="btn-outline flex-1 justify-center py-3">Cancelar</button>
    <button data-action="save-vendedora" class="btn-primary flex-1 justify-center py-3"><i data-lucide="save" class="w-[18px] h-[18px]"></i> ${editing ? 'Guardar cambios' : 'Crear vendedora'}</button>`;
  renderGenericModal(editing ? 'Editar vendedora' : 'Nueva vendedora', body, footer);
  openModal('modal-generic');
}

function saveVendedoraForm() {
  const nombre = document.getElementById('f-nombre').value.trim();
  const apellido = document.getElementById('f-apellido').value.trim();
  const correo = document.getElementById('f-correo').value.trim();
  const telefono = document.getElementById('f-telefono').value.trim();

  if (!nombre || !apellido || !correo || !telefono) {
    showToast('error', 'Completa los campos', 'Nombre, apellido, correo y teléfono son obligatorios.');
    return;
  }

  const payload = {
    nombre, apellido, correo, telefono,
    estado: document.getElementById('f-estado').value,
    ventas: Number(document.getElementById('f-ventas').value || 0),
    comisiones: Number(document.getElementById('f-comisiones').value || 0),
  };

  if (state.editing.id) {
    Object.assign(findVendedora(state.editing.id), payload);
    showToast('success', 'Vendedora actualizada', `${nombre} ${apellido} se guardó correctamente.`);
  } else {
    vendedoras.unshift({ id: generateId('v'), ticketsVendidos: 0, ...payload });
    showToast('success', 'Vendedora creada', `${nombre} ${apellido} fue agregada al equipo.`);
  }
  closeModal('modal-generic');
  renderAdminVendedoras();
}

function deleteVendedora(id) {
  const v = findVendedora(id);
  openConfirm({
    title: 'Eliminar vendedora',
    message: `Se eliminará a ${v.nombre} ${v.apellido} del equipo de ventas.`,
    acceptLabel: 'Eliminar', tone: 'danger',
    onAccept: () => {
      vendedoras = vendedoras.filter(x => x.id !== id);
      renderAdminVendedoras();
      showToast('success', 'Vendedora eliminada', `${v.nombre} ${v.apellido} fue eliminada.`);
    },
  });
}


/* =========================================================================
   23. ADMIN: CRUD OFERTAS
   ========================================================================= */

function renderAdminOfertas() {
  const table = buildDataTable('ofertas', ofertas, {
    searchPlaceholder: 'Buscar oferta…',
    searchFn: (o, q) => o.nombre.toLowerCase().includes(q),
    filterOptions: [
      { value: 'todos', label: 'Todas' },
      { value: 'activa', label: 'Activas' },
      { value: 'inactiva', label: 'Inactivas' },
    ],
    filterFn: (o, v) => o.estado === v,
    addLabel: 'Nueva oferta',
    columns: [
      { key: 'nombre', label: 'Oferta' }, { key: 'cantidadMinima', label: 'Cant. mínima' }, { key: 'cantidadEntregada', label: 'Cant. entregada' },
      { key: 'inicio', label: 'Inicio' }, { key: 'fin', label: 'Fin' }, { key: 'estado', label: 'Estado' }, { key: '_acciones', label: '', sortable: false },
    ],
    emptyIcon: 'badge-percent', emptyTitle: 'No hay ofertas que coincidan', emptyMessage: 'Prueba con otra búsqueda o filtro.',
    rowHtml: (o) => `
      <tr>
        <td><span class="font-display font-semibold text-adricar-indigo">${escapeHtml(o.nombre)}</span></td>
        <td>${o.cantidadMinima}</td>
        <td>${o.cantidadEntregada}</td>
        <td>${formatDate(o.inicio)}</td>
        <td>${formatDate(o.fin)}</td>
        <td><span class="status-badge ${o.estado === 'activa' ? 'activo' : 'inactivo'}">${o.estado}</span></td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" data-action="oferta-edit" data-id="${o.id}" title="Editar"><i data-lucide="pencil" class="w-4 h-4"></i></button>
            <button class="icon-btn danger" data-action="oferta-delete" data-id="${o.id}" title="Eliminar"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
          </div>
        </td>
      </tr>`,
  });
  document.getElementById('admin-content').innerHTML = table;
}

function openOfertaForm(id) {
  const editing = !!id;
  const o = editing ? ofertas.find(x => x.id === id) : null;
  state.editing = { type: 'oferta', id: id || null };

  const body = `
    <div class="form-group"><label class="form-label">Nombre de la oferta</label><input id="f-nombre" type="text" class="input-field" value="${o ? escapeHtml(o.nombre) : ''}" placeholder="Ej. 2x1"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Cantidad mínima (paga)</label><input id="f-cantidadMinima" type="number" min="1" class="input-field" value="${o ? o.cantidadMinima : ''}"></div>
      <div class="form-group"><label class="form-label">Cantidad entregada (recibe)</label><input id="f-cantidadEntregada" type="number" min="1" class="input-field" value="${o ? o.cantidadEntregada : ''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Inicio</label><input id="f-inicio" type="date" class="input-field" value="${o ? o.inicio : ''}"></div>
      <div class="form-group"><label class="form-label">Fin</label><input id="f-fin" type="date" class="input-field" value="${o ? o.fin : ''}"></div>
    </div>
    <div class="form-group">
      <label class="form-label">Estado</label>
      <select id="f-estado" class="input-field">
        <option value="activa" ${o && o.estado === 'activa' ? 'selected' : ''}>Activa</option>
        <option value="inactiva" ${o && o.estado === 'inactiva' ? 'selected' : ''}>Inactiva</option>
      </select>
    </div>`;
  const footer = `
    <button data-action="close-modal" data-modal="modal-generic" class="btn-outline flex-1 justify-center py-3">Cancelar</button>
    <button data-action="save-oferta" class="btn-primary flex-1 justify-center py-3"><i data-lucide="save" class="w-[18px] h-[18px]"></i> ${editing ? 'Guardar cambios' : 'Crear oferta'}</button>`;
  renderGenericModal(editing ? 'Editar oferta' : 'Nueva oferta', body, footer);
  openModal('modal-generic');
}

function saveOfertaForm() {
  const nombre = document.getElementById('f-nombre').value.trim();
  const cantidadMinima = Number(document.getElementById('f-cantidadMinima').value);
  const cantidadEntregada = Number(document.getElementById('f-cantidadEntregada').value);

  if (!nombre || !cantidadMinima || !cantidadEntregada || cantidadEntregada <= cantidadMinima) {
    showToast('error', 'Revisa los datos', 'La cantidad entregada debe ser mayor a la cantidad mínima.');
    return;
  }

  const payload = {
    nombre, cantidadMinima, cantidadEntregada,
    inicio: document.getElementById('f-inicio').value,
    fin: document.getElementById('f-fin').value,
    estado: document.getElementById('f-estado').value,
  };

  if (state.editing.id) {
    Object.assign(ofertas.find(x => x.id === state.editing.id), payload);
    showToast('success', 'Oferta actualizada', `"${nombre}" se guardó correctamente.`);
  } else {
    ofertas.unshift({ id: generateId('o'), ...payload });
    showToast('success', 'Oferta creada', `"${nombre}" ya se aplica automáticamente en las compras.`);
  }
  closeModal('modal-generic');
  renderAdminOfertas();
}

function deleteOferta(id) {
  const o = ofertas.find(x => x.id === id);
  openConfirm({
    title: 'Eliminar oferta',
    message: `Se eliminará la oferta "${o.nombre}". Dejará de aplicarse en nuevas compras.`,
    acceptLabel: 'Eliminar', tone: 'danger',
    onAccept: () => {
      ofertas = ofertas.filter(x => x.id !== id);
      renderAdminOfertas();
      showToast('success', 'Oferta eliminada', `"${o.nombre}" fue eliminada.`);
    },
  });
}


/* =========================================================================
   24. INICIALIZACIÓN
   ========================================================================= */

// --- Helpers específicos del wizard de compra usados por el listener global ---
function selectRaffleInWizard(id) {
  state.purchase.sorteoId = id;
  renderPurchaseStep1();
  renderPurchaseFooter();
}
function pickOfferQuantity(qty) {
  state.purchase.cantidad = qty;
  document.getElementById('purchase-qty').value = qty;
  renderPurchaseStep2();
}
function adjustPurchaseQty(delta) {
  const input = document.getElementById('purchase-qty');
  input.value = Math.max(1, Number(input.value || 1) + delta);
}
function goToVerifyFromPurchase() {
  closeModal('modal-purchase');
  const section = document.getElementById('verificar');
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.querySelectorAll('.verify-tab').forEach(t => t.classList.remove('is-active'));
  const dniTab = document.querySelector('.verify-tab[data-method="dni"]');
  if (dniTab) dniTab.classList.add('is-active');
  state.verifyMethod = 'dni';
  document.getElementById('verify-label').textContent = VERIFY_PLACEHOLDERS.dni.label;
  const input = document.getElementById('verify-input');
  input.placeholder = VERIFY_PLACEHOLDERS.dni.placeholder;
  if (state.purchase.buyer.dni) input.value = state.purchase.buyer.dni;
}
function openLegalModal(type) {
  const isTerms = type === 'terms';
  document.getElementById('details-modal-title').textContent = isTerms ? 'Términos y condiciones' : 'Políticas de privacidad';
  document.getElementById('details-modal-body').innerHTML = isTerms
    ? `<div class="text-sm text-adricar-muted space-y-3 leading-relaxed">
        <p>Este es un prototipo con datos simulados. En una versión productiva, aquí se detallarían las reglas de participación, la mecánica de cada sorteo, los plazos de entrega y las responsabilidades de Sorteos Adricar y de los participantes.</p>
        <p>Los tickets confirmados no son reembolsables. Participar implica aceptar las reglas publicadas en la ficha de cada sorteo activo.</p>
        <p>El resultado de cada sorteo se publica en la sección "Ganadores" junto con la evidencia de entrega correspondiente.</p>
      </div>`
    : `<div class="text-sm text-adricar-muted space-y-3 leading-relaxed">
        <p>Este es un prototipo con datos simulados. En una versión productiva, aquí se explicaría qué datos personales se recopilan (DNI, teléfono, correo) y con qué finalidad se usan.</p>
        <p>Sorteos Adricar no comparte tus datos con terceros, salvo lo necesario para coordinar la entrega de un premio ganado.</p>
      </div>`;
  openModal('modal-details');
}
function openWhatsapp() {
  window.open('https://wa.me/51987654321?text=' + encodeURIComponent('Hola, quiero información sobre los sorteos activos de Sorteos Adricar.'), '_blank');
}

// Despacha "Nuevo…" desde la tabla genérica hacia el formulario correspondiente
function handleAdminAdd(entity) {
  if (entity === 'sorteos') openSorteoForm();
  if (entity === 'clientes') openClienteForm();
  if (entity === 'vendedoras') openVendedoraForm();
  if (entity === 'ofertas') openOfertaForm();
}

// Único listener de clics delegado para TODA la interfaz (sitio público + admin + modales)
function initGlobalActions() {
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    if (el.tagName === 'A') e.preventDefault();

    // Si el botón indica cerrar un modal previo antes de actuar, se hace primero
    if (el.dataset.closeFirst) closeModal(el.dataset.closeFirst);

    const action = el.dataset.action;
    const id = el.dataset.id;

    switch (action) {
      // --- Navegación / modales generales ---
      case 'open-purchase': openPurchaseModal(el.dataset.sorteoId || null); break;
      case 'open-verify': document.getElementById('verificar').scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
      case 'open-admin': openAdminView(); break;
      case 'close-admin': closeAdminView(); break;
      case 'close-modal': closeModal(el.dataset.modal); break;
      case 'open-whatsapp': openWhatsapp(); break;
      case 'open-terms': openLegalModal('terms'); break;
      case 'open-privacy': openLegalModal('privacy'); break;

      // --- Sitio público ---
      case 'view-raffle': openRaffleDetails(el.dataset.sorteoId); break;
      case 'view-evidence': viewWinnerEvidence(el.dataset.winnerId); break;

      // --- Wizard de compra ---
      case 'select-raffle': selectRaffleInWizard(el.dataset.sorteoId); break;
      case 'change-raffle': state.purchase.step = 1; renderPurchaseStep(); break;
      case 'pick-offer': pickOfferQuantity(Number(el.dataset.cantidad)); break;
      case 'qty-minus': adjustPurchaseQty(-1); break;
      case 'qty-plus': adjustPurchaseQty(1); break;
      case 'purchase-next': purchaseGoNext(); break;
      case 'purchase-back': purchaseGoBack(); break;
      case 'purchase-confirm-payment': purchaseConfirmPayment(); break;
      case 'purchase-goto-verify': goToVerifyFromPurchase(); break;

      // --- Admin: navegación interna ---
      case 'admin-goto': setAdminPage(el.dataset.page); break;
      case 'admin-add': handleAdminAdd(el.dataset.entity); break;

      // --- Admin: tabla (orden / paginación) ---
      case 'table-sort': handleTableSort(el.dataset.entity, el.dataset.key); break;
      case 'table-page': handleTablePage(el.dataset.entity, Number(el.dataset.page)); break;

      // --- Admin: CRUD Sorteos ---
      case 'sorteo-view': viewSorteoDetails(id); break;
      case 'sorteo-edit': openSorteoForm(id); break;
      case 'sorteo-delete': deleteSorteo(id); break;
      case 'save-sorteo': saveSorteoForm(); break;

      // --- Admin: CRUD Compras ---
      case 'compra-view': viewCompraDetails(id); break;
      case 'compra-aprobar': confirmCompraAprobar(id); break;
      case 'compra-rechazar': confirmCompraRechazar(id); break;

      // --- Admin: CRUD Clientes ---
      case 'cliente-view': viewClienteHistorial(id); break;
      case 'cliente-edit': openClienteForm(id); break;
      case 'cliente-delete': deleteCliente(id); break;
      case 'save-cliente': saveClienteForm(); break;

      // --- Admin: CRUD Vendedoras ---
      case 'vendedora-edit': openVendedoraForm(id); break;
      case 'vendedora-delete': deleteVendedora(id); break;
      case 'save-vendedora': saveVendedoraForm(); break;

      // --- Admin: CRUD Ofertas ---
      case 'oferta-edit': openOfertaForm(id); break;
      case 'oferta-delete': deleteOferta(id); break;
      case 'save-oferta': saveOfertaForm(); break;
    }
  });

  // Búsqueda y filtros de las tablas admin (eventos input/change, delegados)
  document.addEventListener('input', (e) => {
    const el = e.target.closest('[data-action="table-search"]');
    if (el) debouncedTableSearch(el.dataset.entity, el.value);
  });
  document.addEventListener('change', (e) => {
    const el = e.target.closest('[data-action="table-filter"]');
    if (el) handleTableFilter(el.dataset.entity, el.value);
  });

  // Confirmar acción pendiente del modal de confirmación genérico
  document.getElementById('confirm-accept-btn').addEventListener('click', () => {
    if (typeof state.confirmAction === 'function') state.confirmAction();
    closeModal('modal-confirm');
    state.confirmAction = null;
  });

  // Cerrar modales al hacer clic fuera del panel, o con la tecla Escape
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(overlay.id); });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });
}

function init() {
  // Sitio público
  initHeaderScroll();
  initMobileMenu();
  initSmoothAnchors();
  initRevealOnScroll();
  loadRafflesWithSkeleton();
  initRaffleFilters();
  initHeroCountdown();
  initHeroCounters();
  initVerifyTicker();
  renderWinners();
  renderGallery();
  initGalleryFilters();
  renderTestimonials();
  renderFaq();
  initFaqToggle();
  initVerifyTabs();
  initVerifySubmit();
  initPurchaseWizard();

  // Panel administrativo
  initAdminLogin();
  initAdminNav();

  // Delegación global de eventos (cubre sitio público + admin + modales)
  initGlobalActions();

  refreshIcons();
}

document.addEventListener('DOMContentLoaded', init);
