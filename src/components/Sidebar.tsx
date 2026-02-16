import { MessageSquare, Plus, Trash2, LogOut, User, Bot } from "lucide-react";
import { Conversation } from "@/types/chat";

interface SidebarProps {
  conversations: Conversation[];
  activeConvId: string | null;
  username: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
}

const Sidebar = ({ conversations, activeConvId, username, onSelect, onNew, onDelete, onLogout }: SidebarProps) => {
  return (
    <div className="flex h-full w-72 flex-col border-r border-border bg-sidebar">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-foreground">Archabot</h2>
          <p className="text-xs text-muted-foreground">Chat AI</p>
        </div>
      </div>

      {/* New conversation */}
      <div className="p-3">
        <button
          onClick={onNew}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-primary/40 text-sm font-medium text-primary transition-all hover:border-primary hover:bg-primary/10"
        >
          <Plus className="h-4 w-4" />
          Nuova Chat
        </button>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto px-3 pb-2 scrollbar-thin">
        <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Conversazioni
        </p>
        <div className="space-y-1">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                activeConvId === conv.id
                  ? "bg-primary/15 text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <MessageSquare className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 truncate">{conv.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(conv.id);
                }}
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded opacity-0 transition-all hover:bg-destructive/20 hover:text-destructive group-hover:opacity-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {conversations.length === 0 && (
            <p className="px-2 py-4 text-center text-xs text-muted-foreground">
              Nessuna conversazione
            </p>
          )}
        </div>
      </div>

      {/* User & Logout */}
      <div className="border-t border-border p-3">
        <div className="mb-2 flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
            <User className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">{username}</span>
        </div>
        <button
          onClick={onLogout}
          className="flex h-9 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Esci
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
