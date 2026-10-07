// Un diccionario por idioma. Las dos estructuras tienen que tener las mismas claves.
// Un valor puede ser un texto o una función (cuando hay números o nombres adentro).

const es = {
  common: {
    loading: 'Cargando…',
    unknown: 'Desconocido',
    noResults: 'No hay resultados.',
  },
  nav: {
    home: 'Inicio',
    characters: 'Personajes',
  },
  language: {
    label: 'Idioma',
  },
  footer: {
    disclaimer: 'Proyecto de portfolio. Sin afiliación con la serie ni con sus titulares.',
  },
  home: {
    description:
      'Una base de datos interactiva de los personajes de Gilead. Buscá, filtrá y explorá sus relaciones.',
    cta: 'Explorar personajes',
    total: ({ count }) =>
      count === 1 ? '1 personaje en la base de datos' : `${count} personajes en la base de datos`,
    categories: 'Categorías',
  },
  characters: {
    searchLabel: 'Buscar personaje',
    searchPlaceholder: 'Buscar personaje, nombre de Handmaid o actor…',
    count: ({ count }) => `${count} ${count === 1 ? 'personaje' : 'personajes'}`,
    emptyFiltered: 'No se encontraron personajes con esos filtros.',
    emptyNoData: 'Todavía no hay personajes cargados.',
    outOfRange: 'Esta página no existe.',
    clearFilters: 'Limpiar filtros',
    backToFirst: 'Volver a la primera',
  },
  filters: {
    status: 'Estado',
    category: 'Categoría',
    season: 'Temporada',
    sort: 'Ordenar',
    allMasc: 'Todos',
    allFem: 'Todas',
  },
  // El estado concuerda con el género del personaje (Viva / Vivo).
  // Sin género (por ejemplo en los filtros) se usa la forma con barra: Vivo/a.
  status: {
    alive: ({ gender } = {}) => ({ female: 'Viva', male: 'Vivo' })[gender] ?? 'Vivo/a',
    dead: ({ gender } = {}) => ({ female: 'Muerta', male: 'Muerto' })[gender] ?? 'Muerto/a',
    unknown: ({ gender } = {}) => ({ female: 'Desconocida', male: 'Desconocido' })[gender] ?? 'Desconocido/a',
  },
  sort: {
    name_asc: 'Nombre A → Z',
    name_desc: 'Nombre Z → A',
    first_appearance: 'Primera aparición',
    status: 'Estado',
    category: 'Categoría',
  },
  // Las claves son los nombres que están guardados en la tabla categories.
  // Si falta alguna, la interfaz muestra el nombre tal cual está en la base.
  categories: {
    Handmaid: 'Criada (Handmaid)',
    Wife: 'Esposa (Wife)',
    Commander: 'Comandante (Commander)',
    Martha: 'Martha',
    Aunt: 'Tía (Aunt)',
    Guardian: 'Guardián (Guardian)',
    Econowife: 'Econowife',
    Otro: 'Otro',
  },
  pagination: {
    label: 'Paginación',
    previous: '← Anterior',
    next: 'Siguiente →',
  },
  errors: {
    retry: 'Reintentar',
    network: 'No se pudo conectar con el servidor.',
    badRequest: 'La solicitud no es válida.',
    notFound: 'No se encontró lo que buscabas.',
    server: 'El servidor tuvo un problema. Probá de nuevo en un momento.',
  },
  detail: {
    back: '← Volver al listado',
    notFound: 'No encontramos a ese personaje.',
    portraitAlt: ({ name }) => `Imagen de ${name}`,
    status: 'Estado',
    category: 'Categoría',
    actor: 'Actor/actriz',
    firstAppearance: 'Primera aparición',
    firstAppearanceValue: ({ season, episode, episodeTitle }) => {
      if (!episode) return `Temporada ${season}`
      const base = `Temporada ${season}, episodio ${episode}`
      return episodeTitle ? `${base} ("${episodeTitle}")` : base
    },
    seasons: 'Temporadas',
    description: 'Descripción',
    noDescription: 'Todavía no hay una descripción cargada.',
    descriptionFallback: 'Esta descripción todavía no está disponible en español.',
    relationships: 'Relaciones',
    noRelationships: 'No hay relaciones registradas.',
  },
  relationship: {
    family: 'Familia',
    partner: 'Pareja',
    friend: 'Amistad',
    enemy: 'Enemigo',
    companion: 'Compañero',
    other: 'Otro',
    // "superior" tiene dirección: depende de qué lado del vínculo estemos mirando
    superiorOut: 'A su cargo',
    superiorIn: 'Superior',
  },
  notFound: {
    title: 'Página no encontrada',
    text: 'La ruta que buscás no existe.',
    home: 'Volver al inicio',
  },
  crash: {
    title: 'Algo salió mal',
    text: 'Ocurrió un error inesperado en la aplicación.',
    reload: 'Recargar la página',
  },
}

const en = {
  common: {
    loading: 'Loading…',
    unknown: 'Unknown',
    noResults: 'No results.',
  },
  nav: {
    home: 'Home',
    characters: 'Characters',
  },
  language: {
    label: 'Language',
  },
  footer: {
    disclaimer: 'Portfolio project. Not affiliated with the series or its rights holders.',
  },
  home: {
    description:
      'An interactive database of the characters of Gilead. Search, filter and explore how they are connected.',
    cta: 'Explore characters',
    total: ({ count }) =>
      count === 1 ? '1 character in the database' : `${count} characters in the database`,
    categories: 'Categories',
  },
  characters: {
    searchLabel: 'Search characters',
    searchPlaceholder: 'Search by character, Handmaid name or actor…',
    count: ({ count }) => `${count} ${count === 1 ? 'character' : 'characters'}`,
    emptyFiltered: 'No characters match those filters.',
    emptyNoData: 'No characters have been added yet.',
    outOfRange: "This page doesn't exist.",
    clearFilters: 'Clear filters',
    backToFirst: 'Back to the first page',
  },
  filters: {
    status: 'Status',
    category: 'Category',
    season: 'Season',
    sort: 'Sort by',
    allMasc: 'All',
    allFem: 'All',
  },
  status: {
    alive: 'Alive',
    dead: 'Dead',
    unknown: 'Unknown',
  },
  sort: {
    name_asc: 'Name A → Z',
    name_desc: 'Name Z → A',
    first_appearance: 'First appearance',
    status: 'Status',
    category: 'Category',
  },
  categories: {
    Handmaid: 'Handmaid',
    Wife: 'Wife',
    Commander: 'Commander',
    Martha: 'Martha',
    Aunt: 'Aunt',
    Guardian: 'Guardian',
    Econowife: 'Econowife',
    Otro: 'Other',
  },
  pagination: {
    label: 'Pagination',
    previous: '← Previous',
    next: 'Next →',
  },
  errors: {
    retry: 'Try again',
    network: 'Could not connect to the server.',
    badRequest: 'The request is not valid.',
    notFound: 'We could not find what you were looking for.',
    server: 'The server ran into a problem. Please try again in a moment.',
  },
  detail: {
    back: '← Back to the list',
    notFound: "We couldn't find that character.",
    portraitAlt: ({ name }) => `Image of ${name}`,
    status: 'Status',
    category: 'Category',
    actor: 'Played by',
    firstAppearance: 'First appearance',
    firstAppearanceValue: ({ season, episode, episodeTitle }) => {
      if (!episode) return `Season ${season}`
      const base = `Season ${season}, episode ${episode}`
      return episodeTitle ? `${base} ("${episodeTitle}")` : base
    },
    seasons: 'Seasons',
    description: 'Description',
    noDescription: 'No description has been added yet.',
    descriptionFallback: 'This description is not available in English yet.',
    relationships: 'Relationships',
    noRelationships: 'No relationships recorded.',
  },
  relationship: {
    family: 'Family',
    partner: 'Partner',
    friend: 'Friend',
    enemy: 'Enemy',
    companion: 'Companion',
    other: 'Other',
    superiorOut: 'Under their command',
    superiorIn: 'Superior',
  },
  notFound: {
    title: 'Page not found',
    text: "The page you're looking for doesn't exist.",
    home: 'Back to home',
  },
  crash: {
    title: 'Something went wrong',
    text: 'An unexpected error happened in the application.',
    reload: 'Reload the page',
  },
}

export const translations = { es, en }
