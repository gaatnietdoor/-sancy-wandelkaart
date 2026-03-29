// Sancy Wandelkaart - Data
// Alle wandelingen, dorpen en bezienswaardigheden van het Massif du Sancy

const TRAILS = [
  {
    id: 1,
    name: "Cascades d'Entraigues",
    gemeente: "Egliseneuve-d'Entraigues",
    afstand: "8.2 km",
    duur: "2u30",
    hoogteverschil: "285 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Prachtige rondwandeling langs de watervallen van Entraigues en door het dal van de Couze d'Entraigues.",
    startPunt: [45.4030, 2.9130],
    hoogtepunten: ["Cascades d'Entraigues", "Cascade du Bois de Chaux", "Dressondeix", "Bost de Village"]
  },
  {
    id: 2,
    name: "Puy de Sancy",
    gemeente: "Le Mont-Dore",
    afstand: "5.5 km",
    duur: "3u00",
    hoogteverschil: "650 m",
    moeilijkheid: "moeilijk",
    beschrijving: "Beklimming van de Puy de Sancy (1886m), het hoogste punt van het Centraal Massief. Spectaculair uitzicht over de vulkanen.",
    startPunt: [45.5350, 2.8100],
    hoogtepunten: ["Puy de Sancy (1886m)", "Val de Courre", "Panoramisch uitzicht"]
  },
  {
    id: 3,
    name: "Lac Pavin",
    gemeente: "Besse-et-Saint-Anastaise",
    afstand: "3.5 km",
    duur: "1u15",
    hoogteverschil: "120 m",
    moeilijkheid: "makkelijk",
    beschrijving: "Wandeling rondom het mysterieuze kratermeer Lac Pavin, een van de mooiste meren van de Auvergne.",
    startPunt: [45.4960, 2.8890],
    hoogtepunten: ["Lac Pavin", "Vulkanisch landschap", "Bossen"]
  },
  {
    id: 4,
    name: "Vallée de Chaudefour",
    gemeente: "Chambon-sur-Lac",
    afstand: "7.8 km",
    duur: "3u00",
    hoogteverschil: "450 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Ontdek het natuurreservaat Vallée de Chaudefour met zijn indrukwekkende rotsformaties en waterval.",
    startPunt: [45.5490, 2.8550],
    hoogtepunten: ["Vallée de Chaudefour", "Cascade de la Biche", "Crête du Coq", "Dent de la Rancune"]
  },
  {
    id: 5,
    name: "Château de Murol",
    gemeente: "Murol",
    afstand: "4.2 km",
    duur: "1u30",
    hoogteverschil: "180 m",
    moeilijkheid: "makkelijk",
    beschrijving: "Wandeling naar het middeleeuwse kasteel van Murol met prachtig uitzicht over het Lac Chambon.",
    startPunt: [45.5720, 2.9450],
    hoogtepunten: ["Château de Murol", "Uitzicht op Lac Chambon"]
  },
  {
    id: 6,
    name: "Saint-Nectaire en omgeving",
    gemeente: "Saint-Nectaire",
    afstand: "6.3 km",
    duur: "2u00",
    hoogteverschil: "250 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Rondom het beroemde kaasdorp Saint-Nectaire, langs de Romaanse kerk en thermale bronnen.",
    startPunt: [45.5870, 2.9930],
    hoogtepunten: ["Église de Saint-Nectaire", "Thermale bronnen", "Grottes du Cornadore"]
  },
  {
    id: 7,
    name: "Le Vernet-Sainte-Marguerite",
    gemeente: "Le Vernet-Sainte-Marguerite",
    afstand: "5.8 km",
    duur: "2u00",
    hoogteverschil: "210 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Rustige wandeling door het plateau rond Le Vernet-Sainte-Marguerite met wijds uitzicht.",
    startPunt: [45.6050, 2.9200],
    hoogtepunten: ["Plateau landschap", "Uitzicht op de Sancy"]
  },
  {
    id: 8,
    name: "Saint-Victor-la-Rivière",
    gemeente: "Saint-Victor-la-Rivière",
    afstand: "4.5 km",
    duur: "1u30",
    hoogteverschil: "160 m",
    moeilijkheid: "makkelijk",
    beschrijving: "Korte familiewandeling door de glooiende weilanden rond Saint-Victor-la-Rivière.",
    startPunt: [45.5350, 2.9550],
    hoogtepunten: ["Weidelandschap", "Uitzicht op vulkanen"]
  },
  {
    id: 9,
    name: "Super-Besse - Lac des Hermines",
    gemeente: "Super-Besse",
    afstand: "4.0 km",
    duur: "1u15",
    hoogteverschil: "150 m",
    moeilijkheid: "makkelijk",
    beschrijving: "Wandeling rond het Lac des Hermines bij het skistation Super-Besse.",
    startPunt: [45.5070, 2.8510],
    hoogtepunten: ["Lac des Hermines", "Skistation Super-Besse"]
  },
  {
    id: 10,
    name: "La Bourboule - Parc Fenestre",
    gemeente: "La Bourboule",
    afstand: "5.0 km",
    duur: "1u45",
    hoogteverschil: "200 m",
    moeilijkheid: "makkelijk",
    beschrijving: "Aangename wandeling vanuit het thermale kuuroord La Bourboule door het Parc Fenestre.",
    startPunt: [45.5878, 2.7381],
    hoogtepunten: ["Parc Fenestre", "Thermes de La Bourboule", "Dordogne dal"]
  },
  {
    id: 11,
    name: "Murat-le-Quaire",
    gemeente: "Murat-le-Quaire",
    afstand: "6.0 km",
    duur: "2u00",
    hoogteverschil: "280 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Ontdek het authentieke bergdorp Murat-le-Quaire en de omliggende bossen.",
    startPunt: [45.5970, 2.7530],
    hoogtepunten: ["Dorp Murat-le-Quaire", "Bossen", "Berglandschap"]
  },
  {
    id: 12,
    name: "Le Mont-Dore - Salon du Capucin",
    gemeente: "Le Mont-Dore",
    afstand: "6.5 km",
    duur: "2u30",
    hoogteverschil: "380 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Wandeling naar de Grande Cascade en door het bos naar de Salon du Capucin.",
    startPunt: [45.5736, 2.8081],
    hoogtepunten: ["Grande Cascade du Mont-Dore", "Salon du Capucin", "Funiculaire"]
  },
  {
    id: 13,
    name: "Chastreix - Puy de Sancy Zuid",
    gemeente: "Chastreix",
    afstand: "9.0 km",
    duur: "3u30",
    hoogteverschil: "520 m",
    moeilijkheid: "moeilijk",
    beschrijving: "Uitdagende wandeling vanuit Chastreix naar de zuidkant van de Puy de Sancy.",
    startPunt: [45.5160, 2.7310],
    hoogtepunten: ["Zuidhelling Puy de Sancy", "Alpenweiden", "Panorama"]
  },
  {
    id: 14,
    name: "Picherande - Cascade de la Barthe",
    gemeente: "Picherande",
    afstand: "7.0 km",
    duur: "2u30",
    hoogteverschil: "310 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Wandeling door de bossen van Picherande naar de Cascade de la Barthe.",
    startPunt: [45.4670, 2.7760],
    hoogtepunten: ["Cascade de la Barthe", "Bossen van Picherande"]
  },
  {
    id: 15,
    name: "La Godivelle - Lacs",
    gemeente: "La Godivelle",
    afstand: "5.5 km",
    duur: "2u00",
    hoogteverschil: "180 m",
    moeilijkheid: "makkelijk",
    beschrijving: "Ontdek de twee meren van La Godivelle: het Lac d'en Haut en het Lac d'en Bas.",
    startPunt: [45.3890, 2.8860],
    hoogtepunten: ["Lac d'en Haut", "Lac d'en Bas", "Veengebied"]
  },
  {
    id: 16,
    name: "Saint-Pierre-Colamine",
    gemeente: "Saint-Pierre-Colamine",
    afstand: "5.2 km",
    duur: "1u45",
    hoogteverschil: "220 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Wandeling door het vulkanische landschap rond Saint-Pierre-Colamine met de beroemde grottes Jonas.",
    startPunt: [45.5450, 2.9830],
    hoogtepunten: ["Grottes Jonas", "Vulkanisch landschap"]
  },
  {
    id: 17,
    name: "Compains - Plateau du Cézallier",
    gemeente: "Compains",
    afstand: "8.5 km",
    duur: "3u00",
    hoogteverschil: "350 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Wijdse wandeling over het Cézallier plateau met vergezichten over de Auvergne.",
    startPunt: [45.4300, 2.9600],
    hoogtepunten: ["Plateau du Cézallier", "Eglise de Brion", "Weidse vergezichten"]
  },
  {
    id: 18,
    name: "Espinchal",
    gemeente: "Espinchal",
    afstand: "6.0 km",
    duur: "2u00",
    hoogteverschil: "240 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Rondwandeling vanuit het rustige dorp Espinchal door bossen en langs beekjes.",
    startPunt: [45.4150, 2.9350],
    hoogtepunten: ["Dorp Espinchal", "Bossen", "Beekjes"]
  },
  {
    id: 19,
    name: "La Tour-d'Auvergne",
    gemeente: "La Tour-d'Auvergne",
    afstand: "7.2 km",
    duur: "2u30",
    hoogteverschil: "300 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Wandeling rond La Tour-d'Auvergne, het meest centraal gelegen stadje van Frankrijk.",
    startPunt: [45.5310, 2.6940],
    hoogtepunten: ["La Tour-d'Auvergne", "Historisch centrum"]
  },
  {
    id: 20,
    name: "Saint-Genès-Champespe",
    gemeente: "Saint-Genès-Champespe",
    afstand: "6.8 km",
    duur: "2u15",
    hoogteverschil: "260 m",
    moeilijkheid: "gemiddeld",
    beschrijving: "Rustige wandeling door de weilanden en bossen rond Saint-Genès-Champespe.",
    startPunt: [45.4450, 2.7650],
    hoogtepunten: ["Weilanden", "Bossen", "Rustiek landschap"]
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
  { name: "La Tour-d'Auvergne", coords: [45.5310, 2.6940], voorzieningen: ["camping", "gite", "piscine"] },
  { name: "Saint-Genès-Champespe", coords: [45.4450, 2.7650], voorzieningen: ["gite"] },
  { name: "Valbeleix", coords: [45.4540, 2.9750], voorzieningen: [] }
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
  thermes: { label: "Thermen", icon: "🏛️" },
  camping: { label: "Camping", icon: "⛺" },
  gite: { label: "Gîte d'étape", icon: "🏠" },
  piscine: { label: "Zwembad", icon: "🏊" },
  equitation: { label: "Paardrijden", icon: "🐴" },
  escalade: { label: "Klimmen", icon: "🧗" },
  tennis: { label: "Tennis", icon: "🎾" },
  accrobranche: { label: "Klimbos", icon: "🌳" }
};
