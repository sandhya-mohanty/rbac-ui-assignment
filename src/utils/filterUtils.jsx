
export const filterAndSortUsers = (users, searchTerm, userFilters, userSort) => {
  return users
    .filter(user => 
      // Search filter
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      // Role filter
      (userFilters.role ? user.role === userFilters.role : true) &&
      // Status filter
      (userFilters.status ? user.status === userFilters.status : true)
    )
    .sort((a, b) => {
      const modifier = userSort.direction === 'asc' ? 1 : -1;
      return a[userSort.key] > b[userSort.key] 
        ? modifier 
        : a[userSort.key] < b[userSort.key] 
          ? -modifier 
          : 0;
    });
};