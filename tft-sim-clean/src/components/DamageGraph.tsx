import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  data: number[]; // timeline of damage per second
};

function DamageChart({ data }: Props) {
  const chartData = data.map((value, i) => ({
    second: `t+${i + 1}s`,
    damage: value,
  }));

  const total = data.reduce((a, b) => a + b, 0);
  const avg = (total / data.length).toFixed(2);

  return (
    <div className="mt-6">
      <h2 className="text-white font-semibold mb-1">Damage Timeline (avg: {avg}/s)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="second" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="damage"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DamageChart;
