import { redirect } from "next/navigation";
import { getUserById } from "../_config/actions/getUserById.action";
import ContentCard from "../../_components/ContentCard";

interface Params {
  userid: string;
}

interface Props {
  params: Promise<Params>;
}

const UserDetailPage = async ({ params }: Props) => {
  const { userid } = await params;

  const result = await getUserById(userid);

  if (!result.success) {
    redirect("/404");
  }

  const user = result.data;

  return (
    <div className="space-y-4">
      <ContentCard>
        <div>
          <h1>Detail Pengguna</h1>
        </div>
      </ContentCard>
      <ContentCard>
        <div>
          <p>Email : {user?.email}</p>
          <p>Role : {user?.role}</p>
        </div>
      </ContentCard>
    </div>
  );
};

export default UserDetailPage;
