const PORTFOLIO_INDEX_KEY = "stockIndex";
const PORTFOLIO_DATA_KEY = "stockData";
const STOCKS_API_KEYS = ["BAWUNG9CEURCMYS1","72Y437B8U69J7EUC","0C8P30ZJGYWYY4EY","UEPAY9DWMY3AZK1O","JABH74ZELQSRN0BX","H99FX9R8M8D97RGE","759EZ13ABT4B61T0","54XK0XZMNY85SV2K","WE29JU0IAU6N0EKA","OX4FV8RZBDH5I0ZY","TBRU0JH3C9QHDMCB","0JLYRXVMF1YXKAST","SQ5QU5ENXMR2NXHO","72BJVGWCFHEBX1II","YYP4RW8FELTHTV3V","TRFXAR5LQ1HSRQX6","M87CE0RP776JLRRI","OWAIO5E35IHIJP0E","26EYY8C9BK4XO49B","NW5JXRI31MRE0S8R","QX9M2MAGNW4V4GF3","HKFR54KDF888C7WI","F6GGDQUVR56AECKU"]
let apiLen = STOCKS_API_KEYS.length





async function getData(stonk)
{
    let key = STOCKS_API_KEYS[Math.floor(Math.random() * apiLen)]
    console.log(`normal ${key}`)
    let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stonk}&interval=1min&outputsize=compact&apikey=${key}`);
    let data = await response.json();
    //console.log(data)
    return data
}

class Stock
{
  constructor(id = '', price = 0, qty = 0)
	{
		this._ticker = id;
    this._name = '';
		this._buyPrice = price;
		this._buyQty = qty;
		this._currentPrice = 0;
		this._notes = '';
	}
  //accessors
  get ticker() {return this._ticker; }
  get name() {return this._name; }
  get buyPrice() {return this._buyPrice.toFixed(2); }
  get buyQty() {return this._buyQty; }
  get currentPrice() {return this._currentPrice.toFixed(2); }
  get notes() {return this._notes; }
  get profit() {return ((this._buyQty)*(this._currentPrice - this._buyPrice)).toFixed(2)}
  // mutators


  currentPriceUpdate()
	{
    return new Promise(resolve =>
      getData(this.ticker).then(response=>{
                let data = response[`Time Series (1min)`]
                let xvals = (Object.keys(data))
                let curr_price = parseFloat((data[xvals[0]][["4. close"]]))
                curr_price.toFixed(2)
                this._currentPrice = curr_price
                console.log(curr_price)
                //this._stocks[i].currentPriceUpdate(curr_price)
                resolve(`${this.ticker} resolved`)
              })
    )
	}

  fromData(data)
  {
    this._ticker = dataObject._ticker;
    this._name = dataObject._name;
    this._buyPrice = dataObject._buyPrice;
    this._buyQty = dataObject._buyQty;
    this._currentPrice = dataObject._currentPrice;
    this._notes = dataObject._notes;

  }
}

class Portfolio
{
  constructor()
  {
    this._stocks = [];
      // array
  }
  // accessors
  get stocks() {return this._stocks; }
  get count() {return this._stocks.length}


  get profit()
  {
    //this.updateCurrentPrice()
    let profit = 0
    for (let i = 0; i < this._stocks.length; i ++)
    {
      profit += parseFloat((this._stocks[i].profit))
    }
    return profit.toFixed(2)
  }

  get outlay()
  {
    let outlay = 0
    for (let i = 0; i < this._stocks.length; i ++)
    {
      outlay += parseFloat(this._stocks[i].buyPrice)
    }
    return outlay.toFixed(2)
  }

  get portVal()
  {
    //this.updateCurrentPrice()
    let portVal = 0
    for (let i = 0; i < this._stocks.length; i ++)
    {
      portVal += parseFloat(this._stocks[i].currentPrice)
    }
    return portVal.toFixed(2)
  }

  addStock(id, price, qty)
  {
    this._stocks.push(new Stock(id, price, qty));
    //this.updateCurrentPrice()
  }
  getStock(index)
  {
    return this._stocks[index];
  }

  // removeStock(id)
  // {
  //   for (let i = 0; i < this._stocks.length; i ++)
  //   {
  //   		if(this._stocks[i]._ticker == id)
  //   		{
  //   			this._stocks.splice(i, 1);
  //         i=0;
  //         // repeats search in case there are multiple elements with same ID
  //   		}
  //   }
  // }

  removeStockByPos(i)
  {
    this._stocks.splice(i,1)
  }


  async updateCurrentPrice()
  {
    // for(let i = 0; i<this._stocks.length; i++)
    // {
    //     getData(this._stocks[i].ticker).then(response=>{
    //       let data = response[`Time Series (1min)`]
    //       let xvals = (Object.keys(data))
    //       let curr_price = parseFloat((data[xvals[0]][["4. close"]]))
    //       curr_price.toFixed(2)
    //       console.log(curr_price)
    //       this._stocks[i].currentPriceUpdate(curr_price)
    //     })
    // }

    // return new Promise(resolve => {
    //   for(let i = 0; i<this._stocks.length; i++)
    //     {

    //     }
    // })

    for(let i = 0; i<this._stocks.length; i++)
      {
        let result = await this._stocks[i].currentPriceUpdate()
        console.log(result)
      }



    //updateLocalStorage(this._stocks)
  }




  fromData(data)
  {
		// make a variable to hold just the array
		this._stocks = data;
	}
}




let portfolio = new Portfolio()

async function updateCurrentPricePortfolio(){
  result = await portfolio.updateCurrentPrice()
  new Promise(resolve =>{
    resolve("update done")
  })

}


portfolio.addStock("IBM",150,10)
portfolio.addStock("AMZN",3000,2)
portfolio.addStock("GME",100,12)
portfolio.addStock("AAPL",130,7)

// portfolio.addStock("IBM",150,10)
// portfolio.addStock("AMZN",3000,2)
// portfolio.addStock("GME",100,12)
// portfolio.addStock("AAPL",130,7)

function checkIfDataExistsLocalStorage()
{
  let jsonString = localStorage.getItem(PORTFOLIO_DATA_KEY)
  if (!!jsonString && jsonString !== null && jsonString !== undefined && jsonString !== '')
  {
    return true;
  }
  else
  {
    return false;
  }
}


function updateLocalStorage(data)
{
  let jsonStringInput = JSON.stringify(data);
  localStorage.setItem(PORTFOLIO_DATA_KEY,jsonStringInput);
}


function getDataLocalStorage()
{
  // get the data from localStorage
  let jsonDetails = localStorage.getItem(PORTFOLIO_DATA_KEY);
  // convert locally stored file back into an object
  let retrievedData = JSON.parse(jsonDetails);
  return retrievedData;
}


if (checkIfDataExistsLocalStorage() == true)
{
  portfolio.fromData(getDataLocalStorage());

}
if (checkIfDataExistsLocalStorage() !== true)
{
  //#Run an add stock function
}

function deleteStock(id)
{
  if (confirm("Are you sure?"))
  {
      // runs if user clicks 'OK'
      portfolio.removeStock(id);
      updateLocalStorage(portfolio);
      alert("Stock deleted");
      window.location = "index.html";
  }
}


//###########################################
///############## PORTFOLIO GUI #############
//###########################################
async function loadCPAndProfit()
{
  await updateCurrentPricePortfolio()



  for(let i = 0; i < retrievePortfolio().length; i++)
  {
    console.log("rannnn")
    var currentHTML = document.getElementById(`stock${i}price`)
    currentHTML.innerHTML = `${retrievePortfolio()[i].currentPrice}`

    var currentHTML = document.getElementById(`stock${i}profit`)
    currentHTML.innerHTML = `${retrievePortfolio()[i].profit}`

  }

  var outlay = document.getElementById("outlay")
  outlay.innerHTML = `${portfolio.outlay}`

  var value = document.getElementById("value")
  value.innerHTML = `${portfolio.portVal}`
  
  var profit = document.getElementById("profit")
  profit.innerHTML = `${portfolio.profit}`
}


//hello

async function createPortfolioTable() {
    var blankTable = '<tr id="portStock1" style="height:98px"></tr><tr id="portStock2" style="height:98px"></tr><tr \
    id="portStock3" style="height:98px"></tr><tr id="portStock4" style="height:98px"></tr><tr id="portStock5" style="height:98px"></tr>\
    </tr><tr id="portTotalHeading"></tr><tr id="portTotal"></tr>'
    var bodyRef = document.getElementById("bodyReference")
    bodyReference.innerHTML = blankTable
    var howManyFilled = retrievePortfolio().length
    console.log(howManyFilled)
    var tableRowIndices = ["portStock1", "portStock2", "portStock3", "portStock4", "portStock5"]
    // fill in their data
    loadCPAndProfit()
    for (i=0;i<howManyFilled;i++) {
        console.log("previous data?")
        // prev
        var currentRow = document.getElementById(tableRowIndices[i])
        var nameHTML = document.createElement("td")
        nameHTML.insertAdjacentHTML("beforeend",retrievePortfolio()[i].ticker)
        currentRow.appendChild(nameHTML)

        var qtyHTML = document.createElement("td")
        qtyHTML.insertAdjacentHTML("beforeend", retrievePortfolio()[i].buyQty)
        currentRow.appendChild(qtyHTML)

        var buyHTML = document.createElement("td")
        buyHTML.insertAdjacentHTML("beforeend", retrievePortfolio()[i].buyPrice)
        currentRow.appendChild(buyHTML)

        var currentHTML = document.createElement("td")
        currentHTML.insertAdjacentHTML("beforeend", `<label id = "stock${i}price">Loading<\label>`)
        currentRow.appendChild(currentHTML)

        var profitHTML = document.createElement("td")
        profitHTML.insertAdjacentHTML("beforeend", `<label id = "stock${i}profit">Loading<\label>`)
        currentRow.appendChild(profitHTML)

        // var currentHTML = document.createElement("td")
        // currentHTML.insertAdjacentHTML("beforeend", `retrievePortfolio()[i].currentPrice`)
        // currentRow.appendChild(currentHTML)

        // var profitHTML = document.createElement("td")
        // profitHTML.insertAdjacentHTML("beforeend", retrievePortfolio()[i].profit)
        // currentRow.appendChild(profitHTML)




        // // Don't need this?
        // var addHTML = document.createElement("td")
        // addHTML.setAttribute("style", "text-align:center")
        // addHTML.insertAdjacentHTML("beforeend", '<button class="mdl-button \
        // mdl-js-button mdl-button--icon mdl-button--accent" style="text-align:center;margin:auto;width:90%;height:90%"><i class="\
        // material-icons" style="font-size:84px;left:20px">add_circle_outline</i></button>')
        // currentRow.appendChild(addHTML)

        var removeHTML = document.createElement("td")
        removeHTML.setAttribute("style", "text-align:center")
        removeHTML.insertAdjacentHTML("beforeend", `<button class="mdl-button \
        mdl-js-button mdl-button--icon mdl-button--accent" style="text-align:center;margin:auto;width:90%;height:90%"><i class="\
        material-icons" style="font-size:78px;left:20px" onclick="removeStockFromPortfolio(${i})">remove_circle_outline</i></button>`)
        currentRow.appendChild(removeHTML)
        currentRow.insertAdjacentHTML("afterend", "<tr><br></tr>")

    }
    // create open table slots
    for (i=howManyFilled;i<5;i++) {
        console.log("started table")
        var currentRow = document.getElementById(tableRowIndices[i])
        var nameHTML = document.createElement("td")
        nameHTML.insertAdjacentHTML("beforeend", `<form action="#"><div class=\
        "mdl-textfield mdl-js-textfield" style="margin-left:16px;margin-top:0px;margin-bottom:0px;margin-right:16px;width:75%"><input \
        class="mdl-textfield__input" type="text" id="portTicker${i}"><label class=\
        "mdl-textfield__label" for="portTicker">Ticker Code</label></div></form>`)
        currentRow.appendChild(nameHTML)

        var qtyHTML = document.createElement("td")
        qtyHTML.insertAdjacentHTML("beforeend", `<form action="#"><div class=\
        "mdl-textfield mdl-js-textfield" style="margin-left:16px;margin-top:0px;margin-bottom:0px;margin-right:16px;width:75%"><input \
        class="mdl-textfield__input" type="text" id="portQty${i}"><label class=\
        "mdl-textfield__label" for="portQty">Quantity</label></div></form>`)
        currentRow.appendChild(qtyHTML)

        var buyHTML = document.createElement("td")
        buyHTML.insertAdjacentHTML("beforeend", `<form action="#"><div class=\
        "mdl-textfield mdl-js-textfield" style="margin-left:16px;margin-top:0px;margin-bottom:0px;margin-right:16px;width:75%"><input \
        class="mdl-textfield__input" type="text" id="portBuy${i}"><label class=\
        "mdl-textfield__label" for="portBuy">Buy Price</label></div></form>`)
        currentRow.appendChild(buyHTML)

        var currentHTML = document.createElement("td")
        currentRow.appendChild(currentHTML)

        var profitHTML = document.createElement("td")
        currentRow.appendChild(profitHTML)

        var addHTML = document.createElement("td")
        addHTML.setAttribute("style", "text-align:center")
        addHTML.insertAdjacentHTML("beforeend", `<button class="mdl-button \
        mdl-js-button mdl-button--icon mdl-button--accent" style="text-align:center;margin:auto;width:90%;height:90%"><i class="\
        material-icons" style="font-size:78px;left:20px" onclick="addStockToPortfolio(${i})" id="buttoncol0">add_circle_outline</i></button>`)
        currentRow.appendChild(addHTML)

        // var removeHTML = document.createElement("td")
        // removeHTML.setAttribute("style", "text-align:center")
        // removeHTML.insertAdjacentHTML("beforeend", `<button class="mdl-button \
        // mdl-js-button mdl-button--icon mdl-button--accent" style="text-align:center;margin:auto;width:90%;height:90%"><i class="\
        // material-icons" style="font-size:84px;left:20px" onclick="removeStockFromPortfolio(${i})">remove_circle_outline</i></button>`)
        // currentRow.appendChild(removeHTML)
        currentRow.insertAdjacentHTML("afterend", "<tr><br></tr>")
    }
    var currentRow = document.getElementById("portTotalHeading")
    var nameHTML = document.createElement("th")
    nameHTML.insertAdjacentHTML("beforeend", "<h6 style='margin-top:12px;margin-bottom:12px'>Overall</h6>")
    currentRow.appendChild(nameHTML)

    var qtyHTML = document.createElement("th")
    qtyHTML.insertAdjacentHTML("beforeend", "<h6 style='margin-top:12px;margin-bottom:12px'>Outlay</h6>")
    currentRow.appendChild(qtyHTML)

    var buyHTML = document.createElement("th")
    buyHTML.insertAdjacentHTML("beforeend", "<h6 style='margin-top:12px;margin-bottom:12px'>Value</h6>")
    currentRow.appendChild(buyHTML)

    var currentHTML = document.createElement("th")
    currentHTML.insertAdjacentHTML("beforeend", "<h6 style='margin-top:12px;margin-bottom:12px'>Profit</h6>")
    currentHTML.setAttribute("colspan", "3")
    currentRow.appendChild(currentHTML)
    currentRow.insertAdjacentHTML("afterend", '<td style="border:0px;background:#eee"><br></td>')

    var currentRow = document.getElementById("portTotal")
    var nameHTML = document.createElement("td")
    nameHTML.insertAdjacentHTML("beforeend", "<p style='margin-left:16px;margin-top:12px;margin-bottom:12px'>Statistics</p>")
    currentRow.appendChild(nameHTML)


    var outlay = document.createElement("td")
    outlay.insertAdjacentHTML("beforeend",`<label id = "outlay">Loading<\label>`)
    currentRow.appendChild(outlay)

    var value = document.createElement("td")
    value.insertAdjacentHTML("beforeend",`<label id = "value">Loading<\label>`)
    currentRow.appendChild(value)

    var profit = document.createElement("td")
    profit.insertAdjacentHTML("beforeend",`<label id = "profit">Loading<\label>`)
    profit.setAttribute("colspan", "3")
    currentRow.appendChild(profit)

}

function retrievePortfolio () {
  // retrieves a list of their stocks if they have used before
  // Needs to talk to local storage at some point
  return portfolio.stocks
}

function addStockToPortfolio(currentthing) {
    // only doing first one for now
    //console.log(currentthing)
    var tickertemp = document.getElementById(`portTicker${currentthing}`).value
    var qtytemp = document.getElementById(`portQty${currentthing}`).value
    var buytemp = document.getElementById(`portBuy${currentthing}`).value
    portfolio.addStock(tickertemp, parseFloat(qtytemp), parseFloat(buytemp))
    createPortfolioTable()
}

function removeStockFromPortfolio(i){
  portfolio.removeStockByPos(i)
  createPortfolioTable()
}








//portfolio.updateCurrentPrice()
//console.log(portfolio._stocks)

//setTimeout(function whatisthis(){createPortfolioTable()},1)

createPortfolioTable()


//Testing Code
