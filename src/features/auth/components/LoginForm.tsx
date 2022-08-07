import { signInWithGoogle } from '../api/signUpUser'

export  function LoginForm() {
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
}
