import { useState, useMemo, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpWideShort, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
import CreUpLocation from '../../components/LocationComponent/CreUpLocation'
import './Location.css'

const Location = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [creUpLocationModal, setCreUpLocationModal] = useState({
        isOpen: false,
        type: 'create',
        location: null
    })
    const itemsPerPage = 8

    const mockData = [...Array(20)].map((_, index) => ({
        id: index + 1,
        locationCode: `DD ${index}`,
        locationName: `Địa điểm ${index}`,
        province: `Quảng Bình`,
        district: `Đồng Hới`,
        rating: 4.5,
        favorite: 40 + index,
        lastUpdate: new Date().toLocaleDateString()
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
                <button
                    className="primary-button"
                    onClick={() => setCreUpLocationModal({ isOpen: true, type: 'create' })}
                >
                    Thêm địa điểm
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
                            <th>Mã địa điểm</th>
                            <th>Tên địa điểm</th>
                            <th>Tỉnh</th>
                            <th>Huyện/Thành phố</th>
                            <th>Đánh giá</th>
                            <th>Yêu thích</th>
                            <th>Cập nhật lần cuối</th>
                            <th>Cập nhật</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{item.locationCode}</td>
                                <td>{item.locationName}</td>
                                <td>{item.province}</td>
                                <td>{item.district}</td>
                                <td>{item.rating}</td>
                                <td>{item.favorite}</td>
                                <td>{item.lastUpdate}</td>
                                <td className="p-0">
                                    <button
                                        className="primary-button detail-btn"
                                        onClick={() =>
                                            setCreUpLocationModal({
                                                isOpen: true,
                                                type: 'update',
                                                location: item
                                            })
                                        }
                                    >
                                        Cập nhật
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
            <Modal
                isOpen={creUpLocationModal.isOpen}
                onClose={() => setCreUpLocationModal({ isOpen: false, type: 'create' })}
                showHeader={false}
                width="660px"
            >
                <CreUpLocation
                    type={creUpLocationModal.type}
                    location={creUpLocationModal.location}
                    onClose={() =>
                        setCreUpLocationModal({ isOpen: false, type: 'create', location: null })
                    }
                />
            </Modal>
        </div>
    )
}

export default Location
