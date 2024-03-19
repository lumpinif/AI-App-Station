const Button = ({
  text,
  secondaryText,
  color = "#070707",
}: {
  text: string
  secondaryText?: string
  color?: string
}) => {
  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className="flex max-w-fit items-center gap-2 rounded-lg px-3 py-1 text-sm font-medium text-white"
    >
      <span>{text}</span>
      {secondaryText ? (
        <span className="font-light text-neutral-200">{secondaryText}</span>
      ) : (
        ""
      )}
    </div>
  )
}

export default Button
