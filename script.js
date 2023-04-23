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
      displayModal('you need to fill all inputs', false)
      return
    }else if (amountSelected.value == 'amountSelect'){
      displayPin.value = "";
      displayModal('please select amount', false)
      return
    }

    displayPin.value = getRandomnumber();


 }

 function displayModal(message, status){
  scroll(0,0)

  modalBox.style.display = 'flex'

  if (status) {
    modaText.style.border = '3px solid green'
    modaText.style.background = 'green'

  }else{
    modaText.style.border = '3px solid red'
    modaText.style.color = 'white'
    modaText.style.background = 'red'

  }
  return(
    modaText.innerHTML= message
  )
  
 }

 function setBackDropToHidden(){
  modalBox.style.display = 'none'

 }



//  to save pin in the table

function display(){
  document.querySelector('#displayCont').innerHTML = ''
    pinGenerated.forEach(function(element, index){
      document.querySelector('#displayCont').innerHTML += 
       `  
             <td class="col-1">${index+1}</td>
             <td class="col-2">${element.net}</td>
             <td class="col-1">${element.date}</td>
             <td class="col-1">${element.amount}</td>
             <td class="col-2">${element.pin}</td>
             <td class="col-3">${element.printRef}</td>
             <td class="col-1"> ${element.status ? 'Used' : "unused" }</td>
             <td><button class="btn text-white col-1" onclick="del(${index})">Delete</button></td>`
        
         })

         localSave = localStorage.setItem('pinGen', JSON.stringify(pinGenerated));   

  
}
// save to local Storage
getData = localStorage.getItem('pinGen');

function storePin(){
  if (getData){
    pinGenerated = JSON.parse(getData)
    display()
  }
}

storePin()

function save(){
        // to stop random generator number from saving into an array when it is being double clicked

        if (displayPin.value == ''){
        // document.querySelector('exampleModalOne')
          // alert('you need to generate a pin')
          // document.querySelector('#displayCont').innerHTML = '';
        return
        }
        // to alert when pin is generated
        document.getElementById('exampleModalOne')


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

          document.querySelector('#displayCont').innerHTML = '';
          //  call funct display 
          display()

          if (displayPin.value ==printRef) {
            displayModal('already saved', false)
            document.querySelector('#displayCont').innerHTML = '';
          }
 

}

display()


// to delete pin in the table
  function del(index){

    pinGenerated.splice(index,1);
    displayModal('Delete successfully', true)
    display()
  }


// function to recharge the pin  generated
function rechargee(){
  let  item = pinGenerated.find((base)=> base.printRef === rechargePin.value)
  // to check if invalid pin is being inputed
  if (!item) {
    displayModal('invalid pin!', false)

  }

  // to check if the pin has been loaded
  if (item.status) {
    displayModal('uhh!!! sorry my pin has been used by you!', false)
    return
  }

// to rechatge the pin
  pinGenerated.forEach((base)=> {
      if (base.printRef === rechargePin.value) {
     if (item) {
        // load card
        item.status = true
        display()
        displayModal('Yes!!!! thank you for recharging me', true)
     }
     }
  })

}







