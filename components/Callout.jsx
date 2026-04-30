const TONE_DEFAULT_ICON = {
  gray: '💬',
  blue: '💡',
  yellow: '⚠️',
  red: '🚫',
  green: '✅',
}

export function Callout({ tone = 'gray', icon, children }) {
  const className = `notion-callout notion-callout--${tone}`
  const displayIcon = icon ?? TONE_DEFAULT_ICON[tone] ?? '💡'

  return (
    <div className={className} role="note">
      <span className="notion-callout__icon" aria-hidden="true">
        {displayIcon}
      </span>
      <div className="notion-callout__body">{children}</div>
    </div>
  )
}
