import { useMemo } from "react";
import { ChartConfig } from "../../../components/ui/chart";
import { ChartData } from "../../../models/common";

const useChartData = (nbUsers: number, nbCompanies: number) => {
  const chartData: ChartData[] = useMemo(
    () => [
      { type: "users", nbCreated: nbUsers, fill: "#aaa" },
      {
        type: "companies",
        nbCreated: nbCompanies,
        fill: "#fff",
      },
    ],
    []
  );

  const chartConfig: ChartConfig = useMemo(
    () =>
      ({
        users: {
          label: "Users",
          color: "#aaa",
        },
        companies: {
          label: "Companies",
          color: "#fff",
        },
      } satisfies ChartConfig),
    []
  );

  return { chartData, chartConfig };
};

export default useChartData;
