import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { loginUser } from "@/store/authSlice";
const initialState = { email: "", password: "" };

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  }

  return (
    <div className="mx-auto lg:w-1/4 sm:w-full mt-20 max-w-d space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign into your account
        </h1>
        <p className="mt-2">
          Don't have an account?{" "}
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      {/* Form Component */}
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          <div className="grid w-full gap-1.5">
            <Label className="mb-1">Email</Label>
            <Input
              name="email"
              placeholder="Enter your email address"
              id="email"
              type="email"
              value={formData[initialState["email"]]}
              onChange={(event) =>
                setFormData({ ...formData, ["email"]: event.target.value })
              }
            />
            <Label className="mb-1">Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              id="password"
              type="password"
              value={formData[initialState["password"]]}
              onChange={(event) =>
                setFormData({ ...formData, ["password"]: event.target.value })
              }
            />
          </div>
        </div>
        <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default AuthLogin;
