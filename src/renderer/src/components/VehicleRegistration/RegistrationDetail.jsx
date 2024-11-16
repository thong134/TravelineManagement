import React, { useState } from 'react'
import testImage from '../../assets/images/vung_tau.jpg'
import Modal from '../../components/Modal'
import Disapproval from './Disapproval'

function RegistrationDetail({ data, onClose }) {
    const [isOpenDisapproval, setIsOpenDisapproval] = useState(false)

    const onDisapproval = (reason) => {
        setIsOpenDisapproval(false)
    }

    return (
        <div className="vehicle-registration-modal">
            <div className="row">
                <div className="col-6">
                    <label htmlFor="owner" className="label-for-input">
                        Họ và tên
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="name"
                            placeholder="Nhập họ và tên"
                            value={data?.owner || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="phoneNumber" className="label-for-input">
                        Số điện thoại
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="phoneNumber"
                            placeholder="Nhập số điện thoại"
                            value={data?.phoneNumber || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="email" className="label-for-input">
                        Email
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="email"
                            placeholder="Nhập email"
                            value={data?.email || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="identityCard" className="label-for-input">
                        Số căn cước công dân
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="identityCard"
                            placeholder="Nhập số căn cước công dân"
                            value={data?.identityCard || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label htmlFor="type" className="label-for-input">
                        Loại hình kinh doanh
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="type"
                            placeholder="Nhập loại hình kinh doanh"
                            value={data?.type || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label htmlFor="name" className="label-for-input">
                        Tên kinh doanh
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="name"
                            placeholder="Nhập tên kinh doanh"
                            value={data?.name || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label htmlFor="province" className="label-for-input">
                        Tỉnh đăng ký
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="province"
                            placeholder="Nhập tỉnh đăng ký"
                            value={data?.province || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="address" className="label-for-input">
                        Địa chỉ kinh doanh
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="address"
                            placeholder="Nhập địa chỉ kinh doanh"
                            value={data?.address || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="taxCode" className="label-for-input">
                        Mã số thuế
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="taxCode"
                            placeholder="Nhập mã số thuế"
                            value={data?.taxCode || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label className="label-for-input">Ảnh chụp căn cước công dân</label>
                    <div className="modal__vid-img-container">
                        <img
                            className="modal__uploaded-image"
                            src={testImage}
                            alt="Giấy đăng ký xe (Mặt trước)"
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label className="label-for-input">Ảnh chụp giấy phép kinh doanh</label>
                    <div className="modal__vid-img-container">
                        <img
                            className="modal__uploaded-image"
                            src={testImage}
                            alt="Giấy đăng ký xe (Mặt trước)"
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label htmlFor="accountNumber" className="label-for-input">
                        Số tài khoản
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="accountNumber"
                            placeholder="Nhập số tài khoản"
                            value={data?.accountNumber || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label htmlFor="accountName" className="label-for-input">
                        Tên tài khoản
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="accountName"
                            placeholder="Nhập tên tài khoản"
                            value={data?.accountName || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label htmlFor="bankName" className="label-for-input">
                        Tên ngân hàng
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="bankName"
                            placeholder="Nhập tên ngân hàng"
                            value={data?.bankName || ''}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="vehicle-registration-modal__btns">
                <button className="page__header-button" onClick={onClose}>
                    Hủy
                </button>
                <button
                    className="primary-button delete-btn shadow-none"
                    onClick={() => setIsOpenDisapproval(true)}
                >
                    Không duyệt
                </button>
                <button className={`primary-button shadow-none`}>Duyệt</button>
            </div>
            <Modal
                isOpen={isOpenDisapproval}
                onClose={() => setIsOpenDisapproval(false)}
                showHeader={false}
            >
                <Disapproval
                    onClose={() => setIsOpenDisapproval(false)}
                    onDisapproval={onDisapproval}
                />
            </Modal>
        </div>
    )
}

export default RegistrationDetail
