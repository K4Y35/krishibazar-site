"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const CycleSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const cycleSteps = [
    {
      id: 1,
      title: "The Challenge",
      subtitle: "Farmers Need Capital",
      icon: "🌾",
      bgColor: "from-red-50 to-orange-50",
      borderColor: "border-red-200",
      iconBg: "bg-red-100",
      titleColor: "text-red-700",
      description:
        "Small-scale farmers struggle with limited access to capital for essential agricultural needs.",
      items: [
        "Quality livestock purchase",
        "Modern farming equipment",
        "Seeds & organic fertilizers",
        "Fish pond infrastructure",
        "Working capital needs",
      ],
    },
    {
      id: 2,
      title: "The Solution",
      subtitle: "Project Proposal",
      icon: "📋",
      bgColor: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100",
      titleColor: "text-blue-700",
      description:
        "Farmers create detailed project proposals outlining their business plans and funding requirements.",
      items: [
        "Detailed business plan",
        "Investment amount needed",
        "Expected timeline",
        "Risk assessment",
        "Previous experience",
      ],
    },
    {
      id: 3,
      title: "The Partnership",
      subtitle: "Investor Evaluation",
      icon: "🤝",
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      iconBg: "bg-green-100",
      titleColor: "text-green-700",
      description:
        "Investors review proposals and choose projects that align with their investment goals and risk appetite.",
      items: [
        "Comprehensive due diligence",
        "Farmer credibility check",
        "Project viability analysis",
        "Expected return calculation",
        "Shariah compliance verification",
      ],
    },
    {
      id: 4,
      title: "The Journey",
      subtitle: "Active Monitoring",
      icon: "📱",
      bgColor: "from-purple-50 to-indigo-50",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-100",
      titleColor: "text-purple-700",
      description:
        "Real-time tracking and transparent communication throughout the entire project lifecycle.",
      items: [
        "Regular progress updates",
        "Photo & video documentation",
        "Financial tracking",
        "Quality assurance checks",
        "Milestone celebrations",
      ],
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-700 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            How It Works
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Connecting farmers and investors through transparent, ethical
            profit-sharing partnerships that benefit everyone
          </p>
        </motion.div>

        {/* Cycle Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {cycleSteps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="relative group"
              >
                {/* Connection line for larger screens */}
                {index < cycleSteps.length - 1 && (
                  <div className="hidden xl:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.2 }}
                      className="w-8 h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"
                    />
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.2 }}
                      className="w-3 h-3 bg-blue-500 rounded-full absolute -right-1 top-1/2 transform -translate-y-1/2"
                    />
                  </div>
                )}

                <div
                  className={`relative bg-gradient-to-br ${step.bgColor} p-8 rounded-2xl shadow-lg ${step.borderColor} border-2 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full`}
                >
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-600">
                      {step.id}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-20 h-20 ${step.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-4xl">{step.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="text-center mb-6">
                    <h3 className={`text-xl font-bold ${step.titleColor} mb-2`}>
                      {step.title}
                    </h3>
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">
                      {step.subtitle}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Items list */}
                  <ul className="space-y-2">
                    {step.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + itemIndex * 0.1 }}
                        className="flex items-start text-sm text-gray-600"
                      >
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Profit & Loss Sharing Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl  border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-green-400 p-8 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                 Finance Principles
              </h3>
              <p className="text-green-100 text-lg max-w-2xl mx-auto">
                True partnership means sharing both the rewards and the risks
                together
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Success Scenario */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-3xl">📈</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-green-700">
                        When Projects Succeed
                      </h4>
                      <p className="text-green-600">Everyone wins together</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-green-700">
                      <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center mr-3 text-sm">
                        ✓
                      </span>
                      <span className="font-medium">
                        Farmer receives management fee + profit share
                      </span>
                    </div>
                    <div className="flex items-center text-green-700">
                      <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center mr-3 text-sm">
                        ✓
                      </span>
                      <span className="font-medium">
                        Investor gets principal + agreed profit share
                      </span>
                    </div>
                    <div className="flex items-center text-green-700">
                      <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center mr-3 text-sm">
                        ✓
                      </span>
                      <span className="font-medium">
                        Community benefits from increased productivity
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-green-200 mt-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          15-30%
                        </p>
                        <p className="text-sm text-green-700">
                          Typical Annual Returns
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Risk Scenario */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border-2 border-orange-200 shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-3xl">⚖️</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-orange-700">
                        When Challenges Arise
                      </h4>
                      <p className="text-orange-600">Shared responsibility</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-orange-700">
                      <span className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center mr-3 text-sm">
                        !
                      </span>
                      <span className="font-medium">
                        Natural disasters or market volatility
                      </span>
                    </div>
                    <div className="flex items-center text-orange-700">
                      <span className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center mr-3 text-sm">
                        !
                      </span>
                      <span className="font-medium">
                        Investor bears financial risk
                      </span>
                    </div>
                    <div className="flex items-center text-orange-700">
                      <span className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center mr-3 text-sm">
                        !
                      </span>
                      <span className="font-medium">
                        Farmer invests time and effort
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-orange-200 mt-6">
                      <div className="text-center">
                        <p className="text-sm text-orange-700 italic">
                          "No guaranteed returns - risk and reward go hand in
                          hand"
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <div className="relative bg-white/95 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-gray-200 max-w-4xl mx-auto">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🚀</span>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to Start Your Journey?
            </h3>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers and investors building a sustainable
              agricultural future together
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/auth/register?role=farmer"
                className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center">
                  <span className="text-2xl mr-3">🌱</span>
                  Submit Your Project
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>

              <Link
                href="/investments"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center">
                  <span className="text-2xl mr-3">💎</span>
                  Explore Investments
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Shariah Compliant
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Transparent Process
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Community Driven
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CycleSection;
