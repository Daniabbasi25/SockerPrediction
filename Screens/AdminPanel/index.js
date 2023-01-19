import * as React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { TextInput, Button, Snackbar, Menu, IconButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

import Header from '../../Components/Header';
import styles from '../AdminPanel/styles';
import { dateFormatter } from '../../utils/dateformater';

import RadioGroup from 'react-native-radio-buttons-group';

export default function AdminPanel({ navigation }) {
    const [formData, setFormData] = React.useState({});
    const [visible, setVisible] = React.useState(false);
    const [dropDowns, setDropDowns] = React.useState({});
    const [team1DD, setTeam1DD] = React.useState(false);
    const [team2DD, setTeam2DD] = React.useState(false);
    const [daysDD, setDaysDD] = React.useState(false);
    const [logo, setLogo] = React.useState("");
    const [snackMsg, setSnackMsg] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    var numbers = Array.apply(null, Array(10)).map(function (x, i) { return i + 1; });
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const radioButtonsData = [{
        id: 'predictions', // acts as primary key, should be unique and non-empty string
        label: 'Odds',
        value: 'Odds',
    }, {
        id: 'Fixe',
        label: 'Fixe',
        value: 'Fixe',
    },{
        id: 'HF',
        label: 'HF',
        value: 'HF',
    },{
        id: 'tips',
        label: 'Tips',
        value: 'Tips',
    }]

    const [radioButtons, setRadioButtons] = React.useState(radioButtonsData)

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

    // React.useEffect(() => {
    //     var selectedButton = radioButtons.find(e => e.selected == true).id;
    //     console.log(selectedButton, 'selectedButton')
    // }, [radioButtons])


    const addLogo = () => {
        try {
            launchImageLibrary(
                {
                    noData: true,
                },
                (response) => {
                    if (response && response.assets) {
                        var uri = response?.assets[0]?.uri;
                        console.log(uri, 'response . data');
                        setLogo(uri);
                    }
                },
            );
        } catch (error) {
            console.log(error);
        }
    }
    const addPrediction = async () => {
        const { firstTeam,
            secondTeam,
            time,
            league,
            tip,
            day,
            odds
        } = formData;
        if (!(firstTeam && secondTeam && time && league && day && logo && tip && odds)) {
            onToggleSnackBar("Field's cannot be left empty");
            return;
        }
        setLoading(true);
        var logoReq = await fetch(logo);
        var logoBlob = await logoReq.blob();
        storage()
            .ref(`logos/${league}/${Date.now()}`)
            .put(logoBlob)
            .on(
                'state_changed',
                () => { },
                () => { },
                (imgResponse) =>
                    imgResponse.ref.getDownloadURL().then((url) => {
                        formData["logo"] = url;
                        formData["createdAt"] = dateFormatter();
                        firestore()
                            .collection(radioButtons.find(e => e.selected == true).id)
                            .add(formData)
                            .then(() => {
                                setLoading(false);
                                console.log('User added!');
                                onToggleSnackBar("Your Prediction has been added.");
                                setFormData({});
                            })
                            .catch(e => {
                                setLoading(false);
                                onToggleSnackBar("Something Went Wrong!");
                            })
                    }));

    };
    const clearPredictions = async () => {
        var prevPreds = await firestore().collection(radioButtons.find(e => e.selected == true).id).get();
        var promises = [];
        prevPreds.forEach(async e => {
            promises.push(await firestore()
                .collection(radioButtons.find(e => e.selected == true).id)
                .doc(e.id)
                .delete());
        });
        Promise.all(promises).then(e => {
            console.log("deleted all");
            onToggleSnackBar("All Previous Record Deleted");
        })
            .catch(e => {
                console.log(e, "e");
                onToggleSnackBar("Something Went Wrong");
            })
    }

    const onToggleSnackBar = (snackMsg) => {
        setSnackMsg(snackMsg);
        setVisible(!visible);

    };

    const onDismissSnackBar = () => setVisible(false);

    return (
        <View style={{ flex: 1, }}>
            <Header title={"Admin Panel"} variant="back" onNavigate={() => navigation.navigate("Predictions")} />
            <View style={styles.body}>
                <ScrollView>
                <RadioGroup 
                        radioButtons={radioButtons} 
                        onPress={onPressRadioButton} 
                    />
                    <Button loading={loading} style={styles.input} mode="contained" onPress={clearPredictions}>
                        Clear Previous Predictions
                    </Button>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            label="First Team"
                            value={formData?.firstTeam}
                            onChangeText={text => formData["firstTeam"] = text}
                        />
                        <TextInput
                            style={styles.input}
                            label="Second Team"
                            value={formData?.secondTeam}
                            onChangeText={text => formData["secondTeam"] = text}
                        />
                        <TextInput
                            style={styles.input}
                            label="Tip"
                            value={formData?.tip}
                            onChangeText={text => formData["tip"] = text}
                        />
                        <TextInput
                            style={styles.input}
                            label="Odds"
                            value={formData?.odds}
                            onChangeText={text => formData["odds"] = text}
                        />
                        <TextInput
                            style={styles.input}
                            label="League"
                            value={formData?.league}
                            onChangeText={text => formData["league"] = text}
                        />
                        <View style={styles.uploadLogoView}>
                            <Button icon="camera" onPress={addLogo}>
                                Add Logo
                            </Button>
                            <View style={styles.logoView}>
                                <Image style={styles.logo} source={logo ? { uri: logo } : require("../../Assets/camera.jpeg")} />
                            </View>
                        </View>
                        <TextInput
                            style={styles.input}
                            label="Time"
                            value={formData?.time}
                            onChangeText={text => formData["time"] = text}
                        />
                        <View style={styles.predItem}>
                            <Menu
                                visible={daysDD}
                                onDismiss={() => setDaysDD(false)}
                                anchor={<Button onPress={() => setDaysDD(true)}>Day: {formData?.day}</Button>}>
                                {
                                    days.map(e => {
                                        return <Menu.Item onPress={(val) => {
                                            formData["day"] = e;
                                            setDaysDD(false);
                                        }} title={e} />
                                    })
                                }
                            </Menu>
                        </View>
                        <Button loading={loading} style={styles.input} mode="contained" onPress={addPrediction}>
                            Submit Prediction
                        </Button>
                    </View>
                </ScrollView>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            // Do something
                        },
                    }}>
                    {snackMsg}
                </Snackbar>
            </View>
        </View>
    );
}