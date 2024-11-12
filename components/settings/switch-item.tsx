import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

interface SwitchItemProps {
    id: string;
    name: string;
    value: boolean;
    onChange: (id: string, value: boolean) => void;
    disabled?: boolean;
}

export default function SwitchItem({ id, name, value, onChange, disabled } : SwitchItemProps) {
    return (
        <div className="flex items-center justify-between">
            <Label htmlFor={id}>{name}</Label>
            <Switch disabled={disabled} id={id} checked={value} onCheckedChange={(checked) => onChange(id, checked)} />
        </div>
    )
}