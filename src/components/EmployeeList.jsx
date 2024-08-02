import React, { useEffect, useState } from "react";
import "../css/EmployeeList.css";
import axios from "axios";

const EmployeeList = () => {
  const [fdata, setFdata] = useState([]);
  const [filteruser, setFilteruser] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataList, setDataList] = useState({
    _id: "",
    image: "",
    name: "",
    email: "",
    phone: "",
    position: "",
    gender: "",
    course: [],
    dob: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        setFdata(response.data);
        setFilteruser(response.data);
        console.log("Data fetched:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filterUsrs = fdata.filter((user) =>
      user.name.toLowerCase().includes(searchText)
    );
    setFilteruser(filterUsrs);
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:3000/${id}`);
    setFdata(response.data);
    setFilteruser(response.data);
  };

  const handleCreate = () => {
    setDataList({
      // _id: "",
      image: "",
      name: "",
      email: "",
      phone: "",
      position: "",
      gender: "",
      course: "",
      dob: "",
    });
    setIsEdit(false);
    setIsOpen(true);
  };

  const handleEdit = (employee) => {
    setDataList(employee);
    setIsEdit(true);
    setIsOpen(true);
  };

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === "image") {
  //     setDataList((prevData) => ({ ...prevData, [name]: files[0] }));
  //   } else {
  //     setDataList((prevData) => ({ ...prevData, [name]: value }));
  //   }
  // };
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === "checkbox") {
      setDataList((prevData) => {
        const updatedCourses = checked
          ? [...prevData.course, value]
          : prevData.course.filter((course) => course !== value);
        return { ...prevData, [name]: updatedCourses };
      });
    } else if (name === "image") {
      setDataList((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setDataList((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    for (const key in dataList) {
      formData.append(key, dataList[key]);
    }

    try {
      if (!isEdit) {
        await axios.post("http://localhost:3000", formData);
      } else {
        await axios.put(`http://localhost:3000/${dataList._id}`, formData);
      }

      const response = await axios.get("http://localhost:3000");
      setFdata(response.data);
      setFilteruser(response.data);
      setIsOpen(false);
      console.log("Data saved:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <>
      <h1 className="empL">Employee List</h1>
      <div className="lNave">
        <p>Total Count: {fdata.length}</p>
        <button className="createEm" onClick={handleCreate}>
          Create Employee
        </button>
      </div>
      <div className="search">
        <input
          type="search"
          name="search"
          placeholder="Search Your Data...."
          onChange={handleSearch}
        />
      </div>
      <div className="tableHolder">
        <table>
          <thead>
            <tr>
              {/* <th>Unique ID</th> */}
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteruser.map((datas) => (
              <tr key={datas._id}>
                {/* <td>{datas._id}</td> */}
                <td>
                  <img
                    src={
                      `http://localhost:3000` + datas.image ||
                      "default-image-url.png"
                    }
                    alt={datas.name}
                  />
                </td>
                <td>{datas.name}</td>
                <td>{datas.email}</td>
                <td>{datas.phone}</td>
                <td>{datas.position}</td>
                <td>{datas.gender}</td>
                <td>{datas.course}</td>
                <td>{new Date(datas.dob).toLocaleDateString()}</td>
                <td className="fbtns">
                  <button onClick={() => handleEdit(datas)}>Edit</button>
                  <button onClick={() => handleDelete(datas._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isOpen && (
          <div className="outer">
            <div className="main">
              <div className="out">
                <h1>{isEdit ? "Edit User" : "Add User"}</h1>
                <span onClick={() => setIsOpen(false)} className="close">
                  &times;
                </span>
              </div>
              <div className="inputs">
                <label htmlFor="image">Image (JPG, PNG)</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/jpeg, image/png"
                  onChange={handleChange}
                />
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={dataList.name}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={dataList.email}
                  onChange={handleChange}
                />
                <label htmlFor="number">Number</label>
                <input
                  type="number"
                  min="10"
                  id="number"
                  name="phone"
                  value={dataList.phone}
                  onChange={handleChange}
                />
                <label htmlFor="position">Position</label>
                <select
                  id="position"
                  name="position"
                  value={dataList.position}
                  onChange={handleChange}
                >
                  <option value="">Select Position</option>
                  <option value="Manager">Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                </select>
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={dataList.gender === "male"}
                  onChange={handleChange}
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={dataList.gender === "female"}
                  onChange={handleChange}
                />
                {/* <label htmlFor="course">Select Course</label>
                <div className="courseholder">
                  <span>
                    <input
                      type="checkbox"
                      id="BCOM"
                      name="course"
                      value="B.Com"
                      checked={dataList.course === "B.Com"}
                      onChange={handleChange}
                    />
                    <label htmlFor="BCOM">B.Com</label>
                    
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      id="BCA"
                      name="course"
                      value="BCA"
                      checked={dataList.course === "BCA"}
                      onChange={handleChange}
                    />
                    <label htmlFor="BCA">BCA</label>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      id="Bsc"
                      name="course"
                      value="B.sc"
                      checked={dataList.course === "B.sc"}
                      onChange={handleChange}
                    />
                    <label htmlFor="Bsc">B.Sc</label>
                  </span>
                  
                </div> */}
                <label htmlFor="course">Select Course</label>
<div className="courseholder">
  <span>
    <input
      type="checkbox"
      id="BCOM"
      name="course"
      value="B.Com"
      checked={dataList.course.includes("B.Com")}
      onChange={handleChange}
    />
    <label htmlFor="BCOM">B.Com</label>
  </span>
  <span>
    <input
      type="checkbox"
      id="BCA"
      name="course"
      value="BCA"
      checked={dataList.course.includes("BCA")}
      onChange={handleChange}
    />
    <label htmlFor="BCA">BCA</label>
  </span>
  <span>
    <input
      type="checkbox"
      id="Bsc"
      name="course"
      value="B.Sc"
      checked={dataList.course.includes("B.Sc")}
      onChange={handleChange}
    />
    <label htmlFor="Bsc">B.Sc</label>
  </span>
</div>

              
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={dataList.dob}
                  onChange={handleChange}
                />
                <button className="saveBtn" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeeList;
