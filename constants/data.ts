import { Route, TouristPlace } from "../types/types";
import images from "./images";

export const mockPlaces: TouristPlace[] = [
  {
    id: "1",
    name: "Кремль",
    description:
      "Исторический центр Москвы, главная достопримечательность города.",
    images: [images.kremlin1, images.kremlin2],
    coordinates: {
      latitude: 55.751999,
      longitude: 37.617734,
    },
    address: "Москва, Кремль",
    rating: 4.8,
    openingHours: "10:00 - 18:00",
    contactInfo: {
      phone: "+7 (495) 123-45-67",
      website: "www.kreml.ru",
    },
  },
  {
    id: "4",
    name: "Национальная библиотека Беларуси",
    description:
      "Главная библиотека Республики Беларусь, уникальное архитектурное сооружение в форме ромбокубооктаэдра. Одна из самых больших библиотек в мире.",
    images: [images.nationalLibrary],
    coordinates: {
      latitude: 53.9311,
      longitude: 27.6457,
    },
    rating: 4.8,
    address: "пр-т Независимости, 116, Минск",
    contactInfo: {
      phone: "+375 17 293 27 53",
      website: "https://www.nlb.by",
      address: "пр-т Независимости, 116, Минск",
    },
  },
  {
    id: "5",
    name: "Костёл Святой Троицы в Гервятах",
    description:
      "Один из самых высоких и красивых костёлов Беларуси, построенный в неоготическом стиле. Высота башни составляет 61 метр.",
    images: [images.gervyatyChurch],
    address: "д. Гервяты, Островецкий район",
    coordinates: {
      latitude: 54.6883,
      longitude: 26.1428,
    },
    rating: 4.9,
    contactInfo: {
      phone: "+375 1594 2 22 22",
      address: "д. Гервяты, Островецкий район",
    },
  },
  {
    id: "6",
    name: "Дворец Пусловских",
    description:
      "Неоготический дворец XIX века, известный также как Коссовский замок. Один из самых красивых дворцов Беларуси.",
    images: [images.pusslovskyPalace],
    address: "д. Коссово, Ивацевичский район",
    coordinates: {
      latitude: 52.7678,
      longitude: 25.1167,
    },
    rating: 4.7,
    contactInfo: {
      phone: "+375 1643 2 22 22",
      address: "д. Коссово, Ивацевичский район",
    },
  },
  {
    id: "7",
    name: "Мирский замок",
    description:
      "Объект Всемирного наследия ЮНЕСКО. Замок XVI века, построенный в стиле готики и ренессанса. Один из самых известных замков Беларуси.",
    images: [images.mirCastle],
    address: "п. Мир, Кореличский район",
    coordinates: {
      latitude: 53.4519,
      longitude: 26.4728,
    },
    rating: 4.9,
    contactInfo: {
      phone: "+375 1596 2 22 22",
      website: "https://mirzamak.by",
      address: "п. Мир, Кореличский район",
    },
  },
];

export const mockRoutes: Route[] = [
  {
    id: "1",
    title: "Прогулка по историческому центру",
    description: "Современный Минск",
    image: require("../assets/images/national-library.jpg"),
    author: {
      id: "1",
      name: "Александр Петров",
      avatar: require("../assets/images/avatar.png"),
    },
    rating: 4.8,
    category: "architecture",
    places: [],
    createdAt: "2024-03-20",
  },
  {
    id: "2",
    title: "Лучшие костёлы Беларуси",
    description: "Маршрут по самым живописным местам природы",
    image: require("../assets/images/gerviat.jpg"),
    author: {
      id: "2",
      name: "Мария Иванова",
      avatar: require("../assets/images/avatar2.png"),
    },
    rating: 4.9,
    category: "architecture",
    places: [],
    createdAt: "2024-03-19",
  },
  {
    id: "3",
    title: "Маст хэв для посещения",
    description: "architecture",
    image: require("../assets/images/mir-castle.jpg"),
    author: {
      id: "3",
      name: "Дмитрий Смирнов",
      avatar: require("../assets/images/avatar3.png"),
    },
    rating: 4.7,
    category: "architecture",
    places: [],
    createdAt: "2024-03-18",
  },
];

export const categories = [
  { id: "popular", title: "Популярные" },
  { id: "nature", title: "Природа" },
  { id: "architecture", title: "Архитектура" },
  { id: "culture", title: "Культура" },
  { id: "food", title: "Еда" },
  { id: "other", title: "Другое" },
];
