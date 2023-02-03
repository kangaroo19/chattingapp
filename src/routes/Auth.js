//처음 접속하면 볼 수 있는 로그인 화면

import * as React from 'react';
import { useState } from 'react';
import { getAuth,signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword, GithubAuthProvider } from "firebase/auth";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {faGoogle,faGithub} from "@fortawesome/free-brands-svg-icons";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Error from '../components/Error';
import { setDoc,doc } from 'firebase/firestore';
import { dbService } from '../firebase';
function Copyright(props) { //하단 부분

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createTheme();

export default function Auth() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [newAccount,setNewAccount]=useState(true) //true일때는 create acc, false 일때는 login
    const [error,setError]=useState("")
    const [open,setOpen]=useState(false)
    const onSocialClick=async(event)=>{ //구글,깃허브 로그인 버튼 클릭시 트리거
        const auth=getAuth() //
        const {target:{name}}=event
        let provider
        if(name==="google"){
            provider=new GoogleAuthProvider()
        }else if(name==="github"){
            provider=new GithubAuthProvider()
        }
        const data=await signInWithPopup(auth,provider)
                            .then(async (result)=>{
                                const {uid,displayName,photoURL}=result.user
                                await setDoc(doc(dbService,"users",`${uid}`),{
                                    uid:`${uid}`,
                                    userName:`${displayName}`,
                                    userImg:`${photoURL}`
                                })
                            })
    }      
    const onChange=(event)=>{
        const {target:{name,value}}=event
        if(name==="email"){
            setEmail(value)
        }
        else if(name==="password"){
            setPassword(value)
        }
    }
    const onSubmit=async(event)=>{ //로그인 버튼 클릭시 트리거
        event.preventDefault()
        const auth = getAuth()
        try {
            let data
            if(newAccount){ 
                data = await createUserWithEmailAndPassword(auth,email,password)
                .then(async (result)=>{
                    const {uid,displayName,photoURL}=result.user
                    await setDoc(doc(dbService,"users",`${uid}`),{
                        uid:`${uid}`,
                        userName:`${displayName}`,
                        userImg:`${photoURL}`
                    })
                })
                setNewAccount(false)

            }
            else{ //log in
                data = await signInWithEmailAndPassword(auth,email,password)
                .then(async (result)=>{
                    const {uid,displayName,photoURL}=result.user
                    await setDoc(doc(dbService,"users",`${uid}`),{
                        uid:`${uid}`,
                        userName:`${displayName}`,
                        userImg:`${photoURL}`
                    })
                })
            }
        }
        catch(error){
            setOpen(true)
            setError(error.message)
        }
    }
    function callBack(value){ //자식 컴포넌트의 데이터 부모 컴포넌트(app)로 보내기 위함
        setOpen(value)
    }
    const toggleAccount=()=>setNewAccount((prev)=>!prev)


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
        <Typography component="h1" variant="h5">로그인</Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="이메일 주소"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호"
                value={password}
                onChange={onChange}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onSubmit}
              >
                {newAccount ? "계정 생성" : "로그인"}
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                    <span className="login_toggle"  onClick={toggleAccount}>{newAccount ? "로그인 하기" : "계정 생성하기"}</span>
                </Grid>
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSocialClick} 
              name="google"> 
                <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon> 구글로 로그인
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              onClick={onSocialClick} 
              sx={{ mt: 3, mb: 2 }}
              name="github"
            >
                <FontAwesomeIcon icon={faGithub} />깃허브로 로그인
            </Button>
            <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
          {open?<Error error={error} callBack={callBack}/>:null} 
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}