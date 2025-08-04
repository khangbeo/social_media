import { useQuery } from "@tanstack/react-query";
import type { Post } from "./PostList";
import { Link } from "react-router";
import { supabase } from "../supabase-client";

interface Props {
  post: Post;
}

const fetchCommunityName = async (communityId: number): Promise<string> => {
  if (!communityId) return "";

  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .eq("id", communityId)
    .single();

  if (error) throw new Error(error.message);

  return data.name;
};

export const PostItem = ({ post }: Props) => {
  const { data: communityName } = useQuery<string, Error>({
    queryKey: ["communityName", post.community_id],
    queryFn: () => fetchCommunityName(post.community_id || 0),
  });

  return (
    <div className="relative group">
      <div className="absolute -inset-1 rounded-[20px] bg-gradient-to-r from-pink-600 to-purple-600 blur-sm opacity-0 group-hover:opacity-50 transition duration-300 pointer-events-none"></div>
      <Link to={`/post/${post.id}`} className="block relative z-10">
        <div className="w-full bg-[rgb(24,27,32)] rounded-[20px] text-white flex flex-col p-5 overflow-hidden transition-colors duration-300 group-hover:bg-gray-800">
          {/* Header: Avatar and title */}
          <div className="flex items-center space-x-2">
            {post.avatar_url ? (
              <img
                src={post.avatar_url}
                alt="user avatar"
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
            ) : (
              <div className="w-[35px] h-[35px] rounded-full bg-gradient-to-tl from-[#8A2BE2] to-[#491F70]" />
            )}
            {/* Community name and date */}
            <div className="flex space-x-2">
              {communityName && (
                <Link
                  to={`/communities/${post.community_id}`}
                  className="text-md text-gray-100 hover:text-blue-400"
                >
                  c/{communityName}
                </Link>
              )}
              <span className="text-gray-500 text-md">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>

            {/* Post title below community name and date */}
          </div>

          <h3 className="text-[20px] leading-[22px] font-semibold mt-2">
            {post.title}
          </h3>

          {/* Image banner or post content */}
          <div className="mt-2 flex-1">
            {post.image_url ? (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full rounded-[20px] object-cover max-h-[500px] mx-auto"
              />
            ) : (
              <p className="text-gray-400 mt-2">
                {post.content.length > 100
                  ? post.content.slice(0, 100) + "..."
                  : post.content}
              </p>
            )}
          </div>

          {/* Likes and Comment Count */}
          <div className="flex justify-around items-center">
            <span className="cursor-pointer h-10 w-[50px] px-1 flex items-center justify-center font-extrabold rounded-lg">
              ♥️ <span className="ml-2">{post.like_count ?? 0}</span>
            </span>

            <span className="cursor-pointer h-10 w-[50px] px-1 flex items-center justify-center font-extrabold rounded-lg">
              {" "}
              💬 <span className="ml-2">{post.comment_count || 0}</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
