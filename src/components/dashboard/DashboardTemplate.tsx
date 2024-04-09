import { DashboardTemplateProps } from "@/types/dashboard";
import { RxHamburgerMenu } from "react-icons/rx";

const DashboardTemplate = ({ children }: DashboardTemplateProps) => {
  return (
    <>
      <section className="w-full min-h-screen flex">
        <div className="w-full p-2 sm:px-2">
          <div className="w-full mb-2 rounded-lg bg-white px-4 py-2 sm:hidden flex justify-end">
            <RxHamburgerMenu
              className="text-xl cursor-pointer"
              // onClick={toggleShow}
            />
          </div>

          <div className="w-full rounded-lg bg-white p-4 h-[calc(100vh-4rem)] sm:h-[calc(100vh-1rem)] overflow-scroll flex items-center flex-col">
            {children}
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardTemplate;
