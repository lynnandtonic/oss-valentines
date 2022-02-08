const { createClient } = require('@supabase/supabase-js');
const { builder } = require('@netlify/functions');
const { render } = require('../site/_includes/layouts/base.11ty.js');
const card = require('./partials/card.js');

// Environment variables managed as part of teh Netlify site.
// To access these automatically during local development you 
// should run the site with `ntl dev`
const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;


const handler = async(event) => {

  // get the card ID from the request
  const cardPath = event.path.split("card/")[1];

  // Connect to database and fetch data
  const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);
  const { data, error } = await supabase
    .from('ValentineCards')
    .select('*')
    .eq('path', cardPath)


  console.log(data);

  if (error) {
    // not found or an error, send to the generic error page
    console.log('Error:', error);
    return {
      body: JSON.stringify(error),
      statusCode: 301,
      headers: {
        Location: `/`,
      }
    };

  } else {
    // if found return a view
    console.log(`Render and persist page: ${cardPath}`);

    let pageData = {
      content: card(data[0]),
      pageClass: "view-card view-share"
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: render(pageData)
    }
  }


}

exports.handler = builder(handler);
