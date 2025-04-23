import { useState } from "react";
import DamageGraph from "../../components/DamageGraph";
import { simulateDamage } from "../../utils/simulate";

type Props = {
  attacker: string;
  target: string;
  items: string[];
  targetItems: string[];
};

function SimulateButton({ attacker, target, items, targetItems }: Props) {
  const [result, setResult] = useState<null | { totalDamage: number; timeline: number[] }>(null);

  const handleClick = () => {
    const output = simulateDamage({ attacker, target, items, targetItems });
    setResult(output);
    console.log("Simulation Result:", output);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleClick}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500"
      >
        Simulate
      </button>

      {result && (
        <div className="text-white text-sm mt-4 space-y-4">
          <p>
            Total Damage: <strong>{result.totalDamage.toFixed(2)}</strong>
          </p>
          <DamageGraph data={result.timeline} />
        </div>
      )}
    </div>
  );
}

export default SimulateButton;
