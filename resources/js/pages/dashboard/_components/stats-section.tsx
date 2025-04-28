import {
    ArrowDown,
    ArrowUp,
    DollarSign,
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

type DashboardStat = {
    activeCustomers: number
}

export function DashboardStats({ activeCustomers }: DashboardStat) {

    const { default_currency } = usePage().props as any
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="gap-1 rounded-md justify-between py-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">{default_currency}45,231.89</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>

                <Card className="gap-1 rounded-md justify-between py-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">+573</div>
                        <div className="flex items-center text-xs text-green-500">
                            <ArrowUp className="mr-1 h-3 w-3" />
                            <span>12.5% increase</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="gap-1 rounded-md justify-between py-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inventory</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">12,234</div>
                        <div className="flex items-center text-xs text-red-500">
                            <ArrowDown className="mr-1 h-3 w-3" />
                            <span>4.3% decrease</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="gap-1 rounded-md justify-between py-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">+2350</div>
                        <p className="text-xs text-muted-foreground">+180 in the last 24 hours</p>
                    </CardContent>
                </Card>
            </div>

        </>
    )
}
