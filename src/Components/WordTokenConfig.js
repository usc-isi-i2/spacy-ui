import React from 'react';
import "../Styles/wordtoken.css"

//Define some constants here. 
window.POS_noun = "noun"; 
window.POS_pronoun = "pronoun"; 
window.POS_propernoun = "proper noun";
window.POS_determiner = "determiner"; 
window.POS_symbol = "symbol"; 
window.POS_adjective = "adjective"
window.POS_conjunction= "conjunction";
window.POS_verb= "verb";
window.POS_pre_post_position= "pre/post-position";
window.POS_adverb= "adverb";
window.POS_particle= "particle"; 
window.POS_interjection= "interjection";

class WordTokenConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      optional: false,
      part_of_output: false,
      followed_by_space: false,
      numbers:[],
      length1:"",
      length2:"",
      length3:"",
      prefix:"",
      suffix:"",
      notinvocabulary: false,
      allwords:"",
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
      mixed: false
    };

    //if you don't bind like this you will get an error like 
    //TypeError: Cannot read property 'setState' of null
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createNewToken = this.createNewToken.bind(this); 
    this.cancelDialog = this.cancelDialog.bind(this); 
    this.getInitialTokenState = this.getInitialTokenState.bind(this); 
    this.resetState = this.resetState.bind(this); 

    //console.log("WordTokenConfig = ruleid"+this.props.ruleid); 
  }


  handleInputChange(event) 
  {
    //console.log("handleInputChange"); 
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
    
    //If there is no word make sure you send an empty array. 
    var myWords = this.state.allwords.match(/\S+/g) || [];  

    if(!this.props.modify)
    {
      this.props.onAddNewToken("W",window.TYPE_WORD, myWords, this.state.optional, 
          this.state.part_of_output,this.state.followed_by_space, this.state.length1, this.state.length2, this.state.length3,
          this.state.prefix,this.state.suffix, this.state.notinvocabulary,
          this.state.noun, this.state.pronoun,this.state.punctuation, 
          this.state.propernoun, this.state.determiner, this.state.symbol, 
          this.state.adjective, this.state.conjunction, this.state.verb,
          this.state.prepost_position, this.state.adverb, this.state.particle,
          this.state.interjection,this.state.exact,this.state.lower,
          this.state.upper, this.state.title, this.state.mixed, this.state.numbers, window.CREATEDBY_USER    
      ); 
    }
    else 
    {
      this.props.onModifyWordToken(this.props.tokenModifyIndex, "W",window.TYPE_WORD, myWords, this.state.optional, 
          this.state.part_of_output,this.state.followed_by_space, this.state.length1, this.state.length2, this.state.length3,
          this.state.prefix,this.state.suffix, this.state.notinvocabulary,
          this.state.noun, this.state.pronoun,this.state.punctuation, 
          this.state.propernoun, this.state.determiner, this.state.symbol, 
          this.state.adjective, this.state.conjunction, this.state.verb,
          this.state.prepost_position, this.state.adverb, this.state.particle,
          this.state.interjection,this.state.exact,this.state.lower,
          this.state.upper, this.state.title, this.state.mixed, this.state.numbers, window.CREATEDBY_USER   ); 
    }
  }

  getInitialTokenState()
  {
    return {

          type: "word",
          token: [],
          capitalization: [],
          part_of_speech: [],
          length: [],
          prefix: "",
          suffix: "",
          maximum:"",
          minimum:"",           
          is_required: "false",
          is_in_output: "false",
          is_out_of_vocabulary: "false",
          is_in_vocabulary: "false",
          contain_digit: "false",
          numbers: [], 

    }; 
  }

  cancelDialog()
  {
    this.props.onCloseConfigDialog(); 
  }

  /*We had to put the setting of the state here because 
  * of the way we show the dialog and don't re-render. 
  */
  componentWillReceiveProps(nextProps)
  {    
    //console.log("WordTokenConfig->componentWillReceiveProps are we modifying token = " + nextProps.modify);   
    var tData = nextProps.tokenData; 
    if(nextProps.modify)
    {
      //console.log("componentWillReceiveProps: Tokens are = " + tData.is_in_output); 
      this.setState({
        allwords: tData.token.join(" "),
        optional: !tData.is_required, 
        part_of_output: tData.is_in_output,
        upper: tData.capitalization.indexOf("upper")>-1? true:false,
        lower: tData.capitalization.indexOf("lower")>-1? true:false,
        title: tData.capitalization.indexOf("title")>-1? true:false, 
        mixed: tData.capitalization.indexOf("mixed")>-1? true:false, 
        exact: tData.capitalization.indexOf("exact")>-1? true:false, 
        noun: tData.part_of_speech.indexOf(window.POS_noun)>-1? true:false, 
        pronoun:tData.part_of_speech.indexOf(window.POS_pronoun)>-1? true:false, 
        propernoun: tData.part_of_speech.indexOf(window.POS_propernoun)>-1? true:false,
        determiner: tData.part_of_speech.indexOf(window.POS_determiner)>-1? true:false, 
        symbol: tData.part_of_speech.indexOf(window.POS_symbol)>-1? true:false,
        adjective: tData.part_of_speech.indexOf(window.POS_adjective)>-1? true:false,
        conjunction: tData.part_of_speech.indexOf(window.POS_conjunction)>-1? true:false,
        verb: tData.part_of_speech.indexOf(window.POS_verb)>-1? true:false, 
        prepost_position: tData.part_of_speech.indexOf(window.POS_pre_post_position)>-1? true:false,
        adverb: tData.part_of_speech.indexOf(window.POS_adverb)>-1? true:false, 
        particle: tData.part_of_speech.indexOf(window.POS_particle)>-1? true:false, 
        interjection: tData.part_of_speech.indexOf(window.POS_interjection)>-1? true:false, 
        length1: tData.length[0], 
        length2: tData.length[1],
        length3: tData.length[2],
        followed_by_space: tData.is_followed_by_space
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
      followed_by_space: false,
      numbers:[],
      length1:"",
      length2:"",
      length3:"",
      prefix:"",
      suffix:"",
      notinvocabulary: false,
      allwords:"",
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
      mixed: false
    };

  }


  render() {
    //alert("render called")
    // Render nothing if the "show" prop is false
    if (!this.props.show || !this.state.show) {
      return null;
    }

    var displayHeader; 
    if(this.props.modify)
    {
       displayHeader = <div className="modal-header">Modify Word Token </div>
    }
    else
    {
       displayHeader = <div className="modal-header">Create Word Token </div>
    }


    if(this.state.part_of_output)
      console.log("WordTokenConfig->render: part of outputtttttttttttttttttt"); 
   //alert("WordTokenConfig id="+this.props.ruleid); 
   
    return (
      <div className="backdrop" >
        <div  className="modal">
          {this.props.children}

          {displayHeader}
          <div  className="modal-body">
            <div id="div1">
              <label>
                <input name="optional" type="checkbox" checked={this.state.optional} onChange={this.handleInputChange} className="wordlabels" />
                optional
                </label>

              <label>
                <input name="part_of_output" type="checkbox" checked={this.state.part_of_output} onChange={this.handleInputChange} className="wordlabels" />
                part of output
                </label>

              <label>
                <input name="followed_by_space" type="checkbox" checked={this.state.followed_by_space} onChange={this.handleInputChange} className="wordlabels" />
                followed by space
                </label>
            </div>

            <div id="div2">

              <div id="div21"> 
                <label>
                  <b>Words:</b>
                  <textarea name="allwords" 
                  placeholder= "Enter words here. "                  
                  value={this.state.allwords} 
                  onChange={this.handleInputChange} 
                  rows="15" 
                  cols="15"  
                  className="allwords"/>
                </label>
              </div> 

              <div id="div22">
                <div id="partofspeech">
                  <b>Part of speech: </b>
                </div>
                <div id="partofspeech_1">
                    <label className="inspeech">
                      <input name="noun" type="checkbox" checked={this.state.noun} onChange={this.handleInputChange}  className="wordlabels" />
                      noun
                    </label>    

                    <label className="inspeech">
                      <input name="pronoun" type="checkbox" checked={this.state.pronoun} onChange={this.handleInputChange} className="wordlabels" />
                      pronoun
                    </label> 


                    <label className="inspeech">
                      <input name="propernoun" type="checkbox" checked={this.state.propernoun} onChange={this.handleInputChange} className="wordlabels" />
                      proper noun
                    </label> 

                    <label className="inspeech">
                      <input name="determiner" type="checkbox" checked={this.state.determiner} onChange={this.handleInputChange} className="wordlabels" />
                      determiner
                    </label> 

                    <label className="inspeech">
                      <input name="symbol" type="checkbox" checked={this.state.symbol} onChange={this.handleInputChange} className="wordlabels" />
                      symbol
                    </label>        

                    <label className="inspeech">   
                      <input name="adjective" type="checkbox" checked={this.state.adjective} onChange={this.handleInputChange} className="wordlabels" />
                      adjective
                    </label>      

                </div>
                <div id="partofspeech_2">
         

                    <label className="inspeech">
                      <input name="conjunction" type="checkbox" checked={this.state.conjunction} onChange={this.handleInputChange} className="wordlabels" />
                      conjunction
                    </label>                     

                    <label className="inspeech">
                      <input name="verb" type="checkbox" checked={this.state.verb} onChange={this.handleInputChange} className="wordlabels" />
                      verb
                    </label>                     

                    <label className="inspeech">
                      <input name="prepost_position" type="checkbox" checked={this.state.prepost_position} onChange={this.handleInputChange} className="wordlabels" />
                      pre/post-position
                    </label>                     

                    <label className="inspeech">
                      <input name="adverb" type="checkbox" checked={this.state.adverb} onChange={this.handleInputChange} className="wordlabels" />
                      adverb
                    </label>                     

                    <label className="inspeech">
                      <input name="particle" type="checkbox" checked={this.state.particle} onChange={this.handleInputChange} className="wordlabels" />
                      particle
                    </label>                     

                    <label className="inspeech">
                      <input name="interjection" type="checkbox" checked={this.state.interjection} onChange={this.handleInputChange} className="wordlabels" />
                      interjection
                    </label>                       
                </div>
                <div>
                <b>Capitalization: </b>
                </div>
                <div id="capitalization">
                  <label>
                    <input name="exact" type="checkbox" checked={this.state.exact} onChange={this.handleInputChange} className="wordlabels" />
                    exact
                  </label>      
                  <label>
                    <input name="lower" type="checkbox" checked={this.state.lower} onChange={this.handleInputChange} className="wordlabels" />
                    lower
                  </label>   
                  <label>
                    <input name="upper" type="checkbox" checked={this.state.upper} onChange={this.handleInputChange} className="wordlabels" />
                    upper
                  </label>   
                  <label>
                    <input name="title" type="checkbox" checked={this.state.title} onChange={this.handleInputChange} className="wordlabels" />
                    title
                  </label>             
                  <label>
                    <input name="mixed" type="checkbox" checked={this.state.mixed} onChange={this.handleInputChange} className="wordlabels" />
                    mixed
                  </label>                                                                           
                </div> 
              </div> 
            </div>

            <div id="div3">
              <label>
                Length 1:
                <input name="length1" type="text" value={this.state.length1} onChange={this.handleInputChange} size="10" />
                </label>

              <label>
                Length 2: 
                <input name="length2" type="text" value={this.state.length2} onChange={this.handleInputChange}  size="10"  />
                </label>

              <label>
                Length 3
                <input name="length3" type="text" value={this.state.length3} onChange={this.handleInputChange} size="10"  />
                
                </label>              
            </div> 
          </div>

          <div id="div4">
            <div id="div41">
              <label>
                Prefix: 
                <input name="prefix" type="text" value={this.state.prefix} onChange={this.handleInputChange} size="10" className="wordlabels2" />
              </label> 

              <label>
                Suffix: 
                <input name="suffix" type="text" value={this.state.suffix} onChange={this.handleInputChange} size="10" className="wordlabels2" />
              </label> 

              <label>
                <input name="notinvocabulary" type="checkbox" checked={this.state.notinvocabulary} onChange={this.handleInputChange} className="wordlabels" />
                not in vocabulary
                </label>

            </div> 
          </div> 

          <div id="footer">
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
WordTokenConfig.propTypes = {
  //onClose: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool,
  children: React.PropTypes.node
};
*/
export default WordTokenConfig;