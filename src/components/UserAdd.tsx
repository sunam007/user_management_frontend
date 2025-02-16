import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";

const UserAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/api/v1/users", {
        ...formData,
        password: "A12345",
        image_url: "https://picsum.photos/200",
      });
      navigate("/users");
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
        <div>
          <Label htmlFor="name" value="Name" />
          <TextInput
            id="name"
            type="text"
            placeholder="John Doe"
            required
            shadow
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
            value={formData.email}
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
            value={formData.phone}
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
            value={formData.city}
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
            value={formData.state}
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
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add User"}
        </Button>
      </form>
    </div>
  );
};

export default UserAdd;
