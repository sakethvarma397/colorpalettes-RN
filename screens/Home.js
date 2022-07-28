import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PalettePreview from '../components/PalettePreview';

const Home = ({navigation, route}) => {
  const newPalette = route.params ? route.params.newPalette : null;
  const [palettes, setPalettes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  console.log(palettes);

  const handleFetchPalettes = React.useCallback(async () => {
    const response = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    if (response.ok) {
      const palettesFromApi = await response.json();
      setPalettes(palettesFromApi);
    }
  }, []);

  React.useEffect(() => {
    if (newPalette) {
      setPalettes(current => [newPalette, ...current]);
    }
  }, [newPalette]);

  const handleRefresh = React.useCallback(async () => {
    setIsLoading(true);
    await handleFetchPalettes();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [handleFetchPalettes]);

  React.useEffect(() => {
    handleFetchPalettes();
  }, []);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.push('AddNewPaletteModal')}>
        <Text style={styles.buttonText}>Add a Color scheme</Text>
      </TouchableOpacity>
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
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    height: 50,
    backgroundColor: 'white',
    padding: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'teal',
  },
});

export default Home;
