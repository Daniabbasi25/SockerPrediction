import * as React from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';

import Header from '../../Components/Header';
import styles from './styles';

export default function AdminLogin({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const login = () => {
        if (email === "admin@admin.com" && password === "version1619") {
            navigation.navigate("AdminPanel");
        } else {
            onToggleSnackBar();
        }
    }
    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);
    return (
        <View style={{ flex: 1 }}>
            <Header title={"Admin Login"} variant="back" onNavigate={() => navigation.navigate("Predictions")} />
            <View style={styles.body}>
                <View style={styles.infoCard}>
                    <Text style={styles.cardHead}>
                        Admin Login
                    </Text>
                    <Text style={styles.cardBody}>
                        Please Provide your admin credentials
                    </Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        label="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        label="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <Button style={styles.input} mode="contained" onPress={login}>
                        Login
                    </Button>
                </View>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            // Do something
                        },
                    }}>
                    Your Email or Password is wrong!
                </Snackbar>
            </View>
        </View>
    );
}