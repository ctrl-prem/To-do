const statusArray = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];

export const presentDataOnBasisOfStatus = (tickets) => {
  const x = statusArray.map(status => {
    const statusTickets = tickets.filter(ticket => ticket.status === status);
    return { tickets: statusTickets, Status: status };
  });
  return x
};

export const groupedTicketsByUser = (tickets, users) => users?.map(user => {
  const userTickets = tickets.filter(ticket => ticket.userId === user.id);
  return {
    tickets: userTickets,
    User: user.name
  }
});

export const groupedTicketsByPriority = (tickets) => {
  const priorities = Array.from(new Set(tickets.map(ticket => ticket.priority)));
  const x = priorities.map(priority => {
    const priorityTickets = tickets.filter(ticket => ticket.priority === priority);
    return { tickets: priorityTickets, Priority: mapPriorityToText[priority] };
  });
  return x
}


export const sortInDescendingOrderOfPriority = (groupedData) => {
  groupedData.slice().forEach((item) =>
    item.tickets.sort((a, b) => a.priority - b.priority))
  return groupedData

}


export const sortOnBasisOfTitle = (groupedData) => {
  groupedData.slice().forEach((item) =>
    item.tickets.sort((a, b) => a.title.length - b.title.length))
  return groupedData
}

export const mapPriorityToText = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
}





