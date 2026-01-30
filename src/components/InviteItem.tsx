import type { InviteItemData } from '../types';
import { ChannelIcon, JamIcon } from './Avatar';

interface InviteItemProps {
  item: InviteItemData;
}

function formatTime(timeDisplay: InviteItemData['timeDisplay']): string {
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

function getInviteIcon(item: InviteItemData) {
  switch (item.inviteType) {
    case 'channel':
      return <ChannelIcon size="md" isPrivate={item.isPrivate} />;
    case 'jam':
      return <JamIcon size="md" />;
    case 'workspace':
      return (
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
            <rect x="3" y="3" width="6" height="6" rx="1" fill="currentColor"/>
            <rect x="11" y="3" width="6" height="6" rx="1" fill="currentColor"/>
            <rect x="3" y="11" width="6" height="6" rx="1" fill="currentColor"/>
            <rect x="11" y="11" width="6" height="6" rx="1" fill="currentColor"/>
          </svg>
        </div>
      );
    case 'document':
      return (
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
            <path d="M4 3H12L16 7V17H4V3Z" fill="currentColor"/>
            <path d="M12 3V7H16" stroke="white" strokeWidth="1.5"/>
          </svg>
        </div>
      );
  }
}

function getInviteTypeLabel(type: InviteItemData['inviteType']): string {
  switch (type) {
    case 'channel':
      return 'Channel invite';
    case 'jam':
      return 'Jam invite';
    case 'workspace':
      return 'Workspace invite';
    case 'document':
      return 'Document invite';
  }
}

function getStatusStyle(status: InviteItemData['status']): { bg: string; text: string; label: string } {
  switch (status) {
    case 'pending':
      return { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Pending' };
    case 'accepted':
      return { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Accepted' };
    case 'declined':
      return { bg: 'bg-gray-100', text: 'text-gray-500', label: 'Declined' };
    case 'expired':
      return { bg: 'bg-red-50', text: 'text-red-500', label: 'Expired' };
  }
}

export function InviteItem({ item }: InviteItemProps) {
  const isPending = item.status === 'pending';
  const statusStyle = getStatusStyle(item.status);

  return (
    <div
      className={`
        flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors
        ${isPending ? 'bg-white' : 'bg-[#fafaf9]'}
        hover:bg-[#f5f5f4]
      `}
    >
      {/* Invite type icon */}
      <div className="flex-shrink-0">
        {getInviteIcon(item)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Top row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={`truncate ${isPending ? 'font-semibold text-[#292524]' : 'font-medium text-[#57534e]'}`}>
              {item.title}
            </span>
            <span className="text-xs text-[#78716c] shrink-0">
              <span className="text-[#a8a29e]">·</span> {getInviteTypeLabel(item.inviteType)}
            </span>
          </div>

          {/* Status badge + Time */}
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
              {statusStyle.label}
            </span>
            <span className={`text-xs ${isPending ? 'text-[#3b82f6] font-medium' : 'text-[#a8a29e]'}`}>
              {formatTime(item.timeDisplay)}
            </span>
          </div>
        </div>

        {/* Description row */}
        <p className={`text-sm truncate mt-0.5 ${isPending ? 'text-[#57534e]' : 'text-[#a8a29e]'}`}>
          {item.description}
        </p>

        {/* Inviter row */}
        <div className="flex items-center gap-2 mt-2">
          <img
            src={item.inviterAvatar}
            alt=""
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-xs text-[#78716c]">
            Invited by {item.inviterName}
          </span>
        </div>

        {/* Action buttons for pending invites */}
        {isPending && (
          <div className="flex items-center gap-2 mt-3">
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-[#292524] rounded-md hover:bg-[#44403c] transition-colors">
              Accept
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-[#57534e] bg-[#f5f5f4] rounded-md hover:bg-[#e7e5e4] transition-colors">
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
