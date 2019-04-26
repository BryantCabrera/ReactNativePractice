import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem';

const placeList = (props) => {
    // old way before FlatList
    // const placesOutput = props.places.map((place, i) => (
    //     // <Text key={i}>{place}</Text>
    //     <ListItem 
    //         key={i} 
    //         placeName={place} 
    //         onItemPressed={() => props.onItemDeleted(i)} 
    //     />
    // ))
    
    return (
        // old way before FlatList
        // <ScrollView style={styles.listContainer}>
        //     {placesOutput}
        // </ScrollView>
        <FlatList 
            style={styles.listContainer}
            data={props.places}
            renderItem={(info) => (
                <ListItem
                    //.value comes from how we wrote the object in this.setState in the function handler in App.js
                    placeName={info.item.name}
                    placeImage={info.item.image}
                    onItemPressed={() => props.onItemSelected(info.item.key)}
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    listContainer: {
        width: "100%"
    }
})

export default placeList;