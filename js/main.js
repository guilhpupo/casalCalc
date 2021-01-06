//variaveis de controle
var listsArray = [[] , [] , []]
var totalArray = [0,0,0]

//mapeamento do dom

const descriptionInput = document.querySelector("#descriptionInput")
const valueInput = document.querySelector("#valueInput")

const resultPhrase = document.querySelector("#result")

const lists = []
lists.push(document.querySelector("#listGuilherme"))
lists.push(document.querySelector("#listAlice"))
lists.push(document.querySelector("#listBoth"))

const buttons = []
buttons.push(document.querySelector("#btnAddGuilherme"))
buttons.push(document.querySelector("#btnAddAlice"))
buttons.push(document.querySelector("#btnAddBoth"))

buttons.forEach((button, i) => {
  button.addEventListener("click", () => addItem(i))

});


const totals = []
totals.push(document.querySelector("#totalGuilherme"))
totals.push(document.querySelector("#totalAlice"))
totals.push(document.querySelector("#totalBoth"))

//funções

//renderizar
function createTdDescription(description){
  let descriptionTd = document.createElement('td')
  descriptionTd.setAttribute('class', 'descriptionColumn')
  let descriptionTextNode = document.createTextNode(description)

  descriptionTd.appendChild(descriptionTextNode)

  return descriptionTd
}

function createTdValue(value){
  let valueTd = document.createElement('td')
  valueTd.setAttribute('class', 'valueColumn')
  let valueTextNode = document.createTextNode('R$' + parseFloat(value).toFixed(2))

  valueTd.appendChild(valueTextNode)

  return valueTd
}

function createTr(description, value){
  let tr = document.createElement('tr')
  tr.appendChild(createTdDescription(description))
  tr.appendChild(createTdValue(value))

  return tr
}

function createEmptyTr(){
  let tr = document.createElement('tr')
  let text = document.createTextNode('Não há itens cadastrados!')
  tr.appendChild(text)

  return tr
}

function renderTotals(){
  totalArray.forEach((total, i) => {
    totals[i].innerHTML = "R$" + total.toFixed(2)
  });

}

function renderLists(){
  lists.forEach((list, i) => {
    list.innerHTML = ""

    if(listsArray[i].length == 0){
      list.appendChild(createEmptyTr())
    }else{
      listsArray[i].forEach((item, j) => {
        list.appendChild(createTr(item.description,item.value))
      });
    }

  });

}

function renderResult(){
  let result = totalArray[1] + (totalArray[2] / 2)

  resultPhrase.innerHTML = ""

  let phrase = "Quanto será que Alice deve para Guilherme?"

  if(result > 0){
    phrase = "Alice deve R$" + result.toFixed(2) + " para Guilherme!"
  }

  resultPhrase.innerHTML = phrase
}

function resetFields(){
  descriptionInput.value = ""
  valueInput.value = ""

  descriptionInput.focus()
}

function addItem(i){
  let description = descriptionInput.value
  let value = valueInput.value

  descriptionInput.value = ""
  valueInput.value = ""

  listsArray[i].push({
                    description,
                    value
                    })

  totalArray[i]+=parseFloat(value)

  renderLists()
  renderTotals()
  renderResult()
  resetFields()
}



function startApp(){
  renderLists()
  renderTotals()
  renderResult()
  resetFields() 
}

startApp()
