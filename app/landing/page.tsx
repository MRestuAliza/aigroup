"use client";

import {
  Button,
} from "@/components/ui/button";
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#111827] flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-[#F4E4B8] bg-[#FFFDF7]/90 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500 text-xs font-black text-white">
              P
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Proompy
            </span>
          </div>
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#collections" className="hover:text-foreground">
              Collections
            </a>
            <a href="#extension" className="hover:text-foreground">
              Extension
            </a>
            <a href="#pricing" className="hover:text-foreground">
              Pricing
            </a>
            <a href="#faq" className="hover:text-foreground">
              FAQ
            </a>
          </div>
            <Button
              size="sm"
              className="bg-amber-500 text-sm font-semibold text-white hover:bg-amber-600"
              onClick={() => window.location.href = "/api/auth/signin"}
            >
              Get started free
            </Button>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-[#F4E4B8]">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:py-16 md:flex-row md:items-center md:py-20">
            <div className="flex-1 space-y-6">
              <Badge className="bg-amber-100 text-[11px] font-medium text-amber-700 hover:bg-amber-100">
                New · Built for AI power users
              </Badge>
              <div>
                <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem]">
                  One home for all your AI prompts.
                </h1>
                <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                  Proompy is your prompt command center — save, organize, and
                  reuse prompts in seconds. Create collections, share with your
                  team, and access everything from the browser extension.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button className="bg-amber-500 text-sm font-semibold text-white hover:bg-amber-600">
                  Start organizing prompts
                </Button>
                <Button
                  variant="outline"
                  className="border-[#F4E4B8] bg-white text-sm"
                >
                  Watch product demo
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                No credit card required · Works with ChatGPT, Claude, Gemini,
                and more
              </p>
            </div>

            {/* Hero mock UI */}
            <div className="flex-1">
              <Card className="border-amber-100 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FACC15]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
                    </div>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                      Proompy Dashboard
                    </span>
                  </div>
                  <CardTitle className="mt-3 text-base">
                    My Prompts · Marketing
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Centralized view of your prompts with filters, tags, and
                    collections.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="flex flex-col gap-2 md:flex-row">
                    <Input
                      placeholder="Search prompts..."
                      className="h-8 border-[#E5E5E5]"
                    />
                    <div className="flex flex-1 gap-2">
                      <div className="flex-1 rounded-md border border-dashed border-[#E5E5E5] bg-[#FFFBEB] px-2 py-1.5">
                        <span className="text-[10px] font-medium text-[#6B7280]">
                          Collection
                        </span>
                        <p className="text-xs font-semibold">Marketing</p>
                      </div>
                      <div className="flex-1 rounded-md border border-dashed border-[#E5E5E5] px-2 py-1.5">
                        <span className="text-[10px] font-medium text-[#6B7280]">
                          Tags
                        </span>
                        <p className="text-xs font-semibold">Launch, Email</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div className="space-y-2">
                    {["World Class Ad Copywriter", "Content Calendar", "Code Refactor Expert"].map(
                      (title, i) => (
                        <div
                          key={title}
                          className="flex items-start justify-between rounded-md border border-[#F3F4F6] bg-white px-3 py-2"
                        >
                          <div>
                            <p className="text-xs font-semibold">{title}</p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                              Quickly reuse your best-performing prompts in one
                              click.
                            </p>
                          </div>
                          <div className="ml-2 flex flex-col items-end gap-1">
                            <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-medium text-amber-700">
                              {i === 0 ? "Ads" : i === 1 ? "Content" : "Dev"}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6 border-[#E5E5E5]"
                            >
                              <span className="text-[10px]">↗</span>
                            </Button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Proompy */}
        <section
          id="features"
          className="border-b border-[#F4E4B8] bg-white py-12 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight">
                AI prompt tools should be built for teams,
                <br className="hidden sm:block" /> not just developers.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Proompy gives marketers, founders, and builders one place to
                manage prompts, collections, and extensions.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Card className="border-amber-100">
                <CardHeader>
                  <CardTitle className="text-base">
                    Single source of truth
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Stop hunting through Notion docs, chats, and screenshots.
                    Keep every prompt in one organized library.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-amber-100">
                <CardHeader>
                  <CardTitle className="text-base">
                    Collections & tags
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Group prompts into collections (folders) and tag them by
                    use case, channel, or client for fast retrieval.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-amber-100">
                <CardHeader>
                  <CardTitle className="text-base">
                    Extension-first workflow
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Use the Proompy browser extension to insert prompts into
                    ChatGPT, Claude, or Gemini without leaving the page.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Collections & Extension */}
        <section
          id="collections"
          className="border-b border-[#F4E4B8] bg-[#FFFBEB] py-12 sm:py-16"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8 md:flex-row md:items-center">
            <div className="flex-1 space-y-4">
              <Badge className="bg-amber-500 text-[10px] font-medium text-white hover:bg-amber-600">
                Collections
              </Badge>
              <h2 className="text-2xl font-semibold tracking-tight">
                Organize prompts like files in folders.
              </h2>
              <p className="text-sm text-muted-foreground sm:text-base">
                Create collections for campaigns, clients, products, or
                workflows. Save prompts once, reuse them everywhere. Switch
                contexts without losing the prompts that work.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>• Create unlimited collections and sub-categories.</li>
                <li>• Share collections with teammates or keep them private.</li>
                <li>• Use tags and search to jump to any prompt in milliseconds.</li>
              </ul>
            </div>

            {/* Mock collection UI */}
            <div className="flex-1">
              <Card className="border-amber-200 bg-white shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Collections</CardTitle>
                  <CardDescription className="text-xs">
                    A structured view of your prompt folders.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="rounded-md border border-[#F3F4F6] bg-[#F9FAFB] p-2">
                    <p className="text-[11px] font-semibold text-[#4B5563]">
                      ✦ Marketing Launch · 18 prompts
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Email, ads, and landing copy for your next product
                      release.
                    </p>
                  </div>
                  <div className="rounded-md border border-[#F3F4F6] bg-white p-2">
                    <p className="text-[11px] font-semibold text-[#4B5563]">
                      ✦ Content Engine · 24 prompts
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Twitter threads, blog outlines, and newsletters.
                    </p>
                  </div>
                  <div className="rounded-md border border-[#F3F4F6] bg-white p-2">
                    <p className="text-[11px] font-semibold text-[#4B5563]">
                      ✦ Dev Toolkit · 12 prompts
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Refactor, debug, and document code with consistent
                      patterns.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="extension"
          className="border-b border-[#F4E4B8] bg-white py-12 sm:py-16"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8 md:flex-row md:items-center">
            {/* Mock extension UI */}
            <div className="flex-1">
              <Card className="border-amber-100 bg-[#FFFBEB] shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Proompy Extension</CardTitle>
                  <CardDescription className="text-xs">
                    Quick-access panel beside your favorite AI tools.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="flex items-center justify-between rounded-md border border-[#F3F4F6] bg-white px-3 py-2">
                    <div>
                      <p className="text-xs font-semibold">
                        World Class Ad Copywriter
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Insert into ChatGPT
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="h-7 bg-amber-500 px-3 text-[11px] font-semibold text-white hover:bg-amber-600"
                    >
                      Use prompt
                    </Button>
                  </div>
                  <div className="rounded-md border border-dashed border-[#E5E5E5] bg-white px-3 py-2 text-[11px] text-muted-foreground">
                    Works with ChatGPT, Claude, Gemini, Perplexity, and more.
                    Just click to paste your prompt into the chat.
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex-1 space-y-4">
              <Badge className="bg-amber-100 text-[10px] font-medium text-amber-700 hover:bg-amber-100">
                Extension
              </Badge>
              <h2 className="text-2xl font-semibold tracking-tight">
                Bring your prompt library into every tab.
              </h2>
              <p className="text-sm text-muted-foreground sm:text-base">
                The Proompy extension pins your best prompts to the side of
                your browser. No more copy-paste from random docs — just open,
                search, and insert.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>• One-click insert into any AI chat or textarea.</li>
                <li>• Keyboard shortcuts for your most-used prompts.</li>
                <li>• Stay in flow instead of breaking your workflow.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="border-b border-[#F4E4B8] bg-[#FFFBEB] py-12 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight">
                Simple pricing for makers and teams.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Start on the free plan. Upgrade when Proompy becomes part of
                your daily workflow.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {/* Free */}
              <Card className="flex flex-col border-[#E5E5E5]">
                <CardHeader>
                  <CardTitle className="text-base">Free</CardTitle>
                  <CardDescription className="text-sm">
                    Perfect for solo developers and students.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-3 text-sm">
                  <p className="text-2xl font-semibold">$0</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Up to 50 prompts</li>
                    <li>• 5 collections</li>
                    <li>• Basic browser extension</li>
                  </ul>
                  <Button variant="outline" className="w-full text-sm">
                    Get started
                  </Button>
                </CardContent>
              </Card>

              {/* Lifetime */}
              <Card className="relative flex flex-col border-amber-300">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  Most popular
                </div>
                <CardHeader className="pt-5">
                  <CardTitle className="text-base">Lifetime</CardTitle>
                  <CardDescription className="text-sm">
                    One-time payment, unlimited prompt library.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-3 text-sm">
                  <p className="text-2xl font-semibold">$49</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Unlimited prompts & collections</li>
                    <li>• Full extension features</li>
                    <li>• Priority updates & support</li>
                  </ul>
                  <Button className="w-full bg-amber-500 text-sm font-semibold text-white hover:bg-amber-600">
                    Get Lifetime
                  </Button>
                </CardContent>
              </Card>

              {/* Pro */}
              <Card className="flex flex-col border-[#E5E5E5]">
                <CardHeader>
                  <CardTitle className="text-base">Pro (Teams)</CardTitle>
                  <CardDescription className="text-sm">
                    For agencies & teams that live in AI.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-3 text-sm">
                  <p className="text-2xl font-semibold">$9 / seat / month</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Shared team workspaces</li>
                    <li>• Role-based access for collections</li>
                    <li>• Usage insights & audit logs</li>
                  </ul>
                  <Button variant="outline" className="w-full text-sm">
                    Talk to us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="border-b border-[#F4E4B8] bg-white py-12 sm:py-16"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight">
                Questions & Answers
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Everything you need to know about Proompy.
              </p>
            </div>

            <div className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is">
                  <AccordionTrigger className="text-sm">
                    What is Proompy?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Proompy is a prompt management platform that helps you save,
                    organize, and reuse your best AI prompts. It replaces random
                    docs and notes with one clean prompt library.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="extension">
                  <AccordionTrigger className="text-sm">
                    How does the browser extension work?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Install the extension, sign in, and your prompt library will
                    appear next to your favorite AI tools. Click a prompt to
                    instantly paste it into the input field.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="teams">
                  <AccordionTrigger className="text-sm">
                    Can I use Proompy with a team?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Yes. On the Pro plan, you can invite teammates, share
                    collections, control access, and standardize prompts across
                    the whole organization.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data">
                  <AccordionTrigger className="text-sm">
                    How is my data stored?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Your prompts are stored securely in our database, and we
                    never use your content to train third-party models. You stay
                    in control of your data at all times.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#111827] py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center text-white">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Never lose a great prompt again.
            </h2>
            <p className="mt-3 text-sm text-gray-300 sm:text-base">
              Turn your scattered prompts into a system. Start with the free
              plan and upgrade only when you&apos;re ready.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button className="bg-amber-400 text-sm font-semibold text-black hover:bg-amber-300">
                Sign up for free
              </Button>
              <Button
                variant="outline"
                className="border-gray-500 bg-transparent text-sm text-gray-100 hover:bg-white/5"
              >
                View dashboard demo
              </Button>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              Built for founders, marketers, and developers who live in AI.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#F4E4B8] bg-[#FFFDF7]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Proompy. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
