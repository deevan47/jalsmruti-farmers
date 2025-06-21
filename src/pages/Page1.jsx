import React from 'react';

function Page1({ onNext }) {
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={() => onNext()}>Start</button>
    </div>
  );
}

export default Page1;
