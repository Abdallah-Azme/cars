import { Badge } from "@/dashboard/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/dashboard/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { activateUserApi, disableUserApi, getUsersApi } from "@/api/users";
import type { User, UsersResponse } from "@/types/users";
import { useState, useEffect } from "react";
import { PaginationControls } from "@/components/products/Pagination";
import {
  Loader2,
  UserCheck,
  UserX,
  Search,
  Shield,
  User as UserIcon,
  Eye,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/dashboard/components/ui/button";
import { Input } from "@/dashboard/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [role, setRole] = useState<string>("all");
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["users", page, role],
    queryFn: () => getUsersApi(page, 10, role === "all" ? undefined : role),
  });

  // Add logging to debug the response structure
  useEffect(() => {
    if (isError) {
      console.error("Users API Error:", queryError);
      toast.error(queryError?.message || "Failed to fetch users.");
    }
  }, [data, isError, queryError]);

  const activateMutation = useMutation({
    mutationFn: (id: number) => activateUserApi(id),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success(res.data?.message || "User activated successfully");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      } else {
        toast.error(res.error || "Failed to activate user");
      }
    },
  });

  const disableMutation = useMutation({
    mutationFn: (id: number) => disableUserApi(id),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success(res.data?.message || "User disabled successfully");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      } else {
        toast.error(res.error || "Failed to disable user");
      }
    },
  });

  // Defensive data extraction
  const apiResponse = data;
  const isApiOk = apiResponse?.ok;
  const responseBody = apiResponse?.data;

  // Try to find the users array in common places
  // 1. responseBody.data (as seen in postman)
  // 2. responseBody (if the array is the root, though unlikely with success/message)
  let users: User[] = [];
  if (
    responseBody &&
    "data" in responseBody &&
    Array.isArray((responseBody as UsersResponse).data)
  ) {
    users = (responseBody as UsersResponse).data;
  } else if (Array.isArray(responseBody)) {
    users = responseBody;
  }

  const pagination = responseBody?.pagination;

  const filteredUsers = users.filter((u) => {
    const name = u?.name || "";
    const email = u?.email || "";
    const searchTerm = search.toLowerCase();
    return (
      name.toLowerCase().includes(searchTerm) ||
      email.toLowerCase().includes(searchTerm)
    );
  });

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <Shield className="w-3 h-3" />;
      case "moderator":
        return <Star className="w-3 h-3" />;
      case "viewer":
        return <Eye className="w-3 h-3" />;
      default:
        return <UserIcon className="w-3 h-3" />;
    }
  };

  const statusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "default";
      case "pending":
        return "secondary";
      case "disabled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Users Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your application users, their roles and access status.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
            Total Users: {pagination?.total || 0}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative col-span-1 md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10 h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="User">User</SelectItem>
              <SelectItem value="Viewer">Viewer</SelectItem>
              <SelectItem value="Moderator">Moderator</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col gap-4 p-8 justify-center items-center">
            <Loader2 className="h-12 w-12 animate-spin text-red-600" />
            <p className="text-sm font-medium text-muted-foreground">
              Loading users...
            </p>
          </div>
        ) : !isApiOk ? (
          <div className="flex flex-col gap-4 p-8 justify-center items-center text-center">
            <div className="p-4 rounded-full bg-red-50">
              <UserX className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">
                Failed to load users
              </p>
              <p className="text-sm text-muted-foreground">
                {apiResponse?.error || "An unknown error occurred"}
              </p>
            </div>
            <Button
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["users"] })
              }
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[80px]">User</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="w-[150px]">Role</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>
                  <TableHead className="w-[150px]">Joined</TableHead>
                  <TableHead className="w-[120px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <TableRow
                      key={u.id}
                      className="group transition-colors hover:bg-muted/20"
                    >
                      <TableCell>
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage src={u.avatar || ""} alt={u.name} />
                          <AvatarFallback className="bg-red-50 text-red-700 font-bold">
                            {u.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">
                            {u.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {u.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 w-fit border border-slate-200">
                          {getRoleIcon(u.role)}
                          <span className="text-xs font-semibold capitalize">
                            {u.role}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={statusBadgeVariant(u.statue)}
                          className="capitalize px-2.5 py-0.5"
                        >
                          {u.statue}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs font-medium text-gray-500">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {u.statue === "active" ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => disableMutation.mutate(u.id)}
                              disabled={disableMutation.isPending}
                              title="Disable User"
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => activateMutation.mutate(u.id)}
                              disabled={activateMutation.isPending}
                              title="Activate User"
                            >
                              <UserCheck className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-48 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="p-4 rounded-full bg-slate-50">
                          <UserIcon className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                        <p className="text-muted-foreground font-medium">
                          No users found match your search.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {pagination && pagination.last_page > 1 && (
        <div className="mt-4">
          <PaginationControls
            pagination={pagination}
            onPageChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}
    </div>
  );
}
