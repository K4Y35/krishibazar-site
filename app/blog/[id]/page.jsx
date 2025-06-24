"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const BlogPost = () => {
  const params = useParams();
  const postId = params.id;

  // This would typically come from an API or database
  const post = {
    id: postId,
    title: "Spring Farming Guide: Preparing Your Land for Maximum Yield",
    content: `
      <p>Spring is a crucial time for farmers as it marks the beginning of a new growing season. Proper preparation during this period can significantly impact your harvest quality and yield. Here's a comprehensive guide to help you make the most of the spring season.</p>

      <h2>1. Soil Preparation</h2>
      <p>The foundation of successful farming lies in healthy soil. Before planting, conduct a thorough soil test to understand its pH level, nutrient content, and drainage capacity.</p>
      
      <h3>Key Steps:</h3>
      <ul>
        <li>Test soil pH (ideal range: 6.0-7.0 for most crops)</li>
        <li>Add organic compost to improve soil structure</li>
        <li>Ensure proper drainage to prevent waterlogging</li>
        <li>Remove weeds and debris from the previous season</li>
      </ul>

      <h2>2. Seed Selection and Timing</h2>
      <p>Choose high-quality seeds appropriate for your climate zone and soil type. Timing is crucial - plant too early and frost may damage seedlings; too late and you'll miss the optimal growing window.</p>

      <h2>3. Islamic Perspective on Agriculture</h2>
      <p>In Islamic tradition, agriculture holds a special place. The Prophet Muhammad (peace be upon him) said: "If a Muslim plants a tree or sows seeds, and then a bird, or a person or an animal eats from it, it is regarded as a charitable gift [sadaqah] for him."</p>

      <h2>4. Modern Techniques for Better Yields</h2>
      <p>Combine traditional wisdom with modern agricultural techniques:</p>
      <ul>
        <li>Use precision agriculture tools for optimal resource allocation</li>
        <li>Implement crop rotation to maintain soil health</li>
        <li>Install efficient irrigation systems</li>
        <li>Monitor weather patterns and adjust planting schedules accordingly</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Spring preparation requires careful planning and execution. By following these guidelines and staying true to sustainable farming practices, you can ensure a productive and blessed harvest season.</p>
    `,
    category: "seasonal",
    author: "Dr. Ahmad Hassan",
    readTime: "8 min read",
    date: "March 15, 2024",
    image: "/images/vege1.png",
    tags: ["Spring", "Soil Preparation", "Planting", "Islamic Agriculture"],
    views: "2.1k",
    likes: 47
  };

  const relatedPosts = [
    {
      id: 2,
      title: "Summer Crop Management: Heat Stress Solutions",
      excerpt: "Protect your crops from extreme heat and maintain productivity during hot summer months.",
      image: "/images/vege5.png",
      category: "seasonal"
    },
    {
      id: 3,
      title: "Understanding Islamic Investment Principles in Agriculture",
      excerpt: "A comprehensive guide to Shariah-compliant agricultural investments and profit-sharing models.",
      image: "/images/vege2.png",
      category: "finance"
    },
    {
      id: 4,
      title: "Smart Irrigation: Water Conservation Techniques That Save Money",
      excerpt: "Modern irrigation methods that reduce water usage by 40% while increasing crop yields.",
      image: "/images/vege3.png",
      category: "irrigation"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      seasonal: "bg-green-100 text-green-700 border-green-200",
      disease: "bg-red-100 text-red-700 border-red-200",
      irrigation: "bg-blue-100 text-blue-700 border-blue-200",
      finance: "bg-purple-100 text-purple-700 border-purple-200"
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <>
      <NavBar />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              {/* Breadcrumb */}
              <div className="mb-8">
                <Link href="/blog" className="text-green-600 hover:text-green-700 font-medium">
                  ← Back to Blog
                </Link>
              </div>

              {/* Article Header */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="relative h-96">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getCategoryColor(post.category)}`}>
                        🌱 Seasonal Tips
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                      {post.title}
                    </h1>
                    <div className="flex items-center gap-6 text-green-100">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-8 md:p-12">
                  {/* Article Stats */}
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{post.views} views</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{post.likes} likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        👍 Like Article
                      </button>
                      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                        📤 Share
                      </button>
                    </div>
                  </div>

                  {/* Article Body */}
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-p:leading-relaxed prose-ul:text-gray-600 prose-strong:text-gray-800"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Related Articles</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(relatedPost.category)}`}>
                          {relatedPost.category === 'seasonal' ? '🌱' : relatedPost.category === 'finance' ? '🕌' : '💧'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      
                      <Link
                        href={`/blog/${relatedPost.id}`}
                        className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                      >
                        Read Article
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default BlogPost; 