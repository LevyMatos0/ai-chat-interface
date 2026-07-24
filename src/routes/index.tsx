import { createFileRoute } from "@tanstack/react-router";
import { ChatPage } from "@/components/chat/ChatPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nova — Chat com IA" },
      {
        name: "description",
        content: "Converse com Nova, uma assistente de IA moderna e minimalista, em um chat elegante com tema escuro.",
      },
      { property: "og:title", content: "Nova — Chat com IA" },
      {
        property: "og:description",
        content: "Interface de chat moderna e minimalista para conversar com uma IA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <ChatPage />;
}
