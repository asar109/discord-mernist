import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Mainlayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <div className="h-full  md:flex w-[72px] hidden z-30 fixed ">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px]  h-full ">{children}</main>
    </div>
  );
};

export default Mainlayout;
