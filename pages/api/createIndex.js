import { createIndex } from '../../lib/redis'

const handler = async (req, res) => {
  console.log('handler createIndex trying to create index...')
  await createIndex();
  res.status(200).send('createIndex success!')
}

export default handler