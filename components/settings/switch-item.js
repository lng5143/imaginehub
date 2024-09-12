import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

export default function SwitchItem({ id, name, value, onChange }) {
    return (
        <div className="flex items-center justify-between">
            <Label htmlFor={id}>{name}</Label>
            <Switch id={id} checked={value} onCheckedChange={(checked) => onChange(id, checked)} />
        </div>
    )
}