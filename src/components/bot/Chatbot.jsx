import { useState, useRef, useEffect } from "react"
import { Send, X, Bot } from "lucide-react"
import "./chatbot.css"

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm your EcoRewards assistant. How can I help you with recycling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [isOpen, messages])

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInputValue("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "Recycling plastic bottles can save up to 60% of energy compared to producing new ones!",
        "Did you know? Every ton of recycled paper saves about 17 trees.",
        "You can earn 10 points for every plastic bottle you recycle with us!",
        "Our nearest recycling center is open Monday-Saturday, 9am-5pm.",
        "Check your rewards balance in the dashboard section of your account.",
        "Thanks for helping the environment! Every small action counts.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <Bot size={20} />
              <span>Reco The Chatbot</span>
            </div>
            <button className="chatbot-close-btn" onClick={toggleChat} aria-label="Close chat">
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message ${message.sender === "bot" ? "bot-message" : "user-message"}`}
              >
                {message.sender === "bot" && (
                  <div className="message-avatar">
                    <Bot size={16} />
                  </div>
                )}
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">{formatTime(message.timestamp)}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              ref={inputRef}
            />
            <button
              className="chatbot-send-btn"
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ""}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button className={`chatbot-toggle ${isOpen ? "active" : ""}`} onClick={toggleChat} aria-label="Toggle chat">
        <div className="chatbot-toggle-content">
          {isOpen ? <X size={24} /> : <Bot size={24} />}
          {!isOpen && <span className="chatbot-toggle-text">Ask Reco</span>}
        </div>
      </button>
    </div>
  )
}

export default Chatbot