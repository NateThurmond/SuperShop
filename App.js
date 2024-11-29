import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: red[500],
        },
    },
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            userName: "",
            groupNumber: "",
            cartCount: 0,
        };

        // AsyncStorage operations
        AsyncStorage.removeItem("userName");
        AsyncStorage.getItem("userName").then((userNameStr) => {
            if (userNameStr != null) {
                const userName = JSON.parse(userNameStr);
                // Ensure that 'userName' is not null before accessing its properties
                if (userName && userName.userName) {
                    this.setState({
                        userName: userName.userName,
                        loggedIn: true,
                    });
                } else {
                    console.log("User data is invalid or missing userName property");
                }
            } else {
                console.log("No user data found in AsyncStorage");
            }
        });
    }

    signIn(userName, pass) {
        AsyncStorage.setItem("userName", JSON.stringify({ userName }));
        this.setState({
            userName: userName,
            loggedIn: true,
        });
    }

    signUp(userName, pass) {
        alert(userName + " " + pass);
    }

    // Increment the cart count
    addToCart = () => {
        this.setState((prevState) => ({
            cartCount: prevState.cartCount + 1,
        }));
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <View style={styles.container}>
                    <MenuBarNotLoggedIn />
                    {!this.state.loggedIn && (
                        <LoginBox
                            signIn={this.signIn.bind(this)}
                            signUp={this.signUp.bind(this)}
                            userName={this.state.userName}
                        />
                    )}
                    {this.state.loggedIn && (
                        <View style={styles.container}>
                            <Text>Welcome {this.state.userName || "Guest"}</Text>
                            <Text>Cart: {this.state.cartCount} item(s)</Text>
                            <ProductList addToCart={this.addToCart} />
                        </View>
                    )}
                </View>
            </ThemeProvider>
        );
    }
}

class MenuBarNotLoggedIn extends React.Component {
    homeButtonClick = () => {
        alert("You clicked the home button");
    };

    optionsSelect = (event) => {
        if (event && event.index !== undefined) {
            if (event.index === 0) {
                alert("You clicked Item 1");
            } else if (event.index === 1) {
                alert("You clicked Item 2");
            }
        } else {
            console.log("Event object is invalid:", event);
        }
    };

    render() {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={this.homeButtonClick} style={styles.leftButton}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
                <Text style={styles.title}>SuperShop</Text>
                <TouchableOpacity onPress={this.optionsSelect} style={styles.rightButton}>
                    <Text style={styles.buttonText}>Menu</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class LoginBox extends React.Component {
    constructor(props) {
        super(props); // Will allow accessing props within constructor, may not be needed

        this.state = {
            userName: "",
            userPass: "",
        };
    }
    changeUserName(value) {
        this.setState({
            userName: value,
        });
    }
    changeUserPass(value) {
        this.setState({
            userPass: value,
        });
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    width: "80%",
                    maxWidth: "40%",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style={{
                        alignItems: "center",
                        height: "40%",
                        justifyContent: "center",
                    }}
                >
                    <Image source={require("./images/SuperShop.png")} style={{}} />
                </View>
                <View>
                    <TextInput
                        style={{ fontSize: 20 }}
                        {...this.props}
                        editable={true}
                        maxLength={40}
                        placeholder={"Username"}
                        value={this.state.userName || ""}
                        onChangeText={(text) => this.changeUserName(text)}
                    />
                    <TextInput
                        style={{ fontSize: 20 }}
                        {...this.props}
                        editable={true}
                        maxLength={40}
                        placeholder={"Password"}
                        value={this.state.userPass || ""}
                        onChangeText={(text) => this.changeUserPass(text)}
                        secureTextEntry={true}
                    />
                </View>
                <View
                    style={{
                        maxHeight: "30%",
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{ height: 50 }}>
                        <Button
                            onPress={() => this.props.signIn(this.state.userName, this.state.userPass)}
                            title="Sign In"
                            color="#3399ff"
                            accessibilityLabel="Sign In"
                        />
                    </View>
                    <View style={{ height: 50 }}>
                        <Button
                            onPress={() => this.props.signUp(this.state.userName, this.state.userPass)}
                            title="Sign Up"
                            color="#3399ff"
                            accessibilityLabel="Sign Up"
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const ProductList = ({ addToCart }) => {
    const products = [
        {
            name: "Solo Hydrate Flasks",
            price: 16.05,
            image: require("./assets/productImages/waterbottle.jpeg"),
        },
        {
            name: "Nokia 900 Camera",
            price: 197.99,
            image: require("./assets/productImages/camera.png"),
        },
        {
            name: "Fitness XL Watch",
            price: 79.99,
            image: require("./assets/productImages/watch.jpeg"),
        },
        {
            name: "Bri Essential Oils",
            price: 39.95,
            image: require("./assets/productImages/ointment.jpeg"),
        },
        {
            name: "Trekkers Brand Shoes",
            price: 59.99,
            image: require("./assets/productImages/shoes.jpeg"),
        },
        {
            name: "Garmin Smart Buds",
            price: 68.99,
            image: require("./assets/productImages/headphones.jpeg"),
        },
    ];

    return (
        <FlatList
            data={products}
            renderItem={({ item }) => (
                <Product name={item.name} price={item.price} image={item.image} addToCart={addToCart} />
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

const Product = ({ name, price, image, addToCart }) => {
    return (
        <View style={styles.product}>
            <View style={styles.productContent}>
                <Image source={image} style={styles.productImage} />
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>{name}</Text>
                    <Text style={styles.productPrice}>${price}</Text>
                    <TouchableOpacity onPress={addToCart} style={styles.addButton}>
                        <Text style={styles.buttonText}>+ Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
        backgroundColor: "#1976D2", // Customizable header background color
        paddingHorizontal: 10,
    },
    leftButton: {
        padding: 10,
    },
    rightButton: {
        padding: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
    productList: {
        marginTop: 20,
        width: "100%",
        alignItems: "center",
    },
    product: {
        marginBottom: 20,
        width: "100%", // Ensure product takes full width
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    productContent: {
        flexDirection: "row", // Image on the left, details on the right
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    productImage: {
        width: 120,
        height: 120,
        marginLeft: 25,
        marginRight: 15,
        resizeMode: "contain", // Ensure image doesn't stretch disproportionately
    },
    productDetails: {
        flex: 1, // Ensure it takes up remaining space
        alignItems: "center",
        justifyContent: "center",
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        color: "#888",
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: "#1976D2",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
        maxWidth: 150, // Restrict the button width to avoid it becoming too large
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});
