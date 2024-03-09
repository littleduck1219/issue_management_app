"use client";

import { Button, TextField, TextArea } from "@radix-ui/themes";
import React from "react";

export default function page() {
    return (
        <div className='max-w-xl space-y-3'>
            <TextField.Root>
                <TextField.Input placeholder='Title' />
            </TextField.Root>
            <TextArea placeholder='Description' />
            <Button>Create New Issue</Button>
        </div>
    );
}
