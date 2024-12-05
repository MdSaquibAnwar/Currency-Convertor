const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".To select");
const msg = document.querySelector(".msg");

// console.log(btn);
// const optionss = document.querySelectorAll(".CrrntyC");



for(let select of dropdowns){

    for(Currntcode in  countryList){
       console.log(Currntcode)
        let NewOption = document.createElement("option");
        NewOption.innerText = Currntcode;
        NewOption.value = Currntcode;

        if(select.name ==="to" && Currntcode ==="INR"){
            NewOption.selected ="selected";
        } 
         else if(select.name ==="form" && Currntcode ==="USD"){
            NewOption.selected ="selected";
          }            
         select.append(NewOption);
    }
    select.addEventListener("change",(evt) =>{
      updatefalg(evt.target);
    });
}
const updatefalg =(element) =>{
   let Currntc = element.value;
   let countyCOde =countryList[Currntc];
   let newSre = `https://flagsapi.com/${countyCOde}/flat/64.png`
   let img = element.parentElement.querySelector("img");
   img.src =  newSre;

   
}

btn.addEventListener("click", async (evt)=>{
   evt.preventDefault(); //use this close the close the default behaviour
   let amount = document.querySelector(".amount input");
   let amountValue =amount.value;
  if(amountValue ==="" || amountValue <1){
    amountValue =1;
    amount.value="1"
  }
//   console.log(fromCurr.value, toCurr.value);
  const URL =`${Base_URL }/${fromCurr.value.toLowerCase()}.json`;
  let resoponse =await fetch(URL);
  let data = await resoponse.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmount = amountValue * rate;
  msg.innerText =`${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
  console.log(resoponse);
})


