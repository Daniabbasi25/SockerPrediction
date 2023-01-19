import * as React from 'react';
import { View, useWindowDimensions, ScrollView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Header from '../../Components/Header';
import * as Routes from './../../Screens/index';
import PredictionsPart2 from "./../PredictionsPart2";
import Predictions from "./../Predictions";
import {
    Tabs,
    TabScreen,
    useTabIndex,
    useTabNavigation,
  } from 'react-native-paper-tabs';
import FixePrediction from '../FixePredictions';
import DaysTips from '../DaysTips';
import HTFT from '../HTFT';
import { useInterstitialAd, TestIds } from '@react-native-admob/admob';

export default function Home({toggleDrawer, navigation}) {

  const { adLoaded, adDismissed, show, load } = useInterstitialAd(
    // TestIds.INTERSTITIAL
    "ca-app-pub-4027729592060016/8788891282"
  );

  React.useEffect(() => {
    console.log("adLoaded", adLoaded);
    if (adLoaded) {
      show();
    }
  }, [adLoaded]);

  



  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    console.log("adDismissed", index);
    load();
  }, [index]);

  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

//   const FirstRoute = () => (
    
//   );
  
//   const SecondRoute = () => (
    
//   );
//   const renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
//   });
  return (
    // <>
    <View style={{
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "column",
        height: "100%",
    }}>
    <Header
            toggleDrawer={toggleDrawer}
            title="Predictions"
            onNavigate={() => navigation.navigate("AdminLogin")}
          />
    {/* <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    /> */}

    <Tabs theme={
        {
            colors: {
                primary: "#ffb100",
                background: "#fff",
                text: "#000",
                surface: "#fff",
                accent: "#000",
                disabled: "#000",
                placeholder: "#000",
                backdrop: "#000",
                notification: "#000",
            }
        }
    }
    disableSwipe={false}
    // mode="scrollable"
    onChangeIndex={setIndex}
    >
        <TabScreen label="Score">
          <PredictionsPart2 navigation={navigation} load={load} show={show} />
        </TabScreen>
        <TabScreen label="Odds">
          <Predictions navigation={navigation} load={load} show={show} />
        </TabScreen>
        <TabScreen label="Fixe">
          <FixePrediction navigation={navigation} load={load} show={show}/>
        </TabScreen>
        <TabScreen label="HT/FT">
          <HTFT navigation={navigation} load={load} show={show}/>
        </TabScreen>
        <TabScreen label="Tips">
          <DaysTips navigation={navigation} load={load} show={show}/>
        </TabScreen>
    </Tabs>
    </View>
    // </>
  );
}