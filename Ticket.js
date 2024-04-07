const shortid = require("shortid");

class Ticket {
  /**
   * Ticket constructor recive username and price
   * @param {string} username give usename in string
   * @param {number} price give ticket price in number
   * @return {Ticket}
   */
  constructor(username, price) {
    this.id = shortid.generate();
    this.username = username;
    this.price = price;
    this.createdAt = new Date();
    this.updateAt = new Date();
  }
}

module.exports = Ticket;
