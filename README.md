# chimingly-music :musical_note:
## Description
Minimal, functional Audio library/player written in Node.js with Express and React.

## Cloning the repo
You can clone the repo to run the server locally.<br>
`git clone https://github.com/amarsiingh/chimingly-music.git`<br>
Alternatively, you can use GitHub Desktop app.

## Running Chimingly Music Server
After cloning, make sure you've installed the node package dependencies.<br>
Then you can run the node server as follows:<br>
`node app.js`<br>
Chimingly Music server listens on Port `5050` of `localhost`<br>

You can visit the default route to try out the web services, by typing following address in your browser:<br>
`localhost:5050`


## Web Services
**Album List** `/api/beta/albumlist`<br>
GET Album List.<br>
Fetches JSON formatted Album list from Amazon S3 network storage.


**Track List** `/api/beta/tracklist`<br>
GET Track List.<br>
Fetches JSON formatted Track list from Amazon S3 network storage.

**Track Metadata** `/api/beta/trackmetadata`<br>
GET Track Metadata.<br>
Attempts to request and return Track information metadata for a track on Last.fm using the artist/track name.
```
var options = { method: 'GET',
  url: 'http://localhost:5050/api/beta/trackmetadata',
  qs: { artist: 'Michael%20Jackson', track: 'Thriller' },
  headers: 
   { 'Content-Type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body); // Thriller track's metadata
});
```


**Album detail** `/api/beta/album`<br>
GET Album Detail.<br>
[WIP] Fetches Album details, such as track list etc. of the requested album Id.

**Play Track** `/api/beta/playtrack`<br>
GET Play Track.<br>
[WIP] Stream requested Audio Track from Amazon S3 network storage.

## Authors

* **Amarsingh Pardeshi** - [@amarsiingh](https://github.com/amarsiingh)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
