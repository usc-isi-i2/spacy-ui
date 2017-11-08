import React, { Component } from 'react';
import Token from './Token'
import PlusToken from './PlusToken'
import "../Styles/rule.css"
import WordTokenConfig from './WordTokenConfig';
import ShapeTokenConfig from './ShapeTokenConfig'; 
import NumberTokenConfig from './NumberTokenConfig'; 
import PunctuationTokenConfig from './PunctuationTokenConfig'; 
import LinebreakTokenConfig from './LinebreakTokenConfig';
import EntityTokenConfig from './EntityTokenConfig'; 
import TokenWrapper from './TokenWrapper'; 

/*GLOBAL values used for token, rule ids*/
var GLOBAL_ID = 1; 
var TOKEN_BASE = 9000; 
var PTOKEN_BASE = 81000; 
var RULE_BASE = 7000; 
var GLOBAL_RULE_ID = 1; 


/*
The Rule class holds the different token. There currently 5 types of tokens: 
1. word token
2. punctuation token
3. shape token
4. number token
5. linebreak token
6. entity token
*/
class Rule extends Component
{
    constructor(props)
    {
        super(props); 

        const btt = <PlusToken  id={PTOKEN_BASE+(++GLOBAL_ID)}/>; 
        this.state = {
            array:[btt], 
            isWordDialogOpen: false,
            isNumberDialogOpen: false,
            isPunctuationDialogOpen: false,
            isShapeDialogOpen: false,
            isLinebreakDialogOpen: false,
            isEntityDialogOpen: false,
            allTokenData:[],
            value: 10, 
            id:RULE_BASE+(++GLOBAL_RULE_ID), 
            description:"", 
            polarity: "true",
            output_format:"",
            is_active: true, 
            identifier: "",
            is_in_output:true,
            isModifyWord: false,
            isModifyPunctuation: false, 
            isModifyNumbers: false, 
            tokenModifyIndex: -1,
            isModifyShape: false, 
            isModifyLinebreak: false, 
            isModifyEntity: false, 
            newToken2AddIndex: -1,
            contain_digit: true,
            match_all_forms: true,
            is_out_of_vocabulary: true,
            is_in_vocabulary: true

        }

        this.sendData2App = false; 

        /* You need to bind all the function.
        Need in React
        if you don't bind like this you will get an error like 
        TypeError: Cannot read property 'setState' of null
        */
        this.toggleWordConfigDialog = this.toggleWordConfigDialog.bind(this); 
        this.toggleNumberConfigDialog = this.toggleNumberConfigDialog.bind(this); 
        this.toggleShapeConfigDialog = this.toggleShapeConfigDialog.bind(this); 
        this.togglePunctuationConfigDialog = this.togglePunctuationConfigDialog.bind(this); 
        this.toggleLinebreakConfigDialog = this.toggleLinebreakConfigDialog.bind(this); 
        this.toggleEntityConfigDialog = this.toggleEntityConfigDialog.bind(this); 
        this.showWordTokenDialog = this.showWordTokenDialog.bind(this); 
        this.onAddWordToken = this.onAddWordToken.bind(this); 
        this.onAddNumberToken = this.onAddNumberToken.bind(this); 
        this.onAddPunctuationToken = this.onAddPunctuationToken.bind(this); 
        this.onAddShapeToken = this.onAddShapeToken.bind(this); 
        this.onAddLinebreakToken = this.onAddLinebreakToken.bind(this); 
        this.onAddEntityToken = this.onAddEntityToken.bind(this); 
        this.createWordJSON = this.createWordJSON.bind(this); 
        this.createNumberJSON = this.createNumberJSON.bind(this); 
        this.createPunctuationJSON = this.createPunctuationJSON.bind(this); 
        this.createShapeJSON = this.createShapeJSON.bind(this); 
        this.createLinebreakJSON = this.createLinebreakJSON.bind(this); 
        this.createEntityJSON = this.createEntityJSON.bind(this); 
        this.showNumberTokenDialog = this.showNumberTokenDialog.bind(this); 
        this.showPunctuationTokenDialog = this.showPunctuationTokenDialog.bind(this); 
        this.showShapeTokenDialog = this.showShapeTokenDialog.bind(this); 
        this.showLinebreakTokenDialog = this.showLinebreakTokenDialog.bind(this); 
        this.showEntityTokenDialog = this.showEntityTokenDialog.bind(this); 
        this.deleteToken = this.deleteToken.bind(this); 
        this.handleChange_outformat = this.handleChange_outformat.bind(this); 
        this.handleChange_description = this.handleChange_description.bind(this); 
        this.loadTokensFromServer = this.loadTokensFromServer.bind(this); 
        this.onEditToken = this.onEditToken.bind(this); 
        this.onModifyWordToken = this.onModifyWordToken.bind(this); 
        this.onModifyPunctuationToken = this.onModifyPunctuationToken.bind(this); 
        this.onModifyNumberToken = this.onModifyNumberToken.bind(this);
        this.onModifyShapeToken = this.onModifyShapeToken.bind(this);  
        this.onModifyLinebreakToken = this.onModifyLinebreakToken.bind(this);  
        this.onModifyEntityToken = this.onModifyEntityToken.bind(this);  
        this.handle_onBlur = this.handle_onBlur.bind(this);
        this.updateActiveRule = this.updateActiveRule.bind(this);  
        this.onClickPlusToken = this.onClickPlusToken.bind(this); 
        this.ProcessAllNewTokens = this.ProcessAllNewTokens.bind(this); 
        this.deleteRule = this.deleteRule.bind(this); 
        this.duplicate = this.duplicate.bind(this); 
        this.processAllEditedTokens = this.processAllEditedTokens.bind(this); 
    }

    componentWillMount() 
    {
        if(this.props.createdby !== window.CREATEDBY_SERVER)
        {
            console.log("Rule was created by user");
            this.setState({
                description : this.props.ruleObj.description,
                output_format : this.props.ruleObj.output_format,
                is_active : (this.props.ruleObj.is_active === "true"),
                identifier : this.props.ruleObj.identifier
            })
        }
        else
        {
            console.log("Rule was created from server"); 
            this.loadTokensFromServer(); 
        }
    }

    /*
    This method is used to determine when to open or close the token dialog
    */
    toggleWordConfigDialog()
    {
        this.setState({
         isWordDialogOpen: !this.state.isWordDialogOpen
        });  
        
        //Once the dialog closes, we need to turn off modify if it's still on. 
        if(!this.setState.isWordDialogOpen)
        {   
            this.setState({
                isModifyWord:false
            })
        }
    }

    /*
    This method is used to determine when to open or close the token dialog
    */
    toggleShapeConfigDialog()
    {
        this.setState({
         isShapeDialogOpen: !this.state.isShapeDialogOpen
        });  
        
        //Once the dialog closes, we need to turn off modify if it's still on. 
        if(!this.setState.isShapeDialogOpen)
        {   
            this.setState({
                isModifyShape:false
            })
        }
    }

    /*
    This method is used to determine when to open or close the token dialog
    */
    toggleNumberConfigDialog()
    {
        this.setState({
         isNumberDialogOpen: !this.state.isNumberDialogOpen
        }); 

        if(!this.setState.isNumberDialogOpen)
        {   
            this.setState({
                isModifyNumbers:false
            })
        }      
    }

    toggleLinebreakConfigDialog()
    {
        this.setState({
         isLinebreakDialogOpen: !this.state.isLinebreakDialogOpen
        }); 

        if(!this.setState.isLinebreakDialogOpen)
        {   
            this.setState({
                isModifyLinebreak:false
            })
        }        
    }

    toggleEntityConfigDialog()
    {
        this.setState({
         isEntityDialogOpen: !this.state.isEntityDialogOpen
        }); 

        if(!this.setState.isEntityDialogOpen)
        {   
            this.setState({
                isModifyEntity:false
            })
        }      
    }

        /*
    This method is used to determine when to open or close the token dialog
    */
    togglePunctuationConfigDialog()
    {
        this.setState({
         isPunctuationDialogOpen: !this.state.isPunctuationDialogOpen
        });    
        
        //Once the dialog closes, we need to turn off modify if it's still on. 
        if(!this.setState.isPunctuationDialogOpen)
        {   
            this.setState({
                isModifyPunctuation:false
            })
        }
    }

    /*  
    This method will load all the tokens for this particular rule. 
    */
    loadTokensFromServer()
    {
        var myToken; 
        var count = this.props.ruleObj.pattern.length; 
   
        this.setState({
            description : this.props.ruleObj.description,
            output_format : this.props.ruleObj.output_format,
            is_active : (this.props.ruleObj.is_active === "true"),
            identifier : this.props.ruleObj.identifier
        })
        
        console.log("Rule->loadTokensFromServer.....description = " + this.setState.description); 
        for(var i = 0; i < count; i++) 
        {
            myToken = this.props.ruleObj.pattern[i]; 
            var myarr = myToken.part_of_speech; 
            var myarr1 = myToken.capitalization; 
            if( myToken.type === window.TYPE_WORD)
            {   
                var llw = ["0","0","0"]
                for (var j = 0; j < myToken.length.length; j++) { 
                    llw[j] = ""+myToken.length[j]
                }
                this.onAddWordToken("W",window.TYPE_WORD, myToken.token, !(myToken.is_required==='true'), 
                    myToken.is_in_output==='true', myToken.match_all_forms === 'true', myToken.contain_digit === 'true', llw[0], llw[1], llw[2],
                    myToken.prefix, myToken.suffix, myToken.is_out_of_vocabulary === 'true', myToken.is_in_vocabulary === 'true', (myarr.indexOf(window.POS_noun) > -1), (myarr.indexOf(window.POS_pronoun) > -1), (myarr.indexOf(window.POS_punctuation) > -1),
                    (myarr.indexOf(window.POS_propernoun) > -1), (myarr.indexOf(window.POS_determiner) > -1), (myarr.indexOf(window.POS_symbol) > -1), (myarr.indexOf(window.POS_adjective) > -1), (myarr.indexOf(window.POS_conjunction) > -1),(myarr.indexOf(window.POS_verb) > -1),  
                    (myarr.indexOf("prepost_position") > -1), (myarr.indexOf(window.POS_adverb) > -1), (myarr.indexOf(window.POS_particle) > -1), (myarr.indexOf(window.POS_interjection) > -1), (myarr1.indexOf("exact") > -1),(myarr1.indexOf("lower") > -1), (myarr1.indexOf("upper") > -1),
                    (myarr1.indexOf("title") > -1), (myarr1.indexOf("mixed") > -1), myToken.numbers, window.CREATEDBY_SERVER);            
            }
            else if (myToken.type === window.TYPE_NUMBERS)
            {
                var lln = ["0","0","0"]
                for (var j = 0; j < myToken.length.length; j++) { 
                    lln[j] = ""+myToken.length[j]
                }
                this.onAddNumberToken("#",window.TYPE_NUMBERS, myToken.token, !(myToken.is_required==='true'), 
                    myToken.is_in_output==='true', myToken.match_all_forms === 'true', myToken.contain_digit === 'true', lln[0], lln[1], lln[2],
                    myToken.minimum, myToken.maximum, myToken.is_out_of_vocabulary === 'true', myToken.is_in_vocabulary === 'true', (myarr.indexOf(window.POS_noun) > -1), (myarr.indexOf(window.POS_pronoun) > -1), (myarr.indexOf(window.POS_punctuation) > -1),
                    (myarr.indexOf(window.POS_propernoun) > -1), (myarr.indexOf(window.POS_determiner) > -1), (myarr.indexOf(window.POS_symbol) > -1), (myarr.indexOf(window.POS_adjective) > -1), (myarr.indexOf(window.POS_conjunction) > -1),(myarr.indexOf(window.POS_verb) > -1),  
                    (myarr.indexOf("prepost_position") > -1), (myarr.indexOf(window.POS_adverb) > -1), (myarr.indexOf(window.POS_particle) > -1), (myarr.indexOf(window.POS_interjection) > -1), (myarr1.indexOf("exact") > -1),(myarr1.indexOf("lower") > -1), (myarr1.indexOf("upper") > -1),
                    (myarr1.indexOf("title") > -1), (myarr1.indexOf("mixed") > -1), myToken.numbers, window.CREATEDBY_SERVER);            
            }
            else if (myToken.type === window.TYPE_PUNCTUATION)
            {
                this.onAddPunctuationToken("P", window.TYPE_PUNCTUATION, myToken.token, !(myToken.is_required==='true'), 
                    myToken.is_in_output==='true',window.CREATEDBY_SERVER); 
            }
            else if( myToken.type === window.TYPE_SHAPE)
            {
                this.onAddShapeToken("S",window.TYPE_SHAPE, myToken.token, !(myToken.is_required==='true'), 
                    myToken.is_in_output==='true', myToken.match_all_forms === 'true', myToken.contain_digit === 'true', 0, 0, 0,
                    myToken.prefix, myToken.suffix, myToken.is_out_of_vocabulary === 'true', myToken.is_in_vocabulary === 'true', (myarr.indexOf(window.POS_noun) > -1), (myarr.indexOf(window.POS_pronoun) > -1), (myarr.indexOf(window.POS_punctuation) > -1),
                    (myarr.indexOf(window.POS_propernoun) > -1), (myarr.indexOf(window.POS_determiner) > -1), (myarr.indexOf(window.POS_symbol) > -1), (myarr.indexOf(window.POS_adjective) > -1), (myarr.indexOf(window.POS_conjunction) > -1),(myarr.indexOf(window.POS_verb) > -1),  
                    (myarr.indexOf("prepost_position") > -1), (myarr.indexOf(window.POS_adverb) > -1), (myarr.indexOf(window.POS_particle) > -1), (myarr.indexOf(window.POS_interjection) > -1), (myarr1.indexOf("exact") > -1),(myarr1.indexOf("lower") > -1), (myarr1.indexOf("upper") > -1),
                    (myarr1.indexOf("title") > -1), (myarr1.indexOf("mixed") > -1), myToken.numbers,myToken.shapes, window.CREATEDBY_SERVER);            
            }
            else if (myToken.type === window.TYPE_LINEBREAK)
            {
                this.onAddLinebreakToken("LB",window.TYPE_LINEBREAK, myToken.token, !(myToken.is_required==='true'), 
                    myToken.is_in_output==='true', myToken.match_all_forms === 'true', myToken.contain_digit === 'true', myToken.length[0], 0, 0,
                    myToken.minimum, myToken.maximum, myToken.is_out_of_vocabulary === 'true', myToken.is_in_vocabulary === 'true', (myarr.indexOf(window.POS_noun) > -1), (myarr.indexOf(window.POS_pronoun) > -1), (myarr.indexOf(window.POS_punctuation) > -1),
                    (myarr.indexOf(window.POS_propernoun) > -1), (myarr.indexOf(window.POS_determiner) > -1), (myarr.indexOf(window.POS_symbol) > -1), (myarr.indexOf(window.POS_adjective) > -1), (myarr.indexOf(window.POS_conjunction) > -1),(myarr.indexOf(window.POS_verb) > -1),  
                    (myarr.indexOf("prepost_position") > -1), (myarr.indexOf(window.POS_adverb) > -1), (myarr.indexOf(window.POS_particle) > -1), (myarr.indexOf(window.POS_interjection) > -1), (myarr1.indexOf("exact") > -1),(myarr1.indexOf("lower") > -1), (myarr1.indexOf("upper") > -1),
                    (myarr1.indexOf("title") > -1), (myarr1.indexOf("mixed") > -1), myToken.numbers, window.CREATEDBY_SERVER);            
            }
            else if (myToken.type === window.TYPE_ENTITY)
            {
                this.onAddEntityToken("E",window.TYPE_ENTITY, myToken.token, !(myToken.is_required==='true'), 
                    myToken.is_in_output==='true', myToken.match_all_forms === 'true', myToken.contain_digit === 'true', 0, 0, 0,
                    myToken.minimum, myToken.maximum, myToken.is_out_of_vocabulary === 'true', myToken.is_in_vocabulary === 'true', (myarr.indexOf(window.POS_noun) > -1), (myarr.indexOf(window.POS_pronoun) > -1), (myarr.indexOf(window.POS_punctuation) > -1),
                    (myarr.indexOf(window.POS_propernoun) > -1), (myarr.indexOf(window.POS_determiner) > -1), (myarr.indexOf(window.POS_symbol) > -1), (myarr.indexOf(window.POS_adjective) > -1), (myarr.indexOf(window.POS_conjunction) > -1),(myarr.indexOf(window.POS_verb) > -1),  
                    (myarr.indexOf("prepost_position") > -1), (myarr.indexOf(window.POS_adverb) > -1), (myarr.indexOf(window.POS_particle) > -1), (myarr.indexOf(window.POS_interjection) > -1), (myarr1.indexOf("exact") > -1),(myarr1.indexOf("lower") > -1), (myarr1.indexOf("upper") > -1),
                    (myarr1.indexOf("title") > -1), (myarr1.indexOf("mixed") > -1), myToken.numbers, window.CREATEDBY_SERVER);            
            }
            
        }
    }

    /*
    This method is a callback from the tokenwrapper to edit a particular token at an index. 
    */
    onEditToken(index)
    {
        let dataIndex = Math.round((index-1)/2); 
        console.log("OnEditToken index = " + index + " data index = " + dataIndex);
        console.log("What kind of token is this " + this.state.allTokenData[dataIndex].type); 

        if(this.state.allTokenData[dataIndex].type === window.TYPE_WORD)
        {
            console.log("Tokens are = " + this.state.allTokenData[dataIndex].token); 
            this.toggleWordConfigDialog(); 
            this.setState({
                isModifyWord:true,
                tokenModifyIndex: dataIndex
            })
        }
        else if(this.state.allTokenData[dataIndex].type === window.TYPE_PUNCTUATION)
        {
            console.log("Tokens are = " + this.state.allTokenData[dataIndex].token); 
            this.togglePunctuationConfigDialog(); 
            this.setState({
                isModifyPunctuation:true,
                tokenModifyIndex: dataIndex
            }); 
        }
        else if(this.state.allTokenData[dataIndex].type === window.TYPE_NUMBERS)
        {
            console.log("Tokens are = " + this.state.allTokenData[dataIndex].numbers); 
            this.toggleNumberConfigDialog(); 
            this.setState({
                isModifyNumbers:true,
                tokenModifyIndex: dataIndex
            }); 
        }
        else if(this.state.allTokenData[dataIndex].type === window.TYPE_SHAPE)
        {
            console.log("Tokens are = " + this.state.allTokenData[dataIndex].shapes); 
            this.toggleShapeConfigDialog(); 
            this.setState({
                isModifyShape:true,
                tokenModifyIndex: dataIndex
            }); 
        }
        else if(this.state.allTokenData[dataIndex].type === window.TYPE_LINEBREAK)
        {
            this.toggleLinebreakConfigDialog(); 
            this.setState({
                isModifyLinebreak:true,
                tokenModifyIndex: dataIndex
            }); 
        }
        else if(this.state.allTokenData[dataIndex].type === window.TYPE_ENTITY)
        {
            this.toggleEntityConfigDialog(); 
            this.setState({
                isModifyEntity:true,
                tokenModifyIndex: dataIndex
            }); 
        }
    }


    /*  
    This method is used to format our data so that it look like the JSON 
    that the webservice is expecting. 
    */
    createWordJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1)
    {
        var myCapitalization = [];
        if(exact1) myCapitalization.push("exact"); 
        if(lower1) myCapitalization.push("lower"); 
        if(upper1) myCapitalization.push("upper"); 
        if(mixed1) myCapitalization.push("mixed");
        if(title1) myCapitalization.push("title");
        
        var mypartOfSpeech = []; 
        if(noun1) mypartOfSpeech.push(window.POS_noun);
        if(pronoun1) mypartOfSpeech.push(window.POS_pronoun);
        if(propernoun1) mypartOfSpeech.push(window.POS_propernoun);        
        if(determiner1) mypartOfSpeech.push(window.POS_determiner);
        if(symbol1) mypartOfSpeech.push(window.POS_symbol);
        if(adjective1) mypartOfSpeech.push(window.POS_adjective);
        if(conjunction1) mypartOfSpeech.push(window.POS_conjunction);
        if(verb1) mypartOfSpeech.push(window.POS_verb);
        if(prepost_position1) mypartOfSpeech.push(window.POS_pre_post_position);
        if(adverb1) mypartOfSpeech.push(window.POS_adverb);
        if(particle1) mypartOfSpeech.push(window.POS_particle);
        if(interjection1) mypartOfSpeech.push(window.POS_interjection);

        var myLength=[]; 
        if(length11>0) myLength.push(length11); 
        if(length21>0) myLength.push(length21); 
        if(length31>0) myLength.push(length31);     

        var myNumbers= [];
        var myShape= [];  

        var tokenData=
        {
            prefix: prefix1,
            suffix: suffix1,
            capitalization:  myCapitalization, 
            part_of_speech: mypartOfSpeech, 
            length: myLength,
            maximum:"",
            minimum:"", 
            shapes: myShape,
            token: allwords1,
            numbers: myNumbers,
            is_in_vocabulary: invocabulary1,
            is_out_of_vocabulary: notinvocabulary1,
            is_required: !optional1, 
            type: type1, 
            is_in_output: part_of_output1,
            match_all_forms: match_all_forms1,
            contain_digit: contain_digit1        
        }; 

        return tokenData; 
    }


    /*
    Method: Add a token to an array. 
    Arguments: 
    NewToken: a word, shape, punctionation token 
    */
    onAddWordToken(tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
        prefix1, suffix1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1, createdby) 
    {
        console.log("Rule: Enter onAddWordToken word="+allwords1); 

        //Let's close the token modal dialog box. 
        if(createdby === window.CREATEDBY_USER)
            this.toggleWordConfigDialog();

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createWordJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1
        )
        this.ProcessAllNewTokens(newJSONTokenData, tokenAbbreviation1, createdby); 
    }  



    processAllEditedTokens(index, newJSONTokenData, tokenAbbreviation1, createdby)
    {
        var tokenid = TOKEN_BASE+(++GLOBAL_ID); 
        //Get the state token array. 
        var myTokenData = this.state.allTokenData; 

        //Add the new token to the array of tokens. 
        myTokenData.splice(index, 1, newJSONTokenData); 


        //Let's update the state with our new map data. 
        this.setState({
            allTokenData: myTokenData
        });

        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. */
        this.props.onProcessJSONData(this.state.id, myTokenData, 
                    this.state.identifier, this.state.description, this.state.polarity, 
                    this.state.is_active, this.state.output_format, createdby ); 

        //console.log("Here is  my JSON = " + JSON.stringify(this.state.allTokenData)); 

        /*Now lets create a new token that we are doing to display in the GUI. 
        */
        var myTokens = this.state.array; 

        const newToken = <Token id={tokenid} clickable="0" tokenAbbreviation={tokenAbbreviation1}
            tokenPatternData={newJSONTokenData} deleteToken={this.deleteToken} />

        myTokens.splice(((2*index)+1),1,newToken); 
        /*We always need a plus token between regular token*/
        /*Let's update the token array in the state that way it re-renders the rules.*/
        this.setState(prevState =>
            ({
                array: myTokens
            }));

    }

    /*
    Method: Modify a word token
    */
    onModifyWordToken(index, tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
        prefix1, suffix1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1, createdby) 
    {
        console.log("Rule: Enter onModifyWordToken word="+allwords1); 

        //Let's close the token modal dialog box. 
        if(createdby === window.CREATEDBY_USER)
            this.toggleWordConfigDialog();

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createWordJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1
        )

        this.processAllEditedTokens(index, newJSONTokenData, tokenAbbreviation1, createdby); 

    }      

        /*  
    This method is used to format our data so that it look like the JSON 
    that the webservice is expecting. 
    */
    createShapeJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1, shapes)
    {
        console.log("createShapeJSON"); 

        var myCapitalization = [];
        if(exact1) myCapitalization.push("exact"); 
        if(lower1) myCapitalization.push("lower"); 
        if(upper1) myCapitalization.push("upper"); 
        if(mixed1) myCapitalization.push("mixed");
        if(title1) myCapitalization.push("title");
        

        var mypartOfSpeech = []; 
        if(noun1) mypartOfSpeech.push(window.POS_noun);
        if(pronoun1) mypartOfSpeech.push(window.POS_pronoun);
        if(propernoun1) mypartOfSpeech.push(window.POS_propernoun);        
        if(determiner1) mypartOfSpeech.push(window.POS_determiner);
        if(symbol1) mypartOfSpeech.push(window.POS_symbol);
        if(adjective1) mypartOfSpeech.push(window.POS_adjective);
        if(conjunction1) mypartOfSpeech.push(window.POS_conjunction);
        if(verb1) mypartOfSpeech.push(window.POS_verb);
        if(prepost_position1) mypartOfSpeech.push(window.POS_pre_post_position);
        if(adverb1) mypartOfSpeech.push(window.POS_adverb);
        if(particle1) mypartOfSpeech.push(window.POS_particle);
        if(interjection1) mypartOfSpeech.push(window.POS_interjection);

        var myLength=[]; 
        if(length11>0) myLength.push(length11); 
        if(length21>0) myLength.push(length21); 
        if(length31>0) myLength.push(length31);     

        var tokenData=
        {
            prefix: prefix1,
            suffix: suffix1,
            capitalization:  myCapitalization, 
            part_of_speech: mypartOfSpeech, 
            length: myLength,
            maximum:"",
            minimum:"", 
            shapes: shapes,
            token: [],
            numbers: [],
            is_in_vocabulary: invocabulary1,
            is_out_of_vocabulary: notinvocabulary1,
            is_required: !optional1, 
            type: type1, 
            is_in_output: part_of_output1,
            match_all_forms: match_all_forms1,
            contain_digit: contain_digit1        
        }; 
        return tokenData; 
    }

    /*
    Method: Add a token to an array. 
    Arguments: 
    NewToken: a word, shape, punctionation token 
    */
    onAddShapeToken(tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
        prefix1, suffix1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1,  shapes1, createdby) 
    {
        console.log("Rule: Enter onAddShapeToken shapes = "+shapes1); 

        //Let's close the token modal dialog box. 
        if(createdby === window.CREATEDBY_USER)
            this.toggleShapeConfigDialog();

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createShapeJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1, shapes1
        )
        this.ProcessAllNewTokens(newJSONTokenData, tokenAbbreviation1, createdby); 
    }


    ProcessAllNewTokens(newJSONTokenData, tokenAbbreviation1, createdby)
    {
        //Keep track of the token with a generated token id. 
        var tokenid = TOKEN_BASE+(++GLOBAL_ID); 
        //Get the state token array. 
        var myTokenData = this.state.allTokenData; 

        //Add the new token to the array of tokens. 
        if(this.state.newToken2AddIndex!== -1)
        {
            myTokenData.splice(this.state.newToken2AddIndex/2, 0, newJSONTokenData); 
        }
        else
        {
            myTokenData.push(newJSONTokenData); 
           
        }


        this.setState({
            allTokenData: myTokenData,
            createdby: createdby
        });

        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. */

        /*Now lets create a new token that we are doing to display in the GUI. 
        */
        var myTokens = this.state.array; 

        const newToken = <Token id={tokenid} clickable="0" tokenAbbreviation={tokenAbbreviation1}
            tokenPatternData={newJSONTokenData} deleteToken={this.deleteToken} />

        /*We always need a plus token between regular token*/
        const btt = <PlusToken id={PTOKEN_BASE + (++GLOBAL_ID)} />;

        if(this.state.newToken2AddIndex!== -1)
        {
            myTokens.splice(this.state.newToken2AddIndex+1,0,newToken, btt); 
        }
        else
        {
            myTokens.push(newToken)
            myTokens.push(btt);   
        }

        /*Let's update the token array in the state that way it re-renders the rules.*/
       this.setState(
            {
                array: myTokens
            });

        this.sendData2App = true; 

    }  


    componentDidUpdate(prevProps, prevState)
    {
        if(this.sendData2App)
        {
            this.sendData2App = false; 
            console.log("Rule->componentDidUpdate..."); 
            this.props.onProcessJSONData(this.state.id, this.state.allTokenData, 
                    this.state.identifier, this.state.description, this.state.polarity, 
                    this.state.is_active, this.state.output_format,this.state.createdby );        
        }
    }


    onModifyShapeToken(index, tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
        prefix1, suffix1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1, shapes1, createdby) 
    {
        console.log("Rule: Enter onModifyShapeToken word="+allwords1); 

        //alert("addNewToken + id" + this.state.id);
        //Let's close the token modal dialog box. 
        if(createdby === window.CREATEDBY_USER)
            this.toggleShapeConfigDialog();

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createShapeJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1, shapes1
        )

        this.processAllEditedTokens(index, newJSONTokenData, tokenAbbreviation1, createdby); 
    }      


    onModifyNumberToken(index, tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
        minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1, createdby) 
    {
        console.log("Rule: Enter onModifyNumberToken"); 


        if(createdby === window.CREATEDBY_USER)
            this.toggleNumberConfigDialog(); 

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createNumberJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1
        )

        this.processAllEditedTokens(index, newJSONTokenData, tokenAbbreviation1, createdby); 
    }

    onModifyEntityToken(index, tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
        minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1, createdby) 
    {
        console.log("Rule: Enter onModifyEntityToken"); 


        if(createdby === window.CREATEDBY_USER)
            this.toggleEntityConfigDialog(); 

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createEntityJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1
        )

        this.processAllEditedTokens(index, newJSONTokenData, tokenAbbreviation1, createdby); 
    }

    onModifyLinebreakToken(index, tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
        minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1, createdby) 
    {
        console.log("Rule: Enter onModifyLinebreakToken"); 


        if(createdby === window.CREATEDBY_USER)
            this.toggleLinebreakConfigDialog(); 

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createLinebreakJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1
        )

        this.processAllEditedTokens(index, newJSONTokenData, tokenAbbreviation1, createdby); 
    }

    onAddNumberToken(tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
        minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1, createdby) 
    {
        console.log("Rule: Enter onAddNumberToken"); 
        if(createdby === window.CREATEDBY_USER)
            this.toggleNumberConfigDialog(); 

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createNumberJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1
        )
        this.ProcessAllNewTokens(newJSONTokenData, tokenAbbreviation1, createdby); 

    }

    onAddEntityToken(tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
        minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1, createdby) 
    {
        console.log("Rule: Enter onAddEntityToken"); 
        if(createdby === window.CREATEDBY_USER)
            this.toggleEntityConfigDialog(); 

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createEntityJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1
        )
        this.ProcessAllNewTokens(newJSONTokenData, tokenAbbreviation1, createdby); 

    }

    onAddLinebreakToken(tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
        minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1, createdby) 
    {
        console.log("Rule: Enter onAddLinebreakToken"); 
        if(createdby === window.CREATEDBY_USER)
            this.toggleLinebreakConfigDialog(); 

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createLinebreakJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1
        )

        this.ProcessAllNewTokens(newJSONTokenData, tokenAbbreviation1, createdby); 

    }

    /*
    Method: Modify a punctuation token
    */    
    onModifyPunctuationToken(index, tokenAbbreviation1, type1,allPunctuations,optional1,
        part_of_output1, createdby) 
    {
        console.log("Rule: Enter onModifyPunctuationToken"); 
        if(createdby === window.CREATEDBY_USER)
            this.togglePunctuationConfigDialog(); 

        var newJSONTokenData = this.createPunctuationJSON(tokenAbbreviation1,type1, allPunctuations, optional1, 
            part_of_output1);    
            
        this.processAllEditedTokens(index, newJSONTokenData, tokenAbbreviation1, createdby); 
    }

    //Method: Add a token to an array. 
    onAddPunctuationToken(tokenAbbreviation1, type1,allPunctuations,optional1,
        part_of_output1, createdby) 
    {
        console.log("Rule: Enter onAddPunctuationToken"); 
        
        if(createdby === window.CREATEDBY_USER)
            this.togglePunctuationConfigDialog(); 

        var newJSONTokenData = this.createPunctuationJSON(tokenAbbreviation1,type1, allPunctuations, optional1, 
            part_of_output1);    
                
        this.ProcessAllNewTokens(newJSONTokenData, tokenAbbreviation1, createdby); 

    }

    //build the JSON.
    createPunctuationJSON(tokenAbbreviation1,type1, allPunctuations, optional1, 
            part_of_output1)
    {
        console.log("createPunctuationJSON"); 

        var myCapitalization = [];

        var mypartOfSpeech = []; 

        var myLength=[];    

        var myShape= []; 

        var tokenData=
        {
            prefix: "",
            suffix: "",
            capitalization:  myCapitalization, 
            part_of_speech: mypartOfSpeech, 
            length: myLength,
            maximum:"",
            minimum:"", 
            shapes: myShape,
            token: allPunctuations,
            numbers: [],
            is_in_vocabulary: "",
            is_out_of_vocabulary: "",
            is_required: !optional1, 
            type: type1, 
            is_in_output: part_of_output1,
            match_all_forms: "",
            contain_digit: ""    
        }; 

        return tokenData; 
    }

     
    //This method is used to format our data so that it look like the JSON 
    //that the webservice is expecting. 
    createNumberJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1)
    {

        console.log("createNumberJSON"); 
        var myCapitalization = [];

        var mypartOfSpeech = []; 

        var myLength=[]; 
        if(length11>0) myLength.push(length11); 
        if(length21>0) myLength.push(length21); 
        if(length31>0) myLength.push(length31);     

        var myShape= [];  

        var tokenData=
        {
            prefix: "",
            suffix: "",
            capitalization:  myCapitalization, 
            part_of_speech: mypartOfSpeech, 
            length: myLength,
            maximum:maximum1,
            minimum:minimum1, 
            shape: myShape,
            token: [],
            numbers: numbers1,
            is_in_vocabulary: invocabulary1,
            is_out_of_vocabulary: notinvocabulary1,
            is_required: !optional1, 
            type: type1, 
            is_in_output: part_of_output1,
            match_all_forms: match_all_forms1,
            contain_digit: contain_digit1   
        }; 

        return tokenData; 
    }

    createEntityJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1)
    {

        console.log("createEntityJSON"); 
        console.log("dadaddwd", numbers1)
        var myCapitalization = [];

        var mypartOfSpeech = []; 

        var myLength=[]; 
        if(length11>0) myLength.push(length11); 
        if(length21>0) myLength.push(length21); 
        if(length31>0) myLength.push(length31);     

        var myShape= [];  

        var tokenData=
        {
            prefix: "",
            suffix: "",
            capitalization:  myCapitalization, 
            part_of_speech: mypartOfSpeech, 
            length: myLength,
            maximum:maximum1,
            minimum:minimum1, 
            shape: myShape,
            token: [],
            numbers: numbers1,
            is_in_vocabulary: invocabulary1,
            is_out_of_vocabulary: notinvocabulary1,
            is_required: !optional1, 
            type: type1, 
            is_in_output: part_of_output1,
            match_all_forms: match_all_forms1,
            contain_digit: contain_digit1   
        }; 

        return tokenData; 
    }

    createLinebreakJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, match_all_forms1, contain_digit1, length11, length21, length31,
            minimum1, maximum1, notinvocabulary1, invocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1)
    {

        console.log("createLinebreakJSON"); 

        var myCapitalization = [];

        var mypartOfSpeech = []; 

        var myLength=[]; 
        if(length11>0) myLength.push(length11); 
        if(length21>0) myLength.push(length21); 
        if(length31>0) myLength.push(length31);     

        var myShape= [];  

        var tokenData=
        {
            prefix: "",
            suffix: "",
            capitalization:  myCapitalization, 
            part_of_speech: mypartOfSpeech, 
            length: myLength,
            maximum:maximum1,
            minimum:minimum1, 
            shape: myShape,
            token: [],
            numbers: numbers1,
            is_in_vocabulary: "",
            is_out_of_vocabulary: "",
            is_required: !optional1, 
            type: type1, 
            is_in_output: part_of_output1,
            match_all_forms: "",
            contain_digit: ""   
        }; 

        return tokenData; 
    }

    showNumberTokenDialog()
    {
        const tMenu = "tokenMenu" + this.state.id; 
        
        /*lets close the menu*/
        var x = document.getElementById(tMenu);
        x.style.display = 'none';
        this.toggleNumberConfigDialog();       
    }

    showEntityTokenDialog()
    {
        const tMenu = "tokenMenu" + this.state.id; 
        
        /*lets close the menu*/
        var x = document.getElementById(tMenu);
        x.style.display = 'none';
        this.toggleEntityConfigDialog();       
    }

    showLinebreakTokenDialog()
    {
        const tMenu = "tokenMenu" + this.state.id; 
        
        /*lets close the menu*/
        var x = document.getElementById(tMenu);
        x.style.display = 'none';
        this.toggleLinebreakConfigDialog();       
    }

    showPunctuationTokenDialog()
    {
        const tMenu = "tokenMenu" + this.state.id; 
        
        /*lets close the menu*/
        var x = document.getElementById(tMenu);
        x.style.display = 'none';
        this.togglePunctuationConfigDialog(); 
    }


    /*
    Show Word token editor
    */
    showWordTokenDialog()
    {
        const tMenu = "tokenMenu" + this.state.id; 
        
        /*lets close the menu*/
        var x = document.getElementById(tMenu);
        x.style.display = 'none';
        this.toggleWordConfigDialog();
    }

    showShapeTokenDialog()
    {
        const tMenu = "tokenMenu" + this.state.id; 
        
        /*lets close the menu*/
        var x = document.getElementById(tMenu);
        x.style.display = 'none';
        this.toggleShapeConfigDialog();
    }    

    
    deleteToken(index)
    {
        let dataIndex = Math.round((index-1)/2); 
        console.log("deleteToken index = " + index + " data index = " + dataIndex);

        //Get the state token array. 
        var myTokenData = this.state.allTokenData; 

        //Add the new token to the array of tokens. 
        myTokenData.splice(dataIndex, 1); 
        this.setState(
            {
                allTokenData: myTokenData
            }
        )

        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. 
        NOTE: For the value that I am changing in this method, I use the stack value not 
        the state value because the state value is not updated until after rendering. 
        so in this case I am passing myTokenData which is a local value. 
        */
        this.props.onProcessJSONData(this.state.id, myTokenData, 
                this.state.identifier, this.state.description, this.state.polarity, 
                this.state.is_active, this.state.output_format, window.CREATEDBY_USER ); 
        

        var myTokens = this.state.array; 

        myTokens.splice(index,2); 

        this.setState(prevState =>
            ({
                array: myTokens
            }));

    }        

    onClickPlusToken(index)
    {
        console.log("Rule->onClickPlusToken....index = " + index); 
        /* Let's determine when to show/close the menu when the 
        plus token is clicked. 
        */
        //reset some variable. 
        this.setState({
            newToken2AddIndex: index
        })

        const tMenu = "tokenMenu" + this.state.id; 

        var x = document.getElementById(tMenu);
        if (x.style.display === 'none' || x.style.display === '') 
        {
            x.style.display = 'block';
        } else 
        {
            x.style.display = 'none';
        }        

    }

    handleChange_outformat(event)
    {
        console.log("Rule: Enter handleChange_outformat name = "+ event.target.name + " value = " + event.target.value); 
        this.setState({
        [event.target.name]: event.target.value
        });  
        console.log("Rule: new state output format = " + this.state.description); 
    
    }

    handleChange_description(event)
    {
        console.log("Rule: Enter handleChange_description name = "+ event.target.name + " value = " + event.target.value); 
        var myDescr = event.target.value;      
        this.setState({
           description: myDescr
        });   

        console.log("Rule: new state description = " + this.state.description); 
    }

    /*lets update the webservice when the mouse is moved from description and output format inputs*/
    handle_onBlur(event)
    {
        console.log("handle_onBlur"); 
        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. */
        this.props.onProcessJSONData(this.state.id, this.state.allTokenData, 
                this.state.identifier, this.state.description, this.state.polarity, 
                this.state.is_active, this.state.output_format, window.CREATEDBY_USER );  
    }

    updateActiveRule(event)
    {
        console.log("Rule->updateActiveRule toggling rule active = " + event.target.checked ) ; 

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log("===", name, value)

        this.setState({
            [name]: value
        });     

        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. */
        this.props.onProcessJSONData(this.state.id, this.state.allTokenData, 
                this.state.identifier, this.state.description, this.state.polarity, 
                value, this.state.output_format, window.CREATEDBY_USER );       
    }

    componentDidMount()
    {
        if(this.state.createdby === window.CREATEDBY_SERVER)
        {
            console.log("RUle->componentDidMount updating information that came from server"); 
            this.props.onProcessJSONData(this.state.id, this.state.allTokenData, 
                this.state.identifier, this.state.description, this.state.polarity, 
                this.state.is_active, this.state.output_format, window.CREATEDBY_SERVER );            
        }
    }

    deleteRule()
    {
        console.log("Rule->deleteRule....."); 
        this.props.onDeleteRule(this.props.index); 
    }

    duplicate()
    {
        console.log("Rule->deleteRule....."); 
        this.props.onDuplicateRule(this.props.index); 
    }

    render() 
	{
        const tMenu = "tokenMenu" + this.state.id; 
        var msg_output_format = this.state.output_format; 
        var msg_description = this.state.description; 
        
        return (
            <section>
                <div className="rulewrapper">
                
                    <WordTokenConfig show={this.state.isWordDialogOpen}
                        onAddNewToken={this.onAddWordToken} ruleid={this.state.id}
                        onCloseConfigDialog={this.toggleWordConfigDialog}
                        modify={this.state.isModifyWord} tokenModifyIndex={this.state.tokenModifyIndex}
                        tokenData={this.state.allTokenData[this.state.tokenModifyIndex]}
                        onModifyWordToken={this.onModifyWordToken}>
                    </WordTokenConfig>

                    <PunctuationTokenConfig show={this.state.isPunctuationDialogOpen}
                            onAddNewToken={this.onAddPunctuationToken} ruleid={this.state.id}
                            onCloseConfigDialog={this.togglePunctuationConfigDialog}
                            modify={this.state.isModifyPunctuation} tokenModifyIndex={this.state.tokenModifyIndex}
                            tokenData={this.state.allTokenData[this.state.tokenModifyIndex]}
                        onModifyPunctuationToken={this.onModifyPunctuationToken}
                            >
                    </PunctuationTokenConfig>

                    <NumberTokenConfig show={this.state.isNumberDialogOpen}
                        onAddNumberToken={this.onAddNumberToken} ruleid={this.state.id}
                        onCloseConfigDialog={this.toggleNumberConfigDialog}
                        modify={this.state.isModifyNumbers} tokenModifyIndex={this.state.tokenModifyIndex}
                        tokenData={this.state.allTokenData[this.state.tokenModifyIndex]}
                        onModifyNumberToken={this.onModifyNumberToken}
                         >
                    </NumberTokenConfig>

                    <EntityTokenConfig show={this.state.isEntityDialogOpen}
                        onAddEntityToken={this.onAddEntityToken} ruleid={this.state.id}
                        onCloseConfigDialog={this.toggleEntityConfigDialog}
                        modify={this.state.isModifyEntity} tokenModifyIndex={this.state.tokenModifyIndex}
                        tokenData={this.state.allTokenData[this.state.tokenModifyIndex]}
                        onModifyEntityToken={this.onModifyEntityToken}
                        allfields = {this.props.allfields}
                         >
                    </EntityTokenConfig>

                    <LinebreakTokenConfig show={this.state.isLinebreakDialogOpen}
                        onAddLinebreakToken={this.onAddLinebreakToken} ruleid={this.state.id}
                        onCloseConfigDialog={this.toggleLinebreakConfigDialog}
                        modify={this.state.isModifyLinebreak} tokenModifyIndex={this.state.tokenModifyIndex}
                        tokenData={this.state.allTokenData[this.state.tokenModifyIndex]}
                        onModifyLinebreakToken={this.onModifyLinebreakToken}
                         >
                    </LinebreakTokenConfig>

                    <ShapeTokenConfig show={this.state.isShapeDialogOpen}
                        onAddNewToken={this.onAddShapeToken} ruleid={this.state.id}
                        onCloseConfigDialog={this.toggleShapeConfigDialog}
                        modify={this.state.isModifyShape} tokenModifyIndex={this.state.tokenModifyIndex}
                        tokenData={this.state.allTokenData[this.state.tokenModifyIndex]}
                        onModifyToken={this.onModifyShapeToken}>

                    </ShapeTokenConfig>

                    <div className="ruleHeader">
                        <label htmlFor={this.props.name}> {this.props.rulenum}.  </label>
                        <input
                        name="description"
                        placeholder= "Enter rule description "
                        type="text"
                        className="ruleDescription"
                        value={msg_description}
                        onChange={this.handleChange_description}
                        onBlur={this.handle_onBlur}/>

                    </div>

                     <div  >
                        <div id={tMenu} className="tokenMenu" >
                            <div onClick={this.showWordTokenDialog} className="tokenMenu_item"> Word </div>
                            <div onClick={this.showNumberTokenDialog} className="tokenMenu_item">Number </div> 
                            <div onClick={this.showPunctuationTokenDialog} className="tokenMenu_item">  Punctuation </div>
                            <div onClick={this.showShapeTokenDialog} className="tokenMenu_item"> Shape </div>
                            <div onClick={this.showLinebreakTokenDialog} className="tokenMenu_item"> Linebreak </div>
                            {/*<div onClick={this.showEntityTokenDialog} className="tokenMenu_item"> Entity </div>*/}
                        </div>   

                        <div className="arrangeRuleTokens"> 

                            <div className="arrangeEachToken"> 
                            <div  className="ruleCheckBox">
                            <input type="checkbox" defaultChecked={this.state.is_active}  name="is_active"   onChange={this.updateActiveRule}/> 
                            </div>
                            <div>
                         <button className="deletebutton" onClick={this.deleteRule}> X </button>

                            </div> 
                            </div>
                            {/*this.state.array.map((token, index) => (
                                <div className="arrangeEachToken">  {token}   </div>
                            ))*/}  
                            {this.state.array.map((token, index) => (
                               <div className="arrangeEachToken"  key={index}> <TokenWrapper data={token} index={index} key={index} onEditToken={this.onEditToken} onDeleteToken={this.deleteToken} onClickPlusToken={this.onClickPlusToken}/> </div>
                            ))}  

                        </div>

                    </div> 

        
                    <div id="ruleOutput"> 
                        Output format: 
                        <input
                        name="output_format"
                        placeholder= "e.g., {1}-{2}-{3} "
                        type="text"
                        className="output_format"
                        value={msg_output_format}
                        onChange={this.handleChange_outformat}
                        onBlur={this.handle_onBlur}
                        size="20"
                        />
                    </div> 
                    
                </div>
            </section>    
    );   
  }
}


export default Rule;