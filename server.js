// Initialise the bot
var Twit = require('twit')

const fs = require( 'fs' ),
      path = require( 'path' ),
      start = "1/20/2022",
      config = require( path.join( __dirname, 'config.js' ) );

const T = new Twit( config );

function tweetRandomImage(){
  // Find and log the number of days since start
  const today = new Date();
  const days = Math.floor((today - new Date(start)) / (1000 * 3600 * 24));
  console.log(days + " days since start.")

  // Read the content of the images folder.
  fs.readdir( __dirname + '/images', function( err, files ){
    if ( err ){
      console.log( 'error:', err );
      return;
    }
    else{
      let images = [];
      files.forEach( function( f ){
        images.push( f );
      } );

    // Pick an image.
    console.log( 'Opening an otter' );

    const imagePath = path.join( __dirname, '/images/otter (' + days + ').jpg' ),
    imageData = fs.readFileSync( imagePath, { encoding: 'base64' } );

    // Upload the image to Twitter.

    console.log( 'Uploading an otter:', imagePath );

    T.post( 'media/upload', { media_data: imageData }, function ( err, data, response ){
        if ( err ){
          console.log( 'error:', err );
        }

        else{
          //Add image description.
          const image = data;
          console.log( 'Otter uploaded, adding description' );

          T.post( 'media/metadata/create', {
            media_id: image.media_id_string,
            alt_text: {
              text: 'A very cute otter :)'
            }
          }, function( err, data, response ){

            /* And finally, post a tweet with the image. */
            T.post( 'statuses/update', {
              status: 'Otter ' + days,
              media_ids: [image.media_id_string]
            },
            function( err, data, response){
              if (err){
                console.log( 'error:', err );
              }
              else{
                console.log( 'Posted a otter!' );
              }
            } );
          } );
        }
      } );
    }
  } );
}
// Run the bot
tweetRandomImage();

//Run the bot once every set time
//setInterval( function(){
//    tweetRandomImage();
//}, 10000 );
