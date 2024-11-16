import { useState } from 'react'

const Disapproval = ({ onClose, onDisapproval }) => {
    const [reason, setReason] = useState('')
    return (
        <div className="vehicle-registration-modal">
            <div className="row">
                <div className="col-12">
                    <label htmlFor="reason" className="label-for-input">
                        Lý do không duyệt
                    </label>
                    <div className="input-form">
                        <textarea
                            className="w-100"
                            id="reason"
                            placeholder="Nhập lý do không duyệt"
                            value={reason}
                            rows={3}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="vehicle-registration-modal__btns">
                <button className="page__header-button" onClick={onClose}>
                    Hủy
                </button>
                <button
                    className={`primary-button shadow-none`}
                    onClick={() => onDisapproval(reason)}
                >
                    Xác nhận
                </button>
            </div>
        </div>
    )
}

export default Disapproval
