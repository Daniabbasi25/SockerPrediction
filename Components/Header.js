import React, { useState } from 'react';
import {
    StyleSheet, TouchableOpacity, Image, View, Text
} from 'react-native';
import { Button, Menu, TouchableRipple } from 'react-native-paper';

const Header = ({ onNavigate, variant = "menu", title, toggleDrawer, admin = true }) => {
    const [show, setShow] = useState(false);
    const menu = variant === "menu";
    const icon = menu ? require(`../Assets/threeDot.png`) : require(`../Assets/back.png`);
    const openMenu = () => setShow(true);

    const closeMenu = () => setShow(false);
    return (
        <View style={[styles.header, !menu && { flexDirection: "row-reverse", },{
            backgroundColor: "#58d658",
        }]}>
            {menu && <TouchableOpacity onPress={toggleDrawer} style={styles.button}>
                <Image style={styles.icon} source={require("../Assets/burgerMenu.png")} />
            </TouchableOpacity>}
            <Image
            style={[styles.logo,{
                height: 60,
                // width: 50,
                resizeMode: "contain",
            }]}
            source={require("../Assets/football.png")}

            />
            {/* {admin && <TouchableOpacity onPress={() => menu ? setShow(!show) : onNavigate()} style={styles.button}>
                <Image style={styles.icon} source={icon} />
            </TouchableOpacity>} */}
            {/* <View style={[styles.dropDown, !show && { display: "none" }]}>
                <TouchableOpacity style={styles.dropDownItem} delayLongPress={"300ms"} onPress={() => {
                    setShow(false);
                    onNavigate()
                }}>
                    <Text>Admin Panel</Text>
                </TouchableOpacity>
            </View> */}
        </View >
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        paddingLeft: 20,
        borderBottomColor: "grey",
        borderBottomWidth: 0.5,
        elevation: 1,
        margin: 0,
        zIndex: 999,
    },
    logo: {
        // fontWeight: "700",
        // fontSize: 20,
        flex: 1,
        textAlign: "center",
        // paddingHorizontal: 20,
        // fontFamily:"Roboto"

    },
    button: {
        width: 30,
        height: 30,
        flex: 0.1,
        // borderWidth: 1,
        // width: "5%"
    },
    icon: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    dropDown: {
        position: "absolute",
        right: 0,
        top: 60,
        backgroundColor: "white",
        elevation: 10,
        zIndex: 999
    },
    dropDownItem: {
        zIndex: 999,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        padding: 20,
        paddingVertical: 15,
    }
});

export default Header;
