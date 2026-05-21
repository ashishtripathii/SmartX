const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const User = require("./models/user");
const Category = require("./models/category");
const Product = require("./models/product");
const Conversation = require("./models/conversation");
const Message = require("./models/message");

const connectToDatabase = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing in .env");
  }

  await mongoose.connect(process.env.DATABASE_URL, {
    serverSelectionTimeoutMS: 30000,
  });
};

const seedDatabase = async () => {
  try {
    await connectToDatabase();
    console.log("Database connected");

    // Clear Old Data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Conversation.deleteMany({});
    await Message.deleteMany({});

    console.log("Old Data Removed");

    // =========================
    // Categories
    // =========================

    const categories = await Category.insertMany([
      {
        categoryName: "Cars",
        categoryImage:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      },
      {
        categoryName: "Bikes",
        categoryImage:
          "https://images.unsplash.com/photo-1558981403-c5f9899a28bc",
      },
      {
        categoryName: "Properties",
        categoryImage:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      },
      {
        categoryName: "Mobiles",
        categoryImage:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      },
      {
        categoryName: "Jobs",
        categoryImage:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      },
      {
        categoryName: "Electronics & Appliances",
        categoryImage:
          "https://images.unsplash.com/photo-1550009158-9ebf69173e03",
      },
      {
        categoryName: "Commercial Vehicles & Spares",
        categoryImage:
          "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
      },
      {
        categoryName: "Furniture",
        categoryImage:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      },
      {
        categoryName: "Fashion",
        categoryImage:
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
      },
      {
        categoryName: "Pets",
        categoryImage:
          "https://images.unsplash.com/photo-1548767797-d8c844163c4c",
      },
      {
        categoryName: "Books, Sports & Hobbies",
        categoryImage:
          "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
      },
      {
        categoryName: "Services",
        categoryImage:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      },
    ]);

    // =========================
    // Users
    // =========================

    const hashedSeedPassword = await bcrypt.hash("123456", 10);

    const users = await User.insertMany([
      {
        firstName: "Rahul",
        lastName: "Sharma",
        email: "rahul@gmail.com",
        password: hashedSeedPassword,
        profilePicture: "user1.png",
      },
      {
        firstName: "Priya",
        lastName: "Singh",
        email: "priya@gmail.com",
        password: hashedSeedPassword,
        profilePicture: "user2.png",
      },
      {
        firstName: "Aman",
        lastName: "Verma",
        email: "aman@gmail.com",
        password: hashedSeedPassword,
        profilePicture: "user3.png",
      },
      {
        firstName: "Sneha",
        lastName: "Gupta",
        email: "sneha@gmail.com",
        password: hashedSeedPassword,
        profilePicture: "user4.png",
      },
      {
        firstName: "Rohit",
        lastName: "Patel",
        email: "rohit@gmail.com",
        password: hashedSeedPassword,
        profilePicture: "user5.png",
      },
      {
        firstName: "Neha",
        lastName: "Jain",
        email: "neha@gmail.com",
        password: hashedSeedPassword,
        profilePicture: "user6.png",
      },
    ]);

    // =========================
    // Products
    // =========================

    const products = await Product.insertMany([
      // Cars
      {
        productName: "Hyundai Creta",
        description: "Single owner car in excellent condition",
        price: 850000,
        category: categories[0]._id,
        condition: "Used",
        location: "Delhi",
        sellerId: users[0]._id,
        contactNumber: "9876543210",
        images: [{ url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70", public_id: "car1" }],
      },
      {
        productName: "Honda City",
        description: "Petrol automatic with insurance",
        price: 620000,
        category: categories[0]._id,
        condition: "Used",
        location: "Mumbai",
        sellerId: users[1]._id,
        contactNumber: "9876543211",
        images: [{ url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7", public_id: "car2" }],
      },

      // Bikes
      {
        productName: "Royal Enfield Classic 350",
        description: "Excellent bike with new tyres",
        price: 145000,
        category: categories[1]._id,
        condition: "Used",
        location: "Indore",
        sellerId: users[2]._id,
        contactNumber: "9876543212",
        images: [{ url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39", public_id: "bike1" }],
      },
      {
        productName: "Honda Activa 6G",
        description: "Low mileage scooter",
        price: 62000,
        category: categories[1]._id,
        condition: "Used",
        location: "Bhopal",
        sellerId: users[3]._id,
        contactNumber: "9876543213",
        images: [{ url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7", public_id: "bike2" }],
      },

      // Properties
      {
        productName: "2 BHK Flat",
        description: "Fully furnished apartment",
        price: 25000,
        category: categories[2]._id,
        condition: "New",
        location: "Noida",
        sellerId: users[4]._id,
        contactNumber: "9876543214",
        images: [{ url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6", public_id: "property1" }],
      },
      {
        productName: "Office Space",
        description: "Commercial office near metro",
        price: 50000,
        category: categories[2]._id,
        condition: "New",
        location: "Gurgaon",
        sellerId: users[5]._id,
        contactNumber: "9876543215",
        images: [{ url: "https://images.unsplash.com/photo-1494526585095-c41746248156", public_id: "property2" }],
      },

      // Mobiles
      {
        productName: "iPhone 14 Pro",
        description: "128GB with charger",
        price: 82000,
        category: categories[3]._id,
        condition: "Used",
        location: "Delhi",
        sellerId: users[0]._id,
        contactNumber: "9876543216",
        images: [{ url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9", public_id: "mobile1" }],
      },
      {
        productName: "Samsung S24 Ultra",
        description: "Brand new phone",
        price: 95000,
        category: categories[3]._id,
        condition: "New",
        location: "Pune",
        sellerId: users[1]._id,
        contactNumber: "9876543217",
        images: [{ url: "https://images.unsplash.com/photo-1580910051074-3eb694886505", public_id: "mobile2" }],
      },

      // Jobs
      {
        productName: "MERN Stack Developer",
        description: "Looking for React developer",
        price: 80000,
        category: categories[4]._id,
        condition: "New",
        location: "Remote",
        sellerId: users[2]._id,
        contactNumber: "9876543218",
        images: [{ url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d", public_id: "job1" }],
      },
      {
        productName: "Java Backend Developer",
        description: "Hiring freshers",
        price: 90000,
        category: categories[4]._id,
        condition: "New",
        location: "Bangalore",
        sellerId: users[3]._id,
        contactNumber: "9876543219",
        images: [{ url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", public_id: "job2" }],
      },

      // Electronics
      {
        productName: "LG Smart TV",
        description: "43 inch 4K TV",
        price: 28000,
        category: categories[5]._id,
        condition: "Used",
        location: "Lucknow",
        sellerId: users[4]._id,
        contactNumber: "9876543220",
        images: [{ url: "https://images.unsplash.com/photo-1550009158-9ebf69173e03", public_id: "electronics1" }],
      },
      {
        productName: "Dell Laptop",
        description: "Core i7 gaming laptop",
        price: 55000,
        category: categories[5]._id,
        condition: "Used",
        location: "Kanpur",
        sellerId: users[5]._id,
        contactNumber: "9876543221",
        images: [{ url: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8", public_id: "electronics2" }],
      },

      // Commercial Vehicles
      {
        productName: "Tata Truck",
        description: "Heavy duty truck",
        price: 1200000,
        category: categories[6]._id,
        condition: "Used",
        location: "Jaipur",
        sellerId: users[0]._id,
        contactNumber: "9876543222",
        images: [{ url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c", public_id: "commercial1" }],
      },
      {
        productName: "Mahindra Pickup",
        description: "Pickup vehicle in good condition",
        price: 450000,
        category: categories[6]._id,
        condition: "Used",
        location: "Agra",
        sellerId: users[1]._id,
        contactNumber: "9876543223",
        images: [{ url: "https://images.unsplash.com/photo-1549924231-f129b911e442", public_id: "commercial2" }],
      },

      // Furniture
      {
        productName: "Wooden Sofa Set",
        description: "5 seater sofa",
        price: 18000,
        category: categories[7]._id,
        condition: "Used",
        location: "Delhi",
        sellerId: users[2]._id,
        contactNumber: "9876543224",
        images: [{ url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85", public_id: "furniture1" }],
      },
      {
        productName: "Study Table",
        description: "Modern study table",
        price: 3500,
        category: categories[7]._id,
        condition: "New",
        location: "Bhopal",
        sellerId: users[3]._id,
        contactNumber: "9876543225",
        images: [{ url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85", public_id: "furniture2" }],
      },

      // Fashion
      {
        productName: "Men's Jacket",
        description: "Winter jacket size L",
        price: 2200,
        category: categories[8]._id,
        condition: "New",
        location: "Indore",
        sellerId: users[4]._id,
        contactNumber: "9876543226",
        images: [{ url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c", public_id: "fashion1" }],
      },
      {
        productName: "Women's Handbag",
        description: "Premium leather bag",
        price: 3200,
        category: categories[8]._id,
        condition: "New",
        location: "Mumbai",
        sellerId: users[5]._id,
        contactNumber: "9876543227",
        images: [{ url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3", public_id: "fashion2" }],
      },

      // Pets
      {
        productName: "Golden Retriever Puppy",
        description: "Vaccinated puppy",
        price: 18000,
        category: categories[9]._id,
        condition: "New",
        location: "Noida",
        sellerId: users[0]._id,
        contactNumber: "9876543228",
        images: [{ url: "https://images.unsplash.com/photo-1548767797-d8c844163c4c", public_id: "pet1" }],
      },
      {
        productName: "Persian Cat",
        description: "Healthy Persian cat",
        price: 10000,
        category: categories[9]._id,
        condition: "New",
        location: "Delhi",
        sellerId: users[1]._id,
        contactNumber: "9876543229",
        images: [{ url: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4", public_id: "pet2" }],
      },

      // Books
      {
        productName: "JavaScript Handbook",
        description: "Beginner friendly JS book",
        price: 600,
        category: categories[10]._id,
        condition: "New",
        location: "Kanpur",
        sellerId: users[2]._id,
        contactNumber: "9876543230",
        images: [{ url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353", public_id: "book1" }],
      },
      {
        productName: "Cricket Kit",
        description: "Complete cricket set",
        price: 4500,
        category: categories[10]._id,
        condition: "Used",
        location: "Patna",
        sellerId: users[3]._id,
        contactNumber: "9876543231",
        images: [{ url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e", public_id: "book2" }],
      },

      // Services
      {
        productName: "Home Cleaning Service",
        description: "Deep cleaning available",
        price: 2500,
        category: categories[11]._id,
        condition: "New",
        location: "Delhi",
        sellerId: users[4]._id,
        contactNumber: "9876543232",
        images: [{ url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4", public_id: "service1" }],
      },
      {
        productName: "Math Tuition Classes",
        description: "Class 10 and 12 coaching",
        price: 3000,
        category: categories[11]._id,
        condition: "New",
        location: "Bhopal",
        sellerId: users[5]._id,
        contactNumber: "9876543233",
        images: [{ url: "https://images.unsplash.com/photo-1509062522246-3755977927d7", public_id: "service2" }],
      },
    ]);


    console.log("Database Seeded Successfully");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.log("Seed failed:", error.message);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  }
};

seedDatabase();