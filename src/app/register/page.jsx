"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Description, FieldError, Form, Input, Label, TextField,Select, ListBox } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";


const Register = () => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

       
        await authClient.signUp.email({
            ...user,
        });

        router.push("/");

    };

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
        if (user.password !== user.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center py-16 px-4">


            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/register.png"
                    alt="register background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-slate-600/40" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Account
                </h2>

                <Form onSubmit={onSubmit} className="space-y-4">
                    <TextField isRequired name="name" type="text">
                        <Label>Name</Label>
                        <Input placeholder="Enter your name" className="w-full px-4 py-3 border rounded-lg" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }

                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input className='w-full px-4 py-3 border rounded-lg' placeholder="john@example.com" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                       
                        validate={(value) => {
                            if (value.length < 6) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[a-z]/.test(value)) {
                                return "Password must contain at least one lowercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }

                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input  value={password}
                        onChange={(e) => setPassword(e.target.value)} className='w-full px-4 py-3 border rounded-lg' placeholder="Enter your password" />
                        <Description>
                            Must be at least 6 characters with 1 uppercase, 1 lowercase and 1 number
                        </Description>
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        name="confirmPassword"
                        type="password"
                        validate={(value) => {
                            if (value !== password) {
                                return "Passwords do not match";
                            }
                            return null;
                        }}
                    >
                        <Input className="w-full px-4 py-3 border rounded-lg" 
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {confirmPassword && password !== confirmPassword && (
                            <Description className="text-danger">
                                Passwords do not match
                            </Description>
                        )}

                        <FieldError />
                    </TextField>
                   <Select isRequired name="role" placeholder="Select one"  defaultSelectedKeys={["user"]}>
                <Label>Register As</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="user" textValue="user">
                      User
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="lawyer" textValue="lawyer">
                      Lawyer
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
                    <Button type="submit" className="w-full bg-[#1E3A8A] text-white">
                        Register
                    </Button>

                    <div className="flex items-center gap-3">
                        <div className="h-px bg-slate-300 flex-1" />
                        <span className="text-sm">OR</span>
                        <div className="h-px bg-slate-300 flex-1" />
                    </div>

                    <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg cursor-pointer">
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>

                    <p className="text-center text-sm">
                        Already have account?{" "}
                        <Link href="/login" className="text-blue-600">
                            Login
                        </Link>
                    </p>
                </Form>
            </motion.div>
        </section>
    );
};

export default Register;