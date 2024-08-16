import { fetchRevenue } from "@/app/lib/data";
import { generateYAxis } from "@/app/lib/utils";
import { CalendarIcon } from "@heroicons/react/24/outline";

const chartHeight = 350;

export default async function RevenueChart() {
  const revenue = await fetchRevenue();
  const { yAxisLabels, topLabel } = generateYAxis(revenue);
  return (
    <div className="flex flex-col items-center h-max pt-4 pb-3 pl-4 pr-6 border rounded shadow">
      <div className="flex h-max gap-4">
        <div
          className="flex flex-col justify-between items-end text-xs text-gray-500 mb-6"
          style={{ height: chartHeight }}
        >
          {yAxisLabels.map((yAxisLabel, index) => (
            <div key={index}>{yAxisLabel}</div>
          ))}
        </div>
        <div className="flex items-end gap-4">
          {revenue?.map((m, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="flex justify-center w-8 rounded bg-blue-300"
                style={{ height: `${(chartHeight / topLabel) * m.totalSale}px` }}
              >
                <span className="pt-1.5 text-xs text-white">{m.totalSale}</span>
              </div>
              <p>{m.month}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center mt-1 bg-gray-200 w-full rounded">
        <CalendarIcon className="h-5 w-5 text-gray-500" />
        <h3 className="ml-2 text-sm text-gray-500 ">2023</h3>
      </div>
    </div>
  );
}
