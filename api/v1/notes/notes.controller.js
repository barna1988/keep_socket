const svc = require('./notes.service');

const shareNotes = (req, res) => {
  try {
    const notes = req.body.notes;
    const userIds = req.body.userId;

    svc.shareNotes(notes, userIds)
      .then((response) => {
        res.status(response.status).send(response);
      }).catch((error) => {
        res.status(error.status).send(error);
      });

  } catch (error) {
    res.status(error.status).send(error);
  }
};

const getNoteForUserID = (req, res) => {
  try {
    const userIds = req.query.userId;
    
    svc.getNoteForUserID(userIds)
      .then((response) => {
        res.status(response.status).send(response);
      }).catch((error) => {
        res.status(error.status).send(error);
      });

  } catch (error) {
    res.status(error.status).send(error);
  }
};

module.exports = {
  shareNotes,
  getNoteForUserID
}