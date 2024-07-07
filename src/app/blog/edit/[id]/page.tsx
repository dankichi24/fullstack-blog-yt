"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";

const editBlog = async (
  title: string | undefined,
  description: string | undefined,
  id: number
) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, id }),
  });

  return res.json();
};

const getBlogByID = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  console.log(data);
  return data.post();
};

const EditPost = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.loading("編集中でございます...", { id: "1" });
    await editBlog(
      titleRef.current?.value,
      descriptionRef.current?.value,
      params.id
    );

    toast.success("編集成功したよ！", { id: "1" });

    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    getBlogByID(params.id)
      .then((data) => {
        titleRef.current!.value = data.title;
        descriptionRef.current!.value = data.description;
      })
      .catch((err) => {
        toast.error("エラーが発生しました。", { id: "1" });
      });
  }, []);

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-blue-400 font-bold p-3">
            ブログの編集 🚀
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
              更新
            </button>
            <button className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
              削除
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPost;
