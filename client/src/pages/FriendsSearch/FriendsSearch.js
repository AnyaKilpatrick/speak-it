import React, {Component} from "react";
import SearchResults from "./../../components/SearchResults";

import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import NavigationIcon from '@material-ui/icons/Navigation';
import Countries from "./../../countries.json";
import Select from '@material-ui/core/Select';
import API from "./../../utils/API";

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit
    },
    searchH1:{
        color:"red"
    },
    button: {
        margin: theme.spacing.unit,
    }
  });


class FriendsSearch extends Component {
    state={
        country: "",
        results:[],
        countries: Countries,
        resultavatar: null
    }
    handleChange = event => {
        this.setState({ country: event.target.value });
      };
    
    searchUsers = () => {
        this.loadAvatar();
        const country = this.state.country;
        API.findUsersByCountry(country)
            .then(res=>{
                console.log(res);
                this.setState({results: res.data});
            })
            .catch(err=>console.log(err))
    }

    loadAvatar = () => {
        const countries = this.state.countries;
        let countryCode;
        for(let c=0;c<countries.length;c++){
            if (countries[c].name === this.state.country){
              countryCode = countries[c].code;
            }
          }
          const src = "http://www.geonames.org/flags/x/"+countryCode.toLowerCase()+".gif"
        
          this.setState({resultAvatar: src})
    }

    sendFriendRequest = (event) => {
        const friendId = event.target.parentNode.id;
        console.log("id!!!!!!!!! ", event.target.parentNode.id);
        API.sendFriendRequest(event.target.parentNode.id)
        .then(res=> console.log(res))
        .catch(err=> console.log(err))
    }
        
    render(){
        const { classes } = this.props;
        return(
            <Grid container direction="row" spacing={40}>
                <Grid item lg={2}>
                    <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                        <Grid item lg={12} >
                        <h2 style={{marginLeft: 10,fontFamily: "'Cabin Sketch', cursive"}}>Search Friends</h2>
                        </Grid>
                        <Grid item lg={12}>
                        <FormControl className={classes.formControl} fullWidth>
                            {/* <Input role="combobox" id="name-simple" className={classes.searchInput} value={this.state.country} onChange={this.handleChange} fullWidth/> */}
                            {/* <InputLabel className={this.props.classes.selectLabel} fullWidth>Country</InputLabel> */}
                                <Select
                                fullWidth
                                native
                                onChange={this.handleChange}
                                name="country"
                                value={this.state.country}
                                // label="Country"
                                className={this.props.classes.searchInput}
                                // margin="normal"
                                // InputProps={inputStyles}
                                >
                                <option value="" />
                                {this.state.countries.map((option)=>
                                    <option value={option.name} key={option.code}>{option.name}</option>
                                )}/>
                                </Select>
                            <FormHelperText>search by country name</FormHelperText>
                        </FormControl>
                        <Button aria-label="delete" className={classes.button} onClick={this.searchUsers}>
                        <NavigationIcon className={classes.extendedIcon} />
                            Search
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={10} md={8} lg={8}>
                    <Grid container direction="column">
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                        {this.state.results.map((user, index) =>
                            <SearchResults
                            fullWidth
                            key={index}
                            sendFriendRequest={this.sendFriendRequest}
                            userLanguage={user.local.nativeLang}
                            userCountry={user.local.country}
                            userFullName={user.local.fullname}
                            userAbout={user.local.aboutUser}
                            resultAvatar={this.state.resultAvatar}
                            userBtnId = {user._id}
                            />
                            // <br/>
                        )}
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(FriendsSearch);