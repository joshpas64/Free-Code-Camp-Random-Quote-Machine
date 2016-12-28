$(document).ready(function(){
  var setBackground = function(param){
    if(param === "Unknown Source")
      {
        var background1 = "url(http://previews.123rf.com/images/studiom1/studiom11004/studiom1100400374/6879928-THINKING-Word-collage-on-black-background--Stock-Vector-brain-thinking-idea.jpg)";
        var background2 = "url(http://alchemy-research.com.au/wp-content/uploads/2012/10/alchemy-background.jpg)";
        var rand1 = Math.floor(Math.random() * 2) % 2;
        if(rand1 === 1){
          $("body").css("background-image", background1);
        }
        else
        {
          $("body").css("background-image", background2);
        }
      }
    else
      {
        var imageUrl = "url(";
        var newStr = param.replace("Source: ","");
        switch(newStr)
        {
          case "tweet":
          case "post":
          case "blog":
          case "comment":
          case "site":
          case "website":
            imageUrl = imageUrl + "http://previews.123rf.com/images/foxaon/foxaon1203/foxaon120300373/12927553-Dark-blue-technology-background-Stock-Photo-tech.jpg" + ")";
            break;
          case "Article":
          case "article":
            imageUrl = imageUrl + "http://www.wallpapers4u.org/wp-content/uploads/notepad_pencil_notebook_7745_1920x1080.jpg" + ")";
            break;
          case "interview":
            imageUrl = imageUrl + "http://2.bp.blogspot.com/-TAZylyP_JAY/Uh94Kz5gqVI/AAAAAAAAGBI/X_-UaLtkPvI/s1600/Background-Journalism.jpg" + ")";
            break;
          case "ethos":
          case "drawing":
            imageUrl = imageUrl + "http://www.pixelstalk.net/wp-content/uploads/2016/07/Artsy-Background-HD.jpg" + ")";
            break;
          case "paper":
          case "book":
            imageUrl = imageUrl + "https://classiclitgeek.files.wordpress.com/2010/01/penguinspines.jpg" + ")";
            break;
          default:
            imageUrl = imageUrl + "http://wallpapercave.com/wp/5ATBvZf.jpg" + ")"; 
            break;
        }
        $("body").css("background-image",imageUrl);
      }
  };
  var setColors = function(param)
  {
    var color;
    if(param === "Unknown Source")
      {
        $(".jumbotron").css("color","white");
        color = "purple";
      }
    else
    {
      $(".jumbotron").css("color","black");
    var newStr = param.replace("Source: ","");
    switch(newStr)
    {
      case "drawing":
        color = "#F4EB42";
        break;
      case "site":
        color = "#C1C1B8"
        break;
      case "article":
        color = "#AAEBE2";
        break;
      case "interview":
        color = "#FCC2ED";
        break;
      case "book":
        color = "#A5A7EF";
        break;
      default:
        color = "#ADF7B2";
        break;    
    }
    }
    $(".jumbotron").css("background-color", color);
  };
  
  var adjustStatus = function()
  {
    var urlString = "https://twitter.com/intent/tweet?text=";
    var quoteString = $(".quote-insert").text() + "%0A";
    var authorString = "from " + $(".quote-source").text() + "%0A";
    var hashTags = "&hashtags=front-end-dev,api-calls,quotes-of-awesome";
    urlString = urlString + quoteString + authorString;
    if((quoteString.length + authorString.length) < 100)
      {
        urlString += hashTags;
      }
    urlString = urlString.replace(";","%3B");
    var encoded = encodeURIComponent(urlString)
    $(".twitter-share-button").attr("href",urlString);
  };
  $("#tweeter").on("click",function(){
  //May Save this for the future
  });
  $("#quoteButton").on("click", function(e){
    e.preventDefault();
    $.ajax({
      url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
      success: function(data) {
      var post = data.shift(); // The data is an array of posts. Grab the first one.
        var newString = post.content.replace("<p>","");
        newString = newString.replace("</p>","");
        $(".quote-insert").html("<i class='fa fa-quote-left'></i> " + newString + " <i class='fa fa-quote-right'></i>");
        if (typeof post.custom_meta !== "undefined" && typeof post.custom_meta.Source !== "undefined") {
          $(".quote-source").html("Source: " + post.custom_meta.Source);
        } else {
          $(".quote-source").text("Unknown Source");
        }
        $(".character-count").text(post.content.length + " characters");
        if(post.content.length <= 140)
        {
          $(".character-count").append(": This is automatically tweetable <i class='fa fa-twitter'></i>");
        }
        else
          {
            $(".character-count").append(": This will need to be cut down <i class='fa fa-cut'></i> for tweeting <i class='fa fa-twitter'></i>");
          }
        adjustStatus();
        setColors($(".quote-source").text());
        setBackground($(".quote-source").text());
      },
      cache: false
    });
  });
});
