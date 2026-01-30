interface AvatarProps {
  src: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showOnline?: boolean;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

export function Avatar({ src, size = 'md', className = '', showOnline }: AvatarProps) {
  return (
    <div className={`relative ${sizeClasses[size]} flex-shrink-0`}>
      <div
        className={`${sizeClasses[size]} rounded-sm bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden ${className}`}
      >
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      {showOnline && (
        <div className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#00c950] border border-white" />
      )}
    </div>
  );
}

interface AvatarStackProps {
  avatars: string[];
  extraCount?: number;
  showOnline?: boolean;
  size?: 'sm' | 'md';
}

export function AvatarStack({ avatars, extraCount, showOnline, size = 'md' }: AvatarStackProps) {
  if (avatars.length === 1) {
    return <Avatar src={avatars[0]} size={size} showOnline={showOnline} />;
  }

  const containerSize = size === 'md' ? 'w-10 h-10' : 'w-6 h-6';
  const avatarSize = size === 'md' ? 'w-6 h-6' : 'w-4 h-4';
  const badgeSize = size === 'md' ? 'w-5 h-5 text-[10px]' : 'w-4 h-4 text-[9px]';

  return (
    <div className={`relative ${containerSize} flex-shrink-0`}>
      {/* First avatar - top left */}
      <div className={`absolute top-0 left-0 ${avatarSize} rounded-sm bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden ring-1 ring-white`}>
        <img
          src={avatars[0]}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      {/* Second avatar - bottom right */}
      <div className={`absolute bottom-0 right-0 ${avatarSize} rounded-sm bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden ring-1 ring-white`}>
        <img
          src={avatars[1]}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      {extraCount && extraCount > 0 && (
        <div className={`absolute -bottom-0.5 -right-0.5 ${badgeSize} rounded-full bg-[#78716c] text-white font-medium flex items-center justify-center ring-1 ring-white`}>
          +{extraCount}
        </div>
      )}
      {showOnline && (
        <div className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#00c950] border border-white z-10" />
      )}
    </div>
  );
}

interface ChannelIconProps {
  isPrivate?: boolean;
  size?: 'sm' | 'md';
}

export function ChannelIcon({ isPrivate, size = 'md' }: ChannelIconProps) {
  const sizeClass = size === 'sm' ? 'w-6 h-6' : 'w-10 h-10';
  const textSize = size === 'sm' ? 'text-sm' : 'text-lg';

  return (
    <div className={`${sizeClass} rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0`}>
      <span className={`text-white ${textSize} font-semibold`}>
        {isPrivate ? '🔒' : '#'}
      </span>
    </div>
  );
}

export function JamIcon({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'w-6 h-6' : 'w-10 h-10';

  return (
    <div className={`${sizeClass} rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0`}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
        <path d="M10 3C10 3 7 5 7 8C7 11 10 13 10 13C10 13 13 11 13 8C13 5 10 3 10 3Z" fill="currentColor"/>
        <circle cx="5" cy="10" r="2" fill="currentColor"/>
        <circle cx="15" cy="10" r="2" fill="currentColor"/>
        <path d="M5 12V15M15 12V15M10 15V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  );
}
