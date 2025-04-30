import {
    ArrowDown,
    ArrowUp,
    Clock,
    Package,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const Overview = () => {

    const chartConfig = {
        sales: {
            label: "Sales",
            color: "var(--chart-2)",
        },
        expenses: {
            label: "Expenses",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig

    const data = [
        {
            name: "Jan",
            total: 18000,
            sales: 12000,
            expenses: 6000,
        },
        {
            name: "Feb",
            total: 22000,
            sales: 15000,
            expenses: 7000,
        },
        {
            name: "Mar",
            total: 25000,
            sales: 18000,
            expenses: 7000,
        },
        {
            name: "Apr",
            total: 32000,
            sales: 24000,
            expenses: 8000,
        },
        {
            name: "May",
            total: 38000,
            sales: 28000,
            expenses: 10000,
        },
        {
            name: "Jun",
            total: 42000,
            sales: 30000,
            expenses: 12000,
        },
        {
            name: "Jul",
            total: 45000,
            sales: 32000,
            expenses: 13000,
        },
        {
            name: "Aug",
            total: 48000,
            sales: 34000,
            expenses: 14000,
        },
        {
            name: "Sep",
            total: 52000,
            sales: 36000,
            expenses: 16000,
        },
        {
            name: "Oct",
            total: 56000,
            sales: 38000,
            expenses: 18000,
        },
        {
            name: "Nov",
            total: 60000,
            sales: 40000,
            expenses: 20000,
        },
        {
            name: "Dec",
            total: 65000,
            sales: 45000,
            expenses: 20000,
        },
    ]
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 rounded-md">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ChartContainer config={chartConfig}>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="sales" name="Sales" fill="var(--color-sales)" radius={4} />
                                    <Bar dataKey="expenses" name="Expenses" fill="var(--color-expenses)" radius={4} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="col-span-3 rounded-md">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>You made 265 sales this month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                                    <AvatarFallback>JM</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Jackson Miller</p>
                                    <p className="text-sm text-muted-foreground">jackson.miller@example.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$1,999.00</div>
                            </div>
                            <div className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                                    <AvatarFallback>SO</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Sophia Ortiz</p>
                                    <p className="text-sm text-muted-foreground">sophia.ortiz@example.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$1,499.00</div>
                            </div>
                            <div className="flex items-center">
                                <Avatar className=" h-9 w-9">
                                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                                    <AvatarFallback>LN</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Liam Nguyen</p>
                                    <p className="text-sm text-muted-foreground">liam.nguyen@example.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$1,299.00</div>
                            </div>
                            <div className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                                    <AvatarFallback>EM</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Emma Martinez</p>
                                    <p className="text-sm text-muted-foreground">emma.martinez@example.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$999.00</div>
                            </div>
                            <div className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                                    <AvatarFallback>WK</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">William Kim</p>
                                    <p className="text-sm text-muted-foreground">william.kim@example.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$699.00</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="rounded-md">
                    <CardHeader className="pb-2">
                        <CardTitle>Pending Tasks</CardTitle>
                        <CardDescription>Tasks that need your attention</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Inventory Review</span>
                            </div>
                            <div className="text-xs text-muted-foreground">Due in 2 days</div>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Supplier Meeting</span>
                            </div>
                            <div className="text-xs text-muted-foreground">Due tomorrow</div>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Financial Report</span>
                            </div>
                            <div className="text-xs text-muted-foreground">Due today</div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost" className="w-full">
                            View All Tasks
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="rounded-md">
                    <CardHeader className="pb-2">
                        <CardTitle>Top Products</CardTitle>
                        <CardDescription>Best selling products this month</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Package className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium">Product A</div>
                                    <div className="text-xs text-muted-foreground">Electronics</div>
                                </div>
                            </div>
                            <div className="text-sm font-medium">$12,234</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Package className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium">Product B</div>
                                    <div className="text-xs text-muted-foreground">Furniture</div>
                                </div>
                            </div>
                            <div className="text-sm font-medium">$10,340</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Package className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium">Product C</div>
                                    <div className="text-xs text-muted-foreground">Clothing</div>
                                </div>
                            </div>
                            <div className="text-sm font-medium">$8,546</div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost" className="w-full">
                            View All Products
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="rounded-md">
                    <CardHeader className="pb-2">
                        <CardTitle>Performance</CardTitle>
                        <CardDescription>Monthly department performance</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">Sales</div>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">92%</span>
                                <ArrowUp className="h-3 w-3 text-green-500" />
                            </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[92%] rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">Marketing</div>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">78%</span>
                                <ArrowUp className="h-3 w-3 text-green-500" />
                            </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[78%] rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">Operations</div>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">64%</span>
                                <ArrowDown className="h-3 w-3 text-red-500" />
                            </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[64%] rounded-full bg-amber-500"></div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost" className="w-full">
                            View Full Report
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default Overview
