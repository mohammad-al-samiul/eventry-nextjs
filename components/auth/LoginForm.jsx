"use client";

import { loginUser } from "@/actions";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await loginUser(formData);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      {!!error && <div className="text-red-500">{error}</div>}
      <form className="login-form" onSubmit={handleSubmitForm}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
