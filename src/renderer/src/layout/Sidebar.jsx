import logo from '../assets/images/logo_traveline.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faCar,
    faBicycle,
    faBed,
    faGear,
    faChartLine,
    faFileContract,
    faEarthAsia,
    faUtensils,
    faUser,
    faPaste,
    faTruckFast,
    faHandshake,
    faStar
} from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
    const location = useLocation()

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <img src={logo} alt="logo" className="sidebar__logo" />
                <h3 className="sidebar__header-title ml-1">Traveline</h3>
            </div>
            <div className="sidebar__menu h-100">
                <Link
                    to="/dashboard"
                    className={`sidebar__menu-item ${location.pathname === '/dashboard' ? 'sidebar__menu-item--active' : ''}`}
                >
                    <FontAwesomeIcon className="sidebar__menu-item-icon" icon={faHome} />
                    Trang chủ
                </Link>
                <Link
                    to="/dashboard/client"
                    className={`sidebar__menu-item ${
                        location.pathname === '/dashboard/client'
                            ? 'sidebar__menu-item--active'
                            : ''
                    }`}
                >
                    <FontAwesomeIcon className="sidebar__menu-item-icon" icon={faUser} />
                    Người dùng
                </Link>
                <Link
                    to="/dashboard/location"
                    className={`sidebar__menu-item ${
                        location.pathname === '/dashboard/location'
                            ? 'sidebar__menu-item--active'
                            : ''
                    }`}
                >
                    <FontAwesomeIcon className="sidebar__menu-item-icon" icon={faEarthAsia} />
                    Địa điểm
                </Link>
                <Link
                    to="/dashboard/vehicle-registration"
                    className={`sidebar__menu-item ${
                        location.pathname === '/dashboard/vehicle-registration'
                            ? 'sidebar__menu-item--active'
                            : ''
                    }`}
                >
                    <FontAwesomeIcon className="sidebar__menu-item-icon" icon={faPaste} />
                    Đăng ký xe
                </Link>
                <Link
                    to="/dashboard/car-rental"
                    className={`sidebar__menu-item ${
                        location.pathname === '/dashboard/car-rental'
                            ? 'sidebar__menu-item--active'
                            : ''
                    }`}
                >
                    <FontAwesomeIcon className="sidebar__menu-item-icon" icon={faCar} />
                    Thuê xe
                </Link>
                <Link
                    to="/dashboard/hotel"
                    className={`sidebar__menu-item ${
                        location.pathname === '/dashboard/hotel' ? 'sidebar__menu-item--active' : ''
                    }`}
                >
                    <FontAwesomeIcon className="sidebar__menu-item-icon" icon={faBed} />
                    Khách sạn
                </Link>
                <Link
                    to="/dashboard/restaurant"
                    className={`sidebar__menu-item ${
                        location.pathname === '/dashboard/restaurant'
                            ? 'sidebar__menu-item--active'
                            : ''
                    }`}
                >
                    <FontAwesomeIcon className="sidebar__menu-item-icon" icon={faUtensils} />
                    Nhà hàng
                </Link>
                <Link
                    to="/dashboard/shipment"
                    className={`sidebar__menu-item ${
                        location.pathname === '/dashboard/shipment'
                            ? 'sidebar__menu-item--active'
                            : ''
                    }`}
                >
                    <FontAwesomeIcon className="sidebar__menu-item-icon" icon={faTruckFast} />
                    Giao hàng
                </Link>
                <Link
                    to="/dashboard/partner"
                    className={`sidebar__menu-item ${
                        location.pathname === '/dashboard/partner'
                            ? 'sidebar__menu-item--active'
                            : ''
                    }`}
                >
                    <FontAwesomeIcon className="sidebar__menu-item-icon" icon={faHandshake} />
                    Đối tác
                </Link>
                <Link
                    to="/dashboard/report"
                    className={`sidebar__menu-item ${
                        location.pathname === '/dashboard/report'
                            ? 'sidebar__menu-item--active'
                            : ''
                    }`}
                >
                    <FontAwesomeIcon className="sidebar__menu-item-icon" icon={faChartLine} />
                    Thống kê
                </Link>
                <Link
                    to="/dashboard/rating"
                    className={`sidebar__menu-item ${
                        location.pathname === '/dashboard/rating'
                            ? 'sidebar__menu-item--active'
                            : ''
                    }`}
                >
                    <FontAwesomeIcon className="sidebar__menu-item-icon" icon={faStar} />
                    Đánh giá
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
