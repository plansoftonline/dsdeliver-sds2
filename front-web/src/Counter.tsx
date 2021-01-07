import { useState } from "react";

function Counter() {
    
    const [counter, setCounter] = useState(0);
    const incrementa = () => {
        setCounter(counter + 1);
    }

    const decrementa = () => {
        if (counter >= 1) {
            setCounter(counter - 1);
        }
        
    }

    return (
        <div>
            <button onClick={incrementa}>Incrementar</button>            
            <button onClick={decrementa}>Decrementar</button>
            <h1>Resultado: {counter}</h1>            
        </div>   
     )
    
}

export default Counter;