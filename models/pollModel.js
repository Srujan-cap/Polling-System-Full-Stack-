class Poll {
  constructor(id, question, options) {
    this.id = id;
    this.question = question;
    this.options = options.map(opt => ({
      text: opt,
      votes: 0
    }));
    this.createdAt = new Date();
  }
}

module.exports = Poll;