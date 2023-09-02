'use client';

import { Unity, useUnityContext } from 'react-unity-webgl';
import React, { useEffect, useState, useImperativeHandle } from 'react';

export default function Chabuilder() {
  type Species = {
    value: number;
    name: string;
  };
  // 색상 상태를 관리하기 위한 state
  const [selectedHairColor, setselectedHairColor] = useState('#712626');
  const [selectedLeftEyeColor, setselectedLeftEyeColor] = useState('#712626');
  const [selectedRightEyeColor, setselectedRightEyeColor] = useState('#712626');

  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  // const [selectedSpecies, setSelectedSpecies] = useState(0);

  useEffect(() => {
    // JSON 파일 또는 API에서 종족 정보 가져오기
    // 예를 들어, species.json 파일을 public 폴더에 저장한 경우 다음과 같이 할 수 있습니다.
    fetch('/data/species.json')
      .then((response) => response.json())
      .then((data) => setSpeciesList(data));
  }, []);

  // const handleSpeciesSelection = (value: number) => {
  //   setSelectedSpecies(value);
  // };

  // 색상이 변경될 때 실행될 핸들러
  const handleHairColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setselectedHairColor(newColor);
    changeHairColor(newColor);
  };

  // 왼쪽 눈 색상이 변경될 때 실행될 핸들러
  const handleLeftEyeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setselectedLeftEyeColor(newColor);
    changeLeftEyeColor(newColor);
  };

  // 오른쪽 눈 색상이 변경될 때 실행될 핸들러
  const handleRightEyeColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newColor = e.target.value;
    setselectedRightEyeColor(newColor);
    changeRightEyeColor(newColor);
  };

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
  function changeLeftEyeColor(hex: String) {
    sendMessage('UnitRoot', 'changeLeftEyeColor', hex.toString());
  }
  function changeRightEyeColor(hex: String) {
    sendMessage('UnitRoot', 'changeRightEyeColor', hex.toString());
  }

  function changeRBack(index?: number) {
    sendMessage('UnitRoot', 'changeRBack', index);
  }

  function changeLBack(index?: number) {
    sendMessage('UnitRoot', 'changeLBack', index);
  }

  function changeRFront(index?: number) {
    sendMessage('UnitRoot', 'changeRFront', index);
  }

  function changeLFront(index?: number) {
    sendMessage('UnitRoot', 'changeLFront', index);
  }

  function changeBothEyes(index?: number) {
    if (index == undefined) {
      index = Math.floor(Math.random() * 87);
    }
    changeRBack(index * 2);
    changeLBack(index * 2);
    changeRFront(index * 2 + 1);
    changeLFront(index * 2 + 1);
  }

  return (
    <div>
      <div className='bg-red-100'>
        <Unity unityProvider={unityProvider} />
      </div>
      <div className='flex flex-col items-start'>
        <button onClick={() => changeSpecies()}>랜덤 종족바꾸기</button>
        <button onClick={() => changeHair()}>랜덤 머리바꾸기</button>
        <button onClick={() => changeBothEyes()}>랜덤 눈바꾸기</button>
        <select onChange={(e) => changeSpecies(parseInt(e.target.value, 10))}>
          {speciesList.map((species: Species, index) => (
            <option key={index} value={species.value}>
              {species.name}
            </option>
          ))}
        </select>

        <div className='flex gap-2'>
          <label>머리색</label>
          <input
            type='color'
            value={selectedHairColor}
            onChange={handleHairColorChange}
          />
        </div>
        <div className='flex gap-2'>
          <label>왼쪽눈색</label>
          <input
            type='color'
            value={selectedLeftEyeColor}
            onChange={handleLeftEyeColorChange}
          />
        </div>
        <div className='flex gap-2'>
          <label>오른쪽눈색</label>
          <input
            type='color'
            value={selectedRightEyeColor}
            onChange={handleRightEyeColorChange}
          />
        </div>
      </div>
    </div>
  );
}
