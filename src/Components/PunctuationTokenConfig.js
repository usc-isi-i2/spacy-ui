import React from 'react';
import "../Styles/wordtoken.css"

class PunctuationTokenConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optional: false,
      part_of_output: false,
      punctuation_comma: false,
      punctuation_period:false,
      punctuation_semicomma: false, 
      punctuation_qmark: false,
      punctuation_tilde: false,
      punctuation_colon: false,
      punctuation_2quote: false,
      punctuation_1quote: false,
      punctuation_plus: false,
      punctuation_underscore: false,
      punctuation_amperand: false,
      punctuation_bang: false,
      punctuation_openbracket: false,
      punctuation_closebracket: false,
      punctuation_open_sbracket: false,
      punctuation_close_sbracket: false,
      punctuation_open_cbracket: false,
      punctuation_close_cbracket: false,
      punctuation_vline: false,
      punctuation_dash: false,
      punctuation_caret: false,
      punctuation_pound: false,
      punctuation_lessthan: false,
      punctuation_greaterthan: false,
      punctuation_equal: false,
      punctuation_percent: false,
      punctuation_backslash: false,
      punctuation_asterisk: false,
      punctuation_dollar: false,
      punctuation_forwardslash:false,
      punctuation_atsign: false
    };

    //if you don't bind like this you will get an error like 
    //TypeError: Cannot read property 'setState' of null
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createNewToken = this.createNewToken.bind(this); 
    this.cancelDialog = this.cancelDialog.bind(this); 
    this.createAllPunctuations = this.createAllPunctuations.bind(this); 
    this.resetState = this.resetState.bind(this); 

    //console.log("WordTokenConfig = ruleid"+this.props.ruleid); 

  }


  /*We had to put the setting of the state here because 
  * of the way we show the dialog and don't re-render. 
  */
  componentWillReceiveProps(nextProps)
  {
    
    //console.log("PunctuationTokenConfig->componentWillReceiveProps are we modifying token = " + nextProps.modify);   
    
    var tData = nextProps.tokenData; 
    if(nextProps.modify)
    {
      this.setState({
        allwords: tData.token.join(" "),
        optional: !tData.is_required, 
        part_of_output: tData.is_in_output,
        punctuation_comma: tData.token.indexOf(",")>-1,
        punctuation_period: tData.token.indexOf(".")>-1, 
        punctuation_semicomma: tData.token.indexOf(";")>-1,  
        punctuation_qmark: tData.token.indexOf("?")>-1, 
        punctuation_tilde: tData.token.indexOf("~")>-1, 
        punctuation_colon: tData.token.indexOf(":")>-1, 
        punctuation_2quote: tData.token.indexOf("\"")>-1, 
        punctuation_1quote: tData.token.indexOf("'")>-1, 
        punctuation_plus: tData.token.indexOf("+")>-1, 
        punctuation_underscore: tData.token.indexOf("_")>-1, 
        punctuation_amperand: tData.token.indexOf("&")>-1, 
        punctuation_bang: tData.token.indexOf("!")>-1, 
        punctuation_openbracket: tData.token.indexOf("(")>-1, 
        punctuation_closebracket: tData.token.indexOf(")")>-1, 
        punctuation_open_sbracket: tData.token.indexOf("[")>-1, 
        punctuation_close_sbracket: tData.token.indexOf("]")>-1, 
        punctuation_open_cbracket: tData.token.indexOf("{")>-1, 
        punctuation_close_cbracket: tData.token.indexOf("}")>-1, 
        punctuation_vline: tData.token.indexOf("|")>-1, 
        punctuation_dash: tData.token.indexOf("-")>-1, 
        punctuation_caret: tData.token.indexOf("^")>-1, 
        punctuation_pound: tData.token.indexOf("#")>-1, 
        punctuation_lessthan: tData.token.indexOf("<")>-1, 
        punctuation_greaterthan: tData.token.indexOf(">")>-1, 
        punctuation_equal: tData.token.indexOf("=")>-1, 
        punctuation_percent: tData.token.indexOf("%")>-1, 
        punctuation_backslash: tData.token.indexOf("\\")>-1, 
        punctuation_asterisk: tData.token.indexOf("*")>-1, 
        punctuation_dollar: tData.token.indexOf("$")>-1,       
        punctuation_forwardslash: tData.token.indexOf("/")>-1,
        punctuation_atsign: tData.token.indexOf("@")>-1     
      })

    } 
    else
    {
      this.resetState(); 
    }
   
  }


  handleInputChange(event) 
  {
    console.log("handleInputChange"); 

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    //alert("You clicked on " + name); 

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  /* 
  Method used to create new token
  */
  createNewToken()
  {
    
    //alert("createNewToken Rule id = " + this.props.ruleid); 
    if(!this.props.modify)
    {
      this.props.onAddNewToken("P","punctuation", this.createAllPunctuations(), this.state.optional, 
          this.state.part_of_output, window.CREATEDBY_USER); 
    }
    else
    {
      this.props.onModifyPunctuationToken(this.props.tokenModifyIndex, "P","punctuation", this.createAllPunctuations(), this.state.optional, 
          this.state.part_of_output, window.CREATEDBY_USER); 

    }

  }

  resetState()
  {
    this.state = {
      optional: false,
      part_of_output: false,
      punctuation_comma: false,
      punctuation_period:false,
      punctuation_semicomma: false, 
      punctuation_qmark: false,
      punctuation_tilde: false,
      punctuation_colon: false,
      punctuation_2quote: false,
      punctuation_1quote: false,
      punctuation_plus: false,
      punctuation_underscore: false,
      punctuation_amperand: false,
      punctuation_bang: false,
      punctuation_openbracket: false,
      punctuation_closebracket: false,
      punctuation_open_sbracket: false,
      punctuation_close_sbracket: false,
      punctuation_open_cbracket: false,
      punctuation_close_cbracket: false,
      punctuation_vline: false,
      punctuation_dash: false,
      punctuation_caret: false,
      punctuation_pound: false,
      punctuation_lessthan: false,
      punctuation_greaterthan: false,
      punctuation_equal: false,
      punctuation_percent: false,
      punctuation_backslash: false,
      punctuation_asterisk: false,
      punctuation_dollar: false,
      punctuation_atsign:false,
      punctuation_forwardslash:false
    };

  }



  createAllPunctuations()
  {
      var allPunct = []; 
      if(this.state.punctuation_comma) allPunct.push(","); 
      if(this.state.punctuation_period) allPunct.push("."); 
      if(this.state.punctuation_semicomma) allPunct.push(";");  
      if(this.state.punctuation_qmark) allPunct.push(")"); 
      if(this.state.punctuation_tilde) allPunct.push("~"); 
      if(this.state.punctuation_colon) allPunct.push(":"); 
      if(this.state.punctuation_2quote) allPunct.push("\""); 
      if(this.state.punctuation_1quote) allPunct.push("'"); 
      if(this.state.punctuation_plus) allPunct.push("+"); 
      if(this.state.punctuation_underscore) allPunct.push("_"); 
      if(this.state.punctuation_amperand) allPunct.push("&"); 
      if(this.state.punctuation_bang) allPunct.push("!"); 
      if(this.state.punctuation_openbracket) allPunct.push("("); 
      if(this.state.punctuation_closebracket) allPunct.push(")"); 
      if(this.state.punctuation_open_sbracket) allPunct.push("["); 
      if(this.state.punctuation_close_sbracket) allPunct.push("]"); 
      if(this.state.punctuation_open_cbracket) allPunct.push("{"); 
      if(this.state.punctuation_close_cbracket) allPunct.push("}"); 
      if(this.state.punctuation_vline) allPunct.push("|"); 
      if(this.state.punctuation_dash) allPunct.push("-"); 
      if(this.state.punctuation_caret) allPunct.push("^"); 
      if(this.state.punctuation_pound) allPunct.push("#"); 
      if(this.state.punctuation_lessthan) allPunct.push("<"); 
      if(this.state.punctuation_greaterthan) allPunct.push(">"); 
      if(this.state.punctuation_equal) allPunct.push("="); 
      if(this.state.punctuation_percent) allPunct.push("%"); 
      if(this.state.punctuation_backslash) allPunct.push("\\"); 
      if(this.state.punctuation_asterisk) allPunct.push("*"); 
      if(this.state.punctuation_dollar) allPunct.push("$");
      if(this.state.punctuation_forwardslash) allPunct.push("/");
      if(this.state.punctuation_atsign) allPunct.push("@");
      

      return allPunct;

  }

  cancelDialog()
  {
    this.props.onCloseConfigDialog(); 
  }  

  render() {
    //alert("render called")
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }
    
   //alert("WordTokenConfig id="+this.props.ruleid); 
    var displayHeader; 
    if(this.props.modify)
    {
       displayHeader = <div className="punctuation-modal-header">Modify Punctuation Token </div>
    }
    else
    {
       displayHeader = <div className="punctuation-modal-header">Create Punctuation Token </div>
    }

    return (
      <div className="backdrop" >
        <div className="punctuation-modal">
          {this.props.children}

          {displayHeader}
          <div className="modal-body">


            <div id="punctuation-div1">
              <label>
                <input name="optional" type="checkbox" checked={this.state.optional} onChange={this.handleInputChange} className="wordlabels" />
                optional
                </label>

              <label>
                <input name="part_of_output" type="checkbox" checked={this.state.part_of_output} onChange={this.handleInputChange}  />
                part of output
                </label>


            </div>
            <div id="punctuation-div2">
              <div id="punctuation-symbol-header"> Punctuation Symbols:</div>
              <div id="punctuation-div21">
                <label className="inspeech"><input name="punctuation_comma" type="checkbox" checked={this.state.punctuation_comma} onChange={this.handleInputChange} className="wordlabels"/>,</label>
                <label className="inspeech"><input name="punctuation_period" type="checkbox" checked={this.state.punctuation_period} onChange={this.handleInputChange} className="wordlabels"/>.</label>
                <label className="inspeech"><input name="punctuation_semicomma" type="checkbox" checked={this.state.punctuation_semicomma} onChange={this.handleInputChange} className="wordlabels"/>;</label>     
                <label className="inspeech"><input name="punctuation_qmark" type="checkbox" checked={this.state.punctuation_qmark} onChange={this.handleInputChange} className="wordlabels"/>?</label>                                
                <label className="inspeech"><input name="punctuation_tilde" type="checkbox" checked={this.state.punctuation_tilde} onChange={this.handleInputChange} className="wordlabels"/>~</label>
                <label className="inspeech"><input name="punctuation_colon" type="checkbox" checked={this.state.punctuation_colon} onChange={this.handleInputChange} className="wordlabels"/>:</label>
                <label className="inspeech"><input name="punctuation_2quote" type="checkbox" checked={this.state.punctuation_2quote} onChange={this.handleInputChange} className="wordlabels"/>"</label>
                <label className="inspeech"><input name="punctuation_1quote" type="checkbox" checked={this.state.punctuation_1quote} onChange={this.handleInputChange} className="wordlabels"/>'</label>                
                <label className="inspeech"><input name="punctuation_plus" type="checkbox" checked={this.state.punctuation_plus} onChange={this.handleInputChange} className="wordlabels"/>+</label>  
                <label className="inspeech"><input name="punctuation_underscore" type="checkbox" checked={this.state.punctuation_underscore} onChange={this.handleInputChange} className="wordlabels"/>_</label>  
                <label className="inspeech" ><input name="punctuation_amperand" type="checkbox" checked={this.state.punctuation_amperand} onChange={this.handleInputChange} className="wordlabels"/>&amp;</label>  
            

              </div> 


               <div id="punctuation-div22">
                <label className="inspeech"><input name="punctuation_bang" type="checkbox" checked={this.state.punctuation_bang} onChange={this.handleInputChange} className="wordlabels"/>!</label>  
                <label className="inspeech"><input name="punctuation_openbracket" type="checkbox" checked={this.state.punctuation_openbracket} onChange={this.handleInputChange} className="wordlabels"/>(</label>
                <label className="inspeech"><input name="punctuation_closebracket" type="checkbox" checked={this.state.punctuation_closebracket} onChange={this.handleInputChange} className="wordlabels"/>)</label>
                <label className="inspeech"><input name="punctuation_open_sbracket" type="checkbox" checked={this.state.punctuation_open_sbracket} onChange={this.handleInputChange} className="wordlabels"/>[</label>
                <label className="inspeech"><input name="punctuation_close_sbracket" type="checkbox" checked={this.state.punctuation_close_sbracket} onChange={this.handleInputChange} className="wordlabels"/>]</label>
                <label className="inspeech"><input name="punctuation_open_cbracket" type="checkbox" checked={this.state.punctuation_open_cbracket} onChange={this.handleInputChange} className="wordlabels"/>&#123;</label>
                <label className="inspeech"><input name="punctuation_close_cbracket" type="checkbox" checked={this.state.punctuation_close_cbracket} onChange={this.handleInputChange} className="wordlabels"/>}</label>
                <label className="inspeech"><input name="punctuation_vline" type="checkbox" checked={this.state.punctuation_vline} onChange={this.handleInputChange} className="wordlabels"/>|</label>
                <label className="inspeech"><input name="punctuation_dash" type="checkbox" checked={this.state.punctuation_dash} onChange={this.handleInputChange} className="wordlabels"/>-</label>                 
                <label className="inspeech"><input name="punctuation_caret" type="checkbox" checked={this.state.punctuation_caret} onChange={this.handleInputChange} className="wordlabels"/>^</label>                
                <label className="inspeech"><input name="punctuation_pound" type="checkbox" checked={this.state.punctuation_pound} onChange={this.handleInputChange} className="wordlabels"/>#</label>                
              </div> 

              <div id="punctuation-div23">


                <label className="inspeech"><input name="punctuation_lessthan" type="checkbox" checked={this.state.punctuation_lessthan} onChange={this.handleInputChange} className="wordlabels"/> &lt;</label>
                <label className="inspeech"><input name="punctuation_greaterthan" type="checkbox" checked={this.state.punctuation_greaterthan} onChange={this.handleInputChange} className="wordlabels"/> &gt;</label>
                <label className="inspeech"><input name="punctuation_equal" type="checkbox" checked={this.state.punctuation_equal} onChange={this.handleInputChange} className="wordlabels"/>=</label> 
                <label className="inspeech"><input name="punctuation_percent" type="checkbox" checked={this.state.punctuation_percent} onChange={this.handleInputChange} className="wordlabels"/>%</label>
                <label className="inspeech"><input name="punctuation_backslash" type="checkbox" checked={this.state.punctuation_backslash} onChange={this.handleInputChange} className="wordlabels"/>\</label>
                <label className="inspeech"><input name="punctuation_forwardslash" type="checkbox" checked={this.state.punctuation_forwardslash} onChange={this.handleInputChange} className="wordlabels"/>/</label>                
                <label className="inspeech"><input name="punctuation_asterisk" type="checkbox" checked={this.state.punctuation_asterisk} onChange={this.handleInputChange} className="wordlabels"/>*</label>
                <label className="inspeech"><input name="punctuation_dollar" type="checkbox" checked={this.state.punctuation_dollar} onChange={this.handleInputChange} className="wordlabels"/>$</label>
                <label className="inspeech"><input name="punctuation_atsign" type="checkbox" checked={this.state.punctuation_atsign} onChange={this.handleInputChange} className="wordlabels"/>@</label>                
                                                                                                                                               
              </div>               

            </div> 
          </div> 
          <div id="punctuation-footer">
            <button onClick={this.cancelDialog} className="button">
              cancel
                </button>
            <button onClick={this.createNewToken} className="button" >
              Save
                </button>
          </div>


        </div>
      </div>
    );
  }
}

/*
PunctuationTokenConfig.propTypes = {
  //onClose: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool,
  children: React.PropTypes.node
};
*/
export default PunctuationTokenConfig;