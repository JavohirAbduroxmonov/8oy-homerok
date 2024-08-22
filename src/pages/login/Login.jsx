import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, setUserError } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (!response.ok) {
        throw new Error("User login failed!");
      }
      const userData = await response.json();
      dispatch(addUser(userData));
      navigate("/");
    } catch (error) {
      dispatch(setUserError(error.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label htmlFor="username" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            disabled={!(userName && password) || loading}
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
