import { DashboardTemplateProps } from "@/types/dashboard";
import { user_details } from "@/atoms/atoms";
import { useRecoilValue } from "recoil";
import { signOutUser } from "@/utils/firebase";
import { TbLogout2 } from "react-icons/tb";

const DashboardTemplate = ({ children }: DashboardTemplateProps) => {
  const user = useRecoilValue(user_details);

  return (
    <>
      <section className="w-full min-h-screen flex items-center flex-col">
        <div className="w-full bg-white border-b p-4 flex items-center justify-center">
          <div className="w-full max-w-[1280px] flex">
            <button className="bg-gray-100 py-1 px-3 rounded-md">
              {user?.name}
            </button>

            <button
              className="py-1 px-1.5 sm:px-3 rounded-md ml-auto bg-red text-white"
              onClick={signOutUser}
            >
              <TbLogout2 className="sm:hidden text-lg" />
              <p className="hidden sm:block">Log out</p>
            </button>
          </div>
        </div>

        <div className="w-full bg-gray-100 min-h-[calc(100vh-4rem)] p-4 overflow-scroll flex items-center flex-col">
          <div className="w-full max-w-[1280px] min-h-full">{children}</div>
        </div>
      </section>
    </>
  );
};

export default DashboardTemplate;
