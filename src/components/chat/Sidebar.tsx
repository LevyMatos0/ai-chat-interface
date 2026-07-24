import { MessageSquarePlus, MessageCircle, X } from "lucide-react";
import type { Conversation } from "./types";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
}

export function Sidebar({ open, onClose, conversations, activeId, onSelect, onNew }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-background/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-out md:static md:z-0 ${
          open ? "translate-x-0" : "-translate-x-full md:w-0 md:-translate-x-0 md:border-r-0 md:overflow-hidden"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold">Conversas</span>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-3">
          <button
            onClick={onNew}
            className="flex w-full items-center gap-2 rounded-xl border border-sidebar-border bg-card/40 px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-accent"
          >
            <MessageSquarePlus className="h-4 w-4" />
            Nova conversa
          </button>
        </div>

        <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-2 pb-4">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                c.id === activeId
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              }`}
            >
              <MessageCircle className="h-4 w-4 shrink-0 opacity-70" />
              <span className="truncate">{c.title}</span>
            </button>
          ))}
          {conversations.length === 0 && (
            <p className="px-3 py-2 text-xs text-muted-foreground">Nenhuma conversa ainda.</p>
          )}
        </nav>
      </aside>
    </>
  );
}
