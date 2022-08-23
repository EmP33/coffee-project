import { NextApiRequest, NextApiResponse } from "next";
import { fetchCoffeeStores } from "../../lib/coffee-stores";

interface Data {
  latLong?: string;
  limit?: string;
  message?: string;
}

const getCoffeeStoresByLocation = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, limit);
    res.status(200);
    res.json(response);
  } catch (err) {
    console.error("There is an error", err);
    res.status(500);
    res.json({ message: `Oh no! Something went wrong ${err}` });
  }
};

export default getCoffeeStoresByLocation;
