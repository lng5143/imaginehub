export default function HowItem({ title, description, img }) {
    return (
        <div className="flex flex-col gap-5 basis-1/3 rounded-lg p-16 items-center">
            <img src={img} alt={title} className="w-10 h-10" />
            <div className="flex flex-col gap-2 text-center">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    )
}