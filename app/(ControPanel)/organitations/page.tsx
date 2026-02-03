import OrganitationsComp from "./_component/OrganitationsComp";
import { checkStaffDB } from "./_config/dto/checkStaffDB.actions";
import { getStaffDataTable } from "./_config/actions/getStaffDataTable.action";
import { getStaffPositionToStaffFormOptions } from "./settings/_config/actions/getStaffPositionToStaffFormOptions.actions";

const OrganitationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; pageSize: number }>;
}) => {
  const haveStaff = await checkStaffDB();
  const positionOptions = await getStaffPositionToStaffFormOptions();

  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.q ?? "";
  const pageSize = Number(params.pageSize ?? 10);
  const res = await getStaffDataTable({
    page,
    pageSize,
    search,
  });
  return (
    <OrganitationsComp
      haveStaff={!!haveStaff}
      staffDataTable={res.data}
      positionOptions={positionOptions}
    />
  );
};

export default OrganitationsPage;
