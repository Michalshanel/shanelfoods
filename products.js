/* ==========================================================
   Shanel Foods — product list
   To add, remove or change a product, edit this list only.
   Every page (Home, Menu, Contact) reads from here.

   category: breakfast | dinner | bowls | care
   type:     veg | egg | nonveg
   optional: badge (label on photo), rotation (daily rotating dishes),
             enquiry (custom WhatsApp message)
   image:    put the photo in the images/ folder (square works best)
   ========================================================== */

const WHATSAPP_NUMBER = '919092211147';

const CATEGORIES = {
  breakfast: 'Breakfast Boxes',
  dinner: 'Dinner',
  bowls: 'Salads & Bowls',
  care: 'Special Care'
};

const PRODUCTS = [
  {
    id: 'basic-box',
    name: 'Basic Box',
    category: 'breakfast',
    type: 'veg',
    image: 'images/basic-box.webp',
    tagline: 'Light, fresh & perfectly balanced',
    description: 'Our everyday favourite — a colourful mix of seasonal fruits, crunchy veggies and protein-rich sprouts to start your morning right.',
    contents: ['Seasonal fruit mix', 'Watermelon', 'Cucumber', 'Boiled peanuts', 'Sprouted green gram'],
    featured: true
  },
  {
    id: 'protein-box',
    name: 'Protein Box',
    category: 'breakfast',
    type: 'egg',
    image: 'images/protein-box.webp',
    tagline: 'High-protein fuel for active days',
    description: 'Packed with eggs, sprouts and nuts alongside a premium fruit mix — ideal for gym-goers and busy professionals.',
    contents: ['Dragon fruit, pineapple, grapes & pomegranate', 'Watermelon', '2 boiled eggs', 'Sprouted green gram', 'Nuts & raisins', 'Carrot & cucumber'],
    featured: true
  },
  {
    id: 'chicken-box',
    name: 'Chicken Box',
    category: 'breakfast',
    type: 'nonveg',
    image: 'images/chicken-box.webp',
    tagline: 'Lean protein, grilled fresh',
    description: 'Juicy grilled chicken breast with eggs, sprouts, nuts and steamed veggies — a complete high-protein meal.',
    contents: ['Grilled chicken breast (130g)', '2 boiled eggs', 'Fresh sprouts', 'Nuts & raisins', 'Broccoli & carrot', 'Grapes'],
    featured: true
  },
  {
    id: 'dinner-meal-pack',
    name: 'Dinner Meal Pack',
    category: 'dinner',
    type: 'veg',
    image: 'images/dinner-meal-pack.webp',
    badge: 'Menu changes daily',
    tagline: 'A new healthy dinner every day',
    description: 'A wholesome, home-style dinner with a daily rotating menu — one day chapati, the next kambu idli, millet dosa or millet noodles. Light, filling and never boring.',
    rotation: ['Chapati', 'Kambu idli', 'Millet dosa', 'Millet noodles', '…and more'],
    contents: ['Main of the day', 'Side dish / curry', 'Raita', 'Fresh fruits'],
    enquiry: "Hi Shanel Foods! I'd like to enquire about the Dinner Meal Pack. What's on the menu today?",
    featured: true
  },
  {
    id: 'overnight-oats',
    name: 'Overnight Oats',
    category: 'bowls',
    type: 'veg',
    image: 'images/overnight-oats.webp',
    tagline: 'Creamy, no-cook goodness',
    description: 'Oats soaked overnight with chia seeds and topped with fresh fruit, nuts and seeds. Ready to eat, straight from the box.',
    contents: ['Rolled oats soaked overnight', 'Chia seeds', 'Banana, strawberry & pomegranate', 'Almonds & cashews', 'Pumpkin & sunflower seeds'],
    featured: true
  },
  {
    id: 'chicken-salad',
    name: 'Chicken Salad',
    category: 'bowls',
    type: 'nonveg',
    image: 'images/chicken-salad.webp',
    tagline: 'Spiced, protein-packed & fresh',
    description: 'Tender spiced chicken over chickpeas and beans with onion, fresh coriander, a boiled egg and creamy dressing on the side.',
    contents: ['Spiced grilled chicken', 'Chickpeas & kidney beans', 'Onion & coriander', 'Boiled egg', 'Creamy dressing (on the side)'],
    featured: true
  },
  {
    id: 'veg-salad',
    name: 'Veg Salad',
    category: 'bowls',
    type: 'veg',
    image: 'images/veg-salad.webp',
    tagline: 'Pasta salad with a fresh twist',
    description: 'Penne pasta tossed with sweet corn, tomato, onion and beans, served with a herby creamy dressing.',
    contents: ['Penne pasta', 'Sweet corn', 'Tomato & onion', 'Beans', 'Herb dressing (on the side)'],
    featured: true
  },
  {
    id: 'skin-glow-box',
    name: 'Skin Glow Box',
    category: 'care',
    type: 'veg',
    image: 'images/skin-glow-box.webp',
    tagline: 'Antioxidant-rich picks for your skin',
    description: 'Beetroot, pomegranate, orange and cucumber with nuts, seeds and chickpeas — nourishment that shows.',
    contents: ['Beetroot', 'Pomegranate', 'Orange', 'Cucumber', 'Nuts & seeds', 'Chickpeas'],
    featured: true
  },
  {
    id: 'kids-box',
    name: 'Kids Box',
    category: 'care',
    type: 'egg',
    image: 'images/kids-box.webp',
    tagline: 'Fun, colourful bites for little ones',
    description: 'A balanced, kid-friendly box with sweet fruits, crunchy veggie sticks, an egg and sprouts.',
    contents: ['Kid-friendly fruits', 'Crunchy veggie sticks', '1 boiled egg', 'Nuts & seeds', 'Fresh sprouts']
  },
  {
    id: 'diabetic-box',
    name: 'Diabetic Box',
    category: 'care',
    type: 'veg',
    image: 'images/diabetic-box.webp',
    tagline: 'Low-GI, sugar-conscious choices',
    description: 'Carefully chosen low-sugar fruits with fresh veggies and sprouts for a steady, sugar-conscious start.',
    contents: ['Low-GI fruits (berries & apple)', 'Broccoli', 'Cucumber', 'Fresh sprouts']
  },
  {
    id: 'pregnancy-box',
    name: 'Pregnancy Box',
    category: 'care',
    type: 'egg',
    image: 'images/pregnancy-box.webp',
    tagline: 'Gentle nourishment for expecting mothers',
    description: 'A nourishing box with fruits, boiled veggies, an egg, nuts and sprouts — made with care for mums-to-be.',
    contents: ['2 types of fruits', '2 boiled veggies', '1 boiled egg', 'Nuts & seeds', 'Fresh sprouts']
  }
];
