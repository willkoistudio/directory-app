import React, { useEffect, useMemo, useState } from "react";
import { usePageName } from "../../context/PageNameContext";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { TrendingUp } from "lucide-react";
import { Label, LabelProps, Pie, PieChart } from "recharts";
import { ROUTE_NAMES } from "../../const/routes";
import { useTranslation } from "react-i18next";
import useChartData from "./hooks/useChartData";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../store/contactSlice";
import { getCompanies } from "../../store/companySlice";
import { RootState } from "../../store/store";
import { ChartData } from "../../models/common";

const Home: React.FC = () => {
  const { setPageName } = usePageName();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { contacts } = useSelector((state: RootState) => state.contact);
  const { companies } = useSelector((state: RootState) => state.company);

  const getUsersAndCompanies = async () => {
    setLoading(true);
    try {
      await dispatch(getContacts() as any);
      await dispatch(getCompanies() as any);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const { chartData, chartConfig } = useChartData(
    contacts.length,
    companies.length
  );

  const handlerContent = ({ viewBox }: LabelProps) => {
    const totalNbCreated = useMemo(() => {
      return chartData.reduce((acc, curr) => acc + curr.nbCreated, 0);
    }, []);
    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
      return (
        <text
          x={viewBox.cx}
          y={viewBox.cy}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          <tspan
            x={viewBox.cx}
            y={viewBox.cy}
            className="fill-foreground text-3xl font-bold"
          >
            {totalNbCreated.toLocaleString()}
          </tspan>
          <tspan
            x={viewBox.cx}
            y={(viewBox.cy || 0) + 24}
            className="fill-muted-foreground"
          >
            Number created
          </tspan>
        </text>
      );
    }
  };

  useEffect(() => {
    setPageName(ROUTE_NAMES.HOME); // Mettre à jour le nom de la page
    getUsersAndCompanies();
  }, []);

  return (
    <section className="flex h-full">
      <div className="mx-auto my-auto w-full">
        <div className="text-center mt-8 mb-12">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to my directory app !
          </h1>
          <p>This is a simple app to manage your contacts. </p>
          <p>It uses React and Tailwind CSS.</p>
          <p>Have fun !</p>
        </div>
        <div className="flex ">
          <Card className="mx-auto w-1/2">
            <CardHeader className="text-center">
              <CardTitle>
                Number of contacts registered in the database
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="nbCreated"
                    nameKey="type"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label content={handlerContent} />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export { Home };
