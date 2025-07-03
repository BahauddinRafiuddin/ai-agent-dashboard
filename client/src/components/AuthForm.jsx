import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import Loading from "./Loading";

const AuthForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { navigate, setUser ,axios} = useAppContext();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = isLogin ? "/api/user/login" : "/api/user/register";
    const payload = isLogin
      ? { email: form.email, password: form.password }
      : form;

    try {
      const { data } = await axios.post(url, payload);
      if (data.success) {
        toast.success(isLogin ? "Logged in successfully!" : "Account created!");
        setUser(data.user)
        localStorage.setItem("user", data.user.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {loading&&<Loading/>}
    <div className="flex justify-center items-center h-full  px-4 py-10">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-dull transition-all cursor-pointer"
            disabled={loading}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Registering..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline cursor-pointer"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
    </>
  );
};

export default AuthForm;
