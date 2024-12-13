import React, { useEffect } from "react";
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
import { ROUTE_NAMES } from "../../helpers/const/routes";
import { useTranslation } from "react-i18next";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const Home: React.FC = () => {
  const { setPageName } = usePageName();
  const { t } = useTranslation();

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  useEffect(() => {
    setPageName(ROUTE_NAMES.HOME); // Mettre à jour le nom de la page
  }, []);

  const handlerContent = ({ viewBox }: LabelProps) => {
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
            {totalVisitors.toLocaleString()}
          </tspan>
          <tspan
            x={viewBox.cx}
            y={(viewBox.cy || 0) + 24}
            className="fill-muted-foreground"
          >
            Visitors
          </tspan>
        </text>
      );
    }
  };

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
                    dataKey="visitors"
                    nameKey="browser"
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
