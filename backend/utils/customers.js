const bcrypt = require("bcryptjs");

const customers = [
  {
    _id: "6439713c1d8869133e8881e3",

    name: "Paul Halios",
    email: "paul@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334978230",
  },
  {
    _id: "6439713c1d8869133e8881f2",

    name: "Linda Aerica Wali",
    email: "linda@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334973409",
  },
  {
    _id: "6439713c1d8869133e8881e8",

    name: "Aurora Afghani",
    email: "aurora@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334970398",
  },
  {
    _id: "6439713c1d8869133e8881e6",

    name: "James Wahabi",
    email: "james@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334923097",
  },
  {
    _id: "6439713c1d8869133e8881e9",

    name: "Justin Bieber",
    email: "justin@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3337985762",
  },
  {
    _id: "6439713c1d8869133e8881e4",

    name: "Jon Kabari Wala",
    email: "jon@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334970298",
  },
  {
    _id: "6439713c1d8869133e8881ef",

    name: "Gordon Afghani",
    email: "gordon@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334970239",
  },
  {
    _id: "6439713c1d8869133e8881ee",

    name: "Lester Scorpio",
    email: "lester@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334979203",
  },
  {
    _id: "6439713c1d8869133e8881eb",

    name: "Kathryn Rose Gold",
    email: "kathryn@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334978920",
  },
  {
    _id: "6439713c1d8869133e8881f1",

    name: "EddieNew Contact",
    email: "eddie@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334920439",
  },
  {
    _id: "6439713c1d8869133e8881e7",

    name: "Christopher Blacksmith",
    email: "christopher@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334993450",
  },
  {
    _id: "6439713c1d8869133e8881ed",

    name: "Samuel African",
    email: "samuel@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3304970294",
  },
  {
    _id: "6439713c1d8869133e8881f6",

    name: "Richard Ali",
    email: "richard@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-303490294",
  },
  {
    _id: "6439713c1d8869133e8881ea",

    name: "Josephine Car Rental",
    email: "josephine@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334586930",
  },
  {
    _id: "6439713c1d8869133e8881ec",

    name: "Henry Halios",
    email: "henry@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334939120",
  },
  {
    _id: "6439713c1d8869133e8881f0",

    name: "Williams Brothers",
    email: "williams@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334920593",
  },
  {
    _id: "6439713c1d8869133e8881f3",

    name: "Danielle Roll Paratha",
    email: "danielle@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334993045",
  },
  {
    _id: "6439713c1d8869133e8881e5",

    name: "Hilary Salios",
    email: "hilary@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334972222",
  },
  {
    _id: "6439713c1d8869133e8881f4",

    name: "Thomas Shelby",
    email: "thomas@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334970000",
  },
  {
    _id: "6439713c1d8869133e8881f5",

    name: "Brain Heart",
    email: "brain@gmail.com",
    password: bcrypt.hashSync("12345678"),
    phone: "+92-3334900000",
  },
];
module.exports = customers;
