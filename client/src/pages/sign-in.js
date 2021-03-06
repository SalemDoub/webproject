import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import auth from "../components/auth";
import axios from 'axios';
import Snackbar from "../components/snackbar";
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            padding:"50px",
            margin: "50px",
            backgroundColor: theme.palette.common.white,
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            username:'',
            password:'',
            errors:[],
        };
    };

    classes(){ //INFO Example of material-ui classes inside class component
        useStyles()
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }
    handleClick(e){
        e.preventDefault();
        console.log("submitted");
        const entry = {username:this.state.username.toLowerCase(), password:this.state.password.toLowerCase()};
        this.setState({
            username: '',
            password: '',
        });
        axios('/api/login', {
            method: "post",
            data: entry,
            withCredentials: true
        }).then( res => {
                // console.log(res.data);
                if (res.data.confirmation==="success"){ //token is in cookie now
                    auth.login(res.data.userId,() => {
                        this.props.history.push("/")
                    })
                } else if(res.data.warning) { //if token not found in db
                    let errors=this.state.errors.slice()
                    errors.push({message:res.data.warning,messageType:"warning"})
                    this.setState({errors})

                } else if (res.data.error){
                    let errors=this.state.errors.slice()
                    errors.push({message:res.data.error,messageType:"error"})
                    this.setState({errors})
                }
            })
            .catch( err => {throw err});

        // window.location = '/';

    };
    componentDidMount(){
        console.log("history",this.props.history.location)
        if (this.props.history.location.state && this.props.history.location.state.confirmation==="success"){
            let errors=this.state.errors.slice()
            errors.push({message:this.props.history.location.state.message,messageType:"success"})
            this.setState({errors})
            window.history.replaceState(null, null, "/"); //Empty history state from confirmation and message
        }
    }
    render(){
        return (
            <Container component="main" maxWidth="xs" style={{marginTop:"60px", padding:"0px"}}>
                <CssBaseline />
                <div className={this.classes.paper} >
                    <Typography component="h1" variant={"h1"} color={"primary"} align={"center"}>
                        Pictionary
                    </Typography>
                    <br/>
                    {this.state.errors.map(({message,messageType})=> <Snackbar messageType={messageType} message={message} />
                    )}

                    {/*<Snackbar messageType={"error"} message={"Wrong Email Address or Password."}/>*/}
                    <form className={this.classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.classes.submit}
                            onClick={this.handleClick}
                        >
                            Sign In
                        </Button>
                        <Grid container justify={"flex-end"} style={{marginTop:"5px"}}>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account ? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={6}>

                </Box>
            </Container>
        );
    }
}