# Free-Code-Camp-Random-Quote-Machine
This folder contains the source files for the <a href="https://www.freecodecamp.com/challenges/build-a-random-quote-machine">Random Quote Machine Free Code Camp Project</a> <a href="https://codepen.io/FreeCodeCamp/full/ONjoLe/">from the this template.</a>

Link to the <a href="http://codepen.io/joshpas4991/full/JbqXwp/">codepen.</a>

The main premise of this project was to learn to build a <strong>dynamic, front-end</strong> webpage through the use of the
<ul>
<li>API Calls Through the WordPress Quote API</li>
<li>Twitter Web Intents</li>
<li>Loading Ajax functions and Code</li>
<li>Various javascript and jQuery library functions</li>
<li>Using more built-in HTML and CSS libraries to make a slicker, modern webpage, through the use of icon elements with &lt i &gt  tags</li> 
</ul>

The easiest I began this project was by setting up a setting the default CSS styles and skeletons with <a href="http://getbootstrap.com/css/">bootstrap</a> and the bootswatch <a href="https://bootswatch.com/slate/">Slate Template</a>. These can be added down below when clicking on the CSS settings icon <img src="http://image.flaticon.com/icons/svg/17/17214.svg" width="10" height="10"> from either a direct link or through the dropdown menu.

To be able to put icon `<i class=""></i>` tags and other glyphicon or font-awesome styles or icons. Go to the HTML settings icon <img src="http://image.flaticon.com/icons/svg/17/17214.svg" width="10" height="10"> in the Codepen Editor. Down below in the "Stuff for `<head>` element" section, insert this code:
```html
<link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<meta name="viewport" content="width=device-width, initial-scale=1">
```
First link is to some common <a href="http://www.w3schools.com/icons/">generic icons from <strong>W3 Schools</strong></a>.
The second link is to many other common icon elements from the <a href="http://fontawesome.io/icons/">font-awesome library</a>.
The third tag is just for setting some default <em>viewport</em> and <em>viewing</em> settings.

Code for cut-shortcut icon <img src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_content_cut_48px-128.png" height="10" width="10">, left-quote icon <img src="https://image.freepik.com/free-icon/quote-left_318-42188.jpg" height="10" width="10"> , right-quote icon <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Quote_right_font_awesome.svg/512px-Quote_right_font_awesome.svg.png" height="10" width="10">, twitter icon <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/twitter-128.png" height="15" width="15">, and like icon <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/70801-200.png" height="15" width="15">; respectively:
```html
<i class="fa fa-cut"></i>
<i class="fa fa-quote-left"></i>
<i class="fa fa-quote-right"></i>
<i class="fa fa-twitter"></i>
<i class="fa fa-thumbs-up></i>
```
The more custom icons, such as the like and twitter icon were from the <strong>font-awesome CSS library</strong>

Once all the skeleton and placeholder code for your <strong>HTML</strong>, <strong>CSS</strong>, and <strong>jQuery or JavaScript</strong> is in place, you can add the code to generate new quotes on the click of a button through the accessing the <a href="https://quotesondesign.com/api-v4-0/">WordPress Quotes on Design API</a> using <a href="http://www.w3schools.com/jquery/jquery_ref_ajax.asp">AJAX</a> (this is so the page can access the API and JSON objects and load them without having to reload the whole page!). This will be done using <em>Javascript</em> or more easily the <strong>jQuery event handling library</strong>. Overall the jQuery code will look something like this:
```javascript
$("#randomButtonId").on("click",function(e){ //Sekect the button for random quotes by its UNIQUE id attribute and activate this function 
                                              // a click event
e.preventDefault();
//Use ajax for the API call by loading this dictionary, object, or JSON object into its parameters
//The format for $.ajax() method call is a JSON object in the format { url: "a string representing the HTTP API request with all needed
//parameters loaded in", 
//success: function(data),
// Function representing what to do with the JSON object returned upon a successful HTTP API Query
// cache: boolean}
//Whether or not to cache the data
$.ajax({
  url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
  //Go to quotesondesign URL generate and return random quotes in the form of a JSON object(s).
    //wp-json denotes that we want a JSON object returned or an array of them
    //posts? the '?' character denotes the start of entering API parameters in our API function call
    //filter[orderby] means filter the list of quotes by order
    //=rand means give the parameter field of the API call this value (in this case, 'order' the quotes 'randomly')
    //&filter[posts_per_page]=1 means display only 1 post per page in HTTP response, 
    //Note if you have multiple parameters to set, before entering the next field to set, precede it with a '&' character
 success: function(data){      //Function to do any handling with the JSON object returned as a response
    var post = data.shift(); //Our JSON response is actually a list of quote JSON objects so if they are always generated at random just
                            // the first one with the .shift() fn.
    $("#quote-title-ID").text(post.title); //Select the title element either an <h1> element or its own <div> and set it to post's title
                                          // by accessing its 'title' field
    $("#quote-content-ID").html(post.content); //Repeat the same process for the element (either a <p> or <div> element) through post's
        //'content' field, (I and the example code on the wordpress site use the .html() element rather than .text() because the quote 
        // might have additional formatting in the form of having <strong>, <em> or other formatting tags.
    // If the Source is available, use it. Otherwise hide it or use placeholder text
    if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source:' + post.custom_meta.Source); //Get element where the quote-source is to be placed by its id
                                                        //attribute and set it to the post's source field
        } 
   else { //Usually the quote source is in a separate element, likely nested in the same block that has the quote-title and 
          //quote-content elements. For sources likely in a <footer> or <cite> element
          $('#quote-source').text("Unknown Source"); //PlaceHolder Text
        }
 },
 cache: false //No need to cache or save quotes displayed since they are to be changed at random anyway
});
});
```
More detailed referene can be found at the <a href="http://v2.wp-api.org/">Wordpress API site</a> or <a href="http://codepen.io/chriscoyier/pen/MwaXpq">example codepen</a>. Official WordPress example code with explanation <a href="https://quotesondesign.com/api-v4-0/ ">here</a>.

So now, you can generate random quotes. Now it is time to integrate Twitter!
In the example project, like in many other sites, when click on the tweet <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/twitter-128.png" height="15" width="15"> icon, you go to a page with a tweet update with <strong>the text for the status update and any other mentions and hashtags pre-loaded</strong> regardless if you are <em>signed in or not!</em>. If you are not signed in, the <strong>Sign In</strong> or <strong>Sign Up</strong> button is down below. This is done using a link or `<a href="hyperlink"></a>` to a <a href="https://dev.twitter.com/web/intents">Twitter Web Intent</a> in the form of a <a href="https://dev.twitter.com/web/tweet-button/web-intent">Tweet Update Status or ReTweet Intent</a> 

The link to the web intent itself links to a an empty tweet. We can add in HTTP parameters by adding a `?` at the end of URL. To have a tweet pre-filled with status update text, reTweet form, mentions, hastags, or links of your choosing, link to the web intent using
```
https://twitter.com/intent/tweet?text=status_text&url=ENCODED_URL&via=TWITTER_HANDLE&hastags=hash1,hash2,hash3,etc&in_reply_to=TWEET_ID&related=COMMA_SEPARATED_LIST_OF_TWITTER_USERNAMES_RELATED
```
Obviously not all fields, if any, have to be set only the ones of your choosing for the tweet web intent, although for some HTTP requests, especially certain `GET` and `POST` requests will have required fields.
