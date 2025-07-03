import { Outlet } from "react-router-dom";
import { assest } from "../../assets/assests";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Dashboard = () => {
  
  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: assest.dashbaordIcon },
    { label: "Email Generater Agent", path: "/dashboard/email-agent", icon: assest.emailIcon },
    { label: "Creative Writing", path: "/dashboard/creative-writing", icon: assest.idea  },
    { label: "News Agent", path: "/dashboard/news-agent", icon: assest.news },
    { label: "PDF Agent", path: "/dashboard/pdf-agent", icon: assest.pdf },
    { label: "Web Agent", path: "/dashboard/web-agent", icon: assest.website },
    // Add more agents later
  ];
  return (
    <div className="h-full flex overflow-hidden pt-17">
      <div className=" md:w-64 w-16 bg-white border-r border-gray-300 pt-4 flex-shrink-0">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.label}
            end={item.path === "/dashboard"}
            className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
        ${
          isActive
            ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
            : "hover:bg-gray-100/90 border-white"
        }`}
          >
            <img src={item.icon} alt="" className="h-9 w-9" />
            <p className="md:block hidden text-center">{item.label}</p>
          </NavLink>
        ))}
      </div>
      {/* Right Outlet (Content Area) */}
      <div className="flex-1 overflow-y-auto px-4 py-6 hide-scrollbar bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
