"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, RefreshCw } from "lucide-react";

export default function Page() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [copying, setCopying] = useState(false);
  const [showKey, setShowKey] = useState(false);

  // load api key saat page dibuka
  useEffect(() => {
    const loadKey = async () => {
      try {
        const res = await fetch("/api/extension/api-key");
        if (!res.ok) {
          setApiKey(null);
          return;
        }
        const data = await res.json();
        setApiKey(data.extensionApiKey || null);
      } catch (err) {
        console.error("LOAD EXTENSION API KEY ERROR:", err);
        setApiKey(null);
      } finally {
        setLoadingInitial(false);
      }
    };

    loadKey();
  }, []);

  const handleGenerate = async () => {
    try {
      setLoadingGenerate(true);
      const res = await fetch("/api/extension/api-key", {
        method: "POST",
      });

      if (!res.ok) {
        toast.error("Gagal generate API key. Coba lagi.");
        return;
      }

      const data = await res.json();
      setApiKey(data.extensionApiKey);
      setShowKey(true);
      toast.success("Extension API key berhasil dibuat.");
    } catch (err) {
      console.error("GENERATE EXTENSION API KEY ERROR:", err);
      toast.error("Terjadi error. Coba beberapa saat lagi.");
    } finally {
      setLoadingGenerate(false);
    }
  };

  const handleCopy = async () => {
    if (!apiKey) return;
    try {
      setCopying(true);
      await navigator.clipboard.writeText(apiKey);
      toast.success("API key dicopy ke clipboard.");
    } catch (err) {
      console.error(err);
      toast.error("Gagal copy API key.");
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight mb-1">
          Extension settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate Extension API Key untuk menghubungkan Proompy dengan Chrome extension.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Extension API Key</CardTitle>
          <CardDescription>
            Gunakan key ini di popup Chrome extension. Jangan dibagikan ke orang lain.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <Label className="text-xs text-muted-foreground">
            API key
          </Label>

          {loadingInitial ? (
            <div className="h-9 w-full animate-pulse rounded-md bg-muted" />
          ) : apiKey ? (
            <div className="flex items-center gap-2">
              <Input
                type={showKey ? "text" : "password"}
                value={apiKey}
                readOnly
                className="font-mono text-xs"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setShowKey((prev) => !prev)}
              >
                {showKey ? "🙈" : "👁️"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
                disabled={copying}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Kamu belum punya Extension API Key. Klik tombol di bawah untuk membuatnya.
            </p>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-2">
          <div className="text-xs text-muted-foreground">
            Setelah API key dibuat, buka popup Chrome extension dan paste key tersebut.
          </div>
          <Button
            type="button"
            size="sm"
            onClick={handleGenerate}
            disabled={loadingGenerate}
          >
            {loadingGenerate ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                {apiKey ? "Regenerate" : "Generate API Key"}
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
