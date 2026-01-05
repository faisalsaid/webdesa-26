import getCurentUser from "@/lib/helper/get CurentUsers";
import { getAllUser } from "./_config/actions/getAllUsers.action";
import ContentCard from "../_components/ContentCard";
import CreatedUserForm from "./_components/CreatedUserForm";

const UsersPage = async () => {
  const curentUser = await getCurentUser();

  const allUsers = await getAllUser({ page: 1, pageSize: 10, search: "" });

  return (
    <div className="space-y-4">
      <ContentCard>
        <div className="flex items-center justify-between">
          <h1>Data Pengguna</h1>
          <div>{curentUser?.role === "ADMIN" ? <CreatedUserForm /> : null}</div>
        </div>
      </ContentCard>
      <div>
        Curent User :{" "}
        <span>{curentUser?.name ? curentUser.name : "Guest"}</span>
      </div>
      <div>Total Users : {allUsers.data.length}</div>
    </div>
  );
};

export default UsersPage;
