import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { db, storage } from '../../firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { query, collection, orderBy, limit, getDocs, doc, setDoc } from 'firebase/firestore'

function AddVehicleType({ onClose }) {
    const [vehicleType, setVehicleType] = useState("")
    const [maxSeats, setMaxSeats] = useState("")
    const [gearType, setGearType] = useState("")
    const [vehicleInfo, setVehicleInfo] = useState({
        brand: '',
        model: '',
        type: '',
        maxSpeed: '',
        color: '',
        seats: '',
        transmission: '',
        fuel: ''
    })
    const [vehicleImage, setVehicleImage] = useState(null)
    const fileInputRef = useRef(null)

    const handleVehicleTypeChange = (e) => {
        const selectedType = e.target.value
        setVehicleType(selectedType)
        setVehicleInfo({
            ...vehicleInfo,
            type: selectedType
        })

        if (selectedType === "Xe máy") {
            setMaxSeats("2")
            setGearType("Không")
            setVehicleInfo(prev => ({
                ...prev,
                seats: "2",
                transmission: "Không"
            }))
        } else {
            setMaxSeats("")
            setGearType("")
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setVehicleImage({
                file,
                preview: URL.createObjectURL(file)
            })
        }
        e.target.value = ''
    }

    useEffect(() => {
        return () => {
            if (vehicleImage) {
                URL.revokeObjectURL(vehicleImage.preview)
            }
        }
    }, [vehicleImage])

    const handleSubmit = async () => {
        try {
            let newId = "K0001";
            const q = query(collection(db, 'VEHICLE_INFORMATION'), orderBy('vehicleId', 'desc'), limit(1));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const lastDoc = querySnapshot.docs[0];
                const lastId = lastDoc.data().vehicleId;
                const numericPart = parseInt(lastId.substring(1), 10);
                newId = `K${(numericPart + 1).toString().padStart(4, '0')}`;
            }

            let photoUrl = '';
            if (vehicleImage) {
                const storageRef = ref(storage, `vehicles/${newId}_${vehicleImage.file.name}`);
                const snapshot = await uploadBytes(storageRef, vehicleImage.file);
                photoUrl = await getDownloadURL(snapshot.ref);
            }

            const data = {
                vehicleId: newId,
                type: vehicleInfo.type,
                brand: vehicleInfo.brand,
                model: vehicleInfo.model,
                seatingCapacity: vehicleInfo.seats,
                color: vehicleInfo.color,
                maxSpeed: vehicleInfo.maxSpeed,
                fuelType: vehicleInfo.fuel,
                transmission: vehicleInfo.transmission,
                photo: photoUrl
            };

            // Lưu vào Firestore
            await setDoc(doc(db, `VEHICLE_INFORMATION/${newId}`), data);
            alert('Thêm phương tiện thành công!');
            onClose();

        } catch (error) {
            console.error('Lỗi khi thêm phương tiện:', error);
            alert('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    };

    return (
        <div className="vehicle-type-modal">
            <div className="row">
                <div className="col-4">
                    <label className="label-for-input">Hãng xe</label>
                    <div className="input-form">
                        <input
                            type="text"
                            className="w-100"
                            placeholder="Nhập hãng xe"
                            value={vehicleInfo.brand}
                            onChange={(e) => setVehicleInfo({...vehicleInfo, brand: e.target.value})}
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label className="label-for-input">Dòng xe</label>
                    <div className="input-form">
                        <input
                            type="text"
                            className="w-100"
                            placeholder="Nhập dòng xe"
                            value={vehicleInfo.model}
                            onChange={(e) => setVehicleInfo({...vehicleInfo, model: e.target.value})}
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label className="label-for-input">Loại xe</label>
                    <select
                        className="combo-box"
                        value={vehicleInfo.type}
                        onChange={handleVehicleTypeChange}
                    >
                        <option value="" disabled hidden>Chọn</option>
                        <option value="Ô tô">Ô tô</option>
                        <option value="Xe máy">Xe máy</option>
                    </select>
                </div>
                <div className="col-4">
                    <label className="label-for-input">Tốc độ tối đa</label>
                    <div className="input-form">
                        <input
                            type="text"
                            className="w-100"
                            placeholder="Nhập tốc độ"
                            value={vehicleInfo.maxSpeed}
                            onChange={(e) => setVehicleInfo({...vehicleInfo, maxSpeed: e.target.value})}
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label className="label-for-input">Màu xe</label>
                    <div className="input-form">
                        <input
                            type="text"
                            className="w-100"
                            placeholder="Nhập màu xe"
                            value={vehicleInfo.color}
                            onChange={(e) => setVehicleInfo({...vehicleInfo, color: e.target.value})}
                        />
                    </div>
                </div>
                <div className="col-4">
                    <label className="label-for-input">Số chỗ tối đa</label>
                    <select
                        className="combo-box"
                        value={vehicleInfo.seats}
                        onChange={(e) => setVehicleInfo({...vehicleInfo, seats: e.target.value})}
                        disabled={vehicleInfo.type === "Xe máy"}
                    >
                        <option value="" disabled hidden>Chọn</option>
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                    </select>
                </div>
                <div className="col-6">
                    <label className="label-for-input">Ảnh xe</label>
                    <div 
                        className="location-modal__upload-box"
                        onClick={() => fileInputRef.current.click()}
                    >
                        {vehicleImage ? (
                            <img
                                src={vehicleImage.preview}
                                alt="Vehicle preview"
                                className="location-modal__uploaded-image"
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faCirclePlus}
                                className="location-modal__upload-icon"
                            />
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            hidden
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label className="label-for-input">Loại hộp số</label>
                    <select
                        className="combo-box"
                        value={vehicleInfo.transmission}
                        onChange={(e) => setVehicleInfo({...vehicleInfo, transmission: e.target.value})}
                        disabled={vehicleInfo.type === "Xe máy"}
                    >
                        <option value="" disabled hidden>Chọn loại hộp số</option>
                        <option value="Tự động">Tự động</option>
                        <option value="Sàn">Sàn</option>
                        <option value="Không">Không</option>
                    </select>
                    <label className="label-for-input mt-3">Loại nhiên liệu</label>
                    <select
                        className="combo-box"
                        value={vehicleInfo.fuel}
                        onChange={(e) => setVehicleInfo({...vehicleInfo, fuel: e.target.value})}
                    >
                        <option value="" disabled hidden>Chọn loại nhiên liệu</option>
                        <option value="Xăng">Xăng</option>
                        <option value="Điện">Điện</option>
                        <option value="Dầu">Dầu Diesel</option>
                    </select>
                </div>
            </div>
            <div className="vehicle-type-modal__footer">
                <div className="vehicle-type-modal__btns">
                    <button className="page__header-button" onClick={onClose}>
                        Hủy
                    </button>
                    <button 
                        className="primary-button create-btn shadow-none"
                        onClick={handleSubmit}
                    >
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddVehicleType
