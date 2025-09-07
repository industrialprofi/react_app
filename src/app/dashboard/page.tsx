'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Plus, Settings, LogOut, User, Crown, Menu, X, Trash2, Send } from 'lucide-react';
import { Button, Spinner, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import config from '@/lib/config';
import { getAuthHeaders } from '@/lib/api';

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
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface User {
  id: number;
  email: string;
  username?: string;
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
      const response = await fetch(`${config.API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('auth_token');
          router.push('/auth/login');
          return;
        }
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
      const response = await fetch(`${config.API_BASE_URL}/conversations`, {
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      } else if (response.status === 401) {
        localStorage.removeItem('auth_token');
        router.push('/auth/login');
      } else {
        console.error('Failed to load conversations:', response.statusText);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const startNewConversation = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/conversations`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ title: "Новый чат" })
      });

      if (response.ok) {
        const newConversation = await response.json();
        setConversations(prev => [newConversation, ...prev]);
        setCurrentConversationId(newConversation.id);
        setMessages([]);
      } else if (response.status === 401) {
        router.push('/auth/login');
      } else {
        console.error('Failed to create conversation:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const selectConversation = (conversation: Conversation) => {
    setCurrentConversationId(conversation.id);
    
    const chatMessages: ChatMessage[] = conversation.messages.map(msg => ({
      id: msg.id.toString(),
      type: msg.sender_type === 'user' ? 'user' : 'assistant',
      content: msg.content,
      timestamp: new Date(msg.created_at)
    }));
    
    setMessages(chatMessages);
    setSidebarOpen(false);
  };

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // Use SSE streaming endpoint
      const response = await fetch(`${config.API_BASE_URL}/chat/stream`, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          Accept: 'text/event-stream'
        },
        body: JSON.stringify({
          message: messageToSend,
          conversation_id: currentConversationId || undefined
        })
      });

      if (response.status === 401) {
        router.push('/auth/login');
        return;
      }
      if (response.status === 402) {
        router.push('/subscriptions');
        return;
      }
      if (response.status === 429) {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: 'Вы превысили лимит запросов. Попробуйте позже или обновите план подписки.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        return;
      }
      if (response.status === 404) {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: 'Разговор не найден. Создайте новый чат и попробуйте снова.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        return;
      }
      if (!response.ok || !response.body) {
        throw new Error('Failed to start streaming');
      }

      // Create placeholder assistant message for streaming
      const streamMessageId = (Date.now() + 2).toString();
      setMessages(prev => [
        ...prev,
        { id: streamMessageId, type: 'assistant', content: '', timestamp: new Date() }
      ]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      // Helper to apply delta chunk to the last assistant message
      const applyDelta = (delta: string) => {
        if (!delta) return;
        setMessages(prev => prev.map(m => (
          m.id === streamMessageId ? { ...m, content: m.content + delta } : m
        )));
      };

      // Parse SSE events: split by double newlines, extract lines starting with 'data:'
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let sepIndex;
        // Process complete SSE events
        while ((sepIndex = buffer.indexOf('\n\n')) !== -1) {
          const rawEvent = buffer.slice(0, sepIndex);
          buffer = buffer.slice(sepIndex + 2);

          const lines = rawEvent.split('\n');
          const dataLines = lines
            .filter(l => l.startsWith('data:'))
            .map(l => l.replace(/^data:\s?/, ''));
          const dataPayload = dataLines.join('\n');

          if (dataPayload === '[DONE]') {
            // end of stream marker
            break;
          }

          // Some servers may send JSON per chunk; try parse, fallback to raw text
          try {
            const parsed = JSON.parse(dataPayload);
            // Accept either { token: '...' } or { content: '...' }
            const delta = parsed.token || parsed.content || '';
            applyDelta(delta);
          } catch (_) {
            applyDelta(dataPayload);
          }
        }
      }

      // Ensure any remaining buffered text is applied
      if (buffer.trim()) {
        try {
          const parsed = JSON.parse(buffer.trim());
          const delta = parsed.token || parsed.content || '';
          applyDelta(delta);
        } catch (_) {
          applyDelta(buffer.trim());
        }
        buffer = '';
      }

      // Optionally reload conversations to reflect latest state
      if (!currentConversationId) {
        loadConversations();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Извините, произошла ошибка при отправке сообщения.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const deleteConversation = async (conversationId: number) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/conversations/${conversationId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        setConversations(prev => prev.filter(conv => conv.id !== conversationId));
        
        if (currentConversationId === conversationId) {
          setCurrentConversationId(null);
          setMessages([]);
        }
      } else if (response.status === 401) {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-blue-600" />
            <span className="text-lg font-semibold">AI Assistant</span>
          </div>
          <Button color="light" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <Button color="blue" onClick={startNewConversation} className="w-full mb-4">
              <Plus className="w-4 h-4 mr-2" />
              Новый чат
            </Button>

            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`group p-3 rounded-lg cursor-pointer transition-colors ${
                    currentConversationId === conversation.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => selectConversation(conversation)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {conversation.title || 'Новый чат'}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(conversation.created_at).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    <Button color="light"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conversation.id);
                      }}
                      size="sm"
                      className="opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.username || user?.email}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button color="light" size="sm" className="flex-1" onClick={() => router.push('/subscriptions')}>
              <Crown className="w-4 h-4 mr-2" />
              Подписка
            </Button>
            <Button color="light" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-4 py-3 flex items-center justify-between lg:justify-end">
          <Button color="light" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="w-4 h-4" />
          </Button>
        </header>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Bot className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Добро пожаловать в AI Assistant!
                </h3>
                <p className="text-gray-600 mb-6">
                  Начните разговор с ИИ-помощником
                </p>
                <Button color="blue" onClick={startNewConversation}>
                  <Plus className="w-4 h-4 mr-2" />
                  Начать новый чат
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border shadow-sm'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border shadow-sm rounded-lg px-4 py-2">
                    <Spinner size="sm" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Message Input */}
          <div className="border-t bg-white p-4">
            <div className="flex space-x-4">
              <TextInput
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Введите сообщение..."
                className="flex-1"
              />
              <Button color="blue" onClick={sendMessage} disabled={isTyping || !currentMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
