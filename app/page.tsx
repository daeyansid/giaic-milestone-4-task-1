// File: pages/index.tsx
import Link from 'next/link';

export default function Home() {
  const posts = [
    { 
      title: 'Getting Started with Next.js',
      slug: 'post-1',
      excerpt: 'Learn the basics of Next.js and start building modern web applications.',
      category: 'Development',
      date: '2024-01-15'
    },
    {
      title: 'Understanding TypeScript',
      slug: 'post-2',
      excerpt: 'Deep dive into TypeScript features and best practices.',
      category: 'Programming',
      date: '2024-01-14'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to Our Blog</h1>
          <p className="text-xl text-gray-600">Discover stories, thinking, and expertise</p>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500" />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                      {post.category}
                    </span>
                    <span className="ml-4 text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Author Name</p>
                      <p className="text-sm text-gray-500">5 min read</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl text-black font-bold mb-6">Popular Categories</h2>
          <div className="flex flex-wrap gap-4">
            {['Development', 'Programming', 'Design', 'Technology'].map((category) => (
              <button key={category} 
                className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
          <p className="mb-6">Get the latest posts delivered right to your inbox.</p>
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900"
            />
            <button className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
