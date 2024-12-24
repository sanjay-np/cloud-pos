import { Container, Content, Footer, Header, Sidebar } from 'rsuite';
import SiderbarComp from '@/Components/Theme/SiderbarComp';
import HeaderComp from '@/Components/Theme/HeaderComp';
import { Toaster } from 'sonner';
import CheckOutlineIcon from '@rsuite/icons/CheckOutline';
import CloseOutlineIcon from '@rsuite/icons/CloseOutline';
import FooterComp from '@/Components/Theme/FooterComp';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function Authenticated({ user, children, activeKey }) {
    if (user) {
        const currency = usePage().props?.currency;
        useEffect(() => {
            if (currency) { localStorage.setItem('currency', currency) }
        }, [currency])
        return (
            <div className="auth-main-content">
                <Container>
                    <Sidebar className='sidebar'><SiderbarComp activeKey={activeKey} /></Sidebar>
                    <Container className='main-container'>
                        <Header className='main-header'><HeaderComp /></Header>
                        <Content>{children}</Content>
                        <Footer><FooterComp /></Footer>
                    </Container>
                </Container>
                <Toaster
                    closeButton
                    icons={{
                        success: <CheckOutlineIcon />,
                        error: <CloseOutlineIcon />
                    }}
                />
            </div>
        );
    }
}
