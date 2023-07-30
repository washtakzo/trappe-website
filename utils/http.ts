const API_BASE_URL = process.env.API_BASE_URL;
const API_TRAPPES_URL = API_BASE_URL + "trappes/";

export function getAllTrappes() {
  return fetch(API_TRAPPES_URL);
}
