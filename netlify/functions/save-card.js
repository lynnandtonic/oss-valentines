const shortid = require('shortid');
const querystring = require('querystring');
const { createClient } = require('@supabase/supabase-js');

// Environment variables managed as part of teh Netlify site.
// To access these automatically during local development you 
// should run the site with `ntl dev`
const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;


exports.handler = async(event, context) => {

  // get the form data and add a unique path id
  const data = querystring.parse(event.body);
  const uniquePath = shortid.generate();
  data.cardPath = uniquePath;

  // Connect to database and save our data
  const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);
  const { savedData, error } = await supabase
    .from('ValentineCards')
    .upsert({
      path: data.cardPath,
      cardVariant: data.cardVariant,
      senderName: data.senderName,
      senderAvatar: data.senderAvatar,
      recipientName: data.recipientName,
      recipientAvatar: data.recipientAvatar,
    });

  if (error) {
    // TODO: make a better error experience
    console.log("Error saving badge data:", error);
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    };
  } else {
    // send the user to their nice new page
    console.log(`Saved: ${JSON.stringify(savedData)}`);
    return {
      statusCode: 302,
      headers: {
        Location: `/card/${data.cardPath}`,
      }
    };
  }
};