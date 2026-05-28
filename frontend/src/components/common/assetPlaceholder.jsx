export default function AssetPlaceholder({ type = 'avatar', name = 'User', className = 'h-12 w-12' }) {
  // Extract initials for text-based fallback avatars safely
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  // 1. Student Avatar Layout Block (Circular high-contrast initial stamp)
  if (type === 'avatar') {
    return (
      <div className={`rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 select-none shrink-0 ${className}`}>
        {initials}
      </div>
    );
  }

  // 2. Corporate Brand Logo Block (Sleek dark geometric grid container)
  if (type === 'logo') {
    return (
      <div className={`rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2 text-white font-black tracking-tighter select-none shrink-0 ${className}`}>
        {initials || 'FX'}
      </div>
    );
  }

  // 3. Document / Logbook Attachment Structural Graphic
  return (
    <div className={`rounded-lg bg-slate-50 border border-dashed border-slate-300 flex flex-col items-center justify-center p-4 text-center ${className}`}>
      <svg className="mx-auto h-6 w-6 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path 
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
      <span className="mt-1.5 block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        Staged Log Document
      </span>
    </div>
  );
}