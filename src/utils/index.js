import Toast, { DURATION } from "react-native-easy-toast";
const handleErrors = (error, that) => {
  // console.log('err res:-- ', error.response);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    // console.log(error.response.headers);
    if(error.response.status === 400 && error.response.data && error.response.data.errors && error.response.data.errors.length){
        that.refs.toast.show((error.response.data.errors[0] && error.response.data.errors[0]['msg']) || 'Please try after sometime.');
    } else if(error.response.status === 401){
        that.refs.toast.show(error.response.data.msg || 'Unautheroized Access');
        // that.props.navigation.navigate("LoginScreen");
    } else {
        that.refs.toast.show((error.response.data.errors[0] && error.response.data.errors[0]['msg']) || 'Something went wrong');
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('req err',error.request);
    that.refs.toast.show('Something went wrong, please try after sometime.');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error main ', error.message);
    that.refs.toast.show(error.message || 'Something went wrong, please try after sometime.');
    // that.props.history &&
    //   that.props.history.push({
    //     pathname: "/error",
    //     state: {
    //       isTimeout: false,
    //       status: (error.request && error.request.status) || 0,
    //       message: error.message
    //     }
    //   });
  }
  // console.log('config err ',error.config);
  // if (error && error.message && error.message.includes('timeout') && error.message.includes('exceeded')) {
  //   // console.log('Timeout Error');
  //   that.props.history && that.props.history.push({ pathname: '/error', state: { isTimeout: true, code: 0, message: error.message } });
  // } else {
  //   // console.log('Unknown error');
  // }
};

function filterByValue(array, string) {
  string = string.toString().toLowerCase();
  return array.filter(function(item) {
    return (
      item.name && item.name.toString().toLowerCase().includes(string) ||
      item.doctor && item.doctor.toString().toLowerCase().includes(string) ||
      item.nationality && item.nationality.toString().toLowerCase().includes(string) ||
      item.hospital && item.hospital.toString().toLowerCase().includes(string) ||
      item.mobile && item.mobile.toString().toLowerCase().includes(string) ||
      item.speciality && item.speciality.toString().toLowerCase().includes(string) ||
      item.email && item.email.toString().toLowerCase().includes(string) ||
      item.city && item.city.toString().toLowerCase().includes(string) ||
      item.area && item.area.toString().toLowerCase().includes(string)
    );
  });
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

const isValidEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export { handleErrors, filterByValue, debounce, isValidEmail };