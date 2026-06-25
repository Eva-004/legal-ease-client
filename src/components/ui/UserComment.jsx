"use client";

import React, { useState } from "react";
import { Card, Button, TextArea } from "@heroui/react";
import { FaPaperPlane, FaUserShield, FaCommentDots } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import ShowUserComment from "./ShowUserComment";

const UserComment = ({ lawyer }) => {
 const userData = authClient.useSession();
   const user = userData?.data?.user;
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async() => {
    setLoading(true);
     if (!comment.trim()) {
      toast.error("Please write a comment");
      setLoading(false);
      return;
    }
      const commentData = {
      userId:user?.id,
      name: user?.name,
      lawyerId: lawyer?._id,
      lawyerName: lawyer?.name,
      comment,
    };
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(commentData),
      }
    );

    const data = await res.json();

     if (res.ok) {
      toast.success("Comment sent successfully");
      setComment("");
      
    } else {
      toast.error("Failed to send comment");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-6">

        {/* Left Side - Comment Form */}
        <Card className="w-full border-gray-200">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FaUserShield className="text-[#1E3A8A] text-xl" />
              </div>

              <div>
                <h2 className="sm:text-xl text-lg font-bold">
                  Message Your Lawyer
                </h2>
                <p className="text-sm text-default-500">
                  Send updates or ask questions regarding your case.
                </p>
              </div>
            </div>

            <TextArea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your message here..."
              rows={4}
              variant="bordered"
              className="w-full"
            />

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-default-500">
                {comment.length}/1000 characters
              </span>

              <Button
               isLoading={loading}
                className={'bg-[#1E3A8A]'}
                size="lg"
                onClick={handleSubmit}
               
              >
                <FaPaperPlane />
                Send Message
              </Button>
            </div>
          </div>
        </Card>

        {/* Right Side - Comments */}
        <Card className=" w-full  border-gray-200">
          <ShowUserComment lawyerId={lawyer._id}/>
        </Card>

      </div>
    </div>
  );
};

export default UserComment;