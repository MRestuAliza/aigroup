"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, FolderOpen, Tag, Sparkles, ShieldCheck, LayoutDashboard, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#111827] flex flex-col selection:bg-amber-100">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-[#F4E4B8] bg-[#FFFDF7]/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 shadow-sm shadow-amber-200">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">Proompy</span>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-amber-600">Features</a>
            <a href="#collections" className="transition-colors hover:text-amber-600">Collections</a>
            <a href="#faq" className="transition-colors hover:text-amber-600">FAQ</a>
          </div>
          <Button
            size="sm"
            className="rounded-full bg-amber-500 px-5 font-semibold text-white hover:bg-amber-600 shadow-md shadow-amber-100"
            onClick={() => window.location.href = "/api/auth/signin"}
          >
            Get Started
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section - Refined with better Typography */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-50/50 via-transparent to-transparent" />
          
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <Badge className="mb-6 rounded-full border-amber-200 bg-amber-50 px-4 py-1 text-sm font-medium text-amber-700">
              Your Personal AI Prompt Vault
            </Badge>
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              Stop losing your best <span className="text-amber-500">AI Prompts.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Proompy is the minimalist workspace to save, organize, and perfect your prompts. 
              Build a library that makes you 10x more productive with ChatGPT, Claude, and Gemini.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-12 rounded-full bg-amber-500 px-8 text-base font-bold shadow-lg shadow-amber-200 hover:bg-amber-600">
                Start Building Your Library
              </Button>
              <Button size="lg" variant="ghost" className="h-12 rounded-full px-8 text-base font-semibold text-slate-700 hover:bg-amber-50">
                See how it works <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Featured Preview UI */}
          <div className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-amber-100 bg-white p-2 shadow-2xl">
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:p-8">
                <div className="flex flex-col gap-6 md:flex-row">
                   <div className="w-full md:w-64 space-y-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Collections</p>
                        <div className="space-y-1">
                          {["Marketing", "Development", "Personal Life"].map((cat, i) => (
                            <div key={cat} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${i === 0 ? 'bg-amber-100 text-amber-900' : 'text-slate-600 hover:bg-slate-100'}`}>
                              <FolderOpen className="h-3.5 w-3.5" /> {cat}
                            </div>
                          ))}
                        </div>
                      </div>
                   </div>
                   <div className="flex-1 space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input placeholder="Search your prompt vault..." className="pl-10 h-10 border-slate-200 bg-white shadow-sm" />
                      </div>
                      <div className="grid gap-3">
                        {[
                          { title: "SaaS Copywriter Pro", tag: "Marketing", desc: "Expert persona for landing page copy..." },
                          { title: "Next.js Refactor Engine", tag: "Dev", desc: "Optimizes React components for performance..." }
                        ].map((prompt) => (
                          <div key={prompt.title} className="rounded-xl border border-slate-100 bg-white p-4 transition-hover hover:border-amber-200 hover:shadow-md">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-slate-800">{prompt.title}</h4>
                              <Badge variant="outline" className="text-[10px] font-bold text-amber-600 border-amber-100 bg-amber-50">{prompt.tag}</Badge>
                            </div>
                            <p className="mt-1 text-xs text-slate-500">{prompt.desc}</p>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars - Re-designed Features */}
        <section id="features" className="bg-white py-24 border-y border-amber-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Intuitive Dashboard</h3>
                <p className="text-slate-600 leading-relaxed">
                  A clean, distraction-free interface designed specifically for managing text-based assets. No more messy Notion pages.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <Tag className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Advanced Tagging</h3>
                <p className="text-slate-600 leading-relaxed">
                  Categorize prompts by model (GPT-4o, Claude 3.5), tone, or project. Find exactly what you need in seconds.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Privacy First</h3>
                <p className="text-slate-600 leading-relaxed">
                  Your prompts are yours. We encrypt your data and ensure that your creative assets stay private and secure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Collections Spotlight */}
        <section id="collections" className="py-24 bg-[#FFFDF7]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
                    Structure your workflows with <span className="text-amber-600">Collections.</span>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Don't just save prompts—build workflows. Group your prompts into thematic collections to switch between "Deep Work Coding" and "Social Media Marketing" instantly.
                  </p>
                  <div className="space-y-3">
                    {[
                      "Unlimited Collections & Sub-folders",
                      "Quick-copy functionality for every prompt",
                      "Version history for prompt iterations"
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 font-medium text-slate-700">
                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 w-full grid grid-cols-2 gap-4">
                   <div className="space-y-4 mt-8">
                      <div className="h-40 rounded-2xl bg-white border border-amber-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <Badge className="bg-blue-50 text-blue-600 border-none mb-2">Dev</Badge>
                        <h4 className="font-bold">Backend Logic</h4>
                        <p className="text-xs text-slate-400 mt-2">12 Prompts</p>
                      </div>
                      <div className="h-40 rounded-2xl bg-amber-500 border border-amber-600 p-6 shadow-lg">
                        <Badge className="bg-white/20 text-white border-none mb-2">Social</Badge>
                        <h4 className="font-bold text-white">Twitter Threads</h4>
                        <p className="text-xs text-amber-100 mt-2">8 Prompts</p>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="h-40 rounded-2xl bg-white border border-amber-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <Badge className="bg-green-50 text-green-600 border-none mb-2">Work</Badge>
                        <h4 className="font-bold">Email Templates</h4>
                        <p className="text-xs text-slate-400 mt-2">24 Prompts</p>
                      </div>
                      <div className="h-40 rounded-2xl bg-white border border-amber-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <Badge className="bg-purple-50 text-purple-600 border-none mb-2">Creative</Badge>
                        <h4 className="font-bold">Story Telling</h4>
                        <p className="text-xs text-slate-400 mt-2">5 Prompts</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* FAQ - Simplified */}
        <section id="faq" className="py-24 border-t border-amber-100">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold mb-12">Common Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-xl px-6 bg-white border-slate-200">
                <AccordionTrigger className="font-bold hover:no-underline">Is it really free?</AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Yes, Proompy's core features are free. We want to help everyone build better AI habits.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-xl px-6 bg-white border-slate-200">
                <AccordionTrigger className="font-bold hover:no-underline">Can I import from Notion?</AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Currently, we support manual entry to keep things clean, but CSV import is coming very soon!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Final CTA - Dark & Minimal */}
        <section className="bg-slate-950 py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full bg-amber-500/10 blur-[100px]" />
          <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to master your AI workflow?
            </h2>
            <p className="mt-4 text-slate-400">Join other builders and start organizing your prompts today.</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-14 rounded-full bg-amber-500 px-10 text-base font-bold text-white hover:bg-amber-600" onClick={() => window.location.href = "/api/auth/signin"}>
                Get Started for Free
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#F4E4B8] bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-500 text-[10px] font-black text-white">P</div>
            <span className="font-bold">Proompy</span>
          </div>
          <p className="text-sm text-slate-400">© 2026 Proompy. Built for the future of AI.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-amber-600">Privacy</a>
            <a href="#" className="hover:text-amber-600">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}