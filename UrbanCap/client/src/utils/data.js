export const EVENTS_DATA = [
  {
    label: "Mini Golf Round Robin",
    image: "./assets/images/mini-golf.jpg",
    value: "mini-golf",
  },
  {
    label: "Video Games Round Robin",
    image: "./assets/images/video-games.jpg",
    value: "video-games",
  },
  {
    label: "Indoor Rock Climbing",
    image: "./assets/images/indoor-rock-climbing.jpg",
    value: "rock-climbing",
  },
  {
    label: "Team Building",
    image: "./assets/images/team-building.jpg",
    value: "team-building",
  },
];

export const EVENTS_OBJ = {
  "mini-golf": {
    label: "Mini Golf Round Robin",
    image: "./assets/images/mini-golf.jpg",
    value: "mini-golf",
    description:
      "Miniature golf is a wonderful game for both golf purists looking to sharpen their short game, and hobbyists looking to have a fun and have an enjoyable experience. Our portable mini golf course rental can be the focus of your event. This set up is perfect for corporate picnics as well as indoor or outdoor team building events. We will deliver and assemble up to 9 holes complete with all the accessories needed to turn your space into a beautiful and entertaining mini golf course.",
    points: [
      "Up to 9 Unique Miniature Golf Holes",
      "Hole Markers",
      "4 Putters Per Hole",
      "Score Cards and Pencils",
    ],
  },
  "video-games": {
    label: "Video Games Round Robin",
    image: "./assets/images/video-games.jpg",
    value: "video-games",
    description:
      "Admit it, when you were a kid you used to spend hours playing all sorts of video games. Bring all your favorites to work and set up a video game tournament. Have the sales department play against the warehouse or Human Resources against upper management. Team building may never be the same!",
  },
  "rock-climbing": {
    label: "Indoor Rock Climbing",
    image: "./assets/images/indoor-rock-climbing.jpg",
    value: "rock-climbing",
    description:
      "Rock Climbing is an exciting and innovative team–building exercise to test your team members' limits and encourage teamwork, communication and trust in a fun and engaging way. There are several different ways to present this competition. It can be based on speed or blindfolded or a form of a relay race. Teams can decide amongst themselves which competition they wish to enter based on their skill levels. To make this team building event even more fun there could be a prize for the best team.",
  },
  "team-building": {
    label: "Team Building",
    image: "./assets/images/team-building.jpg",
    value: "team-building",
    description:
      "Team building is essential for fostering a positive and productive environment, where collaboration, trust, and shared goals drive success. By bringing individuals together, team building strengthens communication, enhances problem-solving skills, and builds resilience, allowing teams to leverage their diverse strengths. It creates a space for members to feel valued and connected, boosting morale and empowering everyone to contribute their best. A cohesive team is more adaptable, innovative, and equipped to tackle challenges, turning individual efforts into collective achievements.",
  },
};



export const PRODUCTS = [
  {
    label: "Smallest",
    price: "3",
    products: [
      "Chandelier",
      "Commode",
      "Chair",
      "Coffee table",
      "Store Curtain",
      "Table Hanging",
    ],
    key: "smallest",
  },
  {
    label: "Large",
    price: "12",
    products: [
      "Multi-door wardrobe",
      "Wall TV Unit",
      "Bedstead",
      "Seat set",
      "Bunk",
      "TV Unit",
    ],
    key: "large",
  },
  {
    label: "Medium",
    price: "9",
    products: [
      "Buffet/Pattern",
      "Console",
      "Table",
      "Portmanto",
      "Single door wardrobe",
      "Television coffee table",
    ],
    key: "medium",
  },
  {
    label: "Small",
    price: "5",
    products: [
      "Footwear",
      "Bergerer",
      "Bathroom cabinet",
      "Wall shelf",
      "Bookcase",
      "Chiffonier ",
    ],
    key: "small",
  },
];

export const CITIES = {
  alberta: [
    { value: "calgary", label: "Calgary" },
    { value: "edmonton", label: "Edmonton" },
    { value: "red_deer", label: "Red Deer" },
    { value: "lethbridge", label: "Lethbridge" },
    { value: "st_albert", label: "St. Albert" },
  ],
  british_columbia: [
    { value: "vancouver", label: "Vancouver" },
    { value: "victoria", label: "Victoria" },
    { value: "surrey", label: "Surrey" },
    { value: "burnaby", label: "Burnaby" },
    { value: "richmond", label: "Richmond" },
  ],
  manitoba: [
    { value: "winnipeg", label: "Winnipeg" },
    { value: "brandon", label: "Brandon" },
    { value: "steinbach", label: "Steinbach" },
    { value: "thompson", label: "Thompson" },
    { value: "portage_la_prairie", label: "Portage la Prairie" },
  ],
  ontario: [
    { value: "toronto", label: "Toronto" },
    { value: "ottawa", label: "Ottawa" },
    { value: "mississauga", label: "Mississauga" },
    { value: "brampton", label: "Brampton" },
    { value: "hamilton", label: "Hamilton" },
  ],
  quebec: [
    { value: "montreal", label: "Montreal" },
    { value: "quebec_city", label: "Quebec City" },
    { value: "laval", label: "Laval" },
    { value: "gatineau", label: "Gatineau" },
    { value: "longueuil", label: "Longueuil" },
  ],
  nova_scotia: [
    { value: "halifax", label: "Halifax" },
    { value: "sydney", label: "Sydney" },
    { value: "dartmouth", label: "Dartmouth" },
    { value: "truro", label: "Truro" },
    { value: "new_glasgow", label: "New Glasgow" },
  ],
  new_brunswick: [
    { value: "fredericton", label: "Fredericton" },
    { value: "moncton", label: "Moncton" },
    { value: "saint_john", label: "Saint John" },
    { value: "miramichi", label: "Miramichi" },
    { value: "bathurst", label: "Bathurst" },
  ],
  newfoundland_and_labrador: [
    { value: "st_johns", label: "St. John's" },
    { value: "mount_pearl", label: "Mount Pearl" },
    { value: "corner_brook", label: "Corner Brook" },
    { value: "gander", label: "Gander" },
    { value: "happy_valley_goose_bay", label: "Happy Valley-Goose Bay" },
  ],
  saskatchewan: [
    { value: "saskatoon", label: "Saskatoon" },
    { value: "regina", label: "Regina" },
    { value: "prince_albert", label: "Prince Albert" },
    { value: "moose_jaw", label: "Moose Jaw" },
    { value: "swift_current", label: "Swift Current" },
  ],
};

export const PROVINCES = [
  { value: "alberta", label: "Alberta" },
  { value: "british_columbia", label: "British Columbia" },
  { value: "manitoba", label: "Manitoba" },
  { value: "new_brunswick", label: "New Brunswick" },
  { value: "newfoundland_and_labrador", label: "Newfoundland and Labrador" },
  { value: "nova_scotia", label: "Nova Scotia" },
  { value: "ontario", label: "Ontario" },
  { value: "prince_edward_island", label: "Prince Edward Island" },
  { value: "quebec", label: "Quebec" },
  { value: "saskatchewan", label: "Saskatchewan" },
  { value: "northwest_territories", label: "Northwest Territories" },
  { value: "nunavut", label: "Nunavut" },
  { value: "yukon", label: "Yukon" },
];

export const CURRENCY_VALUE = {
  USD: 1,
  CAD: 1.35,
};