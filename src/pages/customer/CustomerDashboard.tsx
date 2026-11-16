import { useAuth } from '../../context/useAuth'
import './CustomerDashboard.css'

const shipments = [
{
id: 'VL-1008',
destination: 'Enugu',
date: '2026-11-14',
status: 'Pending',
},
{
id: 'VL-1007',
destination: 'Kano',
date: '2026-11-13',
status: 'In Transit',
},
{
id: 'VL-1006',
destination: 'Lagos',
date: '2026-11-12',
status: 'Delivered',
},
{
id: 'VL-1005',
destination: 'Abuja',
date: '2026-11-10',
status: 'Delivered',
},
]

export default function CustomerDashboard() {
const { user } = useAuth()

return (
<div className="customer-dashboard">

  {/* Welcome Section */}
  <div className="customer-welcome">
    <h1>Welcome back, {user?.name || 'Customer'}!</h1>
    <p>Here's an overview of your shipments and deliveries.</p>
    <div className="welcome-line"></div>
  </div>

  {/* Statistics */}
  <div className="customer-stats">

    <div className="customer-stat-card">
      <div className="stat-icon blue-icon">📦</div>
      <div>
        <h2>8</h2>
        <p>Total Shipments</p>
      </div>
    </div>

    <div className="customer-stat-card">
      <div className="stat-icon orange-icon">🚚</div>
      <div>
        <h2>3</h2>
        <p>In Transit</p>
      </div>
    </div>

    <div className="customer-stat-card">
      <div className="stat-icon blue-icon">✓</div>
      <div>
        <h2>3</h2>
        <p>Delivered</p>
      </div>
    </div>

    <div className="customer-stat-card">
      <div className="stat-icon orange-icon">◷</div>
      <div>
        <h2>2</h2>
        <p>Pending</p>
      </div>
    </div>

  </div>

  {/* Dashboard Content */}
  <div className="customer-dashboard-content">

    {/* Recent Shipments */}
    <div className="customer-shipments">

      <div className="customer-section-header">
        <h3>📦 Recent Shipments</h3>
        <a href="/customer/shipments">View All →</a>
      </div>

      <div className="customer-table-wrapper">
        <table className="customer-table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map((shipment) => (
              <tr key={shipment.id}>
                <td>{shipment.id}</td>
                <td>{shipment.destination}</td>
                <td>
                  <span
                    className={`shipment-status ${shipment.status
                      .toLowerCase()
                      .replace(' ', '-')}`}
                  >
                    {shipment.status}
                  </span>
                </td>
                <td>{shipment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>

    {/* Quick Actions */}
    <div className="customer-quick-actions">

      <div className="customer-section-header">
        <h3>⚡ Quick Actions</h3>
      </div>

      <div className="quick-action-buttons">

        <a
          href="/customer/book-delivery"
          className="quick-action-btn primary-action"
        >
          <span>＋</span> Book a Shipment
        </a>

        <a
          href="/customer/shipments"
          className="quick-action-btn secondary-action"
        >
          <span>📦</span> My Shipments
        </a>

        <a
          href="/track-shipment"
          className="quick-action-btn secondary-action"
        >
          <span>🔍</span> Track Shipment
        </a>

        <a
          href="/customer/payments"
          className="quick-action-btn secondary-action"
        >
          <span>💳</span> My Payments
        </a>

      </div>

      {/* Help Card */}
      <div className="customer-help-card">
        <h4>Need Help?</h4>
        <p>Having issues with your shipment? Our support team is ready to help.</p>
        <a href="/customer/help-support">Contact Support →</a>
      </div>

    </div>

  </div>

</div>

)
}