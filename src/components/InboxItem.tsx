import type { InboxItemData } from '../types';
import { Avatar, AvatarStack, ChannelIcon } from './Avatar';

interface InboxItemProps {
  item: InboxItemData;
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
function ThreadIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`shrink-0 ${className}`}>
      <path d="M2.5 3.5H9.5M2.5 6H7M2.5 8.5H5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function MentionIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`shrink-0 ${className}`}>
      <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 6C8 7.5 9 8.5 10 8C10.5 7.5 11 6.5 11 5.5C11 2.5 8.5 1 6 1C3.5 1 1 3 1 6C1 9 3.5 11 6 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function HashtagIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
      <path d="M4.5 1.5L3 10.5M9 1.5L7.5 10.5M1.5 4H10.5M1 8H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function getEventTypeLabel(item: InboxItemData): { icon: React.ReactNode; text: string; channel?: string } {
  const { location, notificationType, channelName } = item;

  if (location === 'Channel') {
    if (notificationType === '@mention') {
      return { icon: <MentionIcon />, text: 'Mention in', channel: channelName };
    }
    if (notificationType === 'thread-reply') {
      return { icon: <ThreadIcon />, text: 'Thread reply in', channel: channelName };
    }
    return { icon: null, text: 'Message in', channel: channelName };
  }

  if (location === 'Multi-DM') {
    if (notificationType === '@mention') {
      return { icon: <MentionIcon />, text: 'Mention' };
    }
    if (notificationType === 'thread-reply') {
      return { icon: <ThreadIcon />, text: 'Thread reply' };
    }
    return { icon: null, text: '' };
  }

  // 1:1 DM
  if (notificationType === 'thread-reply') {
    return { icon: <ThreadIcon />, text: 'Thread reply' };
  }
  return { icon: null, text: '' };
}

export function InboxItem({ item }: InboxItemProps) {
  const isUnread = item.readState === 'unread';
  const eventType = getEventTypeLabel(item);
  const showEventType = eventType.text || eventType.channel;

  const renderAvatar = () => {
    if (item.location === 'Channel') {
      return <ChannelIcon size="md" />;
    }

    if (item.location === '1:1 DM') {
      return <Avatar src={item.avatars[0]} size="md" showOnline={isUnread} />;
    }

    // Multi-DM
    const extraCount = item.participantDisplay === '3+-stack' ? 2 : undefined;
    return <AvatarStack avatars={item.avatars.slice(0, 2)} extraCount={extraCount} showOnline={isUnread} size="md" />;
  };

  return (
    <div
      className={`
        flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors
        ${isUnread ? 'bg-white' : 'bg-[#fafaf9]'}
        hover:bg-[#f5f5f4]
      `}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {renderAvatar()}
        {/* Notification type badge on avatar */}
        {isUnread && item.notificationType !== 'message' && (
          <div className={`
            absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center
            ring-2 ring-white
            ${item.notificationType === '@mention' ? 'bg-blue-500 text-white' : 'bg-violet-500 text-white'}
          `}>
            {item.notificationType === '@mention' ? (
              <span className="text-[10px] font-bold">@</span>
            ) : (
              <ThreadIcon className="w-3 h-3" />
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
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

          {/* Right side: Badge + Time */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Count badge */}
            {isUnread && item.count && (
              <div className={`
                rounded-full flex items-center justify-center
                ${item.count === 1
                  ? 'w-2 h-2 bg-emerald-500'
                  : 'min-w-[18px] h-[18px] px-1.5 bg-emerald-500 text-white text-[11px] font-semibold'
                }
              `}>
                {item.count !== 1 && item.count}
              </div>
            )}
            {/* Time */}
            <span className={`text-xs ${isUnread ? 'text-[#3b82f6] font-medium' : 'text-[#a8a29e]'}`}>
              {formatTime(item.timeDisplay)}
            </span>
          </div>
        </div>

        {/* Preview text */}
        <p className={`text-sm truncate mt-0.5 ${isUnread ? 'text-[#57534e]' : 'text-[#a8a29e]'}`}>
          {item.preview}
        </p>
      </div>
    </div>
  );
}
