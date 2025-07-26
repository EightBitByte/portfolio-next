export default function ThemeBox({
  theme,
  colors,
}: {
  theme: string,
  colors: string[],
}) {
  return (
    <div className={`grid grid-cols-2 grid-rows-2 gap-1 ${theme.toLowerCase()}`}>
      {colors.map((color) =>
        <div
          key={color}
          style={{ backgroundColor: `var(--${color})` }}
          className={`w-4 h-4 rounded-sm ${theme.toLowerCase()}`}
        />
      )}
    </div>
  )
}