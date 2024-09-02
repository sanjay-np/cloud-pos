import { Link } from '@inertiajs/react'
import { BadgeDollarSignIcon, BadgePercentIcon, BookUserIcon, ClipboardCheckIcon, ContactRoundIcon, GaugeIcon, MailIcon, PackageIcon, PieChartIcon, ShoppingBagIcon } from 'lucide-react'
import React from 'react'

export default function Sidebar() {
    return (
        <div className='sidebar-content'>
            <div className="top-section">
                <div className="logo-wrapper">CGS-Application</div>
            </div>
            <div className="menu-wrapper">
                <ul className='menu'>
                    <li className={`menu-item ${route().current('dashboard') ? 'active' : ''}`}>
                        <Link href={route('dashboard')}>
                            <span className='icon'><GaugeIcon strokeWidth={1} size={20} /></span>
                            <span className='menu-text'>Dashboard</span>
                        </Link>
                    </li>
                    <li className='sidebar-header'><span>Operations</span></li>
                    <li className={`menu-item ${route().current('purchases.index') ? 'active' : ''}`}>
                        <Link href={route('purchases.index')}>
                            <span className='icon'><ShoppingBagIcon strokeWidth={1} size={20} /></span>
                            <span className='menu-text'>Purhcases</span>
                        </Link>
                    </li>
                    <li className={`menu-item ${route().current('orders.index') ? 'active' : ''}`}>
                        <Link href={route('orders.index')}>
                            <span className='icon'><BadgeDollarSignIcon strokeWidth={1} size={20} /></span>
                            <span className='menu-text'>Orders</span>
                        </Link>
                    </li>
                    <li className='menu-item'>
                        <Link href='/'>
                            <span className='icon'><PackageIcon strokeWidth={1} size={20} /></span>
                            <span className='menu-text'>Inventory</span>
                        </Link>
                    </li>
                    <li className='sidebar-header'><span>Miscellaneous</span></li>
                    <li className='menu-item'>
                        <Link href='/'>
                            <span className='icon'><BadgePercentIcon strokeWidth={1} size={20} /></span>
                            <span className='menu-text'>Coupons</span>
                        </Link>
                    </li>
                    <li className='menu-item'>
                        <Link href='/'>
                            <span className='icon'><MailIcon strokeWidth={1} size={20} /></span>
                            <span className='menu-text'>Messages</span>
                        </Link>
                    </li>
                    <li className='sidebar-header'><span>Analytics</span></li>
                    <li className='menu-item'>
                        <Link href='/'>
                            <span className='icon'><ClipboardCheckIcon strokeWidth={1} size={20} /></span>
                            <span className='menu-text'>Reports</span>
                        </Link>
                    </li>
                    <li className='menu-item'>
                        <Link href='/'>
                            <span className='icon'><PieChartIcon strokeWidth={1} size={20} /></span>
                            <span className='menu-text'>Analysis</span>
                        </Link>
                    </li>
                    <li className='sidebar-header'><span>Users</span></li>
                    <li className='menu-item'>
                        <Link href='/'>
                            <span className='icon'><BookUserIcon strokeWidth={1} size={20} /></span>
                            <span className='menu-text'>Customers</span>
                        </Link>
                    </li>
                    <li className='menu-item'>
                        <Link href='/'>
                            <span className='icon'><ContactRoundIcon strokeWidth={1} size={20} /></span>
                            <span className='menu-text'>Employees</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
