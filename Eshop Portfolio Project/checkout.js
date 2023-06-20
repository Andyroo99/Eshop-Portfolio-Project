$(document).ready(function() {
  var urlParams = new URLSearchParams(window.location.search);
  var cartItems = urlParams.get("cartItems");

  if (cartItems) {
    var parsedCartItems = JSON.parse(decodeURIComponent(cartItems));
    var cartContainer = $("#cartContainer");

    if (parsedCartItems.length > 0) {
      $.each(parsedCartItems, function(index, item) {
        var itemRow = $("<div></div>").addClass("item-row");
        itemRow.append($("<span></span>").addClass("item-name").text(item.title));
        itemRow.append($("<span></span>").addClass("item-price").text(item.price));

        cartContainer.append(itemRow);
      });

      $("#emptyCartMessage").hide();
      $("#cartTotalContainer").show();
      $("#checkoutButton").show();
    } else {
      $("#emptyCartMessage").show();
      $("#cartTotalContainer").hide();
      $("#checkoutButton").hide();
    }
  } else {
    $("#emptyCartMessage").show();
    $("#cartTotalContainer").hide();
    $("#checkoutButton").hide();
  }
});
