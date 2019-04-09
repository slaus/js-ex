'use strict';

$(function() {

  // color effect
  $('.button-pink').mouseover(function() {
    $(this).animate({backgroundColor: 'white', color: '#ff4e50'}, 'fast');
  })
  .mouseout(function() {
    $(this).animate({backgroundColor: '#ff4e50', color: 'white'}, 'fast');
  });
  
  $('.button-white').mouseover(function() {
    $(this).animate({backgroundColor: '#ff4e50'}, 'fast');
  })
  .mouseout(function() {
    $(this).animate({backgroundColor: 'transparent'}, 'fast');
  });
  
  $('.button-invert').mouseover(function() {
    $(this).animate({backgroundColor: '#ff4e50', color: 'white'}, 'fast');
  })
  .mouseout(function() {
    $(this).animate({backgroundColor: 'white', color: '#ff4e50'}, 'fast');
  });
  
  // resize images
  $('.data-img').dataImg({
    sml: 480,
    med: 780,
    lrg: 940,
    resize: true,
    bgImg: true
  });
  
  // jcarousel
  $('.jcarousel').on('jcarousel:create jcarousel:reload', function() {
    var element = $(this),
        width = element.innerWidth();
    element.jcarousel('items').css('width', width + 'px');
  })
  .jcarousel({ // Время анимации
    animation: 500,
    wrap: 'circular'
  })
  .jcarouselAutoscroll({
    interval: 5000,
    target: '+=1',
    autostart: true
  });

  $('.jcarousel-prev').jcarouselControl({
    target: '-=1'
  });

  $('.jcarousel-next').jcarouselControl({
    target: '+=1'
  });

  // grid images
  var items = Array('Sport and Activity', 'Wellnes and Health', 'Extreme  Sports and Expeditions', 'Games', 'Culture and Edution', 'Relaxation', 'Travelling'),
    inputText = items[Math.floor(Math.random()*items.length)];
  console.log(inputText);

  getJson(inputText);

  function getJson(inputText){
    var URL = 'https://pixabay.com/api/?key=3347954-5f97fda8c03be95e43ec4ac3c&q='+encodeURIComponent(inputText)+'&image_type=photo&callback=?';
    $.getJSON(URL, function(data) {
      if (parseInt(data.totalHits) >= 7) {
          var html = $('#tmpl').html(),
              content = tmpl(html, data);

          $('.gallery__images').empty().append(content);
          $(window).load(function() {
          $('.grid').masonry({
            itemSelector: '.grid__item',
            columnWidth: 300,
            percentPosition: true
          }); 
        });
      }
      else {
        console.log(inputText + ': No hits');
        getJson('random');
      }
    });
  }
  
  $('.gallery__input').on('keydown', function (e) {
    if (e.which == 13) {
      $(this).parent().find('.gallery__submit').trigger('click');
      return false;
    }
  });
  
  $('.gallery__submit').on('click', function(e){
    e.preventDefault();
    inputText = $('.gallery__input').val();
    if (!inputText) {
      alert('No request');
    }
    else {
      getJson(inputText);
      $('.gallery__input').val('');
    }
  });

});