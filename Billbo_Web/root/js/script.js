$(function(){
	 Parse.$ =jQuery;
   Parse.initialize("i9wX7OIo1oZYtxazeKlLI2v5sF8RIC3dTjnKN0N6", "Gx12xBwdbLotBs0BrFAbFSGMfvJfKRDOKsBrhuzg");
   

   var Instachecks = Parse.Object.extend("Instachecks");
   var instacheck = new Instachecks();
   var query = new Parse.Query(instacheck);
   var users = localStorage.getItem( "user");
   
   $(".sign").show();
   $(".log").hide();
   $("#myaccount").hide();
   $("#home").show();
   $(".form-signin").on("submit",function(e){
    e.preventDefault();
      var data = $(this).serializeArray();
      username = data[0].value;
      password = data[1].value;
      Parse.User.logIn(username,password, {
        success: function(user) {
          localStorage.setItem( "user", username );
          window.location.reload();

        }
      })//end of Login success
    })//end of form submit;
    
    $(".form-signup").on("submit",function(e){
    e.preventDefault();
      var data1 = $(this).serializeArray();
      username = data1[0].value;
      password = data1[1].value;
      var user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.signUp(null, {
        success: function(user) {
          alert("Hi" + username +", welcome to Billbo~");
           Parse.User.logIn(username,password, {
               success: function(user) {
                 localStorage.setItem( "user", username );
                 window.location.reload();

               }
      })//end of Login success
          
        },
        error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
        }
      });
    });//end of sign up function;
    //end of sign up;

    var currentUser = Parse.User.current();
    if (currentUser) {
      console.log(users);
      var users = localStorage.getItem( "user");
      $(".log").text("Welcome, "+users);
      $(".log").show();
      $(".sign").hide();
      // $("#myaccount").show();
      // $("#home").hide();
    } else  {
      $(".sign").show();
      $(".log").hide();
      $("#account").hide();
    }//end of current user
    $(".homebutton").click(function(){
      $("#myaccount").hide();
      $("#home").show();
    })
    $(".loguout a").click(function(){
      localStorage.removeItem("user");
      Parse.User.logOut();
      $(".sign").show();
      $(".log").hide();
      $("#account").hide();
    })//end of log out

    $(".homebutton").click(function(){
      $("#myaccount").hide();
      $("#home").show();
    })

    $("#account").click(function(){
      $("#myaccount").show();
      $("#home").hide();
    })
    if(!$('#Alllist').value){
      $('#Alllist').append("<div class='add'>Sorry, there is no check in your accout. Please add your check and enjoy the billbo.<br><button class='btn btn-custom pull-right' id='AddTbtn'>Add Check!</button><br><hr></div>");
    }else{
      $('.add').remove();
    }//check if check exist

    $('#AddTbtn').click(function(){
      location.href="check.html";
    })
     $('#AddTbtn2').click(function(){
      location.href="check.html";

    })//goto check page;

    
    //animation
    function getTop(div){
    var top = $(document).scrollTop();
    if($(document).scrollTop()>121){
      $(".gap1").animate({
        top:'0px',
        opacity:1
      },1000);
      $(".gap2").delay(200).animate({
        top:'0px',
        opacity:1
      },1000);
      $(".gap3").delay(400).animate({
        top:'0px',
        opacity:1
      },1000);
      $(".gap4").delay(600).animate({
        top:'0px',
        opacity:1
      },1000);
    } else{
        
    }
    setTimeout(getTop);
  }
  
     getTop();
    //end of animate;
    query.equalTo("username", users);
    query.find({
          success:function(result){
              for (var i = 0; i < result.length; i++) { 
                   var object = result[i];
                   var     dv = ' <div id="list" class="list'+i+'">',
                           dv1='</div>',
                           tx=' <div id="tax" class="tax'+i+'"><strong>Tax:</strong><p>',
                           tx1='</p></div>',
                           tt='<div id="total" class="total'+i+'"><strong>Total:</strong><p>',
                           tt1='</p></div>';
                           itm ='<div class="items" id="items'+i+'"></div><div class="price" id="price'+i+'"></div>';
                   // $('#Alllist').append(' <div id="list" class="list'+i+'"><ul class="items'+i+'"></ul><ul class="price'+i+'"></ul><div class="tax'+i+'"></div><div class="total'+i+'"></div></div>');
                   (function($) {
                          $('#Alllist').append(dv + itm + '<hr>' +tx +tx1 +tt+tt1 +dv1);
                          var items = object.get('items');
                          var price = object.get('price');
                          var tax = object.get('tax');
                          var total = object.get('total');
                          var image = object.get('image');
                          $('.modal-sm').append('<div class="modal-content imgcontent imgcontent'+i+'"></div>')
                          $('.imgcontent'+i+'').append('<img src="'+image+'" >');
                  function callitem(object,div){
                    var ul = '<ul id="list" class="'+i+'">',
                        ul1= '</ul>',
                        m = []
                    for (s = 0; s < object.length; s ++){
                      m[s] = '<li>' + object[s] + '</li>';
                    }  
              
                    document.getElementById(div).innerHTML =ul+m+ul1;
                    var list = document.getElementById(div).innerHTML;
                    $(div).text(list);
                    var res = list.replace(/,/g, " "); 
                    document.getElementById(div).innerHTML = res;   
                    }

                    callitem(items,'items'+i+'');
                    callitem(price,'price'+i+'');
                    $('.tax'+i+' p').text(tax);
                    $('.total'+i+' p').text(total);
                    $(".list1").hide();


              })(jQuery);                 
              } //end of ul creat;

                   page = 0;
                   if(page>=result.length){
                    page=result.length;
                   }else if(page<0){
                    page=0;
                   }
                    $('.imgcontent'+page+'').show();
                    $('.imgcontent'+page+'').siblings().hide();
                    $('.list'+page+'').show();
                    $('.list'+page+'').siblings().hide();
                     if(page<result.length&&page>=0){
                      $(".button1").click(function(){
                          page= page+ 1;
                          if(page>=result.length){
                          page=result.length-1;
                          }
                         $('.imgcontent'+page+'').show();
                         $('.imgcontent'+page+'').siblings().hide();
                         $('.list'+page+'').siblings().hide();
                         $('.list'+page+'').show();  
                      });
                      $(".button2").click(function(){
                        page= page- 1;
                         if(page<0){
                          page=0;
                          }
                         $('.imgcontent'+page+'').show();
                         $('.imgcontent'+page+'').siblings().hide();
                         $('.list'+page+'').siblings().hide();
                         $('.list'+page+'').show();  
                      })
                      //end of change page function;

                     }
          }
    })//end of query find;
    








});