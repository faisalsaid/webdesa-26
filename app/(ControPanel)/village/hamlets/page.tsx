import HamletsComp from "./_components/HamletsComp";
import { getHamletsDataTable } from "./_config/actions/getHamletDataTable.action";
import { hamletCheckDB } from "./_config/actions/hamletCheckDB.action";

const HamletsPage = async () => {
  const haveHamlet = await hamletCheckDB();
  const hamletDataTableRes = await getHamletsDataTable({});
  return (
    <HamletsComp
      haveHamlet={!!haveHamlet}
      hamletDataTableResult={hamletDataTableRes}
    />
  );
};

export default HamletsPage;
