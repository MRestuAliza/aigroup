import { Card } from "@/components/ui/card";
import TagChip from './TagChip';
import { PromptCardProps } from '@/types/prompt';

export default function PromptCard({title, description, tags}: PromptCardProps) {
  return (
    <div>
        <Card className="p-5">
            <div>
                <h2 className="font-bold text-xl">{title}</h2>
                <p>{description}</p>
                <div>
                    {tags.map((tag, index) => (
                      <TagChip key={index} label={tag.label} colorKey={tag.color} />
                    ))}
                </div>

                <div>
                  
                </div>
            </div>
        </Card>
    </div>
  )
}
