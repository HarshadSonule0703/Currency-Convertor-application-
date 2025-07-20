// const { Console } = require("console");

const BaseUrl = "https://api.exchangerate-api.com/v4/latest";

// const getData = async () => {
//     let response = await fetch(url);
//     console.log(response);
//     let data = await response.json();
//     console.log(data.rates.INR)
// }

const btn = document.querySelector("form button");
const dropdownS = document.querySelectorAll(".dropdown select")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for (code in countryList){
//     console.log(code, countryList);
// }   


for(let select of dropdownS){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click",  async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue === "" || amountValue <= 0){
        amountValue = 1;
        amount.value= "1"
    }
    // console.log(fromCurr.value, toCurr.value);

    const URL = `${BaseUrl}/${fromCurr.value}`
    let response = await fetch(URL);
    let data = await response.json();
    let mainData = data.rates[toCurr.value];
    console.log(amountValue,mainData);

    let finalAmount = (amountValue * mainData).toFixed(2);
    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `
});