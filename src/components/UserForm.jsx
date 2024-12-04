import React, { useState } from 'react';

const UserForm = ({ user, onSubmit, roles }) => {
  const [formData, setFormData] = useState(user || {
    name: '', 
    email: '', 
    role: '', 
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">
        {user ? 'Edit User' : 'Add New User'}
      </h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        className="w-full p-2 border rounded"
        required
      />
      <select
        value={formData.role}
        onChange={(e) => setFormData({...formData, role: e.target.value})}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Role</option>
        {roles.map(role => (
          <option key={role.id} value={role.name}>
            {role.name}
          </option>
        ))}
      </select>
      <select
        value={formData.status}
        onChange={(e) => setFormData({...formData, status: e.target.value})}
        className="w-full p-2 border rounded"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {user ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;