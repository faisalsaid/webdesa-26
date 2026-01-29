import { redirect } from "next/navigation";
import { getResidentById } from "../_config/actions/getResidentById.action";
import ResidentDetails from "./_component/ResidentDetails";
import ResidentDetailComp from "./_component/ResidentDetailComp";

interface Params {
  residentid: string;
}

interface ResidentDetails {
  params: Promise<Params>;
}

const ResidentDetailsPage = async ({ params }: ResidentDetails) => {
  const { residentid } = await params;

  const res = await getResidentById(residentid);

  if (!res.resident) {
    redirect("/404");
  }

  return <ResidentDetailComp resident={res.resident} />;
};

export default ResidentDetailsPage;
