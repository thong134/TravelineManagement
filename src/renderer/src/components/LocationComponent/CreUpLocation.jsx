import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const CreUpLocation = ({ type }) => {
    const [activeTab, setActiveTab] = useState('info')
    const [images, setImages] = useState([])
    const fileInputRef = useRef(null)

    useEffect(() => {
        console.log(images)
        return () => {
            images.forEach((image) => {
                URL.revokeObjectURL(image.preview)
            })
        }
    }, [images])

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file)
        }))
        setImages((prev) => [...prev, ...newImages])
        e.target.value = ''
    }

    const handleImageClick = (index) => {
        // Xử lý khi click vào hình ảnh (có thể thêm chức năng xem/xóa)
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
                                />
                            </div>
                        </div>
                    </>
                )}
                {/* Image */}
                {activeTab === 'image' && (
                    <div className="cre-up-location-modal__image-content row">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="col-4 location-modal__image-container"
                                onClick={() => handleImageClick(index)}
                            >
                                <img
                                    src={image.preview}
                                    alt={`Upload ${index + 1}`}
                                    className="location-modal__uploaded-image"
                                />
                                <div className="location-modal__uploaded-image-options w-100 h-100">
                                    <button className="uploaded-image-option__btn">
                                        Đặt làm ảnh đại diện
                                    </button>
                                    <button className="uploaded-image-option__btn">Xóa ảnh</button>
                                </div>
                            </div>
                        ))}
                        <div
                            className="col-4 location-modal__image-upload-box"
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
                {activeTab === 'video' && <div>Video</div>}
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
                    <button className="page__header-button">Hủy</button>
                    <button className="primary-button delete-btn shadow-none">Xóa</button>
                    <button
                        className={`primary-button ${type === 'create' ? 'create-btn' : ''} shadow-none`}
                    >
                        {type === 'create' ? 'Tạo mới' : 'Cập nhật'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreUpLocation
