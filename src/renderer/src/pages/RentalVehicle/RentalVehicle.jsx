import { useState, useMemo, useCallback, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import VehicleRentalDetail from '../../components/VehicleRegistration/VehicleRentalDetail';
import RegistrationDetail from '../../components/VehicleRegistration/RegistrationDetail';
import AddVehicleType from '../../components/RentalVehicle/AddVehicleType';
import UpdateVehicleType from '../../components/RentalVehicle/UpdateVehicleType';
import './RentalVehicle.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const RentalVehicle = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('listVehicle');
    const [vehicleRentalDetail, setVehicleRentalDetail] = useState({
        show: false,
        data: null,
    });
    const [billDetail, setBillDetail] = useState({
        show: false,
        data: null,
    });
    const [data, setData] = useState([]);
    const itemsPerPage = 8;
    const [showAddVehicleType, setShowAddVehicleType] = useState(false);
    const [showUpdateVehicleType, setShowUpdateVehicleType] = useState({
        show: false,
        data: null
    });

    useEffect(() => {
        const fetchData = async () => {
            let collectionName = '';
            switch (activeTab) {
                case 'listVehicle':
                    collectionName = 'RENTAL_VEHICLE';
                    break;
                case 'bill':
                    collectionName = 'BILL';
                    break;
                case 'type':
                    collectionName = 'VEHICLE_INFORMATION';
                    break;
                default:
                    break;
            }

            if (collectionName) {
                const querySnapshot = await getDocs(collection(db, collectionName));
                const fetchedData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(fetchedData);
            }
        };
        fetchData();
    }, [activeTab]);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return data.slice(start, start + itemsPerPage);
    }, [currentPage, data]);

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
                        className={`primary-button tab-btn ${activeTab === 'listVehicle' ? 'active' : ''}`}
                        onClick={() => setActiveTab('listVehicle')}
                    >
                        Danh Sách Xe
                    </button>
                    <button
                        className={`primary-button tab-btn ${activeTab === 'bill' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bill')}
                    >
                        Hóa Đơn
                    </button>
                    <button
                        className={`primary-button tab-btn ${activeTab === 'type' ? 'active' : ''}`}
                        onClick={() => setActiveTab('type')}
                    >
                        Loại Xe
                    </button>
                </div>
                <div className="page__filters">
                    {activeTab === 'listVehicle' && (
                        <>
                            <button className="primary-button completed shadow-none">Đang sử dụng</button>
                            <button className="primary-button processing shadow-none">Trống</button>
                            <button className="primary-button reject shadow-none">Không sử dụng</button>
                        </>
                    )}
                    {activeTab === 'bill' && (
                        <>
                            <button className="primary-button completed shadow-none">Đã thanh toán</button>
                            <button className="primary-button processing shadow-none">Chờ thanh toán</button>
                            <button className="primary-button reject shadow-none">Chưa sử dụng</button>
                        </>
                    )}
                    {activeTab === 'type' && (
                        <>
                            <button 
                                className="primary-button"
                                onClick={() => setShowAddVehicleType(true)}
                            >
                                Thêm Loại Xe
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="page__content">
                <table className="page-table vehicle-registration-table">
                    <thead>
                        <tr>
                            {activeTab === 'listVehicle' && (
                                <>
                                    <th>Biển số xe</th>
                                    <th>Mã xe</th>
                                    <th>Năm sản xuất</th>
                                    <th>Giá theo giờ</th>
                                    <th>Giá theo ngày</th>
                                    <th>Trạng thái</th>
                                    <th>Chi tiết</th>
                                </>
                            )}
                            {activeTab === 'bill' && (
                                <>
                                    <th>Mã hóa đơn</th>
                                    <th>Mã khách</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Chi tiết</th>
                                </>
                            )}
                            {activeTab === 'type' && (
                                <>
                                    <th>Mã loại</th>
                                    <th>Tên loại</th>
                                    <th>Hãng xe</th>
                                    <th>Dòng xe</th>
                                    <th>Số chỗ</th>
                                    <th>Màu xe</th>
                                    <th>Tốc độ tối đa</th>
                                    <th>Nhiên liệu</th>
                                    <th>Hộp số</th>
                                    <th>Cập nhật</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item) => (
                            <tr key={item.id}>
                                {activeTab === 'listVehicle' && (
                                    <>
                                        <td>{item.licensePlate}</td>
                                        <td>{item.vehicleId}</td>
                                        <td>{item.manufactureYear}</td>
                                        <td>{item.hourPrice}</td>
                                        <td>{item.dayPrice}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button
                                                className="primary-button detail-btn"
                                                onClick={() =>
                                                    setVehicleRentalDetail({
                                                        show: true,
                                                        data: item,
                                                    })
                                                }
                                            >
                                                Chi tiết
                                            </button>
                                        </td>
                                    </>
                                )}
                                {activeTab === 'bill' && (
                                    <>
                                        <td>{item.billId}</td>
                                        <td>{item.userId}</td>
                                        <td>{item.startDate}</td>
                                        <td>{item.endDate}</td>
                                        <td>{item.total}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button
                                                className="primary-button detail-btn"
                                                onClick={() =>
                                                    setBillDetail({
                                                        show: true,
                                                        data: item,
                                                    })
                                                }
                                            >
                                                Chi tiết
                                            </button>
                                        </td>
                                    </>
                                )}
                                {activeTab === 'type' && (
                                    <>
                                        <td>{item.vehicleId}</td>
                                        <td>{item.type}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.model}</td>
                                        <td>{item.seatingCapacity}</td>
                                        <td>{item.color}</td>
                                        <td>{item.maxSpeed}</td>
                                        <td>{item.fuelType}</td>
                                        <td>{item.transmission}</td>
                                        <td className="p-0">
                                            <button
                                                className="primary-button detail-btn"
                                                onClick={() =>
                                                    setShowUpdateVehicleType({
                                                        show: true,
                                                        data: item
                                                    })
                                                }
                                            >
                                                Cập nhật
                                            </button>
                                        </td>
                                    </>
                                )}
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
                isOpen={vehicleRentalDetail.show}
                onClose={() => setVehicleRentalDetail({ show: false, data: null })}
            >
                <VehicleRentalDetail
                    data={vehicleRentalDetail.data}
                    onClose={() => setVehicleRentalDetail({ show: false, data: null })}
                />
            </Modal>
            <Modal
                isOpen={billDetail.show}
                onClose={() => setBillDetail({ show: false, data: null })}
            >
                <RegistrationDetail
                    data={billDetail.data}
                    onClose={() => setBillDetail({ show: false, data: null })}
                />
            </Modal>
            <Modal
                isOpen={showAddVehicleType}
                onClose={() => setShowAddVehicleType(false)}
                showHeader={false}
            >
                <AddVehicleType
                    onClose={() => setShowAddVehicleType(false)}
                />
            </Modal>
            <Modal
                isOpen={showUpdateVehicleType.show}
                onClose={() => setShowUpdateVehicleType({ show: false, data: null })}
                showHeader={false}
            >
                <UpdateVehicleType
                    data={showUpdateVehicleType.data}
                    onClose={() => setShowUpdateVehicleType({ show: false, data: null })}
                />
            </Modal>
        </div>
    );
};

export default RentalVehicle;
