
var products = {
    'white': {
        
        'plain': {
            'unit_price': 5.12,
            'photo': 'v-white.jpg' 
        },
        'printed': {
            'unit_price': 8.95,
            'photo': 'v-white-personalized.jpg' 
        }
    },
    
    'colored': {
        'plain': {
            'unit_price': 6.04,
            'photo': 'v-color.jpg' 
        },
        'printed': {
            'unit_price': 9.47,
            'photo': 'v-color-personalized.png' 
        }
    }
}


// Search params

var search_params = {
    "quantity": "",
    "color": "",
    "quality": "",
    "style": "",
}


// Additional pricing rules:

// 1. The prices above are for Basic quality (q150). 
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities: 
    // 1: above 1.000 units - 20% discount
    // 2: above 500 units - 12% discount
    // 3: above 100 units - 5% discount


// Solution:

$(function(){

    function update_params(){
        search_params.color=$("#color .option-button.selected").attr('id');
        search_params.quantity=($("#quantity").val());
        search_params.quality=$("#quality .option-button.selected").attr('id');
        search_params.style=$("#style").val();
        update_order_details();
    }

    function update_order_details(){
        $(".refresh-loader").show();
        var qualityid="#"+search_params.quality;
        var colorid="#"+search_params.color;
        var styleSelector="#style option[value="+search_params.style +"]";
        $("#result-style").html($(styleSelector).text());
        $("#result-quantity").html(search_params.quantity);
        $("#result-quality").html($(qualityid).text());
        $("#result-color").html($(colorid).text());
        $("#total-price").text(" "+calculate_price().toString());
        var photo =products[search_params.color][search_params.style].photo;
        $("#photo-product").attr("src", "img/"+photo);
        $(".refresh-loader").hide();
    }

    function calculate_price(){

        var unitprice =products[search_params.color][search_params.style].unit_price;
        search_params.quantity=parseInt(search_params.quantity)
        if (search_params.quality=="q190"){
            unitprice*=1.12;
        }
        var total=unitprice * search_params.quantity;

        if (search_params.quality>=1000){
            total*=0.8;
        }else if(search_params.quantity>=500){
            total*=0.88;
        }else if (search_params.quantity>=100){
            total *=0.95;
        }
        return total.toFixed(2);
    }

    update_params();

    $("#quantity").change(function(){
        search_params.quantity=parseInt($("#quantity").val());
        update_order_details();
    })

    $("#style").change(function(){
        search_params.style=$("#style").val();
        update_order_details();
    })
    
    $(".option-button").click(function(){
        var clickedparam=$(this).parent().attr("id");
        var childselector="#"+clickedparam + " .option-button"
        $(childselector).removeClass("selected");
        $(this).addClass("selected");
        var selectedChild="#"+clickedparam + " .option-button.selected"
        search_params[clickedparam]=$(selectedChild).attr('id');
        update_order_details();
    })


    
});










