import React, { Component } from 'react';
import Notiflix from 'notiflix';

class Blank extends Component {
    render() {
        Notiflix.Notify.failure('Please add the search query!');
       return(<div> </div>) 
    }
}
export default Blank;