import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import FormInput from "@/components/FormInput";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [password2, setPassword2] = useState("");
  const [password2Error, setPassword2Error] = useState(null);

  //   useEffect(() => {
  //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (email)

  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <motion.form
          variants={fadeIn("down", "spring", 0, 1)}
          initial="hidden"
          whileInView="show"
          className="box p-4 w-[25rem]"
        >
          <h3>Register</h3>
          <FormInput
            type="email"
            label="Email"
            value={email}
            onChange={setEmail}
            error={emailError}
          />
          <FormInput
            type="password"
            label="Password"
            value={password}
            onChange={setPassword}
            error={passwordError}
          />
          <FormInput
            type="password"
            label="Repeat your password"
            value={password2}
            onChange={setPassword2}
            error={password2Error}
          />
        </motion.form>
      </div>
    </Layout>
  );
}
