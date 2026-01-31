export type Location = '1:1 DM' | 'Multi-DM' | 'Channel';
export type ParticipantDisplay = '2-avatars' | '3+-stack' | null;
export type NotificationType = 'message' | '@mention' | 'thread-reply' | '@mention-in-thread';
export type ReadState = 'unread' | 'read';
export type Count = number | null;
export type TimeDisplay = '<1hr' | '<24hr' | '<7d' | '>7d';
export type NotificationSource = 'Messages' | 'Jams' | 'Invites';

export interface InboxItemData {
  id: number;
  source: NotificationSource;
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

  // Jams-specific
  jamNotificationType?: JamNotificationType;
  jamDuration?: string;
  jamThreadContext?: string;

  // Invites-specific
  inviteType?: 'channel' | 'group-dm';
  inviteDescription?: string;
  isPrivateChannel?: boolean;
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
export type JamNotificationType =
  | 'channel-started'    // Jam started in a channel you're in
  | 'thread-started'     // Jam started in a thread you're inside of
  | 'transcript-ready'   // Jam ended and transcript is ready
  | 'invited-dm'         // Someone invited you to jam 1-1
  | 'invited-group';     // Someone invited you to jam in group DM

export interface JamItemData {
  id: number;
  notificationType: JamNotificationType;
  readState: ReadState;
  timeDisplay: TimeDisplay;

  // Display data
  title: string;
  starterName: string;
  starterAvatar: string;
  channelName?: string;
  threadContext?: string; // Original thread message for thread-started
  duration?: string;      // For transcript-ready
}

// Invites types
export type InviteType = 'channel' | 'group-dm';

export interface InviteItemData {
  id: number;
  inviteType: InviteType;
  readState: ReadState;
  timeDisplay: TimeDisplay;

  // Display data
  title: string;
  description: string;
  inviterName: string;
  inviterAvatar: string;
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
  isHighlighted?: boolean; // Yellow background for unread messages
  isMention?: boolean; // Message contains an @mention
  isThreadParent?: boolean; // Original message that has thread replies
  threadReplies?: ConversationMessage[]; // Nested thread replies
  reactions?: { emoji: string; count: number }[];
}
