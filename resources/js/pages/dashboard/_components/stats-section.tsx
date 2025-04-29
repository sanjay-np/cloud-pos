import {
    ArrowDown,
    ArrowUp,
    IndianRupeeIcon,
    Package,
    ShoppingCart,
    Users
} from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { usePage } from "@inertiajs/react"
import { SharedData } from "@/types"

type DashboardStat = {
    activeCustomers: number
}

export function DashboardStats({ activeCustomers }: DashboardStat) {

    const { default_currency } = usePage<SharedData>().props

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="gap-1 rounded-md justify-between py-3 relative">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2"><span className="">{default_currency}</span> 45,231.89</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                    <div className="absolute w-11/12 h-full top-0 flex justify-end items-center">
                        <IndianRupeeIcon className="size-10 text-muted-foreground" strokeWidth={1.5} />
                    </div>

                </Card>

                <Card className="gap-1 rounded-md justify-between py-3 relative">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">+573</div>
                        <div className="flex items-center text-xs text-green-500">
                            <ArrowUp className="mr-1 h-3 w-3" />
                            <span>12.5% from last month</span>
                        </div>
                    </CardContent>
                    <div className="absolute w-11/12 h-full top-0 flex justify-end items-center">
                        <ShoppingCart className="size-10 text-muted-foreground" strokeWidth={1.5} />
                    </div>

                </Card>

                <Card className="gap-1 rounded-md justify-between py-3 relative">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inventory</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">12,234</div>
                        <div className="flex items-center text-xs text-red-500">
                            <ArrowDown className="mr-1 h-3 w-3" />
                            <span>4.3% from last month</span>
                        </div>
                    </CardContent>
                    <div className="absolute w-11/12 h-full top-0 flex justify-end items-center">
                        <Package className="size-10 text-muted-foreground" strokeWidth={1.5} />
                    </div>

                </Card>

                <Card className="gap-1 rounded-md justify-between py-3 relative">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">+{activeCustomers}</div>
                        <p className="text-xs text-muted-foreground">+180 in the last 24 hours</p>
                    </CardContent>
                    <div className="absolute w-11/12 h-full top-0 flex justify-end items-center">
                        <Users className="size-10 text-muted-foreground" strokeWidth={1.5} />
                    </div>
                </Card>
            </div>

        </>
    )
}
