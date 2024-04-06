import { useEffect, useState } from 'react'
import Blocks from './components/Blocks'
import Button from './components/Button'
import Confetti from 'react-confetti';


const PLAYER_X = "X";
const PLAYER_O = "O";
const winnerCombo =[ 
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6],
];
function App() {
  const[state , setState]=useState(Array(9).fill(null));
  const[currPlayer , setcurrPlayer]=useState(PLAYER_X);
  const[winner , winnerstatus]=useState(false);
  const [win, setWinner] = useState();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
 
  function checkWinner(state){
  for (let i = 0; i < winnerCombo.length; i++) {
    const [a, b, c] = winnerCombo[i];
    if (state[a] != null && state[a] === state[b] && state[a] === state[c]) {
      winnerstatus(true);
      setWinner(state[a]);
    }
  }
  if(!state.includes(null)){
    setWinner('draw');
    setTimeout(()=>{
      console.log('check')
      reset();
    },2000)
  }

}

useEffect(()=>{
  checkWinner(state);
},[state])
useEffect(()=>{
  console.log("winner mil gya hai")
  if(winner){
   // console.log("namaste i will clean the board")
    setTimeout(() => {
      reset();
    }, 3000);
  }
},[winner])
useEffect(() => {
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
const reset=() => {
          setState(Array(9).fill(null));
          setcurrPlayer(PLAYER_X);
          winnerstatus(false)
          setWinner(null);
         
  }
  const handleBlockClick = (index) => {
    if(state[index] != null)
    return;
    const newState=[...state];
    newState[index]=currPlayer;
    setState(newState);
    if(currPlayer === PLAYER_X){
      setcurrPlayer(PLAYER_O)
    }
    else{
      setcurrPlayer(PLAYER_X)
    }
  }

  return (
    <>
    
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-blue-500">
    <div className='text-5xl font-extrabold dark:text-white'>TIC TAC TOE</div>
    <div className='grid grid-cols-3 gap-4 '>
      <Blocks onClick={() =>handleBlockClick(0)} value={state[0]}/>
      <Blocks onClick={() => handleBlockClick(1)} value={state[1]}/>
      <Blocks onClick={() => handleBlockClick(2)} value={state[2]}/>
      </div>
      <div className='grid grid-cols-3 gap-4 '>
      <Blocks onClick={() => handleBlockClick(3)} value={state[3]}/>
      <Blocks onClick={() => handleBlockClick(4)} value={state[4]}/>
      <Blocks onClick={() => handleBlockClick(5)} value={state[5]}/>
      </div>
      <div className='grid grid-cols-3 gap-4 '>
      <Blocks onClick={() => handleBlockClick(6)} value={state[6]}/> 
      <Blocks onClick={() => handleBlockClick(7)} value={state[7]}/>
      <Blocks onClick={() => handleBlockClick(8)} value={state[8]}/>
      </div>
      <Button text="RESET" onClick={reset}/>
      {winner && (
        <Confetti
          width={screenWidth}
          height={screenHeight}
          numberOfPieces={800}
          //timeout={9000}
          recycle={false}
          run={true}
        />
      )}
    <div className='text-3xl font-extrabold dark:text-white'>WINNER : {win}</div>
     </div>
    </>
  )
}

export default App
