import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  Zap,
  BrainCircuit,
  MessageSquare,
  RotateCcw,
} from 'lucide-react';
import { BrandBible, ChatMessage, ChatModel } from '../types';

interface CreativeDirectorChatProps {
  isOpen: boolean;
  onClose: () => void;
  brandContext: BrandBible | null;
}

export const CreativeDirectorChat: React.FC<CreativeDirectorChatProps> = ({
  isOpen,
  onClose,
  brandContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: brandContext
        ? `Hello! I am your Senior Brand Strategist & Creative Director. I have reviewed your Brand Bible for **${brandContext.brandName}** (${brandContext.archetype}). How can I help refine your visual language, color harmony, typography, or campaign hooks today?`
        : `Hello! I am your Senior Brand Strategist & Creative Director. Generate a Brand Bible or describe your company vision, and I'll help you craft a distinctive brand identity.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState<ChatModel>('gemini-3.5-flash');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedHistory,
          model: selectedModel,
          brandContext,
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat error: ${response.statusText}`);
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: 'msg-reply-' + Date.now(),
        role: 'assistant',
        text: data.text || 'No response received from Creative Director.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || selectedModel,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'assistant',
        text: `Consultant note: ${err?.message || 'Unable to connect to brand consultant service.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'reset-' + Date.now(),
        role: 'assistant',
        text: `Thread reset. Ready to consult on ${brandContext?.brandName || 'your brand identity'}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const promptSuggestions = [
    'Suggest 5 punchy tagline variations',
    'How should we apply our 5-color palette to digital dark mode?',
    'Recommend alternative Google Font pairings for luxury feel',
    'Write an Instagram launch caption in our brand voice',
  ];

  if (!isOpen) return null;

  return (
    <aside
      id="brand-consultant-drawer"
      aria-label="Brand Consultant Chat"
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white border-l border-slate-200 shadow-2xl flex flex-col transition-all duration-300 animate-in slide-in-from-right"
    >
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
              Creative Director AI
            </h3>
            <p className="text-[11px] text-slate-400">
              Brand Identity Consultant & Typography Advisor
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset conversation thread"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close Brand Consultant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Model Selection Bar (Gemini 3.5 Flash / 3.1 Pro / 3.1 Flash Lite) */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium text-[11px] flex items-center gap-1">
          <Bot className="w-3.5 h-3.5 text-slate-400" />
          Model Role:
        </span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
          <button
            onClick={() => setSelectedModel('gemini-3.5-flash')}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-colors ${
              selectedModel === 'gemini-3.5-flash'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="gemini-3.5-flash: Ideal for general brand guidance"
          >
            3.5 Flash
          </button>
          <button
            onClick={() => setSelectedModel('gemini-3.1-pro-preview')}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-colors flex items-center gap-1 ${
              selectedModel === 'gemini-3.1-pro-preview'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="gemini-3.1-pro-preview: Deep strategic reasoning & complex brand architecture"
          >
            <BrainCircuit className="w-3 h-3 text-amber-400" />
            3.1 Pro
          </button>
          <button
            onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-colors flex items-center gap-1 ${
              selectedModel === 'gemini-3.1-flash-lite'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="gemini-3.1-flash-lite: Fast turnarounds & quick edits"
          >
            <Zap className="w-3 h-3 text-emerald-500" />
            Lite
          </button>
        </div>
      </div>

      {/* Scrollable Message Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => {
          const isAssistant = m.role === 'assistant';
          const isCopied = copiedId === m.id;
          return (
            <div
              key={m.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                isAssistant ? 'justify-start' : 'justify-end'
              }`}
            >
              {isAssistant && (
                <div className="w-7 h-7 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div className="group relative max-w-[85%]">
                <div
                  className={`p-3 rounded-2xl ${
                    isAssistant
                      ? 'bg-slate-100 text-slate-800 rounded-tl-sm'
                      : 'bg-slate-900 text-white rounded-tr-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                </div>

                <div
                  className={`flex items-center gap-2 mt-1 text-[10px] text-slate-400 px-1 ${
                    isAssistant ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <span>{m.timestamp}</span>
                  {m.modelUsed && (
                    <span className="font-mono text-[9px] bg-slate-100 px-1 rounded-sm text-slate-500">
                      {m.modelUsed.replace('gemini-', '')}
                    </span>
                  )}
                  {isAssistant && (
                    <button
                      onClick={() => handleCopyText(m.text, m.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-slate-700"
                      title="Copy response"
                    >
                      {isCopied ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {!isAssistant && (
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 text-xs justify-start">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="p-3 bg-slate-100 text-slate-500 rounded-2xl rounded-tl-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
              <div
                className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"
                style={{ animationDelay: '0.2s' }}
              />
              <div
                className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"
                style={{ animationDelay: '0.4s' }}
              />
              <span className="text-[11px] font-medium ml-1">
                Consultant is formulating recommendations...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="p-2.5 bg-slate-50/90 border-t border-slate-200 shrink-0">
        <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 px-1 flex items-center gap-1">
          <MessageSquare className="w-3 h-3" />
          <span>Quick Strategy Inquiries</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {promptSuggestions.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-[11px] whitespace-nowrap bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 px-2.5 py-1 rounded-full transition-colors shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Message Form */}
      <div className="p-3 border-t border-slate-200 bg-white shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask the Creative Director anything..."
            disabled={isLoading}
            className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white transition-all shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </aside>
  );
};
