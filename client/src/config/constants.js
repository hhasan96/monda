import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

// The tabs at the bottom of the screen are for selecting the item
export const FilterTabs = [
  {
    name: "logoTexture",
    icon: logoShirt,
  },
  {
    name: "fullTexture",
    icon: stylishShirt,
  },
];

export const ItemTabs = [
  {
    name: "shirt",
    icon: logoShirt,
  },
  {
    name: "shirt2",
    icon: stylishShirt,
  },
  {
    name: "hoodie",
    icon: logoShirt, // You can replace this with a specific hoodie icon
  },
];

// Defines the types of decals and their corresponding state properties
export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoTexture",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "fullTexture",
  },
};
