import React from 'react';
import {
  Animated,
  StyleSheet,
} from 'react-native';
import Navigation from './Navigation/navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import SplashScreen from './SplashScreen';


const App = () => {

  const [isOpenSplashScreen, setIsOpenSplashScreen] = React.useState(true)
  const progress = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }).start();
    }, [])

  
  progress.addListener(({ value }) => {
    console.log(value)
    if(value === 1) {
      setIsOpenSplashScreen(false)
    }
  })

  // React.useEffect(() => {
  //   // setTimeout(() => {
  //   //   setIsOpenSplashScreen(false)
  //   // }, 3000)
  //   console.log(progress)
    
  // }, [])

  return (
    // <Navigation />
    <PaperProvider>
      {
        isOpenSplashScreen ? <SplashScreen progress={progress} /> : <Navigation />
      }
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
