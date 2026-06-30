interface Props {
  title: string
  subtitle?: string
}

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-4">
      <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
        {subtitle}
      </div>

      <h2 className="text-2xl font-black text-slate-100 mt-1">
        {title}
      </h2>
    </div>
  )
}