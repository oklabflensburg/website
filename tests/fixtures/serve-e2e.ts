// A local upstream fixture exercises Nitro's real fetch/mapper/cache during SSR.
// It is launched only by Playwright; no test modes ship in the application.
import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { mastodonStatuses } from './mastodon.ts'

const upstream = createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json')
  if (request.url?.startsWith('/api/v1/accounts/lookup?')) response.end(JSON.stringify({ id: '42' }))
  else if (request.url?.startsWith('/api/v1/accounts/42/statuses?')) response.end(JSON.stringify(mastodonStatuses))
  else { response.statusCode = 404; response.end('{}') }
})
upstream.listen(0, '127.0.0.1')
await once(upstream, 'listening')
const address = upstream.address()
if (!address || typeof address === 'string') throw new Error('Missing fixture address')
const server = spawn(process.execPath, ['.output/server/index.mjs'], {
  stdio: 'inherit', env: { ...process.env, NUXT_MASTODON_BASE_URL: `http://127.0.0.1:${address.port}`, NUXT_MASTODON_ACCOUNT_ID: '' },
})
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.on(signal, () => server.kill(signal))
server.on('exit', (code) => { upstream.close(); process.exitCode = code ?? 0 })
