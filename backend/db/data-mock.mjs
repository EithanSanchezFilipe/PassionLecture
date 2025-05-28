const books = [
  {
    name: "Jeanne de Belleville",
    passage:
      "Il était une fois, dans une vieille maison de campagne, un cri perça la nuit...",
    summary: "/uploads/extraits/Extrait-Jeanne-de-Belleville.pdf",
    editionYear: 1907,
    pages: 320,
    category_fk: 1,
    author_fk: 1,
    editor_fk: 1,
    user_fk: 1,
  },
  {
    name: "Mais qui donc est Lico ?",
    passage:
      "Dans une villa au bord de la mer, une chambre bleue cache un terrible secret...",
    summary:
      "/uploads/extraits/Extrait-Mais-qui-donc-est-Lico.pdf",
    editionYear: 1908,
    pages: 350,
    category_fk: 1,
    author_fk: 1,
    editor_fk: 1,
    user_fk: 1,
  },
  {
    name: "Si tu savais ma vie",
    passage:
      "Une villa isolée, une chambre verte, et un nouveau mystère à résoudre...",
    summary:
      "/uploads/extraits/Extrait-Si-tu-savais-ma-vie.pdf",
    editionYear: 1909,
    pages: 330,
    category_fk: 1,
    author_fk: 1,
    editor_fk: 1,
    user_fk: 1,
  },
  {
    name: "Chat'pitre 1",
    passage:
      "Il dort. Quoique le sort fût pour lui bien étrange, il ne vivait que pour le bien d'autrui.",
    summary:
      "/uploads/extraits/Extrait-Chat'pitre-1.pdf",
    editionYear: 1862,
    pages: 1500,
    category_fk: 2,
    author_fk: 2,
    editor_fk: 2,
  },
  {
    name: "Recit insolite d'une jeunesse ordinaire",
    passage: "Une version condensée du chef-d'œuvre de Victor Hugo...",
    summary:
      "/uploads/extraits/Extrait-Recit-insolite-dune-jeunesse-ordinaire.pdf",
    editionYear: 2010,
    pages: 400,
    category_fk: 2,
    author_fk: 2,
    editor_fk: 2,
  },
  {
    name: "1984",
    passage: "War is peace. Freedom is slavery. Ignorance is strength.",
    summary:
      "Dans une société dystopique contrôlée par un régime totalitaire, Winston Smith cherche à s'échapper de l'emprise de Big Brother. Un roman de science-fiction politique puissant.",
    editionYear: 1949,
    pages: 328,
    category_fk: 3,
    author_fk: 3,
    editor_fk: 3,
  },
  {
    name: "1985",
    passage: "Une suite dystopique qui explore les conséquences...",
    summary:
      "Suite imaginée de 1984, ce roman explore ce qui aurait pu se passer après les événements du roman original.",
    editionYear: 1950,
    pages: 340,
    category_fk: 3,
    author_fk: 3,
    editor_fk: 3,
  },
  {
    name: "L'Alchimiste",
    passage:
      "Quand vous voulez vraiment quelque chose, tout l'Univers conspire à vous aider à l'obtenir.",
    summary:
      "'L'histoire de Santiago, un jeune berger andalou, en quête d'un trésor caché. Un voyage initiatique qui parle de rêves, de destin et de la quête de soi.'",
    editionYear: 1988,
    pages: 208,
    category_fk: 4,
    author_fk: 4,
    editor_fk: 4,
  },
  {
    name: "L'Alchimiste - Édition Spéciale",
    passage: "Une édition enrichie du célèbre roman...",
    summary:
      "Version spéciale avec des annotations et des illustrations inédites.",
    editionYear: 2010,
    pages: 250,
    category_fk: 4,
    author_fk: 4,
    editor_fk: 4,
  },
  {
    name: "Le Petit Prince",
    passage:
      "On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.",
    summary:
      "Un conte poétique et philosophique sous l'apparence d'un livre pour enfants. L'histoire d'un petit prince qui voyage de planète en planète.",
    editionYear: 1943,
    pages: 111,
    category_fk: 4,
    author_fk: 5,
    editor_fk: 5,
  },
  {
    name: "Le Petit Prince - Version Illustrée",
    passage: "Une version magnifiquement illustrée du conte...",
    summary:
      "Version du Petit Prince avec des illustrations originales et des commentaires explicatifs.",
    editionYear: 2015,
    pages: 150,
    category_fk: 4,
    author_fk: 5,
    editor_fk: 5,
  },
  {
    name: "Notre-Dame de Paris",
    passage: "Le temps est aveugle et l'homme est stupide.",
    summary:
      "L'histoire tragique de Quasimodo, Esmeralda et Claude Frollo dans le Paris médiéval. Un chef-d'œuvre du romantisme français.",
    editionYear: 1831,
    pages: 940,
    category_fk: 2,
    author_fk: 2,
    editor_fk: 2,
  },
  {
    name: "Notre-Dame de Paris - Version Abrégée",
    passage: "Une version condensée du chef-d'œuvre...",
    summary: "Version abrégée du roman, adaptée pour les jeunes lecteurs.",
    editionYear: 2012,
    pages: 300,
    category_fk: 2,
    author_fk: 2,
    editor_fk: 2,
  },
];

const categories = [
  { name: "Roman Policier" },
  { name: "Roman Historique" },
  { name: "Science-Fiction" },
  { name: "Aventure" },
  { name: "Fantasy" },
  { name: "Thriller" },
  { name: "Biographie" },
  { name: "Poésie" },
  { name: "Théâtre" },
  { name: "Essai" },
];

const authors = [
  { firstname: "Gaston", lastname: "Leroux", user_fk: 1 },
  { firstname: "Victor", lastname: "Hugo", user_fk: 1 },
  { firstname: "George", lastname: "Orwell", user_fk: 1 },
  { firstname: "Paulo", lastname: "Coelho", user_fk: 1 },
  { firstname: "Antoine", lastname: "de Saint-Exupéry", user_fk: 1 },
  { firstname: "Albert", lastname: "Camus" },
  { firstname: "Marcel", lastname: "Proust" },
  { firstname: "Gustave", lastname: "Flaubert" },
  { firstname: "Émile", lastname: "Zola" },
  { firstname: "Jules", lastname: "Verne" },
];

const editors = [
  { name: "Éditions Félix" },
  { name: "Éditions Classiques" },
  { name: "Secker & Warburg" },
  { name: "HarperCollins" },
  { name: "Gallimard" },
  { name: "Flammarion" },
  { name: "Grasset" },
  { name: "Albin Michel" },
  { name: "Robert Laffont" },
  { name: "Le Livre de Poche" },
];

const users = [
  {
    username: "admin",
    email: "admin@passionlecture.com",
    password: "$2b$10$WqqoJHSGXymFarXrHaRQJuB7DCpv66CTQp5jv3jpdBGTclwYLMjRG",
    admin: true,
  },
  {
    username: "lecteur1",
    email: "lecteur1@passionlecture.com",
    password: "$2b$10$X7UrH5YxX5YxX5YxX5YxX.5YxX5YxX5YxX5YxX5YxX5YxX5YxX5YxX",
    admin: false,
  },
  {
    username: "lecteur2",
    email: "lecteur2@passionlecture.com",
    password: "$2b$10$X7UrH5YxX5YxX5YxX5YxX.5YxX5YxX5YxX5YxX5YxX5YxX5YxX5YxX",
    admin: false,
  },
];

const comments = [
  {
    note: 5,
    username: "lecteur1",
    message: "Un excellent livre qui m'a tenu en haleine jusqu'à la fin !",
    book_fk: 1,
    user_fk: 2,
  },
  {
    note: 4,
    username: "lecteur2",
    message: "Une belle histoire, bien écrite et captivante.",
    book_fk: 2,
    user_fk: 3,
  },
  {
    note: 5,
    username: "lecteur1",
    message: "Un classique de la littérature à ne pas manquer !",
    book_fk: 3,
    user_fk: 2,
  },
];

export { books, categories, authors, editors, users, comments };
