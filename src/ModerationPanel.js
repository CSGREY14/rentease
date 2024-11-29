import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import axios from "axios";
import MaintenanceIcon from '@mui/icons-material/Build'; // A maintenance icon

const ModerationPanel = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [action, setAction] = useState("");
  const [reports, setReports] = useState([]);
  const [openMaintenanceDialog, setOpenMaintenanceDialog] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    // Fetch flagged reports from the backend
    axios
      .get("http://localhost:5001/api/reports")
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });

      axios.get("http://localhost:5001/api/maintenance").then((response)=>{setMaintenanceMode(response.data.maintenanceMode);}).catch((error) => {
        console.error("Error fetching status of maintenance mode:", error);
      });
  }, [maintenanceMode,reports]);

  const handleAction = (id, actionType) => {
    if (actionType === "unflag") {
      // Update flagged status to false
      axios
        .patch(`http://localhost:5001/api/reports/${id}`)
        .then(() => {
          setReports((prevReports) =>
            prevReports.map((item) =>
              item._id === id ? { ...item, flagged: false } : item
            )
          );
        })
        .catch((error) => {
          console.error("Error updating report status:", error);
        });
    } else if (actionType === "delete") {
      // Delete the report
      axios
        .delete(`http://localhost:5001/api/reports/${id}`)
        .then(() => {
          setReports((prevReports) =>
            prevReports.filter((item) => item._id !== id)
          );
        })
        .catch((error) => {
          console.error("Error deleting report:", error);
        });
    }
    setOpenDialog(false);
  };

  const handleOpenDialog = (item, actionType) => {
    setSelectedItem(item);
    setAction(actionType);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
    setAction("");
  };

  const toggleMaintenanceMode = () => {
    setOpenMaintenanceDialog(true);
  };

  const confirmMaintenanceToggle = (confirm) => {
    if (confirm) {
      // Here you can implement the API call to toggle maintenance mode
      axios
        .post("http://localhost:5001/api/toggle-maintenance")
        .then((response) => {
          setMaintenanceMode(response.data.maintenanceMode);
        })
        .catch((error) => {
          console.error("Error toggling maintenance mode:", error);
        });
    }
    setOpenMaintenanceDialog(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Moderation Panel - Flagged Properties
      </Typography>

      
      {/* Maintenance Mode Warning Dialog */}
      <Dialog open={openMaintenanceDialog} onClose={() => setOpenMaintenanceDialog(false)}>
        <DialogTitle>Maintenance Mode</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to enable maintenance mode? This will temporarily disable access to the website for all users.
            <br />
            <strong>Warning:</strong> Enabling maintenance mode may cause a loss of user engagement and access to key features.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => confirmMaintenanceToggle(false)} color="secondary">Cancel</Button>
          <Button onClick={() => confirmMaintenanceToggle(true)} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No</TableCell>
              <TableCell>Property ID</TableCell>
              <TableCell>Owner Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Issue</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.propertyId}</TableCell>
                <TableCell>{item.ownerName}</TableCell>
                <TableCell>{item.flagged ? "Flagged" : "Unflagged"}</TableCell>
                <TableCell>{item.issue}</TableCell>
                <TableCell>{item.details}</TableCell>
                <TableCell>
                  <div>
                    {item.flagged && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenDialog(item, "unflag")}
                      >
                        Unflag
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOpenDialog(item, "delete")}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Toggle Maintenance Mode Button */}
      <Box display="flex" justifyContent="flex-end" marginBottom="20px">
        <Button
          variant="contained"
          color="warning"
          onClick={toggleMaintenanceMode}
          startIcon={<MaintenanceIcon />}
        >
          {maintenanceMode ? "Disable Maintenance Mode" : "Enable Maintenance Mode"}
        </Button>
      </Box>


      {/* Confirmation Dialog */}
      {selectedItem && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to{" "}
              <strong>
                {action === "unflag" ? "unflag this report" : "delete"}
              </strong>{" "}
              for the following property?
            </DialogContentText>
            <Typography variant="body2" style={{ marginTop: "10px" }}>
              <strong>Reported Reason:</strong> {selectedItem.issue}
            </Typography>
          </DialogContent>
          <DialogActions>
            {action === "unflag" && (
              <Button
                onClick={() => handleAction(selectedItem._id, "unflag")}
                color="success"
                variant="contained"
              >
                Unflag
              </Button>
            )}
            {action === "delete" && (
              <Button
                onClick={() => handleAction(selectedItem._id, "delete")}
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            )}
            <Button onClick={handleCloseDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ModerationPanel;
