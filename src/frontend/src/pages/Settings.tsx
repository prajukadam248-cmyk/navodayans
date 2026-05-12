import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  Key,
  LogIn,
  LogOut,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function useIsOpenAIConfigured() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["isMyOpenAIConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isMyOpenAIConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

function useSetApiKey() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (key: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.setMyOpenAIApiKey(key);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["isMyOpenAIConfigured"] });
      toast.success("🎉 AI key saved! You're all set to learn!");
    },
    onError: () => {
      toast.error("Oops! Couldn't save the key. Please try again.");
    },
  });
}

function useClearApiKey() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.clearMyOpenAIApiKey();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["isMyOpenAIConfigured"] });
      toast.success("Key removed successfully!");
    },
    onError: () => {
      toast.error("Couldn't remove the key. Try again!");
    },
  });
}

export default function Settings() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [clearConfirm, setClearConfirm] = useState(false);

  const {
    identity,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    login,
    clear,
  } = useInternetIdentity();
  const isLoggedIn = isAuthenticated;
  const principalText = identity?.getPrincipal().toText();

  const { data: isConfigured, isLoading: configLoading } =
    useIsOpenAIConfigured();
  const setKeyMutation = useSetApiKey();
  const clearKeyMutation = useClearApiKey();

  function handleSaveKey(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = apiKey.trim();
    if (!trimmed.startsWith("sk-")) {
      toast.error("That doesn't look right! OpenAI keys start with sk-");
      return;
    }
    setKeyMutation.mutate(trimmed, {
      onSuccess: () => {
        setApiKey("");
        setShowKey(false);
      },
    });
  }

  function handleClearKey() {
    if (!clearConfirm) {
      setClearConfirm(true);
      return;
    }
    clearKeyMutation.mutate(undefined, {
      onSuccess: () => setClearConfirm(false),
    });
  }

  return (
    <div className="min-h-screen bg-background pb-8" data-ocid="settings.page">
      {/* Header */}
      <div className="bg-card border-b px-4 pt-6 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="w-10 h-10 rounded-2xl bg-gradient-play flex items-center justify-center text-xl">
            ⚙️
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              Settings
            </h1>
            <p className="text-xs text-muted-foreground">
              Manage your account & AI tutor
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Internet Identity Section */}
        <Card
          className="p-5 rounded-2xl border-2 overflow-hidden"
          data-ocid="settings.login_card"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[oklch(0.68_0.2_270_/_0.15)] flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-[oklch(0.68_0.2_270)]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-foreground">
                Your Account
              </h2>
              <p className="text-sm text-muted-foreground">
                Sign in to save your progress and unlock AI features!
              </p>
            </div>
          </div>

          <Separator className="mb-4" />

          {isLoggedIn ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[oklch(0.62_0.18_125_/_0.1)] border border-[oklch(0.62_0.18_125_/_0.25)]">
                <CheckCircle2 className="w-5 h-5 text-[oklch(0.62_0.18_125)] flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[oklch(0.35_0.08_125)]">
                    You're signed in! 🎉
                  </p>
                  <p
                    className="text-xs text-muted-foreground truncate"
                    title={principalText}
                  >
                    ID: {principalText?.slice(0, 24)}…
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-xl border-destructive/40 text-destructive hover:bg-destructive/10"
                onClick={() => clear()}
                data-ocid="settings.logout_button"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[oklch(0.65_0.22_35_/_0.1)] border border-[oklch(0.65_0.22_35_/_0.25)]">
                <AlertCircle className="w-5 h-5 text-[oklch(0.65_0.22_35)] flex-shrink-0" />
                <p className="text-sm text-foreground">
                  Sign in to save your AI key and study progress!
                </p>
              </div>
              <Button
                className="w-full rounded-xl btn-playful bg-[oklch(0.68_0.2_270)] hover:bg-[oklch(0.62_0.18_270)] text-white"
                onClick={() => login()}
                disabled={isInitializing || isLoggingIn}
                data-ocid="settings.login_button"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign in with Internet Identity
              </Button>
            </div>
          )}
        </Card>

        {/* AI Tutor Key Section */}
        <Card
          className="p-5 rounded-2xl border-2 overflow-hidden"
          data-ocid="settings.openai_card"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[oklch(0.65_0.22_35_/_0.15)] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-[oklch(0.65_0.22_35)]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-foreground">
                AI Tutor Power-Up 🚀
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter your OpenAI key to unlock your personal AI study buddy!
              </p>
            </div>
          </div>

          <Separator className="mb-4" />

          {/* Status badge */}
          {!configLoading && (
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold mb-4 ${
                isConfigured
                  ? "bg-[oklch(0.62_0.18_125_/_0.12)] text-[oklch(0.35_0.08_125)] border border-[oklch(0.62_0.18_125_/_0.3)]"
                  : "bg-[oklch(0.65_0.22_35_/_0.1)] text-[oklch(0.5_0.12_35)] border border-[oklch(0.65_0.22_35_/_0.25)]"
              }`}
              data-ocid="settings.ai_status"
            >
              {isConfigured ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  AI Ready! Your tutor is powered up! ⚡
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4" />
                  No key set — add yours below to get started!
                </>
              )}
            </div>
          )}

          {/* Instruction banner */}
          <div className="p-4 rounded-xl bg-[oklch(0.65_0.2_230_/_0.1)] border border-[oklch(0.65_0.2_230_/_0.2)] mb-4">
            <p className="text-sm text-foreground leading-relaxed">
              🔑 <strong>What's an API key?</strong> It's a special password
              that lets Navu, your AI tutor, answer your questions! Get yours
              free at{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(0.65_0.2_230)] underline underline-offset-2 font-semibold inline-flex items-center gap-1"
                data-ocid="settings.openai_link"
              >
                OpenAI Platform
                <ExternalLink className="w-3 h-3" />
              </a>
              . It starts with{" "}
              <code className="bg-muted px-1 rounded font-mono text-xs">
                sk-
              </code>
              .
            </p>
          </div>

          {/* Key input form */}
          {isLoggedIn ? (
            <form onSubmit={handleSaveKey} className="space-y-3">
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showKey ? "text" : "password"}
                  placeholder="sk-proj-... paste your key here"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pl-9 pr-10 rounded-xl border-input font-mono text-sm"
                  autoComplete="off"
                  spellCheck={false}
                  data-ocid="settings.apikey_input"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowKey((v) => !v)}
                  aria-label={showKey ? "Hide API key" : "Show API key"}
                  data-ocid="settings.toggle_key_visibility"
                >
                  {showKey ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <Button
                type="submit"
                className="w-full rounded-xl btn-playful subject-math"
                disabled={!apiKey.trim() || setKeyMutation.isPending}
                data-ocid="settings.save_key_button"
              >
                {setKeyMutation.isPending ? (
                  "Saving…"
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Save & Power Up Navu!
                  </>
                )}
              </Button>

              {/* Clear key button */}
              {isConfigured && (
                <Button
                  type="button"
                  variant="outline"
                  className={`w-full rounded-xl border-destructive/40 transition-smooth ${
                    clearConfirm
                      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      : "text-destructive hover:bg-destructive/10"
                  }`}
                  onClick={handleClearKey}
                  disabled={clearKeyMutation.isPending}
                  data-ocid="settings.clear_key_button"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {clearConfirm
                    ? "Tap again to confirm removal"
                    : "Remove my AI key"}
                </Button>
              )}
            </form>
          ) : (
            <div
              className="p-4 rounded-xl bg-muted/50 text-center text-sm text-muted-foreground"
              data-ocid="settings.login_required"
            >
              👆 Sign in above first to add your AI key!
            </div>
          )}
        </Card>

        {/* Safety tips card */}
        <Card className="p-4 rounded-2xl border-2 border-dashed border-border">
          <h3 className="font-display font-bold text-sm text-foreground mb-2">
            🛡️ Is my key safe?
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            <li>✅ Your key is stored securely on the blockchain</li>
            <li>✅ Only you can see and use your key</li>
            <li>✅ We never share it with anyone</li>
            <li>✅ You can remove it anytime!</li>
          </ul>
        </Card>

        {/* App info */}
        <p className="text-center text-xs text-muted-foreground">
          Navodayans v1.0 · Made with ❤️ for 8th graders
        </p>
      </div>
    </div>
  );
}
