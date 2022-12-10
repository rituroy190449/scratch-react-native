import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Text, List, Chip, Button } from "react-native-paper";
import { CodeContext } from "../contexts/code_context";

const Spacer = (props) => {
	return (
		<View style={{height: props.height, width: props.width}}/>
	);
};

const ActionScreen = ({ navigation, route }) => {

    const actions = [
        "Move X by 100",
        "Move Y by 100",
        "Rotate 360",
        "go to (0,0)",
        "Move X=50, Y=50",
    ];
    // console.log(route.params);
    // const {codes, setCodes} = route.params;
    // const [codes, setCodes] = React.useState([]);
    const {codes, setCodes} = useContext(CodeContext);
    // console.log(data);
    const [expanded, setExpanded] = React.useState(true);
    return (
        <View style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.code}>
                    <List.Accordion title="Code" expanded={expanded} onPress={() => setExpanded(!expanded)}>
                        {actions.map((action, index) => 
                                <List.Item  key={index} title={action}onPress={() => {
                                    setCodes([...codes, action]);
                                }}/>)
                            }
                    </List.Accordion>
                </View>
                <View style={styles.action}>
                    <List.Accordion title="Actions"></List.Accordion>
                    {codes.map((code, index) =>
                        <Chip key={index} style={styles.chip} icon="delete"
                         onPress={() => {
                            setCodes(codes.filter((item) => item !== code));
                        }}>{code}</Chip>)
                    }
                </View>
            </View>
            <Button mode="contained" color="primary" onPress={() => {
                navigation.goBack();
            }} style={styles.button}>SET</Button>
            <Spacer height={50}/>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        // borderWidth: 2,
    },
    code: {
        flex: 1,
        // display: 'flex',
        // alignItems: 'center',
        width: 100,
        height: 500,
        backgroundColor: 'white',
    },
    action: {
        // padding: 10,
        height: 500,
        width: 170,
        // backgroundColor: 'blue',
    },
    chip: {
        height: 50,
        margin: 5,
    },
    button:{
        alignSelf: 'center',
        width: 100,
    }
});

export default ActionScreen;
  