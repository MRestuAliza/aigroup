import { Card } from "@/components/ui/card";
import TagChip from './TagChip';
import { PromptCardProps } from '@/types/prompt';
import { Copy, Pencil, Trash2 } from "lucide-react";

export default function PromptCard({ title, description, tags }: PromptCardProps) {
  return (
    <div>
      <Card className="w-full p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4 border border-border shadow-sm hover:border-amber-300 transition">
        <div>
          <h2 className="font-bold text-xl">{title}</h2>
          <p className="text-muted-foreground mb-3 line-clamp-3">{description}</p>
          <div className="space-x-2">
            {tags.map((tag, index) => (
              <TagChip key={index} label={tag.label} colorKey={tag.color} />
            ))}
          </div>
        </div>
        <div className="flex gap-3 justify-end text-muted-foreground">
          <button
            type="button"
            title="Copy"
            className="hover:text-amber-500 transition"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Edit"
            className="hover:text-amber-500 transition"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Delete"
            className="hover:text-amber-500 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </div>
  )
}
