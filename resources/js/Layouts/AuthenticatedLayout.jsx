import { Container, Content, Footer, Header, Sidebar } from 'rsuite';
import SiderbarComp from '@/Components/Theme/SiderbarComp';
import HeaderComp from '@/Components/Theme/HeaderComp';
import { Toaster } from 'sonner';
import CheckOutlineIcon from '@rsuite/icons/CheckOutline';
import CloseOutlineIcon from '@rsuite/icons/CloseOutline';
import FooterComp from '@/Components/Theme/FooterComp';

export default function Authenticated({ user, children, activeKey }) {
    if (user) {
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
