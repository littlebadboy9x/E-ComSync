"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"

export default function ChatbotButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([{ id: 1, text: "Hello! How can I help you today?", sender: "bot" }])
    const [newMessage, setNewMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()

        if (newMessage.trim() === "") return

        // Add user message
        const userMessage = { id: Date.now(), text: newMessage, sender: "user" }
        setMessages((prev) => [...prev, userMessage])
        setNewMessage("")
        setLoading(true)

        // Gửi message lên backend và nhận phản hồi AI
        try {
            const res = await fetch("http://localhost:8080/api/chatbot/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.text })
            })
            const data = await res.json()
            const botMessage = {
                id: Date.now() + 1,
                text: data.reply || "Xin lỗi, tôi không thể trả lời lúc này.",
                sender: "bot"
            }
            setMessages((prev) => [...prev, botMessage])
        } catch (err) {
            setMessages((prev) => [...prev, { id: Date.now() + 2, text: "Lỗi kết nối chatbot!", sender: "bot" }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600 transition-colors duration-300 z-50"
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col"
                    style={{ height: "500px" }}
                >
                    {/* Chat Header */}
                    <div className="bg-emerald-500 text-white p-4 rounded-t-lg flex items-center justify-between">
                        <div className="flex items-center">
                            <MessageCircle className="h-5 w-5 mr-2" />
                            <h3 className="font-semibold">AI Assistant</h3>
                        </div>
                        <button onClick={toggleChat}>
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                                            message.sender === "user"
                                                ? "bg-emerald-500 text-white rounded-br-none"
                                                : "bg-gray-100 text-gray-800 rounded-bl-none"
                                        }`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} className="border-t p-4 flex">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            disabled={loading}
                        />
                        <button type="submit" className="bg-emerald-500 text-white px-4 py-2 rounded-r-lg hover:bg-emerald-600" disabled={loading}>
                            <Send className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}
