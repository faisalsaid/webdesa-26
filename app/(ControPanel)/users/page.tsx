import getCurentUser from "@/lib/helper/get CurentUsers";
import { getAllUser } from "./_config/actions/getAllUsers.action";
import ContentCard from "../_components/ContentCard";
import CreatedUserForm from "./_components/CreatedUserForm";
import AllUsersComp from "./_components/table/AllUsersComp";

const UsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; pageSize: number }>;
}) => {
  const curentUser = await getCurentUser();

  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.q ?? "";
  const pageSize = Number(params.pageSize ?? 10);

  const result = await getAllUser({ page, pageSize, search });

  return (
    <div className="space-y-4">
      <ContentCard>
        <div className="flex items-center justify-between">
          <h1>Data Pengguna</h1>
          <div>{curentUser?.role === "ADMIN" ? <CreatedUserForm /> : null}</div>
        </div>
      </ContentCard>
      <ContentCard>
        <AllUsersComp data={result.data} meta={result.meta} />
      </ContentCard>
    </div>
  );
};

export default UsersPage;
