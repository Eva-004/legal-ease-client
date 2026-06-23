import React from 'react';

const DashboardNavbar = ({role}) => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <h2 className="btn btn-ghost text-xl">{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h2>
  </div>
  <div className="flex gap-2">
    
  </div>
</div>
    );
};

export default DashboardNavbar;