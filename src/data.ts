import type { InboxItemData, PrototypeState, JamItemData, InviteItemData } from './types';

// Sample avatar URLs using DiceBear
const avatars = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Peter',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Oli',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=AJ',
];

const names = ['Ryan Haraki', 'Peter Choi', 'Jordan Ramos', 'Sara Du', 'Oli Wilson', 'AJ Martinez'];
const channelNames = ['engineering', 'product', 'design', 'social', 'general'];

const previews = {
  message: [
    'hey, quick question about the API',
    'sounds good, let me know',
    'just pushed the latest changes',
    'can you take a look at this?',
  ],
  '@mention': [
    '@Oli you coming to happy hour friday?',
    '@Oli, review PR?',
    '@Sara what do you think about this approach?',
    '@Jordan can you check the build?',
  ],
  'thread-reply': [
    'tests passing',
    'looks good to me',
    'merged, thanks!',
    'updated the doc',
  ],
};

const threadOriginalMessages = [
  'Can someone review PR #482?',
  'The build is failing on main',
  'Should we use Redis or Postgres for caching?',
  'Shipping the new dashboard today',
  'Anyone available for a quick sync?',
  'Docs need updating for v2.0',
];

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
    title = names[state.id % names.length];
    senderName = names[state.id % names.length];
    itemAvatars = [avatars[state.id % avatars.length]];
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
    threadOriginalMessage: state.notificationType === 'thread-reply'
      ? threadOriginalMessages[state.id % threadOriginalMessages.length]
      : undefined,
  };
}

// Jams sample data
export const jamItems: JamItemData[] = [
  {
    id: 1,
    status: 'live',
    notificationType: 'started',
    readState: 'unread',
    timeDisplay: '<1hr',
    title: 'Sprint Planning',
    hostName: 'Sara Du',
    hostAvatar: avatars[3],
    participantCount: 5,
    participantAvatars: [avatars[0], avatars[1], avatars[2], avatars[4]],
    channelName: 'engineering',
  },
  {
    id: 2,
    status: 'live',
    notificationType: 'mentioned',
    readState: 'unread',
    timeDisplay: '<1hr',
    title: 'Design Review',
    hostName: 'Jordan Ramos',
    hostAvatar: avatars[2],
    participantCount: 3,
    participantAvatars: [avatars[3], avatars[5]],
    channelName: 'design',
  },
  {
    id: 3,
    status: 'ended',
    notificationType: 'recording-ready',
    readState: 'unread',
    timeDisplay: '<24hr',
    title: 'Product Sync',
    hostName: 'Peter Choi',
    hostAvatar: avatars[1],
    duration: '32m',
    channelName: 'product',
  },
  {
    id: 4,
    status: 'missed',
    notificationType: 'started',
    readState: 'unread',
    timeDisplay: '<24hr',
    title: 'Quick Standup',
    hostName: 'Ryan Haraki',
    hostAvatar: avatars[0],
    participantCount: 4,
    participantAvatars: [avatars[1], avatars[2], avatars[3]],
  },
  {
    id: 5,
    status: 'scheduled',
    notificationType: 'reminder',
    readState: 'unread',
    timeDisplay: '<1hr',
    title: 'Team Retro',
    hostName: 'Oli Wilson',
    hostAvatar: avatars[4],
    channelName: 'general',
  },
  {
    id: 6,
    status: 'ended',
    notificationType: 'joined',
    readState: 'read',
    timeDisplay: '<7d',
    title: 'API Discussion',
    hostName: 'AJ Martinez',
    hostAvatar: avatars[5],
    duration: '45m',
    participantAvatars: [avatars[0], avatars[1]],
  },
  {
    id: 7,
    status: 'ended',
    notificationType: 'mentioned',
    readState: 'read',
    timeDisplay: '>7d',
    title: 'Feature Brainstorm',
    hostName: 'Sara Du',
    hostAvatar: avatars[3],
    duration: '1h 15m',
    channelName: 'product',
  },
];

// Jam invites (shown in Jams tab)
export const jamInviteItems: InviteItemData[] = [
  {
    id: 101,
    inviteType: 'jam',
    status: 'pending',
    timeDisplay: '<1hr',
    title: 'Architecture Review',
    description: 'Discussing the new microservices approach',
    inviterName: 'Peter Choi',
    inviterAvatar: avatars[1],
  },
  {
    id: 102,
    inviteType: 'jam',
    status: 'pending',
    timeDisplay: '<24hr',
    title: 'Design Sync',
    description: 'Weekly design team sync',
    inviterName: 'Jordan Ramos',
    inviterAvatar: avatars[2],
  },
  {
    id: 103,
    inviteType: 'jam',
    status: 'declined',
    timeDisplay: '>7d',
    title: 'Coffee Chat',
    description: 'Casual catch-up session',
    inviterName: 'Ryan Haraki',
    inviterAvatar: avatars[0],
  },
];

// Invites sample data (excludes jam invites)
export const inviteItems: InviteItemData[] = [
  {
    id: 1,
    inviteType: 'channel',
    status: 'pending',
    timeDisplay: '<1hr',
    title: '#backend-team',
    description: 'Private channel for backend engineers',
    inviterName: 'Ryan Haraki',
    inviterAvatar: avatars[0],
    isPrivate: true,
  },
  {
    id: 6,
    inviteType: 'channel',
    status: 'accepted',
    timeDisplay: '<7d',
    title: '#announcements',
    description: 'Company-wide announcements',
    inviterName: 'AJ Martinez',
    inviterAvatar: avatars[5],
  },
  {
    id: 8,
    inviteType: 'channel',
    status: 'expired',
    timeDisplay: '>7d',
    title: '#temp-project',
    description: 'Temporary project channel',
    inviterName: 'Peter Choi',
    inviterAvatar: avatars[1],
  },
];
