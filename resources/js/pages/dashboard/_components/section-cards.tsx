import {
    TrendingDownIcon,
    TrendingUpIcon
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
    return (
        <div className="grid-cols-4 grid gap-3">
            <Card className="shadow-none rounded-md gap-4 py-3 ">
                <CardHeader className="relative px-3">
                    <CardDescription>Total Revenue</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums">
                        $1,250.00
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingUpIcon className="size-3" />
                            +12.5%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm px-3">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Trending up this month <TrendingUpIcon className="size-4" />
                    </div>
                </CardFooter>
            </Card>
            <Card className="shadow-none rounded-md gap-4 py-3 ">
                <CardHeader className="relative px-3">
                    <CardDescription>New Customers</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums">
                        1,234
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingDownIcon className="size-3" />
                            -20%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm px-3">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Down 20% this period <TrendingDownIcon className="size-4" />
                    </div>
                </CardFooter>
            </Card>
            <Card className="shadow-none rounded-md gap-4 py-3 ">
                <CardHeader className="relative px-3">
                    <CardDescription>Active Accounts</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums">
                        45,678
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingUpIcon className="size-3" />
                            +12.5%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm px-3">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Strong user retention <TrendingUpIcon className="size-4" />
                    </div>
                </CardFooter>
            </Card>
            <Card className="shadow-none rounded-md gap-4 py-3 ">
                <CardHeader className="relative px-3">
                    <CardDescription>Growth Rate</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums">
                        4.5%
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingUpIcon className="size-3" />
                            +4.5%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm px-3">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Steady performance <TrendingUpIcon className="size-4" />
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
