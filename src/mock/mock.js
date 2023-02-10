import { getRandomArrayElement, randomInt, getRandomArrayElements } from '../utils/common.js';
import { POINT_TYPES } from '../const.js';
import { nanoid } from 'nanoid';

const POINT_MIN_BASE_PRICE = 0;
const POINT_MAX_BASE_PRICE = 5000;
const POINTS_COUNT = 5;
const DESTINATION_MIN_PHOTOS_COUNT = 0;
const DESTINATION_MAX_PHOTOS_COUNT = 5;
const TIME_OFFSET = 60 * 60 * 24 * 3 * 1000;
const DESCRIPTION_SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const randomPicSrc = () => `https://loremflickr.com/248/152?random=${Math.random()}`;

function generateDestinationPictures() {
  return Array.from(
    {length: randomInt(DESTINATION_MIN_PHOTOS_COUNT, DESTINATION_MAX_PHOTOS_COUNT) },
    () => ({
      src: randomPicSrc(),
      description: getRandomArrayElements(DESCRIPTION_SENTENCES)
    })
  );
}


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

const mockOffersByType = [
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

const mockDestinations = [
  {
    id: 1,
    description: getRandomArrayElements(DESCRIPTION_SENTENCES),
    name: 'Chamonix',
    pictures: generateDestinationPictures()
  },
  {
    id: 2,
    description: getRandomArrayElements(DESCRIPTION_SENTENCES),
    name: 'Geneva',
    pictures: generateDestinationPictures()
  },
  {
    id: 3,
    description: getRandomArrayElements(DESCRIPTION_SENTENCES),
    name: 'Amsterdam',
    pictures: generateDestinationPictures()
  }
];


const makeRandomPoint = () => {
  const date = +(new Date());
  const dateFrom = new Date(date + randomInt(-TIME_OFFSET, TIME_OFFSET));
  const dateTo = new Date(+dateFrom + randomInt(-TIME_OFFSET, TIME_OFFSET));
  const id = nanoid();
  const pointType = getRandomArrayElement(POINT_TYPES);
  const selectedOffers = mockOffersByType.find( ({type}) => type === pointType);
  const randomOffers = (selectedOffers) ? getRandomArrayElements(selectedOffers?.offers || []) : [];
  const randomOfferIDs = randomOffers.map((offer) => offer.id);
  return {
    id,
    basePrice: randomInt(POINT_MIN_BASE_PRICE, POINT_MAX_BASE_PRICE),
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString(),
    destination: getRandomArrayElement(mockDestinations).id,
    offers: randomOfferIDs,
    type: pointType
  };
};

const mockPoints = Array.from({length: randomInt(0, POINTS_COUNT)}, makeRandomPoint);

export {mockOffers, mockDestinations, mockOffersByType, mockPoints};

