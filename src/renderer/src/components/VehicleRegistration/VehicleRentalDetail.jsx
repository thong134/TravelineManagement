import React, { useState } from 'react'
import testImage from '../../assets/images/vung_tau.jpg'
import Modal from '../../components/Modal'
import Disapproval from './Disapproval'

function VehicleRentalDetail({ data, onClose }) {
    const [isOpenDisapproval, setIsOpenDisapproval] = useState(false)

    const onDisapproval = (reason) => {
        console.log(reason)
    }

    return (
        <div className="vehicle-registration-modal">
            <div className="row">
                <div className="col-4">
                    <label htmlFor="licensePlate" className="label-for-input">
                        Biển số xe
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="licensePlate"
                            placeholder="Nhập biển số xe"
                            value={data?.licensePlate || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label htmlFor="registrationNumber" className="label-for-input">
                        Số đăng ký xe
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="registrationNumber"
                            placeholder="Nhập số đăng ký xe"
                            value={data?.registrationNumber || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label htmlFor="vehicleType" className="label-for-input">
                        Loại xe
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="vehicleType"
                            placeholder="Nhập loại xe"
                            value={data?.vehicleType || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label htmlFor="brand" className="label-for-input">
                        Hãng xe
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="brand"
                            placeholder="Nhập hãng xe"
                            value={data?.brand || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label htmlFor="line" className="label-for-input">
                        Dòng xe
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="line"
                            placeholder="Nhập dòng xe"
                            value={data?.line || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label htmlFor="maxSeat" className="label-for-input">
                        Số chỗ tối đa
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="maxSeat"
                            placeholder="Nhập số chỗ tối đa"
                            value={data?.maxSeat || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="w-100">
                    <label htmlFor="description" className="label-for-input">
                        Mô tả
                    </label>
                    <div className="input-form">
                        <textarea
                            className="w-100"
                            id="description"
                            placeholder="Nhập mô tả"
                            value={data?.description || ''}
                            rows={3}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label className="label-for-input">Giấy đăng ký xe (Mặt trước)</label>
                    <div className="modal__vid-img-container">
                        <img
                            className="modal__uploaded-image"
                            src={testImage}
                            alt="Giấy đăng ký xe (Mặt trước)"
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label className="label-for-input">Giấy đăng ký xe (Mặt sau)</label>
                    <div className="modal__vid-img-container">
                        <img
                            className="modal__uploaded-image"
                            src={testImage}
                            alt="Giấy đăng ký xe (Mặt trước)"
                        />
                    </div>
                </div>
                <div className="col-5 row">
                    <div className="w-100">
                        <label htmlFor="dailyRentalPrice" className="label-for-input">
                            Giá thuê theo ngày
                        </label>
                        <div className="input-form">
                            <input
                                className="w-100"
                                id="dailyRentalPrice"
                                placeholder="Nhập giá thuê theo ngày"
                                value={data?.dailyRentalPrice || ''}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="w-100">
                        <label htmlFor="hourlyRentalPrice" className="label-for-input">
                            Giá thuê theo giờ
                        </label>
                        <div className="input-form">
                            <input
                                className="w-100"
                                id="hourlyRentalPrice"
                                placeholder="Nhập giá thuê theo giờ"
                                value={data?.hourlyRentalPrice || ''}
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <div className="col-7 h-100">
                    <label htmlFor="requirement" className="label-for-input">
                        Yêu cầu
                    </label>
                    <div className="input-form">
                        <textarea
                            className="w-100"
                            id="requirement"
                            placeholder="Nhập yêu cầu"
                            value={data?.requirement || ''}
                            rows={6}
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

export default VehicleRentalDetail
