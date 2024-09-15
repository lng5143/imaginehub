import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ThemeSelect() {
    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
        </Select>
    )
}