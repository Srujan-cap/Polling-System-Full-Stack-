const db = require('../data/db');
const Poll = require('../models/pollModel');

class PollService {
  createPoll(question, options) {
    if (!question || options.length < 2) {
      throw new Error('Invalid poll data');
    }

    const poll = new Poll(Date.now(), question, options);
    db.polls.push(poll);
    return poll;
  }

  getPolls() {
    return db.polls;
  }

  vote(pollId, optionIndex) {
    const poll = db.polls.find(p => p.id == pollId);
    if (!poll) throw new Error('Poll not found');

    if (!poll.options[optionIndex]) {
      throw new Error('Invalid option');
    }

    poll.options[optionIndex].votes++;
    return poll;
  }
}

module.exports = new PollService();