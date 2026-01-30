interface AvatarProps {
  src: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

export function Avatar({ src, size = 'md', className = '' }: AvatarProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden flex-shrink-0 ${className}`}
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
  );
}

interface AvatarStackProps {
  avatars: string[];
  extraCount?: number;
}

export function AvatarStack({ avatars, extraCount }: AvatarStackProps) {
  if (avatars.length === 1) {
    return <Avatar src={avatars[0]} />;
  }

  if (avatars.length === 2) {
    return (
      <div className="relative w-10 h-10 flex-shrink-0">
        <Avatar
          src={avatars[0]}
          size="sm"
          className="absolute top-0 left-0 ring-2 ring-white"
        />
        <Avatar
          src={avatars[1]}
          size="sm"
          className="absolute bottom-0 right-0 ring-2 ring-white"
        />
      </div>
    );
  }

  return (
    <div className="relative w-10 h-10 flex-shrink-0">
      <Avatar
        src={avatars[0]}
        size="sm"
        className="absolute top-0 left-0 ring-2 ring-white"
      />
      <Avatar
        src={avatars[1]}
        size="sm"
        className="absolute bottom-0 right-0 ring-2 ring-white"
      />
      {extraCount && extraCount > 0 && (
        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-gray-500 text-white text-[10px] font-medium flex items-center justify-center ring-2 ring-white">
          +{extraCount}
        </div>
      )}
    </div>
  );
}

interface ChannelIconProps {
  isPrivate?: boolean;
}

export function ChannelIcon({ isPrivate }: ChannelIconProps) {
  return (
    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
      <span className="text-white text-lg font-semibold">
        {isPrivate ? '🔒' : '#'}
      </span>
    </div>
  );
}
