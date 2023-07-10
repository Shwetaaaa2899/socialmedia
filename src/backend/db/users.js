import { v4 as uuid } from "uuid";

/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */


import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: 2,
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    bio:
    "Frontend Developer 💻✨Turning ideas into beautiful and interactive websites✨🚀",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    avatarUrl:"https://i.pinimg.com/originals/22/04/a8/2204a80672494b512d779aa3fe119744.jpg"
 },
  {
    _id: 3,
    firstName: "Shweta",
    lastName: "Jha",
    username: "shwetaj",
    password: "shweta@123",
    bio:"Learning React💻✨ by building projects",
    bookmarks: [],
    website:"https://github.com/Shwetaaaa2899",

    createdAt: "2022-01-01T10:55:06+05:30",
    updatedAt: formatDate(),
    avatarUrl:"https://1fid.com/wp-content/uploads/2022/06/cartoon-profile-picture-6-1024x1024.jpg",
    
  },
 
  
  {
    _id: 4,
    firstName: "Alice",
    lastName: "Jones",
    username: "alicejohnson",
    password: "alice123",
    bio:
      "Software Developer 👩‍💻💡.Passionate about technology and creating innovative software 🌟🚀",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dptfwcnro/image/upload/v1685596157/SocialBuzz/images_vrd6b5.jpg",
    website: "https://alicejohnson.com/",
    createdAt: "2022-05-15T08:30:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: 5,
    firstName: "Bob",
    lastName: "Smith",
    username: "bobsmith",
    password: "bob123",
    bio:
      "Web Designer 🎨🌈.Creating digital masterpieces with colors and imagination🎨✨",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dptfwcnro/image/upload/v1685595771/SocialBuzz/247-2479526_round-profile-picture-png-transparent-png_ukpjxm.png",
    website: "https://bobsmith.com/",
    createdAt: "2022-06-20T14:45:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id:6,
    firstName: "Emma",
    lastName: "Davis",
    username: "emmadavis",
    password: "emma123",
    bio:
      "Photographer 📷✨Capturing moments that tell stories.Exploring the world through a lens. Join me on this visual journey! 🌍✨",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dptfwcnro/image/upload/v1685595740/SocialBuzz/images_zrbwa3.jpg",
    website: "https://emmadavis.com/",
    createdAt: "2022-04-10T12:15:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: 7,
    firstName: "James",
    lastName: "Wilson",
    username: "jameswilson",
    password: "james123",
    bio: "Musician 🎵🎸. Composing music that touches hearts 🎶✨",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dptfwcnro/image/upload/v1685595800/SocialBuzz/images_wxjv0c.jpg",
    website: "https://jameswilson.com/",
    createdAt: "2022-07-05T17:20:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: 8,
    firstName: "Lily",
    lastName: "Anderson",
    username: "lilyanderson",
    password: "lily123",
    bio: "Graphic Designer 🎨✏️\nFrom pixels to perfection! ✨🌟",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dptfwcnro/image/upload/v1685595837/SocialBuzz/images_b9qohl.jpg",
    website: "https://lilyanderson.com/",
    createdAt: "2022-03-01T09:00:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id:9,
    firstName: "Oliver",
    lastName: "Taylor",
    username: "olivertaylor",
    password: "oliver123",
    bio:
      "Travel Blogger ✈️🌍\nExploring the world, one adventure at a time 🗺️✨",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dptfwcnro/image/upload/v1685595881/SocialBuzz/images_tidrd1.jpg",
    website: "https://olivertaylor.com/",
    createdAt: "2022-08-10T13:55:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: 10,
    firstName: "Sophie",
    lastName: "Clark",
    username: "sophieclark",
    password: "sophie123",
    bio:
      "Fitness Enthusiast 💪🏋️‍♀️🌱\nEmpowering and inspiring others to lead a healthy and balanced lifestyle💚✨",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dptfwcnro/image/upload/v1685595920/SocialBuzz/images_qynsis.jpg",
    website: "https://sophieclark.com/",
    createdAt: "2022-09-25T10:10:00+05:30",
    updatedAt: formatDate(),
  },
];