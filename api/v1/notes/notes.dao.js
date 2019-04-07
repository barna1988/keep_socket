let noteModel = require('./notes.entity');

const shareNotes = (notes, userIds) => {

  return new Promise((resolve, reject) => {

    noteModel.where({
      id: {
        $in: notes
      }
    }).setOptions({
      multi: true,
      overwrite: true

    }).update({
      $push: {
        sharedTo: userIds
      }
    }, (error, data) => {

      //console.log('error in mongoose :', error);
      //console.log('data after update :', data);

      if (error) {
        reject({
          message: "error : " + error.message,
          status: 500
        });
      } else if (data) {

        if (data.nModified > 0 && data.n > 0) {
          resolve({
            message: "data updated for notes : " + notes,
            status: 201
          });
        } else {
          reject({
            message: "No data found for notes : " + notes,
            status: 404
          });
        }
      }
    });

  });
};

const getNoteForUserID = (userID) => {
  // console.log('getting note for userID : ', userID);

  return new Promise((resolve, reject) => {

    noteModel.find({}, (error, notes) => {
      if (error) {
        reject({
          message: 'Error while getting notes',
          status: 500
        });
      } else if (!notes || notes.length === 0) {
        reject({
          message: `No Notes found for userID ${userID}`,
          status: 404
        });
      } else {

        const notesShared = notes.filter(note => {
          return note.sharedTo.find(n1 => n1 === userID);
        });

        // console.log('notes : ' , notesShared);

        resolve({
          message: 'Shared Notes Recieved - ' + notesShared.length,
          status: 200,
          notes: notesShared
        });
        
        
      }
    });

  });
};



module.exports = {
  shareNotes,
  getNoteForUserID
}