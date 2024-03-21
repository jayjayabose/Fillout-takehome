import logger from "./logger";

const BASE_URL = process.env.BASE_URL || null;
const RESOURCE_PATH = process.env.RESOURCE_PATH || null;
const API_KEY = process.env.API_KEY || null;

let apiUrlAndPath: string;

if (BASE_URL && RESOURCE_PATH) {
  apiUrlAndPath = BASE_URL + RESOURCE_PATH;
} else {
  logger.error('One or envioronment variables are null. Check your .env file.');
}

export { apiUrlAndPath, API_KEY };