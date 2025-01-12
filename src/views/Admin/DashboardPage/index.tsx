import { DashboardChart } from "../../../components/ui";

const DashboardPage = () => {
  return (
    <div className="flex flex-col flex-1 gap-3">
      <h3 className="font-bold text-lg border-b pb-2">Dashboard</h3>
      <DashboardChart />
    </div>
  );
};

export default DashboardPage;
