import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ThemeSelect({ ...props }) {
    return (
        <Select value={props.value}>
            <SelectTrigger>
                <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
        </Select>
    )
}