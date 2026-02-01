import { MessageCircleWarning } from "lucide-react";
import OrganitationsSettingsComp from "./_components/OrganitationsSettingsComp";
import { getAllStaffPosition } from "./_config/actions/getAllStaffPosition.action";

const OrganitationsSettings = async () => {
  const staffPositionRes = await getAllStaffPosition();

  if (!staffPositionRes.success) {
    return (
      <div className="flex items-center justify-center border border-dashed rounded-xl min-h-64 border-rose-500/50">
        <div className=" text-rose-500 text-center flex items-center flex-col gap-4">
          <MessageCircleWarning size={48} />
          <p className="text-xl">Ups!, tidak bisa mengambil list jabatan</p>
        </div>
      </div>
    );
  }

  return (
    <OrganitationsSettingsComp
      staffPositions={staffPositionRes.staffPositions}
    />
  );
};

export default OrganitationsSettings;
