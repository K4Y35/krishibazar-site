"use client";
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600">
        <NavBar />
      </div>

      {/* Header */}
      <div className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">About KrishiBazar</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Connecting farmers and investors through authentic Islamic finance
              principles, creating sustainable agricultural growth without
              interest (riba)
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              To revolutionize agricultural financing in Bangladesh by providing
              Shariah-compliant investment opportunities that empower farmers
              while offering halal returns to investors, based on authentic
              Islamic finance principles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🕌",
                title: "Islamic Values",
                description:
                  "All our operations strictly follow Islamic finance principles, ensuring every transaction is halal and beneficial for society.",
              },
              {
                icon: "🚜",
                title: "Farmer Empowerment",
                description:
                  "We provide farmers with access to funding without requiring land as collateral, helping them grow their agricultural projects.",
              },
              {
                icon: "💼",
                title: "Transparent Investing",
                description:
                  "Investors get real-time updates on their investments with complete transparency about project progress and returns.",
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
                <div className="text-4xl mb-4">{getIcon(item.icon)}</div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Islamic Finance Principles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              Islamic Finance Principles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform operates on authentic Islamic finance principles,
              ensuring all investments are Shariah-compliant
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{getIcon("🚫")}</div>
                <div>
                  <h3 className="text-2xl font-semibold text-red-600 mb-2">
                    No Riba (Interest)
                  </h3>
                  <p className="text-gray-600">
                    Money should not generate money by itself. In Islam, wealth
                    must be created through real economic activities. We
                    completely eliminate interest-based transactions and focus
                    on profit-sharing from actual farming operations.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-3xl">{getIcon("🤝")}</div>
                <div>
                  <h3 className="text-2xl font-semibold text-green-600 mb-2">
                    Mudarabah Partnership
                  </h3>
                  <p className="text-gray-600">
                    Based on the concept of Mudarabah, where one party
                    (investor) provides capital and the other (farmer) manages
                    the business. Both parties share profits according to
                    pre-agreed ratios, and losses are shared based on
                    contribution.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-3xl">{getIcon("⚖️")}</div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                    Risk & Reward Sharing
                  </h3>
                  <p className="text-gray-600">
                    "Profit is the reward for risk taken." Both investors and
                    farmers share in the success and risks of agricultural
                    projects. No guaranteed returns - all profits depend on
                    actual farm performance and market conditions.
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
              <h3 className="text-2xl font-bold mb-6">
                What Makes Us Different?
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>No hidden fees or interest charges</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Transparent profit and loss sharing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Real agricultural asset backing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Regular project monitoring and updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Certified by Islamic finance scholars</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Loss Sharing Policy
                </h4>
                <p className="text-blue-700 text-sm">
                  If genuine losses occur due to natural disasters, disease, or
                  market crashes (not due to negligence), both investors and
                  farmers share the losses according to their investment ratio.
                  This ensures fairness and follows authentic Islamic
                  principles.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">How KrishiBazar Works</h2>
            <p className="text-xl text-gray-600">
              A complete ecosystem supporting farmers from funding to market
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Farmer Applies",
                description:
                  "Farmers submit project proposals for livestock or crop farming with detailed plans.",
                icon: "📝",
              },
              {
                step: "2",
                title: "Project Review",
                description:
                  "Our team verifies farmer credentials, project viability, and Islamic compliance.",
                icon: "🔍",
              },
              {
                step: "3",
                title: "Investor Funding",
                description:
                  "Approved projects are listed for investors to fund through profit-sharing agreements.",
                icon: "💰",
              },
              {
                step: "4",
                title: "Project Execution",
                description:
                  "Farmers execute projects with continuous monitoring, updates, and expert support.",
                icon: "🚜",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="text-2xl font-bold text-green-600 mb-2">
                  Step {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Technology & Innovation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We leverage modern technology to make farming smarter, more
              efficient, and more transparent
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📱",
                title: "Mobile App Monitoring",
                description:
                  "Farmers track project progress, receive alerts, and communicate with experts through our mobile app.",
              },
              {
                icon: "🛰️",
                title: "Satellite Monitoring",
                description:
                  "AI-powered satellite imagery monitors crop health, detects issues early, and optimizes farming practices.",
              },
              {
                icon: "🌡️",
                title: "Weather Forecasting",
                description:
                  "Localized weather updates and alerts help farmers prepare for changing conditions and protect crops.",
              },
              {
                icon: "📊",
                title: "AI Insights",
                description:
                  "Machine learning algorithms provide personalized farming advice based on data from thousands of farms.",
              },
              {
                icon: "🔒",
                title: "Blockchain Transparency",
                description:
                  "All transactions and project updates are recorded on blockchain for complete transparency and trust.",
              },
              {
                icon: "📈",
                title: "Real-time Analytics",
                description:
                  "Investors get real-time dashboards showing project progress, market trends, and return predictions.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Join the Agricultural Revolution
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of a sustainable agricultural ecosystem that follows
              Islamic principles, empowers farmers, and creates real economic
              impact
            </p>
            <div className="flex space-x-6 justify-center">
              <Link
                href="/auth/register?role=farmer"
                className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Join as Farmer
              </Link>
              <Link
                href="/auth/register?role=investor"
                className="bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Start Investing
              </Link>
              <Link
                href="/investments"
                className="bg-transparent border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                View Opportunities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 