import React, { useState, useMemo, useCallback } from 'react'
import Pagination from '../Pagination'

function ClientTravelPointModal() {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const mockData = [...Array(38)].map((_, index) => ({
        id: index + 1,
        date: '12/12/2024',
        type: 'Hóa đơn điện tử',
        detail: 'Thuê xe',
        point: 1000000
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
            <div className="modal-client-travel-point-table">
                <table className="page-table">
                    <thead>
                        <tr>
                            <th>Ngày</th>
                            <th>Hình thức</th>
                            <th>Cụ thể</th>
                            <th>Điểm</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item) => (
                            <tr>
                                <td>{item.date}</td>
                                <td>{item.type}</td>
                                <td>{item.detail}</td>
                                <td>{item.point}</td>
                                <td>
                                    <button className="primary-button detail-btn">Chi tiết</button>
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
        </div>
    )
}

export default ClientTravelPointModal
