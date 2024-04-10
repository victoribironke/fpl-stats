import HeadTemplate from "@/components/general/HeadTemplate";
import PageLoader from "@/components/general/PageLoader";
import { checkAuthentication } from "@/components/hoc/ProtectedRoute";
import { useGetManagerHistory } from "@/hooks/dashboard";
import { signOutUser } from "@/utils/firebase";

const Dashboard = () => {
  const { data, error, isLoading } = useGetManagerHistory();
  console.log(data, error);

  return (
    <>
      <HeadTemplate title="Dashboard" />

      {isLoading ? (
        <PageLoader type="small" />
      ) : (
        <>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <div>Dashboard</div>
          <button onClick={signOutUser}>Sign out</button>
          <button onClick={signOutUser}>Sign out</button>
          <button onClick={signOutUser}>Sign out</button>
          <button onClick={signOutUser}>Sign out</button>
          <button onClick={signOutUser}>Sign out</button>
          <button onClick={signOutUser}>Sign out</button>
          <button onClick={signOutUser}>Sign out</button>
          <button onClick={signOutUser}>Sign out</button>
          <button onClick={signOutUser}>Sign out</button>
          <button onClick={signOutUser}>Sign out</button>
          <button onClick={signOutUser}>Sign out</button>
        </>
      )}
    </>
  );
};

export default checkAuthentication(Dashboard);
