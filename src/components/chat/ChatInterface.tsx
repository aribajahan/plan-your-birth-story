import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/shared";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  inputMessage: string;
  isLoading: boolean;
  isListening: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onToggleListening: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatInterface = ({
  messages,
  inputMessage,
  isLoading,
  isListening,
  messagesEndRef,
  onInputChange,
  onSendMessage,
  onToggleListening,
  onKeyPress
}: ChatInterfaceProps) => {
  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                "max-w-[80%] p-4 rounded-lg",
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              )}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleListening}
            className={cn(
              isListening && "bg-red-100 text-red-600 hover:bg-red-200"
            )}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button 
            onClick={onSendMessage} 
            disabled={!inputMessage.trim() || isLoading}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};