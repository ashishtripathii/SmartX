const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./models/user");
const Category = require("./models/category");
const Product = require("./models/product");
const Conversation = require("./models/conversation");
const Message = require("./models/message");

mongoose.connect(process.env.DATABASE_URL);

const seedDatabase = async () => {
  try {
    // clear old data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Conversation.deleteMany({});
    await Message.deleteMany({});

    console.log("Old Data Removed");

    // 1️⃣ Create Categories
    const categories = await Category.insertMany([
      {
        categoryName: "Electronics",
        categoryImage: "electronics.png",
      },
      {
        categoryName: "Furniture",
        categoryImage: "furniture.png",
      },
      {
        categoryName: "Books",
        categoryImage: "books.png",
      },
    ]);

    // 2️⃣ Create Users
    const users = await User.insertMany([
      {
        firstName: "Rahul",
        lastName: "Sharma",
        email: "rahul@gmail.com",
        password: "123456",
        profilePicture: "user1.png",
      },
      {
        firstName: "Aman",
        lastName: "Verma",
        email: "aman@gmail.com",
        password: "123456",
        profilePicture: "user2.png",
      },
      {
        firstName: "Priya",
        lastName: "Singh",
        email: "priya@gmail.com",
        password: "123456",
        profilePicture: "user3.png",
      },
    ]);

    // 3️⃣ Create Products
    const products = await Product.insertMany([
      {
        productName: "iPhone 13",
        description: "Good condition iPhone 13",
        price: 45000,
        category: categories[0]._id,
        condition: "Used",
        location: "Delhi",
        sellerId: users[0]._id,
        contactNumber: "9876543210",
        images: [
          {
            url: "iphone.png",
            public_id: "iphone123",
          },
        ],
      },
      {
        productName: "Wooden Study Table",
        description: "Solid wood table",
        price: 3000,
        category: categories[1]._id,
        condition: "Used",
        location: "Noida",
        sellerId: users[1]._id,
        contactNumber: "9123456780",
        images: [
          {
            url: "table.png",
            public_id: "table123",
          },
        ],
      },
      {
        productName: "JavaScript Book",
        description: "Beginner JS book",
        price: 500,
        category: categories[2]._id,
        condition: "New",
        location: "Lucknow",
        sellerId: users[2]._id,
        contactNumber: "9012345678",
        images: [
          {
            url: "book.png",
            public_id: "book123",
          },
        ],
      },
    ]);

    // 4️⃣ Create Conversations
    const conversation1 = await Conversation.create({
      members: [users[0]._id, users[1]._id],
    });

    const conversation2 = await Conversation.create({
      members: [users[1]._id, users[2]._id],
    });

    // 5️⃣ Create Messages
    await Message.insertMany([
      {
        conversationId: conversation1._id,
        senderId: users[0]._id,
        message: "Hi, is the iPhone available?",
      },
      {
        conversationId: conversation1._id,
        senderId: users[1]._id,
        message: "Yes, it is available.",
      },
      {
        conversationId: conversation2._id,
        senderId: users[2]._id,
        message: "Can you reduce the price?",
      },
    ]);

    console.log("Database Seeded Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDatabase();
