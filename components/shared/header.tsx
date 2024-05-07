"use client";

import React from "react";
import Container from "./container";
import Logo from "./logo";
import { ModeToggle } from "./toggle-theme";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="py-4">
      <Container>
        <div className="flex justify-between items-center">
          <Logo />

          <nav>
            <ul className="flex gap-4 items-center">
              <li>
                <ModeToggle />
              </li>
              <li className="flex gap-4">
                <SignedOut>
                  <SignInButton>
                    <Button>Sign In</Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button variant="outline">Sign Up</Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
