export default function FormSuccess({ success }) {
    if (!success) return null;

    return (
        <div className="w-full bg-emerald-500/15 p-2 rounded-md gap-x-2 text-emerald-500">
            {success}
        </div>
    )
}