import { MapPin } from 'lucide-react';

/**
 * LocationPicker — simple text input for the user to type a location.
 *
 * @param {{ location: string, onChange: (val: string) => void }} props
 */
export default function LocationPicker({ location, onChange }) {
    return (
        <div className="space-y-2">
            {/* Label */}
            <label
                htmlFor="location-input"
                className="flex items-center gap-2 text-sm font-semibold text-vet-text"
            >
                <MapPin size={16} className="text-vet-accent" />
                Location
            </label>

            <div className="relative">
                <input
                    id="location-input"
                    type="text"
                    value={location}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="e.g. Near City Park, Main Street entrance"
                    className="w-full rounded-xl border border-vet-border bg-vet-surface-alt px-4 py-3 pl-11 text-sm text-vet-text placeholder:text-vet-text-muted/60 focus:outline-none focus:ring-2 focus:ring-vet-primary/30 focus:border-vet-primary transition"
                />
                <MapPin
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-vet-text-muted/50"
                />
            </div>
        </div>
    );
}
