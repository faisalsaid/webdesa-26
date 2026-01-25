import HamletsComp from "./_components/HamletsComp";
import { hamletCheckDB } from "./_config/actions/hamletCheckDB.action";

const HamletsPage = async () => {
  const haveHamlet = await hamletCheckDB();
  return <HamletsComp haveHamlet={!!haveHamlet} />;
};

export default HamletsPage;
