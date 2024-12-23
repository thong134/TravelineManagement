import { useState, useEffect } from 'react';

const FilterModal = ({ isOpen, onClose, onApply, provinces }) => {
    const [selectedProvinces, setSelectedProvinces] = useState([]);
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    const [selectedRating, setSelectedRating] = useState(null);

    const ratingOptions = [
        { label: '5 sao', value: 5 },
        { label: '4.5-5 sao', value: 4.5 },
        { label: '4-4.5 sao', value: 4 },
        { label: '3-4 sao', value: 3 },
        { label: 'Dưới 3 sao', value: 0 }
    ];

    const handleApply = () => {
        onApply({
            provinces: selectedProvinces,
            districts: selectedDistricts,
            rating: selectedRating
        });
        onClose();
    };

    return (
        <div className="filter-modal">
            <h3>Bộ lọc</h3>
            
            <div className="filter-section">
                <h4>Tỉnh/Thành phố</h4>
                {provinces.map(province => (
                    <label key={province.provinceName}>
                        <input
                            type="checkbox"
                            checked={selectedProvinces.includes(province.provinceName)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedProvinces([...selectedProvinces, province.provinceName]);
                                } else {
                                    setSelectedProvinces(selectedProvinces.filter(p => p !== province.provinceName));
                                }
                            }}
                        />
                        {province.provinceName}
                    </label>
                ))}
            </div>

            <div className="filter-section">
                <h4>Đánh giá</h4>
                {ratingOptions.map(option => (
                    <label key={option.value}>
                        <input
                            type="radio"
                            name="rating"
                            checked={selectedRating === option.value}
                            onChange={() => setSelectedRating(option.value)}
                        />
                        {option.label}
                    </label>
                ))}
            </div>

            <div className="filter-actions">
                <button onClick={onClose}>Hủy</button>
                <button onClick={handleApply}>Áp dụng</button>
            </div>
        </div>
    );
};

export default FilterModal;