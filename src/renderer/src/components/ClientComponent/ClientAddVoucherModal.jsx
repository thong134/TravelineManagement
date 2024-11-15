import React from 'react'

const ClientAddVoucherModal = ({ onClose }) => {
    return (
        <div className="modal-client-add-voucher">
            <div className="row">
                <div className="col-6">
                    <label htmlFor="voucherName" className="label-for-input">
                        Tên voucher
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="voucherName"
                            placeholder="Nhập tên voucher"
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="voucherQuantity" className="label-for-input">
                        Số lượng voucher
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="number"
                            id="voucherQuantity"
                            placeholder="Nhập số lượng voucher"
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="voucherServiceType" className="label-for-input">
                        Loại dịch vụ
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="voucherServiceType"
                            placeholder="Nhập loại dịch vụ"
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="voucherDiscount" className="label-for-input">
                        Số % khuyến mãi
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="number"
                            id="voucherDiscount"
                            placeholder="Nhập số % khuyến mãi"
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="voucherApplyTime" className="label-for-input">
                        Thời gian áp dụng
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="date"
                            id="voucherApplyTime"
                            placeholder="Nhập thời gian áp dụng"
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="voucherMinPrice" className="label-for-input">
                        Đơn giá tối thiểu
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="number"
                            id="voucherMinPrice"
                            placeholder="Nhập đơn giá tối thiểu"
                        />
                    </div>
                </div>
            </div>
            <div className="modal-client-add-voucher-footer-buttons">
                <button className="page__header-button" onClick={onClose}>
                    Hủy
                </button>
                <button className="primary-button detail-btn">Thêm</button>
            </div>
        </div>
    )
}

export default ClientAddVoucherModal
