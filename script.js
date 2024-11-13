"use strict";

const errorMesgEl = document.querySelector('.error_message');
const budgetInputEl = document.querySelector('.budget_input');
const expenseDelEl = document.querySelector('.expenses_input');
const expenseAmountEl = document.querySelector('.expenses_amount');
const tblRecordEl = document.querySelector('.tbl_data');
const cardsContainer = document.querySelector('.cards');

//carda content
const budgetCardEl= document.querySelector('.budget_card');
const expensesCardEl= document.querySelector('.expenses_card');
const balanceCardEl= document.querySelector('.balance_card');

let itemList = [];
let itemId = 0;

//========================Button Event====================//
function btnEvents(){
  const btnBudgetCal= document.querySelector('#btn_budget');
  const btnExpensesCal= document.querySelector('#btn_expenses');

  //=======================Budget Event ======================//
  btnBudgetCal.addEventListener('click',(e) =>{
    e.preventDefault();
    budgetfun();
  });

  btnExpensesCal.addEventListener('click',(e) =>{
    e.preventDefault();
    expenesFun();
  });

}
//===============Calling  btn Events ==================//
document.addEventListener('DOMContentLoaded',btnEvents);

//====================Expenses Btns Event ============//
function expenesFun(){
  let expensesDescValue = expenseDelEl.value;
  let expensesAmountValue = expenseAmountEl.value;

  if(expensesDescValue == "" || expensesAmountValue == ""|| budgetInputEl < 0)
  {
    errorMessage("Please Enter Expense Desc or Expense Amount!");
  }
  else{
    let amount = parseInt(expensesAmountValue);
    expenseAmountEl.value = "";
    expenseDelEl.value = "";

    //store the value inside the object
    let expenses = {
      id:itemId,
      title:expensesDescValue,
      amount:amount,
     };
     itemId++;
     itemList.push(expenses);


     //add expenses inside the HtML page
     addExpenses(expenses);
     showBalance();
  }
}
//========= Budget Function ==========//
function addExpenses(expensespara)
{
  const html = `<ul class="tbl_tr_content">
      <li data-id = ${expensespara.id}>${expensespara.id}</li>
      <li>${expensespara.title}</li>
      <li><span>$</span>${expensespara.amount}</li>
      <li>
        <button type="button" class="btn_edit">Edit</button>
        <button type="button" class="btn_delete">Delete</button>
      </li>
    </ul>`;

    tblRecordEl.insertAdjacentHTML("beforeend",html);

    //====================Edit Button=======================//
    const btnEdit = document.querySelectorAll('.btn_edit');
    const btnDel = document.querySelectorAll('.btn_delete');
    const content_id = document.querySelectorAll('.tbl_tr_content');

    //btn edit event
     btnEdit.forEach((btnedit)=>{
       btnedit.addEventListener('click',(el)=>{
      let id;

      content_id.forEach((ids)=>{
           id = ids.firstElementChild.dataset.id;
      });
      let element = el.target.parentElement.parentElement;
      element.remove();

      let expenses = itemList.filter(function(item){
        return item.id = id;
      });
     expenseDelEl.value = expenses[0].title;
     expenseAmountEl.value = expenses[0].amount;

     let temp_list = itemList.filter(function(item){
      return item.id != id;
     });
     itemList = temp_list;

     });
    });


    //=========================Button Delete =============//
     btnDel.forEach((btndel)=>{
       btndel.addEventListener('click',(el)=>{
       let id;

       content_id.forEach((ids)=>{
            id = ids.firstElementChild.dataset.id;
       });
       let element = el.target.parentElement.parentElement;
       element.remove();

      let temp_list = itemList.filter(function(item){
       return item.id != id;
      });
      itemList = temp_list;
      showBalance();

      });
     });
}



//=============Budget Function =============//
function budgetfun(){

  const budgetValue = budgetInputEl.value;

  if(budgetValue == ""|| budgetValue < 0){
    errorMessage("Please Enter Your Budget or More Than 0");
  }
  else{
       budgetCardEl.textContent = budgetValue;
       budgetInputEl.value = "";
       showBalance();
  }
}

//=============Show Balance ====================//
function showBalance()
{
  const expenses = totalExpenses();
  const total = parseInt(budgetCardEl.textContent)-expenses;
  balanceCardEl.textContent = total;
}


//=================Total Expenses ===========//
function totalExpenses(){
  let total = 0;


  if(itemList.length > 0)
  {
    total = itemList.reduce(function(acc,curr){
    return(acc += curr.amount);
    },0);
  }
  expensesCardEl.textContent = total;
  return total;
}


//=====================Error Message Function ================//
function errorMessage(message)
{
  errorMesgEl.innerHTML = `<p>${message}</p>`;
  errorMesgEl.classList.add('error')
    setTimeout(() => {
      errorMesgEl.classList.remove("error");
    },2500);
}
