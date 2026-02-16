import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Paperclip, X, FileText, Image as ImageIcon } from "lucide-react";
import { Message } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatAreaProps {
  messages: Message[];
  conversationTitle: string | null;
  onSend: (text: string, files?: File[]) => void;
}

const ChatArea = ({ messages, conversationTitle, onSend }: ChatAreaProps) => {
  const [input, setInput] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text && attachedFiles.length === 0) return;
    setInput("");
    onSend(text, attachedFiles.length > 0 ? attachedFiles : undefined);
    setAttachedFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
    e.target.value = "";
  };

  const removeFile = (idx: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const isImage = (file: File) => file.type.startsWith("image/");

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-6 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
          <Bot className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">
          {conversationTitle || "Seleziona una conversazione"}
        </h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <p className="text-lg font-semibold text-foreground">Inizia una conversazione</p>
            <p className="mt-1 text-sm text-muted-foreground">Scrivi un messaggio per iniziare</p>
          </div>
        )}

        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 animate-fade-in ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg gradient-primary">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground border border-border"
                }`}
              >
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {msg.attachments.map((att, i) =>
                      att.type === "image" ? (
                        <img key={i} src={att.url} alt={att.name} className="max-h-48 rounded-lg border border-border" />
                      ) : (
                        <div key={i} className="flex items-center gap-1.5 rounded-md bg-secondary/50 px-2 py-1 text-xs">
                          <FileText className="h-3 w-3" />
                          <span className="truncate max-w-[120px]">{att.name}</span>
                        </div>
                      )
                    )}
                  </div>
                )}
                <div className="prose-sm prose-invert max-w-none [&_pre]:rounded-lg [&_pre]:bg-secondary [&_pre]:p-3 [&_code]:rounded [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_a]:text-primary [&_a]:underline">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
                <p className={`mt-1 text-[10px] ${msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {msg.timestamp}
                </p>
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>

      {/* Attached files preview */}
      {attachedFiles.length > 0 && (
        <div className="border-t border-border px-6 py-2">
          <div className="mx-auto flex max-w-3xl flex-wrap gap-2">
            {attachedFiles.map((file, i) => (
              <div key={i} className="flex items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1.5 text-xs text-secondary-foreground">
                {isImage(file) ? <ImageIcon className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                <span className="max-w-[100px] truncate">{file.name}</span>
                <button onClick={() => removeFile(i)} className="ml-1 rounded hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.txt,.csv,.json,.md,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground transition-all hover:text-foreground hover:border-primary"
            title="Allega file"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Scrivi un messaggio..."
            className="h-11 flex-1 rounded-xl border border-border bg-chat-input px-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() && attachedFiles.length === 0}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl gradient-primary text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
