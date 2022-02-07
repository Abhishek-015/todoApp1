import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import Input from "./todoInputField";
import List from "./todoList";
import Pagination from "./todoPagination";

const Todo = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => getData(), [page]);

  useEffect(() => text && postData(), []);

  

  //get paginated  data from json server
  const getData = () => {
    fetch(
      `http://localhost:3001/data/?_page=${page}&_limit=4&_sort=createdAt&_order=desc`
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  //posting data to json server
  const postData = (data) => {
    fetch("http://localhost:3001/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        getData();
        console.log("post completed");
      })
      .catch((err) => console.log("error in posting the data", err.message));
  };

  //deleting data from json server
  const deleteData = (id) => {
    fetch(`http://localhost:3001/data/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => getData())
      .catch((err) => console.log(err.message));
  };

  //updating data to server
  const updateData = (id, status) => {
    setLoading(true);
    fetch(`http://localhost:3001/data/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
    })
      .then((res) => res.json())
      .then((res) => setLoading(false))
      .catch((err) => setLoading(false));
  };

  const handleText = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: text,
      id: uuid(),
      status: false,
      createdAt: new Date().toString(),
    };
    for (let el of data) {
      if (data.length && el.title === text) {
        alert(`Item with name "${text}" already exist`);
        var found = true;
        break;
      }
    }
    if (!found) {
      postData(payload);
    }
    setText("");
  };

  const handleDelete = (key) => {
    deleteData(key);
  };

  const handleStatus = (key) => {
    const item = data.filter((el) => el.id === key);
    const filterItem = item[0];
    filterItem.status = !filterItem.status;
    updateData(key, filterItem);
  };

  return loading ? (
    <h4 className="text-center">Loading...</h4>
  ) : (
    <>
      <div className="container">
        <h1 className="text-center mt-3 mb-5 text-primary title">Todo Application</h1>
        <form onSubmit={handleSubmit}>
          <div className="container justify-content-md-center w-50">
            <div className="row  justify-content-md-center mt-5">
              <Input value={text} handleChange={handleText} />
              <div className="col col-lg-2">
                <button
                  type="submit"
                  className="btn btn-outline-primary py-2 px-4 addBtn "
                  disabled={!text}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="container justify-content-md-center" style={{width:"65%"}}>
          <div className="row  justify-content-md-center my-10">
            <ol className="list-group mt-5">
              {data.map((el) => (
                <List
                  key={el.id}
                  id={el.id}
                  title={el.title}
                  status={el.status}
                  createdAt={el.createdAt}
                  handleDelete={handleDelete}
                  handleStatus={handleStatus}
                />
              ))}
            </ol>
          </div>
        </div>
        <div className="container justify-content-md-center w-50">
          <div className="row  justify-content-md-center my-10">
            <div className="col text-center m-5">
              <Pagination
                page={page}
                setPage={setPage}
                dataSize={data.length}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
