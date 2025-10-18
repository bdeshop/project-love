import { useForm } from "react-hook-form";
import { FaChevronLeft, FaEye, FaEyeSlash, FaUser, FaRedo } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import { IoIosUnlock } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToasts } from "react-toast-notifications";
import { AuthContext } from "@/context/AuthContext";


const Login = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const toastShownRef = useRef(false);

  // যদি ইতিমধ্যে লগইন করা থাকে → redirect
  useEffect(() => {
    if (user && !toastShownRef.current) {
      toastShownRef.current = true;
      navigate("/");
    }
  }, [user, navigate]);

  // Random Verification Code Generate
  const generateVerificationCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setVerificationCode(code);
  };

  useEffect(() => {
    generateVerificationCode();
  }, []);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const watchInputCode = watch("inputCode", "");

  // Submit Function
  const onSubmit = async (data) => {
    const { username, password } = data;

    try {
      setLoading(true);

      // এখানে তুমি backend call করতে পারো:
      // const res = await axios.post('/api/login', { username, password });
      // const userData = res.data;

      // এখন ডেমোর জন্য ধরো login সবসময় successful:
      const userData = { username, role: "user" };

      // ইউজার সেট করো Context এ
      setUser(userData);

      addToast("Login successful", {
        appearance: "success",
        autoDismiss: true,
      });

      navigate("/");

    } catch (error) {
      addToast("Invalid username or password", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const isLoginDisabled = !(watchInputCode === verificationCode);

  return (
    <div className="bg-white h-screen">
      <div className="relative bg-slate-600 px-3 py-3 text-white text-center">
        <FaChevronLeft
          className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-2 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <p>Login</p>
      </div>

      <div className="w-full sm:p-6 text-[#6F8898]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="uppercase text-3xl font-medium text-center text-black">
            LOGIN
          </h2>

          {/* Username Input */}
          <div className="relative flex w-full items-center gap-1.5 px-4 py-2 rounded mb-4">
            <div className="w-full h-full relative">
              <FaUser className="absolute left-2 text-2xl top-1/2 transform -translate-y-1/2" />
              <Input
                type="text"
                {...register("username", { required: "Username is required" })}
                placeholder="Username"
                className="pl-12 pr-10 border border-black h-12 rounded-lg focus:outline-none bg-transparent w-full placeholder:text-lg"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          {/* Password Input */}
          <div className="relative flex w-full items-center gap-1.5 px-4 py-2 rounded mb-4">
            <div className="w-full h-full relative">
              <IoIosUnlock className="absolute text-3xl left-2 top-1/2 transform -translate-y-1/2" />
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Password"
                className="pl-12 pr-10 border border-black h-12 rounded-lg focus:outline-none bg-transparent w-full placeholder:text-lg"
              />
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Verification Input */}
          <div className="relative flex w-full items-center gap-1.5 px-4 py-2 rounded mb-4">
            <div className="w-full h-full relative">
              <FaShield className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2" />
              <Input
                type="text"
                {...register("inputCode", { required: "Validation code is required" })}
                placeholder="Validation Code"
                className="pl-12 pr-10 h-12 rounded-lg focus:outline-none border border-black bg-transparent w-full placeholder:text-lg"
              />
              <div className="absolute font-bold text-xl right-2 top-1/2 transform -translate-y-1/2 cursor-pointer flex items-center">
                <span className="text-black text-3xl">{verificationCode}</span>
                <FaRedo
                  className="ml-2 text-black"
                  onClick={() => {
                    generateVerificationCode();
                    reset({ inputCode: "" });
                  }}
                />
              </div>
              {errors.inputCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.inputCode.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className={`bg-[#ffc800] text-black w-1/3 text-base py-6 ${
                isLoginDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoginDisabled || loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
