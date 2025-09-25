import React, { useState } from 'react';

export default function NewPostForm({ onCreate }: { onCreate: (p: { id: string; title: string; body: string; user: any }) => void }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  function submit() {
    if (!title || !body) return;
    const newPost = { id: Date.now().toString(), title, body, user: { id: '0', name: 'You' } };
    onCreate(newPost);
    setTitle(''); setBody('');
  }
  return (
    <div className="bg-white rounded p-4 mb-4">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full mb-2 p-2 border rounded" />
      <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="What's happening?" className="w-full p-2 border rounded" rows={3} />
      <div className="mt-2 flex justify-end">
        <button onClick={submit} className="px-4 py-2 bg-slate-800 text-white rounded">Post</button>
      </div>
    </div>
  );
}
