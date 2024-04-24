import { StyleSheet, Text, View } from 'react-native';
import styles from '../styles/styles';

export default function App() {
    return (
<View style={[styles.container, {marginTop: 88,marginLeft: 15, marginRight: 15, backgroundColor:'#EFF9F1', borderRadius: 30}]}>
        
        <DataTable>
             <DataTable.Row>
               <DataTable.Cell> <Text style={{fontSize: 23, color: '#3CAF58'}}> Lịch sử thiết bị</Text></DataTable.Cell>
               <DataTable.Cell>
                 <View style={{justifyContent: 'center', paddingBottom: 10}}>
                 </View>
               </DataTable.Cell>Ư
             </DataTable.Row>
             <DataTable.Header> 
               <DataTable.Cell>
                 <Text style={{color: '#3CAF58'}}>
                   Ngày
                 </Text>
               </DataTable.Cell> 
               <DataTable.Title>
                 <Text style={{color: '#3CAF58'}}>
                   Giờ
                 </Text>
               </DataTable.Title> 
               <DataTable.Title>
                 <Text style={{color: '#3CAF58'}}>
                   Nội dung
                 </Text>
               </DataTable.Title>
             </DataTable.Header> 
             <DataTable.Row> 
               <DataTable.Cell style={{flex: 1}} textStyle={{color: '#3CAF58'}}>14/04/2024</DataTable.Cell> 
               <DataTable.Cell style={{flex: 0.8}} textStyle={{color: '#3CAF58'}}>07:00</DataTable.Cell> 
               <DataTable.Cell style={{flex: 1.2}} textStyle={{color: '#3CAF58'}}>Hệ thống đèn</DataTable.Cell>
               <DataTable.Cell textStyle={{color: '#3CAF58'}}>Tắt</DataTable.Cell>
             </DataTable.Row> 
       
           </DataTable> 
         
             </View>
       
    );
  }
  