import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';

type AppScreenProps = {
  offersCount: number;
}

function App({offersCount}: AppScreenProps): JSX.Element {
  return (
    <WelcomeScreen offersCount={offersCount} />
  );
}

export default App;
