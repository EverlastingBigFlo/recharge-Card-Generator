let displayPin = document.getElementById('displayPin')

let today=new Date()
let dd=today.getDate();
let mm=today.getMonth()+1;
let yy=today.getFullYear();

let amountSelected = document.getElementById('amountSelected')
let networkSelect = document.getElementById('networkSelect')

let pinGenerated = [];
let rechargePin = document.getElementById('rechargePin')

function getRandomnumber(){
  return Math.floor(Math.random() * 1000000000000);
}

// to generate pin
 function generate(){
  console.log(amountSelected.value);
  console.log(networkSelect.value);

  let printRef;

  // getRandomnumber in the input = '';

    displayPin.value = getRandomnumber();


      if (networkSelect.value == "MTN") {
        printRef = `*555*${displayPin.value}#`
      }
      if (networkSelect.value == "AIRTEL") {
        printRef = `*126*${displayPin.value}#`
      }
      if (networkSelect.value == "GLO") {
        printRef = `*123*${displayPin.value}#`
      }
      if (networkSelect.value == "9MOBILE") {
        printRef = `*222*${displayPin.value}#`
      }


  console.log(displayPin.value);

  let netAmount = {net:networkSelect.value, amount:amountSelected.value, pin:displayPin.value, date:(dd+'/'+mm+'/'+yy), printRef:printRef, status:false};

  pinGenerated.push(netAmount);

 }



//  to save pin in the table

function save(){
  document.querySelector('#displayCont').innerHTML = '';


  pinGenerated.forEach(function(element, index){
   document.querySelector('#displayCont').innerHTML += 
    `  
    <tr class="bg-danger">
          <td class="col-1">${index+1}</td>
          <td class="col-2">${element.net}</td>
          <td class="col-1">${element.date}</td>
          <td class="col-1">${element.amount}</td>
          <td class="col-2">${element.pin}</td>
          <td class="col-3">${element.printRef}</td>
          <td class="col-1"> ${element.status==false?`<span class="text-white">UNUSED</span>`:`<span class="text-danger">USED</span>`}</td>
          <td><button class="btn text-white col-1" onclick="del(${index})">Delete</button></td>
      </tr>`       
      })


}

// to delete pin in the table
function del(index){
  pinGenerated.splice(index,1)
  save()
}


// to recharge 
function rechargee(){
  pinGenerated.forEach(bounce => {
    if (rechargePin.value === bounce.pinGenerated){
    alert('Yes!!! I am recharged successful');

    }
  }); 
}





