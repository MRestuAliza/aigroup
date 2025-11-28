"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Pencil, Trash2, Check } from "lucide-react";
import type { PromptCardProps } from "@/types/prompt";
import { toast } from "sonner";
import { AlertDeleteDialog } from "@/components/common/DeleteDialog";

const getColorClasses = (color: string) => {
  switch (color) {
    case "green": return "bg-green-100 text-green-700 hover:bg-green-200";
    case "blue": return "bg-blue-100 text-blue-700 hover:bg-blue-200";
    case "pink": return "bg-pink-100 text-pink-700 hover:bg-pink-200";
    case "purple": return "bg-purple-100 text-purple-700 hover:bg-purple-200";
    case "yellow": return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
    default: return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  }
};

export default function PromptCard({ data, onEdit, onDelete }: PromptCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = async () => {
    try {
      if (!data.prompt) return;
      await navigator.clipboard.writeText(data.prompt);
      setIsCopied(true);
      toast.success("Prompt copied to clipboard!");

      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  return (
    <Card className="w-full p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4 border border-border shadow-sm hover:border-amber-300 transition group">
      <div className="space-y-3">
        <div>
          <h2 className="font-bold text-xl text-foreground">{data.title}</h2>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {data.description || "No description provided."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.tags.length > 0 ? (
            data.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className={`${getColorClasses(tag.color)} border-0`} >
                {tag.label}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-muted-foreground italic">No tags</span>
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-end text-muted-foreground ">
        <button type="button" className="p-2 hover:bg-amber-100 hover:text-amber-600 text-amber-600 rounded-full transition" onClick={onCopy}>
          {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
        </button>
        <button className="p-2 hover:bg-amber-200 hover:text-[#101827] text-[#fab900] rounded-full transition" onClick={() => onEdit(data)}><Pencil className="w-4 h-4" /></button>
        <AlertDeleteDialog
          type="Prompt"
          title={data.title}
          onConfirm={onDelete}
          trigger={
            <button className="p-2 hover:bg-red-50 text-red-500 rounded-full transition">
              <Trash2 className="w-4 h-4" />
            </button>
          }
        />
      </div>
    </Card>
  );
}