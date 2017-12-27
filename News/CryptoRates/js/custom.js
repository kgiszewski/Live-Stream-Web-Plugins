function startCycle() {
    barGrow();    
}

function getData() {
    $("#dataArea").animate({height: 75}, 500, function() {
        $("#progBar").fadeOut();
        $("#progBar").width(0);
        
        $.ajax({
            type: 'GET',
            url: "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC&tsyms=USD,EUR,GBP",
            datatype: "json",
            success: function (data) {
                fillWidget(data);
            }
        });
    });
}

function fillWidget(prices) {
    console.log("filling crypto widget...");
    var btcTrend = "flat";
    var ethTrend = "flat";
    var ltcTrend = "flat";

    var BTCticker = "Bitcoin (BTC)";
    var ETHticker = "Etherium (ETH)";
    var LTCticker = "Litecoin (LTC)";

    $("#display").fadeIn();
//bitcoin data
    var BTCusd = prices.RAW.BTC.USD.PRICE;
    var BTCusdopen = prices.RAW.BTC.USD.OPENDAY;

    var BTCeur = prices.RAW.BTC.EUR.PRICE;
    var BTCeuropen = prices.RAW.BTC.EUR.OPENDAY;

    var BTCgbp = prices.RAW.BTC.GBP.PRICE;
    var BTCgbpopen = prices.RAW.BTC.GBP.OPENDAY;

    if(BTCusdopen > BTCusd){
        btcTrend = "down";
    } else if(BTCusdopen < BTCusd){
        btcTrend="up"
    }

//etherium data
    var ETHusd = prices.RAW.ETH.USD.PRICE;
    var ETHusdopen = prices.RAW.ETH.USD.OPENDAY;

    var ETHeur = prices.RAW.ETH.EUR.PRICE;
    var ETHeuropen = prices.RAW.ETH.EUR.OPENDAY;

    var ETHgbp = prices.RAW.ETH.GBP.PRICE;
    var ETHgbpopen = prices.RAW.ETH.GBP.OPENDAY;

    if(ETHusdopen > ETHusd){
        ethTrend = "down";
    } else if(ETHusdopen < ETHusd){
        ethTrend="up"
    }


//litecoin data
    var LTCusd = prices.RAW.LTC.USD.PRICE;
    var LTCusdopen = prices.RAW.LTC.USD.OPENDAY;

    var LTCeur = prices.RAW.LTC.EUR.PRICE;
    var LTCeuropen = prices.RAW.LTC.EUR.OPENDAY;

    var LTCgbp = prices.RAW.LTC.GBP.PRICE;
    var LTCgbpopen = prices.RAW.LTC.GBP.OPENDAY;

    if(LTCusdopen > LTCusd){
        ltcTrend = "down";
    } else if(LTCusdopen < LTCusd){
        ltcTrend="up"
    }


    showPrices(BTCticker,BTCusd,btcTrend, "usd", "0");
    setTimeout(function(){showPrices(BTCticker,BTCeur,btcTrend, "eur", "0")}, 7500);
    setTimeout(function(){showPrices(BTCticker,BTCgbp,btcTrend, "gbp", "0")}, 15000);

    setTimeout(function(){showPrices(ETHticker,ETHusd,ethTrend, "usd", "1")}, 22500);
    setTimeout(function(){showPrices(ETHticker,ETHeur,ethTrend, "eur", "0")}, 30000);
    setTimeout(function(){showPrices(ETHticker,ETHgbp,ethTrend, "gbp", "0")}, 37500);

    setTimeout(function(){showPrices(LTCticker,LTCusd,ltcTrend, "usd", "1")}, 45000);
    setTimeout(function(){showPrices(LTCticker,LTCeur,ltcTrend, "eur", "0")}, 52500);
    setTimeout(function(){showPrices(LTCticker,LTCgbp,ltcTrend, "gbp", "0")}, 60000);
   
}

function showPrices(ticker, money, status, style, fadeSymbol){
    //accounting.formatMoney(4999.99, "€", 2, ".", ","); // €4.999,99
    //accounting.formatMoney(4999.99, "£"); // £4.999,99
if(fadeSymbol == "1"){
    $(".symbolName").fadeOut(250, function(){
        $(".symbolName").text(ticker);
    }).fadeIn();
} else {
    $(".symbolName").text(ticker);  
}
    if(style=="usd"){
        $(".value").text(accounting.formatMoney(money));
    } else if(style=="eur"){
        $(".value").fadeOut(250, function(){
            $(".value").text(accounting.formatMoney(money, "€", 2, ".", ","));
        }).fadeIn();
    } else if(style=="gbp"){
        $(".value").fadeOut(250, function(){
            $(".value").text(accounting.formatMoney(money, "£"));
        }).fadeIn();
    }

    if(status == "down"){
        $("#display i").removeClass("fa-caret-up").removeClass("green").addClass("fa-caret-down").addClass("red");
    } else if(status = "up"){
        $("#display i").removeClass("fa-caret-down").removeClass("red").addClass("fa-caret-up").addClass("green");
    }
}

function barGrow(){
    console.log("animating bar...");
    $("#progBar").fadeIn(250, function(){
        $("#progBar").animate({width: '100%'}, 15000, function() {
            getData();
            setTimeout(barReset, 67500);
          });
    });
    

    
}

function barReset() {
    $("#display").fadeOut(250, function(){
        $("#dataArea").animate({height: 0}, 250, function() {
            startCycle();
        });
    });
}

$(document).ready(function () {
    startCycle();
});