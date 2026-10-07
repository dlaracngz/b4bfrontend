"use client";
import Link from "next/link";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";

type SidebarProps = {
  role: "user" | "admin";
};

export default function Sidebar({ role }: SidebarProps) {
  const items =
    role === "user"
      ? [
          { label: "Ürünler", path: "/products" },
          { label: "Sepet", path: "/cart" },
          { label: "Siparişler", path: "/orders" },
        ]
      : [
          { label: "Dashboard", path: "/admin/dashboard" },
          { label: "Kullanıcılar", path: "/admin/users" },
          { label: "Siparişler", path: "/admin/orders" },
        ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          width: 220,
          boxSizing: "border-box",
          backgroundColor: "#1E293B",
          color: "white",
          borderRight: "none",
        },
      }}
    >
      <div className="p-6 text-2xl font-bold text-white">B4B</div>

      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            href={item.path}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#334155",
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
