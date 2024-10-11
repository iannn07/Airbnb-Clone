'use client';

import { useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <main>
      <h1>Counter: {counter}</h1>
      <button onClick={() => setCounter((c) => c + 1)}>Increment</button>
    </main>
  );
}

export default Counter;
