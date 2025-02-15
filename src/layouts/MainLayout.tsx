import { Outlet } from "react-router-dom";
import SidebarComponent from "../components/SidebarComponent";

const MainLayout = () => {
  return (
    <>
      <SidebarComponent />
      <div>
        <Outlet />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default MainLayout;
