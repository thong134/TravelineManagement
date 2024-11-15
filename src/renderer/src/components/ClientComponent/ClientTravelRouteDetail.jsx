import React, { useState, useMemo, useCallback } from 'react'
import Pagination from '../Pagination'

function ClientTravelRouteDetail({ onClose }) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const mockData = [...Array(38)].map((_, index) => ({
        id: index + 1,
        place: 'Hà Nội',
        time: '12/12/2024'
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
        <div className="modal-client-content">
            <div className="modal-client-travel-route-detail-table">
                <table className="page-table">
                    <thead>
                        <tr>
                            <th>Địa điểm</th>
                            <th>Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.place}</td>
                                <td>{item.time}</td>
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
    )
}

export default ClientTravelRouteDetail
