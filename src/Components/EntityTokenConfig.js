import React from 'react';
import "../Styles/wordtoken.css"

class EntityTokenConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optional: false,
      part_of_output: true,
      match_all_forms: true,
      contain_digit: false,
      length1:"",
      length2:"",
      length3:"",
      prefix:"",
      suffix:"",
      invocabulary: false,
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
      maximum: "",
      checked_fields: {}
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
    var new_checked = { ...this.state.checked_fields };
    new_checked[name] = value;

    this.setState({
      checked_fields: new_checked
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
    const list_keys = Object.keys(this.state.checked_fields);
    var myNumbers = list_keys.filter(function(key) { return this.state.checked_fields[key] }.bind(this) ) || []; 
    if(!this.props.modify)
    {    
      this.props.onAddEntityToken("E",window.TYPE_ENTITY, [], this.state.optional, 
          this.state.part_of_output, this.state.match_all_forms, this.state.contain_digit, this.state.length1, this.state.length2, this.state.length3,
          this.state.minimum,this.state.maximum, this.state.notinvocabulary, this.state.invocabulary,
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
      this.props.onModifyEntityToken(this.props.tokenModifyIndex, "E",window.TYPE_ENTITY, [], this.state.optional, 
          this.state.part_of_output, this.state.match_all_forms, this.state.contain_digit, this.state.length1, this.state.length2, this.state.length3,
          this.state.minimum,this.state.maximum, this.state.notinvocabulary, this.state.invocabulary,
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
        checked_fields: tData.numbers.reduce( function(res, ele){ res[ele] = true; return res; }, {} ),
        optional: !tData.is_required, 
        part_of_output: tData.is_in_output,
        length1: tData.length[0], 
        length2: tData.length[1],
        length3: tData.length[2],
        minimum: tData.minimum,
        maximum: tData.maximum
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
      part_of_output: true,
      match_all_forms: true,
      contain_digit: false,
      numbers:[],
      allnumbers:"",
      length1:"",
      length2:"",
      length3:"",
      minimum:"",
      maximum:"",
      prefix:"",
      suffix:"",
      invocabulary: false,
      notinvocabulary: false,
      allwords:"",
      checked_fields:{}
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
       displayHeader = <div className="entity-modal-header">Modify Entity Token </div>
    }
    else
    {
       displayHeader = <div className="entity-modal-header">Create Entity Token </div>
    }

    const item_list = this.props.allfields.map(
      function(ele,i){ 

        return  (
          <label key={i} className="wordlabels_wrapper">
            <input name={ele} type="checkbox" checked={this.state.checked_fields[ele]} onChange={this.handleInputChange} className="wordlabels" />
            {ele}
          </label> 
        );
      }.bind(this))

    return (
      <div className="backdrop" >
        <div className="entity-modal">
          {this.props.children}
          {displayHeader}
          <div className="modal-body">
            <div id="entity-div1">
              {item_list}

            </div>

          </div>

          <div id="entitytoken-footer">
            <button onClick={this.cancelDialog} className="button">
              cancel
                </button>
            <button onClick={this.createNewToken} className="button" >
              Save
                </button>
          </div>
        </div>
      </div>);
  }
}

/*
NumberTokenConfig.propTypes = {
  //onClose: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool,
  children: React.PropTypes.node
};
*/
export default EntityTokenConfig;