import { useEffect, useRef, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import { Sidebar } from "./Sidebar";
import type { Conversation, Message } from "./types";

const BOT_NAME = "Nova";

const SAMPLE_REPLIES = [
  "Claro! Posso te ajudar com isso. Me conta um pouco mais sobre o que você precisa?",
  "Ótima pergunta. Aqui está uma forma simples de pensar sobre o assunto: comece definindo o objetivo, depois quebre em pequenas etapas.",
  "Entendi. Vou te dar um panorama rápido e depois podemos aprofundar em qualquer ponto que você quiser.",
  "Perfeito. Existem várias abordagens possíveis — cada uma com suas vantagens. Quer que eu compare elas?",
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function newConversation(): Conversation {
  return {
    id: uid(),
    title: "Nova conversa",
    messages: [],
    updatedAt: Date.now(),
  };
}

export function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>(() => [newConversation()]);
  const [activeId, setActiveId] = useState<string>(() => conversations[0].id);
  const [isTyping, setIsTyping] = useState(false);
  const streamTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (streamTimer.current) clearInterval(streamTimer.current);
    };
  }, []);

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  const updateActive = (updater: (conv: Conversation) => Conversation) => {
    setConversations((prev) => prev.map((c) => (c.id === activeId ? updater(c) : c)));
  };

  const handleNew = () => {
    const conv = newConversation();
    setConversations((prev) => [conv, ...prev]);
    setActiveId(conv.id);
    setSidebarOpen(false);
  };

  const handleSelect = (id: string) => {
    setActiveId(id);
    setSidebarOpen(false);
  };

  const streamAssistant = (fullText: string) => {
    const assistantId = uid();
    updateActive((c) => ({
      ...c,
      messages: [...c.messages, { id: assistantId, role: "assistant", content: "", streaming: true }],
      updatedAt: Date.now(),
    }));
    setIsTyping(false);

    let i = 0;
    if (streamTimer.current) clearInterval(streamTimer.current);
    streamTimer.current = setInterval(() => {
      i += Math.max(1, Math.round(Math.random() * 3));
      const slice = fullText.slice(0, i);
      const done = i >= fullText.length;
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === assistantId ? { ...m, content: slice, streaming: !done } : m
                ),
              }
            : c
        )
      );
      if (done && streamTimer.current) {
        clearInterval(streamTimer.current);
        streamTimer.current = null;
      }
    }, 22);
  };

  const handleSend = (text: string) => {
    const userMsg: Message = { id: uid(), role: "user", content: text };
    updateActive((c) => ({
      ...c,
      title: c.messages.length === 0 ? text.slice(0, 40) : c.title,
      messages: [...c.messages, userMsg],
      updatedAt: Date.now(),
    }));

    setIsTyping(true);
    const reply = SAMPLE_REPLIES[Math.floor(Math.random() * SAMPLE_REPLIES.length)];
    setTimeout(() => streamAssistant(reply), 700 + Math.random() * 400);
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversations={conversations}
        activeId={activeId}
        onSelect={handleSelect}
        onNew={handleNew}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <ChatHeader
          botName={BOT_NAME}
          online
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />

        <div className="flex-1 overflow-y-auto">
          <MessageList messages={active.messages} isTyping={isTyping} />
        </div>

        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}
