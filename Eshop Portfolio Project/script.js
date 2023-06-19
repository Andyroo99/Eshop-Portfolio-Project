$(document).ready(function() {
  function updateCartItemCountAndTotal() {
    var cartItemCount = 0;
    var cartTotal = 0;

    $(".item-row").each(function() {
      var quantity = $(this).data("quantity");
      var price = parseFloat($(this).find(".item-price").text().replace("$", ""));
      cartItemCount += quantity;
      cartTotal += quantity * price;
    });

    $("#cartItemCount").text(cartItemCount);
    $("#cartTotal").text("$" + cartTotal.toFixed(2));

    if (cartItemCount > 0) {
      $("#cartNotification").show();
      $("#cartTotalContainer").show();
    } else {
      $("#cartNotification").hide();
      $("#cartTotalContainer").hide();
    }
  }

  $(".add-to-cart-button").click(function() {
    var card = $(this).closest(".card");
    var title = card.find(".card-title").text();
    var price = card.find(".card-text").text();
    var imageSrc = card.find(".card-img-top").attr("src");
    var quantity = parseInt(card.find(".quantity-select").val());
    var existingItem = $(".item-row").filter(function() {
      return $(this).find(".item-title").text() === title;
    });

    if (existingItem.length > 0) {
      var currentQuantity = existingItem.data("quantity");
      var newQuantity = currentQuantity + quantity;
      existingItem.data("quantity", newQuantity);
      existingItem.find(".item-quantity").text("x" + newQuantity).addClass("text-red");
    } else {
      var newItem = $("<div></div>").addClass("item-row");
      newItem.data("quantity", quantity);
      var itemImage = $("<img>").addClass("item-image").attr("src", imageSrc);
      var itemText = $("<span></span>").addClass("item-text");
      var itemTitle = $("<span></span>").addClass("item-title").text(title);
      var itemQuantity = $("<span></span>").addClass("item-quantity text-yellow").text("x" + quantity);
      var itemPrice = $("<span></span>").addClass("item-price").text(price);
      var removeButton = $("<button></button>").addClass("remove-button").html("&times;");
      var spacing = $("<span>&nbsp;</span>"); // Add spacing element
      itemText.append(itemTitle, " ", itemPrice, " ", itemQuantity);
      newItem.append(removeButton, spacing, itemImage, itemText);
      $("#shoppingCart .offcanvas-body").append(newItem);
    }

    updateCartItemCountAndTotal();
    $("#emptyCartMessage").hide();
  });

  $(document).on("click", ".remove-button", function() {
    $(this).closest(".item-row").remove();

    if ($(".item-row").length === 0) {
      $("#emptyCartMessage").show();
    }

    updateCartItemCountAndTotal();
  });

  updateCartItemCountAndTotal();
});
