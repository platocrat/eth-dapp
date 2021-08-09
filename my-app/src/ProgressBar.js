import React, { Component, Link } from 'react'

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
    if (completed>30){
        var shift = true;
    }


    const containerStyles = {
      height: 20,
      width: '100%',
      borderRadius: 50,
      backgroundColor: "white",
      border: "#337AB7",
      textAlign: "center"
    }
  
    const fillerStyles = {
      height: 20,
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right',
      textAlign: "center"
    }
  
    const labelStyles = {
      padding: 7,
      color: '#0c154b',
      fontSize: "13",
      textAlign: "center"
    }
  
    return (
      <div style={containerStyles}>
      {!shift && `${completed}%`}
        <div style={fillerStyles}>
          <span style={labelStyles}>{shift && `${completed}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;