
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useDeleteCourseMutation, useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "@/app/components/Loader/Loader";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleOpenConfirmDialog = (id: string) => {
    setCourseId(id);
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setCourseId("");
  };

  const handleConfirmDelete = async () => {
    await deleteCourse(courseId);
    handleCloseConfirmDialog();
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Course Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch]);

  const columns = [
    { field: "id", headerClassName: 'super-app-theme--header', headerName: "ID", flex: 0.5 },
    { field: "title", headerClassName: 'super-app-theme--header', headerName: "Course Title", flex: 1 },
    { field: "ratings", headerClassName: 'super-app-theme--header', headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerClassName: 'super-app-theme--header', headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerClassName: 'super-app-theme--header', headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerClassName: 'super-app-theme--header',
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button>
          <Link href={`/admin/edit-course/${params.row.id}`}>
          <FiEdit2 className="text-black dark:text-white" size={20} />
        </Link>
        </Button>
      ),
    },
    {
      field: "delete",
      headerClassName: 'super-app-theme--header',
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button onClick={() => handleOpenConfirmDialog(params.row.id)}>
          <AiOutlineDelete className="text-black dark:text-white" size={20} />
        </Button>
      ),
    },
  ];

  const rows: any[] = [];
  data?.courses.forEach((item: any) => {
    rows.push({
      id: item._id,
      title: item.name,
      ratings: item.ratings,
      purchased: item.purchased,
      created_at: format(item.createdAt),
    });
  });

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
              "& .MuiDataGrid-root": { border: "none", outline: "none" },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": { color: theme === "dark" ? "#fff" : "#000" },
              "& .MuiDataGrid-sortIcon": { color: theme === "dark" ? "#fff" : "#000" },
              "& .MuiDataGrid-row": { color: theme === "dark" ? "#fff" : "#000", borderBottom: theme === "dark" ? "1px solid #ffffff30!important" : "1px solid #ccc!important" },
              "& .MuiTablePagination-root": { color: theme === "dark" ? "#fff" : "#000" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
              "& .name-column--cell": { color: theme === "dark" ? "#fff" : "#000" },
              "& .super-app-theme--header": { color: theme === "dark" ? "#fff" : "#000", borderBottom: "none", backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC" },
              "& .MuiDataGrid-virtualScroller": { backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0" },
              "& .MuiDataGrid-footerContainer": { color: theme === "dark" ? "#fff" : "#000", borderTop: "none", backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC" },
              "& .MuiCheckbox-root": { color: theme === "dark" ? `#b7ebde !important` : `#000 !important` },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `#000 !important` },
            }}
          >
            <DataGrid rows={rows} columns={columns} />
          </Box>
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

export default AllCourses;

