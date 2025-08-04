import { useParams } from "react-router";
import CommunityDisplay from "../components/CommunityDisplay";

function CommunityPage() {
  const { id } = useParams<{ id: string }>();

  console.log(`Community Page for: ${id}`);
  return (
    <div className="pt-20">
      <CommunityDisplay communityId={Number(id)} />
    </div>
  );
}

export default CommunityPage;
