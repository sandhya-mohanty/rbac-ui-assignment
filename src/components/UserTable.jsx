import React from 'react';
import { Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

const UserTable = ({ 
  users, 
  userSort, 
  handleSort, 
  onEditUser, 
  onDeleteUser 
}) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th 
              className="p-4 text-left cursor-pointer flex items-center"
              onClick={() => handleSort('name')}
            >
              Name 
              {userSort.key === 'name' && (
                userSort.direction === 'asc' 
                  ? <ArrowUp size={16} className="ml-2" /> 
                  : <ArrowDown size={16} className="ml-2" />
              )}
            </th>
            <th className="p-4 text-left">Email</th>
            <th 
              className="p-4 text-left cursor-pointer flex items-center"
              onClick={() => handleSort('role')}
            >
              Role
              {userSort.key === 'role' && (
                userSort.direction === 'asc' 
                  ? <ArrowUp size={16} className="ml-2" /> 
                  : <ArrowDown size={16} className="ml-2" />
              )}
            </th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b">
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded-full text-xs 
                  ${user.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                  }
                `}>
                  {user.status}
                </span>
              </td>
              <td className="p-4 flex space-x-2">
                <button 
                  onClick={() => onEditUser(user)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit size={20} />
                </button>
                <button 
                  onClick={() => onDeleteUser(user.id)}
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

export default UserTable;