import Input from "@/components/UI/Input";

const Index = ({userForm, handleChange}) => {
  return (
    <>
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="veuillez saisir votre email"
        isRequired={true}
        onChange={(e) => handleChange(e)}
        value={userForm?.email}
      />
      <Input
        label="Mot de passe"
        type="password"
        name="password"
        placeholder="veuillez saisir votre mot de passe"
        isRequired={true}
        onChange={(e) => handleChange(e)}
        value={userForm?.password}
      />
      <Input
        label="Confirmation du mot de passe"
        type="password"
        name="confirmPassword"
        placeholder="veuillez confirmer votre mot de passe"
        isRequired={true} 
        onChange={(e) => handleChange(e)}
        value={userForm?.confirmPassword}
      />
    </>
  );
}

export default Index;
