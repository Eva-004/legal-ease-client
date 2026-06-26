"use client";

import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import {
  FaEdit,
  FaTrashAlt,
  FaCommentDots,
  FaUserTie,
} from "react-icons/fa";
import EditComment from "./EditComment";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import DeleteComment from "./DeleteComment";

const UserComments = ({ comments }) => {
  const router = useRouter();
      const [comment, setComment] = useState("");
      const [loading, setLoading] = useState(false);
      const session = authClient.useSession();
      const user = session?.data?.user;
  const handleCommentEdit=async(id ,updatedComment)=>{
setLoading(true);

        const { data: tokenData } = await authClient.token();
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData.token}`,
                },
                body: JSON.stringify({
                    comment: updatedComment
                }),
            }
        );

        const data = await res.json();

        if (res.ok) {
            toast.success("Comment Edit Successfully");

            setComment("");
            setLoading(false);
            router.refresh();
        } else {
            toast.error("Something went wrong");
        }
  }
   const handleDeleteComment = async(id)=>{
           setLoading(true);
  
          const { data: tokenData } = await authClient.token();
          const res = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`,
              {
                  method: "DELETE",
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${tokenData.token}`,
                  }
              }
          );
  
          const data = await res.json();
  
          if (res.ok) {
              toast.success("Comment Deleted Successfully");
  
              setComment("");
              setLoading(false);
              router.refresh();
          } else {
              toast.error("Something went wrong");
          }
      }
  return (
    <Card className="rounded-none p-4 sm:p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#1E3A8A] p-3 rounded-xl shrink-0">
          <FaCommentDots className="text-white text-xl" />
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E3A8A]">
            My Comments
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Manage your lawyer reviews and comments
          </p>
        </div>
      </div>

      {/* Empty State */}
      {comments?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <FaCommentDots className="text-5xl sm:text-6xl text-slate-600 mb-4" />

          <h3 className="text-lg sm:text-xl font-semibold">
            No Comments Found
          </h3>

          <p className="text-slate-400 mt-2 text-center">
            You haven`t commented on any lawyer profile yet.
          </p>
        </div>
      ) : (
        <>
        
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 font-semibold">
                    Lawyer
                  </th>

                  <th className="text-left py-4 font-semibold">
                    Comment
                  </th>

                  <th className="text-left py-4 font-semibold">
                    Date
                  </th>

                  <th className="text-center py-4 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {comments?.map((comment) => (
                  <tr
                    key={comment?._id}
                    className="border-b border-slate-700/50"
                  >
                    {/* Lawyer */}
                    <td className="py-5 min-w-[220px]">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#1E3A8A] p-2 rounded-full">
                          <FaUserTie className="text-white" />
                        </div>

                        <div>
                          <h4 className="font-medium">
                            {comment?.lawyerName}
                          </h4>
                        </div>
                      </div>
                    </td>

                    {/* Comment */}
                    <td className="py-5 max-w-[400px]">
                      <p className="line-clamp-3 break-words whitespace-normal">
                        {comment?.comment}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="py-5 whitespace-nowrap">
                      {comment?.createdAt
                        ? new Date(
                            comment.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* Actions */}
                    <td className="py-5">
                      <div className="flex justify-center gap-8">
                        <EditComment handleCommentEdit={handleCommentEdit} commentData={comment}/>

                        <DeleteComment handleDeleteComment={handleDeleteComment} commentData={comment}/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        
          <div className="grid gap-4 lg:hidden">
            {comments?.map((comment) => (
              <div
                key={comment?._id}
                className="border rounded-xl p-4 shadow-sm"
              >
                {/* Lawyer */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#1E3A8A] p-2 rounded-full">
                    <FaUserTie className="text-white" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">
                      {comment?.lawyerName}
                    </h4>
                  </div>
                </div>

                {/* Comment */}
                <div className="mb-3">
                  <p className="text-sm wrap-break-word whitespace-normal">
                    {comment?.comment}
                  </p>
                </div>

                {/* Date */}
                <div className="mb-4">
                  <p className="text-xs sm:text-sm text-slate-400">
                    {comment?.createdAt
                      ? new Date(
                          comment.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                 <EditComment handleCommentEdit={handleCommentEdit} commentData={comment}/>

                  <DeleteComment handleDeleteComment={handleDeleteComment} commentData={comment}/>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

export default UserComments;