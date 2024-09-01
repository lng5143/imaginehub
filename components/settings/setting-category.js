export default function SettingCategory({id, name, onClick}) {
    return (
        <button
            className="hover:cursor-pointer"
            onClick={() => onClick(id)}>{name}</button>
    )
}