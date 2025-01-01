import React, { useState, useEffect } from 'react'
import testImage from '../../assets/images/vung_tau.jpg'
import Modal from '../../components/Modal'
import Disapproval from './Disapproval'
import { doc, getDoc, query, collection, where, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

function VehicleRentalDetail({ licensePlate, onClose }) {
    const [vehicleData, setVehicleData] = useState(null)
    const [isOpenDisapproval, setIsOpenDisapproval] = useState(false)

    useEffect(() => {
        const fetchVehicleDetail = async () => {
            try {
                // Lấy thông tin từ RENTAL_VEHICLE
                const vehicleDoc = await getDoc(doc(db, 'RENTAL_VEHICLE', ))
                const vehicleInfo = vehicleDoc.data()

                // Lấy thông tin từ VEHICLE_INFORMATION
                const vehicleInfoQuery = query(
                    collection(db, 'VEHICLE_INFORMATION'),
                    where('vehicleId', '==', vehicleInfo.vehicleId)
                )
                const vehicleInfoSnapshot = await getDocs(vehicleInfoQuery)
                const vehicleInfoData = vehicleInfoSnapshot.docs[0]?.data()

                setVehicleData({
                    ...vehicleInfo,
                    ...vehicleInfoData,
                    hourlyRentalPrice: vehicleInfo.hourPrice,
                    dailyRentalPrice: vehicleInfo.dayPrice,
                    vehicleRegistrationFront: vehicleInfo.vehicleRegistationFront,
                    vehicleRegistrationBack: vehicleInfo.vehicleRegistationBack,
                    requirement: vehicleInfo.requirements
                })
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu xe:', error)
            }
        }

        if (vehicleId) {
            fetchVehicleDetail()
        }
    }, [vehicleId])

    const handleApprove = async () => {
        try {
            await updateDoc(doc(db, 'RENTAL_VEHICLE', vehicleId), {
                contractStatus: 'Đã duyệt',
                //approvedAt: new Date().toISOString()
            });
            onClose();
        } catch (error) {
            console.error('Lỗi khi duyệt xe:', error);
        }
    };

    const onDisapproval = async (reason) => {
        try {
            await updateDoc(doc(db, 'RENTAL_VEHICLE', vehicleId), {
                status: 'Không được duyệt',
                disapprovalReason: reason,
                disapprovedAt: new Date().toISOString()
            });
            setIsOpenDisapproval(false);
            onClose();
        } catch (error) {
            console.error('Lỗi khi từ chối xe:', error);
        }
    };

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
                            value={vehicleData?.licensePlate || ''}
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
                            value={vehicleData?.registrationNumber || ''}
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
                            value={vehicleData?.vehicleType || ''}
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
                            value={vehicleData?.brand || ''}
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
                            value={vehicleData?.line || ''}
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
                            value={vehicleData?.maxSeat || ''}
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
                            value={vehicleData?.description || ''}
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
                            src={vehicleData?.vehicleRegistrationFront}
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
                                value={vehicleData?.dailyRentalPrice || ''}
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
                                value={vehicleData?.hourlyRentalPrice || ''}
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
                            value={vehicleData?.requirement || ''}
                            rows={6}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="vehicle-registration-modal__btns">
                {vehicleData?.status === 'Đang chờ duyệt' ? (
                    <>
                        <button className="page__header-button" onClick={onClose}>
                            Hủy
                        </button>
                        <button
                            className="primary-button delete-btn shadow-none"
                            onClick={() => setIsOpenDisapproval(true)}
                        >
                            Không duyệt
                        </button>
                        <button 
                            className={`primary-button shadow-none`}
                            onClick={handleApprove}
                        >
                            Duyệt
                        </button>
                    </>
                ) : (
                    <button 
                        className="page__header-button" 
                        onClick={onClose}
                        style={{ margin: '0 auto' }}
                    >
                        Hủy
                    </button>
                )}
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
