interface BasketballIconProps {
  className?: string
  size?: number
}

export function BasketballIcon({ className = '', size = 40 }: BasketballIconProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: 'oklch(0.70 0.18 45)',
      }}
      aria-hidden
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="17" cy="17" r="15" stroke="rgba(0,0,0,0.35)" strokeWidth="2" fill="none" />
        <path d="M17 2 C17 2 17 32 17 32" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
        <path d="M2 17 C2 17 32 17 32 17" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
        <path d="M5 6 C10 12 10 22 5 28" stroke="rgba(0,0,0,0.35)" strokeWidth="2" fill="none" />
        <path d="M29 6 C24 12 24 22 29 28" stroke="rgba(0,0,0,0.35)" strokeWidth="2" fill="none" />
      </svg>
    </div>
  )
}
