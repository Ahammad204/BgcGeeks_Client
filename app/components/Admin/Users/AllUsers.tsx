
import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Modal, Box, Button, Select, MenuItem, FormControl, InputLabel,Dialog, DialogActions, DialogContent, DialogTitle, Typography  } from '@mui/material';
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "@/app/components/Loader/Loader";
import { format } from "timeago.js";
import { useGetAllUsersQuery, useUpdateUserRoleMutation,useDeleteUserMutation } from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [role, setRole] = useState("admin");
  const backgroundColor = theme === 'dark' ? '#3e4396' : '#A4A9FC';
  const [userId, setUserId] = useState("");
  const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
  const [updateUserRole, { error: updateError, isSuccess: updateSuccess }] = useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess, error }] = useDeleteUserMutation();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleOpenConfirmDialog = (id: string) => {
    setUserId(id);
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setUserId("");
  };

  const handleConfirmDelete = async () => {
    await deleteUser(userId);
    handleCloseConfirmDialog();
  };
  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (updateSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setOpen(false);
    }
    if (isSuccess) {
      refetch();
      toast.success("User Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, updateSuccess, refetch, isSuccess, error]);

  const handleUpdateUserRole = async () => {
    try {
      await updateUserRole({ id: currentUser.id, role }).unwrap();
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const columns = [
    { field: "id", headerClassName: 'super-app-theme--header', headerName: "ID", flex: 0.3 },
    { field: "name", headerClassName: 'super-app-theme--header', headerName: "Name", flex: 0.5 },
    { field: "email", headerClassName: 'super-app-theme--header', headerName: "E-mail", flex: 0.5 },
    { field: "role", headerClassName: 'super-app-theme--header', headerName: "Role", flex: 0.2 },
    { field: "courses", headerClassName: 'super-app-theme--header', headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerClassName: 'super-app-theme--header', headerName: "Created At", flex: 0.5 },
    {
      field: "update",
      headerName: "Update",
      headerClassName: 'super-app-theme--header',
      flex: 0.5,
      renderCell: (params: any) => (
        <Button  onClick={() => { setCurrentUser(params.row); setOpen(true); }}>
          <span className="text-black dark:text-white">Update Role</span>
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      headerClassName: 'super-app-theme--header',
      flex: 0.2,
      renderCell: (params: any) => (
        <Button onClick={() => handleOpenConfirmDialog(params.row.id)}>
          <AiOutlineDelete className="text-black dark:text-white" size={20} />
        </Button>
      ),
    },
    {
      field: "emailLink",
      headerName: "Email",
      headerClassName: 'super-app-theme--header',
      flex: 0.2,
      renderCell: (params: any) => (
        <Button>
          <a href={`mailto:${params.row.email}`} target="_blank">
            <AiOutlineMail className="text-black dark:text-white" size={20} />
          </a>
        </Button>
      ),
    },
  ];

  const rows: any[] = [];
  if (isTeam) {
    const newData = data && data.users.filter((item: any) => item.role === "admin");
    newData && newData.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      });
    });
  } else {
    data && data.users.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      });
    });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {/* <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-[200px] dark:bg-[#57c7a3] dark:border-[#ffffff6c]`}
              onClick={() => setActive(!active)}
            >
              Add New Member
            </div>
          </div> */}
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: theme === "dark" ? "1px solid #ffffff30!important" : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .super-app-theme--header": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root ": {
                color: theme === "dark" ? `#b7ebde!important` : `#000!important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#000 !important`,
              },
            }}
          >
            <DataGrid rows={rows} columns={columns} />
          </Box>

          {/* Update Role Modal */}
          {/* <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="update-role-modal"
            aria-describedby="update-role-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
              }}
            >
              <h2 id="update-role-modal">Update User Role</h2>
              {currentUser && (
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    label="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateUserRole}
                  >
                    Update Role
                  </Button>
                </Box>
              )}
            </Box>
          </Modal> */}
           <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="update-role-modal"
      aria-describedby="update-role-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: backgroundColor,
          border: '0px solid #000',
          
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 id="update-role-modal">Update User Role</h2>
        {currentUser && (
          <Box  component="form" noValidate autoComplete="off">
           <FormControl fullWidth margin="normal">
      <InputLabel 
        id="role-select-label"
        sx={{ color: theme === 'dark' ? '#ffff' : '#000' }}  
      >
        Role
      </InputLabel>
      <Select
        labelId="role-select-label"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        label="Role"
        sx={{
          backgroundColor: theme === 'dark' ? '#333' : '#fff', 
          color: theme === 'dark' ? '#fff' : '#000', 
          '& .MuiSelect-icon': {
            color: theme === 'dark' ? '#fff' : '#000', 
          },
          '& .MuiMenuItem-root': {
            color: theme === 'dark' ? '#fff' : '#000', 
          },
        }}
      >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>
    </FormControl>
            <Button
  variant="contained"
  onClick={handleUpdateUserRole}
  sx={{
    mt: 2,
    backgroundColor: theme === 'dark' ? '#57c7a3' : '#fff',
    color: theme === 'dark' ? '#fff' : '#000',
    '&:hover': {
      backgroundColor: theme === 'dark' ? '#57c7a3' : '#fff',
    },
  }}
>
  Update Role
</Button>
          </Box>
        )}
      </Box>
    </Modal>
        </Box>
      )}
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this course?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllUsers;
