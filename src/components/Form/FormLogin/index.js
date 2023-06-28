import Input from "@/components/UI/Input";

const Index = ({userForm, handleChange}) => {
  return (
    <>
      <Input
        label="Email"
        name="email" 
        placeholder="veuillez saisir votre email"
        isRequired={true}
        onChange={(e) => handleChange(e)}
        value={userForm.email}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="veuillez saisir votre mot de passe"
        isRequired={true}
        onChange={(e) => handleChange(e)}
        value={userForm.password}
      />
      
    </>
  );
}

export default Index;
