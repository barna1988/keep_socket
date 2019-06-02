let noteModel = require('./notes.entity');
let uuidv1 = require('uuid/v1');

const shareNotes = (notes, userId) => {

  return new Promise((resolve, reject) => {

    try {

      let noteList = [];
      let userIDList = [];

      if (!notes || !notes.title) {
        let note = new noteModel({
          id: uuidv1()
        });

        noteList.push(note);
        userIDList.push(userId);

      }

      const dataToUpdate = {
        $push: {
          sharedTo: userIDList
        }
      };

      const notesToFind = {
        id: { $in: noteList }
      };

      const options = {
        multi: true,
        overwrite: true
      };

      noteModel.update(notesToFind, dataToUpdate, options, (error, data) => {

        resolve({
          message: "Shared Successfully",
          status: 201
        });

      });

    } catch (error) {
      reject({
        message: "Error occured" + error.message,
        status: 500
      });
    }


  });
};

const getNoteForUserID = (userID) => {
  // console.log('getting note for userID : ', userID);

  return new Promise((resolve, reject) => {

    noteModel.find({id: uuidv1()} , (error, notes) => {
      
      if (error) {
        reject({
          message: 'Error while getting notes',
          status: 500
        });
      } else {
        resolve({
          message: 'Get all the notes',
          status: 200
        });
      }

    });

    resolve({
      message: 'Get all the notes',
      status: 200
    });

  });
};



module.exports = {
  shareNotes,
  getNoteForUserID
}