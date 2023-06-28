import { useState } from "react";
import { useAuth } from "context/AuthUserContext";
import { useRouter } from "next/router";
import Input from "components/UI/Input";
import Button from "components/UI/Button/";
import Title from "components/UI/Title";
import Loading from "components/UI/Loading";
import Notification from "components/UI/Notification";
import ButtonLink from "components/UI/ButtonLink";
import FormLogin from "components/Form/FormLogin"


const Index = () => {

  const router = useRouter();
  const { loginWithPassword, loginWithGoogle } = useAuth();


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userForm, setUserForm] = useState({
    email: "",
    password: ""
  });



  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  const submitLogin = (e) => {
    e.preventDefault();
    loginWithPassword(userForm.email, userForm.password).then((user) => {
      router.push('/');
    }).catch((error) => {
      setError(error);
    })
  }


  return (
    <>
      <Loading isLoad={loading} />
      <Title title="Connexion" Level="h1" />
      <form onSubmit={(e) => submitLogin(e)}>
        <FormLogin userForm={userForm} handleChange={handleChange} />
        <Button
          type="submit"
          title="Se connecter"
          className="btn__big"
        />
      </form>
      <Button title="Google Auth" className="btn__big" handleClick={loginWithGoogle} />
      {
        error && (
          <Notification type="warning" message={error.code} />
        )
      }
      <p>
        Vous n&apos;avez pas de compte ?  <ButtonLink title="Inscrivez-vous !" className={"btn__link"} link="/auth/register" />
      </p>
      <p>
        Vous avez oublié votre mot de passe ? <ButtonLink title="Réinitialiser" className={"btn__link"} link="/auth/forgot-password" />
      </p>
      <p>

      </p>
    </>
  );

}

export default Index;
