import { getPayload } from 'payload'
import config from './src/payload.config.js'

async function debug() {
  try {
    console.log('Initializing Payload...')
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    console.log('Fetching page 4...')
    const page = await payload.findByID({
      collection: 'pages',
      id: 4,
      depth: 0,
    })

    console.log('Fetched page data:', JSON.stringify(page, null, 2))

    console.log('Updating page 4 with its own data...')
    const { id, ...dataToUpdate } = page
    const result = await payload.update({
      collection: 'pages',
      id: 4,
      data: dataToUpdate,
    })
    console.log('Update success!', result)
  } catch (error: any) {
    console.error('Update failed with error:')
    console.error(error)
    if (error.data) {
      console.error('Error data:', JSON.stringify(error.data, null, 2))
    }
  }
  process.exit(0)
}

debug()
