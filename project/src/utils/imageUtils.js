// Array of Indian face images for different genders
const indianFaces = {
  male: [
    'https://randomuser.me/api/portraits/men/71.jpg',
    'https://randomuser.me/api/portraits/men/72.jpg',
    'https://randomuser.me/api/portraits/men/73.jpg',
    'https://randomuser.me/api/portraits/men/74.jpg',
    'https://randomuser.me/api/portraits/men/75.jpg'
  ],
  female: [
    'https://randomuser.me/api/portraits/women/71.jpg',
    'https://randomuser.me/api/portraits/women/72.jpg',
    'https://randomuser.me/api/portraits/women/73.jpg',
    'https://randomuser.me/api/portraits/women/74.jpg',
    'https://randomuser.me/api/portraits/women/75.jpg'
  ]
};

export function getRandomIndianFace(gender) {
  const faces = indianFaces[gender.toLowerCase()];
  return faces[Math.floor(Math.random() * faces.length)];
}