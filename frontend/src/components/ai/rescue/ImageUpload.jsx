import { useState, useRef } from 'react';
import { Camera, ImagePlus, X } from 'lucide-react';

/**
 * ImageUpload — lets the user pick or capture a photo of the animal.
 *
 * @param {{ image: File|null, onChange: (file: File|null) => void }} props
 */
export default function ImageUpload({ image, onChange }) {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(null);

    const handleFile = (file) => {
        if (!file) return;
        onChange(file);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleChange = (e) => {
        handleFile(e.target.files?.[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files?.[0]);
    };

    const clear = () => {
        onChange(null);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div className="space-y-2">
            {/* Label */}
            <label className="flex items-center gap-2 text-sm font-semibold text-vet-text">
                <Camera size={16} className="text-vet-primary" />
                Upload Photo
            </label>

            {preview ? (
                /* ── Preview ── */
                <div className="relative group rounded-2xl overflow-hidden border border-vet-border shadow-sm">
                    <img
                        src={preview}
                        alt="Animal preview"
                        className="w-full h-52 object-cover"
                    />
                    <button
                        type="button"
                        onClick={clear}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                        title="Remove photo"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                /* ── Drop-zone ── */
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="flex flex-col items-center justify-center gap-3 h-44 rounded-2xl border-2 border-dashed border-vet-border bg-vet-surface-alt cursor-pointer hover:border-vet-primary hover:bg-emerald-50/40 transition-all duration-200"
                >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-vet-primary">
                        <ImagePlus size={28} />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-vet-text">
                            Click or drag &amp; drop
                        </p>
                        <p className="text-xs text-vet-text-muted mt-0.5">
                            JPG, PNG — max 10 MB
                        </p>
                    </div>
                </div>
            )}

            <input
                ref={inputRef}
                id="image-upload-input"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleChange}
                className="hidden"
            />
        </div>
    );
}
