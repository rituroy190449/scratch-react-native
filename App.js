import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./pages/home_screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActionScreen from "./pages/actions_screen";
import React, {createContext} from "react";
import { CodeContext } from "./contexts/code_context";


export default function App() {
    const Stack = createNativeStackNavigator();
	const [codes, setCodes] = React.useState([]);
    return (
        <NavigationContainer>
            <PaperProvider>
                <SafeAreaProvider>
					<CodeContext.Provider value={{codes, setCodes}}>
                    	<View style={styles.container}>
                    	    <Stack.Navigator>
                    	        <Stack.Screen name="Home" component={HomeScreen}/>
                    	        <Stack.Screen name="Actions" component={ActionScreen}/>
                    	    </Stack.Navigator>
                    	    <StatusBar style="auto" />
                    	</View>
					</CodeContext.Provider>
                </SafeAreaProvider>
            </PaperProvider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 40,
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});

