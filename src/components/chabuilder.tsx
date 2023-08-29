'use client';

import { Unity, useUnityContext } from 'react-unity-webgl';
import React, { useEffect, useState, useImperativeHandle } from 'react';

export default function Chabuilder() {
  // const selectList = ['apple', 'banana', 'grape', 'orange'];
  const [Selected, setSelected] = useState('');
  // 색상 상태를 관리하기 위한 state
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  // 색상이 변경될 때 실행될 핸들러
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    changeHairColor(newColor);
  };
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

  function changeSpecies(index?: number) {
    if (index == undefined) {
      index = Math.floor(Math.random() * 22);
    }
    sendMessage('UnitRoot', 'changeSpecies', index);
  }
  function changeHair(index?: number) {
    if (index == undefined) {
      index = Math.floor(Math.random() * 62);
    }

    sendMessage('UnitRoot', 'changeHair', index);
  }
  function changeHairColor(hex: String) {
    sendMessage('UnitRoot', 'changeHairColor', hex.toString());
  }

  return (
    <div>
      <div className='bg-red-100'>
        <Unity unityProvider={unityProvider} />
      </div>
      <div className='flex flex-col items-start'>
        <button onClick={() => changeSpecies()}>종족바꾸기</button>
        <button onClick={() => changeHair()}>머리바꾸기</button>
        <div className='flex gap-2'>
          <label>머리색</label>
          <input
            type='color'
            value={selectedColor}
            onChange={handleColorChange}
          />
        </div>
      </div>
    </div>
  );
}
