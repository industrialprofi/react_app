"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Plus, Settings, LogOut, User, Crown, Menu, X, Trash2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Conversation {
  id: number;
  title?: string;
  created_at: string;
  messages: Message[];
}

interface Message {
  id: number;
  sender_type: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

interface ChatMessage {
  id: number;
  sender_type: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

interface User {
  id: number;
  username: string;
  email: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication and load user data
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    loadUserData();
    loadConversations();
  }, [router]);

  const loadUserData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load user data');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user data:', error);
      localStorage.removeItem('auth_token');
      router.push('/auth/login');
    } finally {
      setIsLoading(false);
    }
  };

  const loadConversations = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversations`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const startNewConversation = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: "Новый чат" })
  const selectConversation = async (conversation: Conversation) => {
    setCurrentConversation(conversation);
    setMessages(conversation.messages || []);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isSending) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsSending(true);

    // Add user message to UI immediately
    const tempUserMessage: Message = {
      id: Date.now(),
      sender_type: 'user',
      content: userMessage,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, tempUserMessage]);

    try {
      const response = await chatApi.sendMessage({
        message: userMessage,
        conversation_id: currentConversation?.id,
      });

      // Add assistant response
      const assistantMessage: Message = {
        id: response.message_id,
        sender_type: 'assistant',
        content: response.response,
        created_at: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Update conversation in sidebar if it was created
      if (!currentConversation && response.conversation_id) {
        await loadConversations();
        const newConv = conversations.find(c => c.id === response.conversation_id);
        if (newConv) setCurrentConversation(newConv);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      // Remove temporary message on error
      setMessages(prev => prev.filter(msg => msg.id !== tempUserMessage.id));
    } finally {
      setIsSending(false);
    }
  };

  const deleteConversation = async (conversationId: number) => {
    try {
      await conversationsApi.deleteConversation(conversationId);
      setConversations(prev => prev.filter(c => c.id !== conversationId));
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Чаты</h1>
            <Button
              onClick={() => setSidebarOpen(false)}
              variant="ghost"
              size="sm"
              className="md:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Button
            onClick={createNewConversation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Новый чат
          </Button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loadingConversations ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto"></div>
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Нет разговоров</p>
            </div>
          ) : (
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                    currentConversation?.id === conversation.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => selectConversation(conversation)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {conversation.title || 'Новый разговор'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(conversation.created_at).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conversation.id);
                      }}
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.username || 'Пользователь'}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setSidebarOpen(true)}
                variant="ghost"
                size="sm"
                className={`${sidebarOpen ? 'hidden' : 'block'}`}
              >
                <Menu className="w-4 h-4" />
              </Button>
              <h2 className="text-lg font-semibold text-gray-900">
                {currentConversation?.title || 'Выберите разговор или создайте новый'}
              </h2>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Bot className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Добро пожаловать в DreamTeamSAAS!
                </h3>
                <p className="text-gray-600 mb-6">
                  Начните разговор с ИИ-помощником для создания академических работ
                </p>
                <Button 
                  onClick={async () => {
                    try {
                      const { conversationsApi } = await import('@/lib/api');
                      const newConversation = await conversationsApi.createConversation("Новый документ");
                      router.push(`/editor/${newConversation.id}`);
                    } catch (error) {
                      console.error('Error creating document:', error);
                    }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Начать новый чат
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-3xl ${message.sender_type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender_type === 'user' 
                        ? 'bg-blue-500 ml-3' 
                        : 'bg-gray-500 mr-3'
                    }`}>
                      {message.sender_type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.sender_type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.sender_type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.created_at).toLocaleTimeString('ru-RU')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isSending && (
                <div className="flex justify-start">
                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-500 mr-3 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <div className="animate-pulse text-gray-500">ИИ печатает...</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-4">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Введите ваше сообщение..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={1}
                disabled={isSending}
              />
              <Button
                onClick={sendMessage}
                disabled={isSending || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
