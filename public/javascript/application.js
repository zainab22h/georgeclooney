$(document).ready(function() {

  var photos_list = []

  $.ajax({
    url:'https://api.instagram.com/v1/media/popular?client_id=7e037b86dcaf4250ad4bf0f36c8df5ae&count=5',
    dataType: 'jsonp',
  }).done(function (response) {
    photos_list = response
    $.each(response.data, function (key, photo) {
      detect(photo);
      $('.list-group').append($
        ("<ul 
        class='photos col-lg-10'>
        <a target='_blank' href='"+photo.link+"'><img src='"+photo.images.standard_resolution.url+"'></a>
          </ul>
          <ul class='attributes col-lg-2'>
          </ul>
        </div>"));
    });
  });

// <div class="row list-group">
//   <ul class="photos col-lg-10">
//     <img src="https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/11410360_782229615208988_328824651_n.jpg">
//   </ul>
//   <ul class="attributes col-lg-2">
//     <li>Gender: Female </li>
//     <li>Race: White</li>
//     <li>Smiling?: :)</li>
//     <li>Age: Between 8 and 17 </li>
//     <li>Glasses: Nope</li>
//   </ul>
// </div>


  var photo_detection = []
  var attribute = 'attribute=glass%2Cgender%2Cage%2Crace%2Csmiling';
  var mashape_key = 'EKimxD2EjcmshZdOcHn0J2jBJOq6p1cSWxLjsn8SWXAZKwMIfZ';

  // Sends photo url to detection server
  // function detect (photo) {
  //   var photo_url = '&url='+photo.images.standard_resolution.url;
  //   $.ajax({
  //     url: 'https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?'+attribute+photo_url,
  //     datatype: 'json',
  //     beforeSend: function(xhr) {
  //     xhr.setRequestHeader("X-Mashape-Key", mashape_key);
  //     }
  //   }).done(function (response) {
  //     photo_detection.push(response);
  //     $.each(response.face, function (key, face) {
  //       append_detection(face);
  //     });
  //   });
  // };



  function append_detection (face) {
    $('.attributes').append($("<li>Gender: "+face.attribute.gender.value+"</li>"));
    $('.attributes').append($("<li>Race: "+face.attribute.race.value+"</li>"));
    $('.attributes').append($("<li>Glasses?: "+face.attribute.glass.value+"</li>"));
    $('.attributes').append($("<li>Smiling?: "+face.attribute.smiling.value+"</li>"));

    console.log(face.attribute.age.range);
    console.log(face.attribute.gender.value);
    console.log(face.attribute.glass.value);
    console.log(face.attribute.race.value);
    console.log(face.attribute.smiling.value);
  }

  // Allows user to hit enter after entering text in the search box
  $('#search-input').keypress(function (event) {
    if (event.keyCode==13)
      $('#search button').click();
  });

  // Searchs whatever text is entered in the search box
  $("#search button").click(function () {
    var search = $('#search-input').val();
    formatted_search = search.replace(/\s+/g, '');
    $(".photos").empty();
    $.ajax({
      url:'http://api.instagram.com/v1/tags/'+formatted_search+
      '/media/recent?client_id=7e037b86dcaf4250ad4bf0f36c8df5ae&count=100',
      dataType: 'jsonp',
    }).done(function(results) {
      var sorted = results.data.sort(function(a, b) { return b.likes.count - a.likes.count });
      $.each(sorted, function (key, photo) {
        $('.photos').append($("<a target='_blank' href='"+photo.link+"'><img src='"+
          photo.images.standard_resolution.url+"'></a>"));
      });
    });
  });


});