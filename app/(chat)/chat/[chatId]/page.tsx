import db from "@/lib/prismadb"
import { auth, redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { ChatClient } from "../_components/client"

interface ChatIdPageProps {
    params: {
        chatId: string
    }
}

const ChatIdPage = async ({params}: ChatIdPageProps) => {
  const { userId } = auth()

  if(!userId) return redirectToSignIn()

  const companion = await db.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
            messages: true
        }
      },
    },
  });

  if(!companion) {
    return redirect('/')
  }

  return (
    <ChatClient companion={companion} />
  )
}

export default ChatIdPage