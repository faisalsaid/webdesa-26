import ViilageHeaderComp from "./_components/VilageHeaderComp";
import VillageContentComp from "./_components/VillageContentComp";
import { getVillageData } from "./_config/actions/getViilageInfo.action";

const VillagePage = async () => {
  const village = await getVillageData();

  return (
    <div className="space-y-4">
      <ViilageHeaderComp />
      <VillageContentComp bucket={village} />
    </div>
  );
};

export default VillagePage;
