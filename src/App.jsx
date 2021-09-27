import { useState, useEffect} from 'react'
import './App.scss';

const KeyButtons = ({className, char, onClick, id}) => {
    var col, but;
    switch(className){
        case 'number':
            col = char === '0' ? 'col-6' : 'col'
            but = 'btn-custom-4'
            break;
        case 'equals':
            col = 'col-3'
            but = 'btn-custom-1'
            break;
        case 'main-op':
            col = 'col-3'
            but = 'btn-custom-3'
            break;
        case 'side-op':
            col = 'col'
            but = 'btn-custom-2'
            break;
        default:
            col = 'col'
            but = 'btn-custom-1'
            break;
    }
    return (
        <div className={`${col} button-container`}><button className={`btn btn-custom ${but} button rounded-0`} id={id} value="c" onClick={onClick} >{char}</button></div>
    )
}

const calculate = (first, second, op) => {
    var result = () => {
        switch(op){
            case '+':
                return parseFloat(first) + parseFloat(second)
            case '-':
                return parseFloat(first) - parseFloat(second)
            case '*':
                return parseFloat(first) * parseFloat(second)
            case '/':
                return parseFloat(first) / parseFloat(second)
            case '=':
                return parseFloat(first)
            case '%':
                return parseFloat(first) / 100
            case '±':
                return parseFloat(first) * -1
            default:
                return
        }
    }
    const opResult = result();
    const resultLength = opResult % 1 === 0 ? 10 : (parseInt(opResult).toString().length > 10 ? 10 : parseInt(opResult).toString().length);
    if(opResult.toString().length >= 10) return parseFloat(opResult).toFixed(10-resultLength).toString()
    else return parseFloat(opResult).toString()
}

const handleKeyDown = (event) => {
    var key = event.key
    if(key === "Enter") key = "=";
    else if (key === "Backspace") key = "c"
    else if (key ==="Delete") key = "ac"

    if(((/\d/).test(key) && !isNaN(key)) || key === '.'){
        document.getElementById("number-"+key).click();
    }
    else if(['+','-','*','/','='].includes(key)){
        document.getElementById("oper-"+key).click();
    }
    else if(['%','c','ac'].includes(key)){
        document.getElementById("side-"+key).click();
    }
}
const handleToggle = () => {
    document.getElementById("calculator").classList.toggle("light-theme")
    document.getElementById("calculator").classList.toggle("dark-theme")
}

function App() {
    const [display, setDisplay] = useState('0')
    const [firstValue, setFirstValue] = useState('0')
    const [secondValue, setSecondValue] = useState('')
    const [aboveDisplay, setAboveDisplay] = useState('')
    const [operator, setOperator] = useState('')
    const [hasResult, setHasResult] = useState(false)

    useEffect(() => {
        window.addEventListener('keydown', (e) => {handleKeyDown(e)})
        window.removeEventListener('keydown', (e) => {handleKeyDown(e)});
    }, [])
    const NumberClick = (value) =>{
        const clickResult = () => {
            if(hasResult){
                setHasResult(false)
                return value === '.' ? '0.' : value
            }
            else{
                if(value === '.') return display.includes('.') ? display : display + value
                else if (display.length >= 10) return display
                else return display.toString() === '0' ? value : display + value
            }
        }
        if(operator === '' || operator === '='){
            setAboveDisplay('')
            setFirstValue(parseFloat(clickResult()))
        }
        else { 
            setAboveDisplay(firstValue +" "+ operator)
            setSecondValue(parseFloat(clickResult()))
        }
        setDisplay(clickResult())
    }
    const OperatorClick = (value) =>{
        if(secondValue !== ''){
            setAboveDisplay(firstValue +' '+ operator +' '+ secondValue)
            setDisplay(calculate(firstValue,secondValue,operator))
            setFirstValue(calculate(firstValue,secondValue,operator))
            setHasResult(true);
            setSecondValue('')
        }
        else{
            if(value === '='){
                setAboveDisplay(firstValue +' '+ value)
                setDisplay(firstValue) 
            }
            else{
                setAboveDisplay(firstValue +' '+ value +' '+ secondValue)
                setDisplay('0')
            }
        }
        setOperator(value);
    }
    const FunctionClick = (value) =>{
        if(value === 'ac'){
            setDisplay('0')
            setFirstValue('0')
            setSecondValue('')
            setAboveDisplay()
            setHasResult(false)
            setOperator('')
        }
        else if(value === 'c'){
            const newDisplay = display.toString().substring(0, display.toString().length - 1)
            setDisplay(display.toString().length === 1 ? 0 : newDisplay)

            if(operator === '' || operator === '='){
                setAboveDisplay('')
                setFirstValue(display.toString().length === 1 ? 0 : newDisplay)
            }
            else { 
                setAboveDisplay(firstValue +" "+ operator)
                setSecondValue(display.toString().length === 1 ? 0 : newDisplay)
            }
  
        }
        else if(value === "%" || value === "±"){
            setDisplay(calculate(display,'',value))
            if(operator === '' || operator === '='){
                setFirstValue(calculate(display,'',value))
            }
            else { 
                setSecondValue(calculate(display,'',value))
            }
        }
    }

    // console.log(display, firstValue, secondValue)
    return (
        <div className="light-theme p-0 m-0" id="calculator">
            <div className="container">
                <div className="row calculator-container p-2 m-auto">
                    <div className='col-12 calculator position-relative p-0'>
                        <div className="p-0">
                            <div className="top-container pb-0">
                                <div className="d-flex h-75">
                                    <div className="col-12">
                                        <div className="screen">
                                            <p className="above-display">{aboveDisplay}</p>
                                            <p className="display">{display}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="col-12 px-1 h-25">
                                        <div className="form-check form-switch form-switch-lg position-relative">
                                            <label className="form-check-label text-right position-absolute" for="flexSwitchCheckDefault"></label>
                                            <input className="form-check-input float-end" type="checkbox" id="flexSwitchCheckDefault" onChange={() => handleToggle()}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="buttons-container pt-0">
                                <div className="d-flex buttons-row">
                                    <KeyButtons className="side-op" id="side-c" char="C"  onClick={(e) => FunctionClick('c')} />
                                    <KeyButtons className="side-op" id="side-ac" char="AC" onClick={(e) => FunctionClick('ac')} />
                                    <KeyButtons className="side-op" id="side-±" char="±"  onClick={(e) => FunctionClick('±')} />
                                    <KeyButtons className="side-op" id="side-%" char="%"  onClick={(e) => FunctionClick('%')} />
                                    <KeyButtons className="main-op" id="oper-/" char="÷"  onClick={(e) => OperatorClick('/')} />
                                </div>
                                <div className="d-flex buttons-row">
                                    <KeyButtons className="number" id="number-7"  char="7"  onClick={(e) => NumberClick('7')} />
                                    <KeyButtons className="number" id="number-8"  char="8"  onClick={(e) => NumberClick('8')} />
                                    <KeyButtons className="number" id="number-9"  char="9"  onClick={(e) => NumberClick('9')} />
                                    <KeyButtons className="main-op" id="oper-*"   char="×"  onClick={(e) => OperatorClick('*')} />
                                </div>
                                <div className="d-flex buttons-row">
                                    <KeyButtons className="number" id="number-4"  char="4"  onClick={(e) => NumberClick('4')} />
                                    <KeyButtons className="number" id="number-5"  char="5"  onClick={(e) => NumberClick('5')} />
                                    <KeyButtons className="number" id="number-6"  char="6"  onClick={(e) => NumberClick('6')} />
                                    <KeyButtons className="main-op"id="oper--"    char="-"  onClick={(e) => OperatorClick('-')} />
                                </div>
                                <div className="d-flex buttons-row">
                                    <KeyButtons className="number" id="number-1"  char="1"  onClick={(e) => NumberClick('1')} />
                                    <KeyButtons className="number" id="number-2"  char="2"  onClick={(e) => NumberClick('2')} />
                                    <KeyButtons className="number" id="number-3"  char="3"  onClick={(e) => NumberClick('3')} />
                                    <KeyButtons className="main-op"id="oper-+"    char="+"  onClick={(e) => OperatorClick('+')} />
                                </div>
                                <div className="d-flex buttons-row">
                                    <KeyButtons className="number" id="number-0"  char="0"  onClick={(e) => NumberClick('0')} />
                                    <KeyButtons className="number" id="number-."  char="●"  onClick={(e) => NumberClick('.')} />
                                    <KeyButtons className="equals" id="oper-="    char="="  onClick={(e) => OperatorClick('=')} />
                                </div>
                            </div>
                        </div>                   
                    </div>
                </div>
            </div>      
        </div>
    );
}

export default App;
