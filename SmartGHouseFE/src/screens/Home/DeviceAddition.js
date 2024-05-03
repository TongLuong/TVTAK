import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';

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

export default function DeviceAddition() {
    const [value, onChangeText] = useState('');
    const [type, setType] = useState(1);
    return (
        <ScrollView style={{marginBottom: 65, flexGrow: 1}}>
            <View>
                <Text
                style={{
                fontSize: 23,
                color: "#3CAF58",
                alignSelf: "center",
                marginTop: '5%'
            }}>
                    Thêm thiết bị
                </Text>
                <Text style={{marginHorizontal: '4%', fontSize: 16, marginTop: '3%'}}>Tên thiết bị</Text>
                <View
                style={{
                    backgroundColor: '#EFF9F1', marginTop:'3%', marginHorizontal: '2%', borderRadius: 20, borderWidth: 1, borderColor: '#3CAF58'
                }}>
                <TextInput
                    editable
                    multiline={true}
                    numberOfLines={1}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    style={{padding: 10, color: "black", alignItems: 'center'}}
                    placeholder="Nhập tên thiết bị mới tại đây..."
                />
                </View>
                <Text style={{marginHorizontal: '4%', fontSize: 16, marginTop: '3%'}}>Loại thiết bị</Text>
                <Dropdown
                    mode="default"
                    style={{
                        backgroundColor: '#EFF9F1',
                        marginTop:'3%', 
                        marginHorizontal: '2%', 
                        borderRadius: 20, 
                        borderWidth: 1,
                        borderColor: '#3CAF58',
                        height: '19%', 
                        paddingHorizontal: '3%'
                    }}
                    data={[
                        {label: 'Cảm biến', value: 1},
                        {label: 'Thiết bị khác', value: 2}
                    ]}
                    value={type}
                    onChange={item => {
                        setType(item.value);
                    }}
                    labelField="label"
                    valueField="value"
                />
            </View>
            <View style = {{ alignItems: 'center', marginTop: "3%", height: 120}}>
                <AppButton title={"Lưu thiết bị"} />
                <AppButton title={"Hủy"} titleStyle={{color: 'red'}}/>
            </View> 
        </ScrollView>        
    )
}