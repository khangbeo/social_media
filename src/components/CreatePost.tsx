import { useState, type ChangeEvent } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { useAuth } from "../context/AuthContext";
import type { Community } from "./CommunityList";
import { fetchCommunities } from "./CommunityList";

interface PostInput {
  title: string;
  content: string;
  avatar_url: string | null;
  community_id: number | null;
}

const createPost = async (post: PostInput, imageFile: File | null) => {
  if (!imageFile) {
    const { data, error } = await supabase.from("posts").insert(post);

    if (error) throw new Error(error.message);

    return data;
  } else {
    const imageUrl = `${post.title}-${Date.now()}-${imageFile?.name}`;

    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(imageUrl, imageFile);

    if (uploadError) throw new Error(uploadError.message);

    const { data: publicURLData } = supabase.storage
      .from("post-images")
      .getPublicUrl(imageUrl);

    const { data, error } = await supabase
      .from("posts")
      .insert({ ...post, image_url: publicURLData.publicUrl });

    if (error) throw new Error(error.message);

    return data;
  }
};

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [communityId, setCommunityId] = useState<number | null>(null);

  const { user } = useAuth();

  const { data: communities } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File | null }) => {
      return createPost(data.post, data.imageFile);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      post: {
        title,
        content,
        avatar_url: user?.user_metadata.avatar_url || null,
        community_id: communityId,
      },
      imageFile: selectedFile || null,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCommunityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCommunityId(Number(value ? Number(value) : 0));
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <div>
        <label htmlFor="title" className="block mb-2 font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-white/10 bg-transparent p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="content" className="block mb-2 font-medium">
          Content
        </label>
        <textarea
          id="content"
          required
          rows={5}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-white/10 bg-transparent p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="communities">Select Community</label>
        <select
          name="communities"
          id="communities"
          onChange={handleCommunityChange}
          className="w-full border border-white/10 bg-transparent p-2 rounded"
        >
          <option value="" className="text-black">
            -- Choose a Community --
          </option>
          {communities?.map((community) => (
            <option
              key={community.id}
              value={community.id}
              className="text-black"
            >
              {community.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block mb-2 font-medium">
          Upload Image (optional)
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-gray-200 border border-white/10 bg-transparent p-2 rounded "
        />
      </div>

      <button
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>
      {isError && <p className="text-red-500">Error creating post.</p>}
    </form>
  );
};
