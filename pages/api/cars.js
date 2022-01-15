import { createCar } from "../../lib/redis";

export default async function handler(req, res) {
  console.log('in cars.js req.body:', req.body);
  const id = await createCar(req.body);
  console.log('this is createCar result', id);
  res.status(200).json({ id })
}