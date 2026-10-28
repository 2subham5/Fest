const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { Category } = require("./db/db");

const data = [
  {
    "categoryName": "Sports",
    "subcategories": [
      { "name": "Volleyball (Boys)", "isPaid": true, "paymentAmount": 1600, "gender": "male", "unit": "per team", "team": true },
      { "name": "Volleyball (Girls)", "isPaid": true, "paymentAmount": 800, "gender": "female", "unit": "per team", "team": true },
      { "name": "Cricket", "isPaid": true, "paymentAmount": 2000, "gender": "male", "unit": "per team", "team": true },
      { "name": "Football (Boys)", "isPaid": true, "paymentAmount": 2200, "gender": "male", "unit": "per team", "team": true },
      { "name": "Football (Girls)", "isPaid": true, "paymentAmount": 1500, "gender": "female", "unit": "per team", "team": true },
      { "name": "Basketball (Boys)", "isPaid": true, "paymentAmount": 1200, "gender": "male", "unit": "per team", "team": true },
      { "name": "Basketball (Girls)", "isPaid": true, "paymentAmount": 900, "gender": "female", "unit": "per team", "team": true },
      { "name": "Sprint Race (100m, 200m, 400m)", "isPaid": true, "paymentAmount": 199, "gender": "both", "unit": "per person", "team": false },
      { "name": "Relay Race", "isPaid": true, "paymentAmount": 400, "gender": "both", "unit": "per team", "team": true },
      { "name": "Long Jump", "isPaid": true, "paymentAmount": 99, "gender": "both", "unit": "per person", "team": false },
      { "name": "High Jump", "isPaid": true, "paymentAmount": 99, "gender": "both", "unit": "per person", "team": false },
      { "name": "Shot Put", "isPaid": true, "paymentAmount": 99, "gender": "both", "unit": "per person", "team": false },
      { "name": "Discus Throw", "isPaid": true, "paymentAmount": 99, "gender": "both", "unit": "per person", "team": false },
      { "name": "Chess", "isPaid": true, "paymentAmount": 149, "gender": "both", "unit": "per person", "team": false },
      { "name": "Table Tennis (Singles)", "isPaid": true, "paymentAmount": 99, "gender": "both", "unit": "per person", "team": false },
      { "name": "Table Tennis (Doubles)", "isPaid": true, "paymentAmount": 149, "gender": "both", "unit": "per team", "team": true },
      { "name": "Kho Kho", "isPaid": true, "paymentAmount": 799, "gender": "both", "unit": "per team", "team": true },
      { "name": "Badminton (Singles)", "isPaid": true, "paymentAmount": 199, "gender": "both", "unit": "per person", "team": false },
      { "name": "Badminton (Doubles)", "isPaid": true, "paymentAmount": 399, "gender": "both", "unit": "per team", "team": true },
      { "name": "Throw Ball", "isPaid": true, "paymentAmount": 799, "gender": "both", "unit": "per team", "team": true },
      { "name": "Kabaddi", "isPaid": true, "paymentAmount": 1800, "gender": "male", "unit": "per team", "team": true },
      { "name": "Carrom", "isPaid": true, "paymentAmount": 99, "gender": "both", "unit": "per person", "team": false },
      { "name": "Lawn Tennis (Singles)", "isPaid": true, "paymentAmount": 499, "gender": "both", "unit": "per person", "team": false },
      { "name": "Lawn Tennis (Doubles)", "isPaid": true, "paymentAmount": 499, "gender": "both", "unit": "per team", "team": true },
      { "name": "Arm Wrestling", "isPaid": true, "paymentAmount": 99, "gender": "both", "unit": "per person", "team": false }
    ]
  },
  {
    "categoryName": "InformalEvent",
    "subcategories": [
      {
        "name": "Beg Borrow Steal",
        "isPaid": true,
        "paymentAmount": 200,
        "unit": "per team",
        "team": true
      },
      {
        "name": "Last to Leave",
        "isPaid": true,
        "paymentAmount": 50,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Paper Fold",
        "isPaid": true,
        "paymentAmount": 60,
        "unit": "per team",
        "team": true
      },
      {
        "name": "Pepsi Pong",
        "isPaid": true,
        "paymentAmount": 30,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Pictionary",
        "isPaid": true,
        "paymentAmount": 200,
        "unit": "per team",
        "team": true
      },
      {
        "name": "Treasure Hunt",
        "isPaid": true,
        "paymentAmount": 200,
        "unit": "per team",
        "team": true
      },
      {
        "name": "You Laugh You Lose",
        "isPaid": true,
        "paymentAmount": 50,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Among Us",
        "isPaid": true,
        "paymentAmount": 100,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Bottle Flip",
        "isPaid": true,
        "paymentAmount": 30,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Tambola",
        "isPaid": true,
        "paymentAmount": 50,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Worst Portrait",
        "isPaid": true,
        "paymentAmount": 50,
        "unit": "per team",
        "team": true
      }
    ]
  }
  ,
  {
    "categoryName": "Creative",
    "subcategories": [
      {
        "name": "Anatomy Painting",
        "isPaid": true,
        "paymentAmount": 50,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Art Court (Team of 3–4)",
        "isPaid": true,
        "paymentAmount": 150,
        "unit": "per team",
        "team": true
      },
      {
        "name": "Best Among Worst (Team of 2)",
        "isPaid": true,
        "paymentAmount": 50,
        "unit": "per team",
        "team": true
      },
      {
        "name": "Canvas Kicks",
        "isPaid": true,
        "paymentAmount": 100,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Luminara",
        "isPaid": true,
        "paymentAmount": 30,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Paint The Unthinkable",
        "isPaid": true,
        "paymentAmount": 50,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Femverse",
        "isPaid": true,
        "paymentAmount": 100,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Best Out of Waste",
        "isPaid": false,
        "unit": "per person",
        "team": false
      }
    ]
  },
  {
    "categoryName": "Literary",
    "subcategories": [
      // Day 1
      {
        "name": "Fandom Quiz",
        "isPaid": true,
        "paymentAmount": 150,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Chaos Unleashed (Scramble)",
        "isPaid": true,
        "paymentAmount": 30,
        "unit": "per person",
        "team": false
      },

      // Day 2
      {
        "name": "General Quiz",
        "isPaid": true,
        "paymentAmount": 150,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Verses of Aether (Poetry Recital)",
        "isPaid": true,
        "paymentAmount": 150,
        "unit": "per person",
        "team": false
      },
      {
        "name": "The Cipher (Code Game)",
        "isPaid": true,
        "paymentAmount": 30,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Legends Unfold (Storytelling Competition)",
        "isPaid": true,
        "paymentAmount": 75,
        "unit": "per person",
        "team": false
      },

      // Day 3
      {
        "name": "School Quiz",
        "isPaid": true,
        "paymentAmount": 150,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Sports Quiz",
        "isPaid": true,
        "paymentAmount": 150,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Spellbound (Spelling Bee)",
        "isPaid": true,
        "paymentAmount": 150,
        "unit": "per person",
        "team": false
      },

      // Day 4
      {
        "name": "Exquisite (Medical Quiz)",
        "isPaid": true,
        "paymentAmount": 150,
        "unit": "per person",
        "team": false
      },
      {
        "name": "The Quill & Chronicle (Creative Writing)",
        "isPaid": true,
        "paymentAmount": 75,
        "unit": "per person",
        "team": false
      },
      {
        "name": "The Art of Persuasion (Debate)",
        "isPaid": true,
        "paymentAmount": 150,
        "unit": "per person",
        "team": false
      }
    ]
  }
  ,
  {
    categoryName: "Esports",
    subcategories: [
      { name: "BGMI", isPaid: true, paymentAmount: 200, unit: "per team", team: true },
      { name: "BGMI TDM", isPaid: true, paymentAmount: 100, unit: "per team", team: true },
      { name: "CODM", isPaid: true, paymentAmount: 200, unit: "per team", team: true },
      { name: "E-Football", isPaid: true, paymentAmount: 50, unit: "per person", team: false },
      { name: "EAFC 26 / FIFA", isPaid: true, paymentAmount: 50, unit: "per person", team: false },
      { name: "Clash Royale", isPaid: true, paymentAmount: 50, unit: "per person", team: false },
      { name: "WorldGuessr", isPaid: true, paymentAmount: 50, unit: "per person", team: false },
      { name: "Free Fire — Clash Squad", isPaid: true, paymentAmount: 50, unit: "per team", team: true },
      { name: "Free Fire — Classic", isPaid: true, paymentAmount: 200, unit: "per team", team: true }
    ]
  },

  {
    "categoryName": "Cultural",
    "subcategories": [
      // S.No. 1 — Syncopation (Dance Competition) [FREE]
      { "name": "Syncopation: Mystic Mudras (Solo Classical)", "isPaid": false, "unit": "per person", "team": false },
      { "name": "Syncopation: Rhythm Mirage (Solo Western)", "isPaid": false, "unit": "per person", "team": false },
      { "name": "Syncopation: Sorcery in Sync (Duet)", "isPaid": false, "unit": "per team", "team": true },
      { "name": "Syncopation: Astral Troupe (Group)", "isPaid": false, "unit": "per team", "team": true },



      // S.No. 2 — Rhythmixia (Instrumental Competition) [FREE]
      { "name": "Rhythmixia: Solo Western", "isPaid": false, "unit": "per person", "team": false },
      { "name": "Rhythmixia: Duo Western", "isPaid": false, "unit": "per team", "team": true },
      { "name": "Rhythmixia: Solo Classical", "isPaid": false, "unit": "per person", "team": false },
      { "name": "Rhythmixia: Duo Classical", "isPaid": false, "unit": "per team", "team": true },

      // S.No. 3 — Twilight Masquerade (Drama Competition) [Early-Bird: ₹699]
      { "name": "Twilight Masquerade (Drama Competition)", "isPaid": true, "paymentAmount": 699, "unit": "per team", "team": true },

      // S.No. 4 — Sonic Mayhem (Battle of Bands) [Early-Bird: ₹499]
      { "name": "Sonic Mayhem (Battle of Bands)", "isPaid": true, "paymentAmount": 499, "unit": "per team", "team": true },

      // S.No. 5 — Sonority (Singing Competition) [FREE]
      { "name": "Sonority: Enchanted Tunes (Western Solo)", "isPaid": false, "unit": "per person", "team": false },
      { "name": "Sonority: Enchanted Harmony (Western Duet)", "isPaid": false, "unit": "per team", "team": true },
      { "name": "Sonority: Swar-Lahar (Classical Solo)", "isPaid": false, "unit": "per person", "team": false },
      { "name": "Sonority: Swar-Samvaad (Classical Duet)", "isPaid": false, "unit": "per team", "team": true },

      // S.No. 6 — Cosmos - Isekai- IRL (Cosplay) [Early-Bird: ₹99]
      { "name": "Cosmos - Isekai- IRL (Cosplay)", "isPaid": true, "paymentAmount": 99, "unit": "per person", "team": false },
      // S.No. 7 — Fashionista (Fashion Competition) [Early-Bird: ₹799]
      { "name": "Fashionista", "isPaid": true, "paymentAmount": 799, "unit": "per team", "team": true }
    ]
  }
  ,
  {
    categoryName: "META-STASISS",
    subcategories: [
      // SOLO EVENTS
      // { name: "CODE Dx (Solo)", isPaid: true, paymentAmount: 200, unit: "per person", team: false },
      // { name: "MED-CHRONICLES", isPaid: false, team: false },
      // { name: "Did You Know (Online Reel Competition)", isPaid: false, team: false },

      // // DUET EVENTS
      // { name: "RESEARCH SHARK TANK (Duet)", isPaid: true, paymentAmount: 300, unit: "per team", team: true },
      // { name: "CODE Dx (Duet)", isPaid: true, paymentAmount: 200, unit: "per team", team: true },
      // { name: "MED CHARADES", isPaid: true, paymentAmount: 50, unit: "per person", team: true },

      // // GROUP EVENTS
      // { name: "RESEARCH SHARK TANK (Group)", isPaid: true, paymentAmount: 300, unit: "per team", team: true },
      // { name: "CODE Dx (Group)", isPaid: true, paymentAmount: 200, unit: "per team", team: true }
    ]
  },
  {
    "categoryName": "Women Cell",
    "subcategories": [
      {
        "name": "O womaniya (Talk show)",
        "isPaid": false,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Hazaar Dastaan (spoken poetry compt.)",
        "isPaid": true,
        "paymentAmount": 49,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Chitraa (Art competition)",
        "isPaid": false,
        "unit": "per person",
        "team": false
      },
      {
        "name": "Thinking out loud",
        "isPaid": false,
        "unit": "per person",
        "team": false
      }
    ]
  }

];

// ✅ Connect and replace existing categories
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(async () => {
    console.log("✅ MongoDB connected successfully");

    // Delete existing categories
    await Category.deleteMany({});
    console.log("🗑️ Existing categories deleted");

    // Insert new data
    await Category.insertMany(data);
    console.log("✅ Categories inserted successfully!");

    mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection or Insertion error:", err);
    process.exit(1);
  });
