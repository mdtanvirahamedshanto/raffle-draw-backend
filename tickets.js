const Ticket = require("./Ticket");
const { readFile, writeFile } = require("./utils/index");

const tickets = Symbol("tickets");

class TicketCollection {
  constructor() {
    (async function () {
      this[tickets] = await readFile();
    }).call(this);
  }

  /**
   * create new ticket
   * @param {string} usename
   * @param {number} price
   * @return {Ticket}
   */
  create(usename, price) {
    const ticket = new Ticket(usename, price);
    this[tickets].push(ticket);
    writeFile(this[tickets]);
    return ticket;
  }

  /**
   * create manay ticket
   * @param {string} usename
   * @param {number} price
   * @param {number} quintity
   * @return {Ticket[]}
   */
  createBulk(usename, price, quintity) {
    const result = [];
    for (let i = 0; i <= quintity; i++) {
      const ticket = this.create(usename, price);
      result.push(ticket);
    }
    writeFile(this[tickets]);
    return result;
  }

  /**
   * return all ticket from db
   */
  find() {
    return this[tickets];
  }

  /**
   * find single ticket from db
   * @param {string} id
   * @return {Ticket}
   */
  findById(id) {
    const ticket = this[tickets].find((ticket) => ticket.id === id);
    return ticket;
  }

  /**
   * find by username ticket from db
   * @param {string} username
   * @return {tickets[]}
   */
  findByUsername(username) {
    const userTickets = this[tickets].filter(
      (ticket) => ticket.username === username
    );
    if (!userTickets) {
      return;
    }
    return userTickets;
  }

  /**
   *ticket update by id
   * @param {string} ticketId
   * @param {{username: string, price:number}} ticketBody
   * @return {ticket}
   */
  updateById(ticketId, ticketBody) {
    const ticket = this.findById(ticketId);
    ticket.username = ticketBody.username ?? ticket.usename;
    ticket.price = ticketBody.price ?? ticket.price;
    writeFile(this[tickets]);
    return ticket;
  }

  /**
   * update bulk ticket
   * @param {string} username
   * @param {{username: string,price:number}} ticketBody
   * @return {Ticket[]} return ticket array
   */
  updateBulk(username, ticketBody) {
    const userTicket = this.findByUsername(username);
    const updateTicket = userTicket.map((ticket) =>
      this.updateById(ticket.id, ticketBody)
    );
    writeFile(this[tickets]);
    return updateTicket;
  }

  /**
   * delete ticket by id
   * @param {string} id
   * @return {boolean}
   */
  deleteById(id) {
    const index = this[tickets].findIndex((ticket) => ticket.id === id);
    if (index === -1) {
      return false;
    } else {
      this[tickets].splice(index, 1);
      writeFile(this[tickets]);
      return true;
    }
  }

  /**
   *
   * @param {string} username
   * @return {{deletedTicket}}
   */
  deleteBulk(username) {
    const userTicket = this.findByUsername(username);
    const deletedTicket = userTicket.map((ticket) =>
      this.deleteById(ticket.id)
    );
    writeFile(this[tickets]);
    return deletedTicket;
  }

  /**
   *
   * @param {number} winnerCount
   * @return {winner[]}
   */
  draw(winnerCount) {
    const winnerIndexs = new Array(winnerCount);
    let winnerIndex = 0;
    while (winnerIndex < winnerCount) {
      let ticketIndex = Math.floor(Math.random() * this[tickets].length);
      if (!winnerIndexs.includes(ticketIndex)) {
        winnerIndexs[winnerIndex++] = ticketIndex;
        continue;
      }
    }
    const winner = winnerIndexs.map((index) => this[tickets][index]);
    return winner;
  }
}

const ticketCollection = new TicketCollection();
module.exports = ticketCollection;
