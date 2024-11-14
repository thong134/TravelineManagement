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
import './Client.css'

const Client = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [userDetail, setUserDetail] = useState(null)
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
                <button className="primary-button">Thêm voucher</button>
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
                        {currentData.map((item) => (
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
                                        <div className={`table__action-menu`}>
                                            <div
                                                className="table__action-item"
                                                onClick={() => setUserDetail(item)}
                                            >
                                                Thông tin
                                            </div>
                                            <div className="table__action-item">Hóa đơn</div>
                                            <div className="table__action-item">Điểm du lịch</div>
                                            <div className="table__action-item">
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
                width="520px"
            >
                <div className="modal-user-detail-content">
                    <div className="row w-100">
                        <div className="col-5">
                            <label htmlFor="name" className="label-for-input">
                                Tên người dùng
                            </label>
                            <div className="input-form">
                                <input
                                    className="w-100"
                                    type="text"
                                    id="name"
                                    value={userDetail?.name}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-7">
                            <label htmlFor="username" className="label-for-input">
                                Tên đăng nhập
                            </label>
                            <div className="input-form">
                                <input
                                    className="w-100"
                                    type="text"
                                    id="username"
                                    value={userDetail?.username}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-5">
                            <label htmlFor="identityCard" className="label-for-input">
                                Số CCCD
                            </label>
                            <div className="input-form">
                                <input
                                    className="w-100"
                                    type="text"
                                    id="identityCard"
                                    value={userDetail?.identityCard}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-7">
                            <label htmlFor="address" className="label-for-input">
                                Địa chỉ
                            </label>
                            <div className="input-form">
                                <input
                                    className="w-100"
                                    type="text"
                                    id="address"
                                    value={userDetail?.address}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-5 row">
                            <div className="col-5">
                                <label htmlFor="gender" className="label-for-input">
                                    Giới tính
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="gender"
                                        value={userDetail?.gender}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-7">
                                <label htmlFor="birthday" className="label-for-input">
                                    Ngày sinh
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="birthday"
                                        value={userDetail?.birthday}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-7 row">
                            <div className="col-6">
                                <label htmlFor="phoneNumber" className="label-for-input">
                                    Số điện thoại
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="phoneNumber"
                                        value={userDetail?.phoneNumber}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <label htmlFor="nationality" className="label-for-input">
                                    Quốc tịch
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="nationality"
                                        value={userDetail?.nationality}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-5 row">
                            <div className="col-5">
                                <label htmlFor="driver" className="label-for-input">
                                    Chủ xe
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="driver"
                                        value={userDetail?.driver}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-7">
                                <label htmlFor="joinDate" className="label-for-input">
                                    Ngày tham gia
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="joinDate"
                                        value={userDetail?.joinDate}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-7 row">
                            <div className="col-6">
                                <label htmlFor="invoiceNumber" className="label-for-input">
                                    Số hóa đơn
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="invoiceNumber"
                                        value={userDetail?.invoiceNumber}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <label htmlFor="travelPoint" className="label-for-input">
                                    Điểm du lịch
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="travelPoint"
                                        value={userDetail?.travelPoint}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-user-detail-footer">
                        <button className="page__header-button" onClick={() => setUserDetail(null)}>
                            Đóng
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Client
