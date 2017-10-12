import React from 'react';
import "../Styles/wordtoken.css"

class LinebreakTokenConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optional: false,
      part_of_output: false,
      length1:"",
      length2:"",
      length3:"",
      prefix:"",
      suffix:"",
      notinvocabulary: false,
      allwords:"",
      allnumbers:"",
      noun:false, 
      pronoun:false, 
      punctuation:false,
      propernoun: false,
      determiner: false, 
      symbol: false,
      adjective: false,
      conjunction: false,
      verb: false, 
      prepost_position: false,
      adverb: false, 
      particle: false, 
      interjection: false,
      exact: false, 
      lower: false, 
      upper: false, 
      title: false, 
      mixed: false,
      minimum:"",
      maximum: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createNewToken = this.createNewToken.bind(this); 
    this.checkInput = this.checkInput.bind(this); 
    this.cancelDialog = this.cancelDialog.bind(this); 
    this.resetState = this.resetState.bind(this);     

    //console.log("NumberTokenConfig = ruleid"+this.props.ruleid); 

  }

  componentWillMount() 
  {
  }

  handleInputChange(event) 
  {

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
    var myNumbers = this.state.allnumbers.match(/\S+/g) || [];  

    if(!this.props.modify)
    {    

      this.props.onAddLinebreakToken("LB",window.TYPE_LINEBREAK, [], this.state.optional, 
          this.state.part_of_output,this.state.length1, this.state.length2, this.state.length3,
          this.state.minimum,this.state.maximum,
          this.state.noun, this.state.pronoun,this.state.punctuation, 
          this.state.propernoun, this.state.determiner, this.state.symbol, 
          this.state.adjective, this.state.conjunction, this.state.verb,
          this.state.prepost_position, this.state.adverb, this.state.particle,
          this.state.interjection,this.state.exact,this.state.lower,
          this.state.upper, this.state.title, this.state.mixed,myNumbers, 
          window.CREATEDBY_USER ); 
    }
    else
    {
      this.props.onModifyLinebreakToken(this.props.tokenModifyIndex, "LB",window.TYPE_LINEBREAK, [], this.state.optional, 
          this.state.part_of_output,this.state.length1, this.state.length2, this.state.length3,
          this.state.minimum,this.state.maximum, 
          this.state.noun, this.state.pronoun,this.state.punctuation, 
          this.state.propernoun, this.state.determiner, this.state.symbol, 
          this.state.adjective, this.state.conjunction, this.state.verb,
          this.state.prepost_position, this.state.adverb, this.state.particle,
          this.state.interjection,this.state.exact,this.state.lower,
          this.state.upper, this.state.title, this.state.mixed,myNumbers, 
          window.CREATEDBY_USER ); 
    }
  }

  checkInput(event) 
  {
    var invalidcharacters = /[^0-9]/gi
    var phn = document.getElementById('textarea');
    if (invalidcharacters.test(phn.value)) {
       var  newstring = phn.value.replace(invalidcharacters, "");
        phn.value = newstring
    }
  }


  /*We had to put the setting of the state here because 
  * of the way we show the dialog and don't re-render. 
  */
  componentWillReceiveProps(nextProps)
  {
    //console.log("NumberTokenConfig->componentWillReceiveProps are we modifying token = " + nextProps.modify);       
    var tData = nextProps.tokenData; 
    if(nextProps.modify)
    {
      this.setState({
        // allnumbers: tData.numbers.join(" "),
        optional: !tData.is_required, 
        part_of_output: tData.is_in_output,
        length1: tData.length[0], 
        // length2: tData.length[1],
        // length3: tData.length[2]
      })

    } 
    else
    {
      this.resetState(); 

    }
   
  }
  
  resetState()
  {
    this.state = {
      show:true,
      optional: false,
      part_of_output: false,
      numbers:[],
      allnumbers:"",
      length1:"",
      length2:"",
      length3:"",
      minimum:"",
      maximum:"",
      prefix:"",
      suffix:"",
      notinvocabulary: false,
      allwords:"",
    };

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
    
    var displayHeader; 
    if(this.props.modify)
    {
       displayHeader = <div className="linebreak-modal-header">Modify Linebreak Token </div>
    }
    else
    {
       displayHeader = <div className="linebreak-modal-header">Create Linebreak Token </div>
    }

    return (
      <div className="backdrop" >
        <div className="linebreak-modal">
          {this.props.children}
          {displayHeader}
          <div className="modal-body">
            <div id="linebreak-div1">
            <label>
            optional
                <input name="optional" type="checkbox" checked={this.state.optional} onChange={this.handleInputChange} className="wordlabels" />
                </label>

              <label>
                      part of output
                <input name="part_of_output" type="checkbox" checked={this.state.part_of_output} onChange={this.handleInputChange} className="wordlabels" />
                </label>

                <label>
                Quantity:
                <input name="length1" type="text" value={this.state.length1} onChange={this.handleInputChange} size="10" />
                </label>

            </div>

          </div>

          <div id="linebreaktoken-footer">
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
NumberTokenConfig.propTypes = {
  //onClose: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool,
  children: React.PropTypes.node
};
*/
export default LinebreakTokenConfig;