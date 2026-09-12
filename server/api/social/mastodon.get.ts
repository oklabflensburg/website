import { site } from '../../../shared/config/site'
import { createMastodonFeed } from '../../utils/mastodon'

let feed: ReturnType<typeof createMastodonFeed> | undefined

export default defineEventHandler(() => {
  if (!feed) {
    const config = useRuntimeConfig()
    feed = createMastodonFeed({
      profileUrl: site.social.mastodon,
      baseUrl: config.mastodonBaseUrl,
      accountId: config.mastodonAccountId,
    })
  }
  return feed()
})
