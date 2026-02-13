"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Send, Square, PhoneOff, Video, VideoOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatComposerProps {
  onSendMessage?: (text: string) => void;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  onEndCall?: () => void;
  onToggleCamera?: (enabled: boolean) => void;
  cameraEnabled?: boolean;
  isRecording?: boolean;
  isProcessing?: boolean;
  disabled?: boolean;
  placeholder?: string;
  isVideoMode?: boolean;
}

export default function ChatComposer({
  onSendMessage,
  onStartRecording,
  onStopRecording,
  onEndCall,
  onToggleCamera,
  cameraEnabled = false,
  isRecording = false,
  isProcessing = false,
  disabled = false,
  placeholder = "Type your response...",
  isVideoMode = false,
}: ChatComposerProps) {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && onSendMessage && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={cn(
      "sticky bottom-0 z-10",
      isVideoMode 
        ? "px-0" 
        : "border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    )}>
      <div className={cn(
        "mx-auto",
        isVideoMode 
          ? "w-full px-4 py-3" 
          : "max-w-3xl px-6 py-4"
      )}>
        <div className={cn(
          isVideoMode && "rounded-lg border border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-4 py-3 shadow-lg"
        )}>
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {/* Camera Toggle Button */}
          {onToggleCamera && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 flex-shrink-0 transition-colors duration-300",
                cameraEnabled && "bg-primary/10 text-primary hover:bg-primary/20"
              )}
              onClick={() => onToggleCamera(!cameraEnabled)}
              disabled={disabled || isProcessing}
              title={cameraEnabled ? "Turn off camera" : "Turn on camera"}
            >
              {cameraEnabled ? (
                <VideoOff className="h-4 w-4" />
              ) : (
                <Video className="h-4 w-4" />
              )}
              <span className="sr-only">{cameraEnabled ? "Turn off camera" : "Turn on camera"}</span>
            </Button>
          )}

          {/* Mic Button - Shows recording state */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 flex-shrink-0 transition-colors duration-300 relative",
              isRecording && "bg-primary/10 text-primary hover:bg-primary/20"
            )}
            onClick={onStartRecording}
            disabled={disabled || isProcessing}
            title={isRecording ? "Click to mute" : "Click to unmute"}
          >
            {isRecording ? (
              <>
                <Mic className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse border-2 border-background" />
              </>
            ) : (
              <MicOff className="h-4 w-4" />
            )}
            <span className="sr-only">{isRecording ? "Mute" : "Unmute"}</span>
          </Button>

          {/* Text Input */}
          <div className="flex-1 rounded-lg border border-border bg-background focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled || isProcessing}
              rows={1}
              className={cn(
                "w-full resize-none border-0 bg-transparent px-4 py-2.5 text-sm",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-0",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 flex-shrink-0 transition-colors duration-300"
            disabled={disabled || isProcessing || !inputValue.trim()}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>

          {/* End Call Button */}
          {onEndCall && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 flex-shrink-0 transition-colors duration-300 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={onEndCall}
              disabled={disabled || isProcessing}
              title="End call"
            >
              <PhoneOff className="h-4 w-4" />
              <span className="sr-only">End call</span>
            </Button>
          )}
          </form>

          {/* Helper Text */}
          {!isVideoMode && (
            <p className="mt-2 text-xs text-center text-muted-foreground">
              Press Enter to send, Shift+Enter for new line
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
