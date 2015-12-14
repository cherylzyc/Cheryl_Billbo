$(function(){
   Parse.$ =jQuery;
   Parse.initialize("i9wX7OIo1oZYtxazeKlLI2v5sF8RIC3dTjnKN0N6", "Gx12xBwdbLotBs0BrFAbFSGMfvJfKRDOKsBrhuzg");
   var Instachecks = Parse.Object.extend("Instachecks");
   var instacheck = new Instachecks();
   

  $("#additem").click(function(){
     $('.addform').append("<li><input type='text id='itemArray' class='form-control' placeholder='item' name='item'required autofocus><input type='text' id='priceArray' class='form-control' placeholder='price' name='price'required></li>");
  });
  $("#deleteitem").click(function(){
     $('.addform li:last-child').remove();
  });
  //end of edit items;

  $(".form-addcheck").on("submit",function(e){
   	e.preventDefault();
      var data = $(this).serializeArray();
      $(data).each(function(i){
        // alert(data[i].value);
        $("#showdata").append('<li>'+'"'+data[i].value+'"'+'</li>');
      })

          var arr = $('#showdata li:nth-child(odd)'),temp = [];
          var arr2 = $('#showdata li:nth-child(even)'),temp2 = [];
          var tx = $('#showdata li:last-child').text();
          var  tx = tx.replace(/\"/g, "");
          var tax = parseFloat(tx);
          // alert(tax);
          var sum = 0;
        for(var i=0; i<(arr.length-1);i++){
          
          var str = arr[i].innerHTML;
          var str2 = "$" + arr2[i].innerHTML;
          var sumtotal = arr2[i].innerHTML;
          sumtotal = sumtotal.replace(/\"/g, "");
          var total= parseFloat(sumtotal);
          str = str.replace(/\"/g, "");
          str2 = str2.replace(/\"/g, "");
          temp.push(str);
          temp2.push(str2);
          sum = sum + total;
        }
        sum = sum + tax;
        // alert(tax+","+sum);
        var currentUser = Parse.User.current();
           var image =  localStorage.getItem( "billimage");
           var id = Parse.User.current().id;
           var query = new Parse.Query(Instachecks);
           var users = localStorage.getItem( "user");
        query.equalTo("objectId", id);
        query.find({
           success: function(results) {  
               // instacheck.save("items",temp);
               // instacheck.set("price",temp2);
               // instacheck.set("tax",tax); 
               // instacheck.set("total",sum); 
               // instacheck.save("username", users);
               instacheck.save({
                 username: users,
                items: temp,
                price: temp2,
                tax: tax,
                total: total,
                image:image,
               },{
                success: function(result) {
    alert("The object was saved successfully."); 
  },
  error: function(result, error) {
    alert("The save failed.");

  }
               });
               instacheck.save();    
               location.href="index.html";
           },
           error: function(error) {
               alert("Error: " + error.code + " " + error.message);
           }
        });
      //end of save record function;
         

       
        
    })//end of add item form submit func
    $(".back").click(function(){
      location.href="index.html";
    })
  var images;
  $('#fileselect').bind("change", function(e) {
      var images = e.target.files || e.dataTransfer.files;
      // Our file var now holds the selected file
      image = images[0];
    });

   $('#uploadbutton').click(function() {
      var serverUrl = 'https://api.parse.com/1/files/' + image.name;

      $.ajax({
        type: "POST",
        beforeSend: function(request) {
          request.setRequestHeader("X-Parse-Application-Id", 'i9wX7OIo1oZYtxazeKlLI2v5sF8RIC3dTjnKN0N6');
          request.setRequestHeader("X-Parse-REST-API-Key", 'LsTOumZlNOzEAQetcYF9Vo7nyqJObrhs9Z6TfHEq');
          request.setRequestHeader("Content-Type", image.type);
        },
        url: serverUrl,
        data: image,
        processData: false,
        contentType: false,
        success: function(data) {
          // alert("File available at: " + data.url);
          localStorage.setItem( "billimage", data.url );
        },
        error: function(data) {
          var obj = jQuery.parseJSON(data);
          alert(obj.error);
        }
      });
    });	

});//end of Jquery

