

function createPortfolioTable() {
    var howManyFilled = retrievePortfolio().length
    console.log(howManyFilled)
    var tableRowIndices = ["portStock1", "portStock2", "portStock3", "portStock4", "portStock5"]
    // fill in their data
    for (i=0;i<howManyFilled;i++) {
        console.log("previous data?")
        // prev
    }
    // create open table slots
    for (i=howManyFilled;i<5;i++) {
        console.log("started table")
        var currentRow = document.getElementById(tableRowIndices[i])
        var nameHTML = document.createElement("td")
        nameHTML.insertAdjacentHTML("beforeend", '<form action="#"><div class=\
        "mdl-textfield mdl-js-textfield"><input \
        class="mdl-textfield__input" type="text" id="portTicker"><label class=\
        "mdl-textfield__label" for="portTicker">Ticker Code</label></div></form>')
        currentRow.appendChild(nameHTML)

        var qtyHTML = document.createElement("td")
        qtyHTML.insertAdjacentHTML("beforeend", '<form action="#"><div class=\
        "mdl-textfield mdl-js-textfield"><input \
        class="mdl-textfield__input" type="text" id="portQty"><label class=\
        "mdl-textfield__label" for="portQty">Quantity</label></div></form>')
        currentRow.appendChild(qtyHTML)

        var buyHTML = document.createElement("td")
        buyHTML.insertAdjacentHTML("beforeend", '<form action="#"><div class=\
        "mdl-textfield mdl-js-textfield"><input \
        class="mdl-textfield__input" type="text" id="portBuy"><label class=\
        "mdl-textfield__label" for="portBuy">Buy Price</label></div></form>')
        currentRow.appendChild(buyHTML)

        var currentHTML = document.createElement("td")
        currentRow.appendChild(currentHTML)

        var profitHTML = document.createElement("td")
        currentRow.appendChild(profitHTML)

        var addHTML = document.createElement("td")
        addHTML.setAttribute("style", "text-align:center")
        addHTML.insertAdjacentHTML("beforeend", '<button class="mdl-button \
        mdl-js-button mdl-button--icon mdl-button--colored" style="text-align:center;margin:auto"><i class="\
        material-icons">add_circle_outline</i></button>')
        currentRow.appendChild(addHTML)

        var removeHTML = document.createElement("td")
        removeHTML.setAttribute("style", "text-align:center")
        removeHTML.insertAdjacentHTML("beforeend", '<button class="mdl-button \
        mdl-js-button mdl-button--icon mdl-button--colored" style="text-align:center;margin:auto"><i class="\
        material-icons">remove_circle_outline</i></button>')
        currentRow.appendChild(removeHTML)
        currentRow.insertAdjacentHTML("afterend", "<tr><br></tr>")
    }
    var currentRow = document.getElementById("portTotal")
    var nameHTML = document.createElement("td")
    nameHTML.insertAdjacentHTML("beforeend", '<form action="#"><div class=\
    "mdl-textfield mdl-js-textfield"><input \
    class="mdl-textfield__input" type="text" id="portTicker"><label class=\
    "mdl-textfield__label" for="portTicker">Ticker Code</label></div></form>')
    currentRow.appendChild(nameHTML)

    var qtyHTML = document.createElement("td")
    currentRow.appendChild(qtyHTML)

    var buyHTML = document.createElement("td")
    currentRow.appendChild(buyHTML)

    var currentHTML = document.createElement("td")
    currentRow.appendChild(currentHTML)

    var profitHTML = document.createElement("td")
    currentRow.appendChild(profitHTML)

    var addHTML = document.createElement("td")
    currentRow.appendChild(addHTML)

    var removeHTML = document.createElement("td")
    currentRow.appendChild(removeHTML)
}

function retrievePortfolio () {
  // retrieves a list of their stocks if they have used before
  return []
}

createPortfolioTable()
