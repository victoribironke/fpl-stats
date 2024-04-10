import { DashboardTemplateProps, User } from "@/types/dashboard";
import { user_details } from "@/atoms/atoms";
import { useRecoilValue } from "recoil";

const DashboardTemplate = ({ children }: DashboardTemplateProps) => {
  const { name } = useRecoilValue(user_details) as User;

  return (
    <>
      <section className="w-full min-h-screen flex items-center flex-col">
        <div className="w-full bg-white border-b p-4 flex items-center justify-center">
          <div className="w-full max-w-[1280px]">
            <button className="bg-gray-100 py-1 px-3 rounded-md">{name}</button>
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
