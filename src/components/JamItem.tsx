import type { JamItemData } from '../types';
import { Avatar, JamIcon } from './Avatar';

interface JamItemProps {
  item: JamItemData;
}

function formatTime(timeDisplay: JamItemData['timeDisplay']): string {
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

function getStatusLabel(item: JamItemData): { text: string; color: string } {
  switch (item.status) {
    case 'live':
      return { text: 'Live now', color: 'text-red-500' };
    case 'ended':
      return { text: `Ended · ${item.duration || '45m'}`, color: 'text-[#78716c]' };
    case 'missed':
      return { text: 'Missed', color: 'text-amber-500' };
    case 'scheduled':
      return { text: 'Scheduled', color: 'text-[#3b82f6]' };
  }
}

function getNotificationLabel(type: JamItemData['notificationType']): string {
  switch (type) {
    case 'started':
      return 'started a Jam';
    case 'joined':
      return 'joined the Jam';
    case 'mentioned':
      return 'mentioned you in a Jam';
    case 'recording-ready':
      return 'Recording ready';
    case 'reminder':
      return 'Jam starting soon';
  }
}

export function JamItem({ item }: JamItemProps) {
  const isUnread = item.readState === 'unread';
  const isLive = item.status === 'live';
  const statusLabel = getStatusLabel(item);

  return (
    <div
      className={`
        flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors
        ${isUnread ? 'bg-white' : 'bg-[#fafaf9]'}
        ${isLive ? 'border-l-2 border-l-red-500' : ''}
        hover:bg-[#f5f5f4]
      `}
    >
      {/* Jam Icon or Host Avatar */}
      <div className="relative flex-shrink-0">
        {item.notificationType === 'recording-ready' ? (
          <JamIcon size="md" />
        ) : (
          <Avatar src={item.hostAvatar} size="md" showOnline={isLive} />
        )}
        {/* Live pulse indicator */}
        {isLive && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center ring-2 ring-white">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Top row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={`truncate ${isUnread ? 'font-semibold text-[#292524]' : 'font-medium text-[#57534e]'}`}>
              {item.title}
            </span>
            {item.channelName && (
              <span className="text-xs text-[#78716c] shrink-0">
                <span className="text-[#a8a29e]">·</span> in #{item.channelName}
              </span>
            )}
          </div>

          {/* Status + Time */}
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-medium ${statusLabel.color}`}>
              {statusLabel.text}
            </span>
            {!isLive && (
              <span className={`text-xs ${isUnread ? 'text-[#3b82f6] font-medium' : 'text-[#a8a29e]'}`}>
                {formatTime(item.timeDisplay)}
              </span>
            )}
          </div>
        </div>

        {/* Description row */}
        <p className={`text-sm truncate mt-0.5 ${isUnread ? 'text-[#57534e]' : 'text-[#a8a29e]'}`}>
          {item.hostName} {getNotificationLabel(item.notificationType)}
        </p>

        {/* Participants row (for live/ended jams) */}
        {item.participantAvatars && item.participantAvatars.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex -space-x-1.5">
              {item.participantAvatars.slice(0, 3).map((avatar, i) => (
                <img
                  key={i}
                  src={avatar}
                  alt=""
                  className="w-5 h-5 rounded-full ring-1 ring-white object-cover"
                />
              ))}
            </div>
            {item.participantCount && item.participantCount > 3 && (
              <span className="text-xs text-[#78716c]">
                +{item.participantCount - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
