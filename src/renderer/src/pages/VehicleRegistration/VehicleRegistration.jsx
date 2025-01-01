import { useState, useMemo, useCallback, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import VehicleRentalDetail from '../../components/VehicleRegistration/VehicleRentalDetail';
import RegistrationDetail from '../../components/VehicleRegistration/RegistrationDetail';
import './VehicleRegistration.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const VehicleRegistration = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('vehicle');
    const [vehicleRentalDetail, setVehicleRentalDetail] = useState({
        show: false,
        licensePlate: null,
    });
    const [registrationDetail, setRegistrationDetail] = useState({
        show: false,
        contractId: null,
    });
    const [vehicleData, setVehicleData] = useState([]);
    const [registerData, setRegisterData] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');

    const itemsPerPage = 8;

    // Fetch vehicle data
    const fetchVehicleData = async () => {
        const vehicleData = [];
        const vehicleQuery = query(collection(db, 'RENTAL_VEHICLE'));
        const vehicleSnapshot = await getDocs(vehicleQuery);

        for (const doc of vehicleSnapshot.docs) {
            const vehicle = doc.data();
            const vehicleInfoQuery = query(
                collection(db, 'VEHICLE_INFORMATION'),
                where('vehicleId', '==', vehicle.vehicleId)
            );
            const vehicleInfoSnapshot = await getDocs(vehicleInfoQuery);
            const vehicleInfo = vehicleInfoSnapshot.docs[0]?.data();

            const contractQuery = query(
                collection(db, 'CONTRACT'),
                where('contractId', '==', vehicle.contractId)
            );
            const contractSnapshot = await getDocs(contractQuery);
            const contract = contractSnapshot.docs[0]?.data();

            const userQuery = query(
                collection(db, 'USER'),
                where('userId', '==', contract?.userId)
            );
            const userSnapshot = await getDocs(userQuery);
            const user = userSnapshot.docs[0]?.data();

            vehicleData.push({
                licensePlate: vehicle.licensePlate,
                type: vehicleInfo?.type,
                model: vehicleInfo?.model,
                brand: vehicleInfo?.brand,
                owner: user?.fullName,
                requestDate: vehicle.createdDate,
                status: vehicle.status,
                contractApproved: contract?.status === 'approved',
            });
        }

        setVehicleData(vehicleData);
    };

    // Fetch registration data
    const fetchRegisterData = async () => {
        const registerData = [];
        const contractQuery = query(collection(db, 'CONTRACT'));
        const contractSnapshot = await getDocs(contractQuery);

        for (const doc of contractSnapshot.docs) {
            const contract = doc.data();

            const userQuery = query(
                collection(db, 'USER'),
                where('userId', '==', contract.userId)
            );
            const userSnapshot = await getDocs(userQuery);
            const user = userSnapshot.docs[0]?.data();

            registerData.push({
                contractId: contract.contractId,
                businessType: contract.businessType,
                businessProvince: contract.businessProvince,
                owner: user?.fullName,
                contractTerm: contract.contractTerm,
                requestDate: contract.createdDate,
                status: contract.contractStatus,
            });
        }

        setRegisterData(registerData);
    };

    useEffect(() => {
        if (activeTab === 'vehicle') {
            fetchVehicleData();
        } else {
            fetchRegisterData();
        }
    }, [activeTab]);

    const filteredData = activeTab === 'vehicle'
        ? vehicleData.filter(item => filterStatus === 'all' || item.status === filterStatus)
        : registerData.filter(item => filterStatus === 'all' || item.status === filterStatus);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(start, start + itemsPerPage);
    }, [currentPage, filteredData]);

    const handlePageChange = useCallback(
        (page) => {
            if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
            }
        },
        [totalPages]
    );

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
                    <button className="primary-button completed shadow-none" onClick={() => setFilterStatus('Đã được duyệt')}>Đã được duyệt</button>
                    <button className="primary-button processing shadow-none" onClick={() => setFilterStatus('Đang chờ duyệt')}>Đang chờ duyệt</button>
                    <button className="primary-button reject shadow-none" onClick={() => setFilterStatus('Không được duyệt')}>Không được duyệt</button>
                </div>
            </div>
            <div className="page__content">
                <table className="page-table vehicle-registration-table">
                    <thead>
                        <tr>
                            {activeTab === 'vehicle' ? (
                                <>
                                    <th>Biển số xe</th>
                                    <th>Loại xe</th>
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
                        {currentData.map((item) => (
                            activeTab === 'vehicle' ? (
                                <tr key={item.licensePlate}>
                                    <td>{item.licensePlate}</td>
                                    <td>{item.type}</td>
                                    <td>{item.model}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.owner}</td>
                                    <td>{item.requestDate}</td>
                                    <td>
                                        <div className={`table__status ${
                                            item.status === 'Đang chờ duyệt'
                                                ? 'processing'
                                                : item.status === 'Đã được duyệt'
                                                    ? 'completed'
                                                    : 'reject'
                                        }`}>
                                            {item.status}
                                        </div>
                                    </td>
                                    <td className="p-0">
                                        <button
                                            className="primary-button detail-btn ml-2 mr-2"
                                            onClick={() => setVehicleRentalDetail({
                                                show: true,
                                                licensePlate: item.licensePlate,
                                            })}
                                            //disabled={!item.contractApproved}
                                        >
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={item.contractId}>
                                    <td>{item.contractId}</td>
                                    <td>{item.businessType}</td>
                                    <td>{item.businessProvince}</td>
                                    <td>{item.owner}</td>
                                    <td>{item.contractTerm} năm</td>
                                    <td>{item.requestDate}</td>
                                    <td>
                                        <div className={`table__status ${
                                            item.status === 'Chờ duyệt'
                                                ? 'processing'
                                                : item.status === 'Đã duyệt'
                                                    ? 'completed'
                                                    : 'reject'
                                        }`}>
                                            {item.status}
                                        </div>
                                    </td>
                                    <td className="p-0">
                                        <button
                                            className="primary-button detail-btn"
                                            onClick={() => setRegistrationDetail({
                                                show: true,
                                                contractId: item.contractId,
                                            })}
                                        >
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            )
                        ))}
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
                onClose={() => setVehicleRentalDetail({ show: false, licensePlate: null })}
                showHeader={false}
                //width="700px"
            >
                <VehicleRentalDetail
                    vehicleId={vehicleRentalDetail.vehicleId}
                    onClose={() => setVehicleRentalDetail({ show: false, licensePlate: null })}
                />
            </Modal>
            {/* Registration Details */}
            <Modal
                isOpen={registrationDetail.show}
                onClose={() => setRegistrationDetail({ show: false, contractId: null })}
                showHeader={false}
                width="700px"
            >
                <RegistrationDetail
                    contractId={registrationDetail.contractId}
                    onClose={() => setRegistrationDetail({ show: false, contractId: null })}
                />
            </Modal>
        </div>
    );
};

export default VehicleRegistration;
