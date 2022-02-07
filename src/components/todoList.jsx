import React from "react";

const List = ({ handleDelete, id, title, status, handleStatus, createdAt }) => {
  return (
    <>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <span>
          <span className=" text-primary h6">{title.toUpperCase()}</span>
          <br />
          <span  style={{fontSize:"12px",color:"gray",opacity:"0.6"}}>{createdAt.substring(0,16)} at {createdAt.substring(16,25)}</span>
        </span>
        <span>
          <span className="mx-5">
            {status ? (
              <span className="text-success ">Completed</span>
            ) : (
              <span className="text-danger ">Incomplete</span>
            )}
          </span>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
          <button
            className="btn btn-outline-success btn-sm mx-2"
            onClick={() => handleStatus(id)}
          >
            {status ? "Mark Incomplete" : "Mark Completed"}
          </button>
        </span>
      </li>
    </>
  );
};

export default List;



////    "test": "react-scripts test",