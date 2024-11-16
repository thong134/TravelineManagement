import { useState, useMemo, useCallback } from 'react'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
import VehicleRentalDetail from '../../components/VehicleRegistration/VehicleRentalDetail'
import RegistrationDetail from '../../components/VehicleRegistration/RegistrationDetail'
import './VehicleRegistration.css'

const VehicleRegistration = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [activeTab, setActiveTab] = useState('vehicle')
    const [vehicleRentalDetail, setVehicleRentalDetail] = useState({
        show: false,
        data: null
    })
    const [registrationDetail, setRegistrationDetail] = useState({
        show: false,
        data: null
    })
    const itemsPerPage = 8

    const mockData = [...Array(20)].map((_, index) => {
        if (activeTab === 'vehicle') {
            return {
                id: index + 1,
                code: `X${index + 1}`,
                licensePlate: `1234567890${index}`,
                line: `Dòng xe ${index + 1}`,
                brand: `Hãng xe ${index + 1}`,
                owner: `Chủ xe ${index + 1}`,
                requestDate: new Date().toLocaleDateString(),
                status:
                    index % 3 === 0
                        ? 'Đang chờ duyệt'
                        : index % 3 === 1
                          ? 'Đã được duyệt'
                          : 'Không được duyệt'
            }
        } else {
            return {
                id: index + 1,
                code: `X${index + 1}`,
                name: `Tên kinh doanh ${index + 1}`,
                type: `Loại hình ${index + 1}`,
                province: `Tỉnh đăng ký ${index + 1}`,
                owner: `Chủ đơn đăng ký ${index + 1}`,
                expirationDate: index + 1,
                requestDate: new Date().toLocaleDateString(),
                status:
                    index % 3 === 0
                        ? 'Đang chờ duyệt'
                        : index % 3 === 1
                          ? 'Đã được duyệt'
                          : 'Không được duyệt'
            }
        }
    })

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
        <div className="page">
            <div className="page__header">
                <div className="d-flex gap-3">
                    <button
                        className={`primary-button tab-btn ${activeTab === 'vehicle' ? 'active' : ''}`}
                        onClick={() => setActiveTab('vehicle')}
                    >
                        Duyệt xe cho thuê
                    </button>
                    <button
                        className={`primary-button tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => setActiveTab('register')}
                    >
                        Duyệt đơn đăng ký
                    </button>
                </div>
                <div className="page__filters">
                    <button className="primary-button completed shadow-none">Đã được duyệt</button>
                    <button className="primary-button processing shadow-none">
                        Đang chờ duyệt
                    </button>
                    <button className="primary-button reject shadow-none">Không được duyệt</button>
                </div>
            </div>
            <div className="page__content">
                <table className="page-table vehicle-registration-table">
                    <thead>
                        <tr>
                            {activeTab === 'vehicle' ? (
                                <>
                                    <th>Mã xe cho thuê</th>
                                    <th>Biển số xe</th>
                                    <th>Dòng xe</th>
                                    <th>Hãng xe</th>
                                    <th>Chủ xe cho thuê</th>
                                    <th>Ngày yêu cầu</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </>
                            ) : (
                                <>
                                    <th>Mã đơn</th>
                                    <th>Tên kinh doanh</th>
                                    <th>Loại hình</th>
                                    <th>Tỉnh đăng ký</th>
                                    <th>Chủ đơn đăng ký</th>
                                    <th>Thời hạn</th>
                                    <th>Ngày yêu cầu</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, index) => {
                            if (activeTab === 'vehicle') {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.code}</td>
                                        <td>{item.licensePlate}</td>
                                        <td>{item.line}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.owner}</td>
                                        <td>{item.requestDate}</td>
                                        <td>
                                            <div
                                                className={`table__status ${
                                                    item.status === 'Đang chờ duyệt'
                                                        ? 'processing'
                                                        : item.status === 'Đã được duyệt'
                                                          ? 'completed'
                                                          : 'reject'
                                                }`}
                                            >
                                                {item.status}
                                            </div>
                                        </td>
                                        <td className="p-0">
                                            <button
                                                className="primary-button detail-btn"
                                                onClick={() =>
                                                    setVehicleRentalDetail({
                                                        show: true,
                                                        data: item
                                                    })
                                                }
                                            >
                                                Chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.code}</td>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.province}</td>
                                        <td>{item.owner}</td>
                                        <td>{item.expirationDate} năm</td>
                                        <td>{item.requestDate}</td>
                                        <td>
                                            <div
                                                className={`table__status ${
                                                    item.status === 'Đang chờ duyệt'
                                                        ? 'processing'
                                                        : item.status === 'Đã được duyệt'
                                                          ? 'completed'
                                                          : 'reject'
                                                }`}
                                            >
                                                {item.status}
                                            </div>
                                        </td>
                                        <td className="p-0">
                                            <button
                                                className="primary-button detail-btn"
                                                onClick={() =>
                                                    setRegistrationDetail({
                                                        show: true,
                                                        data: item
                                                    })
                                                }
                                            >
                                                Chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            {/* Vehicle Rental Details */}
            <Modal
                isOpen={vehicleRentalDetail.show}
                onClose={() => setVehicleRentalDetail({ show: false, data: null })}
                showHeader={false}
            >
                <VehicleRentalDetail
                    data={vehicleRentalDetail.data}
                    onClose={() => setVehicleRentalDetail({ show: false, data: null })}
                />
            </Modal>
            {/* Registration Details */}
            <Modal
                isOpen={registrationDetail.show}
                onClose={() => setRegistrationDetail({ show: false, data: null })}
                showHeader={false}
            >
                <RegistrationDetail
                    data={registrationDetail.data}
                    onClose={() => setRegistrationDetail({ show: false, data: null })}
                />
            </Modal>
        </div>
    )
}

export default VehicleRegistration
