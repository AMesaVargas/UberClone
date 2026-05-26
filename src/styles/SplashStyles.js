import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', 
    justifyContent: 'center',
    alignItems: 'center', 
  },
  logo: {
    width: width * 0.65, 
    height: width * 0.65,
  },
});

export default styles;
