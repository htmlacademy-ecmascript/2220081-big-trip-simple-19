// Тип
// Пункт назначения
// Дата и время начала события
// Дата и время окончания события.
// Стоимость.
// Дополнительные опции offers

import { TYPES } from '../const.js';
import { getRandomArrayElement } from '../utils.js';

const randomPic = () => Math.random();

//Моки типов маршрутов

const mockOffers = [
  {
    'id': 0,
    'title': 'Order Uber',
    'price': 20
  },
  {
    'id': 1,
    'title': 'Comfort',
    'price': 10
  },
  {
    'id': 2,
    'title': 'Choose seats',
    'price': 20
  },
  {
    'id': 3,
    'title': 'Add meal',
    'price': 10
  },
  {
    'id': 4,
    'title': 'Econom car',
    'price': 150
  },
  {
    'id': 5,
    'title': 'Business class',
    'price': 640
  },
  {
    'id': 6,
    'title': 'Premium car',
    'price': 250
  },
  {
    'id': 7,
    'title': 'Upgrade room',
    'price': 150
  },
  {
    'id': 8,
    'title': 'Add breakfast',
    'price': 30
  },
  {
    'id': 9,
    'title': 'Personal guide',
    'price': 120
  },
  {
    'id': 10,
    'title': 'Lunch',
    'price': 15
  },
  {
    'id': 11,
    'title': 'No-smoke place',
    'price': 10
  }
];

const offersByTypes = [
  {
    'type': 'taxi',
    'offers': [
      mockOffers[0],
      mockOffers[1],
      mockOffers[4],
      mockOffers[6]
    ]
  },
  {
    'type': 'bus',
    'offers': [
      mockOffers[2]
    ]
  },
  {
    'type': 'train',
    'offers': [
      mockOffers[1],
      mockOffers[2],
      mockOffers[3],
    ]
  },
  {
    'type': 'ship',
    'offers': [
      mockOffers[2],
      mockOffers[3]
    ]
  },
  {
    'type': 'drive',
    'offers': [
      mockOffers[4],
      mockOffers[6]
    ]
  },
  {
    'type': 'flight',
    'offers': [
      mockOffers[2],
      mockOffers[3],
      mockOffers[5]
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      mockOffers[7],
      mockOffers[8]
    ]
  },
  {
    'type': 'sightseeing',
    'offers': [
      mockOffers[9],
      mockOffers[3]
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      mockOffers[10],
      mockOffers[11]
    ]
  },
];

//Моки пункта назначения

const mockDestination = [
  {
    id: 1,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${randomPic}`,
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    name: 'Geneva',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${randomPic}`,
        description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
      }
    ]
  },
  {
    id: 3,
    description: 'Fusce tristique felis at fermentum pharetra.Aliquam erat volutpat.',
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${randomPic}`,
        description: 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
      }
    ]
  }
];

//Моки для точек

const mockPoints = [
  {
    'id': 0,
    'basePrice': 1100,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestination).id,
    'offers': [
      mockOffers[0].id,
      mockOffers[1].id,
      mockOffers[4].id,
      mockOffers[6].id
    ],
    'type': TYPES[0]
  },
  {
    'id': 1,
    'basePrice': 900,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestination).id,
    'offers': [
      mockOffers[2].id
    ],
    'type': TYPES[1]
  },
  {
    'id': 2,
    'basePrice': 500,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestination).id,
    'offers': [
      mockOffers[1].id,
      mockOffers[2].id,
      mockOffers[3].id,
    ],
    'type': TYPES[2]
  },
  {
    'id': 3,
    'basePrice': 1400,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestination).id,
    'offers': [
      mockOffers[2].id,
      mockOffers[3].id
    ],
    'type': TYPES[3]
  },
  {
    'id': 4,
    'basePrice': 650,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestination).id,
    'offers': [
      mockOffers[4].id,
      mockOffers[6].id
    ],
    'type': TYPES[4]
  },
  {
    'id': 5,
    'basePrice': 1700,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestination).id,
    'offers': [
      mockOffers[2].id,
      mockOffers[3].id,
      mockOffers[5].id
    ],
    'type': TYPES[5]
  },
  {
    'id': 6,
    'basePrice': 800,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestination).id,
    'offers': [
      mockOffers[7].id,
      mockOffers[8].id
    ],
    'type': TYPES[6]
  },
  {
    'id': 7,
    'basePrice': 600,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestination).id,
    'offers': [
      mockOffers[9].id,
      mockOffers[3].id
    ],
    'type': TYPES[7]
  },
  {
    'id': 8,
    'basePrice': 500,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestination).id,
    'offers': [
      mockOffers[10].id,
      mockOffers[11].id
    ],
    'type': TYPES[8]
  }
];

const getRandomPoint = () => (getRandomArrayElement(mockPoints));

export {mockPoints, mockOffers, mockDestination, offersByTypes, getRandomPoint};

