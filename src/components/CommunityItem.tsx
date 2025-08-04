import type { Community } from "./CommunityList";
interface Props {
  community: Community;
}
const CommunityItem = ({ community }: Props) => {
  return (
    <div className="p-4 border border-white/10 rounded mb-4">
      <h3 className="text-2xl ">{community.name}</h3>
      <p className="text-sm text-gray-400">{community.description}</p>
    </div>
  );
};
export default CommunityItem;
