import getCurrentUser from "@/lib/helper/getCurrentUsers";
import { getVillageInfo } from "./_config/actions/getVillageInfo.actions";
import VillageProfileCard from "./_components/VillageProfileCard";
import { getDashboardResident } from "./_config/actions/getResisedentInfo.action";
import ResidentsDashCard from "./_components/ResidentsDashCard";

const DashboardPage = async () => {
  const currentUser = await getCurrentUser();
  const villageInfo = await getVillageInfo();
  const residentInfo = await getDashboardResident();

  if (!currentUser) {
    return <div>Guest</div>;
  }
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <VillageProfileCard village={villageInfo} />
        <ResidentsDashCard residents={residentInfo} />
      </div>
    </div>
  );
};

export default DashboardPage;
