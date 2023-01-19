import * as React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Routes from '../Screens/index';
import Header from '../Components/Header';
import Drawer from 'react-native-drawer'
import { ActivityIndicator } from 'react-native-paper';

const { width } = Dimensions.get("screen");
const Stack = createNativeStackNavigator();

const items = [
    "MATCHS TODAY",
    "HOW TO USE",
    // "Today's Prediction Results",
    "PRIVACY POLICY",
    "CONTACT US",
    
]


const Home = ({ toggleDrawer, mode, setMode, screen }) => {
    const [initialScreen, setInitialScreen] = React.useState(screen);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        console.log(mode, 'mode');
        if (mode === "admin") {
            setInitialScreen("AdminLogin");
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setMode("user");
            }, 300);
        }
    }, [mode])
    return (
        <NavigationContainer>
            {!loading ? <Stack.Navigator
                initialRouteName={initialScreen}
                screenOptions={{ headerShown: false, }}>
                <Stack.Screen name="Predictions">
                    {(props) => <Routes.Home {...props} toggleDrawer={toggleDrawer} />}
                </Stack.Screen>
                {/* <Stack.Screen name="Results">
                    {(props) => <Routes.PredictionsPart2 {...props} toggleDrawer={toggleDrawer} />}
                </Stack.Screen> */}
                <Stack.Screen name="AdminLogin" component={Routes.AdminLogin} />
                <Stack.Screen name="AdminPanel" component={Routes.AdminPanel} />
            </Stack.Navigator> :
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size={30} />
                </View>}
        </NavigationContainer>
    )
};

const Contact = () => {
    return (
        <View style={styles.main}>
            <Text>
                I have technical problem with app what I can do ?
            </Text>
            <Text style={{ marginTop: 10, }}>
                CONTACT US : <Text style={{ fontWeight: "700", fontSize: 16 }}>surprisepod@yahoo.com</Text>
            </Text>
        </View>
    )
};

const PrivacyPolicy = () => {
    return (
        <View style={styles.main}>
            <Text>
                prediction surprises do not collect and store any information at the moment. We do not use cookies or get any personal information such as e-mail, phone, etc.
            </Text>
            <Text style={{ marginTop: 10, }}>
                However we show ads using Google AdMob. If you have some concerns about that, please get familiar with Google Privacy Policy.
            </Text>
        </View>
    )
};
const HowToUse = () => {
    return (
        <View style={styles.main}>
            <Text>
                The main purpose of surprise prediction to guide you through selecting a winning soccer matchs App shows 1 first team win X draw 2 second them win that's for given tip with corresponding coefficients (odds), which are calculate based on statistics and current form of teams.
            </Text>
        </View>
    )
};
const DrawerItems = ({ active, setActive, goToLogin }) => {
    return (
        <View style={{
            backgroundColor: "#8859a9",
            flex: 1,
        }}>
            <View style={styles.drawerLogoView}>
                <TouchableOpacity
                    onPress={() => {
                        goToLogin()
                    }}
                    style={styles.loginBtnView}>
                    <Text style={styles.loginBtn}>Log In</Text>
                </TouchableOpacity>
                <Image style={[styles.drawerLogo]} source={require("../Assets/football.png")} />
            </View>
            {
                items?.map(e => {
                    return (
                        <TouchableOpacity style={[styles.drawerItem, active]} onPress={() => setActive(e)}>
                            <Text style={{
                                color: "#000",
                                fontSize: 16,
                                backgroundColor: '#c3ee7b',
                                padding: 15,
                                borderRadius: 10,
                                fontWeight: "600",
                                borderBottomColor: "#000",
                                borderBottomWidth: 1,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,

                            }}>{e}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}
export default function Navigation({ navigation }) {
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState("MATCHS TODAY");
    const [mode, setMode] = React.useState("user");
    return (
        <Drawer
            open={open}
            tapToClose={true}
            onClose={() => setOpen(false)}
            openDrawerOffset={width * 0.5}
            styles={styles.drawer}
            content={<DrawerItems
                goToLogin={() => {
                    setOpen(false);
                    setActive("MATCHS TODAY");
                    setMode("admin");
                }}
                active={active}
                setActive={(active) => {
                    setOpen(false);
                    setActive(active);
                }} />}
        >
            {
                (active !== "MATCHS TODAY" && active !== "Today's Prediction Results") && <Header admin={false}
                    toggleDrawer={() => setOpen(true)}
                    title="Prediction Surprises Odds" />

            }
            {
                active === "MATCHS TODAY" && <Home setMode={(m) => setMode(m)} mode={mode} toggleDrawer={() => setOpen(true)} screen={"Predictions"} />
            }
            {
                active === "Today's Prediction Results" && <Home setMode={(m) => setMode(m)} mode={mode} toggleDrawer={() => setOpen(true)}  screen={"Results"} />
            }
            {
                active === "CONTACT US" && <Contact />
            }
            {
                active === "PRIVACY POLICY" && <PrivacyPolicy />
            }
            {
                active === "HOW TO USE" && <HowToUse />
            }

        </Drawer>

    );
}

const styles = StyleSheet.create({
    drawer: {
        backgroundColor: "#8859a9",
    },
    drawerLogoView: {
        width: width * 0.5,
        height: 200,
        position: "relative",
    },
    drawerLogo: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        position: "absolute"
    },
    drawerItem: {
        padding: 10,

    },
    main: {
        margin: 20,
    },
    loginBtnView: {
        zIndex: 999,
        top: 10,
        left: 10
    },
    loginBtn: {
        fontSize: 16,
        color: "#126549",
        fontWeight: "bold"
    }

})