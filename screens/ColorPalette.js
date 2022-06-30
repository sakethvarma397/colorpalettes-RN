import React from 'react';
import {Text, StyleSheet, FlatList} from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPalette = ({route}) => {
  const {colors} = route.params;
  return (
    <FlatList
      style={styles.container}
      data={colors}
      keyExtractor={item => item.hexCode}
      renderItem={({item}) => (
        <ColorBox hexCode={item.hexCode} colorName={item.colorName} />
      )}
      ListHeaderComponent={<Text style={styles.heading}>Solarized</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ColorPalette;
