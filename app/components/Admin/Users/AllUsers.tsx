import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "@/app/components/Loader/Loader";
import {format} from "timeago.js"
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";

type Props = {};

const AllUsers = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const { isLoading, data, error } = useGetAllUsersQuery({});

  const columns = [
  
    { field: "id",  headerClassName: 'super-app-theme--header', headerName: "ID", flex: 0.3 },
    { field: "name",  headerClassName: 'super-app-theme--header', headerName: "Name", flex: .5 },
    { field: "email",  headerClassName: 'super-app-theme--header', headerName: "E-mail", flex: 0.5 },
    { field: "role",  headerClassName: 'super-app-theme--header', headerName: "Role", flex: 0.2 },
    { field: "courses",  headerClassName: 'super-app-theme--header', headerName: "Purchased Courses", flex: .5 },
    { field: "created_at",  headerClassName: 'super-app-theme--header', headerName: "Created At", flex: 0.5 },
    {
      field: " ",
      headerName: "Delete",
      headerClassName: 'super-app-theme--header',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                className="text-black dark:text-white"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Email",
      headerClassName: 'super-app-theme--header',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a
            href={`mailto:${params.row.email}`}
            target="_blank"
            
            >
              <AiOutlineMail
                className="text-black dark:text-white"
                size={20}
              />
            </a>
          </>
        );
      },
    },
  ];
  const rows:any = [];
  {
    data &&
      data.users.forEach((item: any) => {
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
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
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
                color:
                  theme === "dark" ? `#b7ebde!important` : `#000!important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#000 !important`,
              },
            }}
          >
            <DataGrid  rows={rows} columns={columns} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
