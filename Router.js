import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import React from 'react';
import { View, Text, Platform } from "react-native";
import {
  MaterialIcons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  AntDesign
} from "@expo/vector-icons";
import { connect } from "react-redux";

import HomeScreen from "./src/screens/HomeScreen";
import PatientList from "./src/screens/PatientList";
import PatientDetail from "./src/screens/PatientDetail";
import MyPatients from "./src/screens/MyPatients";
import CustomDrawer from "./src/components/CustomDrawer";
import EmployeeList from "./src/screens/EmployeeList";
import HospitalList from "./src/screens/HospitalList";
import Logout from "./src/screens/Logout";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ForgotPassword from "./src/screens/ForgotPassword";
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import AddHospital from "./src/screens/AddHospital";
import PatientRegistration from "./src/screens/PatientRegistration";
import UserDetail from "./src/screens/UserDetail";

const Drawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLabel: "Home ",
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons name="home" size={24} style={{ color: tintColor }} />
        )
      }
    },
    MyPatients: {
      screen: MyPatients,
      navigationOptions: {
        drawerLabel: "My Patients ",
        drawerIcon: ({ tintColor }) => (
          <SimpleLineIcons name="list" size={24} style={{ color: tintColor }} />
        )
      }
    },
    PatientList: {
      screen: PatientList,
      navigationOptions: {
        drawerLabel: "Patients ",
        drawerIcon: ({ tintColor }) => (
          <SimpleLineIcons name="list" size={24} style={{ color: tintColor }} />
        )
      }
    },
    EmployeeList: {
      screen: EmployeeList,
      navigationOptions: {
        drawerLabel: "Users ",
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="worker"
            size={24}
            style={{ color: tintColor }}
          />
        )
      }
    },
    HospitalList: {
      screen: HospitalList,
      navigationOptions: {
        drawerLabel: "Hospitals ",
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="hospital-building"
            size={24}
            style={{ color: tintColor }}
          />
        )
      }
    },
    AddHospital: {
      screen: AddHospital,
      navigationOptions: {
        drawerLabel: "Add Hospital ",
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="hospital-building"
            size={24}
            style={{ color: tintColor }}
          />
        )
      }
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        drawerLabel: "Logout ",
        drawerIcon: ({ tintColor }) => (
          <AntDesign name="poweroff" size={24} style={{ color: tintColor }} />
        )
      },
      onItemPress: () => {
        console.log("logout press");
      }
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: CustomDrawer,
    contentOptions: {
      activeTintColor: "#ff7e02"
    },
    navigationOptions: {
      header: null
    },
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    overlayColor: "#808080"
  }
);
const NormalUserDrawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLabel: "Home ",
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons name="home" size={24} style={{ color: tintColor }} />
        )
      }
    },
    MyPatients: {
      screen: MyPatients,
      navigationOptions: {
        drawerLabel: "My Patients ",
        drawerIcon: ({ tintColor }) => (
          <SimpleLineIcons name="list" size={24} style={{ color: tintColor }} />
        )
      }
    },
    // PatientList: {
    //   screen: PatientList,
    //   navigationOptions: {
    //     drawerLabel: "Patients ",
    //     drawerIcon: ({ tintColor }) => (
    //       <SimpleLineIcons name="list" size={24} style={{ color: tintColor }} />
    //     )
    //   }
    // },
    Logout: {
      screen: Logout,
      navigationOptions: {
        drawerLabel: "Logout ",
        drawerIcon: ({ tintColor }) => (
          <AntDesign name="poweroff" size={24} style={{ color: tintColor }} />
        )
      },
      onItemPress: () => {
        console.log("logout press");
      }
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: CustomDrawer,
    contentOptions: {
      activeTintColor: "#ff7e02"
    },
    navigationOptions: {
      header: null
    },
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    overlayColor: "#808080"
  }
);

const AppStack = createStackNavigator({
  Home: Drawer,
  PatientList: PatientList,
  PatientDetail: PatientDetail,
  UserDetail: UserDetail,
  MyPatients: MyPatients,
  AddHospital: AddHospital,
  HospitalList: HospitalList,
  PatientRegistration: PatientRegistration
});
const NormalUser = createStackNavigator({
  Home: NormalUserDrawer,
  PatientList: PatientList,
  PatientDetail: PatientDetail,
  MyPatients: MyPatients,
  PatientRegistration: PatientRegistration
});
const AuthStack = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      // header: null
      // headerStyle: {
      //   backgroundColor: "#ff7e02"
      // },
      // headerTitleStyle: {
      //   flex: 1
      // }
    }
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      title: "Register",
      headerStyle: {
        backgroundColor: "#ff7e02"
      },
      headerTitleStyle: {
        flex: 1
      }
    }
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      // header: null,
      headerStyle: {
        backgroundColor: "#ff7e02"
      },
      title: "Forgot Password",
      headerTitleStyle: {
        flex: 1
        // backgroundColor: "#ff7e02"
      }
    }
  }
});




// export default createAppContainer(navigator);
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    NormalUser: NormalUser, 
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
