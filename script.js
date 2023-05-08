let currency = {
  coin: 20,
  research: 5,
  points: 0,

  coinDis: document.querySelector('.coins'),
  researchDis: document.querySelector('.research'),
  pointsDis: document.querySelector('.points'),
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
  fourLeafCloverMarket: document.querySelector('.fourleafmarket'),
};

let inputs = {
  //brewer
  input1: document.querySelector('.input1'),
  input2: document.querySelector('.input2'),
  input3: document.querySelector('.input3'),

  //shop
  shopInput: document.querySelector('.shopInput'),

  //travel
  travelInput: document.querySelector('.travelLoc'),
};

let lockedRecipes = {
  luckRecipe: document.querySelector('.luckRecipe'),
  concentratedFluids: document.querySelector('.concentrateRecipe'),
};

let level = 0;

let locs = {
  currentLoc: "HOME",
  unlockedLocs: ["HOME", "MARKET"],
};

let currentRecipe = [];
let recipes = [["SUSPICIOUS PLANT", "DILUTED LIQUID", "BLANK"], ["SUSPICIOUS MUSHROOM", "DILUTED LIQUID", "BLANK"]];

const alerts = document.querySelector('.alertBox');

function updateVals() {
  currency.coinDis.textContent = currency.coin;
  currency.researchDis.textContent = currency.research;
  currency.pointsDis.textContent = currency.points;

  ingredients.dilutedLiquidDis.textContent = ingredients.dilutedLiquid;
  ingredients.suspiciousPlantDis.textContent = ingredients.suspiciousPlant;
  ingredients.suspiciousMushroomDis.textContent = ingredients.suspiciousMushroom;
  ingredients.fourLeafCloverDis.textContent = ingredients.fourLeafClover;

  if (locs.currentLoc === "HOME") {
    document.querySelector('.brewer').style.display = "block";
    document.querySelector('.shop').style.display = "none";
  }
  if (locs.currentLoc === "MARKET") {
    document.querySelector('.brewer').style.display = "none";
    document.querySelector('.shop').style.display = "block";
  }
  document.querySelector('.unlockPrice').textContent = 15 * (1+level);
}

function convert() {
  if (currency.coin >= 5) {
    currency.coin = currency.coin - 5;
    currency.research = currency.research + 1;
    alerts.textContent = "Success! Converted 5 coins to 1 research";
    currency.points = currency.points + 1;
    updateVals();
  }
  else {
    alerts.textContent = "Error! Not enough coins!";
  }
}

function brew() {
  for (let i = 0; i <= ingredients.knownItems.length; i++) {
    if (ingredients.knownItems[i] === inputs.input1.value.toUpperCase()) {
      currentRecipe.push(inputs.input1.value.toUpperCase());
      break;
    }
    else {
      if (i == ingredients.knownItems.length) {
        alerts.textContent = "The ingredient you tried to enter is not valid or you did not unlock it yet.";
        currentRecipe = [];
      }
    }
  }
  for (let i = 0; i <= ingredients.knownItems.length; i++) {
    if (ingredients.knownItems[i] === inputs.input2.value.toUpperCase()) {
      currentRecipe.push(inputs.input2.value.toUpperCase());
      break;
    }
    else {
      if (i == ingredients.knownItems.length) {
        alerts.textContent = "The ingredient you tried to enter is not valid or you did not unlock it yet.";
        currentRecipe = [];
      }
    }
  }
  for (let i = 0; i <= ingredients.knownItems.length; i++) {
    if (ingredients.knownItems[i] === inputs.input3.value.toUpperCase()) {
      currentRecipe.push(inputs.input3.value.toUpperCase());
      break;
    }
    else {
      if (i == ingredients.knownItems.length) {
        alerts.textContent = "The ingredient you tried to enter is not valid or you did not unlock it yet.";
        currentRecipe = [];
      }
    }
  }
  setTimeout(() => {
    if (currentRecipe.length === 3) {
      if (currentRecipe.length === recipes[0].length && currentRecipe.every((value, index) => value === recipes[0][index]) && ingredients.dilutedLiquid >= 1 && ingredients.suspiciousPlant >= 1) {
        alerts.textContent = "Congratulations! You made a 'Healing potion', earning you 3 coins.";
        currency.points = currency.points + 2;
        currency.coin = currency.coin + 3;
        ingredients.dilutedLiquid--;
        ingredients.suspiciousPlant--;
        currentRecipe = [];
      }
      if (currentRecipe.length === recipes[1].length && currentRecipe.every((value, index) => value === recipes[1][index]) && ingredients.dilutedLiquid >= 1 && ingredients.suspiciousMushroom >= 1) {
        alerts.textContent = "Congratulations! You made a 'Light potion', earning you 4 coins.";
        currency.points = currency.points + 3;
        currency.coin = currency.coin + 4;
        ingredients.dilutedLiquid--;
        ingredients.suspiciousMushroom--;
        currentRecipe = [];
      }
      if (level >= 1 && currentRecipe.length === recipes[2].length && currentRecipe.every((value, index) => value === recipes[2][index]) && ingredients.dilutedLiquid >= 1 && ingredients.fourLeafClover >= 1) {
        alerts.textContent = "Congratulations! You made a 'Luck potion', earning you 8 coins.";
        currency.points = currency.points + 5;
        currency.coin = currency.coin + 8;
        ingredients.dilutedLiquid--;
        ingredients.fourLeafClover--;
        currentRecipe = [];
      }
    }
    else {
      alerts.textContent = "An error occurred while brewing. Did you: A) forget to include 'blank' for no ingredients or B) you ran out of ingredients?";
      currentRecipe = [];
    }

    updateVals();
  }, 1000);
  // currentRecipe = [];
}

function del() {
  currentRecipe = [];
  alerts.textContent = "Success! Removed all ingredients from the brewer.";
  inputs.input1.value = "";
  inputs.input2.value = "";
  inputs.input3.value = "";
}

let temp = "";

function purchase() {
  if (locs.currentLoc === "MARKET") {
    for (let i = 0; i <= ingredients.knownItems.length; i++) {
      if (ingredients.knownItems[i] === inputs.shopInput.value.toUpperCase()) {
        temp = inputs.shopInput.value.toUpperCase();
        break;
      }
      else {
        if (i == ingredients.knownItems.length) {
          alerts.textContent = "The ingredient you tried to enter is not valid or you did not unlock it yet.";
          inputs.shopInput.value = "";
        }
      }
    }
    switch (temp) {
      case 'DILUTED LIQUID':
        if (currency.coin >= 1) {
          currency.coin--;
          ingredients.dilutedLiquid++;
          alerts.textContent = "Purchased!";
        }
        else {
          alerts.textContent = "No funds available!";
        }
        break;
      case 'SUSPICIOUS PLANT':
        if (currency.coin >= 1) {
          currency.coin--;
          ingredients.suspiciousPlant++;
          alerts.textContent = "Purchased!";
        }
        else {
          alerts.textContent = "No funds available!";
        }
        break;
      case 'SUSPICIOUS MUSHROOM':
        if (currency.coin >= 2) {
          currency.coin = currency.coin - 2;
          ingredients.suspiciousMushroom++;
          alerts.textContent = "Purchased!";
        }
        else {
          alerts.textContent = "No funds available!";
        }
        break;
      case '4-LEAF CLOVER':
        if (currency.coin >= 5) {
          currency.coin = currency.coin - 2;
          ingredients.fourLeafClover++;
          alerts.textContent = "Purchased!";
        } else {
          alerts.textContent = "No funds available!";
        }
        break;

      default:
        alerts.textContent = "The item you tried to purchase is not valid.";
        break;
    }

  }
  updateVals();
}

function travel() {
  for (let i = 0; i <= locs.unlockedLocs.length; i++) {
    if (locs.unlockedLocs[i] == inputs.travelInput.value.toUpperCase()) {

      if (locs.currentLoc != inputs.travelInput.value.toUpperCase()) {
        if (currency.coin >= 7) {
          locs.currentLoc = inputs.travelInput.value.toUpperCase();
          alerts.textContent = "Traveled to " + inputs.travelInput.value.toUpperCase();
          document.querySelector('.location').textContent = inputs.travelInput.value.toUpperCase();
          currency.coin = currency.coin - 7;
          currency.points = currency.points + 1;
          updateVals();
        }
        else{
          alerts.textContent = "You don't have the funds!";
        }
      }
      else {
        alerts.textContent = "You're already at the location.";
      }
      break;
    }
    else {
      if (i == locs.unlockedLocs.length) {
        alerts.textContent = "The location you tried to enter is invalid, or it is not yet unlocked";
      }
    }
  }
}

function unlock() {
  if (currency.research >= 15*(level+1)) {
    switch (level) {
      case 0:
        recipes.push(['4-LEAF CLOVER', 'DILUTED LIQUID', 'BLANK']);
        ingredients.fourLeafCloverDisplay.style.display = "block";
        ingredients.fourLeafCloverMarket.style.display = "block";
        currency.research = currency.research - 15*(level+1);
        ingredients.knownItems.push("4-LEAF CLOVER");
        level++;
        break;

      default:
        alerts.textContent = 'Hurray! You unlocked ALL of the recipes... for now ;)';
        break;
    }
  } else {
    alerts.textContent = "Error: Not enough funds! Convert your coins into research.";
  }
  updateVals();
}

//hacks
function hack() {
  currency.coin = currency.coin + 10000000;
  currency.research = currency.research + 10000000;
  updateVals();
  alerts.textContent = "Hacked.";
}

//ON START
ingredients.fourLeafCloverDisplay.style.display = "none";
ingredients.fourLeafCloverMarket.style.display = "none";
lockedRecipes.luckRecipe.style.display = "none";
lockedRecipes.concentratedFluids.style.display = "none";
updateVals();
