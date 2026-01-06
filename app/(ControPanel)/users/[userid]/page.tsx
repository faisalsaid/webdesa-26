interface Params {
  userid: string;
}

interface Props {
  params: Promise<Params>;
}

const UserDetailPage = async ({ params }: Props) => {
  const { userid } = await params;

  return <div>UserDetailPage : {userid}</div>;
};

export default UserDetailPage;
