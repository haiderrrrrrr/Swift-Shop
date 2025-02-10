const bcrypt = require("bcryptjs");
const admins = [
  {
    name: {
      en: "Dortohy Africe",
    },
    image: "https://i.ibb.co/d294W8Y/team-4.jpg",
    email: "dorothy@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334545949",
    role: "Security Guard",
    joiningData: new Date(),
  },
  {
    name: {
      en: "Alice B. Porter",
    },
    image: "Alice Pak",
    email: "alice@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334590129",
    role: "Driver",
    joiningData: new Date(),
  },
  {
    name: {
      en: "Corrie Hello",
    },
    image: "https://i.ibb.co/SNN7JCX/team-6.jpg",
    email: "corrie@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334590291",
    role: "Accountant",
    joiningData: new Date(),
  },
  {
    name: {
      en: "Shawn Palestine",
    },
    image: "https://i.ibb.co/GWVWYNn/team-7.jpg",
    email: "shawn@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334593494",
    role: "Manager",
    joiningData: new Date(),
  },
  {
    name: {
      en: "Stacey Helios",
    },
    image: "https://i.ibb.co/XjwBLcK/team-2.jpg",
    email: "stacey@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-333459309",
    role: "CEO",
    joiningData: new Date(),
  },
  {
    name: {
      en: "Marion Parker",
    },
    image: "https://i.ibb.co/3zs3H7z/team-5.jpg",
    email: "marion@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334595498",
    role: "Admin",
    joiningData: new Date(),
  },
  {
    name: {
      en: "Admin",
    },
    image: "https://i.ibb.co/WpM5yZZ/9.png",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334598210",
    role: "Admin",
    joiningData: new Date(),
  },
];

module.exports = admins;
