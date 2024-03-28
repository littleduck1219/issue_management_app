"use client";

import React from "react";
import LoginModal from "@/app/_components/LoginModal";
import RedirectToLogin from "./_components/RedirectToLogin";
import Home from "@/app/page";

export default function page() {
    return (
        <>
            <RedirectToLogin />
            <Home />
        </>
    );
}
