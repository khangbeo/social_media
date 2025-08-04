import { useMutation, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "../supabase-client";
import { useNavigate } from "react-router";

interface CommunityInput {
  name: string;
  description: string;
}

const createComment = async (community: CommunityInput) => {
  const { error } = await supabase.from("communities").insert(community);

  if (error) throw new Error(error.message);
};

const CreateCommunity = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      navigate("/communities");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;
    mutate({ name, description });
    setName("");
    setDescription("");
  };

  if (isPending) return <div>Creating community...</div>;
  if (isError) return <div>Error creating community</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Create New Community
      </h2>
      <div>
        <label htmlFor="name" className="block mb-2 font-medium">
          Community Name
        </label>
        <input
          type="text"
          id="name"
          required
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-white/10 bg-transparent p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-2 font-medium">
          Community Description
        </label>
        <textarea
          id="description"
          required
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-white/10 bg-transparent p-2 rounded"
        />
      </div>

      <button className="bg-purple-500 text-white px-4 py-2 rounded">
        {isPending ? "Creating..." : "Create Community"}
      </button>
      {isError && <p className="text-red-500">Error creating community</p>}
    </form>
  );
};

export default CreateCommunity;
