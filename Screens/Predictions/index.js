import * as React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { DataTable } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import Header from '../../Components/Header';
import styles from '../Predictions/styles';
import { dateFormatter } from '../../utils/dateformater';
// import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import { BannerAd, TestIds,BannerAdSize } from '@react-native-admob/admob';

export default function Predictions({ navigation }) {
    const ADS = "ca-app-pub-4027729592060016/1370228975";
    const [predictions, setPredictions] = React.useState({});
    const [logos, setLogos] = React.useState({});
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData();
        });
        getData();
        return unsubscribe;
    }, [])
    const getData = () => {
        var preds = {};
        firestore().collection('predictions').onSnapshot((snapshot) => {
            var changes = snapshot.docChanges();
            changes.forEach(e => {
                var data = e.doc.data();
                var lg = data.league.toLowerCase();
                logos[lg] = data.logo;
                if (preds[lg]?.length)
                    preds[lg].push({ id: e.doc.id, ...data });
                else preds[lg] = [{ id: e.doc.id, ...data }]
            })
            console.log(preds, "preds");
            setPredictions(preds);

        }, (err) => {
            console.log(err, "Err");
        });
    }


    return (
        <>

            <ScrollView>
                {/* <Header toggleDrawer={toggleDrawer} title="Prediction Surprises Odds"
                    onNavigate={() => navigation.navigate("AdminLogin")} /> */}
                    {/* <View style={{
                        alignItems: "center",
                        width: "100%",
                        flexDirection: "row",
                        marginTop: 10,
                        marginBottom: 10,
                    }}>
                        <View style={{
                            width: "50%",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 10
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: "bold"
                            }}>Predictions</Text>
                        </View>
                        <View style={{
                            width: "50%",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 10
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                textAlign: "center"
                            }}>Surprises Predictions</Text>
                    </View>
                    </View> */}
                {
                    Object.keys(predictions).length ?
                        <View style={{ backgroundColor: "#444444" }}>
                            {
                                Object.keys(predictions).map(e => {
                                    return <View>
                                        <View style={styles.headerRow}>
                                            <View style={styles.logoView}>
                                                <Image style={styles.logo} source={{ uri: logos[e] }} />
                                            </View>
                                            <Text style={styles.leagueText}>{e}</Text>
                                            <Text style={styles.tipHead}>TIP</Text>
                                            <Text style={styles.oddsHead}>ODDS</Text>
                                        </View>
                                        {
                                            predictions[e].map(pred => {
                                                return (
                                                    <View style={styles.row}>
                                                        <View style={styles.time}>
                                                            <Text style={styles.timeText}>{pred.time}</Text>
                                                        </View>
                                                        <View style={styles.teams}>
                                                            <Text style={styles.teamName}>{pred.firstTeam}</Text>
                                                            <Text style={styles.teamName}>{pred.secondTeam}</Text>
                                                        </View>
                                                        <View style={styles.tipView}>
                                                            <Text style={styles.tip}>{pred?.tip}</Text>
                                                        </View>
                                                        <View style={styles.odds}>
                                                            <Text style={styles.oddsText}>{pred?.odds}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }

                                    </View>
                                })}
                        </View> :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50, }}>
                            <Text style={{ fontSize: 16, textTransform: "uppercase" }}>No Predictions for today</Text>
                        </View>
                }
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
                        console.log('Advert loaded');
                    }}
                    onAdFailedToLoad={(error) => {
                        console.error('Advert failed to load: ', error);
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