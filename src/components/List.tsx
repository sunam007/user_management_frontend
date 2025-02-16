import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Label,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put("http://localhost:8000/api/v1/users", {
        ...formData,
      });
      // navigate("/users");
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setLoading(false);
    }
  };

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
            <TableHeadCell>Phone</TableHeadCell>
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
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.state}</TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="xs"
                        color="blue"
                        onClick={() => setOpenModal(true)}
                        // onClick={() => deleteUser(user?._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="xs"
                        color="failure"
                        onClick={() => deleteUser(user?._id)}
                      >
                        Delete
                      </Button>
                    </div>
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
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>User Details</Modal.Header>
          <Modal.Body>
            {users?.map((user) => (
              <div className="space-y-6">
                <form
                  // onSubmit={handleSubmit}
                  className="flex max-w-md flex-col gap-4"
                >
                  <div>
                    <Label htmlFor="name" value="Name" />
                    <TextInput
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      shadow
                      defaultValue={user.name}
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" value="Email" />
                    <TextInput
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      required
                      shadow
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="PHONE" value="Phone" />
                    <TextInput
                      id="phone"
                      type="text"
                      placeholder="+880 123 1234"
                      required
                      shadow
                      value={user.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" value="City" />
                    <TextInput
                      id="city"
                      type="text"
                      placeholder="..."
                      required
                      shadow
                      value={user.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" value="State" />
                    <TextInput
                      id="state"
                      type="text"
                      placeholder="..."
                      required
                      shadow
                      value={user.state}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" value="Country" />
                    <TextInput
                      id="country"
                      type="text"
                      placeholder="..."
                      required
                      shadow
                      value={user.country}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Edit User"}
                  </Button>
                </form>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button color="blue" onClick={() => setOpenModal(false)}>
              Confirm Edit
            </Button>
            <Button color="failure" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default UserList;