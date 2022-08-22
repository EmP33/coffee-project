import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
});

const getURLForCoffeeStores = (
  latLong: string,
  query: string,
  limit: number
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getUnsplashPhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });
  return photos.response?.results.map((res) => res.urls["small"]);
};

export const fetchCoffeeStores = async () => {
  const photos = await getUnsplashPhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const data = await (
    await fetch(
      getURLForCoffeeStores(
        "40.733749223985704%2C-74.05012276809782",
        "coffee",
        6
      ),
      options
    )
  ).json();
  return data.results.map((res: any, i: number) => {
    const neighborhood = res.location.neighborhood;
    return {
      id: res.fsq_id,
      address: res.location.address,
      name: res.name,
      neighborhood: neighborhood.length > 0 ? neighborhood[0] : "",
      imgUrl: photos.length > 0 ? photos[i] : null,
    };
  });
};
