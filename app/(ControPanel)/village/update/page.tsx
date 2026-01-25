import VillageFormComp from "./_components/VillageFormComp";
import { getVillageDevaultData } from "./_config/actions/getVillageDevaultData.action";

const UpdateVillagePage = async () => {
  const village = await getVillageDevaultData();

  const villageData = village?.data ? village.data : undefined;

  return (
    <div>
      <VillageFormComp devaultData={villageData} />
    </div>
  );
};

export default UpdateVillagePage;
