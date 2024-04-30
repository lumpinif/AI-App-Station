const bars = Array(12).fill(0)

type LoadingSpinnerProps = { size?: number }

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 20,
}) => {
  return (
    <div
      className="relative h-[var(--spinner-size)] w-[var(--spinner-size)]"
      style={
        {
          ["--spinner-size"]: `${size}px`,
        } as React.CSSProperties
      }
    >
      <div className="absolute left-1/2 top-1/2 h-[var(--spinner-size)] w-[var(--spinner-size)]">
        {bars.map((_, i) => (
          <div
            className={`animate-spinner bg-muted-foreground absolute left-[-10%] top-[-3.9%] h-[8%] w-[24%] rounded-md`}
            key={`spinner-bar-${i}`}
            style={{
              animationDelay: `-${1.2 - i * 0.1}s`,
              transform: `rotate(${i * 30}deg) translate(146%)`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
