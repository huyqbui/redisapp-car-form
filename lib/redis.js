import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
    console.log('-------attempting to open client-------');
  }
}

// Entity is like a db table

class Car extends Entity {}

// create a car schema
let schema = new Schema(
  Car,
  {
    make: { type: 'string' },
    model: { type: 'string' },
    image: { type: 'string' },
    year: { type: 'string' },
    description: { type: 'string', textSearch: true },
  },
  {
    dataStructure: 'JSON',
  }
);

// each entity is managed by the Repository class, which saves and retrieves individual documents
export async function createCar(data) {
  await connect();

  const repository = new Repository(schema, client);
  const car = repository.createEntity(data);
  const id = await repository.save(car);
  console.log('creating car in repository:', id);
  return id;
}

// create index in Repository, only done one time
export async function createIndex() {
  await connect();
  const repository = new Repository(schema, client);
  await repository.createIndex();
}

export async function searchCars(query) {
  await connect();

  const repository = new Repository(schema, client);
  const cars = await repository
    .search()
    .where('make')
    .eq(query)
    .or('model')
    .eq(query)
    .or('year')
    .eq(query)
    .or('description')
    .matches(query)
    .return.all();

  return cars;
}
