"use strict"


const STANDARD_DEV = 0.005


const STOCKS_API_KEYS = ["BAWUNG9CEURCMYS1","72Y437B8U69J7EUC"]


async function getData(stonk,interval,key)
{
    let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stonk}&interval=${interval}min&outputsize=full&apikey=${key}`);
    let data = await response.json();
    return data
}

async function getDataStats(stonk,key)
{
    let response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stonk}&apikey=${key}`);
    let data = await response.json();
    return data
}



function graphMiracle(stonk,interval,key)
{
    getData(stonk,interval,key).then(response=>{
        let data = response[`Time Series (${interval}min)`]
        
        let xvals = (Object.keys(data)).reverse()
        let yvals = []
        for(let i = 0; i < xvals.length; i++)
        {
            yvals.push(parseFloat((data[xvals[i]][["4. close"]])))
        }
        console.log(JSON.stringify(xvals))
        console.log(JSON.stringify(yvals))
    })
    
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
        let futurexvals = futureGenerator(xvalsTwoWeek[-1],80)
        let futureyvals = []
        for(let i = 0; i < futurexvals.length; i++)
        {
            let predictedValue = (linregTwoWeek.intercept + (futurexvals * linregTwoWeek.intercept)) * invnorm(Math.random(),1,STANDARD_DEV)
            futureyvals.push(predictedValue)
        }
    })
}



function statsMiracle(stonk,key)
{
    getDataStats(stonk,key).then(response=>{
        let data = response
        let statnames = Object.keys(data)
        let statvals = []
        for(let i = 0; i < statnames.length; i++)
        {
            statvals.push(data[statnames[i]])
        }
        // console.log(JSON.stringify(statnames))
        // console.log(statvals)
    })
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
    let outputArray = []
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
        //outputArray.push(firstDate)
    }
    return outputArray
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
