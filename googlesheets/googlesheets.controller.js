const { google } = require('googleapis');

exports.getUsers = async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json", //the key file
        scopes: ["https://www.googleapis.com/auth/spreadsheets"], 
    });

    //Auth client Object
    const authClientObject = await auth.getClient();
    
    //Google sheets instance
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

    // spreadsheet id
    const spreadsheetId = "1-9Zjv0iCfa-erQmi9-TSf7N422Vb788wnESNPuFeOGc";

    // Get metadata about spreadsheet
    // const sheetInfo = await googleSheetsInstance.spreadsheets.get({
    //     auth,
    //     spreadsheetId,
    // });

    // //Read from the spreadsheet
    // const readData = await googleSheetsInstance.spreadsheets.values.get({
    //     auth, //auth object
    //     spreadsheetId, // spreadsheet id
    //     range: "2:2", //range of cells to read from.
    // })
    

    //write data into the google sheets
    const data = await googleSheetsInstance.spreadsheets.values.append({
        auth, //auth object
        spreadsheetId, //spreadsheet id
        range: "2:2", //sheet name and range of cells
        valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
        resource: {
            values: [['Tony', 'Male', '4. Senior', 'FL', 'Math', 'Debate']]
        },
    });
    
    res.status(200).json(data);
}