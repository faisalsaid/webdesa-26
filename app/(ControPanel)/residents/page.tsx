import ResidentsContentComp from "./_components/ResidentsContentComp";
import { checkResidentDB } from "./_config/actions/checkResidentDB.action";
import { getResidentsDataTable } from "./_config/actions/getResidentDataTable.actions";

const ResidentsPage = async () => {
  const haveResidentDB = await checkResidentDB();
  const residentDataTable = await getResidentsDataTable({});

  if (!residentDataTable.success) {
    return (
      <div className="min-h-72 flex items-center justify-center border border-dashed rounded-2xl border-pink-700/50">
        <div className="text-2xl text-pink-500">
          {residentDataTable.message ? residentDataTable.message : "Error"}
        </div>
      </div>
    );
  }

  return (
    <ResidentsContentComp
      residentDataTable={residentDataTable.data}
      haveResident={!haveResidentDB}
    />
  );
};

export default ResidentsPage;
