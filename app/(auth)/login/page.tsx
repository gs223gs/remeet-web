import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const handleGithubLogin = async () => {
    "use server";
    await signIn("github");
  };
  const handleGoogleLogin = async () => {
    "use server";
    await signIn("google");
  };
  return (
    <>
      <Button onClick={handleGithubLogin}>GithubLogin</Button>
      <Button onClick={handleGoogleLogin}>GoogleLogin</Button>
    </>
  );
}
