import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();
  const [interestedData, setInterestedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInterestedData();
  }, []);

  const fetchInterestedData = async () => {
    try {
      setLoading(true);
      // Since we don't have an admin endpoint yet, let's create one or fetch from interests
      const response = await fetch('http://localhost:3001/api/interests', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInterestedData(data.interests || []);
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      console.error('Error fetching interested data:', err);
      setError('Network error: Unable to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px'
      }}>
        Loading interested candidates data...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ color: '#333', margin: '0' }}>Admin Dashboard</h1>
          <p style={{ color: '#666', margin: '5px 0 0 0' }}>
            Total Interested Candidates: {interestedData.length}
          </p>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
        >
          Logout
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          {error}
        </div>
      )}

      {/* Data Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {interestedData.length === 0 ? (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            color: '#666'
          }}>
            No interested candidates found.
          </div>
        ) : (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={tableHeaderStyle}>S.No</th>
                <th style={tableHeaderStyle}>Student Name</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Club Name</th>
                <th style={tableHeaderStyle}>Club Type</th>
                <th style={tableHeaderStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {interestedData.map((item, index) => (
                <tr key={item._id || index} style={{
                  borderBottom: '1px solid #dee2e6',
                  ':hover': { backgroundColor: '#f8f9fa' }
                }}>
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{item.userName}</td>
                  <td style={tableCellStyle}>{item.userEmail}</td>
                  <td style={tableCellStyle}>{item.clubName}</td>
                  <td style={tableCellStyle}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: item.clubType === 'Technical' ? '#d4edda' : '#fff3cd',
                      color: item.clubType === 'Technical' ? '#155724' : '#856404'
                    }}>
                      {item.clubType}
                    </span>
                  </td>
                  <td style={tableCellStyle}>
                    {new Date(item.interestedAt || item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary Cards */}
      {interestedData.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          <div style={summaryCardStyle}>
            <h3 style={{ margin: '0 0 10px 0', color: '#28a745' }}>Technical Clubs</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
              {interestedData.filter(item => item.clubType === 'Technical').length}
            </p>
          </div>
          <div style={summaryCardStyle}>
            <h3 style={{ margin: '0 0 10px 0', color: '#ffc107' }}>Non-Technical Clubs</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
              {interestedData.filter(item => item.clubType === 'Non-Technical').length}
            </p>
          </div>
          <div style={summaryCardStyle}>
            <h3 style={{ margin: '0 0 10px 0', color: '#17a2b8' }}>Total Students</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
              {new Set(interestedData.map(item => item.userEmail)).size}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const tableHeaderStyle = {
  padding: '12px 15px',
  textAlign: 'left',
  fontWeight: 'bold',
  color: '#495057',
  borderBottom: '2px solid #dee2e6'
};

const tableCellStyle = {
  padding: '12px 15px',
  color: '#495057'
};

const summaryCardStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

export default AdminPage;