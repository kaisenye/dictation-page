import Navbar from '@/components/Navbar';
import { client } from '@/sanity/lib/client';
import { PortableText } from 'next-sanity';
import { notFound } from 'next/navigation';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

// Revalidate the page every 60 seconds
export const revalidate = 60;

async function getPost(slug: string) {
  return client.fetch(`*[_type == "post" && slug.current == $slug][0]`, {
    slug,
  });
}

export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "post"]{
      slug
    }`
  );

  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-36 pb-20">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-medium text-white mb-4 text-center">
            {post.title}
          </h1>

          <p className="text-neutral-400 text-center mb-8">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {post.mainImage && (
            <div className="relative w-full h-[300px] md:h-[400px] mb-10 rounded-xl overflow-hidden bg-white/5">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none">
            <PortableText value={post.body} />
          </div>
        </article>
      </main>
    </div>
  );
}
