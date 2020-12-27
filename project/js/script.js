/*global $*/
$(function () {

    "use strict";

    $('.restaurant-info').on("click", function () {
        // Hide All Divs
        $('.container .content > div').fadeOut(0);
        // Show Div Conntected With Tabs
        $('.' + $(this).data('class')).fadeIn();
    });
    
});