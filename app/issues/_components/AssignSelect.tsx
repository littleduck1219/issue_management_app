"use client";

import { Select } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { User } from "@prisma/client";
import axios from "axios";

export default function AssignSelect() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get<User[]>("/api/users");
            setUsers(data);
        };
        fetchUsers();
    }, []);

    console.log(users.map((user) => user.name));

    return (
        <Select.Root>
            <Select.Trigger placeholder='manager' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users.map((user) => (
                        <Select.Item key={user.id} value={user.id}>
                            {user.name}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
}
