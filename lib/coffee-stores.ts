import { createApi } from "unsplash-js";
const unsplash = createApi({
  accessKey: "YnG-NDQyK2KGGtcctQt8ZSMvVW_8EvdgJ3_rxs5HT_Y",
});

const getURLForCoffeeStores = (
  latLong: string,
  query: string,
  limit: number
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const getUnsplashPhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });
  return photos.response?.results.map((res) => res.urls["small"]);
};

export const fetchCoffeeStores = async (
  latLong: string = "40.733749223985704%2C-74.05012276809782",
  limit: number = 6
) => {
  const photos = await getUnsplashPhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq34IcrGmxp+1ZQnl/suODH1maN2QThuBfq/ZDinvpsApQ=",
    },
  };

  const data = await (
    await fetch(getURLForCoffeeStores(latLong, "coffee", limit), options)
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
