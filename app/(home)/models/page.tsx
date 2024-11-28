import { SUPPORTED_MODELS } from "@/const/consts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ModelsPage() {
    return <div className="flex flex-col gap-20 py-40 px-10 md:px-20 lg:px-60 ">
        <h1 className="text-6xl font-bold">Supported Models on ImagineBox</h1>
        <div className="flex flex-col gap-10">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold text-black">Model</TableHead>
                        <TableHead className="font-bold text-black">Developer</TableHead>
                        <TableHead className="font-bold text-black">API Provider</TableHead>
                        <TableHead className="font-bold text-black">Estimated Cost Per Generation</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {SUPPORTED_MODELS.map((model) => (
                        <TableRow key={model.name}>
                            <TableCell>{model.name}</TableCell>
                            <TableCell>{model.developer}</TableCell>
                            <TableCell>{model.apiProvider}</TableCell>
                            <TableCell>{model.estimatedCost}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
}