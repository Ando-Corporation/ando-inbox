import type { ConversationMessage, InboxItemData } from '../types';

interface ConversationPanelProps {
  item: InboxItemData;
  messages: ConversationMessage[];
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#78716c]">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 9V14M10 6.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function HeadphonesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#78716c]">
      <path d="M4 12V10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="2" y="11" width="4" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="11" width="4" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function AttachmentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#a8a29e] hover:text-[#78716c] cursor-pointer">
      <path d="M14.5 10.5L9 16C7.34315 17.6569 4.65685 17.6569 3 16C1.34315 14.3431 1.34315 11.6569 3 10L10 3C11.1046 1.89543 12.8954 1.89543 14 3C15.1046 4.10457 15.1046 5.89543 14 7L7.5 13.5C6.94772 14.0523 6.05228 14.0523 5.5 13.5C4.94772 12.9477 4.94772 12.0523 5.5 11.5L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#a8a29e] hover:text-[#78716c] cursor-pointer">
      <path d="M6 2H11L16 7V18H6V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M11 2V7H16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

function EmojiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#a8a29e] hover:text-[#78716c] cursor-pointer">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6.5 11.5C7 13 8.5 14 10 14C11.5 14 13 13 13.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="7" cy="8" r="1" fill="currentColor"/>
      <circle cx="13" cy="8" r="1" fill="currentColor"/>
    </svg>
  );
}

export function ConversationPanel({ item, messages }: ConversationPanelProps) {
  const title = item.location === 'Channel' ? `#${item.channelName}` : item.title;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e7e5e4]">
        <h2 className="font-semibold text-[#292524]">{title}</h2>
        <div className="flex items-center gap-3">
          <button className="p-1 hover:bg-[#f5f5f4] rounded transition-colors">
            <HeadphonesIcon />
          </button>
          <button className="p-1 hover:bg-[#f5f5f4] rounded transition-colors">
            <InfoIcon />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isHighlighted ? 'bg-amber-50 -mx-4 px-4 py-2' : ''}`}
          >
            <img
              src={message.senderAvatar}
              alt=""
              className="w-9 h-9 rounded-full object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-sm text-[#292524]">{message.senderName}</span>
                <span className="text-xs text-[#a8a29e]">{message.timestamp}</span>
              </div>
              <p className="text-sm text-[#292524] mt-0.5 whitespace-pre-wrap">{message.content}</p>
              {message.reactions && message.reactions.length > 0 && (
                <div className="flex gap-1 mt-1.5">
                  {message.reactions.map((reaction, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-1 px-2 py-0.5 bg-[#f5f5f4] hover:bg-[#e7e5e4] rounded-full text-xs transition-colors"
                    >
                      <span>{reaction.emoji}</span>
                      <span className="text-[#57534e]">{reaction.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-[#e7e5e4]">
        <div className="bg-[#fafaf9] rounded-lg border border-[#e7e5e4]">
          <input
            type="text"
            placeholder="Enter your message"
            className="w-full px-3 py-2.5 bg-transparent text-sm placeholder:text-[#a8a29e] focus:outline-none"
          />
          <div className="flex items-center gap-2 px-3 py-2 border-t border-[#e7e5e4]">
            <AttachmentIcon />
            <DocumentIcon />
            <EmojiIcon />
            <div className="flex-1" />
            <button className="p-1 text-[#a8a29e]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10L16 4L10 16L9 11L4 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
