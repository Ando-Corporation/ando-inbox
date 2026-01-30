export type Location = '1:1 DM' | 'Multi-DM' | 'Channel';
export type ParticipantDisplay = '2-avatars' | '3+-stack' | null;
export type NotificationType = 'message' | '@mention' | 'thread-reply';
export type ReadState = 'unread' | 'read';
export type Count = 1 | '2+' | null;
export type TimeDisplay = '<1hr' | '<24hr' | '<7d' | '>7d';

export interface InboxItemData {
  id: number;
  location: Location;
  participantDisplay?: ParticipantDisplay;
  notificationType: NotificationType;
  readState: ReadState;
  count: Count;
  timeDisplay: TimeDisplay;

  // Display data
  title: string;
  preview: string;
  avatars: string[];
  channelName?: string;
  senderName?: string;
  threadOriginalMessage?: string; // Original message being replied to (for thread-reply type)
}

export interface PrototypeState {
  id: number;
  location: Location;
  participantDisplay?: ParticipantDisplay;
  notificationType: NotificationType;
  readState: ReadState;
  count: Count;
  notes: string;
}

// Jams types
export type JamStatus = 'live' | 'ended' | 'missed' | 'scheduled';
export type JamNotificationType = 'started' | 'joined' | 'mentioned' | 'recording-ready' | 'reminder';

export interface JamItemData {
  id: number;
  status: JamStatus;
  notificationType: JamNotificationType;
  readState: ReadState;
  timeDisplay: TimeDisplay;

  // Display data
  title: string;
  hostName: string;
  hostAvatar: string;
  participantCount?: number;
  participantAvatars?: string[];
  channelName?: string;
  duration?: string;
}

// Invites types
export type InviteType = 'channel' | 'jam' | 'workspace' | 'document';
export type InviteStatus = 'pending' | 'accepted' | 'declined' | 'expired';

export interface InviteItemData {
  id: number;
  inviteType: InviteType;
  status: InviteStatus;
  timeDisplay: TimeDisplay;

  // Display data
  title: string;
  description: string;
  inviterName: string;
  inviterAvatar: string;
  channelName?: string;
  isPrivate?: boolean;
}

// Conversation types
export interface ConversationMessage {
  id: number;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isCurrentUser?: boolean;
  isHighlighted?: boolean;
  reactions?: { emoji: string; count: number }[];
}
