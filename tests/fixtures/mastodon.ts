// Fictional statuses used only by tests, never published as editorial Content.
export function mastodonStatus(id = '123', overrides: Record<string, unknown> = {}) {
  return {
    id, url: `https://norden.social/@oklabflensburg/${id}`,
    created_at: '2026-09-01T10:30:00Z',
    content: '<p>Open data &amp; community.</p><p>Visit <a href="https://example.org" onclick="alert(1)">our project</a>.<br>Everyone welcome.</p><script>attack()</script><img src="https://example.org/tracker" onerror="attack()">',
    spoiler_text: '', sensitive: false, language: 'en', visibility: 'public',
    in_reply_to_id: null, in_reply_to_account_id: null, reblog: null,
    ...overrides,
  }
}
export const mastodonStatuses = [
  mastodonStatus('125', { created_at: '2026-09-03T10:30:00Z' }),
  mastodonStatus('124', { created_at: '2026-09-02T10:30:00Z', spoiler_text: 'Discussion of sensitive topics', sensitive: true }),
  mastodonStatus(),
  mastodonStatus('122', { in_reply_to_id: '100' }),
  mastodonStatus('121', { reblog: { id: '99' } }),
  mastodonStatus('120', { visibility: 'unlisted' }),
]
