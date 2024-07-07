"use client";

import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

type UpdateBlogParams = {
  title: string;
  description: string;
  id: string;
};

const updateBlog = async (data: UpdateBlogParams) => {
  const res = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({ title: data.title, description: data.description }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const getBlogById = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  return data.post;
};

const deleteBlog = async (id: number) => {
  const res = fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const EditBlog = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Request 🚀", { id: "1" });

      await updateBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id,
      });

      toast.success("Blog Posted Successfully", { id: "1" });

      router.push("/");
      router.refresh();
    }
  };

  const handleDelete = async () => {
    toast.loading("Deleting Blog", { id: "2" });
    await deleteBlog(parseInt(params.id));
  };

  useEffect(() => {
    toast.loading("Fetching Blog Details 🚀", { id: "1" });
    getBlogById(parseInt(params.id))
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;
          toast.success("Fetching Completed", { id: "1" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Fetching Blog", { id: "1" });
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
            <button
              onClick={handleDelete}
              className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100"
            >
              削除
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
