  // Function to add a new user and update the table
  const addUser = (newUser) => {
    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };