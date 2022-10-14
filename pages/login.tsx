import { CssBaseline, TextField, Typography, createTheme, ThemeProvider, Container, FormControlLabel, Checkbox, Button, Snackbar, Stack} from '@mui/material';
import { Box } from '@mui/system';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Link from 'next/link';
import React, { useEffect, useState, FormEvent } from 'react';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




type CopyPropps = {
    site: string;
    sx?: object;

}

function Copyright(props:CopyPropps) {
  return (
    <Typography>
      {'Copyright ©️'}
      <Link color='inherit' href='https://www.avanade.com.br/'>
        {props.site}
      </Link> {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography> 
  )
}

const theme = createTheme();




export default function LoginPage() {


const [empresa, setEmpresa] = useState<string | undefined | null | FormDataEntryValue>('');
const [nome, setNome] = useState<string>('tifane');
const [contador, setContador] = useState<number>(0);
const [error, setError] = useState<Boolean>(false);
const [errorMessage, setErrorMessage] = useState ('');
const [email, setEmail] = useState <string | undefined | null | FormDataEntryValue> ('');
const [password, setPassword] = useState <string | undefined | null | FormDataEntryValue> ('');

const [open, setOpen] = useState<boolean>(false);


/*useEffect(()=>{

  console.log(`Tornando maiúsculo: ${nome}`);
})

<button onClick={()=>setNome(nome.toUpperCase())}>torna maiúsculo</button>
*/

//A primeira vez após carregar a pag e após o render
//Executa também a cada alteraçãol de estado
useEffect(()=>{
  if(contador ==0){
    document.title = `Executando useEffect a primeira vez ${contador}`;
} else{
    document.title = `Executando useEffect a cada alteração ${contador}`;
}
    //setContador(contador+1);
    console.log(`Executando useEffect a cada chamada ${contador}`);
},[contador]);



useEffect(()=>{
    if(nome=='tifane'){
      console.log( `Executando useEffect a primeira vez com o nome incial: ${nome}`);
    } else {
      console.log( `Agora está correto, ${nome}`);
    }
},[nome]);




useEffect(()=>{
  if(password && password.length < 6){
    setError(true);
    setErrorMessage('Senha deve ter no mínimo 6 caracteres');
  } else if (password) {
    setError(false);
    setErrorMessage('');

    //enviar o formulário para o servidor.......
    //deu certo... vamos criar o snackbar
    setOpen(true);

  }
},[password]);

const handleClose = ()=>{
  setOpen(false);
}



const handleSubmit = (event: FormEvent<HTMLFormElement>)=>{
    //Previne o comportamento padrão do form, que seria recarregar a página
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log(data.get('email'));
    console.log(data.get(`password`));

    setEmail(data.get('email'));
    setPassword(data.get('password'));
}



  return (
    <ThemeProvider theme={theme}> 
      <Container component='main' maxWidth='xs'>
        <CssBaseline/>

        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Usuário autenticado com sucesso! Aguarde...
        </Alert>
      </Snackbar>


    <Box sx={{mt:8, display:'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography component='h1' variant='h5'>
          Login
      </Typography>


      <Box component='form' onSubmit={handleSubmit}>
        {/*<Box component='form' onSubmit={(e)=>{console.log('enviou')}}>*/}



          {/*<button onClick ={()=> setNome('Tífane')}>Mudar Nome</button>
          {` Mudar nome: ${nome}`}
          <br></br>

          <br></br>

          <button onClick={()=> setContador(contador+1)}>Muda o contador</button>

  {' O State contador vale: ' + contador}*/}

          <TextField  margin='normal' required variant='standard' fullWidth id='email' label='Digite o e-mail' name='email' autoComplete='email' autoFocus />
          <TextField margin='normal' required fullWidth id='passaword' label='Digite a senha' name='password' autoComplete='current-password' autoFocus />

          <FormControlLabel control={<Checkbox value='remember' color='primary'/>} label='Lembrar de mim'/>
          <Button type='submit' fullWidth variant='contained' sx={{mt:3, mb:2}}>Entrar</Button>

        {error && <Typography color='error'>{errorMessage}</Typography>}

        </Box>
    </Box>
    <Copyright site='www.avanade.com.br' sx={{mt:8, mb: 4}} />
      </Container>
    </ThemeProvider>

  )
}
