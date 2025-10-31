"use client";
import CycleSection from "../CycleSection";
import HeroContent from "../HeroContent";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaSeedling,
  FaDollarSign,
  FaChartLine,
  FaShoppingCart,
  FaMosque,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaChartBar,
  FaTimes,
  FaHandshake,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";
import { GiCow, GiFarmer, GiGoat, GiChicken } from "react-icons/gi";

const buttonContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const buttonItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoadingFeatured(true);
        const res = await fetch(
          "http://localhost:4000/api/projects?status=approved&limit=3"
        );
        const data = await res.json();
        if (data.success) {
          setFeaturedProjects(data.data || []);
        } else {
          setFeaturedProjects([]);
        }
      } catch (e) {
        setFeaturedProjects([]);
      } finally {
        setLoadingFeatured(false);
      }
    };
    fetchFeatured();
  }, []);

  const getProjectIcon = (type) => {
    switch (type) {
      case "cow":
        return <GiCow />;
      case "goat":
        return <GiGoat />;
      case "chicken":
        return <GiChicken />;
      case "crop":
        return <FaSeedling />;
      default:
        return <GiFarmer />;
    }
  };

  const formatCurrency = (amount) => `৳${Number(amount || 0).toLocaleString()}`;

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          src="/herovideo.mp4"
          muted
          autoPlay
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover -z-20 "
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/60 -z-10" />

        <HeroContent />
      </div>

      {/* Who We Are Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Vegetables */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/vege4.png"
            alt=""
            width={80}
            height={80}
            className="absolute top-10 right-10 opacity-40 rotate-12 animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "4s" }}
          />
          <Image
            src="/images/vege5.png"
            alt=""
            width={60}
            height={60}
            className="absolute bottom-20 left-10 opacity-25 -rotate-12 animate-pulse"
            style={{ animationDelay: "1.5s", animationDuration: "3s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="flex-1 lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Welcome to KrishiBazar
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                KrishiBazar is a revolutionary Shariah-compliant platform that
                connects farmers with investors through Islamic finance
                principles. We are a team of passionate individuals dedicated to
                transforming agriculture and creating sustainable livelihoods.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our mission is to empower farmers with access to funding, modern
                technology, and fair markets while providing investors with
                ethical, profitable opportunities that contribute to food
                security and rural development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Learn More About Us
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="flex-1 lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/who-we-are.jpg"
                alt="Who We Are"
                width={1000}
                height={1000}
                className="rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Decorative Vegetables */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/vege6.png"
            alt=""
            width={70}
            height={70}
            className="absolute top-16 left-16 opacity-25 rotate-45 animate-spin"
            style={{ animationDelay: "2s", animationDuration: "10s" }}
          />
          <Image
            src="/images/vege7.png"
            alt=""
            width={55}
            height={55}
            className="absolute top-32 right-24 opacity-25 -rotate-30 animate-bounce"
            style={{ animationDelay: "3s", animationDuration: "5s" }}
          />
          <Image
            src="/images/vege1.png"
            alt=""
            width={45}
            height={45}
            className="absolute bottom-32 right-16 opacity-25 rotate-90 animate-pulse"
            style={{ animationDelay: "1s", animationDuration: "3.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            How KrishiBazar Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Islamic Finance Principles",
                description:
                  "Based on Mudarabah - profit and loss sharing without interest (riba). Real economic activities with shared risks.",
                icon: <FaMosque className="text-4xl text-green-600" />,
              },
              {
                title: "Investment Opportunities",
                description:
                  "Choose from livestock projects: cow fattening , goat rearing, chicken farming , vegetable farming, fish farming, Corps farming, etc.",
                icon: <GiCow className="text-4xl text-blue-600" />,
              },
              {
                title: "Technology & Monitoring",
                description:
                  "AI-powered farm monitoring, satellite imagery, mobile app tracking, and expert advisory support.",
                icon: <FaChartLine className="text-4xl text-purple-600" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>

                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Decorative Vegetables */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/vege2.png"
            alt=""
            width={65}
            height={65}
            className="absolute top-20 left-20 opacity-8 rotate-180 animate-spin"
            style={{ animationDelay: "0s", animationDuration: "15s" }}
          />
          <Image
            src="/images/vege3.png"
            alt=""
            width={50}
            height={50}
            className="absolute top-40 right-32 opacity-12 rotate-45 animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "4s" }}
          />
          <Image
            src="/images/vege4.png"
            alt=""
            width={75}
            height={75}
            className="absolute bottom-24 left-24 opacity-10 -rotate-45 animate-pulse"
            style={{ animationDelay: "1s", animationDuration: "6s" }}
          />
          <Image
            src="/images/vege5.png"
            alt=""
            width={40}
            height={40}
            className="absolute bottom-40 right-20 opacity-15 rotate-120 animate-bounce"
            style={{ animationDelay: "3s", animationDuration: "3s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Our Services
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Farm Financing",
                description:
                  "Interest-free funding based on Islamic Mudarabah principles",
                icon: <FaDollarSign className="text-3xl text-green-600" />,
                link: "/investments",
              },
              {
                title: "Farm Supplies",
                description:
                  "Quality seeds, fertilizers, and animal feed at affordable prices",
                icon: <FaSeedling className="text-3xl text-green-600" />,
                link: "/shop",
              },
              {
                title: "Expert Advisory",
                description:
                  "Agricultural guidance, weather updates, and farming tips",
                icon: <GiFarmer className="text-3xl text-blue-600" />,
                link: "/blog",
              },
              {
                title: "Product Sales",
                description:
                  "Direct marketplace for fresh farm products and livestock",
                icon: <FaShoppingCart className="text-3xl text-purple-600" />,
                link: "/products",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  href={service.link}
                  className="text-green-600 font-semibold hover:text-green-700"
                >
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cycle Section */}
      <div className="relative">
        {/* Decorative Vegetables */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <Image
            src="/images/vege6.png"
            alt=""
            width={60}
            height={60}
            className="absolute top-20 left-10 opacity-20 rotate-30 animate-ping"
            style={{ animationDelay: "2s", animationDuration: "4s" }}
          />
          <Image
            src="/images/vege7.png"
            alt=""
            width={45}
            height={45}
            className="absolute bottom-20 right-10 opacity-15 -rotate-60 animate-spin"
            style={{ animationDelay: "0s", animationDuration: "12s" }}
          />
        </div>
        <CycleSection />
      </div>

      {/* Featured Investment Opportunities */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Decorative Vegetables */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/vege1.png"
            alt=""
            width={55}
            height={55}
            className="absolute top-24 right-12 opacity-10 rotate-75 animate-pulse"
            style={{ animationDelay: "1s", animationDuration: "5s" }}
          />
          <Image
            src="/images/vege2.png"
            alt=""
            width={70}
            height={70}
            className="absolute top-60 left-8 opacity-12 -rotate-45 animate-bounce"
            style={{ animationDelay: "2.5s", animationDuration: "3.5s" }}
          />
          <Image
            src="/images/vege3.png"
            alt=""
            width={48}
            height={48}
            className="absolute bottom-32 right-24 opacity-8 rotate-135 animate-spin"
            style={{ animationDelay: "0.5s", animationDuration: "8s" }}
          />
          <Image
            src="/images/vege4.png"
            alt=""
            width={65}
            height={65}
            className="absolute bottom-16 left-32 opacity-15 rotate-200 animate-ping"
            style={{ animationDelay: "3s", animationDuration: "6s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Live Investment Opportunities
            </h2>
            <p className="text-xl text-gray-600">
              Invest in real farming projects with transparent profit sharing
            </p>
          </motion.div>

          {loadingFeatured ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading featured projects...</p>
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">
                <FaSearch />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Projects Found
              </h3>
              <p className="text-gray-600">
                Please check back later for new opportunities.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {featuredProjects.map((project, index) => {
                const projectImage = project.project_images
                  ? project.project_images.split(",")[0]
                  : null;
                const imageUrl = projectImage
                  ? `http://localhost:4000/public/${projectImage}`
                  : null;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {imageUrl && (
                      <div className="h-44 overflow-hidden bg-gray-100">
                        <img
                          src={imageUrl}
                          alt={project.project_name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {getProjectIcon(project.project_type)}
                          </span>
                          <h3 className="text-lg font-semibold">
                            {project.title || project.project_name}
                          </h3>
                        </div>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          {project.risk_level || "medium"} risk
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p className="flex justify-between">
                          <span>Per Unit:</span>
                          <span className="font-semibold">
                            {formatCurrency(
                              project.per_unit_price ||
                                project.total_fund_needed
                            )}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span>Duration:</span>
                          <span>{project.duration_months} months</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Expected Returns:</span>
                          <span className="font-semibold text-green-600">
                            {project.earning_percentage ||
                              project.expected_return_percent}
                            %
                          </span>
                        </p>
                      </div>
                      <Link
                        href={`/investments/${project.id}`}
                        className="group block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center"
                      >
                        View Details
                        <svg
                          className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/investments"
              className="group inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 border border-blue-500/20"
            >
              <span className="mr-2">
                <FaChartBar />
              </span>
              View All Opportunities
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Islamic Finance Values */}
      <section className="py-20 relative overflow-hidden">
        {/* Decorative Vegetables */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/vege5.png"
            alt=""
            width={80}
            height={80}
            className="absolute top-12 right-16 opacity-8 rotate-90 animate-bounce"
            style={{ animationDelay: "1.5s", animationDuration: "4s" }}
          />
          <Image
            src="/images/vege6.png"
            alt=""
            width={50}
            height={50}
            className="absolute top-48 left-12 opacity-12 -rotate-30 animate-pulse"
            style={{ animationDelay: "2s", animationDuration: "5s" }}
          />
          <Image
            src="/images/vege7.png"
            alt=""
            width={60}
            height={60}
            className="absolute bottom-20 right-28 opacity-10 rotate-150 animate-spin"
            style={{ animationDelay: "0s", animationDuration: "10s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Islamic Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              KrishiBazar operates on authentic Islamic finance principles,
              ensuring all transactions are Halal and beneficial for society
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl">
                  <FaTimes />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-600">
                    No Riba (Interest)
                  </h3>
                  <p className="text-gray-600">
                    Money should not generate money by itself. All profits come
                    from real economic activities.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-2xl">
                  <FaHandshake />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600">
                    Profit & Loss Sharing
                  </h3>
                  <p className="text-gray-600">
                    Based on Mudarabah - investors and farmers share both
                    profits and risks fairly.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-2xl">
                  <FaCheckCircle />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-600">
                    Real Economic Activity
                  </h3>
                  <p className="text-gray-600">
                    All investments are tied to actual farming operations and
                    tangible assets.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-green-50 p-8 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-4">
                What If There Is a Loss?
              </h3>
              <p className="text-gray-700 mb-4">
                If a farmer experiences genuine loss due to unavoidable
                circumstances like disease, flood, or market crashes (not due to
                negligence), then:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Investors share the loss as well as profits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Returns depend on actual farm performance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>No guaranteed returns - profit is reward for risk</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="container mx-auto py-20 my-20 bg-green-600 text-white relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/vegetableBg.jpg')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          borderRadius: "30px",
        }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/50 rounded-[30px]"></div>

        {/* Additional Decorative Vegetables on CTA */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/vege1.png"
            alt=""
            width={40}
            height={40}
            className="absolute top-8 left-8 opacity-30 rotate-45 animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          />
          <Image
            src="/images/vege2.png"
            alt=""
            width={35}
            height={35}
            className="absolute top-12 right-8 opacity-25 -rotate-30 animate-pulse"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          />
          <Image
            src="/images/vege3.png"
            alt=""
            width={30}
            height={30}
            className="absolute bottom-8 left-12 opacity-30 rotate-90 animate-ping"
            style={{ animationDelay: "2s", animationDuration: "5s" }}
          />
          <Image
            src="/images/vege4.png"
            alt=""
            width={45}
            height={45}
            className="absolute bottom-12 right-12 opacity-25 rotate-180 animate-spin"
            style={{ animationDelay: "1.5s", animationDuration: "8s" }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join and invest in farms to support farmers and earn profits.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={buttonContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={buttonItem}>
                <Link
                  href="/register"
                  className="group inline-flex items-center bg-white text-green-600 hover:text-green-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-green-200 hover:border-green-300 min-w-[200px] justify-center"
                >
                  <FaSeedling className="mr-2" />
                  Join as an Investor
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

