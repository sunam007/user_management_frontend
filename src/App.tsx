import { Button, Navbar } from "flowbite-react";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardComponent from "./components/DashboardComponent";
import Settings from "./components/Settings";
import Side from "./components/Side";
import UserAdd from "./components/UserAdd";
import UserList from "./components/UserList";
import SidebarComponent from "./components/SidebarComponent";
import ReactIcon from "../src/assets/react.svg";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Side isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col">
          <Navbar className="z-20 fixed top-0 left-0 right-0 bg-slate-800 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <img src={ReactIcon} width={24} alt="React"></img>
              <p className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                NAVANA 
              </p>
            </div>
            <Button onClick={toggleSidebar} className="md:hidden">
              <Menu size={24} />
            </Button>
          </Navbar>
          <main className="flex-1 p-4 mt-16 md:ml-64 overflow-x-auto">
            <Routes>
              <Route path="/" element={<DashboardComponent />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/add-user" element={<UserAdd />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
