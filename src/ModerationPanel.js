import React, { useState } from "react";
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
} from "@mui/material";

const ModerationPanel = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [action, setAction] = useState("");

  // Flagged property data
  const flaggedProperties = [
    {
      id: 1,
      title: "Luxury Apartment - Not Real",
      user: "John Doe",
      status: "Flagged",
      reportedReason: "The listing is not real, the apartment does not exist.",
    },
    {
      id: 2,
      title: "House with Fake Pictures",
      user: "Jane Smith",
      status: "Flagged",
      reportedReason: "The photos provided are fake and do not match the property.",
    },
    {
      id: 3,
      title: "Overpriced Listing",
      user: "Alice Brown",
      status: "Flagged",
      reportedReason: "The listed price is much higher than similar properties in the area.",
    },
  ];

  const [properties, setProperties] = useState(flaggedProperties);

  const handleAction = (id, action) => {
    if (action === "unflag") {
      setProperties((prevProperties) =>
        prevProperties.map((item) =>
          item.id === id ? { ...item, status: "Active" } : item
        )
      );
    } else if (action === "delete") {
      setProperties((prevProperties) =>
        prevProperties.filter((item) => item.id !== id)
      );
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

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Moderation Panel - Flagged Properties
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Property Title</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reported Reason</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.user}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.reportedReason}</TableCell>
                <TableCell>
                  {item.status === "Flagged" && (
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenDialog(item, "unflag")}
                      >
                        Unflag
                      </Button>{" "}
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleOpenDialog(item, "delete")}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      {selectedItem && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to{" "}
              <strong>{action === "unflag" ? "remove the flag" : "delete"}</strong>{" "}
              for the following property?
            </DialogContentText>
            <Typography
              variant="body2"
              style={{ marginTop: "10px", fontStyle: "italic" }}
            >
              "{selectedItem.title}"
            </Typography>
            <Typography variant="body2" style={{ marginTop: "10px" }}>
              <strong>Reported Reason:</strong> {selectedItem.reportedReason}
            </Typography>
          </DialogContent>
          <DialogActions>
            {action === "unflag" && (
              <Button
                onClick={() => handleAction(selectedItem.id, "unflag")}
                color="success"
                variant="contained"
              >
                Unflag
              </Button>
            )}
            {action === "delete" && (
              <Button
                onClick={() => handleAction(selectedItem.id, "delete")}
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
