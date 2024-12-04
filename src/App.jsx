
import React, { useState, useMemo } from 'react';
import { Users, Shield, PlusCircle, Search, X } from 'lucide-react';

// Import initial data
import { initialUsers, initialRoles } from './data/initialData';

// Import filter utilities
import { filterAndSortUsers } from './utils/filterUtils';

// Import components
import Modal from './components/Modal';
import UserForm from './components/UserForm';
import RoleForm from './components/RoleForm';
import UserTable from './components/UserTable';
import RoleTable from './components/RoleTable';

const App = () => {
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [selectedTab, setSelectedTab] = useState('users');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);

  // Search and Filtering State
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilters, setUserFilters] = useState({
    role: '',
    status: ''
  });
  const [userSort, setUserSort] = useState({
    key: 'name',
    direction: 'asc'
  });

  // Advanced Search and Filtering for Users
  const filteredAndSortedUsers = useMemo(() => 
    filterAndSortUsers(users, searchTerm, userFilters, userSort), 
    [users, searchTerm, userFilters, userSort]
  );

  // Sorting Handler
  const handleSort = (key) => {
    setUserSort(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Clear Filters
  const clearFilters = () => {
    setSearchTerm('');
    setUserFilters({ role: '', status: '' });
  };

  // User Management Functions
  const addUser = (newUser) => {
    setUsers([...users, { 
      ...newUser, 
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1 
    }]);
    setIsModalOpen(false);
  };

  const editUser = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setIsModalOpen(false);
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // Role Management Functions
  const addRole = (newRole) => {
    setRoles([...roles, { 
      ...newRole, 
      id: roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 1 
    }]);
    setIsModalOpen(false);
  };

  const editRole = (updatedRole) => {
    setRoles(roles.map(role => 
      role.id === updatedRole.id ? updatedRole : role
    ));
    setIsModalOpen(false);
  };

  const deleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Enhanced RBAC Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex mb-6 justify-center">
          <button
            onClick={() => setSelectedTab('users')}
            className={`flex items-center px-4 py-2 mx-2 rounded ${
              selectedTab === 'users' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            <Users className="mr-2" /> Users
          </button>
          <button
            onClick={() => setSelectedTab('roles')}
            className={`flex items-center px-4 py-2 mx-2 rounded ${
              selectedTab === 'roles' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            <Shield className="mr-2" /> Roles
          </button>
        </div>

        {/* Users Tab */}
        {selectedTab === 'users' && (
          <div>
            {/* Search and Filter Section */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-4 py-2 border rounded w-64"
                  />
                  <Search className="absolute left-2 top-3 text-gray-400" />
                </div>

                {/* Role Filter */}
                <select
                  value={userFilters.role}
                  onChange={(e) => setUserFilters(prev => ({
                    ...prev, 
                    role: e.target.value
                  }))}
                  className="p-2 border rounded"
                >
                  <option value="">All Roles</option>
                  {[...new Set(users.map(u => u.role))].map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={userFilters.status}
                  onChange={(e) => setUserFilters(prev => ({
                    ...prev, 
                    status: e.target.value
                  }))}
                  className="p-2 border rounded"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                {/* Clear Filters */}
                {(searchTerm || userFilters.role || userFilters.status) && (
                  <button 
                    onClick={clearFilters}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Add User Button */}
              <button 
                onClick={() => {
                  setCurrentUser(null);
                  setIsModalOpen(true);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
              >
                <PlusCircle className="mr-2" /> Add User
              </button>
            </div>

            {/* User Table */}
            <UserTable 
              users={filteredAndSortedUsers}
              userSort={userSort}
              handleSort={handleSort}
              onEditUser={(user) => {
                setCurrentUser(user);
                setIsModalOpen(true);
              }}
              onDeleteUser={deleteUser}
            />
          </div>
        )}

        {/* Roles Tab */}
        {selectedTab === 'roles' && (
          <div>
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => {
                  setCurrentRole(null);
                  setIsModalOpen(true);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
              >
                <PlusCircle className="mr-2" /> Add Role
              </button>
            </div>

            {/* Role Table */}
            <RoleTable 
              roles={roles}
              onEditRole={(role) => {
                setCurrentRole(role);
                setIsModalOpen(true);
              }}
              onDeleteRole={deleteRole}
            />
          </div>
        )}

        {/* Modal for User/Role Forms */}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            {selectedTab === 'users' ? (
              <UserForm 
                user={currentUser} 
                onSubmit={currentUser ? editUser : addUser} 
                roles={roles}
              />
            ) : (
              <RoleForm 
                role={currentRole} 
                onSubmit={currentRole ? editRole : addRole} 
              />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default App;