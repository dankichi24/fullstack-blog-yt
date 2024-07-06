"use client";

import React from "react";
import { useRef } from "react";

const PostBlog = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(titleRef.current?.value);
    console.log(descriptionRef.current?.value);
  };

  return (
    <>
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
