"use client";

import React, { useEffect, useState } from "react";
import {
    Button,
    Form,
    Input,
    Label,
    TextArea,
    TextField,
    Avatar,
} from "@heroui/react";
import { FaCamera, FaUserTie } from "react-icons/fa";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const ManageLegalProfile = () => {
    const session = authClient.useSession();
    const user = session?.data?.user;
    const router = useRouter();
    const [lawyer, setLawyer] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);



    useEffect(() => {
        if (user?.email) {
            fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/${user.email}`
            )
                .then((res) => res.json())
                .then((data) => setLawyer(data));
        }
    }, [user]);

    const getInitials = (name = "") => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const profileData = {
            specialization: formData.get("specialization"),
            consultationFee: formData.get("consultationFee"),
            status: formData.get("status"),
            bio: formData.get("bio"),
        };

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/profile/${user.email}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(profileData),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to update profile");
            }

            toast.success("Profile updated");
            router.refresh();
        } catch {
            toast.error("Update failed");
        }
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files?.[0];

        if (!image) return;

        try {
            setUploading(true);

            // Preview
            setPreviewImage(URL.createObjectURL(image));

            // Upload to ImgBB
            const imageData = new FormData();
            imageData.append("image", image);

            const imgbbRes = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                {
                    method: "POST",
                    body: imageData,
                }
            );

            const uploaded = await imgbbRes.json();

            if (!uploaded.success) {
                throw new Error("Image upload failed");
            }

            const imageUrl = uploaded.data.url;

            // Get auth token
            await authClient.updateUser({
                
                image: imageUrl,
            });

            // Update local state
            setLawyer((prev) => ({
                ...prev,
                image: imageUrl,
            }));

            toast.success("Image updated successfully");

            // Refresh everything (Navbar, ProfileDropdown, Dashboard)
            window.location.reload();

        } catch (error) {
            console.error(error);
            toast.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };
    if (!lawyer) return null;
    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-white p-6 md:p-8 shadow-sm rounded-2xl">

                <div className="flex items-center gap-3 mb-8">
                    <FaUserTie className="text-[#1E3A8A] text-xl" />
                    <h2 className="text-2xl font-bold">
                        Manage Legal Profile
                    </h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Image Section */}
                    <div className="flex flex-col items-center">

                        <Avatar className="w-40 h-40 object-cover text-4xl font-bold border-4 border-blue-100 shadow-lg">

                            {(previewImage || lawyer?.image) ? (
                                <Avatar.Image
                                    src={previewImage || lawyer?.image}
                                    alt={lawyer?.name || user?.name}
                                />
                            ) : null}

                            <Avatar.Fallback className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                                {getInitials(
                                    lawyer?.name ||
                                    user?.name ||
                                    user?.email?.charAt(0)
                                )}
                            </Avatar.Fallback>

                        </Avatar>

                        <label className="mt-4 cursor-pointer">
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageUpload}
                            />

                            <div className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-slate-50 transition">
                                <FaCamera />
                                {uploading ? "Uploading..." : "Upload Image"}
                            </div>
                        </label>

                        <p className="text-xs text-gray-400 mt-2 text-center">
                            JPG, PNG or WEBP
                        </p>

                    </div>

                    {/* Form Section */}
                    <div className="lg:col-span-2">

                        <Form
                            onSubmit={handleProfileUpdate}
                            className="flex flex-col gap-5 w-full"
                        >
                            <div className="grid md:grid-cols-2 gap-4 w-full">

                                <TextField
                                    name="specialization"
                                    defaultValue={lawyer?.specialization || ""}
                                >
                                    <Label>Specialization</Label>
                                    <Input placeholder="Example: Property Law" />
                                </TextField>

                                <TextField
                                    isRequired
                                    name="consultationFee"
                                    defaultValue={lawyer?.consultationFee || ""}
                                >
                                    <Label>Consultation Fee ($/hour)</Label>
                                    <Input placeholder="500" />
                                </TextField>

                            </div>

                            <TextField
                                name="status"
                                defaultValue={lawyer?.status || ""}
                            >
                                <Label>Status</Label>
                                <Input placeholder="available / busy" />
                            </TextField>

                            <div className="w-full">
                                <Label>Professional Bio</Label>

                                <TextArea
                                    aria-label="Professional Bio"
                                    name="bio"
                                    defaultValue={lawyer?.bio || ""}
                                    placeholder="Write about your legal experience..."
                                    className="min-h-24 w-full"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="bg-[#1E3A8A] text-white"
                            >
                                Update Profile
                            </Button>

                        </Form>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ManageLegalProfile;