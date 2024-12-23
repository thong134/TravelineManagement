import React, { useState, useEffect } from 'react'
import testImage from '../../assets/images/vung_tau.jpg'
import Modal from '../../components/Modal'
import Disapproval from './Disapproval'
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

function RegistrationDetail({ contractId, onClose }) {
    const [contractData, setContractData] = useState(null);
    const [isOpenDisapproval, setIsOpenDisapproval] = useState(false)

    useEffect(() => {
        const fetchContractDetail = async () => {
            try {
                // Lấy thông tin từ CONTRACT
                const contractDoc = await getDoc(doc(db, 'CONTRACT', contractId));
                const contractInfo = contractDoc.data();

                // Lấy thông tin user từ bảng USER
                const userQuery = query(
                    collection(db, 'USER'),
                    where('userId', '==', contractInfo.userId)
                );
                const userSnapshot = await getDocs(userQuery);
                const userData = userSnapshot.docs[0]?.data();

                setContractData({
                    ...contractInfo,
                    owner: userData?.fullName,
                    phoneNumber: userData?.phoneNumber,
                    email: userData?.email,
                    identityCard: userData?.identityCard,
                    bankName: userData?.bankName,
                    accountNumber: userData?.accountNumber,
                    accountName: userData?.accountName,
                    businessName: contractInfo.businessName,
                    businessType: contractInfo.businessType,
                    businessProvince: contractInfo.businessProvince,
                    businessAddress: contractInfo.businessAddress,
                    taxCode: contractInfo.taxCode,
                    status: contractInfo.status
                });
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu hợp đồng:', error);
            }
        };

        if (contractId) {
            fetchContractDetail();
        }
    }, [contractId]);

    const handleApprove = async () => {
        try {
            await updateDoc(doc(db, 'CONTRACT', contractId), {
                status: 'Đã được duyệt',
                approvedAt: new Date().toISOString()
            });
            onClose();
        } catch (error) {
            console.error('Lỗi khi duyệt hợp đồng:', error);
        }
    };

    const onDisapproval = async (reason) => {
        try {
            await updateDoc(doc(db, 'CONTRACT', contractId), {
                status: 'Không được duyệt',
                disapprovalReason: reason,
                disapprovedAt: new Date().toISOString()
            });
            setIsOpenDisapproval(false);
            onClose();
        } catch (error) {
            console.error('Lỗi khi từ chối hợp đồng:', error);
        }
    };

    return (
        <div className="vehicle-registration-modal">
            <div className="row">
                <div className="col-4">
                    <label htmlFor="owner" className="label-for-input">
                        Họ và tên
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="name"
                            value={contractData?.owner || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label htmlFor="email" className="label-for-input">
                        Email
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="email"
                            value={contractData?.email || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label htmlFor="identityCard" className="label-for-input">
                        Số căn cước công dân
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="identityCard"
                            value={contractData?.identityCard || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-3">
                    <label htmlFor="phoneNumber" className="label-for-input">
                        Số điện thoại
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="phoneNumber"
                            value={contractData?.phoneNumber || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-3">
                    <label htmlFor="type" className="label-for-input">
                        Loại hình kinh doanh
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="type"
                            value={contractData?.businessType || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-3">
                    <label htmlFor="name" className="label-for-input">
                        Tên kinh doanh
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="name"
                            value={contractData?.businessName || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-3">
                    <label htmlFor="province" className="label-for-input">
                        Tỉnh đăng ký
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="province"
                            value={contractData?.businessProvince || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-9">
                    <label htmlFor="address" className="label-for-input">
                        Địa chỉ kinh doanh
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="address"
                            value={contractData?.businessAddress || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-3">
                    <label htmlFor="taxCode" className="label-for-input">
                        Mã số thuế
                    </label>
                    <div className="input-form">
                        <input
                            className="w-100"
                            type="text"
                            id="taxCode"
                            value={contractData?.taxCode || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label className="label-for-input">Căn cước công dân (Trước)</label>
                    <div className="modal__vid-img-container">
                        <img
                            className="modal__uploaded-image"
                            src={contractData?.citizenFrontPhoto}
                            alt="CCCD mặt trước"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'đường dẫn ảnh mặc định khi lỗi';
                            }}
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label className="label-for-input">Căn cước công dân (Sau)</label>
                    <div className="modal__vid-img-container">
                        <img
                            className="modal__uploaded-image"
                            src={contractData?.citizenBackPhoto}
                            alt="CCCD mặt sau"
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label className="label-for-input">Giấy phép kinh doanh</label>
                    <div className="modal__vid-img-container">
                        <img
                            className="modal__uploaded-image"
                            src={contractData?.businessRegisterPhoto}
                            alt="Giấy phép kinh doanh"
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
                            value={contractData?.accountNumber || ''}
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
                            value={contractData?.accountName || ''}
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
                            value={contractData?.bankName || ''}
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
                <button 
                    className={`primary-button shadow-none`}
                    onClick={handleApprove}
                >
                    Duyệt
                </button>
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
