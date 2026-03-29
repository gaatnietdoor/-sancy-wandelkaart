// Sancy Wandelkaart - Data
// 20 Balades Thématiques van het Massif du Sancy
// Bron: informatieborden ter plaatse

const TRAILS = [
  {
    id: 1,
    name: "Sur les traces de l'ancien funiculaire",
    gemeente: "La Bourboule",
    afstand: "3.5 km",
    duur: "1u30",
    hoogteverschil: "329 m",
    moeilijkheid: "moeilijk",
    beschrijving: "Steile wandeling op de sporen van de oude kabelspoorweg van La Bourboule. Vertrek vanaf Avenue Agis Ledru.",
    startPunt: [45.5878, 2.7381],
    hoogtepunten: ["Ancien funiculaire", "Uitzicht over La Bourboule"]
  },
  {
    id: 2,
    name: "Le chemin de l'estive ovine",
    gemeente: "Murat-le-Quaire",
    afstand: "4.3 km",
    duur: "1u30",
    hoogteverschil: "158 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Wandeling over het pad van de schaapskuddes richting de zomerweides. Vertrek vanaf Parking de la Banne d'Ordanche.",
    startPunt: [45.6050, 2.7580],
    hoogtepunten: ["Banne d'Ordanche", "Bergweiden", "Schaapsherderstraditie"]
  },
  {
    id: 3,
    name: "Sylvatorium",
    gemeente: "Le Mont-Dore",
    afstand: "1.0 km",
    duur: "0u45",
    hoogteverschil: "20 m",
    moeilijkheid: "makkelijk",
    beschrijving: "Korte, toegankelijke boswandeling bij de Capucin. Ideaal voor gezinnen. Vertrek vanaf Parking du Capucin.",
    startPunt: [45.5640, 2.8050],
    hoogtepunten: ["Sylvatorium bospad", "Salon du Capucin"]
  },
  {
    id: 4,
    name: "Les pentes du château",
    gemeente: "Murol",
    afstand: "4.8 km",
    duur: "1u30",
    hoogteverschil: "170 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Wandeling over de hellingen van het kasteel van Murol. Vertrek vanaf het Office de Tourisme.",
    startPunt: [45.5720, 2.9450],
    hoogtepunten: ["Château de Murol", "Uitzicht op Lac Chambon"]
  },
  {
    id: 5,
    name: "Balade au pas de l'âne",
    gemeente: "Chambon-sur-Lac",
    afstand: "5.8 km",
    duur: "2u00",
    hoogteverschil: "132 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Wandeling in het tempo van de ezel rondom Chambon-sur-Lac. Vertrek vanaf het kerkhof van Chambon-sur-Lac.",
    startPunt: [45.5730, 2.8650],
    hoogtepunten: ["Lac Chambon", "Landelijk landschap"]
  },
  {
    id: 6,
    name: "Les chemins de Saint-Nectaire",
    gemeente: "Saint-Nectaire",
    afstand: "3.7 km",
    duur: "1u30",
    hoogteverschil: "106 m",
    moeilijkheid: "makkelijk",
    beschrijving: "De paden van het beroemde kaasdorp Saint-Nectaire. Vertrek vanaf het Office de Tourisme / Église.",
    startPunt: [45.5870, 2.9930],
    hoogtepunten: ["Église romane de Saint-Nectaire", "Thermale bronnen"]
  },
  {
    id: 7,
    name: "Balade Zen",
    gemeente: "Le Vernet-Sainte-Marguerite",
    afstand: "5.9 km",
    duur: "2u00",
    hoogteverschil: "124 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Een ontspannen zen-wandeling door het rustige landschap. Vertrek vanaf Auberge du Puy d'Alou.",
    startPunt: [45.6050, 2.9200],
    hoogtepunten: ["Plateau landschap", "Rust en natuur"]
  },
  {
    id: 8,
    name: "Sur les pas d'un géologue",
    gemeente: "Saint-Victor-la-Rivière",
    afstand: "4.8 km",
    duur: "2u00",
    hoogteverschil: "179 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "In de voetsporen van een geoloog: ontdek het vulkanische landschap. Vertrek nabij het kerkhof.",
    startPunt: [45.5350, 2.9550],
    hoogtepunten: ["Vulkanisch landschap", "Geologische formaties"]
  },
  {
    id: 9,
    name: "Du calvaire au royaume des cieux",
    gemeente: "Saint-Pierre-Colamine",
    afstand: "7.3 km",
    duur: "2u30",
    hoogteverschil: "283 m",
    moeilijkheid: "moeilijk",
    beschrijving: "Van de calvarieberg naar het hemels koninkrijk. Vertrek vanaf Rue du Lavoir in Lomprat.",
    startPunt: [45.5400, 2.9780],
    hoogtepunten: ["Grottes Jonas", "Vulkanisch landschap", "Lomprat"]
  },
  {
    id: 10,
    name: "Au fil de l'eau",
    gemeente: "Saint-Diéry",
    afstand: "4.7 km",
    duur: "1u30",
    hoogteverschil: "71 m",
    moeilijkheid: "makkelijk",
    beschrijving: "Langs het water: een rustige wandeling langs de beekjes van Saint-Diéry. Vertrek vanaf Place de Soteyroux.",
    startPunt: [45.5610, 2.9750],
    hoogtepunten: ["Beekjes", "Watermolens", "Dorpje Saint-Diéry"]
  },
  {
    id: 11,
    name: "La vallée magique",
    gemeente: "Besse-et-Saint-Anastaise",
    afstand: "3.2 km",
    duur: "1u30",
    hoogteverschil: "82 m",
    moeilijkheid: "makkelijk",
    beschrijving: "De magische vallei van Besse: een betoverende korte wandeling. Vertrek vanaf het Office de Tourisme.",
    startPunt: [45.5120, 2.9370],
    hoogtepunten: ["Middeleeuws stadje Besse", "Magische vallei"]
  },
  {
    id: 12,
    name: "Le sentier des légendes",
    gemeente: "La Godivelle",
    afstand: "6.3 km",
    duur: "1u30",
    hoogteverschil: "101 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Het legendepad: wandel langs de twee kratermeren van La Godivelle. Vertrek tegenover de Mairie.",
    startPunt: [45.3890, 2.8860],
    hoogtepunten: ["Lac d'en Haut", "Lac d'en Bas", "Veengebied"]
  },
  {
    id: 13,
    name: "Le chemin des Ségures",
    gemeente: "Compains",
    afstand: "7.0 km",
    duur: "2u00",
    hoogteverschil: "160 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Het pad van de Ségures door het wijde plateau van Compains. Vertrek vanaf Place de Fresnel.",
    startPunt: [45.4300, 2.9600],
    hoogtepunten: ["Plateau du Cézallier", "Église de Brion", "Weidse vergezichten"]
  },
  {
    id: 14,
    name: "Les secrets de Valbeleix",
    gemeente: "Valbeleix",
    afstand: "2.1 km",
    duur: "1u00",
    hoogteverschil: "78 m",
    moeilijkheid: "makkelijk",
    beschrijving: "De geheimen van Valbeleix: een korte wandeling door dit verborgen dorpje.",
    startPunt: [45.4540, 2.9750],
    hoogtepunten: ["Dorpje Valbeleix", "Verborgen hoekjes"]
  },
  {
    id: 15,
    name: "Les marchands de toile",
    gemeente: "Espinchal",
    afstand: "4.1 km",
    duur: "1u30",
    hoogteverschil: "150 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Op het pad van de stoffenhandelaren van Espinchal. Vertrek vanaf Place de l'Église.",
    startPunt: [45.4150, 2.9350],
    hoogtepunten: ["Dorp Espinchal", "Handelsgeschiedenis"]
  },
  {
    id: 16,
    name: "Le sentier des burons",
    gemeente: "Montgreleix",
    afstand: "6.0 km",
    duur: "2u00",
    hoogteverschil: "140 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Het buronpad: wandel langs de traditionele kaasmakerijen (burons) op de hoogvlakte.",
    startPunt: [45.4290, 2.8100],
    hoogtepunten: ["Burons (berghutten)", "Hoogvlakte", "Kaasmakerij-traditie"]
  },
  {
    id: 17,
    name: "Le chemin des maquisards",
    gemeente: "Saint-Genès-Champespe",
    afstand: "7.9 km",
    duur: "2u30",
    hoogteverschil: "172 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Het pad van de verzetsstrijders uit WOII. Vertrek vanaf de Maison des Fromages.",
    startPunt: [45.4450, 2.7650],
    hoogtepunten: ["Verzetsgeschiedenis", "Maison des Fromages", "Bossen"]
  },
  {
    id: 18,
    name: "Vachas, moline et frounajou",
    gemeente: "Egliseneuve-d'Entraigues",
    afstand: "5.8 km",
    duur: "1u30",
    hoogteverschil: "154 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Koeien, molens en kaas: ontdek de agrarische tradities in het Occitaanse dialect. Vertrek vanaf de Mairie.",
    startPunt: [45.4030, 2.9130],
    hoogtepunten: ["Agrarisch erfgoed", "Watermolens", "Kaasmakerij"]
  },
  {
    id: 19,
    name: "Et si Picherande m'était conté",
    gemeente: "Picherande",
    afstand: "6.5 km",
    duur: "2u30",
    hoogteverschil: "215 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Als Picherande mij werd verteld: ontdek de verhalen van dit bergdorp.",
    startPunt: [45.4670, 2.7760],
    hoogtepunten: ["Dorp Picherande", "Berglandschap", "Lokale verhalen"]
  },
  {
    id: 20,
    name: "Sentier du bourg et fontaine salée",
    gemeente: "Chastreix",
    afstand: "5.2 km",
    duur: "1u30",
    hoogteverschil: "131 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Dorpswandeling langs de zoute bron van Chastreix.",
    startPunt: [45.5160, 2.7310],
    hoogtepunten: ["Fontaine salée", "Dorp Chastreix", "Bergzicht"]
  }
];

const TOWNS = [
  { name: "Le Mont-Dore", coords: [45.5736, 2.8081], voorzieningen: ["thermes", "camping", "gite", "piscine", "tennis"] },
  { name: "La Bourboule", coords: [45.5878, 2.7381], voorzieningen: ["thermes", "camping", "piscine", "tennis", "escalade"] },
  { name: "Murat-le-Quaire", coords: [45.5970, 2.7530], voorzieningen: ["gite", "camping"] },
  { name: "Chambon-sur-Lac", coords: [45.5690, 2.8700], voorzieningen: ["camping", "piscine", "equitation"] },
  { name: "Murol", coords: [45.5720, 2.9450], voorzieningen: ["camping", "gite", "piscine", "equitation"] },
  { name: "Saint-Nectaire", coords: [45.5870, 2.9930], voorzieningen: ["thermes", "camping", "gite"] },
  { name: "Super-Besse", coords: [45.5070, 2.8510], voorzieningen: ["camping", "piscine", "escalade"] },
  { name: "Besse-et-Saint-Anastaise", coords: [45.5120, 2.9370], voorzieningen: ["camping", "gite", "piscine"] },
  { name: "Saint-Victor-la-Rivière", coords: [45.5350, 2.9550], voorzieningen: ["gite"] },
  { name: "Chastreix", coords: [45.5160, 2.7310], voorzieningen: ["gite", "camping"] },
  { name: "Picherande", coords: [45.4670, 2.7760], voorzieningen: ["gite", "camping"] },
  { name: "Saint-Pierre-Colamine", coords: [45.5450, 2.9830], voorzieningen: ["gite"] },
  { name: "Le Vernet-Sainte-Marguerite", coords: [45.6050, 2.9200], voorzieningen: [] },
  { name: "Egliseneuve-d'Entraigues", coords: [45.4030, 2.9130], voorzieningen: ["camping", "gite"] },
  { name: "Compains", coords: [45.4300, 2.9600], voorzieningen: ["gite"] },
  { name: "La Godivelle", coords: [45.3890, 2.8860], voorzieningen: [] },
  { name: "Espinchal", coords: [45.4150, 2.9350], voorzieningen: [] },
  { name: "Saint-Genès-Champespe", coords: [45.4450, 2.7650], voorzieningen: ["gite"] },
  { name: "Valbeleix", coords: [45.4540, 2.9750], voorzieningen: [] },
  { name: "Saint-Diéry", coords: [45.5610, 2.9750], voorzieningen: [] },
  { name: "Montgreleix", coords: [45.4290, 2.8100], voorzieningen: [] }
];

const POINTS_OF_INTEREST = [
  { name: "Puy de Sancy", type: "sommet", coords: [45.5293, 2.8142], hoogte: "1886 m", beschrijving: "Hoogste punt van het Centraal Massief" },
  { name: "Lac Pavin", type: "meer", coords: [45.4960, 2.8890], hoogte: "1197 m", beschrijving: "Mysterieus kratermeer van vulkanische oorsprong" },
  { name: "Lac Chambon", type: "meer", coords: [45.5730, 2.8650], hoogte: "877 m", beschrijving: "Groot meer aan de voet van het Château de Murol" },
  { name: "Cascades d'Entraigues", type: "waterval", coords: [45.4170, 2.9050], hoogte: null, beschrijving: "Schilderachtige watervallen bij Entraigues" },
  { name: "Cascade du Bois de Chaux", type: "waterval", coords: [45.4190, 2.9100], hoogte: null, beschrijving: "Waterval in het Bois de Chaux" },
  { name: "Grande Cascade du Mont-Dore", type: "waterval", coords: [45.5600, 2.8000], hoogte: null, beschrijving: "Hoogste waterval van de Auvergne (30m)" },
  { name: "Vallée de Chaudefour", type: "natuurreservaat", coords: [45.5420, 2.8450], hoogte: null, beschrijving: "Nationaal natuurreservaat met unieke fauna en flora" },
  { name: "Grottes Jonas", type: "bezienswaardigheid", coords: [45.5430, 2.9810], hoogte: null, beschrijving: "Middeleeuwse grotwoningen uitgehakt in de rots" },
  { name: "Château de Murol", type: "bezienswaardigheid", coords: [45.5735, 2.9430], hoogte: "1050 m", beschrijving: "Imposant middeleeuws kasteel uit de 12e eeuw" },
  { name: "Lac d'en Haut (La Godivelle)", type: "meer", coords: [45.3920, 2.8830], hoogte: "1239 m", beschrijving: "Beschermd kratermeer, een van de mooiste van de Auvergne" },
  { name: "Station de Chastreix-Sancy", type: "skistation", coords: [45.5100, 2.7450], hoogte: "1350 m", beschrijving: "Klein skistation aan de zuidzijde van de Sancy" },
  { name: "Station du Mont-Dore", type: "skistation", coords: [45.5500, 2.8050], hoogte: "1350 m", beschrijving: "Skistation van Le Mont-Dore" }
];

// Voorzieningen iconen mapping
const VOORZIENINGEN_ICONS = {
  thermes: { label: "Thermen", icon: "\u{1F3DB}\uFE0F" },
  camping: { label: "Camping", icon: "\u26FA" },
  gite: { label: "G\u00EEte d'\u00E9tape", icon: "\u{1F3E0}" },
  piscine: { label: "Zwembad", icon: "\u{1F3CA}" },
  equitation: { label: "Paardrijden", icon: "\u{1F434}" },
  escalade: { label: "Klimmen", icon: "\u{1F9D7}" },
  tennis: { label: "Tennis", icon: "\u{1F3BE}" },
  accrobranche: { label: "Klimbos", icon: "\u{1F333}" }
};
