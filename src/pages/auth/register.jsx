import { useToast } from "@/components/ui/use-toast";
import { registerUser } from "@/store/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const initialState = { username: "", email: "", password: "" };

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
        navigate("/auth/login");
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  }

  console.log(formData);

  return (
    <div className="mx-auto lg:w-1/4 sm:w-full mt-20 max-w-d space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Register
          </Link>
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          <div className="grid w-full gap-1.5">
            <Label className="mb-1">Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              id="username"
              type="text"
              value={formData[initialState["username"]]}
              onChange={(event) =>
                setFormData({ ...formData, ["username"]: event.target.value })
              }
            />
          </div>
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
          </div>
          <div className="grid w-full gap-1.5">
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
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default AuthRegister;
