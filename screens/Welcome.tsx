/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
import {Button} from '../components';
import {theme} from '../constants';
const {width, height} = Dimensions.get('window');
// onScroll = {
//   Animated.event(
//     [
//       {
//         nativeEvent: { contentOffset: { x: this.scrollX } },
//       },
//     ],
//     {
//       useNativeDriver: true, // 启用原生动画驱动
//     },
//   )
// }
export interface Props {
  readonly [key: string]: any;
}

export interface IllustrationItem {
  id: number;
  source: any;
}
export default class Welcome extends Component<Props> {
  static defaultProps: {illustration: IllustrationItem[]};
  constructor(props: Props) {
    super(props);
  }
  scrollX = new Animated.Value(0);
  renderIllustrations() {
    const {illustration} = this.props;
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        data={illustration}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        keyExtractor={(item: IllustrationItem) => `${item.id}`}
        renderItem={({item}: any) => (
          <Image source={item.source} resizeMode="contain" style={styles.img} />
        )}
      />
    );
  }

  renderIndicator() {
    const {illustration} = this.props;
    return (
      <View style={styles.indicators}>
        {illustration.map((item: IllustrationItem, index: number) => {
          return <View style={styles.steps} key={`step-${index}`} />;
        })}
      </View>
    );
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Your Home.
            <Text style={styles.primary}>Greener.</Text>
          </Text>
          <Text style={styles.desc}>Enjoy the experience.</Text>
        </View>
        <View style={styles.slider}>
          {this.renderIllustrations()}
          {this.renderIndicator()}
        </View>
        <View style={styles.bottom}>
          <Button gradient onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                textAlign: 'center',
              }}>
              Login
            </Text>
          </Button>
          <Button shadow onPress={() => navigation.navigate('SignUp')}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>SignUp</Text>
          </Button>
        </View>
      </View>
    );
  }
}

Welcome.defaultProps = {
  illustration: [
    {id: 1, source: require('./../assets/images/illustration_1.png')},
    {id: 2, source: require('./../assets/images/illustration_2.png')},
    {id: 3, source: require('./../assets/images/illustration_3.png')},
  ],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  primary: {
    color: '#0AC4BA',
  },
  desc: {},
  slider: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width,
    height: height / 2.5,
    overflow: 'visible',
  },
  indicators: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 32,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
    backgroundColor: 'gray',
  },
  bottom: {
    flex: 0.5,
    marginHorizontal: theme.sizes.padding * 2,
  },
});
