export default function ThemeBox({
  colors
}: {
  colors: string[]
}) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-1">
      {colors.map((color) =>
        <div
          key={color}
          style={{ backgroundColor: `var(--color-${color})` }}
          className="w-4 h-4 rounded-sm"
        />
      )}
    </div>
  )
}