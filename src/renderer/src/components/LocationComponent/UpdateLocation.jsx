import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faStar  } from '@fortawesome/free-solid-svg-icons'
import { db, storage } from '../../firebaseConfig'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'

const UpdateLocation = ({ location, onClose }) => {
    const [activeTab, setActiveTab] = useState('info')
    const [destinationInfo, setDestinationInfo] = useState(location || {})
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [photos, setImages] = useState(
        location?.photo?.map(url => ({
            file: null,
            preview: url,
            isExisting: true
        })) || []
    )
    const [videos, setVideos] = useState(
        location?.video?.map(url => ({
            file: null,
            preview: url,
            isExisting: true
        })) || []
    )
    const videoInputRef = useRef(null)
    const fileInputRef = useRef(null)

    const uploadFilesToStorage = async (files, folder) => {
        const urls = [];
        for (const file of files) {
            if (file.isExisting) {
                urls.push(file.preview);
            } else {
                const storageRef = ref(storage, `${folder}/${file.file.name}`);
                const snapshot = await uploadBytes(storageRef, file.file);
                const url = await getDownloadURL(snapshot.ref);
                urls.push(url);
            }
        }
        return urls;
    };

    const handleSubmit = async () => {
        try {
            const photoUrls = await uploadFilesToStorage(photos, 'photos');
            const videoUrls = await uploadFilesToStorage(videos, 'videos');

            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            const data = {
                destinationName: destinationInfo.destinationName,
                latitude: destinationInfo.latitude,
                longitude: destinationInfo.longitude,
                province: destinationInfo.province,
                district: destinationInfo.district,
                specificAddress: destinationInfo.specificAddress,
                descriptionEng: destinationInfo.descriptionEng,
                descriptionViet: destinationInfo.descriptionViet,
                photo: photoUrls,
                video: videoUrls,
                lastUpdate: formattedDate
            };

            const destinationRef = doc(db, `DESTINATION/${location.id}`);
            await updateDoc(destinationRef, data);
            alert('Cập nhật địa điểm thành công!');
            onClose();
        } catch (error) {
            console.error('Lỗi khi cập nhật địa điểm:', error);
            alert('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    };

    const handleDelete = async () => {
        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            const destinationRef = doc(db, `DESTINATION/${location.id}`);
            await updateDoc(destinationRef, {
                status: "Ngưng Hoạt Động",
                lastUpdate: formattedDate
            });
            alert('Xóa địa điểm thành công!');
            onClose();
        } catch (error) {
            console.error('Lỗi khi xóa địa điểm:', error);
            alert('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    };

    // Các hàm xử lý ảnh và video tương tự như CreUpLocation
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            isExisting: false
        }))
        setImages((prev) => [...prev, ...newImages])
        e.target.value = ''
    }

    const handleVideoUpload = (e) => {
        const files = Array.from(e.target.files)
        const newVideos = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            isExisting: false
        }))
        setVideos((prev) => [...prev, ...newVideos])
        e.target.value = ''
    }

    // Các useEffect và JSX tương tự như CreUpLocation
    useEffect(() => {
        const fetchProvinces = async () => {
            const provincesCollection = collection(db, 'PROVINCE');
            const provinceSnapshot = await getDocs(provincesCollection);
            const provinceList = provinceSnapshot.docs.map(doc => doc.data());
            setProvinces(provinceList);
        };

        fetchProvinces();
    }, []);

    useEffect(() => {
        if (destinationInfo.province) {
            const selectedProvince = provinces.find(p => p.provinceName === destinationInfo.province);
            if (selectedProvince && selectedProvince.city) {
                setDistricts([selectedProvince.city, ...selectedProvince.district]);
            } else {
                setDistricts(selectedProvince ? selectedProvince.district : []);
            }
        }
    }, [destinationInfo.province, provinces]);

    const handleSetThumbnail = (index) => {
        setImages(prevImages => {
            const newImages = [...prevImages];
            // Hoán đổi vị trí giữa ảnh được chọn và ảnh đầu tiên
            [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
            return newImages;
        });
    };

    return (
        <div className="cre-up-location-modal">
            <div className="cre-up-location-modal__tabs">
                <button
                    className={`primary-button tab-btn ${activeTab === 'info' ? 'active' : ''}`}
                    onClick={() => setActiveTab('info')}
                >
                    Thông tin
                </button>
                <button
                    className={`primary-button tab-btn ${activeTab === 'image' ? 'active' : ''}`}
                    onClick={() => setActiveTab('image')}
                >
                    Ảnh
                </button>
                <button
                    className={`primary-button tab-btn ${activeTab === 'video' ? 'active' : ''}`}
                    onClick={() => setActiveTab('video')}
                >
                    Video
                </button>
            </div>
            <div className="cre-up-location-modal__content">
                {activeTab === 'info' && (
                    <>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="locationCode" className="label-for-input">
                                    Tên địa điểm
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="destinationName"
                                        value={destinationInfo?.destinationName || ''}
                                        onChange={(e) =>
                                            setDestinationInfo({
                                                ...destinationInfo,
                                                destinationName: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="province" className="label-for-input">
                                    Tỉnh
                                </label>
                                <select
                                    id="province"
                                    value={destinationInfo.province || ""}
                                    onChange={(e) =>
                                        setDestinationInfo({
                                            ...destinationInfo,
                                            province: e.target.value,
                                            district: ""
                                        })
                                    }
                                    className="combo-box"
                                >
                                    <option value="" disabled>Chọn</option>
                                    {provinces.map((province, index) => (
                                        <option key={index} value={province.provinceName}>
                                            {province.provinceName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="district" className="label-for-input">
                                    Huyện/Thành phố
                                </label>
                                <select
                                    id="district"
                                    value={destinationInfo.district || ""}
                                    onChange={(e) =>
                                        setDestinationInfo({
                                            ...destinationInfo,
                                            district: e.target.value
                                        })
                                    }
                                    className="combo-box"
                                    disabled={!destinationInfo.province}
                                >
                                    <option value="" disabled>Chọn</option>
                                    {districts.map((district, index) => (
                                        <option key={index} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="longitude" className="label-for-input">
                                    Kinh độ
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="longitude"
                                        value={destinationInfo?.longitude || ''}
                                        onChange={(e) =>
                                            setDestinationInfo({
                                                ...destinationInfo,
                                                longitude: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="latitude" className="label-for-input">
                                    Vĩ độ
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="latitude"
                                        value={destinationInfo?.latitude || ''}
                                        onChange={(e) =>
                                            setDestinationInfo({
                                                ...destinationInfo,
                                                latitude: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <label htmlFor="address" className="label-for-input">
                                    Địa chỉ cụ thể
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="specificAddress"
                                        value={destinationInfo?.specificAddress || ''}
                                        onChange={(e) =>
                                            setDestinationInfo({
                                                ...destinationInfo,
                                                specificAddress: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex cre-up-location-modal__description-container">
                            <div className="flex-1 cre-up-location-modal__description-viet">
                                <label htmlFor="description" className="label-for-input">
                                    Mô tả (Tiếng Việt)
                                </label>
                                <div className="input-form flex-1 flex-column">
                                    <textarea
                                        className="w-100 flex-1"
                                        id="descriptionViet"
                                        rows="7"
                                        value={destinationInfo?.descriptionViet || ''}
                                        onChange={(e) =>
                                            setDestinationInfo({
                                                ...destinationInfo,
                                                descriptionViet: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex-1 cre-up-location-modal__description-eng">
                                <label htmlFor="other" className="label-for-input">
                                    Mô tả (Tiếng Anh)
                                </label>
                                <div className="input-form flex-1 flex-column">
                                    <textarea
                                        className="w-100 flex-1"
                                        id="descriptionEng"
                                        rows="7"
                                        value={destinationInfo?.descriptionEng || ''}
                                        onChange={(e) =>
                                            setDestinationInfo({
                                                ...destinationInfo,
                                                descriptionEng: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 'image' && (
                    <div className="cre-up-location-modal__image-content row">
                        {photos.map((image, index) => (
                            <div key={index} className="col-4 location-modal__vid-img-container">
                                <div className="position-relative">
                                    {index === 0 && (
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className="thumbnail-indicator"
                                            style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                color: '#ffd700',
                                                fontSize: '1.5rem',
                                                zIndex: 1
                                            }}
                                        />
                                    )}
                                    <img
                                        src={image.preview}
                                        alt={`Upload ${index + 1}`}
                                        className="location-modal__uploaded-image"
                                    />
                                </div>
                                <div className="location-modal__uploaded-image-options w-100 h-100">
                                    {index !== 0 && (
                                        <button 
                                            className="uploaded-image-option__btn"
                                            onClick={() => handleSetThumbnail(index)}
                                        >
                                            Đặt làm ảnh đại diện
                                        </button>
                                    )}
                                    <button
                                        className="uploaded-image-option__btn delete-btn"
                                        onClick={() => handleDeleteImage(index)}
                                    >
                                        Xóa ảnh
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div
                            className="col-4 location-modal__upload-box"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <FontAwesomeIcon
                                icon={faCirclePlus}
                                className="location-modal__upload-icon"
                            />
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                multiple
                                hidden
                            />
                        </div>
                    </div>
                )}
                {activeTab === 'video' && (
                    <div className="row">
                        {videos.map((video, index) => (
                            <div key={index} className="col-4 location-modal__vid-img-container">
                                <video
                                    src={video.preview}
                                    className="location-modal__uploaded-video"
                                    controls
                                />
                                <div className="location-modal__uploaded-video-options">
                                    <button
                                        className="uploaded-video-option__btn delete-btn"
                                        onClick={() => handleDeleteVideo(index)}
                                    >
                                        Xóa video
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div
                            className="col-4 location-modal__upload-box"
                            onClick={() => videoInputRef.current.click()}
                        >
                            <FontAwesomeIcon
                                icon={faCirclePlus}
                                className="location-modal__upload-icon"
                            />
                            <input
                                type="file"
                                ref={videoInputRef}
                                onChange={handleVideoUpload}
                                accept="video/*, .mkv"
                                multiple
                                hidden
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="cre-up-location-modal__footer">
                <div className="cre-up-location-modal__last-update">
                    <p>Lần cập nhật cuối: {new Date(location?.lastUpdate).toLocaleDateString()}</p>
                </div>
                <div className="cre-up-location-modal__btns">
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
                        className="primary-button shadow-none"
                        onClick={handleSubmit}
                    >
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateLocation
