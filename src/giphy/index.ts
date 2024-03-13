import 'dotenv/config';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { generateRandomInt } from '@/utils/utils';

const { GIPHY_API_KEY } = process.env;

if (!GIPHY_API_KEY) {
  throw new Error('Provide giphy api key in enviroment variables.');
}

const gf = new GiphyFetch(GIPHY_API_KEY);

export async function getGif(searchWord: string) {
  const { data } = await gf.search(searchWord, {
    limit: 1,
    offset: generateRandomInt(0, 1000),
  });

  return data[0].images.original.url;
}
