import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPalette = ({route}) => {
  const {colors} = route.params;
  return (
    <FlatList
      style={styles.container}
      data={colors}
      keyExtractor={item => item.colorName}
      renderItem={({item}) => (
        <ColorBox hexCode={item.hexCode} colorName={item.colorName} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ColorPalette;
