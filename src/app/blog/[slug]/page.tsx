import Navbar from '@/components/Navbar';
import { client } from '@/sanity/lib/client';
import { PortableText } from 'next-sanity';
import { notFound } from 'next/navigation';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { PortableTextBlock } from '@portabletext/types';

// Revalidate the page every 60 seconds
export const revalidate = 60;

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
}

async function getPost(slug: string) {
  return client.fetch<Post>(
    `*[_type == "post" && slug.current == $slug][0]{
      ...,
      body
    }`,
    { slug }
  );
}

async function getOtherPosts(currentPostId: string) {
  return client.fetch<Post[]>(
    `*[_type == "post" && _id != $currentPostId] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage
    }`,
    { currentPostId }
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title: `${post.title} | Romo`,
    description: post.excerpt || 'Read this article on Romo Blog',
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.publishedAt,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.mainImage?.alt || post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: imageUrl ? [imageUrl] : [],
    },
  };
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

  const otherPosts = await getOtherPosts(post._id);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-36 pb-20">
        <article className="max-w-2xl mx-auto">
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

          {post.body && (
            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText value={post.body} />
            </div>
          )}

          {/* Date and Author */}
          <div className="mt-12 pt-8">
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-white">Published</p>
              <time dateTime={post.publishedAt} className="text-neutral-400">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <p className="text-white mt-4">Author</p>
              <p className="text-neutral-400">Romo Team</p>
            </div>
          </div>

          {/* Other Posts Section */}
          {otherPosts.length > 0 && (
            <div className="mt-16 pt-12">
              <h2 className="text-2xl font-medium text-white mb-8">
                Other Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherPosts.map((otherPost) => (
                  <Link
                    key={otherPost._id}
                    href={`/blog/${otherPost.slug.current}`}
                    className="group block"
                  >
                    {otherPost.mainImage && (
                      <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-neutral-800">
                        <Image
                          src={urlFor(otherPost.mainImage).url()}
                          alt={otherPost.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-medium text-white mb-2 group-hover:text-neutral-300 transition-colors line-clamp-2">
                      {otherPost.title}
                    </h3>
                    {otherPost.excerpt && (
                      <p className="text-sm text-neutral-400 line-clamp-2">
                        {otherPost.excerpt}
                      </p>
                    )}
                    <p className="text-xs text-neutral-500 mt-2">
                      {new Date(otherPost.publishedAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }
                      )}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
