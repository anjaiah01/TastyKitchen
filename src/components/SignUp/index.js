import InputFeild from '../UI/input'
import Wrapper from '../Wrapper/auth'

const SignUp = () => {
  return (
    <Wrapper title="SignUp" temp="tempo">
      <form>
        <InputFeild
          type="text"
          id="username"
          name="username"
          labelText="USERNAME"
        />
        <InputFeild
          type="text"
          id="password"
          name="password"
          labelText="PASSWORD"
        />
      </form>
    </Wrapper>
  )
}

export default SignUp
