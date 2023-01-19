import * as React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { ActivityIndicator, DataTable } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

import Header from '../../Components/Header';
import styles from '../PredictionsPart2/styles';
import { dateFormatter } from '../../utils/dateformater';
// import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import { BannerAd, TestIds,BannerAdSize } from '@react-native-admob/admob';
import WebView from 'react-native-webview';

export default function PredictionsPart2({ navigation, load, show }) {
    const ADS = "ca-app-pub-4027729592060016/1370228975"
    const [predictions, setPredictions] = React.useState([]);
    const [logos, setLogos] = React.useState({});

    const [date, setDate] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);

    const [dateString, setDateString] = React.useState(String(
        new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          new Date().getDate().toString().padStart(2, "0")
      ));

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

    return (
      <>
        <ScrollView>
          {/* <Header
            toggleDrawer={toggleDrawer}
            title="Prediction Results"
            onNavigate={() => navigation.navigate("AdminLogin")}
          /> */}

          {/* get current date in 2022-11-02 formate */}

          <WebView
            source={{
              uri:
                "https://www.bettingclosed.com/predictions/date-matches/" +
                dateString +
                "/bet-type/correct-scores",
            }}
            style={{ marginTop: 0 }}
            injectedJavaScript={`
                        var a = document.getElementById("myTable").getElementsByTagName("tbody")[0];
                        var b = a.getElementsByTagName("tr");
                        var arr = [];
                        for (var i = 0; i < b.length; i++) {
                            var c = b[i].getElementsByTagName("td");
                            if(c.length < 2) continue;
                            var obj = {};
                            for (var j = 0; j < c.length; j++) {
                              try {
                                if (j === 9) {
                                    var alt = c[j].getElementsByTagName("img")[0].getAttribute("alt");
                                    obj["result"] = alt;
                                }
                                else if (j === 1) {
                                    var classes = c[j].getElementsByTagName("img")[0].getAttribute("class");
                                    var alt = classes.split("-")[2];
                                    obj["image"] = alt;
                                }
                                else
                                {
                                    obj[j] = c[j].innerText;
                                }
                              } catch (error) {
                                obj[j] = c[j].innerText;
                              }
                            }
                            arr.push(obj);
                        }
                        window.ReactNativeWebView.postMessage(JSON.stringify(arr));
                        `}
            onMessage={(event) => {
              console.log(event.nativeEvent.data);
              setPredictions(JSON.parse(event.nativeEvent.data));
            }}
            // error
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn("WebView error: ", nativeEvent);
            }}
          />

<Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
            {/* Showing Results of {dateString} */}
            CALENDAR MATCHS
          </Button>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
        // validRange={{
        //   startDate: new Date(2021, 1, 2),  // optional
        //   endDate: new Date(), // optional
        //   disabledDates: [new Date()] // optional
        // }}
        onChange={(date)=>{
            load();
            console.log(date);
            var d = date.date;
            setDateString(String(
                d.getFullYear() +
                    "-" +
                    (d.getMonth() + 1).toString().padStart(2, "0") +
                    "-" +
                    d.getDate().toString().padStart(2, "0")
                ));
        }} // same props as onConfirm but triggered without confirmed by user
        saveLabel="Select" // optional
        // saveLabelDisabled={true} // optional, default is false
        // uppercase={false} // optional, default is true
        // label="Select date" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        // startYear={2000} // optional, default is 1800
        // endYear={2100} // optional, default is 2200
        // closeIcon="close" // optional, default is "close"
        // editIcon="pencil" // optional, default is "pencil"
        // calendarIcon="calendar" // optional, default is "calendar"
      />

<View style={{ backgroundColor: predictions.length==0?"transparent":"#444444" }}>
                <View>
                  <View style={styles.headerRow}>
                    {/* <View style={styles.logoView}>
                      <Image style={styles.logo} source={{ uri: logos[e] }} />
                    </View> */}
                    <Text style={{
                        fontSize: 14,
                        color: "white",
                        textTransform: "uppercase",
                        // paddingVertical: 20,
                        paddingHorizontal: 10,
                        backgroundColor: "#747474",
                        flex: 0.2,
                    }}>Dates</Text>
                    <Text style={styles.leagueText}>Leagues</Text>
                    <Text style={{
                        fontSize: 12,
                        color: "white",
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: "center",
                        textAlign: "right",
                    }}>SCORE LIVE</Text>
                    <Text style={{
                         fontSize: 12,
                         color: "white",
                         flex: 0.2,
                         justifyContent: 'center',
                         alignItems: 'center',
                         textAlign: "right",
                    }}>PRED.</Text>
                    <Text style={{
                         fontSize: 12,
                         color: "white",
                         flex: 0.2,
                         justifyContent: 'center',
                         alignItems: 'center',
                         textAlign: "center",
                    }}>RESULT</Text>
                  </View>
                  {predictions.length <= 0 && (
                  <ActivityIndicator
                    animating={predictions.length === 0}
                    color="#000"
                    size="large"
                    style={{
                        marginTop: 30,
                     }}
    
                    />
                  )}
                  {predictions.map((pred) => {
                    return (
                      <View style={styles.row}>
                        <View style={[styles.time,{
                          flex: 0.3,
                        }]}>
                          <Text style={styles.timeText}>{pred[0]}</Text>
                        </View>
                        <View style={[styles.teams,{
                            flex: 1.2,
                            flexDirection: "row",
                            marginLeft: 10,
                        }]}>
                            <Image style={{
                                height: 30,
                                width: 30,
                                resizeMode: "contain",
                                // center
                                alignSelf: "center",
                                marginRight: 10,
                            }} source={{ uri: "https://flagcdn.com/96x72/"+pred['image']+'.png' }} />
                            <View style={{
                                flexDirection: "column",
                            }}>
                            <Text style={styles.teamName}>{pred[2]}</Text>
                            <Text style={styles.teamName}>{pred[5]}</Text>
                          </View>
                        </View>
                        <View style={{
                        fontSize: 12,
                        color: "white",
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: "center",
                        textAlign: "center",
                    }}>
                          <Text style={styles.tip}>{pred[4]}</Text>
                        </View>
                        <View style={{
                        fontSize: 12,
                        color: "white",
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: "center",
                        textAlign: "center",
                    }}>
                          <Text style={styles.tip}>{pred[6]}</Text>
                        </View>
                        <View style={{
                         fontSize: 12,
                         color: "white",
                         flex: 0.4,
                         justifyContent: 'center',
                         alignItems: 'center',
                         textAlign: "center",
                    }}>
                          <Text style={styles.oddsText}>{pred?.result}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>

          
        </ScrollView>
        <View>
          <BannerAd
            unitId={ADS}
            // unitId={TestIds.BANNER}
            size={BannerAdSize.BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdLoaded={() => {
              console.log("Advert loaded");
            }}
            onAdFailedToLoad={(error) => {
              console.error("Advert failed to load: ", error);
            }}
          />
          {/* <BannerAd
                    // unitId={"ca-app-pub-4027729592060016/1967449569"}
                    unitId={TestIds.BANNER}
                    size={BannerAdSize.SMART_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                    onAdLoaded={() => {
                        console.log('Advert loaded');
                    }}
                    onAdFailedToLoad={(error) => {
                        console.error('Advert failed to load: ', error);
                    }}
                /> */}
        </View>
      </>
    );
}