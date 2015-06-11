$(document).ready(function() {

  var photos_list = []

  $.ajax({
    url:'https://api.instagram.com/v1/media/popular?client_id=7e037b86dcaf4250ad4bf0f36c8df5ae&count=5',
    dataType: 'jsonp',
  }).done(function (response) {
    photos_list = response
    $.each(response.data, function (key, photo) {
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