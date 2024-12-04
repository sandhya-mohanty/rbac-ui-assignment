import React, { useState } from 'react';
const RoleForm = ({ role, onSubmit }) => {
  const [formData, setFormData] = useState(role || {
    name: '', 
    permissions: []
  });

  const togglePermission = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const availablePermissions = [
    'read', 'write', 'delete', 
    'manage_users', 'manage_roles'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">
        {role ? 'Edit Role' : 'Add New Role'}
      </h2>
      <input
        type="text"
        placeholder="Role Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        className="w-full p-2 border rounded"
        required
      />
      <div>
        <h3 className="font-semibold mb-2">Permissions</h3>
        {availablePermissions.map(permission => (
          <label 
            key={permission} 
            className="inline-flex items-center mr-4 mb-2"
          >
            <input
              type="checkbox"
              checked={formData.permissions.includes(permission)}
              onChange={() => togglePermission(permission)}
              className="form-checkbox"
            />
            <span className="ml-2 capitalize">{permission}</span>
          </label>
        ))}
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {role ? 'Update Role' : 'Add Role'}
      </button>
    </form>
  );
};

export default RoleForm;