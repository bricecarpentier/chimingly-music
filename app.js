/**
 * Chimingly Music
 * app.js
 * @author Amarsingh
 * @description Main file entry to implement minimal, functional backend for Audio library/player.
 */

 // Import the modules
 var express = require('express');
 var AWS = require('aws-sdk');
 var request = require('request');
 var utils = require('./utils');

// We'll use dotenv to read .env vars into Node
require('dotenv').config();

// Runtime variables
 var awsAccessKeyId = utils.getAWSSecret('access-id');
 var awsSecretAccessKey = utils.getAWSSecret('access-key');
 var metadataAPIKey = utils.getLastFmKey();

 // First, initialize an express app
var app = express();

app.use(express.static(__dirname+"/public"));
app.use(express.json());

// Setup the default route to serve our music library
app.get('/', function(req, res) {
  // TODO authenticate the Request
	return res.redirect('/public/index.html');
});

app.listen(5050, () => {
  console.log('Chimingly Music listening on port 5050!');
});

// Configure AWS
AWS.config.update({
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey
});

// Initialize S3 client
var S3 = new AWS.S3({ apiVersion: '2006-03-01' });

/****** GET APIs ******/

/**
 * GET Album List, from S3
 */
app.get('/api/beta/albumlist', (req, res) => {
  // TODO authenticate the Request

  let params = {
    Bucket: 'chimingly-documents',
    Key: 'albums.json'
  };

  S3.getObject(params, (s3err, s3res) => {
    if(s3err) {
      res.send(s3err);
    }
    else {
      res.send(s3res.Body.toString('utf-8'));
    }
  });
});

/**
 * GET Track List, from S3
 */
app.get('/api/beta/tracklist', (req, res) => {
  // TODO authenticate the Request

  let params = {
    Bucket: 'chimingly-documents',
    Key: 'tracks.json'
  };

  S3.getObject(params, (s3err, s3res) => {
    if(s3err) {
      res.send(s3err);
    }
    else {
      res.send(s3res.Body.toString('utf-8'));
    }
  });
});

/**
 * GET Album details, from S3, such as track list etc. of the requested album
 */
app.get('/api/beta/album', (req, res) => {
  // TODO authenticate the Request
  res.send('[WIP] This is ALBUM detail api.');
});

/**
 * GET Stream a Track, from S3
 */
app.get('/api/beta/playtrack', (req, res) => {
  // TODO authenticate the Request
  res.send('[WIP] This is PLAY TRACK api.');
});

/**
 * GET Track Metadata, from Last.fm API
 */
app.get('/api/beta/trackmetadata', (req, res) => {
  // TODO authenticate the Request

  var artist = utils.encodeSpaceForURI(req.query.artist);
  var track = utils.encodeSpaceForURI(req.query.track);

  if(!artist || !track) {
    res.send({error: 1, message: 'Artist and Track are required.'});
  }

  let url = utils.prepareMetadataURI(metadataAPIKey, artist, track);

  request(url, (err, response, body) => {
    if(err) {
      res.send(err);
    }

    const trackdata = JSON.parse(body);

    // Build Track Metadata
    let metadata = {
      title: trackdata.track.name,
      duration: trackdata.track.duration,
      artist: trackdata.track.artist.name,
      album: trackdata.track.album.title,
      artwork: trackdata.track.album.image[3]['#text'] // TODO parse properly
    };

    res.send(metadata);
  });
});

/****** POST APIs ******/
