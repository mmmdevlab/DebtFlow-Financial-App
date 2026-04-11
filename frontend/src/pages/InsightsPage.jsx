import React, { useContext, useMemo } from "react";
import { DebtContext } from "../context/DebtContext";
import { PieChart, PieArcSeries, BarChart, BarSeries, Bar } from "reaviz";

const PIE_COLORS = ["#10b981", "#3b82f6", "#f59e0b"];
const BAR_COLORS = { original: "#d1d5db", remaining: "#10b981" };

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-1.5">
    <span
      className="w-3 h-3 rounded-sm flex-shrink-0"
      style={{ backgroundColor: color }}
    />
    <span className="text-xs text-gray-500">{label}</span>
  </div>
);

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

  const progressData = useMemo(() => {
    if (!debts || debts.length === 0) return [];
    return debts.map((d) => ({
      key: d.label,
      data: [
        { key: "Original", data: Number(d.principle_amount) || 0 },
        { key: "Remaining", data: Number(d.current_balance) || 0 },
      ],
    }));
  }, [debts]);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-400">Loading charts...</div>
    );

  if (!debts || debts.length === 0)
    return (
      <div className="p-10 text-center text-gray-400">
        No debt data yet. Add some debts to see your insights.
      </div>
    );

  return (
    <div className="flex flex-col gap-8 w-full sm:max-w-2xl mx-auto border border-gray-100 rounded-2xl p-6 bg-white shadow-sm mb-24 mt-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Financial Insights</h1>
        <p className="text-sm text-gray-400 mt-1">
          Based on your {debts.length} debt{debts.length !== 1 ? "s" : ""}
        </p>
      </header>

      <section className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <h3 className="text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">
          Repayment Progress
        </h3>
        <p className="text-xs text-gray-400 mb-3">
          Original amount vs what you still owe
        </p>

        <div className="flex gap-4 mb-4">
          <LegendItem color={BAR_COLORS.original} label="Original amount" />
          <LegendItem color={BAR_COLORS.remaining} label="Remaining balance" />
        </div>

        <div className="w-full flex justify-center overflow-x-auto">
          {progressData.length > 0 ? (
            <BarChart
              id="progress-chart"
              width={500}
              height={250}
              data={progressData}
              series={
                <BarSeries
                  type="grouped"
                  animated={false}
                  colorScheme={[BAR_COLORS.original, BAR_COLORS.remaining]}
                  bar={<Bar rounded={false} />}
                />
              }
            />
          ) : (
            <p className="text-gray-400 italic text-sm">No data available</p>
          )}
        </div>
      </section>

      <section className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <h3 className="text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">
          Debt by Category
        </h3>
        <p className="text-xs text-gray-400 mb-3">
          Where your remaining balance sits
        </p>

        <div className="flex flex-wrap gap-4 mb-4">
          {categoryData.map((item, i) => (
            <LegendItem
              key={item.key}
              color={PIE_COLORS[i % PIE_COLORS.length]}
              label={item.key}
            />
          ))}
        </div>

        <div className="h-64 w-full flex justify-center">
          {categoryData.length > 0 ? (
            <PieChart
              id="pie-chart"
              width={350}
              height={250}
              data={categoryData}
              series={
                <PieArcSeries animated={false} colorScheme={PIE_COLORS} />
              }
            />
          ) : (
            <p className="text-gray-400 italic text-sm">No data available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default InsightsPage;
