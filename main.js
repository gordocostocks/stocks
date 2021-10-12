const STANDARD_DEV = 0.005
const STOCKS_API_KEYS = ["BAWUNG9CEURCMYS1","72Y437B8U69J7EUC","0C8P30ZJGYWYY4EY","UEPAY9DWMY3AZK1O","JABH74ZELQSRN0BX","H99FX9R8M8D97RGE","759EZ13ABT4B61T0","54XK0XZMNY85SV2K","WE29JU0IAU6N0EKA","OX4FV8RZBDH5I0ZY","TBRU0JH3C9QHDMCB","0JLYRXVMF1YXKAST","SQ5QU5ENXMR2NXHO","72BJVGWCFHEBX1II","YYP4RW8FELTHTV3V","TRFXAR5LQ1HSRQX6","M87CE0RP776JLRRI","OWAIO5E35IHIJP0E","26EYY8C9BK4XO49B","NW5JXRI31MRE0S8R","QX9M2MAGNW4V4GF3","HKFR54KDF888C7WI","F6GGDQUVR56AECKU"]
let apiLen = STOCKS_API_KEYS.length
var localStats = []
let RUN_ONCE = false

// Function to create list of stocks  (html select list)
function makeStockList(statNumber) {
    listItems = ['Symbol', 'AssetType', 'Name', 'Description', 'CIK', 'Exchange', 'Currency', 'Country', 'Sector', 'Industry', 'Address', 'FiscalYearEnd', 'LatestQuarter', 'MarketCapitalization', 'EBITDA', 'PERatio', 'PEGRatio', 'BookValue', 'DividendPerShare', 'DividendYield', 'EPS', 'RevenuePerShareTTM', 'ProfitMargin', 'OperatingMarginTTM', 'ReturnOnAssetsTTM', 'ReturnOnEquityTTM', 'RevenueTTM', 'GrossProfitTTM', 'DilutedEPSTTM', 'QuarterlyEarningsGrowthYOY', 'QuarterlyRevenueGrowthYOY', 'AnalystTargetPrice', 'TrailingPE', 'ForwardPE', 'PriceToSalesRatioTTM', 'PriceToBookRatio', 'EVToRevenue', 'EVToEBITDA', 'Beta', '52WeekHigh', '52WeekLow', '50DayMovingAverage', '200DayMovingAverage', 'SharesOutstanding', 'SharesFloat', 'SharesShort', 'SharesShortPriorMonth', 'ShortRatio', 'ShortPercentOutstanding', 'ShortPercentFloat', 'PercentInsiders', 'PercentInstitutions', 'ForwardAnnualDividendRate', 'ForwardAnnualDividendYield', 'PayoutRatio', 'DividendDate', 'ExDividendDate', 'LastSplitFactor', 'LastSplitDate'];
    divNames = ["stats", "stats2", "stats3", "stats4", "stats5", "stats6", "stats7", "stats8", "stats9", "stats10"]

    var list = document.createElement('select');
    //list.setAttribute("id", divNames[statNumber])
    list.setAttribute("name", divNames[statNumber])
    list.setAttribute("onchange", "statChange(this)")
    list.setAttribute("style", "width:100%;height:25px;margin-top:8px")
    list.setAttribute("class", "form-control")
    for (var i = 0; i < listItems.length; i++) {

        var item = document.createElement('option');
        if (i == statNumber) {
            list.selectedIndex = i;
            item.setAttribute("selected", "selected")
            //item.setAttribute("selected", "selected")
        }
        //item.setAttribute("value", listItems[i])
        item.setAttribute("value", statNumber)
        item.appendChild(document.createTextNode(listItems[i]));

        list.appendChild(item);
    }
    return list;
    text = "<li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon\">person</i>;Stock 7</span></li>"
}


divNames = ["stats", "stats2", "stats3", "stats4", "stats5", "stats6", "stats7", "stats8", "stats9", "stats10"]
for (var i = 0; i < divNames.length; i++) {
    var dItem = document.createElement('div')
    dItem.setAttribute("style", "flex:80%")
    dItem.appendChild(makeStockList(i));
    var pItem = document.createElement('p')
    pItem.setAttribute("style", "white-space:nowrap;text-overflow:ellipsis;max-width:295px;overflow:hidden;margin-top:0px;margin-bottom:0px")
    pItem.innerHTML = "No Stock Selected"
    dItem.appendChild(pItem)
    document.getElementById(divNames[i]).appendChild(dItem)
    document.getElementById(divNames[i]).insertAdjacentHTML("beforeend", '<div style="width: 8px;" />')
    //document.getElementById(divNames[i]).appendChild(pItem)

    //document.getElementById(divNames[i]).appendChild(makeStockList(i));


    document.getElementById(divNames[i]).insertAdjacentHTML("beforeend", '<button \
    class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\
    " style="flex:20%;height:40px;text-align:center;margin:auto;line-height:1.4;font-size:90%;text-transform:capitalize" onclick="expandStats(\'' + divNames[i] + '\');">\
    Expand Text</button>');
    // var dialogTitle = "default"
    // var dialogContent = "default"
    // document.getElementById(divNames[i]).insertAdjacentHTML("beforeend", '<dialog \
    // class="mdl-dialog"><h4 class="mdl-dialog__title">' + dialogTitle + '</h4><div \
    // class="mdl-dialog__content"><p>' + dialogContent + '</p></div><div class="mdl-dialog__actions\
    // "><button type="button" class="mdl-button">Agree</button><button type="button" class="mdl-button close">Close</button></div></dialog>\
    // <script>var dialog = document.querySelector("dialog");var showDialogButton = \
    // document.querySelector("#show-dialog");if (! dialog.showModal) {dialogPolyfill.registerDialog(dialog);\
    // }showDialogButton.addEventListener("click", function(){dialog.showModal();});\
    // dialog.querySelector(".close").addEventListener("click", function() {dialog.close();});</script>')
}

function expandStats(divName) {
  console.log("expand stats input")
  console.log(divName)
    var expindex = document.querySelector("#" + divName + " div select").selectedIndex
    console.log(expindex)
    var selectedForExpand = document.querySelector("#" + divName + " div select").options[expindex].innerText
    var p = document.querySelector("#" + divName + " div  p");
    var selectedInfoForExpand = p.innerText
    alert(selectedForExpand + "\n" + selectedInfoForExpand)
}

function statChange(selectObj) {
    statNum = "stats"
    var idx = selectObj.selectedIndex;
    var which = selectObj.options[idx].value;
     //var cSelect = document.querySelector("#" + statNum + " select");
     //console.log("new selected")
     //console.log(idx)
     //console.log(cSelect.selectedIndex)
     //cSelect.selectedIndex = idx;
     selectObj.setAttribute("selected", "selected")
    addStats(localStats);
}

// document.getElementById('updateButton').onclick = function() {
//   var opts = list.options;
//     for (var opt, j = 0; opt = opts[j]; j++) {
//       if (opt.value == val) {
//         list.selectedIndex = j;
//         break;
//       }
//     }
// }
// function val(selectObject) {
//     var item = document.getElementById(selectID);
//     item.seletedIndex = selectObject.value;
//     addStats(localStats);
// }

// function addStats(statArray, divName) {
//     listItems = ['Symbol', 'AssetType', 'Name', 'Description', 'CIK', 'Exchange', 'Currency', 'Country', 'Sector', 'Industry', 'Address', 'FiscalYearEnd', 'LatestQuarter', 'MarketCapitalization', 'EBITDA', 'PERatio', 'PEGRatio', 'BookValue', 'DividendPerShare', 'DividendYield', 'EPS', 'RevenuePerShareTTM', 'ProfitMargin', 'OperatingMarginTTM', 'ReturnOnAssetsTTM', 'ReturnOnEquityTTM', 'RevenueTTM', 'GrossProfitTTM', 'DilutedEPSTTM', 'QuarterlyEarningsGrowthYOY', 'QuarterlyRevenueGrowthYOY', 'AnalystTargetPrice', 'TrailingPE', 'ForwardPE', 'PriceToSalesRatioTTM', 'PriceToBookRatio', 'EVToRevenue', 'EVToEBITDA', 'Beta', '52WeekHigh', '52WeekLow', '50DayMovingAverage', '200DayMovingAverage', 'SharesOutstanding', 'SharesFloat', 'SharesShort', 'SharesShortPriorMonth', 'ShortRatio', 'ShortPercentOutstanding', 'ShortPercentFloat', 'PercentInsiders', 'PercentInstitutions', 'ForwardAnnualDividendRate', 'ForwardAnnualDividendYield', 'PayoutRatio', 'DividendDate', 'ExDividendDate', 'LastSplitFactor', 'LastSplitDate'];
//     for (var i = 0; i < listItems.length; i++) {
//         var item = document.getElementById(divNames[i]);
//         //item.setAttribute("value", listItems[i])
//
//         item.setAttribute("value", statArray[i])
//         // item.appendChild(document.createTextNode(listItems[i]));
//         //
//         // list.appendChild(item);
//       }
// }

function addStats(statVals) {
    divNames = ["stats", "stats2", "stats3", "stats4", "stats5", "stats6", "stats7", "stats8", "stats9", "stats10"]
    if (statVals.length < 2) {
        return
    }
    //console.log(statVals)
    for (var i = 0; i < divNames.length; i++) {
        var select = document.querySelector("#" + divNames[i] + " div select");
        //var item = document.getElementById(divNames[i])
        //console.log(select.selectedIndex)
        var statNum = select.selectedIndex
        //console.log(statNum)
        //var statNum = item.getAttribute("data-number")
        var stat = statVals[statNum]
        var queryString = "#" + divNames[i] + " div p"
        var p = document.querySelector(queryString);
        p.innerHTML = String(stat)
    }
}





async function getData(stonk,interval)
{
    let key = STOCKS_API_KEYS[Math.floor(Math.random() * apiLen)]
    console.log(`normal ${key}`)
    let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stonk}&interval=${interval}min&outputsize=full&apikey=${key}`);
    let data = await response.json();
    return data
}

async function getDataStats(stonk)
{
    let key = STOCKS_API_KEYS[Math.floor(Math.random() * apiLen)]
    console.log(`stats ${key}`)
    let response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stonk}&apikey=${key}`);
    let data = await response.json();
    return data
}


function statsMiracle(stonk)
{
    getDataStats(stonk).then(response=>{
        let data = response
        let statnames = Object.keys(data)
        let statvals = []
        for(let i = 0; i < statnames.length; i++)
        {
            statvals.push(data[statnames[i]])
        }
        // console.log(statnames)
        // console.log(statvals)
        // divNames = ["stats", "stats2", "stats3", "stats4", "stats5", "stats6", "stats7", "stats8", "stats9", "stats10"]
        // for (var i = 0; i < divNames.length; i++) {
        //     addStats(statVals, divNames[i])
        // }
        addStats(statvals);
        localStats = statvals;
        // Some stats we need to show by default:
        // Description, market cap, EBITDA, PERatio, EPS, DividendPerShare
    })
}


function graphMiracle(stonk,interval)
{
  getData(stonk,interval).then(response=>{
    let data = response[`Time Series (${interval}min)`]
    // if((data == undefined || data == null))
    // {
    //   console.log("epic fail")
    //   if(RUN_ONCE)
    //   {
    //     console.log("api fail")
    //     alert("It seems you have selected an invalid ticker code. Please try again.")
    //     location.reload()
    //   }
    //   RUN_ONCE = true
    //   return
    // }
    let xvals = (Object.keys(data)).reverse()
    let xvalsDates = []
    let yvals = []
    for(let i = 0; i < xvals.length; i++)
    {
        yvals.push(parseFloat((data[xvals[i]][["4. close"]])))
        let dateString = xvals[i]
        let currDate = new Date(parseInt(dateString.slice(0,4)),(parseInt(dateString.slice(5,7))) - 1,parseInt(dateString.slice(8,10)),parseInt(dateString.slice(11,13)),parseInt(dateString.slice(14,16)),parseInt(dateString.slice(17)))
        xvalsDates.push(currDate)
    }
    graph(xvalsDates,yvals,stonk,interval)
})
}



// Our labels along the x-axis
//var years = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050];
// For drawing the lines
//var africa = [86,114,106,106,107,111,133,221,783,2478];
var myChart = null


label = []
function graph(date, price, stonk, interval){
  //Convert date Object
  label = []
  month = []
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  for (i = 0; i< date.length; i++){
    //d = new Date(date[i])
    label.push(month[date[i].getMonth()] + " " + (date[i].getDate()));
  }
//  return number of milliseconds elapsed from January 1, 1970
// if your date is less than that date, the value will be negative

  //console.log(label);
  // Graph
  var ctx = document.getElementById("myChart");
  if (myChart != null)
  {
    myChart.destroy();
    console.log("Ran")
  }
  myChart = new Chart(ctx, {
    type: 'line',

    data: {
      labels: label,
      datasets: [
        {
          data: price,
          label: stonk,
          borderColor: 'rgb(255, 195, 4)',
          fill: false        }
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      elements: {
          point:{
              radius: 0
            }

        }
    }
  });

}
function graphMulti(date, price, ydata, xdata, stonk, interval){
  //Convert date Object
  label = []
  month = []
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  console.log("dates")
  console.log(date)
  second_price_array = []
  for (i = 0; i< date.length; i++){
    //d = new Date(date[i])
    label.push(month[date[i].getMonth()] + " " + (date[i].getDate()));
    second_price_array.push(null)
  }
  for (i = 0; i< ydata.length; i++){
    //d = new Date(date[i])
    label.push(month[ydata[i].getMonth()] + " " + (ydata[i].getDate()));
    second_price_array.push(xdata[i])
  }
//  return number of milliseconds elapsed from January 1, 1970
// if your date is less than that date, the value will be negative

  console.log(label);
  // Graph
  var ctx = document.getElementById("myChart");
  if (myChart != null)
  {
    myChart.destroy();
    console.log("Ran")
  }
  myChart = new Chart(ctx, {
    type: 'line',

    data: {
      labels: label,
      datasets: [
        {
          data: price,
          label: stonk,
          borderColor: 'rgb(255, 195, 4)',
          fill: false        },
        {
          data: second_price_array,
          label: "Prediction",
          borderColor: 'rgb(34, 94, 43)',
          fill: false        }
      ],
    },
    options: {
      elements: {
          point:{
              radius: 0
            }
        }
    }
  });

}

function linearRegression(y,x){
  var lr = {};
  var n = y.length;
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var sum_yy = 0;

  for (var i = 0; i < y.length; i++) {

      sum_x += x[i];
      sum_y += y[i];
      sum_xy += (x[i]*y[i]);
      sum_xx += (x[i]*x[i]);
      sum_yy += (y[i]*y[i]);
  }

  lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
  lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
  lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

  return lr;
}
function futureGenerator(inputDate, noCalls)
{
  let output = {}
  let outputArray = []
  let outputArrayString = []
  let firstDate = inputDate
  for(let i = 0; i < noCalls; i++)
  {
      if(parseInt(firstDate.slice(11,13)) == 20)
      {
          let currDate = new Date(parseInt(firstDate.slice(0,4)),(parseInt(firstDate.slice(5,7))) - 1,parseInt(firstDate.slice(8,10)),parseInt(5),parseInt(firstDate.slice(14,16)),parseInt(firstDate.slice(17)))
          let nextDay = getNextWork(currDate)
          firstDate = `${nextDay.getFullYear()}-${("0" + (nextDay.getMonth() + 1)).slice(-2)}-${("0" + nextDay.getDate()).slice(-2)} 05:00:00`
          nextDay.setHours(5)
          outputArray.push(nextDay.getTime())
      }
      else
      {
          let currDate = new Date(parseInt(firstDate.slice(0,4)),(parseInt(firstDate.slice(5,7))) - 1,parseInt(firstDate.slice(8,10)),parseInt(firstDate.slice(11,13)),parseInt(firstDate.slice(14,16)),parseInt(firstDate.slice(17)))
          let nextHour = new Date(currDate.setHours(currDate.getHours() + 1))
          firstDate = `${nextHour.getFullYear()}-${("0" + (nextHour.getMonth() + 1)).slice(-2)}-${("0" + nextHour.getDate()).slice(-2)} ${("0" + (nextHour.getHours())).slice(-2)}:00:00`
          outputArray.push(nextHour.getTime())
      }
      outputArrayString.push(firstDate)
  }
  output['strings'] = outputArrayString
  output['numbers'] = outputArray
  return output
}
function getNextWork(d) {
  d.setDate(d.getDate()+1);
  if (d.getDay()==0) d.setDate(d.getDate()+1);
  else if (d.getDay()==6) d.setDate(d.getDate()+2);
  return d;
}
function erfcinv(p) {
let j = 0;
let x, err, t, pp;
if (p >= 2)
  return -100;
if (p <= 0)
  return 100;
pp = (p < 1) ? p : 2 - p;
t = Math.sqrt(-2 * Math.log(pp / 2));
x = -0.70711 * ((2.30753 + t * 0.27061) /
  (1 + t * (0.99229 + t * 0.04481)) - t);
for (; j < 2; j++) {
  err = erfc(x) - pp;
  x += err / (1.12837916709551257 * Math.exp(-x * x) - x * err);
}
return (p < 1) ? x : -x;
}
function erfc(x) {
return 1 - erf(x);
}
function erf(x) {
const cof = [-1.3026537197817094, 6.4196979235649026e-1, 1.9476473204185836e-2,
  -9.561514786808631e-3, -9.46595344482036e-4, 3.66839497852761e-4,
  4.2523324806907e-5, -2.0278578112534e-5, -1.624290004647e-6,
  1.303655835580e-6, 1.5626441722e-8, -8.5238095915e-8,
  6.529054439e-9, 5.059343495e-9, -9.91364156e-10,
  -2.27365122e-10, 9.6467911e-11, 2.394038e-12,
  -6.886027e-12, 8.94487e-13, 3.13092e-13,
  -1.12708e-13, 3.81e-16, 7.106e-15,
  -1.523e-15, -9.4e-17, 1.21e-16,
  -2.8e-17
];
let j = cof.length - 1;
let isneg = false;
let d = 0;
let dd = 0;
let t, ty, tmp, res;

if (x < 0) {
  x = -x;
  isneg = true;
}

t = 2 / (2 + x);
ty = 4 * t - 2;

for (; j > 0; j--) {
  tmp = d;
  d = ty * d - dd + cof[j];
  dd = tmp;
}

res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
return isneg ? res - 1 : 1 - res;
}
function invnorm(p, mean, std) {
return -1.41421356237309505 * std * erfcinv(2 * p) + mean;
}

function predictions_two_one(stonk,interval,key)
{
    getData(stonk,interval,key).then(response=>{
        let data = response[`Time Series (${interval}min)`]

        let xvals = Object.keys(data)
        let xvalsDates = []
        let yvals = []
        let xvalsTwoWeek = []
        for(let i = 0; i < 160; i++)
        {
            yvals.push(parseFloat((data[xvals[i]][["4. close"]])))
            let dateString = xvals[i]
            xvalsTwoWeek.push(dateString)
            let currDate = new Date(parseInt(dateString.slice(0,4)),(parseInt(dateString.slice(5,7))) - 1,parseInt(dateString.slice(8,10)),parseInt(dateString.slice(11,13)),parseInt(dateString.slice(14,16)),parseInt(dateString.slice(17)))
            xvalsDates.push(currDate.getTime())
        }
        yvals.reverse()
        xvalsTwoWeek.reverse()
        xvalsDates.reverse()
        console.log(yvals)
        console.log(xvalsTwoWeek)
        let linregTwoWeek = linearRegression(yvals,xvalsDates)
        console.log(linregTwoWeek.slope)
        //console.log(xvalsTwoWeek.slice(-1)[0])
        let future = futureGenerator(xvalsTwoWeek.slice(-1)[0],80)
        let futurexvals = future.numbers
        let futureyvals = []
        for(let i = 0; i < futurexvals.length; i++)
        {
            let predictedValue = (linregTwoWeek.intercept + (futurexvals[i] * linregTwoWeek.slope)) * invnorm(Math.random(),1,STANDARD_DEV)
            futureyvals.push(predictedValue)
        }
        futurexvals.unshift(xvalsDates.slice(-1)[0])
        futureyvals.unshift(yvals.slice(-1)[0])
        let currentXToGraph = numToDate(xvalsDates)
        let futureXToGraph = numToDate(futurexvals)
        // Put into the graph function: currentXToGraph, futureXtoGraph, yvals, futureyvals
        // ^Date1, date2 price1, price2
        // \/Date1, price1, date2, price2
        graphMulti(currentXToGraph, yvals, futureXToGraph, futureyvals, stonk, interval)
    })
}

function numToDate(list)
{
  let outputArray = []
  for(let i = 0; i < list.length; i++)
  {
    let myDate = new Date(list[i])
    outputArray.push(myDate)
  }
  return outputArray
}


function addData(myChart, label, data) {
    var foo = [];
    for (var i = 1; i <= label.length; i++) {

       foo.push(i+100);
    }
    console.log(foo)
    //myChart.data.labels.push(label);
    myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(foo);
    });
    myChart.update();
}


//addData(myChart, label, foo)

function buttonClickGo() {
    console.log("buttonClickGo Ran")
    var inputVal = document.getElementById("sample3").value;
    //radio button
    timing_scale = "60"
    if(document.getElementById('option-1').checked) {
      timing_scale = "1"
    }
    else if(document.getElementById('option-2').checked) {
      timing_scale = "15"
    }
    else if(document.getElementById('option-3').checked) {
      timing_scale = "60"
    }
    else {
      console.log("No timing selected")
    }

    // add checking for which graph it does
    if(document.getElementById('option-4').checked) {
      // whatever we use for graph 1
    }
    else if(document.getElementById('option-5').checked) {
      // whatever we use for graph 2
    }
    else {
      console.log("No stock graph selected")
    }


    //console.log(timing_scale)
    graphMiracle(inputVal,timing_scale);
    // var spinnerTemp = document.getElementById("spinner")
    // spinnerTemp.remove()
    statsMiracle(inputVal);

}

buttonClickGo()


//predictions_two_one("AAPL","60",STOCKS_API_KEYS[0])
// All of the stats
/*
['Symbol', 'AssetType', 'Name', 'Description', 'CIK', 'Exchange', 'Currency', 'Country', 'Sector', 'Industry', 'Address', 'FiscalYearEnd', 'LatestQuarter', 'MarketCapitalization', 'EBITDA', 'PERatio', 'PEGRatio', 'BookValue', 'DividendPerShare', 'DividendYield', 'EPS', 'RevenuePerShareTTM', 'ProfitMargin', 'OperatingMarginTTM', 'ReturnOnAssetsTTM', 'ReturnOnEquityTTM', 'RevenueTTM', 'GrossProfitTTM', 'DilutedEPSTTM', 'QuarterlyEarningsGrowthYOY', 'QuarterlyRevenueGrowthYOY', 'AnalystTargetPrice', 'TrailingPE', 'ForwardPE', 'PriceToSalesRatioTTM', 'PriceToBookRatio', 'EVToRevenue', 'EVToEBITDA', 'Beta', '52WeekHigh', '52WeekLow', '50DayMovingAverage', '200DayMovingAverage', 'SharesOutstanding', 'SharesFloat', 'SharesShort', 'SharesShortPriorMonth', 'ShortRatio', 'ShortPercentOutstanding', 'ShortPercentFloat', 'PercentInsiders', 'PercentInstitutions', 'ForwardAnnualDividendRate', 'ForwardAnnualDividendYield', 'PayoutRatio', 'DividendDate', 'ExDividendDate', 'LastSplitFactor', 'LastSplitDate']
*/
