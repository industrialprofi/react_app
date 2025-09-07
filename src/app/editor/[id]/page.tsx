"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../lib/auth-context";
import { conversationsApi } from "../../../lib/api";
import { motion } from "framer-motion";
import { 
  Save, 
  Download, 
  FileText, 
  Menu, 
  X, 
  Plus,
  Trash2,
  Edit3,
  Clock,
  User
} from "lucide-react";
import { Button, Spinner } from "flowbite-react";

interface Document {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  
  const [document, setDocument] = useState<Document | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Новый документ");
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Load document and user documents
  useEffect(() => {
    if (isAuthenticated && params.id) {
      loadDocument(params.id as string);
      loadUserDocuments();
    }
  }, [isAuthenticated, params.id]);

  const loadDocument = async (docId: string) => {
    try {
      const numericId = parseInt(docId);
      if (isNaN(numericId)) {
        // Create new document if ID is not numeric
        const newConversation = await conversationsApi.createConversation("Новый документ");
        const newDoc: Document = {
          id: newConversation.id,
          title: newConversation.title || "Новый документ",
          content: "",
          created_at: newConversation.created_at
        };
        setDocument(newDoc);
        setTitle(newDoc.title);
        setContent(newDoc.content);
        return;
      }

      const conversation = await conversationsApi.getConversation(numericId);
      
      // Extract content from the last user message
      const userMessages = conversation.messages?.filter(m => m.sender_type === 'user') || [];
      const lastUserMessage = userMessages[userMessages.length - 1];
      
      const doc: Document = {
        id: conversation.id,
        title: conversation.title || "Без названия",
        content: lastUserMessage?.content || "",
        created_at: conversation.created_at
      };
      
      setDocument(doc);
      setTitle(doc.title);
      setContent(doc.content);
    } catch (error) {
      console.error('Error loading document:', error);
      // Create new document on error
      const newConversation = await conversationsApi.createConversation("Новый документ");
      const newDoc: Document = {
        id: newConversation.id,
        title: newConversation.title || "Новый документ",
        content: "",
        created_at: newConversation.created_at
      };
      setDocument(newDoc);
      setTitle(newDoc.title);
      setContent(newDoc.content);
    }
  };

  const loadUserDocuments = async () => {
    try {
      const conversations = await conversationsApi.getConversations();
      
      const docs: Document[] = conversations.map(conv => {
        // Extract content from messages (last user message as content)
        const userMessages = conv.messages?.filter((m: any) => m.sender_type === 'user') || [];
        const lastContent = userMessages.length > 0 ? userMessages[userMessages.length - 1].content : "";
        
        return {
          id: conv.id,
          title: conv.title || "Новый документ",
          content: lastContent,
          created_at: conv.created_at
        };
      });
      
      setDocuments(docs);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const saveDocument = async () => {
    if (!document) return;
    
    setIsSaving(true);
    try {
      // Update conversation title if changed
      if (document.title !== title) {
        await conversationsApi.updateConversation(document.id, title);
      }
      
      // Save content as message if changed and not empty
      if (document.content !== content && content.trim()) {
        await conversationsApi.addMessageToConversation(document.id, content);
      }
      
      const updatedDoc = {
        ...document,
        title,
        content
      };
      
      setDocument(updatedDoc);
    } catch (error) {
      console.error('Error saving document:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const createNewDocument = async () => {
    try {
      const newConversation = await conversationsApi.createConversation("Новый документ");
      router.push(`/editor/${newConversation.id}`);
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  const deleteDocument = async (docId: number) => {
    try {
      await conversationsApi.deleteConversation(docId);
      setDocuments(prev => prev.filter(doc => doc.id !== docId));
      
      if (document?.id === docId) {
        createNewDocument();
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const exportDocument = () => {
    if (typeof window === 'undefined') return;
    
    const element = window.document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title}.txt`;
    window.document.body.appendChild(element);
    element.click();
    window.document.body.removeChild(element);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="xl" />
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
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Мои документы</h1>
            <Button color="light" onClick={() => setSidebarOpen(false)} size="sm" className="md:hidden">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Button color="blue" onClick={createNewDocument} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Новый документ
          </Button>
        </div>

        {/* Documents List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {documents.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                  document?.id === doc.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => router.push(`/editor/${doc.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {doc.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(doc.created_at).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                  <Button color="light"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteDocument(doc.id);
                    }}
                    size="sm"
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.username || 'Пользователь'}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button color="light" onClick={() => setSidebarOpen(true)} size="sm" className={`${sidebarOpen ? 'hidden' : 'block'}`}>
                <Menu className="w-4 h-4" />
              </Button>
              
              {/* Document Title */}
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-500" />
                {isEditing ? (
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    onKeyPress={(e) => e.key === 'Enter' && setIsEditing(false)}
                    className="text-lg font-semibold text-gray-900 bg-transparent border-b border-blue-500 focus:outline-none"
                    autoFocus
                  />
                ) : (
                  <h2 
                    className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                    onClick={() => setIsEditing(true)}
                  >
                    {title}
                  </h2>
                )}
                <Button color="light" onClick={() => setIsEditing(true)} size="sm" className="opacity-50 hover:opacity-100">
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button color="light" onClick={exportDocument} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Экспорт
              </Button>
              <Button color="blue" onClick={saveDocument} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto h-full">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Начните писать ваш документ здесь..."
              className="w-full h-full resize-none border-none outline-none text-gray-900 text-lg leading-relaxed bg-transparent"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
