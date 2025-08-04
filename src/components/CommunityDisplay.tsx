import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import type { Post } from "./PostList";
import { PostItem } from "./PostItem";

interface Props {
  communityId: number;
}

const fetchCommunityPost = async (communityId: number): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("community_id", communityId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data as Post[];
};

const fetchCommunityName = async (communityId: number): Promise<string> => {
  const { data, error } = await supabase
    .from("communities")
    .select("name")
    .eq("id", communityId);
  if (error) throw new Error(error.message);

  return data[0].name as string;
};

const CommunityDisplay = ({ communityId }: Props) => {
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ["communityPost", communityId],
    queryFn: () => fetchCommunityPost(communityId),
  });

  const { data: communityName } = useQuery<string, Error>({
    queryKey: ["communityName", communityId],
    queryFn: () => fetchCommunityName(communityId),
  });

  console.log(communityName);

  if (isLoading) return <div>Loading communities...</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-6 justify-center">
      <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        c/{communityName}
      </h2>
      {data && data.length > 0 ? (
        data?.map((post, key) => <PostItem post={post} key={key} />)
      ) : (
        <p>No posts in this community yet.</p>
      )}
    </div>
  );
};
export default CommunityDisplay;
