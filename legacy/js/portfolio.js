$(function () {

  var all_portfolio_items = $("#portfolio-items div");

  $("#portfolio-button-container button").click(function(e) {
    var category = $(this).data('portfolio-section');
    console.log("Show " + category);

    $("#portfolio-button-container button").removeClass('active');
    $(this).addClass('active');

    if (category == 'all') {
      all_portfolio_items.addClass('show');
      return;
    }

    all_portfolio_items.each(function() {
      if ($(this).hasClass(category)) {
        $(this).addClass('show', 1000);
      } else {
        $(this).removeClass('show', 1000);
      }
    });

  });
});
