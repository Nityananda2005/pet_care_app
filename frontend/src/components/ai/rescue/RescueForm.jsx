import { useState } from 'react';
import { SendHorizonal, Loader2, CheckCircle2, Siren } from 'lucide-react';
import ImageUpload from './ImageUpload';
import LocationPicker from './LocationPicker';
import ConditionSelector from './ConditionSelector';
import { submitRescueReport } from '../../services/rescueService';

/**
 * RescueForm — orchestrates all sub-components and handles submission.
 */
export default function RescueForm() {
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [condition, setCondition] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null);

    const canSubmit =
        location.trim() !== '' && condition !== '' && !isSubmitting;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        setIsSubmitting(true);
        setResult(null);

        try {
            const response = await submitRescueReport({
                image,
                location,
                condition,
                description,
            });
            setResult(response);
        } catch {
            setResult({
                success: false,
                message: 'Something went wrong. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setImage(null);
        setLocation('');
        setCondition('');
        setDescription('');
        setResult(null);
    };

    /* ── Success state ── */
    if (result?.success) {
        return (
            <div className="flex flex-col items-center justify-center text-center gap-5 py-10 animate-fade-in-up">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 size={40} className="text-vet-primary" />
                </div>
                <div className="space-y-1.5">
                    <h2 className="text-xl font-bold text-vet-text">Alert Sent!</h2>
                    <p className="text-sm text-vet-text-muted max-w-sm">
                        {result.message}
                    </p>
                    {result.reportId && (
                        <p className="text-xs text-vet-text-muted mt-2">
                            Report ID:{' '}
                            <span className="font-mono font-semibold text-vet-primary">
                                {result.reportId}
                            </span>
                        </p>
                    )}
                </div>
                <button
                    onClick={handleReset}
                    className="mt-2 px-6 py-2.5 rounded-xl bg-vet-primary text-white font-semibold text-sm hover:bg-vet-primary-dark transition shadow-md hover:shadow-lg"
                >
                    Report Another
                </button>
            </div>
        );
    }

    /* ── Form ── */
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <ImageUpload image={image} onChange={setImage} />

            {/* Location */}
            <LocationPicker location={location} onChange={setLocation} />

            {/* Condition */}
            <ConditionSelector condition={condition} onChange={setCondition} />

            {/* Description */}
            <div className="space-y-2">
                <label
                    htmlFor="description-textarea"
                    className="flex items-center gap-2 text-sm font-semibold text-vet-text"
                >
                    <Siren size={16} className="text-vet-danger" />
                    Description
                </label>
                <textarea
                    id="description-textarea"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what you saw — injuries, behavior, surroundings…"
                    className="w-full rounded-xl border border-vet-border bg-vet-surface-alt px-4 py-3 text-sm text-vet-text placeholder:text-vet-text-muted/60 resize-none focus:outline-none focus:ring-2 focus:ring-vet-primary/30 focus:border-vet-primary transition"
                />
            </div>

            {/* Error message */}
            {result && !result.success && (
                <p className="text-sm text-vet-danger font-medium animate-fade-in-up">
                    {result.message}
                </p>
            )}

            {/* Submit */}
            <button
                id="submit-rescue-btn"
                type="submit"
                disabled={!canSubmit}
                className={`
          w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-bold tracking-wide shadow-md transition-all duration-200
          ${canSubmit
                        ? 'bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 text-white hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
        `}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending Alert…
                    </>
                ) : (
                    <>
                        <SendHorizonal size={18} />
                        Send Rescue Alert
                    </>
                )}
            </button>
        </form>
    );
}
