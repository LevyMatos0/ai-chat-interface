import { Sparkles } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="animate-bubble-in flex w-full items-end gap-2.5">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary/70 to-primary/30 text-primary-foreground">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="rounded-2xl rounded-bl-md bg-card/70 px-4 py-3 shadow-[var(--shadow-soft)] ring-1 ring-border/60 backdrop-blur-sm">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
              style={{
                animation: `dot-bounce 1.2s ${i * 0.15}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
