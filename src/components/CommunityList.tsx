import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Link } from "react-router";

export interface Community {
  id: number;
  created_at: string;
  name: string;
  description: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const fetchCommunities = async (): Promise<Community[]> => {
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Community[];
};

const CommunityList = () => {
  const { data, error, isLoading } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  if (isLoading) return <div>Loading communities...</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data?.map((community, key) => (
        <div
          key={key}
          className="p-4 border border-white/10 rounded mb-4 hover:transform hover:-translate-y-1.5 transition-all"
        >
          <Link
            to={`/communities/${community.id}`}
            className="text-2xl font-bold hover:underline text-purple-600"
          >
            {community.name}
          </Link>
          <p className="text-sm text-gray-400">{community.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CommunityList;
