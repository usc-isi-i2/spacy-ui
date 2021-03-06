import React, { Component } from 'react';
import "../Styles/token.css"

/*
Tokenwrapper wraps the tokens (word, punctuation...) and plus token.
It makes indexing of the token easier. 
*/
class TokenWrapper extends Component 
{
    constructor(props)
    {
        super(props); 
        //this.deleteToken = this.deleteToken.bind(this); 
        this.clickClose = this.clickClose.bind(this); 
        this.clickEdit = this.clickEdit.bind(this); 
        this.clickPlusToken = this.clickPlusToken.bind(this); 
    }

    clickClose()
    {
        //console.log("TokenWrapper: clickClose"); 
        this.props.onDeleteToken(this.props.index);
    }

    clickEdit()
    {
        //console.log("TokenWrapper: clickEdit"); 
        this.props.onEditToken(this.props.index); 
    }

    clickPlusToken()
    {
        //console.log("TokenWrapper: clickPlusToken"); 
        this.props.onClickPlusToken(this.props.index); 
    }

    render() 
	{   
        var tokenDisplayed; 
        /*every even token is a + sign token*/
        if(this.props.index !== 0 && (this.props.index%2) !== 0)
        {
            tokenDisplayed = <div className="tokenHeader2" >  <div className="overlayEdit" onClick={this.clickEdit}> </div>
                            <div className="overlayClose" onClick={this.clickClose}> </div>
                                {this.props.data} 
                            </div>;
        }
        else
        {
            tokenDisplayed = <div className="wrapPlusToken" onClick={this.clickPlusToken} >
                                {this.props.data} 
                            </div>; 
        }                         

        return (
			<div>           
                    {tokenDisplayed}   
            </div>
       )
  
    }
}




export default TokenWrapper;

