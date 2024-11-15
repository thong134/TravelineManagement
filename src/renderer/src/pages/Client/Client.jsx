import { useState, useMemo, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch,
    faArrowUpWideShort,
    faFilter,
    faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
import ClientDetailModal from '../../components/ClientComponent/ClientDetailModal'
import ClientBillModal from '../../components/ClientComponent/ClientBillModal'
import ClientTravelPointModal from '../../components/ClientComponent/ClientTravelPointModal'
import ClientTravelRouteModal from '../../components/ClientComponent/ClientTravelRouteModal'
import ClientAddVoucherModal from '../../components/ClientComponent/ClientAddVoucherModal'
import './Client.css'

const Client = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [userDetail, setUserDetail] = useState(null)
    const [clientBillModal, setClientBillModal] = useState(false)
    const [clientTravelPointModal, setClientTravelPointModal] = useState(false)
    const [clientTravelRouteModal, setClientTravelRouteModal] = useState(false)
    const [clientAddVoucherModal, setClientAddVoucherModal] = useState(false)
    const itemsPerPage = 8

    const mockData = [...Array(20)].map((_, index) => ({
        id: index + 1,
        name: `Nguyễn Văn ${String.fromCharCode(65 + index)}`,
        username: `nguyenvana${index}`,
        identityCard: `1234567890${index}`,
        gender: index % 2 === 0 ? 'Nam' : 'Nữ',
        nationality: 'Việt Nam',
        invoiceNumber: 1000 + index,
        travelPoint: 100 + index
    }))

    const totalPages = Math.ceil(mockData.length / itemsPerPage)

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage
        return mockData.slice(start, start + itemsPerPage)
    }, [currentPage, mockData])

    const handlePageChange = useCallback(
        (page) => {
            if (page >= 1 && page <= totalPages) {
                setCurrentPage(page)
            }
        },
        [totalPages]
    )
    return (
        <div className="client-page">
            <div className="client-page__header">
                <button className="primary-button" onClick={() => setClientAddVoucherModal(true)}>
                    Thêm voucher
                </button>
                <div className="client-page__filters">
                    <button className="page__header-button">
                        <FontAwesomeIcon icon={faArrowUpWideShort} className="page__header-icon" />
                        Sắp xếp
                    </button>
                    <button className="page__header-button">
                        <FontAwesomeIcon icon={faFilter} className="page__header-icon" />
                        Lọc
                    </button>
                    <div className="page__header-search">
                        <FontAwesomeIcon icon={faSearch} className="page__header-icon" />
                        <input type="text" placeholder="Tìm kiếm" />
                    </div>
                </div>
            </div>
            <div className="client-page__content">
                <table className="page-table client-table">
                    <thead>
                        <tr>
                            <th>Mã người dùng</th>
                            <th>Họ tên</th>
                            <th>Tên đăng nhập</th>
                            <th>Số CCCD</th>
                            <th>Giới tính</th>
                            <th>Quốc tịch</th>
                            <th>Số hóa đơn</th>
                            <th>Điểm du lịch</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.username}</td>
                                <td>{item.identityCard}</td>
                                <td>{item.gender}</td>
                                <td>{item.nationality}</td>
                                <td>{item.invoiceNumber}</td>
                                <td>{item.travelPoint}</td>
                                <td>
                                    <div className="table__actions">
                                        <FontAwesomeIcon
                                            icon={faEllipsisVertical}
                                            className="table__action-icon"
                                        />
                                        <div
                                            className={`table__action-menu ${
                                                (index + 1) % itemsPerPage === 0 ? 'show-top' : ''
                                            }`}
                                        >
                                            <div
                                                className="table__action-item"
                                                onClick={() => setUserDetail(item)}
                                            >
                                                Thông tin
                                            </div>
                                            <div
                                                className="table__action-item"
                                                onClick={() => setClientBillModal(true)}
                                            >
                                                Hóa đơn
                                            </div>
                                            <div
                                                className="table__action-item"
                                                onClick={() => setClientTravelPointModal(true)}
                                            >
                                                Điểm du lịch
                                            </div>
                                            <div
                                                className="table__action-item"
                                                onClick={() => setClientTravelRouteModal(true)}
                                            >
                                                Lộ trình du lịch
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            {/* Modal thông tin người dùng */}
            <Modal
                isOpen={!!userDetail}
                onClose={() => setUserDetail(null)}
                showHeader={false}
                width="580px"
            >
                <ClientDetailModal userDetail={userDetail} onClose={() => setUserDetail(null)} />
            </Modal>
            {/* Modal hóa đơn */}
            <Modal
                isOpen={clientBillModal}
                onClose={() => setClientBillModal(false)}
                showHeader={false}
                width="700px"
            >
                <ClientBillModal onClose={() => setClientBillModal(false)} />
            </Modal>
            {/* Modal điểm du lịch */}
            <Modal
                isOpen={clientTravelPointModal}
                onClose={() => setClientTravelPointModal(false)}
                showHeader={false}
                width="580px"
            >
                <ClientTravelPointModal onClose={() => setClientTravelPointModal(false)} />
            </Modal>
            {/* Modal lộ trình du lịch */}
            <Modal
                isOpen={clientTravelRouteModal}
                onClose={() => setClientTravelRouteModal(false)}
                showHeader={false}
                width="580px"
            >
                <ClientTravelRouteModal onClose={() => setClientTravelRouteModal(false)} />
            </Modal>
            {/* Modal thêm voucher */}
            <Modal
                isOpen={clientAddVoucherModal}
                onClose={() => setClientAddVoucherModal(false)}
                showHeader={false}
                width="500px"
            >
                <ClientAddVoucherModal onClose={() => setClientAddVoucherModal(false)} />
            </Modal>
        </div>
    )
}

export default Client
