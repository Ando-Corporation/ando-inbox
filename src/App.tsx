import { useState } from 'react';
import { InboxItem } from './components/InboxItem';
import { JamItem } from './components/JamItem';
import { InviteItem } from './components/InviteItem';
import { ConversationPanel } from './components/ConversationPanel';
import { prototypeStates, generateInboxItem, generateConversation, jamItems, jamInviteItems, inviteItems } from './data';
import type { InboxItemData, Location, NotificationType, ReadState } from './types';
import './App.css';

type Tab = 'inbox' | 'jams' | 'invites';
type FilterLocation = Location | 'All';
type FilterNotification = NotificationType | 'All';
type FilterReadState = ReadState | 'All';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('inbox');
  const [filterLocation, setFilterLocation] = useState<FilterLocation>('All');
  const [filterNotification, setFilterNotification] = useState<FilterNotification>('All');
  const [filterReadState, setFilterReadState] = useState<FilterReadState>('All');
  const [timeDisplay, setTimeDisplay] = useState<InboxItemData['timeDisplay']>('<1hr');
  const [selectedItem, setSelectedItem] = useState<InboxItemData | null>(null);
  // Removed unused state

  const filteredStates = prototypeStates.filter((state) => {
    if (filterLocation !== 'All' && state.location !== filterLocation) return false;
    if (filterNotification !== 'All' && state.notificationType !== filterNotification) return false;
    if (filterReadState !== 'All' && state.readState !== filterReadState) return false;
    return true;
  });

  const inboxItems = filteredStates.map((state) => generateInboxItem(state, timeDisplay));

  const filteredJams = jamItems.filter((jam) => {
    if (filterReadState !== 'All' && jam.readState !== filterReadState) return false;
    return true;
  });

  const filteredJamInvites = jamInviteItems.filter((invite) => {
    if (filterReadState !== 'All') {
      const isPending = invite.status === 'pending';
      if (filterReadState === 'unread' && !isPending) return false;
      if (filterReadState === 'read' && isPending) return false;
    }
    return true;
  });

  const filteredInvites = inviteItems.filter((invite) => {
    if (filterReadState !== 'All') {
      const isPending = invite.status === 'pending';
      if (filterReadState === 'unread' && !isPending) return false;
      if (filterReadState === 'read' && isPending) return false;
    }
    return true;
  });

  const locationCounts = {
    All: prototypeStates.length,
    '1:1 DM': prototypeStates.filter((s) => s.location === '1:1 DM').length,
    'Multi-DM': prototypeStates.filter((s) => s.location === 'Multi-DM').length,
    Channel: prototypeStates.filter((s) => s.location === 'Channel').length,
  };

  const unreadCounts = {
    inbox: prototypeStates.filter((s) => s.readState === 'unread').length,
    jams: jamItems.filter((j) => j.readState === 'unread').length + jamInviteItems.filter((i) => i.status === 'pending').length,
    invites: inviteItems.filter((i) => i.status === 'pending').length,
  };

  const handleItemClick = (item: InboxItemData) => {
    setSelectedItem(item);
  };

  // Generate contextual dev notes for selected item
  const getDevNotes = (item: InboxItemData) => {
    const notes: { label: string; value: string }[] = [];

    // Basic state info
    notes.push({ label: 'State ID', value: `#${item.id}` });
    notes.push({ label: 'Location', value: item.location });
    notes.push({ label: 'Notification Type', value: item.notificationType });
    notes.push({ label: 'Read State', value: item.readState });
    notes.push({ label: 'Count', value: item.count === null ? 'null' : String(item.count) });

    // Avatar treatment - always single avatar
    let avatarPerson = '';
    if (item.notificationType === '@mention' || item.notificationType === '@mention-in-thread') {
      avatarPerson = 'Person who @mentioned you (overrides last sender)';
    } else {
      avatarPerson = 'Person who last messaged';
    }
    notes.push({ label: 'Avatar', value: avatarPerson });

    // Location badge
    let locationBadge = '';
    if (item.location === '1:1 DM') {
      locationBadge = 'Single person icon badge';
    } else if (item.location === 'Multi-DM') {
      locationBadge = 'Group icon badge';
    } else if (item.location === 'Channel') {
      locationBadge = 'Hashtag (#) icon badge';
    }
    notes.push({ label: 'Location Badge', value: locationBadge });


    // Row styling
    let rowStyle = '';
    if (item.readState === 'unread') {
      rowStyle = 'Purple dot on right side, vertically centered';
    } else {
      rowStyle = 'No unread indicator';
    }
    notes.push({ label: 'Unread Indicator', value: rowStyle });
    notes.push({ label: 'Selected Style', value: 'Purple ring around entire row' });

    // Count badge
    let countBadge = '';
    if (item.readState === 'unread' && item.count) {
      countBadge = item.count === 1 ? 'Green dot (no number)' : 'Green pill with "2+"';
    } else {
      countBadge = 'None';
    }
    notes.push({ label: 'Count Badge', value: countBadge });

    // Highlighted messages
    let highlightedCount = '';
    if (item.readState === 'read') {
      highlightedCount = '0 (read state = no highlights)';
    } else if (item.count === 1) {
      highlightedCount = '1 message highlighted yellow';
    } else if (item.count === '2+') {
      highlightedCount = '3 messages highlighted yellow';
    } else {
      highlightedCount = '0';
    }
    notes.push({ label: 'Highlighted Messages', value: highlightedCount });

    // Time styling
    notes.push({ label: 'Time Style', value: 'Always grey' });

    // Special behaviors
    const specialBehaviors: string[] = [];
    if (item.notificationType === 'thread-reply') {
      specialBehaviors.push('Shows original thread message in preview with vertical bar');
      specialBehaviors.push('Conversation shows Slack-style nested thread');
    }
    if (item.notificationType === '@mention') {
      specialBehaviors.push('@mention styled with blue background in conversation');
    }
    if (item.notificationType === '@mention-in-thread') {
      specialBehaviors.push('Shows original thread message in preview with vertical bar');
      specialBehaviors.push('Conversation shows Slack-style nested thread');
      specialBehaviors.push('@mention styled with blue background in thread reply');
    }
    if (item.location === 'Channel') {
      specialBehaviors.push('Header shows #channel-name');
      specialBehaviors.push('Event label shows "Mention in #channel" or "Thread reply in #channel"');
    }
    if (specialBehaviors.length > 0) {
      notes.push({ label: 'Special Behaviors', value: specialBehaviors.join(' · ') });
    }

    return notes;
  };

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Header */}
      <header className="bg-white border-b border-[#e7e5e4] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#292524]">Ando Inbox Prototypes</h1>
              <p className="text-sm text-[#78716c] mt-0.5">
                Notification states for Inbox, Jams, and Invites
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Split View */}
      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex gap-6">
          {/* Left Panel - Notification List */}
          <div className="w-[420px] shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-[#e7e5e4] overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-[#e7e5e4]">
                {(['inbox', 'jams', 'invites'] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setSelectedItem(null);
                    }}
                    className={`
                      flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors relative
                      ${activeTab === tab
                        ? 'text-[#292524] border-b-2 border-[#292524] -mb-px'
                        : 'text-[#78716c] hover:text-[#57534e]'
                      }
                    `}
                  >
                    <span className="capitalize">{tab}</span>
                    {unreadCounts[tab] > 0 && (
                      <span className={`
                        min-w-[18px] h-[18px] px-1.5 rounded-full text-[11px] font-semibold flex items-center justify-center
                        ${activeTab === tab ? 'bg-emerald-500 text-white' : 'bg-[#e7e5e4] text-[#57534e]'}
                      `}>
                        {unreadCounts[tab]}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Filters (only for inbox tab) */}
              {activeTab === 'inbox' && (
                <div className="px-4 py-3 bg-[#fafaf9] border-b border-[#e7e5e4]">
                  <div className="flex flex-wrap gap-4">
                    {/* Location Filter */}
                    <div>
                      <label className="block text-[10px] font-medium text-[#78716c] uppercase tracking-wide mb-1">
                        Location
                      </label>
                      <div className="flex gap-1">
                        {(['All', '1:1 DM', 'Multi-DM', 'Channel'] as FilterLocation[]).map((loc) => (
                          <button
                            key={loc}
                            onClick={() => { setFilterLocation(loc); setSelectedItem(null); }}
                            className={`
                              px-2.5 py-1 text-xs rounded-md transition-colors
                              ${filterLocation === loc
                                ? 'bg-[#292524] text-white'
                                : 'bg-white text-[#57534e] border border-[#e7e5e4] hover:bg-[#f5f5f4]'
                              }
                            `}
                          >
                            {loc} ({locationCounts[loc]})
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notification Type Filter */}
                    <div>
                      <label className="block text-[10px] font-medium text-[#78716c] uppercase tracking-wide mb-1">
                        Type
                      </label>
                      <div className="flex gap-1">
                        {(['All', 'message', '@mention', 'thread-reply', '@mention-in-thread'] as FilterNotification[]).map((notif) => (
                          <button
                            key={notif}
                            onClick={() => { setFilterNotification(notif); setSelectedItem(null); }}
                            className={`
                              px-2.5 py-1 text-xs rounded-md transition-colors
                              ${filterNotification === notif
                                ? 'bg-[#292524] text-white'
                                : 'bg-white text-[#57534e] border border-[#e7e5e4] hover:bg-[#f5f5f4]'
                              }
                            `}
                          >
                            {notif}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Read State Filter */}
                    <div>
                      <label className="block text-[10px] font-medium text-[#78716c] uppercase tracking-wide mb-1">
                        State
                      </label>
                      <div className="flex gap-1">
                        {(['All', 'unread', 'read'] as FilterReadState[]).map((state) => (
                          <button
                            key={state}
                            onClick={() => { setFilterReadState(state); setSelectedItem(null); }}
                            className={`
                              px-2.5 py-1 text-xs rounded-md transition-colors
                              ${filterReadState === state
                                ? 'bg-[#292524] text-white'
                                : 'bg-white text-[#57534e] border border-[#e7e5e4] hover:bg-[#f5f5f4]'
                              }
                            `}
                          >
                            {state}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Display */}
                    <div>
                      <label className="block text-[10px] font-medium text-[#78716c] uppercase tracking-wide mb-1">
                        Time
                      </label>
                      <div className="flex gap-1">
                        {(['<1hr', '<24hr', '<7d', '>7d'] as InboxItemData['timeDisplay'][]).map((time) => (
                          <button
                            key={time}
                            onClick={() => { setTimeDisplay(time); setSelectedItem(null); }}
                            className={`
                              px-2.5 py-1 text-xs rounded-md transition-colors
                              ${timeDisplay === time
                                ? 'bg-[#292524] text-white'
                                : 'bg-white text-[#57534e] border border-[#e7e5e4] hover:bg-[#f5f5f4]'
                              }
                            `}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="divide-y divide-[#e7e5e4] max-h-[600px] overflow-y-auto">
                {activeTab === 'inbox' && (
                  <>
                    {(() => {
                      // Get date label based on timeDisplay and item index for variety
                      const getDateLabel = (item: InboxItemData, index: number): string => {
                        if (item.timeDisplay === '<1hr' || item.timeDisplay === '<24hr') {
                          return 'Today';
                        }
                        if (item.timeDisplay === '<7d') {
                          // Vary between a few recent days
                          const days = ['Monday, January 27th', 'Sunday, January 26th', 'Saturday, January 25th'];
                          return days[index % days.length];
                        }
                        // >7d - vary between older dates
                        const olderDays = ['Friday, January 17th', 'Tuesday, January 14th', 'Monday, January 6th', 'Friday, December 20th'];
                        return olderDays[index % olderDays.length];
                      };

                      let currentDateLabel = '';

                      return inboxItems.map((item, index) => {
                        const dateLabel = getDateLabel(item, index);
                        const showDateHeader = dateLabel !== currentDateLabel;
                        if (showDateHeader) {
                          currentDateLabel = dateLabel;
                        }

                        return (
                          <div key={item.id}>
                            {showDateHeader && (
                              <div className="px-4 py-2 bg-[#fafaf9] border-b border-[#e7e5e4]">
                                <span className="text-sm font-medium text-[#57534e]">
                                  {dateLabel}
                                </span>
                              </div>
                            )}
                            <div
                              className="relative group cursor-pointer"
                              onClick={() => handleItemClick(item)}
                            >
                              <InboxItem item={item} isSelected={selectedItem?.id === item.id} />
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <div className="bg-[#292524]/90 text-white text-[10px] px-2 py-1 rounded">
                                  #{item.id} · {item.location}
                                  {item.participantDisplay && ` (${item.participantDisplay})`}
                                  · {item.notificationType} · {item.readState}
                                  {item.count && ` · ${item.count}`}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                    {inboxItems.length === 0 && (
                      <div className="px-4 py-12 text-center text-[#78716c]">
                        No states match the current filters
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'jams' && (
                  <>
                    {filteredJamInvites.length > 0 && (
                      <>
                        <div className="px-4 py-2 bg-[#fafaf9] border-b border-[#e7e5e4]">
                          <span className="text-xs font-medium text-[#78716c] uppercase tracking-wide">Jam Invites</span>
                        </div>
                        {filteredJamInvites.map((invite) => (
                          <InviteItem key={invite.id} item={invite} />
                        ))}
                      </>
                    )}
                    {filteredJams.length > 0 && (
                      <>
                        {filteredJamInvites.length > 0 && (
                          <div className="px-4 py-2 bg-[#fafaf9] border-b border-[#e7e5e4]">
                            <span className="text-xs font-medium text-[#78716c] uppercase tracking-wide">Jam Activity</span>
                          </div>
                        )}
                        {filteredJams.map((jam) => (
                          <JamItem key={jam.id} item={jam} />
                        ))}
                      </>
                    )}
                    {filteredJams.length === 0 && filteredJamInvites.length === 0 && (
                      <div className="px-4 py-12 text-center text-[#78716c]">
                        No Jams to show
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'invites' && (
                  <>
                    {filteredInvites.map((invite) => (
                      <InviteItem key={invite.id} item={invite} />
                    ))}
                    {filteredInvites.length === 0 && (
                      <div className="px-4 py-12 text-center text-[#78716c]">
                        No Invites to show
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Summary Card */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-[#e7e5e4] p-4">
              <h2 className="font-medium text-[#292524] mb-3">State Summary</h2>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-[#fafaf9] rounded-lg p-3">
                  <div className="text-2xl font-semibold text-[#292524]">{prototypeStates.length}</div>
                  <div className="text-[#78716c]">Inbox states</div>
                </div>
                <div className="bg-[#fafaf9] rounded-lg p-3">
                  <div className="text-2xl font-semibold text-[#292524]">{jamItems.length + jamInviteItems.length}</div>
                  <div className="text-[#78716c]">Jam states</div>
                </div>
                <div className="bg-[#fafaf9] rounded-lg p-3">
                  <div className="text-2xl font-semibold text-[#292524]">{inviteItems.length}</div>
                  <div className="text-[#78716c]">Invite states</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Conversation */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {/* Contextual Dev Notes */}
            {selectedItem && (
              <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-4 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-slate-400">
                    <path d="M2 4L8 2L14 4V12L8 14L2 12V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M8 6V10M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Dev Notes</span>
                  <span className="text-xs text-slate-500 ml-auto">State #{selectedItem.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  {getDevNotes(selectedItem).map((note, i) => (
                    <div key={i} className={note.label === 'Special Behaviors' ? 'col-span-2' : ''}>
                      <span className="text-slate-400">{note.label}:</span>{' '}
                      <span className="text-slate-200">{note.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-[#e7e5e4] overflow-hidden flex-1 min-h-[500px]">
              {selectedItem ? (
                <ConversationPanel
                  item={selectedItem}
                  messages={generateConversation(selectedItem)}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[#78716c]">
                  <div className="text-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-3 text-[#d6d3d1]">
                      <rect x="8" y="12" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 20L24 28L40 20" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <p className="font-medium text-[#57534e]">Select a notification</p>
                    <p className="text-sm mt-1">Click on any inbox item to see the conversation</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-[#a8a29e]">
        Ando Inbox Prototypes · {prototypeStates.length + jamItems.length + jamInviteItems.length + inviteItems.length} total states
      </footer>
    </div>
  );
}

export default App;
