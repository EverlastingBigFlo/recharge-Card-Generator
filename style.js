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
    // to stop generating number on empty inputs
    if (networkSelect.value == "networkSelect"){
      displayPin.value = '';
      alert('you need to fill all inputs')
      return
    }else if (amountSelected.value == 'amountSelect'){
      displayPin.value = "";
      alert('please select amount')
      return
    }

    displayPin.value = getRandomnumber();


 }



//  to save pin in the table

function display(){
  document.querySelector('#displayCont').innerHTML = ''
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
             <td class="col-1"> ${element.status ? 'Used' : "unused" }</td>
             <td><button class="btn text-white col-1" onclick="del(${index})">Delete</button></td>
         </tr>`       
         })
  
}

function save(){

        // to stop random generator number from saving into an array when it is being double clicked

        if (displayPin.value == ''){
          alert('you need to generate a pin')
          document.querySelector('#displayCont').innerHTML = '';
        return
        }
        // to alert when pin is generated
        alert('Saved Sucessfully. look down to see your pin information')

      // to generate numners based on the network provider

  let printRef;

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

  let netAmount = {net:networkSelect.value, amount:amountSelected.value, pin:displayPin.value, date:(dd+'/'+mm+'/'+yy), printRef:printRef, status:false};

  pinGenerated.push(netAmount);

  // console.log(pinGenerated, 'yeah m');

  document.querySelector('#displayCont').innerHTML = '';
  //  call funct display 
  display()

 

}



// to delete pin in the table
function del(index){
  pinGenerated.splice(index,1);
  display()
  // save()
}


// to recharge 
function rechargee(){
  let  item = pinGenerated.find((base)=> base.printRef === rechargePin.value)

  // to check if the pin has been loaded
  if (item.status) {
    alert('uhh!!! sorry my pin has been used by you!')
    return

  }

// to rechatge the pin
  pinGenerated.forEach((base)=> {
    if (base.printRef === rechargePin.value) {
     if (item) {
        // load card
        item.status = true
        display()
        alert('Yes!!!! thank you for recharging me')

     }
    }
  })

}







