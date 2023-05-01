let currency = {
  coin: 15,
  research: 5,

  coinDis: document.querySelector('.coins'),
  researchDis: document.querySelector('.research'),
};

let ingredients = {
  dilutedLiquid: 2,
  suspiciousPlant: 1,
  suspiciousMushroom: 1,
  fourLeafClover: 0,

  dilutedLiquidDis: document.querySelector('.dilutedLiquid'),
  suspiciousPlantDis: document.querySelector('.suspiciousPlant'),
  suspiciousMushroomDis: document.querySelector('.suspiciousMushroom'),
  fourLeafCloverDis: document.querySelector('.fourLeafClover'),

  //locked items
  knownItems: ["", "BLANK", "DILUTED LIQUID", "SUSPICIOUS PLANT", "SUSPICIOUS MUSHROOM"],
  fourLeafCloverDisplay: document.querySelector('.fourLeaf'),
};

let inputs = {
  //brewer
  input1: document.querySelector('.input1'),
  input2: document.querySelector('.input2'),
  input3: document.querySelector('.input3'),
}

let currentRecipe = [];

const alerts = document.querySelector('.alertBox');

function updateVals() {
  currency.coinDis.textContent = currency.coin;
  currency.researchDis.textContent = currency.research;

  ingredients.dilutedLiquidDis.textContent = ingredients.dilutedLiquid;
  ingredients.suspiciousPlantDis.textContent = ingredients.suspiciousPlant;
  ingredients.suspiciousMushroomDis.textContent = ingredients.suspiciousMushroom;
  ingredients.fourLeafCloverDis.textContent = ingredients.fourLeafClover;
}

function convert() {
  if (currency.coin >= 5) {
    currency.coin = currency.coin - 5;
    currency.research = currency.research + 1;
    alerts.textContent = "Success! Converted 5 coins to 1 research";
    updateVals();
  }
  else{
    alerts.textContent = "Error! Not enough coins!";
  }
}

function brew(){
  for(let i = 0; i <= ingredients.knownItems.length; i++){
    if(ingredients.knownItems[i] === inputs.input1.value){
      currentRecipe.push(inputs.input1);
      break;
    }
    else{
      if(i == ingredients.knownItems.length){
        alerts.textContent = "The ingredient you tried to enter is not valid or you did not unlock it yet."
        currentRecipe = [];
      }
    }
  }
  for(let i = 0; i <= ingredients.knownItems.length; i++){
    if(ingredients.knownItems[i] === inputs.input2.value){
      currentRecipe.push(inputs.input2);
      break;
    }
    else{
      if(i == ingredients.knownItems.length){
        alerts.textContent = "The ingredient you tried to enter is not valid or you did not unlock it yet."
        currentRecipe = [];
      }
    }
  }
  for(let i = 0; i <= ingredients.knownItems.length; i++){
    if(ingredients.knownItems[i] === inputs.input3.value){
      currentRecipe.push(inputs.input3);
      break;
    }
    else{
      if(i == ingredients.knownItems.length){
        alerts.textContent = "The ingredient you tried to enter is not valid or you did not unlock it yet."
        currentRecipe = [];
      }
    }
  }

  if(currentRecipe.length === 3){
    if(currentRecipe === ["SUSPICIOUS PLANT", "DILUTED LIQUID", "BLANK"]){
      alerts.textContent("Congratulations! You made a 'Healing potion', earning you 3 coins.")
      currency.coin = currency.coin + 3;
      ingredients.dilutedLiquid--
      ingredients.suspiciousPlant--
      currentRecipe = [];
    }
  }
  else{
    alerts.textContent = "You did not enter all the ingredients. If you don't need anything for an ingredient slot, please put BLANK."
  }

  updateVals()
}

//ON START
ingredients.fourLeafCloverDisplay.style.display = "none";
updateVals();
