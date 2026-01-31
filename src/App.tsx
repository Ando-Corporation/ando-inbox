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
  const [showDevNotes, setShowDevNotes] = useState(true);

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

      {/* Dev Notes */}
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowDevNotes(!showDevNotes)}
            className="w-full px-4 py-2 flex items-center justify-between text-left hover:bg-blue-100 transition-colors"
          >
            <span className="text-sm font-medium text-blue-800">Development Notes</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`text-blue-600 transition-transform ${showDevNotes ? 'rotate-180' : ''}`}
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {showDevNotes && (
            <div className="px-4 pb-4 text-sm text-blue-900 space-y-3">
              <div>
                <h4 className="font-semibold mb-1">Avatar Rules</h4>
                <ul className="list-disc list-inside space-y-0.5 text-blue-800">
                  <li><strong>1:1 DM:</strong> Show the other person's avatar</li>
                  <li><strong>Multi-DM:</strong> Stack of 2 avatars (3+ shows +N badge)</li>
                  <li><strong>Channel:</strong> Show sender's avatar with small # badge (person who sent message or @'ed you)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Read State & Count</h4>
                <ul className="list-disc list-inside space-y-0.5 text-blue-800">
                  <li><strong>read:</strong> No badge, no highlighted messages in conversation</li>
                  <li><strong>unread + count=1:</strong> Green dot badge, 1 message highlighted yellow</li>
                  <li><strong>unread + count=2+:</strong> Green "2+" badge, 3 messages highlighted yellow</li>
                  <li>Simplified model: "read" means all messages read (no partial-read state like Slack)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Notification Types</h4>
                <ul className="list-disc list-inside space-y-0.5 text-blue-800">
                  <li><strong>message:</strong> Regular message, no special badge on avatar</li>
                  <li><strong>@mention:</strong> Blue @ badge on avatar, mention styled with blue pill in conversation</li>
                  <li><strong>thread-reply:</strong> Purple thread badge on avatar, shown as nested thread in conversation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Conversation Panel</h4>
                <ul className="list-disc list-inside space-y-0.5 text-blue-800">
                  <li>Click notification to show conversation on right</li>
                  <li>Selection indicated by grey left border on row</li>
                  <li>Selection resets when changing any filter or tab</li>
                  <li>Thread replies show in Slack-style nested format</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

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
                        {(['All', 'message', '@mention', 'thread-reply'] as FilterNotification[]).map((notif) => (
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
                    {inboxItems.map((item) => (
                      <div
                        key={item.id}
                        className={`relative group cursor-pointer ${selectedItem?.id === item.id ? 'border-l-[3px] border-l-[#a8a29e]' : 'border-l-[3px] border-l-transparent'}`}
                        onClick={() => handleItemClick(item)}
                      >
                        <InboxItem item={item} />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="bg-[#292524]/90 text-white text-[10px] px-2 py-1 rounded">
                            #{item.id} · {item.location}
                            {item.participantDisplay && ` (${item.participantDisplay})`}
                            · {item.notificationType} · {item.readState}
                            {item.count && ` · ${item.count}`}
                          </div>
                        </div>
                      </div>
                    ))}
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
                  <div className="text-2xl font-semibold text-[#292524]">33</div>
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
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-[#e7e5e4] overflow-hidden h-[700px]">
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
