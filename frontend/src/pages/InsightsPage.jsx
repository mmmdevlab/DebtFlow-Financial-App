import { React, useContext, useMemo } from "react";
import { DebtContext } from "../context/DebtContext";
import {
  PieChart,
  PieArcSeries,
  LineChart,
  LineSeries,
  Line,
  LinearXAxis,
  LinearYAxis,
} from "reaviz";

const InsightsPage = () => {
  const { debts, loading } = useContext(DebtContext);

  const categoryData = useMemo(() => {
    if (!debts || debts.length === 0) return [];
    const groups = debts.reduce((acc, debt) => {
      const cat = debt.category || "Other";
      acc[cat] = (acc[cat] || 0) + Number(debt.current_balance || 0);
      return acc;
    }, {});

    return Object.keys(groups).map((key) => ({
      key: key.charAt(0).toUpperCase() + key.slice(1),
      data: groups[key],
    }));
  }, [debts]);

  const lineData = useMemo(() => {
    if (!debts || debts.length === 0) return [];

    const validDebts = debts.filter((d) => d.amount !== undefined);

    return [
      {
        key: "Total Debt",
        data: validDebts.map((d, i) => ({
          key: i,
          data: Number(d.amount) || 0,
        })),
      },
      {
        key: "Paid Off",
        data: validDebts.map((d, i) => ({
          key: i,
          data: Math.max(
            0,
            Number(d.amount || 0) - Number(d.current_balance || 0),
          ),
        })),
      },
    ];
  }, [debts]);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-400">Loading charts...</div>
    );

  return (
    <div className="flex flex-col gap-8 w-full sm:max-w-2xl mx-auto border border-gray-100 rounded-2xl p-6 bg-white shadow-sm mb-24 mt-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Financial Insights</h1>
      </header>

      <section className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">
          Progress Trend
        </h3>
        <div className="h-[300px] w-full flex justify-center items-center overflow-hidden">
          {lineData.length > 0 && lineData[0].data.length > 0 ? (
            <LineChart
              id="line-chart"
              width={500}
              height={250}
              data={lineData}
              series={
                <LineSeries
                  type="grouped"
                  animated={false}
                  line={<Line strokeWidth={3} />}
                  colorScheme={["#111827", "#10b981"]}
                />
              }
              xAxis={<LinearXAxis type="value" />}
              yAxis={<LinearYAxis domain={[0, "auto"]} />}
            />
          ) : (
            <div className="text-gray-400 italic text-sm">
              Not enough data to graph
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">
          Distribution
        </h3>
        <div className="h-64 w-full flex justify-center">
          {categoryData.length > 0 ? (
            <PieChart
              id="pie-chart"
              width={350}
              height={250}
              data={categoryData}
              series={
                <PieArcSeries
                  animated={false}
                  colorScheme={["#10b981", "#3b82f6", "#f59e0b", "#ef4444"]}
                />
              }
            />
          ) : (
            <div className="text-gray-400 italic text-sm">
              No categories available
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InsightsPage;
