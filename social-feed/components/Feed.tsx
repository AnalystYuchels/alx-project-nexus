import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries';
import PostCard from './PostCard';

type Post = { id: string; title: string; body: string; user?: { id: string; name: string } };

export default function Feed() {
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const { data, loading, fetchMore, error } = useQuery(GET_POSTS, {
    variables: { options: { paginate: { page: 1, limit: PAGE_SIZE } } },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (page === 1) return;
    fetchMore({
      variables: { options: { paginate: { page, limit: PAGE_SIZE } } }
    });
  }, [page, fetchMore]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(p => p + 1);
      }
    }, { rootMargin: '200px' });
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  if (error) return <div className="p-6">Error loading posts.</div>;

  const posts: Post[] = data?.posts?.data || [];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-4">
        {posts.map((p) => <PostCard key={p.id} post={p} />)}
      </div>

      <div ref={sentinelRef} className="h-16 flex items-center justify-center">
        {loading ? <div className="text-sm text-slate-500">Loading...</div> : <div className="text-xs text-slate-400">Scroll to load more</div>}
      </div>
    </div>
  );
}
