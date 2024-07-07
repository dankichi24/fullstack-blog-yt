"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const postBlog = async (
  title: string | undefined,
  description: string | undefined
) => {
  const res = await fetch(`http://localhost:3000/api/blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  return res.json();
};

const PostBlog = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.loading("投稿中でございます...", { id: "1" });
    await postBlog(titleRef.current?.value, descriptionRef.current?.value);

    toast.success("投稿成功したよ！", { id: "1" });

    router.push("/");
    router.refresh();
  };

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-blue-400 font-bold p-3">
            ブログ新規作成 🚀
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="タイトルを入力"
              type="text"
              className="border border-blue-500 px-4 py-2 my-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              ref={descriptionRef}
              placeholder="記事詳細を入力"
              className="border border-blue-500 px-4 py-2 my-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-blue-400 rounded-lg m-auto hover:bg-blue-200">
              投稿
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostBlog;
