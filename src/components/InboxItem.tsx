import type { InboxItemData } from '../types';
import { Avatar } from './Avatar';

interface InboxItemProps {
  item: InboxItemData;
  isSelected?: boolean;
}

function formatTime(timeDisplay: InboxItemData['timeDisplay']): string {
  switch (timeDisplay) {
    case '<1hr':
      return '9:55 am';
    case '<24hr':
      return '2:30 pm';
    case '<7d':
      return 'Tue';
    case '>7d':
      return 'Jan 24';
  }
}

// Icons as inline SVGs
function HashtagIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
      <path d="M4.5 1.5L3 10.5M9 1.5L7.5 10.5M1.5 4H10.5M1 8H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function getEventTypeLabel(item: InboxItemData): { icon: React.ReactNode; text: string; channel?: string } {
  const { location, channelName } = item;

  if (location === 'Channel') {
    return { icon: null, text: '', channel: channelName };
  }

  // Multi-DM and 1:1 DM - no event type label
  return { icon: null, text: '' };
}

export function InboxItem({ item, isSelected }: InboxItemProps) {
  const isUnread = item.readState === 'unread';
  const eventType = getEventTypeLabel(item);
  const showEventType = eventType.text || eventType.channel;

  const renderAvatar = () => {
    // Always show single avatar of the person who last messaged (or @mentioned, which overrides)
    // Avatar is in item.avatars[0] - this is set in data.ts based on sender
    const avatar = item.avatars[0];

    // Location badge icon
    const renderLocationBadge = () => {
      if (item.location === 'Channel') {
        // Hashtag icon for channels
        return (
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded bg-[#78716c] flex items-center justify-center ring-2 ring-white">
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" className="text-white">
              <path d="M4.5 1.5L3 10.5M9 1.5L7.5 10.5M1.5 4H10.5M1 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        );
      }

      if (item.location === 'Multi-DM') {
        // Group icon for multi-DM
        return (
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded bg-[#78716c] flex items-center justify-center ring-2 ring-white">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-white">
              <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M1 13C1 10.5 3 9 6 9C9 9 11 10.5 11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="11" cy="5" r="2" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M12 9C14 9.5 15 10.5 15 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
        );
      }

      // 1:1 DM icon
      return (
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded bg-[#78716c] flex items-center justify-center ring-2 ring-white">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-white">
            <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M2 14C2 11 4.5 9 8 9C11.5 9 14 11 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      );
    };

    return (
      <div className="relative">
        <Avatar src={avatar} size="md" />
        {renderLocationBadge()}
      </div>
    );
  };

  return (
    <div
      className={`
        group flex items-center gap-3 px-4 py-3 cursor-pointer transition-all relative
        ${isSelected
          ? 'bg-white ring-2 ring-violet-400 rounded-lg mx-1 my-1'
          : 'bg-white'
        }
        hover:bg-[#f5f5f4]
      `}
    >
      {/* Time - top right */}
      <span className="absolute top-3 right-3 text-xs text-[#a8a29e]">
        {formatTime(item.timeDisplay)}
      </span>

      {/* Right side actions - count badge + hover buttons */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {/* Hover action buttons */}
        <div className="hidden group-hover:flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="px-2 py-1 text-xs font-medium text-[#57534e] bg-white border border-[#e7e5e4] rounded hover:bg-[#f5f5f4] hover:border-[#d6d3d1] transition-colors whitespace-nowrap"
          >
            Mark as Read
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="px-2 py-1 text-xs font-medium text-[#57534e] bg-white border border-[#e7e5e4] rounded hover:bg-[#f5f5f4] hover:border-[#d6d3d1] transition-colors"
          >
            Archive
          </button>
        </div>

        {/* Count badge */}
        {isUnread && item.count && !isSelected && (
          <div className={`
            rounded-full flex items-center justify-center
            ${item.count === 1
              ? 'w-2.5 h-2.5 bg-emerald-500'
              : 'min-w-[22px] h-[22px] px-1.5 bg-emerald-500 text-white text-xs font-semibold'
            }
          `}>
            {item.count !== 1 && item.count}
          </div>
        )}
      </div>

      {/* Checkbox */}
      <div className="shrink-0">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-[#d6d3d1] text-violet-500 focus:ring-violet-500 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {renderAvatar()}
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 ${isUnread && item.count ? 'pr-10' : ''}`}>
        {/* Top row: Event type or Name + Time */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            {/* Sender/Title */}
            <span className={`truncate ${isUnread ? 'font-semibold text-[#292524]' : 'font-medium text-[#57534e]'}`}>
              {item.title}
            </span>
            {/* Event type label */}
            {showEventType && (
              <span className="flex items-center gap-1 text-xs text-[#78716c] shrink-0">
                <span className="text-[#a8a29e]">·</span>
                {eventType.icon}
                <span>{eventType.text}</span>
                {eventType.channel && (
                  <span className="flex items-center gap-px text-[#57534e]">
                    <HashtagIcon />
                    {eventType.channel}
                  </span>
                )}
              </span>
            )}
          </div>

        </div>

        {/* Thread original message (for thread replies and @mention-in-thread) */}
        {(item.notificationType === 'thread-reply' || item.notificationType === '@mention-in-thread') && item.threadOriginalMessage && (
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-0.5 h-4 bg-[#d6d3d1] rounded-full shrink-0" />
            <p className={`text-xs truncate ${isUnread ? 'text-[#78716c]' : 'text-[#a8a29e]'}`}>
              {item.threadOriginalMessage}
            </p>
          </div>
        )}

        {/* Preview text (reply content) */}
        <p className={`text-sm truncate mt-1.5 ${isUnread ? 'text-[#57534e]' : 'text-[#a8a29e]'}`}>
          {item.preview.split(/(@\w+)/g).map((part, i) =>
            part.startsWith('@') ? (
              <span key={i} className="bg-blue-100 text-blue-600 px-0.5 rounded">
                {part}
              </span>
            ) : (
              part
            )
          )}
        </p>
      </div>
    </div>
  );
}
