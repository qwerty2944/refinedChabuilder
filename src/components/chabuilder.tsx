'use client';

import { Unity, useUnityContext } from 'react-unity-webgl';
import React, { useEffect, useState, useImperativeHandle } from 'react';

export default function Chabuilder() {
  // const selectList = ['apple', 'banana', 'grape', 'orange'];
  const [Selected, setSelected] = useState('');

  // const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelected(e.target.value);
  // };

  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: '/chabuilder/Build/chabuilder.loader.js',
      dataUrl: '/chabuilder/Build/chabuilder.data',
      frameworkUrl: '/chabuilder/Build/chabuilder.framework.js',
      codeUrl: '/chabuilder/Build/chabuilder.wasm',
    });

  function ChangeSpecies(index?: number) {
    if (index == undefined) {
      index = Math.floor(Math.random() * 22);
    }
    console.log('냠냠굿');
    sendMessage('UnitRoot', 'changeSpecies', index);
  }

  return (
    <div className='bg-red-100'>
      <Unity unityProvider={unityProvider} />
      <button onClick={() => ChangeSpecies()}>념념긋</button>
    </div>
  );
}
