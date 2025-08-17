import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import userServices from "../services/userServices";

export const useRegister = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState({
    nid_front: "",
    nid_back: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    formState,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      usertype: "",
      address: "",
      nid_front: "",
      nid_back: "",
    },
    mode: "onChange",
  });

  const watchedUserType = watch("usertype");

  const handleImageChange = async (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      try {
        // Create preview URL immediately
        const previewUrl = URL.createObjectURL(files[0]);
        setImagePreview((prev) => ({
          ...prev,
          [name]: previewUrl,
        }));
        
        // Upload image to server
        const response = await userServices.imageUpload(files[0]);
        const uploadedFilename = response.data[0].filename;
        
        setValue(name, uploadedFilename);

        
      } catch (error) {
        console.error(`Error uploading ${name}:`, error);

        setImagePreview((prev) => ({
          ...prev,
          [name]: "",
        }));
        toast.error(`Failed to upload ${name}. Please try again.`);
      }
    }
  };

  const updateUserType = (usertype) => {
    setValue("usertype", usertype);
  };

  const resetForm = () => {
    reset();
    setImagePreview({ nid_front: "", nid_back: "" });
  };

  const removeImage = async (fieldName) => {
    setImagePreview((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
    const filename = getValues(fieldName);
    const response = await userServices.removeImage(filename);
    setValue(fieldName, "");
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const formData = getValues();
      const response = await userServices.register(formData);
      if (response?.success) {
        toast.success(response.message || "Registration successful");
        const phone = response?.data?.phone || formData.phone;
        router.push(`/auth/verify-otp?phone=${encodeURIComponent(phone)}`);
      } else {
        toast.error(response?.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (fieldName, file) => {
    const response = await userServices.imageUpload(file);
    setValue(fieldName, response.data[0].filename);
    console.log("image upload response", response);
  };

  useEffect(() => {
    return () => {
      if (imagePreview.nid_front) URL.revokeObjectURL(imagePreview.nid_front);
      if (imagePreview.nid_back) URL.revokeObjectURL(imagePreview.nid_back);
    };
  }, [imagePreview]);

  return {
    register,
    handleSubmit: handleSubmit(handleRegister),
    errors,
    imagePreview,
    loading,
    success,
    watchedUserType,
    handleImageChange,
    updateUserType,
    removeImage,
    formState,
    handleRegister,
    handleImageUpload,
  };
};
