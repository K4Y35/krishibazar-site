"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getIcon = (icon) => icon;

  const categories = [
    { id: "all", label: "All Articles", icon: "📚", color: "gray" },
    { id: "seasonal", label: "Seasonal Tips", icon: "🌱", color: "green" },
    { id: "disease", label: "Disease Control", icon: "🩺", color: "red" },
    { id: "irrigation", label: "Irrigation", icon: "💧", color: "blue" },
    { id: "finance", label: "Shariah Finance", icon: "🕌", color: "purple" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Spring Farming Guide: Preparing Your Land for Maximum Yield",
      excerpt:
        "Essential steps every farmer should take when spring arrives to ensure a bountiful harvest season.",
      category: "seasonal",
      author: "Dr. Ahmad Hassan",
      readTime: "5 min read",
      date: "March 15, 2024",
      image: "/images/vege1.png",
      featured: true,
      tags: ["Spring", "Soil Preparation", "Planting"],
      views: "2.1k",
      likes: 47,
    },
    {
      id: 2,
      title: "Understanding Islamic Investment Principles in Agriculture",
      excerpt:
        "A comprehensive guide to Shariah-compliant agricultural investments and profit-sharing models.",
      category: "finance",
      author: "Sheikh Dr. Omar Farooq",
      readTime: "8 min read",
      date: "March 12, 2024",
      image: "/images/vege2.png",
      featured: true,
      tags: ["Islamic Finance", "Mudarabah", "Halal Investment"],
      views: "3.7k",
      likes: 89,
    },
    {
      id: 3,
      title: "Smart Irrigation: Water Conservation Techniques That Save Money",
      excerpt:
        "Modern irrigation methods that reduce water usage by 40% while increasing crop yields.",
      category: "irrigation",
      author: "Eng. Sarah Ahmed",
      readTime: "6 min read",
      date: "March 10, 2024",
      image: "/images/vege3.png",
      featured: false,
      tags: ["Water Conservation", "Drip Irrigation", "Smart Farming"],
      views: "1.8k",
      likes: 34,
    },
    {
      id: 4,
      title: "Early Detection: Common Plant Diseases and Prevention",
      excerpt:
        "Identify and prevent the most common plant diseases before they destroy your crops.",
      category: "disease",
      author: "Dr. Fatima Al-Zahra",
      readTime: "7 min read",
      date: "March 8, 2024",
      image: "/images/vege4.png",
      featured: false,
      tags: ["Plant Health", "Prevention", "Organic Solutions"],
      views: "2.5k",
      likes: 56,
    },
    {
      id: 5,
      title: "Summer Crop Management: Heat Stress Solutions",
      excerpt:
        "Protect your crops from extreme heat and maintain productivity during hot summer months.",
      category: "seasonal",
      author: "Dr. Ahmad Hassan",
      readTime: "5 min read",
      date: "March 5, 2024",
      image: "/images/vege5.png",
      featured: false,
      tags: ["Summer", "Heat Management", "Crop Protection"],
      views: "1.9k",
      likes: 41,
    },
    {
      id: 6,
      title: "Halal Investment Returns: Real Case Studies from Our Platform",
      excerpt:
        "Success stories from farmers and investors who partnered through Islamic finance principles.",
      category: "finance",
      author: "Muhammad Tariq",
      readTime: "9 min read",
      date: "March 3, 2024",
      image: "/images/vege6.png",
      featured: false,
      tags: ["Success Stories", "ROI", "Partnership"],
      views: "4.2k",
      likes: 127,
    },
    {
      id: 7,
      title: "Precision Agriculture: IoT Sensors for Moisture Monitoring",
      excerpt:
        "How modern technology can optimize your irrigation schedule and reduce water waste.",
      category: "irrigation",
      author: "Tech Team KrishiBazaar",
      readTime: "6 min read",
      date: "March 1, 2024",
      image: "/images/vege7.png",
      featured: false,
      tags: ["IoT", "Sensors", "Technology"],
      views: "1.4k",
      likes: 28,
    },
    {
      id: 8,
      title: "Organic Pest Control: Natural Solutions That Work",
      excerpt:
        "Chemical-free methods to protect your crops while maintaining soil health and safety.",
      category: "disease",
      author: "Dr. Fatima Al-Zahra",
      readTime: "8 min read",
      date: "February 28, 2024",
      image: "/images/vege1.png",
      featured: false,
      tags: ["Organic", "Pest Control", "Natural Methods"],
      views: "2.3k",
      likes: 52,
    },
    {
      id: 9,
      title: "Winter Preparation: Protecting Your Crops from Frost",
      excerpt:
        "Complete guide to winterizing your farm and protecting valuable crops from harsh weather conditions.",
      category: "seasonal",
      author: "Dr. Ahmad Hassan",
      readTime: "6 min read",
      date: "February 25, 2024",
      image: "/images/vege2.png",
      featured: false,
      tags: ["Winter", "Frost Protection", "Crop Safety"],
      views: "1.7k",
      likes: 39,
    },
    {
      id: 10,
      title: "Shariah-Compliant Micro-Finance for Small Farmers",
      excerpt:
        "How Islamic micro-finance principles are empowering smallholder farmers across rural communities.",
      category: "finance",
      author: "Dr. Hassan Al-Mahmoud",
      readTime: "7 min read",
      date: "February 22, 2024",
      image: "/images/vege3.png",
      featured: false,
      tags: ["Micro-Finance", "Small Farmers", "Rural Development"],
      views: "3.1k",
      likes: 73,
    },
    {
      id: 11,
      title: "Advanced Drip Irrigation Setup: Step-by-Step Guide",
      excerpt:
        "Detailed instructions for installing and optimizing drip irrigation systems for maximum efficiency.",
      category: "irrigation",
      author: "Eng. Ahmed Khalil",
      readTime: "10 min read",
      date: "February 20, 2024",
      image: "/images/vege4.png",
      featured: false,
      tags: ["Installation", "Efficiency", "Water Management"],
      views: "2.8k",
      likes: 64,
    },
    {
      id: 12,
      title: "Fungal Infections: Early Warning Signs and Treatment",
      excerpt:
        "Comprehensive guide to identifying, preventing, and treating common fungal diseases in crops.",
      category: "disease",
      author: "Dr. Aisha Rahman",
      readTime: "9 min read",
      date: "February 18, 2024",
      image: "/images/vege5.png",
      featured: false,
      tags: ["Fungal Disease", "Treatment", "Prevention"],
      views: "2.6k",
      likes: 58,
    },
  ];

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const getCategoryColor = (category) => {
    const colors = {
      seasonal: "bg-green-100 text-green-700 border-green-200",
      disease: "bg-red-100 text-red-700 border-red-200",
      irrigation: "bg-blue-100 text-blue-700 border-blue-200",
      finance: "bg-purple-100 text-purple-700 border-purple-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-green-200 mb-6">
                <span className="text-2xl mr-3">📰</span>
                <span className="text-sm font-semibold text-green-700">
                  Agricultural Knowledge Hub
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Farm Wisdom
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Expert insights, seasonal guidance, and Islamic finance wisdom
                to help your agricultural journey flourish
              </p>
            </motion.div>
          </div>
        </section>

        {/* Knowledge Categories Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Knowledge Categories
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.slice(1).map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="text-center">
                      <div
                        className={`w-16 h-16 ${
                          category.color === "green"
                            ? "bg-green-100"
                            : category.color === "red"
                            ? "bg-red-100"
                            : category.color === "blue"
                            ? "bg-blue-100"
                            : "bg-purple-100"
                        } rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-3xl">
                          {getIcon(category.icon)}
                        </span>
                      </div>
                      <h3
                        className={`text-lg font-bold mb-2 ${
                          category.color === "green"
                            ? "text-green-700"
                            : category.color === "red"
                            ? "text-red-700"
                            : category.color === "blue"
                            ? "text-blue-700"
                            : "text-purple-700"
                        }`}
                      >
                        {category.label}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {
                          blogPosts.filter(
                            (post) => post.category === category.id
                          ).length
                        }{" "}
                        articles
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                Featured Articles
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto">
                Our most popular and impactful content to help you succeed in
                modern agriculture
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                          post.category
                        )}`}
                      >
                        {getIcon(
                          categories.find((cat) => cat.id === post.category)
                            ?.icon
                        )}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span>{post.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span>{post.likes} likes</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <span className="mr-2">{getIcon(category.icon)}</span>
                  {category.label}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* All Articles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                          post.category
                        )}`}
                      >
                        {getIcon(
                          categories.find((cat) => cat.id === post.category)
                            ?.icon
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {post.author}
                      </span>
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors"
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Expert Authors Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Meet Our Expert Authors
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Learn from leading agricultural scientists, Islamic scholars,
                and farming experts
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Ahmad Hassan",
                  role: "Agricultural Scientist",
                  expertise: "Seasonal Farming & Crop Management",
                  articles: 4,
                  avatar: getIcon("👨‍🌾"),
                  bio: "15+ years in sustainable agriculture research",
                },
                {
                  name: "Sheikh Dr. Omar Farooq",
                  role: "Islamic Finance Scholar",
                  expertise: "Shariah-Compliant Investments",
                  articles: 2,
                  avatar: getIcon("👨‍🏫"),
                  bio: "Expert in Islamic banking and agricultural finance",
                },
                {
                  name: "Dr. Fatima Al-Zahra",
                  role: "Plant Pathologist",
                  expertise: "Disease Control & Prevention",
                  articles: 3,
                  avatar: getIcon("👩‍🔬"),
                  bio: "Specialist in organic plant disease management",
                },
              ].map((author, index) => (
                <motion.div
                  key={author.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">{author.avatar}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {author.name}
                  </h3>
                  <p className="text-green-600 font-semibold mb-2">
                    {author.role}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {author.expertise}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">{author.bio}</p>
                  <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {author.articles} articles published
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Statistics */}
        <section className="py-16 bg-white/80">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-4 gap-8 text-center"
            >
              {[
                { number: "12+", label: "Expert Articles", icon: "📚" },
                { number: "25k+", label: "Monthly Readers", icon: "👥" },
                { number: "4", label: "Topic Categories", icon: "🏷️" },
                { number: "100%", label: "Shariah Compliant", icon: "🕌" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6"
                >
                  <div className="text-4xl mb-3">{getIcon(stat.icon)}</div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="mb-8">
                <span className="text-6xl mb-4 block">📬</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Never Miss an Update
                </h2>
                <p className="text-green-100 text-lg mb-8">
                  Get weekly agricultural tips, market insights, and Islamic
                  finance wisdom delivered straight to your inbox
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 rounded-xl border-0 focus:ring-2 focus:ring-white/50 outline-none text-gray-800 font-medium"
                  />
                  <button className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                    Subscribe Free
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-green-100">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">{getIcon("✅")}</span>
                  <span>Weekly expert insights</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">🚫</span>
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">{getIcon("🕌")}</span>
                  <span>100% Halal content</span>
                </div>
              </div>

              <p className="text-green-100 text-sm mt-6 opacity-80">
                Join 2,500+ farmers and investors getting smarter about
                agriculture
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;
