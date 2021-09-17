import React from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { StyleSheet, View, ScrollView } from 'react-native';

import TrashButton from './trashButton';





export default function IngredientTable(props) {
  return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={props.colNames} style={styles.head} textStyle={styles.text}/>
      </Table>
      <ScrollView style={{ marginTop: -2, padding:0 }}>
       <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
         {
          props.tableData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              <Cell key={0} data={ rowData.name } textStyle={styles.text}/>
              <Cell key={1} data={ rowData.servings } textStyle={styles.text}/>
              <Cell key={2} data={ rowData["calories per serving"]} textStyle={styles.text}/>
              <Cell key={3}  data={ <TrashButton style={{alignContent: 'center'}} onPress={() => props.deleteIngredient(index)}/>}/>

            </TableWrapper>
          ))
         }
        </Table>
        </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 2, padding: 16, paddingTop: 30, paddingRight: 15},
  head: { height: 40, backgroundColor: '#f1f8ff', marginLeft:0, marginRight: 0},
  row: {  flexDirection: 'row', backgroundColor: '#FFF1C1', marginLeft:0, marginRight: 0},
  text: { margin: 6, textAlign: 'center', fontSize:13}
});