import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    body: {
        margin: 20,
        // borderWidth: 1,
        flex: 1,
    },
    cardHead: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 10,
    },
    form: {
        marginTop: 20,
    },
    input: {
        marginVertical: 20,
    },
    predHead: {
        marginBottom: 20,
    },
    predView: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    logoView: {
        width: 100,
        height: 100,
        borderRadius: 50,

    },
    logo: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
        resizeMode: "cover",
    },
    uploadLogoView:{
        flexDirection:"row",
        justifyContent:'space-around',
        alignItems:"center"
    }
});

export default styles;