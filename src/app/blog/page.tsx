import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import EmergeAnimation from '@/components/EmergeAnimation';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

// Interface for the data we are fetching
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
}

// Revalidate the page every 60 seconds to show new posts
export const revalidate = 60;

async function getPosts() {
  // GROQ query to fetch posts
  return client.fetch<Post[]>(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage
    }`
  );
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-36 pb-20">
        <div className="max-w-4xl mx-auto">
          <EmergeAnimation>
            <h1 className="text-4xl font-medium mb-4 text-white text-center">
              Blog
            </h1>
          </EmergeAnimation>
          <EmergeAnimation delay={100}>
            <p className="text-neutral-400 text-center mb-8 max-w-md mx-auto">
              &quot;Tracking the news, decoding the media, shaping the
              conversation.&rdquo;
            </p>
          </EmergeAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <EmergeAnimation key={post._id} delay={150 + index * 50}>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="block p-6 rounded-md bg-neutral-900/50 hover:bg-neutral-900/70 transition-colors group"
                >
                  {post.mainImage && (
                    <div className="relative w-full h-64 mb-6 rounded-sm overflow-hidden bg-neutral-800">
                      <Image
                        src={urlFor(post.mainImage)
                          .width(800)
                          .height(400)
                          .url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <h2 className="text-xl font-medium text-white mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-neutral-400 mb-4">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  {post.excerpt && (
                    <p className="text-sm text-neutral-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </EmergeAnimation>
            ))}
          </div>

          {posts.length === 0 && (
            <EmergeAnimation delay={200}>
              <div className="flex items-center justify-center w-full mt-8 ">
                <p className="text-neutral-400 text-center w-fit border border-neutral-800 rounded-md px-8 py-6">
                  No posts found. Check back later!
                </p>
              </div>
            </EmergeAnimation>
          )}
        </div>
      </main>
    </div>
  );
}
