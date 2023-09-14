import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";

// Generate random name for member
export const randomName = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    length: 2,
    separator: " ",
  });

// Generate random color for member
export const randomColor = () => {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
};