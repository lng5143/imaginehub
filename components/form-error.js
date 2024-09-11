export default function FormError({ error }) {
    if (!error) return null;

    return (
        <div className="w-full bg-destructive/15 p-2 rounded-md gap-x-2 text-destructive">
            {error}
        </div>
    )
}