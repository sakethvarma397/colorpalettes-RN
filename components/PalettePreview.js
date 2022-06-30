import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PalettePreview = ({onPress, colorPalette}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.heading}>{colorPalette.paletteName}</Text>
      <FlatList
        style={styles.list}
        data={colorPalette.colors.slice(0, 5)}
        keyExtractor={item => item.paletteName}
        renderItem={({item}) => (
          <View style={[styles.color, {backgroundColor: item.hexCode}]} />
        )}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  color: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    height: 40,
    width: 40,
    marginRight: 10,
  },
});

export default PalettePreview;
