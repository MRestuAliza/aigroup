"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Rocket,
  Settings,
  User,
  KeyRound,
  Bell,
  Rows,
  Grid3X3,
  Copy,
  Pencil,
  Trash2,
  Folder,
  ChevronDown,
  ChevronRight,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

type TagColorKey = "green" | "blue" | "pink" | "purple" | "yellow";

interface Tag {
  label: string;
  color: TagColorKey;
}

interface TagChipProps {
  label: string;
  colorKey: TagColorKey;
}

function TagChip({ label, colorKey }: TagChipProps) {
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

interface PromptCardProps {
  title: string;
  description: string;
  tags: Tag[];
  usageRate: string;
}

function PromptCard({ title, description, tags, usageRate }: PromptCardProps) {
  return (
    <Card className="w-full p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4 border border-border shadow-sm hover:border-amber-300 transition">
      {/* Left: Title, Description, Tags */}
      <div className="flex-1 md:mr-4">
        <h2 className="font-bold text-xl text-foreground mb-1">{title}</h2>
        <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <TagChip key={index} label={tag.label} colorKey={tag.color} />
          ))}
        </div>
      </div>

      {/* Right: Usage + Actions */}
      <div className="flex flex-row md:flex-col items-center md:items-end gap-3">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10">
          <span className="text-lg font-bold text-emerald-600">
            {usageRate}
          </span>
        </div>

        <div className="flex gap-3 text-muted-foreground">
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
      </div>
    </Card>
  );
}

interface NavItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
}

interface Collection {
  name: string;
  count: number;
}

interface SidebarProps {
  collapsed: boolean;
}

function Sidebar({ collapsed }: SidebarProps) {
  const navItems: NavItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, active: false },
    { name: "Prompts", icon: Rocket, active: true },
    { name: "Settings", icon: Settings, active: false },
    { name: "Profile", icon: User, active: false },
  ];

  const secondaryItems: NavItem[] = [
    { name: "API Keys", icon: KeyRound },
    { name: "Notification", icon: Bell },
  ];

  const collections: Collection[] = [
    { name: "All Prompts", count: 32 },
    { name: "Marketing", count: 12 },
    { name: "Coding", count: 8 },
    { name: "Personal", count: 5 },
  ];

  const [collectionsOpen, setCollectionsOpen] = useState(true);

  return (
    <aside
      className={`hidden md:flex bg-background border-r border-border shadow-sm flex-shrink-0 h-screen sticky top-0 transition-all duration-200 ${
        collapsed ? "w-[70px]" : "w-64"
      }`}
    >
      <div className="h-full flex flex-col justify-between p-4 w-full">
        <div>
          {/* Logo area mini */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-7 w-7 rounded-md bg-amber-500 text-background flex items-center justify-center text-xs font-bold">
              PK
            </div>
            {!collapsed && (
              <span className="font-semibold text-sm text-amber-700">
                Prompt workspace
              </span>
            )}
          </div>

          {/* Primary Nav */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.active;
              return (
                <button
                  key={item.name}
                  type="button"
                  className={`w-full flex items-center text-left px-3 py-2 rounded-lg text-sm transition ${
                    isActive
                      ? "bg-amber-100 text-amber-700 font-semibold"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {!collapsed && (
                    <span className="ml-3 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Secondary Nav */}
          <div className="mt-6 pt-4 border-t border-border space-y-2">
            {secondaryItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  type="button"
                  className="w-full flex items-center text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition"
                >
                  <Icon className="w-4 h-4" />
                  {!collapsed && (
                    <span className="ml-3 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Collections */}
          <div className="mt-6 pt-4 border-t border-border">
            <button
              type="button"
              className="flex w-full items-center justify-between px-1 pb-2 text-xs font-semibold text-muted-foreground cursor-pointer select-none"
              onClick={() => setCollectionsOpen((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-amber-500" />
                {!collapsed && <span>Collections</span>}
              </div>
              {!collapsed &&
                (collectionsOpen ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                ))}
            </button>

            {collectionsOpen && !collapsed && (
              <div className="space-y-1 mt-1">
                {collections.map((collection) => (
                  <button
                    key={collection.name}
                    type="button"
                    className="w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted transition"
                  >
                    <span>{collection.name}</span>
                    <span className="text-[10px] text-muted-foreground/70">
                      {collection.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upgrade Section */}
        {!collapsed && (
          <div className="mt-8">
            <Card className="p-4 border-l-4 border-l-amber-500 bg-amber-50">
              <p className="font-semibold text-sm mb-1 text-foreground">
                Upgrade
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Upgrade to Pro to access all features.
              </p>
              <Button
                size="sm"
                className="w-full bg-amber-600 hover:bg-amber-700 text-xs font-medium"
              >
                Upgrade
              </Button>
            </Card>
          </div>
        )}
      </div>
    </aside>
  );
}

interface Prompt {
  title: string;
  description: string;
  tags: Tag[];
  usageRate: string;
}

const samplePrompts: Prompt[] = [
  {
    title: "World Class Ad Copywriter",
    description:
      "A prompt to craft succinct and engaging ad copy for a specific type of audience, focusing on pain points and solutions.",
    tags: [
      { label: "Google Ads", color: "green" },
      { label: "Facebook", color: "blue" },
      { label: "Marketing", color: "yellow" },
    ],
    usageRate: "90%",
  },
  {
    title: "Content Calendar Generator",
    description:
      "Create an effective content calendar for your business that aligns your content with your quarterly marketing goals.",
    tags: [
      { label: "Newsletter", color: "pink" },
      { label: "Blog", color: "purple" },
    ],
    usageRate: "83%",
  },
  {
    title: "Code Refactoring Expert",
    description:
      "Review and refactor the provided JavaScript code snippet to improve readability, performance, and adherence to best practices.",
    tags: [
      { label: "Coding", color: "blue" },
      { label: "JavaScript", color: "yellow" },
    ],
    usageRate: "75%",
  },
];

interface TopNavbarProps {
  onToggleSidebar: () => void;
}

function TopNavbar({ onToggleSidebar }: TopNavbarProps) {
  return (
    <header className="w-full border-b bg-background">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:h-9 md:w-9"
            onClick={onToggleSidebar}
          >
            <Menu className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-amber-500 text-background flex items-center justify-center text-xs font-bold">
              PK
            </div>
            <span className="font-semibold text-sm md:text-base">
              PromptKeep
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex text-xs"
          >
            Docs
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Feedback
          </Button>
          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-semibold text-amber-700">
            RA
          </div>
        </div>
      </div>
    </header>
  );
}

export default function PromptDashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted">
      {/* Sidebar kiri */}
      <Sidebar collapsed={sidebarCollapsed} />

      {/* Kolom kanan: Navbar + Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar di samping kanan sidebar */}
        <TopNavbar
          onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <header className="mb-6">
            <h1 className="text-3xl font-extrabold text-foreground mb-1">
              My Prompts
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your prompt collection. Create, edit, and organize your
              prompts.
            </p>
          </header>

          {/* Filter & Actions Bar */}
          <Card className="mb-6 p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border border-border">
            <Input
              placeholder="Search prompts..."
              className="flex-1 min-w-[200px]"
            />

            <div className="flex md:flex-wrap gap-3 justify-end">
              <Select defaultValue="all-category">
                <SelectTrigger className="w-[170px]">
                  <SelectValue placeholder="Category: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-category">Category: All</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="coding">Coding</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-tags">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Tags: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-tags">Tags: All</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="created-desc">
                <SelectTrigger className="w-[210px]">
                  <SelectValue placeholder="Created Time (Newest)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created-desc">
                    Created Time (Newest)
                  </SelectItem>
                  <SelectItem value="created-asc">
                    Created Time (Oldest)
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="border-border">
                  <Rows className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="border-border">
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button className="bg-amber-500 hover:bg-amber-600 font-semibold">
                  + Create Prompt
                </Button>
              </div>
            </div>
          </Card>

          {/* Prompts List */}
          <section className="space-y-4">
            {samplePrompts.map((prompt, index) => (
              <PromptCard
                key={index}
                title={prompt.title}
                description={prompt.description}
                tags={prompt.tags}
                usageRate={prompt.usageRate}
              />
            ))}

            <div className="text-center mt-6 text-xs text-muted-foreground">
              Showing 1–3 of 3 items
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
