"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Card, Form, TextField, Label, Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const userData = authClient.useSession();
  const user = userData?.data?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || null);
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

    if (data.success) return data.data.url;

    throw new Error("Image upload failed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = user?.image || null;

      if (file) {
        imageUrl = await uploadImage(file);
      }
     const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update-profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`
          },
          body: JSON.stringify({
            email: user.email,
            name,
            image: imageUrl,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">

      <Card className="w-full max-w-md p-7 rounded-3xl shadow-xl border border-gray-100 bg-white/80 backdrop-blur-md">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Update Profile
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Keep your profile information up to date
          </p>
        </div>

     
        <div className="flex flex-col items-center gap-3 mb-6">

          <Avatar className="w-24 h-24 text-lg font-semibold shadow-md border-4 border-white">

           
            {image ? <Avatar.Image src={image} alt={name} /> : null}

            {/* Fallback */}
            <Avatar.Fallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
              {getInitials(name) || "U"}
            </Avatar.Fallback>

          </Avatar>

          <label className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 transition">
            Change profile picture
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          <p className="text-xs text-gray-400">
            JPG, PNG or WEBP. Max 2MB recommended.
          </p>
        </div>

        
        <Form onSubmit={handleSubmit} className="space-y-5">

          <TextField
            name="name"
            value={name}
            onValueChange={setName}
            className="w-full"
          >
            <Label className="text-gray-700 font-medium">
              Full Name
            </Label>

            <Input
              placeholder="Enter your full name"
              variant="bordered"
              className="mt-1"
            />
          </TextField>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition"
          >
            Save Changes
          </Button>

        </Form>

      </Card>

    </div>
  );
};

export default UpdateProfile;