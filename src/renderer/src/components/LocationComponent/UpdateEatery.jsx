import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { db, storage } from '../../firebaseConfig'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const UpdateEatery = ({ eatery, onClose }) => {
    const [activeTab, setActiveTab] = useState('info')
    const [eateryInfo, setEateryInfo] = useState(eatery || {})
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [photos, setImages] = useState(
        eatery?.photo?.map(url => ({
            file: null,
            preview: url,
            isExisting: true
        })) || []
    )
    const [videos, setVideos] = useState(
        eatery?.video?.map(url => ({
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
            const photoUrls = await uploadFilesToStorage(photos, 'eatery-photos');
            const videoUrls = await uploadFilesToStorage(videos, 'eatery-videos');

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
                eateryName: eateryInfo.eateryName,
                latitude: eateryInfo.latitude,
                longitude: eateryInfo.longitude,
                province: eateryInfo.province,
                district: eateryInfo.district,
                specificAddress: eateryInfo.specificAddress,
                descriptionEng: eateryInfo.descriptionEng,
                descriptionViet: eateryInfo.descriptionViet,
                photo: photoUrls,
                video: videoUrls,
                lastUpdate: formattedDate
            };

            const eateryRef = doc(db, `EATERY/${eatery.id}`);
            await updateDoc(eateryRef, data);
            alert('Cập nhật quán ăn thành công!');
            onClose();
        } catch (error) {
            console.error('Lỗi khi cập nhật quán ăn:', error);
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

            const eateryRef = doc(db, `EATERY/${eatery.id}`);
            await updateDoc(eateryRef, {
                status: "Ngưng Hoạt Động",
                lastUpdate: formattedDate
            });
            alert('Xóa quán ăn thành công!');
            onClose();
        } catch (error) {
            console.error('Lỗi khi xóa quán ăn:', error);
            alert('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    };

    // Các hàm xử lý ảnh và video
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

    const handleDeleteImage = (index) => {
        setImages((prev) => {
            const newImages = [...prev]
            if (!newImages[index].isExisting) {
                URL.revokeObjectURL(newImages[index].preview)
            }
            newImages.splice(index, 1)
            return newImages
        })
    }

    const handleDeleteVideo = (index) => {
        setVideos((prev) => {
            const newVideos = [...prev]
            if (!newVideos[index].isExisting) {
                URL.revokeObjectURL(newVideos[index].preview)
            }
            newVideos.splice(index, 1)
            return newVideos
        })
    }

    const handleSetThumbnail = (index) => {
        setImages(prevImages => {
            const newImages = [...prevImages];
            [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
            return newImages;
        });
    };

    // Fetch provinces và districts
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
        if (eateryInfo.province) {
            const selectedProvince = provinces.find(p => p.provinceName === eateryInfo.province);
            if (selectedProvince && selectedProvince.city) {
                setDistricts([selectedProvince.city, ...selectedProvince.district]);
            } else {
                setDistricts(selectedProvince ? selectedProvince.district : []);
            }
        }
    }, [eateryInfo.province, provinces]);

    // Cleanup URLs khi component unmount
    useEffect(() => {
        return () => {
            photos.forEach((image) => {
                if (!image.isExisting) {
                    URL.revokeObjectURL(image.preview)
                }
            })
            videos.forEach((video) => {
                if (!video.isExisting) {
                    URL.revokeObjectURL(video.preview)
                }
            })
        }
    }, [])

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
                                <label htmlFor="eateryName" className="label-for-input">
                                    Tên quán ăn
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="eateryName"
                                        placeholder="Nhập tên quán ăn"
                                        value={eateryInfo?.eateryName || ''}
                                        onChange={(e) =>
                                            setEateryInfo({
                                                ...eateryInfo,
                                                eateryName: e.target.value
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
                                    value={eateryInfo.province || ""}
                                    onChange={(e) =>
                                        setEateryInfo({
                                            ...eateryInfo,
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
                                    value={eateryInfo.district || ""}
                                    onChange={(e) =>
                                        setEateryInfo({
                                            ...eateryInfo,
                                            district: e.target.value
                                        })
                                    }
                                    className="combo-box"
                                    disabled={!eateryInfo.province}
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
                                        placeholder="Nhập kinh độ"
                                        value={eateryInfo?.longitude || ''}
                                        onChange={(e) =>
                                            setEateryInfo({
                                                ...eateryInfo,
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
                                        placeholder="Nhập vĩ độ"
                                        value={eateryInfo?.latitude || ''}
                                        onChange={(e) =>
                                            setEateryInfo({
                                                ...eateryInfo,
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
                                        placeholder="Nhập địa chỉ cụ thể"
                                        value={eateryInfo?.specificAddress || ''}
                                        onChange={(e) =>
                                            setEateryInfo({
                                                ...eateryInfo,
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
                                        placeholder="Nhập mô tả bằng tiếng Việt"
                                        value={eateryInfo?.descriptionViet || ''}
                                        onChange={(e) =>
                                            setEateryInfo({
                                                ...eateryInfo,
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
                                        placeholder="Nhập mô tả bằng tiếng Anh"
                                        value={eateryInfo?.descriptionEng || ''}
                                        onChange={(e) =>
                                            setEateryInfo({
                                                ...eateryInfo,
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
                    <p>Lần cập nhật cuối: {new Date(eatery?.lastUpdate).toLocaleDateString()}</p>
                </div>
                <div className="cre-up-location-modal__btns">
                    <button className="page__header-button" onClick={onClose}>
                        Hủy
                    </button>
                    <button 
                        className="primary-button delete-btn shadow-none"
                        onClick={handleDelete}
                    >
                        Tạm ngưng
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

export default UpdateEatery;
