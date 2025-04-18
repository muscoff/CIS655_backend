# Backend Installation Setup

To successfully setup the backend, all you need to do is have node.js already installed on your company.

In the terminal, run npm install. This command would install all the packages required to successfully run the backend application.

Locally, the backend is accessible via port 4000.

For API calls, you can make request two request (GET && POST).

All API calls can be made to http://localhost:4000/api/doc for both GET AND POST request.

A GET request made with the correct userid passed as a parameter would fetch all the documents of the user that is stored in Google Cloud Storage.
This first fetch the data from the database and a column within the results returned has the url storage location of the document in cloud storage.

A POST request made with the name of the document been uploaded alongside the userid would save this record information in the database and would later save the file in Google Cloud Storage.