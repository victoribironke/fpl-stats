import HeadTemplate from "@/components/general/HeadTemplate";
import { checkAuthentication } from "@/components/hoc/ProtectedRoute";
import { signOutUser } from "@/utils/firebase";
import { useEffect } from "react";

const Dashboard = () => {
  // const { data, error, isLoading } = useGetManagerHistory();
  // console.log(data, error?.message);

  useEffect(() => {
    (async () => {
      try {
        const res = await (
          await fetch(
            `https://fpl-stats-api.vercel.app/api/get-manager-history?team_id=10416894`
            // { mode: "no-cors" }
          )
        ).json();

        console.log(res);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <HeadTemplate title="Dashboard" />

      {/* {isLoading ? (
        <PageLoader type="small" />
      ) : ( */}
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
      {/* )} */}
    </>
  );
};

export default checkAuthentication(Dashboard);
