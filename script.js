// DATOS DE EJEMPLO - Proyectos de ley
const proyectosData = [
    {
        id: 1,
        expediente: "25,088",
        titulo: "Ley de Protección de Datos en el Sector Financiero",
        tema: "Economía",
        estado: "En Comisión",
        impacto: "Medio",
        fecha: "2025-03-01"
    },
    {
        id: 2,
        expediente: "25,713",
        titulo: "Reforma a la Ley de Fomento a la Pequeña y Mediana Empresa (PYME)",
        tema: "Economía",
        estado: "Impacto Medio",
        impacto: "Alto",
        fecha: "2025-06-20"
    },
    {
        id: 3,
        expediente: "25,602",
        titulo: "Ley de Regulación de la Telemedicina y Servicios de Salud Digital",
        tema: "Salud",
        estado: "En Comisión",
        impacto: "Alto",
        fecha: "2025-05-15"
    },
    {
        id: 4,
        expediente: "23,480",
        titulo: "Ley de Fortalecimiento del Sistema de Salud Mental",
        tema: "Salud",
        estado: "Primer Debate",
        impacto: "Medio",
        fecha: "2025-03-10"
    },
    {
        id: 5,
        expediente: "25,517",
        titulo: "Reforma al Régimen de Pensiones Complementarias Voluntarias",
        tema: "Transporte",
        estado: "En Comisión",
        impacto: "Alto",
        fecha: "2025-04-05"
    },
    {
        id: 6,
        expediente: "23,479",
        titulo: "Ley de Promoción de la Movilidad Eléctrica",
        tema: "General",
        estado: "Segundo Debate",
        impacto: "Medio",
        fecha: "2025-04-01"
    },
    {
        id: 7,
        expediente: "24,950",
        titulo: "Reforma a la Ley de Educación Superior",
        tema: "Educación",
        estado: "En Comisión",
        impacto: "Alto",
        fecha: "2025-02-20"
    },
    {
        id: 8,
        expediente: "25,100",
        titulo: "Ley de Protección del Recurso Hídrico",
        tema: "Ambiental",
        estado: "Primer Debate",
        impacto: "Alto",
        fecha: "2025-01-15"
    },
    {
        id: 9,
        expediente: "24,888",
        titulo: "Reforma a la Ley de Impuestos Sobre la Renta",
        tema: "Economía",
        estado: "En Comisión",
        impacto: "Bajo",
        fecha: "2025-03-25"
    },
    {
        id: 10,
        expediente: "25,250",
        titulo: "Ley de Inclusión Laboral para Personas con Discapacidad",
        tema: "General",
        estado: "Aprobado",
        impacto: "Medio",
        fecha: "2025-02-10"
    },
    {
        id: 11,
        expediente: "24,700",
        titulo: "Reforma al Código de Familia",
        tema: "General",
        estado: "Segundo Debate",
        impacto: "Alto",
        fecha: "2025-01-20"
    },
    {
        id: 12,
        expediente: "25,450",
        titulo: "Ley de Modernización de la Administración Tributaria",
        tema: "Economía",
        estado: "En Comisión",
        impacto: "Medio",
        fecha: "2025-05-05"
    }
];

// ELEMENTOS DEL DOM
const searchInput = document.getElementById('searchInput');
const temaFilter = document.getElementById('temaFilter');
const estadoFilter = document.getElementById('estadoFilter');
const impactoFilter = document.getElementById('impactoFilter');
const proyectosList = document.getElementById('proyectosList');
const contador = document.getElementById('contador');

// INICIALIZAR
document.addEventListener('DOMContentLoaded', () => {
    mostrarProyectos(proyectosData);
    actualizarEstadisticas(proyectosData);
});

// FUNCIÓN: Mostrar proyectos
function mostrarProyectos(proyectos) {
    proyectosList.innerHTML = '';
    
    if (proyectos.length === 0) {
        proyectosList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No se encontraron proyectos con los filtros seleccionados.</p>';
        contador.textContent = '0 proyectos encontrados';
        return;
    }

    proyectos.forEach(proyecto => {
        const card = document.createElement('div');
        card.className = 'proyecto-card';
        card.innerHTML = `
            <span class="proyecto-tema">${proyecto.tema}</span>
            <p class="proyecto-expediente">Exp. ${proyecto.expediente}</p>
            <h3 class="proyecto-titulo">${proyecto.titulo}</h3>
            <div class="proyecto-meta">
                <span class="proyecto-estado">⚖️ ${proyecto.estado}</span>
                <span class="proyecto-impacto">📊 Impacto: ${proyecto.impacto}</span>
            </div>
            <p class="proyecto-fecha">📅 ${formatearFecha(proyecto.fecha)}</p>
        `;
        proyectosList.appendChild(card);
    });

    contador.textContent = `${proyectos.length} proyectos encontrados`;
}

// FUNCIÓN: Filtrar proyectos
function filtrarProyectos() {
    const searchTerm = searchInput.value.toLowerCase();
    const tema = temaFilter.value;
    const estado = estadoFilter.value;
    const impacto = impactoFilter.value;

    const proyectosFiltrados = proyectosData.filter(proyecto => {
        const cumpleSearch = proyecto.titulo.toLowerCase().includes(searchTerm) ||
                            proyecto.expediente.includes(searchTerm);
        const cumpleTema = tema === '' || proyecto.tema === tema;
        const cumpleEstado = estado === '' || proyecto.estado === estado;
        const cumpleImpacto = impacto === '' || proyecto.impacto === impacto;

        return cumpleSearch && cumpleTema && cumpleEstado && cumpleImpacto;
    });

    mostrarProyectos(proyectosFiltrados);
}

// FUNCIÓN: Actualizar estadísticas
function actualizarEstadisticas(proyectos) {
    document.getElementById('totalProyectos').textContent = proyectos.length;
    document.getElementById('enComision').textContent = proyectos.filter(p => p.estado === 'En Comisión').length;
    document.getElementById('aprobados').textContent = proyectos.filter(p => p.estado === 'Aprobado').length;
    
    const temas = new Set(proyectos.map(p => p.tema));
    document.getElementById('porTema').textContent = temas.size;
}

// FUNCIÓN: Formatear fecha
function formatearFecha(fecha) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-CR', options);
}

// EVENT LISTENERS
searchInput.addEventListener('input', filtrarProyectos);
temaFilter.addEventListener('change', filtrarProyectos);
estadoFilter.addEventListener('change', filtrarProyectos);
impactoFilter.addEventListener('change', filtrarProyectos);
