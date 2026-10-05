export type Category = {
  slug: string;
  name: string;
};

export const CATEGORIES: Category[] = [
  { slug: "politique", name: "Politique" },
  { slug: "societe", name: "Société" },
  { slug: "economie", name: "Économie" },
  { slug: "culture", name: "Culture" },
  { slug: "sport", name: "Sport" },
  { slug: "environnement", name: "Environnement" },
];

export type Article = {
  slug: string;
  category: string;
  title: string;
  chapo: string;
  author: string;
  date: string; // ISO
  readingTime: number; // minutes
  body: string[];
  featured?: boolean;
  views: number;
};

export const ARTICLES: Article[] = [
  {
    slug: "ligne-5-tramway-ouverture",
    category: "societe",
    title: "Le tramway franchit la Loire : la ligne 5 ouvre enfin ses portes aux Nantais",
    chapo:
      "Après six ans de travaux, la nouvelle ligne relie l'île de Nantes au quartier de la Bottière. Premiers voyageurs, premières impressions et quelques couacs.",
    author: "Camille Rousseau",
    date: "2026-10-05T06:30:00+02:00",
    readingTime: 5,
    featured: true,
    views: 12840,
    body: [
      "Il est 5 h 42 lorsque la première rame quitte la station Pirmil, sous les applaudissements d'une poignée de riverains venus assister à l'événement. Six ans après le premier coup de pelle, la ligne 5 du tramway nantais entre en service et relie, en trente-deux minutes, le sud de la métropole au quartier de la Bottière.",
      "« C'est un tournant pour l'île de Nantes », se félicite la présidente de la métropole, présente sur le quai. La ligne traverse la Loire sur le nouveau pont Anne-de-Bretagne, élargi pour l'occasion, et dessert au passage le CHU en construction, les Machines de l'île et le quartier de la création.",
      "Du côté des usagers, l'enthousiasme domine, même si certains regrettent une fréquence encore limitée à un passage toutes les huit minutes aux heures de pointe. « On nous avait promis six minutes », grince une habitante de Rezé. La Semitan assure que la cadence sera renforcée dès janvier, une fois les douze dernières rames livrées.",
      "Les commerçants du boulevard Léon-Bureau, qui ont subi les travaux de plein fouet, espèrent quant à eux une reprise rapide de l'activité. Plusieurs d'entre eux ont installé des terrasses éphémères pour accueillir les curieux ce week-end.",
    ],
  },
  {
    slug: "arbre-aux-herons-chantier",
    category: "culture",
    title: "L'Arbre aux Hérons prend racine : le chantier démarre sur la carrière Miséry",
    chapo:
      "Le projet pharaonique des Machines de l'île entre dans sa phase de construction. Les premières branches d'acier seront assemblées au printemps.",
    author: "Julien Le Goff",
    date: "2026-10-04T18:15:00+02:00",
    readingTime: 4,
    views: 9320,
    body: [
      "Quinze ans après les premières esquisses de François Delarozière, l'Arbre aux Hérons sort enfin des cartons. Les engins de terrassement ont pris possession de la carrière Miséry, sur la rive nord de la Loire, où s'élèvera l'arbre d'acier de 35 mètres de haut.",
      "La structure, qui accueillera à terme vingt-deux branches et deux hérons mécaniques capables d'emporter chacun une vingtaine de passagers, doit ouvrir au public en 2029. Le budget, régulièrement revu à la hausse, est aujourd'hui fixé à 52 millions d'euros, financés à parts égales par la métropole, la région et des mécènes privés.",
      "« Nous construisons un jardin suspendu, pas une attraction », insiste la directrice des Machines. Les premières branches, fabriquées dans les ateliers de la Chantrerie, seront assemblées à partir du mois d'avril. Les Nantais pourront suivre l'avancement du chantier depuis un belvédère provisoire installé sur le quai Marquis-d'Aiguillon.",
    ],
  },
  {
    slug: "fc-nantes-beaujoire-victoire",
    category: "sport",
    title: "À la Beaujoire, le FC Nantes renverse Rennes et relance sa saison",
    chapo:
      "Menés à la pause, les Canaris s'imposent 3-2 dans un derby électrique. Le jeune attaquant Mathis Barreau signe un doublé.",
    author: "Nadia Benali",
    date: "2026-10-04T23:05:00+02:00",
    readingTime: 3,
    views: 15210,
    body: [
      "La Beaujoire n'avait pas vibré ainsi depuis longtemps. Menés 2-0 à la mi-temps face au Stade rennais, les Nantais ont inversé le cours du derby en un quart d'heure, portés par un public incandescent et par la révélation de l'automne, Mathis Barreau, 19 ans, auteur d'un doublé.",
      "« On a parlé dans le vestiaire, on s'est dit que ce match ne pouvait pas se terminer comme ça », a confié le capitaine après la rencontre. Le but de la victoire, inscrit à la 88e minute sur un corner, a déclenché un envahissement du bord de pelouse par les remplaçants.",
      "Avec ce succès, les Canaris remontent à la neuvième place du classement et se rassurent avant un déplacement délicat à Marseille dimanche prochain.",
    ],
  },
  {
    slug: "baignade-loire-etude",
    category: "environnement",
    title: "Se baigner dans la Loire à Nantes : l'étude qui relance le débat",
    chapo:
      "Une campagne de mesures menée tout l'été conclut que la qualité de l'eau est compatible avec la baignade « plus de deux jours sur trois ». La métropole reste prudente.",
    author: "Élise Marchand",
    date: "2026-10-03T12:00:00+02:00",
    readingTime: 6,
    views: 7640,
    body: [
      "Le fleuve est-il redevenu baignable ? C'est la question que posait depuis plusieurs années un collectif d'habitants, et à laquelle un rapport de l'agence régionale de santé apporte un début de réponse. Sur les 84 prélèvements effectués entre juin et septembre au niveau du quai des Antilles, 61 affichent une qualité « bonne » ou « excellente ».",
      "Les mauvais jours correspondent presque toujours aux lendemains d'orage, lorsque les déversoirs du réseau d'assainissement rejettent dans la Loire un mélange d'eaux pluviales et usées. Un problème que le plan « Loire propre », doté de 110 millions d'euros, promet de résorber d'ici 2032.",
      "La métropole, elle, temporise. « Nous ne prendrons aucun risque avec la santé des habitants », indique l'adjointe à l'environnement, qui évoque l'ouverture d'un bassin flottant filtré, sur le modèle de ceux de Paris et de Copenhague, comme une « étape intermédiaire ».",
      "Les partisans de la baignade libre, eux, ont déjà fixé la date de leur prochain plongeon militant : le 21 juin prochain, jour de la fête de la musique.",
    ],
  },
  {
    slug: "talensac-renovation-halles",
    category: "societe",
    title: "Talensac fait peau neuve : ce qui va changer pour le plus grand marché de la ville",
    chapo:
      "Toiture, étals, horaires : la rénovation des halles débute en janvier. Les commerçants redoutent dix-huit mois de travaux.",
    author: "Camille Rousseau",
    date: "2026-10-03T08:45:00+02:00",
    readingTime: 4,
    views: 5120,
    body: [
      "Inaugurées en 1937, les halles de Talensac n'avaient jamais connu de rénovation d'ampleur. Ce sera chose faite à partir de janvier, avec un chantier de 14 millions d'euros qui prévoit la réfection complète de la toiture, l'installation de panneaux solaires et la réorganisation des 140 étals.",
      "Le marché restera ouvert pendant les travaux, mais les commerçants seront déplacés par tiers sous une halle provisoire installée place Viarme. « Dix-huit mois, c'est long pour un fromager », soupire l'un d'eux, qui craint de perdre une partie de sa clientèle.",
      "La ville promet en contrepartie une ouverture élargie le dimanche après-midi et la création d'un espace de restauration sur place, à l'image de ce qui se fait à Lyon ou à Barcelone.",
    ],
  },
  {
    slug: "voyage-a-nantes-bilan-2026",
    category: "culture",
    title: "Le Voyage à Nantes 2026 : record de fréquentation et polémique sur l'anneau de la pointe",
    chapo:
      "Près de 900 000 visiteurs ont suivi la ligne verte cet été. L'œuvre installée à la pointe de l'île, jugée « dangereuse » par des riverains, sera démontée.",
    author: "Julien Le Goff",
    date: "2026-10-02T17:30:00+02:00",
    readingTime: 4,
    views: 6230,
    body: [
      "Le Voyage à Nantes n'avait jamais attiré autant de monde. Avec 890 000 visiteurs recensés entre le 28 juin et le 1er septembre, la quinzième édition du parcours artistique dépasse de 12 % le précédent record établi en 2023.",
      "Le succès ne masque pas une controverse : l'anneau de béton de huit mètres de diamètre posé à la pointe de l'île de Nantes, et sur lequel les promeneurs aimaient se hisser, sera retiré à la fin du mois après trois chutes sans gravité et une pétition de riverains.",
      "« Une œuvre doit vivre avec son public, et parfois ce public la déborde », philosophe le directeur artistique, qui annonce déjà la thématique de l'édition 2027 : le fleuve.",
    ],
  },
  {
    slug: "airbus-nantes-recrutements",
    category: "economie",
    title: "Airbus recrute 600 personnes à Bouguenais pour le futur avion à hydrogène",
    chapo:
      "Le site nantais devient le centre de compétences européen des réservoirs cryogéniques. Les premières embauches débutent en novembre.",
    author: "Thomas Guérin",
    date: "2026-10-02T09:10:00+02:00",
    readingTime: 5,
    views: 8870,
    body: [
      "C'est une annonce que les élus locaux attendaient depuis des mois. Airbus a confirmé jeudi que son usine de Bouguenais accueillera le développement et la production des réservoirs d'hydrogène liquide du futur avion ZEROe, dont le premier vol commercial est désormais visé pour 2038.",
      "Six cents recrutements sont prévus d'ici 2029, dont la moitié d'ingénieurs et de techniciens spécialisés en cryogénie et en matériaux composites. Une nouvelle halle de 22 000 mètres carrés sortira de terre sur la zone D2A, le long de la Loire.",
      "L'annonce ravit les sous-traitants de la région, qui emploient déjà 18 000 personnes dans l'aéronautique. Elle inquiète en revanche les associations de riverains, qui réclament des garanties sur la sécurité du stockage d'hydrogène à proximité des habitations.",
      "L'université de Nantes ouvrira dès la rentrée prochaine un master dédié, co-financé par l'avionneur.",
    ],
  },
  {
    slug: "conseil-metropolitain-budget-2027",
    category: "politique",
    title: "Budget 2027 : la métropole serre la vis et sacrifie le projet de téléphérique",
    chapo:
      "Face à la baisse des dotations, l'exécutif renonce à la liaison aérienne Chantenay–Trentemoult et gèle les embauches. L'opposition dénonce « un budget d'austérité ».",
    author: "Sophie Lemaire",
    date: "2026-10-01T20:40:00+02:00",
    readingTime: 5,
    views: 4310,
    body: [
      "La séance a duré plus de sept heures. Réuni vendredi, le conseil métropolitain a adopté les orientations budgétaires pour 2027, marquées par un plan d'économies de 38 millions d'euros. Principale victime : le téléphérique urbain entre Chantenay et Trentemoult, dont les études sont suspendues « sine die ».",
      "« Nous préférons financer ce qui roule déjà plutôt que ce qui ne volera peut-être jamais », a justifié la présidente, qui promet en échange le maintien de la gratuité des transports le week-end et la poursuite du plan vélo.",
      "L'opposition de droite a voté contre, dénonçant « un budget d'austérité qui ne dit pas son nom », tandis que les élus écologistes se sont abstenus, regrettant l'abandon du téléphérique, « seul projet réellement décarboné de la mandature ».",
    ],
  },
  {
    slug: "loyers-nantes-encadrement",
    category: "economie",
    title: "Encadrement des loyers : à Nantes, un bailleur sur quatre dépasse encore le plafond",
    chapo:
      "Un an après l'entrée en vigueur du dispositif, l'observatoire des loyers dresse un bilan contrasté. Les studios restent les plus concernés.",
    author: "Thomas Guérin",
    date: "2026-10-01T07:50:00+02:00",
    readingTime: 4,
    views: 6980,
    body: [
      "L'encadrement des loyers, en vigueur à Nantes depuis octobre 2025, a-t-il freiné la hausse ? Oui, répond l'observatoire local de l'habitat, qui constate une stabilisation du loyer médian à 14,20 euros le mètre carré. Mais 24 % des annonces publiées en septembre dépassaient toujours le plafond autorisé, contre 31 % un an plus tôt.",
      "Les petites surfaces du centre-ville concentrent l'essentiel des dépassements, souvent justifiés par des « compléments de loyer » pour une terrasse ou une vue dégagée. La ville a mis en demeure 212 propriétaires et prononcé 37 amendes.",
      "Les associations de locataires réclament un renforcement des contrôles, tandis que les agents immobiliers pointent une raréfaction de l'offre : le nombre de logements proposés à la location a reculé de 9 % en un an.",
    ],
  },
  {
    slug: "ilots-de-fraicheur-plan-canopee",
    category: "environnement",
    title: "Après un été à 41 °C, Nantes veut planter 100 000 arbres d'ici 2030",
    chapo:
      "Le plan « Canopée » cible en priorité les cours d'école et les grands axes du centre. Les premières plantations ont commencé place Graslin.",
    author: "Élise Marchand",
    date: "2026-09-30T14:20:00+02:00",
    readingTime: 4,
    views: 3870,
    body: [
      "Le thermomètre a atteint 41,3 °C le 12 août dernier à Nantes, un record absolu. Pour atténuer les prochains épisodes caniculaires, la ville a présenté mardi son plan « Canopée » : 100 000 arbres plantés en quatre ans, dont 15 000 dans les cours d'école, qui seront toutes débitumées.",
      "Les premiers sujets, des micocouliers et des chênes verts choisis pour leur résistance à la sécheresse, ont été mis en terre place Graslin devant une centaine d'élèves. Le cours des Cinquante-Otages, le boulevard de la Prairie-au-Duc et la place du Commerce suivront en 2027.",
      "Le coût du programme, 64 millions d'euros, est en partie financé par le fonds vert de l'État. Les services de la ville recherchent par ailleurs 500 « parrains d'arbres » bénévoles chargés de l'arrosage pendant les trois premiers étés.",
    ],
  },
  {
    slug: "hbc-nantes-ligue-des-champions",
    category: "sport",
    title: "Le HBC Nantes s'offre Kiel et prend la tête de son groupe de Ligue des champions",
    chapo:
      "Portés par un Palais des sports de Beaulieu à guichets fermés, les Nantais battent le géant allemand 31-28.",
    author: "Nadia Benali",
    date: "2026-09-30T22:50:00+02:00",
    readingTime: 3,
    views: 4450,
    body: [
      "Le « H » a frappé fort. Opposé jeudi soir au THW Kiel, quadruple vainqueur de la compétition, le HBC Nantes a livré l'un de ses meilleurs matchs européens, s'imposant 31 à 28 devant 5 400 spectateurs.",
      "Le gardien nantais, auteur de 17 arrêts, a été élu homme du match. « On a joué sans complexe, avec une intensité défensive que je n'avais pas vue depuis longtemps », savourait l'entraîneur à l'issue de la rencontre.",
      "Avec trois victoires en trois journées, Nantes occupe seul la tête de son groupe avant de se rendre à Barcelone la semaine prochaine.",
    ],
  },
  {
    slug: "chateau-ducs-exposition-anne-bretagne",
    category: "culture",
    title: "Au château des ducs, Anne de Bretagne sort de la légende",
    chapo:
      "La grande exposition de l'automne rassemble 180 pièces, dont le reliquaire du cœur de la duchesse, pour la première fois présenté hors de Nantes depuis 2018.",
    author: "Julien Le Goff",
    date: "2026-09-29T11:00:00+02:00",
    readingTime: 5,
    views: 2980,
    body: [
      "Deux fois reine de France, dernière duchesse d'une Bretagne indépendante, Anne de Bretagne a nourri cinq siècles de récits contradictoires. L'exposition qui s'ouvre samedi au château des ducs, « Anne, la duchesse et ses légendes », entend démêler le mythe de l'histoire.",
      "Parmi les 180 pièces réunies, le livre d'heures enluminé prêté par la Bibliothèque nationale de France et, surtout, le reliquaire d'or du cœur de la duchesse, volé puis retrouvé en 2018, qui retrouve ses vitrines nantaises sous haute surveillance.",
      "Le parcours s'achève sur une salle consacrée aux usages politiques de la figure d'Anne, des manuels scolaires de la IIIe République aux banderoles des manifestations pour la réunification de la Bretagne. L'exposition est visible jusqu'au 1er mars.",
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function articlesByCategory(slug: string) {
  return ARTICLES.filter((a) => a.category === slug).sort((a, b) => b.date.localeCompare(a.date));
}

export function latestArticles() {
  return [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
}

export function mostRead(n = 5) {
  return [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, n);
}

export function formatDate(iso: string, withTime = false) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  if (!withTime) return date;
  const time = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  return `${date} à ${time}`;
}
