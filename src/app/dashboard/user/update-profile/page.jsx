"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Card, Form, TextField, Label } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const userData = authClient.useSession();
  const user = userData?.data?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("/images/avatar.webp");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "/images/avatar.webp");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setImage(URL.createObjectURL(selected));
  };

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.success) {
      return data.data.url;
    }

    throw new Error("Image upload failed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = user?.image || "/images/avatar.webp";

      if (file) {
        imageUrl = await uploadImage(file);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update-profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name,
            image: imageUrl,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md rounded-2xl p-6">
        <div className="space-y-5">
          <h2 className="text-xl font-semibold text-center">
            Update Profile
          </h2>

          <div className="flex flex-col items-center gap-3">
            <Image
              src={image}
              width={90}
              height={90}
              alt="profile"
              className="rounded-full border object-cover"
            />

            <label className="text-sm text-blue-600 cursor-pointer hover:underline">
              Change Profile Picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <Form onSubmit={handleSubmit} className="w-full space-y-4">
            <TextField name="name" type="text"  value={name}
            onValueChange={setName} className="w-full">
              <Label>Full Name</Label>
              <Input
                placeholder="Enter your name"
                variant="bordered"
                className="w-full"
              />

            </TextField>

            <Button
              type="submit"
             
              className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB]"
              isLoading={loading}
            >
              Update Profile
            </Button>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default UpdateProfile;