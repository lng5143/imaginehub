export default function FormError({ error }) {
    if (!error) return null;

    return (
        <div className="w-full bg-emerald-500/15 p-2 rounded-md gap-x-2 text-emerald-500">
            {error}
        </div>
    )
}