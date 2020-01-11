$(document).on('focus', 'input', function() {
  $(this).attr('style','')
});

$(document).on('submit', 'form', function(e) {

  e.preventDefault();

  alert('test')

  var form = $(this),
      msg = form.serialize(),
      stop = false;



  if (form.find('[required]').length){

      form.find('[required]').each(function(){
          if ($(this).val() == ""){

            stop = true

            $(this).css({
              "box-shadow": "0px 0px 10px 1px rgba(214,0,0,1)",
              "border-color": "rgba(214,0,0,1)"
            })

          }

      })
  }

  if (stop == false){
    // $.ajax({
    //   type: 'POST',
    //   url: '/mail/',
    //   data: msg,
    //   success: function(data) {
        
    //   }
    // });

    $(this)[0].reset()
    alert('submit')




  }
})