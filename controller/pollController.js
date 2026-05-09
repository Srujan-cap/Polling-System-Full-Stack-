const pollService = require('../service/pollService');

exports.createPoll = (req, res) => {
  try {
    const { question, options } = req.body;
    const poll = pollService.createPoll(question, options);
    res.json(poll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPolls = (req, res) => {
  res.json(pollService.getPolls());
};

exports.vote = (req, res) => {
  try {
    const poll = pollService.vote(
      req.params.id,
      req.body.optionIndex
    );
    res.json(poll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};