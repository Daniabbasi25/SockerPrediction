import * as React from 'react';
import { View, Text,Image, Animated } from 'react-native';
import Lottie from 'lottie-react-native';

export default function SplashScreen({progress}) {

    const [progressValue, setProgressValue] = React.useState(0)

    progress.addListener(({ value }) => {
        // console.log(value)
        setProgressValue(value)
    })
    

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center', position: 'relative'}}>
            <Image source={require('./Assets/splashScreen.png')}
            style={{
                width: "100%",
                height: "100%",
            }} />

            {/* Make a lottie loading animation on center */}
            <View style={{
                position:'absolute',
            }}>
                <View style={{
                    flexDirection: 'column',
                    height: 230
                }}>
                <Text style={{
                    fontSize:30,
                    fontWeight:'bold',
                    color:'#fff'
                    }}>Loading...</Text>
                <View style={{
                    position:'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }}>
                <Text style={{
                    fontSize:30,
                    fontWeight:'bold',
                    color:'#fff'
                    }}>{(progressValue*100).toFixed(0)}%</Text>
                <Lottie source={require('./Assets/loading.json')}
                autoPlay
                loop={false}
                onAnimationFinish={() => {
                    console.log('Animation Finished');
                }}
                // animation progress from 0 to 100%
                progress={progress}
                />
                
                </View>
                </View>
            </View>

            <Text style={{
                fontSize: 40,
                fontWeight: "bold",
                color: "#fcd362",
                position: 'absolute',
                bottom: 100,
                textAlign: 'center',
            }}>PORTAL{"\n"}PREDICTIONS</Text>
        </View>
    )
}