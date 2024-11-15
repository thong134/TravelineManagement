import React from 'react'

const ClientDetailModal = ({ userDetail, setUserDetail }) => {
    return (
        <div className="modal-client-detail-content">
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
            <div className="modal-client-footer-buttons">
                <button className="page__header-button" onClick={() => setUserDetail(null)}>
                    Đóng
                </button>
            </div>
        </div>
    )
}

export default ClientDetailModal
