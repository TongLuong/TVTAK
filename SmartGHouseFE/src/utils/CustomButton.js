import { Text, TouchableOpacity } from "react-native";

const AppButton = ({ onPress, title, style, titleStyle }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[{
        width: '60%',
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 10,
        maxHeight: 35,
        borderRadius: 20,
        paddingHorizontal: '10%'
      }, style]}
    >
      <Text style={[{ fontSize: 20, fontVariant: 'roboto', color: '#3CAF58', paddingVertical: '1%' }, titleStyle,]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

export default AppButton;