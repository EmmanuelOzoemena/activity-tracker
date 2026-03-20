import React, { useEffect, useState } from 'react';
import { getAllRegistrations } from '../../apis/auth';
import { FiEye, FiUser, FiCalendar } from 'react-icons/fi';
import './RegDetails.css';

const RegDetails = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchStats = async () => {
    try {
      const data = await getAllRegistrations();
      setRegistrations(data);
    } catch (err) {
      setRegistrations([]); // Fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, []);

  if (loading) return <div className="loader">Loading Registrations...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Skill Acquisition Registrants</h1>
        <span>Total: {registrations.length}</span>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Skill</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Receipt</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(registrations) && registrations.map((reg) => (
              <tr key={reg._id}>
                <td className="name-cell">
                  {reg.firstName} {reg.lastName}
                </td>
                <td>{reg.email}</td>
                <td><span className="badge-skill">{reg.skillType}</span></td>
                <td>{reg.phoneNumber}</td>
                <td>{new Date(reg.dob).toLocaleDateString()}</td>
                <td>
                  <a 
                    href={reg.paymentReceiptUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="view-link"
                  >
                    <FiEye /> View Image
                  </a>
                </td>
                <td>
                  <span className={`status-tag ${reg.status.toLowerCase()}`}>
                    {reg.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegDetails;