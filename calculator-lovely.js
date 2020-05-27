let calculator = document.querySelector('.calculator')
let keys = calculator.querySelector('.calculator__keys')
let display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    let key = e.target
    let action = key.dataset.action
    let keyContent = key.textContent
    let displayedNum = display.textContent
    let previousKeyType = calculator.dataset.previousKeyType

    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))


    if (!action) {
      console.log('number key!')
      if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = keyContent
      }else {
        display.textContent = displayedNum + keyContent
      }
      calculator.dataset.previousKeyType = 'number'
    }
    
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      console.log('operator key!')
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      if (firstValue && operator  && previousKeyType !== 'operator') {
        const calcValue = calculate(firstValue, operator, secondValue)
        display.textContent = calcValue

        calculator.dataset.firstValue = calcValue
      }else {
        calculator.dataset.firstValue = displayedNum
      }

    key.classList.add('is-depressed')
      calculator.dataset.previousKeyType = 'operator' 
      calculator.dataset.operator = action

      
    }
    
    if (action === 'decimal') {
      console.log('decimal key!')

      if (!displayedNum.includes('.') && previousKeyType !== 'operator' ) {
        display.textContent = displayedNum + '.'
      } else if (previousKeyType === 'operator') {
        display.textContent = '0.'
      }
      calculator.dataset.previousKeyType = 'decimal'
    }
    
    if (action === 'clear') {
      console.log('clear key!')

      calculator.dataset.previousKeyType = 'clear'
    }
    
    if (action === 'calculate') {
      console.log('equal key!')

      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      if (firstValue) {
      display.textContent = calculate(firstValue, operator, secondValue)
    }
      calculator.dataset.previousKeyType = 'calculate'
    }
    




    
  }
 })

 let calculate = (n1, operator, n2) => {
  let result = ''
  
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }
  
  return result
}