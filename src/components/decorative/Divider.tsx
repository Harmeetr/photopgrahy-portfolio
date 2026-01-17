export default function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="w-12 h-px bg-accent/20" />
      <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
      <div className="w-12 h-px bg-accent/20" />
    </div>
  )
}
