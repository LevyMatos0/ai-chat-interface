import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "0px";
    const next = Math.min(ta.scrollHeight, 200);
    ta.style.height = `${next}px`;
  }, [value]);

  const canSend = value.trim().length > 0 && !disabled;

  const submit = () => {
    if (!canSend) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent px-4 pb-4 pt-6 md:px-6 md:pb-6">
      <div className="mx-auto w-full max-w-3xl">
        <div
          className={`group flex items-end gap-2 rounded-3xl border border-border/70 bg-card/70 p-2 pl-4 shadow-[var(--shadow-soft)] backdrop-blur-xl transition-all duration-200 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 ${
            disabled ? "opacity-80" : ""
          }`}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Digite sua mensagem..."
            rows={1}
            className="min-h-[24px] flex-1 resize-none bg-transparent py-2 text-sm leading-6 text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="button"
            onClick={submit}
            disabled={!canSend}
            aria-label="Enviar mensagem"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:scale-105 hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:hover:scale-100"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Pressione <kbd className="rounded bg-muted px-1 py-0.5 text-[10px]">Enter</kbd> para enviar •{" "}
          <kbd className="rounded bg-muted px-1 py-0.5 text-[10px]">Shift + Enter</kbd> para nova linha
        </p>
      </div>
    </div>
  );
}
