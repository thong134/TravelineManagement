import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { db, storage } from '../../firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'

function UpdateVehicleType({ data, onClose }) {
    const [vehicleInfo, setVehicleInfo] = useState({
        brand: data.brand || '',
        model: data.model || '',
        type: data.type || '',
        maxSpeed: data.maxSpeed || '',
        color: data.color || '',
        seats: data.seatingCapacity || '',
        transmission: data.transmission || '',
        fuel: data.fuelType || ''
    })
    const [vehicleImage, setVehicleImage] = useState({
        preview: data.photo || null,
        file: null
    })
    const fileInputRef = useRef(null)

    const handleVehicleTypeChange = (e) => {
        const selectedType = e.target.value
        if (selectedType === "Xe máy") {
            setVehicleInfo(prev => ({
                ...prev,
                type: selectedType,
                seats: "2",
                transmission: "Không"
            }))
        } else {
            setVehicleInfo(prev => ({
                ...prev,
                type: selectedType
            }))
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVehicleImage({
                preview: URL.createObjectURL(file),
                file: file
            });
        }
        e.target.value = '';
    };

    useEffect(() => {
        return () => {
            if (vehicleImage && vehicleImage.preview && vehicleImage.preview !== data.photo) {
                URL.revokeObjectURL(vehicleImage.preview);
            }
        };
    }, [vehicleImage, data.photo]);

    const handleUpdate = async () => {
        try {
            let photoUrl = data.photo;
            if (vehicleImage.file) {
                const storageRef = ref(storage, `vehicles/${data.vehicleId}_${vehicleImage.file.name}`);
                const snapshot = await uploadBytes(storageRef, vehicleImage.file);
                photoUrl = await getDownloadURL(snapshot.ref);
            }

            const updateData = {
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

            await updateDoc(doc(db, 'VEHICLE_INFORMATION', data.vehicleId), updateData);
            alert('Cập nhật thông tin xe thành công!');
            onClose();
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error);
            alert('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa loại xe này?')) {
            try {
                await deleteDoc(doc(db, 'VEHICLE_INFORMATION', data.vehicleId));
                alert('Xóa loại xe thành công!');
                onClose();
            } catch (error) {
                console.error('Lỗi khi xóa:', error);
                alert('Đã xảy ra lỗi, vui lòng thử lại!');
            }
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
                        <option value="" disabled hidden></option>
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
                        {vehicleImage.preview ? (
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
                        <option value="" disabled hidden></option>
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
                        <option value="" disabled hidden></option>
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
                        className="primary-button delete-btn shadow-none"
                        onClick={handleDelete}
                    >
                        Xóa
                    </button>
                    <button 
                        className="primary-button create-btn shadow-none"
                        onClick={handleUpdate}
                    >
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateVehicleType
