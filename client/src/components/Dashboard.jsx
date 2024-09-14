import Main from "./Main";
import SideBar from "./SideBar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SideBar />
      <Main />
    </div>
  );
};

export default Dashboard;
