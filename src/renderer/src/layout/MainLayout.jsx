import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import './Mainlayout.css'

function MainLayout() {
    return (
        <>
            <div className="main-layout-container">
                <Header />
                <Sidebar />
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default MainLayout
