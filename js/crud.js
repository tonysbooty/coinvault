//Objects to edit in Parse
//Type, unitPrice, premium Total createdAt, metal
Parse.initialize("uuMKgtd7piSYYS1OIicbKekLesPHKKerHp21X3Zk", "J10xkBbtYfn4EPD9TQzp0BNJI7sQ2UXmJqY0Dkgu");

function set(objectId) {
    "use strict";


    // console.log("attempting");
    //deleteAllCookies();


    // console.log("hey " + objectId);

    //  document.cookie = "id=" + objectId;

  localStorage.id = objectId;


}




function getId() {
    "use strict";


    /*
    var allcookies = document.cookie;
    
    cookiearray = allcookies.split(";");
    
    for( var i = 0; i< cookiearray.length; i++){
              id = cookiearray[i].split('=')[0];
              value = cookiearray[i].split('=')[1];


                //console.log(id); 
        
    }*/

    return localStorage.getItem("id");
}
/*
function setMetal(objectId){
    
    var query = new Parse.Query("item");
    
    query.get(objectId, {
      success: function (object) {
          var metal = object.get("metal");
console.log(metal);
          if (metal === "Gold")
  localStorage.metal = 1;
          if (metal === "Silver")
  localStorage.metal = 2;
          if (metal === "Platinum")
  localStorage.metal = 3;
      },
      error: function (error) {

      }
  });
    
}*/



function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function get(objectId) {
    //event.preventDefault();
    // window.localStorage.setItem("option", optionch);


    //window.location.href = 'myitem.html';
    //  event.preventDefault();
    "use strict";
    console.log("ayy lmao" + objectId);

    //  console.log("ayy lmao");

    var Item = Parse.Object.extend("item");
    var query = new Parse.Query(Item);


    query.get(objectId, {
        success: function (item) {

            //  event.preventDefault();

            document.getElementById("metalField").innerHTML = item.get("metal");
            document.getElementById("typeField").innerHTML = item.get("type");
            document.getElementById("unitPriceField").innerHTML = item.get("unitPrice");
            document.getElementById("premiumField").innerHTML = item.get("premium");
            document.getElementById("totalField").innerHTML = item.get("total");
            document.getElementById("qtyField").innerHTML = item.get("qty");

            //   document.getElementById("purchaseDateField").innerHTML = item.get("purchaseDate"); 

            // location.reload();



            console.log(item.get("total"));



        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            // location.reload();
            //console.log("Fucking Errors");

            console.log(error.message);
        }
    });


}

function getEdit(objectId) {


    "use strict";

    console.log("invoking edit");
    //event.preventDefault();
    // window.localStorage.setItem("option", optionch);
    //   var objectId2 = objectId;


    //window.location.href = 'myitem.html';
    //  event.preventDefault();

    //console.log("ayy lmao " + objectId);

    //  console.log("ayy lmao");

    var Item = Parse.Object.extend("item");
    var query = new Parse.Query(Item);


    query.get(objectId, {
        success: function (item) {

            //  event.preventDefault();

            document.getElementById("metalField").placeholder = item.get("metal");
            document.getElementById("typeField").placeholder = item.get("type");
            document.getElementById("unitPriceField").value = item.get("unitPrice");
            document.getElementById("premiumField").value = item.get("premium");
            document.getElementById("totalField").value = item.get("total");
            document.getElementById("qtyField").value = item.get("qty");

            //   document.getElementById("purchaseDateField").innerHTML = item.get("purchaseDate"); 

            // location.reload();


            console.log(item.get("total"));



        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            // location.reload();
            //console.log("Fucking Errors");

            console.log(error.message);
        }
    });

}



function updateItem() {
    console.log("invoking update");


    var objectId = getId();
    event.preventDefault();

    var Item = Parse.Object.extend("item");
    //var query = new Parse.Query(Item);
    var thing = new Item();

    //console.log(thing);

    var metal = document.getElementById("metalField");
    var type = document.getElementById("typeField");
    var purchaseDate = document.getElementById("purchaseDateField");
    var qty = document.getElementById("qtyField");
    var premium = document.getElementById("premiumField");
    var unitPrice = document.getElementById("unitPriceField");
    var total = document.getElementById("totalField").textContent;


    var weightg;
    var weightau;
    if (metal.options[metal.selectedIndex].text == "Gold") {
        weightg = 1.244;
        weightau = 0.917;
    }


    thing.set("objectId", objectId);

    thing.set("metal", metal.options[metal.selectedIndex].text);
    thing.set("type", type.options[type.selectedIndex].text);

    thing.set("qty", Number(qty.value));
    thing.set("premium", Number(premium.value));
    thing.set("unitPrice", Number(unitPrice.value));
    thing.set("total", Number(total));

    thing.set("weightg", weightg);
    thing.set("weightau", weightau);

    thing.save(null, {
        success: function (thing) {
            // Execute any logic that should take place after the object is saved.

            console.log("edit success");

            location.reload();
            window.location.href = "myitem.html";

        },
        error: function (thing, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            console.log("edit fail");

            location.reload();
            window.location.href = "myitem.html";


        }
    });


};

function untilOpen() {
    //calculate
    var now = new Date();
    var hoursleft = 23 - now.getHours();
    var minutesleft = 59 - now.getMinutes();
    var secondsleft = 59 - now.getSeconds();
    //format 0 prefixes
    if (minutesleft < 10) minutesleft = "0" + minutesleft;
    if (secondsleft < 10) secondsleft = "0" + secondsleft;

    //display

    if (now.getHours() > 6 && now.getHours() < 13) {

        var hoursLeft2 = 13 - now.getHours();


        $('#openOrClose').html("Market is open");
        $('#HMSremaining').html("Closes in: " + hoursLeft2 + "h " + minutesleft + "min");
    } else {

        $('#openOrClose').html("Market is closed");
        var hoursLeft2 = 29 - now.getHours();
        if (hoursLeft2 > 23) {
            hoursLeft2 = hoursLeft2 - 23;
        }
        $('#HMSremaining').html("Opens in: " + hoursLeft2 + "h " + minutesleft + "min");
    }

}

function generateGold() {
    var data = [];
    var table = [];
    var id;
    var temp = {};


    console.log(Parse.User.current());
    if (Parse.User.current() === null) {

        return window.location.href = "../index.html";

    }

    var objectId = Parse.User.current().id;



    var totalValue = 0;
    var mydiv = document.getElementById("totalGoldValue");

    // Generates the array of objects

    var item = Parse.Object.extend("item");
    var query = new Parse.Query(item);

    query.equalTo("userObjId", objectId);
    //console.log("sup");
    query.find({
        success: function (results) {

            for (var i = 0; i < results.length; i++) {
                temp = results[i].attributes;
                id = results[i].id;
                data[i] = {
                    "objectId": id,
                    "type": temp.type,
                    "date": temp.purchaseDate,
                    "metal": temp.metal,
                    "qty": temp.qty,
                    "value": temp.total,
                    "weightg": temp.weightg,
                    "weightau": temp.weightau,
                    "total": temp.total

                };
                // console.log(data);

            }

            table.push(data);

            var tr;
            $(document).ready(function () {
                for (var i = 0; i < data.length; i++) {


                    tr = $('<tr/>');

                    var id = data[i].objectId;

                    if (data[i].metal == "Silver" || data[i].metal == "Platinum") {
                        continue;
                    }
                    //    tr.append("<a onclick = " + "get('id')" + ">" + id);
                    tr.append("<td hidden>" + id + "</td>");

                    tr.append("<td>" + data[i].metal + "</td>"); // tr.append("<a  href= " + "../src/myitem.html" + ">" + "<td>" + data[i].objectId + "</td>");
                    tr.append("<td>" + data[i].date + "</td>");

                    tr.append("<td>" + data[i].type + "</td>");
                    tr.append("<td>" + data[i].qty + "</td>");

                    tr.append("<td>" + data[i].weightg + "</td>");
                    tr.append("<td>" + data[i].weightau + "</td>");
                    tr.append("<td>" + data[i].total + "</td>" + "</a>");
                    // tr.onClick = set(123);
                    totalValue = totalValue + data[i].total;
                    //   console.log(totalValue);

                    $('#goldTable').append(tr);
                    $(tr).click(function () {

                        var a = $(this).closest('tr').find('td:first').text();
                        set(a);

                        window.location.href = 'myitem.html';

                        //console.log(a);

                    });

                }

                //Updating totalGold Field after generating table on Parse
                var user = Parse.User.current();

                user.set("totalGold", totalValue);
                user.save()
                    .then(
                        function (user) {
                            return user.fetch();
                        }
                    )
                    .then(
                        function (user) {
                            console.log('gold updated', user);
                        },
                        function (error) {
                            console.log('Something went wrong', error);
                        }
                    );

                //Fixing the number value
                var twoPlacedFloat = parseFloat(totalValue).toFixed(2);

                //Assigning it to the HTML page
                mydiv.innerHTML = "$" + numberWithCommas(twoPlacedFloat);

            });

        },
        error: function (error) {
            console.log(error);
        }
    });

}


function generatePlatinum() {
    var data = [];
    var table = [];
    var id;
    var temp = {};


    console.log(Parse.User.current());
    if (Parse.User.current() === null) {

        return window.location.href = "../index.html";
    }

    var objectId = Parse.User.current().id;



    var totalValue = 0;
    var mydiv = document.getElementById("totalPlatinumValue");

    // Generates the array of objects

    var item = Parse.Object.extend("item");
    var query = new Parse.Query(item);

    query.equalTo("userObjId", objectId);
    //console.log("sup");
    query.find({
        success: function (results) {

            // console.log(results[0].attributes);



            for (var i = 0; i < results.length; i++) {
                temp = results[i].attributes;
                id = results[i].id;
                data[i] = {
                    "objectId": id,
                    "type": temp.type,
                    "date": temp.purchaseDate,
                    "metal": temp.metal,
                    "qty": temp.qty,
                    "value": temp.total,
                    "weightg": temp.weightg,
                    "weightau": temp.weightau,
                    "total": temp.total

                };
                //  console.log(data);

            }

            table.push(data);
            // console.log(table);
            //console.log(data);

            var tr;
            $(document).ready(function () {
                for (var i = 0; i < data.length; i++) {


                    tr = $('<tr/>');

                    var id = data[i].objectId;

                    if (data[i].metal == "Silver" || data[i].metal == "Gold") {
                        continue;
                    }
                    //    tr.append("<a onclick = " + "get('id')" + ">" + id);
                    tr.append("<td hidden>" + id + "</td>");

                    tr.append("<td>" + data[i].metal + "</td>"); // tr.append("<a  href= " + "../src/myitem.html" + ">" + "<td>" + data[i].objectId + "</td>");
                    tr.append("<td>" + data[i].date + "</td>");

                    tr.append("<td>" + data[i].type + "</td>");

                    tr.append("<td>" + data[i].qty + "</td>");

                    tr.append("<td>" + data[i].weightg + "</td>");
                    tr.append("<td>" + data[i].weightau + "</td>");
                    tr.append("<td>" + data[i].total + "</td>" + "</a>");
                    // tr.onClick = set(123);
                    totalValue = totalValue + data[i].total;
                    //   console.log(totalValue);

                    $('#platinumTable').append(tr);
                    $(tr).click(function () {

                        var a = $(this).closest('tr').find('td:first').text();
                        set(a);

                        window.location.href = 'myitem.html';

                        //console.log(a);

                    });

                }

                //Updating totalGold Field after generating table on Parse
                var user = Parse.User.current();

                user.set("totalPlatinum", totalValue);
                user.save()
                    .then(
                        function (user) {
                            return user.fetch();
                        }
                    )
                    .then(
                        function (user) {
                            console.log('platinum updated', user);
                        },
                        function (error) {
                            console.log('Something went wrong', error);
                        }
                    );

                //Fixing the number value
                var twoPlacedFloat = parseFloat(totalValue).toFixed(2);

                //Assigning it to the HTML page
                mydiv.innerHTML = "$" + numberWithCommas(twoPlacedFloat);

            });

        },
        error: function (error) {
            console.log(error);
        }
    });



}


function generateSilver() {
    var data = [];
    var table = [];
    var id;
    var temp = {};


    console.log(Parse.User.current());
    if (Parse.User.current() === null) {

        return window.location.href = "../index.html";

    }

    var objectId = Parse.User.current().id;



    var totalValue = 0;
    var mydiv = document.getElementById("totalSilverValue");

    // Generates the array of objects

    var item = Parse.Object.extend("item");
    var query = new Parse.Query(item);

    query.equalTo("userObjId", objectId);
    //console.log("sup");
    query.find({
        success: function (results) {

            // console.log(results[0].attributes);



            for (var i = 0; i < results.length; i++) {
                temp = results[i].attributes;
                id = results[i].id;
                data[i] = {
                    "objectId": id,
                    "type": temp.type,
                    "date": temp.purchaseDate,
                    "metal": temp.metal,
                    "qty": temp.qty,
                    "value": temp.total,
                    "weightg": temp.weightg,
                    "weightau": temp.weightau,
                    "total": temp.total

                };
                // console.log(data);

            }
            table.push(data);
            // console.log(table);
            //console.log(data);

            var tr;
            $(document).ready(function () {
                for (var i = 0; i < data.length; i++) {


                    tr = $('<tr/>');

                    var id = data[i].objectId;

                    if (data[i].metal == "Gold" || data[i].metal == "Platinum") {
                        continue;
                    }

                    tr.append("<td hidden>" + id + "</td>");

                    tr.append("<td>" + data[i].metal + "</td>");
                    // tr.append("<a  href= " + "../src/myitem.html" + ">" + "<td>" + data[i].objectId + "</td>");
                    tr.append("<td>" + data[i].date + "</td>");

                    tr.append("<td>" + data[i].type + "</td>");

                    tr.append("<td>" + data[i].qty + "</td>");

                    tr.append("<td>" + data[i].weightg + "</td>");
                    tr.append("<td>" + data[i].weightau + "</td>");
                    tr.append("<td>" + data[i].total + "</td>" + "</a>");
                    // tr.onClick = set(123);
                    totalValue = totalValue + data[i].total;
                    // console.log(totalValue);

                    $('#silverTable').append(tr);
                    $(tr).click(function () {

                        var a = $(this).closest('tr').find('td:first').text();
                        set(a);

                        window.location.href = 'myitem.html';

                        //console.log(a);

                    });

                }

                //Updating totalGold Field after generating table on Parse
                var user = Parse.User.current();

                user.set("totalSilver", totalValue);
                user.save()
                    .then(
                        function (user) {
                            return user.fetch();
                        }
                    )
                    .then(
                        function (user) {
                            //console.log('gold updated', user);
                        },
                        function (error) {
                            console.log('Something went wrong', error);
                        }
                    );

                //Fixing the number value
                var twoPlacedFloat = parseFloat(totalValue).toFixed(2);

                //Assigning it to the HTML page
                mydiv.innerHTML = "$" + numberWithCommas(twoPlacedFloat);

            });

        },
        error: function (error) {
            console.log(error);
        }
    });



}


function dashboardTotal() {
    var mark = "+";
    var user = Parse.User.current();
    var totalGold = user.get("totalGold");
    var totalSilver = user.get("totalSilver");
    var totalPlatinum = user.get("totalPlatinum");


    if (totalGold === null) totalGold = 0;
    if (totalSilver === null) totalSilver = 0;
    if (totalPlatinum === null) totalPlatinum = 0;




    var total = totalGold + totalSilver + totalPlatinum;

    user.set("endOfDayTotal", total);
    user.save()
        .then(
            function (user) {
                return user.fetch();
            }
        )
        .then(
            function (user) {
                console.log('endOfDay updated', user);
            },
            function (error) {
                console.log('Something went wrong', error);
            }
        );

    var mydiv = document.getElementById("dashboardTotalValue");



    //Makes it 2 decimal places
    var twoPlacedFloat = parseFloat(total).toFixed(2);

    //assigns the value on dashboard.
    mydiv.innerHTML = "$" + numberWithCommas(twoPlacedFloat);
    
    
    //YESTERDAY TOTAL
    var goldYesterday = JSON.parse(localStorage["userGoldTotal"]);
    var silverYesterday = JSON.parse(localStorage["userSilverTotal"]);

    var platinumYesterday = JSON.parse(localStorage["userPlatinumTotal"]);

    var yesterdayTotal = goldYesterday[goldYesterday.length - 2] + silverYesterday[silverYesterday.length - 2] +platinumYesterday[platinumYesterday.length - 2];
    
    
    
    if(total <= 0 || total === null){
        totalChange = 0;
        

    }
    else{
    var totalChange = (twoPlacedFloat - yesterdayTotal);
    
        if(totalChange < 0){
            mark = "-";
            totalChange = totalChange * -1;
        }

        totalChange = totalChange/twoPlacedFloat * 100;
        
            document.getElementById("totalchange").innerHTML = mark + totalChange.toFixed(2) + "%";
            
            //console.log(totalChange +  "   " + twoPlacedFloat);
    }


}

function update() {

  //  console.log("updating....");
    
    

    var qty = document.getElementById("qtyField").value;

    var premium = document.getElementById("premiumField").value;

    var unitPrice = document.getElementById("unitPriceField").value;

    if (!qty) qty = 1;
    if (!premium) premium = 47;
    if (!unitPrice) unitPrice = 1250.60;

    var sum = (+qty * (+premium + +unitPrice));

    sum = parseFloat(sum).toFixed(2);


    document.getElementById("totalField").innerHTML = sum;


}
