import { Link } from '@inertiajs/react'
import { BadgeDollarSignIcon, BadgePercentIcon, BookUserIcon, ClipboardCheckIcon, ContactRoundIcon, CornerDownLeftIcon, CornerDownRightIcon, GaugeIcon, MailIcon, PackageIcon, PieChartIcon, ReceiptIcon, Settings2Icon } from 'lucide-react'
import React from 'react'
import { Nav, Sidenav } from 'rsuite'

export default function SiderbarComp(props) {
    const currenRoute = route().current();
    return (
        <React.Fragment>
            <Sidenav appearance='subtle' className='side-nav' defaultOpenKeys={props?.activeKey ?? []} >
                <Sidenav.Header className='side-nav-header'>
                    <div>CGS-Application</div>
                </Sidenav.Header>
                <Sidenav.Body className='side-nav-body'>
                    <Nav className='menu'>
                        <Nav.Item icon={<GaugeIcon strokeWidth={1.5} size={20} />} as={'div'}>
                            <Link href={route('dashboard')}>Dashboard</Link>
                        </Nav.Item>

                        {/* <Nav.Item panel>Operations</Nav.Item>
                        <Nav.Menu eventKey={'products'} title="Products" icon={<PackageIcon strokeWidth={1.5} size={20} />} className='dropdown-menu'>
                            <Nav.Item as={'div'} eventKey={'products.index'} active={currenRoute === 'products.index'}>
                                <Link href={route('products.index')}>All Products</Link>
                            </Nav.Item>
                            <Nav.Item as={'div'} eventKey={'attributes.index'} active={currenRoute === 'attributes.index'}>
                                <Link href={route('attributes.index')}>Attributes</Link>
                            </Nav.Item>
                            <Nav.Item as={'div'} eventKey={'brands.index'} active={currenRoute === 'brands.index'}>
                                <Link href={route('brands.index')}>Brands</Link>
                            </Nav.Item>
                            <Nav.Item as={'div'} eventKey={'categories.index'} active={currenRoute === 'categories.index'}>
                                <Link href={route('categories.index')}>Categories</Link>
                            </Nav.Item>
                            <Nav.Item as={'div'} eventKey={'suppliers.index'} active={currenRoute === 'suppliers.index'}>
                                <Link href={route('suppliers.index')}>Suppliers</Link>
                            </Nav.Item>
                        </Nav.Menu>

                        <Nav.Item icon={<ReceiptIcon strokeWidth={1.5} size={20} />} as={'div'}>
                            <Link href={route('purchases.index')}>Purchase</Link>
                        </Nav.Item>
                        <Nav.Item icon={<CornerDownRightIcon strokeWidth={1.5} size={20} />} as={'div'}>
                            <Link href={route('purchases.returns.index')}>Purchase Return</Link>
                        </Nav.Item>
                        <Nav.Item icon={<BadgeDollarSignIcon strokeWidth={1.5} size={20} />} as={'div'}>
                            <Link href={route('sales.index')}>Sales</Link>
                        </Nav.Item>
                        <Nav.Item icon={<CornerDownLeftIcon strokeWidth={1.5} size={20} />} as={'div'}>
                            <Link href={route('sales.returns.index')}>Sales Return</Link>
                        </Nav.Item>

                        <Nav.Item panel>Miscellaneous</Nav.Item>
                        <Nav.Item icon={<BadgePercentIcon strokeWidth={1.5} size={20} />} as={'div'}>Coupons</Nav.Item>
                        <Nav.Item icon={<MailIcon strokeWidth={1.5} size={20} />} as={'div'}>Messages</Nav.Item>

                        <Nav.Item panel>Analytics</Nav.Item>
                        <Nav.Item icon={<ClipboardCheckIcon strokeWidth={1.5} size={20} />} as={'div'}>Reports</Nav.Item>
                        <Nav.Item icon={<PieChartIcon strokeWidth={1.5} size={20} />} as={'div'}>Analysis</Nav.Item>
*/}
                        <Nav.Item panel>Users</Nav.Item>
                        <Nav.Item icon={<BookUserIcon strokeWidth={1.5} size={20} />} as={'div'}>
                            <Link href={route('customers.index')}>Customers</Link>
                        </Nav.Item>
                        {/* <Nav.Item icon={<ContactRoundIcon strokeWidth={1.5} size={20} />} as={'div'}>
                            <Link href={route('employees.index')}>Employees</Link>
                        </Nav.Item>

                        <Nav.Item panel>Settings</Nav.Item>
                        <Nav.Menu eventKey={'options'} title="Options" icon={<Settings2Icon strokeWidth={1.5} size={20} />} className='dropdown-menu'>
                            <Nav.Item as={'div'} eventKey={'settings.index'} active={currenRoute === 'settings.index'}>
                                <Link href={route('fiscal-years.index')}>Fiscal Years</Link>
                            </Nav.Item>
                        </Nav.Menu> */}
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </React.Fragment>
    )
}
