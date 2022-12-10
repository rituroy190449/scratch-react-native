import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

const MyAppBar = () => {
    <View style={{flex: 1}}>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {}} />
            <Appbar.Content title="Title" />
            <Appbar.Action icon="calendar" onPress={() => {}} />
            <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
    </View>
}

export default MyAppBar;