"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptGroup {
  id: string;
  name: string;
}

interface Prompt {
  id: string;
  title: string;
  content: string;
  groupId: string | null; // null = ungrouped
}

type GroupFilter = "all" | "ungrouped" | string; // or groupId

const INITIAL_GROUPS: PromptGroup[] = [
  { id: "g1", name: "Content" },
];

const INITIAL_PROMPTS: Prompt[] = [
  {
    id: "p1",
    title: "Twitter thread helper",
    content: "Help me write a twitter thread about...",
    groupId: null,
  },
  {
    id: "p2",
    title: "Landing page copy",
    content: "You are a copywriter. Write landing page copy for...",
    groupId: "g1",
  },
];

export function DashboardHomeClient() {
  const [groups, setGroups] = useState<PromptGroup[]>(INITIAL_GROUPS);
  const [prompts, setPrompts] = useState<Prompt[]>(INITIAL_PROMPTS);

  const [filter, setFilter] = useState<GroupFilter>("all");
  const [search, setSearch] = useState("");

  const [newGroupName, setNewGroupName] = useState("");
  const [newPromptTitle, setNewPromptTitle] = useState("");
  const [newPromptContent, setNewPromptContent] = useState("");
  const [newPromptGroupId, setNewPromptGroupId] = useState<string>("ungrouped");

  const hasGroups = groups.length > 0;
  const hasPrompts = prompts.length > 0;

  // filter prompts by group + search
  const visiblePrompts = prompts.filter((p) => {
    if (filter === "ungrouped" && p.groupId !== null) return false;
    if (filter !== "all" && filter !== "ungrouped" && p.groupId !== filter)
      return false;

    if (!search.trim()) return true;

    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
    );
  });

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;

    const id = `g-${Date.now()}`;
    const group: PromptGroup = {
      id,
      name: newGroupName.trim(),
    };

    setGroups((prev) => [...prev, group]);
    setNewGroupName("");
    setFilter(id); // langsung fokus ke group baru
  };

  const handleCreatePrompt = () => {
    if (!newPromptTitle.trim() || !newPromptContent.trim()) return;

    const id = `p-${Date.now()}`;
    const prompt: Prompt = {
      id,
      title: newPromptTitle.trim(),
      content: newPromptContent.trim(),
      groupId:
        newPromptGroupId === "ungrouped" ? null : newPromptGroupId,
    };

    setPrompts((prev) => [...prev, prompt]);
    setNewPromptTitle("");
    setNewPromptContent("");
    // kalau pilih group, otomatis filter ke sana, kalau tidak, ke "all"
    setFilter(
      newPromptGroupId === "ungrouped" ? "all" : newPromptGroupId
    );
    setNewPromptGroupId("ungrouped");
  };

  const handleChangePromptGroup = (promptId: string, value: string) => {
    setPrompts((prev) =>
      prev.map((p) =>
        p.id === promptId
          ? { ...p, groupId: value === "ungrouped" ? null : value }
          : p
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Top: search + actions */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Input
            placeholder="Search your prompts..."
            className="pl-10 h-11 text-[15px] bg-white border-slate-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="flex gap-2">
          <NewGroupDialog
            groups={groups}
            newGroupName={newGroupName}
            setNewGroupName={setNewGroupName}
            onCreateGroup={handleCreateGroup}
          />
          <NewPromptDialog
            groups={groups}
            newPromptTitle={newPromptTitle}
            setNewPromptTitle={setNewPromptTitle}
            newPromptContent={newPromptContent}
            setNewPromptContent={setNewPromptContent}
            newPromptGroupId={newPromptGroupId}
            setNewPromptGroupId={setNewPromptGroupId}
            onCreatePrompt={handleCreatePrompt}
          />
        </div>
      </div>

      {/* Main content */}
      {!hasPrompts && !hasGroups ? (
        <EmptyStateFull />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px,minmax(0,1fr)] mt-2">
          {/* Left: groups */}
          <div>
            <h2 className="mb-2 text-sm font-semibold text-slate-800">
              Groups
            </h2>

            <Card className="border-slate-200 bg-white">
              <CardContent className="p-3">
                <div className="space-y-1 text-sm">
                  <FilterButton
                    label="All prompts"
                    active={filter === "all"}
                    onClick={() => setFilter("all")}
                  />
                  <FilterButton
                    label="Ungrouped"
                    active={filter === "ungrouped"}
                    onClick={() => setFilter("ungrouped")}
                  />

                  <div className="mt-2 h-px bg-slate-200" />

                  {!hasGroups ? (
                    <p className="mt-2 text-xs text-slate-500">
                      No groups yet. Create one to organize your prompts.
                    </p>
                  ) : (
                    <ScrollArea className="max-h-[260px] pr-2 mt-1">
                      <div className="space-y-1">
                        {groups.map((g) => (
                          <FilterButton
                            key={g.id}
                            label={g.name}
                            active={filter === g.id}
                            onClick={() => setFilter(g.id)}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: prompts */}
          <div>
            <h2 className="mb-2 text-sm font-semibold text-slate-800">
              Prompts
            </h2>

            <Card className="border-slate-200 bg-white">
              <CardContent className="p-3">
                {visiblePrompts.length === 0 ? (
                  <EmptyStateSmall />
                ) : (
                  <ScrollArea className="max-h-[420px] pr-2">
                    <div className="space-y-3">
                      {visiblePrompts.map((p) => (
                        <Card
                          key={p.id}
                          className="border-slate-200 shadow-none"
                        >
                          <CardContent className="p-3 flex flex-col gap-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-medium text-slate-900">
                                  {p.title}
                                </p>
                                <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                                  {p.content}
                                </p>
                              </div>

                              <Select
                                value={p.groupId ?? "ungrouped"}
                                onValueChange={(val) =>
                                  handleChangePromptGroup(p.id, val)
                                }
                              >
                                <SelectTrigger className="h-8 w-[140px] text-xs">
                                  <SelectValue placeholder="Group" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ungrouped">
                                    Ungrouped
                                  </SelectItem>
                                  {groups.map((g) => (
                                    <SelectItem key={g.id} value={g.id}>
                                      {g.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------- small components ------- */

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-md px-2 py-1.5 text-left text-xs transition",
        active
          ? "bg-slate-900 text-white"
          : "text-slate-700 hover:bg-slate-100"
      )}
    >
      {label}
    </button>
  );
}

function EmptyStateFull() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl bg-slate-50 text-center">
      <p className="text-lg font-semibold text-slate-900 mb-1">
        You don&apos;t have anything yet
      </p>
      <p className="text-sm text-slate-500 mb-4">
        Start by creating a prompt or a group to organize your ideas.
      </p>
      <div className="flex gap-3">
        <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
          New Prompt
        </Button>
        <Button variant="outline">New Group</Button>
      </div>
    </div>
  );
}

function EmptyStateSmall() {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center text-center text-sm text-slate-500">
      <p className="font-medium text-slate-700 mb-1">
        No prompts match this view
      </p>
      <p className="text-xs">
        Try changing the filter or create a new prompt.
      </p>
    </div>
  );
}

/* ------- dialogs ------- */

type NewGroupDialogProps = {
  groups: PromptGroup[];
  newGroupName: string;
  setNewGroupName: (val: string) => void;
  onCreateGroup: () => void;
};

function NewGroupDialog({
  newGroupName,
  setNewGroupName,
  onCreateGroup,
}: NewGroupDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!newGroupName.trim()) return;
    onCreateGroup();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white"
        >
          New Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create group</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="space-y-1">
            <Label htmlFor="group-name">Group name</Label>
            <Input
              id="group-name"
              placeholder="e.g. Content, Coding, Ideas"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type NewPromptDialogProps = {
  groups: PromptGroup[];
  newPromptTitle: string;
  setNewPromptTitle: (val: string) => void;
  newPromptContent: string;
  setNewPromptContent: (val: string) => void;
  newPromptGroupId: string;
  setNewPromptGroupId: (val: string) => void;
  onCreatePrompt: () => void;
};

function NewPromptDialog({
  groups,
  newPromptTitle,
  setNewPromptTitle,
  newPromptContent,
  setNewPromptContent,
  newPromptGroupId,
  setNewPromptGroupId,
  onCreatePrompt,
}: NewPromptDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!newPromptTitle.trim() || !newPromptContent.trim()) return;
    onCreatePrompt();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
          New Prompt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create prompt</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="space-y-1">
            <Label htmlFor="prompt-title">Title</Label>
            <Input
              id="prompt-title"
              placeholder="e.g. Blog outline, Twitter thread..."
              value={newPromptTitle}
              onChange={(e) => setNewPromptTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="prompt-content">Prompt</Label>
            <textarea
              id="prompt-content"
              className="min-h-[140px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              placeholder="Write the full prompt you want to reuse..."
              value={newPromptContent}
              onChange={(e) => setNewPromptContent(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Group (optional)</Label>
            <Select
              value={newPromptGroupId}
              onValueChange={setNewPromptGroupId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Ungrouped" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ungrouped">Ungrouped</SelectItem>
                {groups.map((g) => (
                  <SelectItem key={g.id} value={g.id}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
