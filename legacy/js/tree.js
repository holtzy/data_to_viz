// This function controls the color of the button in the tree selection section. Coded by tom mainly
$(function () {

  $("#tree-button-container button").click(function(e) {
    var category = $(this).data('tree-section');
    console.log("Show " + category);

    $("#tree-button-container button").removeClass('active');
    $(this).addClass('active');

  });
});




// This function allows to show a specific decision tree when the user click a button
function showTree(id){     
      
      // Hide all the tree AND set its opacity to 0. except for the selected one.
      var x, i;
      x = document.getElementsByClassName("tree");
      for (i = 0; i < x.length; i++) {
        if (id!=x[i].id){
          d3.select("#" + x[i].id).style("opacity", 0)
          document.getElementById(x[i].id).style.display = 'none';   
        }
      }
      
      //Show the selected tree
      document.getElementById(id).style.display = 'block';

      //Change its opacity
      d3.select("#" + id)
        .transition()
        .style("opacity", 1)
        .duration(1000)
        .delay(000)

}
