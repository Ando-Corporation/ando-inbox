import type { InboxItemData } from '../types';
import { Avatar, AvatarStack, ChannelIcon } from './Avatar';

interface InboxItemProps {
  item: InboxItemData;
}

function formatTime(timeDisplay: InboxItemData['timeDisplay']): string {
  switch (timeDisplay) {
    case '<1hr':
      return '12m';
    case '<24hr':
      return '5h';
    case '<7d':
      return 'Tue';
    case '>7d':
      return 'Jan 24';
  }
}

function getNotificationIcon(type: InboxItemData['notificationType']): string | null {
  switch (type) {
    case '@mention':
      return '@';
    case 'thread-reply':
      return '↩';
    default:
      return null;
  }
}

export function InboxItem({ item }: InboxItemProps) {
  const isUnread = item.readState === 'unread';
  const notifIcon = getNotificationIcon(item.notificationType);

  const renderAvatar = () => {
    if (item.location === 'Channel') {
      return <ChannelIcon />;
    }

    if (item.location === '1:1 DM') {
      return <Avatar src={item.avatars[0]} />;
    }

    // Multi-DM
    const extraCount = item.participantDisplay === '3+-stack' ? 2 : undefined;
    return <AvatarStack avatars={item.avatars.slice(0, 2)} extraCount={extraCount} />;
  };

  const renderTitle = () => {
    if (item.location === 'Channel') {
      return (
        <span className="flex items-center gap-1.5">
          <span className={`${isUnread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
            #{item.channelName}
          </span>
          {item.senderName && (
            <span className="text-gray-500 text-sm font-normal">
              {item.senderName}
            </span>
          )}
        </span>
      );
    }

    return (
      <span className={`${isUnread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
        {item.title}
      </span>
    );
  };

  return (
    <div
      className={`
        flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors
        ${isUnread ? 'bg-white' : 'bg-gray-50/50'}
        hover:bg-gray-100/80
      `}
    >
      {/* Avatar/Icon */}
      <div className="relative">
        {renderAvatar()}
        {/* Notification type indicator */}
        {notifIcon && isUnread && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
            {notifIcon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {renderTitle()}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Count badge */}
            {isUnread && item.count && (
              <div className={`
                rounded-full flex items-center justify-center
                ${item.count === 1
                  ? 'w-2.5 h-2.5 bg-emerald-500'
                  : 'min-w-[20px] h-5 px-1.5 bg-emerald-500 text-white text-xs font-semibold'
                }
              `}>
                {item.count !== 1 && item.count}
              </div>
            )}
            {/* Time */}
            <span className={`text-sm ${isUnread ? 'text-gray-500' : 'text-gray-400'}`}>
              {formatTime(item.timeDisplay)}
            </span>
          </div>
        </div>

        {/* Preview text */}
        <p className={`
          text-sm truncate mt-0.5
          ${isUnread ? 'text-gray-600' : 'text-gray-400'}
        `}>
          {item.preview}
        </p>
      </div>
    </div>
  );
}
