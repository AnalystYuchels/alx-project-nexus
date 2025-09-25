import React, { useState } from 'react';

type User = { id: string; name: string; };
type Post = { id: string; title: string; body: string; user?: User; };

export default function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 100)); // demo
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<string[]>([
    'Nice post!',
  ]);

  function toggleLike() {
    setLiked(prev => {
      const next = !prev;
      setLikesCount(c => (next ? c + 1 : c - 1));
      return next;
    });
  }

  function addComment(text: string) {
    if (!text.trim()) return;
    setComments(c => [text.trim(), ...c]);
  }

  async function handleShare() {
    const shareData = {
      title: post.title,
      text: post.body,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };
    if ((navigator as any)?.share) {
      try {
        await (navigator as any).share(shareData);
      } catch (err) {
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${post.title}\n\n${post.body}`);
        alert('Post copied to clipboard — paste to share.');
      } catch {
        alert('Sharing not supported — copy manually.');
      }
    }
  }

  return (
    <article className="bg-white rounded-2xl shadow p-4 mb-4">
      <header className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium">
          {post.user?.name?.split(' ').map(n => n[0]).slice(0,2).join('') || 'U'}
        </div>
        <div>
          <div className="font-semibold text-slate-900">{post.user?.name || 'Unknown'}</div>
          <div className="text-xs text-slate-500">{post.title}</div>
        </div>
      </header>

      <div className="mt-3 text-slate-800 leading-relaxed">
        <p className="line-clamp-4">{post.body}</p>
      </div>

      <div className="mt-3 flex items-center gap-3 text-sm text-slate-600">
        <button onClick={toggleLike} className="flex items-center gap-2">
          <svg className={`w-5 h-5 transform ${liked ? 'scale-110' : ''}`} viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21s-7-4.35-9-7.21C-0.01 9.24 3.58 5 7.5 5 9.55 5 12 7 12 7s2.45-2 4.5-2C20.42 5 24.01 9.24 21 13.79 19 16.65 12 21 12 21z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{likesCount}</span>
        </button>

        <button onClick={() => setShowComments(s => !s)} className="flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>{comments.length}</span>
        </button>

        <button onClick={handleShare} className="ml-auto text-slate-500">Share</button>
      </div>

      {showComments && (
        <div className="mt-3">
          <CommentBox onAdd={addComment} />
          <ul className="mt-3 space-y-2">
            {comments.map((c, i) => (
              <li key={i} className="text-sm bg-slate-50 p-2 rounded">{c}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

function CommentBox({ onAdd }: { onAdd: (text: string) => void }) {
  const [v, setV] = useState('');
  return (
    <div className="flex gap-2">
      <input value={v} onChange={(e) => setV(e.target.value)} placeholder="Write a comment..." className="flex-1 rounded px-3 py-2 border" />
      <button onClick={() => { onAdd(v); setV(''); }} className="px-3 py-2 bg-slate-800 text-white rounded">Send</button>
    </div>
  );
}
