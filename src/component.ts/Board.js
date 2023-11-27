/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  PresentDataOnBasisOfStatus,
  groupedTicketsByPriority,
  groupedTicketsByUser,
  presentDataOnBasisOfStatus,
  sortInDescendingOrderOfPriority,
  sortOnBasisOfTitle,
} from "./utils";
import Card from "./Card";

const Board = () => {
  const [boardData, setBoardData] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedPriority, setSelectedPriority] = useState("SortPriority");

  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then(function (response) {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      });
  }, []);

  useEffect(() => {
    console.log(selectedPriority, selectedStatus);

    if (selectedStatus === "Status" && selectedPriority === "SortPriority") {
      if (presentDataOnBasisOfStatus(tickets)) {
        setBoardData(
          sortInDescendingOrderOfPriority(presentDataOnBasisOfStatus(tickets))
        );
      }
    }
    if (selectedStatus === "Status" && selectedPriority === "Title") {
      setBoardData(sortOnBasisOfTitle(presentDataOnBasisOfStatus(tickets)));
    }
    if (selectedStatus === "User" && selectedPriority === "SortPriority") {
      setBoardData(
        sortInDescendingOrderOfPriority(groupedTicketsByUser(tickets, users))
      );
    }
    if (selectedStatus === "User" && selectedPriority === "Title") {
      setBoardData(sortOnBasisOfTitle(groupedTicketsByUser(tickets, users)));
    }
    if (selectedStatus === "Priority" && selectedPriority === "SortPriority") {
      setBoardData(
        sortInDescendingOrderOfPriority(groupedTicketsByPriority(tickets))
      );
    }
    if (selectedStatus === "Priority" && selectedPriority === "Title") {
      setBoardData(sortOnBasisOfTitle(groupedTicketsByPriority(tickets)));
    }
  }, [tickets, users, selectedStatus, selectedPriority]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedStatus(selectedValue);
  };

  const handleSelectChangeOrdering = (event) => {
    const selectedValue = event.target.value;
    setSelectedPriority(selectedValue);
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div style={{border:'2px solid green', borderBottom:'none'}}>
      <div
        style={{ backgroundColor: "grey", height: "6vh", textAlign: "left" }}
      >
        <button onClick={handleOpen}>Dropdown</button>
        {open ? (
          <div>
              <select
                id="selectStatus"
                value={selectedStatus}
                onChange={handleSelectChange}
              >
                <option value="Status">Status</option>
                <option value="User">User</option>
                <option value="Priority">Priority</option>
              </select>
            <select
              id="selectPriority"
              value={selectedPriority}
              onChange={handleSelectChangeOrdering}
            >
              <option value="SortPriority">Priority</option>
              <option value="Title">Title</option>
            </select>
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex" }}>
        {boardData?.map((group, index) => (
          <div key={index}>
            {/* <p style={{ color: "green" }} >{group[selectedStatus]}</p> */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "2vw",
                justifyContent: "space-between",
                alignItems:'center'
              }}
            >
              <p>
                <input type="radio"></input>
                {group[selectedStatus]}
              </p>
              <p>
                <button style={{ backgroundColor: "white", border: "none" }}>
                  +
                </button>{" "}
                <button style={{ backgroundColor: "white", border: "none" }}>
                  ...
                </button>
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              {group?.tickets?.map((ticket) => (
                <>
                  <Card heading={ticket.id} text={ticket.title} />
                </>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
