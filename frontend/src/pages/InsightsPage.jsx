import React, { useContext, useMemo } from "react";
import { DebtContext } from "../context/DebtContext";
import { PieChart, PieArcSeries, BarChart, BarSeries } from "reaviz";

const PIE_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];
const PROGRESS_COLORS = ["#10b981", "#ef4444"];
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

  const totalProgressData = useMemo(() => {
    if (!debts?.length) return [];
    const totalOriginal = debts.reduce(
      (sum, d) => sum + Number(d.principle_amount || 0),
      0,
    );
    const totalRemaining = debts.reduce(
      (sum, d) => sum + Number(d.current_balance || 0),
      0,
    );
    const totalPaid = Math.max(0, totalOriginal - totalRemaining);

    return [
      { key: "Paid Off", data: totalPaid },
      { key: "Remaining", data: totalRemaining },
    ];
  }, [debts]);

  const categoryData = useMemo(() => {
    if (!debts?.length) return [];
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

  const frequencyData = useMemo(() => {
    if (!debts?.length) return [];
    const counts = debts.reduce((acc, d) => {
      const freq = d.frequency || "one-time payment";
      acc[freq] = (acc[freq] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).map((key) => ({
      key: key.charAt(0).toUpperCase() + key.slice(1),
      data: counts[key],
    }));
  }, [debts]);

  if (loading)
    return <p className="p-6 text-center text-gray-400">Loading charts...</p>;
  if (!debts?.length)
    return (
      <p className="p-6 text-center text-gray-400">No debt data available.</p>
    );

  return (
    <div className="flex flex-col max-w-3xl mx-auto px-4 py-6 gap-8 mb-24">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Financial Insights</h1>
        <p className="text-sm text-gray-400">
          Overview of your {debts.length} active debts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <section className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex flex-col items-center">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest self-start mb-4">
            Overall Freedom
          </h2>
          <PieChart
            width={280}
            height={200}
            data={totalProgressData}
            series={
              <PieArcSeries doughnut={true} colorScheme={PROGRESS_COLORS} />
            }
          />
          <div className="flex gap-4 mt-2">
            <LegendItem color={PROGRESS_COLORS[0]} label="Paid" />
            <LegendItem color={PROGRESS_COLORS[1]} label="Remaining" />
          </div>
        </section>

        <section className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Payment Frequency
          </h2>
          <BarChart
            width={280}
            height={200}
            data={frequencyData}
            series={<BarSeries colorScheme={[PIE_COLORS[1]]} />}
          />
        </section>
      </div>

      <section className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          Debt Distribution
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <PieChart
            width={300}
            height={250}
            data={categoryData}
            series={<PieArcSeries colorScheme={PIE_COLORS} />}
          />
          <div className="flex flex-col gap-2">
            {categoryData.map((item, i) => (
              <LegendItem
                key={item.key}
                color={PIE_COLORS[i % PIE_COLORS.length]}
                label={`${item.key}: $${item.data.toLocaleString()}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsightsPage;
