import React, { useEffect, useState } from 'react';
import { getAllRegistrations } from '../../apis/auth';
import { FiEye } from 'react-icons/fi';
import './RegDetails.css';

const RegDetails = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAllRegistrations();
        // Handle the { data: [...] } structure from your controller
        const actualData = response?.data || response;
        setRegistrations(actualData);
      } catch (err) {
        console.error("Fetch error:", err);
        setRegistrations([]); 
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
        <div className="stats-badges">
           <span className="stat-pill">Total Entries: {registrations.length}</span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Payer Name</th>
              <th>WhatsApp</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Skill Choice</th>
              <th>Receipt</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(registrations) && registrations.map((reg) => {
              // Logic to determine what to show in the "Type" and "Qty" columns
              const isParent = reg.hasKids === "Yes";
              const isSponsor = reg.isSponsoring === "Yes";
              const typeLabel = isSponsor ? "Sponsor" : (isParent ? "Parent" : "Individual");
              const quantity = isSponsor ? reg.sponsorCount : (isParent ? reg.kidsCount : 1);

              return (
                <tr key={reg._id}>
                  <td className="name-cell">{reg.fullName}</td>
                  <td>{reg.phoneNumber}</td>
                  <td>
                    <span className={`type-badge ${typeLabel.toLowerCase()}`}>
                      {typeLabel}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{quantity}</td>
                  <td>
                    <span className="badge-skill">
                      {reg.skillType || "N/A"}
                    </span>
                  </td>
                  <td>
                    <a 
                      href={reg.paymentReceiptUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="view-link"
                    >
                      <FiEye /> View
                    </a>
                  </td>
                  <td>
                    <span className={`status-tag ${reg.status?.toLowerCase()}`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="date-cell">
                    {new Date(reg.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {registrations.length === 0 && (
          <div className="empty-state">No registrations found.</div>
        )}
      </div>
    </div>
  );
};

export default RegDetails;