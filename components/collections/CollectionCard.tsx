import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import TagChip from "@/components/common/TagChip";
import { Collection } from "@/types/collection";
import { AlertDeleteDialog } from "@/components/common/DeleteDialog";

interface Props {
    data: Collection;
    onDelete: () => void;
}

export default function CollectionCard({ data, onDelete }: Props) {
    return (
        <Card className="border border-amber-100 hover:border-amber-300 transition-shadow shadow-sm h-full flex flex-col">
            <CardHeader className="flex justify-between flex-row items-start space-y-0 pb-2">
                <div>
                    <CardTitle className="font-bold text-xl">{data.title}</CardTitle>
                    {data.description && (
                        <CardDescription className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {data.description}
                        </CardDescription>
                    )}
                </div>
                <Badge variant="outline" className="text-[11px] ml-2 shrink-0">
                    {data.promptCount} prompts
                </Badge>
            </CardHeader>

            <CardContent className="flex-1 mt-2">
                {data.previews.length > 0 ? (
                    <div className="space-y-3">
                        {data.previews.slice(0, 3).map((prompt, idx) => (
                            <div key={prompt.id || idx}>
                                <div className="border border-border rounded-md p-2 bg-muted/10">
                                    <h2 className="text-sm font-medium line-clamp-1">{prompt.title}</h2>
                                    <div className="mt-1 flex flex-wrap gap-1">
                                        {prompt.tags.slice(0, 3).map((tag, tIdx) => (
                                            <TagChip
                                                key={tIdx}
                                                label={typeof tag === 'string' ? tag : tag.label}
                                                colorKey={typeof tag === 'string' ? 'blue' : tag.color}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {data.promptCount > data.previews.length && (
                            <p className="text-[11px] text-muted-foreground text-center">
                                + {data.promptCount - data.previews.length} more prompts
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="h-20 flex items-center justify-center text-xs text-muted-foreground border border-dashed rounded-md">
                        No prompts yet
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex items-center justify-between text-xs pt-4 border-t mt-auto">
                <button className="text-amber-600 hover:underline font-medium">
                    View collection
                </button>

                <div className="flex gap-3 text-muted-foreground">
                    <button className="hover:text-amber-500 transition-colors">Rename</button>
                    <AlertDeleteDialog
                        type="Collection"
                        title={data.title}
                        onConfirm={onDelete}
                        trigger={
                            <button className="text-red-500 hover:text-red-600 transition-colors">
                                Delete
                            </button>
                        }
                    />
                </div>
            </CardFooter>
        </Card>
    );
}