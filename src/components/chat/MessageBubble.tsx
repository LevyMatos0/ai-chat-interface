import { Sparkles, User } from "lucide-react";
import type { Message } from "./types";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`animate-bubble-in flex w-full items-end gap-2.5 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary/70 to-primary/30 text-primary-foreground">
          <Sparkles className="h-4 w-4" />
        </div>
      )}

      <div
        className={
          isUser
            ? "max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm leading-relaxed text-[color:var(--bubble-user-foreground)] shadow-[var(--shadow-soft)] md:max-w-[70%]"
            : "max-w-[85%] rounded-2xl rounded-bl-md bg-card/70 px-4 py-2.5 text-sm leading-relaxed text-foreground shadow-[var(--shadow-soft)] ring-1 ring-border/60 backdrop-blur-sm md:max-w-[70%]"
        }
        style={isUser ? { background: "var(--bubble-user)" } : undefined}
      >
        <p className="whitespace-pre-wrap break-words">
          {message.content}
          {message.streaming && <span className="caret-blink ml-0.5 -mb-0.5 h-4 w-[2px] bg-current align-middle" />}
        </p>
      </div>

      {isUser && (
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
