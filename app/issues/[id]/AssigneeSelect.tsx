"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";

const AssigneeSelect = async () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRef = useRef(false); // ✅ Prevents repeated calls

  useEffect(() => {
    const fetchUsers = async () => {
      if (fetchRef.current) return; // ✅ Prevent repeated fetch
      fetchRef.current = true; // ✅ Set ref to prevent re-fetch

      try {
        const response = await fetch("/api/users", {
          method: "GET",
          cache: "no-store", // ✅ Prevent caching issues
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
          {users.map((user) => (
            <Select.Item value={user.id}>{user.name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
