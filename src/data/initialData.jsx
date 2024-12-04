
export const initialUsers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'Admin', 
    status: 'Active',
    lastLogin: '2024-03-15'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    role: 'Editor', 
    status: 'Active',
    lastLogin: '2024-03-10'
  },
  { 
    id: 3, 
    name: 'Mike Johnson', 
    email: 'mike@example.com', 
    role: 'Viewer', 
    status: 'Inactive',
    lastLogin: '2024-02-20'
  }
];

export const initialRoles = [
  { 
    id: 1, 
    name: 'Admin', 
    permissions: ['read', 'write', 'delete', 'manage_users'] 
  },
  { 
    id: 2, 
    name: 'Editor', 
    permissions: ['read', 'write'] 
  },
  { 
    id: 3, 
    name: 'Viewer', 
    permissions: ['read'] 
  }
];