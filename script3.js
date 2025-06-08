// // // const student={
// // //     fullName: "Pratyush Gupta",
// // //     marks: 94.8,
// // //     printMarks:function(){
// // //         console.log("Marks = ", this.marks);
// // //     },
// // // };
// // const employee={
// //     calcTax1(){
// //         console.log("Tax rate is 10%");
// //     },
// //     // calcTax2:function(){
// //     //     console.log("Tax rate is 10%");
// //     // }
// // };
// // const prats={
// //     salary: 50000,
// // };
// // prats.__proto__=employee;
// // class ToyotaCar{
// //     constructor(){
// //         console.log("Creating new object!");
// //         this.brand=brand;
// //     }
// //     start(){
// //         console.log("Start");
// //     }
// //     stop(){
// //         console.log("Stop");
// //     }
// //     setBrand(brand){
// //         this.brand=brand;
// //     }
// // };
// // let fortuner=new ToyotaCar();
// // class Parent{
// //     hello(){
// //         console.log("Hello");
// //     }
// // };
// // class Child extends Parent{};
// // let obj=new Child(); 
// // function hello(){
// //     console.log("hello");
// // }
// // setTimeout(hello,2000);
// // console.log("one");
// // console.log("two");

// // setTimeout(()=>{
// //     console.log("hello");
// // },2000);
// // console.log("three");
// // console.log("four");
// // let promise=new Promise((resolve,reject)=>{
// //     console.log("I am a Promise");
// //     resolve("succes");
// // }); 
// // function getData(dataId, getNextData){
// //     return new Promise((resolve,reject)=>{
// //         setTimeout(()=>{
// //             console.log("data", dataId);
// //             resolve("success");
// //             if(getNextData){
// //                 getNextData();
// //             }
// //         },2000);
// //     });
// // };
// //     setTimeout(()=>{
// //         console.log("data", dataId);
// //         if(getNextData){
// //             getNextData();
// //         }
// //     },2000);
// // }
// // getData(1, ()=>{
// //     getData(2);
// // });
// // async function hello(){
// //     console.log("hello");
// // }
// // function api(){
// //     return new Promise((resolve,reject)=>{
// //         setTimeout(()=>{
// //             console.log("API data");
// //             resolve("success");
// //         },2000);
// //     });
// // };
// // async function getData(){
// //     await api();
// // };
// const URL="https://cat-fact.herokuapp.com/facts";
// const getFacts=async()=>{
//     let response=await fetch(URL);
//     console.log(response);
//     let data= await response.json();
//     console.log(data);
//     console.log(data[0].text);
// };
const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});