const dessert = [
  {
    title: "Tarte aux fraises",
    img: "https://images.unsplash.com/photo-1503485838016-53579610c389?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VGFydGUlMjBhdXglMjBmcmFpc2VzfGVufDB8fDB8fHww",
    description: "Une délicieuse tarte aux fraises fraîches sur une croûte de pâte sablée croustillante, garnie d'une crème pâtissière légère.",
    ingredients: [
      { name: "Pâte sablée", quantity: 1, unit: "" },
      { name: "Fraises fraîches", quantity: "500", unit: "g" },
      { name: "Crème pâtissière", quantity: "500", unit: "ml" },
      { name: "Sucre glace", quantity: "quantité suffisante", unit: "" },
      { name: "Gélatine en feuilles", quantity: 2, unit: "" },
      { name: "Eau", quantity: "50", unit: "ml" }
    ],
    duration: 60,
    category: {
      _id: "65e1efbbfedc453e7a594df3",
      name: "Dessert",
      createdAt: "2024-03-01T15:09:47.977Z",
      updatedAt: "2024-03-01T15:09:47.977Z",
      __v: 0
    }
  },
  {
    title: "Mousse au chocolat",
    img: "https://images.unsplash.com/photo-1504388192519-fb4be897c4d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fE1vdXNzZSUyMGF1JTIwY2hvY29sYXR8ZW58MHx8MHx8fDA%3D",
    description: "Une mousse au chocolat légère et aérienne, préparée avec du chocolat noir de qualité, des œufs frais et un soupçon de sucre.",
    ingredients: [
      { name: "Chocolat noir", quantity: "200", unit: "g" },
      { name: "Œufs", quantity: 4, unit: "" },
      { name: "Sucre en poudre", quantity: "50", unit: "g" },
      { name: "Sel", quantity: "une pincée", unit: "" }
    ],
    duration: 120,
    category: {
      _id: "65e1efbbfedc453e7a594df3",
      name: "Dessert",
      createdAt: "2024-03-01T15:09:47.977Z",
      updatedAt: "2024-03-01T15:09:47.977Z",
      __v: 0
    }
  },
  {
    title: "Crème brûlée",
    img: "https://images.unsplash.com/photo-1615235739538-95040f341ba8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q3IlQzMlQThtZSUyMGJyJUMzJUJCbCVDMyVBOWV8ZW58MHx8MHx8fDA%3D",
    description: "Une crème brûlée onctueuse et parfumée à la vanille, recouverte d'une fine couche de sucre caramélisé.",
    ingredients: [
      { name: "Crème liquide", quantity: "250", unit: "ml" },
      { name: "Lait", quantity: "250", unit: "ml" },
      { name: "Jaunes d'œufs", quantity: 4, unit: "" },
      { name: "Sucre en poudre", quantity: "100", unit: "g" },
      { name: "Gousse de vanille", quantity: 1, unit: "" },
      { name: "Sucre cassonade", quantity: "quantité suffisante", unit: "" }
    ],
    duration: 90,
    category: {
      _id: "65e1efbbfedc453e7a594df3",
      name: "Dessert",
      createdAt: "2024-03-01T15:09:47.977Z",
      updatedAt: "2024-03-01T15:09:47.977Z",
      __v: 0
    }
  },
  {
    title: "Tiramisu",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGlyYW1pc3V8ZW58MHx8MHx8fDA%3D",
    description: "Un dessert italien classique, composé de couches de biscuits imbibés de café, de mascarpone crémeux et saupoudré de cacao en poudre.",
    ingredients: [
      { name: "Biscuits à la cuillère", quantity: "200", unit: "g" },
      { name: "Café fort", quantity: "100", unit: "ml" },
      { name: "Mascarpone", quantity: "250", unit: "g" },
      { name: "Sucre en poudre", quantity: "50", unit: "g" },
      { name: "Œufs", quantity: 2, unit: "" },
      { name: "Cacao en poudre", quantity: "quantité suffisante", unit: "" }
    ],
    duration: 45,
    category: {
      _id: "65e1efbbfedc453e7a594df3",
      name: "Dessert",
      createdAt: "2024-03-01T15:09:47.977Z",
      updatedAt: "2024-03-01T15:09:47.977Z",
      __v: 0
    }
  },
  {
    title: "Panna cotta",
    img: "https://images.unsplash.com/photo-1542116021-0ff087fb0a41?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UGFubmElMjBjb3R0YXxlbnwwfHwwfHx8MA%3D%3D",
    description: "Un dessert italien crémeux et onctueux, parfumé à la vanille et servi avec un coulis de fruits rouges.",
    ingredients: [
      { name: "Crème liquide", quantity: "500", unit: "ml" },
      { name: "Sucre en poudre", quantity: "100", unit: "g" },
      { name: "Gélatine en feuilles", quantity: 3, unit: "" },
      { name: "Vanille", quantity: 1, unit: "gousse" },
      { name: "Fruits rouges (frais ou surgelés)", quantity: "quantité suffisante", unit: "" }
    ],
    duration: 240,
    category: {
      _id: "65e1efbbfedc453e7a594df3",
      name: "Dessert",
      createdAt: "2024-03-01T15:09:47.977Z",
      updatedAt: "2024-03-01T15:09:47.977Z",
      __v: 0
    }
  },
  {
    title: "Gâteau au chocolat fondant",
    img: "https://images.unsplash.com/photo-1695649912701-e8431668040f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RyVDMyVBMnRlYXUlMjBhdSUyMGNob2NvbGF0JTIwZm9uZGFudHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Un gâteau au chocolat dense et moelleux, avec un cœur fondant, servi chaud avec une boule de glace à la vanille.",
    ingredients: [
      { name: "Chocolat noir", quantity: "200", unit: "g" },
      { name: "Beurre", quantity: "150", unit: "g" },
      { name: "Sucre en poudre", quantity: "150", unit: "g" },
      { name: "Œufs", quantity: 4, unit: "" },
      { name: "Farine", quantity: "50", unit: "g" },
      { name: "Sel", quantity: "une pincée", unit: "" },
      { name: "Glace à la vanille", quantity: "quantité suffisante", unit: "" }
    ],
    duration: 40,
    category: {
      _id: "65e1efbbfedc453e7a594df3",
      name: "Dessert",
      createdAt: "2024-03-01T15:09:47.977Z",
      updatedAt: "2024-03-01T15:09:47.977Z",
      __v: 0
    }
  }

];

module.exports = dessert;
