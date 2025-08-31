"use client";

// Компонент для списка разговоров пользователя
import React, { useState, useEffect } from 'react';
import { conversationsApi } from '../../lib/api';
import { Button } from '../ui/button';

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

export function ConversationList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // Загружаем список разговоров при монтировании компонента
  useEffect(() => {
    loadConversations();
  }, []);

  // Функция загрузки разговоров
  const loadConversations = async () => {
    try {
      setIsLoading(true);
      const data = await conversationsApi.getConversations();
      setConversations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки разговоров');
    } finally {
      setIsLoading(false);
    }
  };

  // Функция создания нового разговора
  const handleCreateConversation = async () => {
    try {
      const newConversation = await conversationsApi.createConversation('Новый разговор');
      setConversations([newConversation, ...conversations]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка создания разговора');
    }
  };

  // Функция начала редактирования названия
  const handleStartEdit = (conversation: Conversation) => {
    setEditingId(conversation.id);
    setEditTitle(conversation.title || '');
  };

  // Функция сохранения изменений названия
  const handleSaveEdit = async () => {
    if (!editingId) return;

    try {
      await conversationsApi.updateConversation(editingId, editTitle);
      setConversations(conversations.map(conv =>
        conv.id === editingId ? { ...conv, title: editTitle } : conv
      ));
      setEditingId(null);
      setEditTitle('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка обновления разговора');
    }
  };

  // Функция отмены редактирования
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  // Функция удаления разговора
  const handleDeleteConversation = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот разговор?')) return;

    try {
      await conversationsApi.deleteConversation(id);
      setConversations(conversations.filter(conv => conv.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления разговора');
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Загрузка разговоров...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Мои разговоры</h2>
        <Button onClick={handleCreateConversation}>
          Создать новый разговор
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {conversations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          У вас пока нет разговоров. Создайте первый!
        </div>
      ) : (
        <div className="space-y-4">
          {conversations.map((conversation) => (
            <div key={conversation.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center">
                {editingId === conversation.id ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Название разговора"
                    />
                    <Button onClick={handleSaveEdit} size="sm">
                      Сохранить
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline" size="sm">
                      Отмена
                    </Button>
                  </div>
                ) : (
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">
                      {conversation.title || 'Без названия'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Создан: {new Date(conversation.created_at).toLocaleDateString('ru-RU')}
                    </p>
                    <p className="text-sm text-gray-600">
                      Сообщений: {conversation.messages.length}
                    </p>
                  </div>
                )}

                {editingId !== conversation.id && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleStartEdit(conversation)}
                      variant="outline"
                      size="sm"
                    >
                      Редактировать
                    </Button>
                    <Button
                      onClick={() => handleDeleteConversation(conversation.id)}
                      variant="destructive"
                      size="sm"
                    >
                      Удалить
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
