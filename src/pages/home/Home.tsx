import { FC, useEffect, useMemo, useState } from "react";
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
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label, LabelProps, Pie, PieChart } from "recharts";
import { ROUTE_NAMES } from "../../const/routes";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../store/contactSlice";
import { getCompanies } from "../../store/companySlice";
import { RootState } from "../../store/store";
import { ChartData } from "../../models/common";
import { Skeleton } from "../../components/ui/skeleton";

const Home: FC = () => {
  const { setPageName } = usePageName();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { contacts } = useSelector((state: RootState) => state.contact);
  const { companies } = useSelector((state: RootState) => state.company);
  const [loading, setLoading] = useState(false);

  const fetchResources = async () => {
    setLoading(true);
    try {
      await dispatch(getContacts() as any);
      await dispatch(getCompanies() as any);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const chartData: ChartData[] = [
    { type: "users", nbCreated: contacts.length, fill: "#f54263" },
    {
      type: "companies",
      nbCreated: companies.length,
      fill: "#4290f5",
    },
  ];

  const chartConfig: ChartConfig = {
    users: {
      label: "Users",
      color: "#f54263",
    },
    companies: {
      label: "Companies",
      color: "#4290f5",
    },
  } satisfies ChartConfig;

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
        </text>
      );
    }
  };

  useEffect(() => {
    setPageName(ROUTE_NAMES.HOME); // Mettre à jour le nom de la page
  }, []);

  return (
    <section className="flex h-full">
      <div className="mx-auto my-auto w-full">
        <div className="text-center mt-8 mb-12">
          <h1 className="text-3xl font-bold mb-4">{t("home.title")}</h1>
          <p>{t("home.description")}</p>
          <p>{t("home.description2")}</p>
          <p>{t("home.description3")}</p>
        </div>
        <div className="flex ">
          <Card className="mx-auto w-1/2">
            <CardHeader className="text-center">
              <CardTitle>{t("home.numberOfContacts")}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              {loading ? (
                <Skeleton className="bg-white/10 h-[200px] w-[200px] mx-auto mt-4 mb-10 rounded-full" />
              ) : (
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
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export { Home };
