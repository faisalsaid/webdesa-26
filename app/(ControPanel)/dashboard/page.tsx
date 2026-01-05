import getCurrentUser from "@/lib/helper/getCurrentUsers";

const DashboardPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <div>Guest</div>;
  }
  return (
    <div>
      Halo {currentUser.email} as {currentUser.role}
    </div>
  );
};

export default DashboardPage;
