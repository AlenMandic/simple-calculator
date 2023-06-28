const numbers = document.querySelectorAll("[data-number]");
const clear = document.querySelector("[data-clear]");
const del = document.querySelector("[data-delete]");
const equals = document.querySelector("[data-equals]");
const operators = document.querySelectorAll("[data-operation]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

class Calculator {

    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear_();
    }

    clear_() {
     this.currentOperand = ""
     this.previousOperand = ""
     this.operation = undefined
    }

    delete() { 
    this.currentOperandText.textContent = this.currentOperandText.textContent.slice(0, this.currentOperandText.textContent.length - 1);
    this.currentOperand = this.currentOperandText.textContent
    }

    appendNumber(number) { 
     if(number === "." && this.currentOperand.includes(".")) return
     this.currentOperand = this.currentOperand + number   // we append the clicked number to currentOperand on every click. 
    }

    chooseOperation(operation) {
     if(this.currentOperandText.textContent === "") return
     
     this.operation = operation
     this.previousOperandText.textContent = currentOperandText.textContent.toString() + " " + operation.toString()
     this.previousOperand = this.previousOperandText.textContent;
     this.currentOperand = ""
    }

    compute() { 
     let result = eval(this.previousOperand.split(this.operation).join("") + this.operation + " " + this.currentOperand)
     this.currentOperand = new Intl.NumberFormat().format(result);
     this.previousOperand = ""
     this.operation = undefined
    }

    updateDisplay() { 
     this.currentOperandText.textContent = this.currentOperand;
     this.previousOperandText.textContent = this.previousOperand;
    }
}

const calculator = new Calculator(previousOperandText, currentOperandText);

numbers.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent);  
        calculator.updateDisplay();
    })
})

operators.forEach(operator => {
    operator.addEventListener("click", () => {
        calculator.chooseOperation(operator.textContent);
        calculator.updateDisplay();
    })
})

clear.addEventListener("click", () => {
    calculator.clear_()
    calculator.updateDisplay()
})

del.addEventListener("click", () => {
 calculator.delete()
 calculator.updateDisplay()
})

equals.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})
