const ticketCollection = require("../tickets");

// ticket selling collection.

exports.sellSingleTicket = (req, res) => {
  const { username, price } = req.body;
  const ticket = ticketCollection.create(username, price);
  res.status(201).json({
    message: "Create ticket succesfully",
    ticket,
  });
};

exports.sellBulkTicket = (req, res) => {
  const { username, price, quintity } = req.body;
  const tickets = ticketCollection.createBulk(username, price, quintity);
  res.status(201).json({
    message: "Create all ticket succesfully",
    tickets,
  });
};

// get controllers

exports.findAll = (req, res) => {
  const tickets = ticketCollection.find();
  res.status(200).json({
    item: tickets,
    total: tickets.length,
  });
};

exports.findById = (req, res) => {
  const { id } = req.params;
  const ticket = ticketCollection.findById(id);
  if (!ticket) {
    return res.status(404).json({
      message: "404 Not found",
    });
  }
  res.status(200).json(ticket);
};

exports.findByUsername = (req, res) => {
  const { username } = req.params;
  const tickets = ticketCollection.findByUsername(username);
  if (!tickets) {
    return res.status(404).json({
      message: "404 Not found",
    });
  }
  res.status(200).json(tickets);
};

// update method

exports.updateById = (req, res) => {
  const { id } = req.params;
  const ticket = ticketCollection.updateById(id, req.body);
  if (!ticket) {
    return res.status(404).json({
      message: "404 Not found",
    });
  }
  res.status(201).json({
    message: "ticket Update succesfully",
    ticket,
  });
};

exports.updateBulk = (req, res) => {
  const { username } = req.params;
  const ticket = ticketCollection.updateBulk(username, req.body);
  if (!ticket) {
    return res.status(404).json({
      message: "404 Not found",
    });
  }
  res.status(201).json({
    message: "Update succesfully",
    ticket,
  });
};

exports.deleteById = (req, res) => {
  const { id } = req.params;
  const deleted = ticketCollection.deleteById(id);

  if (deleted) {
    return res.status(200).json({
      message: "Delete succesfully !",
    });
  }

  res.status(400).json({
    message: "Delete operation feild",
  });
};

exports.deleteBulk = (req, res) => {
  const { username } = req.params;
  const deleted = ticketCollection.deleteBulk(username);
  if (deleted) {
    return res.status(200).json({
      message: "Delete succesfully !",
    });
  }

  res.status(400).json({
    message: "Delete operation feild",
  });
};

exports.winner = (req, res) => {
  const { wc } = req.query ?? 3;

  const winner = ticketCollection.draw(wc);
  res.status(200).json(winner);
};
