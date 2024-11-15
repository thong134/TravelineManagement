import React, { useState, useMemo, useCallback } from 'react'
import Pagination from '../Pagination'

const ClientBillModal = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const mockData = [...Array(20)].map((_, index) => ({
        id: index + 1,
        invoiceNumber: 1000 + index,
        invoiceType: 'Hóa đơn điện tử',
        totalAmount: 1000000 + index,
        paymentMethod: 'Chuyển khoản',
        invoiceDate: '2024-01-01'
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
            <div className="modal-client-bill-table">
                <table className="page-table">
                    <thead>
                        <tr>
                            <th>Mã hóa đơn</th>
                            <th>Loại hóa đơn</th>
                            <th>Tổng tiền</th>
                            <th>Phương thức</th>
                            <th>Ngày hóa đơn</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.invoiceNumber}</td>
                                <td>{item.invoiceType}</td>
                                <td>{item.totalAmount}</td>
                                <td>{item.paymentMethod}</td>
                                <td>{item.invoiceDate}</td>
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

export default ClientBillModal
