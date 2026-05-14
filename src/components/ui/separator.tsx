export function Separator({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-slate-800/80 ${className}`} />;
}
