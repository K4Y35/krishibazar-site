"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaSeedling,
  FaDollarSign,
  FaChartLine,
  FaShoppingCart,
  FaStore,
  FaTractor,
} from "react-icons/fa";
import { useSiteContext } from "../context/SiteContext";

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.6,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

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

const HeroTexts = [
  {
    title: "Empowering Farmers. Connecting Investors. Growing Futures.",
    description:
      "A Shariah-compliant agri-investment platform where real impact meets real profit.",
    buttons: [
      {
        text: "Start Investing",
        icon: <FaDollarSign />,
        href: "/register",
        color: "blue",
      },
    ],
  },
  {
    title: "Invest in Farms, Not Just Finance.",
    description:
      "Support real farmers, earn fair profit, and grow with purpose—100% interest-free.",
    buttons: [
      {
        text: "Explore Investments",
        icon: <FaChartLine />,
        href: "/investments",
        color: "blue",
      },
      { text: "Learn More", icon: <FaStore />, href: "/about", color: "green" },
    ],
  },
  {
    title: "Farming Support, From Seed to Sale.",
    description:
      "Access funding, expert advice, tools, and direct buyers—all in one place.",
    buttons: [
      {
        text: "Get Farm Support",
        icon: <FaTractor />,
        href: "/shop",
        color: "green",
      },
      {
        text: "Purchase Products",
        icon: <FaShoppingCart />,
        href: "/products",
        color: "blue",
      },
    ],
  },
];

const HeroContent = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const { isAuthenticated } = useSiteContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) =>
        prevIndex === HeroTexts.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto flex h-full items-center justify-center text-white px-4 sm:px-6 lg:px-8">
      <div className="w-full ">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTextIndex}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={heroVariants}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12"
          >
            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <div className="space-y-6 lg:space-y-8">
                <motion.h1
                  variants={textItem}
                  className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight ${HeroTexts[currentTextIndex].color}`}
                >
                  {HeroTexts[currentTextIndex].title}
                </motion.h1>

                <motion.p
                  variants={textItem}
                  className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-200 max-w-2xl"
                >
                  {HeroTexts[currentTextIndex].description}
                </motion.p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex-shrink-0">
              <motion.div
                variants={buttonContainer}
                className="flex flex-col gap-4 w-full sm:w-auto"
              >
                {HeroTexts[currentTextIndex].buttons.map((button, index) => {
                  const isPrimaryInvestButton =
                    button.text === "Start Investing" ||
                    button.href === "/register";
                  const targetHref = isPrimaryInvestButton
                    ? isAuthenticated
                      ? "/investments"
                      : "/login"
                    : button.href;

                  return (
                    <motion.div key={index} variants={buttonItem}>
                      <Link
                        href={targetHref}
                        className={`group flex items-center justify-center px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105 border backdrop-blur-sm ${
                          button.color === "green"
                            ? "bg-green-600 hover:bg-green-700 hover:shadow-green-500/30 border-green-500/20"
                            : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30 border-blue-500/20"
                        }`}
                      >
                        <span className="mr-2">{button.icon}</span>
                        {button.text}
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
                  );
                })}

                {/* Stats or Trust Indicators */}
                <motion.div
                  variants={buttonItem}
                  className="mt-6 pt-6 border-t border-white/20"
                >
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-xl">100+</div>
                      <div className="text-gray-300">Active Farmers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-xl">৳1M+</div>
                      <div className="text-gray-300">Invested</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-xl">18%</div>
                      <div className="text-gray-300">Avg. Returns</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroContent;
