// Single source of truth for cafe content.
// Items marked PLACEHOLDER are not confirmed by the cafe: replace before launch.

export const site = {
  name: "Dwena's Cafe",
  tagline: "Your serene spot in Sto. Tomas, Batangas to relax, recharge, and enjoy the beauty of sunsets and fresh flavors surrounded by nature.",
  city: "Sto. Tomas, Batangas",
  coords: { lat: 14.1240249, lng: 121.165123 },
  instagram: "https://www.instagram.com/dwenascafe",
  facebook: "https://www.facebook.com/profile.php?id=61557354488019",
  threads: "https://www.threads.com/@dwenascafe",
  mapsUrl:
    "https://www.google.com/maps/place/Dwenas+Cafe/@14.1240301,121.1625481,17z/data=!4m6!3m5!1s0x33bd65cf0212ce53:0x264d5525fcdc602b!8m2!3d14.1240249!4d121.165123",
  tiktok: "https://www.tiktok.com/@dwenas.cafe",
  address: "Purok 7, Dwenas Cafe, San Antonio, Sto. Tomas, Batangas 4234",
  phone: "0945 827 2516",
  reservations: "0908 940 3491",
  email: "dwenascafe26@gmail.com",
  services: ["Dine-in", "Outdoor seating", "Event center"],
  events: ["Weddings", "Debuts", "Birthdays", "Christenings", "Company events"],
  // From the cafe's "We are open today" post. Hours may change with the weather.
  openHour: 10, // 10 AM
  closeHour: 24, // 12 midnight
  hoursLabel: "10 AM until 12 midnight, daily",
  hoursNote: "Hours may change due to weather. Follow our Facebook and Instagram for announcements.",
};


export type Happening = {
  id: string;
  title: string;
  blurb: string;
  dateLabel: string;
  timeLabel: string;
  start: string; // ISO with +08:00 (Manila)
  end: string;
  perks: string[];
  how: string[];
  note: string;
  joinMessage: string;
};

// Add new events at the top. Events disappear from "coming up" automatically after `end`.
export const happenings: Happening[] = [
  {
    id: "halloween-2026",
    title: "Spooktacular Halloween at Dwena's Cafe",
    blurb: "Get your little monsters ready! Come in your cutest, spookiest or most creative costume.",
    dateLabel: "October 31, 2026",
    timeLabel: "5:30 PM to 7:00 PM",
    start: "2026-10-31T17:30:00+08:00",
    end: "2026-10-31T19:00:00+08:00",
    perks: ["Trick-or-treat", "Loot bag", "Best in costume", "Photo booth"],
    how: [
      "Spend ₱1,000 or more on selected food and drinks from October 16 to 30.",
      "Pay the ₱100 registration fee.",
      "Register and get your official coupon.",
    ],
    note: "First 100 kids only.",
    joinMessage: "Hi Dwena's Cafe! I'd like to register my child for the Spooktacular Halloween on October 31, 2026. How do I get the coupon?",
  },
];

// PLACEHOLDER reviews: replace with real Google/Facebook reviews.
export const reviews = [
  { quote: "Replace with a real customer review from Google Maps.", who: "Customer name" },
  { quote: "Replace with a real customer review from Facebook.", who: "Customer name" },
  { quote: "Replace with a real customer review.", who: "Customer name" },
];

export type Price = { label?: string; value: number };
export type MenuItem = { name: string; note?: string; prices: Price[]; featured?: boolean };

const one = (value: number): Price[] => [{ value }];

// Source: Dwena's soft opening menu. Prices in pesos.
export const menu: Record<string, Record<string, MenuItem[]>> = {
  Food: {
    Pasta: [
      { name: "Bacon and Mushroom Carbonara", prices: one(185), featured: true },
      { name: "Tuna Pasta", prices: one(185) },
      { name: "Aglio Olio", prices: one(165) },
      { name: "Spicy Longganisa", prices: one(175), featured: true },
    ],
    Burgers: [
      { name: "Dwena's Burger", prices: one(160), featured: true },
      { name: "Dwena's Burger with Cheese", prices: one(180) },
      { name: "Dwena's Burger with Bacon and Cheese", prices: one(195), featured: true },
    ],
    Sandwiches: [
      { name: "Clubhouse Sandwich", prices: one(155), featured: true },
      { name: "Ham and Egg Sandwich", prices: one(155) },
      { name: "Bacon & Ham Sandwich", prices: one(145) },
    ],
    Pulutan: [
      { name: "Dwena's Sizzling Pork Sisig", prices: one(220), featured: true },
      { name: "Crispy Pata", prices: one(700), featured: true },
      { name: "Chicken Wings", prices: one(390), featured: true },
      { name: "French Fries", prices: one(100) },
    ],
  },
  Drinks: {
    Coffee: [
      { name: "Salted Caramel", prices: [{ label: "Hot", value: 150 }, { label: "Cold", value: 165 }], featured: true },
      { name: "Choco Mocha", prices: [{ label: "Hot", value: 150 }, { label: "Cold", value: 165 }], featured: true },
      { name: "White Mocha", prices: [{ label: "Hot", value: 150 }, { label: "Cold", value: 170 }], featured: true },
    ],
    "Soda and water": [
      {
        name: "Flavored Fruity Soda",
        note: "Flavors: Lychee, Blueberry, Strawberry, Lemon, Green Apple.",
        prices: [{ label: "Small", value: 55 }, { label: "Large", value: 80 }],
        featured: true,
      },
      { name: "Softdrinks in Can", prices: one(80) },
      { name: "Softdrinks (1.5)", prices: one(130) },
      { name: "Pineapple in Can", prices: one(130) },
      { name: "Bottled Water", prices: one(40) },
    ],
  },
};
