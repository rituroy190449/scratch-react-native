import React, { useContext } from 'react'
import { View, StyleSheet, Image, Animated, Easing } from 'react-native';
import { Appbar, Button, Chip, FAB } from 'react-native-paper';
import Draggable from 'react-native-draggable';
import Cat from "../images/sprite.png";
import { Text } from 'react-native-paper';
import { CodeContext } from '../contexts/code_context';

const HomeScreen = ({navigation}) => {
	const initialState = {
		x: 0,
		y: 0,
		type: Cat,
	}
	const [sprite, setSprite] = React.useState(initialState);
	const [translateX, setTranslateX] = React.useState(new Animated.Value(0));
	const [translateY, setTranslateY] = React.useState(new Animated.Value(0));
	const [rotate, setRotate] = React.useState(new Animated.Value(0));

	const handleDrag = (e, gestureState) => {
		console.log(gestureState);
	}

	const handleReset = () => {
		Animated.sequence([
			Animated.timing(translateX, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}),
			Animated.timing(translateY, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}),
		]).start();
	}

	const {codes, setCodes} = useContext(CodeContext);

	const handleClick = () => {
		// console.log("okk");
		// console.log(codes);
		const sequence = [];
		let x = 0, y = 0;

		for(let item of codes){
			if(item === "Move X by 100"){
				x += 100;
				console.log(x, y);
				sequence.push(Animated.timing(translateX, {
					toValue: x,
					duration: 500,
					useNativeDriver: true,
				}));
			}
			else if(item === "Move Y by 100"){
				y += 100;
				console.log(x, y);
				sequence.push(Animated.timing(translateY, {
					toValue: y,
					duration: 500,
					useNativeDriver: true,
				}));
			}
			else if(item === "Rotate 360"){
				sequence.push(Animated.timing(rotate, {
					toValue: 360,
					duration: 1000,
					useNativeDriver: true,
					easing: Easing.linear,
				}));
			}
			else if(item === "go to (0,0)"){
				x = 0;
				y = 0;
				console.log(x, y);
				sequence.push(Animated.timing(translateX, {
					toValue: x,
					duration: 500,
					useNativeDriver: true,
				}));
				sequence.push(Animated.timing(translateY, {
					toValue: y,
					duration: 500,
					useNativeDriver: true,
				}));
			}
			else if(item === "Move X=50, Y=50"){
				x += 50;
				y += 50;
				console.log(x, y);
				sequence.push(Animated.timing(translateX, {
					toValue: x,
					duration: 500,
					useNativeDriver: true,
				}));
				sequence.push(Animated.timing(translateY, {
					toValue: y,
					duration: 500,
					useNativeDriver: true,
				}));
			}
		}
		// console.log(sequence);
		Animated.sequence(sequence).start();
	}



	const spriteAnimation = {
		transform: [
			{translateX: translateX},
			{translateY: translateY},
			{rotate: rotate.interpolate({
				inputRange: [0, 360],
				outputRange: ['0deg', '360deg']
			})},
		]
	}

  return (
	<View style={styles.container}>
        {/* <Appbar.Header>
            <Appbar.Content title="Scratch" />
            <Appbar.Action icon="login-variant" onPress={() => {}} />
        </Appbar.Header> */}
		<View style={styles.workarea}>
			<Animated.View style={spriteAnimation}>
				<Draggable x={sprite.x} y={sprite.y} minX={0} minY={0} maxX={350} maxY={500} imageSource={Cat} renderSize={60} onDragRelease={handleDrag}></Draggable>
			</Animated.View>
			<FAB
    			icon="replay"
    			style={{
					...styles.fab,
					top: 0,
					height: 60,
				}}
    			onPress={handleReset}
  			/>
			<FAB
    			icon="play"
    			style={styles.fab}
    			onPress={handleClick}
  			/>
			{/* <Draggable x={0} y={100} minX={0} minY={0} maxX={350} maxY={500} imageSource={Cat} renderSize={60}></Draggable> */}
		</View>
		{/* <View style={styles.infosection}>
			<View style={styles.info}>
				<Text>Sprite:</Text>
				<Spacer height={10} width={10}/>
				<Chip style={styles.chip}>Cat</Chip>
			</View>
			<View style={styles.info}>
				<Text>X:</Text>
				<Spacer height={10} width={10}/>
				<Chip style={styles.chip}>{Number(sprite.x).toFixed(1)}</Chip>
			</View>
			<View style={styles.info}>
				<Text>Y:</Text>
				<Spacer height={10} width={10}/>
				<Chip style={styles.chip}>{Number(sprite.y).toFixed(1)}</Chip>
			</View>
		</View> */}
		{/* <View > */}
			<Button onPress={() => {
				navigation.navigate('Actions');
			}} style={{
				width: 150,
				margin: 20,
				alignSelf: 'center',
			}} mode="contained">Set Actions</Button>
		{/* </View> */}
    </View>
  );
}

const Spacer = (props) => {
	return (
		<View style={{height: props.height, width: props.width}}/>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  workarea: {
	// flex: 1,
	height: 500,
	borderColor: 'black',
	borderStyle: 'solid',
	borderWidth: 2,
	margin: 10,
  },
  infosection:{
	margin: 10,
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	// backgroundColor: 'blue',
  },
  info: {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
  },	
  chip: {
	height: 30,
  },
  fab: {
	position: 'absolute',
	margin: 16,
	right: 0,
	bottom: 0,
  }
});


export default HomeScreen;