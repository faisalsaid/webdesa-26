import HamletsComp from "./_components/HamletsComp";
import { getHamletsDataTable } from "./_config/actions/getHamletDataTable.action";
import { hamletCheckDB } from "./_config/actions/hamletCheckDB.action";

const HamletsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; pageSize: number }>;
}) => {
  const haveHamlet = await hamletCheckDB();
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.q ?? "";
  const pageSize = Number(params.pageSize ?? 10);
  const hamletDataTableRes = await getHamletsDataTable({
    page,
    pageSize,
    search,
  });

  return (
    <HamletsComp
      haveHamlet={!!haveHamlet}
      hamletDataTableResult={hamletDataTableRes}
    />
  );
};

export default HamletsPage;
