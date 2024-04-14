import { StyleSheet, Text, View } from 'react-native';
import styles from '../styles/styles';
import { DataTable, Modal } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
    return (
    <>
 <View style={[styles.container, {marginTop: 88,marginLeft: 15, marginRight: 15, backgroundColor:'#EFF9F1'}]}>
        
 <DataTable>
      <DataTable.Row>
        <DataTable.Cell> <Text style={{fontSize: 23, color: '#3CAF58'}}> <Ionicons size={20} name="settings-sharp"/>  Lịch sử thiết bị</Text></DataTable.Cell>
        <DataTable.Cell style={{flex:0.8}}>
          <View style={{justifyContent: 'center', paddingBottom: 10}}>
          </View>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Header> 
        <DataTable.Cell style={{flex: 1}}>
          <Text style={{color: '#3CAF58'}}>
            Ngày
          </Text>
        </DataTable.Cell> 
        <DataTable.Title style={{flex: 0.8}}>
          <Text style={{color: '#3CAF58'}}>
            Giờ
          </Text>
        </DataTable.Title> 
        <DataTable.Title style={{flex: 1.2}}>
          <Text style={{color: '#3CAF58'}}>
            Thiết bị
          </Text>
        </DataTable.Title>
        <DataTable.Title>
        <Text style={{color: '#3CAF58'}}>
            Hoạt động
          </Text>
        </DataTable.Title>
      </DataTable.Header> 
      <DataTable.Row> 
        <DataTable.Cell style={{flex: 1}} textStyle={{color: '#3CAF58'}}>14/04/2024</DataTable.Cell> 
        <DataTable.Cell style={{flex: 0.8}} textStyle={{color: '#3CAF58'}}>07:00</DataTable.Cell> 
        <DataTable.Cell style={{flex: 1.2}} textStyle={{color: '#3CAF58'}}>Hệ thống đèn</DataTable.Cell>
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Tắt</DataTable.Cell>
      </DataTable.Row> 
  
      <DataTable.Row> 
        <DataTable.Cell style={{flex: 1}} textStyle={{color: '#3CAF58'}}>14/04/2024</DataTable.Cell> 
        <DataTable.Cell style={{flex: 0.8}} textStyle={{color: '#3CAF58'}}>07:00</DataTable.Cell> 
        <DataTable.Cell style={{flex: 1.2}} textStyle={{color: '#3CAF58'}}>Hệ thống tưới</DataTable.Cell>
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Bặt</DataTable.Cell>
      </DataTable.Row> 
      <DataTable.Row> 
        <DataTable.Cell style={{flex: 1}} textStyle={{color: '#3CAF58'}}>14/04/2024</DataTable.Cell> 
        <DataTable.Cell style={{flex: 0.8}} textStyle={{color: '#3CAF58'}}>07:00</DataTable.Cell> 
        <DataTable.Cell style={{flex: 1.2}} textStyle={{color: '#3CAF58'}}>Máy bơm nước</DataTable.Cell>
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Tắt</DataTable.Cell>
      </DataTable.Row> 

    </DataTable> 
  
      </View>

      <View style={[styles.container, {backgroundColor: '#EFF9F1', marginTop: 10 ,marginBottom: 80, marginLeft: 15, marginRight: 15}]}>
        
      <DataTable>
      <DataTable.Row>
        <DataTable.Cell> <Text style={{fontSize: 23, color: '#3CAF58'}}> <Ionicons size={20} name="settings-sharp"/>  Lịch sử Cảm biến</Text></DataTable.Cell>
        <DataTable.Cell style={{flex:0.8}}>
          <View style={{justifyContent: 'center', paddingBottom: 10}}>
          </View>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Header> 
        <DataTable.Cell style={{flex: 1}}>
          <Text style={{color: '#3CAF58'}}>
            Ngày
          </Text>
        </DataTable.Cell> 
        <DataTable.Title style={{flex: 0.8}}>
          <Text style={{color: '#3CAF58'}}>
            Giờ
          </Text>
        </DataTable.Title> 
        <DataTable.Title style={{flex: 1.2}}>
          <Text style={{color: '#3CAF58'}}>
            Cảm biến
          </Text>
        </DataTable.Title>
        <DataTable.Title>
        <Text style={{color: '#3CAF58'}}>
            Hoạt động
          </Text>
        </DataTable.Title>
      </DataTable.Header> 
      <DataTable.Row> 
        <DataTable.Cell style={{flex: 1}} textStyle={{color: '#3CAF58'}}>14/04/2024</DataTable.Cell> 
        <DataTable.Cell style={{flex: 0.8}} textStyle={{color: '#3CAF58'}}>07:00</DataTable.Cell> 
        <DataTable.Cell style={{flex: 1.2}} textStyle={{color: '#3CAF58'}}>Nhiệt độ</DataTable.Cell>
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Tắt</DataTable.Cell>
      </DataTable.Row> 
  
      <DataTable.Row> 
        <DataTable.Cell style={{flex: 1}} textStyle={{color: '#3CAF58'}}>14/04/2024</DataTable.Cell> 
        <DataTable.Cell style={{flex: 0.8}} textStyle={{color: '#3CAF58'}}>07:00</DataTable.Cell> 
        <DataTable.Cell style={{flex: 1.2}} textStyle={{color: '#3CAF58'}}>Ánh sáng</DataTable.Cell>
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Bặt</DataTable.Cell>
      </DataTable.Row> 
      <DataTable.Row> 
        <DataTable.Cell style={{flex: 1}} textStyle={{color: '#3CAF58'}}>14/04/2024</DataTable.Cell> 
        <DataTable.Cell style={{flex: 0.8}} textStyle={{color: '#3CAF58'}}>07:00</DataTable.Cell> 
        <DataTable.Cell style={{flex: 1.2}} textStyle={{color: '#3CAF58'}}>Độ ẩm</DataTable.Cell>
        <DataTable.Cell textStyle={{color: '#3CAF58'}}>Tắt</DataTable.Cell>
      </DataTable.Row> 

    </DataTable> 
  
      </View>
    </>    
    );
  }
  