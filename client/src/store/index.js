import { proxy } from 'valtio';

const state = proxy({
  intro: true, // Start with the intro page
  activeItem: 'shirt', // The item currently being customized
  items: {
    shirt: {
      color: '#EFBD48',
      isLogoTexture: true,
      isFullTexture: false,
      logoDecal: './threejs.png',
      fullDecal: './threejs.png',
    },
    shirt2: {
      color: '#58A4B0',
      isLogoTexture: true,
      isFullTexture: false,
      logoDecal: './react.png',
      fullDecal: './react.png',
    },
    hoodie: {
        color: '#383838',
        isLogoTexture: true,
        isFullTexture: false,
        logoDecal: './threejs.png',
        fullDecal: './vite.svg',
    }
  },
});

export default state;