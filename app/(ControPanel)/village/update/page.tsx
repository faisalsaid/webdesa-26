import { getVillageData } from "../_config/actions/getViilageInfo.action";
import VillageFormComp from "./_components/VillageFormComp";

const UpdateVillagePage = async () => {
  const village = await getVillageData();

  const villageData = village?.data ? village.data : undefined;

  return (
    <div>
      <VillageFormComp devaultData={villageData} />
    </div>
  );
};

export default UpdateVillagePage;
