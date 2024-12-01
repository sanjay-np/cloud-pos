import Clock from '@/Components/Clock/Clock';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formattedAmount } from '@/Lib/Utils';
import { Head, usePage } from '@inertiajs/react';
import { BadgeDollarSignIcon, ReceiptIcon, ReceiptTextIcon, TrophyIcon } from 'lucide-react';
import { Panel } from 'rsuite';
import {
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie,
    Rectangle,
    XAxis, YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export default function Dashboard({ auth }) {
    const {
        purchases,
        sales,
        expenses
    } = usePage().props;

    const data = [
        {
            name: 'Page A',
            purchase: 4000,
            sales: 2400,
            expenses: 2400,
        },
        {
            name: 'Page B',
            purchase: 3000,
            sales: 1398,
            expenses: 2210,
        },
        {
            name: 'Page C',
            purchase: 2000,
            sales: 9800,
            expenses: 2290,
        },
        {
            name: 'Page D',
            purchase: 2780,
            sales: 3908,
            expenses: 2000,
        },
        {
            name: 'Page E',
            purchase: 1890,
            sales: 4800,
            expenses: 2181,
        },
        {
            name: 'Page F',
            purchase: 2390,
            sales: 3800,
            expenses: 2500,
        },
        {
            name: 'Page G',
            purchase: 3490,
            sales: 4300,
            expenses: 2100,
        },
    ];

    const pieData = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (

        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="page-content dashboard-page">
                <div className="greetings-section">
                    <h1 className='title'>Hello {auth?.user?.name},</h1>
                    <Clock />
                </div>
                <div className="stats-container mt-6">
                    <div className="grid grid-cols-4 gap-6">
                        <div className="stats-card bg-white rounded">
                            <Panel shaded>
                                <div className="flex items-center gap-4">
                                    <div className="icon">
                                        <ReceiptIcon size={48} color='gray' strokeWidth={1.2} />
                                    </div>
                                    <div className="content">
                                        <h2 className="font-medium text-gray-400 text-3xl">${formattedAmount(purchases.total)}</h2>
                                        <p className='text-gray-600 font-semibold'>Total Purchases</p>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                        <div className="stats-card bg-white rounded">
                            <Panel shaded>
                                <div className="flex items-center gap-4">
                                    <div className="icon">
                                        <BadgeDollarSignIcon size={48} color='gray' strokeWidth={1.2} />
                                    </div>
                                    <div className="content">
                                        <h2 className="font-medium text-gray-400 text-3xl">${formattedAmount(sales.total)}</h2>
                                        <p className='text-gray-600 font-semibold'>Total Sales</p>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                        <div className="stats-card bg-white rounded">
                            <Panel shaded>
                                <div className="flex items-center gap-4">
                                    <div className="icon">
                                        <ReceiptTextIcon size={48} color='gray' strokeWidth={1.2} />
                                    </div>
                                    <div className="content">
                                        <h2 className="font-medium text-gray-400 text-3xl">${formattedAmount(expenses.total)}</h2>
                                        <p className='text-gray-600 font-semibold'>Total Expenses</p>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                        <div className="stats-card bg-white rounded">
                            <Panel shaded>
                                <div className="flex items-center gap-4">
                                    <div className="icon">
                                        <TrophyIcon size={48} color='gray' strokeWidth={1.2} />
                                    </div>
                                    <div className="content">
                                        <h2 className="font-medium text-gray-400 text-3xl">$10,000</h2>
                                        <p className='text-gray-600 font-semibold'>Total Profit</p>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                    </div>
                </div>
                <div className="monthly-overview mt-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="item col-span-2 bg-white">
                            <Panel header="Sales & Purchases of Last 7 Days" shaded>
                                <div className="h-[500px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            width={500}
                                            height={300}
                                            data={data}
                                            margin={{
                                                top: 5,
                                                right: 0,
                                                left: 0,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="sales" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                            <Bar dataKey="purchase" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                                            <Bar dataKey="expenses" fill="#83ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Panel>
                        </div>
                        <div className="item bg-white">
                            <Panel header="Monthly Overview" shaded>
                                <div className="h-[500px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart width={500} height={500}>
                                            <Pie
                                                data={pieData}
                                                cx={'50%'}
                                                cy={'50%'}
                                                innerRadius={80}
                                                outerRadius={'100%'}
                                                fill="#8884d8"
                                                paddingAngle={4}
                                                dataKey="value"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>

                                    </ResponsiveContainer>
                                </div>
                            </Panel>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
