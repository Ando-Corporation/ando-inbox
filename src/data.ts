import type { InboxItemData, PrototypeState } from './types';

// Sample avatar URLs using UI Faces alternative
const avatars = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey',
];

const names = ['Sara Du', 'Alex Chen', 'Jordan Kim', 'Taylor Smith', 'Morgan Lee', 'Casey Park'];
const channelNames = ['product', 'engineering', 'design', 'general', 'announcements'];
const previews = {
  message: [
    'Hey, can we chat about the new feature?',
    'Just pushed the latest changes',
    'The design looks great!',
    'Let me know when you have time',
  ],
  '@mention': [
    '@you What do you think about this approach?',
    '@you Can you review this PR?',
    '@you Great work on the launch!',
  ],
  'thread-reply': [
    'Replied to your message: I agree with this direction',
    'Replied: That makes sense, let\'s proceed',
    'Replied to thread: Updated the doc',
  ],
};

// All 33 prototype states from the spec
export const prototypeStates: PrototypeState[] = [
  // 1:1 DM (6 states)
  { id: 1, location: '1:1 DM', notificationType: 'message', readState: 'unread', count: 1, notes: 'Single new message' },
  { id: 2, location: '1:1 DM', notificationType: 'message', readState: 'unread', count: '2+', notes: 'Multiple new messages' },
  { id: 3, location: '1:1 DM', notificationType: 'message', readState: 'read', count: null, notes: 'Read messages' },
  { id: 4, location: '1:1 DM', notificationType: 'thread-reply', readState: 'unread', count: 1, notes: 'Single thread reply' },
  { id: 5, location: '1:1 DM', notificationType: 'thread-reply', readState: 'unread', count: '2+', notes: 'Multiple thread replies' },
  { id: 6, location: '1:1 DM', notificationType: 'thread-reply', readState: 'read', count: null, notes: 'Read thread' },

  // Multi-DM 2-avatars (9 states)
  { id: 7, location: 'Multi-DM', participantDisplay: '2-avatars', notificationType: 'message', readState: 'unread', count: 1, notes: '3-person group, single message' },
  { id: 8, location: 'Multi-DM', participantDisplay: '2-avatars', notificationType: 'message', readState: 'unread', count: '2+', notes: '3-person group, multiple messages' },
  { id: 9, location: 'Multi-DM', participantDisplay: '2-avatars', notificationType: 'message', readState: 'read', count: null, notes: '3-person group, read' },
  { id: 10, location: 'Multi-DM', participantDisplay: '2-avatars', notificationType: '@mention', readState: 'unread', count: 1, notes: '3-person group, single mention' },
  { id: 11, location: 'Multi-DM', participantDisplay: '2-avatars', notificationType: '@mention', readState: 'unread', count: '2+', notes: '3-person group, multiple mentions' },
  { id: 12, location: 'Multi-DM', participantDisplay: '2-avatars', notificationType: '@mention', readState: 'read', count: null, notes: '3-person group, read mention' },
  { id: 13, location: 'Multi-DM', participantDisplay: '2-avatars', notificationType: 'thread-reply', readState: 'unread', count: 1, notes: '3-person group, single thread reply' },
  { id: 14, location: 'Multi-DM', participantDisplay: '2-avatars', notificationType: 'thread-reply', readState: 'unread', count: '2+', notes: '3-person group, multiple thread replies' },
  { id: 15, location: 'Multi-DM', participantDisplay: '2-avatars', notificationType: 'thread-reply', readState: 'read', count: null, notes: '3-person group, read thread' },

  // Multi-DM 3+-stack (9 states)
  { id: 16, location: 'Multi-DM', participantDisplay: '3+-stack', notificationType: 'message', readState: 'unread', count: 1, notes: '4+ person group, single message' },
  { id: 17, location: 'Multi-DM', participantDisplay: '3+-stack', notificationType: 'message', readState: 'unread', count: '2+', notes: '4+ person group, multiple messages' },
  { id: 18, location: 'Multi-DM', participantDisplay: '3+-stack', notificationType: 'message', readState: 'read', count: null, notes: '4+ person group, read' },
  { id: 19, location: 'Multi-DM', participantDisplay: '3+-stack', notificationType: '@mention', readState: 'unread', count: 1, notes: '4+ person group, single mention' },
  { id: 20, location: 'Multi-DM', participantDisplay: '3+-stack', notificationType: '@mention', readState: 'unread', count: '2+', notes: '4+ person group, multiple mentions' },
  { id: 21, location: 'Multi-DM', participantDisplay: '3+-stack', notificationType: '@mention', readState: 'read', count: null, notes: '4+ person group, read mention' },
  { id: 22, location: 'Multi-DM', participantDisplay: '3+-stack', notificationType: 'thread-reply', readState: 'unread', count: 1, notes: '4+ person group, single thread reply' },
  { id: 23, location: 'Multi-DM', participantDisplay: '3+-stack', notificationType: 'thread-reply', readState: 'unread', count: '2+', notes: '4+ person group, multiple thread replies' },
  { id: 24, location: 'Multi-DM', participantDisplay: '3+-stack', notificationType: 'thread-reply', readState: 'read', count: null, notes: '4+ person group, read thread' },

  // Channel (9 states)
  { id: 25, location: 'Channel', notificationType: 'message', readState: 'unread', count: 1, notes: 'Single channel message' },
  { id: 26, location: 'Channel', notificationType: 'message', readState: 'unread', count: '2+', notes: 'Multiple channel messages' },
  { id: 27, location: 'Channel', notificationType: 'message', readState: 'read', count: null, notes: 'Read channel' },
  { id: 28, location: 'Channel', notificationType: '@mention', readState: 'unread', count: 1, notes: 'Single mention in channel' },
  { id: 29, location: 'Channel', notificationType: '@mention', readState: 'unread', count: '2+', notes: 'Multiple mentions in channel' },
  { id: 30, location: 'Channel', notificationType: '@mention', readState: 'read', count: null, notes: 'Read mention' },
  { id: 31, location: 'Channel', notificationType: 'thread-reply', readState: 'unread', count: 1, notes: 'Single thread reply in channel' },
  { id: 32, location: 'Channel', notificationType: 'thread-reply', readState: 'unread', count: '2+', notes: 'Multiple thread replies in channel' },
  { id: 33, location: 'Channel', notificationType: 'thread-reply', readState: 'read', count: null, notes: 'Read thread in channel' },
];

export function generateInboxItem(state: PrototypeState, timeDisplay: InboxItemData['timeDisplay'] = '<1hr'): InboxItemData {
  const previewOptions = previews[state.notificationType];
  const preview = previewOptions[state.id % previewOptions.length];

  let title: string;
  let itemAvatars: string[];
  let channelName: string | undefined;
  let senderName: string | undefined;

  if (state.location === '1:1 DM') {
    title = names[state.id % names.length];
    itemAvatars = [avatars[state.id % avatars.length]];
  } else if (state.location === 'Multi-DM') {
    const idx = state.id % names.length;
    const members = [names[idx], names[(idx + 1) % names.length]];
    if (state.participantDisplay === '3+-stack') {
      members.push(names[(idx + 2) % names.length]);
      members.push(names[(idx + 3) % names.length]);
    }
    title = members.slice(0, 3).join(', ');
    if (members.length > 3) {
      title = members.slice(0, 2).join(', ') + ` +${members.length - 2}`;
    }
    itemAvatars = [avatars[idx], avatars[(idx + 1) % avatars.length]];
  } else {
    // Channel
    channelName = channelNames[state.id % channelNames.length];
    title = `#${channelName}`;
    senderName = names[state.id % names.length];
    itemAvatars = [];
  }

  return {
    id: state.id,
    location: state.location,
    participantDisplay: state.participantDisplay,
    notificationType: state.notificationType,
    readState: state.readState,
    count: state.count,
    timeDisplay,
    title,
    preview,
    avatars: itemAvatars,
    channelName,
    senderName,
  };
}
