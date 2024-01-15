"use client";

import { ChatHeader } from "@/components/chat-header";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCompletion } from "ai/react"
import { ChatForm } from "@/components/chat-form";

type ChatClientProps = {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

export const ChatClient = ({ companion }: ChatClientProps) => {
  const [messages, setMessages] = useState<any[]>(companion.messages) 

  const router = useRouter()

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(_prompt, completion) {
        const systemMessage = {
          role: "system",
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput("");

        router.refresh();
      },
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      const userMessage = {
        role: "user",
        content: input,
      };

      setMessages((current) => [...current, userMessage]);

      handleSubmit(e);
    };

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} />
      <div>
        Messages TODO
      </div>
      <ChatForm 
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};
