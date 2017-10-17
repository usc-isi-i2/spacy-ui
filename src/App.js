
import React, { Component } from 'react';
import Rule from './Components/Rule'; 
import "./Styles/layout.css"; 

/*We need base.64 for the authentication*/
const base64 = require('base-64');
var webServiceUrl = ""; 
var webServiceUrlAllRules = ""

var RULE_NUM = 0; 

window.CREATEDBY_SERVER = "server"; 
window.CREATEDBY_USER = "user"; 
window.TYPE_WORD = "word"; 
window.TYPE_NUMBERS = "number"; 
window.TYPE_PUNCTUATION = "punctuation"; 
window.TYPE_SHAPE = "shape";
window.TYPE_LINEBREAK = "linebreak";

var ActionEnum =
{
  "DeleteRule": "1",
  "ReceivingData":"2"
}

/*
  Main Application entry point
DESIGN
         APP
          |
     -------------       
     |            |
    Rules 1.....Rule N
      |            |
      |          ---------------
  ----------     |              |
  |         |    Token 1.......Token N
Token 1 ...Token N

All rules are first created here.

*/
class App extends Component {
  constructor(props) 
  {
    super(props);
    /*Set necessary state*/
    this.state = 
    {
      test_text:"",
      test_tokens:[],
      jsonRules:[], 
      jsonExtraction:[],
      allServerRules:{rules:[]},
      createdby:window.CREATEDBY_SERVER,
    }

    this.allRuleData = {}; 
    this.lastAction =  ActionEnum.ReceivingData; 
    this.deleteCounter = 0; 

    /*function binding required by react*/
    this.sendData = this.sendData.bind(this);
    this.ProcessJSONData = this.ProcessJSONData.bind(this); 
    this.buildData2Send = this.buildData2Send.bind(this); 
    this.handleChange = this.handleChange.bind(this);
    this.addNewRule = this.addNewRule.bind(this); 
    this.getData = this.getData.bind(this); 
    this.getInitState = this.getInitState.bind(this); 
    this.onDeleteRule = this.onDeleteRule.bind(this); 
    this.onDuplicateRule = this.onDuplicateRule.bind(this); 
  }


  componentWillMount() 
  {
    //This is the development Server IP. 
    //http://52.36.12.77:9879/projects/pedro_test_01/fields/name/spacy_rules'
    var serverName = base64.decode(this.props.params.serverName);
    console.log("Server name = " + serverName);

    if(this.props.params.projectName === undefined || this.props.params.fieldName === undefined)
    {
      console.log("No project/field name specified. They are both required!!!!!"); 
    }

    webServiceUrl = 'http://' + serverName  +'/projects/' + this.props.params.projectName + '/fields/'+
                 this.props.params.fieldName + '/spacy_rules'; 

    //Type=all grabs all the rules, test_text, token, results etc. 
    webServiceUrlAllRules = webServiceUrl + "?type=all";

    console.log("webservice url = " + webServiceUrl); 
    console.log("Address for getting rules:" +webServiceUrlAllRules); 

    this.getData(); 
  }

  componentDidMount()
  {
    //Here is where you set the application title. 
    document.title = "The Extractor";
  }


  /*
    Method to update the form when the test_text changes. 
  */
  handleChange(event) 
  {
    this.setState({test_text: event.target.value});
  }

  /*
    The method is a callback method that called by rules.js whenver a new token is created. 
  */
  ProcessJSONData(ruleid, allTokenData, identifier1, description1, polarity1,is_active1,output_format1, createdby)
  {
    console.log("ProcessJSONData....ruleid = " + ruleid + " identifier = " + identifier1 + " descr = " + description1); 
    //This allows us to make a copy. 
    var myPattern = JSON.parse(JSON.stringify(allTokenData));
    
    /*Let's start building the JSON formatted data that will ultimately be sent to the webservice*/
    for(var i=0; i< myPattern.length ;  i++)
    {
      // myPattern[i].match_all_forms = myPattern[i].match_all_forms.toString(); 
      myPattern[i].is_required = myPattern[i].is_required.toString(); 
      myPattern[i].is_in_output = myPattern[i].is_in_output.toString();
      // myPattern[i].is_in_vocabulary = myPattern[i].is_in_vocabulary.toString(); 
      // myPattern[i].is_out_of_vocabulary = myPattern[i].is_out_of_vocabulary.toString(); 
    }

    /*Let's build each rule token according to the JSON spec */
    this.allRuleData[identifier1] = {
        polarity: polarity1, 
        description: description1, 
        pattern: myPattern,
        output_format: output_format1,
        is_active: is_active1? "true":"false", //requires a string for true or false. 
        identifier: identifier1
    } ;

    /*
      if the rules/tokens are originally created by the user then we send it back to webservice.Otherwise there is no need to 
      send rules that came from the webservice back. We just need to accumulate the JSON array/data and keep adding to it. 
    */
    if(createdby === window.CREATEDBY_USER)
    { 
      this.sendData(); 
    }
    else if(this.lastAction === ActionEnum.DeleteRule)
    {
      /*
        In this scenario, the rules/tokens were created from the data from the server and the user deletes a rule. So we need
        to update the webservice that rules has been deleted. 
      */
      console.log("App->ProcessJSONData: counter = " + this.deleteCounter + " length = " + this.state.allServerRules.rules.length); 
      if((++this.deleteCounter) === this.state.allServerRules.rules.length)
      {
        console.log("App->ProcessJSONData: sending deleted information to the WebService"); 
        this.sendData(); 
        this.lastAction = ActionEnum.ReceivingData; 
      }
    }


  }

  getInitState()
  {
    return {
      identifier: "rule_"+(++RULE_NUM),
      description: "",
      is_active: "true",
      output_format:"",
      pattern:[]
    }
  }

  /*
  This method is used to build the JSON data that will be transmitted. 
  */
  buildData2Send()
  {
    //TODO: @wole change the rule data to send. 
    const values = Object.values(this.allRuleData); 
    var myData2Send = {};
    myData2Send={
      rules: values, 
      test_text:this.state.test_text
    }; 

    var data2Send = JSON.stringify(myData2Send);

    return data2Send; 
  }

  getData()
  {
    console.log("getData  from webservice=" +webServiceUrlAllRules);

    //This is how you authenticate using base64(username:password. )
    var headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode("memex:digdig"));
    headers.append("accept", "application/json"); 
    /*
    Let's fetch the data from the webservice. 
    */
    //alert(webServiceUrl); 
    fetch(webServiceUrlAllRules, {
      method: 'GET',  
      headers: headers, //authentication header. 
    }).then( (response) => {
                return response.json() })   
                    .then( (json) => {
                        //alert("GETDATA WoRKED"); 
                        if(json === undefined)
                          return; 

                        /*If there is an error, then there is no json.rules - it's undefined. 
                        *
                        */
                        if(json.rules !== undefined)
                        {
                          console.log("Received 200 ok"); 
                          if(json.rules.length < 1 )
                          {
                            console.log("There are NO rules from this project/field combination");
                            return; 
                          }

                          /*I overwrite the rules identifier with our own naming. Sometimes these rules
                          *are created on the server and no identifier is provided.
                          */
                          for(var i=0; i<json.rules.length; i++)
                          {
                            json.rules[i].identifier = "rule_"+(++RULE_NUM); 
                          }
                    
                          this.setState({
                            createdby: window.CREATEDBY_SERVER,
                            allServerRules: json,
                            test_text: json.test_text,
                            test_tokens: json.test_tokens
                          });

                        }
                        else
                        {
                          console.log("Error code " + json.status_code + "received"); 
                          console.log("Error msg = " + json.error_message); 
                        }
                    });
  }

  /*
  This method sends the JSON data across the wire and processes the response. 
  */
  sendData()
  {
    console.log("Enter SendData: about post json to the SERVER");

    //This is how you authenticate using base64(username:password. )
    // var headers = new Headers();
    // headers.append("Authorization", "Basic " + base64.encode("user:pwd"));

    /*
    Let's fetch the data from the webservice. 
    */
    console.log(webServiceUrl); 
    fetch(webServiceUrl, {
      method: 'POST',  
      // headers: headers, //authentication header. 
      body:
          this.buildData2Send() //JSON data created earlier. 
    }).then( (response) => {
                return response.json() })   
                    .then( (json) => {

                        if(json === undefined)
                          return; 
                        
                        //var myArr = JSON.parse(json);
                        console.log("Test = " + json.results); 
                        var myResultRules=[]; 
                        var myResultExtractions=[]; 
                        for(var i=0; i < json.results.length; i++)
                        {
                          console.log("result rule_id =" +  json.results[i].context.rule_id +" value="+json.results[i].value); 
                          //myResult[json.results[i].context.rule_id] = json.results[i].value; 
                          myResultRules.push(json.results[i].context.rule_id); 
                          myResultExtractions.push(json.results[i].value); 
                        }
                        this.setState({
                          jsonRules: myResultRules,
                          jsonExtraction: myResultExtractions,
                          test_tokens: json.test_tokens,
                          test_text: json.test_text
                        });
                    });

    // console.log(webServiceUrl);
    // console.log(this.buildData2Send());
  }

  /*
    This method is for adding new rule to the rule list. 
  */
  addNewRule()
  {
    var myRule = this.getInitState(); 
    this.setState({
        createdby: window.CREATEDBY_USER
    }); 

    //this.state.allServerRules.rules.push(myRule); 
    let allRules = this.state.allServerRules.rules; 
    allRules.push(myRule); 
    this.setState(prevState =>
    ({
        allServerRules: {rules:allRules}
    }));
    

  }

  /*
  This method handles deleting of rules. 
  */
  onDeleteRule(myIndex)
  {
    //console.log("Apps->onDeleteRule....delete index = " + myIndex); 
    
    this.allRuleData = {}; 

    let allRules = this.state.allServerRules.rules; 
    allRules.splice(myIndex,1); 

    this.lastAction = ActionEnum.DeleteRule; 
  
    this.setState(prevState =>
    ({
        allServerRules: {rules:allRules}
    }));

  }

  /*
  TODO: placeholder for a rule duplication if it's needed. 
  */
  onDuplicateRule(index)
  {
    console.log("Apps->onDuplicate"); 

  }

  /*
    For rendering the GUI. 
  */  
  render() 
  {
    var displayedRules = this.state.allServerRules.rules.map((rule,i)=>(
                            <div className="help" key={rule.identifier} >  <Rule rulenum={i+1} index={i} key={rule.identifier} onDeleteRule={this.onDeleteRule} onDuplicateRule={this.onDuplicateRule}
                              onProcessJSONData={this.ProcessJSONData}  ruleObj={rule} createdby={this.state.createdby}/> 
                          </div>
                        )); 

    var displayToken =  this.state.test_tokens.map((myText,i)=>(
                           <span className="testTokenStyle" key={i}> {JSON.stringify(myText)}</span>
                        )); 
                         
    return (
      <div className="App">
      
      <div className="page-wrap">
        <div id="appHeader">
          <div id="ruleMenu">
          <button className="button" onClick={this.addNewRule} >Add Rule </button>  
          </div> 
          
        </div> 
        <span className="extractionText"> Extraction Rules </span>
        <div className="extraction-rules">

          <div>
              <ul className="listStyle">

                {displayedRules}

              </ul>

          </div> 
          
          </div>
        <br/>
        <div> 
          <span className="extractionText"> Text/Tokens</span>
          <div className="rulesText"> 
            <textarea name="test_text" onChange={this.handleChange}  rows="5" className="textInput" value={this.state.test_text}/>
            <div className ="textInput2"> {displayToken} </div>
           </div> 
        </div>
        <br/>
       <div id="run-rules"> <button className="button" onClick={this.sendData} >Run Rules </button> </div>

        <span className="extractionText"> Results </span>
        <div id="result">
          <ul className="listStyle">
            {this.state.jsonRules.map((ruleid, index) => (
               <li key={index}> <span className="resultwrap" key={index}> Rule: <b>{ruleid+1}</b> </span>  Extraction: <b>{this.state.jsonExtraction[index]}</b>  </li>
            ))}             
          </ul>
       </div>
            
      </div>

      
      </div>
    );
    
  }
  
}

export default App;
