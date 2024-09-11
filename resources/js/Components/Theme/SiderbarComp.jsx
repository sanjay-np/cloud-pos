import { Link } from '@inertiajs/react'
import { BadgeDollarSignIcon, BadgePercentIcon, BookUserIcon, ClipboardCheckIcon, ContactRoundIcon, GaugeIcon, MailIcon, PackageIcon, PieChartIcon } from 'lucide-react'
import React from 'react'
import { Nav, Sidenav } from 'rsuite'

export default function SiderbarComp() {
    return (
        <React.Fragment>
            <Sidenav appearance='subtle' className='side-nav'>
                <Sidenav.Header className='side-nav-header'>
                    <div>CGS-Application</div>
                </Sidenav.Header>
                <Sidenav.Body className='side-nav-body'>
                    <Nav className='menu'>
                        <Nav.Item icon={<GaugeIcon strokeWidth={1.5} size={20} />} as={'div'}>
                            <Link href={route('dashboard')}>Dashboard</Link>
                        </Nav.Item>

                        <Nav.Item panel>Operations</Nav.Item>
                        <Nav.Item icon={<PackageIcon strokeWidth={1.5} size={20} />} as={'div'}>
                            <Link href={route('products.index')}>Products</Link>
                        </Nav.Item>
                        <div className="product-sub-menu">
                            <Nav.Item as={'div'}>
                                <Link href={route('attributes.index')}>Attributes</Link>
                            </Nav.Item>
                            <Nav.Item as={'div'}>
                                <Link href={route('brands.index')}>Brands</Link>
                            </Nav.Item>
                            <Nav.Item as={'div'}>
                                <Link href={route('categories.index')}>Categories</Link>
                            </Nav.Item>
                            <Nav.Item as={'div'}>
                                <Link href={route('suppliers.index')}>Suppliers</Link>
                            </Nav.Item>
                        </div>

                        <Nav.Item icon={<BadgeDollarSignIcon strokeWidth={1.5} size={20} />} as={'div'}>
                            <Link href={route('sales.index')}>Sales</Link>
                        </Nav.Item>

                        <Nav.Item panel>Miscellaneous</Nav.Item>
                        <Nav.Item icon={<BadgePercentIcon strokeWidth={1.5} size={20} />} as={'div'}>Coupons</Nav.Item>
                        <Nav.Item icon={<MailIcon strokeWidth={1.5} size={20} />} as={'div'}>Messages</Nav.Item>

                        <Nav.Item panel>Analytics</Nav.Item>
                        <Nav.Item icon={<ClipboardCheckIcon strokeWidth={1.5} size={20} />} as={'div'}>Reports</Nav.Item>
                        <Nav.Item icon={<PieChartIcon strokeWidth={1.5} size={20} />} as={'div'}>Analysis</Nav.Item>

                        <Nav.Item panel>Users</Nav.Item>
                        <Nav.Item icon={<BookUserIcon strokeWidth={1.5} size={20} />} as={'div'}>
                            <Link href={route('customers.index')}>Customers</Link>
                        </Nav.Item>
                        <Nav.Item icon={<ContactRoundIcon strokeWidth={1.5} size={20} />} as={'div'}>
                            <Link href={route('employees.index')}>Employees</Link>
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </React.Fragment>
    )
}
