import iphone16Image from "../assets/Apple16e.png";
import samsungs25Image from "../assets/SamsungS25.png";
import playstation5Image from "../assets/Playstation5.png";
import droneImage from "../assets/Djidrones.png";
import macMiniImage from "../assets/MacMini.png";
import washingMachineImage from "../assets/WashingMachine.png";
import noiseImage from "../assets/Noise.png";
import rubyOrganicsImage from "../assets/RubyOrganics.png";
import mkWatch from "../assets/MichaelWatch.jpg";

export const products = [
  {
    id: 1,
    name: "Apple iPhone 16e",
    price: 59999,
    rating: { rate: 4.5, count: 120 },
    description:
      "The Apple iPhone 16e is the latest model in the iPhone series, featuring advanced camera technology and AI capabilities. " +
      "With a sleek design and powerful performance, this phone is perfect for capturing stunning photos and videos. " +
      "It comes with a 6.1-inch Super Retina XDR display, A15 Bionic chip, and 5G connectivity. " +
      "The iPhone 16e also includes enhanced Face ID, improved battery life, and iOS 15 for an unparalleled user experience.",
    description2:
      "6.1-inch Super Retina XDR display, A15 Bionic chip, 5G connectivity, Enhanced Face ID, Improved battery life, iOS 15",
    image: iphone16Image,
  },
  {
    id: 2,
    name: "PlayStation 5",
    price: 48000,
    rating: { rate: 4.1, count: 3000 },
    description:
      "The PlayStation 5 is a next-generation gaming console that offers an immersive gaming experience with 4K graphics and fast loading times. " +
      "It features a custom SSD for ultra-high-speed data processing, a powerful GPU for stunning visuals, and a new controller with haptic feedback and adaptive triggers. " +
      "With a vast library of exclusive games and backward compatibility with PS4 titles, the PS5 is the ultimate gaming machine.",
    description2:
      "4K graphics, Fast loading times, Custom SSD, Powerful GPU, Haptic feedback, Adaptive triggers, Backward compatibility with PS4 titles",
    image: playstation5Image,
  },
  {
    id: 3,
    name: "DJI Mini 4 Pro Drone",
    price: 104000,
    rating: { rate: 3.5, count: 15 },
    description:
      "The DJI Mini 4 Pro Drone is a portable and powerful drone designed for aerial photography and videography. " +
      "It features a 4K camera with a 3-axis gimbal for stable and high-quality footage, intelligent flight modes for creative shots, and a compact design for easy portability. " +
      "With up to 31 minutes of flight time and advanced safety features, the DJI Mini 4 Pro is perfect for capturing stunning aerial views.",
    description2:
      "4K camera, 3-axis gimbal, Intelligent flight modes, Compact design, 31 minutes flight time, Advanced safety features",
    image: droneImage,
  },
  {
    id: 4,
    name: "Mac M4 Mini",
    price: 59000,
    rating: { rate: 4.8, count: 110 },
    description:
      "The Mac M4 Mini is a compact and powerful desktop computer designed for creative professionals. " +
      "It features the latest M4 chip for exceptional performance, a sleek and compact design that fits any workspace, and a range of connectivity options for seamless integration with other devices. " +
      "With support for high-resolution displays and advanced graphics capabilities, the Mac M4 Mini is perfect for video editing, graphic design, and more.",
    description2:
      "M4 chip, Compact design, Connectivity options, High-resolution display support, Advanced graphics capabilities",
    image: macMiniImage,
  },
  {
    id: 5,
    name: "Samsung Galaxy S25",
    price: 141000,
    rating: { rate: 5, count: 105 },
    description:
      "The Samsung Galaxy S25 is a flagship smartphone that offers advanced AI, camera, and display features. " +
      "It features a stunning 6.8-inch Dynamic AMOLED display with a 120Hz refresh rate, a powerful Exynos 990 processor, and a versatile quad-camera system for capturing high-quality photos and videos. " +
      "With 5G connectivity, a large battery, and a sleek design, the Galaxy S25 is the ultimate smartphone for power users.",
    description2:
      "6.8-inch Dynamic AMOLED display, 120Hz refresh rate, Exynos 990 processor, Quad-camera system, 5G connectivity, Large battery",
    image: samsungs25Image,
  },
  {
    id: 6,
    name: "LG Front Load Washing Machine",
    price: 38900,
    rating: { rate: 3.5, count: 165 },
    description:
      "The LG Front Load Washing Machine is an energy-efficient washing machine with advanced cleaning technology. " +
      "It features a large capacity drum for handling big loads, multiple wash programs for different fabrics, and a powerful motor for thorough cleaning. " +
      "With smart features like Wi-Fi connectivity and remote control, the LG Front Load Washing Machine makes laundry day easier and more convenient.",
    description2:
      "Energy-efficient, Large capacity drum, Multiple wash programs, Powerful motor, Wi-Fi connectivity, Remote control",
    image: washingMachineImage,
  },
  {
    id: 7,
    name: "Ruby organics Foundation",
    price: 1399,
    rating: { rate: 4.5, count: 164 },
    description:
      "A natural formula that gives an even glow, all while keeping your skin nourished and super healthy. Think real skin, but better!",
    description2: "Buildable , Breathable Coverage, Vegan , Matte-finish",
    image: rubyOrganicsImage,
  },
];

export const upcomingProductsList = [
  {
    id: "upcoming-1",
    name: "Quantum VR Headset",
    expectedPrice: 350000,
    description:
      "Revolutionary virtual reality headset with 8K resolution per eye and neural feedback.",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&auto=format&fit=crop&q=60",
    launchDate: "2026-06-15",
  },
  {
    id: "upcoming-2",
    name: "EcoTech Smart Home Hub",
    expectedPrice: 15999,
    description:
      "AI-powered home automation system with advanced energy management.",
    image:
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&auto=format&fit=crop&q=60",
    launchDate: "2026-07-01",
  },
  {
    id: "upcoming-3",
    name: "Ruby organics Foundation",
    expectedPrice: 1399,
    description:
      "A natural formula that gives an even glow, all while keeping your skin nourished and super healthy. Think real skin, but better!",
    image: rubyOrganicsImage,
    launchDate: "2026-08-20",
  },
  {
    id: "upcoming-4",
    name: "Michael Kors watch",
    expectedPrice: 23999,
    description: "Women Chronograph Dusty Pink Stone-Studded Dial Watch 5896I",
    image: mkWatch,
    launchDate: "2026-03-17",
  },
];

export const trendingProducts = [
  {
    id: 1,
    name: "Samsung Galaxy S25",
    price: 141000,
    description:
      "The Samsung Galaxy S25 is a flagship smartphone that offers advanced AI, camera, and display features.",
    image: samsungs25Image,
    description2:
      "6.8-inch Dynamic AMOLED display, 120Hz refresh rate, Exynos 990 processor, Quad-camera system, 5G connectivity, Large battery",
    rating: { rate: 4.8, count: 110 },
    trending: {
      rank: 1,
      salesIncrease: "156%",
      reviews: 1289,
    },
  },
  {
    id: 2,
    name: "Noise Master Earbuds",
    price: 159.99,
    rating: { rate: 4.8, count: 110 },
    description:
      "Noise Master Buds, Sound by Bose in-Ear Bluetooth Earbuds, Up to 49dB Adaptive ANC, LHDC 5.0",
    description2: "Sound by Bose, Up to 49dB Adaptive ANC, LHDC 5.0",
    image: noiseImage,
    trending: {
      rank: 2,
      salesIncrease: "142%",
      reviews: 2156,
    },
  },
  {
    id: 3,
    rating: { rate: 4.8, count: 110 },
    name: "Smart Coffee Maker",
    price: 199.99,
    description: "WiFi-enabled coffee maker with smartphone control",
    description2: "WiFi-enabled, Smartphone control, 12-cup capacity",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=60",
    trending: {
      rank: 3,
      salesIncrease: "128%",
      reviews: 867,
    },
  },
];
