const books = [
  {
    id: 1,
    titre: 'Le Mystère de la Chambre Jaune',
    extrait:
      'Il était une fois, dans une vieille maison de campagne, un cri perça la nuit...',
    resume:
      "Dans ce roman policier, le jeune détective François de la Roche résout une série de mystères autour d'une chambre mystérieuse.",
    annee_edition: 1907,
    nombre_de_pages: 320,
    id_categorie: 1,
    id_auteur: 1,
    id_editeur: 1,
  },
  {
    id: 2,
    titre: 'Les Misérables',
    extrait:
      "Il dort. Quoique le sort fût pour lui bien étrange, il ne vivait que pour le bien d'autrui.",
    resume:
      "L’histoire de Jean Valjean, un ancien forçat, qui cherche la rédemption tout en étant poursuivi par l'inspecteur Javert. Un roman qui explore la misère sociale et la justice.",
    annee_edition: 1862,
    nombre_de_pages: 1500,
    id_categorie: 2,
    id_auteur: 2,
    id_editeur: 2,
  },
  {
    id: 3,
    titre: '1984',
    extrait: 'War is peace. Freedom is slavery. Ignorance is strength.',
    resume:
      "Dans une société dystopique contrôlée par un régime totalitaire, Winston Smith cherche à s'échapper de l’emprise de Big Brother. Un roman de science-fiction politique puissant.",
    annee_edition: 1949,
    nombre_de_pages: 328,
    id_categorie: 3,
    id_auteur: 3,
    id_editeur: 3,
  },
  {
    id: 4,
    titre: "L'Alchimiste",
    extrait:
      "Quand vous voulez vraiment quelque chose, tout l'Univers conspire à vous aider à l'obtenir.",
    resume:
      'L’histoire de Santiago, un jeune berger andalou, en quête d’un trésor caché. Un voyage initiatique qui parle de rêves, de destin et de la quête de soi.',
    annee_edition: 1988,
    nombre_de_pages: 208,
    id_categorie: 4,
    id_auteur: 4,
    id_editeur: 4,
  },
];
const categories = [
  {
    id: 1,
    nom: 'Roman Policier',
  },
  {
    id: 2,
    nom: 'Roman Historique',
  },
  {
    id: 3,
    nom: 'Science-Fiction',
  },
  {
    id: 4,
    nom: 'Aventure',
  },
];
const authors = [
  {
    id: 1,
    prenom: 'Gaston',
    nom: 'Leroux',
  },
  {
    id: 2,
    prenom: 'Victor',
    nom: 'Hugo',
  },
  {
    id: 3,
    prenom: 'George',
    nom: 'Orwell',
  },
  {
    id: 4,
    prenom: 'Paulo',
    nom: 'Coelho',
  },
];
const editors = [
  {
    id: 1,
    nom: 'Éditions Félix',
  },
  {
    id: 2,
    nom: 'Éditions Classiques',
  },
  {
    id: 3,
    nom: 'Secker & Warburg',
  },
  {
    id: 4,
    nom: 'HarperCollins',
  },
];
export { books, categories, authors, editors };
