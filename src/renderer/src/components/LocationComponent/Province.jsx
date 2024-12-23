import { useState } from 'react'
import { db, storage } from '../../firebaseConfig'
import { query, collection, orderBy, limit, getDocs, setDoc, doc } from 'firebase/firestore'

const CreUpProvince = () => {
    const [provinceName, setProvinceName] = useState('')
    const [city, setCity] = useState('')
    const [districts, setDistricts] = useState(Array(23).fill(''))

    const handleDistrictChange = (index, value) => {
        const updatedDistricts = [...districts];
        updatedDistricts[index] = value;
        setDistricts(updatedDistricts);
    };

    const handleSubmit = async () => {
        try {
            // Generate provinceId (e.g., PR01, PR02)
            let newId = "PR01";

            const q = query(collection(db, `PROVINCE`), orderBy('provinceId', 'desc'), limit(1));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const lastId = querySnapshot.docs[0].data().provinceId;
                const numericPart = parseInt(lastId.substring(2), 10); // Get numeric part after 'PR'
                newId = `PR${(numericPart + 1).toString().padStart(2, '0')}`;
            }

            // Data to save
            const data = {
                provinceId: newId,
                provinceName: provinceName,
                city: city,
                district: districts.filter((district) => district.trim() !== ''), // Only save non-empty districts
            };

            // Save to Firestore
            await setDoc(doc(db, `PROVINCE/${newId}`), data);
            alert('Lưu thông tin thành công!');
            setProvinceName('');
            setCity('');
            setDistricts(Array(23).fill(''));
        } catch (error) {
            console.error('Lỗi khi lưu dữ liệu:', error);
            alert('Đã xảy ra lỗi, vui lòng thử lại.');
        }
    };

    return (
        <div className="cre-up-province">
            <h2>Thêm tỉnh mới</h2>
            <div className="form-group">
                <label htmlFor="provinceName">Tên tỉnh:</label>
                <input
                    type="text"
                    id="provinceName"
                    value={provinceName}
                    onChange={(e) => setProvinceName(e.target.value)}
                    placeholder="Nhập tên tỉnh"
                />
            </div>
            <div className="form-group">
                <label htmlFor="cityName">Tên thành phố:</label>
                <input
                    type="text"
                    id="cityName"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Nhập tên thành phố"
                />
            </div>
            <div className="districts-group">
                <label>Nhập tên các huyện:</label>
                {districts.map((district, index) => (
                    <div key={index} className="form-group">
                        <input
                            type="text"
                            value={district}
                            onChange={(e) => handleDistrictChange(index, e.target.value)}
                            placeholder={`Nhập tên huyện ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
            <button className="submit-button" onClick={handleSubmit}>
                Lưu thông tin
            </button>
        </div>
    );
};

export default CreUpProvince;
