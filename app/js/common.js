$(function() {
//-------------------------------попандер---------------------------------------
  $('.modal').popup({transition: 'all 0.3s'});


//-------------------------------попандер---------------------------------------

  // $('.tabs').hide();
  // $('.tabs:first').show();
  // $('.tabs a:first').addClass('active');
  //  $('.tabs a').click(function(event){
  //   event.preventDefault();
  //   $('.tabs ul a').removeClass('active');
  //   $(this).addClass('active');
  //   $('.tabs').hide();
  //    var selectTab = $(this).attr('href');
  //   $(selectTab).fadeIn();
  // });

//------------------------------------form-------------------------------------------
  $('input[type="tel"]').mask('+0 (000) 000-00-00');

  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
     return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");

  $(".form").each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        name: "Введите Ваше имя",
        phone: "Введите Ваш телефон",
        email: "Введите вашу почту",
      },
      submitHandler: function(form) {
        var t = {
          name: jQuery('.form-' + index).find("input[name=name]").val(),
          phone: jQuery('.form-' + index).find("input[name=phone]").val(),
          email: jQuery('.form-' + index).find("input[name=email]").val(),
          subject: jQuery('.form-' + index).find("input[name=subject]").val()
        };
        ajaxSend('.form-' + index, t);
      }
    });

  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

});


  $(window).on('load', function(){
    $('.preloader').delay(1000).fadeOut('slow');
  });