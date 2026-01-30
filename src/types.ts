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
