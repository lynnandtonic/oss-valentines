// Get the data for a given badge number and 
// generate an image for it with cloudinary

const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;


const encodeURL = (url) => {
  let b64 = Buffer.from(url.split("?")[0]).toString('base64');
  return b64;
}


const handler = async(event) => {

  // get the card ID from the request
  const cardPath = event.path.split("og/")[1];

  // Connect to database and fetch data
  const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);
  const { data, error } = await supabase
    .from('ValentineCards')
    .select('*')
    .eq('path', cardPath)


  // No custom card on this URL? 
  // Display a generic OG image
  if (!data.length) {
    console.log(`no card found on ${cardPath}`);
    return;
  }

  let cardData = data[0];


  // Fetch a generated image from Cloudinary
  const bgImageUrl = `oss-love/${cardData.cardVariant.replace(".svg",".png")}`;
  const senderName = `c_fit,l_text:Roboto_32:@${encodeURI(cardData.senderName)},g_south_west,w_340,x_780,y_65`;
  const senderAvatar = `l_fetch:${encodeURL(cardData.senderAvatar)},r_max,w_70,g_south_west,x_700,y_48`;
  const recipientName = `c_fit,l_text:Roboto_32:@${encodeURI(cardData.recipientName)},g_south_west,w_340,x_155,y_65`;
  const recipientAvatar = `l_fetch:${encodeURL(cardData.recipientAvatar)},r_max,w_70,g_south_west,x_75,y_48`;

  const ogUrl = `https://res.cloudinary.com/netlify/image/upload/${senderName}/${senderAvatar}/${recipientName}/${recipientAvatar}/${bgImageUrl}`;
  console.log(ogUrl);

  let image;
  try {
    const result = await fetch(ogUrl);
    image = await result.buffer();
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    }
  }

  // return the image directly
  return {
    statusCode: 200,
    headers: {
      'Content-type': 'image/jpeg'
    },
    body: image.toString('base64'),
    isBase64Encoded: true
  }

};

exports.handler = handler;
