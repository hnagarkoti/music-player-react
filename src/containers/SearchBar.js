import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import API from '../Api/Api'

const defaultStyles = {
  root: {
    position: 'relative',
    paddingBottom: '0px',
  },
  input: {
    display: 'inline-block',
    width: '100%',
    padding: '10px',
  },
  autocompleteContainer: {
    position: 'absolute',
    top: '100%',
    backgroundColor: 'white',
    border: '1px solid #555555',
    width: '100%',
  },
  autocompleteItem: {
    backgroundColor: '#ffffff',
    padding: '10px',
    color: '#555555',
    cursor: 'pointer',
  },
  autocompleteItemActive: {
    backgroundColor: '#fafafa'
  },
  googleLogoContainer: {
    textAlign: 'right',
    padding: '1px',
    backgroundColor: '#fafafa'
  },
  googleLogoImage: {
    width: 150
  }
}
class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: 'San Francisco, CA' }
    this.onChange = (address) => this.setState({ address })
    this.saveUserLocation = this.saveUserLocation.bind(this);
  }

  handleFormSubmit = (event) => {
    let that = this;
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        let {lat, lng} = latLng;
        let location = {
          lat,
          lng
        }
        console.log('location:- ',location);
        that.saveUserLocation(location)
        .then((out) => {
          console.log('location saved:- ', out);
          alert('Location Saved');
        })
        .catch((err) => {
          console.log('Error ', err);
        })
      })
      .catch(error => console.error('Error', error))
  }


  saveUserLocation(location){
    var data = {
      location: []
    }
    data.location.push(location)
    var id = window.localStorage.getItem('id') || window.sessionStorage.getItem('id');
    return API.axiosApi.put('user/'+id, data);
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }



    return (
      <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete inputProps={inputProps} styles={defaultStyles}/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default SearchBar
