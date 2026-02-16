import { useState, useCallback } from "react";
import LoginPage from "@/components/LoginPage";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import { Conversation, Message } from "@/types/chat";
import { createMockConversations, getMockResponse } from "@/data/mockData";

const Index = () => {
  const [user, setUser] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);

  const activeConv = conversations.find((c) => c.id === activeConvId) || null;

  const handleLogin = useCallback((username: string) => {
    const convs = createMockConversations();
    setUser(username);
    setConversations(convs);
    setActiveConvId(convs[0]?.id || null);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setConversations([]);
    setActiveConvId(null);
  }, []);

  const handleNewConv = useCallback(() => {
    const id = Math.random().toString(36).slice(2, 10);
    const conv: Conversation = {
      id,
      title: `Nuova Chat ${conversations.length + 1}`,
      messages: [],
      createdAt: new Date().toISOString(),
    };
    setConversations((prev) => [conv, ...prev]);
    setActiveConvId(id);
  }, [conversations.length]);

  const handleDeleteConv = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const next = prev.filter((c) => c.id !== id);
        if (activeConvId === id) {
          setActiveConvId(next[0]?.id || null);
        }
        return next;
      });
    },
    [activeConvId]
  );

  const handleSend = useCallback(
    (text: string) => {
      if (!activeConvId) return;
      const uid = () => Math.random().toString(36).slice(2, 10);
      const ts = new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });

      const userMsg: Message = { id: uid(), role: "user", content: text, timestamp: ts };
      const response = getMockResponse(text);

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId
            ? { ...c, messages: [...c.messages, userMsg] }
            : c
        )
      );

      // Simulate delay
      setTimeout(() => {
        const botMsg: Message = { id: uid(), role: "assistant", content: response, timestamp: ts };
        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConvId
              ? { ...c, messages: [...c.messages, botMsg] }
              : c
          )
        );
      }, 500);
    },
    [activeConvId]
  );

  if (!user) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        conversations={conversations}
        activeConvId={activeConvId}
        username={user}
        onSelect={setActiveConvId}
        onNew={handleNewConv}
        onDelete={handleDeleteConv}
        onLogout={handleLogout}
      />
      <div className="flex-1">
        <ChatArea
          messages={activeConv?.messages || []}
          conversationTitle={activeConv?.title || null}
          onSend={handleSend}
        />
      </div>
    </div>
  );
};

export default Index;
