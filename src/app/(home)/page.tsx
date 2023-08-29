'use client';

import Chabuilder from '@/components/chabuilder';
import { redirect } from 'next/navigation';
import { Unity, useUnityContext } from 'react-unity-webgl';

export default function Home() {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: 'chabuilder/Build/chabuilder.loader.js',
      dataUrl: 'chabuilder/Build/chabuilder.data',
      frameworkUrl: 'chabuilder/Build/chabuilder.framework.js',
      codeUrl: 'chabuilder/Build/chabuilder.wasm',
    });

  return (
    <main>
      <h1>왜안되 씨발</h1>
      <Chabuilder />
    </main>
  );
}
