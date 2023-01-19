import {
    StyleSheet,
} from 'react-native';


const borders = {
    // borderWidth: 1,
    // borderColor: "red",
}
const styles = StyleSheet.create({
    head: {
        fontSize: 20,
        fontWeight: "800"
    },
    leagueText: {
        fontSize: 14,
        color: "white",
        textTransform: "uppercase",
        // paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: "#747474",
        flex: 0.5,
        ...borders,

    },
    oddsHead: {
        fontSize: 12,
        color: "white",
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        ...borders,
        textAlign: "center",

    },
    tipHead: {
        ...borders,
        fontSize: 12,
        color: "white",
        flex: 0.1,
        justifyContent: 'center',
        alignItems: "center",
        textAlign: "center",
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#747474",
        height: 60
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 2,
        borderColor: "white",
        alignItems: 'center',
        height: 50
        // paddingHorizontal: 20,
    },
    time: {
        flex: 0.2,
        ...borders,
    },
    timeText: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
    teams: {
        paddingLeft: 10,
        borderLeftWidth: 2,
        borderColor: "white",
        paddingVertical: 3,
        flex: 0.5,
        height: 50,
        ...borders,
    },
    teamName: {
        fontSize: 12,
        color: "white",
        // fontWeight: "600",
        textTransform: "capitalize",

    },
    odds: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: "center",
        ...borders,
    },
    oddsText: {
        color: "white",
        fontSize: 12,
        // borderWidth: 1,
        // borderColor: "white",
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    tipView: {
        flex: 0.1,
        // borderWidth: 1,
        // borderColor: "white",
        height: 40,
        justifyContent: 'center',
        alignItems: "center",
        ...borders,
    },
    tip: {
        color: "#5F8BA9",
        fontWeight: "700",
        textAlign: "center",

    },
    logoView: {
        // width: 30,
        height: 30,
        borderRadius: 50,
        marginVertical: 10,
        // marginLeft: 10,
        flex: 0.2,
        ...borders,
    },
    logo: {
        width: 30,
        height: "100%",
        resizeMode: "cover",
        borderRadius: 50,
        alignSelf: "center",
    }
});

export default styles;