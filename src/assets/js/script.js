$(document).ready(function () {
  $('.nav-icon').click(function(){
		$(this).toggleClass('open');
    $(this).siblings('.nav-overlay').toggleClass('open');
    $('body').toggleClass('cant-scrl');
    overlay();
	});

  function overlay() {
    $('#overlay').toggleClass('active');
  }

  $('.slider__content').slick({
    dots: true,
    nextArrow: '<a class="slider-item__prev"><svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 18.2L2 9.6L11 1" stroke="white" stroke-width="2" stroke-miterlimit="10"/></svg></a>',
    prevArrow: '<a class="slider-item__next"><svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 0.799988L10 9.39999L1 18" stroke="white" stroke-width="2" stroke-miterlimit="10"/></svg></a>',
    dotsClass: 'slick-dots slider-dots',
  });

  $('.slider__about').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    nextArrow: '<a class="slider-item__prev"><svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 18.2L2 9.6L11 1" stroke="white" stroke-width="2" stroke-miterlimit="10"/></svg></a>',
    prevArrow: '<a class="slider-item__next"><svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 0.799988L10 9.39999L1 18" stroke="white" stroke-width="2" stroke-miterlimit="10"/></svg></a>',
    dotsClass: 'slick-dots slider-dots',
  });

  $('.news-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: '<a class="slider-item__prev news-slider__next"><svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 18.2L2 9.6L11 1" stroke="white" stroke-width="2" stroke-miterlimit="10"/></svg></a>',
    prevArrow: '<a class="slider-item__next news-slider__next"><svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 0.799988L10 9.39999L1 18" stroke="white" stroke-width="2" stroke-miterlimit="10"/></svg></a>',
    responsive: [
      {
        breakpoint: 1060,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

  $('.question__dropdown').click(function(e) {

    var $this = $(this);

    if ($this.children('.question__answer').hasClass('show')) {
        $this.children('.question__answer').removeClass('show');
        $this.children('.question__answer').slideUp(350);
        $this.removeClass('active');

    } else {
        $this.parent().find('.question__answer').removeClass('show');
        $this.siblings().removeClass('active');
        $this.addClass('active');
        $this.parent().find('.question__answer').slideUp(350);
        $this.children('.question__answer').toggleClass('show');
        $this.children('.question__answer').slideToggle(350);
    }
  });

  // to top
  $('.to-top').click(function() {
    $('body,html').animate({scrollTop:0},3000);
  });

  $(window).scroll(function () {
    if($(window).scrollTop() > 500){
      $('.to-top').addClass('to-top__active');
    }else{
      $('.to-top').removeClass('to-top__active');
    }
    if($(window).scrollTop() > 250){
      $('.header__bottom__scroll').addClass('header__bottom__scroll__active');
    }else{
      $('.header__bottom__scroll').removeClass('header__bottom__scroll__active');
    }
  })

  $('.search svg').click(function() {
    $('.search svg').parent().toggleClass('active');
    changeSearchWidth();
    if($(window).width() < 785){
      overlay();
      $('body').toggleClass('cant-scrl');
    }
  })

  $(window).resize(function () {
    changeSearchWidth();
  });

  function changeSearchWidth() {
    if($(window).width() < 785 && $('.search').hasClass('active')){
      $('.search__input').css('width', $('.header__bottom').width() - 26 + 'px');
    } else if($(window).width() < 785){
      $('.search__input').css('width', '0px');
    }
  }

  $('.dropdown').click(function() {
    $(this).find('.dropdown-list').toggleClass('active');
  })


  var selector = document.getElementById("mask");
  var im = new Inputmask("+375 (99) 999-99-99");
  im.mask(selector);


  $('#file').change(
    function(e){
      var numFiles = e.currentTarget.files.length;
      for (i=0;i<numFiles;i++){
        fileSize = parseInt(e.currentTarget.files[i].size, 10)/1024;
        filesize = Math.round(fileSize);
        $('<li />').attr("num", i).text(e.currentTarget.files[i].name).appendTo($('#output'));
        $('<span />').addClass('delete').text('x').appendTo($('#output li:last'));
        $('<span />').addClass('filesize').text( filesize + 'kb').appendTo($('#output li:last'));
      }
      $('.delete').click(function(){
        var num = $(this).parent().attr("num");
        $(this).parent().remove();
        e.currentTarget.files[num] = " ";
      })
  });
})

var button = document.getElementById('table-next');
button.onclick = function () {
    var container = document.getElementById('table__container');
    sideScroll(container,'right',15,100,10);
};

var back = document.getElementById('table-prev');
back.onclick = function () {
    var container = document.getElementById('table__container');
    sideScroll(container,'left',15,100,10);
};

$('#table__container').bind('scroll',chk_scroll);

function chk_scroll(e){
  var elem = $(e.currentTarget);
  if (elem[0].scrollWidth - elem.scrollLeft() == elem.outerWidth()){
    $('#table-next').css('opacity', '0.5');
  }
  else{
    $('#table-next').css('opacity', '1');
  }
  if (elem.scrollLeft() <= 0){
    $('#table-prev').css('opacity', '0.5');
  }
  else{
    $('#table-prev').css('opacity', '1');
  }
}

function sideScroll(element,direction,speed,distance,step){
  scrollAmount = 0;
  var slideTimer = setInterval(function(){
      if(direction == 'left'){
          element.scrollLeft -= step;
      } else {
          element.scrollLeft += step;
      }
      scrollAmount += step;
      if(scrollAmount >= distance){
          window.clearInterval(slideTimer);
      }
  }, speed);
}
