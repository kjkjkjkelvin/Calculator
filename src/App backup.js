import { useState, useEffect} from 'react'
import './App.scss';

const Header = ({title}) => {
    return (
        <div className='container header-container'>
            <header>
                <div className='row'>
                    <div className='col-xs-12'>
                        <span>
                            <h1 className='text-white'>{title}</h1>
                        </span>
                    </div>
                </div>
            </header>
        </div>
    )
}

function calculate(fn) {
    return new Function('return ' + fn)();
  }
  
// either input all in a string then compute when equals is pressed
// or every operation
// add keyboard support
function App() {
    const [result, setResult] = useState(0)
    const [aboveResult, setAboveResult] = useState('')
    const [hasOperator, setHasOperator] = useState(false)
    const [stringComp, setStringComp] = useState('')

    const ButtonClick = (value) =>{
        
        if(isNaN(value) && value !== '.'){
            if(value === 'ac'){
                setStringComp()
                setAboveResult()
                setResult(0)
            }
            else if(value === 'c'){
                setResult(result.toString().length === 1 ? 0 : result.toString().substring(0, result.toString().length - 1))
                setAboveResult()
            }
            else if(value !== '='){
                const operation = () =>{
                    if(aboveResult === undefined || aboveResult.slice(-1) === '=') return result + ' ' + value + ' ' 
                    else return stringComp + ' ' + result + ' ' + value + ' '
                }

                setStringComp(operation())
                setAboveResult(operation().replaceAll('*', '×').replaceAll('/', '÷'))
                setResult(0);
            }
            else{
                const compute = stringComp + result;
                setAboveResult(compute.replaceAll('*', '×').replaceAll('/', '÷') + ' ' + value)
                console.log(compute)
                
                const finalResult = () => {
                    const opResult = calculate(compute);
                    const resultLength = opResult % 1 === 0 ? 10 : parseInt(opResult).toString().length;
                    console.log(opResult, resultLength)
                    if(opResult.toString().length >= 10) return parseFloat(opResult).toFixed(10-resultLength)
                    else return parseFloat(opResult)
                }

                setResult(finalResult)
            }
        }
        else{
            const tempResult = () => {
                // if(parseInt(result) !== 0){
                //     return result + value 
                // }
                // else{
                //     if(value === 0){
                //         return 0
                //     }
                //     else if(isNaN(value)){
                //         return result + value
                //     }
                //     else{
                //         return parseFloat(result + value) 

                //     }
                // }
                // if(value === 0 && parseInt(result) === 0){
                //     return 0
                // }
                // else{
                //     return result + value
                // }
                console.log(result === 0,)
                if(value.toString() === '0' && result.toString() === '0'){
                    return 0
                }
                else if(result === 0 && !isNaN(value)){
                    return value
                }
                else{
                    return result + value 
                }
            }
            setResult(tempResult)
            // setResult((parseInt(result) !== 0 ? (parseInt(result) + value) : (value === 0 ? 0 : value)))
        }
        // if(isNaN(value) && value !== '.'){

        // }

    }
    return (
        <div className="container my-5 calculator-container">
            <div className='container calculator'>
                <div class="row p-2">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 p-1 mb-2">
                                <div className="screen">
                                    <p className="above-result">{aboveResult}</p>
                                    <p className="result">{result}</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col p-1"><button className="btn btn-secondary button rounded-pill" value="c" onClick={(e) => ButtonClick(e.target.value)}>C</button></div>
                            <div class="col p-1"><button className="btn btn-secondary button rounded-pill" value="ac" onClick={(e) => ButtonClick(e.target.value)}>AC</button></div>
                            <div class="col p-1"><button className="btn btn-secondary button rounded-pill disabled" value="posneg" onClick={(e) => ButtonClick(e.target.value)}>+/-</button></div>
                            <div class="col p-1"><button className="btn btn-secondary button rounded-pill disabled" value="percent" onClick={(e) => ButtonClick(e.target.value)}>%</button></div>
                            <div class="col-3 p-1"><button className="btn btn-warning button rounded-pill" value="/" onClick={(e) => ButtonClick(e.target.value)}>÷</button></div>
                        </div>
                        <div class="row">
                            <div class="col-3 p-1"><button className="btn btn-dark button rounded-pill" value="7" onClick={(e) => ButtonClick(e.target.value)}>7</button></div>
                            <div class="col-3 p-1"><button className="btn btn-dark button rounded-pill" value="8" onClick={(e) => ButtonClick(e.target.value)}>8</button></div>
                            <div class="col-3 p-1"><button className="btn btn-dark button rounded-pill" value="9" onClick={(e) => ButtonClick(e.target.value)}>9</button></div>
                            <div class="col-3 p-1"><button className="btn btn-warning button rounded-pill" value="*" onClick={(e) => ButtonClick(e.target.value)}>×</button></div>
                        </div>
                        <div class="row">
                            <div class="col-3 p-1"><button className="btn btn-dark button rounded-pill" value="4" onClick={(e) => ButtonClick(e.target.value)}>4</button></div>
                            <div class="col-3 p-1"><button className="btn btn-dark button rounded-pill" value="5" onClick={(e) => ButtonClick(e.target.value)}>5</button></div>
                            <div class="col-3 p-1"><button className="btn btn-dark button rounded-pill" value="6" onClick={(e) => ButtonClick(e.target.value)}>6</button></div>
                            <div class="col-3 p-1"><button className="btn btn-warning button rounded-pill" value="-" onClick={(e) => ButtonClick(e.target.value)}>-</button></div>
                        </div>
                        <div class="row">
                            <div class="col-3 p-1"><button className="btn btn-dark button rounded-pill" value="1" onClick={(e) => ButtonClick(e.target.value)}>1</button></div>
                            <div class="col-3 p-1"><button className="btn btn-dark button rounded-pill" value="2" onClick={(e) => ButtonClick(e.target.value)}>2</button></div>
                            <div class="col-3 p-1"><button className="btn btn-dark button rounded-pill" value="3" onClick={(e) => ButtonClick(e.target.value)}>3</button></div>
                            <div class="col-3 p-1"><button className="btn btn-warning button rounded-pill" value="+" onClick={(e) => ButtonClick(e.target.value)}>+</button></div>
                        </div>
                        <div class="row">
                            <div class="col-6 p-1"><button className="btn btn-dark button rounded-pill" value="0" onClick={(e) => ButtonClick(e.target.value)}>0</button></div>
                            <div class="col-3 p-1"><button className="btn btn-dark button rounded-pill" value="." onClick={(e) => ButtonClick(e.target.value)}>.</button></div>
                            <div class="col-3 p-1"><button className="btn btn-warning button rounded-pill" value="=" onClick={(e) => ButtonClick(e.target.value)}>=</button></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <p className="text-white my-0 fs-5">Calculator</p> */}
        </div>
    );
}

export default App;
