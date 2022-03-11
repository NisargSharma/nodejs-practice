
/**
 * @description function to store user inputs in an object and return it 
 * @returns {Object} loan input object with loan amount, loan tenure and annual interest rate 
 */
function getLoanInputs() {
    return loanInput = {
        loanAmount: Number(document.getElementById("loanForm").elements.namedItem("loanAmount").value),
        loanTenure: Number(document.getElementById("loanForm").elements.namedItem("loanTenure").value) * 12,
        interestRate: Number(document.getElementById("loanForm").elements.namedItem("interestRate").value) / 12 / 100,
    }
}

/**
 * @description function to calculate home loan calculations based on user inputs
 * and display total calculation details and monthly amortization schedule
 * @returns {void}
 */
function calculateHomeLoan() {
    const emi = calculateEMI();
    if(emi) {
        const totalPayableAmount = calculateTotalPayableAmount(emi);
        if(totalPayableAmount) {
            const totalPayableInterest = calculateTotalPayableInterest(totalPayableAmount);
            if(totalPayableInterest) {
                displayCalculations(emi, totalPayableInterest, totalPayableAmount);
                getAmortizationSchedule(emi);
            }
        }
    }
}

/**
 * @description function to calculate EMI of the loan
 * @returns {float} product of loan amount, monthly interest rate and loan term
 */
function calculateEMI() {
    // formula to calculate EMI on loan => P x R x (1+R)^N / [(1+R)^N-1]
    const term = (1 + getLoanInputs().interestRate) ** getLoanInputs().loanTenure;
    const ratio = term / (term - 1);
    return getLoanInputs().loanAmount * getLoanInputs().interestRate * ratio;
}

/**
 * @description function to calculate total payable amount on the loan
 * @param {float} emi 
 * @returns {float} product of emi and loan tenure 
 */
function calculateTotalPayableAmount(emi) {
    return emi * (getLoanInputs().loanTenure);
}

/**
 * @description function to calculate total payable interest on the loan
 * @param {float} totalPayableAmount 
 * @returns {float} difference between the totalPayableAmount and actual loan amount
 */
function calculateTotalPayableInterest(totalPayableAmount) {
    return totalPayableAmount - getLoanInputs().loanAmount;
}

/**
 * @description function to display detailed home loan calculations
 * @param {float} emi 
 * @param {float} totalInterestPayable 
 * @param {float} totalPayableAmount 
 * @returns {void}
 */
function displayCalculations(emi, totalPayableInterest, totalPayableAmount) {
    document.getElementById('emiAmount').innerHTML = `₹ ${emi.toFixed(0)}`;
    document.getElementById('totalInterest').innerHTML = `₹ ${totalPayableInterest.toFixed(0)}`;
    document.getElementById('totalAmount').innerHTML = `₹ ${totalPayableAmount.toFixed(0)}`;
}

/**
 * @description function to get amortization schedule of the loan tenure
 * @param {float} emi 
 * @returns {void}
 */
function getAmortizationSchedule(emi) {
    const monthlyArr = getMonthlyCalculation(emi);
    if(monthlyArr.length) {
        displayAmortizationSchedule(monthlyArr);
    }
}

/**
 * @description calculate the monthly amortized values for loan tenure and
 * store them in an array to be returned
 * @param {float} emi 
 * @returns {Array} array with monthly amortized schedule objects
 */
function getMonthlyCalculation(emi) {
    const monthlyArr = [];
    let loanAmount = getLoanInputs().loanAmount;
    for(let i=0; i<getLoanInputs().loanTenure; i++) {
        // calculating monthly amortization for each month of loan tenure
        const monthlyInterestAmt = Number(loanAmount * getLoanInputs().interestRate);
        const monthlyPrincipalAmt = Math.round(emi) - monthlyInterestAmt;
        // creating monthly amortization object for each month
        const monthlyObj = {
            month: i+1,
            openingLoanBalance: loanAmount.toFixed(0),
            emi: emi.toFixed(0),
            principalPaid: (emi - monthlyInterestAmt).toFixed(0),
            monthlyInterest: monthlyInterestAmt.toFixed(0),
            outstandingBalance: (Math.max(0, loanAmount - monthlyPrincipalAmt)).toFixed(0)
        };
        // reducing the opening loan amount for payment of each month 
        loanAmount -= monthlyPrincipalAmt;
        // pushing monthly amortization object in the monthly array
        monthlyArr.push(monthlyObj);    
    }
    return monthlyArr;
}

/**
 * @description function to create and display dynamic table of monthly amortized schedule
 * @param {Array} monthlyArr 
 * @returns {void}
 */
function displayAmortizationSchedule(monthlyArr) {
    
    const col = [];
    // populate column headers array to display table headers
    for (let i = 0; i < monthlyArr.length; i++) {
        for (const key in monthlyArr[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // create dynamic table
    const table = document.createElement("table");

    // create html table header row using the extracted column headers above
    let tr = table.insertRow(-1);                   // table row

    for (let i = 0; i < col.length; i++) {
        const th = document.createElement("th");      // table header.
        th.innerHTML = col[i].charAt(0).toUpperCase() + col[i].slice(1);;
        tr.appendChild(th);
    }

    // add JSON data to the table as rows
    for (let i = 0; i < monthlyArr.length; i++) {
        tr = table.insertRow(-1);
        for (let j = 0; j < col.length; j++) {
            const tabCell = tr.insertCell(-1);
            tabCell.innerHTML = monthlyArr[i][col[j]];
        }
    }

    // finally add the newly created table with JSON data to a container
    const divContainer = document.getElementById("scheduleTable");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}