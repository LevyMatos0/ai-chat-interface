import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import type { Message } from "./types";

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export function MessageList({ messages, isTyping }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex h-full items-center justify-center px-6">
        <div className="animate-bubble-in max-w-md text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/70 to-primary/20 shadow-[var(--shadow-soft)]">
            <span className="text-2xl">✦</span>
          </div>
          <h2 className="text-xl font-semibold tracking-tight">Como posso ajudar hoje?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Comece uma conversa digitando sua mensagem abaixo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6 md:px-6">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
