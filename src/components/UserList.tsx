import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from API or localStorage
  useEffect(() => {
    fetchUsers();

    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    } else {
      fetchUsers();
    }
  }, []);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/users");
      setUsers(response.data);
      localStorage.setItem("users", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to add a new user and update the table
  const addUser = (newUser) => {
    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Function to delete a user and update the table

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/users/${userId}`);

      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">User List</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableHeadCell>Profile</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>City</TableHeadCell>
            <TableHeadCell>State</TableHeadCell>
            <TableHeadCell>Country</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow
                  key={user._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell>
                    <img
                      src={user.image_url}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.state}</TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>
                    <Button
                      size="xs"
                      color="failure"
                      onClick={() => deleteUser(user?._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserList;
