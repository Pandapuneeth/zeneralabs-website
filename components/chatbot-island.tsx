"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion, AnimatePresence } from "motion/react";
import Markdown, { type Components } from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DynamicContainer,
  DynamicDescription,
  DynamicIsland,
  DynamicIslandProvider,
  useDynamicIslandSize,
} from "@/components/ui/dynamic-island";

function BotIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const markdownComponents: Components = {
  p: (props) => (
    <p className="mb-2 last:mb-0">{props.children}</p>
  ),
  ul: (props) => (
    <ul className="mb-2 list-disc pl-4">{props.children}</ul>
  ),
  ol: (props) => (
    <ol className="mb-2 list-decimal pl-4">{props.children}</ol>
  ),
  li: (props) => (
    <li className="mb-0.5">{props.children}</li>
  ),
  strong: (props) => (
    <strong className="font-semibold text-foreground">{props.children}</strong>
  ),
  code: (props) => {
    const isBlock = props.className?.includes("language-");
    if (isBlock) {
      return (
        <code className="my-1 block overflow-x-auto rounded-md bg-muted p-2 text-sm">
          {props.children}
        </code>
      );
    }
    return (
      <code className="rounded bg-muted px-1 py-0.5 text-sm">{props.children}</code>
    );
  },
  a: (props) => (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2 hover:brightness-110"
    >
      {props.children}
    </a>
  ),
  h1: (props) => (
    <h1 className="mb-2 text-base font-bold text-foreground">{props.children}</h1>
  ),
  h2: (props) => (
    <h2 className="mb-1 text-sm font-bold text-foreground">{props.children}</h2>
  ),
  h3: (props) => (
    <h3 className="mb-1 text-sm font-semibold text-foreground">{props.children}</h3>
  ),
  hr: () => <hr className="my-2 border-border" />,
  blockquote: (props) => (
    <blockquote className="my-1 border-l-2 border-primary/50 pl-3 text-muted-foreground">
      {props.children}
    </blockquote>
  ),
};

function ChatInterface({ onClose }: { onClose: () => void }) {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status === "ready") {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const isBusy = status === "submitted" || status === "streaming";

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <BotIcon className="size-5 text-primary" />
          <span className="text-base font-bold">Zenera Labs AI</span>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
        >
          <XIcon className="size-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="h-0 min-h-0 flex-1">
        <div ref={scrollRef} className="flex flex-col gap-3 px-5 py-4 text-left">
          {messages.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Ask me anything about Zenera Labs — services, pricing, team, or
              how to get started.
            </p>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.parts.map((part, i) =>
                  part.type === "text" ? (
                    <span key={i} className="block text-sm leading-relaxed">
                      <Markdown components={markdownComponents}>
                        {part.text}
                      </Markdown>
                    </span>
                  ) : null
                )}
              </div>
            </div>
          ))}
          {isBusy && status === "submitted" && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2.5 border-t border-border px-5 py-4"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          disabled={isBusy}
          className="h-10 text-sm"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isBusy || !input.trim()}
          className="h-10 w-10"
        >
          <SendIcon className="size-4" />
        </Button>
      </form>
    </div>
  );
}

function IslandTriggerContent({ onClick }: { onClick: () => void }) {
  const { setSize } = useDynamicIslandSize();

  useEffect(() => {
    const onClose = () => setSize("compact");
    window.addEventListener("island:open", ((e: CustomEvent) => {
      if (e.detail !== "chatbot") onClose();
    }) as EventListener);
    return () => window.removeEventListener("island:open", onClose as EventListener);
  }, [setSize]);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("island:open", { detail: "chatbot" }));
    onClick();
  };

  return (
    <DynamicIsland
      id="chatbot-island"
      containerClassName="justify-end"
      style={{ pointerEvents: "auto", cursor: "pointer" }}
      onClick={handleClick}
    >
      <DynamicContainer className="flex h-full w-full items-center justify-center">
        <DynamicDescription className="flex items-center gap-1.5 text-[10px] font-semibold text-white sm:gap-2 sm:text-sm">
          <BotIcon className="size-4 sm:size-5" />
          <span className="sm:hidden">AI Bot</span>
          <span className="hidden sm:inline">Chat with our AI Bot</span>
        </DynamicDescription>
      </DynamicContainer>
    </DynamicIsland>
  );
}

function IslandTrigger({ onClick }: { onClick: () => void }) {
  return (
    <DynamicIslandProvider initialSize="compact">
      <IslandTriggerContent onClick={onClick} />
    </DynamicIslandProvider>
  );
}

export function ChatbotIsland() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-auto fixed bottom-36 right-4 z-[60] h-[500px] w-[calc(100vw-32px)] sm:bottom-20 sm:right-6 sm:w-[380px]"
          >
            <ChatInterface onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Pill */}
      <div className="pointer-events-none fixed bottom-6 right-4 z-[60] w-[130px] sm:right-6 sm:w-auto">
        <IslandTrigger onClick={() => setIsOpen((v) => !v)} />
      </div>
    </>
  );
}
