'use client'

import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const ShowUserComment = ({ lawyerId }) => {
    const userData = authClient.useSession();
    const user = userData?.data?.user;

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id || !lawyerId) return;

        const fetchComments = async () => {
            try {
                const { data: tokenData } = await authClient.token();
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${lawyerId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${tokenData?.token}`,
                    },
                }
                );

                const data = await res.json();
                setComments(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [user?.id, lawyerId]);

    if (loading) {
        return <p className="p-5">Loading comments...</p>;
    }

    const userComments = comments.filter(comment => comment?.userId === user?.id)
    if (userComments.length === 0) {
        return (
            <div className="p-5 text-center text-gray-500">
                No comments yet.
            </div>
        );
    }
    return (
        <div className="space-y-5 p-5">
            <h2 className="text-xl text-gray-500">Comments</h2>
            {userComments?.map((comment) => (
                <div
                    key={comment._id}
                    className="border-b border-gray-200 pb-4"
                >
                    <p className="text-gray-700 leading-relaxed">
                        {comment.comment}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                        <FaUserCircle className="text-3xl text-[#1E3A8A]" />

                        <div>
                            <h4 className="font-semibold text-sm">
                                {comment.userName}
                            </h4>

                            <p className="text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShowUserComment;