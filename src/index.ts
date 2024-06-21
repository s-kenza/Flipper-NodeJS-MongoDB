import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {DbConnect} from './db'

import flippers from './routes/flippers'

const app = new Hono()
await DbConnect()

const port = 3000
console.log(`Server is running on port ${port}`)

app.route('/api', flippers)

serve({
  fetch: app.fetch,
  port
})
