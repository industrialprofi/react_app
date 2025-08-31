"use client";

// Компонент интерфейса чата с AI
import React, { useState } from 'react';
import { chatApi } from '../../lib/api';
import { Button } from '../ui/button';

interface Message {
  id: number;
  sender_type: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

interface ChatInterfaceProps {
  conversationId?: number;
  initialMessages?: Message[];
}

export function ChatInterface({ conversationId, initialMessages = [] }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Функция отправки сообщения
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setError('');

    // Добавляем сообщение пользователя в локальный state
    const tempUserMessage: Message = {
      id: Date.now(), // Временный ID
      sender_type: 'user',
      content: userMessage,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, tempUserMessage]);

    try {
      setIsLoading(true);

      // Отправляем запрос на AI
      const response = await chatApi.sendMessage({
        message: userMessage,
        conversation_id: conversationId,
      });

      // Добавляем ответ AI в state
      const assistantMessage: Message = {
        id: response.message_id,
        sender_type: 'assistant',
        content: response.response,
        created_at: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Если conversationId не был задан, обновляем его
      if (!conversationId) {
        // В реальном приложении здесь можно обновить conversationId
        // conversationId = response.conversation_id;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка отправки сообщения');

      // Удаляем временное сообщение пользователя при ошибке
      setMessages(prev => prev.filter(msg => msg.id !== tempUserMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  // Обработчик нажатия Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Заголовок */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium">Чат с AI</h3>
      </div>

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Начните разговор с AI!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender_type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.created_at).toLocaleTimeString('ru-RU')}
                </p>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-pulse">AI печатает...</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ошибка */}
      {error && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {/* Поле ввода */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Введите ваше сообщение..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="px-6"
          >
            {isLoading ? 'Отправка...' : 'Отправить'}
          </Button>
        </div>
      </div>
    </div>
  );
}
