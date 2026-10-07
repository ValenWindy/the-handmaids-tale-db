export default function Select({ label, value, onChange, children }) {
  return (
    <label className="flex flex-col gap-1 text-xs uppercase tracking-widest text-muted">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-line bg-panel px-3 py-2 text-sm normal-case tracking-normal text-bone focus:border-gilead focus:outline-none"
      >
        {children}
      </select>
    </label>
  )
}
