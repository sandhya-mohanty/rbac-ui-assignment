import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const RoleTable = ({ 
  roles, 
  onEditRole, 
  onDeleteRole 
}) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Role Name</th>
            <th className="p-4 text-left">Permissions</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id} className="border-b">
              <td className="p-4">{role.name}</td>
              <td className="p-4">
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map(perm => (
                    <span 
                      key={perm} 
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-4 flex space-x-2">
                <button 
                  onClick={() => onEditRole(role)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit size={20} />
                </button>
                <button 
                  onClick={() => onDeleteRole(role.id)} 
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;