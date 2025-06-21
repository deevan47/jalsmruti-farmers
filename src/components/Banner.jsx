import React from 'react';
import banner from '../assets/banner.png';

function BannerWithHeading() {
  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: '32px',
        marginTop: '16px',
      }}
    >
      <img
        src={banner}
        alt="Jal Smruti Banner"
        style={{
          maxWidth: '100%',
          borderRadius: '12px',
          boxShadow: '0 2px 12px 0 rgba(31, 38, 135, 0.10)',
        }}
      />
      
      <h1
        style={{
          color: '#1976d2',
          fontWeight: 700,
          fontSize: '2.5rem',
          marginTop: '24px',
          marginBottom: '0',
        }}
      >
        Jal Smruti Regenerative Agri Farm Assessment
      </h1>
      <h3>This form must be filled by the Sanchaalak on the ground working directly with farmers on behalf of Jalsmruti or the partner NGO</h3>
    </div>
  );
}

export default BannerWithHeading;
