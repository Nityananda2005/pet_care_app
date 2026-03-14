import { AlertTriangle } from 'lucide-react';

const CONDITIONS = [
    { value: 'injured', label: 'Injured', emoji: '🩹' },
    { value: 'bleeding', label: 'Bleeding', emoji: '🩸' },
    { value: 'not_moving', label: 'Not moving', emoji: '😿' },
    { value: 'weak', label: 'Weak', emoji: '🥺' },
    { value: 'abandoned', label: 'Abandoned', emoji: '🐾' },
];

/**
 * ConditionSelector — radio-button group for the animal's condition.
 *
 * @param {{ condition: string, onChange: (val: string) => void }} props
 */
export default function ConditionSelector({ condition, onChange }) {
    return (
        <div className="space-y-2">
            {/* Label */}
            <label className="flex items-center gap-2 text-sm font-semibold text-vet-text">
                <AlertTriangle size={16} className="text-vet-warning" />
                Condition
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CONDITIONS.map(({ value, label, emoji }) => {
                    const isSelected = condition === value;
                    return (
                        <label
                            key={value}
                            className={`
                flex items-center gap-2.5 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 select-none
                ${isSelected
                                    ? 'border-vet-primary bg-emerald-50 ring-2 ring-vet-primary/20 shadow-sm'
                                    : 'border-vet-border bg-vet-surface-alt hover:border-vet-primary/40 hover:bg-emerald-50/30'
                                }
              `}
                        >
                            <input
                                type="radio"
                                name="condition"
                                value={value}
                                checked={isSelected}
                                onChange={() => onChange(value)}
                                className="sr-only"
                            />
                            <span className="text-lg leading-none">{emoji}</span>
                            <span
                                className={`text-sm font-medium ${isSelected ? 'text-vet-primary-dark' : 'text-vet-text'
                                    }`}
                            >
                                {label}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}
