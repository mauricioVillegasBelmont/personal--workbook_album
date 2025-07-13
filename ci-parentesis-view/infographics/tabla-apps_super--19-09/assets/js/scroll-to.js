$( document ).ready(function() {
  $('#to-table-leche-entera').on('click',function(){
    console.log('1');
    $('html, body').animate({
        scrollTop: $("#leche-entera").offset().top - 10
    }, 1000);
  })
  $('#to-table-leche-light').on('click',function(){
    console.log('2');
    $('html, body').animate({
        scrollTop: $("#leche-light").offset().top - 10
    }, 1000);
  })
  $('#to-table-leche-deslactosada').on('click',function(){
    console.log('3');
    $('html, body').animate({
        scrollTop: $("#leche-deslactosada").offset().top- 10
    }, 1000);
  })
  $('#to-table-leche-deslactosada-light').on('click',function(){
    console.log('4');
    $('html, body').animate({
        scrollTop: $("#leche-deslactosada-light").offset().top - 10
    }, 1000);
  })
});
