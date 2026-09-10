import { site } from '../config/site'

/** Next regular occurrence. Berlin's Wednesday never crosses a DST transition. */
export function nextMeeting(now: Date) {
  const config = site.meeting
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: config.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const part = (key: string) =>
    Number(parts.find((item) => item.type === key)?.value)
  const day = new Date(Date.UTC(part('year'), part('month') - 1, part('day')))
  const delta = (config.weekday - day.getUTCDay() + 7) % 7
  day.setUTCDate(day.getUTCDate() + delta)
  function atTime(time: string) {
    const [hour = 0, minute = 0] = time.split(':').map(Number)
    const candidate = new Date(day)
    candidate.setUTCHours(hour, minute)
    const offset =
      new Intl.DateTimeFormat('en', {
        timeZone: config.timezone,
        timeZoneName: 'longOffset',
      })
        .formatToParts(candidate)
        .find((item) => item.type === 'timeZoneName')?.value ?? 'GMT+01:00'
    return new Date(
      `${candidate.toISOString().slice(0, 10)}T${time}:00${offset.replace('GMT', '')}`,
    )
  }
  if (atTime(config.end).getTime() <= now.getTime())
    day.setUTCDate(day.getUTCDate() + 7)
  return {
    start: atTime(config.start).toISOString(),
    end: atTime(config.end).toISOString(),
  }
}
