import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({navigation}) => {
  const [palettes, setPalettes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFetchPalettes = React.useCallback(async () => {
    const response = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    if (response.ok) {
      const palettesFromApi = await response.json();
      setPalettes(palettesFromApi);
    }
  }, []);

  const handleRefresh = React.useCallback(async () => {
    setIsLoading(true);
    await handleFetchPalettes();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [handleFetchPalettes]);

  React.useEffect(() => {
    handleFetchPalettes();
  });

  return (
    <FlatList
      data={palettes}
      style={styles.list}
      keyExtractor={item => item.paletteName}
      renderItem={({item}) => (
        <PalettePreview
          onPress={() => navigation.push('ColorPalette', item)}
          colorPalette={item}
        />
      )}
      refreshing={isLoading}
      onRefresh={handleRefresh}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default Home;
