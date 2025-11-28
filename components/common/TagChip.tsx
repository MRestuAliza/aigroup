import type { TagChipProps, TagColorKey } from '@/types/tag';

export default function TagChip({ label, colorKey }: TagChipProps) {
    const tagColors: Record<TagColorKey, string> = {
    green: "bg-emerald-100 text-emerald-800",
    blue: "bg-sky-100 text-sky-800",
    pink: "bg-pink-100 text-pink-800",
    purple: "bg-purple-100 text-purple-800",
    yellow: "bg-amber-100 text-amber-800",
  };
  const className = tagColors[colorKey];
  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${className}`}>
      {label}
    </span>
  );
}
