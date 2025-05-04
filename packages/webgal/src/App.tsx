import DevPanel from '@/Components/UI/DevPanel/DevPanel';
import { Extra } from '@/Components/UI/Extra/Extra';
import GlobalDialog from '@/Components/UI/GlobalDialog/GlobalDialog';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Stage } from './Components/Stage/Stage';
import { Backlog } from './Components/UI/Backlog/Backlog';
import { BottomControlPanelFilm } from './Components/UI/BottomControlPanel/BottomControlPanelFilm';
import { BottomControlPanel } from './Components/UI/BottomControlPanel/ButtomControlPanel';
import Menu from './Components/UI/Menu/Menu';
import Title from './Components/UI/Title/Title';
import { initializeScript } from './Core/initializeScript';
import useFullscreen from './hooks/useFullscreen';
import { webgalStore } from './store/store';

function App() {
  const {isSupported: isFullscreenSupported, toggle: toggleFullscreen} = useFullscreen();
  useEffect(() => {
    initializeScript();
    isFullscreenSupported && document.addEventListener('keydown', ev => !ev.repeat && ev.key === 'F11' && toggleFullscreen());
  }, []);
  // Provider用于对各组件提供状态
  return (
    <div className="App" style={{ height: '100%', width: '100%', background: 'rgba(0, 0, 0, 1)' }}>
      <Provider store={webgalStore}>
        <DevPanel />
        <Extra />
        <Title />
        <Menu />
        <Stage />
        <BottomControlPanel />
        <BottomControlPanelFilm />
        <Backlog />
        <GlobalDialog />
      </Provider>
    </div>
  );
}

export default App;
