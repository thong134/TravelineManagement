import { useState, useEffect, useMemo, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpWideShort, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
import CreateLocation from '../../components/LocationComponent/CreateLocation'
import CreUpProvince from '../../components/LocationComponent/Province'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import './Location.css'
import FilterModal from '../../components/LocationComponent/FilterModal'
import UpdateLocation from '../../components/LocationComponent/UpdateLocation'
import CreateEatery from '../../components/LocationComponent/CreateEatery'
import UpdateEatery from '../../components/LocationComponent/UpdateEatery'

const Location = () => {
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState(null)
    const itemsPerPage = 8
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc'
    });
    const [filters, setFilters] = useState({
        provinces: [],
        districts: [],
        rating: null
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [isSortActive, setIsSortActive] = useState(false);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [activeTab, setActiveTab] = useState('destination')
    const [showCreateEateryModal, setShowCreateEateryModal] = useState(false)
    const [showUpdateEateryModal, setShowUpdateEateryModal] = useState(false)
    const [selectedEatery, setSelectedEatery] = useState(null)
    const [eateries, setEateries] = useState([])

    useEffect(() => {
        const q = query(
            collection(db, 'DESTINATION'),
            //where('status', '!=', 'Hoạt Động')
        );
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setLocations(data);
        }, (error) => {
            console.error('Error fetching destinations:', error);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchEateries = async () => {
            const q = query(collection(db, 'EATERY'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setEateries(data);
            });
            return () => unsubscribe();
        };

        if (activeTab === 'eatery') {
            fetchEateries();
        }
    }, [activeTab]);

    const getSortedData = (data) => {
        if (!sortConfig.key) return data;

        return [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const getFilteredAndSearchedData = (data) => {
        let filteredData = data;

        // Áp dụng bộ lọc
        if (filters.provinces.length > 0) {
            filteredData = filteredData.filter(item => filters.provinces.includes(item.province));
        }
        if (filters.districts.length > 0) {
            filteredData = filteredData.filter(item => filters.districts.includes(item.district));
        }
        if (filters.rating) {
            filteredData = filteredData.filter(item => {
                if (filters.rating === 5) return item.rating === 5;
                if (filters.rating === 4.5) return item.rating >= 4.5 && item.rating < 5;
                if (filters.rating === 4) return item.rating >= 4 && item.rating < 4.5;
                if (filters.rating === 3) return item.rating >= 3 && item.rating < 4;
                return item.rating < 3;
            });
        }

        // Áp dụng tìm kiếm
        if (searchTerm) {
            const normalizedSearchTerm = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            filteredData = filteredData.filter(item => {
                const normalizedName = item.destinationName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return normalizedName.includes(normalizedSearchTerm);
            });
        }

        return filteredData;
    };

    const currentData = useMemo(() => {
        const filteredAndSearchedData = getFilteredAndSearchedData(locations);
        const sortedData = getSortedData(filteredAndSearchedData);
        const start = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(start, start + itemsPerPage);
    }, [currentPage, locations, sortConfig, filters, searchTerm]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const totalPages = Math.ceil(locations.length / itemsPerPage)

    const handlePageChange = useCallback(
        (page) => {
            if (page >= 1 && page <= totalPages) {
                setCurrentPage(page)
            }
        },
        [totalPages]
    )

    const handleSortToggle = () => {
        if (isSortActive) {
            setSortConfig({ key: null, direction: 'asc' });
            setIsSortActive(false);
        } else {
            handleSort('destinationName');
            setIsSortActive(true);
        }
    };

    const handleFilterToggle = () => {
        if (isFilterActive) {
            setFilters({
                provinces: [],
                districts: [],
                rating: null
            });
            setIsFilterActive(false);
            setShowFilterModal(false);
        } else {
            setShowFilterModal(true);
            setIsFilterActive(true);
        }
    };

    const handleApplyFilter = (newFilters) => {
        setFilters(newFilters);
        setShowFilterModal(false);
        setIsFilterActive(
            newFilters.provinces.length > 0 || 
            newFilters.districts.length > 0 || 
            newFilters.rating !== null
        );
    };

    return (
        <div className="page">
            <div className="page__header">
                <div className="d-flex gap-3">
                    <button
                        className={`primary-button tab-btn ${activeTab === 'destination' ? 'active' : ''}`}
                        onClick={() => setActiveTab('destination')}
                    >
                        Địa Điểm
                    </button>
                    <button
                        className={`primary-button tab-btn ${activeTab === 'eatery' ? 'active' : ''}`}
                        onClick={() => setActiveTab('eatery')}
                    >
                        Quán Ăn
                    </button>
                </div>
                <div className="page__filters">
                    {activeTab === 'destination' && (
                        <button 
                            className={`page__header-button ${isSortActive ? 'active' : ''}`}
                            onClick={handleSortToggle}
                        >
                            <FontAwesomeIcon icon={faArrowUpWideShort} className="page__header-icon" />
                            Sắp xếp
                        </button>
                    )}
                    <button 
                        className={`page__header-button ${isFilterActive ? 'active' : ''}`}
                        onClick={handleFilterToggle}
                    >
                        <FontAwesomeIcon icon={faFilter} className="page__header-icon" />
                        Lọc
                    </button>
                    <div className="page__header-search">
                        <FontAwesomeIcon icon={faSearch} className="page__header-icon" />
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="primary-button"
                        onClick={() => activeTab === 'destination' ? setShowCreateModal(true) : setShowCreateEateryModal(true)}
                    >
                        {activeTab === 'destination' ? 'Thêm địa điểm' : 'Thêm quán ăn'}
                    </button>
                </div>
            </div>
            <div className="page__content">
                <table className="page-table">
                    <thead>
                        <tr>
                            {activeTab === 'destination' ? (
                                <>
                                    <th>Mã địa điểm</th>
                                    <th>Tên địa điểm</th>
                                    <th>Tỉnh</th>
                                    <th>Huyện/Thành phố</th>
                                    <th>Đánh giá</th>
                                    <th>Yêu thích</th>
                                    <th>Cập nhật lần cuối</th>
                                    <th>Cập nhật</th>
                                </>
                            ) : (
                                <>
                                    <th>Mã quán ăn</th>
                                    <th>Tên quán ăn</th>
                                    <th>Tỉnh</th>
                                    <th>Huyện/Thành phố</th>
                                    <th>Đánh giá</th>
                                    <th>Yêu thích</th>
                                    <th>Cập nhật lần cuối</th>
                                    <th>Cập nhật</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {activeTab === 'destination' ? (
                            currentData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.destinationId}</td>
                                    <td>{item.destinationName}</td>
                                    <td>{item.province}</td>
                                    <td>{item.district}</td>
                                    <td>5</td>
                                    <td>{item.favorite}</td>
                                    <td>{new Date(item.lastUpdate).toLocaleDateString()}</td>
                                    <td className="p-0">
                                        <button
                                            className="primary-button detail-btn"
                                            onClick={() => {
                                                setSelectedLocation(item)
                                                setShowUpdateModal(true)
                                            }}
                                        >
                                            Cập nhật
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            eateries.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.eateryId}</td>
                                    <td>{item.eateryName}</td>
                                    <td>{item.province}</td>
                                    <td>{item.district}</td>
                                    <td>5</td>
                                    <td>{item.favouriteTimes}</td>
                                    <td>{new Date(item.lastUpdate).toLocaleDateString()}</td>
                                    <td className="p-0">
                                        <button
                                            className="primary-button detail-btn"
                                            onClick={() => {
                                                setSelectedEatery(item)
                                                setShowUpdateEateryModal(true)
                                            }}
                                        >
                                            Cập nhật
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                showHeader={false}
                width="660px"
            >
                <CreateLocation onClose={() => setShowCreateModal(false)} />
            </Modal>
            <Modal
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                showHeader={false}
                width="660px"
            >
                <UpdateLocation 
                    location={selectedLocation}
                    onClose={() => {
                        setShowUpdateModal(false)
                        setSelectedLocation(null)
                    }}
                />
            </Modal>
            <Modal
                isOpen={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                showHeader={false}
                width="660px"
            >
                <FilterModal
                    isOpen={showFilterModal}
                    onClose={() => {
                        setShowFilterModal(false)
                        if (!isFilterActive) {
                            setFilters({
                                provinces: [],
                                districts: [],
                                rating: null
                            });
                        }
                    }}
                    onApply={handleApplyFilter}
                    provinces={locations.reduce((acc, loc) => {
                        if (!acc.find(p => p.provinceName === loc.province)) {
                            acc.push({ provinceName: loc.province });
                        }
                        return acc;
                    }, [])}
                />
            </Modal>
            <Modal
                isOpen={showCreateEateryModal}
                onClose={() => setShowCreateEateryModal(false)}
                showHeader={false}
                width="660px"
            >
                <CreateEatery onClose={() => setShowCreateEateryModal(false)} />
            </Modal>
            <Modal
                isOpen={showUpdateEateryModal}
                onClose={() => setShowUpdateEateryModal(false)}
                showHeader={false}
                width="660px"
            >
                <UpdateEatery 
                    eatery={selectedEatery}
                    onClose={() => {
                        setShowUpdateEateryModal(false)
                        setSelectedEatery(null)
                    }}
                />
            </Modal>
        </div>
    )
}

export default Location
