import './Home.css'
import locationImage from '../../assets/images/vung_tau.jpg'

export default function Home() {
    return (
        <>
            <div className="home-container">
                <div className="home-header">
                    <h1 className="home-item-title">Tổng quan hôm nay</h1>
                    <div className="detailed-overview">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div className="overview-item" key={index}>
                                <div className="overview-item-title">
                                    <p className="overview-item-title-text">Số lượt</p>
                                    <h2 className="overview-item-title-subtext">Truy cập</h2>
                                </div>
                                <p className="overview-item-value">123</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="home-body">
                    <div className="home-body-left">
                        <h1 className="home-item-title">TOP địa điểm yêu thích</h1>
                        <div className="home-locaton-top-one">
                            <div className="locaton-top-one-img-container">
                                <img
                                    src={locationImage}
                                    alt="Location image"
                                    className="locaton-top-one-img"
                                />
                                <p className="locaton-top-one-name">Vũng Tàu</p>
                            </div>
                            <div className="locaton-top-one-detail">
                                <p className="overview-item-title-text">Số lượt</p>
                                <p className="overview-item-title-subtext">Truy cập</p>
                                <p className="overview-item-value lg-font-size">123</p>
                            </div>
                        </div>
                        <table className="page-table home-locaton-top-table">
                            <thead>
                                <tr>
                                    <th>Địa điểm</th>
                                    <th>Yêu thích</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <tr key={index}>
                                        <td>Vũng Tàu {index + 1}</td>
                                        <td>123</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="home-body-right row">
                        <div className="col-6 home-body-right-item">
                            <h1 className="home-item-title">TOP thuê xe yêu thích</h1>
                            <table className="page-table home-body-right-table mt-2">
                                <thead>
                                    <tr>
                                        <th>Hãng xe</th>
                                        <th>Dòng xe</th>
                                        <th>Lượt thuê</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: 2 }).map((_, index) => (
                                        <tr key={index}>
                                            <td>{index % 2 === 0 ? 'Toyota' : 'Honda'}</td>
                                            <td>{index % 2 === 0 ? 'Camry' : 'Accord'}</td>
                                            <td>{index % 2 === 0 ? 123 : 456}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-6 home-body-right-item">
                            <h1 className="home-item-title">TOP khách sạn yêu thích</h1>
                            <table className="page-table home-body-right-table mt-2">
                                <thead>
                                    <tr>
                                        <th>Loại phòng</th>
                                        <th>Khách sạn</th>
                                        <th>Lượt đặt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: 2 }).map((_, index) => (
                                        <tr key={index}>
                                            <td>{index % 2 === 0 ? 'Premium' : 'Standard'}</td>
                                            <td>
                                                {index % 2 === 0 ? 'Khách sạn 1' : 'Khách sạn 2'}
                                            </td>
                                            <td>{index % 2 === 0 ? 123 : 456}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-6 home-body-right-item">
                            <h1 className="home-item-title">TOP nhà hàng yêu thích</h1>
                            <table className="page-table home-body-right-table mt-2">
                                <thead>
                                    <tr>
                                        <th>Nhà hàng</th>
                                        <th>Loại</th>
                                        <th>Lượt đặt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: 2 }).map((_, index) => (
                                        <tr key={index}>
                                            <td>{index % 2 === 0 ? 'Nhà hàng 1' : 'Nhà hàng 2'}</td>
                                            <td>{index % 2 === 0 ? 'Hàn Quốc' : 'Nhật Bản'}</td>
                                            <td>{index % 2 === 0 ? 123 : 456}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-6 home-body-right-item">
                            <h1 className="home-item-title">TOP giao hàng yêu thích</h1>
                            <table className="page-table home-body-right-table mt-2">
                                <thead>
                                    <tr>
                                        <th>Đơn vị</th>
                                        <th>Loại xe</th>
                                        <th>Lượt thuê</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: 2 }).map((_, index) => (
                                        <tr key={index}>
                                            <td>{index % 2 === 0 ? 'Đơn vị 1' : 'Đơn vị 2'}</td>
                                            <td>{index % 2 === 0 ? 'Xe máy' : 'Xe ô tô'}</td>
                                            <td>{index % 2 === 0 ? 123 : 456}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
