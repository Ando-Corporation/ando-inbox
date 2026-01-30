import { useState } from 'react';
import { InboxItem } from './components/InboxItem';
import { prototypeStates, generateInboxItem } from './data';
import type { InboxItemData, Location, NotificationType, ReadState } from './types';
import './App.css';

type FilterLocation = Location | 'All';
type FilterNotification = NotificationType | 'All';
type FilterReadState = ReadState | 'All';

function App() {
  const [filterLocation, setFilterLocation] = useState<FilterLocation>('All');
  const [filterNotification, setFilterNotification] = useState<FilterNotification>('All');
  const [filterReadState, setFilterReadState] = useState<FilterReadState>('All');
  const [timeDisplay, setTimeDisplay] = useState<InboxItemData['timeDisplay']>('<1hr');

  const filteredStates = prototypeStates.filter((state) => {
    if (filterLocation !== 'All' && state.location !== filterLocation) return false;
    if (filterNotification !== 'All' && state.notificationType !== filterNotification) return false;
    if (filterReadState !== 'All' && state.readState !== filterReadState) return false;
    return true;
  });

  const items = filteredStates.map((state) => generateInboxItem(state, timeDisplay));

  const locationCounts = {
    All: prototypeStates.length,
    '1:1 DM': prototypeStates.filter((s) => s.location === '1:1 DM').length,
    'Multi-DM': prototypeStates.filter((s) => s.location === 'Multi-DM').length,
    Channel: prototypeStates.filter((s) => s.location === 'Channel').length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Ando Inbox Prototypes</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {filteredStates.length} of {prototypeStates.length} states
              </p>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              View Spec
            </a>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-6">
            {/* Location Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Location
              </label>
              <div className="flex gap-1">
                {(['All', '1:1 DM', 'Multi-DM', 'Channel'] as FilterLocation[]).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setFilterLocation(loc)}
                    className={`
                      px-3 py-1.5 text-sm rounded-md transition-colors
                      ${filterLocation === loc
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Notification
              </label>
              <div className="flex gap-1">
                {(['All', 'message', '@mention', 'thread-reply'] as FilterNotification[]).map((notif) => (
                  <button
                    key={notif}
                    onClick={() => setFilterNotification(notif)}
                    className={`
                      px-3 py-1.5 text-sm rounded-md transition-colors
                      ${filterNotification === notif
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                State
              </label>
              <div className="flex gap-1">
                {(['All', 'unread', 'read'] as FilterReadState[]).map((state) => (
                  <button
                    key={state}
                    onClick={() => setFilterReadState(state)}
                    className={`
                      px-3 py-1.5 text-sm rounded-md transition-colors
                      ${filterReadState === state
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Time
              </label>
              <div className="flex gap-1">
                {(['<1hr', '<24hr', '<7d', '>7d'] as InboxItemData['timeDisplay'][]).map((time) => (
                  <button
                    key={time}
                    onClick={() => setTimeDisplay(time)}
                    className={`
                      px-3 py-1.5 text-sm rounded-md transition-colors
                      ${timeDisplay === time
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Inbox Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="font-medium text-gray-900">Inbox</h2>
          </div>

          {/* Inbox Items */}
          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <div key={item.id} className="relative group">
                <InboxItem item={item} />
                {/* State Label */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-gray-900/90 text-white text-xs px-2 py-1 rounded-md">
                    #{item.id} &middot; {item.location}
                    {item.participantDisplay && ` (${item.participantDisplay})`}
                    &middot; {item.notificationType} &middot; {item.readState}
                    {item.count && ` &middot; ${item.count}`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {items.length === 0 && (
            <div className="px-4 py-12 text-center text-gray-500">
              No states match the current filters
            </div>
          )}
        </div>

        {/* State Matrix */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="font-medium text-gray-900">State Matrix Reference</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">ID</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Location</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Participants</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Type</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">State</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Count</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {prototypeStates.map((state) => (
                  <tr
                    key={state.id}
                    className={`
                      ${filteredStates.includes(state) ? 'bg-white' : 'bg-gray-50/50 text-gray-400'}
                    `}
                  >
                    <td className="px-4 py-2 font-mono">{state.id}</td>
                    <td className="px-4 py-2">{state.location}</td>
                    <td className="px-4 py-2">{state.participantDisplay || '—'}</td>
                    <td className="px-4 py-2">
                      <span className={`
                        inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                        ${state.notificationType === 'message' ? 'bg-gray-100 text-gray-700' : ''}
                        ${state.notificationType === '@mention' ? 'bg-blue-100 text-blue-700' : ''}
                        ${state.notificationType === 'thread-reply' ? 'bg-purple-100 text-purple-700' : ''}
                      `}>
                        {state.notificationType}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`
                        inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                        ${state.readState === 'unread' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}
                      `}>
                        {state.readState}
                      </span>
                    </td>
                    <td className="px-4 py-2">{state.count ?? '—'}</td>
                    <td className="px-4 py-2 text-gray-500">{state.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-400">
        Ando Inbox Prototype Viewer &middot; 33 States
      </footer>
    </div>
  );
}

export default App;
