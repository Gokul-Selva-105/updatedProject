import React, { useEffect, useState } from "react";
import "../css/EmployeeList.css";
import "bootstrap/dist/css/bootstrap.min.css"
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
        const processedData = response.data.map((item) => ({
          ...item,
          course: Array.isArray(item.course)
            ? item.course
            : JSON.parse(item.course || "[]"),
        }));
        setFdata(processedData);
        setFilteruser(processedData);
        console.log("Data fetched:", processedData);
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
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "course") {
      setDataList((prevData) => {
        const currentCourses = Array.isArray(prevData.course)
          ? prevData.course
          : [];
        const updatedCourses = checked
          ? [...currentCourses, value]
          : currentCourses.filter((course) => course !== value);
        return { ...prevData, course: updatedCourses };
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
      if (key === "course") {
        formData.append(key, JSON.stringify(dataList[key]));
      } else {
        formData.append(key, dataList[key]);
      }
    }
    try {
      if (!isEdit) {
        await axios.post("http://localhost:3000", formData);
      } else {
        await axios.put(`http://localhost:3000/${dataList._id}`, formData);
      }

      const response = await axios.get("http://localhost:3000");
      const processedData = response.data.map((item) => ({
        ...item,
        course: Array.isArray(item.course)
          ? item.course
          : JSON.parse(item.course || "[]"),
      }));
      setFdata(processedData);
      setFilteruser(processedData);
      setIsOpen(false);
      console.log("Data saved:", processedData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <>
      <h1 className="empL">Employee List</h1>
      <div className="lNave p-4 bg-dark">
        <p className="text-light">Total Count: {fdata.length}</p>
        <button className="btn btn-light" onClick={handleCreate}>
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
        <table className="table table-light table-striped">
          <thead>
            <tr>
              <th className="col">Image</th>
              <th className="col">Name</th>
              <th className="col">Email</th>
              <th className="col">Mobile No</th>
              <th className="col">Designation</th>
              <th className="col">Gender</th>
              <th className="col">Course</th>
              <th className="col">Create Date</th>
              <th className="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteruser.map((datas) => (
              <tr key={datas._id}>
                <td>
                  <img
                    src={
                      `http://localhost:3000` + datas.image ||
                      "default-image-url.png"
                    }
                    alt={datas.name}
                  />
                </td>
                <td className="fs-6 fw-bold">{datas.name}</td>
                <td>{datas.email}</td>
                <td>{datas.phone}</td>
                <td>{datas.position}</td>
                <td>{datas.gender}</td>
                <td>
                  {Array.isArray(datas.course)
                    ? datas.course.join(", ")
                    : datas.course}
                </td>

                <td>{new Date(datas.dob).toLocaleDateString()}</td>
                <td className="fbtns">
                  <button className="m-2 px-4" onClick={() => handleEdit(datas)}>Edit</button>
                  <button className="m-2 px-3" onClick={() => handleDelete(datas._id)}>
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
                <label htmlFor="image text-danger">Image (JPG, PNG)</label>
                <input
                 className="btn btn-secondary"
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
                <span className="gender">
                <span className="male">
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={dataList.gender === "male"}
                  onChange={handleChange}
                />
                </span>
                <span className="femal">
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={dataList.gender === "female"}
                  onChange={handleChange}
                />
                </span>
                </span>
                <label htmlFor="course" className="course">Select Course</label>
                <div className="courseholder">
                  <span className="cb1">
                    <input
                      type="checkbox"
                      id="BCOM"
                      name="course"
                      value="B.Com"
                      checked={dataList.course?.includes("B.Com")}
                      onChange={handleChange}
                    />
                    <label htmlFor="BCOM">B.Com</label>
                  </span>
                  <span className="cb2">
                    <input
                      type="checkbox"
                      id="BCA"
                      name="course"
                      value="BCA"
                      checked={dataList.course?.includes("BCA")}
                      onChange={handleChange}
                    />
                    <label htmlFor="BCA">BCA</label>
                  </span>
                  <span className="cb3">
                    <input
                      type="checkbox"
                      id="Bsc"
                      name="course"
                      value="B.Sc"
                      checked={dataList.course?.includes("B.Sc")}
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
                  className="dataInp"
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
