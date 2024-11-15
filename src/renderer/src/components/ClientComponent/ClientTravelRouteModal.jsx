import React, { useState, useMemo, useCallback } from 'react'
import Pagination from '../Pagination'
import ClientTravelRouteDetail from './ClientTravelRouteDetail'
import Modal from '../Modal'

function ClientTravelRouteModal({ onClose }) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    const [clientTravelRouteDetail, setClientTravelRouteDetail] = useState(false)

    const mockData = [...Array(38)].map((_, index) => ({
        id: index + 1,
        date: '12/12/2024',
        routeCode: 'Z001',
        numberOfPlaces: 10,
        area: 'Hà Nội'
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
        <>
            <div className="modal-client-content">
                <div className="modal-client-travel-point-table">
                    <table className="page-table">
                        <thead>
                            <tr>
                                <th>Ngày</th>
                                <th>Mã lộ trình</th>
                                <th>Số nơi</th>
                                <th>Khu vực</th>
                                <th>Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.date}</td>
                                    <td>{item.routeCode}</td>
                                    <td>{item.numberOfPlaces}</td>
                                    <td>{item.area}</td>
                                    <td>
                                        <button
                                            className="primary-button detail-btn"
                                            onClick={() => setClientTravelRouteDetail(true)}
                                        >
                                            Chi tiết
                                        </button>
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
                <div className="modal-client-footer-buttons">
                    <button className="page__header-button" onClick={onClose}>
                        Đóng
                    </button>
                </div>
            </div>
            <Modal
                isOpen={clientTravelRouteDetail}
                onClose={() => setClientTravelRouteDetail(false)}
                showHeader={false}
                width="540px"
            >
                <ClientTravelRouteDetail onClose={() => setClientTravelRouteDetail(false)} />
            </Modal>
        </>
    )
}

export default ClientTravelRouteModal
