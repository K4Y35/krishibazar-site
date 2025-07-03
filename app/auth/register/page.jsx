"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    usertype: roleParam === "investor" ? 2 : 1,
    address: "",
  });

  const [nidImages, setNidImages] = useState({
    nid_front: null,
    nid_back: null,
  });

  const [imagePreview, setImagePreview] = useState({
    nid_front: "",
    nid_back: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setNidImages((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      const previewUrl = URL.createObjectURL(files[0]);
      setImagePreview((prev) => ({
        ...prev,
        [name]: previewUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!nidImages.nid_front || !nidImages.nid_back) {
      setError("Please upload both front and back sides of your NID");
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("first_name", formData.first_name);
      submitData.append("last_name", formData.last_name);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("password", formData.password);
      submitData.append("usertype", formData.usertype);
      submitData.append("nid_front", nidImages.nid_front);
      submitData.append("nid_back", nidImages.nid_back);

      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: submitData,
      });

      const data = await response.json();

      //response status 2001
      if (response.status === 2001) {
        toast.success("Registration successful!");
      } else {
        toast.error(data.message || "Registration failed");
      }

      if (response.ok) {
        setSuccess(
          "Registration successful! Please verify your phone number with the OTP sent."
        );
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          usertype: roleParam === "investor" ? 2 : 1,
          address: "",
        });
        setNidImages({ nid_front: null, nid_back: null });
        setImagePreview({ nid_front: "", nid_back: "" });
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    return () => {
      if (imagePreview.nid_front) URL.revokeObjectURL(imagePreview.nid_front);
      if (imagePreview.nid_back) URL.revokeObjectURL(imagePreview.nid_back);
    };
  }, [imagePreview]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600">
        <NavBar />
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Join KrishiBazar
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href="/auth/login"
                className="font-medium text-green-600 hover:text-green-500"
              >
                sign in to your existing account
              </Link>
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I want to join as:
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, usertype: 1 })}
                    className={`p-4 border-2 rounded-lg text-center transition-colors ${
                      formData.usertype === 1
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 hover:border-green-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">🚜</div>
                    <div className="font-semibold">Farmer</div>
                    <div className="text-xs text-gray-500">
                      Get funding for projects
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, usertype: 2 })}
                    className={`p-4 border-2 rounded-lg text-center transition-colors ${
                      formData.usertype === 2
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-blue-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">💼</div>
                    <div className="font-semibold">Investor</div>
                    <div className="text-xs text-gray-500">
                      Invest in farm projects
                    </div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    required
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="First name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    required
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Last name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    NID Front Side
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {imagePreview.nid_front ? (
                        <div className="relative">
                          <img
                            src={imagePreview.nid_front}
                            alt="NID Front Preview"
                            className="max-h-40 mx-auto"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setNidImages((prev) => ({
                                ...prev,
                                nid_front: null,
                              }));
                              setImagePreview((prev) => ({
                                ...prev,
                                nid_front: "",
                              }));
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="nid_front"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                            >
                              <span>Upload front side</span>
                              <input
                                id="nid_front"
                                name="nid_front"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    NID Back Side
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {imagePreview.nid_back ? (
                        <div className="relative">
                          <img
                            src={imagePreview.nid_back}
                            alt="NID Back Preview"
                            className="max-h-40 mx-auto"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setNidImages((prev) => ({
                                ...prev,
                                nid_back: null,
                              }));
                              setImagePreview((prev) => ({
                                ...prev,
                                nid_back: "",
                              }));
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="nid_back"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                            >
                              <span>Upload back side</span>
                              <input
                                id="nid_back"
                                name="nid_back"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                By registering, you agree to our Islamic finance principles of
                profit and loss sharing without interest (riba).
              </div>
            </form>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  Shariah Compliant Platform
                </span>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                🕌 Halal Investment • 🤝 Fair Profit Sharing • ✅ Real
                Agricultural Impact
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
