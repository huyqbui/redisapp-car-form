import { searchCars } from "../../lib/redis";

export default async function handler(req, res) {
  // grab query from search url query
  const { q } = req.query
  // return the response which will be an array
  const cars = await searchCars(q);
  // console.log(`found cars in searchJS: ${cars}`)
  res.status(200).json( { cars });
}