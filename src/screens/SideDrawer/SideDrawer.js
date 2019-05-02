import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

import { authLogout } from "../../store/actions/index";

class SideDrawer extends Component {
    render() {
        return (
            <View
                style={[
                    styles.container,
                    // Dimensions is a helper object that let’s us find out the dimensions of the device we’re running on
                    //gets the window's dimensions
                    { width: Dimensions.get("window").width * 0.8 }
                ]}
            >
                {/* Before Module 7: Styling <Text>SideDrawer</Text> */}
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={styles.drawerItem}>
                        <Icon
                            // name="ios-log-out"
                            name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
                            size={30}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Before Module 7: Styling
    // container: {
    //     paddingTop: 22,
    //     backgroundColor: "white",
    //     flex: 1
    // }
    container: {
        paddingTop: 50,
        backgroundColor: "white",
        flex: 1
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#eee"
    },
    drawerItemIcon: {
        marginRight: 10
    }
});

// export default SideDrawer;

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    };
};

export default connect(null, mapDispatchToProps)(SideDrawer);