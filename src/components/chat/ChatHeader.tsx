import { Menu, Sparkles } from "lucide-react";

interface ChatHeaderProps {
  botName: string;
  online?: boolean;
  onToggleSidebar: () => void;
}

export function ChatHeader({ botName, online = true, onToggleSidebar }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border/60 bg-background/60 px-4 py-3 backdrop-blur-xl md:px-6">
      <button
        onClick={onToggleSidebar}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Alternar barra lateral"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/80 to-primary/40 text-primary-foreground shadow-[var(--shadow-soft)]">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold leading-tight">{botName}</h1>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  online ? "animate-ping bg-emerald-400" : "bg-muted-foreground"
                }`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  online ? "bg-emerald-400" : "bg-muted-foreground"
                }`}
              />
            </span>
            <span>{online ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
