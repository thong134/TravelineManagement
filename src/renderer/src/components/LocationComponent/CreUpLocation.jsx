import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const CreUpLocation = ({ type, location = null, onClose }) => {
    const [activeTab, setActiveTab] = useState('info')
    const [locationInfo, setLocationInfo] = useState(location || {})
    const [images, setImages] = useState([])
    const [videos, setVideos] = useState([])
    const videoInputRef = useRef(null)
    const fileInputRef = useRef(null)

    useEffect(() => {
        return () => {
            images.forEach((image) => {
                URL.revokeObjectURL(image.preview)
            })
            videos.forEach((video) => URL.revokeObjectURL(video.preview))
        }
    }, [])

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file)
        }))
        setImages((prev) => [...prev, ...newImages])
        e.target.value = ''
    }

    const handleDeleteImage = (index) => {
        setImages((prev) => {
            const newImages = [...prev]
            URL.revokeObjectURL(newImages[index].preview)
            newImages.splice(index, 1)
            return newImages
        })
    }

    const handleVideoUpload = (e) => {
        const files = Array.from(e.target.files)
        const newVideos = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file)
        }))
        setVideos((prev) => [...prev, ...newVideos])
        e.target.value = ''
    }

    const handleDeleteVideo = (index) => {
        setVideos((prev) => {
            const newVideos = [...prev]
            URL.revokeObjectURL(newVideos[index].preview)
            newVideos.splice(index, 1)
            return newVideos
        })
    }

    return (
        <div className="cre-up-location-modal">
            {/* Tabs */}
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
            {/* Content */}
            <div className="cre-up-location-modal__content">
                {/* Info */}
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
                                        id="locationName"
                                        placeholder="Nhập tên địa điểm"
                                        value={locationInfo?.locationName || ''}
                                        onChange={(e) =>
                                            setLocationInfo({
                                                ...locationInfo,
                                                locationName: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="province" className="label-for-input">
                                    Tỉnh
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="province"
                                        placeholder="Nhập tên tỉnh"
                                        value={locationInfo?.province || ''}
                                        onChange={(e) =>
                                            setLocationInfo({
                                                ...locationInfo,
                                                province: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="district" className="label-for-input">
                                    Huyện/Thành phố
                                </label>
                                <div className="input-form">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id="district"
                                        placeholder="Nhập tên Huyện/Thành phố"
                                        value={locationInfo?.district || ''}
                                        onChange={(e) =>
                                            setLocationInfo({
                                                ...locationInfo,
                                                district: e.target.value
                                            })
                                        }
                                    />
                                </div>
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
                                        value={locationInfo?.longitude || ''}
                                        onChange={(e) =>
                                            setLocationInfo({
                                                ...locationInfo,
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
                                        value={locationInfo?.latitude || ''}
                                        onChange={(e) =>
                                            setLocationInfo({
                                                ...locationInfo,
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
                                        id="address"
                                        placeholder="Nhập địa chỉ cụ thể"
                                        value={locationInfo?.address || ''}
                                        onChange={(e) =>
                                            setLocationInfo({
                                                ...locationInfo,
                                                address: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 cre-up-location-modal__description">
                            <label htmlFor="description" className="label-for-input">
                                Mô tả
                            </label>
                            <div className="input-form flex-1 flex-column">
                                <textarea
                                    className="w-100 flex-1"
                                    id="description"
                                    cols="10"
                                    placeholder="Nhập mô tả"
                                    value={locationInfo?.description || ''}
                                    onChange={(e) =>
                                        setLocationInfo({
                                            ...locationInfo,
                                            description: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </>
                )}
                {/* Image */}
                {activeTab === 'image' && (
                    <div className="cre-up-location-modal__image-content row">
                        {images.map((image, index) => (
                            <div key={index} className="col-4 location-modal__vid-img-container">
                                <img
                                    src={image.preview}
                                    alt={`Upload ${index + 1}`}
                                    className="location-modal__uploaded-image"
                                />
                                <div className="location-modal__uploaded-image-options w-100 h-100">
                                    <button className="uploaded-image-option__btn">
                                        Đặt làm ảnh đại diện
                                    </button>
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
                {/* Video */}
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
            {/* Footer */}
            <div className="cre-up-location-modal__footer">
                <div className="cre-up-location-modal__last-update">
                    {type === 'update' && (
                        <>
                            <p>Lần cập nhật cuối: 16/11/2024</p>
                            <p>Bởi: NV1 - Trần Trung Thông</p>
                        </>
                    )}
                </div>

                <div className="cre-up-location-modal__btns">
                    <button className="page__header-button" onClick={onClose}>
                        Hủy
                    </button>
                    <button className="primary-button delete-btn shadow-none">Xóa</button>
                    <button
                        className={`primary-button ${type === 'create' ? 'create-btn' : ''} shadow-none`}
                    >
                        {type === 'create' ? 'Thêm' : 'Cập nhật'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreUpLocation
