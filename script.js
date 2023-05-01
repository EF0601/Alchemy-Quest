let currency = {
  coin: 10,
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
  knownItems: ["dilutedLiquid", "suspiciousPlant", "suspiciousMushroom"],
  fourLeafCloverDisplay: document.querySelector('.fourLeaf'),
};

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

//ON START
ingredients.fourLeafCloverDisplay.style.display = "none";
updateVals();
