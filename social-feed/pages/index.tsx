import Head from 'next/head';
import Feed from '../components/Feed';

export default function Home() {
  return (
    <>
      <Head>
        <title>Social Feed — Demo</title>
        <meta name="description" content="Dynamic social feed demo" />
      </Head>

      <main className="min-h-screen">
        <header className="bg-white border-b">
          <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">Social Feed</h1>
            <nav className="text-sm text-slate-600">Demo • Next.js • GraphQL</nav>
          </div>
        </header>

        <section className="py-6">
          <Feed />
        </section>
      </main>
    </>
  );
}
